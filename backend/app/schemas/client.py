from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, ConfigDict


# Shared properties
class ClientBase(BaseModel):
    name: Optional[str] = None
    company_name: Optional[str] = None
    email: Optional[EmailStr] = None
    website: Optional[str] = None
    status: Optional[str] = "active"


# Properties to receive via API on creation
class ClientCreate(ClientBase):
    name: str


# Properties to receive via API on update
class ClientUpdate(ClientBase):
    pass


class ClientInDBBase(ClientBase):
    id: Optional[str] = None
    agency_id: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


# Additional properties to return via API
class Client(ClientInDBBase):
    pass


# Additional properties stored in DB
class ClientInDB(ClientInDBBase):
    pass
