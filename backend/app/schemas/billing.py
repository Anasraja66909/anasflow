from typing import Optional
from datetime import datetime
from pydantic import BaseModel, ConfigDict


# Shared properties
class SubscriptionBase(BaseModel):
    plan: Optional[str] = None
    status: Optional[bool] = True


# Properties to return via API
class Subscription(SubscriptionBase):
    id: str
    user_id: str
    plan: str
    status: str
    stripe_customer_id: Optional[str] = None
    stripe_subscription_id: Optional[str] = None
    current_period_start: Optional[datetime] = None
    current_period_end: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class PaymentMethod(BaseModel):
    id: str
    user_id: str
    type: str
    brand: str
    last4: str
    exp_month: str
    exp_year: str
    is_default: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class Invoice(BaseModel):
    id: str
    user_id: str
    amount: str
    status: str
    date: datetime
    pdf_url: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
