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
    <section className={`py-16 md:py-32 overflow-hidden border-t relative transition-colors duration-500 ${
      isDark ? "bg-black border-white/5" : "bg-white border-indigo-100/50"
    }`}>
      {/* Immersive Background Architecture */}
      <div className={`absolute top-0 right-0 w-[800px] h-[400px] blur-[160px] rounded-full pointer-events-none transition-colors ${
        isDark ? "bg-indigo-500/5" : "bg-indigo-500/10"
      }`} />
      <div className={`absolute inset-0 bg-[url('/grid.svg')] bg-center pointer-events-none transition-opacity ${isDark ? "opacity-[0.02]" : "opacity-[0.01]"}`} />

      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 relative z-10">
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
              isDark ? "bg-[#00E5C0]/10 border-[#00E5C0]/20" : "bg-teal-50 border-teal-200"
            }`}>
              <div className="absolute inset-0 bg-[#00E5C0]/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
              <ActivitySquare className="w-5 h-5 text-[#00E5C0] relative z-10" />
            </div>
            <span className={`text-[11px] font-black uppercase tracking-[0.5em] transition-colors ${
              isDark ? "text-[#00E5C0]" : "text-teal-600"
            }`}>
              Customer Reviews
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className={`text-4xl sm:text-5xl lg:text-[90px] font-black tracking-tighter leading-[0.85] uppercase transition-colors duration-500 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Proof of <br className="hidden lg:block" />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
              isDark ? "from-white via-zinc-400 to-zinc-800" : "from-indigo-600 via-indigo-400 to-slate-400"
            }`}>
              Success.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed italic transition-colors duration-500 ${
              isDark ? "text-zinc-600" : "text-slate-500"
            }`}
          >
            Trusted by leading AI agencies. See what our customers say about 
            our smart tools and how they saved money.
          </motion.p>
        </motion.div>

        {/* Real Success Stories */}
        <div className="flex gap-4 md:gap-8 px-6 md:px-8 overflow-x-auto pb-12 snap-x no-scrollbar">
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
              className={`min-w-[280px] sm:min-w-[420px] max-w-[320px] sm:max-w-none snap-center backdrop-blur-[60px] border rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 flex flex-col group transition-all duration-700 shadow-3xl hover:-translate-y-2 md:hover:-translate-y-4 cursor-default ${
                isDark 
                  ? "bg-zinc-950/40 border-white/5 hover:bg-zinc-900/40 hover:border-[#00E5C0]/20" 
                  : "bg-white border-indigo-100/30 hover:bg-white hover:border-indigo-300 shadow-xl shadow-indigo-100/10"
              }`}
            >
              <div className="flex justify-between items-start mb-8 md:mb-10">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-3.5 h-3.5 md:w-4 h-4 text-[#00E5C0] fill-[#00E5C0]"
                    />
                  ))}
                </div>
                <div className={`px-4 md:px-5 py-1.5 md:py-2 rounded-full border text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-all duration-700 ${
                  isDark ? "bg-white/5 border-white/10 text-zinc-700 group-hover:text-[#00E5C0]" : "bg-teal-50 border-teal-100 text-teal-600 group-hover:bg-teal-100"
                }`}>
                  {t.metric}
                </div>
              </div>

              <div className="relative mb-8 md:mb-12">
                <Quote className={`absolute -top-4 -left-4 md:-top-6 md:-left-6 w-8 h-8 md:w-12 md:h-12 text-white/5 transition-colors duration-1000 ${
                  isDark ? "group-hover:text-[#00E5C0]/10" : "group-hover:text-indigo-500/10 text-indigo-500/5"
                }`} />
                <p className={`text-lg md:text-xl font-black uppercase tracking-tighter leading-relaxed italic transition-colors duration-700 ${
                   isDark ? "text-white group-hover:text-zinc-200" : "text-slate-900 group-hover:text-indigo-900"
                }`}>
                  "{t.quote}"
                </p>
              </div>

              <div className={`mt-auto flex items-center gap-4 md:gap-5 pt-6 md:pt-8 border-t ${
                isDark ? "border-white/5" : "border-indigo-50"
              }`}>
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-[1.2rem] md:rounded-[1.5rem] border flex items-center justify-center shadow-inner transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 ${
                  isDark ? "bg-zinc-950 border-white/5" : "bg-indigo-50 border-indigo-100"
                }`}>
                  <span className={`text-lg font-black transition-colors ${
                    isDark ? "text-white" : "text-indigo-600"
                  }`}>
                    {t.initials}
                  </span>
                </div>
                <div className="text-left space-y-1">
                  <p className={`text-base md:text-lg font-black uppercase tracking-tighter leading-none transition-colors ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>
                    {t.name}
                  </p>
                  <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] leading-none transition-colors ${
                    isDark ? "text-zinc-700" : "text-indigo-300"
                  }`}>
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
          className={`mt-20 flex flex-wrap justify-center items-center gap-6 md:gap-10 text-[10px] font-black uppercase tracking-[0.5em] transition-colors duration-500 ${
            isDark ? "text-zinc-800" : "text-indigo-300"
          }`}
        >
          <div className="flex items-center gap-4 group">
            <ShieldCheck className="w-5 h-5 text-[#00E5C0] group-hover:scale-110 transition-transform" />
            <span className={isDark ? "" : "text-indigo-400"}>Verified Operator Identity</span>
          </div>
          <div className={`w-1 h-1 rounded-full ${isDark ? "bg-zinc-900" : "bg-indigo-100"}`} />
          <div className="flex items-center gap-4 group">
            <Layers className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
            <span className={isDark ? "" : "text-indigo-400"}>Scaling 50+ Global Nodes</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
