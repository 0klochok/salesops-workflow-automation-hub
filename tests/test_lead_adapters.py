from backend.app.leads.adapters import MockCrmAdapter, MockSlackNotifier
from backend.app.leads.models import DedupeResult, DedupeStatus
from backend.app.leads.schemas import LeadIntakeRequest


def lead_request() -> LeadIntakeRequest:
    return LeadIntakeRequest.model_validate(
        {
            "email": "ada@example.com",
            "first_name": "Ada",
            "last_name": "Lovelace",
            "company_name": "Example Co",
            "company_domain": "example.com",
            "source": "demo_form",
            "lead_score": 90,
        }
    )


def test_mock_crm_adapter_returns_deterministic_local_result() -> None:
    adapter = MockCrmAdapter()
    dedupe = DedupeResult(status=DedupeStatus.UNIQUE)
    lead = lead_request()

    first = adapter.upsert_lead(lead=lead, lead_id="lead_demo", dedupe=dedupe)
    second = adapter.upsert_lead(lead=lead, lead_id="lead_demo", dedupe=dedupe)

    assert first == second
    assert first.adapter == "mock_crm"
    assert first.action == "created"
    assert first.contact_id.startswith("mock_contact_")
    assert first.deal_id.startswith("mock_deal_")
    assert "http" not in first.model_dump_json()


def test_mock_crm_adapter_updates_email_duplicates() -> None:
    adapter = MockCrmAdapter()
    dedupe = DedupeResult(
        status=DedupeStatus.DUPLICATE_EMAIL,
        matched_lead_id="lead_existing",
        matched_fields=("email",),
    )

    result = adapter.upsert_lead(lead=lead_request(), lead_id="lead_demo", dedupe=dedupe)

    assert result.action == "updated"


def test_mock_slack_notifier_returns_deterministic_local_result() -> None:
    notifier = MockSlackNotifier()
    lead = lead_request()

    first = notifier.notify_qualified_lead(lead=lead, lead_id="lead_demo", run_id="run_demo")
    second = notifier.notify_qualified_lead(lead=lead, lead_id="lead_demo", run_id="run_demo")

    assert first == second
    assert first.adapter == "mock_slack"
    assert first.notification_id.startswith("mock_slack_")
    assert first.channel == "mock-salesops-alerts"
    assert first.delivered is True
    assert "http" not in first.model_dump_json()
