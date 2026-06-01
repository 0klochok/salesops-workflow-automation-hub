from backend.app.leads.models import AutomationRun, ErrorType, RunAttempt, RunStatus


class LocalRunLog:
    def create_run(self, run_id: str, lead_id: str) -> AutomationRun:
        return AutomationRun(
            run_id=run_id,
            lead_id=lead_id,
            status=RunStatus.QUEUED,
            attempts=(
                RunAttempt(
                    attempt_number=1,
                    status=RunStatus.QUEUED,
                ),
            ),
        )

    def record_success(self, run: AutomationRun) -> AutomationRun:
        return self._append_attempt(run=run, status=RunStatus.SUCCESS)

    def record_failure(
        self,
        run: AutomationRun,
        error_type: ErrorType,
        error_message: str,
        suggested_action: str,
    ) -> AutomationRun:
        return self._append_attempt(
            run=run,
            status=RunStatus.FAILED,
            error_type=error_type,
            error_message=error_message,
            suggested_action=suggested_action,
        )

    def _append_attempt(
        self,
        run: AutomationRun,
        status: RunStatus,
        error_type: ErrorType | None = None,
        error_message: str | None = None,
        suggested_action: str | None = None,
    ) -> AutomationRun:
        attempt = RunAttempt(
            attempt_number=len(run.attempts) + 1,
            status=status,
            error_type=error_type,
            error_message=error_message,
            suggested_action=suggested_action,
        )
        return run.model_copy(
            update={
                "status": status,
                "attempts": (*run.attempts, attempt),
            }
        )
