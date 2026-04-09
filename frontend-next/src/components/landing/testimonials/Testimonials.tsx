"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Terminal,
  ShieldCheck,
  ActivitySquare,
  Quote,
  Star,
  Layers,
  Activity,
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

const testimonials = [
  {
    name: "Ahmed R.",
    title: "GHL Agency Owner",
    quote:
      "AnasFlow reduced our monthly AI spend by 38%! Client retention naturally boosted when we started sending the automated ROI PDFs.",
    initials: "AR",
    metric: "38% Spend Redux",
  },
  {
    name: "Sarah Khan",
    title: "Automation Expert",
    quote:
      "Zapier and n8n combined billing was a nightmare. This diagnostic dashboard gives me perfect clarity in 1 click.",
    initials: "SK",
    metric: "100% Visibility",
  },
  {
    name: "David T.",
    title: "Digital Marketing Lead",
    quote:
      "The PDF reports make me look like a wizard to my clients. Worth exactly 10x its subscription cost in retention alone.",
    initials: "DT",
    metric: "10x Yield ROI",
  },
  {
    name: "Usman A.",
    title: "CEO, Growth AI",
    quote:
      "The optimization suggestions alone saved me enough to pay for my entire tech stack this month. Absolute game changer.",
    initials: "UA",
    metric: "$2.4k Saved/mo",
  },
];

const Testimonials = () => {
  return (
    <section className="py-32 bg-black overflow-hidden border-t border-white/5 relative">
      {/* Immersive Background Architecture */}
      <div className="absolute top-0 right-0 w-[800px] h-[400px] bg-indigo-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
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
            <div className="w-10 h-10 bg-[#00E5C0]/10 border border-[#00E5C0]/20 rounded-xl flex items-center justify-center relative group overflow-hidden">
              <div className="absolute inset-0 bg-[#00E5C0]/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
              <ActivitySquare className="w-5 h-5 text-[#00E5C0] relative z-10" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#00E5C0]">
              Yield Validation // Signal Confirmed
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-7xl lg:text-[110px] font-black tracking-tighter text-white leading-[0.85] uppercase"
          >
            Proof of <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">
              Dominance.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto font-medium leading-relaxed italic"
          >
            Trusted by surgical AI agencies. High-fidelity testimonials from
            leaders scale on our liquid intelligence protocol.
          </motion.p>
        </motion.div>

        {/* Cinematic Proof Matrix */}
        <div className="flex gap-8 px-8 overflow-x-auto pb-12 snap-x no-scrollbar">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.8,
              }}
              className="min-w-[420px] snap-center bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[4rem] p-12 flex flex-col group hover:bg-zinc-900/40 hover:border-[#00E5C0]/20 transition-all duration-700 shadow-3xl hover:-translate-y-4 cursor-default"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 text-[#00E5C0] fill-[#00E5C0]"
                    />
                  ))}
                </div>
                <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-zinc-700 uppercase tracking-widest group-hover:text-[#00E5C0] transition-colors duration-700">
                  {t.metric}
                </div>
              </div>

              <div className="relative mb-12">
                <Quote className="absolute -top-6 -left-6 w-12 h-12 text-white/5 group-hover:text-[#00E5C0]/10 transition-colors duration-1000" />
                <p className="text-white text-xl font-black uppercase tracking-tighter leading-relaxed italic group-hover:text-zinc-200 transition-colors duration-700">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-auto flex items-center gap-5 pt-8 border-t border-white/5">
                <div className="w-16 h-16 rounded-[1.5rem] bg-zinc-950 border border-white/5 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
                  <span className="text-xl font-black text-white">
                    {t.initials}
                  </span>
                </div>
                <div className="text-left space-y-1">
                  <p className="text-lg font-black text-white uppercase tracking-tighter leading-none">
                    {t.name}
                  </p>
                  <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.4em] leading-none">
                    {t.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Network Status */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-20 flex justify-center items-center gap-10 text-zinc-800 text-[10px] font-black uppercase tracking-[0.5em]"
        >
          <div className="flex items-center gap-4 group">
            <ShieldCheck className="w-5 h-5 text-[#00E5C0] group-hover:scale-110 transition-transform" />
            <span>Verified Operator Identity</span>
          </div>
          <div className="w-1 h-1 bg-zinc-900 rounded-full" />
          <div className="flex items-center gap-4 group">
            <Layers className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
            <span>Scaling 50+ Global Nodes</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
