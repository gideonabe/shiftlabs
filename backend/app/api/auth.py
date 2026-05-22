from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Wallet
from app.schemas import UserCreate, UserLogin, UserResponse, TokenResponse
from app.security import create_access_token, verify_password, hash_password
import uuid
from datetime import datetime

router = APIRouter()

@router.post("/register", response_model=TokenResponse)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    user_id = str(uuid.uuid4())
    hashed_password = hash_password(user_data.password)
    
    new_user = User(
        id=user_id,
        email=user_data.email,
        hashed_password=hashed_password,
        name=user_data.name,
        role=user_data.role,
        verified=False
    )
    
    db.add(new_user)
    db.commit()
    
    # Create wallet for user
    wallet = Wallet(
        id=str(uuid.uuid4()),
        user_id=user_id
    )
    db.add(wallet)
    db.commit()
    
    # Generate token
    access_token = create_access_token(data={"sub": user_id})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "name": new_user.name,
            "role": new_user.role,
            "verified": new_user.verified
        }
    }

@router.post("/login", response_model=TokenResponse)
async def login(user_data: UserLogin, db: Session = Depends(get_db)):
    """Login user"""
    user = db.query(User).filter(User.email == user_data.email).first()
    
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    access_token = create_access_token(data={"sub": user.id})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "role": user.role,
            "verified": user.verified
        }
    }

@router.post("/verify-email")
async def verify_email(token: str, db: Session = Depends(get_db)):
    """Verify email"""
    # TODO: Implement email verification with tokens
    return {"message": "Email verified"}

@router.post("/resend-verification")
async def resend_verification(email: str, db: Session = Depends(get_db)):
    """Resend verification email"""
    # TODO: Implement email resend
    return {"message": "Verification email sent"}
