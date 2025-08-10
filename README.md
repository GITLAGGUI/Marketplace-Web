Webapp — Modern Creator Marketplace

Overview
This repository contains a modern, full‑stack web application for creators and buyers. It features a FastAPI backend, an AI agent service powered by OpenRouter, a media service for S3 presigned uploads, and a polished React + Vite frontend with Tailwind CSS, Framer Motion, and Radix UI.

Key Features
- Advanced UI/UX: Animated gradients, glassmorphism, tilt cards, motion‑on‑view, accessible components.
- Projects: Create and browse projects with tags and AI‑assisted descriptions.
- Authentication: Email/password signup/login with JWT bearer tokens.
- Realtime Chat: WebSocket demo endpoint and animated chat UI.
- Media Uploads: S3 presigned POST endpoint (media service) ready for direct browser uploads.
- AI Integration: AI agent service calling OpenRouter for content generation.
- Infra: Docker Compose services for API, AI agent, media, frontend, Postgres, and Redis. Basic CI workflow.

Tech Stack
- Frontend: React 18, Vite, Tailwind CSS 3, Framer Motion, Radix UI, React Router.
- API: FastAPI, SQLAlchemy, PyJWT, Passlib (bcrypt), httpx.
- AI Agent: FastAPI + httpx, integrates with OpenRouter chat/completions.
- Media Service: FastAPI + boto3 for S3 presigned uploads.
- Data: Postgres, Redis (prepared for jobs/realtime scaling).
- DevOps: Docker, Docker Compose, GitHub Actions.

Monorepo Structure
- .github/workflows/ci-cd.yml: CI checks
- infra/
  - docker-compose.yml: Local multi‑service stack
  - k8s/: Example manifests (deployment, ingress)
- services/
  - api/: FastAPI backend
  - ai-agent/: AI microservice
  - media-service/: Media upload microservice
  - worker/: Placeholder for background jobs
- web/: React + Vite frontend
- scripts/: Utility scripts

Getting Started
Prerequisites
- Docker and Docker Compose
- OpenRouter API key (optional for AI features)
- AWS credentials and S3 bucket (optional for uploads)

Quick Start (Docker)
1) Copy environment file
- cp .env.example .env
- Edit .env as needed (OPENROUTER_API_KEY, AWS_S3_BUCKET, etc.)

2) Start the stack
- cd infra
- docker compose up --build

3) Open services
- Frontend: http://localhost:5173
- API: http://localhost:8080/docs and http://localhost:8080/health
- AI Agent: http://localhost:8081
- Media: http://localhost:8082
- Postgres: localhost:5432 (user: postgres / pass: postgres / db: app)
- Redis: localhost:6379

Usage Walkthrough
- Create an account: Frontend ➜ Auth page (or use API /api/v1/auth/signup).
- Login: Frontend ➜ Auth page; the app stores the JWT in localStorage.
- Create a project: Go to Projects, use “AI suggest” to generate a description, then Create.
- View a project: Click a project item to open its detail page.
- Chat: Navigate to Chat for realtime demo.

Local Development (without Docker)
Frontend
- cd web
- npm i
- npm run dev
- Access at http://localhost:5173

API
- cd services/api
- python -m venv .venv && source .venv/bin/activate
- pip install -r requirements.txt
- export DATABASE_URL="sqlite:///./app.db" (or Postgres URL)
- uvicorn src.main:app --reload --port 8080

AI Agent
- cd services/ai-agent
- python -m venv .venv && source .venv/bin/activate
- pip install -r requirements.txt
- export OPENROUTER_API_KEY=... (optional)
- uvicorn src.agent:app --reload --port 8081

Media Service
- cd services/media-service
- python -m venv .venv && source .venv/bin/activate
- pip install fastapi uvicorn boto3
- export AWS_S3_BUCKET=your-bucket AWS_REGION=us-east-1
- uvicorn src.main:app --reload --port 8082

Configuration
- .env / environment variables control service URLs, DB, Redis, OpenRouter, and AWS settings. See .env.example.

Notes and Next Steps
- Replace SQLite fallback with Postgres in API by setting DATABASE_URL in docker-compose (already configured) or environment.
- Add proper DB migrations (Alembic) and more tables (messages, reviews, bookmarks).
- Implement direct‑to‑S3 uploads in the frontend with progress, then notify API of new media.
- Persist chat using a conversations/messages schema and Redis pub/sub.
- Harden auth with refresh tokens, password resets, and roles.
- Add e2e tests and visual regression tests for UI.

License
- Proprietary — All rights reserved unless stated otherwise.
