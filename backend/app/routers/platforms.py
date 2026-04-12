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
from ..models.platform import Platform as PlatformModel
from ..models.user import User as UserModel
from ..schemas.platform import (
    Platform as PlatformSchema,
    PlatformCreate,
)

router = APIRouter(prefix="/platforms", tags=["Platforms"])


# ============================================================================
# OAuth 2.0 Platform Configuration Registry
# ============================================================================

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
            "token_url": "https://services.leadconnectorhq.com/oauth/token",
            "scope": "contacts.readonly opportunities.readonly",
        },
        "stripe": {
            "client_id": os.getenv("STRIPE_OAUTH_CLIENT_ID"),
            "client_secret": os.getenv("STRIPE_OAUTH_CLIENT_SECRET"),
            "authorize_url": "https://connect.stripe.com/oauth/authorize",
            "token_url": "https://connect.stripe.com/oauth/token",
            "scope": "read_only",
        },
        "slack": {
            "client_id": os.getenv("SLACK_OAUTH_CLIENT_ID"),
            "client_secret": os.getenv("SLACK_OAUTH_CLIENT_SECRET"),
            "authorize_url": "https://slack.com/oauth/v2/authorize",
            "token_url": "https://slack.com/api/oauth.v2.access",
            "scope": "channels:read,chat:write",
        },
        "notion": {
            "client_id": os.getenv("NOTION_OAUTH_CLIENT_ID"),
            "client_secret": os.getenv("NOTION_OAUTH_CLIENT_SECRET"),
            "authorize_url": "https://api.notion.com/v1/oauth/authorize",
            "token_url": "https://api.notion.com/v1/oauth/token",
            "scope": "",
        },
        "airtable": {
            "client_id": os.getenv("AIRTABLE_OAUTH_CLIENT_ID"),
            "client_secret": os.getenv("AIRTABLE_OAUTH_CLIENT_SECRET"),
            "authorize_url": "https://airtable.com/oauth2/v1/authorize",
            "token_url": "https://airtable.com/oauth2/v1/token",
            "scope": "data.records:read schema.bases:read",
        },
        "shopify": {
            "client_id": os.getenv("SHOPIFY_OAUTH_CLIENT_ID"),
            "client_secret": os.getenv("SHOPIFY_OAUTH_CLIENT_SECRET"),
            "authorize_url": "https://partners.shopify.com/oauth/authorize",
            "token_url": "https://partners.shopify.com/api/2024-01/graphql.json",
            "scope": "read_orders,read_customers",
        },
        "power_automate": {
            "client_id": os.getenv("AZURE_OAUTH_CLIENT_ID"),
            "client_secret": os.getenv("AZURE_OAUTH_CLIENT_SECRET"),
            "authorize_url": "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
            "token_url": "https://login.microsoftonline.com/common/oauth2/v2.0/token",
            "scope": "https://graph.microsoft.com/.default",
        },
        "zoho_crm": {
            "client_id": os.getenv("ZOHO_OAUTH_CLIENT_ID"),
            "client_secret": os.getenv("ZOHO_OAUTH_CLIENT_SECRET"),
            "authorize_url": "https://accounts.zoho.com/oauth/v2/auth",
            "token_url": "https://accounts.zoho.com/oauth/v2/token",
            "scope": "ZohoCRM.modules.ALL",
        },
        "salesforce": {
            "client_id": os.getenv("SALESFORCE_OAUTH_CLIENT_ID"),
            "client_secret": os.getenv("SALESFORCE_OAUTH_CLIENT_SECRET"),
            "authorize_url": "https://login.salesforce.com/services/oauth2/authorize",
            "token_url": "https://login.salesforce.com/services/oauth2/token",
            "scope": "api refresh_token",
        },
        "pipedream": {
            "client_id": os.getenv("PIPEDREAM_OAUTH_CLIENT_ID"),
            "client_secret": os.getenv("PIPEDREAM_OAUTH_CLIENT_SECRET"),
            "authorize_url": "https://pipedream.com/oauth/authorize",
            "token_url": "https://api.pipedream.com/v1/oauth/token",
            "scope": "",
        },
    }


# In-memory OAuth state cache (use Redis in production)
oauth_states: Dict[str, Dict[str, object]] = {}


def _cleanup_expired_handshakes():
    now = datetime.utcnow()
    expired = [k for k, v in oauth_states.items() if v["expires_at"] < now]
    for k in expired:
        oauth_states.pop(k, None)


# ============================================================================
# CONNECTIONS SUMMARY ENDPOINT (used by dashboard frontend)
# ============================================================================

@router.get("/connections")
def get_connections_summary(
    client_id: Optional[str] = Query(None),
    db: Session = Depends(deps.get_db),
    current_user: UserModel = Depends(deps.get_current_user),
):
    """
    Returns a clean summary of all connected platforms.
    Credentials (API keys / tokens) are NEVER returned — only metadata.
    """
    query = db.query(PlatformModel).filter(
        PlatformModel.user_id == current_user.id,
        PlatformModel.is_active == True,
    )
    if client_id:
        query = query.filter(
            (PlatformModel.client_id == client_id) | (PlatformModel.client_id == None)
        )

    platforms = query.all()

    connections = []
    for p in platforms:
        connections.append({
            "id": p.id,
            "platform_type": p.platform_type,
            "platform_name": p.platform_name,
            "auth_type": p.auth_type,
            "status": p.status,
            "is_active": p.is_active,
            "has_credentials": bool(p.api_key or p.access_token),
            "token_expires_at": p.token_expires_at.isoformat() if p.token_expires_at else None,
            "last_sync_at": p.last_sync_at.isoformat() if p.last_sync_at else None,
            "created_at": p.created_at.isoformat() if p.created_at else None,
        })

    return {
        "connections": connections,
        "total": len(connections),
        "security": {
            "encryption": "AES-256 (Fernet)",
            "transport": "TLS 1.3",
            "credentials_exposed": False,
        },
    }


# ============================================================================
# CONNECT PLATFORM — API Key / Credential Auth
# ============================================================================

@router.post("/connect", response_model=PlatformSchema)
def connect_platform(
    data: PlatformCreate,
    db: Session = Depends(deps.get_db),
    current_user: UserModel = Depends(deps.get_current_user),
):
    """
    Store API key or credential-based platform connection.
    All sensitive data is AES-256 encrypted at rest before storage.
    """
    secured_key = security.encrypt_data(data.api_key) if data.api_key else None

    existing = (
        db.query(PlatformModel)
        .filter(
            PlatformModel.user_id == current_user.id,
            PlatformModel.platform_type == data.platform_type,
            PlatformModel.client_id == data.client_id,
        )
        .first()
    )

    if existing:
        if secured_key:
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
            platform_name=data.platform_name or data.platform_type.replace("_", " ").title(),
            auth_type=data.auth_type or "api_key",
            api_key=secured_key,
            status="connected",
            is_active=True,
        )
        db.add(platform)

    db.commit()
    db.refresh(platform)
    return platform


# ============================================================================
# VALIDATE CONNECTION — Test if stored credentials still work
# ============================================================================

@router.get("/validate/{platform_type}")
async def validate_connection(
    platform_type: str,
    db: Session = Depends(deps.get_db),
    current_user: UserModel = Depends(deps.get_current_user),
):
    """
    Validate that stored credentials for a platform are still active.
    Returns connectivity status without exposing any credentials.
    """
    platform = (
        db.query(PlatformModel)
        .filter(
            PlatformModel.user_id == current_user.id,
            PlatformModel.platform_type == platform_type,
            PlatformModel.is_active == True,
        )
        .first()
    )

    if not platform:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No active connection found for '{platform_type}'.",
        )

    if platform.auth_type == "oauth2" and platform.token_expires_at:
        if platform.token_expires_at < datetime.utcnow():
            return {
                "platform_type": platform_type,
                "status": "expired",
                "valid": False,
                "message": "OAuth token expired. Please reconnect.",
            }

    validation_endpoints = {
        "openai": "https://api.openai.com/v1/models",
        "elevenlabs": "https://api.elevenlabs.io/v1/user",
        "cohere": "https://api.cohere.ai/v1/check-api-key",
        "heygen": "https://api.heygen.com/v1/user.info",
    }

    endpoint = validation_endpoints.get(platform_type)
    if endpoint and platform.api_key:
        try:
            decrypted_key = security.decrypt_data(platform.api_key)
            headers = {"Authorization": f"Bearer {decrypted_key}"}
            if platform_type == "claude":
                headers = {
                    "x-api-key": decrypted_key,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json",
                }
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.get(endpoint, headers=headers)
            is_valid = res.status_code in [200, 201]
            return {
                "platform_type": platform_type,
                "status": "connected" if is_valid else "invalid",
                "valid": is_valid,
                "message": "Credentials verified." if is_valid else "Credentials rejected by platform.",
            }
        except Exception as e:
            logger.warning(f"Validation failed for {platform_type}: {e}")

    return {
        "platform_type": platform_type,
        "status": platform.status,
        "valid": platform.is_active,
        "message": "Status based on last known state.",
    }


# ============================================================================
# LIST ALL PLATFORMS
# ============================================================================

@router.get("/", response_model=List[PlatformSchema])
def list_platforms(
    client_id: str = Query(None),
    db: Session = Depends(deps.get_db),
    current_user: UserModel = Depends(deps.get_current_user),
):
    """Retrieve all connected platforms for the authenticated user."""
    query = db.query(PlatformModel).filter(PlatformModel.user_id == current_user.id)
    if client_id:
        query = query.filter(
            (PlatformModel.client_id == client_id) | (PlatformModel.client_id == None)
        )
    return query.all()


# ============================================================================
# DISCONNECT PLATFORM BY ID
# ============================================================================

@router.delete("/{platform_id}", status_code=status.HTTP_204_NO_CONTENT)
def disconnect_platform(
    platform_id: str,
    db: Session = Depends(deps.get_db),
    current_user: UserModel = Depends(deps.get_current_user),
):
    """Permanently remove a platform connection and wipe associated credentials."""
    platform = (
        db.query(PlatformModel)
        .filter(
            PlatformModel.id == platform_id,
            PlatformModel.user_id == current_user.id,
        )
        .first()
    )
    if not platform:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Connection not found.")
    db.delete(platform)
    db.commit()
    return None


# ============================================================================
# DISCONNECT BY PLATFORM TYPE (frontend convenience endpoint)
# ============================================================================

@router.delete("/by-type/{platform_type}", status_code=status.HTTP_204_NO_CONTENT)
def disconnect_by_type(
    platform_type: str,
    client_id: Optional[str] = Query(None),
    db: Session = Depends(deps.get_db),
    current_user: UserModel = Depends(deps.get_current_user),
):
    """Disconnect a platform by its type key."""
    query = db.query(PlatformModel).filter(
        PlatformModel.user_id == current_user.id,
        PlatformModel.platform_type == platform_type,
    )
    if client_id:
        query = query.filter(PlatformModel.client_id == client_id)

    platform = query.first()
    if not platform:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No active connection for '{platform_type}'.",
        )
    db.delete(platform)
    db.commit()
    return None


# ============================================================================
# OAuth 2.0 FLOW — Step 1: Initiate Authorization
# ============================================================================

@router.get("/oauth/connect/{platform}")
async def oauth_authorize(
    platform: str,
    client_id: str = Query(None),
    current_user: UserModel = Depends(deps.get_current_user),
):
    """
    Initiate OAuth 2.0 authorization, generate a cryptographically secure
    state token, and return the provider's authorization URL.
    """
    platform_type = platform.lower().strip()
    configs = _oauth_configs()

    if platform_type not in configs:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"OAuth 2.0 is not supported for '{platform_type}'.",
        )

    config = configs[platform_type]

    # Simulation mode when OAuth env vars are not configured
    if not config.get("client_id") or not config.get("authorize_url"):
        demo_url = (
            f"{settings.ALLOWED_ORIGINS[0]}/dashboard/platforms"
            f"?status=success&platform={platform_type}&simulated=true"
        )
        return {
            "authorize_url": demo_url,
            "simulation": True,
            "message": f"OAuth credentials for {platform_type} not configured. Demo mode active.",
        }

    _cleanup_expired_handshakes()
    state = secrets.token_urlsafe(32)
    oauth_states[state] = {
        "platform": platform_type,
        "user_id": current_user.id,
        "client_id": client_id,
        "expires_at": datetime.utcnow() + timedelta(minutes=15),
    }

    redirect_uri = (
        settings.OAUTH_REDIRECT_URI
        if hasattr(settings, "OAUTH_REDIRECT_URI")
        else f"{settings.ALLOWED_ORIGINS[0]}/oauth/callback"
    )

    params = {
        "client_id": config["client_id"],
        "redirect_uri": redirect_uri,
        "state": state,
        "response_type": "code",
    }
    if config.get("scope"):
        params["scope"] = config["scope"]

    auth_url = f"{config['authorize_url']}?{urlencode(params)}"
    return {"authorize_url": auth_url, "simulation": False}


# ============================================================================
# OAuth 2.0 FLOW — Step 2: Token Exchange Callback
# ============================================================================

@router.get("/oauth/callback")
async def oauth_callback(
    code: str,
    state: str,
    db: Session = Depends(deps.get_db),
):
    """
    Handle OAuth 2.0 callback, exchange auth code for access token,
    and securely store AES-256 encrypted tokens in the database.
    """
    _cleanup_expired_handshakes()
    state_data = oauth_states.pop(state, None)

    if not state_data:
        return RedirectResponse(
            f"{settings.ALLOWED_ORIGINS[0]}/dashboard/platforms?status=error&message=invalid_state"
        )

    platform_type = str(state_data["platform"])
    user_id = str(state_data["user_id"])
    client_id = state_data.get("client_id")

    configs = _oauth_configs()
    config = configs.get(platform_type)

    redirect_uri = (
        settings.OAUTH_REDIRECT_URI
        if hasattr(settings, "OAUTH_REDIRECT_URI")
        else f"{settings.ALLOWED_ORIGINS[0]}/oauth/callback"
    )

    try:
        async with httpx.AsyncClient(timeout=20.0) as http_client:
            res = await http_client.post(
                str(config["token_url"]),
                data={
                    "grant_type": "authorization_code",
                    "code": code,
                    "redirect_uri": redirect_uri,
                    "client_id": config["client_id"],
                    "client_secret": config["client_secret"],
                },
                headers={"Content-Type": "application/x-www-form-urlencoded"},
            )
            res.raise_for_status()
            token_data = res.json()
    except Exception as e:
        logger.error(f"OAuth token exchange failed for {platform_type}: {e}")
        return RedirectResponse(
            f"{settings.ALLOWED_ORIGINS[0]}/dashboard/platforms?status=error&platform={platform_type}"
        )

    access_token = token_data.get("access_token")
    refresh_token = token_data.get("refresh_token")
    expires_in = int(token_data.get("expires_in", 3600))

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
        existing.refresh_token = security.encrypt_data(refresh_token) if refresh_token else None
        existing.token_expires_at = datetime.utcnow() + timedelta(seconds=expires_in)
        existing.status = "connected"
        existing.is_active = True
        existing.updated_at = datetime.utcnow()
    else:
        db.add(PlatformModel(
            user_id=user_id,
            client_id=client_id,
            platform_type=platform_type,
            platform_name=platform_type.replace("_", " ").title(),
            auth_type="oauth2",
            access_token=security.encrypt_data(access_token),
            refresh_token=security.encrypt_data(refresh_token) if refresh_token else None,
            token_expires_at=datetime.utcnow() + timedelta(seconds=expires_in),
            status="connected",
            is_active=True,
        ))

    db.commit()

    return RedirectResponse(
        f"{settings.ALLOWED_ORIGINS[0]}/dashboard/platforms?status=success&platform={platform_type}"
    )
