"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  LineChart,
  Line,
} from "recharts";
import {
  Zap,
  Clock,
  ShieldCheck,
  Mail,
  ArrowRight,
  TrendingDown,
  Sparkles,
  Activity,
  Signal,
  Terminal,
  ShieldAlert,
} from "lucide-react";
import AISuggestions from "@/components/dashboard/AISuggestions";

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

// Mock data for cost projection
const projectionData = [
  { name: "Week 1", Current: 230, Optimized: 230 },
  { name: "Week 2", Current: 245, Optimized: 200 },
  { name: "Week 3", Current: 280, Optimized: 215 },
  { name: "Week 4", Current: 320, Optimized: 220 },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen pb-32">
      {/* Immersive Background Architecture */}
      <div className="fixed top-0 right-0 w-[50%] h-[50%] bg-[#00E5C0]/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[50%] h-[50%] bg-indigo-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 space-y-24"
      >
        {/* Aggressive Header */}
        <motion.div variants={itemVariants} className="pt-12">
          <div className="max-w-4xl space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-indigo-500/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
                <Activity className="w-5 h-5 text-indigo-400 relative z-10" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-400">
                Strategic Intelligence Hub
              </span>
            </div>
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white leading-[0.85]">
              Neural{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">
                Analytics.
              </span>
            </h1>
            <p className="text-zinc-500 text-xl font-medium max-w-3xl leading-relaxed">
              Uncovering actionable growth vectors and optimizing operational
              throughput through a multi-layered neural diagnostic engine.
              Establish your ROI baseline.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 min-w-0">
          {/* Left Column: AI Suggestions (Neural Diagnostic Core) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 flex flex-col min-h-[800px] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="relative z-10 h-full">
              <AISuggestions />
            </div>
          </motion.div>

          {/* Right Column: Predictive Models & CTA */}
          <div className="space-y-12 flex flex-col relative">
            {/* Projected Impact Matrix */}
            <motion.div
              variants={itemVariants}
              className="bg-zinc-950/40 backdrop-blur-[40px] border border-white/5 rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#00E5C0]/5 blur-[100px] rounded-full group-hover:opacity-20 transition-opacity" />

              <div className="flex justify-between items-center mb-16">
                <div className="space-y-1 text-left">
                  <h3 className="text-2xl font-black tracking-tighter text-white uppercase">
                    Impact Projection
                  </h3>
                  <p className="text-[10px] text-zinc-700 font-black tracking-widest uppercase ml-0.5">
                    Neural Flux Horizon
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#00E5C0]/10 border border-[#00E5C0]/20 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-[#00E5C0] group-hover:scale-110 transition-transform" />
                </div>
              </div>

              <div className="h-[280px] w-full mb-12 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={projectionData}
                    margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(255,255,255,0.03)"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#3f3f46", fontSize: 10, fontWeight: 900 }}
                      dy={15}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#3f3f46", fontSize: 10, fontWeight: 900 }}
                      tickFormatter={(val) => `$${val}`}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "rgba(9, 9, 11, 0.98)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        borderRadius: "2rem",
                        backdropFilter: "blur(20px)",
                        padding: "24px",
                      }}
                      itemStyle={{
                        color: "#fff",
                        fontWeight: 900,
                        fontSize: "13px",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Current"
                      stroke="#27272a"
                      strokeWidth={3}
                      dot={{ r: 0 }}
                      strokeDasharray="8 8"
                    />
                    <Line
                      type="monotone"
                      dataKey="Optimized"
                      stroke="#00E5C0"
                      strokeWidth={6}
                      dot={{ r: 8, fill: "#00E5C0", strokeWidth: 0 }}
                      activeDot={{ r: 10, stroke: "#09090b", strokeWidth: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-black/40 rounded-[2rem] p-8 border border-white/5 hover:border-white/10 transition-all group/stat">
                  <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.2em] mb-3">
                    Base Latency
                  </p>
                  <p className="text-3xl font-black text-zinc-500 group-hover:text-white transition-colors">
                    $1,075
                  </p>
                </div>
                <div className="bg-[#00E5C0]/5 rounded-[2rem] p-8 border border-[#00E5C0]/20 hover:bg-[#00E5C0]/10 transition-all group/target">
                  <p className="text-[10px] text-[#00E5C0] font-black uppercase tracking-[0.2em] mb-3">
                    Target Node
                  </p>
                  <p className="text-3xl font-black text-[#00E5C0] group-hover:scale-105 transition-transform origin-left text-glow-teal">
                    $865
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Strategic Execution CTA */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-indigo-500 to-indigo-900 rounded-[4rem] p-12 shadow-[0_50px_100px_rgba(0,0,0,0.5)] text-center relative overflow-hidden group flex-1 flex flex-col justify-center min-h-[450px]"
            >
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/20 opacity-20 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-1000 animate-pulse pointer-events-none"></div>

              <div className="relative z-10 space-y-12">
                <div className="w-24 h-24 mx-auto bg-white/10 backdrop-blur-2xl rounded-[2.5rem] flex items-center justify-center border border-white/20 shadow-3xl group-hover:rotate-6 transition-transform duration-700">
                  <Zap className="w-10 h-10 text-white" />
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-white tracking-tighter leading-none">
                    Execute Plan.
                  </h2>
                  <p className="text-[11px] text-indigo-100/60 font-black tracking-[0.4em] uppercase leading-relaxed">
                    Request Neural Injection
                  </p>
                </div>

                <div className="space-y-4 px-6">
                  {[
                    { t: "No Downtime Protocol", i: ShieldCheck },
                    { t: "24h Rapid Integration", i: Clock },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-black/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/5"
                    >
                      <item.i className="w-4 h-4 text-[#00E5C0]" />
                      <span className="text-[11px] font-black uppercase tracking-widest text-white/80">
                        {item.t}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-white text-black py-7 px-10 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-700 active:scale-[0.98] shadow-2xl hover:shadow-white/20 flex items-center justify-center gap-4 group/btn hover:bg-[#00E5C0]">
                  <Mail className="w-5 h-5 transition-transform group-hover/btn:scale-125" />
                  Initiate Expert Audit
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
