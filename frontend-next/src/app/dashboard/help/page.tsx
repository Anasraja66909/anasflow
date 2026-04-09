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
    tip: "Ensure you are an Admin of the GHL Location to authorize the connection.",
  },
  {
    id: "openai",
    category: "ai",
    title: "Connecting OpenAI for Cost Tracking",
    steps: [
      "Log in to your OpenAI Platform account at platform.openai.com.",
      "Go to the 'API Keys' section in the left sidebar.",
      "Click '+ Create new secret key' and give it a name like 'AnasFlow'.",
      "Copy the key immediately (you won't be able to see it again).",
      "Back in AnasFlow, click 'Connect' on the OpenAI card.",
      "Paste your API Key and click 'Validate & Connect'.",
    ],
    tip: "Never share your API keys. We encrypt them with AES-256 before storage.",
  },
  {
    id: "manychat",
    category: "automation",
    title: "Integrating ManyChat",
    steps: [
      "Open your ManyChat Dashboard.",
      "Navigate to Settings > API.",
      "Click 'Generate New Token'.",
      "Copy the token string.",
      "In AnasFlow, paste the token into the 'Connect' modal.",
      "AnasFlow will begin syncing your subscriber and usage data.",
    ],
  },
  {
    id: "retell",
    category: "ai",
    title: "Retell AI Voice Integration",
    steps: [
      "Access the Retell AI Dashboard at beta.retellai.com.",
      "Go to the 'API Keys' tab on the left.",
      "Copy your 'API Key'.",
      "Paste it into the Retell AI connection modal on AnasFlow.",
      "Click connect to start monitoring your voice agent usage costs.",
    ],
  },
  {
    id: "n8n",
    category: "automation",
    title: "Self-Hosted n8n Connection",
    steps: [
      "In n8n, go to Settings > API.",
      "Create a new API Key if you don't have one.",
      "Copy the key.",
      "In AnasFlow, paste the key into the n8n modal.",
      "Ensure your n8n instance is publicly accessible if you are self-hosting.",
    ],
  },
  {
    id: "zapier",
    category: "automation",
    title: "Zapier OAuth Setup",
    steps: [
      "Select Zapier from the Connect Platforms page.",
      "Click the 'Connect' button.",
      "Authorize AnasFlow via the Zapier popup.",
      "Your Zapier usage and automation health will now sync automatically.",
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
