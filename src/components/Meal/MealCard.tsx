import React from 'react';
import type { FoodItem } from '../../types/nutrition';
import { Trash2, Flame } from 'lucide-react';

interface MealCardProps {
  meal: FoodItem;
  onDelete: (id: string) => void;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, onDelete }) => {
  return (
    <div className="bg-slate-900/50 border border-slate-800/60 rounded-2xl p-4 flex items-center justify-between gap-3 transition-all duration-300 hover:border-slate-700/80 hover:bg-slate-900/70 group">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Icon */}
        <div className="w-10 h-10 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center flex-shrink-0">
          <Flame className="w-4 h-4 text-blue-400" />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <h3 className="text-sm font-bold text-slate-200 truncate">
              {meal.name}
            </h3>
            <span className="text-[10px] text-slate-500 font-mono flex-shrink-0">
              {meal.grams}g
            </span>
          </div>

          <div className="flex items-center gap-2.5 mt-1.5 text-[10px] font-mono text-slate-400">
            <span className="text-blue-300 font-semibold">{meal.calories} kcal</span>
            <span className="w-px h-3 bg-slate-800" />
            <span>P:<strong className="text-emerald-300 ml-0.5">{meal.protein}g</strong></span>
            <span>C:<strong className="text-amber-300 ml-0.5">{meal.carbs}g</strong></span>
            <span>F:<strong className="text-purple-300 ml-0.5">{meal.fats}g</strong></span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onDelete(meal.id)}
        className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/60 text-slate-600 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 hover:shadow-[0_0_10px_rgba(239,68,68,0.1)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 flex-shrink-0"
        aria-label={`Delete ${meal.name}`}
        title={`Delete ${meal.name}`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
