from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import health, projects, auth, users, chat
from .db import Base, engine

# Create tables if not exist (simple bootstrapping)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Webapp API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(projects.router)
app.include_router(chat.router)


@app.get("/")
async def root():
    return {"service": "api", "status": "ok"}
