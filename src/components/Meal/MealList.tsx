import React, { useMemo } from 'react';
import { useNutrition } from '../../hooks/useNutrition';
import { MealCard } from './MealCard';
import { ClipboardList, TrendingUp } from 'lucide-react';

export const MealList: React.FC = () => {
  const { state, dispatch } = useNutrition();

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_MEAL', payload: id });
  };

  const totalCalories = useMemo(
    () => state.meals.reduce((sum, m) => sum + m.calories, 0),
    [state.meals]
  );

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-3xl flex flex-col gap-4 border-blue-500/10 w-full">
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-blue-400 text-glow-accent" />
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
            Flight Log
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {state.meals.length > 0 && (
            <>
              <button
                onClick={() => dispatch({ type: 'CLEAR_MEALS' })}
                className="px-2 py-0.5 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 text-[10px] font-mono font-bold transition-all"
                title="Wipe logged history"
              >
                CLEAR ALL
              </button>
              <span className="flex items-center gap-1 text-[10px] text-slate-500 font-mono bg-slate-900/60 px-2 py-0.5 rounded-full border border-slate-800/60">
                <TrendingUp className="w-3 h-3 text-blue-400" />
                {totalCalories.toLocaleString()} kcal
              </span>
            </>
          )}
          <span className="text-[10px] text-slate-600 font-mono">
            {state.meals.length} {state.meals.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>
      </div>

      {state.meals.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-10 px-6 bg-slate-950/30 border border-dashed border-slate-900/80 rounded-2xl">
          <div className="w-12 h-12 rounded-2xl border border-slate-800/80 flex items-center justify-center mb-3 bg-slate-900/40">
            <ClipboardList className="w-5 h-5 text-slate-700" />
          </div>
          <p className="text-xs text-slate-600 max-w-[240px] leading-relaxed">
            No payloads logged. Use the form above to manually add a meal, or upload a food photo for AI-powered detection.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5 max-h-[400px] overflow-y-auto pr-1">
          {state.meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};
