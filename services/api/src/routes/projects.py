from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import select, or_, desc, asc
from ..db import get_db
from ..models.project import Project
from ..schemas.project import ProjectCreate, ProjectOut
from ..dependencies import get_current_user
from ..models.user import User

router = APIRouter(prefix="/api/v1/projects", tags=["projects"])


@router.post("", response_model=ProjectOut)
async def create_project(
    payload: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = Project(
        title=payload.title,
        description=payload.description,
        tags=payload.tags,
        owner_id=current_user.id,
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


@router.get("", response_model=list[ProjectOut])
async def list_projects(
    db: Session = Depends(get_db),
    q: str | None = Query(default=None, description="Search query"),
    tags: list[str] | None = Query(default=None, description="Filter by tags"),
    sort: str = Query(default="new", description="Sort: new|old|title"),
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
):
    stmt = select(Project)
    if q:
        like = f"%{q}%"
        stmt = stmt.where(or_(Project.title.ilike(like), Project.description.ilike(like)))
    if tags:
        for t in tags:
            stmt = stmt.where(Project.tags.contains([t]))
    if sort == "new":
        stmt = stmt.order_by(desc(Project.created_at))
    elif sort == "old":
        stmt = stmt.order_by(asc(Project.created_at))
    elif sort == "title":
        stmt = stmt.order_by(asc(Project.title))
    else:
        stmt = stmt.order_by(desc(Project.created_at))
    stmt = stmt.limit(limit).offset(offset)
    return list(db.execute(stmt).scalars())


@router.get("/{project_id}", response_model=ProjectOut)
async def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project
