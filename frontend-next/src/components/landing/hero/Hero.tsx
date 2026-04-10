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
  const swapWords = ["AI Costs", "Business Growth", "Time Saved", "Real Results"];

  useEffect(() => {
    const interval = setInterval(() => {
      setSwapperIndex((prev) => (prev + 1) % swapWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-24 sm:pt-36 lg:pt-60 pb-16 lg:pb-48 overflow-hidden select-none bg-black">
      {/* Background */}
      <motion.div
        animate={{ rotate: [0, 5, 0, -5, 0], scale: [1, 1.1, 1, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[1200px] h-[300px] md:h-[800px] opacity-30 pointer-events-none blur-[100px] md:blur-[180px] bg-gradient-to-b from-indigo-500/20 via-[#00E5C0]/10 to-transparent rounded-full"
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
            <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-indigo-400">
              AI Cost &amp; Automation Analytics
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-[90px] xl:text-[110px] font-black tracking-tighter text-white leading-[0.9] md:leading-[0.85] mb-8 md:mb-12 uppercase break-words"
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
                  className="[grid-area:stack] inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-700 origin-bottom"
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
                className="text-base md:text-xl lg:text-2xl text-zinc-500 leading-relaxed font-medium italic absolute inset-x-0"
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
              className="w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 bg-white text-black font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] rounded-[2rem] hover:bg-[#00E5C0] transition-all duration-700 shadow-[0_40px_100px_rgba(0,0,0,0.5)] hover:shadow-[#00E5C0]/40 active:scale-95 text-center"
            >
              Start Free Now
            </Link>
            <button className="w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 bg-zinc-950/40 backdrop-blur-3xl border border-white/5 text-white font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] rounded-[2rem] hover:bg-white/5 transition-all duration-700 flex items-center justify-center gap-4 group active:scale-95">
              <Play className="w-4 h-4 md:w-5 md:h-5 text-zinc-600 group-hover:text-white transition-colors" />
              Watch Demo
            </button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 md:gap-6 text-[9px] md:text-[10px] text-zinc-700 font-black uppercase tracking-[0.2em] md:tracking-[0.3em]"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#00E5C0]" />
              <span>No Credit Card</span>
            </div>
            <div className="w-1 h-1 bg-zinc-800 rounded-full hidden sm:block" />
            <div className="flex items-center gap-2 md:gap-3">
              <Layers className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-400" />
              <span>50+ Companies</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Mockup — hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="relative lg:col-span-5 h-[700px] hidden lg:flex items-center justify-center pointer-events-none perspective-[2000px]"
        >
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 1, 0, -1, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="w-full relative flex items-center justify-center pointer-events-auto"
          >
            {/* HUD Element */}
            <div className="absolute top-[5%] -left-12 w-20 h-20 rounded-3xl bg-zinc-950/60 border border-white/5 backdrop-blur-xl flex flex-col items-center justify-center shadow-3xl animate-pulse">
              <Zap className="w-8 h-8 text-[#00E5C0]/40" />
              <span className="text-[8px] font-black text-zinc-600 mt-1">ROI</span>
            </div>

            <div className="w-full lg:w-[130%] bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[4rem] overflow-hidden shadow-[0_80px_200px_rgba(0,0,0,0.8)] relative z-10 transition-transform duration-1000 group/mockup hover:scale-105">
              <div className="bg-black/60 px-10 py-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                  <div className="w-3 h-3 rounded-full bg-green-500/40" />
                </div>
                <div className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                  anasflow.app/dashboard
                </div>
              </div>

              <div className="p-12 space-y-10 relative">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.05] pointer-events-none" />

                <div className="bg-black/40 rounded-[2.5rem] p-10 border border-white/5 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 blur-[80px] rounded-full" />
                  <div className="flex justify-between items-center relative z-10">
                    <div className="text-left space-y-1">
                      <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.4em]">
                        Total Potential Savings
                      </p>
                      <h3 className="text-6xl font-black text-white tracking-tighter">
                        $<CountUp to={2847} />
                      </h3>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-[#00E5C0]/10 border border-[#00E5C0]/20 flex items-center justify-center text-[#00E5C0] shadow-2xl">
                      <TrendingUp className="w-8 h-8" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-black/40 rounded-[2.5rem] p-8 border border-white/5 shadow-inner flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <PieChart className="w-4 h-4 text-zinc-700" />
                      <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">AI Spending</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { n: "Claude", p: 42, c: "bg-[#00E5C0]" },
                        { n: "OpenAI", p: 31, c: "bg-indigo-500" },
                      ].map((i) => (
                        <div key={i.n} className="flex flex-col gap-2">
                          <div className="flex justify-between text-[9px] font-black uppercase text-zinc-500">
                            <span>{i.n}</span>
                            <span>{i.p}%</span>
                          </div>
                          <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                            <div className={`h-full ${i.c}`} style={{ width: `${i.p}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#00E5C0]/5 rounded-[2.5rem] p-8 border border-[#00E5C0]/20 shadow-inner flex flex-col justify-center items-center gap-4">
                    <Sparkles className="w-10 h-10 text-[#00E5C0]" />
                    <div className="text-center">
                      <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Money You Can Save</p>
                      <p className="text-2xl font-black text-[#00E5C0] leading-none mt-1">
                        +$<CountUp to={412} />
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#00E5C0] rounded-full animate-pulse shadow-[0_0_10px_#00E5C0]" />
                    <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em]">Real-time Sync Active</span>
                  </div>
                  <span className="text-[9px] font-black text-zinc-800 uppercase tracking-widest italic">AnasFlow v4.2</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
