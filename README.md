# PM-AI Assistant

### Intelligent Conversational AI for Project Management

> A next-generation AI-powered assistant that continuously tracks project progress, predicts potential delays, optimizes resource allocation, and delivers intelligent, data-driven recommendations — ensuring projects are completed on time and within scope.

---

## 🏗️ Project Structure

### Backend (FastAPI)
Located in `/backend`
- **routes/**: Modular API endpoints (`auth.py`, `projects.py`, `tasks.py`, `chat.py`, `upload.py`)
- **models/**: Pydantic schemas for data validation (`user.py`, `project.py`)
- **services/**: Business logic and helper functions (`auth_service.py`)
- **ai/**: AI integration logic (`predictor.py`, `chatbot.py`)
- **database/**: MongoDB connection and session management (`mongodb.py`)

### Frontend (React + Vite)
Located in `/frontend`
- **pages/**: Main application views (`Dashboard`, `Projects`, `Login`, `Register`)
- **components/**: Reusable UI elements (`KanbanBoard`, `ChatUI`, `Layout`, `Sidebar`)
- **api/**: Centralized Axios service for backend integration (`api.ts`)
- **hooks/**: Custom React hooks for state management (`useProjects`, `useTasks`)

---

## 🤖 AI Features
- **Delay Risk Prediction**: Automatically flags tasks likely to miss deadlines using XGBoost models.
- **Status Inconsistency Detection**: Warns if a task is marked "Done" with low progress.
- **Conversational Assistant**: Context-aware chatbot powered by OpenAI for project insights.
- **Smart Task Import**: Parses Excel files to generate project tasks instantly.

---

## 🛠️ Technology Stack

### Frontend
- React
- Tailwind CSS (Premium SaaS UI Overhaul)
- Lucide React (Icons)
- Chart.js (Analytics)

### Backend
- FastAPI (Python)
- Motor (Async MongoDB Driver)
- JWT Authentication
- XGBoost & Scikit-learn (ML Engine)

---

## 🚀 Getting Started

### Backend Setup
1. `cd backend`
2. `pip install -r requirements.txt`
3. Configure `.env` with `MONGODB_URI` and `OPENAI_API_KEY`.
4. `python3 main.py`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

---

## 🔐 Deployment
The project is containerized and ready for production via **Docker Compose**:
```bash
docker-compose up --build
```
Configurations for **Vercel** and **GitHub Actions** are also included.
