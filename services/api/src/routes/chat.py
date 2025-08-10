from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter()

active_connections: set[WebSocket] = set()


@router.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.add(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # naive broadcast
            for conn in list(active_connections):
                try:
                    await conn.send_text(data)
                except Exception:
                    pass
    except WebSocketDisconnect:
        active_connections.discard(websocket)
