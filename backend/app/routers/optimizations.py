from fastapi import APIRouter, Depends
from app.services.ai_suggestion_service import AISuggestionService
from app.db.session import get_db
from app.models import User
from app.auth import get_current_user
from sqlalchemy.orm import Session

router = APIRouter(prefix="/optimizations", tags=["Optimizations"])


@router.get("/")
async def get_optimizations(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    """
    Get optimization suggestions for cost reduction using the AI Suggestion Engine.
    """
    # In a real scenario, this data would be dynamically fetched from the database
    # based on the authenticated agency/user's connected platforms.
    dummy_usage_data = {
        "claude": {"tokens_used": 2400000, "model": "claude-3-sonnet", "cost": 45.23},
        "n8n": {"executions": 3400, "failed": 120, "cost": 0},
    }
    dummy_historical_data = {"last_30_days_spend": 120.50, "trend": "increasing"}

    # Call the new advanced service
    suggestions = await AISuggestionService.generate_optimization_suggestions(
        usage_data=dummy_usage_data,
        historical_data=dummy_historical_data,
        total_spend=120.50,
        top_platforms="Claude, n8n",
    )

    return suggestions
