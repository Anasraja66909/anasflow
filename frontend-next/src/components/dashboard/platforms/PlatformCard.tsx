"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, ArrowRight, Unplug, RefreshCw } from "lucide-react";

interface PlatformCardProps {
  platform: {
    id: string;
    name: string;
    category: string;
    description: string;
    domain: string;
    color: string;
    authType: string;
  };
  isConnected: boolean;
  isDisconnecting?: boolean;
  onConnect: (platform: any) => void;
  onDisconnect?: (platform: any) => void;
}

export const PlatformCard = ({
  platform,
  isConnected,
  isDisconnecting,
  onConnect,
  onDisconnect,
}: PlatformCardProps) => {
  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`group relative overflow-hidden backdrop-blur-3xl border transition-all duration-500 p-6 md:p-7 rounded-[2.5rem] ${
        isConnected
          ? "bg-white dark:bg-zinc-950/60 border-[#00E5C0]/30 ring-1 ring-[#00E5C0]/10 shadow-lg shadow-[#00E5C0]/5"
          : "bg-white/80 dark:bg-zinc-950/40 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15"
      }`}
    >
      {/* Background Glow */}
      <div
        className="absolute -top-16 -right-16 w-44 h-44 blur-[80px] rounded-full transition-opacity duration-700 opacity-0 group-hover:opacity-15 dark:group-hover:opacity-25"
        style={{ backgroundColor: platform.color }}
      />

      {/* Connected shimmer line */}
      {isConnected && (
        <div
          className="absolute top-0 left-8 right-8 h-[1px] opacity-60"
          style={{
            background: `linear-gradient(90deg, transparent, ${platform.color}, transparent)`,
          }}
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div
            className={`w-13 h-13 bg-white rounded-2xl p-2.5 flex items-center justify-center shadow-md border transition-all duration-500 ${
              isConnected
                ? "border-slate-200 scale-105"
                : "border-slate-100 group-hover:scale-110 group-hover:rotate-3"
            }`}
            style={{ width: "52px", height: "52px" }}
          >
            <img
              src={`https://www.google.com/s2/favicons?domain=${platform.domain}&sz=128`}
              className="w-full h-full object-contain"
              alt={platform.name}
              onError={(e) => {
                e.currentTarget.src = "/logo.png";
              }}
            />
          </div>

          {/* Name & Category */}
          <div>
            <h3
              className={`font-bold text-lg tracking-tight leading-none mb-1.5 transition-colors ${
                isConnected
                  ? "text-[#00E5C0]"
                  : "text-slate-900 dark:text-white group-hover:text-[#00E5C0]"
              }`}
            >
              {platform.name}
            </h3>
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-500 px-2 py-0.5 bg-slate-50 dark:bg-white/5 rounded-md border border-slate-100 dark:border-white/5">
                {platform.category}
              </span>
              <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-600 px-1.5 py-0.5 rounded-md bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                {platform.authType === "oauth2" ? "OAuth2" : "API Key"}
              </span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        {isConnected ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#00E5C0]/10 border border-[#00E5C0]/25 text-[#00E5C0] text-[8px] font-black uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(0,229,192,0.08)] flex-shrink-0">
            <div className="w-1.5 h-1.5 bg-[#00E5C0] rounded-full animate-pulse" />
            Active
          </div>
        ) : (
          <div className="px-2.5 py-1.5 bg-slate-100 dark:bg-zinc-900/50 text-slate-400 dark:text-zinc-600 border border-slate-200 dark:border-white/5 text-[8px] font-black uppercase tracking-wider rounded-full flex-shrink-0">
            Offline
          </div>
        )}
      </div>

      {/* Description */}
      <div className="relative z-10 mb-6">
        <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {platform.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 space-y-2">
        {isConnected ? (
          <>
            {/* Connected state — show connected + disconnect */}
            <button
              disabled
              className="w-full py-3.5 rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 bg-[#00E5C0]/10 border border-[#00E5C0]/20 text-[#00E5C0] cursor-default"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Securely Connected
            </button>
            <button
              onClick={() => onDisconnect?.(platform)}
              disabled={isDisconnecting}
              className="w-full py-2.5 rounded-2xl font-black text-[8px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 text-slate-400 dark:text-zinc-600 hover:text-red-400 dark:hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/15 transition-all duration-300"
            >
              {isDisconnecting ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  Disconnecting...
                </>
              ) : (
                <>
                  <Unplug className="w-3 h-3" />
                  Disconnect
                </>
              )}
            </button>
          </>
        ) : (
          <button
            onClick={() => onConnect(platform)}
            className="w-full py-4 rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2.5 group/btn bg-slate-900 dark:bg-white text-white dark:text-black hover:scale-[1.02] shadow-lg"
            style={{
              ["--hover-bg" as string]: platform.color,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = platform.color;
              e.currentTarget.style.color = "#000";
              e.currentTarget.style.boxShadow = `0 8px 30px ${platform.color}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "";
              e.currentTarget.style.color = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <Zap className="w-3.5 h-3.5" />
            Connect Platform
            <ArrowRight className="w-3.5 h-3.5 ml-0.5 transition-transform group-hover/btn:translate-x-1" />
          </button>
        )}
      </div>
    </motion.div>
  );
};
