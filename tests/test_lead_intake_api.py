from collections.abc import Iterator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool

from backend.app.db import Base, get_db_session
from backend.app.leads.models import RunStatus
from backend.app.leads.persistence import (
    AuditRecord,
    AutomationRunRecord,
    LeadRecord,
    RunAttemptRecord,
)
from backend.app.main import app


def qualified_payload(
    email: str = "Ada@Example.COM",
    company_domain: str = "www.example.com",
    lead_score: int = 90,
) -> dict[str, object]:
    return {
        "email": email,
        "first_name": "Ada",
        "last_name": "Lovelace",
        "company_name": "Example Co",
        "company_domain": company_domain,
        "source": "demo_form",
        "lead_score": lead_score,
    }


@pytest.fixture
def api_context() -> Iterator[tuple[TestClient, Session]]:
    engine = create_engine(
        "sqlite+pysqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(engine)
    previous_override = app.dependency_overrides.get(get_db_session)

    try:
        with Session(engine) as session:

            def override_db_session() -> Iterator[Session]:
                try:
                    yield session
                    session.commit()
                except Exception:
                    session.rollback()
                    raise

            app.dependency_overrides[get_db_session] = override_db_session
            with TestClient(app) as client:
                yield client, session
    finally:
        if previous_override is None:
            app.dependency_overrides.pop(get_db_session, None)
        else:
            app.dependency_overrides[get_db_session] = previous_override
        Base.metadata.drop_all(engine)
        engine.dispose()


def test_post_lead_intake_processes_qualified_lead_with_mock_adapters(
    api_context: tuple[TestClient, Session],
) -> None:
    client, _session = api_context

    first = client.post("/leads/intake", json=qualified_payload())

    assert first.status_code == 201
    data = first.json()
    assert data["lead_id"].startswith("lead_")
    assert data["run_id"].startswith("run_")
    assert data["run_status"] == "success"
    assert data["dedupe"]["status"] == "unique"
    assert data["crm"]["adapter"] == "mock_crm"
    assert data["crm"]["action"] == "created"
    assert data["slack"]["adapter"] == "mock_slack"
    assert "http" not in first.text


def test_post_lead_intake_skips_slack_for_unqualified_lead(
    api_context: tuple[TestClient, Session],
) -> None:
    client, _session = api_context
    payload = qualified_payload(lead_score=40)

    response = client.post("/leads/intake", json=payload)

    assert response.status_code == 201
    assert response.json()["run_status"] == "success"
    assert response.json()["slack"] is None


def test_post_lead_intake_persists_successful_workflow(
    api_context: tuple[TestClient, Session],
) -> None:
    client, session = api_context

    response = client.post("/leads/intake", json=qualified_payload())

    assert response.status_code == 201
    data = response.json()
    stored_lead = session.get(LeadRecord, data["lead_id"])
    stored_run = session.get(AutomationRunRecord, data["run_id"])
    attempts = session.scalars(
        select(RunAttemptRecord)
        .where(RunAttemptRecord.run_id == data["run_id"])
        .order_by(RunAttemptRecord.attempt_number)
    ).all()
    audit_event_types = session.scalars(
        select(AuditRecord.event_type)
        .where(AuditRecord.run_id == data["run_id"])
        .order_by(AuditRecord.event_type)
    ).all()

    assert stored_lead is not None
    assert stored_lead.email == "ada@example.com"
    assert stored_lead.company_domain == "example.com"
    assert stored_run is not None
    assert stored_run.status is RunStatus.SUCCESS
    assert [attempt.status for attempt in attempts] == [RunStatus.QUEUED, RunStatus.SUCCESS]
    assert audit_event_types == [
        "crm_upsert",
        "dedupe",
        "lead_intake",
        "run_status",
        "slack_notification",
    ]


def test_post_lead_intake_uses_persisted_email_dedupe(
    api_context: tuple[TestClient, Session],
) -> None:
    client, session = api_context

    first = client.post("/leads/intake", json=qualified_payload())
    second = client.post(
        "/leads/intake",
        json=qualified_payload(company_domain="new.example"),
    )

    assert first.status_code == 201
    assert second.status_code == 201
    first_data = first.json()
    second_data = second.json()
    leads = session.scalars(select(LeadRecord)).all()
    stored_second_run = session.get(AutomationRunRecord, second_data["run_id"])

    assert second_data["dedupe"]["status"] == "duplicate_email"
    assert second_data["dedupe"]["matched_lead_id"] == first_data["lead_id"]
    assert second_data["crm"]["action"] == "updated"
    assert len(leads) == 1
    assert leads[0].lead_id == first_data["lead_id"]
    assert leads[0].company_domain == "new.example"
    assert stored_second_run is not None
    assert stored_second_run.lead_id == first_data["lead_id"]


def test_post_lead_intake_uses_persisted_company_domain_dedupe(
    api_context: tuple[TestClient, Session],
) -> None:
    client, session = api_context

    first = client.post("/leads/intake", json=qualified_payload())
    second = client.post(
        "/leads/intake",
        json=qualified_payload(email="grace@example.com"),
    )

    assert first.status_code == 201
    assert second.status_code == 201
    first_data = first.json()
    second_data = second.json()
    leads = session.scalars(select(LeadRecord)).all()

    assert second_data["dedupe"]["status"] == "possible_duplicate_domain"
    assert second_data["dedupe"]["matched_lead_id"] == first_data["lead_id"]
    assert second_data["crm"]["action"] == "created"
    assert len(leads) == 2


def test_post_lead_intake_returns_422_for_invalid_payload(
    api_context: tuple[TestClient, Session],
) -> None:
    client, _session = api_context
    payload = qualified_payload()
    payload["email"] = "not-an-email"

    response = client.post("/leads/intake", json=payload)

    assert response.status_code == 422
    assert "detail" in response.json()
