from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from ai.chatbot import get_chat_response
from database.mongodb import get_database
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import Optional

router = APIRouter(prefix="/chat", tags=["chat"])

class ChatRequest(BaseModel):
    message: str
    project_id: Optional[str] = None

@router.post("/")
async def chat(request: ChatRequest, db: AsyncIOMotorDatabase = Depends(get_database)):
    context = ""
    if request.project_id:
        # Fetch project and task data for context
        project = await db.projects.find_one({"_id": request.project_id})
        if project:
            tasks_cursor = db.tasks.find({"project_id": request.project_id})
            tasks = []
            async for task in tasks_cursor:
                tasks.append(f"Task: {task['title']}, Status: {task['status']}, Progress: {task['progress']}%")
            
            context = f"Project: {project['name']}. Tasks: {', '.join(tasks)}"
    
    response = await get_chat_response(request.message, context)
    return {"response": response}
