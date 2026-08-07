import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  label: string;
  unit?: string;
  variant?: 'blue' | 'emerald' | 'amber';
  colorOverride?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  unit = '',
  variant = 'blue',
  colorOverride,
}) => {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const isExceeded = value > max;

  // Set the color variant
  let barColorClass = '';
  if (isExceeded) {
    barColorClass = 'bg-gradient-to-r from-red-600 to-rose-600 shadow-[0_0_12px_rgba(239,68,68,0.5)]';
  } else if (colorOverride) {
    barColorClass = colorOverride;
  } else {
    switch (variant) {
      case 'emerald':
        barColorClass = 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]';
        break;
      case 'amber':
        barColorClass = 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]';
        break;
      case 'blue':
      default:
        barColorClass = 'bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]';
        break;
    }
  }

  // Formatting display
  const displayPercentage = Math.round((value / (max || 1)) * 100);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-baseline">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
            {label}
          </span>
          <span className="text-xs text-slate-500">
            {value.toLocaleString()} / {max.toLocaleString()} {unit}
          </span>
        </div>
        <span
          className={`text-sm font-bold ${
            isExceeded ? 'text-red-400 text-glow-danger' : 'text-slate-200'
          }`}
          aria-live="polite"
        >
          {displayPercentage}%
        </span>
      </div>

      <div
        className="w-full h-3 rounded-full bg-slate-900/80 overflow-hidden border border-slate-800/40 p-[1px]"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`${label} progress`}
      >
        <div
          className={`h-full rounded-full progress-bar-transition ${barColorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
