import React, { useState, useEffect } from 'react';
import { Settings, Eye, EyeOff, CheckCircle, XCircle, Key } from 'lucide-react';
import { setOpenAIApiKey, getOpenAIApiKey, hasApiKey } from '../../utils/openai';
import { Button } from '../Common/Button';

export const SettingsPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setApiKey(getOpenAIApiKey());
  }, [isOpen]);

  const handleSave = () => {
    setOpenAIApiKey(apiKey);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleClear = () => {
    setApiKey('');
    setOpenAIApiKey('');
    setIsSaved(false);
  };

  const isConfigured = hasApiKey();

  return (
    <>
      {/* Settings Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2.5 rounded-xl border transition-all duration-300 ${
          isConfigured
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
            : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
        }`}
        aria-label="Open settings"
        title={isConfigured ? 'API Key configured — Click to manage' : 'Configure OpenAI API Key'}
      >
        <Settings className={`w-4 h-4 ${isOpen ? 'animate-spin' : ''}`} />
      </button>

      {/* Settings Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-start justify-end p-4" role="dialog" aria-modal="true" aria-label="Settings">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} aria-hidden="true" />
          
          <div className="glass-panel-glow rounded-3xl p-6 w-full max-w-md mt-16 relative z-50 flex flex-col gap-5 border border-blue-500/15 shadow-[0_0_40px_rgba(59,130,246,0.1)]">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <Key className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                    AI Vision Settings
                  </h2>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Configure OpenAI API for real food detection
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg border border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700 transition-all"
                aria-label="Close settings"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>

            {/* Status Indicator */}
            <div className={`flex items-center gap-2.5 p-3 rounded-xl border ${
              isConfigured
                ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                : 'bg-amber-500/5 border-amber-500/20 text-amber-400'
            }`}>
              {isConfigured ? (
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 flex-shrink-0" />
              )}
              <span className="text-xs font-semibold uppercase tracking-wider">
                {isConfigured ? 'API Key Active — Real detection enabled' : 'No API Key — Using mock detection'}
              </span>
            </div>

            {/* API Key Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="openai-api-key" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                OpenAI API Key
              </label>
              <div className="relative">
                <input
                  id="openai-api-key"
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => { setApiKey(e.target.value); setIsSaved(false); }}
                  placeholder="sk-proj-..."
                  className="w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm font-mono"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label={showKey ? 'Hide API key' : 'Show API key'}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-600 leading-relaxed">
                Your key is stored in memory only and never persisted to disk. It will be cleared when you close the browser tab.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={handleSave}
                className="flex-1 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                disabled={!apiKey.trim()}
              >
                {isSaved ? <CheckCircle className="w-3.5 h-3.5" /> : null}
                <span>{isSaved ? 'Saved' : 'Save Key'}</span>
              </Button>
              <Button
                variant="secondary"
                onClick={handleClear}
                className="text-xs font-bold uppercase tracking-wider"
                disabled={!apiKey.trim()}
              >
                Clear
              </Button>
            </div>

            {/* Info */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-3 text-[10px] text-slate-500 leading-relaxed">
              <p className="font-bold text-slate-400 mb-1">How it works:</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>Upload or drag a food photo in the AI Scanner</li>
                <li>The image is sent to <strong className="text-slate-300">GPT-4o-mini</strong> for analysis</li>
                <li>Nutrition data is returned and auto-filled in the form</li>
                <li>Without an API key, the mock scanner is used instead</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
