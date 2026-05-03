"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw,
  Search,
  Filter,
  Sparkles,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Lock,
  Zap,
  Globe,
  Key,
} from "lucide-react";
import { useClient } from "@/contexts/ClientContext";
import { PlatformCard } from "@/components/dashboard/platforms/PlatformCard";
import { ConnectionModal } from "@/components/dashboard/platforms/ConnectionModal";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ============================================================================
// Platform Registry — All supported integrations
// ============================================================================
const SUPPORTED_PLATFORMS = [
  // CRM
  { id: "gohighlevel", name: "GoHighLevel", category: "CRM", authType: "oauth2", domain: "gohighlevel.com", color: "#00E5C0", description: "All-in-one CRM and marketing automation platform for agencies." },
  { id: "hubspot", name: "HubSpot", category: "CRM", authType: "oauth2", domain: "hubspot.com", color: "#ff7a59", description: "Sales, marketing, and service CRM software." },
  { id: "salesforce", name: "Salesforce", category: "CRM", authType: "oauth2", domain: "salesforce.com", color: "#00a1e0", description: "World's leading customer relationship management platform." },
  { id: "zoho_crm", name: "Zoho CRM", category: "CRM", authType: "oauth2", domain: "zoho.com", color: "#e42527", description: "Comprehensive CRM for sales and marketing teams." },
  // Automation
  { id: "zapier", name: "Zapier", category: "Automation", authType: "oauth2", domain: "zapier.com", color: "#ff4f00", description: "Connect 6,000+ apps and automate workflows without code." },
  { id: "n8n", name: "n8n", category: "Automation", authType: "api_key", domain: "n8n.io", color: "#ff6d5a", description: "Fair-code workflow automation — self-hosted or cloud." },
  { id: "make", name: "Make", category: "Automation", authType: "api_key", domain: "make.com", color: "#7347ff", description: "Visual platform to build, run and automate workflows." },
  { id: "power_automate", name: "Power Automate", category: "Automation", authType: "oauth2", domain: "microsoft.com", color: "#0078d4", description: "Microsoft's intelligent process automation platform." },
  { id: "pipedream", name: "Pipedream", category: "Automation", authType: "api_key", domain: "pipedream.com", color: "#3c82f6", description: "Connect APIs and build automations with code." },
  { id: "activepieces", name: "Activepieces", category: "Automation", authType: "api_key", domain: "activepieces.com", color: "#6d4aff", description: "Open-source automation for self-hosters and teams." },
  // AI Models
  { id: "openai", name: "OpenAI", category: "AI Models", authType: "api_key", domain: "openai.com", color: "#74aa9c", description: "Advanced AI models including GPT-4o and DALL-E." },
  { id: "claude", name: "Claude AI", category: "AI Models", authType: "api_key", domain: "anthropic.com", color: "#d97757", description: "Safe, helpful, and honest AI by Anthropic." },
  { id: "gemini", name: "Gemini", category: "AI Models", authType: "api_key", domain: "google.com", color: "#4285f4", description: "Google's multimodal AI model family." },
  { id: "mistral", name: "Mistral AI", category: "AI Models", authType: "api_key", domain: "mistral.ai", color: "#ff7000", description: "Frontier, open-weight AI models." },
  { id: "groq", name: "Groq", category: "AI Models", authType: "api_key", domain: "groq.com", color: "#f55036", description: "Ultra-fast AI inference platform for real-time applications." },
  { id: "perplexity", name: "Perplexity AI", category: "AI Models", authType: "api_key", domain: "perplexity.ai", color: "#20b2aa", description: "AI-powered answer engine with real-time web search." },
  { id: "cohere", name: "Cohere", category: "AI Models", authType: "api_key", domain: "cohere.ai", color: "#39e09b", description: "Enterprise AI for text understanding and generation." },
  { id: "aws_bedrock", name: "AWS Bedrock", category: "AI Models", authType: "api_key", domain: "amazon.com", color: "#ff9900", description: "Access foundation models via AWS." },
  { id: "azure_openai", name: "Azure OpenAI", category: "AI Models", authType: "api_key", domain: "azure.microsoft.com", color: "#0078d4", description: "OpenAI models deployed on Azure infrastructure." },
  { id: "gcp_vertex", name: "Vertex AI", category: "AI Models", authType: "api_key", domain: "cloud.google.com", color: "#34a853", description: "Google Cloud's unified ML and generative AI platform." },
  // Voice AI
  { id: "elevenlabs", name: "ElevenLabs", category: "Voice AI", authType: "api_key", domain: "elevenlabs.io", color: "#7c3aed", description: "Ultra-realistic AI voice synthesis and cloning." },
  { id: "retell", name: "Retell AI", category: "Voice AI", authType: "api_key", domain: "retellai.com", color: "#6366f1", description: "AI phone call automation with human-like voices." },
  // Video AI
  { id: "heygen", name: "HeyGen", category: "Video AI", authType: "api_key", domain: "heygen.com", color: "#ff4785", description: "AI video generation with digital avatars." },
  { id: "runway", name: "Runway", category: "Video AI", authType: "api_key", domain: "runwayml.com", color: "#00c8ff", description: "AI-powered creative video generation platform." },
  // Marketing
  { id: "manychat", name: "ManyChat", category: "Marketing", authType: "api_key", domain: "manychat.com", color: "#0084ff", description: "Chat marketing automation across Instagram, WhatsApp, SMS." },
  { id: "instantly", name: "Instantly.ai", category: "Marketing", authType: "api_key", domain: "instantly.ai", color: "#ff6b35", description: "AI-powered cold email outreach at scale." },
  { id: "waalaxy", name: "Waalaxy", category: "Marketing", authType: "api_key", domain: "waalaxy.com", color: "#c084fc", description: "LinkedIn automation and cold outreach tool." },
  { id: "activecampaign", name: "ActiveCampaign", category: "Marketing", authType: "api_key", domain: "activecampaign.com", color: "#356ae6", description: "Email marketing and customer experience automation." },
  // Commerce
  { id: "stripe", name: "Stripe", category: "Commerce", authType: "oauth2", domain: "stripe.com", color: "#635bff", description: "Online payment processing and billing infrastructure." },
  { id: "shopify", name: "Shopify", category: "Commerce", authType: "oauth2", domain: "shopify.com", color: "#96bf48", description: "E-commerce platform for online stores." },
  // Workspace
  { id: "slack", name: "Slack", category: "Workspace", authType: "oauth2", domain: "slack.com", color: "#4a154b", description: "Team communication and collaboration hub." },
  { id: "notion", name: "Notion", category: "Workspace", authType: "oauth2", domain: "notion.so", color: "#000000", description: "All-in-one workspace for notes, docs, and tasks." },
  { id: "airtable", name: "Airtable", category: "Workspace", authType: "oauth2", domain: "airtable.com", color: "#18bfff", description: "Low-code platform to build collaborative apps." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

type Toast = { message: string; type: "success" | "error" };

export default function PlatformsPage() {
  const { activeClientId } = useClient();
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [disconnecting, setDisconnecting] = useState<string | null>(null);

  // Connection Modal State
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);
  const [apiKey, setApiKey] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(SUPPORTED_PLATFORMS.map((p) => p.category)))],
    []
  );

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    fetchConnections();
    // Handle OAuth callback success/error params
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    const platform = params.get("platform");
    if (status === "success") {
      showToast(
        platform
          ? `${platform.replace("_", " ")} connected successfully!`
          : "Platform connected successfully!",
        "success"
      );
      window.history.replaceState({}, "", window.location.pathname);
    } else if (status === "error") {
      showToast("Connection failed. Please try again.", "error");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [activeClientId]);

  async function fetchConnections() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const clientParam = activeClientId ? `?client_id=${activeClientId}` : "";
      const res = await fetch(`${API_BASE}/api/v1/platforms/connections${clientParam}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setConnections(data.connections || []);
      }
    } catch (e) {
      console.error("Failed to fetch connections:", e);
    } finally {
      setLoading(false);
    }
  }

  const handleConnectClick = (platform: any) => {
    setSelectedPlatform(platform);
    setApiKey("");
  };

  const handleDisconnect = async (platform: any) => {
    if (!confirm(`Disconnect ${platform.name}? This will remove your stored credentials.`)) return;
    setDisconnecting(platform.id);
    try {
      const token = localStorage.getItem("token");
      const clientParam = activeClientId ? `?client_id=${activeClientId}` : "";
      const res = await fetch(
        `${API_BASE}/api/v1/platforms/by-type/${platform.id}${clientParam}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok || res.status === 204) {
        showToast(`${platform.name} disconnected.`, "success");
        fetchConnections();
      } else {
        showToast("Failed to disconnect. Please try again.", "error");
      }
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setDisconnecting(null);
    }
  };

  const submitApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlatform || !apiKey.trim()) return;
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/v1/platforms/connect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          platform_type: selectedPlatform.id,
          platform_name: selectedPlatform.name,
          auth_type: "api_key",
          api_key: apiKey,
          client_id: activeClientId || null,
        }),
      });

      if (res.ok) {
        setSelectedPlatform(null);
        setApiKey("");
        showToast(`${selectedPlatform.name} connected successfully!`, "success");
        fetchConnections();
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.detail || "Invalid API key. Please check and try again.", "error");
      }
    } catch {
      showToast("Network error. Please check your connection.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const initiateOAuth = async () => {
    if (!selectedPlatform) return;
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      const clientParam = activeClientId ? `?client_id=${activeClientId}` : "";
      const res = await fetch(
        `${API_BASE}/api/v1/platforms/oauth/connect/${selectedPlatform.id}${clientParam}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        window.location.href = data.authorize_url;
      } else {
        showToast("Failed to initiate OAuth. Please try again.", "error");
        setIsSaving(false);
      }
    } catch {
      showToast("Network error during OAuth initiation.", "error");
      setIsSaving(false);
    }
  };

  const filteredPlatforms = useMemo(
    () =>
      SUPPORTED_PLATFORMS.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCat = activeCategory === "All" || p.category === activeCategory;
        return matchesSearch && matchesCat;
      }),
    [searchQuery, activeCategory]
  );

  const connectedCount = connections.length;
  const connectedPlatformIds = new Set(connections.map((c) => c.platform_type));

  return (
    <div className="space-y-10">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 60, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className={`fixed bottom-8 left-1/2 z-[300] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl border ${
              toast.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span className="text-xs font-black uppercase tracking-widest">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {/* ── Page Header ── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-[#00E5C0]/10 border border-[#00E5C0]/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#00E5C0]" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00E5C0]">
                Integration Hub
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-[0.9]">
              Platform{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-600 to-slate-400 dark:from-white dark:via-zinc-400 dark:to-zinc-700">
                Hub.
              </span>
            </h1>
            <p className="text-slate-500 dark:text-zinc-500 text-base font-medium max-w-lg leading-relaxed">
              Connect all your AI and business tools in one secure place.{" "}
              <strong className="text-slate-700 dark:text-zinc-300">30+ enterprise platforms</strong> with
              AES-256 encrypted credential storage.
            </p>
          </div>

          {/* Stats + Search */}
          <div className="flex flex-col gap-4 w-full lg:w-auto">
            {/* Connection stats */}
            <div className="flex gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#00E5C0]/5 border border-[#00E5C0]/15 rounded-2xl">
                <Zap className="w-3.5 h-3.5 text-[#00E5C0]" />
                <div>
                  <p className="text-[8px] font-black uppercase text-zinc-500 tracking-widest">Active</p>
                  <p className="text-base font-black text-[#00E5C0] leading-none">{connectedCount}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-2xl">
                <Globe className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-600" />
                <div>
                  <p className="text-[8px] font-black uppercase text-zinc-500 tracking-widest">Available</p>
                  <p className="text-base font-black text-slate-700 dark:text-zinc-300 leading-none">{SUPPORTED_PLATFORMS.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-2xl">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <div>
                  <p className="text-[8px] font-black uppercase text-zinc-500 tracking-widest">Encrypted</p>
                  <p className="text-base font-black text-emerald-500 leading-none">AES-256</p>
                </div>
              </div>
            </div>

            {/* Search + Refresh */}
            <div className="flex items-center gap-3">
              <div className="relative group flex-1 lg:w-[320px]">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-[#00E5C0] transition-colors" />
                <input
                  type="text"
                  placeholder="Search platforms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-950/40 border border-slate-200 dark:border-white/5 rounded-2xl py-3.5 pl-12 pr-5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#00E5C0]/40 transition-all font-semibold placeholder:text-slate-400 dark:placeholder:text-zinc-700 shadow-sm"
                />
              </div>
              <button
                onClick={fetchConnections}
                title="Refresh connections"
                className="p-3.5 bg-white dark:bg-zinc-950/40 border border-slate-200 dark:border-white/5 rounded-2xl text-slate-500 dark:text-zinc-600 hover:text-[#00E5C0] dark:hover:text-[#00E5C0] transition-all"
              >
                <RefreshCw className={`w-4 h-4 transition-transform duration-700 ${loading ? "animate-spin" : "hover:rotate-180"}`} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Security Banner ── */}
        {connectedCount > 0 && (
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/15 rounded-2xl mb-8"
          >
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                {connectedCount} platform{connectedCount !== 1 ? "s" : ""} securely connected
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-0.5">
                All credentials encrypted with AES-256 at rest · TLS 1.3 in transit · Zero plaintext exposure
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl border border-emerald-200 dark:border-emerald-500/20">
                <Lock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">Vault Active</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl border border-emerald-200 dark:border-emerald-500/20">
                <Key className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">Keys Hidden</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Category Filter ── */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 overflow-x-auto pb-3 scrollbar-hide mb-8"
        >
          <div className="flex items-center gap-2 pr-4 border-r border-slate-200 dark:border-white/5 mr-1 flex-shrink-0">
            <Filter className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-[9px] font-black uppercase text-zinc-600 tracking-widest">Filter</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border flex-shrink-0 ${
                activeCategory === cat
                  ? "bg-slate-900 dark:bg-white text-white dark:text-black border-slate-900 dark:border-white shadow-lg"
                  : "bg-transparent text-slate-500 dark:text-zinc-600 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 hover:text-slate-700 dark:hover:text-zinc-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Platform Grid ── */}
        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center gap-4">
            <RefreshCw className="w-8 h-8 text-[#00E5C0] animate-spin" />
            <p className="text-sm text-slate-400 dark:text-zinc-600 font-medium">Loading your connections...</p>
          </div>
        ) : filteredPlatforms.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center gap-3">
            <Search className="w-10 h-10 text-slate-300 dark:text-zinc-700" />
            <p className="text-slate-500 dark:text-zinc-500 font-medium">No platforms match "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="text-xs text-[#00E5C0] hover:underline font-bold"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
          >
            {filteredPlatforms.map((platform) => (
              <motion.div key={platform.id} variants={itemVariants} layout>
                <PlatformCard
                  platform={platform}
                  isConnected={connectedPlatformIds.has(platform.id)}
                  isDisconnecting={disconnecting === platform.id}
                  onConnect={handleConnectClick}
                  onDisconnect={handleDisconnect}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* ── Connection Modal ── */}
      <ConnectionModal
        isOpen={!!selectedPlatform}
        platform={selectedPlatform}
        onClose={() => { setSelectedPlatform(null); setApiKey(""); }}
        apiKey={apiKey}
        setApiKey={setApiKey}
        isSaving={isSaving}
        onSubmit={submitApiKey}
        onOAuth={initiateOAuth}
      />
    </div>
  );
}
