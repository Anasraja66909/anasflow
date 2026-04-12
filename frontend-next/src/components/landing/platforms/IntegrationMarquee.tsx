"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal } from "lucide-react";

// --- Integration Marquee (Social Proof) ---
const MarqueeLogo = ({
  p,
  isDark,
}: {
  p: { name: string; slug: string };
  isDark: boolean;
}) => {
  const [error, setError] = useState(false);

  if (error || p.slug === "ghl") {
    return (
      <div className="w-full h-full flex items-center justify-center relative z-10">
        <span className={`font-black text-xl tracking-tighter transition-colors ${
          isDark 
            ? "text-white/40 group-hover:text-white" 
            : "text-indigo-600/40 group-hover:text-indigo-600"
        }`}>
          {p.name === "GoHighLevel"
            ? "GHL"
            : p.name.substring(0, 4).toUpperCase()}
        </span>
      </div>
    );
  }

  // Senior Dev: Dynamic icons based on theme
  let imgSrc = isDark 
    ? `https://cdn.simpleicons.org/${p.slug}/white`
    : `https://cdn.simpleicons.org/${p.slug}/${p.slug === 'notion' || p.slug === 'perplexity' ? '000000' : ''}`;

  if (p.name === "OpenAI") {
    imgSrc = isDark
      ? "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo_White.svg"
      : "https://upload.wikimedia.org/wikipedia/commons/4/44/OpenAI_Logo.svg";
  }

  return (
    <img
      src={imgSrc}
      alt={p.name}
      className={`w-full h-full object-contain pointer-events-none relative z-10 transition-opacity duration-700 ${
        isDark ? "opacity-30 group-hover:opacity-100" : "opacity-60 group-hover:opacity-100"
      }`}
      onError={() => setError(true)}
    />
  );
};

const IntegrationMarquee = () => {
  const [isDark, setIsDark] = useState(false);

  React.useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    // Watch for class changes on <html>
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);
  const row1Platforms = [
    { name: "GoHighLevel", slug: "ghl" },
    { name: "HubSpot", slug: "hubspot" },
    { name: "Claude", slug: "anthropic" },
    { name: "OpenAI", slug: "openai" },
    { name: "Google", slug: "google" },
    { name: "n8n", slug: "n8n" },
    { name: "Zapier", slug: "zapier" },
    { name: "Make", slug: "make" },
  ];
  const row2Platforms = [
    { name: "Salesforce", slug: "salesforce" },
    { name: "Shopify", slug: "shopify" },
    { name: "Stripe", slug: "stripe" },
    { name: "Slack", slug: "slack" },
    { name: "Notion", slug: "notion" },
    { name: "Perplexity", slug: "perplexity" },
    { name: "Airtable", slug: "airtable" },
    { name: "Mailchimp", slug: "mailchimp" },
  ];

  const row1 = [...row1Platforms, ...row1Platforms, ...row1Platforms];
  const row2 = [...row2Platforms, ...row2Platforms, ...row2Platforms];

  return (
    <section className={`py-12 md:py-24 relative border-y overflow-hidden transition-colors duration-500 ${
      isDark ? "bg-black border-white/5" : "bg-white border-indigo-100/50"
    }`}>
      {/* Cinematic HUD Elements */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent ${!isDark && 'opacity-30'}`} />
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00E5C0]/50 to-transparent ${!isDark && 'opacity-30'}`} />

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-marquee-slow {
          animation: scroll-left 60s linear infinite;
        }
        .pause-on-hover:hover .animate-marquee-left,
        .pause-on-hover:hover .animate-marquee-slow {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-8 text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-4 mb-6">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
            isDark ? "bg-black/40 border-white/5" : "bg-indigo-50 border-indigo-100"
          }`}>
            <Terminal className={`w-4 h-4 ${isDark ? "text-zinc-600" : "text-indigo-400"}`} />
          </div>
          <span className={`text-[10px] font-black uppercase tracking-[0.5em] ${
            isDark ? "text-zinc-600" : "text-indigo-400"
          }`}>
            Protocol Connectivity Nodes
          </span>
        </div>
        <h3 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4 ${
          isDark ? "text-white" : "text-slate-900"
        }`}>
          Universal{" "}
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
            isDark ? "from-white via-zinc-400 to-zinc-800" : "from-indigo-600 via-indigo-400 to-slate-400"
          }`}>
            Interlink.
          </span>
        </h3>
        <p className={`text-xs font-black uppercase tracking-[0.3em] ${
          isDark ? "text-zinc-700" : "text-slate-400"
        }`}>
          Mapping 30+ Production Platforms
        </p>
      </div>

      <div className="relative w-full max-w-screen-2xl mx-auto pause-on-hover flex flex-col gap-10">
        {/* Cinematic Edge Masks */}
        <div className={`absolute left-0 top-0 bottom-0 w-40 md:w-80 z-20 pointer-events-none bg-gradient-to-r from-inherit to-transparent transition-colors duration-500 ${
          isDark ? "from-black via-black/80" : "from-white via-white/80"
        }`} />
        <div className={`absolute right-0 top-0 bottom-0 w-40 md:w-80 z-20 pointer-events-none bg-gradient-to-l from-inherit to-transparent transition-colors duration-500 ${
          isDark ? "from-black via-black/80" : "from-white via-white/80"
        }`} />

        {/* Row 1: Left Scrolling */}
        <div className="flex w-max animate-marquee-left items-center [will-change:transform]">
          {row1.map((p, i) => (
            <div
              key={`r1-${i}`}
              className={`w-36 h-18 md:w-56 md:h-28 mx-4 md:mx-6 flex items-center justify-center backdrop-blur-[40px] border rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group transition-all duration-700 cursor-pointer ${
                isDark 
                  ? "bg-black border-white/5 hover:border-indigo-400/40 hover:bg-black" 
                  : "bg-white/60 border-indigo-100/60 hover:border-indigo-400 hover:bg-white hover:shadow-indigo-100/50"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
              <MarqueeLogo p={p} isDark={isDark} />
            </div>
          ))}
        </div>

        {/* Row 2: Slower Scrolling */}
        <div className="flex w-max animate-marquee-slow items-center [will-change:transform]">
          {row2.map((p, i) => (
            <div
              key={`r2-${i}`}
              className={`w-32 h-16 md:w-48 md:h-24 mx-4 md:mx-6 flex items-center justify-center backdrop-blur-[40px] border rounded-[2rem] p-6 shadow-2xl relative overflow-hidden group transition-all duration-700 cursor-pointer ${
                isDark 
                  ? "bg-zinc-950/40 border-white/5 hover:border-[#00E5C0]/40 hover:bg-zinc-900/40" 
                  : "bg-white/60 border-indigo-100/60 hover:border-[#00E5C0]/40 hover:bg-white hover:shadow-indigo-100/50"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-[#00E5C0]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
              <MarqueeLogo p={p} isDark={isDark} />
            </div>
          ))}
        </div>
      </div>

      {/* Background Accent Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default IntegrationMarquee;
