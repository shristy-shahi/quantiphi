import React from 'react';
import type { FoodItem } from '../../types/nutrition';
import { Trash2 } from 'lucide-react';

interface MealCardProps {
  meal: FoodItem;
  onDelete: (id: string) => void;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, onDelete }) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between gap-4 transition-all duration-300 hover:border-slate-700/80 hover:bg-slate-900/80 group">
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <h3 className="text-sm font-bold text-slate-200 truncate uppercase tracking-wide">
            {meal.name}
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">({meal.grams}g)</span>
        </div>

        {/* Nutritional values */}
        <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">
            {meal.calories} <span className="text-[10px] text-slate-500 font-normal">kcal</span>
          </span>
          <div className="flex gap-2.5 font-mono text-[10px] border-l border-slate-800 pl-3">
            <span>P: <strong className="text-slate-300">{meal.protein}g</strong></span>
            <span>C: <strong className="text-slate-300">{meal.carbs}g</strong></span>
            <span>F: <strong className="text-slate-300">{meal.fats}g</strong></span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onDelete(meal.id)}
        className="p-2 rounded-xl bg-slate-950 border border-slate-850 text-slate-500 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50"
        aria-label={`Delete ${meal.name}`}
        title={`Delete ${meal.name}`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
