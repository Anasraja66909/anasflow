"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  User,
  Lock,
  Command,
  Mail,
  Briefcase,
  PlusCircle,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
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

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      if (register) {
        await register(email, password, name);
      }
      toast.success("Account created! Welcome to AnasFlow.");
      router.push("/dashboard");
    } catch (err: any) {
      const errMsg = err?.message || "";
      if (
        errMsg.includes("fetch") ||
        errMsg.includes("network") ||
        errMsg.includes("Failed to fetch") ||
        errMsg.includes("ECONNREFUSED") ||
        errMsg.toLowerCase().includes("load") ||
        errMsg.toLowerCase().includes("connect")
      ) {
        const demoUser = { id: "demo-" + Date.now(), email, full_name: name };
        localStorage.setItem("demo_user", JSON.stringify(demoUser));
        localStorage.setItem("demo_mode", "true");
        toast.success("Welcome to AnasFlow Demo! Exploring the full dashboard.");
        router.push("/dashboard");
      } else {
        toast.error(errMsg || "Registration Failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 md:p-10 relative overflow-hidden selection:bg-[#00E5C0]/30 selection:text-white">
      {/* Immersive Background Architecture (Dark) */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00E5C0]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none" />

      {/* Responsive Logo Container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="fixed top-8 left-8 md:top-12 md:left-12 z-50"
      >
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0 transition-transform group-hover:scale-110">
            <Image
              src="/logo.png"
              alt="AnasFlow Logo"
              fill
              className="object-contain drop-shadow-[0_0_15px_rgba(0,229,192,0.4)]"
              priority
            />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tighter text-white">
            AnasFlow<span className="text-[#00E5C0]">.</span>
          </span>
        </Link>
      </motion.div>

      {/* Main Registration Hub */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl relative z-10 flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-center justify-center pt-24 lg:pt-0"
      >
        {/* Right Side: Narrative (Desktop Only) */}
        <motion.div
          variants={itemVariants}
          className="flex-1 text-left space-y-10 hidden lg:block"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-indigo-500/20 blur-xl group-hover:scale-150 transition-transform duration-1000" />
              <Terminal className="w-5 h-5 text-indigo-400 relative z-10" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400">
              User Account Setup
            </span>
          </div>
          <h1 className="text-8xl xl:text-9xl font-black text-white tracking-tighter leading-[0.85]">
            Join <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-700">
              AnasFlow.
            </span>
          </h1>
          <p className="text-zinc-500 text-xl font-medium leading-relaxed max-w-md">
            Create your agency account. Track all your AI costs and generate professional PDF reports for 50+ platforms.
          </p>

          <div className="pt-8 space-y-6">
            {[
              { label: "1-Click Tool Connecting", icon: Command },
              { label: "Accurate Profit Tracking", icon: Sparkles },
              { label: "Free Automated Reports", icon: Zap },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:border-[#00E5C0]/40 transition-colors shadow-2xl">
                  <feature.icon className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#00E5C0]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-200 transition-colors">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Left Side: Premium Glass Form */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-[540px] bg-black/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 md:p-14 shadow-[0_50px_200px_rgba(0,0,0,0.4)] relative overflow-hidden group/card"
        >
          {/* Subtle Glow inside the card */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-12">
            <div className="text-left space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
                Sign Up<span className="text-[#00E5C0]">.</span>
              </h2>
              <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest">
                Create your account in seconds
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                {/* Full Name */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] ml-2">
                    Full Name
                  </label>
                  <div className="relative group/input">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-700 group-focus-within/input:text-[#00E5C0] transition-colors" />
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-[1.5rem] px-8 py-5 pl-14 focus:outline-none focus:ring-4 focus:ring-[#00E5C0]/10 focus:border-[#00E5C0]/40 transition-all placeholder:text-zinc-700 font-bold"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] ml-2">
                    Email Address
                  </label>
                  <div className="relative group/input">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-700 group-focus-within/input:text-[#00E5C0] transition-colors" />
                    <input
                      type="email"
                      placeholder="admin@agency.app"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-[1.5rem] px-8 py-5 pl-14 focus:outline-none focus:ring-4 focus:ring-[#00E5C0]/10 focus:border-[#00E5C0]/40 transition-all placeholder:text-zinc-700 font-bold"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] ml-2">
                    Password
                  </label>
                  <div className="relative group/input">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-700 group-focus-within/input:text-[#00E5C0] transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-[1.5rem] px-8 py-5 pl-14 focus:outline-none focus:ring-4 focus:ring-[#00E5C0]/10 focus:border-[#00E5C0]/40 transition-all placeholder:text-zinc-700 font-black tracking-widest"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-700 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-black text-[11px] uppercase tracking-[0.4em] py-6 rounded-[1.5rem] mt-6 transition-all shadow-2xl hover:bg-[#00E5C0] hover:scale-[1.02] active:scale-95 disabled:opacity-50 group flex items-center justify-center gap-3"
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-4">
              <p className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-700">
                Already part of the network?{" "}
                <Link
                  href="/login"
                  className="text-[#00E5C0] hover:text-white transition-colors ml-2"
                >
                  Login Now
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}

function RefreshCw({ className }: { className?: string }) {
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
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}
