import React, { useState, useEffect } from 'react';
import { NutritionProvider } from './context/NutritionProvider';
import { ThemeProvider, useTheme } from './context/ThemeContext';
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
import { getFirebaseAuth, firebaseSignOut } from './utils/firebase';
import type { AppUser } from './utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Orbit, Sparkles, Github, LogOut, User, Sun, Moon } from 'lucide-react';

type ViewState = 'landing' | 'auth' | 'dashboard';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-xl border transition-all duration-300 ${
        isDark
          ? 'bg-slate-900/80 border-slate-800 text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/5'
          : 'bg-white/80 border-slate-300 text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 shadow-sm'
      }`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};

const DashboardContent: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [user, setUser] = useState<AppUser | null>(null);
  const { isDark } = useTheme();

  // Listen for Firebase auth state changes on mount
  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email || '',
          photoURL: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        });
        setView('dashboard');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = (profile: AppUser) => {
    setUser(profile);
    setView('dashboard');
  };

  const handleLogout = async () => {
    await firebaseSignOut();
    setUser(null);
    setView('landing');
  };

  return (
    <div className={`min-h-screen flex flex-col relative overflow-hidden transition-colors duration-500 ${
      isDark
        ? 'bg-gravity-dark text-slate-100'
        : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 text-slate-800'
    }`}>
      {isDark && <GravityField />}

      {/* Ambient background orbs */}
      {isDark ? (
        <>
          <div className="fixed top-[-20%] left-[-15%] w-[60%] h-[60%] bg-blue-600/[0.04] rounded-full blur-[150px] pointer-events-none" />
          <div className="fixed bottom-[-20%] right-[-15%] w-[60%] h-[60%] bg-indigo-600/[0.04] rounded-full blur-[150px] pointer-events-none" />
          <div className="fixed top-[40%] left-[50%] w-[30%] h-[30%] bg-violet-600/[0.02] rounded-full blur-[100px] pointer-events-none" />
        </>
      ) : (
        <>
          <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/[0.06] rounded-full blur-[120px] pointer-events-none" />
          <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-400/[0.04] rounded-full blur-[120px] pointer-events-none" />
        </>
      )}

      {/* Landing */}
      {view === 'landing' && (
        <LandingView onEnter={() => setView('auth')} />
      )}

      {/* Auth */}
      {view === 'auth' && (
        <AuthView
          onLoginSuccess={handleLoginSuccess}
          onBack={() => setView('landing')}
        />
      )}

      {/* Dashboard */}
      {view === 'dashboard' && (
        <>
          <header className={`sticky top-0 z-30 border-b backdrop-blur-xl transition-colors duration-500 ${
            isDark
              ? 'border-slate-900/80 bg-slate-950/80'
              : 'border-slate-200/80 bg-white/70'
          }`}>
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] animate-[spin_12s_linear_infinite]">
                  <Orbit className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h1 className={`text-lg sm:text-xl font-black uppercase tracking-wider m-0 leading-none ${
                      isDark ? 'text-slate-100' : 'text-slate-900'
                    }`}>
                      Aarogya
                    </h1>
                    <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] mt-0.5 block ${
                    isDark ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    Nurture the body. Rise above.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {user && (
                  <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border ${
                    isDark
                      ? 'bg-slate-900/80 border-slate-800/80'
                      : 'bg-white/80 border-slate-200 shadow-sm'
                  }`}>
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="w-5 h-5 rounded-full border border-blue-500/20 object-cover"
                      />
                    ) : (
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        isDark ? 'bg-slate-800' : 'bg-slate-100'
                      }`}>
                        <User className="w-3 h-3 text-slate-400" />
                      </div>
                    )}
                    <span className={`text-[10px] font-mono font-bold hidden sm:inline ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {user.name}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="p-0.5 text-slate-500 hover:text-red-400 transition-colors ml-1"
                      title="Sign out"
                      aria-label="Sign out"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-mono ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-800/60 text-slate-500'
                    : 'bg-white/60 border-slate-200 text-slate-400 shadow-sm'
                }`}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>ACTIVE</span>
                </div>

                <ThemeToggle />
                <SettingsPanel />
              </div>
            </div>
          </header>

          <main className="flex-1 w-full relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6">
              <section aria-label="Fitness goal selector">
                <GoalToggle />
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <CalorieProgress />
                  <MacroProgress />
                </div>
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <MealForm />
                  <MealList />
                </div>
              </div>
            </div>
          </main>

          <WarningModal />
        </>
      )}

      {/* Footer */}
      <footer className={`border-t backdrop-blur-sm relative z-10 transition-colors duration-500 ${
        isDark
          ? 'border-slate-900/60 bg-slate-950/40'
          : 'border-slate-200/60 bg-white/30'
      }`}>
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-4 gap-2">
          <p className={`text-[10px] font-mono ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
            AAROGYA NUTRITION ENGINE V1.0.0 &copy; 2026
          </p>
          <a
            href="https://github.com/shristy-shahi/quantiphi"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-[10px] font-mono transition-colors ${
              isDark ? 'text-slate-600 hover:text-slate-400' : 'text-slate-400 hover:text-slate-600'
            }`}
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
    <ThemeProvider>
      <NutritionProvider>
        <DashboardContent />
      </NutritionProvider>
    </ThemeProvider>
  );
}

export default App;
