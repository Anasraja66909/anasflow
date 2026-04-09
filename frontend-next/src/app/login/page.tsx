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
  ChevronRight,
  Command,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Senior Dev Standard: Unified motion variants for auth flow
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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (login) {
        await login(email, password);
      }
      toast.success("Welcome back!");
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
        // Demo mode fallback
        const demoUser = { id: "demo-" + Date.now(), email, full_name: "Demo User" };
        localStorage.setItem("demo_user", JSON.stringify(demoUser));
        localStorage.setItem("demo_mode", "true");
        toast.success("Welcome to AnasFlow Demo!");
        router.push("/dashboard");
      } else {
        toast.error(errMsg || "Authentication Failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden selection:bg-[#00E5C0]/30 selection:text-white">
      {/* Immersive Background Architecture */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#00E5C0]/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none" />

      {/* Floating Logo - Architectural Positioning */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-12 left-12 z-50"
      >
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-12 h-12 shrink-0 transition-transform group-hover:scale-110">
            <Image
              src="/logo.png"
              alt="AnasFlow Logo"
              fill
              className="object-contain drop-shadow-[0_0_15px_rgba(0,229,192,0.4)]"
              priority
            />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            AnasFlow<span className="text-[#00E5C0]">.</span>
          </span>
        </Link>
      </motion.div>

      {/* Main Authentication Hub */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl relative z-10 flex flex-col lg:flex-row gap-12 items-center"
      >
        {/* Left Side: Dramatic Narrative */}
        <motion.div
          variants={itemVariants}
          className="flex-1 text-left space-y-8 hidden lg:block"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#00E5C0]/10 border border-[#00E5C0]/20 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#00E5C0]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#00E5C0]">
              Secure Access Protocol
            </span>
          </div>
          <h1 className="text-8xl xl:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8">
            Resume <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">
              Command.
            </span>
          </h1>
          <p className="text-zinc-500 text-xl font-medium leading-relaxed max-w-md">
            Manage your business setup and get real data on AI costs and
            automation performance.
          </p>

          <div className="pt-12 space-y-6">
            {[
              { label: "End-to-End Encryption", icon: Lock },
              { label: "Neural Identity Verification", icon: Command },
              { label: "Always Ready to Use", icon: Zap },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:border-[#00E5C0]/40 transition-colors">
                  <feature.icon className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#00E5C0]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: The Glass Form */}
        <motion.div
          variants={itemVariants}
          className="w-full lg:w-[500px] bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[4rem] p-10 md:p-16 shadow-[0_50px_200px_rgba(0,0,0,0.8)] relative overflow-hidden"
        >
          {/* Subtle Accent Glows inside the card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5C0]/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-12">
            <div className="text-left space-y-4">
              <h2 className="text-5xl font-black text-white tracking-tighter">
                Sign In<span className="text-[#00E5C0]">.</span>
              </h2>
              <p className="text-sm text-zinc-500 font-medium">
                Enter your email and password to get started.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                {/* Email Field */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700 group-focus-within:text-[#00E5C0] transition-colors" />
                    <input
                      type="email"
                      placeholder="name@youragency.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-black/40 border border-white/5 text-white text-sm rounded-[1.5rem] px-6 py-5 pl-14 focus:outline-none focus:ring-4 focus:ring-[#00E5C0]/5 focus:border-[#00E5C0]/30 transition-all placeholder:text-zinc-800 font-medium"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-2">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">
                      Password
                    </label>
                    <Link
                      href="#"
                      className="text-[10px] font-black text-[#00E5C0]/60 hover:text-[#00E5C0] uppercase tracking-widest transition-colors"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700 group-focus-within:text-[#00E5C0] transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-black/40 border border-white/5 text-white text-sm rounded-[1.5rem] px-6 py-5 pl-14 focus:outline-none focus:ring-4 focus:ring-[#00E5C0]/5 focus:border-[#00E5C0]/30 transition-all placeholder:text-zinc-800 font-medium font-mono tracking-[0.3em]"
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
                className="w-full bg-white text-black font-black text-[11px] uppercase tracking-[0.3em] py-6 rounded-[1.5rem] mt-4 transition-all shadow-2xl hover:bg-[#00E5C0] hover:scale-[1.02] active:scale-95 disabled:opacity-50 group"
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    Sign In
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </button>
            </form>

            {/* Tertiary Actions */}
            <div className="pt-8 border-t border-white/5 space-y-8">
              <button className="w-full bg-zinc-950/60 border border-white/5 hover:border-white/20 text-white font-black text-[10px] uppercase tracking-[0.2em] py-5 rounded-[1.5rem] flex items-center justify-center gap-4 transition-all">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="white"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="white"
                    opacity="0.6"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="white"
                    opacity="0.4"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="white"
                    opacity="0.8"
                  />
                </svg>
                Sign In With Google
              </button>

              <p className="text-center text-[11px] font-black tracking-widest uppercase text-zinc-600">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-[#00E5C0] hover:text-[#00ffd6] transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Global CSS for refresh icon */}
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
