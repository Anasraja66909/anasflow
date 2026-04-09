from typing import Optional
from datetime import datetime
from pydantic import BaseModel, ConfigDict


# Shared properties
class WhiteLabelSettingsBase(BaseModel):
    company_name: Optional[str] = None
    logo_path: Optional[str] = None
    primary_color: Optional[str] = "#00E5C0"
    support_email: Optional[str] = None


# Properties to receive via API on creation
class WhiteLabelSettingsCreate(WhiteLabelSettingsBase):
    pass


# Properties to receive via API on update
class WhiteLabelSettingsUpdate(WhiteLabelSettingsBase):
    pass


class WhiteLabelSettingsInDBBase(WhiteLabelSettingsBase):
    id: Optional[str] = None
    user_id: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


# Additional properties to return via API
class WhiteLabelSettings(WhiteLabelSettingsInDBBase):
    pass


# Additional properties stored in DB
class WhiteLabelSettingsInDB(WhiteLabelSettingsInDBBase):
    pass
