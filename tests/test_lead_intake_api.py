from collections.abc import Iterator
from datetime import UTC, datetime

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool

from backend.app.db import Base, get_db_session
from backend.app.leads.adapters import MockCrmAdapter
from backend.app.leads.demo_seed import DEMO_RUN_IDS, seed_demo_data
from backend.app.leads.models import DedupeResult, DedupeStatus, ErrorType, RunStatus
from backend.app.leads.persistence import (
    AuditRecord,
    AutomationRunRecord,
    LeadPersistenceRepository,
    LeadRecord,
    RunAttemptRecord,
    derive_demo_owner,
)
from backend.app.leads.retry import RetryPolicy
from backend.app.leads.run_log import LocalRunLog
from backend.app.leads.schemas import LeadIntakeRequest
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


def persist_workflow_run(
    session: Session,
    *,
    run_id: str,
    lead_id: str,
    status: RunStatus,
    email: str,
    company_domain: str = "example.com",
) -> str:
    payload = qualified_payload(email=email, company_domain=company_domain)
    payload["phone"] = "555-0100"
    payload["message"] = "do not expose token=plain-text-secret"
    lead = LeadIntakeRequest.model_validate(payload)
    run_log = LocalRunLog()
    queued = run_log.create_run(run_id=run_id, lead_id=lead_id)
    if status is RunStatus.SUCCESS:
        run = run_log.record_success(queued)
    elif status is RunStatus.FAILED:
        run = run_log.record_failure(
            queued,
            error_type=ErrorType.ADAPTER,
            error_message="Mock CRM adapter failed token=plain-text-secret",
            suggested_action="Retry after reviewing the mock adapter payload.",
        )
    elif status is RunStatus.RETRIED:
        run = RetryPolicy().retry(
            run_log.record_failure(
                queued,
                error_type=ErrorType.ADAPTER,
                error_message="Mock CRM adapter failed",
                suggested_action="Retry after reviewing the mock adapter payload.",
            )
        )
    else:
        run = queued

    dedupe = DedupeResult(status=DedupeStatus.UNIQUE)
    crm = MockCrmAdapter().upsert_lead(lead=lead, lead_id=lead_id, dedupe=dedupe)
    LeadPersistenceRepository(session).record_workflow_result(
        lead=lead,
        run=run,
        dedupe=dedupe,
        crm=crm,
        slack=None,
    )
    session.commit()
    return run.run_id


def set_run_timestamps(
    session: Session,
    run_id: str,
    *,
    created_at: datetime,
    updated_at: datetime | None = None,
) -> None:
    stored_run = session.get(AutomationRunRecord, run_id)
    assert stored_run is not None
    stored_run.created_at = created_at
    stored_run.updated_at = updated_at or created_at
    session.commit()


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


def test_post_lead_intake_exact_replay_keeps_deterministic_run_and_dedupe(
    api_context: tuple[TestClient, Session],
) -> None:
    client, session = api_context

    first = client.post("/leads/intake", json=qualified_payload())
    second = client.post("/leads/intake", json=qualified_payload())

    assert first.status_code == 201
    assert second.status_code == 201
    first_data = first.json()
    second_data = second.json()
    attempts = session.scalars(
        select(RunAttemptRecord)
        .where(RunAttemptRecord.run_id == first_data["run_id"])
        .order_by(RunAttemptRecord.attempt_number)
    ).all()
    runs = session.scalars(
        select(AutomationRunRecord).where(AutomationRunRecord.run_id == first_data["run_id"])
    ).all()

    assert second_data["lead_id"] == first_data["lead_id"]
    assert second_data["run_id"] == first_data["run_id"]
    assert second_data["dedupe"]["status"] == "duplicate_email"
    assert len(runs) == 1
    assert [attempt.status for attempt in attempts] == [RunStatus.QUEUED, RunStatus.SUCCESS]


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


def test_get_run_history_returns_persisted_records_sorted_and_sanitized(
    api_context: tuple[TestClient, Session],
) -> None:
    client, session = api_context
    tied_timestamp = datetime(2026, 6, 1, 9, 0, tzinfo=UTC)
    later_timestamp = datetime(2026, 6, 1, 10, 0, tzinfo=UTC)
    run_b = persist_workflow_run(
        session,
        run_id="run_sort_b",
        lead_id="lead_sort_b",
        status=RunStatus.SUCCESS,
        email="sort.b@example.com",
    )
    run_a = persist_workflow_run(
        session,
        run_id="run_sort_a",
        lead_id="lead_sort_a",
        status=RunStatus.FAILED,
        email="sort.a@example.com",
    )
    run_c = persist_workflow_run(
        session,
        run_id="run_sort_c",
        lead_id="lead_sort_c",
        status=RunStatus.QUEUED,
        email="sort.c@example.com",
    )
    set_run_timestamps(session, run_b, created_at=tied_timestamp)
    set_run_timestamps(session, run_a, created_at=tied_timestamp)
    set_run_timestamps(session, run_c, created_at=later_timestamp)

    response = client.get("/leads/runs")

    assert response.status_code == 200
    runs = response.json()["runs"]
    assert [run["run_id"] for run in runs] == ["run_sort_c", "run_sort_a", "run_sort_b"]
    failed_run = runs[1]
    assert failed_run["lead_id"] == "lead_sort_a"
    assert failed_run["email"] == "sort.a@example.com"
    assert failed_run["lead_name"] == "Ada Lovelace"
    assert failed_run["company_name"] == "Example Co"
    assert failed_run["company_domain"] == "example.com"
    assert failed_run["owner"] == derive_demo_owner("lead_sort_a")
    assert failed_run["source"] == "demo_form"
    assert failed_run["run_status"] == "failed"
    assert failed_run["error_type"] == "adapter"
    assert failed_run["attempt_count"] == 2
    assert failed_run["failure_detail_available"] is True
    assert failed_run["latest_attempt"]["attempt_number"] == 2
    assert failed_run["latest_attempt"]["status"] == "failed"
    assert failed_run["latest_attempt"]["error_type"] == "adapter"
    assert failed_run["latest_attempt"]["summary"] == "Mock CRM adapter failed token=[redacted]"
    assert runs[0]["failure_detail_available"] is False
    assert runs[0]["error_type"] is None
    assert runs[2]["failure_detail_available"] is False
    assert runs[2]["error_type"] is None
    assert "plain-text-secret" not in response.text
    assert "phone" not in response.text
    assert "message" not in response.text


def test_get_run_history_represents_repeatable_demo_seed_data(
    api_context: tuple[TestClient, Session],
) -> None:
    client, session = api_context

    first_result = seed_demo_data(session)
    session.commit()
    first_response = client.get("/leads/runs")
    second_result = seed_demo_data(session)
    session.commit()
    second_response = client.get("/leads/runs")

    assert first_result.run_ids == DEMO_RUN_IDS
    assert second_result.run_ids == DEMO_RUN_IDS
    assert first_response.status_code == 200
    assert second_response.status_code == 200
    assert first_response.json() == second_response.json()
    runs = first_response.json()["runs"]
    by_run_id = {run["run_id"]: run for run in runs}

    assert [run["run_id"] for run in runs] == [
        "run_demo_queued",
        "run_demo_retried",
        "run_demo_failed",
        "run_demo_success",
    ]
    assert len(runs) == 4
    assert {run["run_status"] for run in runs} == {"success", "failed", "queued", "retried"}
    assert by_run_id["run_demo_success"]["failure_detail_available"] is False
    assert by_run_id["run_demo_success"]["email"] == "success.demo@example.com"
    assert by_run_id["run_demo_success"]["lead_name"] == "Sofia Chen"
    assert by_run_id["run_demo_success"]["company_name"] == "Northstar Growth"
    assert by_run_id["run_demo_success"]["company_domain"] == "northstar.example"
    assert by_run_id["run_demo_success"]["owner"] == derive_demo_owner("lead_demo_success")
    assert by_run_id["run_demo_success"]["error_type"] is None
    assert by_run_id["run_demo_queued"]["failure_detail_available"] is False
    assert by_run_id["run_demo_failed"]["failure_detail_available"] is True
    assert by_run_id["run_demo_failed"]["error_type"] == "adapter"
    assert by_run_id["run_demo_retried"]["failure_detail_available"] is True
    assert by_run_id["run_demo_retried"]["error_type"] == "adapter"
    assert by_run_id["run_demo_retried"]["attempt_count"] == 3
    assert by_run_id["run_demo_queued"]["latest_attempt"]["status"] == "queued"
    assert "555-010" not in first_response.text
    assert "CSV row should demonstrate" not in first_response.text


def test_get_run_detail_returns_persisted_safe_detail(
    api_context: tuple[TestClient, Session],
) -> None:
    client, session = api_context
    run_id = persist_workflow_run(
        session,
        run_id="run_detail_failed",
        lead_id="lead_detail_failed",
        status=RunStatus.FAILED,
        email="detail.failed@example.com",
    )
    session.add(
        AuditRecord(
            audit_id="audit_detail_manual_retry_api",
            lead_id="lead_detail_failed",
            run_id=run_id,
            event_type="manual_retry",
            payload={
                "run_id": run_id,
                "lead_id": "lead_detail_failed",
                "status": "retried",
                "attempt_number": 3,
                "attempt_status": "retried",
                "suggested_action": "Retry locally after checking token=plain-text-secret.",
                "raw_secret": "token=plain-text-secret",
            },
        )
    )
    session.commit()

    response = client.get(f"/leads/runs/{run_id}")

    assert response.status_code == 200
    data = response.json()
    assert data["run_id"] == "run_detail_failed"
    assert data["lead_id"] == "lead_detail_failed"
    assert data["email"] == "detail.failed@example.com"
    assert data["company_name"] == "Example Co"
    assert data["company_domain"] == "example.com"
    assert data["owner"] == derive_demo_owner("lead_detail_failed")
    assert data["source"] == "demo_form"
    assert data["run_status"] == "failed"
    assert data["error_type"] == "adapter"
    assert data["failure_detail_available"] is True
    assert [attempt["status"] for attempt in data["attempts"]] == ["queued", "failed"]
    assert data["attempts"][1]["error_type"] == "adapter"
    assert data["attempts"][1]["error_message"] == "Mock CRM adapter failed token=[redacted]"
    assert data["attempts"][1]["suggested_action"] == (
        "Retry after reviewing the mock adapter payload."
    )
    assert data["intake_payload"]["email"] == "detail.failed@example.com"
    assert data["intake_payload"]["company_domain"] == "example.com"
    assert "phone" not in data["intake_payload"]
    assert "message" not in data["intake_payload"]
    audit_events = {event["event_type"]: event["payload"] for event in data["audit_events"]}
    assert set(audit_events) == {"dedupe", "crm_upsert", "manual_retry"}
    assert audit_events["crm_upsert"]["adapter"] == "mock_crm"
    assert audit_events["manual_retry"]["suggested_action"] == (
        "Retry locally after checking token=[redacted]"
    )
    assert "raw_secret" not in audit_events["manual_retry"]
    assert "plain-text-secret" not in response.text
    assert '"phone"' not in response.text
    assert '"message"' not in response.text


def test_get_run_detail_rejects_unknown_run(api_context: tuple[TestClient, Session]) -> None:
    client, _session = api_context

    response = client.get("/leads/runs/run_missing")

    assert response.status_code == 404


def test_get_run_failure_returns_persisted_detail_and_sanitized_payload(
    api_context: tuple[TestClient, Session],
) -> None:
    client, session = api_context
    run_id = persist_workflow_run(
        session,
        run_id="run_failed",
        lead_id="lead_failed",
        status=RunStatus.FAILED,
        email="failure@example.com",
    )

    response = client.get(f"/leads/runs/{run_id}/failure")

    assert response.status_code == 200
    data = response.json()
    assert data["run_id"] == "run_failed"
    assert data["lead_id"] == "lead_failed"
    assert data["run_status"] == "failed"
    assert data["failed_attempt_number"] == 2
    assert data["error_type"] == "adapter"
    assert data["error_message"] == "Mock CRM adapter failed token=[redacted]"
    assert data["suggested_action"] == "Retry after reviewing the mock adapter payload."
    assert data["payload"]["email"] == "failure@example.com"
    assert data["payload"]["company_domain"] == "example.com"
    assert "phone" not in data["payload"]
    assert "message" not in data["payload"]


def test_get_run_failure_rejects_unknown_run(api_context: tuple[TestClient, Session]) -> None:
    client, _session = api_context

    response = client.get("/leads/runs/run_missing/failure")

    assert response.status_code == 404


def test_get_run_failure_rejects_run_without_failed_attempt(
    api_context: tuple[TestClient, Session],
) -> None:
    client, session = api_context
    run_id = persist_workflow_run(
        session,
        run_id="run_success_for_failure_lookup",
        lead_id="lead_success_for_failure_lookup",
        status=RunStatus.SUCCESS,
        email="success.failure.lookup@example.com",
    )

    response = client.get(f"/leads/runs/{run_id}/failure")

    assert response.status_code == 409


def test_post_retry_failed_run_appends_retried_attempt(
    api_context: tuple[TestClient, Session],
) -> None:
    client, session = api_context
    run_id = persist_workflow_run(
        session,
        run_id="run_retry_failed",
        lead_id="lead_retry_failed",
        status=RunStatus.FAILED,
        email="retry.failed@example.com",
    )

    response = client.post(f"/leads/runs/{run_id}/retry")

    assert response.status_code == 200
    data = response.json()
    stored_run = session.get(AutomationRunRecord, run_id)
    attempts = session.scalars(
        select(RunAttemptRecord)
        .where(RunAttemptRecord.run_id == run_id)
        .order_by(RunAttemptRecord.attempt_number)
    ).all()
    manual_retry = session.scalar(
        select(AuditRecord).where(
            AuditRecord.run_id == run_id,
            AuditRecord.event_type == "manual_retry",
        )
    )

    assert data["run_status"] == "retried"
    assert data["attempt_count"] == 3
    assert data["latest_attempt_number"] == 3
    assert data["latest_attempt_status"] == "retried"
    assert stored_run is not None
    assert stored_run.status is RunStatus.RETRIED
    assert [attempt.status for attempt in attempts] == [
        RunStatus.QUEUED,
        RunStatus.FAILED,
        RunStatus.RETRIED,
    ]
    assert manual_retry is not None
    assert manual_retry.payload["attempt_number"] == 3


def test_post_retry_queued_run_appends_retried_attempt(
    api_context: tuple[TestClient, Session],
) -> None:
    client, session = api_context
    run_id = persist_workflow_run(
        session,
        run_id="run_retry_queued",
        lead_id="lead_retry_queued",
        status=RunStatus.QUEUED,
        email="retry.queued@example.com",
    )

    response = client.post(f"/leads/runs/{run_id}/retry")

    assert response.status_code == 200
    attempts = session.scalars(
        select(RunAttemptRecord)
        .where(RunAttemptRecord.run_id == run_id)
        .order_by(RunAttemptRecord.attempt_number)
    ).all()
    assert response.json()["attempt_count"] == 2
    assert [attempt.status for attempt in attempts] == [RunStatus.QUEUED, RunStatus.RETRIED]


def test_post_retry_rejects_unknown_run(api_context: tuple[TestClient, Session]) -> None:
    client, _session = api_context

    response = client.post("/leads/runs/run_missing/retry")

    assert response.status_code == 404


def test_post_retry_rejects_successful_run_without_mutating_attempts(
    api_context: tuple[TestClient, Session],
) -> None:
    client, session = api_context
    run_id = persist_workflow_run(
        session,
        run_id="run_retry_success",
        lead_id="lead_retry_success",
        status=RunStatus.SUCCESS,
        email="retry.success@example.com",
    )
    before_attempts = session.scalars(
        select(RunAttemptRecord)
        .where(RunAttemptRecord.run_id == run_id)
        .order_by(RunAttemptRecord.attempt_number)
    ).all()

    response = client.post(f"/leads/runs/{run_id}/retry")

    after_attempts = session.scalars(
        select(RunAttemptRecord)
        .where(RunAttemptRecord.run_id == run_id)
        .order_by(RunAttemptRecord.attempt_number)
    ).all()
    stored_run = session.get(AutomationRunRecord, run_id)
    assert response.status_code == 409
    assert [attempt.status for attempt in after_attempts] == [
        attempt.status for attempt in before_attempts
    ]
    assert stored_run is not None
    assert stored_run.status is RunStatus.SUCCESS


def test_post_retry_rejects_already_retried_run(
    api_context: tuple[TestClient, Session],
) -> None:
    client, session = api_context
    run_id = persist_workflow_run(
        session,
        run_id="run_already_retried",
        lead_id="lead_already_retried",
        status=RunStatus.RETRIED,
        email="already.retried@example.com",
    )

    response = client.post(f"/leads/runs/{run_id}/retry")

    attempts = session.scalars(
        select(RunAttemptRecord)
        .where(RunAttemptRecord.run_id == run_id)
        .order_by(RunAttemptRecord.attempt_number)
    ).all()
    assert response.status_code == 409
    assert [attempt.status for attempt in attempts] == [
        RunStatus.QUEUED,
        RunStatus.FAILED,
        RunStatus.RETRIED,
    ]
