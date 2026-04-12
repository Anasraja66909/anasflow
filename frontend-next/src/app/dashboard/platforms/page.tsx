"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  RefreshCw,
  Search,
  Filter,
  Layers,
  Sparkles,
  Signal,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useClient } from "@/contexts/ClientContext";
import { PlatformCard } from "@/components/dashboard/platforms/PlatformCard";
import { ConnectionModal } from "@/components/dashboard/platforms/ConnectionModal";

const SUPPORTED_PLATFORMS = [
  { id: "gohighlevel", name: "GoHighLevel", category: "CRM", authType: "oauth2", domain: "gohighlevel.com", color: "#00E5C0", description: "CRM and marketing automation for agencies." },
  { id: "hubspot", name: "HubSpot", category: "CRM", authType: "oauth2", domain: "hubspot.com", color: "#ff7a59", description: "Sales, marketing, and service software." },
  { id: "zapier", name: "Zapier", category: "Automation", authType: "oauth2", domain: "zapier.com", color: "#ff4f00", description: "Connect apps and automate workflows." },
  { id: "n8n", name: "n8n", category: "Automation", authType: "api_key", domain: "n8n.io", color: "#ff6d5a", description: "Fair-code workflow automation tool." },
  { id: "make", name: "Make", category: "Automation", authType: "api_key", domain: "make.com", color: "#7347ff", description: "Visual platform to build workflows." },
  { id: "openai", name: "OpenAI", category: "AI Models", authType: "api_key", domain: "openai.com", color: "#74aa9c", description: "Advanced AI models including GPT-4." },
  { id: "claude", name: "Claude AI", category: "AI Models", authType: "api_key", domain: "anthropic.com", color: "#d97757", description: "Safe and useful AI models by Anthropic." },
  { id: "stripe", name: "Stripe", category: "Commerce", authType: "oauth2", domain: "stripe.com", color: "#635bff", description: "Online payment processing for businesses." },
  { id: "slack", name: "Slack", category: "Workspace", authType: "oauth2", domain: "slack.com", color: "#4a154b", description: "Team communication and collaboration." },
  { id: "manychat", name: "ManyChat", category: "Marketing", authType: "api_key", domain: "manychat.com", color: "#0084ff", description: "Chat marketing automation tool." },
  { id: "airtable", name: "Airtable", category: "Database", authType: "oauth2", domain: "airtable.com", color: "#18bfff", description: "Low-code platform for building apps." },
  { id: "notion", name: "Notion", category: "Workspace", authType: "oauth2", domain: "notion.so", color: "#000000", description: "All-in-one workspace for notes and docs." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PlatformsPage() {
  const { activeClientId } = useClient();
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Connection Modal State
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);
  const [apiKey, setApiKey] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const categories = useMemo(() => ["All", ...Array.from(new Set(SUPPORTED_PLATFORMS.map(p => p.category)))], []);

  useEffect(() => {
    fetchConnections();
    const params = new URLSearchParams(window.location.search);
    if (params.get("status") === "success") {
      setToast({ message: "Platform synchronized successfully!", type: "success" });
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [activeClientId]);

  async function fetchConnections() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const url = "http://localhost:8000/oauth/api/platforms/connections";
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setConnections(data.connections || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleConnectClick = (platform: any) => {
    setSelectedPlatform(platform);
    setApiKey("");
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
        setToast({ message: "Connection Established.", type: "success" });
        fetchConnections();
      } else {
        setToast({ message: "Invalid API Credential.", type: "error" });
      }
    } catch {
      setToast({ message: "Handshake Failed.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const initiateOAuth = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:8000/platforms/oauth/connect/${selectedPlatform.id}${activeClientId ? `?client_id=${activeClientId}` : ""}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        window.location.href = data.authorize_url;
      }
    } catch {
      setToast({ message: "Auth Gateway Error.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const filteredPlatforms = useMemo(() => 
    SUPPORTED_PLATFORMS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCat;
    }), [searchQuery, activeCategory]);

  return (
    <div className="space-y-12">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-10 left-10 z-[300] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl border ${toast.type === "success" ? "bg-[#00E5C0]/10 border-[#00E5C0]/20 text-[#00E5C0]" : "bg-red-500/10 border-red-500/20 text-red-400"}`}
          >
            {toast.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
            <span className="text-[10px] font-black uppercase tracking-widest">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {/* Header Architecture */}
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-[#00E5C0]/10 border border-[#00E5C0]/20 rounded-xl flex items-center justify-center relative overflow-hidden group">
                <Sparkles className="w-4 h-4 text-[#00E5C0]" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00E5C0]">Integration Matrix</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-[0.85]">
              Seamless <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-600 to-slate-400 dark:from-white dark:via-zinc-400 dark:to-zinc-700">Linking.</span>
            </h1>
            <p className="text-slate-500 dark:text-zinc-500 text-lg font-medium max-w-xl leading-relaxed">
              Orchestrate all your business tools from a single secure node. 
              Real-time synchronization for 25+ enterprise platforms.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="relative group w-full sm:w-[350px]">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[#00E5C0] transition-colors" />
              <input 
                type="text" 
                placeholder="Search Systems..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-zinc-950/40 border border-slate-200 dark:border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#00E5C0]/40 transition-all font-black uppercase tracking-widest placeholder:text-slate-300 dark:placeholder:text-zinc-800 shadow-sm"
              />
            </div>
            <button 
              onClick={fetchConnections}
              className="p-4 bg-zinc-950/40 border border-white/5 rounded-2xl text-zinc-600 hover:text-white transition-all group"
            >
              <RefreshCw className={`w-5 h-5 group-hover:rotate-180 transition-transform duration-700 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </motion.div>

        {/* Categories Bar */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide mb-10">
          <div className="flex items-center gap-3 pr-6 border-r border-white/5 mr-2">
            <Filter className="w-4 h-4 text-zinc-700" />
            <span className="text-[9px] font-black uppercase text-zinc-700 tracking-widest">Filters</span>
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${activeCategory === cat ? "bg-white text-black border-white shadow-xl shadow-white/10" : "bg-transparent text-zinc-600 border-white/5 hover:border-white/10"}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Platform Grid */}
        {loading ? (
          <div className="py-40 flex items-center justify-center">
            <RefreshCw className="w-10 h-10 text-[#00E5C0] animate-spin" />
          </div>
        ) : (
          <motion.div 
            layout
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
          >
            {filteredPlatforms.map(platform => (
              <PlatformCard 
                key={platform.id}
                platform={platform}
                isConnected={connections.some(c => c.platform_type === platform.id)}
                onConnect={handleConnectClick}
              />
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Connection Interface */}
      <ConnectionModal 
        isOpen={!!selectedPlatform}
        platform={selectedPlatform}
        onClose={() => setSelectedPlatform(null)}
        apiKey={apiKey}
        setApiKey={setApiKey}
        isSaving={isSaving}
        onSubmit={submitApiKey}
        onOAuth={initiateOAuth}
      />
    </div>
  );
}
