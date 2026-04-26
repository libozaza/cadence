from datetime import date, timedelta
from apscheduler.schedulers.background import BackgroundScheduler
from services.storage import get_all_users, get_raw_keystrokes_for_date, upsert_daily_features
from services.feature_engine import compute_features
from services.calibration import update_calibration


def run_aggregation(target_date: date | None = None) -> None:
    if target_date is None:
        target_date = date.today() - timedelta(days=1)

    for user_id in get_all_users():
        events = get_raw_keystrokes_for_date(user_id, target_date)
        if not events:
            continue
        features = compute_features(events)
        if features is None:
            continue
        upsert_daily_features(user_id, target_date, features)
        update_calibration(user_id)


def schedule_daily_job() -> BackgroundScheduler:
    scheduler = BackgroundScheduler()
    scheduler.add_job(run_aggregation, "cron", hour=0, minute=5)
    scheduler.start()
    return scheduler
