import React from 'react';
import { useNutrition } from '../../hooks/useNutrition';
import { Flame, AlertTriangle } from 'lucide-react';

export const CalorieProgress: React.FC = () => {
  const { state } = useNutrition();
  const { calories: consumed } = state.totals;
  const { calories: target } = state.targets;

  const remaining = target - consumed;
  const isExceeded = consumed > target;
  const percentage = target > 0 ? Math.min((consumed / target) * 100, 100) : 0;

  // SVG Gauge calculations
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={`glass-panel p-6 rounded-3xl flex flex-col items-center justify-center gap-6 w-full ${
        isExceeded ? 'pulse-glow-danger border-red-500/40 bg-red-950/10' : 'border-blue-500/10'
      } transition-all duration-500`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Flame className={`w-5 h-5 ${isExceeded ? 'text-red-400 text-glow-danger' : 'text-blue-400 text-glow-accent'}`} />
          <span className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
            Calorie Core
          </span>
        </div>
        {isExceeded && (
          <div className="flex items-center gap-1 bg-red-950/60 border border-red-500/30 text-red-400 px-2.5 py-1 rounded-full text-xs font-semibold animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Limit Overload</span>
          </div>
        )}
      </div>

      {/* SVG Circle Gauge */}
      <div className="relative flex items-center justify-center w-48 h-48">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            className="stroke-slate-900 fill-transparent"
            strokeWidth="12"
          />
          {/* Foreground progress circle */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            className={`fill-transparent transition-all duration-1000 ${
              isExceeded
                ? 'stroke-red-500 [filter:drop-shadow(0_0_8px_rgba(239,68,68,0.6))]'
                : 'stroke-blue-500 [filter:drop-shadow(0_0_8px_rgba(59,130,246,0.6))]'
            }`}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Floating details inside gauge */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span
            className={`text-3xl font-extrabold tracking-tighter ${
              isExceeded ? 'text-red-400 text-glow-danger animate-pulse' : 'text-slate-100 text-glow-accent'
            }`}
          >
            {isExceeded ? `+${Math.abs(remaining).toLocaleString()}` : remaining.toLocaleString()}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">
            {isExceeded ? 'Surplus' : 'Remaining'}
          </span>
          <span className="text-[10px] text-slate-600 uppercase font-mono mt-0.5">kcal</span>
        </div>
      </div>

      {/* Numerical Stats row */}
      <div className="grid grid-cols-2 w-full border-t border-slate-800/60 pt-4 divide-x divide-slate-800/60 text-center text-xs">
        <div>
          <span className="block text-slate-500 uppercase font-semibold">Consumed</span>
          <span className="block text-base font-bold text-slate-200 mt-0.5">
            {consumed.toLocaleString()} <span className="text-xs text-slate-500 font-normal">kcal</span>
          </span>
        </div>
        <div>
          <span className="block text-slate-500 uppercase font-semibold">Target</span>
          <span className="block text-base font-bold text-slate-200 mt-0.5">
            {target.toLocaleString()} <span className="text-xs text-slate-500 font-normal">kcal</span>
          </span>
        </div>
      </div>
    </div>
  );
};
