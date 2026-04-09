"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  RefreshCw,
  TrendingUp,
  Users,
  Zap,
  CheckCircle2,
  Clock,
  BarChart3,
  AlertCircle,
  Mail,
  ArrowRight,
  X,
  FileDown,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import { useClient } from "@/contexts/ClientContext";
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function ReportsPage() {
  const { activeClientId, clients } = useClient();
  const [roiData, setRoiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [mailing, setMailing] = useState(false);
  const [isMailModalOpen, setIsMailModalOpen] = useState(false);

  const activeClientName =
    clients.find((c) => c.id === activeClientId)?.name || "Selected Client";

  useEffect(() => {
    if (activeClientId) {
      fetchRoiReport();
    } else {
      setLoading(false);
    }
  }, [activeClientId]);

  async function fetchRoiReport() {
    if (!activeClientId) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:8000/reports/roi/${activeClientId}`,
        {
          headers: token ? { Authorization: "Bearer " + token } : {},
        },
      );
      if (res.ok) {
        const data = await res.json();
        setRoiData(data);
      }
    } catch (err) {
      console.error("ROI fetch error", err);
      toast.error("Telemetry Interruption.");
    } finally {
      setLoading(false);
    }
  }

  const handleDownloadPDF = async () => {
    if (!activeClientId) return;
    setDownloading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:8000/reports/roi/${activeClientId}/pdf`,
        {
          headers: token ? { Authorization: "Bearer " + token } : {},
        },
      );
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `AnasFlow_ROI_${activeClientName}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        toast.success("PDF Architecture Generated.");
      }
    } catch (err) {
      toast.error("PDF Compilation Failed.");
    } finally {
      setDownloading(false);
    }
  };

  const handleSendEmail = async () => {
    setMailing(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:8000/reports/roi/${activeClientId}/email`,
        {
          method: "POST",
          headers: token ? { Authorization: "Bearer " + token } : {},
        },
      );
      if (res.ok) {
        toast.success("Identity Dispatched.", {
          description: `White-labeled ROI transmitted to ${activeClientName}.`,
        });
        setIsMailModalOpen(false);
      }
    } catch (e) {
      toast.error("Transmission Failed.");
    } finally {
      setMailing(false);
    }
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Immersive Background Architecture */}
      <div className="fixed top-0 left-0 w-[50%] h-[50%] bg-indigo-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[50%] h-[50%] bg-[#00E5C0]/5 blur-[160px] rounded-full pointer-events-none" />
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
              <div className="w-12 h-12 bg-[#00E5C0]/10 border border-[#00E5C0]/20 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#00E5C0]/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
                <Sparkles className="w-5 h-5 text-[#00E5C0] relative z-10" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#00E5C0]">
                Value Transmission Hub
              </span>
            </div>
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white leading-[0.85]">
              Handshake{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">
                Reports.
              </span>
            </h1>
            <p className="text-zinc-500 text-xl font-medium max-w-2xl leading-relaxed">
              Consolidating high-fidelity ROI telemetry into professional
              white-labeled intelligence. Transmit value directly to your
              enterprise nodes.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={fetchRoiReport}
              className="p-6 bg-zinc-950/40 border border-white/5 rounded-3xl text-zinc-600 hover:text-white hover:border-white/20 transition-all backdrop-blur-3xl group"
            >
              <RefreshCw
                className={`w-5 h-5 group-hover:rotate-180 transition-transform duration-1000 ${loading ? "animate-spin" : ""}`}
              />
            </button>
            <button
              disabled={!roiData || downloading}
              onClick={handleDownloadPDF}
              className="px-10 py-6 bg-white text-black font-black rounded-[2rem] hover:bg-[#00E5C0] transition-all duration-700 text-[11px] uppercase tracking-[0.3em] flex items-center gap-4 group disabled:opacity-30 shadow-2xl hover:shadow-[#00E5C0]/40"
            >
              <FileDown className="w-5 h-5 transition-transform group-hover:translate-y-2" />
              {downloading ? "Compiling..." : "Export Asset PDF"}
            </button>
          </div>
        </motion.div>

        {/* Diagnostic Stat Matrix */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            {
              label: "Reporting Context",
              value: activeClientId ? activeClientName : "Global Hub",
              icon: Users,
              color: "text-white",
              bg: "bg-white/10",
            },
            {
              label: "ROI Flux Index",
              value: roiData ? "3.5x" : "0.0x",
              icon: TrendingUp,
              color: "text-[#00E5C0]",
              bg: "bg-[#00E5C0]/10",
            },
            {
              label: "Neural Savings",
              value: roiData
                ? `$${roiData.summary.estimated_savings.toLocaleString()}`
                : "$0",
              icon: Zap,
              color: "text-indigo-400",
              bg: "bg-indigo-500/10",
            },
            {
              label: "Spend Telemetry",
              value: roiData
                ? `$${roiData.summary.total_spend.toLocaleString()}`
                : "$0",
              icon: Clock,
              color: "text-orange-400",
              bg: "bg-orange-500/10",
            },
          ].map((s, i) => (
            <div
              key={i}
              className={`p-10 rounded-[3rem] bg-zinc-950/40 border border-white/5 backdrop-blur-3xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-700`}
            >
              <div
                className={`absolute top-0 right-0 w-48 h-48 blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity ${s.bg} pointer-events-none`}
              />
              <div className="flex justify-between items-start mb-12 relative z-10">
                <div
                  className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6 ${s.color}`}
                >
                  <s.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mt-2">
                  {s.label}
                </span>
              </div>
              <p
                className={`text-4xl font-black tracking-tighter ${s.color} transition-colors group-hover:text-white relative z-10`}
              >
                {loading ? "..." : s.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Master ROI Ledger */}
        <motion.div
          variants={itemVariants}
          className="bg-zinc-950/40 backdrop-blur-[40px] border border-white/5 rounded-[4rem] overflow-hidden shadow-2xl relative"
        >
          <div className="p-12 md:p-16 border-b border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between bg-white/[0.01] gap-8">
            <div className="flex items-center gap-6">
              <div className="w-2 h-16 bg-[#00E5C0] rounded-full shadow-[0_0_20px_rgba(0,229,192,0.5)]" />
              <div className="space-y-1 text-left">
                <h2 className="text-4xl font-black text-white tracking-tighter uppercase">
                  Master Ledger<span className="text-[#00E5C0]">.</span>
                </h2>
                <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.4em] ml-1">
                  Unified ROI Diagnostic
                </p>
              </div>
            </div>
            <div className="px-8 py-4 rounded-2xl border border-white/5 bg-black/40 text-zinc-500 font-black uppercase tracking-widest text-[11px]">
              Active Cycle: {roiData?.date || "Current Orbit"}
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            {!activeClientId ? (
              <div className="py-48 text-center space-y-12 relative">
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-indigo-500/[0.03] to-transparent" />
                <div className="w-32 h-32 bg-zinc-900/60 rounded-[3.5rem] border border-white/5 mx-auto flex items-center justify-center shadow-inner scale-110 transition-transform hover:scale-125 duration-700">
                  <BarChart3 className="w-12 h-12 text-zinc-500" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-white tracking-tighter uppercase">
                    Telemetry Offline.
                  </h3>
                  <p className="text-zinc-600 font-medium text-lg">
                    Pick a client to create and send their ROI report.
                  </p>
                </div>
              </div>
            ) : loading ? (
              <div className="py-48 text-center space-y-12 relative">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#00E5C0] to-transparent animate-pulse" />
                <RefreshCw className="w-24 h-24 mx-auto animate-spin text-[#00E5C0]/40" />
                <p className="text-zinc-500 font-black tracking-[0.5em] uppercase text-xs">
                  Synchronizing Audit Signal
                </p>
              </div>
            ) : (
              <table className="w-full text-left min-w-[1000px]">
                <thead>
                  <tr className="bg-black/20 border-b border-white/5">
                    <th className="px-16 py-10 text-[11px] font-black text-zinc-600 uppercase tracking-[0.4em]">
                      Node Protocol
                    </th>
                    <th className="px-16 py-10 text-[11px] font-black text-zinc-600 uppercase tracking-[0.4em]">
                      Operational Spend
                    </th>
                    <th className="px-16 py-10 text-[11px] font-black text-zinc-600 uppercase tracking-[0.4em]">
                      Efficiency Yield
                    </th>
                    <th className="px-16 py-10 text-right text-[11px] font-black text-zinc-600 uppercase tracking-[0.4em]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {roiData?.platforms.map((p: any, idx: number) => (
                    <tr
                      key={idx}
                      className="hover:bg-white/[0.02] transition-all duration-700 group/row"
                    >
                      <td className="px-16 py-12">
                        <div className="flex items-center gap-8">
                          <div className="w-20 h-20 rounded-[2rem] bg-zinc-900 border border-white/5 flex items-center justify-center text-3xl font-black text-white group-hover/row:border-[#00E5C0]/40 group-hover/row:bg-[#00E5C0]/5 transition-all duration-700 group-hover/row:scale-110 group-hover/row:rotate-6">
                            {p.name.charAt(0)}
                          </div>
                          <div className="space-y-1">
                            <span className="text-3xl font-black text-white tracking-tighter uppercase">
                              {p.name}
                            </span>
                            <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.3em]">
                              Authorized Link
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-16 py-12">
                        <span className="font-black text-4xl text-white tracking-tighter group-hover/row:text-zinc-400 transition-colors duration-500">
                          ${p.cost.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-16 py-12">
                        <div className="flex flex-col">
                          <span className="font-black text-4xl text-[#00E5C0] tracking-tighter text-glow-teal">
                            ${p.savings.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-[#00E5C0]/60 font-black uppercase tracking-[0.4em] mt-2">
                            Active Profitability
                          </span>
                        </div>
                      </td>
                      <td className="px-16 py-12 text-right">
                        <div className="flex items-center justify-end gap-3 px-6 py-2.5 bg-black/40 rounded-full border border-white/5 w-fit ml-auto transition-all group-hover/row:border-[#00E5C0]/30 shadow-inner">
                          <div className="w-2 h-2 bg-[#00E5C0] rounded-full animate-pulse shadow-[0_0_10px_#00E5C0]" />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00E5C0]">
                            Telemetry Clear
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>

        {/* Global Transmission Protocol CTA */}
        <AnimatePresence>
          {roiData && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-950/40 backdrop-blur-[40px] border border-white/5 rounded-[5rem] p-16 md:p-24 shadow-3xl text-center md:text-left relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-1000 opacity-40" />
              <div className="flex flex-col lg:flex-row items-center justify-between gap-20 relative z-10">
                <div className="space-y-12 max-w-2xl text-left">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center">
                      <Terminal className="w-5 h-5 text-indigo-400" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-400">
                      Transmission Protocol
                    </span>
                  </div>
                  <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase">
                    Dispatch <br />{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">
                      Intelligence.
                    </span>
                  </h2>
                  <p className="text-zinc-500 text-xl font-medium leading-relaxed max-w-xl">
                    Establish a secure handshake with{" "}
                    <span className="text-white font-black underline decoration-[#00E5C0] decoration-8">
                      {activeClientName}
                    </span>{" "}
                    by transmitting this high-fidelity whitepaper directly to
                    their neural inbox.
                  </p>
                </div>
                <div className="flex flex-col gap-8 w-full lg:w-[450px]">
                  <button
                    onClick={() => setIsMailModalOpen(true)}
                    className="w-full px-12 py-8 bg-white text-black font-black rounded-[2rem] hover:bg-[#00E5C0] transition-all duration-700 shadow-2xl hover:shadow-[#00E5C0]/40 flex items-center justify-center gap-6 text-[11px] uppercase tracking-[0.3em] group/send"
                  >
                    <Send className="w-5 h-5 transition-transform group-hover/send:-rotate-45 group-hover/send:scale-125" />
                    Establish Transmission
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full px-12 py-8 bg-zinc-900/60 backdrop-blur-3xl text-white font-black rounded-[2rem] border border-white/5 hover:border-white/20 transition-all text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-6 group/preview"
                  >
                    <FileText className="w-5 h-5 transition-transform group-hover/preview:scale-110" />
                    Surgical PDF Preview
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transmission Modal */}
        <AnimatePresence>
          {isMailModalOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-[60px]">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                className="w-full max-w-2xl bg-zinc-950/60 border border-white/5 rounded-[4rem] p-16 md:p-20 relative shadow-[0_50px_200px_rgba(0,0,0,0.8)] overflow-hidden group/modal"
              >
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
                <button
                  onClick={() => setIsMailModalOpen(false)}
                  className="absolute top-12 right-12 text-zinc-700 hover:text-white transition-all hover:scale-125 hover:rotate-90"
                >
                  <X className="w-8 h-8" />
                </button>

                <div className="text-center space-y-16">
                  <div className="w-32 h-32 bg-indigo-500/10 rounded-[3rem] border border-indigo-500/20 mx-auto flex items-center justify-center shadow-inner group-hover/modal:rotate-[15deg] transition-transform duration-1000">
                    <Mail className="w-12 h-12 text-indigo-400" />
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">
                      Confirm Signal.
                    </h3>
                    <p className="text-zinc-600 font-medium text-xl leading-relaxed px-12">
                      Initiating white-labeled ROI intelligence dispatch for
                      node <strong>{activeClientName}</strong>.
                    </p>
                  </div>
                  <button
                    onClick={handleSendEmail}
                    disabled={mailing}
                    className="w-full py-8 bg-white text-black font-black rounded-[2.5rem] hover:bg-[#00E5C0] transition-all duration-700 text-[11px] uppercase tracking-[0.4em] shadow-2xl disabled:opacity-30"
                  >
                    {mailing ? "Synchronizing Hub..." : "Execute Transmission"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
