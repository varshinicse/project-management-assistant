# AI Functionality - PM-AI Assistant 🤖

This document explains how the AI works in this project in a simple and clear way.

---

## 1. What AI Models are Used?

We use two types of intelligence in this system:

| Feature | AI Model / Strategy | Purpose |
| :--- | :--- | :--- |
| **Chatbot** | **OpenAI (GPT-4o)** | To talk to you like a human, answer questions about your project, and give advice. |
| **Delay Prediction** | **Rule-Based (Heuristic)** | To look at your task deadline and progress and tell you if you are at risk of being late. |
| **Error Detection** | **Rule-Based (Heuristic)** | To catch mistakes, like if you mark a task "Done" but you only did 10% of the work. |

---

## 2. Is an External API Required?

**Yes, for the Chatbot.**

*   **OpenAI API**: This is **Mandatory** for the `/chat` feature. Without an API key, the chatbot will not be able to answer your questions.
*   **Other Features**: The Delay Prediction and Error Detection work **locally** on your computer. They do NOT need an internet connection or an API key.

---

## 3. How is OpenAI Integrated?

### The Flow:
1. **Frontend**: You type a message in the Chat UI.
2. **Backend**: FastAPI receives your message and fetches the current project data (context).
3. **AI Service**: It sends your message + project data to OpenAI using your **Secret API Key**.
4. **Response**: OpenAI sends back a smart answer, which we show you in the browser.

### Where is the API Key used?
The key is stored in a `.env` file (like a secret vault). The backend reads this key from `os.getenv("OPENAI_API_KEY")` when it talks to OpenAI.

---

## 4. Feature Mapping (Who does what?)

*   **Chatbot** → **OpenAI**: This is the "brain" that understands language.
*   **Delay Prediction** → **Local Logic**: This is a set of "Smart Rules". For example, "If the deadline is in 2 days and progress is < 50%, mark as High Risk."
*   **Recommendations** → **Local Logic**: The system suggests simple actions (like "Assign more people") based on the risk it detected.
*   **Error Detection** → **Local Logic**: It flags inconsistencies (like "Task is In Progress but progress is 0%").

---

## 5. Why use Rule-Based for Predictions?
We use rule-based logic for predictions because it is **fast, 100% free, and very easy to understand**. In a real-world scenario, you could upgrade this to an ML model (like XGBoost) if you have thousands of historical project records to learn from.

---

## 6. Summary for Beginners
*   **Chatbot**: Needs the internet and an OpenAI key. It's the "Talker".
*   **Predictor**: Works offline and for free. It's the "Calculator".
*   **Logic**: All the AI "brains" are located in the `backend/ai/` folder.
