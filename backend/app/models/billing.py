import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Boolean
from .base import Base


class Subscription(Base):
    __tablename__ = "subscriptions"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), nullable=False, index=True)
    plan = Column(String(20), nullable=False)  # starter, agency, pro, enterprise
    status = Column(String(20), default="active")  # active, canceled, past_due
    stripe_customer_id = Column(String(255), nullable=True)
    stripe_subscription_id = Column(String(255), nullable=True)
    current_period_start = Column(DateTime, nullable=True)
    current_period_end = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class PaymentMethod(Base):
    __tablename__ = "payment_methods"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), nullable=False, index=True)
    type = Column(String(20), default="card")
    brand = Column(String(20), nullable=False)  # visa, mastercard, etc
    last4 = Column(String(4), nullable=False)
    exp_month = Column(String(2), nullable=False)
    exp_year = Column(String(4), nullable=False)
    is_default = Column(Boolean, default=False)
    stripe_payment_method_id = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Invoice(Base):
    __tablename__ = "invoices"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), nullable=False, index=True)
    amount = Column(String(20), nullable=False)
    status = Column(String(20), default="paid")  # paid, open, void, uncollectible
    date = Column(DateTime, default=datetime.utcnow)
    pdf_url = Column(String(255), nullable=True)
    stripe_invoice_id = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
