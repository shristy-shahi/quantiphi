import React from 'react';
import { NutritionProvider } from './context/NutritionProvider';
import { GoalToggle } from './components/Dashboard/GoalToggle';
import { CalorieProgress } from './components/Dashboard/CalorieProgress';
import { MacroProgress } from './components/Dashboard/MacroProgress';
import { MealForm } from './components/Meal/MealForm';
import { MealList } from './components/Meal/MealList';
import { WarningModal } from './components/Modal/WarningModal';
import { Orbit, Sparkles } from 'lucide-react';

const DashboardContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col p-4 md:p-8 relative">
      {/* Visual background lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-slate-900 pb-5 mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] animate-[spin_10s_linear_infinite]">
            <Orbit className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-black uppercase tracking-wider text-slate-100 m-0 leading-none">
                Anti Gravity
              </h1>
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            </div>
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest mt-1 block">
              Defy the weight. Rise above.
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>FLIGHT ORBIT DIRECTIVE: ACTIVE</span>
        </div>
      </header>

      {/* Main Dashboard Grid */}
      <main className="max-w-7xl mx-auto w-full flex-1 flex flex-col gap-6 relative z-10">
        {/* Fitness Directive Select */}
        <section aria-label="Goal directive">
          <GoalToggle />
        </section>

        {/* Dynamic Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Progress Indicators (Left) */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            <CalorieProgress />
            <MacroProgress />
          </div>

          {/* Form & AI Scanner (Right) */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full">
            <MealForm />
            <MealList />
          </div>
        </div>
      </main>

      {/* Warning Overlay */}
      <WarningModal />

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full text-center border-t border-slate-900 pt-6 mt-12 text-[10px] text-slate-600 font-mono relative z-10">
        <p>ANTI GRAVITY NUTRITION ENGINE V1.0.0 &copy; 2026. ALL ORBITS SECURED.</p>
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
