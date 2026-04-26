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
      <div className="bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-white/10 rounded-2xl p-12 shadow-sm flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
          <BrainCircuit className="absolute inset-0 m-auto w-6 h-6 text-indigo-500 animate-pulse" />
        </div>
        <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
          Smart Sync active
        </p>
        <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-[200px] text-center">
          Analyzing multi-platform usage patterns for optimization...
        </p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm flex flex-col h-full overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-transparent">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 mb-3">
              <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Security & Scale
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              AI Auto-Fix Engine
            </h2>
          </div>
          <div className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-lg flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {data.totalDebuggingHoursSaved}h Saved
            </span>
          </div>
        </div>
        <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed max-w-lg">
          {data.summaryInsight}
        </p>
      </div>

      <div className="p-6 md:p-8 flex-1 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
        {data.suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            onClick={() => toggleExpand(suggestion.id)}
            className={`rounded-xl border transition-all cursor-pointer overflow-hidden ${
              expandedId === suggestion.id
                ? "bg-slate-50 dark:bg-white/[0.02] border-indigo-500/30 shadow-md"
                : "bg-white dark:bg-[#0c0f17] border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/[0.02]"
            }`}
          >
            <div className="p-5">
              <div className="flex gap-4 items-start">
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    suggestion.platform.toLowerCase() === "claude"
                      ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                      : suggestion.platform.toLowerCase() === "n8n"
                      ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400"
                      : "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white"
                  }`}
                >
                  <Bot className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {suggestion.title}
                    </h3>
                    <div className="flex items-center text-emerald-600 dark:text-emerald-400 gap-1 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded text-xs font-bold border border-emerald-100 dark:border-emerald-500/20 shrink-0">
                      <Zap className="w-3 h-3" />+{suggestion.estimatedTimeSavedMinutes}m
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          suggestion.severity === "Critical"
                            ? "bg-red-500"
                            : suggestion.severity === "Warning"
                            ? "bg-amber-500"
                            : "bg-blue-500"
                        }`}
                      />
                      {suggestion.severity}
                    </span>
                    <span>&bull;</span>
                    <span className="truncate">Active API Integration</span>
                  </div>
                </div>

                <div className="text-slate-400 dark:text-zinc-500 pt-1">
                  {expandedId === suggestion.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>

              <AnimatePresence>
                {expandedId === suggestion.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: customEase }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/10 space-y-4">
                      
                      <div className="bg-slate-50 dark:bg-black/20 p-4 rounded-lg border border-slate-100 dark:border-white/5 space-y-2">
                        <h4 className="text-xs text-slate-700 dark:text-zinc-300 font-bold flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-slate-400" /> Issue Detected
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                          {suggestion.reason}
                        </p>
                      </div>

                      <div className="bg-indigo-50 dark:bg-indigo-500/10 p-4 rounded-lg border border-indigo-100 dark:border-indigo-500/20 space-y-2">
                        <h4 className="text-xs text-indigo-700 dark:text-indigo-300 font-bold flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-indigo-500" /> Resolution
                        </h4>
                        <p className="text-sm text-indigo-600 dark:text-indigo-200/80 leading-relaxed">
                          {suggestion.recommendedAction}
                        </p>
                      </div>

                      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2">
                        <Zap className="w-4 h-4" />
                        {suggestion.fixActionLabel}
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
