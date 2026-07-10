from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db
from app.dependencies import get_current_active_user, get_student, get_admin
import razorpay
import os
from datetime import datetime

router = APIRouter()

RAZORPAY_KEY_ID = "rzp_test_TBgAGvG1O3Kk1Z"
RAZORPAY_KEY_SECRET = "v4uf77v4hdwNSDTeQF2Rao60"

# Setup Razorpay client
razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

class PaymentVerification(BaseModel):
    razorpay_payment_id: str
    razorpay_order_id: str
    razorpay_signature: str
    course_id: int

@router.get("/courses", response_model=list[schemas.CourseResponse])
def get_courses(db: Session = Depends(get_db)):
    courses = db.query(models.Course).all()
    return courses

@router.post("/courses", response_model=schemas.CourseResponse)
def create_course(
    course: schemas.CourseCreate,
    current_user: models.User = Depends(get_admin),
    db: Session = Depends(get_db)
):
    db_course = models.Course(
        title=course.title,
        description=course.description,
        price=course.price,
        instructor_id=current_user.id,
        created_at=datetime.utcnow()
    )
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

@router.post("/courses/{course_id}/create-order")
def create_razorpay_order(
    course_id: int, 
    current_user: models.User = Depends(get_student),
    db: Session = Depends(get_db)
):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
        
    # Check if already enrolled
    existing_enrollment = db.query(models.Enrollment).filter(
        models.Enrollment.student_id == current_user.id,
        models.Enrollment.course_id == course_id
    ).first()
    
    if existing_enrollment:
        raise HTTPException(status_code=400, detail="Already enrolled in this course")

    try:
        # Amount in paise (multiply by 100)
        amount = int(course.price * 100)
        order_data = {
            "amount": amount,
            "currency": "INR", # Assuming INR or USD based on Razorpay configuration
            "receipt": f"receipt_course_{course_id}_{current_user.id}",
            "notes": {
                "course_id": course_id,
                "student_id": current_user.id
            }
        }
        order = razorpay_client.order.create(data=order_data)
        
        return {
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
            "key_id": RAZORPAY_KEY_ID,
            "course": {
                "name": course.title,
                "description": course.description
            },
            "user": {
                "name": current_user.full_name,
                "email": current_user.email
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/courses/verify-payment")
def verify_payment(
    data: PaymentVerification,
    current_user: models.User = Depends(get_student),
    db: Session = Depends(get_db)
):
    try:
        # Verify signature
        params_dict = {
            'razorpay_order_id': data.razorpay_order_id,
            'razorpay_payment_id': data.razorpay_payment_id,
            'razorpay_signature': data.razorpay_signature
        }
        
        razorpay_client.utility.verify_payment_signature(params_dict)
        
        # Check if already enrolled to prevent duplicates
        existing = db.query(models.Enrollment).filter(
            models.Enrollment.student_id == current_user.id,
            models.Enrollment.course_id == data.course_id
        ).first()
        
        if not existing:
            new_enrollment = models.Enrollment(
                student_id=current_user.id,
                course_id=data.course_id,
                purchased_at=datetime.utcnow()
            )
            db.add(new_enrollment)
            db.commit()
            
        return {"status": "success", "message": "Payment verified and enrolled successfully"}
        
    except razorpay.errors.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid payment signature")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
