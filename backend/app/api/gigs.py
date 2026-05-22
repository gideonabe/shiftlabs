from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Gig, Application, User
from app.schemas import GigCreate, GigResponse, ApplicationCreate, ApplicationResponse
from app.security import get_current_user
import uuid
from datetime import datetime

router = APIRouter()

@router.get("", response_model=list[GigResponse])
async def get_gigs(
    skip: int = 0,
    limit: int = 20,
    category: str = None,
    db: Session = Depends(get_db)
):
    """Get all active gigs"""
    query = db.query(Gig).filter(Gig.status == "open")
    
    if category:
        query = query.filter(Gig.category == category)
    
    gigs = query.offset(skip).limit(limit).all()
    return gigs

@router.get("/{gig_id}", response_model=GigResponse)
async def get_gig(gig_id: str, db: Session = Depends(get_db)):
    """Get a specific gig"""
    gig = db.query(Gig).filter(Gig.id == gig_id).first()
    
    if not gig:
        raise HTTPException(status_code=404, detail="Gig not found")
    
    return gig

@router.post("", response_model=GigResponse)
async def create_gig(
    gig_data: GigCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new gig (employer only)"""
    if current_user.role != "employer":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only employers can create gigs"
        )
    
    gig = Gig(
        id=str(uuid.uuid4()),
        title=gig_data.title,
        description=gig_data.description,
        category=gig_data.category,
        budget=gig_data.budget,
        duration=gig_data.duration,
        location=gig_data.location,
        employer_id=current_user.id,
        deadline=gig_data.deadline,
        status="open"
    )
    
    db.add(gig)
    db.commit()
    db.refresh(gig)
    
    return gig

@router.put("/{gig_id}", response_model=GigResponse)
async def update_gig(
    gig_id: str,
    gig_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a gig"""
    gig = db.query(Gig).filter(Gig.id == gig_id).first()
    
    if not gig:
        raise HTTPException(status_code=404, detail="Gig not found")
    
    if gig.employer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    for key, value in gig_data.items():
        if value is not None:
            setattr(gig, key, value)
    
    db.commit()
    db.refresh(gig)
    return gig

@router.delete("/{gig_id}")
async def delete_gig(
    gig_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a gig"""
    gig = db.query(Gig).filter(Gig.id == gig_id).first()
    
    if not gig:
        raise HTTPException(status_code=404, detail="Gig not found")
    
    if gig.employer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    db.delete(gig)
    db.commit()
    
    return {"message": "Gig deleted"}

@router.post("/{gig_id}/apply", response_model=ApplicationResponse)
async def apply_to_gig(
    gig_id: str,
    application_data: ApplicationCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Apply to a gig"""
    gig = db.query(Gig).filter(Gig.id == gig_id).first()
    
    if not gig:
        raise HTTPException(status_code=404, detail="Gig not found")
    
    # Check if already applied
    existing = db.query(Application).filter(
        Application.gig_id == gig_id,
        Application.applicant_id == current_user.id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Already applied to this gig")
    
    application = Application(
        id=str(uuid.uuid4()),
        gig_id=gig_id,
        applicant_id=current_user.id,
        cover_letter=application_data.cover_letter,
        status="pending"
    )
    
    db.add(application)
    db.commit()
    db.refresh(application)
    
    return application
