from collections.abc import Iterator
from datetime import UTC, datetime

import pytest
from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session

from backend.app.config import Settings
from backend.app.db import Base
from backend.app.leads.demo_reset import (
    DemoResetSafetyError,
    reset_demo_data,
    validate_demo_reset_safety,
)
from backend.app.leads.demo_seed import DEMO_RUN_IDS
from backend.app.leads.models import RunStatus
from backend.app.leads.persistence import (
    AuditRecord,
    AutomationRunRecord,
    LeadRecord,
    RunAttemptRecord,
)
from backend.app.leads.schemas import LeadSource


@pytest.fixture
def session() -> Iterator[Session]:
    engine = create_engine("sqlite+pysqlite:///:memory:")
    Base.metadata.create_all(engine)
    with Session(engine) as session:
        yield session


def add_run(
    session: Session,
    *,
    lead_id: str,
    run_id: str,
    email: str,
    company_domain: str,
) -> None:
    created_at = datetime(2026, 6, 10, 12, 0, tzinfo=UTC)
    session.add(
        LeadRecord(
            lead_id=lead_id,
            email=email,
            first_name="Local",
            last_name="Smoke",
            company_name="Synthetic Co",
            company_domain=company_domain,
            source=LeadSource.DEMO_FORM,
            lead_score=80,
            created_at=created_at,
            updated_at=created_at,
        )
    )
    session.add(
        AutomationRunRecord(
            run_id=run_id,
            lead_id=lead_id,
            status=RunStatus.SUCCESS,
            created_at=created_at,
            updated_at=created_at,
        )
    )
    session.add(
        RunAttemptRecord(
            run_id=run_id,
            attempt_number=1,
            status=RunStatus.SUCCESS,
            created_at=created_at,
        )
    )
    session.add(
        AuditRecord(
            audit_id=f"audit_{run_id}",
            lead_id=lead_id,
            run_id=run_id,
            event_type="lead_intake",
            payload={
                "email": email,
                "company_domain": company_domain,
                "source": LeadSource.DEMO_FORM.value,
            },
            created_at=created_at,
        )
    )


def test_demo_reset_dry_run_reports_candidates_without_mutating(session: Session) -> None:
    add_run(
        session,
        lead_id="lead_synthetic",
        run_id="run_synthetic",
        email="codex.smoke@example.test",
        company_domain="smoke.example",
    )
    session.commit()

    result = reset_demo_data(session, apply=False)
    session.commit()

    assert result.applied is False
    assert result.candidate_lead_count == 1
    assert result.candidate_run_count == 1
    assert session.get(AutomationRunRecord, "run_synthetic") is not None
    assert not session.scalars(
        select(AutomationRunRecord.run_id).where(AutomationRunRecord.run_id.in_(DEMO_RUN_IDS))
    ).all()


def test_demo_reset_deletes_reserved_synthetic_rows_and_reseeds(session: Session) -> None:
    add_run(
        session,
        lead_id="lead_synthetic",
        run_id="run_synthetic",
        email="browser-smoke@example.com",
        company_domain="browser-smoke.example",
    )
    add_run(
        session,
        lead_id="lead_non_synthetic",
        run_id="run_non_synthetic",
        email="buyer@acme-sales.com",
        company_domain="acme-sales.com",
    )
    session.commit()

    result = reset_demo_data(session, apply=True)
    session.commit()

    run_ids = set(session.scalars(select(AutomationRunRecord.run_id)).all())
    lead_ids = set(session.scalars(select(LeadRecord.lead_id)).all())

    assert result.applied is True
    assert result.candidate_lead_count == 1
    assert result.candidate_run_count == 1
    assert "run_synthetic" not in run_ids
    assert "lead_synthetic" not in lead_ids
    assert "run_non_synthetic" in run_ids
    assert "lead_non_synthetic" in lead_ids
    assert set(DEMO_RUN_IDS).issubset(run_ids)
    assert len(run_ids) == 1 + len(DEMO_RUN_IDS)


def test_demo_reset_safety_rejects_non_local_environment() -> None:
    settings = Settings.model_validate(
        {
            "APP_ENV": "production",
            "MOCK_MODE": True,
            "CRM_PROVIDER": "mock",
            "SLACK_PROVIDER": "mock",
            "GOOGLE_SHEETS_PROVIDER": "disabled",
            "DATABASE_URL": "postgresql+psycopg://user:pass@localhost:5432/salesops_local",
        }
    )

    with pytest.raises(DemoResetSafetyError, match="APP_ENV"):
        validate_demo_reset_safety(settings)


def test_demo_reset_safety_rejects_non_local_database_host() -> None:
    settings = Settings.model_validate(
        {
            "APP_ENV": "local",
            "MOCK_MODE": True,
            "CRM_PROVIDER": "mock",
            "SLACK_PROVIDER": "mock",
            "GOOGLE_SHEETS_PROVIDER": "disabled",
            "DATABASE_URL": "postgresql+psycopg://user:pass@db.example.com:5432/salesops_local",
        }
    )

    with pytest.raises(DemoResetSafetyError, match="host"):
        validate_demo_reset_safety(settings)


def test_demo_reset_safety_accepts_local_mock_database() -> None:
    settings = Settings.model_validate(
        {
            "APP_ENV": "local",
            "MOCK_MODE": True,
            "CRM_PROVIDER": "mock",
            "SLACK_PROVIDER": "mock",
            "GOOGLE_SHEETS_PROVIDER": "disabled",
            "DATABASE_URL": "postgresql+psycopg://user:pass@localhost:5432/salesops_local",
        }
    )

    validate_demo_reset_safety(settings)
