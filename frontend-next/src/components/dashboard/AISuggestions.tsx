"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  AlertCircle,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  Bot,
  BrainCircuit,
} from "lucide-react";

interface Suggestion {
  id: string;
  platform: string;
  type: string;
  title: string;
  estimatedTimeSavedMinutes: number;
  reason: string;
  recommendedAction: string;
  severity: string;
  fixActionLabel: string;
}

interface AIResponse {
  totalDebuggingHoursSaved: number;
  summaryInsight: string;
  suggestions: Suggestion[];
}

const customEase = [0.23, 1, 0.32, 1] as const;

export default function AISuggestions() {
  const [data, setData] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/optimizations/");
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error("Failed to fetch AI suggestions:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="bg-zinc-950/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-12 shadow-2xl flex-1 flex items-center justify-center min-h-[450px]">
        <div className="text-center space-y-6">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full border-t-4 border-[#00E5C0] animate-spin shadow-[0_0_20px_rgba(0,229,192,0.3)]"></div>
            <div
              className="absolute inset-4 rounded-full border-r-4 border-indigo-500 animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            ></div>
            <BrainCircuit className="absolute inset-0 m-auto w-8 h-8 text-white animate-pulse" />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-[#00E5C0] animate-pulse">
              Neural Sync
            </p>
            <p className="text-[11px] font-medium text-zinc-500 max-w-[200px] mx-auto leading-relaxed">
              Analyzing multi-platform usage patterns for optimization
              vectors...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-zinc-950/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] h-full shadow-2xl flex flex-col relative overflow-hidden group/container">
      {/* Immersive background glow representing active AI intelligence */}
      <div className="absolute -top-64 -left-64 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none transition-opacity duration-1000 group-hover/container:opacity-20 animate-pulse"></div>

      <div className="p-10 pb-8 border-b border-white/5 relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-1 bg-indigo-500 rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400">
                Security & Scale
              </span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
              Auto-Healing Engine.
            </h2>
          </div>
          <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full flex items-center gap-3 shadow-[0_0_20px_rgba(239,68,68,0.1)] group/impact animate-bounce">
            <TrendingDown className="w-4 h-4 text-red-500" />
            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">
              {data.totalDebuggingHoursSaved} Hours Optimized
            </span>
          </div>
        </div>
        <p className="text-[11px] text-zinc-500 font-medium leading-relaxed max-w-2xl">
          {data.summaryInsight}
        </p>
      </div>

      <div className="p-10 flex-1 flex flex-col gap-5 relative z-10 overflow-y-auto custom-scrollbar">
        {data.suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            onClick={() => toggleExpand(suggestion.id)}
            className={`
              relative rounded-[2rem] border transition-all duration-700 cursor-pointer overflow-hidden group/item
              ${
                expandedId === suggestion.id
                  ? "bg-zinc-900/60 border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.6)] scale-[1.02]"
                  : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
              }
            `}
          >
            {/* Hover Glow Accent */}
            <div
              className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-0 group-hover/item:opacity-20 transition-opacity duration-700 pointer-events-none rounded-full ${suggestion.platform.toLowerCase() === "claude" ? "bg-indigo-500" : "bg-orange-500"}`}
            />

            <div className="p-8">
              <div className="flex gap-6 items-start">
                {/* Platform Identity Container */}
                <div
                  className={`mt-1 p-3 rounded-2xl border flex-shrink-0 transition-all duration-500 group-hover/item:scale-110 group-hover/item:rotate-6
                  ${
                    suggestion.platform.toLowerCase() === "claude"
                      ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                      : suggestion.platform.toLowerCase() === "n8n"
                        ? "bg-orange-500/10 border-orange-500/20 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.1)]"
                        : "bg-white/5 border-white/5 text-white"
                  }`}
                >
                  <Bot className="w-5 h-5" />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-sm font-black text-white tracking-widest uppercase leading-snug">
                      {suggestion.title}
                    </h3>
                    <div className="flex items-center text-[#00E5C0] gap-2 flex-shrink-0 bg-[#00E5C0]/10 px-3 py-1.5 rounded-full text-[9px] font-black tracking-[0.2em] border border-[#00E5C0]/20">
                      <Zap className="w-3 h-3 animate-pulse" />+
                      {suggestion.estimatedTimeSavedMinutes}m
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">
                    <span className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${suggestion.severity === "Critical" ? "bg-red-500 shadow-[0_0_10px_#ef4444]" : suggestion.severity === "Warning" ? "bg-orange-400" : "bg-blue-400"}`}
                      />
                      {suggestion.severity} Protocol
                    </span>
                    <span className="text-zinc-800">/</span>
                    <span>Direct API Integration</span>
                  </div>
                </div>

                <div className="mt-2 ml-2 text-zinc-700 group-hover/item:text-white transition-colors">
                  {expandedId === suggestion.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>

              {/* Expandable Technical Intelligence */}
              <AnimatePresence>
                {expandedId === suggestion.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: customEase }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 mt-4 border-t border-white/5 flex flex-col gap-5">
                      <div className="bg-white/[0.01] p-6 rounded-2xl border border-white/5 space-y-3">
                        <h4 className="text-[9px] text-zinc-600 uppercase font-black tracking-[0.3em] flex items-center gap-2">
                          <AlertCircle className="w-3.5 h-3.5" /> Anomaly
                          Detection
                        </h4>
                        <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                          {suggestion.reason}
                        </p>
                      </div>
                      <div className="bg-indigo-500/[0.03] p-6 rounded-2xl border border-indigo-500/10 space-y-3">
                        <h4 className="text-[9px] text-indigo-400 uppercase font-black tracking-[0.3em] flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5" /> Optimized
                          Resolution
                        </h4>
                        <p className="text-xs text-indigo-100/80 font-medium leading-relaxed">
                          {suggestion.recommendedAction}
                        </p>
                      </div>

                      <button className="mt-2 w-full bg-white text-black py-5 rounded-2xl text-[10px] uppercase font-black tracking-[0.3em] shadow-2xl hover:bg-[#00E5C0] hover:shadow-[#00E5C0]/40 transition-all duration-500 active:scale-[0.98] flex items-center justify-center gap-3 group/fix">
                        <Zap className="w-4 h-4 transition-transform group-hover/fix:scale-125" />
                        {suggestion.fixActionLabel} Core
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
