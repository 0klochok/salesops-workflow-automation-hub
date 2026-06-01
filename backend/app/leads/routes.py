from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.db import get_db_session
from backend.app.leads.persistence import LeadPersistenceRepository
from backend.app.leads.retry import RetryPolicy
from backend.app.leads.schemas import (
    FailureDetailResponse,
    LeadIntakeRequest,
    LeadIntakeResponse,
    RetryRunResponse,
)
from backend.app.leads.service import LeadIntakeService

router = APIRouter(prefix="/leads", tags=["leads"])


@router.post(
    "/intake",
    response_model=LeadIntakeResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_lead_intake(
    payload: LeadIntakeRequest,
    session: Annotated[Session, Depends(get_db_session)],
) -> LeadIntakeResponse:
    repository = LeadPersistenceRepository(session)
    service = LeadIntakeService(existing_leads=repository.list_lead_snapshots())
    result = service.process_intake_workflow(payload)
    repository.record_workflow_result(
        lead=payload,
        run=result.run,
        dedupe=result.dedupe,
        crm=result.crm,
        slack=result.slack,
    )
    return result.response


@router.get(
    "/runs/{run_id}/failure",
    response_model=FailureDetailResponse,
)
def get_run_failure_detail(
    run_id: str,
    session: Annotated[Session, Depends(get_db_session)],
) -> FailureDetailResponse:
    repository = LeadPersistenceRepository(session)
    run = repository.get_run(run_id)
    if run is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Automation run not found",
        )

    failed_attempt = repository.get_latest_failed_attempt(run)
    if failed_attempt is None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Automation run has no persisted failed attempt",
        )

    return FailureDetailResponse(
        run_id=run.run_id,
        lead_id=run.lead_id,
        run_status=run.status,
        failed_attempt_number=failed_attempt.attempt_number,
        error_type=failed_attempt.error_type,
        error_message=failed_attempt.error_message,
        suggested_action=failed_attempt.suggested_action,
        payload=repository.get_sanitized_intake_payload(run.run_id),
    )


@router.post(
    "/runs/{run_id}/retry",
    response_model=RetryRunResponse,
)
def retry_run(
    run_id: str,
    session: Annotated[Session, Depends(get_db_session)],
) -> RetryRunResponse:
    repository = LeadPersistenceRepository(session)
    run = repository.get_run(run_id)
    if run is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Automation run not found",
        )

    try:
        retried_run = RetryPolicy().retry(run)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        ) from exc

    repository.record_manual_retry(retried_run)
    latest_attempt = retried_run.attempts[-1]
    return RetryRunResponse(
        run_id=retried_run.run_id,
        lead_id=retried_run.lead_id,
        run_status=retried_run.status,
        attempt_count=len(retried_run.attempts),
        latest_attempt_number=latest_attempt.attempt_number,
        latest_attempt_status=latest_attempt.status,
    )
