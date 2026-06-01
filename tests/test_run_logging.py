import pytest

from backend.app.leads.models import ErrorType, RunStatus
from backend.app.leads.retry import RetryPolicy
from backend.app.leads.run_log import LocalRunLog


def test_local_run_log_records_success_without_persistence() -> None:
    run_log = LocalRunLog()
    queued = run_log.create_run(run_id="run_demo", lead_id="lead_demo")

    succeeded = run_log.record_success(queued)

    assert queued.status is RunStatus.QUEUED
    assert succeeded.status is RunStatus.SUCCESS
    assert [attempt.status for attempt in succeeded.attempts] == [
        RunStatus.QUEUED,
        RunStatus.SUCCESS,
    ]


def test_retry_policy_creates_new_attempt_and_preserves_failure_history() -> None:
    run_log = LocalRunLog()
    queued = run_log.create_run(run_id="run_demo", lead_id="lead_demo")
    failed = run_log.record_failure(
        queued,
        error_type=ErrorType.ADAPTER,
        error_message="Mock CRM adapter failed",
        suggested_action="Retry after reviewing the mock adapter payload.",
    )

    retried = RetryPolicy().retry(failed)

    assert failed.status is RunStatus.FAILED
    assert retried.status is RunStatus.RETRIED
    assert [attempt.status for attempt in retried.attempts] == [
        RunStatus.QUEUED,
        RunStatus.FAILED,
        RunStatus.RETRIED,
    ]
    assert retried.attempts[1].error_message == "Mock CRM adapter failed"
    assert retried.attempts[2].attempt_number == 3


def test_retry_policy_rejects_non_failed_runs() -> None:
    run_log = LocalRunLog()
    queued = run_log.create_run(run_id="run_demo", lead_id="lead_demo")

    with pytest.raises(ValueError, match="failed"):
        RetryPolicy().retry(queued)
