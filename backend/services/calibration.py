import statistics
from services.feature_engine import FEATURE_NAMES

CALIBRATION_DAYS = 7

_calibration_data: dict = {}


def load_calibration_data() -> None:
    global _calibration_data
    from services.storage import get_all_calibration
    _calibration_data = get_all_calibration()


def get_calibration_status(user_id: str) -> dict:
    from services.storage import get_daily_features_count
    n_days = get_daily_features_count(user_id)
    return {
        "user_id": user_id,
        "calibrated": n_days >= CALIBRATION_DAYS,
        "days_collected": n_days,
        "days_required": CALIBRATION_DAYS,
        "baseline": _calibration_data.get(user_id),
    }


def update_calibration(user_id: str) -> None:
    from services.storage import get_daily_features, upsert_calibration

    rows = get_daily_features(user_id)
    if len(rows) < CALIBRATION_DAYS:
        return

    baseline = {
        f: statistics.mean([r[f] for r in rows[:CALIBRATION_DAYS]])
        for f in FEATURE_NAMES
    }
    upsert_calibration(user_id, baseline)
    _calibration_data[user_id] = baseline
