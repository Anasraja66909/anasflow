import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime
from .base import Base


class Client(Base):
    __tablename__ = "clients"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    agency_id = Column(String(36), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    company_name = Column(String(255), nullable=True)
    email = Column(String(255), nullable=True)
    website = Column(String(255), nullable=True)
    status = Column(String(20), default="active")  # active, inactive, churned
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
