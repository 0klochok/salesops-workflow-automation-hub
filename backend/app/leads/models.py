from enum import StrEnum
from typing import Self

from pydantic import BaseModel, ConfigDict, Field, model_validator


class DedupeStatus(StrEnum):
    UNIQUE = "unique"
    DUPLICATE_EMAIL = "duplicate_email"
    POSSIBLE_DUPLICATE_DOMAIN = "possible_duplicate_domain"


class DedupeResult(BaseModel):
    status: DedupeStatus
    is_duplicate: bool = False
    matched_lead_id: str | None = None
    matched_fields: tuple[str, ...] = Field(default_factory=tuple)

    model_config = ConfigDict(frozen=False)

    @model_validator(mode="after")
    def sync_duplicate_flag(self) -> Self:
        self.is_duplicate = self.status is DedupeStatus.DUPLICATE_EMAIL
        return self


class CrmAction(StrEnum):
    CREATED = "created"
    UPDATED = "updated"


class CrmUpsertResult(BaseModel):
    adapter: str
    action: CrmAction
    contact_id: str
    deal_id: str

    model_config = ConfigDict(frozen=True)


class SlackNotificationResult(BaseModel):
    adapter: str
    notification_id: str
    channel: str
    message_preview: str
    delivered: bool

    model_config = ConfigDict(frozen=True)


class RunStatus(StrEnum):
    QUEUED = "queued"
    SUCCESS = "success"
    FAILED = "failed"
    RETRIED = "retried"


class ErrorType(StrEnum):
    VALIDATION = "validation"
    ADAPTER = "adapter"
    UNKNOWN = "unknown"


class RunAttempt(BaseModel):
    attempt_number: int = Field(ge=1)
    status: RunStatus
    error_type: ErrorType | None = None
    error_message: str | None = None
    suggested_action: str | None = None

    model_config = ConfigDict(frozen=True)


class AutomationRun(BaseModel):
    run_id: str
    lead_id: str
    status: RunStatus
    attempts: tuple[RunAttempt, ...]

    model_config = ConfigDict(frozen=True)
