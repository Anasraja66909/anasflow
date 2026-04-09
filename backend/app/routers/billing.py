from fastapi import APIRouter

router = APIRouter(prefix="/billing", tags=["Billing"])


@router.get("/plans")
async def get_plans():
    # Return pricing tiers
    return []
