import { Keyboard, Shield, Activity } from 'lucide-react';

export function Onboarding() {
  return (
    <div className="w-full h-full bg-background flex items-center justify-center p-12">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl mb-2">Welcome to Cadence</h1>
          <p className="text-muted-foreground">Set up takes less than a minute</p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-card rounded-3xl p-8 shadow-lg flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
              <Keyboard className="w-10 h-10 text-accent" strokeWidth={1.5} />
            </div>
            <h2 className="mb-4">Meet Cadence</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Cadence monitors your natural typing patterns in the background to detect early motor changes associated with Parkinson's disease.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              No tests, no effort required — just type naturally.
            </p>
            <button className="mt-auto w-full bg-accent text-accent-foreground py-3 px-6 rounded-full hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </div>

          {/* Step 2 */}
          <div className="bg-card rounded-3xl p-8 shadow-lg flex flex-col">
            <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 mx-auto">
              <Shield className="w-10 h-10 text-accent" strokeWidth={1.5} />
            </div>
            <h2 className="text-center mb-6">Your privacy, protected</h2>

            <div className="space-y-4 mb-8">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-success" />
                </div>
                <div>
                  <p className="text-foreground mb-1">Keystroke timing only</p>
                  <p className="text-sm text-muted-foreground">We measure how long you hold keys and intervals between them</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-success" />
                </div>
                <div>
                  <p className="text-foreground mb-1">No content recorded</p>
                  <p className="text-sm text-muted-foreground">Characters and words are never captured or stored</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-success" />
                </div>
                <div>
                  <p className="text-foreground mb-1">Local processing</p>
                  <p className="text-sm text-muted-foreground">All data is processed and stored on your device, never uploaded</p>
                </div>
              </div>
            </div>

            <button className="mt-auto w-full bg-accent text-accent-foreground py-3 px-6 rounded-full hover:opacity-90 transition-opacity">
              Continue
            </button>
          </div>

          {/* Step 3 */}
          <div className="bg-card rounded-3xl p-8 shadow-lg flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
              <Activity className="w-10 h-10 text-accent" strokeWidth={1.5} />
            </div>
            <h2 className="mb-4">First, let's get to know your typing</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Cadence needs approximately 500 keystrokes of natural typing before showing results — about 1–2 days of normal computer use.
            </p>

            <div className="w-full mb-8">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted/30"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * 0.7}`}
                    className="text-accent transition-all duration-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl text-foreground">0/500</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Just type naturally as you work</p>
            </div>

            <button className="mt-auto w-full bg-accent text-accent-foreground py-3 px-6 rounded-full hover:opacity-90 transition-opacity">
              Start Monitoring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
