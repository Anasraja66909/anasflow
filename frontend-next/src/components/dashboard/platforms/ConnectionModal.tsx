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
  Link as LinkIcon,
  Info,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  Shield,
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

const SecurityBadge = ({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) => (
  <div className="flex items-center gap-2">
    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
      <Icon className="w-3 h-3 text-emerald-400" />
    </div>
    <div>
      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-600">{label}</p>
      <p className="text-[10px] font-bold text-slate-700 dark:text-zinc-300">{value}</p>
    </div>
  </div>
);

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
  const [showKey, setShowKey] = useState(false);

  if (!platform) return null;

  const isOAuth = platform.authType === "oauth2";

  const getPlaceholder = (id: string) => {
    const hints: Record<string, string> = {
      openai: "sk-proj-••••••••••••••••••••••••",
      claude: "sk-ant-api03-••••••••••••••••",
      elevenlabs: "••••••••••••••••••••••••••••••••",
      mistral: "••••••••••••••••••••••••••••••••",
      gemini: "AIza••••••••••••••••••••••••••••",
      heygen: "••••••••••••••••••••••••••••••••",
      manychat: "••••••••••••••••••••••••••••••••",
      n8n: "n8n_api_••••••••••••••••••••••••",
      make: "••••••••-••••-••••-••••-••••••••••••",
      perplexity: "pplx-••••••••••••••••••••••••••••",
      cohere: "••••••••••••••••••••••••••••••••",
      instantly: "••••••••-••••-••••-••••-••••••••••••",
      retell: "key_••••••••••••••••••••••••••••",
      waalaxy: "••••••••••••••••••••••••••••••••",
      aws_bedrock: "AKIA••••••••••••••••",
      azure_openai: "••••••••••••••••••••••••••••••••",
      gcp_vertex: "ya29.••••••••••••••••••••••••••",
      runway: "key_••••••••••••••••••••••••••••",
      pipedream: "••••••••••••••••••••••••••••••••",
      activepieces: "••••••••••••••••••••••••••••••••",
    };
    return hints[id] ?? "Paste your API key here...";
  };

  const getInstructions = (id: string): { step: string; url?: string }[] => {
    const docs: Record<string, { step: string; url?: string }[]> = {
      openai: [
        { step: "Go to platform.openai.com", url: "https://platform.openai.com/api-keys" },
        { step: "Click \"Create new secret key\"" },
        { step: "Copy and paste the key below" },
      ],
      claude: [
        { step: "Go to console.anthropic.com", url: "https://console.anthropic.com/settings/keys" },
        { step: "Navigate to API Keys section" },
        { step: "Create and copy your API key" },
      ],
      elevenlabs: [
        { step: "Go to elevenlabs.io and sign in", url: "https://elevenlabs.io" },
        { step: "Click your profile → API Keys" },
        { step: "Generate and copy the key" },
      ],
      heygen: [
        { step: "Sign in at app.heygen.com", url: "https://app.heygen.com" },
        { step: "Go to Settings → API" },
        { step: "Generate and copy your API token" },
      ],
      manychat: [
        { step: "Log in at manychat.com", url: "https://manychat.com" },
        { step: "Settings → API → Request API Access" },
        { step: "Copy the generated token" },
      ],
    };

    return docs[id] ?? [
      { step: `Log in to your ${id.replace("_", " ")} account` },
      { step: "Navigate to Settings → API or Integrations" },
      { step: "Generate an API key and paste it below" },
    ];
  };

  const instructions = getInstructions(platform.id);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-lg bg-white dark:bg-[hsl(224,45%,6%)] border border-slate-200 dark:border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Decorative top glow */}
            <div
              className="absolute top-0 left-0 right-0 h-1 opacity-60"
              style={{
                background: `linear-gradient(90deg, transparent, ${platform.color}, transparent)`,
              }}
            />

            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl p-2.5 shadow-md border border-slate-100 flex items-center justify-center">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${platform.domain}&sz=128`}
                    className="w-full h-full object-contain"
                    alt={platform.name}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                    Connect <span style={{ color: platform.color }}>{platform.name}</span>
                  </h2>
                  <p className="text-[9px] font-black text-slate-500 dark:text-zinc-500 uppercase tracking-widest mt-0.5">
                    {isOAuth ? "OAuth 2.0 Secure Flow" : "API Key Authentication"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors text-slate-400 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              {isOAuth ? (
                /* ─── OAuth Flow ─── */
                <div className="space-y-6">
                  {/* Info card */}
                  <div className="p-5 bg-indigo-50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/15 rounded-2xl">
                    <div className="flex gap-3">
                      <div className="w-9 h-9 bg-indigo-100 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center shrink-0">
                        <Lock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="pt-0.5">
                        <p className="text-sm font-bold text-slate-800 dark:text-zinc-200 mb-1">
                          Secure OAuth 2.0 Authorization
                        </p>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                          You'll be redirected to <strong className="text-slate-700 dark:text-zinc-200">{platform.name}</strong> to
                          grant access. AnasFlow never stores your login credentials.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="space-y-2">
                    {["Redirect to secure provider login", "Grant requested permissions only", "Return automatically to AnasFlow"].map((s, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                          <span className="text-[9px] font-black text-slate-500 dark:text-zinc-500">{i + 1}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium">{s}</p>
                      </div>
                    ))}
                  </div>

                  {/* Authorize button */}
                  <button
                    onClick={onOAuth}
                    disabled={isSaving}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-2xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] disabled:opacity-60"
                  >
                    {isSaving ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <LinkIcon className="w-4 h-4" />
                    )}
                    {isSaving ? "Connecting..." : "Authorize with " + platform.name}
                  </button>
                </div>
              ) : (
                /* ─── API Key Flow ─── */
                <form onSubmit={onSubmit} className="space-y-6">
                  {/* Instructions */}
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-slate-400 dark:text-zinc-600 uppercase tracking-[0.3em] ml-1">
                      How to get your API key
                    </p>
                    <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-2xl p-4 space-y-2.5">
                      {instructions.map((inst, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center shrink-0">
                            <span className="text-[8px] font-black text-slate-500 dark:text-zinc-400">{i + 1}</span>
                          </div>
                          {inst.url ? (
                            <a
                              href={inst.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline leading-relaxed"
                            >
                              {inst.step} ↗
                            </a>
                          ) : (
                            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">{inst.step}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key input */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-[0.3em] ml-1">
                      Your API Key
                    </label>
                    <div className="relative group">
                      <Key className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-600 group-focus-within:text-[#00E5C0] transition-colors" />
                      <input
                        type={showKey ? "text" : "password"}
                        placeholder={getPlaceholder(platform.id)}
                        required
                        autoFocus
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl py-4.5 pl-12 pr-12 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00E5C0]/50 focus:ring-4 focus:ring-[#00E5C0]/5 transition-all font-mono tracking-wider placeholder:text-slate-300 dark:placeholder:text-zinc-800"
                        style={{ paddingTop: "1.125rem", paddingBottom: "1.125rem" }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowKey(!showKey)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-600 hover:text-slate-700 dark:hover:text-zinc-300 transition-colors"
                      >
                        {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[9px] text-slate-400 dark:text-zinc-700 font-medium ml-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      Encrypted with AES-256 before storage. Never logged or exposed.
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSaving || !apiKey.trim()}
                    className="w-full font-black py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: apiKey.trim() ? `${platform.color}` : undefined,
                      backgroundColor: !apiKey.trim() ? "#1a1a2e" : undefined,
                      color: apiKey.trim() ? "#000" : "#666",
                      boxShadow: apiKey.trim() ? `0 8px 30px ${platform.color}33` : undefined,
                    }}
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Verifying & Encrypting...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Connect {platform.name}
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Security Footer Panel */}
              <div className="border-t border-slate-100 dark:border-white/5 pt-5">
                <p className="text-[8px] font-black text-slate-400 dark:text-zinc-600 uppercase tracking-[0.3em] mb-3 flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-emerald-500" />
                  Security Standards
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <SecurityBadge icon={ShieldCheck} label="Encryption at Rest" value="AES-256 Fernet" />
                  <SecurityBadge icon={Lock} label="Transport Security" value="TLS 1.3 Enforced" />
                  <SecurityBadge icon={CheckCircle2} label="Credential Storage" value="Zero Plaintext Policy" />
                  <SecurityBadge icon={AlertTriangle} label="Rate Limiting" value="120 req/min" />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-4 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/10 flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-700 flex-shrink-0" />
              <p className="text-[9px] text-slate-400 dark:text-zinc-600 font-medium">
                AnasFlow uses enterprise-grade security. Your API keys are encrypted and never shared with third parties.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
