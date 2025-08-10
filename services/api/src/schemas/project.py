from pydantic import BaseModel


class ProjectCreate(BaseModel):
    title: str
    description: str | None = None
    tags: list[str] = []


class ProjectOut(BaseModel):
    id: int
    title: str
    description: str | None = None
    tags: list[str] = []
    owner_id: int

    class Config:
        from_attributes = True
