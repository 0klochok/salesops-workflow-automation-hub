from pathlib import Path

from fastapi.testclient import TestClient
from pytest import MonkeyPatch

from backend.app.config import clear_settings_cache
from backend.app.main import app


def test_health_endpoint_returns_deterministic_payload(
    monkeypatch: MonkeyPatch,
    tmp_path: Path,
) -> None:
    monkeypatch.chdir(tmp_path)
    monkeypatch.delenv("SERVICE_NAME", raising=False)
    clear_settings_cache()
    client = TestClient(app)

    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "salesops-workflow-automation-hub",
    }
    clear_settings_cache()
