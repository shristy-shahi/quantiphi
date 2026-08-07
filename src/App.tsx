import React, { useState } from 'react';
import { NutritionProvider } from './context/NutritionProvider';
import { GoalToggle } from './components/Dashboard/GoalToggle';
import { CalorieProgress } from './components/Dashboard/CalorieProgress';
import { MacroProgress } from './components/Dashboard/MacroProgress';
import { MealForm } from './components/Meal/MealForm';
import { MealList } from './components/Meal/MealList';
import { WarningModal } from './components/Modal/WarningModal';
import { SettingsPanel } from './components/Dashboard/SettingsPanel';
import { GravityField } from './components/Dashboard/GravityField';
import { LandingView } from './components/Dashboard/LandingView';
import { AuthView } from './components/Dashboard/AuthView';
import { Orbit, Sparkles, Github, LogOut, User } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  photoURL?: string;
}

type ViewState = 'landing' | 'auth' | 'dashboard';

const DashboardContent: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [user, setUser] = useState<UserProfile | null>(null);

  const handleLoginSuccess = (profile: UserProfile) => {
    setUser(profile);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  return (
    <div className="min-h-screen bg-gravity-dark text-slate-100 flex flex-col relative overflow-hidden">
      <GravityField />
      
      {/* Ambient background orbs */}
      <div className="fixed top-[-20%] left-[-15%] w-[60%] h-[60%] bg-blue-600/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-15%] w-[60%] h-[60%] bg-indigo-600/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed top-[40%] left-[50%] w-[30%] h-[30%] bg-violet-600/[0.02] rounded-full blur-[100px] pointer-events-none" />

      {/* Render Landing View */}
      {view === 'landing' && (
        <LandingView onEnter={() => setView('auth')} />
      )}

      {/* Render Auth View */}
      {view === 'auth' && (
        <AuthView
          onLoginSuccess={handleLoginSuccess}
          onBack={() => setView('landing')}
        />
      )}

      {/* Render Dashboard View */}
      {view === 'dashboard' && (
        <>
          {/* Header */}
          <header className="sticky top-0 z-30 border-b border-slate-900/80 bg-slate-950/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] animate-[spin_12s_linear_infinite]">
                  <Orbit className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h1 className="text-lg sm:text-xl font-black uppercase tracking-wider text-slate-100 m-0 leading-none">
                      Aarogya
                    </h1>
                    <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-semibold uppercase tracking-[0.2em] mt-0.5 block">
                    Nurture the body. Rise above.
                  </span>
                </div>
              </div>

              {/* User profile / Settings bar */}
              <div className="flex items-center gap-3">
                {user && (
                  <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800/80 px-2.5 py-1.5 rounded-xl">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="w-5 h-5 rounded-full border border-blue-500/20 object-cover"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">
                        <User className="w-3 h-3 text-slate-400" />
                      </div>
                    )}
                    <span className="text-[10px] font-mono font-bold text-slate-300 hidden sm:inline">
                      {user.name}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="p-0.5 text-slate-500 hover:text-red-400 transition-colors ml-1"
                      title="Exit Orbit Log"
                      aria-label="Logout"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800/60 text-[10px] font-mono text-slate-500">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>ORBIT ACTIVE</span>
                </div>
                
                <SettingsPanel />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 w-full relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6">
              {/* Goal Selector */}
              <section aria-label="Fitness goal selector">
                <GoalToggle />
              </section>

              {/* Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Progress */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <CalorieProgress />
                  <MacroProgress />
                </div>

                {/* Right Column: Input & History */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <MealForm />
                  <MealList />
                </div>
              </div>
            </div>
          </main>

          {/* Warning Overlay */}
          <WarningModal />
        </>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900/60 bg-slate-950/40 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-4 gap-2">
          <p className="text-[10px] text-slate-600 font-mono">
            AAROGYA NUTRITION ENGINE V1.0.0 &copy; 2026
          </p>
          <a
            href="https://github.com/shristy-shahi/quantiphi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[10px] text-slate-600 hover:text-slate-400 transition-colors font-mono"
          >
            <Github className="w-3 h-3" />
            <span>shristy-shahi/quantiphi</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <NutritionProvider>
      <DashboardContent />
    </NutritionProvider>
  );
}

export default App;
