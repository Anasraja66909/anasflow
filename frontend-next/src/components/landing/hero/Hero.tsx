"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Activity,
  Zap,
  Play,
  CheckCircle2,
  BarChart3,
  Target,
  Link as LinkIcon,
  DollarSign,
  PieChart,
  Server,
  Fingerprint,
  Sparkles,
  Layers,
  TrendingUp,
  Terminal,
  ShieldCheck,
  Cpu,
  ChevronRight,
} from "lucide-react";
import CountUp from "./CountUp";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
};

const subtitleLines = [
  "See exactly how much you spend on AI, automate tasks, and save money. Works with Claude, OpenAI, n8n, and more.",
  "Stop wasting money on AI. AnasFlow shows you where every dollar goes — so you can cut costs and grow smarter.",
  "Manage all your business automations in one place. Monitor Zapier, n8n, and Make workflows. Get alerts before problems happen.",
  "Send beautiful reports to your clients in seconds. Show them exactly what you've done and how much value you've created.",
];

const Hero = () => {
  const [swapperIndex, setSwapperIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const swapWords = ["AI Costs", "Business Growth", "Time Saved", "Real Results"];

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSwapperIndex((prev) => (prev + 1) % swapWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`relative pt-20 sm:pt-28 lg:pt-40 pb-16 lg:pb-48 overflow-hidden select-none transition-colors duration-500 ${
      isDark ? "bg-black" : ""
    }`}>
      {/* Background Accent */}
      <motion.div
        animate={{ rotate: [0, 5, 0, -5, 0], scale: [1, 1.1, 1, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[1200px] h-[300px] md:h-[800px] pointer-events-none blur-[100px] md:blur-[180px] rounded-full transition-all duration-1000 ${
          isDark ? "opacity-10 bg-indigo-500/20" : "opacity-40 bg-gradient-to-b from-indigo-200/50 via-teal-100/30 to-transparent"
        }`}
      />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-6 md:px-8 relative z-10 w-full grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
        {/* Left Content Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col text-left"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6 md:mb-12">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-indigo-500/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
              <Terminal className="w-4 h-4 md:w-5 md:h-5 text-indigo-400 relative z-10" />
            </div>
            <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-indigo-600">
              AI Spend & Tool Tracking
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className={`text-4xl sm:text-6xl lg:text-[90px] xl:text-[110px] font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-8 md:mb-12 uppercase break-words transition-colors duration-500 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Control Your{" "}
            <br className="hidden lg:block" />
            <div className="inline-grid [grid-template-areas:'stack'] overflow-visible">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={swapperIndex}
                  initial={{ opacity: 0, y: 35, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -35, rotateX: 90 }}
                  transition={{ duration: 0.8 }}
                  className="[grid-area:stack] inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-teal-500 to-indigo-400 origin-bottom"
                >
                  {swapWords[swapperIndex]}.
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="relative mb-12 md:mb-20 max-w-2xl min-h-[100px] md:min-h-[120px]"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={swapperIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6 }}
                className="text-base md:text-xl lg:text-2xl text-slate-500 leading-relaxed font-medium italic absolute inset-x-0"
              >
                {subtitleLines[swapperIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10 md:mb-16"
          >
            <Link
              href="/register"
              className={`w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] rounded-[2rem] transition-all duration-700 active:scale-95 text-center ${
                isDark 
                  ? "bg-indigo-600 text-white shadow-[0_20px_50px_rgba(99,102,241,0.35)] hover:bg-[#00E5C0] hover:text-black hover:shadow-[#00E5C0]/40" 
                  : "bg-indigo-600 text-white shadow-xl hover:bg-slate-900 hover:shadow-indigo-200"
              }`}
            >
              Start Free Now
            </Link>
            <button className={`w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 backdrop-blur-3xl border font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] rounded-[2rem] transition-all duration-700 flex items-center justify-center gap-4 group active:scale-95 ${
              isDark 
                ? "bg-white/5 border-white/10 text-white hover:bg-white/10" 
                : "bg-white/80 border-indigo-100 text-indigo-700 hover:bg-indigo-50"
            }`}>
              <Play className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${isDark ? "text-indigo-400 group-hover:text-[#00E5C0]" : "text-indigo-600"}`} />
              Watch Demo
            </button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 md:gap-6 text-[9px] md:text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] md:tracking-[0.3em]"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#00E5C0]" />
              <span>No Credit Card</span>
            </div>
            <div className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block" />
            <div className="flex items-center gap-2 md:gap-3">
              <Layers className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-400" />
              <span>50+ Companies</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Mockup — 3D Hand-held View */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateY: -15, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 5, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative lg:col-span-5 mt-10 md:mt-20 lg:mt-0 flex items-center justify-center pointer-events-auto perspective-[2000px] h-[450px] sm:h-[600px] lg:h-[800px]"
        >
          {/* External Hardware Aura */}
          <div className="absolute -inset-20 bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />

          {/* Handset Body (Tilted) */}
          <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[420px] lg:w-[115%] transition-transform duration-1000 group/phone hover:rotate-y-0 scale-[0.85] sm:scale-100 hover:scale-105">
            <div className={`relative rounded-[3.5rem] lg:rounded-[4.5rem] overflow-hidden border-[10px] lg:border-[16px] transition-all duration-700 flex flex-col h-[500px] lg:h-[750px] ${
              isDark 
                ? "border-zinc-900 bg-zinc-950 shadow-[0_100px_200px_rgba(0,0,0,0.9),0_0_100px_rgba(0,229,192,0.1)]" 
                : "border-slate-100 bg-white shadow-[0_50px_100px_rgba(15,23,42,0.15),0_0_50px_rgba(99,102,241,0.05)]"
            }`}>
              
              {/* Hardware Sensor Hub (Notch) */}
              <div className={`absolute top-4 left-1/2 -translate-x-1/2 w-24 lg:w-36 h-6 lg:h-8 rounded-full z-40 flex items-center justify-center p-1 shadow-inner transition-colors duration-700 ${
                isDark ? "bg-zinc-900" : "bg-slate-100"
              }`}>
                <div className={`w-12 lg:w-20 h-1 rounded-full ${isDark ? "bg-black" : "bg-slate-300"}`} />
                <div className="w-2 h-2 bg-indigo-500/30 rounded-full ml-3 blur-[1px]" />
              </div>

              {/* Vertical Scanning Beam (AI Pulse) */}
              <div
                className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-[#00E5C0]/15 to-transparent z-30 pointer-events-none"
                style={{
                  animation: "hero-scan 6s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                }}
              />
              <style>{`
                @keyframes hero-scan {
                  0% { transform: translateY(-100%); }
                  100% { transform: translateY(750px); }
                }
              `}</style>

              {/* Liquid Dashboard UI */}
              <div className={`flex-1 flex flex-col relative overflow-hidden transition-colors duration-700 ${
                isDark ? "bg-black/95" : "bg-white"
              }`}>
                <div className={`absolute inset-0 bg-[url('/grid.svg')] bg-center pointer-events-none ${isDark ? "opacity-[0.05]" : "opacity-[0.02]"}`} />

                {/* App Header */}
                <div className={`pt-16 pb-6 px-8 backdrop-blur-3xl border-b relative z-20 transition-all ${
                  isDark ? "bg-zinc-950/80 border-white/5" : "bg-white/80 border-indigo-50"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <Activity className="w-3.5 h-3.5 text-[#00E5C0]" />
                        <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDark ? "text-white" : "text-slate-900"}`}>Live Health</span>
                      </div>
                      <p className={`text-[9px] font-bold uppercase tracking-widest italic ${isDark ? "text-zinc-700" : "text-slate-400"}`}>All connections active</p>
                    </div>
                    <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ring-1 ${
                      isDark ? "bg-white/5 border-white/10 ring-[#00E5C0]/20" : "bg-indigo-50 border-indigo-100 ring-[#00E5C0]/10"
                    }`}>
                      <Zap className="w-5 h-5 text-[#00E5C0]" />
                    </div>
                  </div>
                </div>

                {/* App Content */}
                <div className="flex-1 p-8 pt-12 space-y-8 relative z-10 overflow-y-auto scrollbar-hide">
                  
                  {/* Big Metric */}
                  <div className={`border rounded-[2.5rem] p-8 relative overflow-hidden group/metric transition-all duration-700 ${
                    isDark ? "bg-zinc-950 border-white/10" : "bg-slate-50 border-indigo-50 shadow-sm"
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
                    <div className="flex justify-between items-center mb-4">
                      <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDark ? "text-zinc-600" : "text-indigo-400"}`}>Savings Found</p>
                      <TrendingUp className="w-5 h-5 text-[#00E5C0]" />
                    </div>
                    <h3 className={`text-5xl lg:text-6xl font-black tracking-tighter mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                      $<CountUp to={2847} />
                    </h3>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00E5C0]/10 rounded-full border border-[#00E5C0]/20">
                      <span className="text-[9px] font-bold text-[#00E5C0] uppercase tracking-widest">+12.4% MONTH</span>
                    </div>
                  </div>

                  {/* Installed Tool Hub (The Tools) */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                      <h4 className={`text-[11px] font-black uppercase tracking-widest ${isDark ? "text-zinc-500" : "text-indigo-400"}`}>Connected Tools</h4>
                      <span className={`text-[9px] font-bold uppercase italic ${isDark ? "text-zinc-800" : "text-slate-300"}`}>3 nodes sync</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { n: "n8n", i: "https://cdn.simpleicons.org/n8n", s: "Syncing", color: "EA4B71" },
                        { n: "HubSpot", i: "https://cdn.simpleicons.org/hubspot", s: "Active", color: "FF7A59" },
                        { n: "GHL", i: "GHL", s: "Online", color: "indigo" },
                      ].map((tool) => (
                        <div key={tool.n} className={`border rounded-[1.8rem] p-5 flex flex-col items-center justify-center gap-3 group/tool transition-all duration-700 shadow-2xl ${
                          isDark 
                            ? "bg-zinc-950/50 border-white/5 hover:bg-zinc-900 hover:border-[#00E5C0]/30" 
                            : "bg-white border-indigo-50 hover:border-indigo-400 hover:shadow-indigo-100"
                        }`}>
                          <div className="w-10 h-10 flex items-center justify-center relative">
                            <div className={`absolute inset-0 blur-xl opacity-0 group-hover/tool:opacity-100 transition-opacity ${isDark ? "bg-[#00E5C0]/5" : "bg-indigo-500/5"}`} />
                            {tool.i.startsWith("http") ? (
                              <img 
                                src={isDark ? `${tool.i}/white` : tool.i} 
                                alt={tool.n} 
                                className="w-6 h-6 object-contain relative z-10" 
                              />
                            ) : (
                              <span className={`text-[11px] font-black relative z-10 transition-colors ${isDark ? "text-white" : "text-indigo-600"}`}>{tool.i}</span>
                            )}
                          </div>
                          <span className={`text-[7px] font-black uppercase tracking-widest transition-colors ${
                            isDark ? "text-zinc-700 group-hover/tool:text-zinc-500" : "text-slate-300 group-hover/tool:text-indigo-400"
                          }`}>{tool.s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Optimization Tile */}
                  <div className={`border rounded-[2.5rem] p-6 flex items-center justify-between transition-all duration-700 ${
                    isDark ? "bg-[#00E5C0]/5 border-[#00E5C0]/20" : "bg-slate-50 border-indigo-100 shadow-sm"
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isDark ? "bg-black/40" : "bg-white shadow-sm"
                      }`}>
                        <Cpu className="w-5 h-5 text-[#00E5C0]" />
                      </div>
                      <div className="text-left">
                        <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "text-white" : "text-slate-900"}`}>AI Agent active</p>
                        <p className="text-[8px] text-[#00E5C0] font-bold uppercase tracking-widest mt-0.5">Auto-Fixing connections</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isDark ? "text-zinc-700" : "text-indigo-300"}`} />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    );
  };
  
  export default Hero;
