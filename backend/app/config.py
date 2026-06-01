from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Local-safe application settings loaded from environment variables."""

    app_env: str = Field(default="local", validation_alias="APP_ENV")
    service_name: str = Field(
        default="salesops-workflow-automation-hub",
        validation_alias="SERVICE_NAME",
    )
    mock_mode: bool = Field(default=True, validation_alias="MOCK_MODE")
    crm_provider: str = Field(default="mock", validation_alias="CRM_PROVIDER")
    slack_provider: str = Field(default="mock", validation_alias="SLACK_PROVIDER")
    google_sheets_provider: str = Field(
        default="disabled",
        validation_alias="GOOGLE_SHEETS_PROVIDER",
    )
    database_url: str | None = Field(default=None, validation_alias="DATABASE_URL")
    default_timezone: str = Field(default="Europe/Kiev", validation_alias="DEFAULT_TIMEZONE")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


def clear_settings_cache() -> None:
    get_settings.cache_clear()
