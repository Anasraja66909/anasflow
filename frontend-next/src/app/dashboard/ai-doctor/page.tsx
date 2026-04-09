"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  AlertCircle,
  ShieldCheck,
  Zap,
  Terminal,
  CheckCircle2,
  Lock,
  GitMerge,
  Activity,
  XCircle,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  RefreshCw,
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

export default function AIDoctorPage() {
  const [issues, setIssues] = useState<any[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<any | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [applying, setApplying] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    fetchIssues();
  }, []);

  async function fetchIssues() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/doctor/issues", {
        headers: token ? { Authorization: "Bearer " + token } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setIssues(data.issues || []);
      }
    } catch (err) {
      console.error("Failed to fetch issues", err);
      toast.error("Telemetry Interruption.");
    }
  }

  const handleAnalyze = async () => {
    if (!consentGiven || !selectedIssue) return;
    setAnalyzing(true);
    try {
      const token = localStorage.getItem("token");
      const url =
        "http://localhost:8000/doctor/diagnose/" +
        selectedIssue.id +
        "?consent=true";
      const res = await fetch(url, {
        method: "POST",
        headers: token ? { Authorization: "Bearer " + token } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setAnalysisResult(data.diagnosis);
        toast.success("Diagnostic Pattern Reconstructed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Diagnostic Flux Failure.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleApplyFix = async () => {
    if (!analysisResult) return;
    setApplying(true);
    try {
      const token = localStorage.getItem("token");
      const url = "http://localhost:8000/doctor/apply/" + analysisResult.id;
      const res = await fetch(url, {
        method: "POST",
        headers: token ? { Authorization: "Bearer " + token } : {},
      });
      if (res.ok) {
        setAnalysisResult({ ...analysisResult, applied: true });
        toast.success("Vector Stabilized.", {
          description: "Production node patched successfully.",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Injection Protocol Failed.");
    } finally {
      setApplying(false);
    }
  };

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
        className="relative z-10 space-y-12 h-screen flex flex-col"
      >
        {/* Modern Header Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-12"
        >
          <div className="max-w-4xl space-y-8 text-left">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-indigo-500/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
                <Bot className="w-5 h-5 text-indigo-400 relative z-10" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-400">
                Neural Diagnostic Center
              </span>
            </div>
            <h1 className="text-7xl font-black tracking-tighter text-white leading-[0.85] uppercase">
              AI{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">
                Doctor.
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-4 px-6 py-3 bg-zinc-950/40 backdrop-blur-3xl border border-white/5 rounded-2xl shadow-xl">
            <div className="w-2 h-2 bg-[#00E5C0] rounded-full animate-pulse shadow-[0_0_10px_#00E5C0]" />
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">
              Subsystem Diagnostics Online
            </span>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0 min-w-0">
          {/* Sidebar: Active Issues Ledger */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-1/3 flex flex-col min-h-0"
          >
            <div className="bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[3.5rem] p-10 shadow-2xl h-full flex flex-col relative overflow-hidden group/ledger">
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none group-hover/ledger:opacity-20 transition-opacity" />

              <div className="flex items-center justify-between mb-10 relative z-10">
                <div className="space-y-1 text-left">
                  <h2 className="font-black text-white text-2xl uppercase tracking-tighter">
                    Issue Ledger.
                  </h2>
                  <p className="text-[10px] text-zinc-700 font-black tracking-[0.4em] uppercase">
                    Failed Automations
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-zinc-600" />
                </div>
              </div>

              <div className="flex flex-col gap-6 overflow-y-auto custom-scrollbar flex-1 pr-2 relative z-10">
                {issues.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-6">
                    <div className="w-20 h-20 bg-zinc-900 border border-white/5 rounded-full flex items-center justify-center shadow-inner scale-110">
                      <CheckCircle2 className="w-10 h-10 text-[#00E5C0]/40" />
                    </div>
                    <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.4em]">
                      Protocols nominal.
                    </p>
                  </div>
                ) : (
                  issues.map((issue) => (
                    <button
                      key={issue.id}
                      onClick={() => {
                        setSelectedIssue(issue);
                        setAnalysisResult(null);
                        setConsentGiven(false);
                      }}
                      className={`w-full text-left p-8 rounded-[2rem] border transition-all duration-700 relative overflow-hidden group/issue ${
                        selectedIssue?.id === issue.id
                          ? "bg-white/5 border-[#00E5C0]/40 shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
                          : "bg-black/20 border-white/5 hover:border-white/20 hover:bg-black/40"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-6 relative z-10">
                        <span
                          className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border transition-colors ${
                            selectedIssue?.id === issue.id
                              ? "bg-[#00E5C0]/10 border-[#00E5C0]/20 text-[#00E5C0]"
                              : "bg-white/5 border-white/5 text-zinc-500"
                          }`}
                        >
                          {issue.platform}
                        </span>
                        <span className="text-[9px] font-black text-zinc-800 uppercase tracking-widest">
                          {issue.created_at}
                        </span>
                      </div>
                      <div className="relative z-10">
                        <code className="text-xs text-red-500/80 font-mono line-clamp-2 block bg-black/40 p-5 rounded-2xl border border-red-500/10 group-hover/issue:border-red-500/30 transition-all leading-relaxed italic">
                          {issue.error_logs}
                        </code>
                      </div>
                      <div
                        className={`absolute bottom-6 right-6 transition-all duration-700 ${selectedIssue?.id === issue.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
                      >
                        <ArrowRight className="w-5 h-5 text-[#00E5C0]" />
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </motion.div>

          {/* Main Panel: Neural Reconstruction Chamber */}
          <motion.div
            variants={itemVariants}
            className="flex-1 min-w-0 flex flex-col"
          >
            <div className="bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[4rem] shadow-3xl overflow-hidden flex flex-col h-full relative group/terminal">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.01] to-transparent pointer-events-none" />

              {/* Cinematic Security Banner */}
              <div className="bg-black/60 border-b border-white/5 px-12 py-5 flex items-center justify-between relative z-20">
                <div className="flex items-center gap-6">
                  <ShieldCheck className="w-5 h-5 text-[#00E5C0] shadow-[0_0_10px_#00E5C0]" />
                  <span className="text-[11px] font-black text-zinc-500 tracking-[0.5em] uppercase">
                    Neural Pulse Protocol • V4.2 High-Fidelity Diagnostic
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-zinc-800" />
                  <div className="w-2 h-2 rounded-full bg-zinc-800" />
                </div>
              </div>

              {!selectedIssue ? (
                <div className="flex-1 flex flex-col items-center justify-center p-20 text-center relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
                  <div className="w-40 h-40 bg-zinc-900 border border-white/5 rounded-[4rem] flex items-center justify-center mb-12 shadow-inner group-hover/terminal:scale-110 group-hover/terminal:rotate-12 transition-all duration-1000">
                    <Terminal className="w-16 h-16 opacity-30 text-indigo-400" />
                  </div>
                  <div className="space-y-6 max-w-xl">
                    <h3 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">
                      Diagnostic Terminal.
                    </h3>
                    <p className="text-zinc-600 text-xl font-medium leading-relaxed italic">
                      Select an active pulse failure from the ledger to initiate
                      deep neural reconstruction.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col p-12 overflow-y-auto custom-scrollbar relative z-10 text-left">
                  <div className="mb-16 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-1 bg-[#00E5C0] rounded-full" />
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#00E5C0]">
                        Node Identity: {selectedIssue.platform}
                      </span>
                    </div>
                    <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">
                      Neural Reconstruct
                      <span className="text-[#00E5C0]">.</span>
                    </h2>
                  </div>

                  {/* Step 1: Authorization Protocol */}
                  {!analysisResult && !analyzing && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full"
                    >
                      <div className="bg-zinc-950 border border-white/5 rounded-[4rem] p-16 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group/auth">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

                        <div className="flex flex-col items-center gap-12">
                          <div className="w-32 h-32 bg-zinc-900 border border-white/5 rounded-[3rem] flex items-center justify-center shadow-inner group-hover/auth:scale-110 group-hover/auth:rotate-12 transition-all duration-1000">
                            <Lock className="w-12 h-12 text-indigo-400 group-hover/auth:text-indigo-300 transition-colors" />
                          </div>

                          <div className="space-y-6 text-center">
                            <h3 className="text-4xl font-black text-white uppercase tracking-tighter">
                              Authorization Key.
                            </h3>
                            <p className="text-zinc-600 font-medium text-lg leading-relaxed italic">
                              Reconstructing failure vectors requires deep
                              telemetry scan access. No client PII is exposed
                              during transit. Proceed with neural scan.
                            </p>
                          </div>

                          <div className="w-full space-y-8">
                            <label className="flex items-center gap-6 cursor-pointer p-8 rounded-[2.5rem] bg-black/60 border border-white/10 hover:border-[#00E5C0]/40 transition-all group/label shadow-inner group-hover/label:bg-black">
                              <div
                                className={`w-10 h-10 rounded-2xl border flex items-center justify-center transition-all duration-500 ${consentGiven ? "bg-[#00E5C0] border-[#00E5C0] text-black shadow-[0_0_20px_rgba(0,229,192,0.6)]" : "border-white/10 group-hover/label:border-white/40"}`}
                              >
                                {consentGiven && (
                                  <CheckCircle2 className="w-6 h-6" />
                                )}
                              </div>
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={consentGiven}
                                onChange={(e) =>
                                  setConsentGiven(e.target.checked)
                                }
                              />
                              <div className="space-y-1 text-left">
                                <span className="text-[11px] text-white font-black uppercase tracking-[0.4em]">
                                  Establish Secure Link
                                </span>
                                <p className="text-[10px] text-zinc-700 font-black uppercase tracking-widest leading-none">
                                  Protocol Handshake / Node:{" "}
                                  {selectedIssue.platform}
                                </p>
                              </div>
                            </label>

                            <button
                              onClick={handleAnalyze}
                              disabled={!consentGiven}
                              className="w-full py-8 bg-white text-black font-black rounded-[2rem] disabled:opacity-30 transition-all duration-700 uppercase tracking-[0.4em] text-[11px] shadow-2xl hover:bg-[#00E5C0] hover:shadow-[#00E5C0]/50 flex items-center justify-center gap-6 group/btn"
                            >
                              <Zap className="w-6 h-6 transition-transform group-hover/btn:scale-125 group-hover/btn:rotate-12" />
                              Execute Diagnostic Pulse
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Diagnostic Pulse Animation */}
                  {analyzing && (
                    <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00E5C0]/5 blur-[160px] rounded-full pointer-events-none" />
                      <div className="relative w-40 h-40 mb-16">
                        <div className="absolute inset-0 rounded-full border-t-8 border-[#00E5C0] animate-spin shadow-[0_0_40px_rgba(0,229,192,0.4)]" />
                        <div
                          className="absolute inset-6 rounded-full border-r-8 border-indigo-500 animate-spin"
                          style={{
                            animationDirection: "reverse",
                            animationDuration: "0.8s",
                          }}
                        />
                        <div className="absolute inset-0 m-auto flex items-center justify-center bg-zinc-900 rounded-full w-24 h-24 shadow-inner">
                          <Activity className="w-10 h-10 text-white animate-pulse" />
                        </div>
                      </div>
                      <div className="space-y-6 text-center">
                        <p className="text-[#00E5C0] font-black text-sm uppercase tracking-[0.8em] animate-pulse">
                          Neural Reconstruct in Progress
                        </p>
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-zinc-700 font-black text-[10px] uppercase tracking-widest animate-shimmer">
                            Mapping Failed Platform Vector...
                          </span>
                          <span className="text-zinc-800 font-black text-[9px] uppercase tracking-[0.5em]">
                            Establishing Correction Logic
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Diagnostic Results & Patch Injection */}
                  {analysisResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-12 pb-12"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="bg-red-500/5 border border-red-500/10 p-10 rounded-[3.5rem] space-y-6 hover:border-red-500/20 transition-all group/rc shadow-inner relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/5 blur-[80px] rounded-full" />
                          <div className="flex items-center gap-4 relative z-10 text-left">
                            <div className="w-12 h-12 rounded-2xl bg-red-400/10 border border-red-400/20 flex items-center justify-center group-hover/rc:scale-110 transition-transform">
                              <ShieldAlert className="w-6 h-6 text-red-400" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-red-400 text-[11px] font-black uppercase tracking-[0.4em]">
                                Root Cause Matrix
                              </h4>
                              <p className="text-white text-xl font-black uppercase tracking-tighter italic">
                                Vector Disruption Identified
                              </p>
                            </div>
                          </div>
                          <p className="text-zinc-400 text-lg font-medium leading-relaxed relative z-10 italic">
                            {analysisResult.root_cause}
                          </p>
                        </div>
                        <div className="bg-[#00E5C0]/5 border border-[#00E5C0]/10 p-10 rounded-[3.5rem] space-y-6 hover:border-[#00E5C0]/20 transition-all group/ai shadow-inner relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00E5C0]/5 blur-[80px] rounded-full" />
                          <div className="flex items-center gap-4 relative z-10 text-left">
                            <div className="w-12 h-12 rounded-2xl bg-[#00E5C0]/10 border border-[#00E5C0]/20 flex items-center justify-center group-hover/ai:scale-110 transition-transform">
                              <Sparkles className="w-6 h-6 text-[#00E5C0]" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-[#00E5C0] text-[11px] font-black uppercase tracking-[0.4em]">
                                Neural Correction
                              </h4>
                              <p className="text-white text-xl font-black uppercase tracking-tighter italic">
                                Optimization Logic Verified
                              </p>
                            </div>
                          </div>
                          <p className="text-zinc-400 text-lg font-medium leading-relaxed relative z-10 italic">
                            {analysisResult.suggested_fix}
                          </p>
                        </div>
                      </div>

                      {/* Blueprint Viewer: High Fidelity Reconstruction */}
                      <div className="bg-zinc-950/60 backdrop-blur-[40px] border border-white/5 rounded-[4rem] overflow-hidden shadow-[0_50px_150px_rgba(0,0,0,0.8)]">
                        <div className="flex items-center justify-between px-12 py-8 bg-black/40 border-b border-white/5">
                          <div className="flex items-center gap-6">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                              <GitMerge className="w-5 h-5 text-zinc-500" />
                            </div>
                            <div className="space-y-1 text-left">
                              <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">
                                Reconstruction Blueprint
                              </span>
                              <p className="text-[9px] text-zinc-700 font-bold uppercase tracking-widest">
                                Calculated Vector Offset: 14.2ms
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <div className="px-4 py-2 rounded-full border border-white/5 bg-zinc-900/50 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                              Protocol V4.2
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 xl:grid-cols-2 divide-y xl:divide-y-0 xl:divide-x divide-white/5">
                          <div className="p-12 space-y-8 bg-red-500/[0.01]">
                            <div className="flex items-center gap-4">
                              <div className="w-1.5 h-8 bg-red-500 rounded-full" />
                              <span className="text-[11px] text-red-500 font-black tracking-[0.4em] uppercase">
                                Failed Flux State
                              </span>
                            </div>
                            <pre className="font-mono text-[12px] text-zinc-600 overflow-x-auto custom-scrollbar p-10 bg-black/60 rounded-[2.5rem] border border-red-500/10 leading-relaxed italic shadow-inner min-h-[300px]">
                              {analysisResult.before_json ||
                                "// Payload Context Null"}
                            </pre>
                          </div>
                          <div className="p-12 space-y-8 bg-[#00E5C0]/[0.01]">
                            <div className="flex items-center gap-4">
                              <div className="w-1.5 h-8 bg-[#00E5C0] rounded-full" />
                              <span className="text-[11px] text-[#00E5C0] font-black tracking-[0.4em] uppercase">
                                Proposed Reconstruction
                              </span>
                            </div>
                            <pre className="font-mono text-[12px] text-[#00E5C0] overflow-x-auto custom-scrollbar p-10 bg-white/[0.01] rounded-[2.5rem] border border-[#00E5C0]/20 leading-relaxed italic shadow-inner min-h-[300px] text-glow-teal">
                              {analysisResult.after_json}
                            </pre>
                          </div>
                        </div>
                      </div>

                      {/* Execution Hub CTA */}
                      <div className="bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/10 p-12 rounded-[4rem] flex flex-col xl:flex-row items-center justify-between gap-12 relative overflow-hidden group/patch">
                        <div className="absolute top-0 right-0 w-full h-full bg-indigo-500/5 blur-[120px] pointer-events-none group-hover/patch:scale-125 transition-transform duration-1000" />

                        <div className="space-y-3 text-left w-full xl:w-auto">
                          <h4 className="text-[11px] text-zinc-600 font-black uppercase tracking-[0.5em]">
                            Efficiency yield projection
                          </h4>
                          <p className="text-white font-black text-5xl tracking-tighter leading-none uppercase">
                            {analysisResult.estimated_savings}{" "}
                            <span className="text-indigo-400 font-black text-2xl tracking-[0.2em] ml-4 opacity-40">
                              ROI RECLAIM
                            </span>
                          </p>
                        </div>

                        {analysisResult.applied ? (
                          <div className="w-full xl:w-fit px-12 py-8 bg-[#00E5C0]/10 text-[#00E5C0] border border-[#00E5C0]/20 rounded-[2rem] font-black text-[12px] uppercase tracking-[0.4em] flex items-center justify-center gap-6 animate-pulse shadow-[0_0_30px_rgba(0,229,192,0.3)]">
                            <ShieldCheck className="w-7 h-7" />
                            Subsystem Stabilized. Applied.
                          </div>
                        ) : (
                          <button
                            onClick={handleApplyFix}
                            disabled={applying}
                            className="w-full xl:w-fit px-16 py-8 bg-white text-black font-black rounded-[2rem] hover:bg-[#00E5C0] transition-all duration-700 uppercase tracking-[0.4em] text-[12px] shadow-[0_30px_100px_rgba(0,0,0,0.6)] hover:shadow-[#00E5C0]/40 flex items-center justify-center gap-6 group/fix"
                          >
                            {applying ? (
                              <RefreshCw className="w-6 h-6 animate-spin" />
                            ) : (
                              <Zap className="w-6 h-6 transition-transform group-hover/fix:scale-125 group-hover/fix:rotate-12" />
                            )}
                            Execute Liquid Patch Injection
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <style jsx global>{`
        .text-glow-teal {
          text-shadow: 0 0 10px rgba(0, 229, 192, 0.4);
        }
        @keyframes shimmer {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.3;
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
}
