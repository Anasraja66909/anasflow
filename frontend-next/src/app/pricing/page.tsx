import React from "react";
import Navbar from "@/components/landing/layout/Navbar";
import Footer from "@/components/landing/layout/Footer";
import Pricing from "@/components/landing/pricing/Pricing";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Pricing – AnasFlow Agency Command Center",
  description:
    "Simple, transparent pricing for AI agencies. Start free for 30 days. Starter, Agency, and Pro plans available.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black selection:bg-[#00E5C0]/30 selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-10 bg-black relative overflow-hidden text-center px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-[#00E5C0]/15 to-transparent blur-[120px] opacity-50 pointer-events-none rounded-full" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00E5C0]/20 bg-[#00E5C0]/5 mb-6">
            <span className="text-[#00E5C0] font-bold tracking-widest uppercase text-xs">
              Transparent Pricing
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-5">
            Simple,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5C0] to-teal-300">
              Honest Pricing.
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-xl mx-auto mb-4">
            No hidden fees. No surprises. Cancel anytime.
          </p>
          <p className="text-sm text-zinc-600">
            30-day free trial on all plans. No credit card required.
          </p>
        </div>
      </section>

      {/* Pricing Cards (reuse landing component) */}
      <Pricing />

      {/* Comparison Note */}
      <section className="py-16 bg-black text-center px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-white mb-4">
            All Plans Include
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
            {[
              "30-day free trial",
              "No credit card required",
              "Cancel anytime",
              "Unlimited API key connections",
              "Real-time spend dashboard",
              "Email support",
              "Data export (CSV)",
              "HTTPS + encrypted storage",
              "Automatic platform sync",
            ].map((item) => (
              <div
                key={item}
                className="text-sm text-zinc-400 bg-zinc-900/60 border border-white/5 rounded-xl px-4 py-3"
              >
                {item}
              </div>
            ))}
          </div>
          <p className="text-zinc-600 text-sm mb-6">
            Need a custom plan for a large enterprise?{" "}
            <a
              href="mailto:hello@anasflow.io"
              className="text-[#00E5C0] hover:underline"
            >
              Contact us.
            </a>
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-zinc-100 hover:scale-105 transition-all duration-300"
          >
            Start Your Free Trial <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
