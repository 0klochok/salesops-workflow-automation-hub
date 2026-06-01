import re
from enum import StrEnum

from pydantic import BaseModel, ConfigDict, Field, field_validator

from backend.app.leads.models import (
    CrmUpsertResult,
    DedupeResult,
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
