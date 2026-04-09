import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime
from .base import Base


class WhiteLabelSettings(Base):
    __tablename__ = "white_label_settings"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(
        String(36), nullable=False, unique=True, index=True
    )  # Agency Owner
    company_name = Column(String(255), nullable=True)
    logo_path = Column(String(255), nullable=True)
    primary_color = Column(String(7), default="#00E5C0")  # Hex Code
    support_email = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
