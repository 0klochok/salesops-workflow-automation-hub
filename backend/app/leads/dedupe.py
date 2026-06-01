from collections.abc import Sequence

from pydantic import BaseModel, ConfigDict, field_validator

from backend.app.leads.models import DedupeResult, DedupeStatus
from backend.app.leads.schemas import (
    LeadIntakeRequest,
    normalize_company_domain,
    normalize_email,
    require_non_empty_text,
)


class LeadSnapshot(BaseModel):
    lead_id: str
    email: str
    company_domain: str

    model_config = ConfigDict(frozen=True, str_strip_whitespace=True)

    @field_validator("lead_id")
    @classmethod
    def validate_lead_id(cls, value: str) -> str:
        return require_non_empty_text(value, "lead_id")

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        return normalize_email(value)

    @field_validator("company_domain")
    @classmethod
    def validate_company_domain(cls, value: str) -> str:
        return normalize_company_domain(value)


class DedupeService:
    def __init__(self, existing_leads: Sequence[LeadSnapshot] | None = None) -> None:
        self._existing_leads = tuple(existing_leads or ())

    def check(self, lead: LeadIntakeRequest) -> DedupeResult:
        for snapshot in self._existing_leads:
            if snapshot.email == lead.email:
                return DedupeResult(
                    status=DedupeStatus.DUPLICATE_EMAIL,
                    matched_lead_id=snapshot.lead_id,
                    matched_fields=("email",),
                )

        for snapshot in self._existing_leads:
            if snapshot.company_domain == lead.company_domain:
                return DedupeResult(
                    status=DedupeStatus.POSSIBLE_DUPLICATE_DOMAIN,
                    matched_lead_id=snapshot.lead_id,
                    matched_fields=("company_domain",),
                )

        return DedupeResult(status=DedupeStatus.UNIQUE)
