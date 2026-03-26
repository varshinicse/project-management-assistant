from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from database.mongodb import get_database
from motor.motor_asyncio import AsyncIOMotorDatabase
import pandas as pd
import io
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/upload", tags=["upload"])

@router.post("/{project_id}")
async def upload_tasks(project_id: str, file: UploadFile = File(...), db: AsyncIOMotorDatabase = Depends(get_database)):
    if not file.filename.endswith(('.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload an Excel file.")
    
    try:
        content = await file.read()
        df = pd.read_excel(io.BytesIO(content))
        
        # Expecting columns: title, description, assigned_to, deadline
        required_columns = ["title", "deadline"]
        for col in required_columns:
            if col not in df.columns:
                raise HTTPException(status_code=400, detail=f"Missing required column: {col}")
        
        tasks_created = 0
        for _, row in df.iterrows():
            task_dict = {
                "title": str(row["title"]),
                "description": str(row.get("description", "")),
                "assigned_to": str(row.get("assigned_to", "")),
                "deadline": pd.to_datetime(row["deadline"]).to_pydatetime(),
                "status": "To Do",
                "progress": 0,
                "project_id": project_id,
                "created_at": datetime.utcnow()
            }
            
            result = await db.tasks.insert_one(task_dict)
            await db.projects.update_one(
                {"_id": ObjectId(project_id)},
                {"$push": {"tasks": str(result.inserted_id)}}
            )
            tasks_created += 1
            
        return {"message": f"Successfully created {tasks_created} tasks."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")
