"use client";

import React from "react";
import { motion } from "framer-motion";
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
  Globe,
  Layers,
  Server,
  Fingerprint,
  Link as LinkIcon,
  PieChart,
  FileText,
  Share2,
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
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      icon: LinkIcon,
      title: "Node Integration.",
      desc: "One-click OAuth or API keys for GHL, OpenAI, n8n, and more platforms in under 5 minutes.",
      accent: "text-[#00E5C0]",
      glow: "bg-[#00E5C0]/10",
    },
    {
      num: "02",
      icon: PieChart,
      title: "Neural Sync.",
      desc: "Watch exactly where API credits are bleeding in real-time with a beautiful unified diagnostic dashboard.",
      accent: "text-indigo-400",
      glow: "bg-indigo-500/10",
    },
    {
      num: "03",
      icon: Share2,
      title: "ROI Dispatch.",
      desc: "Fire off automated corporate whitepapers to retain enterprise clients and prove your strategic value.",
      accent: "text-orange-400",
      glow: "bg-orange-500/10",
    },
  ];

  return (
    <section className="py-16 md:py-32 bg-black relative overflow-hidden">
      {/* Immersive Background Architecture */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[400px] bg-indigo-500/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 relative z-10">
        {/* Aggressive Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-32 space-y-8"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-4 mx-auto"
          >
            <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center relative group overflow-hidden">
              <div className="absolute inset-0 bg-indigo-500/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
              <RefreshCw className="w-5 h-5 text-indigo-400 relative z-10" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-400/60">
              Onboarding Protocol // Sub-Second Setup
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-[90px] font-black tracking-tighter text-white leading-[0.85] uppercase"
          >
            Surgical <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">
              Deployment.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto font-medium leading-relaxed italic"
          >
            Three precision steps to total agency dominance. Reconstruct your
            profit margins through liquid intelligence.
          </motion.p>
        </motion.div>

        {/* Neural Onboarding Sequence */}
        <div className="relative flex flex-col md:flex-row items-start justify-between gap-12 lg:gap-24 max-w-6xl mx-auto">
          {/* Signal Pulse Line */}
          <div className="hidden md:block absolute top-[110px] left-[150px] right-[150px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: idx * 0.2,
                duration: 0.8,
              }}
              className="flex-1 flex flex-col items-center text-center group cursor-default"
            >
              {/* Node Container */}
              <div className="relative mb-12">
                <div className="absolute -inset-10 bg-white/[0.02] blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                <div className="w-56 h-56 transition-all duration-1000 flex flex-col items-center justify-center relative z-10">
                  {/* Diagnostic Ring */}
                  <div className="absolute inset-0 border border-white/5 rounded-full scale-100 group-hover:scale-110 group-hover:border-[#00E5C0]/20 transition-all duration-1000" />
                  <div className="absolute inset-[20px] border border-white/5 rounded-full group-hover:rotate-180 transition-transform duration-[4s] linear infinite" />

                  {/* Master Node */}
                  <div className="w-32 h-32 rounded-[2.5rem] bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 shadow-3xl flex items-center justify-center transition-all duration-700 group-hover:bg-zinc-900/40 group-hover:border-white/20 group-hover:rotate-12 group-hover:scale-105">
                    <step.icon
                      className={`w-10 h-10 ${step.accent} group-hover:scale-110 transition-transform duration-700`}
                    />
                  </div>

                  {/* Step Identifier */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-white text-black font-black text-[12px] rounded-full flex items-center justify-center shadow-3xl group-hover:bg-[#00E5C0] transition-colors duration-700">
                    {step.num}
                  </div>
                </div>
              </div>

              {/* Text Architecture */}
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-[#00E5C0] transition-colors duration-700">
                  {step.title}
                </h3>
                <p className="text-zinc-600 text-[16px] font-medium leading-relaxed italic max-w-[280px] group-hover:text-zinc-400 transition-colors duration-700">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Connection Pulse */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-32 flex flex-col items-center gap-8"
        >
          <button className="px-12 py-8 bg-white text-black font-black text-[11px] uppercase tracking-[0.5em] rounded-[2rem] hover:bg-[#00E5C0] transition-all duration-700 shadow-3xl active:scale-95 group">
            Start Neural Onboarding
            <ArrowRight className="w-5 h-5 inline-block ml-6 transition-transform group-hover:translate-x-3" />
          </button>
          <p className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.4em]">
            Sub-Second Node Latency // Optimized 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
