from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from ..api import deps
from ..core.config import settings
from ..core import security
from ..schemas.user import User as UserSchema, UserCreate, Token
from ..models.user import User as UserModel

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/register", response_model=Token)
def register(user_in: UserCreate, db: Session = Depends(deps.get_db)):
    """Register a new agency user and return a JWT token."""
    # Senior Developer check: Ensure user uniqueness
    user = db.query(UserModel).filter(UserModel.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists.",
        )

    # Senior Developer Standard: Use a dedicated security module for hashing
    db_user = UserModel(
        email=user_in.email,
        password_hash=security.get_password_hash(user_in.password),
        full_name=user_in.full_name,
        company_name=user_in.company_name,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Generate production-grade JWT
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        subject=db_user.email, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer", "user": db_user}


@router.post("/login", response_model=Token)
def login(
    db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()
):
    """OAuth2 compatible token login, getting username (email) and password."""
    user = db.query(UserModel).filter(UserModel.email == form_data.username).first()
    if not user or not security.verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        subject=user.email, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer", "user": user}


@router.get("/me", response_model=UserSchema)
def get_me(current_user: UserModel = Depends(deps.get_current_user)):
    """Get the currently authenticated user's details."""
    return current_user
