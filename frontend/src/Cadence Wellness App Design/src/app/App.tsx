import { useState } from 'react';
import { OnboardingModal } from './components/onboarding-modal';
import { MainApp } from './components/main-app';

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-background gap-4">
      {/* Toggle for demo */}
      <button
        onClick={() => setShowOnboarding(!showOnboarding)}
        className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm hover:opacity-90"
      >
        {showOnboarding ? 'Hide' : 'Show'} Onboarding
      </button>

      {/* Desktop Window Container */}
      <div className="w-[1280px] h-[800px] bg-background rounded-lg overflow-hidden border border-border shadow-2xl">
        <MainApp />
        {showOnboarding && (
          <OnboardingModal onComplete={() => setShowOnboarding(false)} />
        )}
      </div>
    </div>
  );
}