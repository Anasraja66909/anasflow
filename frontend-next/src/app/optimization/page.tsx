"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Zap,
  Server,
  Activity,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import AISuggestions from "@/components/dashboard/AISuggestions";

const ease = [0.23, 1, 0.32, 1] as const;

export default function OptimizationMarketingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#00E5C0]/30">
      {/* Simple Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 group text-zinc-400 hover:text-white transition-colors text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to AnasFlow
          </Link>
          <div className="flex gap-4">
            <Link
              href="/register"
              className="px-5 py-2.5 bg-white text-black font-bold text-sm rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-transform"
            >
              Try It Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden flex flex-col items-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-indigo-600/20 to-[#00E5C0]/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00E5C0]/30 bg-[#00E5C0]/10 text-[#00E5C0] font-bold text-sm uppercase mb-8 tracking-widest">
              <Activity className="w-4 h-4" /> Uncover Hidden Profit
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
              Stop Bleeding API Credits.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-[#00E5C0] to-indigo-400">
                Let AI Optimize Your AI.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              We connect to your platforms, analyze every workflow, and surface
              exact recommendations to save your agency hundreds of dollars in
              automated workflows every single month.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="max-w-3xl mx-auto"
          >
            {/* We reuse the actual dashboard component inside a styled mockup container */}
            <div className="text-left border border-white/10 bg-zinc-950 rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] mx-auto">
              <div className="bg-zinc-900 border-b border-white/5 px-6 py-4 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="p-8 pb-10 pointer-events-none relative">
                <div className="absolute inset-0 bg-transparent z-50"></div>{" "}
                {/* Protect interactions for marketing page */}
                <AISuggestions />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Drilldown */}
      <section className="py-32 bg-[#050505] border-t border-white/5 relative">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-6 shadow-inner">
              <Server className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Deep Token Analysis
            </h3>
            <p className="text-zinc-400 leading-relaxed text-lg">
              It doesn't just read your bills. AnasFlow looks at exact token
              usage on a per-request level to see where you are using
              overpowered models for simple reasoning tasks.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-[#00E5C0]/10 border border-[#00E5C0]/30 flex items-center justify-center mb-6 shadow-inner">
              <Sparkles className="w-8 h-8 text-[#00E5C0]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Model Switching
            </h3>
            <p className="text-zinc-400 leading-relaxed text-lg">
              Automatically identifies workflows that can be downgraded safely
              from Claude 3 Opus to Haiku without ANY loss in output quality,
              netting massive savings.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-6 shadow-inner">
              <Zap className="w-8 h-8 text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Workflow Merging
            </h3>
            <p className="text-zinc-400 leading-relaxed text-lg">
              Connect Make and Zapier to find overlapping webhooks. AnasFlow
              highlights exactly which zaps are redundantly firing so you can
              consolidate them.
            </p>
          </div>
        </div>
      </section>

      {/* Security CTA */}
      <section className="py-32 bg-black border-t border-white/5 text-center px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-3xl p-16 shadow-[0_0_50px_rgba(255,255,255,0.02)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px]" />

          <ShieldCheck className="w-16 h-16 text-indigo-400 mx-auto mb-8" />
          <h2 className="text-4xl font-black text-white mb-6">
            Read-Only Secure Analysis
          </h2>
          <p className="text-xl text-zinc-400 font-medium mb-12 max-w-2xl mx-auto">
            Your integration keys are heavily encrypted. AnasFlow only requests
            read-access to analyze your analytics—we never touch your actual
            data payloads.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/register"
              className="px-10 py-5 bg-white text-black text-lg font-bold rounded-full hover:bg-zinc-200 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Scan My Platforms For Free
            </Link>
            <Link
              href="/#pricing"
              className="px-10 py-5 bg-transparent border border-white/20 text-white text-lg font-bold rounded-full hover:bg-white/5 transition-colors"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
