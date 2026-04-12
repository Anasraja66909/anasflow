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
    <section className={`py-16 md:py-32 relative overflow-hidden transition-colors duration-500 ${
      isDark ? "bg-black" : "bg-[#fcfdff]"
    }`}>
      {/* Immersive Background Architecture */}
      <div className={`absolute top-0 right-0 w-[800px] h-[400px] blur-[160px] rounded-full pointer-events-none transition-colors ${
        isDark ? "bg-indigo-500/5" : "bg-indigo-500/10"
      }`} />
      <div className={`absolute inset-0 bg-[url('/grid.svg')] bg-center pointer-events-none ${isDark ? "opacity-[0.02]" : "opacity-[0.03]"}`} />

      <div className="max-w-screen-2xl mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: High-Fidelity Diagnostic Visualization */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotateY: 20 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative group perspective-[2000px]"
        >
          <div className="absolute -inset-10 bg-indigo-500/5 blur-[100px] rounded-full group-hover:bg-indigo-500/10 transition-colors duration-1000" />

          <div className={`relative backdrop-blur-[60px] border rounded-[2.5rem] md:rounded-[4.5rem] overflow-hidden transition-all duration-700 min-h-[500px] md:h-[600px] flex flex-col group/mockup ${
            isDark 
              ? "bg-zinc-950/40 border-white/5 shadow-[0_80px_200px_rgba(0,0,0,0.8)]" 
              : "bg-white border-indigo-100 shadow-[0_40px_100px_rgba(99,102,241,0.08)]"
          }`}>
            {/* Header */}
            <div className={`px-6 md:px-12 py-6 md:py-8 border-b flex items-center justify-between transition-colors ${
              isDark ? "bg-black/60 border-white/5" : "bg-slate-50 border-indigo-50"
            }`}>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <ActivitySquare className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-zinc-600">
                  30+ Tools Supported
                </span>
              </div>
              <div className="flex gap-2">
                <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-red-500 animate-pulse" />
                <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#00E5C0]" />
              </div>
            </div>

            <div className={`flex-1 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x relative transition-colors ${
              isDark ? "divide-white/5" : "divide-indigo-50"
            }`}>
              {/* Easy Billing Toggle */}
              <div className={`absolute inset-0 bg-[url('/grid.svg')] pointer-events-none transition-opacity ${isDark ? "opacity-[0.05]" : "opacity-[0.02]"}`} />

              {/* Left Side: Messy Systems */}
              <div className="flex-1 p-6 md:p-12 flex flex-col gap-4 md:gap-6 relative justify-center bg-red-500/[0.01]">
                <p className="text-[8px] md:text-[9px] font-black text-red-500/40 uppercase tracking-[0.4em] mb-2 md:mb-4 text-center">
                  Common Problems
                </p>
                {[
                  "API Limits Reached",
                  "Unexpected Spending",
                  "Missing Reports",
                ].map((text, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 md:gap-4 text-red-500/60 bg-red-500/5 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-red-500/10 relative z-10 text-[10px] md:text-xs font-black uppercase tracking-widest italic group-hover/mockup:-translate-x-1 md:group-hover/mockup:-translate-x-2 transition-transform duration-700"
                  >
                    <X className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" /> {text}
                  </div>
                ))}
              </div>

                  {/* Right Side: The AnasFlow Protocol */}
              <div className={`flex-1 p-6 md:p-12 flex flex-col gap-4 md:gap-6 relative justify-center transition-colors ${
                isDark ? "bg-[#00E5C0]/[0.01]" : "bg-indigo-500/[0.01]"
              }`}>
                <p className={`text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] mb-2 md:mb-4 text-center ${
                   isDark ? "text-[#00E5C0]/40" : "text-indigo-400"
                }`}>
                  Smart Savings
                </p>
                <div className={`backdrop-blur-3xl p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border relative z-10 scale-100 sm:scale-110 group-hover/mockup:scale-105 sm:group-hover/mockup:scale-115 transition-all duration-700 ${
                  isDark 
                    ? "bg-white/5 border-[#00E5C0]/30 shadow-[0_40px_100px_rgba(0,0,0,0.5)]" 
                    : "bg-white border-indigo-200 shadow-[0_20px_50px_rgba(99,102,241,0.15)]"
                }`}>
                  <div className="flex flex-col items-center gap-4 md:gap-6 text-center">
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-[1.2rem] md:rounded-[1.5rem] border flex items-center justify-center ${
                      isDark ? "bg-[#00E5C0]/10 border-[#00E5C0]/20" : "bg-indigo-50 border-indigo-100"
                    }`}>
                      <Sparkles className={`w-6 h-6 md:w-8 md:h-8 ${isDark ? "text-[#00E5C0]" : "text-indigo-600"}`} />
                    </div>
                    <div className="space-y-1">
                      <p className={`text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] font-black ${
                        isDark ? "text-[#00E5C0]" : "text-indigo-600"
                      }`}>
                        Earnings Back
                      </p>
                      <p className={`text-2xl md:text-3xl font-black uppercase tracking-tighter ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}>
                        +$412<span className={`${isDark ? "text-[#00E5C0]" : "text-indigo-600"} mx-1`}>.</span>
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
          className="space-y-8 md:space-y-12 text-left"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            <div className={`w-10 h-10 border rounded-xl flex items-center justify-center relative group overflow-hidden transition-all ${
              isDark ? "bg-[#00E5C0]/10 border-[#00E5C0]/20" : "bg-teal-50 border-teal-200"
            }`}>
              <div className="absolute inset-0 bg-[#00E5C0]/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
              <ShieldCheck className="w-5 h-5 text-[#00E5C0] relative z-10" />
            </div>
            <span className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] ${
              isDark ? "text-[#00E5C0]" : "text-teal-600"
            }`}>
              The Smart Way // Easy Control
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className={`text-4xl md:text-5xl lg:text-7xl xl:text-[90px] font-black tracking-tighter leading-[1] md:leading-[0.85] uppercase break-words transition-colors duration-500 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Smart <br className="hidden lg:block" />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
              isDark ? "from-white via-zinc-400 to-zinc-800" : "from-indigo-600 via-indigo-400 to-slate-400"
            }`}>
              Analytics.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-lg md:text-2xl font-medium leading-relaxed italic max-w-xl transition-colors duration-500 ${
              isDark ? "text-zinc-600" : "text-slate-500"
            }`}
          >
            AnasFlow acts as your smart money manager. We bring every 
            tool into a single simple dashboard for 
            total control.
          </motion.p>

          <div className="grid grid-cols-1 gap-4 md:gap-6 pt-4 md:pt-8">
            {[
              {
                icon: BarChart3,
                text: "Track costs across 30+ business tools.",
              },
              {
                icon: Zap,
                text: "Smart savings tips for your business.",
              },
              {
                icon: Target,
                text: "1-Click Profit Reports (Custom Branding).",
              },
              {
                icon: Activity,
                text: "System Updates // Automatic Fixes",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`flex items-center gap-4 md:gap-8 group cursor-default p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] transition-colors duration-700 ${
                  isDark ? "hover:bg-white/[0.02]" : "hover:bg-indigo-50"
                }`}
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 flex-shrink-0 rounded-[1.2rem] md:rounded-[1.5rem] border transition-all duration-700 flex items-center justify-center shadow-inner ${
                  isDark 
                    ? "bg-zinc-950/40 border-white/5 group-hover:border-[#00E5C0]/40 group-hover:shadow-[0_0_25px_rgba(0,229,192,0.1)]" 
                    : "bg-white border-indigo-100 group-hover:border-indigo-400 group-hover:shadow-indigo-100"
                }`}>
                  <item.icon className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-700 ${
                    isDark ? "text-zinc-700 group-hover:text-[#00E5C0]" : "text-indigo-400 group-hover:text-indigo-600"
                  }`} />
                </div>
                <div className="space-y-1">
                  <p className={`text-base md:text-lg font-black uppercase tracking-tighter group-hover:translate-x-2 transition-all duration-700 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>
                    {item.text.split("(")[0]}
                  </p>
                  {item.text.includes("(") && (
                    <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest leading-none transition-colors duration-700 ${
                      isDark ? "text-zinc-700 group-hover:text-zinc-500" : "text-slate-400 group-hover:text-indigo-400"
                    }`}>
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
