import httpx
from ..config.settings import settings


async def generate_description(prompt: str) -> str:
    if not settings.openrouter_api_key:
        return "[AI disabled] Provide OPENROUTER_API_KEY to enable generation."

    headers = {
        "Authorization": f"Bearer {settings.openrouter_api_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": settings.openrouter_model,
        "messages": [
            {"role": "system", "content": "You are a helpful content writer for a marketplace."},
            {"role": "user", "content": prompt},
        ],
    }

    async with httpx.AsyncClient(base_url=settings.openrouter_base_url, timeout=60) as client:
        response = await client.post("/chat/completions", headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        return data.get("choices", [{}])[0].get("message", {}).get("content", "")
