import pytest
from pydantic import ValidationError

from backend.app.leads.schemas import LeadIntakeRequest, LeadSource


def valid_payload() -> dict[str, object]:
    return {
        "email": "Ada@Example.COM ",
        "first_name": " Ada ",
        "last_name": " Lovelace ",
        "company_name": " Example Co ",
        "company_domain": " WWW.Example.COM ",
        "source": "demo_form",
        "job_title": " Founder ",
        "phone": "",
        "message": " Interested in workflow automation. ",
        "lead_score": 80,
    }


def test_lead_intake_request_normalizes_local_fields() -> None:
    request = LeadIntakeRequest.model_validate(valid_payload())

    assert request.email == "ada@example.com"
    assert request.first_name == "Ada"
    assert request.last_name == "Lovelace"
    assert request.company_name == "Example Co"
    assert request.company_domain == "example.com"
    assert request.source is LeadSource.DEMO_FORM
    assert request.job_title == "Founder"
    assert request.phone is None
    assert request.message == "Interested in workflow automation."
    assert request.lead_score == 80


@pytest.mark.parametrize(
    ("field", "value"),
    [
        ("first_name", " "),
        ("last_name", " "),
        ("company_name", " "),
        ("email", "not-an-email"),
        ("company_domain", "https://example.com/path"),
        ("source", "webhook"),
        ("lead_score", 101),
        ("lead_score", -1),
    ],
)
def test_lead_intake_request_rejects_invalid_payloads(field: str, value: object) -> None:
    payload = valid_payload()
    payload[field] = value

    with pytest.raises(ValidationError):
        LeadIntakeRequest.model_validate(payload)


def test_lead_intake_request_requires_core_fields() -> None:
    payload = valid_payload()
    payload.pop("email")

    with pytest.raises(ValidationError):
        LeadIntakeRequest.model_validate(payload)
