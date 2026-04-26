import os
import sqlite3
from contextlib import contextmanager
from datetime import date, datetime

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.normpath(os.path.join(BASE_DIR, "..", "data"))
DB_PATH = os.path.join(DATA_DIR, "cadence.db")


def init_db():
    os.makedirs(DATA_DIR, exist_ok=True)
    os.makedirs(os.path.join(DATA_DIR, "models"), exist_ok=True)
    os.makedirs(os.path.join(DATA_DIR, "logs"), exist_ok=True)
    with get_conn() as conn:
        conn.executescript("""
            CREATE TABLE IF NOT EXISTS raw_keystrokes (
                id           INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id      TEXT    NOT NULL,
                event_date   DATE    NOT NULL,
                recorded_at  DATETIME NOT NULL,
                hold_time    REAL    NOT NULL,
                flight_time  REAL    NOT NULL,
                latency_time REAL    NOT NULL
            );
            CREATE INDEX IF NOT EXISTS idx_raw_user_date
                ON raw_keystrokes(user_id, event_date);

            CREATE TABLE IF NOT EXISTS daily_features (
                id               INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id          TEXT NOT NULL,
                feature_date     DATE NOT NULL,
                hold_time_mean   REAL,
                hold_time_sd     REAL,
                flight_time_mean REAL,
                flight_time_sd   REAL,
                latency_time_mean REAL,
                latency_time_sd  REAL,
                n_keystrokes     INTEGER,
                UNIQUE(user_id, feature_date)
            );

            CREATE TABLE IF NOT EXISTS predictions (
                id           INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id      TEXT    NOT NULL,
                risk_score   REAL    NOT NULL,
                predicted_at DATETIME NOT NULL
            );

            CREATE TABLE IF NOT EXISTS calibration (
                user_id           TEXT PRIMARY KEY,
                hold_time_mean    REAL,
                hold_time_sd      REAL,
                flight_time_mean  REAL,
                flight_time_sd    REAL,
                latency_time_mean REAL,
                latency_time_sd   REAL,
                updated_at        DATETIME
            );
        """)


@contextmanager
def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def insert_keystrokes(user_id: str, events: list) -> None:
    rows = [
        (
            user_id,
            e.timestamp.date().isoformat(),
            e.timestamp.isoformat(),
            e.hold_time,
            e.flight_time,
            e.latency_time,
        )
        for e in events
    ]
    with get_conn() as conn:
        conn.executemany(
            """INSERT INTO raw_keystrokes
               (user_id, event_date, recorded_at, hold_time, flight_time, latency_time)
               VALUES (?,?,?,?,?,?)""",
            rows,
        )


def get_raw_keystrokes_for_date(user_id: str, target_date: date) -> list[dict]:
    with get_conn() as conn:
        rows = conn.execute(
            """SELECT hold_time, flight_time, latency_time
               FROM raw_keystrokes
               WHERE user_id=? AND event_date=?""",
            (user_id, target_date.isoformat()),
        ).fetchall()
    return [dict(r) for r in rows]


def get_all_users() -> list[str]:
    with get_conn() as conn:
        rows = conn.execute(
            "SELECT DISTINCT user_id FROM raw_keystrokes"
        ).fetchall()
    return [r["user_id"] for r in rows]


def upsert_daily_features(user_id: str, feature_date: date, features: dict) -> None:
    with get_conn() as conn:
        conn.execute(
            """INSERT INTO daily_features
               (user_id, feature_date, hold_time_mean, hold_time_sd,
                flight_time_mean, flight_time_sd, latency_time_mean,
                latency_time_sd, n_keystrokes)
               VALUES (?,?,?,?,?,?,?,?,?)
               ON CONFLICT(user_id, feature_date) DO UPDATE SET
                   hold_time_mean    = excluded.hold_time_mean,
                   hold_time_sd      = excluded.hold_time_sd,
                   flight_time_mean  = excluded.flight_time_mean,
                   flight_time_sd    = excluded.flight_time_sd,
                   latency_time_mean = excluded.latency_time_mean,
                   latency_time_sd   = excluded.latency_time_sd,
                   n_keystrokes      = excluded.n_keystrokes""",
            (
                user_id,
                feature_date.isoformat(),
                features["hold_time_mean"],
                features["hold_time_sd"],
                features["flight_time_mean"],
                features["flight_time_sd"],
                features["latency_time_mean"],
                features["latency_time_sd"],
                features["n_keystrokes"],
            ),
        )


def get_daily_features(user_id: str) -> list[dict]:
    with get_conn() as conn:
        rows = conn.execute(
            """SELECT * FROM daily_features
               WHERE user_id=? ORDER BY feature_date ASC""",
            (user_id,),
        ).fetchall()
    return [dict(r) for r in rows]


def get_latest_daily_features(user_id: str) -> dict | None:
    with get_conn() as conn:
        row = conn.execute(
            """SELECT * FROM daily_features
               WHERE user_id=? ORDER BY feature_date DESC LIMIT 1""",
            (user_id,),
        ).fetchone()
    return dict(row) if row else None


def get_daily_features_count(user_id: str) -> int:
    with get_conn() as conn:
        row = conn.execute(
            "SELECT COUNT(*) AS cnt FROM daily_features WHERE user_id=?",
            (user_id,),
        ).fetchone()
    return row["cnt"]


def insert_prediction(user_id: str, risk_score: float, timestamp: str) -> None:
    with get_conn() as conn:
        conn.execute(
            "INSERT INTO predictions (user_id, risk_score, predicted_at) VALUES (?,?,?)",
            (user_id, risk_score, timestamp),
        )


def get_predictions(user_id: str) -> list[dict]:
    with get_conn() as conn:
        rows = conn.execute(
            "SELECT * FROM predictions WHERE user_id=? ORDER BY predicted_at ASC",
            (user_id,),
        ).fetchall()
    return [dict(r) for r in rows]


def upsert_calibration(user_id: str, baseline: dict) -> None:
    with get_conn() as conn:
        conn.execute(
            """INSERT INTO calibration
               (user_id, hold_time_mean, hold_time_sd, flight_time_mean,
                flight_time_sd, latency_time_mean, latency_time_sd, updated_at)
               VALUES (?,?,?,?,?,?,?,?)
               ON CONFLICT(user_id) DO UPDATE SET
                   hold_time_mean    = excluded.hold_time_mean,
                   hold_time_sd      = excluded.hold_time_sd,
                   flight_time_mean  = excluded.flight_time_mean,
                   flight_time_sd    = excluded.flight_time_sd,
                   latency_time_mean = excluded.latency_time_mean,
                   latency_time_sd   = excluded.latency_time_sd,
                   updated_at        = excluded.updated_at""",
            (
                user_id,
                baseline["hold_time_mean"],
                baseline["hold_time_sd"],
                baseline["flight_time_mean"],
                baseline["flight_time_sd"],
                baseline["latency_time_mean"],
                baseline["latency_time_sd"],
                datetime.utcnow().isoformat(),
            ),
        )


def get_all_calibration() -> dict:
    with get_conn() as conn:
        rows = conn.execute("SELECT * FROM calibration").fetchall()
    return {r["user_id"]: dict(r) for r in rows}
