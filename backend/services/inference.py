import os
import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.normpath(os.path.join(BASE_DIR, "..", "svm_model.pkl"))

# Must match training column order: df.iloc[:, 1:7] from updated_summary.csv
# Training columns: Hold_time_mean, Latency_time_mean, Flight_time_mean, Hold_time_std, Latency_time_std, Flight_time_std
FEATURE_ORDER = [
    "hold_time_mean",
    "latency_time_mean",
    "flight_time_mean",
    "hold_time_sd",
    "latency_time_sd",
    "flight_time_sd",
]

_model = None


def load_model() -> None:
    global _model
    if os.path.exists(MODEL_PATH):
        _model = joblib.load(MODEL_PATH)


def is_model_loaded() -> bool:
    return _model is not None


def predict(features: dict) -> float:
    if _model is None:
        return 0.0

    values = [[features[f] for f in FEATURE_ORDER]]
    return float(_model.predict_proba(values)[0][1])
