"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  BookOpen,
  Search,
  ExternalLink,
  ChevronRight,
  Lightbulb,
  ShieldCheck,
  Zap,
  MessageCircle,
  Database,
  Layout,
  Monitor,
} from "lucide-react";

const HELP_CATEGORIES = [
  { id: "general", name: "General Integration", icon: Database },
  { id: "crm", name: "CRM & Marketing", icon: Layout },
  { id: "ai", name: "AI Models", icon: Zap },
  { id: "automation", name: "Automation Tools", icon: Monitor },
];

const GUIDES = [
  // CRM & Marketing
  {
    id: "gohighlevel",
    category: "crm",
    title: "How to Connect GoHighLevel (GHL)",
    steps: [
      "Navigate to the 'Connect Platforms' page in your AnasFlow dashboard.",
      "Find the GoHighLevel card and click 'Connect Platform'.",
      "You will be redirected to the GHL Marketplace login.",
      "Select the specific Location (Sub-account) you wish to authorize.",
      "Click 'Allow Access' to grant AnasFlow read-only permissions for tracking.",
      "You will be automatically returned to AnasFlow with a 'Success' message.",
    ],
    tip: "Ensure you are an Admin of the GHL Location to authorize the connection. Switch clients in the top-right to connect different sub-accounts per client.",
  },
  {
    id: "hubspot",
    category: "crm",
    title: "Integrating HubSpot CRM",
    steps: [
      "Click 'Connect Platform' on the HubSpot card in AnasFlow.",
      "Log into your HubSpot account in the popup window.",
      "Choose the HubSpot account you want to connect to AnasFlow.",
      "Review the requested permissions (read-only for contacts and deals) and click 'Grant access'.",
      "You'll be redirected back to AnasFlow, and the integration will be active.",
    ],
    tip: "You must be a Super Admin or have App Marketplace permissions in HubSpot to connect.",
  },
  {
    id: "manychat",
    category: "crm",
    title: "Connecting ManyChat via API Key",
    steps: [
      "Open your ManyChat Dashboard and navigate to Settings > API.",
      "Click 'Generate New Token' (Note: You must be on a ManyChat Pro plan).",
      "Copy the generated token string.",
      "In AnasFlow, click 'Connect' on the ManyChat card and paste the token.",
      "Click 'Validate & Connect'. AnasFlow will begin syncing your subscriber metrics.",
    ],
    tip: "If you reset your token in ManyChat, you must update it in AnasFlow to keep the connection active.",
  },

  // Automation Tools
  {
    id: "zapier",
    category: "automation",
    title: "Zapier OAuth Setup",
    steps: [
      "Select Zapier from the Connect Platforms page.",
      "Click the 'Connect' button.",
      "Authorize AnasFlow via the Zapier secure popup window.",
      "Once authorized, your Zapier usage and automation health will sync automatically.",
    ],
    tip: "This allows AnasFlow to monitor your Zap runs and alert you if tasks fail.",
  },
  {
    id: "n8n",
    category: "automation",
    title: "Self-Hosted or Cloud n8n Connection",
    steps: [
      "Log into your n8n instance and go to Settings > API.",
      "Create a new API Key if you don't have one.",
      "Copy the API key.",
      "In AnasFlow, click 'Connect' on the n8n card and paste the key.",
      "Click 'Validate & Connect'.",
    ],
    tip: "If you are self-hosting n8n, ensure your instance is publicly accessible so AnasFlow can validate the key.",
  },

  // AI Models
  {
    id: "openai",
    category: "ai",
    title: "Connecting OpenAI for Cost Tracking",
    steps: [
      "Log in to your OpenAI Platform account at platform.openai.com.",
      "Go to the 'API Keys' section in the left sidebar.",
      "Click '+ Create new secret key' and give it a name like 'AnasFlow Tracker'.",
      "Copy the key immediately (you won't be able to see it again).",
      "Back in AnasFlow, click 'Connect' on the OpenAI card.",
      "Paste your API Key and click 'Validate & Connect'.",
    ],
    tip: "Never share your API keys. We encrypt them with AES-256 before storage.",
  },
  {
    id: "claude",
    category: "ai",
    title: "Anthropic (Claude) API Integration",
    steps: [
      "Log into the Anthropic Console at console.anthropic.com.",
      "Navigate to Settings > API Keys.",
      "Click 'Create Key', name it 'AnasFlow', and copy the generated key.",
      "In AnasFlow, click 'Connect' on the Claude AI card.",
      "Paste the key and save. AnasFlow will track your Claude 3 Opus/Sonnet/Haiku usage.",
    ],
  },
  {
    id: "groq",
    category: "ai",
    title: "Connecting Groq LPU API",
    steps: [
      "Sign in to the GroqCloud Console at console.groq.com.",
      "Go to the 'API Keys' tab on the left menu.",
      "Click 'Create API Key', enter a description, and copy the key.",
      "In AnasFlow, select Groq from the platforms list.",
      "Paste your API key to connect and start tracking your real-time inference speeds.",
    ],
  },

  // General Integration (Commerce & Workspace)
  {
    id: "stripe",
    category: "general",
    title: "Connecting Stripe for ROI Tracking",
    steps: [
      "Click 'Connect Platform' on the Stripe card in AnasFlow.",
      "You will be redirected to Stripe's secure login.",
      "Select the business account you want to connect.",
      "Review the read-only permissions and click 'Connect'.",
      "You'll be redirected back to AnasFlow. Your revenue data will now be used to calculate Automation ROI.",
    ],
    tip: "Stripe connection is strictly read-only. AnasFlow cannot make charges or modify your account.",
  },
  {
    id: "slack",
    category: "general",
    title: "Integrating Slack for Alerts",
    steps: [
      "Click 'Connect' on the Slack card.",
      "Log into your Slack workspace.",
      "Select the channel where you want AnasFlow to send alerts (e.g., #system-alerts).",
      "Click 'Allow' to grant permissions.",
      "Your workspace is now connected and ready for real-time notifications.",
    ],
  },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredGuides = GUIDES.filter((guide) => {
    const matchesSearch = guide.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || guide.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-10">
        <h1 className="text-5xl font-black text-white tracking-tight">
          How can we help?
        </h1>
        <p className="text-zinc-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Step-by-step guides for connecting your favorite platforms to
          AnasFlow. Get everything synced in minutes.
        </p>

        <div className="max-w-2xl mx-auto relative group pt-6">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-[#00E5C0] transition-colors" />
          <input
            type="text"
            placeholder="Search for an integration guide..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 rounded-full py-5 pl-14 pr-10 text-lg text-white focus:outline-none focus:border-[#00E5C0] focus:ring-1 focus:ring-[#00E5C0]/30 transition-all shadow-2xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar Categories */}
        <div className="space-y-2 lg:sticky lg:top-24 h-fit">
          <h3 className="text-xs font-black text-zinc-600 uppercase tracking-widest mb-4 px-4">
            Categories
          </h3>
          <button
            onClick={() => setActiveCategory("All")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold ${activeCategory === "All" ? "bg-[#00E5C0] text-black shadow-lg" : "text-zinc-400 hover:bg-zinc-900"}`}
          >
            <BookOpen className="w-4 h-4" /> All Guides
          </button>
          {HELP_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold ${activeCategory === cat.id ? "bg-[#00E5C0] text-black shadow-lg" : "text-zinc-400 hover:bg-zinc-900"}`}
            >
              <cat.icon className="w-4 h-4" /> {cat.name}
            </button>
          ))}
        </div>

        {/* Guides Content */}
        <div className="lg:col-span-3 space-y-10">
          {filteredGuides.map((guide) => (
            <motion.div
              id={guide.id}
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-950 border border-white/10 rounded-3xl p-8 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white rounded-xl p-2 flex items-center justify-center">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${guide.id === "retell" ? "retellai.com" : guide.id + ".com"}&sz=128`}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <h2 className="text-2xl font-black text-white">
                  {guide.title}
                </h2>
              </div>

              <div className="space-y-4">
                {guide.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start group">
                    <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-xs font-black text-zinc-400 shrink-0 group-hover:border-[#00E5C0] group-hover:text-[#00E5C0] transition-colors">
                      {idx + 1}
                    </div>
                    <p className="text-zinc-400 leading-relaxed text-sm pt-1.5 group-hover:text-zinc-200 transition-colors">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              {guide.tip && (
                <div className="mt-8 p-6 bg-[#00E5C0]/5 border border-[#00E5C0]/20 rounded-2xl flex gap-4">
                  <Lightbulb className="w-6 h-6 text-[#00E5C0] shrink-0" />
                  <p className="text-sm text-[#00E5C0]/80 leading-relaxed italic">
                    <span className="font-black">Pro Tip: </span> {guide.tip}
                  </p>
                </div>
              )}
            </motion.div>
          ))}

          {filteredGuides.length === 0 && (
            <div className="text-center py-20 bg-zinc-950 border border-dashed border-white/10 rounded-3xl">
              <BookOpen className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
              <h3 className="text-white font-bold">No guide found</h3>
              <p className="text-zinc-600 text-sm">
                Try searching for another keyword or category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
