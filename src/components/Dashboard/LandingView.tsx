import React from 'react';
import { Orbit, Sparkles, HeartPulse, ShieldCheck, Compass } from 'lucide-react';
import { Button } from '../Common/Button';

interface LandingViewProps {
  onEnter: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onEnter }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 relative min-h-[80vh] z-10 text-center">
      {/* Cinematic Glowing Orb */}
      <div className="absolute w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-transparent rounded-full blur-[80px] pointer-events-none animate-pulse" />

      {/* Hero Badge */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/20 text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest mb-6 animate-bounce">
        <Sparkles className="w-3.5 h-3.5" />
        <span>V1.0.0 Live Telemetry Gate</span>
      </div>

      {/* Main Branding Logo & Title */}
      <div className="flex flex-col items-center gap-6 max-w-2xl">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[2.5rem] bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_50px_rgba(59,130,246,0.5)] border border-blue-400/20 animate-[spin_20s_linear_infinite] hover:scale-105 transition-all">
          <Orbit className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        <div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-slate-100 leading-none">
            Aarogya
          </h1>
          <p className="text-sm sm:text-lg text-slate-400 font-medium uppercase tracking-[0.25em] mt-3">
            Nurture the body. Rise above.
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md px-4 mt-2">
          Defy weight limits with intelligent weight telemetry, macro planning, and instant AI-powered food vision diagnostics.
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-8 max-w-xl">
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 flex flex-col items-center text-center gap-2 hover:border-blue-500/20 transition-all duration-300">
            <HeartPulse className="w-5 h-5 text-blue-400" />
            <span className="text-[10px] font-bold uppercase text-slate-300 tracking-wide">Macro Core</span>
            <span className="text-[10px] text-slate-500 leading-normal">Interactive ratios for muscle, maintenance, or loss directives.</span>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 flex flex-col items-center text-center gap-2 hover:border-blue-500/20 transition-all duration-300">
            <Compass className="w-5 h-5 text-blue-400" />
            <span className="text-[10px] font-bold uppercase text-slate-300 tracking-wide">Vision Scan</span>
            <span className="text-[10px] text-slate-500 leading-normal">Snap or upload food photo to auto-extract active nutrients instantly.</span>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 flex flex-col items-center text-center gap-2 hover:border-blue-500/20 transition-all duration-300">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span className="text-[10px] font-bold uppercase text-slate-300 tracking-wide">Safe Limits</span>
            <span className="text-[10px] text-slate-500 leading-normal">Smart overload alerts preventing calorie limit violations.</span>
          </div>
        </div>

        {/* Enter Button */}
        <div className="mt-8 w-full sm:w-auto px-4">
          <Button
            onClick={onEnter}
            variant="primary"
            className="w-full sm:w-64 py-3.5 font-bold uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(59,130,246,0.3)]"
          >
            Launch Directive
          </Button>
        </div>
      </div>
    </div>
  );
};
