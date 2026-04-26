import statistics

FEATURE_NAMES = [
    "hold_time_mean",
    "hold_time_sd",
    "flight_time_mean",
    "flight_time_sd",
    "latency_time_mean",
    "latency_time_sd",
]


def compute_features(events: list[dict]) -> dict | None:
    if len(events) < 2:
        return None

    hold_times    = [e["hold_time"]    for e in events]
    flight_times  = [e["flight_time"]  for e in events]
    latency_times = [e["latency_time"] for e in events]

    return {
        "hold_time_mean":    statistics.mean(hold_times),
        "hold_time_sd":      statistics.stdev(hold_times),
        "flight_time_mean":  statistics.mean(flight_times),
        "flight_time_sd":    statistics.stdev(flight_times),
        "latency_time_mean": statistics.mean(latency_times),
        "latency_time_sd":   statistics.stdev(latency_times),
        "n_keystrokes":      len(events),
    }
