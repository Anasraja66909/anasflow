from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import Optional, List, Dict
from datetime import datetime, timedelta
import os
import secrets
from urllib.parse import urlencode
import httpx
from fastapi.responses import RedirectResponse
from loguru import logger

from ..api import deps
from ..core.config import settings
from ..core import security
from ..models.platform import (
    Platform as PlatformModel,
)
from ..models.user import User as UserModel
from ..schemas.platform import (
    Platform as PlatformSchema,
    PlatformCreate,
)

router = APIRouter(prefix="/platforms", tags=["Platforms"])


# --- Internal Configuration Management ---
# Senior Developer Standard: Move these to a dedicated PlatformService or Configuration Registry
def _oauth_configs() -> Dict[str, Dict[str, Optional[str]]]:
    return {
        "zapier": {
            "client_id": os.getenv("ZAPIER_OAUTH_CLIENT_ID"),
            "client_secret": os.getenv("ZAPIER_OAUTH_CLIENT_SECRET"),
            "authorize_url": "https://zapier.com/oauth/authorize",
            "token_url": "https://zapier.com/oauth/token",
            "scope": "read",
        },
        "hubspot": {
            "client_id": os.getenv("HUBSPOT_OAUTH_CLIENT_ID"),
            "client_secret": os.getenv("HUBSPOT_OAUTH_CLIENT_SECRET"),
            "authorize_url": "https://app.hubspot.com/oauth/authorize",
            "token_url": "https://api.hubapi.com/oauth/v1/token",
            "scope": "crm.objects.contacts.read crm.objects.deals.read",
        },
        "gohighlevel": {
            "client_id": os.getenv("GOHIGHLEVEL_OAUTH_CLIENT_ID"),
            "client_secret": os.getenv("GOHIGHLEVEL_OAUTH_CLIENT_SECRET"),
            "authorize_url": "https://marketplace.gohighlevel.com/oauth/chooselocation",
            "token_url": "https://services.msg91.com/oauth/token",
            "scope": "contacts.readonly opportunities.readonly",
        },
    }


# Temporary node-state cache for OAuth handshakes
oauth_states: Dict[str, Dict[str, object]] = {}


def _cleanup_expired_handshakes():
    now = datetime.utcnow()
    expired = [key for key, value in oauth_states.items() if value["expires_at"] < now]
    for key in expired:
        oauth_states.pop(key, None)


# --- Diagnostic API Endpoints ---


@router.get("/", response_model=List[PlatformSchema])
def list_platforms(
    client_id: str = Query(None, description="Filter by client sub-account node"),
    db: Session = Depends(deps.get_db),
    current_user: UserModel = Depends(deps.get_current_user),
):
    """Retrieve all connected platforms associated with the authorized user grid."""
    query = db.query(PlatformModel).filter(PlatformModel.user_id == current_user.id)
    if client_id:
        query = query.filter(
            (PlatformModel.client_id == client_id) | (PlatformModel.client_id == None)
        )

    return query.all()


@router.post("/connect", response_model=PlatformSchema)
def connect_platform(
    data: PlatformCreate,
    db: Session = Depends(deps.get_db),
    current_user: UserModel = Depends(deps.get_current_user),
):
    """Establish a production-grade API Key handshakes for AI/Automation nodes."""
    # Senior Developer Standard: Encrypt all keys at rest
    secured_key = security.encrypt_data(data.api_key) if data.api_key else None

    existing = (
        db.query(PlatformModel)
        .filter(
            PlatformModel.user_id == current_user.id,
            PlatformModel.client_id == data.client_id,
            PlatformModel.platform_type == data.platform_type,
        )
        .first()
    )

    if existing:
        existing.api_key = secured_key
        existing.status = "connected"
        existing.is_active = True
        existing.updated_at = datetime.utcnow()
        platform = existing
    else:
        platform = PlatformModel(
            user_id=current_user.id,
            client_id=data.client_id,
            platform_type=data.platform_type,
            platform_name=data.platform_name
            or data.platform_type.replace("_", " ").title(),
            auth_type="api_key",
            api_key=secured_key,
            status="connected",
            is_active=True,
        )
        db.add(platform)

    db.commit()
    db.refresh(platform)
    return platform


@router.delete("/{platform_id}", status_code=status.HTTP_204_NO_CONTENT)
def disconnect_platform(
    platform_id: str,
    db: Session = Depends(deps.get_db),
    current_user: UserModel = Depends(deps.get_current_user),
):
    """Terminate the connection handshake for a specific visual node."""
    platform = (
        db.query(PlatformModel)
        .filter(
            PlatformModel.id == platform_id, PlatformModel.user_id == current_user.id
        )
        .first()
    )

    if not platform:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Platform node connection not located.",
        )

    db.delete(platform)
    db.commit()
    return None


# --- High-Fidelity OAuth 2.0 Deployment ---


@router.get("/oauth/connect/{platform}")
async def oauth_authorize(
    platform: str,
    client_id: str = Query(None),
    current_user: UserModel = Depends(deps.get_current_user),
):
    """Step 1: Initiate Node Authorization Protocol."""
    platform_type = platform.lower().strip()
    configs = _oauth_configs()

    if platform_type not in configs:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Diagnostic error: OAuth not supported for '{platform_type}'",
        )

    config = configs[platform_type]
    if not config.get("client_id") or not config.get("authorize_url"):
        # Senior Developer Fallback: Simulation Signal
        return {
            "authorize_url": f"{settings.ALLOWED_ORIGINS[0]}/dashboard/platforms/oauth-callback?code=sim_code_123&state=sim_state&simulation=true&platform={platform_type}&client_id={client_id}",
            "simulation": True,
        }

    _cleanup_expired_handshakes()
    state = secrets.token_urlsafe(32)
    oauth_states[state] = {
        "platform": platform_type,
        "user_id": current_user.id,
        "client_id": client_id,
        "expires_at": datetime.utcnow() + timedelta(minutes=15),
    }

    params = {
        "client_id": config["client_id"],
        "redirect_uri": (
            settings.OAUTH_REDIRECT_URI
            if hasattr(settings, "OAUTH_REDIRECT_URI")
            else f"{settings.ALLOWED_ORIGINS[0]}/oauth-callback"
        ),
        "state": state,
        "response_type": "code",
    }
    if config.get("scope"):
        params["scope"] = config["scope"]

    auth_url = f"{config['authorize_url']}?{urlencode(params)}"
    return {"authorize_url": auth_url}


@router.get("/oauth/callback")
async def oauth_callback(code: str, state: str, db: Session = Depends(deps.get_db)):
    """Step 2: Handle Protocol Handshake and Token Resolution."""
    _cleanup_expired_handshakes()
    state_data = oauth_states.pop(state, None)
    if not state_data:
        return RedirectResponse(
            f"{settings.ALLOWED_ORIGINS[0]}/dashboard/platforms?status=error&message=Invalid_state_link"
        )

    platform_type = str(state_data["platform"])
    user_id = str(state_data["user_id"])
    client_id = state_data.get("client_id")

    configs = _oauth_configs()
    config = configs.get(platform_type)

    try:
        async with httpx.AsyncClient(timeout=20.0) as client:
            res = await client.post(
                str(config["token_url"]),
                data={
                    "grant_type": "authorization_code",
                    "code": code,
                    "redirect_uri": (
                        settings.OAUTH_REDIRECT_URI
                        if hasattr(settings, "OAUTH_REDIRECT_URI")
                        else f"{settings.ALLOWED_ORIGINS[0]}/oauth-callback"
                    ),
                    "client_id": config["client_id"],
                    "client_secret": config["client_secret"],
                },
                headers={"Content-Type": "application/x-www-form-urlencoded"},
            )
            res.raise_for_status()
            token_data = res.json()
    except Exception as e:
        logger.error(f"Node handshake resolution failure: {e}")
        return RedirectResponse(
            f"{settings.ALLOWED_ORIGINS[0]}/dashboard/platforms?connected={platform_type}&status=error"
        )

    access_token = token_data.get("access_token")
    refresh_token = token_data.get("refresh_token")
    expires_in = int(token_data.get("expires_in", 3600))

    # Secure storage protocol
    existing = (
        db.query(PlatformModel)
        .filter(
            PlatformModel.user_id == user_id,
            PlatformModel.client_id == client_id,
            PlatformModel.platform_type == platform_type,
        )
        .first()
    )

    if existing:
        existing.access_token = security.encrypt_data(access_token)
        existing.refresh_token = (
            security.encrypt_data(refresh_token) if refresh_token else None
        )
        existing.token_expires_at = datetime.utcnow() + timedelta(seconds=expires_in)
        existing.status = "connected"
        existing.is_active = True
        existing.updated_at = datetime.utcnow()
    else:
        db.add(
            PlatformModel(
                user_id=user_id,
                client_id=client_id,
                platform_type=platform_type,
                platform_name=platform_type.replace("_", " ").title(),
                auth_type="oauth2",
                access_token=security.encrypt_data(access_token),
                refresh_token=(
                    security.encrypt_data(refresh_token) if refresh_token else None
                ),
                token_expires_at=datetime.utcnow() + timedelta(seconds=expires_in),
                status="connected",
                is_active=True,
            )
        )

    db.commit()
    return RedirectResponse(
        f"{settings.ALLOWED_ORIGINS[0]}/dashboard/platforms?connected={platform_type}&status=success"
    )
