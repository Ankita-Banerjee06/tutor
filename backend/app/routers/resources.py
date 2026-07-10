from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db
from app.dependencies import get_current_active_user, get_admin, get_student
import os
import shutil
from datetime import datetime
import uuid

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/resources", response_model=list[schemas.ResourceResponse])
def get_resources(
    course_id: int = None,
    current_user: models.User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    query = db.query(models.Resource)
    
    if current_user.role == models.UserRole.STUDENT:
        # Get courses the student is enrolled in
        enrolled_course_ids = [e.course_id for e in current_user.enrollments]
        query = query.filter(models.Resource.course_id.in_(enrolled_course_ids))
        
    if course_id:
        query = query.filter(models.Resource.course_id == course_id)
        
    return query.order_by(models.Resource.created_at.desc()).all()

@router.post("/resources", response_model=schemas.ResourceResponse)
def upload_resource(
    title: str = Form(...),
    description: str = Form(None),
    course_id: int = Form(...),
    file: UploadFile = File(...),
    current_user: models.User = Depends(get_admin),
    db: Session = Depends(get_db)
):
    # Generate unique filename to prevent overwrites
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    db_resource = models.Resource(
        title=title,
        description=description,
        course_id=course_id,
        file_path=unique_filename,
        uploaded_by=current_user.id,
        created_at=datetime.utcnow()
    )
    
    db.add(db_resource)
    db.commit()
    db.refresh(db_resource)
    
    return db_resource
