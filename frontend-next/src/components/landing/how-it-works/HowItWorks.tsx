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
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      num: "01",
      icon: LinkIcon,
      title: "Connect Your Tools.",
      desc: "One-click OAuth or API keys for GHL, OpenAI, n8n, and more platforms in under 5 minutes.",
      accent: "text-[#00E5C0]",
      glow: "bg-[#00E5C0]/10",
    },
    {
      num: "02",
      icon: PieChart,
      title: "Smart Tracking.",
      desc: "Watch exactly where your money is going in real-time with a beautiful, easy-to-use dashboard.",
      accent: "text-indigo-400",
      glow: "bg-indigo-500/10",
    },
    {
      num: "03",
      icon: Share2,
      title: "Send Reports.",
      desc: "Send professional profit reports to your clients to show them exactly how much value you've created.",
      accent: "text-orange-400",
      glow: "bg-orange-500/10",
    },
  ];

  return (
    <section className={`py-16 md:py-32 relative overflow-hidden transition-colors duration-500 ${
      isDark ? "bg-black" : "bg-white"
    }`}>
      {/* Immersive Background Architecture */}
      <div className={`absolute inset-0 bg-[url('/grid.svg')] bg-center pointer-events-none transition-opacity ${isDark ? "opacity-[0.02]" : "opacity-[0.01]"}`} />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[400px] blur-[180px] rounded-full pointer-events-none transition-colors ${
        isDark ? "bg-indigo-500/5" : "bg-indigo-500/10"
      }`} />

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
            <div className={`w-10 h-10 border rounded-xl flex items-center justify-center relative group overflow-hidden transition-all ${
              isDark ? "bg-indigo-500/10 border-indigo-500/20" : "bg-indigo-50 border-indigo-200"
            }`}>
              <div className="absolute inset-0 bg-indigo-500/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
              <RefreshCw className="w-5 h-5 text-indigo-400 relative z-10" />
            </div>
            <span className={`text-[11px] font-black uppercase tracking-[0.5em] transition-colors ${
              isDark ? "text-indigo-400/60" : "text-indigo-600"
            }`}>
              Quick Setup // Under 5 Minutes
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className={`text-4xl sm:text-5xl lg:text-[90px] font-black tracking-tighter leading-[0.85] uppercase transition-colors duration-500 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
              Easy Setup.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed italic transition-colors duration-500 ${
              isDark ? "text-zinc-600" : "text-slate-500"
            }`}
          >
            Three simple steps to grow your business. See your actual 
            profit margins through smart data.
          </motion.p>
        </motion.div>

        {/* Smart Setup Sequence */}
        <div className="relative flex flex-col md:flex-row items-center md:items-start justify-between gap-16 md:gap-12 lg:gap-24 max-w-6xl mx-auto">
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
              <div className="relative mb-8 md:mb-12 scale-75 sm:scale-90 md:scale-100">
                <div className={`absolute -inset-10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 ${
                  isDark ? "bg-white/[0.02]" : "bg-indigo-500/[0.05]"
                }`} />

                <div className="w-56 h-56 transition-all duration-1000 flex flex-col items-center justify-center relative z-10">
                  {/* Diagnostic Ring */}
                  <div className={`absolute inset-0 border rounded-full scale-100 group-hover:scale-110 group-hover:border-[#00E5C0]/20 transition-all duration-1000 ${
                    isDark ? "border-white/5" : "border-indigo-100"
                  }`} />
                  <div className={`absolute inset-[20px] border rounded-full group-hover:rotate-180 transition-transform duration-[4s] linear infinite ${
                    isDark ? "border-white/5" : "border-indigo-50"
                  }`} />

                  {/* Main App Container */}
                  <div className={`w-32 h-32 rounded-[2.5rem] backdrop-blur-[60px] border shadow-3xl flex items-center justify-center transition-all duration-700 group-hover:rotate-12 group-hover:scale-105 ${
                    isDark 
                      ? "bg-zinc-950/40 border-white/5 group-hover:bg-zinc-900/40 group-hover:border-white/20" 
                      : "bg-white border-indigo-100 group-hover:bg-slate-50 group-hover:border-indigo-300 shadow-xl shadow-indigo-100/20"
                  }`}>
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
                <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none transition-colors duration-700 ${
                  isDark ? "text-white group-hover:text-[#00E5C0]" : "text-slate-900 group-hover:text-indigo-600"
                }`}>
                  {step.title}
                </h3>
                <p className={`text-[14px] md:text-[16px] font-medium leading-relaxed italic max-w-[280px] transition-colors duration-700 ${
                  isDark ? "text-zinc-600 group-hover:text-zinc-400" : "text-slate-500 group-hover:text-slate-700"
                }`}>
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
          <button className={`px-12 py-8 font-black text-[11px] uppercase tracking-[0.5em] rounded-[2rem] transition-all duration-700 shadow-3xl active:scale-95 group ${
            isDark ? "bg-white text-black hover:bg-[#00E5C0]" : "bg-indigo-600 text-white hover:bg-slate-900 shadow-xl shadow-indigo-200"
          }`}>
            Start Smart Setup
            <ArrowRight className="w-5 h-5 inline-block ml-6 transition-transform group-hover:translate-x-3" />
          </button>
          <p className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors duration-500 ${
            isDark ? "text-zinc-800" : "text-slate-300"
          }`}>
            Everything Optimized for 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
