"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Mail, Loader2 } from "lucide-react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password required");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      toast.error("All fields required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await register(email, password, name);
      toast.success("Account created! Welcome!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true);
      await loginWithGoogle(credentialResponse.credential);
      toast.success("Logged in with Google!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-slate-900/50 border border-slate-700/50 backdrop-blur rounded-xl p-8 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
              <Activity className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold text-white">AnasFlow</span>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-800/50">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-slate-700"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-slate-700"
              >
                Create Account
              </TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-white">Welcome back</h2>
                <p className="text-sm text-slate-400">
                  Sign in to your agency dashboard
                </p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => toast.error("Google login failed")}
                    theme="filled_black"
                    shape="rectangular"
                    size="large"
                    width="100%"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-slate-900/50 px-2 text-slate-400">
                    Or with email
                  </span>
                </div>
              </div>

              {/* Email Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label
                    htmlFor="login-email"
                    className="text-xs text-slate-300 mb-2 block"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 h-10"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="login-password"
                    className="text-xs text-slate-300 mb-2 block"
                  >
                    Password
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 h-10"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-10 bg-white text-black hover:bg-slate-100 font-medium"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <p className="text-center text-xs text-slate-400">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    (
                      document.querySelector('[value="signup"]') as HTMLElement
                    )?.click?.();
                  }}
                  className="text-white hover:underline"
                >
                  Create one
                </button>
              </p>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup" className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-white">
                  Create your account
                </h2>
                <p className="text-sm text-slate-400">
                  Join thousands of agencies managing automation
                </p>
              </div>

              {/* Social Signup Buttons */}
              <div className="space-y-3">
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => toast.error("Google signup failed")}
                    theme="filled_black"
                    shape="rectangular"
                    size="large"
                    width="100%"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-slate-900/50 px-2 text-slate-400">
                    Or register with email
                  </span>
                </div>
              </div>

              {/* Email Signup Form */}
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Label
                    htmlFor="signup-name"
                    className="text-xs text-slate-300 mb-2 block"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 h-10"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="signup-email"
                    className="text-xs text-slate-300 mb-2 block"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 h-10"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="signup-password"
                    className="text-xs text-slate-300 mb-2 block"
                  >
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 h-10"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    At least 6 characters
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-10 bg-white text-black hover:bg-slate-100 font-medium"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <p className="text-center text-xs text-slate-400">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    (
                      document.querySelector('[value="login"]') as HTMLElement
                    )?.click?.();
                  }}
                  className="text-white hover:underline"
                >
                  Sign in
                </button>
              </p>
            </TabsContent>
          </Tabs>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-slate-700/50 text-center text-xs text-slate-500">
            <p>
              By continuing, you agree to our{" "}
              <Link href="#" className="text-slate-300 hover:text-white">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-slate-300 hover:text-white">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        {/* Floating background */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
      </motion.div>
    </div>
  );
}
