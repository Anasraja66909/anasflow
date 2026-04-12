"use client";

import React, { useState, useEffect } from "react";
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
    desc: "Perfect for single agency founders starting their business.",
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
    desc: "Fast growth for professional automation teams.",
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
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
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
      id="pricing"
      className={`py-16 md:py-32 relative overflow-hidden border-t transition-colors duration-500 ${
        isDark ? "bg-black border-white/5" : "bg-white border-indigo-100/50"
      }`}
    >
      {/* Immersive Background Architecture */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[1200px] h-[300px] md:h-[600px] blur-[100px] md:blur-[180px] rounded-full pointer-events-none transition-colors duration-1000 ${
        isDark ? "bg-indigo-500/5" : "bg-indigo-500/10"
      }`} />
      <div className={`absolute inset-0 bg-[url('/grid.svg')] bg-center pointer-events-none transition-opacity ${isDark ? "opacity-[0.02]" : "opacity-[0.01]"}`} />

      <div className="max-w-screen-2xl mx-auto px-6 md:px-8 relative z-10">
        {/* Aggressive Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24 space-y-6 md:space-y-8"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-4 mx-auto"
          >
            <div className={`w-10 h-10 border rounded-xl flex items-center justify-center relative group overflow-hidden transition-all ${
              isDark ? "bg-indigo-500/10 border-indigo-500/20" : "bg-indigo-50 border-indigo-200"
            }`}>
              <div className="absolute inset-0 bg-indigo-500/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
              <Crown className="w-5 h-5 text-indigo-400 relative z-10" />
            </div>
            <span className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] transition-colors ${
              isDark ? "text-indigo-400/60" : "text-indigo-600"
            }`}>
              Simple Pricing
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className={`text-4xl sm:text-6xl lg:text-7xl xl:text-[90px] font-black tracking-tighter leading-[1] md:leading-[0.85] uppercase break-words transition-colors duration-500 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Your Growth <br className="hidden lg:block" />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
              isDark ? "from-white via-zinc-400 to-zinc-800" : "from-indigo-600 via-indigo-400 to-slate-400"
            }`}>
              Choose Your Plan.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed italic transition-colors duration-500 ${
              isDark ? "text-zinc-600" : "text-slate-500"
            }`}
          >
            Select your agency's business size. Accurate profit reports 
            and automated smart tips for teams that refuse to guess.
          </motion.p>
        </motion.div>

        {/* Easy Billing Toggle */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center mb-12 md:mb-16"
        >
          <div className={`flex items-center gap-2 backdrop-blur-3xl border p-1.5 sm:p-2 rounded-full shadow-2xl overflow-hidden transition-all duration-700 ${
            isDark ? "bg-zinc-950/40 border-white/5" : "bg-indigo-50 border-indigo-100"
          }`}>
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 sm:px-10 py-3 sm:py-5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] transition-all duration-700 ${
                billingCycle === "monthly" 
                  ? (isDark ? "bg-white text-black shadow-3xl" : "bg-indigo-600 text-white shadow-xl") 
                  : (isDark ? "text-zinc-600 hover:text-white" : "text-indigo-300 hover:text-indigo-600")
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 sm:px-10 py-3 sm:py-5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] transition-all duration-700 ${
                billingCycle === "yearly" 
                  ? (isDark ? "bg-white text-black shadow-3xl" : "bg-indigo-600 text-white shadow-xl") 
                  : (isDark ? "text-zinc-600 hover:text-white" : "text-indigo-300 hover:text-indigo-600")
              }`}
            >
              Yearly{" "}
              <span className="text-[#00E5C0] ml-1 sm:ml-2 font-black">-20%</span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto"
        >
          {PLANS.map((plan) => {
            const price =
              billingCycle === "yearly" ? plan.priceYearly : plan.price;
            return (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                className={`backdrop-blur-[60px] border rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 flex flex-col justify-between overflow-hidden group/plan transition-all duration-700 relative group ${
                  plan.badge ? "ring-2 ring-[#00E5C0]/40" : ""
                } ${
                  isDark 
                    ? "bg-zinc-950/40 border-white/5 hover:bg-zinc-900/40 shadow-[0_50px_150px_rgba(0,0,0,0.6)]" 
                    : "bg-white/70 border-indigo-100/50 hover:bg-white hover:border-indigo-300 shadow-[0_20px_50px_rgba(99,102,241,0.05)] hover:shadow-[0_40px_80px_rgba(99,102,241,0.1)]"
                }`}
              >
                {plan.badge && (
                  <div className={`absolute top-8 md:top-10 right-8 md:right-10 px-4 sm:px-5 py-2 bg-[#00E5C0] text-black text-[8px] sm:text-[9px] font-black uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(0,229,192,0.4)] transition-all duration-700`}>
                    {plan.badge}
                  </div>
                )}

                <div className="text-left space-y-6">
                  <h3
                    className={`text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none transition-colors duration-500 ${
                      plan.accent || (isDark ? "text-white" : "text-slate-900")
                    }`}
                  >
                    {plan.name}.
                  </h3>
                  <p className={`text-base md:text-lg font-medium leading-relaxed italic pr-12 transition-colors duration-500 ${
                    isDark ? "text-zinc-600" : "text-slate-500"
                  }`}>
                    {plan.desc}
                  </p>

                  <div className="pt-8 md:pt-10 pb-10 md:pb-12 flex items-baseline gap-3">
                    <span className={`text-5xl md:text-7xl font-black tracking-tighter transition-colors duration-500 ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}>
                      ${price}
                    </span>
                    <span className={`font-black uppercase tracking-[0.4em] text-[9px] md:text-[10px] transition-colors duration-500 ${
                      isDark ? "text-zinc-800" : "text-slate-300"
                    }`}>
                      /{billingCycle === "yearly" ? "ANN" : "MO"}
                    </span>
                  </div>

                  <div className={`space-y-4 md:space-y-6 pb-10 md:pb-12 border-b transition-colors duration-500 ${
                    isDark ? "border-white/5" : "border-indigo-50"
                  }`}>
                    {plan.features.map((f) => (
                      <div
                        key={f}
                        className={`flex items-center gap-4 sm:gap-5 transition-colors duration-700 ${
                          isDark ? "text-zinc-500 group-hover:text-zinc-300" : "text-slate-500 group-hover:text-slate-900"
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#00E5C0]" />
                        <span className="text-[12px] sm:text-sm font-black uppercase tracking-tighter">
                          {f}
                        </span>
                      </div>
                    ))}
                    {plan.missing.map((f) => (
                      <div
                        key={f}
                        className={`flex items-center gap-4 sm:gap-5 transition-colors duration-700 ${
                          isDark ? "text-zinc-800" : "text-slate-200"
                        }`}
                      >
                        <XCircle className="w-4 h-4 sm:w-5 sm:h-5 opacity-20" />
                        <span className="text-[12px] sm:text-sm font-black uppercase tracking-tighter opacity-20">
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="/register"
                  className={`w-full mt-10 md:mt-12 py-6 md:py-8 rounded-[2rem] text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] transition-all duration-700 flex items-center justify-center gap-4 sm:gap-6 shadow-2xl active:scale-95 ${
                    plan.badge
                      ? "bg-[#00E5C0] text-black hover:bg-slate-900 hover:text-white shadow-[#00E5C0]/30"
                      : (isDark ? "bg-white text-black hover:bg-[#00E5C0]" : "bg-indigo-600 text-white hover:bg-slate-900")
                  }`}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-3" />
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
          className={`mt-16 md:mt-24 p-8 md:p-12 backdrop-blur-[60px] border rounded-[3rem] md:rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 max-w-5xl mx-auto shadow-3xl text-center md:text-left transition-all duration-700 ${
            isDark ? "bg-zinc-950/40 border-white/5" : "bg-indigo-50 border-indigo-100/50 shadow-xl shadow-indigo-100/10"
          }`}
        >
          <div className="space-y-3">
            <h4 className={`text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none transition-colors duration-500 ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              Enterprise Plan.
            </h4>
            <p className={`text-sm md:text-base font-medium italic transition-colors duration-500 ${
              isDark ? "text-zinc-600" : "text-slate-500"
            }`}>
              Custom features for large teams and dedicated support.
            </p>
          </div>
          <button className={`w-full md:w-auto px-10 md:px-12 py-5 md:py-6 border rounded-[1.5rem] md:rounded-[1.75rem] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 sm:gap-6 group shadow-xl ${
            isDark ? "bg-zinc-900 border-white/5 text-zinc-400 hover:text-white" : "bg-white border-indigo-100 text-indigo-400 hover:text-indigo-600 hover:border-indigo-300"
          }`}>
            Contact Us
            <ActivitySquare className={`w-4 h-4 transition-colors ${
              isDark ? "text-zinc-600 group-hover:text-white" : "text-indigo-200 group-hover:text-indigo-600"
            }`} />
          </button>
        </motion.div>
      </div>
    </section>

  );
};

export default Pricing;
