from fastapi import APIRouter
from services.storage import get_daily_features, get_predictions

router = APIRouter()


@router.get("/history")
def history(user_id: str):
    return {
        "user_id": user_id,
        "daily_features": get_daily_features(user_id),
        "predictions": get_predictions(user_id),
    }
