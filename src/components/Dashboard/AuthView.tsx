import React, { useState } from 'react';
import { Orbit, Key, ShieldCheck } from 'lucide-react';
import { signInWithGoogle, isFirebaseConfigured } from '../../utils/firebase';
import type { AppUser } from '../../utils/firebase';

interface AuthViewProps {
  onLoginSuccess: (user: AppUser) => void;
  onBack: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess, onBack }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const useFirebase = isFirebaseConfigured();

  const handleGoogleSignIn = async () => {
    setIsAuthenticating(true);
    setAuthError(null);

    if (useFirebase) {
      // ── Real Firebase Google Sign-In ──
      setAuthStep('Opening Google Sign-In popup...');
      try {
        const user = await signInWithGoogle();
        setAuthStep('Syncing profile data...');
        await new Promise((r) => setTimeout(r, 400));
        setIsAuthenticating(false);
        onLoginSuccess(user);
      } catch (err) {
        setIsAuthenticating(false);
        const message = err instanceof Error ? err.message : 'Authentication failed.';
        if (message.includes('popup-closed-by-user')) {
          setAuthError('Sign-in popup was closed. Please try again.');
        } else {
          setAuthError(message);
        }
      }
    } else {
      // ── Mock fallback ──
      const steps = [
        'Connecting to Firebase Auth services...',
        'Opening Google accounts popup...',
        'Authenticating credentials...',
        'Syncing user profile metadata...',
        'Securing dashboard token...',
      ];

      for (let i = 0; i < steps.length; i++) {
        setAuthStep(steps[i]);
        await new Promise((r) => setTimeout(r, 500));
      }

      const mockProfile: AppUser = {
        name: 'Shristy Shahi',
        email: 'shristy.shahi@quantiphi.com',
        photoURL: null,
        uid: 'mock-uid-001',
      };

      setIsAuthenticating(false);
      onLoginSuccess(mockProfile);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
      <div className="glass-panel-glow w-full max-w-md rounded-3xl p-6 sm:p-8 flex flex-col gap-6 border-blue-500/10 shadow-[0_0_50px_rgba(59,130,246,0.15)] relative overflow-hidden">
        {isAuthenticating && (
          <div className="absolute inset-0 bg-slate-950/90 dark:bg-slate-950/90 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 animate-[spin_3s_linear_infinite]">
              <Orbit className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest animate-pulse">
              {useFirebase ? 'Google Auth Exchange' : 'Simulated Auth Exchange'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono mt-2 max-w-[240px] leading-relaxed">
              {authStep}
            </span>
          </div>
        )}

        {/* Back Link */}
        <button
          onClick={onBack}
          className="self-start text-[10px] text-slate-500 hover:text-slate-300 font-mono uppercase tracking-widest transition-colors"
        >
          &larr; Back to Gate
        </button>

        {/* Brand & Auth title */}
        <div className="flex flex-col items-center text-center gap-3 mt-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] animate-pulse">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-slate-100 m-0">
              Identity Verification
            </h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">
              Secure access to Aarogya health telemetry
            </p>
          </div>
        </div>

        {/* Auth mode badge */}
        <div className={`flex items-center justify-center gap-1.5 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${
          useFirebase
            ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5'
            : 'text-amber-400 border-amber-500/20 bg-amber-500/5'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${useFirebase ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          {useFirebase ? 'Firebase Live Mode' : 'Mock Auth Mode — Add Firebase keys to .env'}
        </div>

        {/* Error Display */}
        {authError && (
          <div className="bg-red-950/30 border border-red-500/20 rounded-xl p-3 text-xs text-red-300 text-center">
            {authError}
          </div>
        )}

        {/* Google Sign-In Button */}
        <div className="flex flex-col gap-4 mt-2">
          <button
            onClick={handleGoogleSignIn}
            disabled={isAuthenticating}
            className="flex items-center justify-center gap-3 w-full py-3.5 px-4 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 hover:border-slate-600 hover:text-slate-100 text-slate-300 text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* SVG Google Logo */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span>Sign in with Google</span>
          </button>
        </div>

        {/* Security Disclaimers */}
        <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-3.5 flex items-start gap-2.5 mt-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
          <div className="text-[9px] text-slate-500 leading-normal font-mono">
            <p className="font-bold text-slate-400">SECURITY PROTOCOL:</p>
            <p className="mt-1">
              {useFirebase
                ? 'Authentication is handled securely by Google Firebase. Your credentials never touch our servers.'
                : 'Running in mock mode. Add VITE_FIREBASE_* keys to your .env file for real Google authentication.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
