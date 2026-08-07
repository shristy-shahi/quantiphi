import React from 'react';
import { useNutrition } from '../../hooks/useNutrition';
import type { FitnessGoal } from '../../types/nutrition';
import { Button } from '../Common/Button';
import { Target } from 'lucide-react';

export const GoalToggle: React.FC = () => {
  const { state, dispatch } = useNutrition();
  const goals: FitnessGoal[] = ['Weight Loss', 'Maintenance', 'Muscle Gain'];

  const handleGoalChange = (goal: FitnessGoal) => {
    dispatch({ type: 'SET_GOAL', payload: goal });
  };

  return (
    <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          <Target className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-100 uppercase tracking-wide">Fitness Directive</h2>
          <p className="text-xs text-slate-400">Configure calorie and macronutrient limits</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap" role="radiogroup" aria-label="Select fitness directive">
        {goals.map((g) => (
          <Button
            key={g}
            variant="tab"
            active={state.goal === g}
            onClick={() => handleGoalChange(g)}
            role="radio"
            aria-checked={state.goal === g}
            className="flex-1 md:flex-initial text-sm"
          >
            {g}
          </Button>
        ))}
      </div>
    </div>
  );
};
