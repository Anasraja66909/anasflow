from cryptography.fernet import Fernet
from loguru import logger
from datetime import datetime, timedelta
from typing import Any, Union
from jose import jwt
import bcrypt
import base64
import hashlib
from ..core.config import settings


def create_access_token(
    subject: Union[str, Any], expires_delta: timedelta = None
) -> str:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(
        to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM
    )
    return encoded_jwt


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(
        plain_password.encode("utf-8"), hashed_password.encode("utf-8")
    )


def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


# --- Field Encryption Architecture ---
# Senior Developer Standard: Encrypt sensitive API keys at rest

# Initialize Fernet with the encryption key from settings
try:
    key_bytes = hashlib.sha256(settings.SECRET_KEY.encode()).digest()
    _fernet = Fernet(base64.urlsafe_b64encode(key_bytes))
except Exception as e:
    logger.error(f"Failed to initialize encryption engine: {e}")
    _fernet = None


def encrypt_data(plain_text: str) -> str:
    if not plain_text or not _fernet:
        return plain_text
    return _fernet.encrypt(plain_text.encode()).decode()


def decrypt_data(encrypted_text: str) -> str:
    if not encrypted_text or not _fernet:
        return encrypted_text
    try:
        return _fernet.decrypt(encrypted_text.encode()).decode()
    except Exception as e:
        logger.error(f"Decryption failed: {e}")
        return "[DECRYPTION_ERROR]"
