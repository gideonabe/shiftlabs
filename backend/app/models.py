from sqlalchemy import Column, String, Integer, Float, DateTime, Boolean, ForeignKey, Text, Enum, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime
from app.database import Base
import enum

# Association tables for many-to-many relationships
gig_skills = Table(
    'gig_skills',
    Base.metadata,
    Column('gig_id', String(36), ForeignKey('gigs.id')),
    Column('skill', String(100))
)

user_skills = Table(
    'user_skills',
    Base.metadata,
    Column('user_id', String(36), ForeignKey('users.id')),
    Column('skill', String(100))
)

class RoleEnum(str, enum.Enum):
    STUDENT = "student"
    EMPLOYER = "employer"
    ADMIN = "admin"

class GigStatusEnum(str, enum.Enum):
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class User(Base):
    __tablename__ = "users"
    
    id = Column(String(36), primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    hashed_password = Column(String(255))
    name = Column(String(255))
    role = Column(Enum(RoleEnum), default=RoleEnum.STUDENT)
    avatar = Column(String(500), nullable=True)
    bio = Column(Text, nullable=True)
    rating = Column(Float, default=0.0)
    verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    gigs = relationship("Gig", back_populates="employer", foreign_keys="Gig.employer_id")
    applications = relationship("Application", back_populates="applicant")
    wallet = relationship("Wallet", back_populates="user", uselist=False)
    conversations = relationship("Conversation", secondary="conversation_participants")
    messages = relationship("Message", back_populates="sender")

class Gig(Base):
    __tablename__ = "gigs"
    
    id = Column(String(36), primary_key=True, index=True)
    title = Column(String(255), index=True)
    description = Column(Text)
    category = Column(String(100), index=True)
    budget = Column(Float)
    duration = Column(String(100))
    location = Column(String(255))
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    status = Column(Enum(GigStatusEnum), default=GigStatusEnum.OPEN)
    employer_id = Column(String(36), ForeignKey('users.id'), index=True)
    deadline = Column(DateTime(timezone=True))
    image = Column(String(500), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    employer = relationship("User", back_populates="gigs", foreign_keys=[employer_id])
    applications = relationship("Application", back_populates="gig", cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="gig")

class Application(Base):
    __tablename__ = "applications"
    
    id = Column(String(36), primary_key=True, index=True)
    gig_id = Column(String(36), ForeignKey('gigs.id'), index=True)
    applicant_id = Column(String(36), ForeignKey('users.id'), index=True)
    cover_letter = Column(Text)
    status = Column(String(50), default="pending")  # pending, accepted, rejected
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    gig = relationship("Gig", back_populates="applications")
    applicant = relationship("User", back_populates="applications")

class Wallet(Base):
    __tablename__ = "wallets"
    
    id = Column(String(36), primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey('users.id'), unique=True, index=True)
    balance = Column(Float, default=0.0)
    total_earned = Column(Float, default=0.0)
    total_spent = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="wallet")
    transactions = relationship("Transaction", back_populates="wallet")

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(String(36), primary_key=True, index=True)
    wallet_id = Column(String(36), ForeignKey('wallets.id'), index=True)
    amount = Column(Float)
    description = Column(String(255))
    transaction_type = Column(String(50))  # deposit, withdrawal, payment, earn
    status = Column(String(50), default="completed")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    wallet = relationship("Wallet", back_populates="transactions")

class Payment(Base):
    __tablename__ = "payments"
    
    id = Column(String(36), primary_key=True, index=True)
    gig_id = Column(String(36), ForeignKey('gigs.id'), index=True)
    from_user_id = Column(String(36), ForeignKey('users.id'))
    to_user_id = Column(String(36), ForeignKey('users.id'))
    amount = Column(Float)
    status = Column(String(50), default="pending")  # pending, completed, failed
    stripe_payment_id = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    gig = relationship("Gig", back_populates="payments")

class Message(Base):
    __tablename__ = "messages"
    
    id = Column(String(36), primary_key=True, index=True)
    conversation_id = Column(String(36), ForeignKey('conversations.id'), index=True)
    sender_id = Column(String(36), ForeignKey('users.id'), index=True)
    content = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    conversation = relationship("Conversation", back_populates="messages")
    sender = relationship("User", back_populates="messages")

class Conversation(Base):
    __tablename__ = "conversations"
    
    id = Column(String(36), primary_key=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    messages = relationship("Message", back_populates="conversation", cascade="all, delete-orphan")
    participants = relationship("User", secondary="conversation_participants")

conversation_participants = Table(
    'conversation_participants',
    Base.metadata,
    Column('conversation_id', String(36), ForeignKey('conversations.id')),
    Column('user_id', String(36), ForeignKey('users.id'))
)
