from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from ..db import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(32), default="creator")
    verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("Profile", back_populates="user", uselist=False)
    projects = relationship("Project", back_populates="owner")


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    display_name = Column(String(120), nullable=True)
    bio = Column(String(1024), nullable=True)
    avatar_url = Column(String(512), nullable=True)
    location = Column(String(120), nullable=True)
    contact_email = Column(String(255), nullable=True)

    user = relationship("User", back_populates="profile")
