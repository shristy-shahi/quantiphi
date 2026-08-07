import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  id,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wider text-slate-400"
      >
        {label}
      </label>
      <input
        id={id}
        className={`px-4 py-2.5 rounded-xl bg-slate-950/60 border ${
          error ? 'border-red-500/60 focus:border-red-500' : 'border-slate-800 focus:border-blue-500'
        } text-slate-100 placeholder-slate-600 focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-blue-500/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.15)]`}
        {...props}
      />
      {error && (
        <span id={`${id}-error`} className="text-xs text-red-400 font-medium mt-0.5" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
