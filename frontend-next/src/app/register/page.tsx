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
    setLoading(true);
    try {
      if (register) {
        await register(email, password, name);
      }
      toast.success("Identity Generated.");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Registration Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden selection:bg-[#00E5C0]/30 selection:text-white">
      {/* Immersive Background Architecture */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00E5C0]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none" />

      {/* Floating Logo */}
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

      {/* Main Registration Hub */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl relative z-10 flex flex-col lg:flex-row-reverse gap-12 items-center"
      >
        {/* Right Side: Dramatic Narrative */}
        <motion.div
          variants={itemVariants}
          className="flex-1 text-left space-y-8 hidden lg:block"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#00E5C0]/10 border border-[#00E5C0]/20 rounded-xl flex items-center justify-center">
              <PlusCircle className="w-5 h-5 text-[#00E5C0]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#00E5C0]">
              Initial Handshake Protocol
            </span>
          </div>
          <h1 className="text-8xl xl:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8">
            Generate <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">
              Identity.
            </span>
          </h1>
          <p className="text-zinc-500 text-xl font-medium leading-relaxed max-w-md">
            Establish your agency node. Unlock full-spectrum cost intelligence
            and holographic ROI reporting for your clients.
          </p>

          <div className="pt-12 space-y-6">
            {[
              { label: "Neural Account Generation", icon: Command },
              { label: "ROI Vector Verification", icon: Sparkles },
              { label: "Omni-Channel Activation", icon: Zap },
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

        {/* Left Side: The Glass Form */}
        <motion.div
          variants={itemVariants}
          className="w-full lg:w-[500px] bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 rounded-[4rem] p-10 md:p-14 shadow-[0_50px_200px_rgba(0,0,0,0.8)] relative overflow-hidden"
        >
          {/* Subtle Accent Glows inside the card */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-10">
            <div className="text-left space-y-4">
              <h2 className="text-5xl font-black text-white tracking-tighter">
                Sign Up<span className="text-[#00E5C0]">.</span>
              </h2>
              <p className="text-sm text-zinc-500 font-medium">
                Create your account in just a few seconds.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                {/* Full Name */}
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">
                    Your Name
                  </label>
                  <div className="relative group">
                    <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700 group-focus-within:text-[#00E5C0] transition-colors" />
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-black/40 border border-white/5 text-white text-sm rounded-[1.5rem] px-6 py-4 pl-14 focus:outline-none focus:ring-4 focus:ring-[#00E5C0]/5 focus:border-[#00E5C0]/30 transition-all placeholder:text-zinc-800 font-medium"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700 group-focus-within:text-[#00E5C0] transition-colors" />
                    <input
                      type="email"
                      placeholder="admin@youragency.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-black/40 border border-white/5 text-white text-sm rounded-[1.5rem] px-6 py-4 pl-14 focus:outline-none focus:ring-4 focus:ring-[#00E5C0]/5 focus:border-[#00E5C0]/30 transition-all placeholder:text-zinc-800 font-medium"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700 group-focus-within:text-[#00E5C0] transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-black/40 border border-white/5 text-white text-sm rounded-[1.5rem] px-6 py-4 pl-14 focus:outline-none focus:ring-4 focus:ring-[#00E5C0]/5 focus:border-[#00E5C0]/30 transition-all placeholder:text-zinc-800 font-medium font-mono tracking-[0.3em]"
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
                    Create My Account
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </button>
            </form>

            <div className="pt-6 border-t border-white/5 space-y-6">
              <p className="text-center text-[11px] font-black tracking-widest uppercase text-zinc-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#00E5C0] hover:text-[#00ffd6] transition-colors"
                >
                  Sign In
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
