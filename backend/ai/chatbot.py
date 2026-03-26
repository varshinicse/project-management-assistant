import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "your-api-key"))

async def get_chat_response(message: str, context: str = ""):
    """
    Generates a response from OpenAI based on user message and project context.
    """
    system_prompt = f"""
    You are PM-AI Assistant, an intelligent project management expert. 
    Your goal is to help project managers track progress, predict delays, and make better decisions.
    
    Context about the current project/tasks:
    {context}
    
    Provide helpful, professional, and data-driven advice.
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message}
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"I'm sorry, I'm having trouble connecting to my AI core right now. (Error: {str(e)})"
