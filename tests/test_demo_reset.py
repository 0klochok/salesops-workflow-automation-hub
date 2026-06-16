from collections.abc import Iterator
from datetime import UTC, datetime
from typing import Any

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


def safe_settings(**overrides: Any) -> Settings:
    values: dict[str, Any] = {
        "APP_ENV": "local",
        "MOCK_MODE": True,
        "CRM_PROVIDER": "mock",
        "SLACK_PROVIDER": "mock",
        "GOOGLE_SHEETS_PROVIDER": "disabled",
        "DATABASE_URL": "postgresql+psycopg://user:pass@localhost:5432/salesops_local",
    }
    values.update(overrides)
    return Settings.model_validate(values)


def add_run(
    session: Session,
    *,
    lead_id: str,
    run_id: str,
    email: str,
    company_domain: str,
    lead_is_demo: bool = False,
    run_is_demo: bool = False,
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
            is_demo=lead_is_demo,
            created_at=created_at,
            updated_at=created_at,
        )
    )
    session.add(
        AutomationRunRecord(
            run_id=run_id,
            lead_id=lead_id,
            status=RunStatus.SUCCESS,
            is_demo=run_is_demo,
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


def run_ids(session: Session) -> set[str]:
    return set(session.scalars(select(AutomationRunRecord.run_id)).all())


def lead_ids(session: Session) -> set[str]:
    return set(session.scalars(select(LeadRecord.lead_id)).all())


def test_demo_reset_dry_run_reports_candidates_without_mutating(session: Session) -> None:
    add_run(
        session,
        lead_id="lead_marked_demo",
        run_id="run_marked_demo",
        email="demo@marked-sales.local",
        company_domain="marked-sales.local",
        lead_is_demo=True,
        run_is_demo=True,
    )
    session.commit()

    result = reset_demo_data(session, apply=False)
    session.commit()

    assert result.applied is False
    assert result.candidate_lead_count == 1
    assert result.candidate_run_count == 1
    assert session.get(LeadRecord, "lead_marked_demo") is not None
    assert session.get(AutomationRunRecord, "run_marked_demo") is not None
    assert not session.scalars(
        select(AutomationRunRecord.run_id).where(AutomationRunRecord.run_id.in_(DEMO_RUN_IDS))
    ).all()


def test_demo_reset_apply_deletes_marked_demo_data_and_preserves_non_demo(
    session: Session,
) -> None:
    add_run(
        session,
        lead_id="lead_marked_demo",
        run_id="run_marked_demo",
        email="demo@marked-sales.local",
        company_domain="marked-sales.local",
        lead_is_demo=True,
        run_is_demo=True,
    )
    add_run(
        session,
        lead_id="lead_non_demo",
        run_id="run_non_demo",
        email="buyer@acme-sales.com",
        company_domain="acme-sales.com",
    )
    session.commit()

    result = reset_demo_data(session, apply=True)
    session.commit()

    assert result.applied is True
    assert result.candidate_lead_count == 1
    assert result.candidate_run_count == 1
    assert "lead_marked_demo" not in lead_ids(session)
    assert "run_marked_demo" not in run_ids(session)
    assert "lead_non_demo" in lead_ids(session)
    assert "run_non_demo" in run_ids(session)
    assert not session.scalars(
        select(RunAttemptRecord).where(RunAttemptRecord.run_id == "run_marked_demo")
    ).all()
    assert not session.scalars(
        select(AuditRecord).where(AuditRecord.run_id == "run_marked_demo")
    ).all()


def test_demo_reset_reseeds_canonical_demo_rows_with_markers(session: Session) -> None:
    result = reset_demo_data(session, apply=True)
    session.commit()

    assert result.seeded_run_ids == DEMO_RUN_IDS
    for run_id in DEMO_RUN_IDS:
        run = session.get(AutomationRunRecord, run_id)
        assert run is not None
        assert run.is_demo is True

        lead = session.get(LeadRecord, run.lead_id)
        assert lead is not None
        assert lead.is_demo is True


def test_demo_reset_keeps_legacy_reserved_domain_cleanup_narrow(session: Session) -> None:
    add_run(
        session,
        lead_id="lead_legacy_demo",
        run_id="run_legacy_demo",
        email="legacy@example.test",
        company_domain="legacy.example",
    )
    add_run(
        session,
        lead_id="lead_non_demo",
        run_id="run_non_demo",
        email="buyer@acme-sales.com",
        company_domain="acme-sales.com",
    )
    session.commit()

    result = reset_demo_data(session, apply=True)
    session.commit()

    assert result.candidate_lead_count == 1
    assert result.candidate_run_count == 1
    assert "lead_legacy_demo" not in lead_ids(session)
    assert "run_legacy_demo" not in run_ids(session)
    assert "lead_non_demo" in lead_ids(session)
    assert "run_non_demo" in run_ids(session)


def test_demo_reset_is_idempotent(session: Session) -> None:
    first_result = reset_demo_data(session, apply=True)
    session.commit()
    first_snapshot = tuple(
        session.execute(
            select(
                AutomationRunRecord.run_id,
                AutomationRunRecord.lead_id,
                AutomationRunRecord.status,
                AutomationRunRecord.is_demo,
            ).order_by(AutomationRunRecord.run_id)
        ).all()
    )

    second_result = reset_demo_data(session, apply=True)
    session.commit()
    second_snapshot = tuple(
        session.execute(
            select(
                AutomationRunRecord.run_id,
                AutomationRunRecord.lead_id,
                AutomationRunRecord.status,
                AutomationRunRecord.is_demo,
            ).order_by(AutomationRunRecord.run_id)
        ).all()
    )

    assert first_result.seeded_run_ids == DEMO_RUN_IDS
    assert second_result.candidate_lead_count == len(DEMO_RUN_IDS)
    assert second_result.candidate_run_count == len(DEMO_RUN_IDS)
    assert second_result.seeded_run_ids == DEMO_RUN_IDS
    assert first_snapshot == second_snapshot
    assert run_ids(session) == set(DEMO_RUN_IDS)


def test_demo_reset_restores_canonical_failed_run_after_retry_mutation(
    session: Session,
) -> None:
    reset_demo_data(session, apply=True)
    session.commit()

    retry_time = datetime(2026, 6, 10, 12, 5, tzinfo=UTC)
    failed_run = session.get(AutomationRunRecord, "run_demo_failed")
    assert failed_run is not None
    failed_run.status = RunStatus.RETRIED
    failed_run.updated_at = retry_time
    session.add(
        RunAttemptRecord(
            run_id="run_demo_failed",
            attempt_number=3,
            status=RunStatus.RETRIED,
            suggested_action="Re-run the local mock workflow for this lead.",
            created_at=retry_time,
        )
    )
    session.add(
        AuditRecord(
            audit_id="audit_run_demo_failed_manual_retry",
            lead_id=failed_run.lead_id,
            run_id="run_demo_failed",
            event_type="manual_retry",
            payload={
                "run_id": "run_demo_failed",
                "lead_id": failed_run.lead_id,
                "status": RunStatus.RETRIED.value,
                "attempt_number": 3,
                "attempt_status": RunStatus.RETRIED.value,
            },
            created_at=retry_time,
        )
    )
    session.commit()

    mutated_attempt_statuses = session.scalars(
        select(RunAttemptRecord.status)
        .where(RunAttemptRecord.run_id == "run_demo_failed")
        .order_by(RunAttemptRecord.attempt_number)
    ).all()
    assert failed_run.status is RunStatus.RETRIED
    assert mutated_attempt_statuses == [
        RunStatus.QUEUED,
        RunStatus.FAILED,
        RunStatus.RETRIED,
    ]

    result = reset_demo_data(session, apply=True)
    session.commit()

    restored_failed_run = session.get(AutomationRunRecord, "run_demo_failed")
    assert restored_failed_run is not None
    restored_attempt_statuses = session.scalars(
        select(RunAttemptRecord.status)
        .where(RunAttemptRecord.run_id == "run_demo_failed")
        .order_by(RunAttemptRecord.attempt_number)
    ).all()
    manual_retry_events = session.scalars(
        select(AuditRecord).where(
            AuditRecord.run_id == "run_demo_failed",
            AuditRecord.event_type == "manual_retry",
        )
    ).all()

    assert result.seeded_run_ids == DEMO_RUN_IDS
    assert restored_failed_run.status is RunStatus.FAILED
    assert restored_attempt_statuses == [RunStatus.QUEUED, RunStatus.FAILED]
    assert manual_retry_events == []


@pytest.mark.parametrize(
    ("overrides", "match"),
    [
        ({"APP_ENV": "production"}, "APP_ENV"),
        ({"MOCK_MODE": False}, "MOCK_MODE"),
        ({"CRM_PROVIDER": "hubspot"}, "CRM_PROVIDER"),
        ({"SLACK_PROVIDER": "slack"}, "SLACK_PROVIDER"),
        ({"GOOGLE_SHEETS_PROVIDER": "google"}, "GOOGLE_SHEETS_PROVIDER"),
        ({"DATABASE_URL": None}, "DATABASE_URL"),
        (
            {"DATABASE_URL": ("postgresql+psycopg://user:pass@db.example.com:5432/salesops_local")},
            "host",
        ),
        (
            {"DATABASE_URL": ("postgresql+psycopg://user:pass@localhost:5432/salesops_prod")},
            "database",
        ),
        ({"DATABASE_URL": "mysql://user:pass@localhost:3306/salesops_local"}, "driver"),
    ],
)
def test_demo_reset_safety_rejects_unsafe_settings(
    overrides: dict[str, Any],
    match: str,
) -> None:
    with pytest.raises(DemoResetSafetyError, match=match):
        validate_demo_reset_safety(safe_settings(**overrides))


def test_demo_reset_safety_accepts_local_mock_database() -> None:
    validate_demo_reset_safety(safe_settings())
