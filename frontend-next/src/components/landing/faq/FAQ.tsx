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
  const [isDark, setIsDark] = useState(false);

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
      id="faq"
      className={`py-16 md:py-32 border-y relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-black border-white/5" : "bg-white border-indigo-100/50"
      }`}
    >
      {/* Immersive Background Architecture */}
      <div className={`absolute top-0 right-1/4 w-[800px] h-[300px] blur-[160px] rounded-full pointer-events-none transition-colors ${
        isDark ? "bg-[#00E5C0]/5" : "bg-[#00E5C0]/10"
      }`} />
      <div className={`absolute inset-0 bg-[url('/grid.svg')] bg-center pointer-events-none transition-opacity ${isDark ? "opacity-[0.02]" : "opacity-[0.01]"}`} />

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        {/* Aggressive Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-24 space-y-8"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-4 mx-auto"
          >
            <div className={`w-10 h-10 border rounded-xl flex items-center justify-center relative group overflow-hidden transition-all ${
              isDark ? "bg-zinc-950 border-white/5" : "bg-indigo-50 border-indigo-100"
            }`}>
              <div className="absolute inset-0 bg-indigo-500/5 blur-xl group-hover:scale-150 transition-transform duration-1000" />
              <HelpCircle className={`w-5 h-5 relative z-10 transition-colors ${isDark ? "text-zinc-600" : "text-indigo-400"}`} />
            </div>
            <span className={`text-[11px] font-black uppercase tracking-[0.5em] transition-colors duration-500 ${
              isDark ? "text-zinc-600" : "text-indigo-600"
            }`}>
              Protocol Clarification // Inquiries
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className={`text-4xl sm:text-5xl lg:text-[90px] font-black tracking-tighter leading-[0.85] uppercase transition-colors duration-500 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Frequently <br className="hidden lg:block" />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
              isDark ? "from-white via-zinc-400 to-zinc-800" : "from-indigo-600 via-indigo-400 to-slate-400"
            }`}>
              Inquired.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed italic transition-colors duration-500 ${
              isDark ? "text-zinc-600" : "text-slate-500"
            }`}
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
              className={`group transition-all duration-700 backdrop-blur-[60px] border rounded-[2.5rem] overflow-hidden ${
                openIdx === i 
                  ? (isDark ? "border-[#00E5C0]/40 shadow-3xl bg-zinc-950/40" : "border-indigo-400 shadow-xl shadow-indigo-100 bg-white") 
                  : (isDark ? "border-white/5 hover:border-white/20 bg-zinc-950/40" : "border-indigo-50 hover:border-indigo-200 bg-white/60")
              }`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-10 md:p-12 text-left transition-all duration-700 active:scale-[0.99]"
              >
                <div className="space-y-3 pr-8">
                  <div className="flex items-center gap-4">
                    <span className={`text-[9px] font-black uppercase tracking-[0.3em] transition-colors ${
                      isDark ? "text-zinc-800 group-hover:text-[#00E5C0]" : "text-indigo-300 group-hover:text-indigo-600"
                    }`}>
                      {f.label}
                    </span>
                  </div>
                  <span className={`font-black uppercase tracking-tighter text-2xl md:text-3xl leading-none transition-colors duration-500 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>
                    {f.q}
                  </span>
                </div>
                <div
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-700 shrink-0 ${
                    openIdx === i 
                      ? (isDark ? "bg-[#00E5C0] border-transparent shadow-2xl rotate-180" : "bg-indigo-600 border-transparent shadow-xl rotate-180") 
                      : (isDark ? "bg-zinc-950 border-white/5 group-hover:border-white/20" : "bg-indigo-50 border-indigo-100 group-hover:bg-indigo-100")
                  }`}
                >
                  <ChevronDown
                    className={`transition-colors duration-700 ${
                      openIdx === i 
                        ? (isDark ? "text-black" : "text-white") 
                        : (isDark ? "text-zinc-700" : "text-indigo-400")
                    }`}
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
                    <div className={`px-10 pb-12 md:px-12 md:pb-16 text-lg font-medium leading-relaxed italic border-t pt-8 max-w-2xl transition-colors duration-500 ${
                      isDark ? "text-zinc-600 border-white/5" : "text-slate-600 border-indigo-50"
                    }`}>
                      <span className={`mr-4 font-black uppercase tracking-widest text-[10px] ${
                        isDark ? "text-[#00E5C0]" : "text-indigo-600"
                      }`}>
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
          <div className={`inline-flex flex-wrap justify-center items-center gap-4 md:gap-8 py-4 md:py-6 px-8 md:px-12 backdrop-blur-3xl border rounded-full text-[10px] font-black uppercase tracking-[0.5em] transition-all duration-700 ${
            isDark ? "bg-zinc-950/40 border-white/5 text-zinc-800" : "bg-indigo-50 border-indigo-100 text-indigo-300"
          }`}>
            <div className={`flex items-center gap-4 group cursor-pointer transition-colors ${
              isDark ? "hover:text-white" : "hover:text-indigo-600"
            }`}>
              <ShieldCheck className={`w-5 h-5 transition-colors ${isDark ? "text-indigo-500 group-hover:text-white" : "text-indigo-600 group-hover:text-indigo-900"}`} />
              <span>
                Enterprise Security Grid
              </span>
            </div>
            <div className={`w-1 h-1 rounded-full ${isDark ? "bg-zinc-900" : "bg-indigo-100"}`} />
            <div className={`flex items-center gap-4 group cursor-pointer transition-colors ${
              isDark ? "hover:text-white" : "hover:text-indigo-600"
            }`}>
              <ActivitySquare className={`w-5 h-5 transition-colors ${isDark ? "text-[#00E5C0] group-hover:text-white" : "text-teal-500 group-hover:text-teal-700"}`} />
              <span>
                24/7 Node Heartbeat
              </span>
            </div>
          </div>

          <div className="pt-8">
            <p className={`font-medium italic transition-colors duration-500 ${
              isDark ? "text-zinc-600" : "text-slate-500"
            }`}>
              Still have inquiries?{" "}
              <a
                href="/help"
                className={`transition-colors font-black uppercase tracking-widest ml-1 ${
                  isDark ? "text-white hover:text-[#00E5C0]" : "text-indigo-600 hover:text-slate-900"
                }`}
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
