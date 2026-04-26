"""
Seed a healthy typing profile for demos.
Run from the backend directory: python seed_healthy.py [--user <hostname>] [--days 30]

Profile: consistent, brisk typing — tight hold times, low variability.
Score:   9%  (well within typical range)
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
        risk_score=0.09,
        # Healthy profile: fast, consistent keystrokes
        hold_mean=88.0,       # ms — quick key presses
        hold_sd_base=14.0,    # tight — low variability
        flight_mean=138.0,    # ms — quick between keys
        flight_sd_base=24.0,
        latency_mean=152.0,   # ms
        latency_sd_base=32.0,
        keystrokes_range=(3000, 5000),
        drift_amplitude=0.03, # very stable trend
        label="HEALTHY",
    )
