"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import {
  Zap,
  Clock,
  ShieldCheck,
  Mail,
  ArrowRight,
  TrendingDown,
  Activity,
} from "lucide-react";
import AISuggestions from "@/components/dashboard/AISuggestions";

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

const projectionData = [
  { name: "Week 1", Current: 230, Optimized: 230 },
  { name: "Week 2", Current: 245, Optimized: 200 },
  { name: "Week 3", Current: 280, Optimized: 215 },
  { name: "Week 4", Current: 320, Optimized: 220 },
];

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto pb-24 px-4 sm:px-6 lg:px-8 text-slate-900 dark:text-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="pt-8">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Business Insights
            </h1>
            <p className="text-slate-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
              Find simple ways to grow your business and improve performance
              using our AI-powered analysis tools. See how much you can save.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: AI Suggestions */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 flex flex-col min-h-[600px]"
          >
            <AISuggestions />
          </motion.div>

          {/* Right Column: Predictive Models & CTA */}
          <div className="space-y-6 flex flex-col">
            
            {/* Projected Impact Matrix */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Impact Projection
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                    Optimization Forecast
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
                  <TrendingDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>

              <div className="h-[220px] w-full mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={projectionData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      className="stroke-slate-200 dark:stroke-zinc-800"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      className="text-xs font-medium fill-slate-400 dark:fill-zinc-500"
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      className="text-xs font-medium fill-slate-400 dark:fill-zinc-500"
                      tickFormatter={(val) => `$${val}`}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "var(--tooltip-bg, #18181b)",
                        border: "1px solid var(--tooltip-border, rgba(255,255,255,0.1))",
                        borderRadius: "8px",
                        color: "white"
                      }}
                      itemStyle={{ color: "white", fontSize: "14px", fontWeight: "bold" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Current"
                      stroke="#94a3b8" /* slate-400 */
                      strokeWidth={2}
                      dot={{ r: 0 }}
                      strokeDasharray="4 4"
                    />
                    <Line
                      type="monotone"
                      dataKey="Optimized"
                      stroke="#10b981" /* emerald-500 */
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#10b981", strokeWidth: 0 }}
                      activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-white/[0.02] rounded-xl p-4 border border-slate-100 dark:border-white/5">
                  <p className="text-xs text-slate-500 dark:text-zinc-500 font-semibold mb-1">
                    Current Cost
                  </p>
                  <p className="text-xl font-bold text-slate-700 dark:text-zinc-300">
                    $1,075
                  </p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-500/5 rounded-xl p-4 border border-emerald-100 dark:border-emerald-500/20">
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-1">
                    Goal Savings
                  </p>
                  <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
                    $865
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={itemVariants}
              className="bg-indigo-600 rounded-2xl p-8 text-center flex-1 flex flex-col justify-center min-h-[300px] shadow-sm"
            >
              <div className="space-y-6">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                  <Zap className="w-8 h-8 text-white" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Take Action
                  </h2>
                  <p className="text-sm font-medium text-indigo-100">
                    Improve Your Performance Today
                  </p>
                </div>

                <div className="space-y-3 px-2">
                  {[
                    { t: "Safe Integration", i: ShieldCheck },
                    { t: "Fast 24h Setup", i: Clock },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center gap-3 bg-black/10 px-4 py-2.5 rounded-lg border border-white/10"
                    >
                      <item.i className="w-4 h-4 text-emerald-300" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        {item.t}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-white text-indigo-600 py-3 mt-2 rounded-lg font-bold text-sm transition-colors hover:bg-slate-50 flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Talk to an Expert
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
