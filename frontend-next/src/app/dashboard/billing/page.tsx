"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  CheckCircle2,
  Users,
  Layers,
  Bot,
  Shield,
  Zap,
  XCircle,
  Settings,
  Wallet,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";
import { toast } from "sonner";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    priceYearly: 279,
    desc: "Perfect for single founders establishing their online presence.",
    clients: "5 active clients",
    platforms: "3 integrations",
    aiDoctor: "Pay-as-you-go fixes",
  },
  {
    id: "agency",
    name: "Agency",
    price: 79,
    priceYearly: 759,
    desc: "Advanced tools for professional automation teams.",
    badge: "Most Popular",
    clients: "25 active clients",
    platforms: "Unlimited integrations",
    aiDoctor: "10 free fixes/month",
    isPopular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 199,
    priceYearly: 1909,
    desc: "Complete agency tools with advanced reporting and tracking.",
    clients: "100+ active clients",
    platforms: "Unlimited integrations",
    aiDoctor: "Unlimited fixes",
  },
];

const COMPARISON = [
  { feature: "Multi-Tenant Clients", starter: "5", agency: "25", pro: "Unlimited" },
  { feature: "Global Platform Library", starter: "3", agency: "Unlimited", pro: "Unlimited" },
  { feature: "AI Automation Doctor", starter: "Pay-as-you-go", agency: "10 Monthly", pro: "Unlimited" },
  { feature: "Team Collaborators", starter: "1", agency: "5", pro: "Unlimited" },
  { feature: "White-Label Reports", starter: false, agency: true, pro: true },
  { feature: "API Access (Webhook)", starter: false, agency: false, pro: true },
];

export default function BillingPage() {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [usage, setUsage] = useState<any>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

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
      toast.error("Failed to load billing information.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-8 h-8 border-2 border-[#00E5C0] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-zinc-400 font-medium tracking-wide">Loading billing details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-16"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8">
          <div className="max-w-2xl space-y-4 text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Plans & Billing
            </h1>
            <p className="text-slate-500 dark:text-zinc-400 text-base leading-relaxed">
              Manage your agency's subscription, view billing history, and monitor your usage limits seamlessly.
            </p>
          </div>

          <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-zinc-900/80 border border-slate-200 dark:border-white/10 rounded-xl">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                billingCycle === "monthly"
                  ? "bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                billingCycle === "yearly"
                  ? "bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200"
              }`}
            >
              Yearly
              <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => {
            const isCurrent = overview?.current_plan === plan.id;
            const price = billingCycle === "yearly" ? plan.priceYearly : plan.price;
            
            return (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                className={`relative bg-white dark:bg-[#0c0f17] border rounded-2xl p-8 flex flex-col justify-between overflow-hidden transition-shadow duration-300 ${
                  plan.isPopular 
                    ? "border-indigo-500/50 shadow-xl shadow-indigo-500/5 dark:shadow-none" 
                    : "border-slate-200 dark:border-white/10 shadow-sm"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 px-4 py-1.5 bg-indigo-500 text-white text-[11px] font-bold uppercase tracking-widest rounded-bl-xl z-20">
                    {plan.badge}
                  </div>
                )}
                
                <div className="relative z-10 text-left flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-slate-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 h-10">
                    {plan.desc}
                  </p>

                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      ${price}
                    </span>
                    <span className="text-slate-500 dark:text-zinc-500 font-medium text-sm">
                      /{billingCycle === "yearly" ? "year" : "month"}
                    </span>
                  </div>

                  <div className="space-y-4 mb-8 text-left">
                    {[
                      { lbl: plan.clients, icon: Users },
                      { lbl: plan.platforms, icon: Layers },
                      { lbl: plan.aiDoctor, icon: Bot },
                    ].map((feat, fidx) => (
                      <div key={fidx} className="flex items-center gap-3">
                        <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${plan.isPopular ? "text-indigo-500" : "text-emerald-500"}`} />
                        <span className="text-sm text-slate-700 dark:text-zinc-300">
                          {feat.lbl}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  disabled={isCurrent}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    isCurrent 
                      ? "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-zinc-500 cursor-not-allowed border border-transparent" 
                      : plan.isPopular
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                        : "bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200"
                  }`}
                >
                  {isCurrent ? "Current Plan" : "Upgrade to " + plan.name}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="text-left space-y-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Compare features</h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400">Detailed breakdown of everything included in our plans.</p>
          </div>

          <div className="bg-white dark:bg-zinc-950/40 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-max">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider w-2/5">
                      Features
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider text-center w-1/5">
                      Starter
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider text-center bg-indigo-50 dark:bg-indigo-500/5 w-1/5">
                      Agency
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider text-center w-1/5">
                      Pro
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                  {COMPARISON.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-700 dark:text-zinc-300">
                          {row.feature}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.starter === true ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                        ) : row.starter === false ? (
                          <span className="block w-4 h-0.5 bg-slate-300 dark:bg-zinc-700 mx-auto rounded-full" />
                        ) : (
                          <span className="text-sm font-medium text-slate-600 dark:text-zinc-400">{row.starter}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center bg-indigo-50/50 dark:bg-indigo-500/[0.02]">
                        {row.agency === true ? (
                          <CheckCircle2 className="w-5 h-5 text-indigo-500 mx-auto" />
                        ) : row.agency === false ? (
                          <span className="block w-4 h-0.5 bg-slate-300 dark:bg-zinc-700 mx-auto rounded-full" />
                        ) : (
                          <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">{row.agency}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.pro === true ? (
                          <CheckCircle2 className="w-5 h-5 text-slate-700 dark:text-white mx-auto" />
                        ) : row.pro === false ? (
                          <span className="block w-4 h-0.5 bg-slate-300 dark:bg-zinc-700 mx-auto rounded-full" />
                        ) : (
                          <span className="text-sm font-medium text-slate-600 dark:text-zinc-400">{row.pro}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Payment & Usage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
          
          {/* Usage Widget */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-500" /> Usage Limits
                </h3>
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                  Monitor your account resources based on your current plan.
                </p>
              </div>
              <Link
                href="/dashboard/settings"
                className="w-10 h-10 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                title="Usage Settings"
              >
                <Settings className="w-5 h-5" />
              </Link>
            </div>

            <div className="space-y-6">
              {[
                { lbl: "Current Clients", used: usage?.clients?.used || 0, limit: usage?.clients?.limit || 15, color: "bg-indigo-500" },
                { lbl: "Active Integrations", used: usage?.automations?.used || 0, limit: usage?.automations?.limit || 5, color: "bg-emerald-500" },
              ].map((u, ui) => {
                const pct = u.limit === -1 ? 0 : Math.min(100, Math.round((u.used / u.limit) * 100));
                return (
                  <div key={ui} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">{u.lbl}</span>
                      <span className="text-sm font-medium text-slate-500 dark:text-zinc-400">
                        {u.used} / {u.limit === -1 ? "Unlimited" : u.limit}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${u.color}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Payment Method Widget */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-indigo-950/20 border border-slate-200 dark:border-indigo-500/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-indigo-500" /> Payment Method
                </h3>
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                  Manage your billing details and invoices.
                </p>
              </div>
              <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-lg flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                  Active
                </span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5 rounded-xl p-5 mb-6 flex items-center gap-4">
              <div className="w-12 h-8 rounded bg-white shadow-sm border border-slate-200 flex flex-col items-center justify-center text-[8px] font-black tracking-wider text-slate-800 select-none">
                VISA
              </div>
              <div>
                <p className="text-base font-medium text-slate-800 dark:text-zinc-200 font-mono">
                  •••• •••• •••• {paymentMethods[0]?.last4 || "4242"}
                </p>
                <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">
                  Expires {paymentMethods[0]?.exp_month || "01"}/{paymentMethods[0]?.exp_year || "28"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/10">
              <div className="space-y-1">
                 <p className="text-sm text-slate-500 dark:text-zinc-400">Next billing date</p>
                 <p className="text-base font-semibold text-slate-900 dark:text-white">May 01, 2026</p>
              </div>
              <button className="px-5 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white text-sm font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
                Update payment
              </button>
            </div>
          </motion.div>
          
        </div>
      </motion.div>
    </div>
  );
}
