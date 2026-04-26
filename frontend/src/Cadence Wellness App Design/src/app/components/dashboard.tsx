import { Lock, Download, MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';

const holdTimeData = [
  { day: 1, value: 82, min: 70, max: 90 },
  { day: 5, value: 79, min: 70, max: 90 },
  { day: 10, value: 83, min: 70, max: 90 },
  { day: 15, value: 81, min: 70, max: 90 },
  { day: 20, value: 80, min: 70, max: 90 },
  { day: 25, value: 78, min: 70, max: 90 },
  { day: 30, value: 82, min: 70, max: 90 },
];

const flightTimeData = [
  { day: 1, value: 145, min: 120, max: 160 },
  { day: 5, value: 148, min: 120, max: 160 },
  { day: 10, value: 142, min: 120, max: 160 },
  { day: 15, value: 146, min: 120, max: 160 },
  { day: 20, value: 144, min: 120, max: 160 },
  { day: 25, value: 147, min: 120, max: 160 },
  { day: 30, value: 143, min: 120, max: 160 },
];

export function Dashboard() {
  const riskScore = 12;
  const totalDays = 90;
  const activityData = Array.from({ length: totalDays }, (_, i) => {
    const hasData = Math.random() > 0.3;
    return {
      day: i,
      intensity: hasData ? Math.floor(Math.random() * 4) + 1 : 0,
    };
  });

  return (
    <div className="w-full h-full bg-background overflow-auto">
      {/* Navigation */}
      <nav className="bg-card border-b border-border px-8 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <div className="w-4 h-4 rounded-sm bg-accent" />
            </div>
            <span className="text-xl text-foreground">Cadence</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Data is stored locally</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-12 space-y-8">
        {/* Hero Section */}
        <div className="bg-card rounded-3xl p-12 shadow-lg text-center">
          <h2 className="mb-8">Your Motor Pattern Health</h2>

          <div className="relative w-64 h-64 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <defs>
                <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#81c995" />
                  <stop offset="50%" stopColor="#e8b968" />
                  <stop offset="100%" stopColor="#e07a7a" />
                </linearGradient>
              </defs>
              <circle
                cx="128"
                cy="128"
                r="112"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-muted/20"
              />
              <circle
                cx="128"
                cy="128"
                r="112"
                stroke="url(#riskGradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 112}`}
                strokeDashoffset={`${2 * Math.PI * 112 * (1 - riskScore / 100)}`}
                className="transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl mb-2">{riskScore}%</span>
              <span className="text-sm text-muted-foreground">deviation</span>
            </div>
          </div>

          <p className="text-lg text-foreground mb-2">Motor pattern deviation score</p>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your typing patterns are within a typical range
          </p>
        </div>

        {/* Keystroke Analytics */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-card rounded-3xl p-8 shadow-lg">
            <h3 className="mb-6">Hold Time (ms)</h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={holdTimeData}>
                <defs>
                  <linearGradient id="holdGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5fa8a3" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#5fa8a3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8e6e1" vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke="#718096"
                  tick={{ fill: '#718096' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e8e6e1' }}
                />
                <YAxis
                  stroke="#718096"
                  tick={{ fill: '#718096' }}
                  tickLine={false}
                  axisLine={false}
                  domain={[60, 100]}
                />
                <Area
                  type="monotone"
                  dataKey="max"
                  stroke="none"
                  fill="#81c995"
                  fillOpacity={0.1}
                />
                <Area
                  type="monotone"
                  dataKey="min"
                  stroke="none"
                  fill="#ffffff"
                  fillOpacity={1}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#5fa8a3"
                  strokeWidth={3}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-muted-foreground">Your average</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success/40" />
                <span className="text-muted-foreground">Typical range</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-3xl p-8 shadow-lg">
            <h3 className="mb-6">Inter-Key Latency (ms)</h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={flightTimeData}>
                <defs>
                  <linearGradient id="flightGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5fa8a3" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#5fa8a3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8e6e1" vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke="#718096"
                  tick={{ fill: '#718096' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e8e6e1' }}
                />
                <YAxis
                  stroke="#718096"
                  tick={{ fill: '#718096' }}
                  tickLine={false}
                  axisLine={false}
                  domain={[110, 170]}
                />
                <Area
                  type="monotone"
                  dataKey="max"
                  stroke="none"
                  fill="#81c995"
                  fillOpacity={0.1}
                />
                <Area
                  type="monotone"
                  dataKey="min"
                  stroke="none"
                  fill="#ffffff"
                  fillOpacity={1}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#5fa8a3"
                  strokeWidth={3}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-muted-foreground">Your average</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success/40" />
                <span className="text-muted-foreground">Typical range</span>
              </div>
            </div>
          </div>
        </div>

        {/* Session Timeline */}
        <div className="bg-card rounded-3xl p-8 shadow-lg">
          <h3 className="mb-6">90-Day Activity</h3>
          <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(15, minmax(0, 1fr))' }}>
            {activityData.map((data, i) => (
              <div
                key={i}
                className="w-full aspect-square rounded-sm transition-all hover:scale-110"
                style={{
                  backgroundColor: data.intensity === 0
                    ? '#e8e6e1'
                    : `rgba(95, 168, 163, ${0.2 + data.intensity * 0.2})`,
                }}
                title={`Day ${i + 1}`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">Each square represents one day of typing data</p>
        </div>

        {/* Feature Breakdown */}
        <div className="bg-card rounded-3xl p-8 shadow-lg">
          <h3 className="mb-6">What we're seeing</h3>
          <div className="space-y-4">
            {[
              { label: 'Hold time variability', value: 8, status: 'Typical' },
              { label: 'Left-right asymmetry', value: 12, status: 'Typical' },
              { label: 'Inter-key interval consistency', value: 15, status: 'Typical' },
              { label: 'Rhythm stability', value: 10, status: 'Typical' },
            ].map((metric) => (
              <div key={metric.label} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground">{metric.label}</span>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      metric.status === 'Typical'
                        ? 'bg-success/20 text-success'
                        : 'bg-warning/20 text-warning'
                    }`}>
                      {metric.status}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-500"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Find Care */}
        <div className="bg-card rounded-3xl p-8 shadow-lg">
          <h3 className="mb-6">Connect with a specialist</h3>
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Enter your zip code"
              className="flex-1 px-4 py-3 bg-input-background rounded-2xl border border-border focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <button className="px-6 py-3 bg-accent text-accent-foreground rounded-2xl hover:opacity-90 transition-opacity flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Find neurologists near me
            </button>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Dr. Sarah Chen', specialty: 'Movement Disorders Specialist', distance: '2.3 miles' },
              { name: 'Dr. Michael Rodriguez', specialty: 'Neurologist', distance: '3.7 miles' },
              { name: 'Dr. Emily Park', specialty: 'Parkinson\'s Disease Specialist', distance: '4.1 miles' },
            ].map((provider) => (
              <div key={provider.name} className="p-4 bg-muted/30 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-foreground mb-1">{provider.name}</p>
                  <p className="text-sm text-muted-foreground">{provider.specialty} • {provider.distance}</p>
                </div>
                <button className="text-accent hover:underline text-sm">Learn more</button>
              </div>
            ))}
          </div>
        </div>

        {/* Export Button */}
        <div className="flex justify-end">
          <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-2xl hover:bg-muted transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export report for my doctor
          </button>
        </div>
      </div>
    </div>
  );
}
