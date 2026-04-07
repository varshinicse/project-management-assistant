from fastapi import APIRouter, Depends, HTTPException, status
from models.project import Task, TaskCreate
from database.mongodb import get_database
from ai.predictor import predict_delay, detect_wrong_status
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from typing import List

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.post("/", response_model=Task)
async def create_task(task: TaskCreate, project_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    task_dict = task.dict()
    task_dict["project_id"] = project_id
    task_dict["delay_risk"] = "Low"
    task_dict["progress"] = 0
    task_dict["ai_warning"] = None
    
    result = await db.tasks.insert_one(task_dict)
    task_dict["_id"] = str(result.inserted_id)
    task_dict["id"] = task_dict["_id"]
    
    # Update project task list
    await db.projects.update_one(
        {"_id": ObjectId(project_id)},
        {"$push": {"tasks": task_dict["_id"]}}
    )
    
    return task_dict

def fix_id(doc):
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

@router.put("/{task_id}", response_model=Task)
async def update_task(task_id: str, task_update: dict, db: AsyncIOMotorDatabase = Depends(get_database)):
    # Fetch current task for AI validation
    current_task = await db.tasks.find_one({"_id": ObjectId(task_id)})
    if not current_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Handle status and progress updates
    status = task_update.get("status", current_task["status"])
    progress = task_update.get("progress", current_task["progress"])
    
    # AI Logic: Predict Delay and Detect Inconsistent Status
    prediction = predict_delay(progress, current_task["deadline"])
    warning = detect_wrong_status(status, progress)
    
    task_update["delay_risk"] = prediction["risk"]
    task_update["ai_warning"] = warning
    
    await db.tasks.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": task_update}
    )
    
    updated_task = await db.tasks.find_one({"_id": ObjectId(task_id)})
    return fix_id(updated_task)

@router.delete("/{task_id}")
async def delete_task(task_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    task = await db.tasks.find_one({"_id": ObjectId(task_id)})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Remove from project
    project_id = task["project_id"]
    await db.projects.update_one(
        {"_id": ObjectId(project_id)},
        {"$pull": {"tasks": task_id}}
    )
    
    await db.tasks.delete_one({"_id": ObjectId(task_id)})
    return {"message": "Task deleted successfully"}
