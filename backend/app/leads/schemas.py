import re
from datetime import datetime
from enum import StrEnum
from typing import Any

from pydantic import BaseModel, ConfigDict, Field, field_validator

from backend.app.leads.models import (
    CrmUpsertResult,
    DedupeResult,
    ErrorType,
    RunStatus,
    SlackNotificationResult,
)

EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
DOMAIN_PATTERN = re.compile(r"^(?!-)(?:[a-z0-9-]{1,63}\.)+[a-z]{2,63}$")


class LeadSource(StrEnum):
    DEMO_FORM = "demo_form"
    CSV_UPLOAD = "csv_upload"
    MANUAL = "manual"


def require_non_empty_text(value: str, field_name: str) -> str:
    normalized = value.strip()
    if not normalized:
        raise ValueError(f"{field_name} is required")
    return normalized


def normalize_email(value: str) -> str:
    normalized = value.strip().lower()
    if not EMAIL_PATTERN.fullmatch(normalized):
        raise ValueError("email must be a valid local email address")
    return normalized


def normalize_company_domain(value: str) -> str:
    normalized = value.strip().lower()
    if normalized.startswith("www."):
        normalized = normalized[4:]
    if "://" in normalized or "/" in normalized or "@" in normalized:
        raise ValueError("company_domain must be a domain, not a URL")
    if not DOMAIN_PATTERN.fullmatch(normalized):
        raise ValueError("company_domain must be a valid domain")
    return normalized


class LeadIntakeRequest(BaseModel):
    email: str
    first_name: str
    last_name: str
    company_name: str
    company_domain: str
    source: LeadSource
    job_title: str | None = None
    phone: str | None = None
    message: str | None = None
    lead_score: int = Field(default=0, ge=0, le=100)

    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        return normalize_email(value)

    @field_validator("first_name", "last_name", "company_name")
    @classmethod
    def validate_required_text(cls, value: str, info: object) -> str:
        field_name = getattr(info, "field_name", "field")
        return require_non_empty_text(value, str(field_name))

    @field_validator("company_domain")
    @classmethod
    def validate_company_domain(cls, value: str) -> str:
        return normalize_company_domain(value)

    @field_validator("job_title", "phone", "message", mode="before")
    @classmethod
    def normalize_optional_text(cls, value: object) -> object | None:
        if value is None:
            return None
        if isinstance(value, str):
            normalized = value.strip()
            return normalized if normalized else None
        return value


class LeadIntakeResponse(BaseModel):
    lead_id: str
    run_id: str
    run_status: RunStatus
    dedupe: DedupeResult
    crm: CrmUpsertResult
    slack: SlackNotificationResult | None = None

    model_config = ConfigDict(frozen=True)


class FailureDetailResponse(BaseModel):
    run_id: str
    lead_id: str
    run_status: RunStatus
    failed_attempt_number: int
    error_type: ErrorType | None = None
    error_message: str | None = None
    suggested_action: str | None = None
    payload: dict[str, Any]

    model_config = ConfigDict(frozen=True)


class RetryRunResponse(BaseModel):
    run_id: str
    lead_id: str
    run_status: RunStatus
    attempt_count: int
    latest_attempt_number: int
    latest_attempt_status: RunStatus

    model_config = ConfigDict(frozen=True)


class RunHistoryAttemptSummary(BaseModel):
    attempt_number: int
    status: RunStatus
    error_type: ErrorType | None = None
    summary: str
    created_at: datetime

    model_config = ConfigDict(frozen=True)


class RunHistoryItem(BaseModel):
    run_id: str
    lead_id: str
    email: str
    lead_name: str
    company_name: str
    company_domain: str
    source: LeadSource
    run_status: RunStatus
    created_at: datetime
    updated_at: datetime
    attempt_count: int
    latest_attempt: RunHistoryAttemptSummary | None = None
    failure_detail_available: bool

    model_config = ConfigDict(frozen=True)


class RunHistoryResponse(BaseModel):
    runs: tuple[RunHistoryItem, ...]

    model_config = ConfigDict(frozen=True)


class RunDetailAttempt(BaseModel):
    attempt_number: int
    status: RunStatus
    error_type: ErrorType | None = None
    error_message: str | None = None
    suggested_action: str | None = None
    created_at: datetime

    model_config = ConfigDict(frozen=True)


class RunDetailAuditEvent(BaseModel):
    event_type: str
    payload: dict[str, Any]
    created_at: datetime

    model_config = ConfigDict(frozen=True)


class RunDetailResponse(BaseModel):
    run_id: str
    lead_id: str
    email: str
    company_name: str
    company_domain: str
    source: LeadSource
    run_status: RunStatus
    created_at: datetime
    updated_at: datetime
    attempts: tuple[RunDetailAttempt, ...]
    failure_detail_available: bool
    intake_payload: dict[str, Any]
    audit_events: tuple[RunDetailAuditEvent, ...]

    model_config = ConfigDict(frozen=True)
