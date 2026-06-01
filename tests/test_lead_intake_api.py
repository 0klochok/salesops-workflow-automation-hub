from fastapi.testclient import TestClient

from backend.app.main import app


def qualified_payload() -> dict[str, object]:
    return {
        "email": "Ada@Example.COM",
        "first_name": "Ada",
        "last_name": "Lovelace",
        "company_name": "Example Co",
        "company_domain": "www.example.com",
        "source": "demo_form",
        "lead_score": 90,
    }


def test_post_lead_intake_processes_qualified_lead_deterministically() -> None:
    client = TestClient(app)

    first = client.post("/leads/intake", json=qualified_payload())
    second = client.post("/leads/intake", json=qualified_payload())

    assert first.status_code == 201
    assert second.status_code == 201
    assert first.json() == second.json()
    data = first.json()
    assert data["lead_id"].startswith("lead_")
    assert data["run_id"].startswith("run_")
    assert data["run_status"] == "success"
    assert data["dedupe"]["status"] == "unique"
    assert data["crm"]["adapter"] == "mock_crm"
    assert data["crm"]["action"] == "created"
    assert data["slack"]["adapter"] == "mock_slack"
    assert "http" not in first.text


def test_post_lead_intake_skips_slack_for_unqualified_lead() -> None:
    client = TestClient(app)
    payload = qualified_payload()
    payload["lead_score"] = 40

    response = client.post("/leads/intake", json=payload)

    assert response.status_code == 201
    assert response.json()["run_status"] == "success"
    assert response.json()["slack"] is None


def test_post_lead_intake_returns_422_for_invalid_payload() -> None:
    client = TestClient(app)
    payload = qualified_payload()
    payload["email"] = "not-an-email"

    response = client.post("/leads/intake", json=payload)

    assert response.status_code == 422
    assert "detail" in response.json()
