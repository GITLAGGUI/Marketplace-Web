from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy import JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from ..db import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    title = Column(String(200), nullable=False)
    description = Column(String(5000), nullable=True)
    tags = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="projects")
