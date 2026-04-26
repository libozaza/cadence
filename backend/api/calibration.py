from fastapi import APIRouter
from services.calibration import get_calibration_status

router = APIRouter()


@router.get("/calibration/status")
def calibration_status(user_id: str):
    return get_calibration_status(user_id)
