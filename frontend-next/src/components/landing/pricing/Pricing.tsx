"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Layers,
  Bot,
  CheckCircle2,
  Zap,
  ArrowRight,
  ShieldCheck,
  Terminal,
  Sparkles,
  ActivitySquare,
  XCircle,
  Crown,
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

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    priceYearly: 279,
    desc: "Perfect for single agency founders establishing their neural footprint.",
    color: "border-white/10",
    accent: "text-zinc-500",
    features: ["Up to 5 Clients", "3 Integrations", "Cost Tracking"],
    missing: ["PDF Reports", "White-label"],
  },
  {
    id: "agency",
    name: "Agency",
    price: 79,
    priceYearly: 759,
    badge: "Most Popular",
    desc: "Surgical scaling for professional automation teams.",
    color: "border-[#00E5C0]/40",
    accent: "text-[#00E5C0]",
    features: [
      "Up to 25 Clients",
      "Unlimited Integrations",
      "1-Click PDF Reports",
      "10 AI Doctor Fixes/mo",
    ],
    missing: ["White-label Portal"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 199,
    priceYearly: 1909,
    desc: "All the tools you need to track costs and optimize your AI spending.",
    color: "border-indigo-500/40",
    accent: "text-indigo-400",
    features: [
      "100 Clients",
      "Unlimited Everything",
      "White-label Portal",
      "Custom Domain",
      "API Access",
    ],
    missing: [],
  },
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  return (
    <section
      id="pricing"
      className="py-32 bg-black relative overflow-hidden border-t border-white/5"
    >
      {/* Immersive Background Architecture */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-indigo-500/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />

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
            <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center relative group overflow-hidden">
              <div className="absolute inset-0 bg-indigo-500/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
              <Crown className="w-5 h-5 text-indigo-400 relative z-10" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-400/60">
              Simple Pricing
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-[90px] font-black tracking-tighter text-white leading-[0.85] uppercase"
          >
            Expansion <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">
              Matrix.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto font-medium leading-relaxed italic"
          >
            Select your agency's business size. accurate ROI reporting
            and automated optimization for teams that refuse to guess.
          </motion.p>
        </motion.div>

        {/* Tactical Billing Toggle */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="flex items-center gap-2 bg-zinc-950/40 backdrop-blur-3xl border border-white/5 p-2 rounded-full shadow-2xl">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-700 ${billingCycle === "monthly" ? "bg-white text-black shadow-3xl" : "text-zinc-600 hover:text-white"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-700 ${billingCycle === "yearly" ? "bg-white text-black shadow-3xl" : "text-zinc-600 hover:text-white"}`}
            >
              Yearly{" "}
              <span className="text-[#00E5C0] ml-2 font-black">-20%</span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Matrix Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
        >
          {PLANS.map((plan) => {
            const price =
              billingCycle === "yearly" ? plan.priceYearly : plan.price;
            return (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                className={`bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 flex flex-col justify-between overflow-hidden group/plan transition-all duration-700 hover:bg-zinc-900/40 shadow-[0_50px_150px_rgba(0,0,0,0.6)] relative group ${plan.badge ? "ring-2 ring-[#00E5C0]/40" : ""}`}
              >
                {plan.badge && (
                  <div className="absolute top-10 right-10 px-5 py-2 bg-[#00E5C0] text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(0,229,192,0.4)]">
                    {plan.badge}
                  </div>
                )}

                <div className="text-left space-y-6">
                  <h3
                    className={`text-5xl font-black uppercase tracking-tighter leading-none ${plan.accent || "text-white"}`}
                  >
                    {plan.name}.
                  </h3>
                  <p className="text-zinc-600 text-lg font-medium leading-relaxed italic pr-12">
                    {plan.desc}
                  </p>

                  <div className="pt-10 pb-12 flex items-baseline gap-3">
                    <span className="text-7xl font-black text-white tracking-tighter">
                      ${price}
                    </span>
                    <span className="text-zinc-800 font-black uppercase tracking-[0.4em] text-[10px]">
                      /{billingCycle === "yearly" ? "ANN" : "MO"}
                    </span>
                  </div>

                  <div className="space-y-6 pb-12 border-b border-white/5">
                    {plan.features.map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-5 text-zinc-500 group-hover:text-zinc-300 transition-colors duration-700"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#00E5C0]" />
                        <span className="text-sm font-black uppercase tracking-tighter">
                          {f}
                        </span>
                      </div>
                    ))}
                    {plan.missing.map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-5 text-zinc-800"
                      >
                        <XCircle className="w-5 h-5 opacity-20" />
                        <span className="text-sm font-black uppercase tracking-tighter opacity-20">
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="/register"
                  className={`w-full mt-12 py-8 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.5em] transition-all duration-700 flex items-center justify-center gap-6 shadow-2xl active:scale-95 ${
                    plan.badge
                      ? "bg-[#00E5C0] text-black hover:bg-white shadow-[#00E5C0]/30"
                      : "bg-white text-black hover:bg-[#00E5C0]"
                  }`}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-3" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enterprise Callout */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-24 p-12 bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-12 max-w-5xl mx-auto shadow-3xl text-left"
        >
          <div className="space-y-3">
            <h4 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">
              Enterprise Plan.
            </h4>
            <p className="text-zinc-600 font-medium italic">
              Custom features for large teams and dedicated support services.
            </p>
          </div>
          <button className="px-12 py-6 bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white rounded-[1.75rem] text-[10px] font-black uppercase tracking-[0.5em] transition-all flex items-center gap-6 group">
            Contact Us
            <ActivitySquare className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
