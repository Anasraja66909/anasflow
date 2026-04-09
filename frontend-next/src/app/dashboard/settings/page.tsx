"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Zap,
  Shield,
  Users,
  Layers,
  Bot,
  FileText,
  Receipt,
  ExternalLink,
  Crown,
  Activity,
  Save,
  Terminal,
  Sparkles,
  Bell,
  Globe,
  ShieldCheck,
  Key,
  Lock,
  ChevronRight,
  RefreshCw,
  Briefcase,
  Mail,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

// Senior Dev Standard: Unified motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    priceYearly: 279,
    desc: "Perfect for single agency founders establishing their neural footprint.",
    color: "border-white/10",
    accent: "text-zinc-500",
    features: ["Up to 5 Clients", "3 Integrations", "Cost Tracking"],
    missing: ["PDF Reports", "White-label"],
  },
  {
    id: "agency",
    name: "Agency",
    price: 79,
    priceYearly: 759,
    badge: "Most Popular",
    desc: "Surgical scaling for professional automation teams.",
    color: "border-[#00E5C0]/40",
    accent: "text-[#00E5C0]",
    features: [
      "Up to 25 Clients",
      "Unlimited Integrations",
      "1-Click PDF Reports",
      "10 AI Doctor Fixes/mo",
    ],
    missing: ["White-label Portal"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 199,
    priceYearly: 1909,
    desc: "Enterprise intelligence & wide-spectrum ROI telemetry.",
    color: "border-indigo-500/40",
    accent: "text-indigo-400",
    features: [
      "100 Clients",
      "Unlimited Everything",
      "White-label Portal",
      "Custom Domain",
      "API Access",
    ],
    missing: [],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    desc: "Bespoke infrastructure for global operational scale.",
    color: "border-white/10",
    accent: "text-zinc-400",
    features: [
      "Unlimited Everything",
      "Dedicated Manager",
      "On-Premise Option",
      "SLA Guarantee",
      "SOC2 Compliance",
    ],
    missing: [],
  },
];

const TABS = [
  { id: "Billing", icon: Receipt },
  { id: "Profile", icon: Briefcase },
  { id: "Security", icon: ShieldCheck },
  { id: "Notifications", icon: Bell },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Billing");
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [currentPlan, setCurrentPlan] = useState<any>(null);
  const [upgrading, setUpgrading] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    fullName: "",
    timezone: "UTC",
    company: "",
  });
  const [security, setSecurity] = useState({
    sessionTimeout: "30",
    twoFactor: false,
  });
  const [notificationPrefs, setNotificationPrefs] = useState({
    alerts: true,
    weeklySummary: true,
    optimizationSignals: true,
  });

  useEffect(() => {
    fetchPlan();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setProfile({
      fullName: user.full_name || "Enterprise User",
      timezone: localStorage.getItem("pref_timezone") || "UTC",
      company: localStorage.getItem("pref_company") || "Strategic Entity",
    });
    setSecurity({
      sessionTimeout: localStorage.getItem("pref_session_timeout") || "30",
      twoFactor: localStorage.getItem("pref_2fa") === "true",
    });
    setNotificationPrefs({
      alerts: localStorage.getItem("pref_alerts") !== "false",
      weeklySummary: localStorage.getItem("pref_weekly_summary") !== "false",
      optimizationSignals:
        localStorage.getItem("pref_optimization_signals") !== "false",
    });
  }, []);

  async function fetchPlan() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/billing/current", {
        headers: token ? { Authorization: "Bearer " + token } : {},
      });
      if (res.ok) setCurrentPlan(await res.json());
    } catch (e) {
      console.error(e);
    }
  }

  const handleSave = (type: string) => {
    toast.success("Preferences Synchronized.", {
      description: `${type} parameters have been locked into the master ledger.`,
    });
  };

  const handleUpgrade = async (planId: string) => {
    if (planId === "enterprise") {
      window.open(
        "mailto:sales@anasflow.com?subject=Enterprise Plan",
        "_blank",
      );
      return;
    }
    setUpgrading(planId);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:8000/billing/create-checkout?plan_id=${planId}&billing_cycle=${billing}`,
        {
          method: "POST",
          headers: token ? { Authorization: "Bearer " + token } : {},
        },
      );
      const data = await res.json();
      if (data.checkout_url) window.location.href = data.checkout_url;
    } catch (e) {
      toast.error("Transmission Interruption.");
    } finally {
      setUpgrading(null);
    }
  };

  const usage = currentPlan?.usage;
  const usagePct = (used: number, limit: number) =>
    limit === -1 ? 100 : Math.min(100, Math.round((used / limit) * 100));

  return (
    <div className="min-h-screen pb-40">
      {/* Immersive Background Architecture */}
      <div className="fixed top-0 right-0 w-[50%] h-[50%] bg-indigo-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[50%] h-[50%] bg-[#00E5C0]/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 space-y-16"
      >
        {/* Aggressive Header */}
        <motion.div
          variants={itemVariants}
          className="pt-12 text-left space-y-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-950/40 border border-white/5 rounded-xl flex items-center justify-center relative overflow-hidden group">
              <Terminal className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-600">
              Command Center Protocol
            </span>
          </div>
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white leading-[0.85] uppercase">
            Global{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">
              Settings.
            </span>
          </h1>
        </motion.div>

        {/* Tactical Tab Architecture */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 p-2 bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[2.5rem] w-fit shadow-2xl relative"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-10 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-700 flex items-center gap-4 group ${
                activeTab === tab.id
                  ? "bg-white text-black shadow-3xl"
                  : "text-zinc-600 hover:text-white"
              }`}
            >
              <tab.icon
                className={`w-4 h-4 transition-transform ${activeTab === tab.id ? "scale-110" : "group-hover:scale-110"}`}
              />
              {tab.id}
            </button>
          ))}
        </motion.div>

        {/* Content Section */}
        <AnimatePresence mode="wait">
          {activeTab === "Billing" && (
            <motion.div
              key="billing"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-16 text-left"
            >
              {/* Active Plan Diagnostic */}
              {currentPlan && (
                <div className="bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden group/active">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#00E5C0]/5 blur-[120px] rounded-full pointer-events-none" />
                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-12 mb-16 relative z-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#00E5C0]/10 border border-[#00E5C0]/20 rounded-2xl flex items-center justify-center">
                          <Crown className="w-6 h-6 text-[#00E5C0]" />
                        </div>
                        <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
                          Agency Engine.
                        </h2>
                        <span className="px-5 py-2 bg-[#00E5C0]/20 text-[#00E5C0] border border-[#00E5C0]/40 rounded-full text-[10px] font-black uppercase tracking-widest shadow-inner">
                          Operational
                        </span>
                      </div>
                      <p className="text-zinc-600 text-lg font-medium italic">
                        Next Settlement:{" "}
                        <span className="text-white font-black">
                          {currentPlan.next_billing_date}
                        </span>{" "}
                        • ${currentPlan.amount_due} Liquid Extraction
                      </p>
                    </div>
                    <button className="px-10 py-6 bg-zinc-900 border border-white/5 text-zinc-500 hover:text-white rounded-[1.75rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-4 group/inv">
                      <Receipt className="w-4 h-4 transition-transform group-hover/inv:-rotate-12" />
                      Audit Invoices
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {[
                      {
                        label: "Partner Entities",
                        used: usage?.clients_used || 0,
                        limit: usage?.clients_limit || 0,
                        icon: Users,
                        color: "bg-indigo-500",
                      },
                      {
                        label: "Platform Nodes",
                        used: usage?.platforms_used || 0,
                        limit: usage?.platforms_limit || 0,
                        icon: Layers,
                        color: "bg-[#00E5C0]",
                      },
                      {
                        label: "RECONSTRUCTION FIXES",
                        used: usage?.ai_doctor_fixes_used || 0,
                        limit: usage?.ai_doctor_fixes_limit || 0,
                        icon: Bot,
                        color: "bg-zinc-500",
                      },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className="bg-black/40 rounded-[2.5rem] p-10 border border-white/5 shadow-inner group/stat"
                      >
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center gap-3">
                            <m.icon className="w-4 h-4 text-zinc-700 group-hover/stat:text-white transition-colors" />
                            <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest leading-none">
                              {m.label}
                            </span>
                          </div>
                          <span className="text-2xl font-black text-white uppercase tracking-tighter">
                            {m.used}
                            <span className="text-zinc-800 mx-2">/</span>
                            {m.limit === -1 ? "∞" : m.limit}
                          </span>
                        </div>
                        <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-white/5 p-1">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width:
                                (m.limit === -1
                                  ? 100
                                  : usagePct(m.used, m.limit)) + "%",
                            }}
                            className={
                              "h-full rounded-full transition-all " + m.color
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upgrade Matrix Grid */}
              <div className="space-y-12">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
                      Expansion Protocols.
                    </h2>
                    <p className="text-[11px] text-zinc-700 font-black uppercase tracking-[0.4em]">
                      Select Engine Scale
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-zinc-950/40 backdrop-blur-3xl border border-white/5 p-2 rounded-full">
                    <button
                      onClick={() => setBilling("monthly")}
                      className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${billing === "monthly" ? "bg-white text-black" : "text-zinc-600 hover:text-white"}`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBilling("yearly")}
                      className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${billing === "yearly" ? "bg-white text-black" : "text-zinc-600 hover:text-white"}`}
                    >
                      Yearly{" "}
                      <span className="text-[#00E5C0] ml-2 font-black">
                        -20%
                      </span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {PLANS.map((plan) => {
                    const isCurrent = currentPlan?.current_plan === plan.id;
                    const price =
                      billing === "yearly" ? plan.priceYearly : plan.price;
                    return (
                      <div
                        key={plan.id}
                        className={`bg-zinc-950/40 backdrop-blur-[40px] border border-white/5 rounded-[3.5rem] p-10 flex flex-col justify-between overflow-hidden group/plan transition-all duration-700 hover:bg-zinc-900/40 shadow-2xl ${isCurrent ? "ring-2 ring-[#00E5C0]" : ""}`}
                      >
                        {plan.badge && (
                          <div className="absolute top-8 right-8 px-4 py-1.5 bg-[#00E5C0] text-black text-[9px] font-black uppercase tracking-widest rounded-full">
                            {plan.badge}
                          </div>
                        )}
                        <div className="text-left space-y-4">
                          <h3
                            className={`text-4xl font-black uppercase tracking-tighter leading-none ${plan.accent}`}
                          >
                            {plan.name}.
                          </h3>
                          <p className="text-zinc-600 text-[11px] font-medium leading-relaxed italic">
                            {plan.desc}
                          </p>
                          <div className="pt-8 pb-12 flex items-baseline gap-2">
                            <span className="text-6xl font-black text-white tracking-tighter">
                              {plan.price ? `$${price}` : "???"}
                            </span>
                            {plan.price && (
                              <span className="text-zinc-800 font-black uppercase tracking-[0.3em] text-[9px]">
                                /{billing === "yearly" ? "ANN" : "MO"}
                              </span>
                            )}
                          </div>
                          <div className="space-y-4 pb-12 border-b border-white/5">
                            {plan.features.map((f) => (
                              <div
                                key={f}
                                className="flex items-center gap-4 text-zinc-500 group-hover/plan:text-zinc-300 transition-colors"
                              >
                                <CheckCircle2 className="w-4 h-4 text-[#00E5C0]" />
                                <span className="text-xs font-bold uppercase tracking-tighter">
                                  {f}
                                </span>
                              </div>
                            ))}
                            {plan.missing.map((f) => (
                              <div
                                key={f}
                                className="flex items-center gap-4 text-zinc-800"
                              >
                                <XCircle className="w-4 h-4 opacity-20" />
                                <span className="text-xs font-bold uppercase tracking-tighter opacity-20">
                                  {f}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <button
                          disabled={isCurrent || upgrading === plan.id}
                          onClick={() => handleUpgrade(plan.id)}
                          className={`w-full mt-10 py-6 rounded-[1.75rem] text-[11px] font-black uppercase tracking-[0.35em] transition-all duration-700 flex items-center justify-center gap-4 ${
                            isCurrent
                              ? "bg-zinc-900 text-zinc-700 border border-white/5"
                              : "bg-white text-black hover:bg-[#00E5C0] shadow-2xl"
                          }`}
                        >
                          {upgrading === plan.id ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : isCurrent ? (
                            "Current Plan"
                          ) : (
                            "Upgrade"
                          )}
                          {!isCurrent && !upgrading && (
                            <ArrowRight className="w-4 h-4 group-hover/plan:translate-x-2 transition-transform" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "Profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl text-left"
            >
              <div className="bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[4rem] p-16 shadow-3xl space-y-16 relative overflow-hidden group/form">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="flex items-center gap-8 relative z-10">
                  <div className="w-20 h-20 bg-zinc-900 border border-white/5 rounded-[2.5rem] flex items-center justify-center shadow-inner group-hover/form:rotate-[15deg] transition-transform duration-1000">
                    <Briefcase className="w-10 h-10 text-indigo-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">
                      Identity Profile.
                    </h3>
                    <p className="text-[11px] text-zinc-700 font-black uppercase tracking-[0.5em]">
                      Synchronizing Master Node
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                  {[
                    {
                      label: "Identity Full Name",
                      value: profile.fullName,
                      readOnly: true,
                      icon: Users,
                    },
                    {
                      label: "Strategic Entity",
                      value: profile.company,
                      key: "company",
                      icon: Globe,
                    },
                    {
                      label: "Neural Timezone",
                      value: profile.timezone,
                      key: "timezone",
                      icon: Activity,
                      type: "select",
                    },
                  ].map((field) => (
                    <div key={field.label} className="space-y-4">
                      <label className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] ml-2">
                        {field.label}
                      </label>
                      <div className="relative group/input">
                        <field.icon className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-800 transition-colors group-focus-within/input:text-indigo-400" />
                        {field.type === "select" ? (
                          <select className="w-full bg-black/40 border border-white/5 rounded-[1.75rem] py-6 pl-20 pr-8 text-white font-black text-xs tracking-widest focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer">
                            <option>UTC</option>
                            <option>Asia/Karachi</option>
                            <option>Europe/London</option>
                            <option>America/New_York</option>
                          </select>
                        ) : (
                          <input
                            value={field.value}
                            readOnly={field.readOnly}
                            className={`w-full border border-white/5 rounded-[1.75rem] py-6 pl-20 pr-8 text-white font-black text-xs tracking-widest focus:outline-none focus:border-indigo-500 transition-all ${field.readOnly ? "bg-transparent text-zinc-700 cursor-not-allowed" : "bg-black/40"}`}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleSave("Profile")}
                  className="px-16 py-8 bg-white text-black font-black rounded-[2.5rem] hover:bg-[#00E5C0] transition-all duration-700 text-[11px] uppercase tracking-[0.4em] shadow-2xl relative z-10 flex items-center justify-center gap-6 group/btn"
                >
                  <Save className="w-6 h-6 transition-transform group-hover/btn:scale-110" />
                  Apply Parameters
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "Security" && (
            <motion.div
              key="security"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl text-left"
            >
              <div className="bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[4rem] p-16 shadow-3xl space-y-16 relative overflow-hidden group/form">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#00E5C0]/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="flex items-center gap-8 relative z-10">
                  <div className="w-20 h-20 bg-zinc-900 border border-white/5 rounded-[2.5rem] flex items-center justify-center shadow-inner group-hover/form:rotate-[15deg] transition-transform duration-1000">
                    <Lock className="w-10 h-10 text-[#00E5C0]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">
                      Security Vault.
                    </h3>
                    <p className="text-[11px] text-zinc-700 font-black uppercase tracking-[0.5em]">
                      Protocol Authorization Hub
                    </p>
                  </div>
                </div>

                <div className="space-y-12 relative z-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] ml-2">
                      Session Dissolve Interval
                    </label>
                    <div className="relative group/input">
                      <Key className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-800 transition-colors group-focus-within/input:text-[#00E5C0]" />
                      <select className="w-full bg-black/40 border border-white/5 rounded-[1.75rem] py-6 pl-20 pr-8 text-white font-black text-xs tracking-widest focus:outline-none focus:border-[#00E5C0]/40 transition-all appearance-none cursor-pointer">
                        <option>15 Minutes</option>
                        <option>30 Minutes</option>
                        <option>1 Hour</option>
                        <option>2 Hours</option>
                      </select>
                    </div>
                  </div>

                  <label className="flex items-center gap-8 cursor-pointer p-8 rounded-[2.5rem] bg-black/40 border border-white/10 hover:border-[#00E5C0]/40 transition-all group/label shadow-inner group-hover/label:bg-black">
                    <div
                      className={`w-10 h-10 rounded-2xl border flex items-center justify-center transition-all duration-500 bg-white/5 border-white/10`}
                    >
                      <div className="w-4 h-4 bg-[#00E5C0] rounded-full animate-pulse shadow-[0_0_10px_#00E5C0]" />
                    </div>
                    <input type="checkbox" className="hidden" />
                    <div className="space-y-1 text-left">
                      <span className="text-[11px] text-white font-black uppercase tracking-[0.4em]">
                        Multi-Factor Authentication
                      </span>
                      <p className="text-[10px] text-zinc-700 font-black uppercase tracking-widest leading-none">
                        Require liquid key on next identification cycle
                      </p>
                    </div>
                  </label>
                </div>

                <button
                  onClick={() => handleSave("Security")}
                  className="px-16 py-8 bg-white text-black font-black rounded-[2.5rem] hover:bg-[#00E5C0] transition-all duration-700 text-[11px] uppercase tracking-[0.4em] shadow-2xl relative z-10 flex items-center justify-center gap-6 group/btn"
                >
                  <ShieldCheck className="w-6 h-6 transition-transform group-hover/btn:scale-110" />
                  Lock Protocol
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "Notifications" && (
            <motion.div
              key="notif"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl text-left"
            >
              <div className="bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[4rem] p-16 shadow-3xl space-y-16 relative overflow-hidden group/form">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="flex items-center gap-8 relative z-10">
                  <div className="w-20 h-20 bg-zinc-900 border border-white/5 rounded-[2.5rem] flex items-center justify-center shadow-inner group-hover/form:rotate-[15deg] transition-transform duration-1000">
                    <Bell className="w-10 h-10 text-indigo-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">
                      Audit Alerts.
                    </h3>
                    <p className="text-[11px] text-zinc-700 font-black uppercase tracking-[0.5em]">
                      Notification Dispatch Controls
                    </p>
                  </div>
                </div>

                <div className="space-y-8 relative z-10">
                  {[
                    {
                      t: "Neural Critical Pulse",
                      d: "Emergency platform downtime & protocol failures",
                      icon: AlertCircle,
                    },
                    {
                      t: "Weekly Telemetry Export",
                      d: "Consolidated ROI intelligence delivered every 168 hours",
                      icon: FileText,
                    },
                    {
                      t: "Optimization Signals",
                      d: "AI Doctor suggestions for operational yield improvements",
                      icon: Sparkles,
                    },
                  ].map((pref, idx) => (
                    <label
                      key={idx}
                      className="flex items-center justify-between p-8 rounded-[2.5rem] bg-black/40 border border-white/10 hover:border-indigo-500/40 transition-all group/notif shadow-inner cursor-pointer"
                    >
                      <div className="flex items-center gap-8">
                        <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover/notif:bg-indigo-500/10 group-hover/notif:border-indigo-500/30">
                          <pref.icon className="w-5 h-5 text-zinc-700 group-hover/notif:text-indigo-400 transition-colors" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[11px] text-white font-black uppercase tracking-[0.3em] group-hover/notif:text-indigo-400 transition-colors">
                            {pref.t}
                          </span>
                          <p className="text-[10px] text-zinc-800 font-bold uppercase tracking-widest">
                            {pref.d}
                          </p>
                        </div>
                      </div>
                      <div className="w-14 h-8 bg-zinc-900 rounded-full border border-white/5 relative p-1 transition-colors group-hover/notif:border-indigo-500/20">
                        <div className="w-6 h-6 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]" />
                      </div>
                    </label>
                  ))}
                </div>

                <button
                  onClick={() => handleSave("Notifications")}
                  className="px-16 py-8 bg-white text-black font-black rounded-[2.5rem] hover:bg-[#00E5C0] transition-all duration-700 text-[11px] uppercase tracking-[0.4em] shadow-2xl relative z-10 flex items-center justify-center gap-6 group/btn"
                >
                  <Save className="w-6 h-6 transition-transform group-hover/btn:scale-110" />
                  Lock Dispatch Plan
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            opacity: 0.3;
            transform: translateX(-100%);
          }
          100% {
            opacity: 1;
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite linear;
        }
      `}</style>
    </div>
  );
}
