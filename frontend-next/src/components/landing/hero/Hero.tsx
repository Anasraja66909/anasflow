"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, TrendingDown, BarChart3, Zap } from "lucide-react";
import CountUp from "./CountUp";

const words = ["AI Costs", "Automation Spend", "Agency Profits", "Business Growth"];

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 bg-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] opacity-20 pointer-events-none blur-[120px] bg-gradient-to-b from-indigo-500 to-transparent rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-10 pointer-events-none blur-[100px] bg-[#00E5C0] rounded-full" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-8"
            >
              <div className="w-2 h-2 bg-[#00E5C0] rounded-full animate-pulse" />
              Trusted by 50+ Agencies
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
              Take Control of{" "}
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-[#00E5C0] to-indigo-400">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block"
                  >
                    {words[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              AnasFlow connects all your tools — Zapier, n8n, Claude, OpenAI and more — to show you exactly where your money goes. Cut costs and prove ROI to every client.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-10">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold text-base rounded-2xl hover:bg-[#00E5C0] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group"
              >
                Start Free — No Card Needed
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-semibold text-base rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Sign In
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start text-sm text-zinc-500">
              {["No setup fees", "Cancel anytime", "14-day free trial"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#00E5C0]" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats Card — hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex flex-col gap-4 w-full max-w-sm"
          >
            {/* Main card */}
            <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-2">Monthly Savings Found</p>
              <p className="text-5xl font-bold text-white mb-1">
                $<CountUp to={2847} />
              </p>
              <div className="flex items-center gap-2 mt-3">
                <TrendingDown className="w-4 h-4 text-[#00E5C0]" />
                <span className="text-[#00E5C0] text-sm font-semibold">38% cost reduction on average</span>
              </div>
            </div>

            {/* Mini cards row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                <BarChart3 className="w-5 h-5 text-indigo-400 mb-3" />
                <p className="text-2xl font-bold text-white">30+</p>
                <p className="text-zinc-500 text-xs mt-1">Platforms Connected</p>
              </div>
              <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                <Zap className="w-5 h-5 text-[#00E5C0] mb-3" />
                <p className="text-2xl font-bold text-white">
                  $<CountUp to={412} />
                </p>
                <p className="text-zinc-500 text-xs mt-1">Avg. monthly saved</p>
              </div>
            </div>

            {/* Status bar */}
            <div className="flex items-center gap-3 px-5 py-3 bg-zinc-900/40 border border-white/5 rounded-xl">
              <div className="w-2 h-2 bg-[#00E5C0] rounded-full animate-pulse" />
              <span className="text-zinc-400 text-xs">Real-time sync across all platforms</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
