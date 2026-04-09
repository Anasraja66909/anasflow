from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models import Platform, User
from app.auth import get_current_user
from datetime import datetime

router = APIRouter(prefix="/alerts/system", tags=["Alerts"])


@router.get("/")
async def list_alerts(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    """Fetch real-time system alerts based on platform health and spend"""
    alerts = []

    # 1. Check for platform sync errors
    platforms = db.query(Platform).filter(Platform.user_id == current_user.id).all()
    for p in platforms:
        if not p.is_active:
            alerts.append(
                {
                    "id": f"p_{p.id}",
                    "type": "health",
                    "level": "critical",
                    "message": f"Connection lost: {p.platform_name or p.platform_type.title()} requires reconnection.",
                    "created_at": datetime.utcnow().isoformat(),
                }
            )

        if p.auth_type == "api_key" and not p.api_key:
            alerts.append(
                {
                    "id": f"auth_{p.id}",
                    "type": "auth",
                    "level": "warning",
                    "message": f"Missing credentials for {p.platform_name or p.platform_type.title()}.",
                    "created_at": datetime.utcnow().isoformat(),
                }
            )

    # 2. Add some fallback MVP alerts if none found
    if not alerts:
        alerts.append(
            {
                "id": "gen_1",
                "type": "info",
                "level": "low",
                "message": "System active. No urgent alerts detected.",
                "created_at": datetime.utcnow().isoformat(),
            }
        )

    return alerts


@router.post("/acknowledge/{alert_id}")
async def acknowledge_alert(alert_id: str):
    return {"status": "acknowledged", "alert_id": alert_id}
