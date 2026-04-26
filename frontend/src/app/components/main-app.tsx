import React from 'react';
import { LayoutDashboard, MapPin, Settings, Download, Lock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area } from 'recharts';

const generateChartData = (length: number, baseValue: number, variation: number, min: number, max: number, prefix: string) => {
  return Array.from({ length }, (_, i) => ({
    id: `${prefix}-${i}`,
    day: i + 1,
    value: baseValue + Math.sin(i / 3) * variation + Math.random() * 4,
    min,
    max,
  }));
};

const holdTimeData = generateChartData(30, 75, 8, 65, 90, 'hold');
const flightTimeData = generateChartData(30, 140, 12, 120, 165, 'flight');
const latencyTimeData = generateChartData(30, 180, 15, 150, 220, 'latency');

export function MainApp() {
  const [activeView, setActiveView] = React.useState('dashboard');
  const [timeRange, setTimeRange] = React.useState('1M');
  const deviationScore = 12;
  const keystrokesToday = 1243;
  const totalKeystrokes = 2847;
  const preliminaryThreshold = 500;
  const reliableThreshold = 2500;

  const getBaselineStatus = () => {
    if (totalKeystrokes >= reliableThreshold) return { complete: true, label: 'Reliable baseline complete' };
    if (totalKeystrokes >= preliminaryThreshold) return { complete: false, label: `Preliminary • ${totalKeystrokes} / ${reliableThreshold} keystrokes` };
    return { complete: false, label: `Baseline: ${totalKeystrokes} / ${preliminaryThreshold} keystrokes` };
  };

  const baselineStatus = getBaselineStatus();

  return (
    <div className="flex h-full w-full bg-background">
      {/* Left Sidebar */}
      <div className="w-[220px] bg-card border-r border-border flex flex-col">
        {/* App Title */}
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl" style={{ fontFamily: 'DM Serif Display, serif' }}>Cadence</h1>
          <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-success/10 rounded-full w-fit">
            <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-success">Monitoring active</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-2">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center justify-between px-4 py-4 rounded-lg text-lg transition-colors relative ${
              activeView === 'dashboard'
                ? 'bg-sidebar-accent text-foreground'
                : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground'
            }`}
          >
            {activeView === 'dashboard' && (
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent rounded-r" />
            )}
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6" strokeWidth={1.5} />
              <span>Dashboard</span>
            </div>
            {activeView === 'dashboard' && (
              <span className="text-base text-accent">{deviationScore}%</span>
            )}
          </button>

          <button
            onClick={() => setActiveView('care')}
            className={`w-full flex items-center justify-between px-4 py-4 rounded-lg text-lg transition-colors relative ${
              activeView === 'care'
                ? 'bg-sidebar-accent text-foreground'
                : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground'
            }`}
          >
            {activeView === 'care' && (
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent rounded-r" />
            )}
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6" strokeWidth={1.5} />
              <span>Find Care</span>
            </div>
          </button>

          <button
            onClick={() => setActiveView('settings')}
            className={`w-full flex items-center justify-between px-4 py-4 rounded-lg text-lg transition-colors relative ${
              activeView === 'settings'
                ? 'bg-sidebar-accent text-foreground'
                : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground'
            }`}
          >
            {activeView === 'settings' && (
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent rounded-r" />
            )}
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6" strokeWidth={1.5} />
              <span>Settings</span>
            </div>
          </button>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border space-y-3">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-4 border border-border rounded-lg text-[17px] text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors">
            <Download className="w-5 h-5" strokeWidth={1.5} />
            <span>Export report</span>
          </button>
          <button
            onClick={() => setActiveView('care')}
            className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-accent text-accent-foreground rounded-lg text-[17px] hover:opacity-90 transition-opacity"
          >
            <MapPin className="w-5 h-5" strokeWidth={1.5} />
            <span>Find a neurologist</span>
          </button>
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-2">
            <Lock className="w-3 h-3" strokeWidth={1.5} />
            <span>All data stored locally</span>
          </div>
        </div>
      </div>

      {/* Right Main Panel */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="text-[15px] text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[15px] text-foreground">Keystrokes today: {keystrokesToday.toLocaleString()}</span>
            {baselineStatus.complete ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-success/10 rounded-full">
                <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[15px] text-success">{baselineStatus.label}</span>
              </div>
            ) : (
              <span className="text-[15px] text-muted-foreground">{baselineStatus.label}</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {activeView === 'dashboard' && (
            <div className="space-y-6">
              {/* Top Row: Score Gauge and Feature Breakdown */}
              <div className="grid grid-cols-2 gap-4">
                {/* Score Gauge Card */}
                <div className="bg-card border border-border rounded-xl p-8 flex flex-col justify-center items-center">
                  <div className="relative w-[180px] h-[180px] mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="90"
                        cy="90"
                        r="80"
                        stroke="#d4cfc5"
                        strokeWidth="10"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="90"
                        cy="90"
                        r="80"
                        stroke="#639922"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 80}`}
                        strokeDashoffset={`${2 * Math.PI * 80 * (1 - deviationScore / 100)}`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl" style={{ fontFamily: 'DM Serif Display, serif' }}>
                        {deviationScore}<span className="text-4xl">%</span>
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Motor pattern deviation</p>
                  <p className="text-base text-foreground text-center max-w-xs">Your typing patterns are within a typical range</p>
                </div>

            {/* Feature Breakdown Card */}
            <div className="bg-card border border-border rounded-xl p-8 flex flex-col justify-center">
              <h3 className="text-base mb-6">What we're seeing</h3>
              <div className="space-y-4">
                {[
                  { label: 'Hold time variability', value: 8, status: 'Typical' },
                  { label: 'Left-right asymmetry', value: 12, status: 'Typical' },
                  { label: 'Inter-key consistency', value: 15, status: 'Typical' },
                  { label: 'Flight time variance', value: 10, status: 'Typical' },
                ].map((metric) => (
                  <div key={metric.label} className="flex items-center gap-3">
                    <span className="text-[15px] text-foreground flex-shrink-0 w-40">{metric.label}</span>
                    <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all duration-500"
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                    <span
                      className={`text-sm px-3 py-1 rounded flex-shrink-0 ${
                        metric.status === 'Typical'
                          ? 'bg-success/10 text-success'
                          : 'bg-warning/10 text-warning'
                      }`}
                    >
                      {metric.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

              </div>

              {/* Time Range Toggle */}
              <div className="flex items-center justify-center">
                <div className="inline-flex bg-muted/30 rounded-full p-1.5">
                  {['1D', '1W', '1M', '6M', '1Y', 'All'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-5 py-2.5 rounded-full text-[15px] transition-colors ${
                        timeRange === range
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Three Charts Row */}
              <div className="grid grid-cols-3 gap-4">
                {/* Hold Time Chart */}
                <div className="bg-card border border-border rounded-xl p-6 flex flex-col">
                  <h3 className="text-base mb-3" style={{ fontWeight: 600 }}>Hold time</h3>

                  {/* Legend */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-0.5 bg-accent rounded" />
                      <span className="text-sm text-foreground">Your data</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-3 bg-muted rounded" />
                      <span className="text-sm text-foreground">Typical range</span>
                    </div>
                  </div>

                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={holdTimeData} margin={{ top: 5, right: 55, bottom: 25, left: 55 }}>
                      <defs>
                        <linearGradient id="holdRangeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#d4cfc5" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#d4cfc5" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(138, 133, 120, 0.1)" vertical={false} />
                      <XAxis
                        dataKey="day"
                        stroke="#8a8578"
                        tick={{ fill: '#8a8578', fontSize: 13 }}
                        tickLine={false}
                        axisLine={{ stroke: 'rgba(138, 133, 120, 0.2)' }}
                        label={{ value: 'Days', position: 'insideBottom', offset: -15, fill: '#8a8578', fontSize: 13 }}
                      />
                      <YAxis
                        stroke="#8a8578"
                        tick={{ fill: '#8a8578', fontSize: 13 }}
                        tickLine={false}
                        axisLine={false}
                        domain={[50, 100]}
                        label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft', offset: 12, fill: '#8a8578', fontSize: 13 }}
                      />
                      <Area
                        key="hold-area-max"
                        type="monotone"
                        dataKey="max"
                        stroke="none"
                        fill="url(#holdRangeGradient)"
                        stackId="1"
                      />
                      <Area
                        key="hold-area-min"
                        type="monotone"
                        dataKey="min"
                        stroke="none"
                        fill="#FEFCF9"
                        stackId="1"
                      />
                      <Line
                        key="hold-line-value"
                        type="monotone"
                        dataKey="value"
                        stroke="#639922"
                        strokeWidth={2.5}
                        dot={false}
                      />
                    </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Flight Time Chart */}
                <div className="bg-card border border-border rounded-xl p-6 flex flex-col">
                  <h3 className="text-base mb-3" style={{ fontWeight: 600 }}>Flight time</h3>

                  {/* Legend */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-0.5 bg-accent rounded" />
                      <span className="text-sm text-foreground">Your data</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-3 bg-muted rounded" />
                      <span className="text-sm text-foreground">Typical range</span>
                    </div>
                  </div>

                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={flightTimeData} margin={{ top: 5, right: 55, bottom: 25, left: 55 }}>
                      <defs>
                        <linearGradient id="flightRangeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#d4cfc5" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#d4cfc5" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(138, 133, 120, 0.1)" vertical={false} />
                      <XAxis
                        dataKey="day"
                        stroke="#8a8578"
                        tick={{ fill: '#8a8578', fontSize: 13 }}
                        tickLine={false}
                        axisLine={{ stroke: 'rgba(138, 133, 120, 0.2)' }}
                        label={{ value: 'Days', position: 'insideBottom', offset: -15, fill: '#8a8578', fontSize: 13 }}
                      />
                      <YAxis
                        stroke="#8a8578"
                        tick={{ fill: '#8a8578', fontSize: 13 }}
                        tickLine={false}
                        axisLine={false}
                        domain={[100, 180]}
                        label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft', offset: 12, fill: '#8a8578', fontSize: 13 }}
                      />
                      <Area
                        key="flight-area-max"
                        type="monotone"
                        dataKey="max"
                        stroke="none"
                        fill="url(#flightRangeGradient)"
                        stackId="1"
                      />
                      <Area
                        key="flight-area-min"
                        type="monotone"
                        dataKey="min"
                        stroke="none"
                        fill="#FEFCF9"
                        stackId="1"
                      />
                      <Line
                        key="flight-line-value"
                        type="monotone"
                        dataKey="value"
                        stroke="#639922"
                        strokeWidth={2.5}
                        dot={false}
                      />
                    </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Latency Time Chart */}
                <div className="bg-card border border-border rounded-xl p-6 flex flex-col">
                  <h3 className="text-base mb-3" style={{ fontWeight: 600 }}>Latency time (inter-key interval)</h3>

                  {/* Legend */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-0.5 bg-accent rounded" />
                      <span className="text-sm text-foreground">Your data</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-3 bg-muted rounded" />
                      <span className="text-sm text-foreground">Typical range</span>
                    </div>
                  </div>

                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={latencyTimeData} margin={{ top: 5, right: 55, bottom: 25, left: 55 }}>
                      <defs>
                        <linearGradient id="latencyRangeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#d4cfc5" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#d4cfc5" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(138, 133, 120, 0.1)" vertical={false} />
                      <XAxis
                        dataKey="day"
                        stroke="#8a8578"
                        tick={{ fill: '#8a8578', fontSize: 13 }}
                        tickLine={false}
                        axisLine={{ stroke: 'rgba(138, 133, 120, 0.2)' }}
                        label={{ value: 'Days', position: 'insideBottom', offset: -15, fill: '#8a8578', fontSize: 13 }}
                      />
                      <YAxis
                        stroke="#8a8578"
                        tick={{ fill: '#8a8578', fontSize: 13 }}
                        tickLine={false}
                        axisLine={false}
                        domain={[130, 230]}
                        label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft', offset: 12, fill: '#8a8578', fontSize: 13 }}
                      />
                      <Area
                        key="latency-area-max"
                        type="monotone"
                        dataKey="max"
                        stroke="none"
                        fill="url(#latencyRangeGradient)"
                        stackId="1"
                      />
                      <Area
                        key="latency-area-min"
                        type="monotone"
                        dataKey="min"
                        stroke="none"
                        fill="#FEFCF9"
                        stackId="1"
                      />
                      <Line
                        key="latency-line-value"
                        type="monotone"
                        dataKey="value"
                        stroke="#639922"
                        strokeWidth={2.5}
                        dot={false}
                      />
                    </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Find Care Screen */}
          {activeView === 'care' && (
            <div className="max-w-4xl">
              <h2 className="text-4xl mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Find a neurologist near you</h2>
              <p className="text-muted-foreground text-xl mb-10">Share your Cadence report with a movement disorder specialist.</p>

              {/* Search Row */}
              <div className="space-y-5 mb-10">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter zip code"
                    className="flex-1 px-7 py-5 bg-card border border-border rounded-xl text-xl focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                  <button className="px-10 py-5 bg-accent text-accent-foreground rounded-xl text-xl hover:opacity-90 transition-opacity">
                    Search
                  </button>
                </div>
                <div className="flex gap-4">
                  {['5 miles', '10 miles', '25 miles'].map((radius, idx) => (
                    <button
                      key={radius}
                      className={`px-8 py-4 rounded-full text-lg transition-colors ${
                        idx === 1
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-muted/30 text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      {radius}
                    </button>
                  ))}
                </div>
              </div>

              {/* Provider Results */}
              <div className="space-y-5 mb-8">
                {[
                  { name: 'Dr. Sarah Chen', specialty: 'Movement Disorder Specialist', distance: '2.3 miles', phone: '(555) 234-5678' },
                  { name: 'Dr. Michael Rodriguez', specialty: 'Neurologist', distance: '3.7 miles', phone: '(555) 876-5432' },
                  { name: 'Dr. Emily Park', specialty: 'Movement Disorder Specialist', distance: '4.1 miles', phone: '(555) 345-6789' },
                ].map((provider) => (
                  <div key={provider.name} className="bg-card border border-border rounded-xl p-7 space-y-5">
                    <div>
                      <h3 className="text-xl mb-2">{provider.name}</h3>
                      <p className="text-muted-foreground text-base">{provider.specialty} • {provider.distance}</p>
                    </div>
                    <div className="flex items-center gap-4 text-accent text-2xl">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{provider.phone}</span>
                    </div>
                    <button className="w-full py-4 border border-accent text-accent rounded-xl text-lg hover:bg-accent/10 transition-colors">
                      Visit website
                    </button>
                  </div>
                ))}
              </div>

              <p className="text-muted-foreground text-lg text-center">
                Results shown are for informational purposes. Cadence does not endorse any specific provider.
              </p>
            </div>
          )}

          {/* Settings Screen */}
          {activeView === 'settings' && (
            <div className="max-w-3xl">
              <h2 className="text-4xl mb-10" style={{ fontFamily: 'DM Serif Display, serif' }}>Settings</h2>

              <div className="space-y-10">
                {/* Monitoring Section */}
                <div className="pb-10 border-b border-border">
                  <h3 className="text-2xl mb-8">Monitoring</h3>
                  <div className="bg-card border border-border rounded-xl p-7 flex items-center justify-between gap-6">
                    <div className="flex-1">
                      <p className="text-lg mb-2">Background keystroke monitoring</p>
                      <p className="text-muted-foreground text-[15px]">Cadence monitors your typing quietly in the background</p>
                    </div>
                    <button className="w-16 h-9 bg-accent rounded-full relative flex-shrink-0">
                      <div className="absolute right-1 top-1 w-7 h-7 bg-white rounded-full" />
                    </button>
                  </div>
                </div>

                {/* Notifications Section */}
                <div className="pb-10 border-b border-border">
                  <h3 className="text-2xl mb-8">Notifications</h3>
                  <div className="space-y-5">
                    <div className="bg-card border border-border rounded-xl p-7 flex items-center justify-between gap-6">
                      <p className="text-lg">Notify me if patterns are elevated</p>
                      <button className="w-16 h-9 bg-accent rounded-full relative flex-shrink-0">
                        <div className="absolute right-1 top-1 w-7 h-7 bg-white rounded-full" />
                      </button>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-7">
                      <div className="flex items-center justify-between mb-5">
                        <p className="text-lg">Alert threshold</p>
                        <span className="text-3xl text-accent" style={{ fontFamily: 'DM Serif Display, serif' }}>50%</span>
                      </div>
                      <input type="range" min="20" max="80" defaultValue="50" className="w-full mb-5 h-2" />
                      <p className="text-[15px] text-muted-foreground mb-5 leading-relaxed">
                        You'll be notified if your motor pattern score stays elevated for 3 or more consecutive weeks.
                      </p>
                      <p className="text-[15px] text-foreground leading-relaxed">
                        If your score stays above 50% for 3 weeks in a row, Cadence will suggest speaking with a neurologist.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Privacy & Data Section */}
                <div>
                  <h3 className="text-2xl mb-8">Privacy & Data</h3>
                  <div className="space-y-5">
                    <button className="w-full py-5 border border-border text-foreground rounded-xl text-lg hover:bg-muted/30 transition-colors">
                      View privacy information
                    </button>
                    <div>
                      <button className="w-full py-5 border border-destructive text-destructive rounded-xl text-lg hover:bg-destructive/10 transition-colors">
                        Clear all my data
                      </button>
                      <p className="text-[15px] text-muted-foreground mt-3 text-center leading-relaxed">
                        This will permanently delete all keystroke data and scores stored on your device. This cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
