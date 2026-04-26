"""
Seed a high-risk typing profile for demos.
Run from the backend directory: python seed_highrisk.py [--user <hostname>] [--days 30]

Profile: slow, erratic typing — elevated hold times, high variability,
         fewer keystrokes per day, and a visible worsening trend.
Score:   84%  (elevated motor deviation)
"""
import argparse, os, socket, sys
sys.path.insert(0, os.path.dirname(__file__))
from seed_demo import seed

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--user", default=socket.gethostname())
    parser.add_argument("--days", type=int, default=30)
    args = parser.parse_args()

    seed(
        user_id=args.user,
        days=args.days,
        risk_score=0.84,
        # High-risk profile: slow, variable keystrokes
        hold_mean=148.0,      # ms — longer, heavier key presses
        hold_sd_base=72.0,    # high variability
        flight_mean=268.0,    # ms — slower between keys
        flight_sd_base=68.0,
        latency_mean=390.0,   # ms — slower overall rhythm
        latency_sd_base=88.0,
        keystrokes_range=(3000, 5000),
        drift_amplitude=0.12,         # more visible trend arc
        label="HIGH-RISK",
    )
