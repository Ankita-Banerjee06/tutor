from fastapi import APIRouter, Depends, HTTPException
from app import models, schemas
from app.dependencies import get_student
import os
from groq import Groq

router = APIRouter()

# Initialize Groq client
# Fallback to empty string to avoid crash on startup if not present, but it will fail on use
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

@router.post("/chat", response_model=schemas.ChatResponse)
def chat_with_ai(
    request: schemas.ChatRequest,
    current_user: models.User = Depends(get_student)
):
    if not client:
        raise HTTPException(status_code=500, detail="Groq API key not configured. Please add GROQ_API_KEY to your .env file.")
        
    messages = [
        {"role": "system", "content": "You are a helpful, expert AI tutor specifically for IB (International Baccalaureate) students. Provide concise, clear, and encouraging answers."}
    ]
    
    # Add history
    for msg in request.history:
        # Assuming history format: [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]
        if "role" in msg and "content" in msg:
            messages.append({"role": msg["role"], "content": msg["content"]})
            
    # Add current message
    messages.append({"role": "user", "content": request.message})
    
    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages,
            temperature=0.7,
            max_tokens=1024,
            top_p=1,
            stream=False,
            stop=None,
        )
        reply = completion.choices[0].message.content
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
