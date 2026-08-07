import React from 'react';
import { useNutrition } from '../../hooks/useNutrition';
import { MealCard } from './MealCard';
import { Sparkles } from 'lucide-react';

export const MealList: React.FC = () => {
  const { state, dispatch } = useNutrition();

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_MEAL', payload: id });
  };

  return (
    <div className="glass-panel p-6 rounded-3xl flex flex-col gap-5 border-blue-500/10 w-full min-h-[350px]">
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-400 text-glow-accent" />
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
            Gravity Flight Log (Meals)
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-mono">
          {state.meals.length} {state.meals.length === 1 ? 'record' : 'records'}
        </span>
      </div>

      {state.meals.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-950/20 border border-dashed border-slate-900 rounded-2xl">
          <p className="text-xs text-slate-500 max-w-[200px] leading-relaxed">
            No active payloads loaded. Inject a food preset or trigger the AI vision scan above.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-1">
          {state.meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};
