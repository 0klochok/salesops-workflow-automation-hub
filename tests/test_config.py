from pathlib import Path

from pytest import MonkeyPatch

from backend.app.config import Settings


def test_settings_default_to_local_mock_mode(monkeypatch: MonkeyPatch, tmp_path: Path) -> None:
    monkeypatch.chdir(tmp_path)
    for name in (
        "APP_ENV",
        "SERVICE_NAME",
        "MOCK_MODE",
        "CRM_PROVIDER",
        "SLACK_PROVIDER",
        "GOOGLE_SHEETS_PROVIDER",
        "DATABASE_URL",
        "DEFAULT_TIMEZONE",
    ):
        monkeypatch.delenv(name, raising=False)

    settings = Settings()

    assert settings.app_env == "local"
    assert settings.service_name == "salesops-workflow-automation-hub"
    assert settings.mock_mode is True
    assert settings.crm_provider == "mock"
    assert settings.slack_provider == "mock"
    assert settings.google_sheets_provider == "disabled"
    assert settings.database_url is None


def test_settings_read_environment_overrides(monkeypatch: MonkeyPatch, tmp_path: Path) -> None:
    monkeypatch.chdir(tmp_path)
    monkeypatch.setenv("APP_ENV", "test")
    monkeypatch.setenv("SERVICE_NAME", "custom-salesops-service")
    monkeypatch.setenv("MOCK_MODE", "false")

    settings = Settings()

    assert settings.app_env == "test"
    assert settings.service_name == "custom-salesops-service"
    assert settings.mock_mode is False
