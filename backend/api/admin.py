from datetime import date
from fastapi import APIRouter
from jobs.daily_aggregation import run_aggregation
from services.storage import get_raw_keystroke_count_today, delete_all_data

# TODO: Remove this before distributing to participants
router = APIRouter(prefix="/admin")


@router.post("/run-aggregation")
def trigger_aggregation(target_date: str | None = None):
    d = date.fromisoformat(target_date) if target_date else date.today()
    run_aggregation(d)
    return {"aggregated_for": d.isoformat()}


@router.get("/today/count")
def today_count(user_id: str):
    return {"user_id": user_id, "keystrokes_today": get_raw_keystroke_count_today(user_id)}


@router.delete("/clear-data")
def clear_data(user_id: str):
    delete_all_data(user_id)
    return {"cleared": True}
