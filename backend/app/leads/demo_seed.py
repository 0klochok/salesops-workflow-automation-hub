from __future__ import annotations

from dataclasses import dataclass
from datetime import UTC, datetime, timedelta
from typing import Any

from sqlalchemy import delete
from sqlalchemy.orm import Session

from backend.app.db import get_database_session_factory
from backend.app.leads.identifiers import deterministic_id
from backend.app.leads.models import ErrorType, RunStatus
from backend.app.leads.persistence import (
    AuditRecord,
    AutomationRunRecord,
    LeadRecord,
    RunAttemptRecord,
)
from backend.app.leads.schemas import LeadSource


@dataclass(frozen=True)
class DemoLead:
    lead_id: str
    email: str
    first_name: str
    last_name: str
    company_name: str
    company_domain: str
    source: LeadSource
    lead_score: int
    job_title: str | None = None
    phone: str | None = None
    message: str | None = None


@dataclass(frozen=True)
class DemoAttempt:
    attempt_number: int
    status: RunStatus
    created_at: datetime
    error_type: ErrorType | None = None
    error_message: str | None = None
    suggested_action: str | None = None


@dataclass(frozen=True)
class DemoRun:
    run_id: str
    lead: DemoLead
    status: RunStatus
    created_at: datetime
    updated_at: datetime
    attempts: tuple[DemoAttempt, ...]


@dataclass(frozen=True)
class SeedResult:
    run_ids: tuple[str, ...]

    @property
    def run_count(self) -> int:
        return len(self.run_ids)


BASE_TIME = datetime(2026, 6, 1, 9, 0, tzinfo=UTC)

DEMO_SUCCESS = DemoRun(
    run_id="run_demo_success",
    lead=DemoLead(
        lead_id="lead_demo_success",
        email="success.demo@example.com",
        first_name="Sofia",
        last_name="Chen",
        company_name="Northstar Growth",
        company_domain="northstar.example",
        source=LeadSource.DEMO_FORM,
        lead_score=92,
        job_title="VP Marketing",
        phone="555-0101",
        message="Interested in a local automation demo.",
    ),
    status=RunStatus.SUCCESS,
    created_at=BASE_TIME,
    updated_at=BASE_TIME + timedelta(minutes=2),
    attempts=(
        DemoAttempt(1, RunStatus.QUEUED, BASE_TIME),
        DemoAttempt(2, RunStatus.SUCCESS, BASE_TIME + timedelta(minutes=2)),
    ),
)
DEMO_FAILED = DemoRun(
    run_id="run_demo_failed",
    lead=DemoLead(
        lead_id="lead_demo_failed",
        email="failed.demo@example.com",
        first_name="Marcus",
        last_name="Rivera",
        company_name="Pipeline Labs",
        company_domain="pipelinelabs.example",
        source=LeadSource.CSV_UPLOAD,
        lead_score=84,
        job_title="Revenue Operations Lead",
        phone="555-0102",
        message="CSV row should demonstrate a failed mock CRM attempt.",
    ),
    status=RunStatus.FAILED,
    created_at=BASE_TIME,
    updated_at=BASE_TIME + timedelta(minutes=3),
    attempts=(
        DemoAttempt(1, RunStatus.QUEUED, BASE_TIME),
        DemoAttempt(
            2,
            RunStatus.FAILED,
            BASE_TIME + timedelta(minutes=3),
            error_type=ErrorType.ADAPTER,
            error_message="Mock CRM adapter failed while upserting the contact.",
            suggested_action="Review the synthetic CRM payload and retry locally.",
        ),
    ),
)
DEMO_RETRIED = DemoRun(
    run_id="run_demo_retried",
    lead=DemoLead(
        lead_id="lead_demo_retried",
        email="retried.demo@example.com",
        first_name="Elena",
        last_name="Patel",
        company_name="Atlas Demand",
        company_domain="atlasdemand.example",
        source=LeadSource.MANUAL,
        lead_score=76,
        job_title="Demand Generation Manager",
        phone="555-0103",
        message="Manual retry example for the admin run history.",
    ),
    status=RunStatus.RETRIED,
    created_at=BASE_TIME + timedelta(minutes=1),
    updated_at=BASE_TIME + timedelta(minutes=5),
    attempts=(
        DemoAttempt(1, RunStatus.QUEUED, BASE_TIME + timedelta(minutes=1)),
        DemoAttempt(
            2,
            RunStatus.FAILED,
            BASE_TIME + timedelta(minutes=4),
            error_type=ErrorType.ADAPTER,
            error_message="Mock Slack notifier failed in local demo mode.",
            suggested_action="Retry the run after confirming mock notification settings.",
        ),
        DemoAttempt(
            3,
            RunStatus.RETRIED,
            BASE_TIME + timedelta(minutes=5),
            suggested_action="Re-run the local mock workflow for this lead.",
        ),
    ),
)
DEMO_QUEUED = DemoRun(
    run_id="run_demo_queued",
    lead=DemoLead(
        lead_id="lead_demo_queued",
        email="queued.demo@example.com",
        first_name="Noah",
        last_name="Kim",
        company_name="LaunchWorks",
        company_domain="launchworks.example",
        source=LeadSource.DEMO_FORM,
        lead_score=68,
        job_title="Founder",
        phone="555-0104",
        message="Queued example for the admin run history.",
    ),
    status=RunStatus.QUEUED,
    created_at=BASE_TIME + timedelta(minutes=2),
    updated_at=BASE_TIME + timedelta(minutes=2),
    attempts=(DemoAttempt(1, RunStatus.QUEUED, BASE_TIME + timedelta(minutes=2)),),
)

DEMO_RUNS = (DEMO_SUCCESS, DEMO_FAILED, DEMO_RETRIED, DEMO_QUEUED)
DEMO_RUN_IDS = tuple(run.run_id for run in DEMO_RUNS)
DEMO_LEAD_IDS = tuple(run.lead.lead_id for run in DEMO_RUNS)


def seed_demo_data(session: Session) -> SeedResult:
    clear_demo_data(session)
    for run in DEMO_RUNS:
        _add_demo_run(session, run)
    session.flush()
    return SeedResult(run_ids=DEMO_RUN_IDS)


def clear_demo_data(session: Session) -> None:
    session.execute(delete(AuditRecord).where(AuditRecord.run_id.in_(DEMO_RUN_IDS)))
    session.execute(delete(RunAttemptRecord).where(RunAttemptRecord.run_id.in_(DEMO_RUN_IDS)))
    session.execute(delete(AutomationRunRecord).where(AutomationRunRecord.run_id.in_(DEMO_RUN_IDS)))
    session.execute(delete(LeadRecord).where(LeadRecord.lead_id.in_(DEMO_LEAD_IDS)))


def _add_demo_run(session: Session, run: DemoRun) -> None:
    session.add(
        LeadRecord(
            lead_id=run.lead.lead_id,
            email=run.lead.email,
            first_name=run.lead.first_name,
            last_name=run.lead.last_name,
            company_name=run.lead.company_name,
            company_domain=run.lead.company_domain,
            source=run.lead.source,
            lead_score=run.lead.lead_score,
            job_title=run.lead.job_title,
            phone=run.lead.phone,
            message=run.lead.message,
            is_demo=True,
            created_at=run.created_at,
            updated_at=run.updated_at,
        )
    )
    session.add(
        AutomationRunRecord(
            run_id=run.run_id,
            lead_id=run.lead.lead_id,
            status=run.status,
            is_demo=True,
            created_at=run.created_at,
            updated_at=run.updated_at,
        )
    )
    for attempt in run.attempts:
        session.add(
            RunAttemptRecord(
                run_id=run.run_id,
                attempt_number=attempt.attempt_number,
                status=attempt.status,
                error_type=attempt.error_type,
                error_message=attempt.error_message,
                suggested_action=attempt.suggested_action,
                created_at=attempt.created_at,
            )
        )

    for audit_record in _audit_records_for_run(run):
        session.add(audit_record)


def _audit_records_for_run(run: DemoRun) -> tuple[AuditRecord, ...]:
    events: list[tuple[str, dict[str, Any], datetime]] = [
        ("lead_intake", _lead_payload(run.lead), run.created_at),
        ("run_status", _run_payload(run), run.updated_at),
        (
            "dedupe",
            {"status": "unique", "is_duplicate": False, "matched_fields": []},
            run.created_at,
        ),
        (
            "crm_upsert",
            {
                "adapter": "mock_crm",
                "action": "created",
                "contact_id": f"mock_contact_{run.lead.lead_id}",
                "deal_id": f"mock_deal_{run.lead.lead_id}",
            },
            run.updated_at,
        ),
    ]
    if run.status is RunStatus.SUCCESS:
        events.append(
            (
                "slack_notification",
                {
                    "adapter": "mock_slack",
                    "notification_id": f"mock_notification_{run.run_id}",
                    "channel": "#mock-salesops-alerts",
                    "message_preview": f"Qualified lead: {run.lead.email}",
                    "delivered": True,
                },
                run.updated_at,
            )
        )
    if run.status is RunStatus.RETRIED:
        latest_attempt = run.attempts[-1]
        events.append(
            (
                "manual_retry",
                {
                    "run_id": run.run_id,
                    "lead_id": run.lead.lead_id,
                    "status": run.status.value,
                    "attempt_number": latest_attempt.attempt_number,
                    "attempt_status": latest_attempt.status.value,
                    "suggested_action": latest_attempt.suggested_action,
                },
                latest_attempt.created_at,
            )
        )

    return tuple(
        AuditRecord(
            audit_id=deterministic_id("audit", run.run_id, event_type, str(position)),
            lead_id=run.lead.lead_id,
            run_id=run.run_id,
            event_type=event_type,
            payload=payload,
            created_at=created_at,
        )
        for position, (event_type, payload, created_at) in enumerate(events, start=1)
    )


def _lead_payload(lead: DemoLead) -> dict[str, Any]:
    return {
        "email": lead.email,
        "first_name": lead.first_name,
        "last_name": lead.last_name,
        "company_name": lead.company_name,
        "company_domain": lead.company_domain,
        "source": lead.source.value,
        "job_title": lead.job_title,
        "phone": lead.phone,
        "message": lead.message,
        "lead_score": lead.lead_score,
    }


def _run_payload(run: DemoRun) -> dict[str, Any]:
    return {
        "run_id": run.run_id,
        "lead_id": run.lead.lead_id,
        "status": run.status.value,
        "attempts": [
            {
                "attempt_number": attempt.attempt_number,
                "status": attempt.status.value,
                "error_type": attempt.error_type.value if attempt.error_type else None,
                "error_message": attempt.error_message,
                "suggested_action": attempt.suggested_action,
            }
            for attempt in run.attempts
        ],
    }


def main() -> None:
    session_factory = get_database_session_factory()
    with session_factory() as session:
        result = seed_demo_data(session)
        session.commit()
    print(f"Seeded {result.run_count} demo runs: {', '.join(result.run_ids)}")


if __name__ == "__main__":
    main()
