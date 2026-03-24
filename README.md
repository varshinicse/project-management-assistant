#  PM-AI Assistant

### Conversational AI for Project Management

> An AI-powered assistant that helps project managers track progress, predict delays, and make better decisions using simple chat.

---

##  Overview

PM-AI Assistant is a smart project management tool that uses AI to make project handling easier and faster.

Instead of checking multiple dashboards, users can simply **ask questions** and get instant answers.

---

##  Problem

Project managers often face:

*  No real-time updates
*  Late detection of delays
*  Poor resource management
*  Too much manual work

---

##  Solution

This system solves the above problems by:

* Tracking project progress automatically
* Predicting delays early
* Suggesting better task assignments
* Providing answers through chat

---

##  Key Features

###  Project Tracking

* View project progress in real-time
* Monitor tasks and team activity

###  Delay Prediction

* Predict delays before they happen
* Helps avoid missed deadlines

###  Resource Management

* Suggests who should do which task
* Balances team workload

###  AI Chat Assistant

You can ask:

* “What is the project status?”
* “Is there any delay?”
* “Who should handle this task?”

---

##  How It Works

1. User enters a query (chat or web)
2. AI understands the question
3. System fetches project data
4. AI analyzes and predicts risks
5. Response is shown to the user

---

##  Technology Stack (Simple)

### Frontend

* React
* Tailwind CSS

### Backend

* Python (FastAPI)

### AI

* OpenAI API

### Database

* PostgreSQL

---

##  API Endpoints

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| GET    | /projects      | Get all projects    |
| GET    | /projects/{id} | Get project details |
| POST   | /chat          | Chat with AI        |
| GET    | /tasks         | Get tasks           |

---

##  Security

* User login system
* Role-based access (Admin / User)
* Secure data handling

---

##  Data Model

Main data stored:

* Project
* Task
* User
* Risk
* Suggestions

---

##  Roadmap

| Phase   | Description            |
| ------- | ---------------------- |
| Phase 1 | Basic system + chat    |
| Phase 2 | Delay prediction       |
| Phase 3 | Improvements & testing |
| Phase 4 | Final deployment       |

---

##  Challenges & Solutions

| Problem                 | Solution               |
| ----------------------- | ---------------------- |
| Low prediction accuracy | Improve model training |
| AI wrong answers        | Use correct data input |
| Data security           | Use encryption         |

---

## 📈 Expected Benefits

*  Better project planning
*  Saves time for managers
*  Faster decision-making

---

##  Future Improvements

* Mobile app
* Voice assistant
* More integrations
* Advanced AI features

---

##  Author

**Varshini P**

---

## Status

 Prototype (College Project)

---

##  License

For educational use only
