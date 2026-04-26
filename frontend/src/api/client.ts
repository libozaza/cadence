const BASE_URL = 'http://127.0.0.1:8000';

export interface DailyFeature {
  id: number;
  user_id: string;
  feature_date: string;
  hold_time_mean: number;
  hold_time_sd: number;
  flight_time_mean: number;
  flight_time_sd: number;
  latency_time_mean: number;
  latency_time_sd: number;
  n_keystrokes: number;
}

export interface Prediction {
  risk_score: number;
  timestamp: string;
}

export interface HistoryResponse {
  user_id: string;
  daily_features: DailyFeature[];
  predictions: Prediction[];
}

export interface CalibrationStatus {
  user_id: string;
  calibrated: boolean;
  days_collected: number;
  days_required: number;
  baseline: Record<string, number> | null;
}

export async function fetchHistory(userId: string): Promise<HistoryResponse> {
  const res = await fetch(`${BASE_URL}/history?user_id=${encodeURIComponent(userId)}`);
  if (!res.ok) throw new Error('Failed to fetch history');
  return res.json();
}

export async function fetchCalibrationStatus(userId: string): Promise<CalibrationStatus> {
  const res = await fetch(`${BASE_URL}/calibration/status?user_id=${encodeURIComponent(userId)}`);
  if (!res.ok) throw new Error('Failed to fetch calibration status');
  return res.json();
}

export async function triggerPredict(userId: string): Promise<Prediction> {
  const res = await fetch(`${BASE_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId }),
  });
  if (!res.ok) throw new Error('No daily features available yet');
  return res.json();
}
