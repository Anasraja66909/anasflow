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

  return (
    <section
      id="features"
      className={`py-32 relative overflow-hidden border-y transition-colors duration-500 ${
        isDark ? "bg-black border-white/5" : "bg-white border-indigo-100/50"
      }`}
    >
      {/* Immersive Background Architecture */}
      <div className={`absolute inset-0 bg-[url('/grid.svg')] bg-center pointer-events-none transition-opacity ${isDark ? "opacity-[0.03]" : "opacity-[0.02]"}`} />
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] blur-[160px] rounded-full pointer-events-none transition-colors ${
        isDark ? "bg-indigo-500/5" : "bg-indigo-500/10"
      }`} />

      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 relative z-10">
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
            <div className={`w-10 h-10 border rounded-xl flex items-center justify-center relative group overflow-hidden transition-all ${
              isDark ? "bg-[#00E5C0]/10 border-[#00E5C0]/20" : "bg-teal-50 border-teal-200"
            }`}>
              <div className="absolute inset-0 bg-[#00E5C0]/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
              <Cpu className="w-5 h-5 text-[#00E5C0] relative z-10" />
            </div>
            <span className={`text-[11px] font-black uppercase tracking-[0.5em] ${
              isDark ? "text-[#00E5C0]" : "text-teal-600"
            }`}>
              Powerful Features
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className={`text-5xl sm:text-6xl lg:text-[90px] font-black tracking-tighter leading-[0.85] uppercase transition-colors duration-500 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Key Features <br className="hidden lg:block" />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
              isDark ? "from-white via-zinc-400 to-zinc-800" : "from-indigo-600 via-indigo-400 to-slate-400"
            }`}>
              Interlink Control.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed italic transition-colors duration-500 ${
              isDark ? "text-zinc-600" : "text-slate-500"
            }`}
          >
            Built from the ground up to give AI agencies the unfair advantage
            they need to grow your agency profitably.
          </motion.p>
        </motion.div>

        {/* High-Fidelity Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-auto md:auto-rows-[320px]"
        >
          {/* Tile 1: Unified Spend (Span 8) */}
          <motion.div
            variants={itemVariants}
            className={`md:col-span-8 backdrop-blur-[60px] border rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 shadow-3xl relative overflow-hidden group/tile flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[280px] md:min-h-0 transition-all duration-700 ${
              isDark ? "bg-zinc-950/40 border-white/5" : "bg-white/60 border-indigo-100 shadow-xl shadow-indigo-100/20"
            }`}
          >
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#00E5C0]/5 blur-[120px] rounded-full pointer-events-none group-hover/tile:bg-[#00E5C0]/10 transition-colors" />
            <div className="relative z-10 flex-1 space-y-8 text-left">
              <div className={`w-16 h-16 rounded-[1.5rem] border flex items-center justify-center shadow-inner group-hover/tile:scale-110 transition-transform duration-700 ${
                isDark ? "bg-[#00E5C0]/10 border-[#00E5C0]/20" : "bg-teal-50 border-teal-100"
              }`}>
                <PieChart className="w-8 h-8 text-[#00E5C0]" />
              </div>
              <div className="space-y-4">
                <h3 className={`text-4xl font-black uppercase tracking-tighter leading-none transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
                  Track All Spending.
                </h3>
                <p className={`text-lg font-medium italic leading-relaxed max-w-md transition-colors ${isDark ? "text-zinc-600" : "text-slate-500"}`}>
                  See all your usage and find your exact profit for each client
                  in absolute real-time across every connection.
                </p>
              </div>
            </div>
            <div className="relative z-10 w-full md:w-1/3 h-full flex items-center justify-center">
              <div className={`w-48 h-48 rounded-full border-8 animate-spin shadow-[0_0_50px_rgba(0,229,192,0.2)] transition-colors ${
                isDark ? "border-white/5 border-t-[#00E5C0]" : "border-indigo-50 border-t-[#00E5C0]"
              }`} />
              <div className="absolute inset-0 m-auto flex items-center justify-center">
                <Activity className={`w-10 h-10 animate-pulse ${isDark ? "text-white" : "text-indigo-600"}`} />
              </div>
            </div>
          </motion.div>

          {/* Tile 2: 1-Click ROI (Span 4) */}
          <motion.div
            variants={itemVariants}
            className={`md:col-span-4 backdrop-blur-[60px] border rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 shadow-3xl relative overflow-hidden group/tile flex flex-col justify-center items-start gap-6 md:gap-8 min-h-[220px] md:min-h-0 transition-all duration-700 ${
              isDark ? "bg-zinc-950/40 border-white/5" : "bg-white/60 border-indigo-100 shadow-xl shadow-indigo-100/20"
            }`}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none group-hover/tile:bg-indigo-500/10 transition-colors" />
            <div className={`w-16 h-16 rounded-[1.5rem] border flex items-center justify-center shadow-inner group-hover/tile:rotate-12 transition-transform duration-700 ${
              isDark ? "bg-indigo-500/10 border-indigo-500/20" : "bg-indigo-50 border-indigo-100"
            }`}>
              <DollarSign className="w-8 h-8 text-indigo-400" />
            </div>
            <div className="space-y-4 text-left">
              <h3 className={`text-3xl font-black uppercase tracking-tighter leading-none transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
                1-Click Profit Report.
              </h3>
              <p className={`text-lg font-medium italic leading-relaxed transition-colors ${isDark ? "text-zinc-600" : "text-slate-500"}`}>
                Turn your numbers into simple, professional reports.
              </p>
            </div>
          </motion.div>

          {/* Tile 3: AI Optimizer (Span 4) */}
          <motion.div
            variants={itemVariants}
            className={`md:col-span-4 backdrop-blur-[60px] border rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 shadow-3xl relative overflow-hidden group/tile flex flex-col justify-center items-start gap-6 md:gap-8 min-h-[220px] md:min-h-0 transition-all duration-700 ${
              isDark ? "bg-zinc-950/40 border-white/5" : "bg-white/60 border-indigo-100 shadow-xl shadow-indigo-100/20"
            }`}
          >
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none group-hover/tile:bg-orange-500/10 transition-colors" />
            <div className={`w-16 h-16 rounded-[1.5rem] border flex items-center justify-center shadow-inner group-hover/tile:scale-110 transition-transform duration-700 ${
              isDark ? "bg-orange-500/10 border-orange-500/20" : "bg-orange-50 border-orange-100"
            }`}>
              <Zap className="w-8 h-8 text-orange-400" />
            </div>
            <div className="space-y-4 text-left">
              <h3 className={`text-3xl font-black uppercase tracking-tighter leading-none transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
                AI Cost Optimizer.
              </h3>
              <p className={`text-lg font-medium italic leading-relaxed transition-colors ${isDark ? "text-zinc-600" : "text-slate-500"}`}>
                AI finds cheaper ways to run your tools to cut costs.
              </p>
            </div>
          </motion.div>

          {/* Tile 4: Connectors (Span 8) */}
          <motion.div
            variants={itemVariants}
            className={`md:col-span-8 backdrop-blur-[60px] border rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 shadow-3xl relative overflow-hidden group/tile flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 min-h-[280px] md:min-h-0 transition-all duration-700 ${
              isDark ? "bg-zinc-950/40 border-white/5" : "bg-white/60 border-indigo-100 shadow-xl shadow-indigo-100/20"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] to-transparent pointer-events-none" />
            <div className="relative z-10 flex-1 space-y-8 text-left">
              <div className={`w-16 h-16 rounded-[1.5rem] border flex items-center justify-center shadow-inner group-hover/tile:rotate-[-10deg] transition-transform duration-700 ${
                isDark ? "bg-white/5 border-white/10" : "bg-indigo-50 border-indigo-100"
              }`}>
                <LinkIcon className={`w-8 h-8 ${isDark ? "text-white" : "text-indigo-600"}`} />
              </div>
              <div className="space-y-4">
                <h3 className={`text-4xl font-black uppercase tracking-tighter leading-none transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
                  30+ Integrations.
                </h3>
                <p className={`text-lg font-medium italic leading-relaxed max-w-md transition-colors ${isDark ? "text-zinc-600" : "text-slate-500"}`}>
                  Connections with Claude, OpenAI, n8n, Zapier, and
                  your other business tools.
                </p>
              </div>
            </div>
            <div className="relative z-10 flex items-center gap-6 group-hover/tile:scale-110 transition-transform duration-1000">
              <div className={`w-20 h-20 rounded-full border flex items-center justify-center shadow-2xl transition-colors ${
                isDark ? "bg-black border-white/5" : "bg-white border-indigo-50"
              }`}>
                <Fingerprint className="w-8 h-8 text-indigo-400" />
              </div>
              <div className={`w-10 h-1 rounded-full transition-colors ${isDark ? "bg-white/10" : "bg-indigo-50"}`} />
              <div className={`w-28 h-28 rounded-full border transition-all animate-pulse flex items-center justify-center ${
                isDark ? "bg-black border-[#00E5C0]/20 shadow-[0_0_40px_rgba(0,229,192,0.2)]" : "bg-white border-indigo-100 shadow-[0_0_40px_rgba(99,102,241,0.1)]"
              }`}>
                <Globe className="w-10 h-10 text-[#00E5C0]" />
              </div>
              <div className={`w-10 h-1 rounded-full transition-colors ${isDark ? "bg-white/10" : "bg-indigo-50"}`} />
              <div className={`w-20 h-20 rounded-full border flex items-center justify-center shadow-2xl transition-colors ${
                isDark ? "bg-black border-white/5" : "bg-white border-indigo-50"
              }`}>
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
