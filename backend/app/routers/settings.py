from fastapi import APIRouter, Depends, Form, UploadFile, File, Request
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any
import os
import uuid
import shutil
from loguru import logger

from ..api import deps
from ..models.user import User as UserModel
from ..models.settings import WhiteLabelSettings as SettingsModel

router = APIRouter(prefix="/settings", tags=["Settings"])

# Senior Developer Standard: Move static resources to dedicated cloud storage in production
UPLOAD_DIR = "uploads/logos"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.get("/white-label", response_model=Dict[str, Any])
async def get_white_label_settings(
    request: Request,
    db: Session = Depends(deps.get_db),
    current_user: UserModel = Depends(deps.get_current_user),
):
    """Retrieve branding telemetry for the connected agency grid."""
    brand_settings = (
        db.query(SettingsModel).filter(SettingsModel.user_id == current_user.id).first()
    )

    # Establish base URI for absolute resource linking
    base_url = str(request.base_url).rstrip("/")

    if not brand_settings:
        return {
            "company_name": current_user.company_name or "AnasFlow Agency",
            "logo_url": None,
            "primary_color": "#00E5C0",
            "support_email": current_user.email,
        }

    logo_uri = (
        f"{base_url}/uploads/logos/{brand_settings.logo_path}"
        if brand_settings.logo_path
        else None
    )

    return {
        "company_name": brand_settings.company_name,
        "logo_url": logo_uri,
        "primary_color": brand_settings.primary_color,
        "support_email": brand_settings.support_email,
    }


@router.post("/white-label", response_model=Dict[str, Any])
async def update_white_label_settings(
    request: Request,
    company_name: str = Form(...),
    primary_color: str = Form("#00E5C0"),
    support_email: Optional[str] = Form(None),
    logo: Optional[UploadFile] = File(None),
    db: Session = Depends(deps.get_db),
    current_user: UserModel = Depends(deps.get_current_user),
):
    """Update branding telemetry for the connected agency grid."""
    brand_settings = (
        db.query(SettingsModel).filter(SettingsModel.user_id == current_user.id).first()
    )
    logo_filename = brand_settings.logo_path if brand_settings else None

    if logo:
        # Senior Developer Standard: Enforce strict file validation here in production
        file_ext = (
            os.path.splitext(logo.filename)[1].lower() if logo.filename else ".png"
        )
        logo_filename = f"{uuid.uuid4()}{file_ext}"
        file_path = os.path.join(UPLOAD_DIR, logo_filename)

        try:
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(logo.file, buffer)
        except Exception as e:
            logger.error(f"Failed to ingest resource payload: {e}")
            # Fallback to existing if write fails
            logo_filename = brand_settings.logo_path if brand_settings else None

    if not brand_settings:
        brand_settings = SettingsModel(
            user_id=current_user.id,
            company_name=company_name,
            logo_path=logo_filename,
            primary_color=primary_color,
            support_email=support_email,
        )
        db.add(brand_settings)
    else:
        brand_settings.company_name = company_name
        brand_settings.logo_path = logo_filename
        brand_settings.primary_color = primary_color
        brand_settings.support_email = support_email

    db.commit()
    db.refresh(brand_settings)

    base_url = str(request.base_url).rstrip("/")
    logo_uri = (
        f"{base_url}/uploads/logos/{brand_settings.logo_path}"
        if brand_settings.logo_path
        else None
    )

    return {
        "message": "Branding settings updated synchronously",
        "settings": {
            "company_name": brand_settings.company_name,
            "logo_url": logo_uri,
            "primary_color": brand_settings.primary_color,
            "support_email": brand_settings.support_email,
        },
    }
