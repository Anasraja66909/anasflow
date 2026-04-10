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
    iconUrl: "https://cdn.simpleicons.org/anthropic/white",
    category: "AI Node",
    live: true,
  },
  {
    name: "OpenAI",
    iconUrl: "https://cdn.simpleicons.org/openai/white",
    category: "AI Node",
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
    iconUrl: "https://cdn.simpleicons.org/make/white",
    category: "Automation",
    live: true,
  },
  {
    name: "Gemini",
    iconUrl: "https://cdn.simpleicons.org/google/4285F4",
    category: "AI Node",
    live: true,
  },
  {
    name: "Grok",
    iconUrl: "https://cdn.simpleicons.org/x/white",
    category: "AI Node",
    live: true,
  },
  {
    name: "HubSpot",
    iconUrl: "https://cdn.simpleicons.org/hubspot/FF7A59",
    category: "CRM Portal",
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
  { name: "GHL", iconUrl: "", category: "CRM Portal" },
  {
    name: "Salesforce",
    iconUrl: "https://cdn.simpleicons.org/salesforce/00A1E0",
    category: "CRM Portal",
  },
  {
    name: "Notion",
    iconUrl: "https://cdn.simpleicons.org/notion/white",
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
    category: "Email Hub",
  },
  {
    name: "Perplexity",
    iconUrl: "https://cdn.simpleicons.org/perplexity/262626",
    category: "Search Node",
  },
];

const SupportedPlatforms = () => {
  return (
    <section className="py-16 md:py-32 bg-black relative border-b border-white/5 overflow-hidden">
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
              Universal Platform Matrix // Established
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-[90px] font-black tracking-tighter text-white leading-[0.85] uppercase"
          >
            Platform <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">
              Interlink.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto font-medium leading-relaxed italic"
          >
            AnasFlow established sub-second connectivity with 30+ production
            nodes. Surgical integration for high-fidelity ROI diagnostic
            scaling.
          </motion.p>
        </motion.div>

        {/* Neural Platform Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
        >
          {platforms.map((p, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-12 flex flex-col items-center justify-center transition-all duration-700 relative group cursor-default shadow-3xl hover:bg-zinc-900/40 hover:border-[#00E5C0]/20 hover:-translate-y-2 md:hover:-translate-y-4`}
            >


              <div className="w-16 h-16 md:w-24 md:h-24 bg-zinc-950 border border-white/5 rounded-[1.2rem] md:rounded-[2rem] flex items-center justify-center mb-6 md:mb-8 p-4 md:p-6 shadow-inner group-hover:scale-[1.1] transition-transform duration-700 relative overflow-hidden group-hover:border-[#00E5C0]/20">
                <div className="absolute inset-0 bg-[#00E5C0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[30px] rounded-full" />
                {p.name === "GHL" ? (
                  <span className="font-black text-xl md:text-3xl tracking-tighter text-white relative z-10 group-hover:text-[#00E5C0] transition-colors">
                    GHL
                  </span>
                ) : p.name === "OpenAI" ? (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo_White.svg"
                    alt={p.name}
                    className="w-full h-full object-contain relative z-10 opacity-40 group-hover:opacity-100 transition-opacity duration-700"
                  />
                ) : (
                  <img
                    src={p.iconUrl}
                    alt={p.name}
                    className="w-full h-full object-contain relative z-10 opacity-30 group-hover:opacity-100 transition-opacity duration-700"
                  />
                )}
              </div>

              <div className="space-y-1 md:space-y-2 text-center">
                <h3 className="text-white font-black text-lg md:text-2xl uppercase tracking-tighter group-hover:text-[#00E5C0] transition-colors duration-700 leading-none">
                  {p.name}.
                </h3>
                <p className="text-zinc-700 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] italic group-hover:text-zinc-500 transition-colors duration-700">
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
          className="mt-24 py-8 px-12 bg-zinc-950/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] inline-flex items-center gap-10 shadow-3xl text-zinc-700 text-[10px] font-black uppercase tracking-[0.5em]"
        >
          <div className="flex items-center gap-4 group">
            <Layers className="w-5 h-5 text-indigo-500 group-hover:scale-125 transition-transform" />
            <span>30+ Production Nodes</span>
          </div>
          <div className="w-1 h-1 bg-zinc-800 rounded-full" />
          <div className="flex items-center gap-4 group">
            <RefreshCw className="w-5 h-5 text-[#00E5C0] group-hover:rotate-180 transition-transform duration-1000" />
            <span>Weekly Expansion Sync</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SupportedPlatforms;
