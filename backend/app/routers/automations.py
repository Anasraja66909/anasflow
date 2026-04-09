from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models import Automation, User
from app.auth import get_current_user

router = APIRouter(prefix="/automations", tags=["Automations"])


@router.get("/")
def get_automations(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    """Get all automations from SQLite securely"""
    automations = (
        db.query(Automation).filter(Automation.user_id == current_user.id).all()
    )

    if len(automations) == 0:
        return {"automations": []}

    return {"automations": automations}
