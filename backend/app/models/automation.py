import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Boolean, Text
from .base import Base


class Automation(Base):
    __tablename__ = "automations"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), nullable=False, index=True)
    client_id = Column(String(36), nullable=True)
    platform_id = Column(String(36), nullable=True)
    automation_type = Column(String(50), nullable=False)
    name = Column(String(255), nullable=False)
    status = Column(String(20), default="active")
    executions_today = Column(String(20), default="0")
    executions_month = Column(String(20), default="0")
    cost_month = Column(String(20), default="0.0")
    created_at = Column(DateTime, default=datetime.utcnow)


class DiagnosticIssue(Base):
    __tablename__ = "diagnostic_issues"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), nullable=False, index=True)
    automation_id = Column(String(36), nullable=True)
    platform = Column(String(50), nullable=False)
    error_logs = Column(Text, nullable=False)
    workflow_structure = Column(Text, nullable=True)  # JSON representation
    status = Column(String(20), default="active")  # active, fixing, fixed, ignored
    created_at = Column(DateTime, default=datetime.utcnow)


class AIFixLog(Base):
    __tablename__ = "ai_fix_logs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    issue_id = Column(String(36), nullable=False, index=True)
    user_id = Column(String(36), nullable=False)
    root_cause = Column(Text, nullable=False)
    suggested_fix = Column(Text, nullable=False)
    before_json = Column(Text, nullable=True)
    after_json = Column(Text, nullable=True)
    estimated_savings = Column(String(50), nullable=True)
    applied = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
