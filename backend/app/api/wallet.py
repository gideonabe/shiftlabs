from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Wallet, Transaction
from app.schemas import WalletDetailResponse, TransactionResponse
from app.security import get_current_user
import uuid
from datetime import datetime

router = APIRouter()

@router.get("", response_model=WalletDetailResponse)
async def get_wallet(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's wallet"""
    wallet = db.query(Wallet).filter(Wallet.user_id == current_user.id).first()
    
    if not wallet:
        raise HTTPException(status_code=404, detail="Wallet not found")
    
    return wallet

@router.post("/add-funds")
async def add_funds(
    amount: float,
    method: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Add funds to wallet"""
    wallet = db.query(Wallet).filter(Wallet.user_id == current_user.id).first()
    
    if not wallet:
        raise HTTPException(status_code=404, detail="Wallet not found")
    
    # Update balance
    wallet.balance += amount
    wallet.total_earned += amount
    
    # Create transaction record
    transaction = Transaction(
        id=str(uuid.uuid4()),
        wallet_id=wallet.id,
        amount=amount,
        description=f"Added funds via {method}",
        transaction_type="deposit",
        status="completed"
    )
    
    db.add(transaction)
    db.commit()
    
    return {"message": "Funds added successfully", "new_balance": wallet.balance}

@router.post("/withdraw")
async def withdraw_funds(
    amount: float,
    method: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Withdraw funds from wallet"""
    wallet = db.query(Wallet).filter(Wallet.user_id == current_user.id).first()
    
    if not wallet:
        raise HTTPException(status_code=404, detail="Wallet not found")
    
    if wallet.balance < amount:
        raise HTTPException(status_code=400, detail="Insufficient balance")
    
    # Update balance
    wallet.balance -= amount
    wallet.total_spent += amount
    
    # Create transaction record
    transaction = Transaction(
        id=str(uuid.uuid4()),
        wallet_id=wallet.id,
        amount=-amount,
        description=f"Withdrawn via {method}",
        transaction_type="withdrawal",
        status="completed"
    )
    
    db.add(transaction)
    db.commit()
    
    return {"message": "Funds withdrawn successfully", "new_balance": wallet.balance}

@router.get("/transactions", response_model=list[TransactionResponse])
async def get_transactions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 20
):
    """Get transaction history"""
    wallet = db.query(Wallet).filter(Wallet.user_id == current_user.id).first()
    
    if not wallet:
        raise HTTPException(status_code=404, detail="Wallet not found")
    
    transactions = db.query(Transaction).filter(
        Transaction.wallet_id == wallet.id
    ).offset(skip).limit(limit).all()
    
    return transactions
