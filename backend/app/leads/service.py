from collections.abc import Sequence
from dataclasses import dataclass

from backend.app.leads.adapters import CrmAdapter, MockCrmAdapter, MockSlackNotifier, SlackNotifier
from backend.app.leads.dedupe import DedupeService, LeadSnapshot
from backend.app.leads.identifiers import deterministic_id
from backend.app.leads.models import (
    AutomationRun,
    CrmUpsertResult,
    DedupeResult,
    SlackNotificationResult,
)
from backend.app.leads.run_log import LocalRunLog
from backend.app.leads.schemas import LeadIntakeRequest, LeadIntakeResponse

QUALIFIED_LEAD_SCORE = 70


@dataclass(frozen=True)
class LeadWorkflowResult:
    response: LeadIntakeResponse
    run: AutomationRun
    dedupe: DedupeResult
    crm: CrmUpsertResult
    slack: SlackNotificationResult | None


class LeadIntakeService:
    def __init__(
        self,
        existing_leads: Sequence[LeadSnapshot] | None = None,
        dedupe_service: DedupeService | None = None,
        crm_adapter: CrmAdapter | None = None,
        slack_notifier: SlackNotifier | None = None,
        run_log: LocalRunLog | None = None,
    ) -> None:
        self._dedupe_service = dedupe_service or DedupeService(existing_leads)
        self._crm_adapter = crm_adapter or MockCrmAdapter()
        self._slack_notifier = slack_notifier or MockSlackNotifier()
        self._run_log = run_log or LocalRunLog()

    def process_intake(self, lead: LeadIntakeRequest) -> LeadIntakeResponse:
        return self.process_intake_workflow(lead).response

    def process_intake_workflow(self, lead: LeadIntakeRequest) -> LeadWorkflowResult:
        lead_id = deterministic_id("lead", lead.email, lead.company_domain)
        run_id = deterministic_id("run", lead_id, lead.source.value)
        run = self._run_log.create_run(run_id=run_id, lead_id=lead_id)
        dedupe = self._dedupe_service.check(lead)

        crm_result = self._crm_adapter.upsert_lead(
            lead=lead,
            lead_id=lead_id,
            dedupe=dedupe,
        )
        slack_result = None
        if lead.lead_score >= QUALIFIED_LEAD_SCORE:
            slack_result = self._slack_notifier.notify_qualified_lead(
                lead=lead,
                lead_id=lead_id,
                run_id=run_id,
            )

        succeeded_run = self._run_log.record_success(run)
        response = LeadIntakeResponse(
            lead_id=lead_id,
            run_id=run_id,
            run_status=succeeded_run.status,
            dedupe=dedupe,
            crm=crm_result,
            slack=slack_result,
        )
        return LeadWorkflowResult(
            response=response,
            run=succeeded_run,
            dedupe=dedupe,
            crm=crm_result,
            slack=slack_result,
        )
