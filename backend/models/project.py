from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    assigned_to: Optional[str] = None  # Username
    deadline: datetime
    status: str = "To Do"  # To Do, In Progress, Done
    progress: int = Field(default=0, ge=0, le=100)

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: str = Field(alias="_id")
    project_id: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # AI Metadata
    delay_risk: Optional[str] = "Low"  # Low, Medium, High
    ai_warning: Optional[str] = None

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    owner: str  # Username

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: str = Field(alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    tasks: List[str] = []  # List of Task IDs
    completion_percentage: float = 0.0
    overall_risk: str = "Low"
