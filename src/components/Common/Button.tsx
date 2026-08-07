import React, { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'tab';
  active?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', active = false, className = '', ...props }, ref) => {
    const baseStyles = 'px-4 py-2 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed';
    
    let variantStyles = '';
    switch (variant) {
      case 'primary':
        variantStyles = 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transform hover:-translate-y-0.5';
        break;
      case 'secondary':
        variantStyles = 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/50 hover:border-slate-500/50';
        break;
      case 'danger':
        variantStyles = 'bg-gradient-to-r from-red-700 to-rose-700 hover:from-red-600 hover:to-rose-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transform hover:-translate-y-0.5';
        break;
      case 'success':
        variantStyles = 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transform hover:-translate-y-0.5';
        break;
      case 'tab':
        variantStyles = active
          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 text-glow-accent shadow-[0_0_15px_rgba(59,130,246,0.1)]'
          : 'bg-slate-900/50 text-slate-400 border border-slate-800/60 hover:text-slate-200 hover:border-slate-700/60';
        break;
    }

    return (
      <button ref={ref} className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
