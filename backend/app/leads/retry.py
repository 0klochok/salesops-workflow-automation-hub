from backend.app.leads.models import AutomationRun, RunAttempt, RunStatus


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
