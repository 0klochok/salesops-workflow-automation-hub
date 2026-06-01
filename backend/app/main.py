from fastapi import FastAPI

from backend.app.health import router as health_router
from backend.app.leads.routes import router as leads_router


def create_app() -> FastAPI:
    application = FastAPI(
        title="SalesOps Workflow Automation Hub API",
        version="0.1.0",
        summary="Local-first backend foundation with mocked integrations by default.",
    )
    application.include_router(health_router)
    application.include_router(leads_router)
    return application


app = create_app()
