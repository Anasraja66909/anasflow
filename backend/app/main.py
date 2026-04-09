import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from datetime import datetime
from loguru import logger

from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

# Senior Developer Standard: Import centralized core architecture
from app.core.config import settings
from app.api.v1.api import api_router

# ============================================================================
# API INITIALIZATION & TELEMETRY
# ============================================================================

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Unified dashboard for AI Automation Agencies (Highly Secured)",
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

# 1. DDoS & Brute Force Prevention (Rate Limiting)
limiter = Limiter(key_func=get_remote_address, default_limits=["120/minute"])
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

# 2. CORS Matrix Security
if settings.ALLOWED_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.ALLOWED_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# 3. Mount Static Cloud Storage (Logos, PDFs)
UPLOAD_DIR = "uploads/logos"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads/logos", StaticFiles(directory=UPLOAD_DIR), name="logos")

# ============================================================================
# DOMAIN ROUTING REGISTRATION
# ============================================================================

app.include_router(api_router, prefix=settings.API_V1_STR)

# ============================================================================
# SYSTEM HEALTH & ERROR PROTOCOLS
# ============================================================================


@app.get("/")
async def root():
    """Diagnostic Node Health Check"""
    return {
        "app": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "Running - Operational",
        "timestamp": datetime.utcnow().isoformat(),
    }


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Internal Architectural Error: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal error occurred in the execution engine."},
    )


@app.on_event("startup")
async def startup_event():
    logger.info(f"{settings.PROJECT_NAME} Engine Initializing...")
    logger.info(f"Environment Mode: {settings.ENVIRONMENT}")
    logger.info(f"CORS Matrix: {settings.ALLOWED_ORIGINS}")
    logger.info("System Architectures operational. Node ready.")


if __name__ == "__main__":
    import uvicorn

    # Senior Developer Standard: Use dynamic port scaling
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=settings.DEBUG)
