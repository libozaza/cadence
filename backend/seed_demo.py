"""
Shared core for demo seeding. Import and call seed() from profile scripts.
"""
import math
import random
import sqlite3
import os
from datetime import date, datetime, timedelta

DB_PATH = os.path.join(os.path.dirname(__file__), "data", "cadence.db")


def seed(
    user_id: str,
    days: int,
    risk_score: float,
    hold_mean: float,
    hold_sd_base: float,
    flight_mean: float,
    flight_sd_base: float,
    latency_mean: float,
    latency_sd_base: float,
    keystrokes_range: tuple,
    drift_amplitude: float = 0.04,
    label: str = "",
) -> None:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    today = date.today()

    conn.execute("DELETE FROM raw_keystrokes  WHERE user_id=?", (user_id,))
    conn.execute("DELETE FROM daily_features  WHERE user_id=?", (user_id,))
    conn.execute("DELETE FROM predictions     WHERE user_id=?", (user_id,))
    conn.execute("DELETE FROM calibration     WHERE user_id=?", (user_id,))

    def jitter(base, pct=0.06):
        return base * (1 + random.uniform(-pct, pct))

    daily_rows = []
    for i in range(days):
        d = today - timedelta(days=days - i)
        drift = math.sin(i / days * math.pi) * drift_amplitude

        hm = jitter(hold_mean    * (1 + drift))
        fm = jitter(flight_mean  * (1 + drift * 0.5))
        lm = jitter(latency_mean * (1 + drift * 0.3))

        hs = jitter(hold_sd_base,    pct=0.25)
        fs = jitter(flight_sd_base,  pct=0.25)
        ls = jitter(latency_sd_base, pct=0.25)

        n = random.randint(*keystrokes_range)

        daily_rows.append((
            user_id, d.isoformat(),
            round(hm, 2), round(hs, 2),
            round(fm, 2), round(fs, 2),
            round(lm, 2), round(ls, 2),
            n,
        ))

    conn.executemany(
        """INSERT INTO daily_features
           (user_id, feature_date,
            hold_time_mean, hold_time_sd,
            flight_time_mean, flight_time_sd,
            latency_time_mean, latency_time_sd,
            n_keystrokes)
           VALUES (?,?,?,?,?,?,?,?,?)
           ON CONFLICT(user_id, feature_date) DO UPDATE SET
               hold_time_mean=excluded.hold_time_mean,
               hold_time_sd=excluded.hold_time_sd,
               flight_time_mean=excluded.flight_time_mean,
               flight_time_sd=excluded.flight_time_sd,
               latency_time_mean=excluded.latency_time_mean,
               latency_time_sd=excluded.latency_time_sd,
               n_keystrokes=excluded.n_keystrokes""",
        daily_rows,
    )

    avg = lambda col: sum(r[col] for r in daily_rows) / len(daily_rows)
    conn.execute(
        """INSERT INTO calibration
           (user_id, hold_time_mean, hold_time_sd,
            flight_time_mean, flight_time_sd,
            latency_time_mean, latency_time_sd, updated_at)
           VALUES (?,?,?,?,?,?,?,?)
           ON CONFLICT(user_id) DO UPDATE SET
               hold_time_mean=excluded.hold_time_mean,
               hold_time_sd=excluded.hold_time_sd,
               flight_time_mean=excluded.flight_time_mean,
               flight_time_sd=excluded.flight_time_sd,
               latency_time_mean=excluded.latency_time_mean,
               latency_time_sd=excluded.latency_time_sd,
               updated_at=excluded.updated_at""",
        (
            user_id,
            round(avg(2), 2), round(avg(3), 2),
            round(avg(4), 2), round(avg(5), 2),
            round(avg(6), 2), round(avg(7), 2),
            datetime.utcnow().isoformat(),
        ),
    )

    conn.execute(
        "INSERT INTO predictions (user_id, risk_score, predicted_at) VALUES (?,?,?)",
        (user_id, risk_score, datetime.utcnow().isoformat()),
    )

    # Seed raw keystrokes for today so the demo shows a realistic daily count.
    # Pace factor drifts every ~40 keystrokes to simulate natural typing bursts
    # and hesitations — prevents artificially near-zero CoV from pure gaussian.
    today_raw = []
    base_time = datetime.combine(today, datetime.min.time()).replace(hour=9)
    pace = 1.0
    for i in range(1414):
        if i % 40 == 0:
            pace = random.gauss(1.0, 0.18)  # new burst/hesitation every ~40 keys
            pace = max(0.5, min(pace, 2.2))  # cap extremes
        ht = max(1.0, random.gauss(hold_mean    * pace, hold_sd_base))
        ft = max(1.0, random.gauss(flight_mean  * pace, flight_sd_base))
        lt = max(1.0, random.gauss(latency_mean * pace, latency_sd_base))
        base_time += timedelta(milliseconds=lt + ft)
        today_raw.append((
            user_id,
            today.isoformat(),
            base_time.isoformat(timespec="milliseconds"),
            round(ht, 2),
            round(ft, 2),
            round(lt, 2),
        ))

    conn.executemany(
        """INSERT INTO raw_keystrokes
           (user_id, event_date, recorded_at, hold_time, flight_time, latency_time)
           VALUES (?,?,?,?,?,?)""",
        today_raw,
    )

    conn.commit()
    conn.close()

    total_ks = sum(r[8] for r in daily_rows)
    tag = f"  [{label}]" if label else ""
    print(f"Seeded {days} days of data for '{user_id}'{tag}")
    print(f"  Total keystrokes : {total_ks:,}")
    print(f"  Risk score       : {round(risk_score * 100)}%")
    print(f"  Date range       : {daily_rows[0][1]} to {daily_rows[-1][1]}")
    print(f"  Today raw strokes: 1,414")
