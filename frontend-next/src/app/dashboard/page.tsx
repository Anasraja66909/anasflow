"use client";

import React from "react";
import {
  TrendingUp,
  DollarSign,
  Activity,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Clock,
  Layers,
  Zap,
  Sparkles,
  Terminal,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { useClient } from "@/contexts/ClientContext";
import Link from "next/link";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { useDashboardData } from "@/hooks/useDashboardData";
import { COLORS, DEFAULT_TREND_DATA } from "@/constants/dashboard";

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

export default function DashboardOverview() {
  const { activeClientId } = useClient();
  const { data, kpis, loading, refresh } = useDashboardData(activeClientId);

  const hasPlatforms = data && data.active_platforms > 0;

  const formattedBreakdown =
    data?.platform_breakdown?.map((item: any, index: number) => ({
      ...item,
      value: Math.round((item.cost / (data.total_spend || 1)) * 100),
      color: COLORS[index % COLORS.length],
    })) || [];

  return (
    <div className="max-w-7xl mx-auto pb-24 px-4 sm:px-6 lg:px-8 text-slate-900 dark:text-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-8"
        >
          <div className="max-w-2xl space-y-3 text-left">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-slate-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
              {activeClientId
                ? "Viewing metrics for selected client."
                : "Monitor your key metrics, scaling performance, and recent automated platform activity."}
            </p>
            <div className="flex items-center gap-6 pt-2">
               <div className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">{kpis?.clients || 0}</span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Total Clients</span>
               </div>
               <div className="w-px h-8 bg-slate-200 dark:bg-white/10" />
               <div className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">{kpis?.automations || 0}</span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Active Automations</span>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={refresh}
              className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-slate-50 dark:hover:bg-white/10 text-sm font-semibold text-slate-700 dark:text-white transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </motion.div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <KpiCard
            title="Total Spend"
            value={loading ? "..." : `$${data?.total_spend?.toLocaleString() || "0.00"}`}
            subtext={{ highlight: "Live", normal: "monthly tracking" }}
            icon={DollarSign}
            subIcon={TrendingUp}
            loading={loading}
            colorClass={{ bg: "bg-indigo-50 dark:bg-indigo-500/10", icon: "text-indigo-500" }}
            highlightClass="text-emerald-500"
          />
          <KpiCard
            title="Estimated Savings"
            value={loading ? "..." : `$${data?.savings?.toLocaleString() || "0.00"}`}
            subtext={{ highlight: "", normal: "potential optimized" }}
            icon={Activity}
            loading={loading}
            colorClass={{ bg: "bg-emerald-50 dark:bg-emerald-500/10", icon: "text-emerald-500" }}
            highlightClass="text-emerald-500 dark:text-emerald-400"
            highlightText
          />
          <KpiCard
            title="Active Platforms"
            value={loading ? "..." : `${data?.active_platforms || 0}/30`}
            subtext={{ highlight: "", normal: "integrations" }}
            icon={Layers}
            loading={loading}
            colorClass={{ bg: "bg-amber-50 dark:bg-amber-500/10", icon: "text-amber-500" }}
          />
          <KpiCard
            title="Investment Return"
            value={loading ? "..." : `$${data?.roi?.toLocaleString() || "0"}`}
            subtext={{ highlight: "Value generated", normal: "" }}
            icon={Zap}
            subIcon={CheckCircle2}
            loading={loading}
            colorClass={{ bg: "bg-slate-100 dark:bg-white/10", icon: "text-slate-700 dark:text-white" }}
            highlightClass="text-emerald-500"
          />
        </div>

        {!hasPlatforms && !loading ? (
          <motion.div
            variants={itemVariants}
            className="w-full bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-white/10 border-dashed rounded-2xl py-24 flex flex-col items-center justify-center text-center px-6"
          >
            <div className="w-16 h-16 bg-white dark:bg-black border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <Layers className="w-8 h-8 text-slate-400 dark:text-zinc-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              No platforms connected
            </h2>
            <p className="text-slate-500 dark:text-zinc-400 text-sm max-w-md mb-8">
              Connect your first automation platform to start tracking costs and scaling your business.
            </p>
            <Link
              href="/dashboard/platforms"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-lg transition-colors shadow-sm"
            >
              Connect a Platform
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Area Chart */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Spending Trend</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Over the past 4 weeks</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Live</span>
                </div>
              </div>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data?.trend_data || DEFAULT_TREND_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-200 dark:text-zinc-800" />
                    <XAxis dataKey="name" stroke="currentColor" className="text-slate-400 dark:text-zinc-500 text-xs font-medium" tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="currentColor" className="text-slate-400 dark:text-zinc-500 text-xs font-medium" tickLine={false} axisLine={false} dx={-10} tickFormatter={(value) => `$${value}`} />
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: "var(--tooltip-bg, #18181b)", border: "1px solid var(--tooltip-border, rgba(255,255,255,0.1))", borderRadius: "8px", color: "white" }}
                      itemStyle={{ color: "white", fontSize: "14px", fontWeight: "bold" }}
                    />
                    <Area type="monotone" dataKey="total" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Platform Breakdown */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cost Breakdown</h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">By connecting service</p>
              </div>
              
              <div className="h-[200px] w-full my-6 relative">
                 <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={formattedBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={4} dataKey="cost" stroke="none">
                      {formattedBreakdown.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "#18181b", color: "#fff" }}
                      itemStyle={{ color: "#fff" }}
                    />
                  </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">{data?.active_platforms || 0}</span>
                     <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Nodes</span>
                 </div>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                {formattedBreakdown.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-slate-400 dark:text-zinc-500">{item.value}%</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">${item.cost.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Health & Suggestions */}
            <motion.div variants={itemVariants} className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
               
               <div className="bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
                      <Zap className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">Suggestions</h3>
                      <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Cost Optimization</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5">
                    <p className="text-sm text-slate-600 dark:text-zinc-300 mb-3">
                      Detected signal variance on your active nodes. We recommend pruning redundant API tasks.
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Real-time tracking enabled
                    </span>
                  </div>
               </div>

               <div className="bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm grid grid-cols-2 gap-4">
                 {data?.health_status?.map((item: any) => (
                    <div key={item.id} className="p-4 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] flex flex-col justify-between">
                       <div className="flex items-center justify-between mb-3">
                         <Activity className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
                         <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white dark:bg-black border border-slate-200 dark:border-white/10" style={{ color: item.color }}>
                           {item.status}
                         </span>
                       </div>
                       <div>
                         <p className="text-sm font-bold text-slate-700 dark:text-zinc-200">{item.name}</p>
                         <p className="text-xs text-slate-500 dark:text-zinc-500 mt-0.5">{item.time}</p>
                       </div>
                    </div>
                 ))}
               </div>

            </motion.div>

            {/* Activity Logs */}
            <motion.div variants={itemVariants} className="lg:col-span-3 bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden">
               <div className="px-6 py-5 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-50/50 dark:bg-transparent">
                  <div className="flex items-center gap-3">
                     <Terminal className="w-5 h-5 text-indigo-500" />
                     <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Activity</h3>
                  </div>
                  <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                    View Details &rarr;
                  </button>
               </div>
               
               <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm whitespace-nowrap">
                   <thead>
                     <tr className="bg-slate-50 dark:bg-zinc-900/50 border-b border-slate-200 dark:border-white/10">
                       <th className="px-6 py-4 font-semibold text-slate-500 dark:text-zinc-400 text-xs uppercase tracking-wider">Platform</th>
                       <th className="px-6 py-4 font-semibold text-slate-500 dark:text-zinc-400 text-xs uppercase tracking-wider">Activity</th>
                       <th className="px-6 py-4 font-semibold text-slate-500 dark:text-zinc-400 text-xs uppercase tracking-wider text-right">Cost</th>
                       <th className="px-6 py-4 font-semibold text-slate-500 dark:text-zinc-400 text-xs uppercase tracking-wider text-right">Time</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {(data?.recent_activity || []).length > 0 ? (
                        (data?.recent_activity || []).map((log: any) => (
                          <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-indigo-500" /> {log.platform}
                            </td>
                            <td className="px-6 py-4 text-slate-600 dark:text-zinc-400">
                               {log.activity}
                            </td>
                            <td className="px-6 py-4 text-right">
                               <span className="px-2 py-1 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-zinc-300 rounded font-medium text-xs">
                                 {log.cost}
                               </span>
                            </td>
                            <td className="px-6 py-4 text-right text-slate-500 dark:text-zinc-500">
                               {log.time}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-sm text-slate-500 dark:text-zinc-500">
                            No recent activity found.
                          </td>
                        </tr>
                      )}
                   </tbody>
                 </table>
               </div>
            </motion.div>

          </div>
        )}
      </motion.div>
    </div>
  );
}
