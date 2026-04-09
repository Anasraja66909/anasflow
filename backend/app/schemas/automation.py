from typing import Optional
from datetime import datetime
from pydantic import BaseModel, ConfigDict


# Shared properties
class AutomationBase(BaseModel):
    name: Optional[str] = None
    automation_type: Optional[str] = None
    status: Optional[str] = "active"


# Properties to receive via API on creation
class AutomationCreate(AutomationBase):
    name: str
    automation_type: str
    client_id: Optional[str] = None
    platform_id: Optional[str] = None


# Properties to receive via API on update
class AutomationUpdate(AutomationBase):
    executions_today: Optional[str] = None
    executions_month: Optional[str] = None
    cost_month: Optional[str] = None


class AutomationInDBBase(AutomationBase):
    id: Optional[str] = None
    user_id: Optional[str] = None
    client_id: Optional[str] = None
    platform_id: Optional[str] = None
    executions_today: Optional[str] = None
    executions_month: Optional[str] = None
    cost_month: Optional[str] = None
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


# Additional properties to return via API
class Automation(AutomationInDBBase):
    pass


class DiagnosticIssueBase(BaseModel):
    platform: str
    error_logs: str
    workflow_structure: Optional[str] = None
    status: Optional[str] = "active"


class DiagnosticIssueCreate(DiagnosticIssueBase):
    automation_id: Optional[str] = None


class DiagnosticIssue(DiagnosticIssueBase):
    id: str
    user_id: str
    automation_id: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
