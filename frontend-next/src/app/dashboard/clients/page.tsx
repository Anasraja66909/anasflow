"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  UserCircle2,
  Mail,
  Globe,
  RefreshCw,
  CheckCircle2,
  Search,
  ArrowRight,
  Sparkles,
  Terminal,
  Activity,
  ShieldCheck,
  Briefcase,
  X,
  Clock,
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company_name: "",
    email: "",
    website: "",
  });
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/clients/", {
        headers: token ? { Authorization: "Bearer " + token } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setClients(data.clients || []);
      }
    } catch (e) {
      console.error(e);
      toast.error("Handshake Refused.");
    } finally {
      setLoading(false);
    }
  }

  async function addClient(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/clients/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: "Bearer " + token } : {}),
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Identity Verified.", {
          description: "New partner node registered successfully.",
        });
        setShowForm(false);
        setForm({ name: "", company_name: "", email: "", website: "" });
        fetchClients();
      } else {
        toast.error("Initialization Failed.");
      }
    } catch {
      toast.error("Transmission Interruption.");
    } finally {
      setSaving(false);
    }
  }

  const filtered = clients.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.company_name?.toLowerCase().includes(search.toLowerCase()),
  );

  const initials = (name: string) =>
    name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "??";

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
                <Terminal className="w-5 h-5 text-indigo-400 relative z-10" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-400">
                Directory Master Protocol
              </span>
            </div>
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white leading-[0.85]">
              Partner{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">
                Directory.
              </span>
            </h1>
            <p className="text-zinc-500 text-xl font-medium max-w-2xl leading-relaxed">
              Orchestrate your enterprise partnerships and monitor
              cross-platform ROI telemetry for {clients.length} active nodes.
              Establishing high-fidelity command.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-12 py-7 bg-white text-black font-black rounded-[2rem] hover:bg-[#00E5C0] transition-all duration-700 text-[11px] uppercase tracking-[0.4em] flex items-center gap-6 group shadow-2xl hover:shadow-[#00E5C0]/40"
          >
            <Plus className="w-6 h-6 transition-transform group-hover:rotate-90 group-hover:scale-125" />
            Establish Node
          </button>
        </motion.div>

        {/* Tactical Search Architecture */}
        <motion.div variants={itemVariants} className="relative group/search">
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/5 transition-all group-focus-within/search:bg-[#00E5C0]/30" />
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-700 group-focus-within/search:text-[#00E5C0] transition-colors" />
          <input
            type="text"
            placeholder="FILTER MASTER LEDGER BY ENTITY / CONTACT PROTOCOL..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[3rem] pl-24 pr-8 py-10 text-white font-black text-xs tracking-[0.3em] uppercase placeholder:text-zinc-800 focus:outline-none focus:border-[#00E5C0]/20 transition-all shadow-inner"
          />
        </motion.div>

        {/* Node Grid: Holographic Profile Ledger */}
        <AnimatePresence mode="popLayout">
          {loading ? (
            <motion.div
              key="loader"
              variants={itemVariants}
              className="flex flex-col items-center justify-center min-h-[400px] space-y-12"
            >
              <div className="w-24 h-24 bg-white/5 border border-white/5 rounded-full flex items-center justify-center">
                <RefreshCw className="w-10 h-10 text-indigo-500/40 animate-spin" />
              </div>
              <p className="text-[11px] font-black text-zinc-700 uppercase tracking-[0.6em] animate-pulse">
                Scanning Master Ledger Protocol
              </p>
            </motion.div>
          ) : filtered.length === 0 ? (
            <motion.div
              key="empty"
              variants={itemVariants}
              className="text-center py-48 bg-zinc-950/40 backdrop-blur-[40px] border border-white/5 rounded-[4rem] relative group/empty"
            >
              <div className="w-32 h-32 bg-zinc-900 border border-white/5 rounded-[3.5rem] flex items-center justify-center mx-auto mb-12 shadow-inner group-hover/empty:scale-110 group-hover/empty:rotate-12 transition-all duration-700">
                <UserCircle2 className="w-14 h-14 text-zinc-800" />
              </div>
              <h3 className="text-5xl font-black text-white tracking-tighter uppercase mb-6">
                {clients.length === 0
                  ? "Void Directory."
                  : "Identity Not Found."}
              </h3>
              <p className="text-zinc-600 font-medium text-lg max-w-lg mx-auto mb-16 px-10">
                No clients added yet. Create a new client to get started.
              </p>
              {clients.length === 0 && (
                <button
                  onClick={() => setShowForm(true)}
                  className="px-12 py-7 bg-white text-black font-black rounded-[2rem] hover:bg-[#00E5C0] transition-all duration-700 uppercase tracking-[0.4em] text-[11px] shadow-2xl hover:shadow-[#00E5C0]/40"
                >
                  Register First Protocol
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              layout
              key="grid"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
            >
              {filtered.map((c: any, i: number) => (
                <motion.div
                  layout
                  key={c.id || i}
                  variants={itemVariants}
                  className="bg-zinc-950/40 backdrop-blur-[40px] border border-white/5 rounded-[3.5rem] p-12 hover:border-indigo-500/30 hover:-translate-y-4 transition-all duration-700 group/client relative overflow-hidden shadow-2xl"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none group-hover/client:opacity-20 transition-opacity" />

                  <div className="flex items-start gap-8 relative z-10">
                    <div className="w-20 h-20 rounded-[1.75rem] bg-gradient-to-br from-zinc-900 to-black border border-white/5 flex items-center justify-center text-white font-black text-2xl shadow-inner group-hover/client:scale-110 group-hover/client:rotate-6 transition-all duration-700 group-hover/client:bg-indigo-500/10 group-hover/client:border-indigo-500/30 group-hover/client:text-indigo-400">
                      {initials(c.name)}
                    </div>
                    <div className="flex-1 min-w-0 space-y-2 text-left">
                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter truncate transition-colors leading-none">
                        {c.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-[#00E5C0] rounded-full animate-pulse shadow-[0_0_10px_#00E5C0]" />
                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] truncate">
                          {c.company_name || "Individual Protocol"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-10 border-t border-white/5 space-y-6 relative z-10 text-left">
                    {[
                      { icon: Mail, value: c.email },
                      { icon: Globe, value: c.website },
                    ]
                      .filter((f) => f.value)
                      .map((f, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-5 group/entry cursor-help"
                        >
                          <div className="w-10 h-10 rounded-[1.25rem] bg-white/[0.01] border border-white/5 flex items-center justify-center group-hover/entry:bg-white/5 group-hover/entry:border-white/10 transition-all">
                            <f.icon className="w-4 h-4 text-zinc-700 group-hover/entry:text-white transition-colors" />
                          </div>
                          <span className="text-sm font-medium text-zinc-500 group-hover/entry:text-zinc-200 transition-colors truncate tracking-wide italic">
                            {f.value}
                          </span>
                        </div>
                      ))}
                    <div className="flex items-center justify-between pt-6">
                      <div className="flex items-center gap-3">
                        <Clock className="w-3.5 h-3.5 text-zinc-800" />
                        <span className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.3em]">
                          Established{" "}
                          {c.created_at
                            ? new Date(c.created_at).toLocaleDateString()
                            : "Master Orbit"}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-zinc-800 group-hover/client:text-[#00E5C0] group-hover/client:border-[#00E5C0]/40 transition-all duration-700 hover:scale-125">
                        <ArrowRight className="w-5 h-5 transition-transform group-hover/client:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Onboarding Overlay Console */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-[60px] overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="w-full max-w-5xl bg-zinc-950/60 border border-white/5 rounded-[4rem] p-16 md:p-20 relative shadow-[0_50px_200px_rgba(0,0,0,0.8)] overflow-hidden group/modal text-left"
            >
              <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-[#00E5C0]/5 blur-[120px] rounded-full pointer-events-none" />
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-12 right-12 text-zinc-700 hover:text-white transition-all hover:scale-125 hover:rotate-90"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="space-y-16">
                <div className="flex items-center gap-8">
                  <div className="w-24 h-24 bg-[#00E5C0]/10 border border-[#00E5C0]/20 rounded-[2.5rem] flex items-center justify-center shadow-inner group-hover/modal:rotate-12 transition-transform duration-1000">
                    <Briefcase className="w-10 h-10 text-[#00E5C0]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">
                      New Node<span className="text-[#00E5C0]">.</span>
                    </h3>
                    <p className="text-[11px] text-zinc-600 font-black uppercase tracking-[0.5em]">
                      Establishing Handshake Protocol
                    </p>
                  </div>
                </div>

                <form onSubmit={addClient} className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {[
                      {
                        key: "name",
                        label: "Identity Name",
                        placeholder: "e.g. Elena Vance",
                        required: true,
                        icon: UserCircle2,
                      },
                      {
                        key: "company_name",
                        label: "Strategic Entity",
                        placeholder: "e.g. Black Mesa Corp.",
                        required: false,
                        icon: Globe,
                      },
                      {
                        key: "email",
                        label: "Transmission Node",
                        placeholder: "e.g. elena@vance.com",
                        required: false,
                        icon: Mail,
                      },
                      {
                        key: "website",
                        label: "Domain Link",
                        placeholder: "e.g. blackmesa.com",
                        required: false,
                        icon: Search,
                      },
                    ].map((field) => (
                      <div key={field.key} className="space-y-4">
                        <label className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] ml-2">
                          {field.label} {field.required && "*"}
                        </label>
                        <div className="relative group/input">
                          <field.icon className="absolute left-7 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-800 transition-colors group-focus-within/input:text-[#00E5C0]" />
                          <input
                            type="text"
                            placeholder={field.placeholder}
                            required={field.required}
                            value={(form as any)[field.key]}
                            onChange={(e) =>
                              setForm({ ...form, [field.key]: e.target.value })
                            }
                            className="w-full bg-black/40 border border-white/5 rounded-[1.75rem] py-6 pl-16 pr-8 text-white font-bold placeholder:text-zinc-900 focus:outline-none focus:border-[#00E5C0]/40 transition-all shadow-inner group-hover/input:bg-black/60"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-8 pt-8 border-t border-white/5">
                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full md:w-fit px-16 py-8 bg-[#00E5C0] text-black font-black rounded-[2rem] hover:bg-[#00ffd6] transition-all duration-700 text-[11px] uppercase tracking-[0.4em] shadow-2xl disabled:opacity-30 flex items-center justify-center gap-4"
                    >
                      {saving ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <Activity className="w-5 h-5" />
                      )}
                      Add This Client
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="text-[11px] font-black text-zinc-700 hover:text-white uppercase tracking-[0.4em] transition-colors"
                    >
                      Abort Signal
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
