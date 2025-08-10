from fastapi import FastAPI
from pydantic import BaseModel
import httpx
import os

OPENROUTER_BASE_URL = os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "deepseek/deepseek-chat-v3-0324:free")

app = FastAPI(title="AI Agent", version="0.1.0")


class GenerateRequest(BaseModel):
    prompt: str
    tone: str | None = None
    max_tokens: int | None = 200


@app.get("/")
async def root():
    return {"service": "ai-agent", "status": "ok"}


@app.post("/api/v1/ai/generate-description")
async def generate_description(req: GenerateRequest):
    if not OPENROUTER_API_KEY:
        return {"content": "[AI disabled] Provide OPENROUTER_API_KEY to enable generation."}

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": OPENROUTER_MODEL,
        "messages": [
            {"role": "system", "content": "You are a helpful content writer for a marketplace."},
            {"role": "user", "content": req.prompt},
        ],
        "max_tokens": req.max_tokens or 200,
    }

    async with httpx.AsyncClient(base_url=OPENROUTER_BASE_URL, timeout=60) as client:
        resp = await client.post("/chat/completions", headers=headers, json=payload)
        resp.raise_for_status()
        data = resp.json()
        content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
        return {"content": content}
