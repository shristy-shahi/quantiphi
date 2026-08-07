import React from 'react';
import { useNutrition } from '../../hooks/useNutrition';
import { ProgressBar } from '../Common/ProgressBar';
import { Scale } from 'lucide-react';

export const MacroProgress: React.FC = () => {
  const { state } = useNutrition();
  const { protein: pConsumed, carbs: cConsumed, fats: fConsumed } = state.totals;
  const { protein: pTarget, carbs: cTarget, fats: fTarget } = state.targets;

  return (
    <div className="glass-panel p-6 rounded-3xl flex flex-col gap-6 w-full border-blue-500/10">
      <div className="flex items-center gap-2 border-b border-slate-800/60 pb-3">
        <Scale className="w-5 h-5 text-blue-400 text-glow-accent" />
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
          Macronutrient Ratios
        </h2>
      </div>

      <div className="flex flex-col gap-5">
        <ProgressBar
          label="Protein Core"
          value={pConsumed}
          max={pTarget}
          unit="g"
          variant="emerald"
        />

        <ProgressBar
          label="Carbohydrate Fuel"
          value={cConsumed}
          max={cTarget}
          unit="g"
          variant="amber"
        />

        <ProgressBar
          label="Lipid / Fat Matrix"
          value={fConsumed}
          max={fTarget}
          unit="g"
          variant="blue"
        />
      </div>
    </div>
  );
};
