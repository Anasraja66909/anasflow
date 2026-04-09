"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  DollarSign,
  Zap,
  Link as LinkIcon,
  Fingerprint,
  Server,
  Activity,
  Sparkles,
  Terminal,
  ShieldCheck,
  ActivitySquare,
  Cpu,
  Globe,
} from "lucide-react";

// Senior Dev Standard: Unified motion tokens
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

const Features = () => {
  return (
    <section
      id="features"
      className="py-32 bg-black relative overflow-hidden border-y border-white/5"
    >
      {/* Immersive Background Architecture */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-indigo-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
        {/* Aggressive Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-24 space-y-8"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-4 mx-auto"
          >
            <div className="w-10 h-10 bg-[#00E5C0]/10 border border-[#00E5C0]/20 rounded-xl flex items-center justify-center relative group overflow-hidden">
              <div className="absolute inset-0 bg-[#00E5C0]/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
              <Cpu className="w-5 h-5 text-[#00E5C0] relative z-10" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#00E5C0]">
              Engineered For Dominance // Tier-1
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-7xl lg:text-[110px] font-black tracking-tighter text-white leading-[0.85] uppercase"
          >
            Neural Feature <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">
              Architecture.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto font-medium leading-relaxed italic"
          >
            Built from the ground up to give AI agencies the unfair advantage
            they need to hyper-scale profitability through precise telemetry.
          </motion.p>
        </motion.div>

        {/* High-Fidelity Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[320px]"
        >
          {/* Tile 1: Unified Spend (Span 8) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-8 bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[4rem] p-16 shadow-3xl relative overflow-hidden group/tile flex flex-col md:flex-row items-center gap-12"
          >
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#00E5C0]/5 blur-[120px] rounded-full pointer-events-none group-hover/tile:bg-[#00E5C0]/10 transition-colors" />
            <div className="relative z-10 flex-1 space-y-8 text-left">
              <div className="w-16 h-16 rounded-[1.5rem] bg-[#00E5C0]/10 border border-[#00E5C0]/20 flex items-center justify-center shadow-inner group-hover/tile:scale-110 transition-transform duration-700">
                <PieChart className="w-8 h-8 text-[#00E5C0]" />
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
                  Unified Spend Hub.
                </h3>
                <p className="text-zinc-600 text-lg font-medium italic leading-relaxed max-w-md">
                  Aggregate usage metrics and calculate exact per-client profit
                  margins in absolute real-time across every node.
                </p>
              </div>
            </div>
            <div className="relative z-10 w-full md:w-1/3 h-full flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border-8 border-white/5 border-t-[#00E5C0] animate-spin shadow-[0_0_50px_rgba(0,229,192,0.2)]" />
              <div className="absolute inset-0 m-auto flex items-center justify-center">
                <Activity className="w-10 h-10 text-white animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Tile 2: 1-Click ROI (Span 4) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[4rem] p-12 shadow-3xl relative overflow-hidden group/tile flex flex-col justify-center items-start gap-8"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none group-hover/tile:bg-indigo-500/10 transition-colors" />
            <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-inner group-hover/tile:rotate-12 transition-transform duration-700">
              <DollarSign className="w-8 h-8 text-indigo-400" />
            </div>
            <div className="space-y-4 text-left">
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">
                1-Click ROI PDF.
              </h3>
              <p className="text-zinc-600 text-lg font-medium italic leading-relaxed">
                Package automation numbers into beautiful corporate whitepapers.
              </p>
            </div>
          </motion.div>

          {/* Tile 3: AI Optimizer (Span 4) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[4rem] p-12 shadow-3xl relative overflow-hidden group/tile flex flex-col justify-center items-start gap-8"
          >
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none group-hover/tile:bg-orange-500/10 transition-colors" />
            <div className="w-16 h-16 rounded-[1.5rem] bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shadow-inner group-hover/tile:scale-110 transition-transform duration-700">
              <Zap className="w-8 h-8 text-orange-400" />
            </div>
            <div className="space-y-4 text-left">
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">
                Neural Optimizer.
              </h3>
              <p className="text-zinc-600 text-lg font-medium italic leading-relaxed">
                AI engines dynamically suggest cheaper API alternatives to cut
                spend.
              </p>
            </div>
          </motion.div>

          {/* Tile 4: Connectors (Span 8) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-8 bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[4rem] p-16 shadow-3xl relative overflow-hidden group/tile flex flex-col md:flex-row items-center justify-between gap-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] to-transparent pointer-events-none" />
            <div className="relative z-10 flex-1 space-y-8 text-left">
              <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center shadow-inner group-hover/tile:rotate-[-10deg] transition-transform duration-700">
                <LinkIcon className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
                  Universal Connectors.
                </h3>
                <p className="text-zinc-600 text-lg font-medium italic leading-relaxed max-w-md">
                  Seamless integrations with Claude, OpenAI, n8n, Zapier, and
                  native GHL webhooks pulse nodes.
                </p>
              </div>
            </div>
            <div className="relative z-10 flex items-center gap-6 group-hover/tile:scale-110 transition-transform duration-1000">
              <div className="w-20 h-20 rounded-full border border-white/5 bg-black flex items-center justify-center shadow-2xl">
                <Fingerprint className="w-8 h-8 text-indigo-400" />
              </div>
              <div className="w-10 h-1 bg-white/10 rounded-full" />
              <div className="w-28 h-28 rounded-full border border-[#00E5C0]/20 bg-black flex items-center justify-center shadow-[0_0_40px_rgba(0,229,192,0.2)] animate-pulse">
                <Globe className="w-10 h-10 text-[#00E5C0]" />
              </div>
              <div className="w-10 h-1 bg-white/10 rounded-full" />
              <div className="w-20 h-20 rounded-full border border-white/5 bg-black flex items-center justify-center shadow-2xl">
                <Server className="w-8 h-8 text-orange-400" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
