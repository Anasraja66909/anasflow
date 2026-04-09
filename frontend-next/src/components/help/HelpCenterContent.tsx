"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Shield,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Lock,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Key,
  Smartphone,
  Globe,
  Mail,
  MessageSquare,
  Layout,
  Database,
  Cloud,
  Activity,
  X,
  Send,
  CreditCard,
  User as UserIcon,
  LifeBuoy,
  PlayCircle,
  BookOpen,
} from "lucide-react";

// Categorized Platform Data with Professional Lucide Icons
export const HELP_GUIDES = [
  {
    category: "Account & Billing Support",
    platforms: [
      {
        id: "profile_management",
        name: "Profile & Account Settings",
        icon: UserIcon,
        steps: [
          "Go to the 'Settings' page from the main sidebar navigation.",
          "Update your personal information including Name and Email address.",
          "Click 'Save Changes' to update your profile across the dashboard.",
          "Manage your professional avatar to personalize your workspace.",
        ],
        troubleshooting:
          "Email update failed? Ensure the new email is not already registered with another account.",
        security:
          "Account details are secured via industry-standard encryption.",
      },
      {
        id: "billing_subscription",
        name: "Billing & Subscription Management",
        icon: CreditCard,
        steps: [
          "Access the 'Billing' tab from the sidebar to view your current plan.",
          "Choose 'Upgrade Plan' to select from Starter, Agency, or Pro tiers.",
          "Securely add or update payment methods via our Stripe integration.",
          "Download past invoices directly from the Invoice History section.",
        ],
        troubleshooting:
          "Payment declined? Verify your card's expiration date and CVC code in the payment portal.",
        security:
          "All billing transactions are processed securely via Stripe Connect.",
      },
    ],
  },
  {
    category: "CRM & Marketing",
    platforms: [
      {
        id: "gohighlevel",
        name: "GoHighLevel",
        icon: Globe,
        steps: [
          "Login to your GoHighLevel account.",
          "Navigate to 'Settings' > 'API Keys'.",
          "Copy the API Key for your specific Location.",
          "Paste the key into AnasFlow to start syncing client data.",
        ],
        troubleshooting:
          "Permission denied? Ensure your user role has 'API Access' enabled in GHL Settings.",
        security: "GHL Keys are stored using AES-256 encryption.",
      },
      {
        id: "hubspot",
        name: "HubSpot",
        icon: Globe,
        steps: [
          "Open HubSpot and go to 'Settings' (top right icon).",
          "On the left sidebar, click 'Integrations' > 'Private Apps'.",
          "Click 'Create a private app' and give it a name like 'AnasFlow'.",
          "Select 'crm.objects.contacts.read' and 'crm.objects.deals.read' scopes.",
          "Copy the Access Token and paste it into AnasFlow.",
        ],
        troubleshooting:
          "App creation failed? You must have Super Admin permissions in HubSpot to create Private Apps.",
        security:
          "HubSpot tokens are shielded behind our secure internal vault.",
      },
    ],
  },
  {
    category: "Automation Engines",
    platforms: [
      {
        id: "zapier",
        name: "Zapier",
        icon: Database,
        steps: [
          "AnasFlow uses official OAuth for Zapier. Click 'Connect Securely'.",
          "Log in to your Zapier account when prompted by the external window.",
          "Authorize AnasFlow to view your Zap history and execution metadata.",
          "Automation statistics will begin syncing immediately.",
        ],
        troubleshooting:
          "Usage missing? Only active Zaps that have run at least once will appear in analytics.",
        security:
          "AnasFlow only requests read-only access to your execution logs.",
      },
      {
        id: "make",
        name: "Make (formerly Integromat)",
        icon: Database,
        steps: [
          "In Make, click on your profile avatar in the bottom left corner.",
          "Select 'API Keys' and click the 'Add' button.",
          "Generate a new key and provide your unique Make Organization ID.",
          "AnasFlow will fetch and analyze your scenario performance automatically.",
        ],
        troubleshooting:
          "Locating IDs? Your Organization ID is found in the Make URL: /organization/XXXXXXXX.",
        security:
          "Make credentials are encrypted via hardware-backed security modules.",
      },
      {
        id: "n8n",
        name: "n8n",
        icon: Database,
        steps: [
          "Open your n8n instance and go to 'Settings' > 'API'.",
          "Create a new API Key with 'Workflow Read' permissions.",
          "Paste your Instance URL and API Key into AnasFlow.",
          "Your self-hosted or cloud workflows will now be tracked in the dashboard.",
        ],
        troubleshooting:
          "Connection timeout? Ensure your n8n firewall allows requests from AnasFlow's IP range.",
        security: "Self-hosted credentials are never shared with 3rd parties.",
      },
    ],
  },
  {
    category: "AI & LLM Services",
    platforms: [
      {
        id: "openai",
        name: "OpenAI",
        icon: Zap,
        steps: [
          "Login to the OpenAI Platform dashboard (platform.openai.com).",
          "Navigate to 'Dashboard' > 'API Keys'.",
          "Create a new 'Project Key' (recommended) or use a Personal Key.",
          "Submit your key to AnasFlow to track comprehensive token usage.",
        ],
        troubleshooting:
          "Data not syncing? AnasFlow updates OpenAI usage data every 4 hours.",
        security:
          "We only read pricing and token usage; we never access your personal chat history.",
      },
      {
        id: "claude",
        name: "Claude (Anthropic)",
        icon: Zap,
        steps: [
          "Visit the Anthropic Console at console.anthropic.com.",
          "Go to 'Account Settings' and select 'API Keys'.",
          "Generate your key and paste it directly into the AnasFlow Platform connection modal.",
        ],
        troubleshooting:
          "Key error? Check that you have an active credit balance in your Anthropic account.",
        security: "Anthropic keys are stored with bank-grade encryption.",
      },
    ],
  },
];

export function LogoIcon({ platform }: { platform: any }) {
  const Icon = platform.icon || HelpCircle;

  return (
    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border border-white/5 bg-zinc-800/80 text-[#00E5C0] transition-all duration-300 group-hover:scale-110 group-hover:bg-zinc-700">
      <Icon className="w-6 h-6" />
    </div>
  );
}

export function TicketModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-xl bg-zinc-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative"
          >
            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-zinc-900/50">
              <h3 className="text-2xl font-black text-white flex items-center gap-2">
                <LifeBuoy className="w-6 h-6 text-[#00E5C0]" />{" "}
                {success ? "Priority Ticket Status" : "Create Support Ticket"}
              </h3>
              <button
                onClick={() => {
                  setSuccess(false);
                  onClose();
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {success ? (
                <div className="py-8 text-center space-y-8 animate-in fade-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-[#00E5C0]/20 rounded-full flex items-center justify-center mx-auto border border-[#00E5C0]/30 glow shadow-[0_0_20px_rgba(0,229,192,0.2)]">
                    <CheckCircle2 className="w-12 h-12 text-[#00E5C0]" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-3xl font-black text-white tracking-tight">
                      Ticket Received!
                    </h4>
                    <p className="text-zinc-400 text-lg leading-relaxed max-w-sm mx-auto">
                      Your request has been successfully prioritized. Our
                      engineering team will review your case and respond to{" "}
                      <span className="text-white font-bold text-nowrap">
                        anaasraja868@gmail.com
                      </span>{" "}
                      within 24 hours.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSuccess(false);
                      onClose();
                    }}
                    className="w-full bg-[#00E5C0] text-black font-black py-4 rounded-xl hover:scale-[1.02] transition-all"
                  >
                    Got it, thanks!
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-widest">
                        Issue Subject
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Briefly describe the issue..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5C0]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-widest">
                          Category
                        </label>
                        <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none">
                          <option>Platform Connection</option>
                          <option>Billing / Account</option>
                          <option>Technical Bug</option>
                          <option>Feature Request</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-widest">
                          Priority
                        </label>
                        <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none">
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                          <option>Urgent Support</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-widest">
                        Description
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Detailed problem description..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                  <button
                    disabled={submitting}
                    className="w-full bg-[#00E5C0] hover:bg-[#00E5C0]/90 text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    {submitting ? (
                      <Zap className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    {submitting ? "Scaling ticket..." : "Submit Support Ticket"}
                  </button>
                </>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function HelpCenterContent() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(
    "profile_management",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-12 mb-20 px-4 md:px-0"
    >
      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
      />

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-black tracking-tighter text-white">
            Help Center
          </h1>
          <p className="text-zinc-400 text-xl font-medium max-w-2xl leading-relaxed">
            Professional documentation and implementation guides for official
            AnasFlow integrations.
          </p>
        </div>

        <div className="relative w-full max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 rounded-2xl py-5 pl-12 pr-6 text-lg text-white placeholder:text-zinc-700"
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-white/10 rounded-[3rem] p-10 flex items-center gap-8 relative overflow-hidden">
        <Shield className="w-12 h-12 text-[#00E5C0] shrink-0" />
        <p className="text-zinc-300 text-xl leading-relaxed">
          Your credentials remain enterprise-secure. API metadata is fully
          encrypted using AES-256 standards.
        </p>
      </div>

      <div className="space-y-16">
        {HELP_GUIDES.map((cat, idx) => {
          const filteredPlatforms = cat.platforms.filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()),
          );
          if (filteredPlatforms.length === 0) return null;
          return (
            <section key={idx} className="space-y-8">
              <h2 className="text-4xl font-black text-white flex items-center gap-4">
                <div className="w-2 h-12 bg-[#00E5C0] rounded-full"></div>
                {cat.category}
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {filteredPlatforms.map((p) => (
                  <div
                    key={p.id}
                    className={`bg-zinc-900/50 border rounded-3xl overflow-hidden transition-all duration-500 group ${activeAccordion === p.id ? "border-[#00E5C0]/40 ring-1 ring-[#00E5C0]/10" : "border-white/5"}`}
                  >
                    <button
                      onClick={() => toggleAccordion(p.id)}
                      className="w-full text-left px-8 py-8 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-8">
                        <LogoIcon platform={p} />
                        <span
                          className={`font-black text-2xl tracking-tight transition-colors ${activeAccordion === p.id ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"}`}
                        >
                          {p.name}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-8 h-8 transition-all ${activeAccordion === p.id ? "bg-white/10 rotate-180 p-1.5 rounded-full text-[#00E5C0]" : "text-zinc-700"}`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeAccordion === p.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-10 pb-12 pt-4 space-y-12 border-t border-white/5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                              {p.steps.map((step, sIdx) => (
                                <div
                                  key={sIdx}
                                  className="flex gap-6 group/step"
                                >
                                  <span className="w-10 h-10 rounded-full bg-[#00E5C0]/10 border border-[#00E5C0]/30 flex items-center justify-center text-sm font-black text-[#00E5C0] shrink-0 group-hover/step:scale-110 transition-transform">
                                    {(sIdx + 1).toString().padStart(2, "0")}
                                  </span>
                                  <p className="text-zinc-300 text-xl leading-relaxed pt-0.5">
                                    {step}
                                  </p>
                                </div>
                              ))}
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              <div className="bg-orange-500/10 border border-orange-500/20 rounded-[2rem] p-6 flex gap-6">
                                <AlertTriangle className="w-6 h-6 text-orange-400 shrink-0" />
                                <p className="text-orange-200/60 text-base leading-relaxed">
                                  {p.troubleshooting}
                                </p>
                              </div>
                              <div className="bg-[#00E5C0]/10 border border-[#00E5C0]/20 rounded-[2rem] p-6 flex gap-6">
                                <Lock className="w-6 h-6 text-[#00E5C0] shrink-0" />
                                <p className="text-[#00E5C0]/60 text-base leading-relaxed">
                                  {p.security}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Corporate Video Guide Section */}
      <div className="space-y-10 pt-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
          <h2 className="text-4xl font-black text-white flex items-center gap-4 tracking-tight">
            <PlayCircle className="w-10 h-10 text-[#00E5C0]" /> Masterclass
            Guide
          </h2>
          <div className="flex items-center gap-2 text-zinc-500 bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest">
              Training Content
            </span>
          </div>
        </div>

        <div className="relative aspect-video w-full rounded-[4rem] overflow-hidden border border-white/10 bg-zinc-900/50 group shadow-2xl p-10">
          <div className="h-full w-full rounded-3xl border border-white/10 bg-black/30 p-8 flex flex-col justify-between">
            <div>
              <h4 className="text-2xl font-black text-white mb-3">
                AnasFlow Implementation Masterclass
              </h4>
              <p className="text-zinc-300 max-w-3xl">
                Follow this quick path to master setup and operations: connect
                platforms, verify dashboard health, configure billing, and
                finalize client reporting workflows.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">
                  Step 1
                </p>
                <p className="text-sm text-white font-semibold">
                  Connect Integrations
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">
                  Step 2
                </p>
                <p className="text-sm text-white font-semibold">
                  Validate Alerts & Health
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">
                  Step 3
                </p>
                <p className="text-sm text-white font-semibold">
                  Publish Client Reports
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support CTA Hub */}
      <div className="bg-zinc-950 border border-white/5 rounded-[4rem] p-24 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#00E5C0]/5 to-transparent"></div>
        <div className="relative z-10 space-y-8">
          <h2 className="text-6xl font-black text-white tracking-tighter leading-tight">
            Priority Escalation Hub
          </h2>
          <p className="text-zinc-400 text-xl max-w-2xl mx-auto font-medium">
            Need deeper technical assistance? Our priority support engineers are
            standby to assist with your custom dashboard needs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button
              onClick={() => setIsTicketModalOpen(true)}
              className="bg-[#00E5C0] text-black px-16 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,229,192,0.2)]"
            >
              Submit a Ticket
            </button>
            <a
              href="mailto:anaasraja868@gmail.com"
              className="bg-zinc-900 text-white px-16 py-5 rounded-2xl font-black text-xl border border-white/10 hover:bg-zinc-800 transition-all"
            >
              Support Email
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
