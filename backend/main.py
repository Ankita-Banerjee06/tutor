from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from app.logger import logger
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from app.database import engine, Base, get_db
from app.routers import auth, dashboard
from app.schemas import InquiryCreate
from app.models import Inquiry

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="IBDP Platform API",
    description="Backend API for AI-powered IBDP Learning Platform",
    version="2.0.0"
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global Exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"message": "An unexpected error occurred. Please try again later."},
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logger.warning(f"Validation Error: {exc.errors()}")
    return JSONResponse(
        status_code=422,
        content={"message": "Invalid request parameters", "details": exc.errors()},
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5175", "http://127.0.0.1:5175", "http://localhost:5174", "http://127.0.0.1:5174"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(dashboard.router, prefix="/api", tags=["Dashboard"])

def send_email_notification(inquiry: InquiryCreate):
    print(f"--- EMAIL NOTIFICATION ---")
    print(f"To: admin@tutoring.com")
    print(f"Subject: New Consultation Request from {inquiry.full_name}")
    print(f"Details: {inquiry.model_dump_json(indent=2)}")
    print(f"--------------------------")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "Platform API is running smoothly"}

@app.post("/api/contact")
async def submit_contact(form: InquiryCreate, db: Session = Depends(get_db)):
    db_inquiry = Inquiry(
        full_name=form.full_name,
        email=form.email,
        phone=form.phone,
        role=form.role,
        ib_programme=form.ib_programme,
        subjects=", ".join(form.subjects),
        service_required=form.service_required,
        preferred_mode=form.preferred_mode,
        preferred_time=form.preferred_time,
        message=form.message
    )
    db.add(db_inquiry)
    db.commit()
    
    send_email_notification(form)
    
    return {"status": "success", "message": "Thank you for reaching out! We will contact you within 24 hours."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
