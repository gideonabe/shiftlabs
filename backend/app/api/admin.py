from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models import User, Gig, Transaction, Application
from app.schemas import AnalyticsResponse, UserResponse
from app.security import get_current_admin

router = APIRouter()

@router.get("/analytics", response_model=AnalyticsResponse)
async def get_analytics(
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Get platform analytics"""
    total_users = db.query(User).count()
    active_gigs = db.query(Gig).filter(Gig.status == "open").count()
    total_volume = db.query(func.sum(Transaction.amount)).scalar() or 0.0
    
    # Calculate completion rate
    completed_applications = db.query(Application).filter(
        Application.status == "accepted"
    ).count()
    total_applications = db.query(Application).count()
    completion_rate = (
        (completed_applications / total_applications * 100)
        if total_applications > 0
        else 0.0
    )
    
    # Calculate average rating
    avg_rating = db.query(func.avg(User.rating)).scalar() or 0.0
    
    return AnalyticsResponse(
        total_users=total_users,
        active_gigs=active_gigs,
        total_volume=float(total_volume),
        flagged_items=0,  # TODO: Implement flagging system
        completion_rate=completion_rate,
        user_growth=15.5,  # TODO: Calculate based on date range
        avg_rating=float(avg_rating)
    )

@router.get("/users", response_model=list[UserResponse])
async def get_users(
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 20,
    role: str = None
):
    """Get list of users"""
    query = db.query(User)
    
    if role:
        query = query.filter(User.role == role)
    
    users = query.offset(skip).limit(limit).all()
    
    return users

@router.post("/users/{user_id}/ban")
async def ban_user(
    user_id: str,
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Ban a user"""
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # TODO: Implement user banning logic
    
    return {"message": "User banned successfully"}

@router.post("/users/{user_id}/unban")
async def unban_user(
    user_id: str,
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Unban a user"""
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # TODO: Implement user unbanning logic
    
    return {"message": "User unbanned successfully"}

@router.delete("/gigs/{gig_id}")
async def remove_gig(
    gig_id: str,
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Remove a gig (admin action)"""
    gig = db.query(Gig).filter(Gig.id == gig_id).first()
    
    if not gig:
        raise HTTPException(status_code=404, detail="Gig not found")
    
    db.delete(gig)
    db.commit()
    
    return {"message": "Gig removed successfully"}
