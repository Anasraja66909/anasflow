"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  CheckCircle2,
  Zap,
  RefreshCw,
  Search,
  XCircle,
  ChevronDown,
  Check,
  HelpCircle,
  Lock,
  Info,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Filter,
  Signal,
  User,
  Key,
} from "lucide-react";
import { useClient } from "@/contexts/ClientContext";
import Link from "next/link";
import Image from "next/image";

// Senior Dev Standard: Defined standard motion variants for the platform
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const ALL_PLATFORMS = [
  {
    id: "gohighlevel",
    name: "GoHighLevel",
    category: "CRM & Marketing",
    authType: "oauth2",
    domain: "gohighlevel.com",
    description: "All-in-one marketing and sales automation for agencies.",
    color: "#00E5C0",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM & Marketing",
    authType: "oauth2",
    domain: "hubspot.com",
    description: "Robust CRM, marketing, and sales software for growing teams.",
    color: "#ff7a59",
  },
  {
    id: "openai",
    name: "OpenAI",
    category: "AI Models",
    authType: "api_key",
    domain: "openai.com",
    description:
      "Deep integration with GPT-4, DALL-E, and more for intelligent workflows.",
    color: "#74aa9c",
  },
  {
    id: "claude",
    name: "Claude AI",
    category: "AI Models",
    authType: "api_key",
    domain: "anthropic.com",
    description:
      "Enterprise-grade AI models for safe and helpful automated tasks.",
    color: "#d97757",
  },
  {
    id: "manychat",
    name: "ManyChat",
    category: "Social Chat",
    authType: "api_key",
    domain: "manychat.com",
    description:
      "Automated chat marketing for Messenger, Instagram, and WhatsApp.",
    color: "#0084ff",
  },
  {
    id: "n8n",
    name: "n8n",
    category: "Automation",
    authType: "api_key",
    domain: "n8n.io",
    description:
      "Low-code system to connect any web service together flexibly.",
    color: "#ff6d5a",
  },
  {
    id: "zapier",
    name: "Zapier",
    category: "Automation",
    authType: "oauth2",
    domain: "zapier.com",
    description: "Connect thousands of apps without any code.",
    color: "#ff4f00",
  },
  {
    id: "make",
    name: "Make.com",
    category: "Automation",
    authType: "api_key",
    domain: "make.com",
    description: "Visual platform to build and automate anything.",
    color: "#7347ff",
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Commerce",
    authType: "oauth2",
    domain: "stripe.com",
    description: "Financial infrastructure for global online payments.",
    color: "#635bff",
  },
  {
    id: "shopify",
    name: "Shopify",
    category: "Commerce",
    authType: "oauth2",
    domain: "shopify.com",
    description: "The platform commerce is built on.",
    color: "#95bf47",
  },
  {
    id: "slack",
    name: "Slack",
    category: "Workspace",
    authType: "oauth2",
    domain: "slack.com",
    description: "The operating system for modern team communication.",
    color: "#4a154b",
  },
];

export default function ConnectPlatformsPage() {
  const { activeClientId } = useClient();
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);
  const [apiKey, setApiKey] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(ALL_PLATFORMS.map((p) => p.category)))],
    [],
  );

  useEffect(() => {
    fetchConnections();
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    const platform = params.get("platform");
    if (status === "success") {
      setToast({
        message: `Successfully synchronized ${platform}!`,
        type: "success",
      });
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (status === "error") {
      setToast({
        message: "Handshake failed. Protocol aborted.",
        type: "error",
      });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [activeClientId]);

  async function fetchConnections() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const url = activeClientId
        ? `http://localhost:8000/platforms/?client_id=${activeClientId}`
        : "http://localhost:8000/platforms/";
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setConnections(data.platforms || []);
      }
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  }

  const handleConnect = (platform: any) => {
    setSelectedPlatform(platform);
    setApiKey("");
    setEmail("");
    setPassword("");
  };

  const initiateOAuth = async (platformId: string) => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:8000/platforms/oauth/connect/${platformId}${activeClientId ? `?client_id=${activeClientId}` : ""}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        window.location.href = data.authorize_url;
      }
    } catch (err) {
      setToast({ message: "Auth Protocol Refused.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const submitApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/platforms/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          platform_type: selectedPlatform.id,
          api_key: apiKey,
          client_id: activeClientId,
        }),
      });
      if (res.ok) {
        setSelectedPlatform(null);
        setToast({
          message: `${selectedPlatform.name} Integrated.`,
          type: "success",
        });
        fetchConnections();
      } else {
        setToast({ message: "Invalid API Key.", type: "error" });
      }
    } catch (err) {
      setToast({ message: "Handshake Error.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const filteredPlatforms = useMemo(
    () =>
      ALL_PLATFORMS.filter((p) => {
        const matchesSearch = p.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesCategory =
          activeCategory === "All" || p.category === activeCategory;
        return matchesSearch && matchesCategory;
      }),
    [searchQuery, activeCategory],
  );

  return (
    <div className="min-h-screen pb-32">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className={`fixed bottom-12 left-1/2 z-[200] px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-4 backdrop-blur-3xl border ${toast.type === "success" ? "bg-[#00E5C0]/10 border-[#00E5C0]/20 text-[#00E5C0]" : "bg-red-500/10 border-red-500/20 text-red-400"}`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shadow-[0_0_10px_rgba(0,229,192,0.5)]" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">
              {toast.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Aggressive Header Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 space-y-16 mb-24"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 pt-12"
        >
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#00E5C0]/10 border border-[#00E5C0]/20 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#00E5C0]/20 blur-xl group-hover:scale-150 transition-transform duration-1000"></div>
                <Sparkles className="w-5 h-5 text-[#00E5C0] relative z-10" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#00E5C0] text-glow-teal">
                Neural Ecosystem
              </span>
            </div>
            <h1 className="text-8xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-[0.85] lg:max-w-2xl">
              Connect{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">
                Your Pulse
              </span>
              .
            </h1>
            <p className="text-zinc-500 text-xl font-medium leading-relaxed max-w-2xl">
              Establish authorized proxy tunnels across 30+ enterprise services.
              Monitor cost vectors, health signals, and AI intelligence from a
              single neural command center.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full xl:w-auto">
            <div className="relative group w-full xl:w-[400px]">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 transition-colors group-focus-within:text-[#00E5C0]" />
              <input
                type="text"
                placeholder="Search Protocols..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950/40 border border-white/5 rounded-3xl py-6 pl-16 pr-8 text-sm text-white focus:outline-none focus:border-[#00E5C0]/40 focus:ring-4 focus:ring-[#00E5C0]/5 transition-all backdrop-blur-3xl placeholder:text-zinc-800 font-black uppercase tracking-widest"
              />
            </div>
            <button
              onClick={fetchConnections}
              className="p-6 bg-zinc-950/40 border border-white/5 rounded-3xl text-zinc-600 hover:text-white hover:border-[#00E5C0]/30 transition-all backdrop-blur-3xl group"
            >
              <RefreshCw
                className={`w-5 h-5 transition-transform duration-1000 group-hover:rotate-180 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </motion.div>

        {/* Categories Matrix */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide"
        >
          <div className="flex items-center gap-3 pr-6 border-r border-white/5 mr-2">
            <Filter className="w-4 h-4 text-zinc-700" />
            <span className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.3em]">
              Filter:
            </span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 border ${activeCategory === cat ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]" : "bg-transparent text-zinc-600 border-white/5 hover:border-white/20 hover:text-zinc-200"}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* Integrated Platform Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredPlatforms.map((platform) => {
            const connection = connections.find(
              (c) => c.platform_type === platform.id,
            );
            const isConnected = !!connection;

            return (
              <motion.div
                layout
                key={platform.id}
                variants={itemVariants}
                className={`relative group bg-zinc-950/40 backdrop-blur-3xl border transition-all duration-700 p-10 rounded-[3rem] ${isConnected ? "border-[#00E5C0]/40" : "border-white/5 hover:border-white/10"}`}
              >
                <div
                  className="absolute -top-20 -right-20 w-64 h-64 blur-[120px] rounded-full transition-opacity duration-1000 opacity-0 group-hover:opacity-40"
                  style={{ backgroundColor: platform.color }}
                ></div>

                <div className="flex justify-between items-start mb-16 relative z-10">
                  <div className="w-20 h-20 bg-white rounded-3xl p-5 flex items-center justify-center shadow-2xl relative transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${platform.domain}&sz=128`}
                      className="w-full h-full object-contain"
                      alt=""
                    />
                  </div>
                  {isConnected ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#00E5C0]/10 border border-[#00E5C0]/30 text-[#00E5C0] text-[9px] font-black uppercase tracking-[0.2em] rounded-full">
                      <div className="w-1.5 h-1.5 bg-[#00E5C0] rounded-full animate-pulse shadow-[0_0_5px_#00E5C0]" />{" "}
                      Synchronized
                    </div>
                  ) : (
                    <div className="px-4 py-2 bg-zinc-900/50 text-zinc-700 border border-white/5 text-[9px] font-black uppercase tracking-[0.2em] rounded-full">
                      Offline
                    </div>
                  )}
                </div>

                <div className="relative z-10 mb-12">
                  <h3 className="font-black text-white text-3xl tracking-tighter mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-all duration-700">
                    {platform.name}
                  </h3>
                  <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em] mb-6">
                    {platform.category}
                  </p>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed line-clamp-2">
                    {platform.description}
                  </p>
                </div>

                <div className="relative z-10 pt-4">
                  <button
                    onClick={() => handleConnect(platform)}
                    disabled={isConnected}
                    className={`w-full py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-700 flex items-center justify-center gap-4 group/btn ${isConnected ? "bg-zinc-900/50 text-zinc-700 border border-white/5 cursor-not-allowed" : "bg-white text-black hover:bg-[#00E5C0] shadow-2xl hover:shadow-[#00E5C0]/40 hover:scale-[1.05] active:scale-95"}`}
                  >
                    {isConnected ? (
                      <ShieldCheck className="w-4 h-4" />
                    ) : (
                      <Zap className="w-4 h-4" />
                    )}
                    {isConnected ? "Trusted Link" : "Establish Proxy"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Neural Handshake Modal */}
      <AnimatePresence>
        {selectedPlatform && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 50 }}
              className="bg-zinc-950/90 border border-white/5 rounded-[4rem] w-full max-w-6xl shadow-[0_50px_200px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col lg:flex-row min-h-[700px]"
            >
              {/* Auth Panel */}
              <div className="flex-1 p-12 lg:p-20 border-r border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-6 mb-16">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${selectedPlatform.domain}&sz=128`}
                    className="w-16 h-16 bg-white rounded-3xl p-3 shadow-2xl"
                    alt=""
                  />
                  <div>
                    <h2 className="text-4xl font-black text-white tracking-tighter">
                      Secure <span className="text-[#00E5C0]">Vault</span>
                    </h2>
                    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em] mt-2">
                      Linking Protocol: {selectedPlatform.id}
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={
                    selectedPlatform.authType === "oauth2"
                      ? initiateOAuth.bind(null, selectedPlatform.id)
                      : submitApiKey
                  }
                  className="space-y-12"
                >
                  <div className="space-y-8 bg-black/40 border border-white/5 p-10 rounded-[3rem] shadow-inner">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em] ml-4">
                        Authorized Key / Signal
                      </label>
                      <div className="relative group">
                        <Key className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-800 transition-colors group-focus-within:text-[#00E5C0]" />
                        <input
                          type="password"
                          placeholder="••••••••••••••••"
                          required
                          autoFocus
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          className="w-full bg-black border border-white/5 rounded-3xl py-7 pl-[4.5rem] pr-8 text-white focus:outline-none focus:border-[#00E5C0]/40 transition-all font-mono tracking-widest text-lg placeholder:text-zinc-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="w-full bg-[#00E5C0] text-black font-black py-8 rounded-[2rem] hover:bg-[#00ffd6] shadow-[0_20px_60px_rgba(0,229,192,0.3)] transition-all duration-700 flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.3em]"
                    >
                      {isSaving ? (
                        <RefreshCw className="w-6 h-6 animate-spin" />
                      ) : (
                        <Signal className="w-5 h-5" />
                      )}
                      Connect Platform
                    </button>
                    <button
                      onClick={() => setSelectedPlatform(null)}
                      className="py-4 text-zinc-700 font-black text-[10px] uppercase tracking-[0.5em] hover:text-white transition-colors"
                    >
                      Abort Handshake
                    </button>
                  </div>
                </form>
              </div>

              {/* Guide Panel */}
              <div className="w-full lg:w-[450px] p-16 bg-[#00E5C0]/[0.02] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#00E5C0]/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="space-y-12 relative z-10">
                  <div className="space-y-4">
                    <span className="text-[10px] font-black text-[#00E5C0] uppercase tracking-[0.5em]">
                      Establishing Link
                    </span>
                    <h3 className="text-4xl font-black text-white tracking-tighter leading-none">
                      Secure <br />
                      <span className="text-zinc-500 text-3xl">Handshake.</span>
                    </h3>
                  </div>

                  <div className="space-y-10">
                    {[
                      {
                        icon: User,
                        title: "Identity",
                        text: "Link your verified business account.",
                      },
                      {
                        icon: Key,
                        title: "Access",
                        text: "Secure unique pulse signal injection.",
                      },
                      {
                        icon: ShieldCheck,
                        title: "Trust",
                        text: "End-to-end neural encryption.",
                      },
                    ].map((step, idx) => (
                      <div key={idx} className="flex gap-6 items-start group">
                        <div className="w-12 h-12 bg-zinc-900 border border-white/5 rounded-2xl flex items-center justify-center shrink-0 group-hover:border-[#00E5C0]/30 transition-colors">
                          <step.icon className="w-5 h-5 text-zinc-600 group-hover:text-[#00E5C0]" />
                        </div>
                        <div className="pt-2">
                          <p className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-1">
                            {step.title}
                          </p>
                          <p className="text-xs text-zinc-600 font-medium leading-relaxed">
                            {step.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-zinc-700 p-8 border border-white/5 rounded-[2.5rem] bg-black/20 relative z-10">
                  <ShieldCheck className="w-5 h-5 text-indigo-400" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em]">
                    AES-256 Pulse Security
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
