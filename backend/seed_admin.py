from app.database import engine, Base, SessionLocal
from app import models
from app.security import get_password_hash
import os

print("Dropping all tables...")
Base.metadata.drop_all(bind=engine)
print("Creating all tables...")
Base.metadata.create_all(bind=engine)

db = SessionLocal()

print("Seeding Admin user...")
admin_email = "admin@admin.com"
admin_password = "adminpassword123"

admin_user = models.User(
    email=admin_email,
    hashed_password=get_password_hash(admin_password),
    full_name="Platform Admin",
    role=models.UserRole.ADMIN
)
db.add(admin_user)
db.commit()

print("Seeding default courses...")
courses = [
    models.Course(title='IB DP Mathematics AA HL', description='Comprehensive guide to Math Analysis & Approaches HL. Master calculus, algebra, and statistics.', price=4999.00),
    models.Course(title='IB DP Physics HL Crash Course', description='Intensive review of all core and AHL topics in Physics. Perfect for final exam preparation.', price=3999.00),
    models.Course(title='IB Economics SL/HL Mastery', description='Learn microeconomics, macroeconomics, and global economics with real-world IB paper examples.', price=2999.00)
]
db.add_all(courses)
db.commit()

print("Seed complete!")
print(f"Admin Login: {admin_email} / {admin_password}")
