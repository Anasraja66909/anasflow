"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  ExternalLink,
  FileText,
  CheckCircle2,
  Calendar,
  Layers,
  Users,
  Bot,
  Activity,
  AlertTriangle,
  Shield,
  Wallet,
  Zap,
  XCircle,
  ArrowRight,
  Settings,
  RefreshCw,
  Signal,
  Sparkles,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";
import { toast } from "sonner";

// Dynamically import Recharts to improve initial load
const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false },
);
const BarChart = dynamic(() => import("recharts").then((mod) => mod.BarChart), {
  ssr: false,
});
const Bar = dynamic(() => import("recharts").then((mod) => mod.Bar), {
  ssr: false,
});
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), {
  ssr: false,
});
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), {
  ssr: false,
});
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), {
  ssr: false,
});
const Cell = dynamic(() => import("recharts").then((mod) => mod.Cell), {
  ssr: false,
});

// Senior Dev Standard: Unified motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    priceYearly: 279,
    desc: "Perfect for single agency founders establishing their neural footprint.",
    clients: "5",
    platforms: "3",
    aiDoctor: "$4.99/fix",
    color: "border-white/10",
  },
  {
    id: "agency",
    name: "Agency",
    price: 79,
    priceYearly: 759,
    desc: "Surgical scaling for professional automation teams.",
    badge: "Most Popular",
    clients: "25",
    platforms: "Unlimited",
    aiDoctor: "10 free/mo",
    color: "border-[#00E5C0]/40",
    accent: "text-[#00E5C0]",
    glow: "shadow-[0_0_30px_rgba(0,229,192,0.15)]",
  },
  {
    id: "pro",
    name: "Pro",
    price: 199,
    priceYearly: 1909,
    desc: "Enterprise intelligence & wide-spectrum ROI telemetry.",
    clients: "100+",
    platforms: "Unlimited",
    aiDoctor: "Unlimited",
    color: "border-indigo-500/40",
    accent: "text-indigo-400",
    glow: "shadow-[0_0_30px_rgba(99,102,241,0.15)]",
  },
];

const COMPARISON = [
  {
    feature: "Multi-Tenant Clients",
    starter: "5",
    agency: "25",
    pro: "Unlimited",
  },
  {
    feature: "Global Platform Library",
    starter: "3",
    agency: "Unlimited",
    pro: "Unlimited",
  },
  {
    feature: "AI Automation Doctor",
    starter: "Pay-as-you-go",
    agency: "10 Monthly",
    pro: "Unlimited",
  },
  {
    feature: "Team Collaborators",
    starter: "1",
    agency: "5",
    pro: "Unlimited",
  },
  { feature: "White-Label Reports", starter: false, agency: true, pro: true },
  { feature: "API Access (Webhook)", starter: false, agency: false, pro: true },
];

export default function PremiumBillingPage() {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [usage, setUsage] = useState<any>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const [ovData, invData, pmData, usData] = await Promise.all([
        api.getBillingOverview(),
        api.getInvoices(),
        api.getPaymentMethods(),
        api.getUsageHistory(),
      ]);
      setOverview(ovData);
      setInvoices(invData.invoices);
      setPaymentMethods(pmData.methods);
      setUsage(usData.usage);
    } catch (err) {
      console.error(err);
      toast.error("Telemetry Refused.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-12 relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.03] to-transparent pointer-events-none" />
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full border-t-4 border-[#00E5C0] animate-spin shadow-[0_0_30px_rgba(0,229,192,0.3)]" />
          <div
            className="absolute inset-4 rounded-full border-r-4 border-indigo-500 animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          />
          <div className="absolute inset-0 m-auto flex items-center justify-center bg-zinc-900 rounded-full w-20 h-20 shadow-inner">
            <Wallet className="w-8 h-8 text-white animate-pulse" />
          </div>
        </div>
        <p className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.6em] animate-pulse leading-none">
          Establishing Financial Handshake
        </p>
      </div>
    );
  }

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
        className="relative z-10 space-y-24"
      >
        {/* Aggressive Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col xl:flex-row xl:items-end justify-between gap-12 pt-12"
        >
          <div className="max-w-4xl space-y-12 text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-indigo-500/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
                <Signal className="w-5 h-5 text-indigo-400 relative z-10" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-400">
                Economic Oversight Center
              </span>
            </div>
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white leading-[0.85]">
              Agency{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">
                Scaling.
              </span>
            </h1>
            <p className="text-zinc-500 text-xl font-medium max-w-3xl leading-relaxed">
              Orchestrating your agency's economic trajectory with
              professional-grade telemetry and unlimited neural reconstruction
              protocols.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-zinc-950/40 backdrop-blur-[40px] border border-white/5 p-2 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-12 py-6 rounded-[2rem] text-[11px] uppercase font-black tracking-[0.3em] transition-all duration-700 ${billingCycle === "monthly" ? "bg-white text-black shadow-3xl" : "text-zinc-600 hover:text-white"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-12 py-6 rounded-[2rem] text-[11px] uppercase font-black tracking-[0.3em] transition-all duration-700 ${billingCycle === "yearly" ? "bg-[#00E5C0] text-black shadow-3xl shadow-[#00E5C0]/40" : "text-zinc-600 hover:text-white"}`}
            >
              Yearly <span className="ml-2 opacity-60">SAVE 20%</span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {PLANS.map((plan) => {
            const isCurrent = overview?.current_plan === plan.id;
            const price =
              billingCycle === "yearly" ? plan.priceYearly : plan.price;
            return (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                className={`relative bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[4.5rem] p-12 flex flex-col justify-between overflow-hidden group/plan transition-all duration-700 hover:bg-zinc-900/40 shadow-[0_50px_150px_rgba(0,0,0,0.6)] ${plan.glow || ""} ${isCurrent ? "ring-2 ring-[#00E5C0]" : ""}`}
              >
                {plan.badge && (
                  <div className="absolute top-12 right-12 px-6 py-2 bg-[#00E5C0] text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-full shadow-[0_0_20px_rgba(0,229,192,0.5)] z-20 animate-pulse">
                    {plan.badge}
                  </div>
                )}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 blur-[120px] rounded-full pointer-events-none opacity-0 group-hover/plan:opacity-100 transition-opacity duration-1000" />

                <div className="relative z-10 text-left">
                  <h3
                    className={`text-5xl font-black mb-4 uppercase tracking-tighter ${plan.accent || "text-white"}`}
                  >
                    {plan.name}.
                  </h3>
                  <p className="text-zinc-600 text-[12px] font-medium leading-relaxed mb-16 max-w-[280px]">
                    {plan.desc}
                  </p>

                  <div className="flex items-baseline gap-4 mb-20 group-hover/plan:translate-x-2 transition-transform duration-700">
                    <span className="text-8xl font-black text-white tracking-tighter">
                      ${price}
                    </span>
                    <span className="text-zinc-700 font-black uppercase tracking-[0.5em] text-[10px]">
                      /{billingCycle === "yearly" ? "ANNUAL" : "MONTH"}
                    </span>
                  </div>

                  <div className="space-y-8 mb-20 text-left">
                    {[
                      {
                        lbl: "Client Entities",
                        val: plan.clients,
                        icon: Users,
                      },
                      {
                        lbl: "Platform Nodes",
                        val: plan.platforms,
                        icon: Layers,
                      },
                      {
                        lbl: "AI Dr. Extractions",
                        val: plan.aiDoctor,
                        icon: Bot,
                      },
                    ].map((feat, fidx) => (
                      <div
                        key={fidx}
                        className="flex items-center gap-6 group/feat"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center transition-all group-hover/feat:bg-white/5 group-hover/feat:border-white/10 shadow-inner">
                          <feat.icon className="w-6 h-6 text-zinc-600 group-hover/feat:text-white transition-colors" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xl font-black text-white leading-none mb-2">
                            {feat.val}
                          </span>
                          <span className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.4em]">
                            {feat.lbl}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  disabled={isCurrent}
                  className={`w-full py-8 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] transition-all duration-700 flex items-center justify-center gap-6 relative overflow-hidden group/btn ${isCurrent ? "bg-zinc-900/50 text-zinc-700 cursor-not-allowed border border-white/5" : "bg-white text-black hover:bg-[#00E5C0] hover:shadow-[0_0_40px_rgba(0,229,192,0.5)] shadow-2xl"}`}
                >
                  {isCurrent ? (
                    <Shield className="w-5 h-5" />
                  ) : (
                    <Zap className="w-5 h-5 transition-transform group-hover/btn:scale-125 group-hover/btn:rotate-12" />
                  )}
                  {isCurrent ? "Current Plan" : "Upgrade"}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Capability Ledger */}
        <motion.div variants={itemVariants} className="space-y-12">
          <div className="flex items-center gap-6 text-left">
            <div className="w-14 h-14 rounded-3xl bg-[#00E5C0]/10 border border-[#00E5C0]/20 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#00E5C0]/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
              <Shield className="w-7 h-7 text-[#00E5C0] relative z-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                Capability Matrix<span className="text-[#00E5C0]">.</span>
              </h2>
              <p className="text-[11px] text-zinc-700 font-black uppercase tracking-[0.5em]">
                Consolidated Feature Access Ledger
              </p>
            </div>
          </div>

          <div className="bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[4rem] overflow-hidden shadow-2xl relative">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-black/40">
                  <th className="px-16 py-12 text-[11px] font-black text-zinc-600 uppercase tracking-[0.5em]">
                    Neural Feature Node
                  </th>
                  <th className="px-16 py-12 text-[11px] font-black text-white uppercase tracking-[0.5em] text-center">
                    Starter
                  </th>
                  <th className="px-16 py-12 text-[11px] font-black text-[#00E5C0] uppercase tracking-[0.5em] text-center bg-[#00E5C0]/[0.02]">
                    Agency
                  </th>
                  <th className="px-16 py-12 text-[11px] font-black text-indigo-400 uppercase tracking-[0.5em] text-center">
                    Pro
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {COMPARISON.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-white/[0.02] transition-all duration-500 group/row"
                  >
                    <td className="px-16 py-10">
                      <span className="text-xl font-black text-zinc-500 uppercase tracking-tighter group-hover/row:text-white transition-colors">
                        {row.feature}
                      </span>
                    </td>
                    <td className="px-16 py-10 text-center font-black text-zinc-700 text-sm italic">
                      {row.starter === true ? (
                        <CheckCircle2 className="w-8 h-8 text-zinc-800 mx-auto" />
                      ) : row.starter === false ? (
                        <XCircle className="w-8 h-8 text-zinc-900 mx-auto" />
                      ) : (
                        row.starter
                      )}
                    </td>
                    <td className="px-16 py-10 text-center font-black text-[#00E5C0] bg-[#00E5C0]/[0.01]">
                      {row.agency === true ? (
                        <div className="w-10 h-10 rounded-full bg-[#00E5C0]/10 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,229,192,0.2)]">
                          <CheckCircle2 className="w-6 h-6 text-[#00E5C0]" />
                        </div>
                      ) : row.agency === false ? (
                        <XCircle className="w-8 h-8 text-zinc-900 mx-auto opacity-30" />
                      ) : (
                        row.agency
                      )}
                    </td>
                    <td className="px-16 py-10 text-center font-black text-indigo-400 text-sm">
                      {row.pro === true ? (
                        <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                          <CheckCircle2 className="w-6 h-6 text-indigo-400" />
                        </div>
                      ) : row.pro === false ? (
                        <XCircle className="w-8 h-8 text-zinc-900 mx-auto opacity-30" />
                      ) : (
                        row.pro
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Global Financial Control Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
          {/* Neural Capacity Hub */}
          <motion.div
            variants={itemVariants}
            className="bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[4.5rem] p-16 space-y-16 shadow-2xl relative group/usage transition-all duration-700 hover:border-indigo-500/10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="flex items-center justify-between relative z-10">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">
                  Neural Capacity<span className="text-indigo-400">.</span>
                </h3>
                <p className="text-[11px] text-zinc-700 font-black uppercase tracking-[0.5em]">
                  Resource Utilization Pulse
                </p>
              </div>
              <Link
                href="/dashboard/settings"
                className="w-16 h-16 rounded-[1.5rem] bg-white/[0.02] border border-white/10 flex items-center justify-center text-zinc-700 hover:text-white hover:bg-white/5 transition-all shadow-inner"
              >
                <Settings className="w-7 h-7" />
              </Link>
            </div>

            <div className="space-y-16 relative z-10">
              {[
                {
                  lbl: "Managed Partner Entities",
                  used: usage?.clients?.used || 0,
                  limit: usage?.clients?.limit || 0,
                  color: "bg-indigo-500",
                  glow: "shadow-[0_0_20px_rgba(99,102,241,0.4)]",
                },
                {
                  lbl: "Active Neural Automations",
                  used: usage?.automations?.used || 0,
                  limit: usage?.automations?.limit || 0,
                  color: "bg-[#00E5C0]",
                  glow: "shadow-[0_0_20px_rgba(0,229,192,0.4)]",
                },
              ].map((u, ui) => {
                const pct =
                  u.limit === -1
                    ? 100
                    : Math.min(100, Math.round((u.used / u.limit) * 100));
                return (
                  <div key={ui} className="space-y-8">
                    <div className="flex justify-between items-end">
                      <div className="space-y-3">
                        <span className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.4em]">
                          {u.lbl}
                        </span>
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-3 h-3 rounded-full ${u.color} animate-pulse ${u.glow}`}
                          />
                          <span className="text-5xl font-black text-white tracking-tighterLeading-[0.8]">
                            {u.used}
                            <span className="text-zinc-800 font-black mx-3 select-none">
                              /
                            </span>
                            {u.limit === -1 ? "∞" : u.limit}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-black text-zinc-800 uppercase tracking-widest bg-white/[0.02] px-4 py-2 rounded-full border border-white/5">
                        {pct}% LOAD
                      </span>
                    </div>
                    <div className="h-4 bg-black/60 rounded-full overflow-hidden border border-white/5 shadow-inner p-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1.5 }}
                        className={`h-full rounded-full ${u.color} ${u.glow} relative`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent animate-shimmer" />
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Liquid Financial Slate */}
          <motion.div
            variants={itemVariants}
            className="bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[4.5rem] p-16 flex flex-col justify-between shadow-2xl relative overflow-hidden group/card hover:border-[#00E5C0]/10 transition-all duration-700"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#00E5C0]/[0.03] via-transparent to-transparent pointer-events-none rounded-[4.5rem] blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000" />

            <div className="flex items-center justify-between relative z-10">
              <div className="w-20 h-20 bg-white/[0.05] border border-white/10 rounded-[2rem] flex items-center justify-center shadow-inner group-hover/card:rotate-[15deg] transition-transform duration-1000">
                <CreditCard className="w-10 h-10 text-white" />
              </div>
              <div className="px-8 py-3 bg-black/40 border border-white/5 rounded-2xl flex items-center gap-4 backdrop-blur-2xl shadow-xl">
                <div className="w-2 h-2 bg-[#00E5C0] rounded-full animate-ping shadow-[0_0_15px_#00E5C0]" />
                <span className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.5em]">
                  Linked Protocol Verified
                </span>
              </div>
            </div>

            <div className="space-y-6 relative z-10 pt-12">
              <p className="text-5xl md:text-6xl font-black text-white tracking-[0.25em] uppercase transition-all duration-1000 group-hover/card:tracking-[0.3em] font-mono select-none">
                •••• {paymentMethods[0]?.last4 || "4242"}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10">
                <div className="space-y-2">
                  <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.4em]">
                    Corporate Entity Pulse
                  </p>
                  <p className="text-sm font-black text-zinc-500 uppercase tracking-widest">
                    Expires {paymentMethods[0]?.exp_month || "01"}/
                    {paymentMethods[0]?.exp_year || "28"}
                  </p>
                </div>
                <div className="hidden sm:block w-px h-10 bg-white/[0.05] rounded-full" />
                <div className="space-y-2">
                  <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.4em]">
                    Vault Type Identity
                  </p>
                  <p className="text-sm font-black text-zinc-500 uppercase tracking-widest">
                    VISA MASTER_EXPORT
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between pt-16 border-t border-white/5 gap-12 relative z-10">
              <div className="space-y-3 text-left w-full sm:w-auto">
                <p className="text-[11px] text-zinc-700 font-black uppercase tracking-[0.5em]">
                  Settlement Balance
                </p>
                <p className="text-6xl font-black text-white tracking-tighter leading-none">
                  ${overview?.amount_due || "0.00"}
                </p>
              </div>
              <button className="w-full sm:w-fit px-12 py-8 bg-white text-black font-black rounded-[2rem] hover:bg-[#00E5C0] transition-all duration-700 uppercase tracking-[0.4em] text-[11px] shadow-2xl hover:shadow-[#00E5C0]/40 flex items-center justify-center gap-4 group/btn">
                <Shield className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                Update Hub
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
}
