import os
import logging
from cryptography.fernet import Fernet, InvalidToken

logger = logging.getLogger(__name__)

# Retrieve the encryption key from environment variable
# If it doesn't exist, we fallback to a safe default for development ONLY
# Do NOT rely on the default in production!
_ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY")
if not _ENCRYPTION_KEY:
    logger.warning(
        "ENCRYPTION_KEY not found in environment. Generating a temporary volatile key!"
    )
    _ENCRYPTION_KEY = Fernet.generate_key().decode()

fernet_instance = Fernet(_ENCRYPTION_KEY.encode())


def encrypt_key(plain_text: str) -> str:
    """
    Encrypts an API key or sensitive string at rest.
    Returns the encrypted string.
    """
    if not plain_text:
        return ""

    encoded_text = plain_text.encode()
    encrypted_text = fernet_instance.encrypt(encoded_text)
    return encrypted_text.decode()


def decrypt_key(encrypted_text: str) -> str:
    """
    Decrypts an API key or sensitive string from the database.
    """
    if not encrypted_text:
        return ""

    try:
        decrypted_text = fernet_instance.decrypt(encrypted_text.encode())
        return decrypted_text.decode()
    except InvalidToken:
        logger.error(
            "Failed to decrypt API key. The encryption key might have changed!"
        )
        return "[ENCRYPTION_ERROR]"
    except Exception as e:
        logger.error(f"Decryption error: {e}")
        return ""
