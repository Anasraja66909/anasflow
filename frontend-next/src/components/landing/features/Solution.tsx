"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Zap,
  Target,
  Activity,
  Sparkles,
  X,
  DollarSign,
  Terminal,
  ShieldCheck,
  ActivitySquare,
  CheckCircle2,
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

const Solution = () => {
  return (
    <section className="py-16 md:py-32 bg-black relative overflow-hidden">
      {/* Immersive Background Architecture */}
      <div className="absolute top-0 right-0 w-[800px] h-[400px] bg-indigo-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-8 grid lg:grid-cols-2 gap-24 items-center">
        {/* Left: High-Fidelity Diagnostic Visualization */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotateY: 20 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative group perspective-[2000px]"
        >
          <div className="absolute -inset-10 bg-indigo-500/5 blur-[100px] rounded-full group-hover:bg-indigo-500/10 transition-colors duration-1000" />

          <div className="relative bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[4rem] overflow-hidden shadow-[0_80px_200px_rgba(0,0,0,0.8)] h-[600px] flex flex-col group/mockup">
            {/* Header */}
            <div className="bg-black/60 px-12 py-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <ActivitySquare className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">
                  Real-Time Updates
                </span>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-[#00E5C0]" />
              </div>
            </div>

            <div className="flex-1 flex divide-x divide-white/5 relative">
              {/* Visual Grid Overlays */}
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none" />

              {/* Left Side: Neural Chaos */}
              <div className="flex-1 p-6 md:p-12 flex flex-col gap-6 relative justify-center bg-red-500/[0.01]">
                <p className="text-[9px] font-black text-red-500/40 uppercase tracking-[0.4em] mb-4 text-center">
                  Unfiltered Chaos
                </p>
                {[
                  "Api Limits Dissolving",
                  "Shadow Spend Spiking",
                  "Reporting Pulse: Zero",
                ].map((text, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 text-red-500/60 bg-red-500/5 p-6 rounded-[2rem] border border-red-500/10 relative z-10 text-xs font-black uppercase tracking-widest italic group-hover/mockup:-translate-x-2 transition-transform duration-700"
                  >
                    <X className="w-4 h-4 shrink-0" /> {text}
                  </div>
                ))}
              </div>

              {/* Right Side: The AnasFlow Protocol */}
              <div className="flex-1 p-6 md:p-12 flex flex-col gap-6 relative justify-center bg-[#00E5C0]/[0.01]">
                <p className="text-[9px] font-black text-[#00E5C0]/40 uppercase tracking-[0.4em] mb-4 text-center">
                  Neural Optimization
                </p>
                <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-[#00E5C0]/30 relative z-10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] scale-110 group-hover/mockup:scale-115 transition-transform duration-700">
                  <div className="flex flex-col items-center gap-6 text-center">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-[#00E5C0]/10 border border-[#00E5C0]/20 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-[#00E5C0]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-[#00E5C0] uppercase tracking-[0.5em] font-black">
                        Yield Reclaim
                      </p>
                      <p className="text-3xl font-black text-white uppercase tracking-tighter">
                        +$412<span className="text-[#00E5C0] mx-1">.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Aggressive Value Proposition */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12 text-left"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-[#00E5C0]/10 border border-[#00E5C0]/20 rounded-xl flex items-center justify-center relative group overflow-hidden">
              <div className="absolute inset-0 bg-[#00E5C0]/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
              <ShieldCheck className="w-5 h-5 text-[#00E5C0] relative z-10" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#00E5C0]">
              The Solution Protocol // Stabilized
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-[90px] font-black tracking-tighter text-white leading-[0.85] uppercase"
          >
            Surgical <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">
              Intelligence.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-zinc-600 font-medium leading-relaxed italic max-w-xl"
          >
            AnasFlow acts as your robotic CFO. We bring every scattered AI node
            into a single high-fidelity command center for total operative
            dominance.
          </motion.p>

          <div className="grid grid-cols-1 gap-6 pt-8">
            {[
              {
                icon: BarChart3,
                text: "Real-time Cost Telemetry across 30+ production nodes.",
              },
              {
                icon: Zap,
                text: "Automated Optimization Suggestions dispatched via AI Doctor.",
              },
              {
                icon: Target,
                text: "1-Click Executive ROI Reports (Corporate White-label).",
              },
              {
                icon: Activity,
                text: "Unified Pulse Monitoring & Workflow Uptime Stabilizer.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex items-center gap-8 group cursor-default p-4 rounded-[2rem] hover:bg-white/[0.02] transition-colors duration-700"
              >
                <div className="w-16 h-16 flex-shrink-0 rounded-[1.5rem] bg-zinc-950/40 border border-white/5 group-hover:border-[#00E5C0]/40 group-hover:shadow-[0_0_25px_rgba(0,229,192,0.1)] transition-all duration-700 flex items-center justify-center shadow-inner">
                  <item.icon className="w-6 h-6 text-zinc-700 group-hover:text-[#00E5C0] transition-colors duration-700" />
                </div>
                <div className="space-y-1">
                  <p className="text-white text-lg font-black uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-700">
                    {item.text.split("(")[0]}
                  </p>
                  {item.text.includes("(") && (
                    <p className="text-[10px] text-zinc-700 font-black uppercase tracking-widest leading-none group-hover:text-zinc-500 transition-colors duration-700">
                      {item.text.split("(")[1].replace(")", "")}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Solution;
