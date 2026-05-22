from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager

# Import routers
from app.api.auth import router as auth_router
from app.api.gigs import router as gigs_router
from app.api.users import router as users_router
from app.api.wallet import router as wallet_router
from app.api.chat import router as chat_router
from app.api.admin import router as admin_router

# Import database
from app.database import engine, Base
from app.config import settings

# Create tables
Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Starting up Shift API...")
    yield
    # Shutdown
    print("Shutting down Shift API...")

app = FastAPI(
    title="Shift API",
    description="Student Gig Economy Platform API",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(gigs_router, prefix="/api/gigs", tags=["gigs"])
app.include_router(users_router, prefix="/api/users", tags=["users"])
app.include_router(wallet_router, prefix="/api/wallet", tags=["wallet"])
app.include_router(chat_router, prefix="/api/chat", tags=["chat"])
app.include_router(admin_router, prefix="/api/admin", tags=["admin"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to Shift API",
        "version": "1.0.0",
        "docs": "/docs",
        "openapi": "/openapi.json"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
