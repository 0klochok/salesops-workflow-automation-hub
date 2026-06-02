from __future__ import annotations

import re
from datetime import UTC, datetime
from typing import Any

from sqlalchemy import (
    JSON,
    DateTime,
    ForeignKey,
    Integer,
    String,
    UniqueConstraint,
    delete,
    select,
)
from sqlalchemy import (
    Enum as SqlEnum,
)
from sqlalchemy.orm import Mapped, Session, mapped_column, relationship, selectinload

from backend.app.db import Base
from backend.app.leads.dedupe import LeadSnapshot
from backend.app.leads.identifiers import deterministic_id
from backend.app.leads.models import (
    AutomationRun,
    CrmUpsertResult,
    DedupeResult,
    DedupeStatus,
    ErrorType,
    RunAttempt,
    RunStatus,
    SlackNotificationResult,
)
from backend.app.leads.schemas import (
    LeadIntakeRequest,
    LeadSource,
    RunHistoryAttemptSummary,
    RunHistoryItem,
)


def utc_now() -> datetime:
    return datetime.now(UTC)


def enum_values(enum_class: type[Any]) -> list[str]:
    return [item.value for item in enum_class]


SAFE_LEAD_PAYLOAD_FIELDS = (
    "email",
    "first_name",
    "last_name",
    "company_name",
    "company_domain",
    "source",
    "job_title",
    "lead_score",
)
SENSITIVE_ASSIGNMENT_PATTERN = re.compile(
    r"\b(api[_-]?key|token|secret|password)\s*[:=]\s*([^\s,;]+)",
    flags=re.IGNORECASE,
)
RUN_HISTORY_SUMMARY_MAX_LENGTH = 240


def sanitize_detail_text(value: str | None) -> str | None:
    if value is None:
        return None
    normalized = " ".join(value.split())
    return SENSITIVE_ASSIGNMENT_PATTERN.sub(
        lambda match: f"{match.group(1)}=[redacted]",
        normalized,
    )


def summarize_detail_text(value: str | None) -> str | None:
    sanitized = sanitize_detail_text(value)
    if sanitized is None:
        return None
    if len(sanitized) <= RUN_HISTORY_SUMMARY_MAX_LENGTH:
        return sanitized
    return f"{sanitized[: RUN_HISTORY_SUMMARY_MAX_LENGTH - 3]}..."


def sanitize_intake_payload(payload: dict[str, Any]) -> dict[str, Any]:
    safe_payload: dict[str, Any] = {}
    for field_name in SAFE_LEAD_PAYLOAD_FIELDS:
        if field_name not in payload:
            continue
        value = payload[field_name]
        safe_payload[field_name] = (
            sanitize_detail_text(value) if isinstance(value, str) else value
        )
    return safe_payload


LeadSourceColumn = SqlEnum(
    LeadSource,
    values_callable=enum_values,
    native_enum=False,
    name="lead_source",
)
RunStatusColumn = SqlEnum(
    RunStatus,
    values_callable=enum_values,
    native_enum=False,
    name="run_status",
)
ErrorTypeColumn = SqlEnum(
    ErrorType,
    values_callable=enum_values,
    native_enum=False,
    name="error_type",
)


class LeadRecord(Base):
    __tablename__ = "leads"

    lead_id: Mapped[str] = mapped_column(String(64), primary_key=True)
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True, nullable=False)
    first_name: Mapped[str] = mapped_column(String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(String(100), nullable=False)
    company_name: Mapped[str] = mapped_column(String(200), nullable=False)
    company_domain: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    source: Mapped[LeadSource] = mapped_column(LeadSourceColumn, nullable=False)
    lead_score: Mapped[int] = mapped_column(Integer, nullable=False)
    job_title: Mapped[str | None] = mapped_column(String(200))
    phone: Mapped[str | None] = mapped_column(String(50))
    message: Mapped[str | None] = mapped_column(String(2000))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=utc_now,
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=utc_now,
        onupdate=utc_now,
        nullable=False,
    )

    runs: Mapped[list[AutomationRunRecord]] = relationship(
        back_populates="lead",
        cascade="all, delete-orphan",
    )
    audit_records: Mapped[list[AuditRecord]] = relationship(
        back_populates="lead",
        cascade="all, delete-orphan",
    )


class AutomationRunRecord(Base):
    __tablename__ = "automation_runs"

    run_id: Mapped[str] = mapped_column(String(64), primary_key=True)
    lead_id: Mapped[str] = mapped_column(
        ForeignKey("leads.lead_id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )
    status: Mapped[RunStatus] = mapped_column(RunStatusColumn, index=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=utc_now,
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=utc_now,
        onupdate=utc_now,
        nullable=False,
    )

    lead: Mapped[LeadRecord] = relationship(back_populates="runs")
    attempts: Mapped[list[RunAttemptRecord]] = relationship(
        back_populates="run",
        cascade="all, delete-orphan",
        order_by="RunAttemptRecord.attempt_number",
    )
    audit_records: Mapped[list[AuditRecord]] = relationship(
        back_populates="run",
        cascade="all, delete-orphan",
    )


class RunAttemptRecord(Base):
    __tablename__ = "run_attempts"
    __table_args__ = (UniqueConstraint("run_id", "attempt_number"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    run_id: Mapped[str] = mapped_column(
        ForeignKey("automation_runs.run_id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )
    attempt_number: Mapped[int] = mapped_column(Integer, nullable=False)
    status: Mapped[RunStatus] = mapped_column(RunStatusColumn, nullable=False)
    error_type: Mapped[ErrorType | None] = mapped_column(ErrorTypeColumn)
    error_message: Mapped[str | None] = mapped_column(String(1000))
    suggested_action: Mapped[str | None] = mapped_column(String(1000))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=utc_now,
        nullable=False,
    )

    run: Mapped[AutomationRunRecord] = relationship(back_populates="attempts")


class AuditRecord(Base):
    __tablename__ = "audit_records"

    audit_id: Mapped[str] = mapped_column(String(64), primary_key=True)
    lead_id: Mapped[str] = mapped_column(
        ForeignKey("leads.lead_id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )
    run_id: Mapped[str] = mapped_column(
        ForeignKey("automation_runs.run_id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )
    event_type: Mapped[str] = mapped_column(String(80), index=True, nullable=False)
    payload: Mapped[dict[str, Any]] = mapped_column(JSON, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=utc_now,
        nullable=False,
    )

    lead: Mapped[LeadRecord] = relationship(back_populates="audit_records")
    run: Mapped[AutomationRunRecord] = relationship(back_populates="audit_records")


class LeadPersistenceRepository:
    def __init__(self, session: Session) -> None:
        self._session = session

    def list_lead_snapshots(self) -> tuple[LeadSnapshot, ...]:
        records = self._session.scalars(select(LeadRecord).order_by(LeadRecord.created_at)).all()
        return tuple(
            LeadSnapshot(
                lead_id=record.lead_id,
                email=record.email,
                company_domain=record.company_domain,
            )
            for record in records
        )

    def list_run_history(self) -> tuple[RunHistoryItem, ...]:
        records = self._session.scalars(
            select(AutomationRunRecord)
            .options(
                selectinload(AutomationRunRecord.lead),
                selectinload(AutomationRunRecord.attempts),
            )
            .order_by(AutomationRunRecord.created_at.desc(), AutomationRunRecord.run_id.asc())
        ).all()
        return tuple(self._run_history_from_record(record) for record in records)

    def record_workflow_result(
        self,
        lead: LeadIntakeRequest,
        run: AutomationRun,
        dedupe: DedupeResult,
        crm: CrmUpsertResult,
        slack: SlackNotificationResult | None,
    ) -> None:
        persisted_lead_id = self._resolve_persisted_lead_id(
            requested_lead_id=run.lead_id,
            lead=lead,
            dedupe=dedupe,
        )
        persisted_run = run.model_copy(update={"lead_id": persisted_lead_id})
        self._upsert_lead(persisted_lead_id, lead)
        self._upsert_run(persisted_run)
        self._replace_attempts(persisted_run)
        self._replace_audit_records(
            lead=lead,
            run=persisted_run,
            dedupe=dedupe,
            crm=crm,
            slack=slack,
        )
        self._session.flush()

    def get_run(self, run_id: str) -> AutomationRun | None:
        record = self._session.get(AutomationRunRecord, run_id)
        if record is None:
            return None

        attempts = self._session.scalars(
            select(RunAttemptRecord)
            .where(RunAttemptRecord.run_id == run_id)
            .order_by(RunAttemptRecord.attempt_number)
        ).all()
        return AutomationRun(
            run_id=record.run_id,
            lead_id=record.lead_id,
            status=record.status,
            attempts=tuple(self._run_attempt_from_record(attempt) for attempt in attempts),
        )

    def get_latest_failed_attempt(self, run: AutomationRun) -> RunAttempt | None:
        failed_attempts = tuple(
            attempt for attempt in run.attempts if attempt.status is RunStatus.FAILED
        )
        return failed_attempts[-1] if failed_attempts else None

    def get_sanitized_intake_payload(self, run_id: str) -> dict[str, Any]:
        payload = self._session.scalar(
            select(AuditRecord.payload)
            .where(AuditRecord.run_id == run_id, AuditRecord.event_type == "lead_intake")
            .order_by(AuditRecord.created_at.desc())
        )
        return sanitize_intake_payload(payload or {})

    def record_manual_retry(self, retried_run: AutomationRun) -> None:
        if not retried_run.attempts:
            raise ValueError("Retried automation run must include at least one attempt")

        record = self._session.get(AutomationRunRecord, retried_run.run_id)
        if record is None:
            raise ValueError("Automation run does not exist")

        latest_attempt = retried_run.attempts[-1]
        record.status = retried_run.status
        self._add_attempt_record(run_id=retried_run.run_id, attempt=latest_attempt)
        self._session.add(
            AuditRecord(
                audit_id=deterministic_id(
                    "audit",
                    retried_run.run_id,
                    "manual_retry",
                    str(latest_attempt.attempt_number),
                ),
                lead_id=retried_run.lead_id,
                run_id=retried_run.run_id,
                event_type="manual_retry",
                payload={
                    "run_id": retried_run.run_id,
                    "lead_id": retried_run.lead_id,
                    "status": retried_run.status.value,
                    "attempt_number": latest_attempt.attempt_number,
                    "attempt_status": latest_attempt.status.value,
                    "suggested_action": latest_attempt.suggested_action,
                },
            )
        )
        self._session.flush()

    def _resolve_persisted_lead_id(
        self,
        requested_lead_id: str,
        lead: LeadIntakeRequest,
        dedupe: DedupeResult,
    ) -> str:
        if (
            dedupe.status is DedupeStatus.DUPLICATE_EMAIL
            and dedupe.matched_lead_id is not None
        ):
            return dedupe.matched_lead_id

        existing_lead_id = self._session.scalar(
            select(LeadRecord.lead_id).where(LeadRecord.email == lead.email)
        )
        return existing_lead_id or requested_lead_id

    def _upsert_lead(self, lead_id: str, lead: LeadIntakeRequest) -> None:
        record = self._session.get(LeadRecord, lead_id)
        if record is None:
            record = LeadRecord(lead_id=lead_id)
            self._session.add(record)

        record.email = lead.email
        record.first_name = lead.first_name
        record.last_name = lead.last_name
        record.company_name = lead.company_name
        record.company_domain = lead.company_domain
        record.source = lead.source
        record.lead_score = lead.lead_score
        record.job_title = lead.job_title
        record.phone = lead.phone
        record.message = lead.message

    def _upsert_run(self, run: AutomationRun) -> None:
        record = self._session.get(AutomationRunRecord, run.run_id)
        if record is None:
            record = AutomationRunRecord(run_id=run.run_id, lead_id=run.lead_id)
            self._session.add(record)

        record.lead_id = run.lead_id
        record.status = run.status

    def _replace_attempts(self, run: AutomationRun) -> None:
        self._session.execute(delete(RunAttemptRecord).where(RunAttemptRecord.run_id == run.run_id))
        for attempt in run.attempts:
            self._add_attempt_record(run_id=run.run_id, attempt=attempt)

    def _replace_audit_records(
        self,
        lead: LeadIntakeRequest,
        run: AutomationRun,
        dedupe: DedupeResult,
        crm: CrmUpsertResult,
        slack: SlackNotificationResult | None,
    ) -> None:
        self._session.execute(delete(AuditRecord).where(AuditRecord.run_id == run.run_id))
        events: list[tuple[str, dict[str, Any]]] = [
            ("lead_intake", lead.model_dump(mode="json")),
            ("run_status", run.model_dump(mode="json")),
            ("dedupe", dedupe.model_dump(mode="json")),
            ("crm_upsert", crm.model_dump(mode="json")),
        ]
        if slack is not None:
            events.append(("slack_notification", slack.model_dump(mode="json")))

        for position, (event_type, payload) in enumerate(events, start=1):
            self._session.add(
                AuditRecord(
                    audit_id=deterministic_id("audit", run.run_id, event_type, str(position)),
                    lead_id=run.lead_id,
                    run_id=run.run_id,
                    event_type=event_type,
                    payload=payload,
                )
            )

    def _add_attempt_record(self, run_id: str, attempt: RunAttempt) -> None:
        self._session.add(
            RunAttemptRecord(
                run_id=run_id,
                attempt_number=attempt.attempt_number,
                status=attempt.status,
                error_type=attempt.error_type,
                error_message=sanitize_detail_text(attempt.error_message),
                suggested_action=sanitize_detail_text(attempt.suggested_action),
            )
        )

    def _run_attempt_from_record(self, record: RunAttemptRecord) -> RunAttempt:
        return RunAttempt(
            attempt_number=record.attempt_number,
            status=record.status,
            error_type=record.error_type,
            error_message=sanitize_detail_text(record.error_message),
            suggested_action=sanitize_detail_text(record.suggested_action),
        )

    def _run_history_from_record(self, record: AutomationRunRecord) -> RunHistoryItem:
        attempts = tuple(record.attempts)
        latest_attempt = attempts[-1] if attempts else None
        return RunHistoryItem(
            run_id=record.run_id,
            lead_id=record.lead_id,
            email=record.lead.email,
            company_name=record.lead.company_name,
            company_domain=record.lead.company_domain,
            source=record.lead.source,
            run_status=record.status,
            created_at=record.created_at,
            updated_at=record.updated_at,
            attempt_count=len(attempts),
            latest_attempt=(
                self._run_history_attempt_from_record(latest_attempt)
                if latest_attempt is not None
                else None
            ),
            failure_detail_available=any(
                attempt.status is RunStatus.FAILED for attempt in attempts
            ),
        )

    def _run_history_attempt_from_record(
        self,
        record: RunAttemptRecord,
    ) -> RunHistoryAttemptSummary:
        summary = (
            summarize_detail_text(record.error_message or record.suggested_action)
            or f"Latest attempt recorded as {record.status.value}."
        )
        return RunHistoryAttemptSummary(
            attempt_number=record.attempt_number,
            status=record.status,
            error_type=record.error_type,
            summary=summary,
            created_at=record.created_at,
        )
