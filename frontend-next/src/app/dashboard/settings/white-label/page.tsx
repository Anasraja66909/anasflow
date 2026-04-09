"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Upload,
  Palette,
  Building2,
  Save,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Eye,
  Mail,
  RefreshCw,
  Signal,
  Terminal,
  Globe,
  FileText,
  ShieldCheck,
  Activity,
  ArrowRight,
  X,
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
  hidden: { opacity: 0, scale: 0.98, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function WhiteLabelSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    company_name: "",
    primary_color: "#00E5C0",
    support_email: "",
    logo_url: null,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/settings/white-label`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
        if (data.logo_url) {
          setLogoPreview(
            `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${data.logo_url}`,
          );
        }
      }
    } catch (err) {
      console.error("Failed to fetch branding settings", err);
      toast.error("Telemetry Interruption.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("company_name", settings.company_name);
      formData.append("primary_color", settings.primary_color);
      formData.append("support_email", settings.support_email);
      if (logoFile) {
        formData.append("logo", logoFile);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/settings/white-label`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        },
      );

      if (res.ok) {
        toast.success("Identity Reconstructed.", {
          description: "Global branding parameters have been synchronized.",
        });
        fetchSettings();
      } else {
        toast.error("Transmission Failed.");
      }
    } catch (err) {
      toast.error("Surgical Interruption.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-12 relative bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.03] to-transparent pointer-events-none" />
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full border-t-4 border-[#00E5C0] animate-spin shadow-[0_0_30px_rgba(0,229,192,0.3)]" />
          <div
            className="absolute inset-4 rounded-full border-r-4 border-indigo-500 animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          />
          <div className="absolute inset-0 m-auto flex items-center justify-center bg-zinc-900 rounded-full w-20 h-20 shadow-inner">
            <Sparkles className="w-8 h-8 text-white animate-pulse" />
          </div>
        </div>
        <p className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.6em] animate-pulse">
          Establishing Identity Sync
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
              <div className="w-12 h-12 bg-[#00E5C0]/10 border border-[#00E5C0]/20 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#00E5C0]/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
                <Sparkles className="w-5 h-5 text-[#00E5C0] relative z-10" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#00E5C0]">
                Corporate Identity Architecture
              </span>
            </div>
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white leading-[0.85] uppercase">
              White{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">
                Label.
              </span>
            </h1>
            <p className="text-zinc-500 text-xl font-medium max-w-3xl leading-relaxed italic">
              Command your agency's visual broadcast across all client
              touchpoints and automated ROI whitepapers. Establishing
              world-class authority.
            </p>
          </div>
          <div className="px-8 py-4 bg-zinc-950/40 backdrop-blur-[40px] border border-white/5 rounded-2xl flex items-center gap-4 shadow-2xl">
            <div className="w-2 h-2 bg-[#00E5C0] rounded-full shadow-[0_0_10px_#00E5C0] animate-pulse" />
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">
              Global Identity Link Active
            </span>
          </div>
        </motion.div>

        <form
          onSubmit={handleSave}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left"
        >
          {/* Left: Configuration Slate (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Agency Identity Core */}
            <motion.div
              variants={itemVariants}
              className="bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[4rem] p-16 space-y-16 shadow-2xl relative overflow-hidden group/card shadow-[0_50px_150px_rgba(0,0,0,0.6)]"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none group-hover/card:bg-indigo-500/10 transition-colors" />

              <div className="flex items-center gap-8 relative z-10">
                <div className="w-20 h-20 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shadow-inner group-hover/card:rotate-6 transition-transform duration-1000 scale-110">
                  <Building2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
                    Identity Hub.
                  </h2>
                  <p className="text-[11px] text-zinc-700 font-black tracking-[0.4em] uppercase">
                    Core Corporate Parameters
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-zinc-700 uppercase tracking-[0.4em] ml-2">
                    Legal Entity Signature
                  </label>
                  <div className="relative group/input">
                    <input
                      type="text"
                      value={settings.company_name}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          company_name: e.target.value,
                        })
                      }
                      placeholder="e.g. Acme Strategic"
                      className="w-full bg-black/40 border border-white/5 rounded-[1.75rem] px-8 py-6 text-white font-black text-sm tracking-widest placeholder:text-zinc-900 focus:outline-none focus:border-indigo-500/40 transition-all shadow-inner group-hover/input:bg-black/60"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-zinc-700 uppercase tracking-[0.4em] ml-2">
                    Master Support Node
                  </label>
                  <div className="relative group/input">
                    <Mail className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-800 pointer-events-none group-focus-within/input:text-indigo-400" />
                    <input
                      type="email"
                      value={settings.support_email}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          support_email: e.target.value,
                        })
                      }
                      placeholder="support@hq.com"
                      className="w-full bg-black/40 border border-white/5 rounded-[1.75rem] py-6 pl-20 pr-8 text-white font-black text-sm tracking-widest placeholder:text-zinc-900 focus:outline-none focus:border-indigo-500/40 transition-all shadow-inner group-hover/input:bg-black/60"
                      required
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Neural Theming Layer */}
            <motion.div
              variants={itemVariants}
              className="bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[4rem] p-16 space-y-16 shadow-2xl relative overflow-hidden group/theme shadow-[0_50px_150px_rgba(0,0,0,0.6)]"
            >
              <div className="absolute top-0 left-0 w-96 h-96 bg-[#00E5C0]/5 blur-[120px] rounded-full pointer-events-none group-hover/theme:bg-[#00E5C0]/10 transition-colors" />

              <div className="flex items-center gap-8 relative z-10">
                <div className="w-20 h-20 rounded-[2rem] bg-[#00E5C0]/10 border border-[#00E5C0]/20 text-[#00E5C0] flex items-center justify-center shadow-inner group-hover/theme:-rotate-12 transition-transform duration-1000 scale-110">
                  <Palette className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
                    Neural Spectrum.
                  </h2>
                  <p className="text-[11px] text-zinc-700 font-black tracking-[0.4em] uppercase">
                    Visual Transmission Layer
                  </p>
                </div>
              </div>

              <div className="flex flex-col 2xl:flex-row items-center 2xl:items-start gap-16 relative z-10">
                {/* Media Archive zone */}
                <div className="space-y-6 w-full 2xl:w-fit">
                  <label className="text-[11px] font-black text-zinc-700 uppercase tracking-[0.4em] ml-2">
                    Master Logotype Asset
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-10">
                    <div className="w-40 h-40 rounded-[2.5rem] bg-zinc-900 border border-white/5 flex items-center justify-center overflow-hidden relative group/upload shadow-inner">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt="Preview"
                          className="w-full h-full object-contain p-8 group-hover/upload:scale-110 transition-transform duration-1000"
                        />
                      ) : (
                        <Upload className="w-12 h-12 text-zinc-800 animate-pulse" />
                      )}
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-[#00E5C0]/80 opacity-0 group-hover/upload:opacity-100 flex items-center justify-center cursor-pointer transition-all duration-700 backdrop-blur-md"
                      >
                        <RefreshCw className="w-10 h-10 text-black rotate-0 group-hover/upload:rotate-180 transition-transform duration-1000" />
                      </div>
                    </div>
                    <div className="space-y-4 text-center sm:text-left">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-10 py-5 rounded-2xl bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#00E5C0] transition-all duration-700 shadow-2xl"
                      >
                        Update Identity Asset
                      </button>
                      <p className="text-[10px] font-black text-zinc-800 uppercase tracking-widest leading-relaxed">
                        MAX 2MB / PNG-SVG / RATIO 1:1 REQ.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Spectral Hub */}
                <div className="space-y-6 flex-1 w-full">
                  <label className="text-[11px] font-black text-zinc-700 uppercase tracking-[0.4em] ml-2">
                    Primary Flux Chromatic
                  </label>
                  <div className="flex items-center gap-8 bg-black/40 p-5 rounded-[2.5rem] border border-white/5 shadow-inner hover:bg-black transition-all">
                    <div
                      className="w-24 h-24 rounded-[1.75rem] shadow-2xl border border-white/10 shrink-0 transition-all duration-1000 hover:rotate-[15deg] group-hover/theme:scale-105"
                      style={{
                        backgroundColor: settings.primary_color,
                        boxShadow: `0 30px 60px ${settings.primary_color}33`,
                      }}
                    />
                    <div className="flex-1 flex gap-5">
                      <input
                        type="text"
                        value={settings.primary_color}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            primary_color: e.target.value,
                          })
                        }
                        className="flex-1 bg-zinc-900/50 border border-white/5 rounded-2xl px-8 py-5 text-white font-mono text-lg uppercase tracking-widest focus:outline-none focus:border-[#00E5C0]/40 transition-all shadow-inner"
                      />
                      <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 group/picker">
                        <input
                          type="color"
                          value={settings.primary_color}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              primary_color: e.target.value,
                            })
                          }
                          className="absolute -inset-4 w-[200%] h-[200%] cursor-pointer bg-transparent border-none scale-150"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Execution Center */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-end gap-10"
            >
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-zinc-800 font-black uppercase tracking-[0.4em]">
                  Node Sync Pending Approval
                </p>
                <p className="text-sm font-black text-zinc-600 italic">
                  Parameters locked in tactical buffer
                </p>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="px-20 py-10 rounded-[2.5rem] bg-white text-black font-black text-sm uppercase tracking-[0.4em] hover:bg-[#00E5C0] transition-all duration-700 flex items-center gap-8 disabled:opacity-20 shadow-[0_40px_100px_rgba(0,0,0,0.6)] hover:shadow-[#00E5C0]/50 group/save"
              >
                {saving ? (
                  <RefreshCw className="w-6 h-6 animate-spin" />
                ) : (
                  <Save className="w-6 h-6 transition-transform group-hover/save:scale-125" />
                )}
                {saving ? "Transmitting..." : "Establish Global Branding"}
              </button>
            </motion.div>
          </div>

          {/* Right: Holographic ROI Slate Preview (4 cols) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 relative"
          >
            <div className="sticky top-12 space-y-12">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-black text-zinc-700 uppercase tracking-[0.5em] flex items-center gap-4">
                  <Eye className="w-5 h-5" /> Neural Live Preview
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_red] animate-pulse" />
                  <span className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.3em]">
                    Master Render
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-[4.5rem] p-16 shadow-[0_60px_150px_rgba(0,0,0,0.5)] relative overflow-hidden aspect-[1/1.41] transform transition-all duration-1000 rotate-1 group/slate hover:rotate-0 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.04] via-transparent to-transparent pointer-events-none" />

                {/* Blueprint Grid Watermark */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] rotate-12 pointer-events-none" />

                {/* Mock ROI Header */}
                <div
                  className="flex items-start justify-between border-b-8 pb-12 mb-12"
                  style={{ borderColor: settings.primary_color }}
                >
                  <div className="space-y-4 text-left">
                    <p className="text-[11px] font-black text-zinc-300 tracking-[0.4em] uppercase leading-none">
                      High Fidelity ROI Intelligence
                    </p>
                    <h4
                      className="text-5xl font-black leading-none uppercase tracking-tighter"
                      style={{ color: settings.primary_color }}
                    >
                      {settings.company_name || "Strategic Hub"}
                    </h4>
                  </div>
                  <div className="w-24 h-24 bg-zinc-50 rounded-[2rem] flex items-center justify-center overflow-hidden shadow-inner border border-zinc-100 p-4">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Sparkles className="w-8 h-8 text-zinc-200" />
                    )}
                  </div>
                </div>

                {/* Content Skeleton Architecture */}
                <div className="space-y-12 text-left">
                  <div className="h-3 w-1/3 bg-zinc-100 rounded-full" />
                  <div className="space-y-6">
                    <div className="h-6 w-full bg-zinc-50 rounded-2xl" />
                    <div className="h-6 w-[95%] bg-zinc-50 rounded-2xl" />
                    <div className="h-6 w-[85%] bg-zinc-100 rounded-2xl" />
                  </div>

                  <div className="pt-16 space-y-8">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex justify-between items-end border-b-2 border-zinc-50 pb-4"
                      >
                        <div className="h-6 w-48 bg-zinc-100 rounded-xl" />
                        <div className="h-12 w-32 bg-zinc-50 rounded-2xl shadow-sm" />
                      </div>
                    ))}
                    <div className="flex justify-between items-end pt-4">
                      <div className="h-6 w-40 bg-zinc-100 rounded-xl leading-none" />
                      <div
                        className="h-16 w-48 rounded-[1.75rem] flex items-center justify-center shadow-xl group-hover/slate:scale-105 transition-transform"
                        style={{
                          backgroundColor: `${settings.primary_color}1a`,
                        }}
                      >
                        <div
                          className="w-32 h-6 bg-white/40 rounded-full animate-pulse"
                          style={{ backgroundColor: settings.primary_color }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-20 mt-20 border-t-4 border-zinc-100 flex flex-col gap-6">
                    <p className="text-[11px] text-zinc-400 uppercase font-black tracking-[0.5em] leading-none">
                      Security Node Handshake
                    </p>
                    <p
                      className="text-lg font-black text-zinc-800 truncate underline decoration-8 underline-offset-8 decoration-zinc-100 hover:decoration-4 transition-all"
                      style={{
                        textDecorationColor: `${settings.primary_color}33`,
                      }}
                    >
                      {settings.support_email || "hq@enterprise.com"}
                    </p>
                  </div>
                </div>

                {/* Corporate Footer Watermark */}
                <div className="absolute bottom-16 left-16 right-16 flex items-center justify-between opacity-40">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-3 h-3 text-zinc-300" />
                    <span className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.4em]">
                      AnasFlow Master Render v4.2
                    </span>
                  </div>
                  <div
                    className="h-2 w-32 rounded-full"
                    style={{ backgroundColor: settings.primary_color }}
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-indigo-500/5 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-10 flex gap-6 shadow-3xl text-left"
              >
                <ShieldCheck className="w-8 h-8 text-indigo-400 shrink-0 mt-1" />
                <p className="text-sm text-indigo-200/50 font-medium leading-relaxed italic">
                  Your branding is now active. All client reports and emails
                  will show your logo and colors.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </form>
      </motion.div>

      <style jsx global>{`
        .text-glow-teal {
          text-shadow: 0 0 10px rgba(0, 229, 192, 0.4);
        }
        @keyframes shimmer {
          0% {
            opacity: 0.3;
            transform: translateX(-100%);
          }
          100% {
            opacity: 1;
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite linear;
        }
      `}</style>
    </div>
  );
}
