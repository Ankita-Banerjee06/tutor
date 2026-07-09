from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.dependencies import get_current_active_user, get_admin, get_student
from app import models

router = APIRouter()

@router.get("/student/dashboard")
def student_dashboard(
    current_user: models.User = Depends(get_student),
    db: Session = Depends(get_db)
):
    bookings = db.query(models.Booking).filter(
        models.Booking.student_id == current_user.id
    ).order_by(models.Booking.session_time.desc()).limit(5).all()

    resources = db.query(models.Resource).order_by(
        models.Resource.created_at.desc()
    ).limit(5).all()

    return {
        "user": {
            "full_name": current_user.full_name,
            "email": current_user.email,
            "role": current_user.role.value
        },
        "upcoming_sessions": [
            {
                "id": b.id,
                "subject": b.subject,
                "session_time": str(b.session_time),
                "status": b.status.value
            } for b in bookings
        ],
        "recent_resources": [
            {
                "id": r.id,
                "title": r.title,
                "subject": r.subject
            } for r in resources
        ],
        "purchased_courses": [
            {
                "id": e.course.id,
                "title": e.course.title,
                "purchased_at": str(e.purchased_at)
            } for e in current_user.enrollments
        ]
    }

@router.get("/admin/dashboard")
def admin_dashboard(
    current_user: models.User = Depends(get_admin),
    db: Session = Depends(get_db)
):
    total_users = db.query(models.User).count()
    total_students = db.query(models.User).filter(models.User.role == models.UserRole.STUDENT).count()
    total_tutors = db.query(models.User).filter(models.User.role == models.UserRole.TUTOR).count()
    pending_bookings = db.query(models.Booking).filter(
        models.Booking.status == models.BookingStatus.PENDING
    ).count()
    total_inquiries = db.query(models.Inquiry).count()
    total_courses = db.query(models.Course).count()
    total_enrollments = db.query(models.Enrollment).count()

    recent_users = db.query(models.User).order_by(
        models.User.created_at.desc()
    ).limit(10).all()

    return {
        "stats": {
            "total_users": total_users,
            "total_students": total_students,
            "total_tutors": total_tutors,
            "pending_bookings": pending_bookings,
            "total_inquiries": total_inquiries,
            "total_courses": total_courses,
            "total_enrollments": total_enrollments
        },
        "recent_users": [
            {
                "id": u.id,
                "full_name": u.full_name,
                "email": u.email,
                "role": u.role.value,
                "created_at": str(u.created_at)
            } for u in recent_users
        ]
    }
