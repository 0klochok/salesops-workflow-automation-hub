from typing import Annotated

from fastapi import APIRouter, Depends, status

from backend.app.leads.schemas import LeadIntakeRequest, LeadIntakeResponse
from backend.app.leads.service import LeadIntakeService

router = APIRouter(prefix="/leads", tags=["leads"])


def get_lead_intake_service() -> LeadIntakeService:
    return LeadIntakeService()


@router.post(
    "/intake",
    response_model=LeadIntakeResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_lead_intake(
    payload: LeadIntakeRequest,
    service: Annotated[LeadIntakeService, Depends(get_lead_intake_service)],
) -> LeadIntakeResponse:
    return service.process_intake(payload)
