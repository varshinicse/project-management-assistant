from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from routes.auth import router as auth_router
from routes.projects import router as projects_router
from routes.chat import router as chat_router
from routes.upload import router as upload_router
from routes.tasks import router as tasks_router

import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="PM-AI Assistant API")

# Configure CORS
# In production, specify exact origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(projects_router)
app.include_router(tasks_router)
app.include_router(chat_router)
app.include_router(upload_router)

@app.get("/")
async def root():
    return {"message": "Welcome to PM-AI Assistant API"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    is_dev = os.getenv("NODE_ENV") == "development"
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=is_dev)
