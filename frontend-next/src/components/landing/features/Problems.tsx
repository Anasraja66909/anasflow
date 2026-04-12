"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Layers,
  TrendingUp,
  Target,
  Activity,
  AlertCircle,
  ShieldAlert,
  ZapOff,
  Ghost,
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

const Problems = () => {
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

  const problems = [
    {
      icon: Layers,
      label: "Problem 1",
      title: "Bills Everywhere.",
      desc: "You have different invoices and bills from Claude, ChatGPT, zapier, and more. Hard to see what's costing money.",
      color: "text-red-500",
      accent: "bg-red-500/10",
    },
    {
      icon: TrendingUp,
      label: "Problem 2",
      title: "Costs Keep Rising.",
      desc: "Automation tools quietly get more expensive each month. You don't find out until the bills arrive and profits drop.",
      color: "text-orange-500",
      accent: "bg-orange-500/10",
    },
    {
      icon: ZapOff,
      label: "Problem 3",
      title: "Can't Prove Results.",
      desc: "Your clients ask: 'How much value did you create?' You don't have clear numbers to show them.",
      color: "text-yellow-500",
      accent: "bg-yellow-500/10",
    },
    {
      icon: Ghost,
      label: "Problem 4",
      title: "Wasting Time.",
      desc: "You manually update spreadsheets and reports every month instead of working on new client projects.",
      color: "text-pink-500",
      accent: "bg-pink-500/10",
    },
  ];

  return (
    <section className={`py-16 md:py-32 relative overflow-hidden border-t transition-colors duration-500 ${
      isDark ? "bg-black border-white/5" : "bg-white border-red-100/50"
    }`}>
      {/* Background Pain Pulse */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[1000px] h-[300px] md:h-[400px] blur-[100px] md:blur-[160px] rounded-full pointer-events-none transition-colors ${
        isDark ? "bg-red-500/5" : "bg-red-500/10"
      }`} />
      <div className={`absolute inset-0 bg-[url('/grid.svg')] bg-center pointer-events-none ${isDark ? "opacity-[0.02]" : "opacity-[0.03]"}`} />

      <div className="max-w-screen-2xl mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-left mb-16 md:mb-24 space-y-6 md:space-y-8"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            <div className={`w-10 h-10 border rounded-xl flex items-center justify-center relative group overflow-hidden transition-all ${
              isDark ? "bg-red-500/10 border-red-500/20" : "bg-red-50 border-red-200"
            }`}>
              <div className="absolute inset-0 bg-red-500/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
              <ShieldAlert className="w-5 h-5 text-red-500 relative z-10" />
            </div>
            <span className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] ${
              isDark ? "text-red-500/60" : "text-red-600"
            }`}>
              The Real Problems
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className={`text-4xl sm:text-5xl lg:text-7xl xl:text-[90px] font-black tracking-tighter leading-[1] md:leading-[0.9] uppercase break-words transition-colors ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Managing <br className="hidden lg:block" />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
              isDark ? "from-red-500 via-zinc-400 to-zinc-800" : "from-red-600 via-red-400 to-slate-400"
            }`}>
              AI is Hard.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-lg md:text-2xl max-w-3xl font-medium leading-relaxed italic transition-colors ${
              isDark ? "text-zinc-600" : "text-slate-500"
            }`}
          >
            Most agencies don't know where their money goes. Every new tool you
            add makes costs harder to control and track.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {problems.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`backdrop-blur-[60px] border rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-10 flex flex-col items-start gap-8 md:gap-10 group transition-all duration-700 cursor-default shadow-3xl hover:-translate-y-2 md:hover:-translate-y-4 ${
                isDark 
                  ? "bg-zinc-950/40 border-white/5 hover:bg-zinc-900/40 hover:border-red-500/20" 
                  : "bg-white/60 border-red-100 hover:bg-white hover:border-red-400/50 hover:shadow-red-50"
              }`}
            >
              <div className="w-full flex justify-between items-start">
                <div
                  className={`p-5 rounded-2xl border transition-all duration-700 ${
                    isDark 
                      ? "bg-zinc-900 border-white/5 group-hover:bg-red-500/10 group-hover:border-red-500/20" 
                      : "bg-red-50 border-red-100 group-hover:bg-red-100 group-hover:border-red-200"
                  }`}
                >
                  <item.icon
                    className={`w-6 h-6 transition-transform duration-700 group-hover:scale-110 ${
                      isDark ? item.color : "text-red-600"
                    }`}
                  />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest leading-none mt-2 transition-colors ${
                  isDark ? "text-zinc-800" : "text-red-200"
                }`}>
                  {item.label}
                </span>
              </div>
              <div className="space-y-4 text-left">
                <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none transition-colors duration-700 ${
                  isDark ? "text-white group-hover:text-red-500" : "text-slate-900 group-hover:text-red-600"
                }`}>
                  {item.title}
                </h3>
                <p className={`text-base md:text-lg font-medium leading-relaxed italic transition-colors duration-700 ${
                  isDark ? "text-zinc-600 group-hover:text-zinc-400" : "text-slate-500 group-hover:text-slate-700"
                }`}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

  );
};

export default Problems;
