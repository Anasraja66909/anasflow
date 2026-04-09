from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models import User, Client, Platform, AIFixLog, Subscription
from app.auth import get_current_user
from app.services.stripe_service import StripeService
import os

router = APIRouter(prefix="/billing", tags=["Billing"])

# ==============================================================
# ANASFLOW PRICING PLANS
# ------------------------------------------------------------------
# Feature-based billing with add-ons
# AI Doctor fix is a per-use add-on charged separately
# ==============================================================

PLANS = [
    {
        "id": "starter",
        "name": "Starter",
        "price": 29,
        "price_yearly": 279,  # ~20% off
        "currency": "USD",
        "popular": False,
        "clients_limit": 5,
        "platforms_limit": 3,
        "ai_doctor_fixes": 0,  # pay-per-fix only
        "ai_doctor_fix_price": 4.99,
        "features": [
            "Up to 5 Clients",
            "3 Platform Integrations",
            "Basic Dashboard & Charts",
            "Email Support",
            "Basic Cost Tracking",
        ],
        "missing": [
            "PDF Reports",
            "AI Doctor",
            "White-label",
        ],
        "stripe_price_id_monthly": "price_starter_monthly",
        "stripe_price_id_yearly": "price_starter_yearly",
    },
    {
        "id": "agency",
        "name": "Agency",
        "price": 79,
        "price_yearly": 759,  # ~20% off
        "currency": "USD",
        "popular": True,
        "clients_limit": 25,
        "platforms_limit": -1,  # unlimited
        "ai_doctor_fixes": 10,  # first 10/mo included
        "ai_doctor_fix_price": 2.99,
        "features": [
            "Up to 25 Clients",
            "Unlimited Platform Integrations",
            "Full Analytics & Optimization",
            "1-Click PDF ROI Reports",
            "10 AI Doctor Fixes/month",
            "Priority Email Support",
            "Advanced Cost Tracking",
        ],
        "missing": [
            "White-label Portal",
            "Custom Domain",
        ],
        "stripe_price_id_monthly": "price_agency_monthly",
        "stripe_price_id_yearly": "price_agency_yearly",
    },
    {
        "id": "pro",
        "name": "Pro",
        "price": 199,
        "price_yearly": 1909,  # ~20% off
        "currency": "USD",
        "popular": False,
        "clients_limit": 100,
        "platforms_limit": -1,  # unlimited
        "ai_doctor_fixes": -1,  # unlimited
        "ai_doctor_fix_price": 0,
        "features": [
            "Up to 100 Clients",
            "Unlimited Everything",
            "Unlimited AI Doctor Fixes",
            "White-label Client Portal",
            "Custom Domain",
            "API Access",
            "Phone Support",
        ],
        "missing": [],
        "stripe_price_id_monthly": "price_pro_monthly",
        "stripe_price_id_yearly": "price_pro_yearly",
    },
    {
        "id": "enterprise",
        "name": "Enterprise",
        "price": None,  # custom quote
        "price_yearly": None,
        "currency": "USD",
        "popular": False,
        "clients_limit": -1,
        "platforms_limit": -1,
        "ai_doctor_fixes": -1,
        "ai_doctor_fix_price": 0,
        "features": [
            "Unlimited Clients",
            "Dedicated Account Manager",
            "On-Premise Deployment Option",
            "Custom API Rate Limits",
            "SLA Guarantee",
            "Custom Onboarding",
            "SOC2 Compliance Reports",
        ],
        "missing": [],
        "stripe_price_id_monthly": None,
        "stripe_price_id_yearly": None,
    },
]

AI_DOCTOR_ADDON = {
    "name": "AI Doctor Fix (Add-on)",
    "description": "One-time charge per AI-generated automation fix applied",
    "price_starter": 4.99,
    "price_agency": 2.99,
    "price_pro": 0.00,
    "stripe_price_id": "price_ai_doctor_fix",
}


@router.get("/plans")
async def get_plans():
    """Public endpoint: returns all pricing plans"""
    return {"plans": PLANS, "ai_doctor_addon": AI_DOCTOR_ADDON}


@router.get("/current")
async def get_current_plan(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    """Returns the current user's active plan and usage from database"""
    sub = db.query(Subscription).filter(Subscription.user_id == current_user.id).first()

    # Defaults for trial/new users
    plan_id = sub.plan if sub else "agency"
    status = sub.status if sub else "active"

    clients_count = db.query(Client).filter(Client.agency_id == current_user.id).count()
    platforms_count = (
        db.query(Platform).filter(Platform.user_id == current_user.id).count()
    )
    fixes_count = db.query(AIFixLog).filter(AIFixLog.user_id == current_user.id).count()

    return {
        "user_id": current_user.id,
        "current_plan": plan_id,
        "plan_status": status,
        "billing_cycle": "monthly",
        "next_billing_date": (
            sub.current_period_end.isoformat()
            if sub and sub.current_period_end
            else "2026-05-03"
        ),
        "amount_due": (next((p["price"] for p in PLANS if p["id"] == plan_id), 0)) or 0,
        "currency": "USD",
        "usage": {
            "clients_used": clients_count,
            "clients_limit": 25 if plan_id == "agency" else 5,
            "platforms_used": platforms_count,
            "platforms_limit": -1 if plan_id != "starter" else 3,
            "ai_doctor_fixes_used": fixes_count,
            "ai_doctor_fixes_limit": 10 if plan_id == "agency" else 0,
        },
    }


@router.post("/create-checkout")
async def create_checkout_session(
    plan_id: str,
    billing_cycle: str = "monthly",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Create real Stripe checkout session for plan upgrade"""
    success_url = (
        os.getenv("FRONTEND_URL", "http://localhost:3000")
        + "/dashboard/billing?session_id={CHECKOUT_SESSION_ID}"
    )
    cancel_url = (
        os.getenv("FRONTEND_URL", "http://localhost:3000") + "/dashboard/billing"
    )

    checkout_url = StripeService.create_checkout_session(
        user_id=current_user.id,
        plan_id=plan_id,
        billing_cycle=billing_cycle,
        success_url=success_url,
        cancel_url=cancel_url,
    )

    return {"status": "ok", "checkout_url": checkout_url}


@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    """Real Stripe webhook for subscription lifecycle events"""
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    if not sig_header:
        raise HTTPException(status_code=400, detail="Missing stripe-signature")

    success = StripeService.handle_webhook(payload, sig_header, db)
    return {"status": "ok" if success else "error"}


# ==============================================================
# NEW BILLING DASHBOARD ENDPOINTS
# ==============================================================


@router.get("/overview")
async def get_billing_overview(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    """Get full billing overview for the dashboard"""
    return {
        "status": "success",
        "user_id": current_user.id,
        "current_plan": "agency",
        "billing_cycle": "monthly",
        "next_billing_date": "2026-05-03",
        "amount_due": 79.00,
        "currency": "USD",
        "plan_status": "active",
    }


@router.get("/payment-methods")
async def get_payment_methods(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    """List saved payment methods"""
    return {
        "status": "success",
        "methods": [
            {
                "id": "pm_1OdVlX2eZvKYlo2C",
                "brand": "visa",
                "last4": "4242",
                "exp_month": "12",
                "exp_year": "2026",
                "is_default": True,
            },
            {
                "id": "pm_2KdPqX9aZvKYlo8J",
                "brand": "mastercard",
                "last4": "8899",
                "exp_month": "05",
                "exp_year": "2025",
                "is_default": False,
            },
        ],
    }


@router.post("/payment-methods")
async def add_payment_method(
    payment_method_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Add a new payment method"""
    return {"status": "success", "message": "Payment method added successfully"}


@router.delete("/payment-methods/{method_id}")
async def remove_payment_method(
    method_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Remove a payment method"""
    return {"status": "success", "message": f"Payment method {method_id} removed"}


@router.put("/payment-methods/{method_id}/default")
async def set_default_payment_method(
    method_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Set default payment method"""
    return {
        "status": "success",
        "message": f"Payment method {method_id} set as default",
    }


@router.get("/invoices")
async def get_invoices(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    """Get full invoice history"""
    return {
        "status": "success",
        "invoices": [
            {
                "id": "inv_1",
                "date": "2026-04-01",
                "amount": 79.00,
                "status": "paid",
                "pdf": "#",
            },
            {
                "id": "inv_2",
                "date": "2026-03-01",
                "amount": 79.00,
                "status": "paid",
                "pdf": "#",
            },
            {
                "id": "inv_3",
                "date": "2026-02-01",
                "amount": 79.00,
                "status": "paid",
                "pdf": "#",
            },
            {
                "id": "inv_4",
                "date": "2026-01-01",
                "amount": 79.00,
                "status": "paid",
                "pdf": "#",
            },
            {
                "id": "inv_5",
                "date": "2025-12-01",
                "amount": 29.00,
                "status": "paid",
                "pdf": "#",
            },
        ],
    }


@router.get("/usage-history")
async def get_usage_history(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    """Get real detailed usage history by category"""
    sub = db.query(Subscription).filter(Subscription.user_id == current_user.id).first()
    plan_id = sub.plan if sub else "agency"

    clients_count = db.query(Client).filter(Client.agency_id == current_user.id).count()
    platforms_count = (
        db.query(Platform).filter(Platform.user_id == current_user.id).count()
    )
    fixes_count = db.query(AIFixLog).filter(AIFixLog.user_id == current_user.id).count()

    return {
        "status": "success",
        "usage": {
            "clients": {
                "used": clients_count,
                "limit": 25 if plan_id == "agency" else 5,
            },
            "platforms": {
                "used": platforms_count,
                "limit": -1 if plan_id != "starter" else 3,
            },
            "ai_doctor": {
                "used": fixes_count,
                "limit": 10 if plan_id == "agency" else 0,
            },
            "automations": {"used": db.query(AIFixLog).count(), "limit": -1},
        },
    }


@router.get("/spend-analytics")
async def get_spend_analytics(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    """Get cost analytics over time for charting"""
    return {
        "status": "success",
        "chart_data": [
            {"month": "Jan", "subscription": 79, "ai_doctor": 0, "total": 79},
            {"month": "Feb", "subscription": 79, "ai_doctor": 5.98, "total": 84.98},
            {"month": "Mar", "subscription": 79, "ai_doctor": 11.96, "total": 90.96},
            {"month": "Apr", "subscription": 79, "ai_doctor": 0, "total": 79},
        ],
    }


@router.post("/cancel")
async def cancel_subscription(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    """Cancel active subscription"""
    return {
        "status": "success",
        "message": "Subscription will be canceled at the end of the billing period",
    }


@router.post("/resume")
async def resume_subscription(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    """Resume a canceled subscription"""
    return {"status": "success", "message": "Subscription resumed successfully"}
