"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Key,
  ShieldCheck,
  Zap,
  RefreshCw,
  Lock,
  Link2,
  Eye,
  EyeOff,
  CheckCircle2,
  Shield,
  Globe,
  ArrowRight,
  Star,
  Terminal
} from "lucide-react";

interface Platform {
  id: string;
  name: string;
  category: string;
  authType: string;
  domain: string;
  color: string;
  description: string;
}

interface ConnectionModalProps {
  platform: Platform | null;
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  setApiKey: (val: string) => void;
  isSaving: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onOAuth: () => void;
}

const getPlaceholder = (id: string) => {
  const hints: Record<string, string> = {
    openai: "sk-proj-••••••••••••••••••••••",
    claude: "sk-ant-api03-••••••••••••••••",
    elevenlabs: "el_••••••••••••••••••••••••••••••",
    mistral: "••••••••••••••••••••••••••••••••",
    gemini: "AIza••••••••••••••••••••••••••••",
    heygen: "••••••••••••••••••••••••••••••••",
    manychat: "••••••••••••••••••••••••••••••••",
    n8n: "n8n_api_••••••••••••••••••••••••",
    make: "••••••••-••••-••••-••••-••••••••",
    perplexity: "pplx-••••••••••••••••••••••••••••",
    cohere: "••••••••••••••••••••••••••••••••",
    instantly: "••••••••-••••-••••-••••-••••••••",
    retell: "key_••••••••••••••••••••••••••••",
    aws_bedrock: "AKIA••••••••••••••••",
    azure_openai: "••••••••••••••••••••••••••••••••",
  };
  return hints[id] ?? "Paste your API key here...";
};

const getInstructions = (id: string): { step: string; url?: string }[] => {
  const docs: Record<string, { step: string; url?: string }[]> = {
    openai: [
      { step: "Open platform.openai.com/api-keys", url: "https://platform.openai.com/api-keys" },
      { step: 'Click "Create new secret key"' },
      { step: "Copy and paste the key below" },
    ],
    claude: [
      { step: "Go to console.anthropic.com", url: "https://console.anthropic.com/settings/keys" },
      { step: "Navigate to API Keys → Create" },
      { step: "Copy and paste the key below" },
    ],
    elevenlabs: [
      { step: "Sign in at elevenlabs.io", url: "https://elevenlabs.io" },
      { step: "Click profile → API Keys" },
      { step: "Generate and copy the key" },
    ],
    heygen: [
      { step: "Sign in at app.heygen.com", url: "https://app.heygen.com" },
      { step: "Settings → API → Generate token" },
      { step: "Copy and paste below" },
    ],
    mistral: [
      { step: "Go to console.mistral.ai", url: "https://console.mistral.ai/api-keys" },
      { step: "Create a new API key" },
      { step: "Copy and paste below" },
    ],
    gemini: [
      { step: "Visit Google AI Studio", url: "https://aistudio.google.com/app/apikey" },
      { step: 'Click "Get API key" → Create new' },
      { step: "Copy and paste below" },
    ],
    perplexity: [
      { step: "Go to perplexity.ai Settings", url: "https://www.perplexity.ai/settings/api" },
      { step: "Navigate to API → Generate key" },
      { step: "Copy and paste below" },
    ],
    retell: [
      { step: "Log in at app.retellai.com", url: "https://app.retellai.com" },
      { step: "Go to API Keys section" },
      { step: "Create and copy your key" },
    ],
    manychat: [
      { step: "Log in at manychat.com", url: "https://manychat.com" },
      { step: "Settings → API → Request access" },
      { step: "Copy the generated token" },
    ],
  };
  return (
    docs[id] ?? [
      { step: `Log in to your ${id.replace(/_/g, " ")} account` },
      { step: "Go to Settings → API or Developer" },
      { step: "Create an API key and paste below" },
    ]
  );
};

const securityItems = [
  { icon: ShieldCheck, label: "AES-256 Encrypted", sub: "At rest" },
  { icon: Lock, label: "TLS 1.3", sub: "In transit" },
  { icon: CheckCircle2, label: "Zero Plaintext", sub: "Never raw" },
  { icon: Globe, label: "Rate Limited", sub: "120 req/min" },
];

export const ConnectionModal = ({
  platform,
  isOpen,
  onClose,
  apiKey,
  setApiKey,
  isSaving,
  onSubmit,
  onOAuth,
}: ConnectionModalProps) => {
  const [showKey, setShowKey] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!platform) return null;
  const isOAuth = platform.authType === "oauth2";
  const instructions = getInstructions(platform.id);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-xl bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            style={{
              maxHeight: "calc(100vh - 2rem)",
              boxShadow: `0 20px 40px -10px ${platform.color}15, 0 0 0 1px ${platform.color}10 inset`
            }}
          >
            {/* ── Top accent glow ── */}
            <div
              className="absolute top-0 left-0 w-full h-[2px] rounded-t-3xl overflow-hidden"
            >
              <div 
                className="w-full h-full opacity-80" 
                style={{ background: `linear-gradient(90deg, transparent 0%, ${platform.color} 50%, transparent 100%)` }}
              />
            </div>
            
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 blur-[80px] opacity-20 pointer-events-none"
              style={{ backgroundColor: platform.color }}
            />

            {/* Header */}
            <div className="flex items-start justify-between px-6 sm:px-8 pt-8 pb-6 border-b border-slate-100 dark:border-white/5 relative z-10">
              <div className="flex items-center gap-5">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm flex-shrink-0"
                >
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${platform.domain}&sz=128`}
                    className="w-10 h-10 object-contain"
                    alt={platform.name}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span 
                      className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border"
                      style={{ backgroundColor: `${platform.color}10`, color: platform.color, borderColor: `${platform.color}30` }}
                    >
                      {platform.category}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-500 font-black uppercase tracking-wider flex items-center gap-1">
                      {isOAuth ? <Link2 className="w-3 h-3" /> : <Key className="w-3 h-3" />}
                      {isOAuth ? "OAuth 2.0" : "API Key"}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Connect {platform.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1 max-w-sm">
                    {platform.description}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-white transition-all flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 sm:px-8 py-6 relative z-10 flex-1 overflow-y-auto min-h-0">
              {isOAuth ? (
                /* ─── OAuth Flow ─── */
                <div className="space-y-6">
                  {/* Info card */}
                  <div
                    className="p-4 sm:p-5 rounded-2xl border"
                    style={{ backgroundColor: `${platform.color}05`, borderColor: `${platform.color}20` }}
                  >
                    <div className="flex gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${platform.color}15` }}
                      >
                        <Lock className="w-5 h-5" style={{ color: platform.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-zinc-100 mb-1">
                          Secure OAuth 2.0 Authorization
                        </p>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                          You'll be redirected to <strong className="text-slate-700 dark:text-zinc-200">{platform.name}</strong> to grant access. AnasFlow never sees or stores your login credentials.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Steps */}
                  <div>
                    <h3 className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-[0.25em] mb-4">
                      Authorization Process
                    </h3>
                    <div className="flex flex-col gap-4">
                      {[
                        `Redirect to ${platform.name}'s secure login`,
                        "We request only necessary permissions",
                        "Return automatically — you're connected!",
                      ].map((s, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-white/5">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0 shadow-sm"
                            style={{ backgroundColor: platform.color }}
                          >
                            {i + 1}
                          </div>
                          <p className="text-sm text-slate-700 dark:text-zinc-300 font-medium">{s}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Authorize button */}
                  <button
                    onClick={onOAuth}
                    disabled={isSaving}
                    className="mt-6 w-full flex items-center justify-center gap-3 py-4.5 rounded-2xl font-extrabold text-sm tracking-wide transition-all disabled:opacity-60 hover:opacity-90 active:scale-[0.98] shadow-lg text-black"
                    style={{
                      backgroundColor: platform.color,
                      boxShadow: `0 8px 32px ${platform.color}30`,
                      paddingTop: "1.125rem",
                      paddingBottom: "1.125rem",
                    }}
                  >
                    {isSaving ? (
                      <><RefreshCw className="w-5 h-5 animate-spin" /> Connecting...</>
                    ) : (
                      <><Link2 className="w-5 h-5" /> Authorize with {platform.name} <ArrowRight className="w-5 h-5" /></>
                    )}
                  </button>
                </div>
              ) : (
                /* ─── API Key Flow ─── */
                <form onSubmit={onSubmit} className="space-y-6">
                  {/* Instructions */}
                  <div>
                    <h3 className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-[0.25em] mb-4">
                      How to get your API key
                    </h3>
                    <div className="bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-white/5 rounded-2xl p-4 sm:p-5 space-y-3">
                      {instructions.map((inst, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-slate-200 dark:bg-black border border-slate-300 dark:border-white/10 flex items-center justify-center shrink-0">
                            <span className="text-[9px] font-black text-slate-600 dark:text-zinc-400">{i + 1}</span>
                          </div>
                          {inst.url ? (
                            <a
                              href={inst.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-bold flex items-center gap-1.5 hover:underline decoration-2 underline-offset-2 transition-all mt-0.5"
                              style={{ color: platform.color }}
                            >
                              {inst.step} <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <p className="text-sm text-slate-600 dark:text-zinc-300 mt-0.5">{inst.step}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Input form */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-[0.25em] flex items-center gap-2">
                       <Terminal className="w-3.5 h-3.5" /> Secure API Key
                    </label>
                    <div className="relative group">
                      <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-zinc-500 pointer-events-none group-focus-within:text-[var(--focus-color)] transition-colors" style={{ '--focus-color': platform.color } as React.CSSProperties} />
                      <input
                        type={showKey ? "text" : "password"}
                        placeholder={getPlaceholder(platform.id)}
                        required
                        autoFocus
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        onFocus={(e) => {
                          e.target.style.borderColor = `${platform.color}80`;
                          e.target.style.boxShadow = `0 0 0 4px ${platform.color}15`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "";
                          e.target.style.boxShadow = "";
                        }}
                        className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-12 text-slate-900 dark:text-white text-base focus:outline-none transition-all font-mono tracking-wide placeholder:text-slate-300 dark:placeholder:text-zinc-700"
                        style={{ paddingTop: '1.125rem', paddingBottom: '1.125rem' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowKey(!showKey)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-300 p-1 transition-colors"
                      >
                        {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSaving || !apiKey.trim()}
                    className="w-full flex items-center justify-center gap-3 py-4.5 rounded-2xl font-extrabold text-sm tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98] shadow-xl text-black"
                    style={{
                      backgroundColor: apiKey.trim() ? platform.color : 'hsl(220, 10%, 20%)',
                      color: apiKey.trim() ? '#000' : '#888',
                      boxShadow: apiKey.trim() ? `0 8px 32px ${platform.color}35` : 'none',
                      paddingTop: "1.125rem",
                      paddingBottom: "1.125rem",
                    }}
                  >
                    {isSaving ? (
                      <><RefreshCw className="w-5 h-5 animate-spin text-black/70" /> Encrypting &amp; Connecting...</>
                    ) : (
                      <><Zap className="w-5 h-5" /> Connect {platform.name}</>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Footer / Security Cards */}
            <div className="px-6 sm:px-8 py-5 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-emerald-500" />
                <h4 className="text-[10px] font-black text-slate-500 dark:text-zinc-400 uppercase tracking-[0.25em]">
                  Security Standards
                </h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {securityItems.map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="bg-white dark:bg-black/30 border border-slate-200 dark:border-white/5 rounded-xl p-3 flex flex-col gap-1.5">
                    <Icon className="w-4 h-4 text-emerald-500" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-700 dark:text-zinc-300 leading-tight">{label}</p>
                      <p className="text-[9px] text-slate-500 dark:text-zinc-500">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 dark:text-zinc-600 mt-4 flex items-center gap-1.5 justify-center text-center">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                SOC 2 compliant. Your credentials are never shared with third parties.
              </p>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return require("react-dom").createPortal(modalContent, document.body);
};
