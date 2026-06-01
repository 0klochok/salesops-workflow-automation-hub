from typing import Protocol

from backend.app.leads.identifiers import deterministic_id
from backend.app.leads.models import (
    CrmAction,
    CrmUpsertResult,
    DedupeResult,
    DedupeStatus,
    SlackNotificationResult,
)
from backend.app.leads.schemas import LeadIntakeRequest


class CrmAdapter(Protocol):
    def upsert_lead(
        self,
        lead: LeadIntakeRequest,
        lead_id: str,
        dedupe: DedupeResult,
    ) -> CrmUpsertResult:
        """Create or update a lead in a CRM boundary."""


class SlackNotifier(Protocol):
    def notify_qualified_lead(
        self,
        lead: LeadIntakeRequest,
        lead_id: str,
        run_id: str,
    ) -> SlackNotificationResult:
        """Notify a local-safe Slack boundary for a qualified lead."""


class MockCrmAdapter:
    def upsert_lead(
        self,
        lead: LeadIntakeRequest,
        lead_id: str,
        dedupe: DedupeResult,
    ) -> CrmUpsertResult:
        action = (
            CrmAction.UPDATED
            if dedupe.status is DedupeStatus.DUPLICATE_EMAIL
            else CrmAction.CREATED
        )
        return CrmUpsertResult(
            adapter="mock_crm",
            action=action,
            contact_id=deterministic_id("mock_contact", lead.email),
            deal_id=deterministic_id("mock_deal", lead_id, lead.company_domain),
        )


class MockSlackNotifier:
    def notify_qualified_lead(
        self,
        lead: LeadIntakeRequest,
        lead_id: str,
        run_id: str,
    ) -> SlackNotificationResult:
        return SlackNotificationResult(
            adapter="mock_slack",
            notification_id=deterministic_id("mock_slack", lead_id, run_id),
            channel="mock-salesops-alerts",
            message_preview=(
                f"Qualified lead {lead.first_name} {lead.last_name} from {lead.company_name}"
            ),
            delivered=True,
        )
