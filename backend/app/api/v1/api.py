from fastapi import APIRouter

from ...routers import (
    auth,
    dashboard,
    platforms,
    clients,
    ai_doctor,
    settings,
    alerts_system,
    reports,
    billing_stripe,
    alerts,
    optimizations,
    automations,
    billing,
)

api_router = APIRouter()

# Register all domain routers into the unified V1 API pipeline
api_router.include_router(auth.router)
api_router.include_router(dashboard.router)
api_router.include_router(platforms.router)
api_router.include_router(clients.router)
api_router.include_router(ai_doctor.router)
api_router.include_router(settings.router)
api_router.include_router(alerts_system.router)
api_router.include_router(reports.router)
api_router.include_router(billing_stripe.router)
api_router.include_router(alerts.router)
api_router.include_router(optimizations.router)
api_router.include_router(automations.router)
api_router.include_router(billing.router)
