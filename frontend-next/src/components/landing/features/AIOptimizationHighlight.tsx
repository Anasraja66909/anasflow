"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Activity,
  Zap,
  CheckCircle2,
  Sparkles,
  Terminal,
  ShieldCheck,
  ActivitySquare,
  Cpu,
  Target,
  Search,
  RefreshCw,
  AlertCircle,
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
  hidden: { opacity: 0, scale: 0.98, x: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};

const AIOptimizationHighlight = () => {
  return (
    <section className="py-16 md:py-32 bg-black relative overflow-hidden border-y border-white/5">
      {/* Immersive Background Architecture */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-500/5 blur-[160px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-6 md:px-8 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left: High-Fidelity Neural Diagnostic Handset */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateY: -15, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative mx-auto w-full max-w-[320px] sm:max-w-[420px] lg:max-w-md perspective-[2000px] group/phone"
        >
          {/* External Hardware Aura */}
          <div className="absolute -inset-20 bg-indigo-500/5 blur-[120px] rounded-full group-hover/phone:bg-indigo-500/10 transition-colors duration-1000" />

          {/* Main Handset Body */}
          <div className="relative rounded-[3rem] sm:rounded-[4rem] overflow-hidden border-[8px] sm:border-[12px] border-zinc-900 bg-zinc-950 shadow-[0_80px_150px_rgba(0,0,0,0.8),0_0_100px_rgba(99,102,241,0.1)] flex flex-col h-[600px] sm:h-[750px] transition-transform duration-1000 group-hover/phone:scale-[1.03] group-hover/phone:rotate-y-5">
            {/* Dynamic Sensor Hub */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-6 sm:h-7 bg-zinc-900 rounded-full z-40 flex items-center justify-center p-1 shadow-inner">
              <div className="w-12 sm:w-16 h-1 bg-black rounded-full" />
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-indigo-500/40 rounded-full ml-2 blur-[1px]" />
            </div>

            {/* Neural Scanning Beam */}
            <div
              className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-[#00E5C0]/20 to-transparent opacity-0 group-hover/phone:opacity-100 transition-opacity duration-700 z-30 pointer-events-none"
              style={{
                animation:
                  "scan 4s cubic-bezier(0.5,0,0.5,1) infinite alternate",
              }}
            />
            <style>{`
              @keyframes scan {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(750px); }
              }
            `}</style>

            {/* App Logic Hub Interface */}
            <div className="flex-1 flex flex-col bg-black/90 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.05] pointer-events-none" />

              {/* Internal App Navigation */}
              <div className="bg-zinc-950/80 backdrop-blur-2xl border-b border-white/5 pt-12 sm:pt-16 pb-4 sm:pb-6 px-6 sm:px-8 relative z-20">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 h-4 text-[#00E5C0]" />
                      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-white">
                        Neural Scan Active
                      </span>
                    </div>
                    <p className="text-[8px] sm:text-[9px] text-zinc-700 font-black uppercase tracking-widest">
                      Polling 32 Diagnostic Nodes...
                    </p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#00E5C0]/10 border border-[#00E5C0]/20 flex items-center justify-center animate-pulse">
                    <ActivitySquare className="w-4 h-4 sm:w-5 sm:h-5 text-[#00E5C0]" />
                  </div>
                </div>
              </div>

              {/* App Content Body */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col gap-4 sm:gap-6 relative z-10 text-left overflow-y-auto scrollbar-hide">
                {/* High Confidence Fix Tile */}
                <div className="bg-zinc-950 border border-[#00E5C0]/40 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden group/tile transition-all hover:bg-zinc-900 duration-700">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5C0]/5 blur-[60px] rounded-full pointer-events-none" />
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover/tile:rotate-12 transition-transform duration-700 shadow-inner">
                        <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-white font-black text-base sm:text-lg tracking-tighter uppercase leading-none">
                          Cloud Haiku Match.
                        </h4>
                        <p className="text-[8px] sm:text-[9px] text-[#00E5C0] font-black tracking-[0.4em] uppercase">
                          Optimized Patch
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#00E5C0]/10 border border-[#00E5C0]/20 p-3 sm:p-4 rounded-2xl text-center mb-4 sm:mb-6">
                    <span className="text-[#00E5C0] font-black text-lg sm:text-xl tracking-tighter uppercase">
                      Save $312<span className="text-white/40">/mo</span>
                    </span>
                  </div>
                  <button className="w-full py-4 sm:py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-[#00E5C0] transition-all duration-700 shadow-3xl">
                    Apply Patch
                  </button>
                </div>

                {/* Secondary Analysis Tile */}
                <div className="bg-zinc-950 border border-orange-500/20 rounded-[2rem] p-6 sm:p-8 opacity-40 group-hover/phone:opacity-100 transition-all duration-1000 scale-[0.98] group-hover/phone:scale-100">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center">
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-white font-black text-xs sm:text-sm tracking-widest uppercase">
                        Merge Nodes
                      </h4>
                      <p className="text-[7px] sm:text-[8px] text-zinc-700 font-black tracking-widest uppercase">
                        Medium Confidence
                      </p>
                    </div>
                  </div>
                  <div className="h-1.5 sm:h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-orange-500/40" />
                  </div>
                </div>
              </div>
            </div>

            {/* Hardware Lens Flare & Overlays */}
            <div className="absolute inset-0 rounded-[3rem] sm:rounded-[3.5rem] border border-white/5 pointer-events-none z-50 shadow-inner" />
          </div>
        </motion.div>

        {/* Right: High-Impact Intelligence Copy */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-left space-y-8 md:space-y-12"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center relative group overflow-hidden">
              <div className="absolute inset-0 bg-indigo-500/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
              <Activity className="w-5 h-5 text-indigo-400 relative z-10" />
            </div>
            <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-indigo-400/60">
              Auto-Healing Engine // Signal Restoration
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-7xl xl:text-[90px] font-black tracking-tighter text-white leading-[1] md:leading-[0.85] uppercase break-words"
          >
            Repair Before <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-[#00E5C0] to-indigo-400">
              Impact.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-zinc-600 font-medium leading-relaxed italic max-w-xl"
          >
            Stop losing hours trying to reconstruct why a client's workflow
            evaporated. Our engine monitors your neural integrations 24/7.
          </motion.p>

          <ul className="grid grid-cols-1 gap-4 sm:gap-6 pt-4">
            {[
              "Instantly detect broken platform nodes.",
              "Dispatch immediate 1-click liquid patches.",
              "Eliminate friction via 100% uptime.",
              "Yield recovery of $400+ per client/mo.",
            ].map((feat, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="flex items-center gap-4 sm:gap-6 group cursor-default"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[1rem] bg-zinc-950 border border-white/5 flex items-center justify-center group-hover:border-[#00E5C0]/40 transition-all duration-700 shadow-inner shrink-0">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#00E5C0] transition-transform group-hover:scale-110" />
                </div>
                <span className="text-white text-base sm:text-lg font-black uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-700">
                  {feat}
                </span>
              </motion.li>
            ))}
          </ul>

          <motion.div variants={itemVariants} className="pt-4 md:pt-8">
            <Link
              href="/optimization"
              className="inline-flex items-center justify-center gap-4 sm:gap-6 px-8 sm:px-12 py-5 sm:py-8 bg-zinc-950/40 backdrop-blur-3xl border border-white/5 text-white rounded-[2rem] font-black text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] hover:bg-[#00E5C0] hover:text-black hover:shadow-[#00E5C0]/40 transition-all duration-700 group active:scale-95 shadow-3xl text-center"
            >
              Optimize AI Costs
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-3" />
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default AIOptimizationHighlight;
