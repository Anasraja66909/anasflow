import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Boolean, Text
from .base import Base


class Platform(Base):
    __tablename__ = "platforms"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), nullable=False, index=True)  # Agency ID
    client_id = Column(String(36), nullable=True, index=True)
    platform_type = Column(String(50), nullable=False)  # gohighlevel, manychat, etc.
    platform_name = Column(String(100), nullable=True)

    # Auth Handling
    auth_type = Column(String(20), default="api_key")  # api_key, oauth2
    api_key = Column(Text, nullable=True)  # Nullable for OAuth
    access_token = Column(Text, nullable=True)
    refresh_token = Column(Text, nullable=True)
    token_expires_at = Column(DateTime, nullable=True)

    api_endpoint = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    status = Column(String(50), default="connected")
    metadata_json = Column(Text, default="{}")
    last_sync_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class PlatformConnection(Base):
    __tablename__ = "platform_connections"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), nullable=False, index=True)
    organization_id = Column(String(36), nullable=False, index=True)
    platform_type = Column(String(50), nullable=False)
    platform_name = Column(String(100), nullable=False)
    access_token = Column(Text, nullable=False)
    refresh_token = Column(Text, nullable=True)
    token_expires_at = Column(DateTime, nullable=True)
    status = Column(String(50), default="connected")
    metadata_json = Column(Text, default="{}")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
