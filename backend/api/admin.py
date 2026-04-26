from datetime import date
from fastapi import APIRouter
from jobs.daily_aggregation import run_aggregation

# TODO: Remove this before distributing to participants
router = APIRouter(prefix="/admin")


@router.post("/run-aggregation")
def trigger_aggregation(target_date: str | None = None):
    d = date.fromisoformat(target_date) if target_date else date.today()
    run_aggregation(d)
    return {"aggregated_for": d.isoformat()}
