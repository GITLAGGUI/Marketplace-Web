from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta
from ..config.settings import settings

_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return _pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return _pwd_context.verify(password, password_hash)


def create_access_token(subject: str, expires_hours: int | None = None) -> str:
    expire = datetime.utcnow() + timedelta(hours=expires_hours or settings.jwt_exp_hours)
    to_encode = {"sub": subject, "exp": expire}
    return jwt.encode(to_encode, settings.jwt_secret, algorithm="HS256")
