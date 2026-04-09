"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Terminal,
  ShieldCheck,
  ActivitySquare,
  HelpCircle,
  Target,
  Zap,
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
  hidden: { opacity: 0, scale: 0.98, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

const faqs = [
  {
    q: "Is this exclusively for GoHighLevel?",
    a: "No. While we maintain native GHL webhook compatibility, AnasFlow orchestrates telemetry for OpenAI, Anthropic, n8n, and Zapier nodes purely via high-fidelity API keys regardless of your stack.",
    label: "Integration Logic",
  },
  {
    q: "Do my clients need to create an account?",
    a: "Negative. You can dispatch corporate ROI whitepapers via secure link or PDF. We provide a zero-authentication gateway for client viewing to reduce friction.",
    label: "Client Gateway",
  },
  {
    q: "How much time does the initial setup take?",
    a: "Under 300 seconds. Establish a handshake with your read-only API nodes, and we instantly sync historical and live cost telemetry across your entire grid.",
    label: "Sync Latency",
  },
  {
    q: "Is there a long-term commitment?",
    a: "No. All expansion protocols are month-to-month. Furthermore, we offer a high-fidelity 30-Day Free Trial with zero credit card registration required.",
    label: "Protocol Terms",
  },
];

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-32 bg-black border-y border-white/5 relative overflow-hidden"
    >
      {/* Immersive Background Architecture */}
      <div className="absolute top-0 right-1/4 w-[800px] h-[300px] bg-[#00E5C0]/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-8 relative z-10">
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
            <div className="w-10 h-10 bg-zinc-950 border border-white/5 rounded-xl flex items-center justify-center relative group overflow-hidden">
              <div className="absolute inset-0 bg-white/5 blur-xl group-hover:scale-150 transition-transform duration-1000" />
              <HelpCircle className="w-5 h-5 text-zinc-600 relative z-10" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-600">
              Protocol Clarification // Inquiries
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-7xl lg:text-[110px] font-black tracking-tighter text-white leading-[0.85] uppercase"
          >
            Frequently <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">
              Inquired.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto font-medium leading-relaxed italic"
          >
            Surgical answers for high-scale AI agencies. Transparent protocol
            details for elite operational deployment.
          </motion.p>
        </motion.div>

        {/* Cinematic Accordion Logic */}
        <div className="space-y-6">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.8,
              }}
              className={`group transition-all duration-700 bg-zinc-950/40 backdrop-blur-[60px] border rounded-[2.5rem] overflow-hidden ${openIdx === i ? "border-[#00E5C0]/40 shadow-3xl" : "border-white/5 hover:border-white/20"}`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-10 md:p-12 text-left transition-all duration-700 active:scale-[0.99]"
              >
                <div className="space-y-3 pr-8">
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-black text-zinc-800 group-hover:text-[#00E5C0] transition-colors uppercase tracking-[0.3em]">
                      {f.label}
                    </span>
                  </div>
                  <span className="font-black text-white text-2xl uppercase tracking-tighter md:text-3xl leading-none">
                    {f.q}
                  </span>
                </div>
                <div
                  className={`w-14 h-14 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center transition-all duration-700 shrink-0 ${openIdx === i ? "bg-[#00E5C0] border-transparent shadow-2xl rotate-180" : "group-hover:border-white/20"}`}
                >
                  <ChevronDown
                    className={`transition-colors duration-700 ${openIdx === i ? "text-black" : "text-zinc-700"}`}
                    size={24}
                  />
                </div>
              </button>

              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="px-10 pb-12 md:px-12 md:pb-16 text-zinc-600 text-lg font-medium leading-relaxed italic border-t border-white/5 pt-8 max-w-2xl">
                      <span className="text-[#00E5C0] mr-4 font-black uppercase tracking-widest text-[10px]">
                        Response:
                      </span>
                      {f.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Global Support Diagnostic */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-24 text-center space-y-8"
        >
          <div className="inline-flex items-center gap-8 py-6 px-12 bg-zinc-950/40 backdrop-blur-3xl border border-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.5em] text-zinc-800">
            <div className="flex items-center gap-4 group cursor-pointer">
              <ShieldCheck className="w-5 h-5 text-indigo-500 group-hover:text-white transition-colors" />
              <span className="group-hover:text-white transition-colors">
                Enterprise Security Grid
              </span>
            </div>
            <div className="w-1 h-1 bg-zinc-900 rounded-full" />
            <div className="flex items-center gap-4 group cursor-pointer">
              <ActivitySquare className="w-5 h-5 text-[#00E5C0] group-hover:text-white transition-colors" />
              <span className="group-hover:text-white transition-colors">
                24/7 Node Heartbeat
              </span>
            </div>
          </div>

          <div className="pt-8">
            <p className="text-zinc-600 font-medium italic">
              Still have inquiries?{" "}
              <a
                href="/help"
                className="text-white hover:text-[#00E5C0] transition-colors font-black uppercase tracking-widest ml-1"
              >
                Contact Intelligence →
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
