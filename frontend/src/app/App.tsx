import { MainApp } from './components/main-app';

export default function App() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-background">
      <div className="w-[1280px] h-[800px] bg-background rounded-lg overflow-hidden border border-border shadow-2xl">
        <MainApp />
      </div>
    </div>
  );
}
