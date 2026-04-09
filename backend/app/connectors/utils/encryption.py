from cryptography.fernet import Fernet
import os

# In production, use Supabase Vault or a secure key store
FERNET_KEY = os.environ.get("ANASFLOW_ENCRYPTION_KEY", Fernet.generate_key())
fernet = Fernet(FERNET_KEY)


def encrypt_data(data: str) -> str:
    return fernet.encrypt(data.encode()).decode()


def decrypt_data(token: str) -> str:
    return fernet.decrypt(token.encode()).decode()
