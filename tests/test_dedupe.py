from backend.app.leads.dedupe import DedupeService, LeadSnapshot
from backend.app.leads.models import DedupeStatus
from backend.app.leads.schemas import LeadIntakeRequest


def lead_payload(email: str, company_domain: str) -> LeadIntakeRequest:
    return LeadIntakeRequest.model_validate(
        {
            "email": email,
            "first_name": "Ada",
            "last_name": "Lovelace",
            "company_name": "Example Co",
            "company_domain": company_domain,
            "source": "demo_form",
            "lead_score": 70,
        }
    )


def test_dedupe_detects_exact_email_match() -> None:
    service = DedupeService(
        [
            LeadSnapshot(
                lead_id="lead_existing",
                email="ADA@example.com",
                company_domain="other.example",
            )
        ]
    )

    result = service.check(lead_payload("ada@example.com", "example.com"))

    assert result.status is DedupeStatus.DUPLICATE_EMAIL
    assert result.is_duplicate is True
    assert result.matched_lead_id == "lead_existing"
    assert result.matched_fields == ("email",)


def test_dedupe_flags_company_domain_match_as_possible_duplicate() -> None:
    service = DedupeService(
        [
            LeadSnapshot(
                lead_id="lead_existing",
                email="other@example.com",
                company_domain="Example.com",
            )
        ]
    )

    result = service.check(lead_payload("ada@example.com", "www.example.com"))

    assert result.status is DedupeStatus.POSSIBLE_DUPLICATE_DOMAIN
    assert result.is_duplicate is False
    assert result.matched_lead_id == "lead_existing"
    assert result.matched_fields == ("company_domain",)


def test_dedupe_reports_unique_when_no_snapshot_matches() -> None:
    service = DedupeService(
        [
            LeadSnapshot(
                lead_id="lead_existing",
                email="other@example.com",
                company_domain="other.example",
            )
        ]
    )

    result = service.check(lead_payload("ada@example.com", "example.com"))

    assert result.status is DedupeStatus.UNIQUE
    assert result.is_duplicate is False
    assert result.matched_lead_id is None
    assert result.matched_fields == ()
