"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, ArrowRight, ExternalLink } from "lucide-react";

interface PlatformCardProps {
  platform: {
    id: string;
    name: string;
    category: string;
    description: string;
    domain: string;
    color: string;
  };
  isConnected: boolean;
  onConnect: (platform: any) => void;
}

export const PlatformCard = ({ platform, isConnected, onConnect }: PlatformCardProps) => {
  return (
    <motion.div
      layout
      className={`group relative overflow-hidden bg-white/80 dark:bg-zinc-950/40 backdrop-blur-3xl border transition-all duration-500 p-6 md:p-8 rounded-[2.5rem] ${
        isConnected ? "border-[#00E5C0]/40 ring-1 ring-[#00E5C0]/10" : "border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20"
      }`}
    >
      {/* Background Glow */}
      <div
        className="absolute -top-16 -right-16 w-48 h-48 blur-[80px] rounded-full transition-opacity duration-700 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20"
        style={{ backgroundColor: platform.color }}
      />

      <div className="flex justify-between items-start mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white rounded-2xl p-3 flex items-center justify-center shadow-md dark:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border border-slate-100">
            <img
              src={`https://www.google.com/s2/favicons?domain=${platform.domain}&sz=128`}
              className="w-full h-full object-contain"
              alt={platform.name}
              onError={(e) => {
                e.currentTarget.src = "/logo.png";
              }}
            />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-xl tracking-tight leading-none mb-1.5 group-hover:text-[#00E5C0] transition-colors">
              {platform.name}
            </h3>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-500 px-2 py-0.5 bg-slate-50 dark:bg-white/5 rounded-md border border-slate-100 dark:border-white/5">
              {platform.category}
            </span>
          </div>
        </div>

        {isConnected ? (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#00E5C0]/10 border border-[#00E5C0]/20 text-[#00E5C0] text-[9px] font-black uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(0,229,192,0.1)]">
            <div className="w-1 h-1 bg-[#00E5C0] rounded-full animate-pulse" />
            Active
          </div>
        ) : (
          <div className="px-3 py-1 bg-slate-100 dark:bg-zinc-900/50 text-slate-400 dark:text-zinc-600 border border-slate-200 dark:border-white/5 text-[9px] font-black uppercase tracking-wider rounded-full">
            Disconnected
          </div>
        )}
      </div>

      <div className="relative z-10 mb-8">
        <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {platform.description}
        </p>
      </div>

      <div className="relative z-10 pt-2">
        <button
          onClick={() => onConnect(platform)}
          disabled={isConnected}
          className={`w-full py-4 rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-2.5 group/btn ${
            isConnected
              ? "bg-slate-100 dark:bg-zinc-900/40 text-slate-400 dark:text-zinc-700 border border-slate-200 dark:border-white/5 cursor-not-allowed"
              : "bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-[#00E5C0] dark:hover:bg-[#00E5C0] hover:scale-[1.02] shadow-lg hover:shadow-[#00E5C0]/20"
          }`}
        >
          {isConnected ? (
            <>
              <ShieldCheck className="w-3.5 h-3.5" />
              Secure Link
            </>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5" />
              Connect Platform
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/btn:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};
