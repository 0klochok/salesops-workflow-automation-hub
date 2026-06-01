from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from backend.app.db import get_db_session
from backend.app.leads.persistence import LeadPersistenceRepository
from backend.app.leads.schemas import LeadIntakeRequest, LeadIntakeResponse
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
