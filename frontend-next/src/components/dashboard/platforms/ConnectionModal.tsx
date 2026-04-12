"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Key, ShieldCheck, Zap, RefreshCw, Lock, Link as LinkIcon, Info } from "lucide-react";

interface ConnectionModalProps {
  platform: any;
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  setApiKey: (val: string) => void;
  isSaving: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onOAuth: () => void;
}

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
  if (!platform) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-[hsl(224,45%,6%)] border border-slate-200 dark:border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl p-2.5 shadow-md dark:shadow-lg border border-slate-100">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${platform.domain}&sz=128`}
                    className="w-full h-full object-contain"
                    alt=""
                  />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                    New <span className="text-[#00E5C0]">Integration</span>
                  </h2>
                  <p className="text-[9px] font-black text-slate-500 dark:text-zinc-500 uppercase tracking-widest mt-0.5">
                    Service: {platform.name}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors text-slate-400 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {platform.authType === "oauth2" ? (
                <div className="space-y-8">
                  <div className="p-6 bg-indigo-50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10 rounded-2xl">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center shrink-0">
                        <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="pt-1">
                        <p className="text-sm text-slate-600 dark:text-zinc-300 font-medium leading-relaxed">
                          This platform requires <span className="text-slate-900 dark:text-white font-bold">OAuth 2.0</span> security. 
                          You will be redirected to grant secure permission.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onOAuth}
                    disabled={isSaving}
                    className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em]"
                  >
                    {isSaving ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <LinkIcon className="w-4 h-4" />
                    )}
                    Authorize Securely
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-[0.3em] ml-2">
                      Authentication Signal (API Key)
                    </label>
                    <div className="relative group">
                      <Key className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#00E5C0] transition-colors" />
                      <input
                        type="password"
                        placeholder="sk-••••••••••••"
                        required
                        autoFocus
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl py-5 pl-14 pr-6 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00E5C0]/40 focus:ring-4 focus:ring-[#00E5C0]/5 transition-all font-mono tracking-widest placeholder:text-slate-200 dark:placeholder:text-zinc-800"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button
                      type="submit"
                      disabled={isSaving || !apiKey}
                      className="w-full bg-[#00E5C0] text-black font-black py-5 rounded-2xl hover:bg-[#00ffd6] shadow-xl shadow-[#00E5C0]/20 transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] disabled:opacity-50"
                    >
                      {isSaving ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <Zap className="w-4 h-4" />
                      )}
                      Synchronize Platform
                    </button>
                    <p className="text-center text-[10px] text-slate-500 dark:text-zinc-600 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5" /> AES-256 Neural Encryption Enabled
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Footer */}
            <div className="px-8 py-5 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-black/20 flex items-center gap-3">
              <Info className="w-4 h-4 text-slate-400 dark:text-zinc-700" />
              <p className="text-[9px] text-slate-400 dark:text-zinc-600 font-black uppercase tracking-widest">
                Protocol: Secure handshake via TLS 1.3
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
