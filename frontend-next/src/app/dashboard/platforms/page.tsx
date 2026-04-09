"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  CheckCircle2,
  Clock,
  Zap,
  RefreshCw,
  Link as LinkIcon,
  Database,
  Key,
  XCircle,
  Search,
  ChevronDown,
  Check,
} from "lucide-react";
import { useClient } from "@/contexts/ClientContext";

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

// Removed phases. Added domains for accurate official logo fetching.
const ALL_SUPPORTED_PLATFORMS = [
  {
    type: "gohighlevel",
    name: "GoHighLevel",
    category: "CRM & Marketing",
    authType: "oauth2",
    domain: "gohighlevel.com",
  },
  {
    type: "hubspot",
    name: "HubSpot",
    category: "CRM & Marketing",
    authType: "oauth2",
    domain: "hubspot.com",
  },
  {
    type: "salesforce",
    name: "Salesforce",
    category: "CRM & Marketing",
    authType: "oauth2",
    domain: "salesforce.com",
  },
  {
    type: "zoho_crm",
    name: "Zoho CRM",
    category: "CRM & Marketing",
    authType: "oauth2",
    domain: "zoho.com",
  },
  {
    type: "activecampaign",
    name: "ActiveCampaign",
    category: "CRM & Marketing",
    authType: "api_key",
    domain: "activecampaign.com",
  },
  {
    type: "instantly",
    name: "Instantly.ai",
    category: "CRM & Marketing",
    authType: "api_key",
    domain: "instantly.ai",
  },
  {
    type: "waalaxy",
    name: "Waalaxy",
    category: "CRM & Marketing",
    authType: "api_key",
    domain: "waalaxy.com",
  },

  {
    type: "zapier",
    name: "Zapier",
    category: "Automation",
    authType: "oauth2",
    domain: "zapier.com",
  },
  {
    type: "n8n",
    name: "n8n",
    category: "Automation",
    authType: "api_key",
    domain: "n8n.io",
  },
  {
    type: "make",
    name: "Make",
    category: "Automation",
    authType: "api_key",
    domain: "make.com",
  },
  {
    type: "pipedream",
    name: "Pipedream",
    category: "Automation",
    authType: "api_key",
    domain: "pipedream.com",
  },
  {
    type: "activepieces",
    name: "Activepieces",
    category: "Automation",
    authType: "api_key",
    domain: "activepieces.com",
  },
  {
    type: "power_automate",
    name: "Power Automate",
    category: "Automation",
    authType: "oauth2",
    domain: "microsoft.com",
  },

  {
    type: "openai",
    name: "OpenAI",
    category: "AI Models",
    authType: "api_key",
    domain: "openai.com",
  },
  {
    type: "claude",
    name: "Claude (Anthropic)",
    category: "AI Models",
    authType: "api_key",
    domain: "anthropic.com",
  },
  {
    type: "mistral",
    name: "Mistral AI",
    category: "AI Models",
    authType: "api_key",
    domain: "mistral.ai",
  },
  {
    type: "gemini",
    name: "Google Gemini",
    category: "AI Models",
    authType: "api_key",
    domain: "google.com",
  },
  {
    type: "perplexity",
    name: "Perplexity AI",
    category: "AI Models",
    authType: "api_key",
    domain: "perplexity.ai",
  },
  {
    type: "cohere",
    name: "Cohere",
    category: "AI Models",
    authType: "api_key",
    domain: "cohere.com",
  },

  {
    type: "aws_bedrock",
    name: "AWS Bedrock",
    category: "Cloud AI",
    authType: "api_key",
    domain: "aws.amazon.com",
  },
  {
    type: "gcp_vertex",
    name: "GCP Vertex AI",
    category: "Cloud AI",
    authType: "api_key",
    domain: "cloud.google.com",
  },
  {
    type: "azure_openai",
    name: "Azure OpenAI",
    category: "Cloud AI",
    authType: "api_key",
    domain: "azure.microsoft.com",
  },

  {
    type: "elevenlabs",
    name: "ElevenLabs",
    category: "Media AI",
    authType: "api_key",
    domain: "elevenlabs.io",
  },
  {
    type: "heygen",
    name: "HeyGen",
    category: "Media AI",
    authType: "api_key",
    domain: "heygen.com",
  },
  {
    type: "runway",
    name: "Runway",
    category: "Media AI",
    authType: "api_key",
    domain: "runwayml.com",
  },

  {
    type: "stripe",
    name: "Stripe",
    category: "Commerce",
    authType: "oauth2",
    domain: "stripe.com",
  },
  {
    type: "shopify",
    name: "Shopify",
    category: "Commerce",
    authType: "oauth2",
    domain: "shopify.com",
  },

  {
    type: "slack",
    name: "Slack",
    category: "Workspace",
    authType: "oauth2",
    domain: "slack.com",
  },
  {
    type: "notion",
    name: "Notion",
    category: "Workspace",
    authType: "oauth2",
    domain: "notion.so",
  },
  {
    type: "airtable",
    name: "Airtable",
    category: "Workspace",
    authType: "oauth2",
    domain: "airtable.com",
  },
  {
    type: "manychat",
    name: "ManyChat",
    category: "Workspace",
    authType: "api_key",
    domain: "manychat.com",
  },
];

// Helper to get distinct categories
const CATEGORIES = Array.from(
  new Set(ALL_SUPPORTED_PLATFORMS.map((p) => p.category)),
);

export default function PlatformsPage() {
  const { activeClientId } = useClient();
  const [platforms, setPlatforms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConnect, setShowConnect] = useState(false);
  const [oauthStatus, setOauthStatus] = useState<{
    platform?: string;
    status?: string;
  }>({});

  // Connection Modal State
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Custom Dropdown State
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const connected = params.get("connected");
    const status = params.get("status");
    if (connected && status) {
      setOauthStatus({ platform: connected, status });
      const cleanPath = window.location.pathname;
      window.history.replaceState({}, "", cleanPath);
    }
    fetchPlatforms();
  }, [activeClientId]);

  const [disconnecting, setDisconnecting] = useState<string | null>(null);

  async function fetchPlatforms() {
    setLoading(true);
    try {
      const storedToken = localStorage.getItem("token");
      const url = "http://localhost:8000/oauth/api/platforms/connections";

      const res = await fetch(url, {
        headers: storedToken ? { Authorization: "Bearer " + storedToken } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setPlatforms(data.connections || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function disconnectPlatform(id: string) {
    if (
      !confirm(
        "Are you sure you want to disconnect this platform? All synced data for this connection will be removed.",
      )
    )
      return;

    setDisconnecting(id);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:8000/oauth/api/platforms/connections/${id}`,
        {
          method: "DELETE",
          headers: token ? { Authorization: "Bearer " + token } : {},
        },
      );
      if (res.ok) {
        fetchPlatforms();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDisconnecting(null);
    }
  }

  async function connectApiKey(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });
    try {
      const storedToken = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/platforms/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(storedToken ? { Authorization: "Bearer " + storedToken } : {}),
        },
        body: JSON.stringify({
          platform_type: selectedPlatform,
          api_key: apiKey,
          api_endpoint: apiEndpoint,
          client_id: activeClientId,
        }),
      });
      if (res.ok) {
        setMessage({
          text: "✅ Platform connected successfully!",
          type: "success",
        });
        setTimeout(() => {
          setShowConnect(false);
          setApiKey("");
          setApiEndpoint("");
          setSelectedPlatform("");
          setMessage({ text: "", type: "" });
          fetchPlatforms();
        }, 1500);
      } else {
        setMessage({
          text: "❌ Failed to connect. Check your API key.",
          type: "error",
        });
      }
    } catch {
      setMessage({ text: "❌ Connection error.", type: "error" });
    } finally {
      setSaving(false);
    }
  }

  async function connectOAuth() {
    setSaving(true);
    setMessage({ text: "Initiating OAuth...", type: "success" });
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user?.id;
      const organizationId =
        user?.organization_id || user?.agency_id || user?.id;
      if (!userId || !organizationId) {
        setMessage({
          text: "❌ User session is missing required identifiers.",
          type: "error",
        });
        setSaving(false);
        return;
      }
      const qs = new URLSearchParams({
        user_id: userId,
        organization_id: organizationId,
      }).toString();
      window.location.href = `http://localhost:8000/oauth/authorize/${selectedPlatform}?${qs}`;
      return;
    } catch (e) {
      setMessage({ text: "❌ OAuth initialization failed.", type: "error" });
      setSaving(false);
    }
  }

  const selectedPlatformDetails = ALL_SUPPORTED_PLATFORMS.find(
    (p) => p.type === selectedPlatform,
  );

  // Filter for Custom Dropdown Search
  const filteredPlatforms = ALL_SUPPORTED_PLATFORMS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full text-white"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Integrations
            </h1>
            {activeClientId && (
              <span className="px-2.5 py-1 bg-[#00E5C0]/10 text-[#00E5C0] border border-[#00E5C0]/20 rounded-md text-xs font-bold uppercase tracking-wider">
                Filtered Workspace
              </span>
            )}
          </div>
          <p className="text-zinc-400">
            Manage all your automated connections globally or per-client.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={fetchPlatforms}
            className="p-2.5 border border-white/10 rounded-lg text-zinc-400 hover:text-white hover:border-white/30 transition-all bg-zinc-900/50"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowConnect(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-[#00E5C0] text-black font-bold rounded-lg hover:bg-[#00d6b3] transition-all text-sm shadow-[0_0_15px_rgba(0,229,192,0.2)]"
          >
            <Plus className="w-4 h-4" /> Connect Integration
          </button>
        </div>
      </motion.div>

      {oauthStatus.platform && (
        <motion.div
          variants={itemVariants}
          className={`mb-6 p-4 rounded-xl border ${oauthStatus.status === "success" ? "bg-green-500/10 border-green-500/30 text-green-300" : "bg-red-500/10 border-red-500/30 text-red-300"}`}
        >
          {oauthStatus.status === "success"
            ? `✅ ${oauthStatus.platform} connected successfully`
            : `❌ Failed to connect ${oauthStatus.platform}`}
        </motion.div>
      )}

      {/* Connection Modal Overlay */}
      <AnimatePresence>
        {showConnect && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl relative overflow-visible flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-white/5 bg-zinc-900/50 flex justify-between items-center shrink-0">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-[#00E5C0]" />
                  New Integration
                </h2>
                <button
                  onClick={() => setShowConnect(false)}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto">
                {message.text && (
                  <div
                    className={`mb-5 p-3 rounded-lg text-sm font-medium border ${message.type === "error" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-[#00E5C0]/10 border-[#00E5C0]/30 text-[#00E5C0]"}`}
                  >
                    {message.text}
                  </div>
                )}

                <label className="block text-xs text-zinc-500 font-bold uppercase tracking-widest mb-2">
                  Select Platform
                </label>

                {/* Custom Searchable Dropdown */}
                <div className="relative mb-6" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 flex items-center justify-between hover:border-white/20 transition-colors focus:border-[#00E5C0] outline-none"
                  >
                    {selectedPlatformDetails ? (
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${selectedPlatformDetails.domain}&sz=128`}
                          alt=""
                          className="w-5 h-5 rounded-sm bg-white object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.nextElementSibling!.classList.remove(
                              "hidden",
                            );
                          }}
                        />
                        <div className="w-5 h-5 rounded-sm bg-zinc-800 hidden flex items-center justify-center text-[10px] font-bold text-white">
                          {selectedPlatformDetails.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-white">
                          {selectedPlatformDetails.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-zinc-500 font-medium">
                        Choose a tool to integrate...
                      </span>
                    )}
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 bg-zinc-950 border border-white/10 rounded-xl shadow-inner overflow-hidden flex flex-col"
                      >
                        <div className="p-3 border-b border-white/5 bg-black/50">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input
                              type="text"
                              placeholder="Search platforms..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full bg-black border border-white/10 rounded-lg py-2.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-[#00E5C0] shadow-inner"
                            />
                          </div>
                        </div>
                        <div className="p-2">
                          {filteredPlatforms.length === 0 ? (
                            <p className="text-center text-zinc-500 text-sm py-4">
                              No platforms found.
                            </p>
                          ) : (
                            CATEGORIES.map((category) => {
                              const categoryPlatforms =
                                filteredPlatforms.filter(
                                  (p) => p.category === category,
                                );
                              if (categoryPlatforms.length === 0) return null;
                              return (
                                <div key={category} className="mb-2">
                                  <div className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-zinc-500">
                                    {category}
                                  </div>
                                  {categoryPlatforms.map((p) => (
                                    <button
                                      key={p.type}
                                      onClick={() => {
                                        setSelectedPlatform(p.type);
                                        setDropdownOpen(false);
                                        setSearchQuery("");
                                        setMessage({ text: "", type: "" });
                                      }}
                                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition-colors ${selectedPlatform === p.type ? "bg-[#00E5C0]/10 text-[#00E5C0]" : "text-zinc-300"}`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <img
                                          src={`https://www.google.com/s2/favicons?domain=${p.domain}&sz=128`}
                                          alt=""
                                          className="w-5 h-5 rounded-sm bg-white object-contain"
                                          onError={(e) => {
                                            e.currentTarget.style.display =
                                              "none";
                                            e.currentTarget.nextElementSibling!.classList.remove(
                                              "hidden",
                                            );
                                          }}
                                        />
                                        <div className="w-5 h-5 rounded-sm bg-zinc-800 hidden flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                                          {p.name.charAt(0)}
                                        </div>
                                        <span className="text-sm font-medium truncate">
                                          {p.name}
                                        </span>
                                      </div>
                                      {selectedPlatform === p.type && (
                                        <Check className="w-4 h-4 text-[#00E5C0]" />
                                      )}
                                    </button>
                                  ))}
                                </div>
                              );
                            })
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  {selectedPlatformDetails &&
                    selectedPlatformDetails.authType === "oauth2" && (
                      <motion.div
                        key="oauth2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl mb-6">
                          <p className="text-sm text-indigo-200 leading-relaxed mb-3">
                            <span className="font-bold text-white">
                              {selectedPlatformDetails.name}
                            </span>{" "}
                            requires secure OAuth 2.0 authorization. You will be
                            redirected to their login portal to grant an access
                            token to this {activeClientId ? "Client" : "Global"}{" "}
                            Workspace.
                          </p>
                        </div>
                        <button
                          onClick={connectOAuth}
                          disabled={saving}
                          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {saving ? (
                            <RefreshCw className="w-5 h-5 animate-spin" />
                          ) : (
                            <Database className="w-5 h-5" />
                          )}
                          {saving ? "Redirecting..." : `Connect via OAuth`}
                        </button>
                      </motion.div>
                    )}

                  {selectedPlatformDetails &&
                    selectedPlatformDetails.authType === "api_key" && (
                      <motion.form
                        key="api_key"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onSubmit={connectApiKey}
                      >
                        <div className="space-y-4 mb-6">
                          <div>
                            <label className="block text-xs text-zinc-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                              <Key className="w-3.5 h-3.5" /> Platform API Key
                            </label>
                            <input
                              type="password"
                              placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                              value={apiKey}
                              onChange={(e) => setApiKey(e.target.value)}
                              required
                              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-[#00E5C0] focus:ring-1 focus:ring-[#00E5C0]/30 outline-none font-mono text-sm"
                            />
                          </div>
                          {selectedPlatform === "n8n" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                            >
                              <label className="block text-xs text-zinc-500 font-bold uppercase tracking-widest mb-2 mt-4">
                                n8n Instance URL
                              </label>
                              <input
                                type="url"
                                placeholder="https://n8n.yourdomain.com"
                                value={apiEndpoint}
                                onChange={(e) => setApiEndpoint(e.target.value)}
                                required
                                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-[#00E5C0] focus:ring-1 focus:ring-[#00E5C0]/30 outline-none"
                              />
                              <p className="text-[10px] text-zinc-500 mt-1.5 ml-1">
                                Required for self-hosted domains.
                              </p>
                            </motion.div>
                          )}
                        </div>
                        <button
                          type="submit"
                          disabled={saving || !apiKey}
                          className="w-full py-3.5 bg-[#00E5C0] hover:bg-[#00d6b3] text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,229,192,0.2)] hover:shadow-[0_0_25px_rgba(0,229,192,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {saving ? (
                            <RefreshCw className="w-5 h-5 animate-spin" />
                          ) : (
                            <Zap className="w-5 h-5" />
                          )}
                          {saving ? "Verifying..." : "Connect Securely"}
                        </button>
                        <p className="text-center text-[10px] text-zinc-500 mt-3 flex items-center justify-center gap-1.5">
                          <LockIcon className="w-3 h-3" /> Credentials encrypted
                          via AES-256 before storage
                        </p>
                      </motion.form>
                    )}
                </AnimatePresence>

                {!selectedPlatformDetails && (
                  <div className="h-24 flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-black/30">
                    <p className="text-sm text-zinc-600 font-medium">
                      Select a tool to view connection settings
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Connected Platforms Grid - Made Unique & Premium */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <RefreshCw className="w-8 h-8 text-[#00E5C0] animate-spin" />
        </div>
      ) : platforms.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="text-center py-20 bg-zinc-900 border border-white/5 rounded-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00E5C0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          <div className="text-5xl mb-4 relative z-10 opacity-70">🔌</div>
          <h3 className="text-lg font-bold text-white mb-2 relative z-10">
            {activeClientId
              ? "This Client has no active integrations"
              : "No Integrations Active"}
          </h3>
          <p className="text-zinc-400 mb-6 text-sm max-w-sm mx-auto relative z-10">
            Connect your tools to begin syncing automations, usage logs, and
            analytics seamlessly.
          </p>
          <button
            onClick={() => setShowConnect(true)}
            className="px-6 py-2.5 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors relative z-10 text-sm"
          >
            Connect First Tool
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {platforms.map((p: any) => {
            const matchedPlatform = ALL_SUPPORTED_PLATFORMS.find(
              (ap) => ap.type === p.platform_type,
            );

            return (
              <motion.div
                key={p.id}
                variants={itemVariants}
                className="bg-zinc-900/80 border border-white/10 rounded-xl p-5 hover:border-white/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    {/* Official Look Box for Logo */}
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center relative overflow-hidden p-[2px] shadow-sm">
                      {matchedPlatform ? (
                        <>
                          <img
                            src={`https://www.google.com/s2/favicons?domain=${matchedPlatform.domain}&sz=128`}
                            alt={matchedPlatform.name}
                            className="w-full h-full object-contain rounded-lg"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              e.currentTarget.nextElementSibling!.classList.remove(
                                "hidden",
                              );
                            }}
                          />
                          <div className="w-full h-full bg-zinc-800 rounded-lg hidden flex items-center justify-center text-xl font-bold text-white">
                            {matchedPlatform.name.charAt(0)}
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-zinc-800 rounded-lg flex items-center justify-center text-xl font-bold text-white">
                          {(p.platform_name || p.platform_type).charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">
                        {p.platform_name || p.platform_type}
                      </h3>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mt-0.5">
                        {p.auth_type === "oauth2"
                          ? "OAuth 2.0"
                          : "API Key Setup"}
                      </p>
                    </div>
                  </div>
                  {p.is_active ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00E5C0]/10 border border-[#00E5C0]/20 text-[#00E5C0] text-[10px] font-bold uppercase tracking-widest shrink-0">
                      <CheckCircle2 className="w-3 h-3" /> Live
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest shrink-0">
                      <XCircle className="w-3 h-3" /> Error
                    </div>
                  )}
                </div>
                <div className="border-t border-white/5 pt-3 flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    Connected{" "}
                    {p.created_at
                      ? new Date(p.created_at).toLocaleDateString()
                      : "recently"}
                  </div>
                  <button
                    disabled={disconnecting === p.id}
                    onClick={() => disconnectPlatform(p.id)}
                    className="flex items-center gap-1.5 text-[11px] text-zinc-500 hover:text-red-400 cursor-pointer transition-colors font-medium disabled:opacity-50"
                  >
                    {disconnecting === p.id ? (
                      <RefreshCw className="w-3 h-3 animate-spin" />
                    ) : (
                      <LinkIcon className="w-3 h-3" />
                    )}
                    {disconnecting === p.id
                      ? "Disconnecting..."
                      : "Disconnect Tool"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Available Ecosystem Matrix - Beautiful Categories & Logos */}
      <motion.div
        variants={itemVariants}
        className="mt-16 pt-8 border-t border-white/10"
      >
        <h2 className="text-xl font-bold text-white mb-2">
          Platform Ecosystem
        </h2>
        <p className="text-zinc-400 text-sm mb-8">
          30+ world-class services structurally ready to integrate into
          AnasFlow.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
          {CATEGORIES.map((category) => {
            const catPlatforms = ALL_SUPPORTED_PLATFORMS.filter(
              (p) => p.category === category,
            );
            return (
              <div key={category}>
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-zinc-600"></div>{" "}
                  {category}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {catPlatforms.map((p) => {
                    const connected = platforms.some(
                      (pl: any) => pl.platform_type === p.type,
                    );
                    return (
                      <div
                        key={p.type}
                        title={p.name}
                        onClick={() => {
                          if (!connected) {
                            setSelectedPlatform(p.type);
                            setShowConnect(true);
                          }
                        }}
                        className={`group relative p-3 rounded-xl border text-center transition-all cursor-pointer ${connected ? "border-[#00E5C0]/40 bg-[#00E5C0]/5 shadow-[0_0_15px_rgba(0,229,192,0.05)] cursor-default" : "border-white/5 bg-zinc-900/50 hover:bg-zinc-800 hover:border-white/15"}`}
                      >
                        <div className="w-8 h-8 rounded-md bg-white mx-auto mb-2 p-1 relative overflow-hidden transition-transform group-hover:scale-105">
                          <img
                            src={`https://www.google.com/s2/favicons?domain=${p.domain}&sz=128`}
                            alt=""
                            className={`w-full h-full object-contain ${!connected ? "opacity-90 group-hover:opacity-100" : ""} transition-all`}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              e.currentTarget.nextElementSibling!.classList.remove(
                                "hidden",
                              );
                            }}
                          />
                          <div
                            className={`w-full h-full bg-zinc-800 rounded hidden flex items-center justify-center text-xs font-bold text-white`}
                          >
                            {p.name.charAt(0)}
                          </div>
                        </div>
                        <p className="text-[10px] font-bold text-white truncate px-1">
                          {p.name}
                        </p>
                        {connected && (
                          <div className="absolute top-1 right-1 w-2 h-2 bg-[#00E5C0] rounded-full shadow-[0_0_5px_rgba(0,229,192,0.5)]"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

function LockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
