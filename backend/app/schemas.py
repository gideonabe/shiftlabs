from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum

class RoleEnum(str, Enum):
    STUDENT = "student"
    EMPLOYER = "employer"
    ADMIN = "admin"

# Auth Schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str
    role: RoleEnum = RoleEnum.STUDENT

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    role: RoleEnum
    avatar: Optional[str] = None
    bio: Optional[str] = None
    rating: float = 0.0
    verified: bool = False
    created_at: datetime

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# Gig Schemas
class GigCreate(BaseModel):
    title: str
    description: str
    category: str
    budget: float
    duration: str
    location: str
    skills: List[str]
    deadline: datetime

class GigUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    budget: Optional[float] = None
    duration: Optional[str] = None
    location: Optional[str] = None
    skills: Optional[List[str]] = None
    deadline: Optional[datetime] = None

class GigResponse(BaseModel):
    id: str
    title: str
    description: str
    category: str
    budget: float
    duration: str
    location: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    skills: List[str] = []
    status: str
    employer: UserResponse
    applicants: int = 0
    created_at: datetime
    deadline: datetime

    class Config:
        from_attributes = True

# Application Schemas
class ApplicationCreate(BaseModel):
    cover_letter: str

class ApplicationResponse(BaseModel):
    id: str
    gig_id: str
    applicant: UserResponse
    cover_letter: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

# Wallet Schemas
class WalletResponse(BaseModel):
    id: str
    balance: float
    total_earned: float
    total_spent: float

class TransactionResponse(BaseModel):
    id: str
    amount: float
    description: str
    transaction_type: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class WalletDetailResponse(WalletResponse):
    transactions: List[TransactionResponse] = []

# Chat Schemas
class MessageCreate(BaseModel):
    content: str

class MessageResponse(BaseModel):
    id: str
    conversation_id: str
    sender_id: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True

class ConversationResponse(BaseModel):
    id: str
    participants: List[UserResponse]
    messages: List[MessageResponse] = []
    created_at: datetime

    class Config:
        from_attributes = True

# Admin Schemas
class AnalyticsResponse(BaseModel):
    total_users: int
    active_gigs: int
    total_volume: float
    flagged_items: int
    completion_rate: float
    user_growth: float
    avg_rating: float
