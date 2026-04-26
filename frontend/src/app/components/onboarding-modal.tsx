import React from 'react';
import { Keyboard, Lock, TrendingUp } from 'lucide-react';

interface OnboardingModalProps {
  onComplete: () => void;
}

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [step, setStep] = React.useState(0);

  const handleNext = () => {
    if (step === 2) {
      onComplete();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-[600px] bg-card rounded-xl border border-border p-12">
        {/* Step indicators */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-[9px] h-[9px] rounded-full transition-colors ${
                i === step ? 'bg-accent' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Step 1 */}
        {step === 0 && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8">
              <Keyboard className="w-10 h-10 text-accent" strokeWidth={1.5} />
            </div>
            <h2 className="text-[28px] mb-6" style={{ fontFamily: 'DM Serif Display, serif' }}>Meet Cadence</h2>
            <p className="text-muted-foreground text-[17px] leading-[1.8] mb-10">
              Cadence monitors your natural typing patterns in the background to help detect early motor
              changes associated with Parkinson's disease.
              <br /><br />
              No tests, no effort — just type normally.
            </p>
            <button
              onClick={handleNext}
              className="w-full bg-accent text-accent-foreground py-4 px-6 rounded-lg text-lg hover:opacity-90 transition-opacity"
            >
              Get started
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 1 && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8">
              <Lock className="w-10 h-10 text-accent" strokeWidth={1.5} />
            </div>
            <h2 className="text-[28px] mb-6" style={{ fontFamily: 'DM Serif Display, serif' }}>Your privacy, protected</h2>
            <div className="text-left space-y-4 mb-10">
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-base text-foreground leading-[1.7]">Only keystroke timing is recorded — hold duration and gaps between keys</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-base text-foreground leading-[1.7]">No characters, words, or content are ever captured</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-base text-foreground leading-[1.7]">All data stays on your device, nothing is uploaded anywhere</p>
              </div>
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-accent text-accent-foreground py-4 px-6 rounded-lg text-lg hover:opacity-90 transition-opacity"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 3 */}
        {step === 2 && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8">
              <TrendingUp className="w-10 h-10 text-accent" strokeWidth={1.5} />
            </div>
            <h2 className="text-[28px] mb-6" style={{ fontFamily: 'DM Serif Display, serif' }}>First, a baseline</h2>
            <p className="text-muted-foreground text-[17px] leading-[1.8] mb-8">
              Cadence builds your typing baseline in two stages as you type naturally.
            </p>
            <div className="mb-8">
              <div className="relative h-2.5 bg-muted/30 rounded-full overflow-visible mb-2">
                <div className="h-full bg-accent rounded-full w-0 transition-all duration-500" />
                <div className="absolute top-1/2 -translate-y-1/2 w-1 h-5 bg-foreground/30 rounded-full" style={{ left: '20%' }} />
                <div className="absolute top-1/2 -translate-y-1/2 w-1 h-5 bg-foreground/30 rounded-full" style={{ left: '100%' }} />
              </div>
              <div className="relative h-14 mb-3">
                <div className="absolute text-sm text-center" style={{ left: '20%', transform: 'translateX(-50%)', width: '80px' }}>
                  <div className="text-muted-foreground">Preliminary</div>
                  <div className="text-foreground text-base">500</div>
                </div>
                <div className="absolute text-sm text-center" style={{ left: '100%', transform: 'translateX(-50%)', width: '80px' }}>
                  <div className="text-muted-foreground">Reliable</div>
                  <div className="text-foreground text-base">2,500</div>
                </div>
              </div>
              <p className="text-base text-muted-foreground">0 keystrokes collected</p>
            </div>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-10 text-left">
              Preliminary results unlock at 500 keystrokes (~1–2 days). Reliable scoring unlocks at 2,500 keystrokes (~3–5 days of normal use).
            </p>
            <button
              onClick={handleNext}
              className="w-full bg-accent text-accent-foreground py-4 px-6 rounded-lg text-lg hover:opacity-90 transition-opacity"
            >
              Start monitoring
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
