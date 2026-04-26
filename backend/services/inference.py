import os
import xgboost as xgb

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.normpath(os.path.join(BASE_DIR, "..", "data", "models", "model.json"))

FEATURE_ORDER = [
    "hold_time_mean",
    "hold_time_sd",
    "flight_time_mean",
    "flight_time_sd",
    "latency_time_mean",
    "latency_time_sd",
]

_model: xgb.Booster | None = None


def load_model() -> None:
    global _model
    if os.path.exists(MODEL_PATH):
        _model = xgb.Booster()
        _model.load_model(MODEL_PATH)


def is_model_loaded() -> bool:
    return _model is not None


def predict(features: dict) -> float:
    if _model is None:
        return 0.0

    values = [[features[f] for f in FEATURE_ORDER]]
    dmatrix = xgb.DMatrix(values, feature_names=FEATURE_ORDER)
    score = _model.predict(dmatrix)[0]
    return float(score)
