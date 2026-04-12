"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Activity,
  Zap,
  CheckCircle2,
  Sparkles,
  Terminal,
  ShieldCheck,
  ActivitySquare,
  Cpu,
  Target,
  Search,
  RefreshCw,
  Globe,
  Layers,
  Server,
  Fingerprint,
} from "lucide-react";

// Senior Dev Standard: Unified motion tokens
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

type Platform = {
  name: string;
  iconUrl: string;
  category: string;
  live?: boolean;
  upcoming?: boolean;
};

const platforms: Platform[] = [
  {
    name: "Claude AI",
    iconUrl: "https://cdn.simpleicons.org/anthropic/C0A882",
    category: "AI Tool",
    live: true,
  },
  {
    name: "OpenAI",
    iconUrl: "https://cdn.simpleicons.org/openai/10A37F",
    category: "AI Tool",
    live: true,
  },
  {
    name: "n8n",
    iconUrl: "https://cdn.simpleicons.org/n8n/EA4B71",
    category: "Automation",
    live: true,
  },
  {
    name: "Zapier",
    iconUrl: "https://cdn.simpleicons.org/zapier/FF4A00",
    category: "Automation",
    live: true,
  },
  {
    name: "Make",
    iconUrl: "https://cdn.simpleicons.org/make/7347FF",
    category: "Automation",
    live: true,
  },
  {
    name: "Gemini",
    iconUrl: "https://cdn.simpleicons.org/google/4285F4",
    category: "AI Tool",
    live: true,
  },
  {
    name: "Grok",
    iconUrl: "https://cdn.simpleicons.org/x/FFFFFF",
    category: "AI Tool",
    live: true,
  },
  {
    name: "HubSpot",
    iconUrl: "https://cdn.simpleicons.org/hubspot/FF7A59",
    category: "CRM",
    live: true,
  },
  {
    name: "Shopify",
    iconUrl: "https://cdn.simpleicons.org/shopify/95BF47",
    category: "E-Commerce",
  },
  {
    name: "Stripe",
    iconUrl: "https://cdn.simpleicons.org/stripe/635BFF",
    category: "Payments",
  },
  { name: "GHL", iconUrl: "", category: "CRM" },
  {
    name: "Salesforce",
    iconUrl: "https://cdn.simpleicons.org/salesforce/00A1E0",
    category: "CRM",
  },
  {
    name: "Notion",
    iconUrl: "https://cdn.simpleicons.org/notion/FFFFFF",
    category: "Workspace",
  },
  {
    name: "Airtable",
    iconUrl: "https://cdn.simpleicons.org/airtable/18BFFF",
    category: "Database",
  },
  {
    name: "Mailchimp",
    iconUrl: "https://cdn.simpleicons.org/mailchimp/FFE01B",
    category: "Email Tool",
  },
  {
    name: "Perplexity",
    iconUrl: "https://cdn.simpleicons.org/perplexity/20B2AA",
    category: "Search Tool",
  },
];

const SupportedPlatforms = () => {
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
    <section 
      className={`py-16 md:py-32 relative border-b overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-black border-white/5" : "bg-[#f8faff] border-indigo-100/50"
      }`}
      style={!isDark ? {background: 'linear-gradient(180deg, #f8faff 0%, #f0f4ff 100%)'} : {}}
    >
      {/* Immersive Background Architecture */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-[#00E5C0]/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 relative z-10 text-center">
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
            <div className="w-10 h-10 bg-[#00E5C0]/10 border border-[#00E5C0]/20 rounded-xl flex items-center justify-center relative group overflow-hidden">
              <div className="absolute inset-0 bg-[#00E5C0]/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
              <Globe className="w-5 h-5 text-[#00E5C0] relative z-10" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#00E5C0]">
              All Supported Tools
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-[90px] font-black tracking-tighter text-slate-900 leading-[0.85] uppercase"
          >
            Platform <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-slate-500 to-slate-300">
              Connections.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto font-medium leading-relaxed italic"
          >
            AnasFlow connects with 30+ popular tools to track your 
            costs in real-time. Simple setup for better profit tracking.
          </motion.p>
        </motion.div>

        {/* Our Tools Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {platforms.map((p, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`bg-white/60 backdrop-blur-[60px] border border-indigo-100/60 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-12 flex flex-col items-center justify-center transition-all duration-700 relative group cursor-default shadow-lg hover:shadow-xl hover:shadow-indigo-100/40 hover:bg-white/90 hover:border-indigo-200/80 hover:-translate-y-2 md:hover:-translate-y-4`}
            >


              <div 
                className={`w-16 h-16 md:w-24 md:h-24 rounded-[1.2rem] md:rounded-[2rem] flex items-center justify-center mb-6 md:mb-8 p-3 sm:p-4 md:p-5 group-hover:scale-[1.1] transition-all duration-700 relative overflow-hidden border`}
                style={{
                  background: isDark 
                    ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)' 
                    : 'linear-gradient(135deg, #f5f7ff 0%, #ebf0ff 100%)',
                  borderColor: isDark ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.1)'
                }}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[30px] rounded-full ${
                  isDark ? "bg-[#00E5C0]/5" : "bg-indigo-500/10"
                }`} />
                {p.name === "GHL" ? (
                  <span className={`font-black text-xl md:text-3xl tracking-tighter relative z-10 transition-colors ${
                    isDark ? "text-white group-hover:text-[#00E5C0]" : "text-indigo-600 group-hover:text-indigo-800"
                  }`}>
                    GHL
                  </span>
                ) : (
                  <img
                    src={isDark ? p.iconUrl : p.iconUrl.replace('/FFFFFF', '/000000').replace('/anthropic/C0A882', '/anthropic').replace('/openai/10A37F', '/openai')}
                    alt={p.name}
                    className="w-full h-full object-contain relative z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                  />
                )}
              </div>

              <div className="space-y-1 md:space-y-2 text-center">
                <h3 className="text-slate-800 font-black text-lg md:text-2xl uppercase tracking-tighter group-hover:text-indigo-600 transition-colors duration-700 leading-none">
                  {p.name}.
                </h3>
                <p className="text-slate-400 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] italic group-hover:text-slate-600 transition-colors duration-700">
                  {p.category}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>


        {/* Global Statistics Pulse */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-24 py-8 px-12 bg-white/80 backdrop-blur-3xl border border-indigo-100 rounded-[2.5rem] inline-flex items-center gap-10 shadow-lg text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]"
        >
          <div className="flex items-center gap-4 group">
            <Layers className="w-5 h-5 text-indigo-500 group-hover:scale-125 transition-transform" />
            <span>30+ Apps Supported</span>
          </div>
          <div className="w-1 h-1 bg-zinc-800 rounded-full" />
          <div className="flex items-center gap-4 group">
            <RefreshCw className="w-5 h-5 text-[#00E5C0] group-hover:rotate-180 transition-transform duration-1000" />
            <span>Weekly Updates</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SupportedPlatforms;
