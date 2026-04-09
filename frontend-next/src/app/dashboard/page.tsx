"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  DollarSign,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Clock,
  Layers,
  Zap,
  Sparkles,
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
import { motion, AnimatePresence } from "framer-motion";
import { useClient } from "@/contexts/ClientContext";
import Link from "next/link";

// Senior Dev Standard: Unified motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

// --- DATA MOCKUPS ---
const DEFAULT_TREND_DATA = [
  { name: "Week 1", total: 0 },
  { name: "Week 2", total: 0 },
  { name: "Week 3", total: 0 },
  { name: "Current", total: 0 },
];

const COLORS = [
  "#6366F1",
  "#00E5C0",
  "#8B5CF6",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
];

// --- REUSABLE COMPONENTS ---
const KpiCard = ({
  title,
  value,
  subtext,
  icon: Icon,
  subIcon: SubIcon,
  colorClass,
  highlightClass,
  highlightText,
  loading,
}: any) => (
  <motion.div
    variants={itemVariants}
    className="relative group overflow-hidden bg-zinc-950/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 transition-all duration-700 hover:bg-zinc-900/60 hover:border-white/10 shadow-2xl hover:shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
  >
    {/* Dynamic Background Glow */}
    <div
      className={`absolute -top-24 -right-24 w-48 h-48 blur-[100px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-1000 ${colorClass.bg}`}
    />

    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className="space-y-1">
        <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] ml-0.5">
          {title}
        </h3>
        <div className="h-0.5 w-8 bg-zinc-800 group-hover:w-12 group-hover:bg-[#00E5C0] transition-all duration-500 rounded-full"></div>
      </div>
      <div
        className={`p-4 rounded-2xl border border-white/5 ${colorClass.bg} shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}
      >
        <Icon className={`w-5 h-5 ${colorClass.icon}`} />
      </div>
    </div>

    {loading ? (
      <div className="h-14 w-32 bg-white/5 animate-pulse rounded-2xl mb-4"></div>
    ) : (
      <div className="relative mb-4">
        <p
          className={`text-5xl md:text-7xl font-black tracking-tighter relative z-10 transition-colors duration-500 ${highlightText ? highlightClass : "text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-zinc-500"}`}
        >
          {value}
        </p>
      </div>
    )}

    <div className="flex items-center gap-2 group/sub relative z-10">
      <div
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${highlightClass ? `${highlightClass} bg-white/5 border border-white/10` : "text-zinc-500 bg-zinc-900/50"}`}
      >
        {SubIcon && <SubIcon className="w-3 h-3 animate-pulse" />}
        <span>{subtext.highlight || "verified"}</span>
      </div>
      <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
        {subtext.normal}
      </span>
    </div>
  </motion.div>
);

const DEMO_DATA = {
  total_spend: 5847.5,
  savings: 1284.0,
  active_platforms: 12,
  roi: 24600,
  trend_data: [
    { name: "Week 1", total: 3200 },
    { name: "Week 2", total: 4100 },
    { name: "Week 3", total: 4800 },
    { name: "Week 4", total: 5847 },
  ],
  platform_breakdown: [
    { name: "OpenAI", cost: 1240 },
    { name: "Zapier", cost: 299 },
    { name: "n8n", cost: 89 },
    { name: "Make", cost: 145 },
    { name: "Claude", cost: 430 },
    { name: "Other", cost: 3644 },
  ],
  health_status: [
    { id: 1, name: "OpenAI API", status: "Active", color: "#00E5C0", time: "2 min ago" },
    { id: 2, name: "Zapier", status: "Active", color: "#6366F1", time: "5 min ago" },
    { id: 3, name: "Make.com", status: "Syncing", color: "#F59E0B", time: "1 min ago" },
    { id: 4, name: "n8n Cloud", status: "Active", color: "#00E5C0", time: "just now" },
  ],
  recent_activity: [
    { id: 1, platform: "OpenAI", activity: "GPT-4 API Call Batch", cost: "$0.48", time: "2 min ago" },
    { id: 2, platform: "Zapier", activity: "Workflow Triggered", cost: "$0.01", time: "5 min ago" },
    { id: 3, platform: "Claude", activity: "Analysis Request", cost: "$0.12", time: "8 min ago" },
    { id: 4, platform: "Make.com", activity: "Scenario Run", cost: "$0.03", time: "12 min ago" },
  ],
};

const DEMO_KPIS = { clients: 14, automations: 156 };

export default function DashboardOverview() {
  const { activeClientId } = useClient();
  const [data, setData] = useState<any>(null);
  const [kpis, setKpis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, [activeClientId]);

  async function fetchAllData() {
    setLoading(true);
    // Check demo mode
    const isDemoMode = typeof window !== "undefined" && localStorage.getItem("demo_mode") === "true";
    if (isDemoMode) {
      setData(DEMO_DATA);
      setKpis(DEMO_KPIS);
      setLoading(false);
      return;
    }
    await Promise.all([fetchDashboardData(), fetchKpis()]);
    setLoading(false);
  }

  async function fetchKpis() {
    try {
      const storedToken = localStorage.getItem("token");
      const res = await fetch(
        (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") + "/api/v1/dashboard/kpis",
        { headers: storedToken ? { Authorization: "Bearer " + storedToken } : {} }
      );
      if (res.ok) {
        const result = await res.json();
        setKpis(result);
      } else {
        setKpis(DEMO_KPIS);
      }
    } catch (e) {
      setKpis(DEMO_KPIS);
    }
  }

  async function fetchDashboardData() {
    try {
      const storedToken = localStorage.getItem("token");
      let url = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") + "/api/v1/dashboard/summary";
      if (activeClientId) url += `?client_id=${activeClientId}`;
      const res = await fetch(url, {
        headers: storedToken ? { Authorization: "Bearer " + storedToken } : {},
      });
      if (res.ok) {
        const result = await res.json();
        setData(result);
      } else {
        setData(DEMO_DATA);
      }
    } catch (e) {
      setData(DEMO_DATA);
    }
  }

  const hasPlatforms = data && data.active_platforms > 0;

  const formattedBreakdown =
    data?.platform_breakdown?.map((item: any, index: number) => ({
      ...item,
      value: Math.round((item.cost / (data.total_spend || 1)) * 100),
      color: COLORS[index % COLORS.length],
    })) || [];

  return (
    <div className="min-h-screen text-white font-sans pb-20 w-full overflow-x-hidden relative">
      {/* Dynamic Background Architecture */}
      <div className="fixed top-0 right-0 w-[50%] h-[50%] bg-[#00E5C0]/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[50%] h-[50%] bg-indigo-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full"
      >
        {/* Aggressive Header Area */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col xl:flex-row xl:items-end justify-between mb-24 gap-12 pt-12"
        >
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#00E5C0]/10 border border-[#00E5C0]/20 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#00E5C0]/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
                <Sparkles className="w-5 h-5 text-[#00E5C0] relative z-10" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#00E5C0]">
                Unified Intelligence Hub
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-white leading-[0.85]">
              System{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">
                Oversight.
              </span>
            </h1>
            <p className="text-zinc-500 text-xl font-medium max-w-2xl leading-relaxed">
              {activeClientId
                ? "Surgical focus on client sub-account metrics and AI growth vectors."
                : "Global agency-wide aggregation of all connected neural networks."}
            </p>
            <div className="flex items-center gap-10 pt-4">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-white">
                  {kpis?.clients || 0}
                </span>
                <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mt-1">
                  Active Nodes
                </span>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-4xl font-black text-white">
                  {kpis?.automations || 0}
                </span>
                <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mt-1">
                  Live Cycles
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-6">
            <button
              onClick={fetchAllData}
              className="group relative flex items-center gap-4 bg-white text-black px-10 py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-widest hover:bg-[#00E5C0] transition-all duration-700 shadow-2xl hover:shadow-[#00E5C0]/40 overflow-hidden"
            >
              <RefreshCw
                className={`w-5 h-5 transition-transform duration-1000 ${loading ? "animate-spin" : "group-hover:rotate-180"}`}
              />
              {loading ? "Synchronizing" : "Establish Pulse"}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-black/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </button>
          </div>
        </motion.div>

        {/* 2. KPI Cards Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-24">
          <KpiCard
            title="Total Spend"
            value={
              loading
                ? "..."
                : `$${data?.total_spend?.toLocaleString() || "0.00"}`
            }
            subtext={{ highlight: "Live", normal: "total monthly tracking" }}
            icon={DollarSign}
            subIcon={TrendingUp}
            loading={loading}
            colorClass={{ bg: "bg-[#6366F1]/10", icon: "text-[#6366F1]" }}
            highlightClass="text-[#22C55E]"
          />
          <KpiCard
            title="Estimated Savings"
            value={
              loading ? "..." : `$${data?.savings?.toLocaleString() || "0.00"}`
            }
            subtext={{
              highlight: "",
              normal: "potential monthly optimization",
            }}
            icon={Activity}
            loading={loading}
            colorClass={{ bg: "bg-[#00E5C0]/10", icon: "text-[#00E5C0]" }}
            highlightClass="text-[#00E5C0]"
            highlightText
          />
          <KpiCard
            title="Active Platforms"
            value={loading ? "..." : `${data?.active_platforms || 0}/30`}
            subtext={{ highlight: "", normal: "connected integrations" }}
            icon={Layers}
            loading={loading}
            colorClass={{ bg: "bg-[#F59E0B]/10", icon: "text-[#F59E0B]" }}
          />
          <KpiCard
            title="ROI Index"
            value={loading ? "..." : `$${data?.roi?.toLocaleString() || "0"}`}
            subtext={{ highlight: "Value generated", normal: "" }}
            icon={Zap}
            subIcon={CheckCircle2}
            loading={loading}
            colorClass={{ bg: "bg-white/10", icon: "text-white" }}
            highlightClass="text-[#22C55E]"
          />
        </div>

        {!hasPlatforms && !loading ? (
          <motion.div
            variants={itemVariants}
            className="bg-zinc-950/40 backdrop-blur-3xl border border-white/5 border-dashed rounded-[3.5rem] py-32 flex flex-col items-center justify-center text-center px-10"
          >
            <div className="w-24 h-24 bg-zinc-900 border border-white/5 rounded-full flex items-center justify-center mb-10 group cursor-pointer hover:border-[#00E5C0]/30 transition-all duration-700">
              <Layers className="w-10 h-10 text-zinc-600 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter mb-4">
              No Neural Handshake established.
            </h2>
            <p className="text-zinc-500 text-lg font-medium max-w-lg mb-12">
              Connect your first automation platform to start tracking costs and
              see results.
            </p>
            <Link
              href="/dashboard/connect"
              className="px-12 py-6 bg-white text-black font-black text-[11px] uppercase tracking-[0.3em] rounded-[1.5rem] hover:bg-[#00E5C0] transition-all duration-700 shadow-2xl hover:shadow-[#00E5C0]/40"
            >
              Inject First Protocol
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24 min-w-0">
            {/* Left Column: Intelligence Flux */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10 w-full min-w-0">
              <motion.div
                variants={itemVariants}
                className="bg-zinc-950/40 backdrop-blur-3xl border border-white/5 rounded-[3.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="flex justify-between items-center mb-16">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black tracking-tighter text-white uppercase">
                      Growth Flux
                    </h3>
                    <p className="text-[10px] text-zinc-600 font-black tracking-widest uppercase ml-0.5">
                      Telemetry Trend (Last 7 Cycles)
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#6366F1] rounded-full animate-ping" />
                    <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">
                      Real-time Feed
                    </span>
                  </div>
                </div>
                <div className="h-[400px] w-full min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data?.trend_data || DEFAULT_TREND_DATA}
                      margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorTotal"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#6366F1"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="95%"
                            stopColor="#6366F1"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#27272a"
                        strokeOpacity={0.1}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        stroke="#52525b"
                        fontSize={9}
                        fontWeight="900"
                        tickLine={false}
                        axisLine={false}
                        dy={15}
                      />
                      <YAxis
                        stroke="#52525b"
                        fontSize={9}
                        fontWeight="900"
                        tickLine={false}
                        axisLine={false}
                        dx={-15}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "rgba(9, 9, 11, 0.98)",
                          border: "1px solid rgba(255, 255, 255, 0.05)",
                          borderRadius: "2rem",
                          backdropFilter: "blur(20px)",
                          color: "#ffffff",
                          padding: "24px",
                        }}
                        itemStyle={{
                          color: "#ffffff",
                          fontWeight: "900",
                          fontSize: "13px",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#6366F1"
                        strokeWidth={5}
                        fillOpacity={1}
                        fill="url(#colorTotal)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-zinc-950/40 backdrop-blur-3xl border border-white/5 rounded-[3.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00E5C0]/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="flex flex-col md:flex-row items-center gap-16">
                  <div className="h-[300px] w-[300px] shrink-0 relative">
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">
                        Density
                      </span>
                      <span className="text-4xl font-black text-white">
                        360°
                      </span>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={formattedBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={100}
                          outerRadius={135}
                          paddingAngle={6}
                          dataKey="cost"
                          stroke="none"
                        >
                          {formattedBreakdown.map(
                            (entry: any, index: number) => (
                              <Cell key={"cell-" + index} fill={entry.color} />
                            ),
                          )}
                        </Pie>
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: "rgba(9, 9, 11, 0.98)",
                            border: "1px solid rgba(255, 255, 255, 0.05)",
                            borderRadius: "1.5rem",
                          }}
                          itemStyle={{ color: "#ffffff" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 w-full space-y-8">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black tracking-tighter text-white uppercase">
                        Portfolio Density
                      </h3>
                      <p className="text-[10px] text-zinc-600 font-black tracking-widest uppercase ml-0.5">
                        Asset Allocation / Spend Matrix
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {formattedBreakdown.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex flex-col gap-2 p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500 group/item cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse"
                                style={{ backgroundColor: item.color }}
                              ></div>
                              <span className="font-black uppercase text-[10px] tracking-widest text-zinc-500 group-hover/item:text-zinc-300 transition-colors uppercase">
                                {item.name}
                              </span>
                            </div>
                            <span className="text-[10px] font-black text-zinc-700">
                              {item.value}%
                            </span>
                          </div>
                          <span className="text-2xl font-black text-white break-all">
                            ${item.cost.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Node Monitoring */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-10 w-full relative">
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {data?.health_status?.map((item: any) => (
                  <div
                    key={item.id}
                    className="group bg-zinc-950/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 shadow-2xl relative hover:border-white/20 transition-all duration-700 cursor-pointer overflow-hidden min-h-[160px] flex flex-col justify-between"
                  >
                    <div
                      className="absolute top-0 right-0 w-32 h-32 blur-[80px] rounded-full opacity-20 pointer-events-none transition-opacity duration-700 group-hover:opacity-40"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-[#00E5C0]/10 group-hover:border-[#00E5C0]/20 transition-all">
                        <Activity className="w-5 h-5 text-zinc-600 group-hover:text-[#00E5C0] transition-colors" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full animate-ping"
                          style={{ backgroundColor: item.color }}
                        />
                        <span
                          className="text-[10px] font-black uppercase tracking-[0.2em]"
                          style={{ color: item.color }}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-black text-white tracking-widest text-[11px] uppercase mb-1">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-zinc-700 font-bold tracking-widest uppercase truncate">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-zinc-950/40 backdrop-blur-3xl border border-white/5 rounded-[3.5rem] p-12 shadow-2xl flex-1 flex flex-col relative overflow-hidden group"
              >
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-[#00E5C0]/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="flex items-center gap-4 mb-12">
                  <div className="p-4 bg-[#00E5C0]/10 border border-[#00E5C0]/20 rounded-2xl shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700">
                    <Zap className="w-6 h-6 text-[#00E5C0]" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <h3 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">
                      Intelligence
                    </h3>
                    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em] ml-0.5">
                      Neural Optimization Feed
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-6 mb-auto text-left">
                  <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] hover:bg-white/[0.05] transition-all duration-500 relative group/card border-l-4 border-l-[#00E5C0]">
                    <p className="text-[13px] mb-6 text-zinc-400 font-medium leading-relaxed">
                      Detected high token cost variance on{" "}
                      <span className="font-black text-white">OpenAI-GPT4</span>
                      . Injecting system cache Layer-2 to prune redundant
                      signals.
                    </p>
                    <p className="text-[#00E5C0] text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                      <span className="w-2 h-2 bg-[#00E5C0] rounded-full animate-ping shadow-[0_0_10px_rgba(0,229,192,0.5)]" />{" "}
                      Projected Savings ~$124.50 / mo
                    </p>
                  </div>
                </div>

                <button className="w-full py-6 mt-12 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] text-[#00E5C0] border border-[#00E5C0]/20 hover:bg-[#00E5C0] hover:text-black transition-all duration-700 flex items-center justify-center gap-4 group/btn">
                  System Diagnostic{" "}
                  <ArrowRight className="w-4 h-4 translate-x-0 group-hover/btn:translate-x-3 transition-transform" />
                </button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-[#00E5C0] via-[#00E5C0] to-teal-600 rounded-[3rem] p-12 shadow-2xl mt-auto relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-700"
              >
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/30 blur-[60px] rounded-full animate-pulse" />
                <div className="relative z-10 text-left">
                  <h3 className="font-black text-3xl text-black tracking-tighter mb-4">
                    Neural ROI Report<span className="text-white">.</span>
                  </h3>
                  <p className="text-sm text-black/60 font-semibold mb-10 leading-relaxed max-w-[240px]">
                    Export unified value metrics and ROI visualizations for
                    account nodes.
                  </p>
                  <button className="w-full py-5 text-[11px] font-black uppercase tracking-[0.3em] text-white bg-black rounded-[1.5rem] hover:bg-zinc-900 transition-all shadow-xl hover:shadow-black/20 flex items-center justify-center gap-3">
                    Export Handshake <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* 4. Master Activity Ledger */}
        {hasPlatforms && (
          <motion.div
            variants={itemVariants}
            className="relative z-10 bg-zinc-950/40 backdrop-blur-3xl border border-white/5 rounded-[4rem] shadow-2xl overflow-hidden w-full group"
          >
            <div className="p-12 md:p-16 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center bg-white/[0.01] gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00E5C0]/10 flex items-center justify-center border border-[#00E5C0]/20">
                    <Terminal className="w-4 h-4 text-[#00E5C0]" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter text-white uppercase">
                    Master Ledger
                  </h3>
                </div>
                <p className="text-[11px] text-zinc-600 font-black tracking-[0.4em] uppercase ml-11">
                  Sequential Event Protocol
                </p>
              </div>
              <button className="text-[11px] font-black uppercase tracking-[0.4em] text-[#00E5C0] hover:text-white flex items-center gap-4 transition-all group/log border border-[#00E5C0]/20 px-8 py-4 rounded-full hover:bg-[#00E5C0]/10">
                Full Systems Feed
                <ArrowRight className="w-4 h-4 group-hover/log:translate-x-3 transition-transform" />
              </button>
            </div>
            <div className="overflow-x-auto w-full custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-zinc-950/20 border-b border-white/5">
                    <th className="px-12 py-8 text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em]">
                      Node Origin
                    </th>
                    <th className="px-12 py-8 text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em]">
                      Signal Identity
                    </th>
                    <th className="px-12 py-8 text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em] text-right">
                      Computed Cost
                    </th>
                    <th className="px-12 py-8 text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em] text-right">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(data?.recent_activity || []).map((log: any) => (
                    <tr
                      key={log.id}
                      className="group/row hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-12 py-10 whitespace-nowrap">
                        <div className="flex items-center gap-6">
                          <div className="w-3 h-3 rounded-full bg-[#00E5C0] shadow-[0_0_10px_#00E5C0]" />
                          <span className="font-black text-sm uppercase tracking-[0.1em] text-white">
                            {log.platform}
                          </span>
                        </div>
                      </td>
                      <td className="px-12 py-10 whitespace-nowrap text-xs font-semibold text-zinc-400 group-hover/row:text-zinc-200 transition-colors uppercase tracking-widest">
                        {log.activity}
                      </td>
                      <td className="px-12 py-10 whitespace-nowrap text-right">
                        <span className="inline-block px-6 py-2 rounded-full bg-white/5 border border-white/5 text-xs font-black text-white group-hover/row:border-[#00E5C0]/40 transition-all shadow-inner">
                          {log.cost}
                        </span>
                      </td>
                      <td className="px-12 py-10 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-3 text-[11px] font-black text-zinc-700 uppercase tracking-[0.2em] group-hover/row:text-zinc-400 transition-colors">
                          <Clock className="w-4 h-4" /> {log.time}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </motion.div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 229, 192, 0.2);
        }
      `}</style>
    </div>
  );
}

function Terminal({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}
