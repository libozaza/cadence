from datetime import datetime
from fastapi import APIRouter
from pydantic import BaseModel
from services.storage import insert_keystrokes

router = APIRouter()


class KeystrokeEvent(BaseModel):
    timestamp: datetime
    hold_time: float
    flight_time: float
    latency_time: float


class IngestRequest(BaseModel):
    user_id: str
    events: list[KeystrokeEvent]


@router.post("/ingest")
def ingest(request: IngestRequest):
    insert_keystrokes(request.user_id, request.events)
    return {"received": len(request.events)}
