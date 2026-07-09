from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from app.models import UserRole, BookingStatus, PaymentStatus

# User Schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: Optional[UserRole] = UserRole.STUDENT

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: Optional[str] = None
    role: UserRole
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class TokenData(BaseModel):
    email: Optional[str] = None

# Profile Schemas
class ProfileCreate(BaseModel):
    bio: Optional[str] = None
    ib_programme: Optional[str] = None
    subjects: Optional[str] = None
    phone: Optional[str] = None
    timezone: Optional[str] = None

class ProfileResponse(ProfileCreate):
    id: int
    user_id: int

    class Config:
        from_attributes = True

# Inquiry Schemas
class InquiryCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    role: str
    ib_programme: str
    subjects: List[str]
    service_required: str
    preferred_mode: str
    preferred_time: str
    message: str

# Booking Schemas
class BookingCreate(BaseModel):
    tutor_id: Optional[int] = None
    subject: str
    session_time: datetime
    duration_minutes: Optional[int] = 60
    notes: Optional[str] = None

class BookingResponse(BookingCreate):
    id: int
    student_id: int
    status: BookingStatus
    meeting_link: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# Resource Schemas
class ResourceCreate(BaseModel):
    title: str
    description: Optional[str] = None
    file_path: str
    subject: str

class ResourceResponse(ResourceCreate):
    id: int
    uploaded_by: int
    created_at: datetime

    class Config:
        from_attributes = True

# BlogPost Schemas
class BlogPostCreate(BaseModel):
    title: str
    slug: str
    content: str
    is_published: Optional[bool] = False

class BlogPostResponse(BlogPostCreate):
    id: int
    author_id: int
    created_at: datetime

    class Config:
        from_attributes = True
