from collections.abc import Iterator

import pytest
from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session

from backend.app.db import Base
from backend.app.leads.adapters import MockCrmAdapter, MockSlackNotifier
from backend.app.leads.dedupe import DedupeService
from backend.app.leads.models import DedupeResult, DedupeStatus, ErrorType, RunStatus
from backend.app.leads.persistence import (
    AuditRecord,
    AutomationRunRecord,
    LeadPersistenceRepository,
    LeadRecord,
    RunAttemptRecord,
)
from backend.app.leads.run_log import LocalRunLog
from backend.app.leads.schemas import LeadIntakeRequest


@pytest.fixture
def session() -> Iterator[Session]:
    engine = create_engine("sqlite+pysqlite:///:memory:")
    Base.metadata.create_all(engine)
    with Session(engine) as session:
        yield session


def lead_request(
    email: str = "Ada@Example.COM",
    company_domain: str = "www.example.com",
) -> LeadIntakeRequest:
    return LeadIntakeRequest.model_validate(
        {
            "email": email,
            "first_name": "Ada",
            "last_name": "Lovelace",
            "company_name": "Example Co",
            "company_domain": company_domain,
            "source": "demo_form",
            "lead_score": 90,
        }
    )


def test_repository_persists_leads_runs_attempts_and_audit_records(session: Session) -> None:
    lead = lead_request()
    run_log = LocalRunLog()
    run = run_log.record_success(run_log.create_run(run_id="run_demo", lead_id="lead_demo"))
    dedupe = DedupeResult(status=DedupeStatus.UNIQUE)
    crm = MockCrmAdapter().upsert_lead(lead=lead, lead_id=run.lead_id, dedupe=dedupe)
    slack = MockSlackNotifier().notify_qualified_lead(
        lead=lead,
        lead_id=run.lead_id,
        run_id=run.run_id,
    )

    LeadPersistenceRepository(session).record_workflow_result(
        lead=lead,
        run=run,
        dedupe=dedupe,
        crm=crm,
        slack=slack,
    )
    session.commit()

    stored_lead = session.get(LeadRecord, "lead_demo")
    stored_run = session.get(AutomationRunRecord, "run_demo")
    attempts = session.scalars(
        select(RunAttemptRecord).order_by(RunAttemptRecord.attempt_number)
    ).all()
    audit_event_types = session.scalars(
        select(AuditRecord.event_type).order_by(AuditRecord.event_type)
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


def test_repository_snapshots_feed_persistent_dedupe(session: Session) -> None:
    lead = lead_request()
    run_log = LocalRunLog()
    run = run_log.record_success(run_log.create_run(run_id="run_demo", lead_id="lead_demo"))
    dedupe = DedupeResult(status=DedupeStatus.UNIQUE)
    crm = MockCrmAdapter().upsert_lead(lead=lead, lead_id=run.lead_id, dedupe=dedupe)

    repository = LeadPersistenceRepository(session)
    repository.record_workflow_result(lead=lead, run=run, dedupe=dedupe, crm=crm, slack=None)
    session.commit()

    snapshots = repository.list_lead_snapshots()
    duplicate_result = DedupeService(snapshots).check(
        lead_request(email="ada@example.com", company_domain="other.example")
    )

    assert duplicate_result.status is DedupeStatus.DUPLICATE_EMAIL
    assert duplicate_result.matched_lead_id == "lead_demo"
    assert duplicate_result.matched_fields == ("email",)


def test_repository_run_history_includes_persisted_lead_summary(session: Session) -> None:
    lead = lead_request()
    run_log = LocalRunLog()
    run = run_log.record_success(run_log.create_run(run_id="run_demo", lead_id="lead_demo"))
    dedupe = DedupeResult(status=DedupeStatus.UNIQUE)
    crm = MockCrmAdapter().upsert_lead(lead=lead, lead_id=run.lead_id, dedupe=dedupe)
    repository = LeadPersistenceRepository(session)

    repository.record_workflow_result(lead=lead, run=run, dedupe=dedupe, crm=crm, slack=None)
    session.commit()

    history = repository.list_run_history()

    assert len(history) == 1
    assert history[0].lead_id == "lead_demo"
    assert history[0].email == "ada@example.com"
    assert history[0].company_name == "Example Co"
    assert history[0].company_domain == "example.com"


def test_repository_reuses_matched_lead_for_duplicate_email(session: Session) -> None:
    repository = LeadPersistenceRepository(session)
    first_lead = lead_request()
    first_run = LocalRunLog().record_success(
        LocalRunLog().create_run(run_id="run_original", lead_id="lead_original")
    )
    first_dedupe = DedupeResult(status=DedupeStatus.UNIQUE)
    first_crm = MockCrmAdapter().upsert_lead(
        lead=first_lead,
        lead_id=first_run.lead_id,
        dedupe=first_dedupe,
    )
    repository.record_workflow_result(
        lead=first_lead,
        run=first_run,
        dedupe=first_dedupe,
        crm=first_crm,
        slack=None,
    )

    duplicate_lead = lead_request(email="ada@example.com", company_domain="new.example")
    duplicate_run = LocalRunLog().record_success(
        LocalRunLog().create_run(run_id="run_duplicate", lead_id="lead_duplicate")
    )
    duplicate_dedupe = DedupeResult(
        status=DedupeStatus.DUPLICATE_EMAIL,
        matched_lead_id="lead_original",
        matched_fields=("email",),
    )
    duplicate_crm = MockCrmAdapter().upsert_lead(
        lead=duplicate_lead,
        lead_id=duplicate_run.lead_id,
        dedupe=duplicate_dedupe,
    )

    repository.record_workflow_result(
        lead=duplicate_lead,
        run=duplicate_run,
        dedupe=duplicate_dedupe,
        crm=duplicate_crm,
        slack=None,
    )
    session.commit()

    leads = session.scalars(select(LeadRecord)).all()
    stored_duplicate_run = session.get(AutomationRunRecord, "run_duplicate")

    assert len(leads) == 1
    assert leads[0].lead_id == "lead_original"
    assert leads[0].company_domain == "new.example"
    assert stored_duplicate_run is not None
    assert stored_duplicate_run.lead_id == "lead_original"


def test_repository_preserves_failure_details_for_failed_runs(session: Session) -> None:
    lead = lead_request()
    run_log = LocalRunLog()
    queued = run_log.create_run(run_id="run_failed", lead_id="lead_failed")
    failed = run_log.record_failure(
        queued,
        error_type=ErrorType.ADAPTER,
        error_message="Mock CRM adapter failed",
        suggested_action="Retry after reviewing the mock adapter payload.",
    )
    dedupe = DedupeResult(status=DedupeStatus.UNIQUE)
    crm = MockCrmAdapter().upsert_lead(lead=lead, lead_id=failed.lead_id, dedupe=dedupe)

    LeadPersistenceRepository(session).record_workflow_result(
        lead=lead,
        run=failed,
        dedupe=dedupe,
        crm=crm,
        slack=None,
    )
    session.commit()

    failed_attempt = session.scalar(
        select(RunAttemptRecord).where(RunAttemptRecord.status == RunStatus.FAILED)
    )

    assert failed_attempt is not None
    assert failed_attempt.error_type is ErrorType.ADAPTER
    assert failed_attempt.error_message == "Mock CRM adapter failed"
    assert failed_attempt.suggested_action == "Retry after reviewing the mock adapter payload."
