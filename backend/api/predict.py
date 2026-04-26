from datetime import datetime
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.storage import get_latest_daily_features, insert_prediction
from services import inference

router = APIRouter()


class PredictRequest(BaseModel):
    user_id: str


@router.post("/predict")
def predict(request: PredictRequest):
    features = get_latest_daily_features(request.user_id)
    if features is None:
        raise HTTPException(
            status_code=404,
            detail="No daily features available for this user. Keep typing — features are computed once per day.",
        )

    risk_score = inference.predict(features)
    ts = datetime.utcnow().isoformat()
    insert_prediction(request.user_id, risk_score, ts)

    return {
        "risk_score": risk_score,
        "user_id": request.user_id,
        "timestamp": ts,
    }
