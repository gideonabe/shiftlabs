from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Conversation, Message, conversation_participants
from app.schemas import ConversationResponse, MessageCreate, MessageResponse
from app.security import get_current_user
import uuid

router = APIRouter()

@router.get("/conversations", response_model=list[ConversationResponse])
async def get_conversations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all conversations for current user"""
    conversations = (
        db.query(Conversation)
        .join(conversation_participants)
        .filter(conversation_participants.c.user_id == current_user.id)
        .all()
    )
    
    return conversations

@router.post("/conversations", response_model=ConversationResponse)
async def create_conversation(
    user_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new conversation"""
    # Check if conversation already exists
    existing = (
        db.query(Conversation)
        .join(conversation_participants)
        .filter(conversation_participants.c.user_id == current_user.id)
        .join(conversation_participants, isouter=True)
        .filter(conversation_participants.c.user_id == user_id)
        .first()
    )
    
    if existing:
        return existing
    
    # Create new conversation
    conversation = Conversation(id=str(uuid.uuid4()))
    db.add(conversation)
    db.flush()
    
    # Add participants
    db.execute(conversation_participants.insert().values(
        conversation_id=conversation.id,
        user_id=current_user.id
    ))
    db.execute(conversation_participants.insert().values(
        conversation_id=conversation.id,
        user_id=user_id
    ))
    
    db.commit()
    db.refresh(conversation)
    
    return conversation

@router.get("/conversations/{conversation_id}/messages", response_model=list[MessageResponse])
async def get_messages(
    conversation_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 50
):
    """Get messages in a conversation"""
    # Verify user is participant
    is_participant = (
        db.query(conversation_participants)
        .filter(
            conversation_participants.c.conversation_id == conversation_id,
            conversation_participants.c.user_id == current_user.id
        )
        .first()
    )
    
    if not is_participant:
        raise HTTPException(status_code=403, detail="Not a participant in this conversation")
    
    messages = (
        db.query(Message)
        .filter(Message.conversation_id == conversation_id)
        .offset(skip)
        .limit(limit)
        .all()
    )
    
    return messages

@router.post("/conversations/{conversation_id}/messages", response_model=MessageResponse)
async def send_message(
    conversation_id: str,
    message_data: MessageCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Send a message in a conversation"""
    # Verify user is participant
    is_participant = (
        db.query(conversation_participants)
        .filter(
            conversation_participants.c.conversation_id == conversation_id,
            conversation_participants.c.user_id == current_user.id
        )
        .first()
    )
    
    if not is_participant:
        raise HTTPException(status_code=403, detail="Not a participant in this conversation")
    
    message = Message(
        id=str(uuid.uuid4()),
        conversation_id=conversation_id,
        sender_id=current_user.id,
        content=message_data.content
    )
    
    db.add(message)
    db.commit()
    db.refresh(message)
    
    return message
