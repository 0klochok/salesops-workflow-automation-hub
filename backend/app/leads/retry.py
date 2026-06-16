from backend.app.config import Settings
from backend.app.leads.models import AutomationRun, RunAttempt, RunStatus

LOCAL_RETRY_APP_ENVS = frozenset({"local", "demo", "test", "development"})


class RetrySafetyError(RuntimeError):
    """Raised when manual retry is not safe for the current environment."""


def validate_retry_safety(settings: Settings) -> None:
    app_env = settings.app_env.strip().lower()
    if app_env not in LOCAL_RETRY_APP_ENVS:
        raise RetrySafetyError(
            f"APP_ENV must be one of {sorted(LOCAL_RETRY_APP_ENVS)} for manual retry."
        )
    if not settings.mock_mode:
        raise RetrySafetyError("MOCK_MODE must be true for manual retry.")
    if settings.crm_provider.strip().lower() != "mock":
        raise RetrySafetyError("CRM_PROVIDER must be mock for manual retry.")
    if settings.slack_provider.strip().lower() != "mock":
        raise RetrySafetyError("SLACK_PROVIDER must be mock for manual retry.")
    if settings.google_sheets_provider.strip().lower() not in {"disabled", "mock"}:
        raise RetrySafetyError("GOOGLE_SHEETS_PROVIDER must be disabled or mock for manual retry.")


class RetryPolicy:
    def retry(self, run: AutomationRun) -> AutomationRun:
        if run.status not in (RunStatus.FAILED, RunStatus.QUEUED):
            raise ValueError("Only failed or queued automation runs can be retried")

        retry_attempt = RunAttempt(
            attempt_number=len(run.attempts) + 1,
            status=RunStatus.RETRIED,
            suggested_action="Re-run the local mock workflow for this lead.",
        )
        return run.model_copy(
            update={
                "status": RunStatus.RETRIED,
                "attempts": (*run.attempts, retry_attempt),
            }
        )
