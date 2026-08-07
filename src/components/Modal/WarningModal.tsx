import React, { useEffect, useRef } from 'react';
import { useNutrition } from '../../hooks/useNutrition';
import { Button } from '../Common/Button';
import { AlertOctagon, Orbit } from 'lucide-react';

export const WarningModal: React.FC = () => {
  const { state, dispatch } = useNutrition();
  const { calories: consumed } = state.totals;
  const { calories: target } = state.targets;
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isVisible = state.exceeded && !state.warningDismissed;

  const handleClose = () => {
    dispatch({ type: 'CLOSE_WARNING' });
  };

  // Keyboard accessibility listeners (ESC key & focus trapping)
  useEffect(() => {
    if (!isVisible) return;

    // Focus the dismiss button immediately on mount
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  if (!isVisible) return null;

  const surplus = consumed - target;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="warning-title"
      aria-describedby="warning-desc"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="glass-panel-danger w-full max-w-md rounded-3xl p-6 relative z-10 flex flex-col items-center text-center gap-5 border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.3)] animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 rounded-2xl border border-red-500/40 flex items-center justify-center bg-red-500/10 text-red-500 [filter:drop-shadow(0_0_15px_rgba(239,68,68,0.4))] animate-pulse">
          <AlertOctagon className="w-8 h-8" />
        </div>

        <div>
          <h2
            id="warning-title"
            className="text-xl font-black uppercase text-red-400 tracking-wider text-glow-danger"
          >
            Calorie Limit Exceeded
          </h2>
          <p id="warning-desc" className="text-xs text-slate-300 leading-relaxed mt-3 px-2">
            Warning: Calorie core overload detected! Consumed <strong className="text-red-400">{consumed.toLocaleString()} kcal</strong>, which exceeds your daily target limit of <strong className="text-slate-100">{target.toLocaleString()} kcal</strong> by <strong className="text-red-400">+{surplus.toLocaleString()} kcal</strong>. Stabilize nutrition parameters.
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full mt-2">
          <Button
            ref={closeButtonRef}
            variant="danger"
            onClick={handleClose}
            className="w-full py-3 font-bold uppercase tracking-wider flex items-center justify-center gap-2 group focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <Orbit className="w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-700" />
            <span>Stabilize Parameters</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
