from typing import Generator
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from ..core.config import settings
from ..db.session import SessionLocal
from ..models.user import User

# Senior Developer standard: OAuth2 scheme
reusable_oauth2 = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")


def get_db() -> Generator:
    """Database session dependency"""
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(reusable_oauth2)
) -> User:
    """Get current authenticated user from JWT token"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # Senior Developer Standard: Check for dev auth bypass only in DEBUG mode
    if not token and settings.ENABLE_DEV_AUTH and settings.DEBUG:
        user = db.query(User).first()
        if user:
            return user
        raise credentials_exception

    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        token_data_sub: str = payload.get("sub")
        if token_data_sub is None:
            raise credentials_exception
    except (JWTError, Exception):
        # Final fallback bypass check for dev convenience
        if settings.ENABLE_DEV_AUTH and settings.DEBUG:
            user = db.query(User).first()
            if user:
                return user
        raise credentials_exception

    user = db.query(User).filter(User.email == token_data_sub).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    return user
