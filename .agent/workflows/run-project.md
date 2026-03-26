---
description: How to run the Project Management Assistant
---

## Prerequisites
- Python 3.9+ 
- Node.js 18+
- MongoDB (Ensure it's running locally or update `.env` in the backend)

## 1. Backend Setup & Run

Navigate to the backend directory:
```bash
cd backend
```

Install Python dependencies:
```bash
pip install -r requirements.txt
```

Run the FastAPI server:
```bash
python main.py
```
The API will be available at `http://localhost:8000`.

## 2. Frontend Setup & Run

Navigate to the frontend directory:
```bash
cd frontend
```

Install npm dependencies:
```bash
npm install
```

Run the Vite development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 3. Environment Variables
Make sure to check and update the `.env` file in the `backend` directory with your MongoDB URI and OpenAI API Key.
