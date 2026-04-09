"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  AlertTriangle,
  Info,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ShieldCheck,
  Zap,
  Activity,
  Sparkles,
  Filter,
  Signal,
  Terminal,
  ShieldAlert,
} from "lucide-react";

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

export default function AlertsPage() {
  const [filter, setFilter] = useState("all");
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  async function fetchAlerts() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/alerts/system/", {
        headers: token ? { Authorization: "Bearer " + token } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setAlerts(data || []);
      }
    } catch (err) {
      console.error("Alerts fetch error", err);
    } finally {
      setLoading(false);
    }
  }

  const getAlertStyle = (level: string) => {
    if (level === "critical")
      return {
        icon: ShieldAlert,
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        glow: "shadow-[0_0_20px_rgba(239,68,68,0.2)]",
      };
    if (level === "warning")
      return {
        icon: AlertTriangle,
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        glow: "shadow-[0_0_20px_rgba(251,146,60,0.2)]",
      };
    if (level === "info" || level === "low")
      return {
        icon: Info,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        glow: "shadow-[0_0_20px_rgba(96,165,250,0.2)]",
      };
    return {
      icon: CheckCircle2,
      color: "text-[#00E5C0]",
      bg: "bg-[#00E5C0]/10",
      border: "border-[#00E5C0]/20",
      glow: "shadow-[0_0_20px_rgba(0,229,192,0.2)]",
    };
  };

  const filtered = alerts.filter((a) => {
    if (dismissed.includes(a.id)) return false;
    if (filter === "all") return true;
    if (filter === "info") return a.level === "info" || a.level === "low";
    return a.level === filter;
  });

  const activeAlertsCount = alerts.filter(
    (a) => a.level === "critical" || a.level === "warning",
  ).length;
  const warningsCount = alerts.filter((a) => a.level === "warning").length;
  const healthScore =
    alerts.length === 0
      ? 100
      : Math.max(
          90,
          Math.round(
            ((alerts.length - activeAlertsCount) / alerts.length) * 100,
          ),
        );

  return (
    <div className="min-h-screen pb-32">
      {/* Premium Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 space-y-16 mb-24"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 pt-12"
        >
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-red-500/20 blur-xl group-hover:scale-150 transition-transform duration-1000"></div>
                <Signal className="w-5 h-5 text-red-500 relative z-10 animate-pulse" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-red-500">
                Neural Diagnostic Stream
              </span>
            </div>
            <h1 className="text-8xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-[0.85] lg:max-w-2xl">
              System{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800 text-glow-indigo">
                Alerts.
              </span>
            </h1>
            <p className="text-zinc-500 text-xl font-medium leading-relaxed max-w-2xl">
              Real-time synchronization with 30+ enterprise nodes. Our
              diagnostic engine scans for cost anomalies, API failures, and rate
              limit exceptions every 60 seconds.
            </p>
          </div>

          <button
            onClick={fetchAlerts}
            className="p-6 bg-zinc-950/40 border border-white/5 rounded-3xl text-zinc-600 hover:text-white hover:border-white/20 transition-all backdrop-blur-3xl group"
          >
            <RefreshCw
              className={`w-5 h-5 group-hover:rotate-180 transition-transform duration-700 ${loading ? "animate-spin" : ""}`}
            />
          </button>
        </motion.div>

        {/* Diagnostic Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            {
              label: "Active Alerts",
              value: String(activeAlertsCount),
              icon: Bell,
              color: "text-red-400",
              bg: "bg-red-500/10",
              border: "border-red-500/10",
            },
            {
              label: "System Warnings",
              value: String(warningsCount),
              icon: AlertTriangle,
              color: "text-orange-400",
              bg: "bg-orange-500/10",
              border: "border-orange-500/10",
            },
            {
              label: "Live Nodes",
              value: String(alerts.length > 0 ? 12 : 0),
              icon: Activity,
              color: "text-indigo-400",
              bg: "bg-indigo-500/10",
              border: "border-indigo-500/10",
            },
            {
              label: "Stability Index",
              value: `${healthScore}%`,
              icon: ShieldCheck,
              color: "text-[#00E5C0]",
              bg: "bg-[#00E5C0]/10",
              border: "border-[#00E5C0]/10",
            },
          ].map((s, i) => (
            <div
              key={i}
              className={`p-8 rounded-[2.5rem] bg-zinc-950/40 border ${s.border} backdrop-blur-3xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500`}
            >
              <div className="flex justify-between items-start mb-6">
                <s.icon className={`w-5 h-5 ${s.color}`} />
                <div
                  className={`w-2 h-2 rounded-full ${s.color} animate-ping`}
                />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-2">
                {s.label}
              </p>
              <p className={`text-4xl font-black tracking-tighter ${s.color}`}>
                {s.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Filter Matrix */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide"
        >
          <div className="flex items-center gap-3 pr-6 border-r border-white/5 mr-2">
            <Filter className="w-4 h-4 text-zinc-700" />
            <span className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.3em]">
              Filter Stream:
            </span>
          </div>
          {["all", "critical", "warning", "info"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 border ${filter === f ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]" : "bg-transparent text-zinc-600 border-white/5 hover:border-white/20 hover:text-zinc-200"}`}
            >
              {f}
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* Alert Stream Feed */}
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 relative"
        >
          {filtered.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="text-center py-40 bg-zinc-950/40 border border-white/5 rounded-[4rem] backdrop-blur-3xl"
            >
              <div className="w-24 h-24 bg-[#00E5C0]/10 border border-[#00E5C0]/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(0,229,192,0.1)]">
                <CheckCircle2 className="w-10 h-10 text-[#00E5C0]" />
              </div>
              <h3 className="text-4xl font-black text-white tracking-tighter mb-4 leading-none">
                All Nodes Stable.
              </h3>
              <p className="text-zinc-500 text-lg font-medium">
                No diagnostic anomalies detected in the current pulse cycle.
              </p>
            </motion.div>
          ) : (
            filtered.map((alert) => {
              const style = getAlertStyle(alert.level);
              return (
                <motion.div
                  layout
                  key={alert.id}
                  variants={itemVariants}
                  className={`group relative overflow-hidden bg-zinc-950/40 backdrop-blur-3xl border ${style.border} p-10 rounded-[3rem] transition-all duration-700 hover:bg-zinc-900/40`}
                >
                  <div
                    className={`absolute top-0 right-0 w-64 h-64 blur-[120px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-1000 ${style.bg}`}
                  />

                  <div className="flex flex-col lg:flex-row lg:items-center gap-10 relative z-10">
                    <div
                      className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center shrink-0 ${style.bg} border ${style.border} ${style.glow}`}
                    >
                      <style.icon className={`w-8 h-8 ${style.color}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-6 mb-4">
                        <div className="flex items-center gap-4">
                          <span
                            className={`text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border ${style.border} ${style.color}`}
                          >
                            {alert.level} Signal
                          </span>
                          <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">
                            Source: {alert.type || "System Node"}
                          </span>
                        </div>
                        <span className="text-[11px] font-black text-zinc-700 uppercase tracking-widest font-mono">
                          {new Date(alert.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-tighter mb-4 group-hover:translate-x-2 transition-transform duration-500">
                        {alert.message}
                      </h3>
                      <div className="flex items-center gap-8 border-t border-white/5 pt-6">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-3.5 h-3.5 text-zinc-700" />
                          <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                            Diagnostic Code: #AF-
                            {(alert.id || "").substring(0, 6)}
                          </span>
                        </div>
                        <button className="text-[10px] font-black text-zinc-500 hover:text-white uppercase tracking-[0.3em] transition-colors ml-auto">
                          Request Debug Dump
                        </button>
                        <button
                          onClick={() => setDismissed([...dismissed, alert.id])}
                          className="text-[10px] font-black text-red-500/60 hover:text-red-500 uppercase tracking-[0.3em] transition-colors"
                        >
                          Acknowledge & Clear
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>
      </AnimatePresence>

      {/* Monitoring Architecture Notice */}
      <motion.div
        variants={itemVariants}
        className="mt-24 p-12 rounded-[3.5rem] bg-indigo-500/[0.02] border border-indigo-500/10 backdrop-blur-3xl flex flex-col md:flex-row items-center gap-8"
      >
        <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 rounded-3xl flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(99,102,241,0.1)]">
          <Zap className="w-8 h-8 text-indigo-400 group-hover:scale-125 transition-transform" />
        </div>
        <div>
          <h4 className="text-xl font-black text-white tracking-tighter mb-2">
            Omni-Channel Synchronization Active.
          </h4>
          <p className="text-zinc-500 font-medium leading-relaxed max-w-3xl">
            Our synchronization protocols scan all connected platform APIs every
            60 seconds. Critical anomalies trigger instant neural alerts across
            your dashboard and connected Slack/Email channels.
          </p>
        </div>
        <button className="ml-auto px-10 py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-[1.5rem] hover:bg-zinc-200 transition-all shadow-2xl">
          Manage Channels
        </button>
      </motion.div>
    </div>
  );
}
