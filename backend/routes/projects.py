from fastapi import APIRouter, Depends, HTTPException, status
from models.project import ProjectCreate, Project, TaskCreate, Task
from database.mongodb import get_database
from routes.auth import router as auth_router # For consistency, but we'll need current_user dep
from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId

router = APIRouter(prefix="/projects", tags=["projects"])

# Helper to convert MongoDB _id to string
def fix_id(doc):
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

@router.post("/", response_model=Project)
async def create_project(project: ProjectCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    project_dict = project.dict()
    project_dict["tasks"] = []
    project_dict["completion_percentage"] = 0.0
    project_dict["overall_risk"] = "Low"
    
    result = await db.projects.insert_one(project_dict)
    project_dict["_id"] = str(result.inserted_id)
    return project_dict

@router.get("/", response_model=List[Project])
async def list_projects(db: AsyncIOMotorDatabase = Depends(get_database)):
    projects = []
    cursor = db.projects.find()
    async for project in cursor:
        projects.append(fix_id(project))
    return projects

@router.get("/{project_id}/tasks", response_model=List[Task])
async def list_tasks_by_project(project_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    tasks = []
    cursor = db.tasks.find({"project_id": project_id})
    async for task in cursor:
        tasks.append(fix_id(task))
    return tasks
