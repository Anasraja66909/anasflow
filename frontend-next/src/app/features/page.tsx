import React from "react";
import Navbar from "@/components/landing/layout/Navbar";
import Footer from "@/components/landing/layout/Footer";
import Features from "@/components/landing/features/Features";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Features – AnasFlow Agency Command Center",
  description:
    "Explore every powerful feature of AnasFlow. Unified AI spend tracking, white-labeled ROI reports, cost optimization engine, and multi-platform connectors.",
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black selection:bg-[#00E5C0]/30 selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 bg-black relative overflow-hidden text-center px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-indigo-500/20 via-[#00E5C0]/10 to-transparent blur-[140px] opacity-40 pointer-events-none rounded-full" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00E5C0]/20 bg-[#00E5C0]/5 mb-6">
            <span className="text-[#00E5C0] font-bold tracking-widest uppercase text-xs">
              Platform Features
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6">
            Everything You Need
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5C0] via-teal-200 to-white">
              to Win.
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Built from the ground up for AI agencies that want total control
            over their costs, clients, and profitability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-zinc-100 hover:scale-105 transition-all duration-300"
            >
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white font-semibold text-lg hover:bg-white/5 transition-all duration-300"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <Features />

      {/* Extended Feature List */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-14">
            Every Feature,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5C0] to-teal-300">
              Included.
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Real-time spend tracking across all AI APIs",
              "Per-client and per-project cost attribution",
              "White-labeled PDF ROI reports in 1 click",
              "AI-powered cost optimization suggestions",
              "Multi-platform connectors (OpenAI, Claude, n8n, Zapier, GHL)",
              "Unified health & uptime monitoring dashboard",
              "Automated workflow failure alerts & notifications",
              "30-day historical data sync on first login",
              "Team member access & role management",
              "API webhooks for custom integrations",
              "Mobile-responsive dashboard for on-the-go access",
              "Dedicated onboarding support for Agency plan+",
            ].map((feat, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 hover:border-[#00E5C0]/20 transition-all duration-200 group"
              >
                <CheckCircle2 className="w-5 h-5 text-[#00E5C0] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-zinc-300 text-sm font-medium">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#050505] border-t border-white/5 text-center px-6">
        <h2 className="text-4xl font-black text-white mb-4">
          Ready to Take Control?
        </h2>
        <p className="text-zinc-500 mb-8 max-w-xl mx-auto">
          Start your 30-day free trial. No credit card required. Cancel anytime.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-zinc-100 hover:scale-105 transition-all duration-300"
        >
          Get Started Free <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </div>
  );
}
