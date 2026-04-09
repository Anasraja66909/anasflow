from typing import Optional
from datetime import datetime
from pydantic import BaseModel, ConfigDict


# Shared properties
class PlatformBase(BaseModel):
    platform_type: Optional[str] = None
    platform_name: Optional[str] = None
    is_active: Optional[bool] = True
    status: Optional[str] = "connected"
    metadata_json: Optional[str] = "{}"


# Properties to receive via API on creation
class PlatformCreate(PlatformBase):
    platform_type: str
    client_id: Optional[str] = None
    api_key: Optional[str] = None
    auth_type: Optional[str] = "api_key"


# Properties to receive via API on update
class PlatformUpdate(PlatformBase):
    pass


class PlatformInDBBase(PlatformBase):
    id: Optional[str] = None
    user_id: Optional[str] = None
    client_id: Optional[str] = None
    auth_type: Optional[str] = None
    api_endpoint: Optional[str] = None
    last_sync_at: Optional[datetime] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


# Additional properties to return via API
class Platform(PlatformInDBBase):
    pass


# Additional properties stored in DB
class PlatformInDB(PlatformInDBBase):
    api_key: Optional[str] = None
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None
    token_expires_at: Optional[datetime] = None
