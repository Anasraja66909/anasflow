"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/landing/layout/Navbar";
import Footer from "@/components/landing/layout/Footer";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";

const ease = [0.23, 1, 0.32, 1] as const;

const faqCategories = [
  {
    category: "General",
    items: [
      {
        q: "What is AnasFlow?",
        a: "AnasFlow is an Agency Command Center that unifies all your AI tool costs, automation workflows, and client ROI data into one powerful dashboard. Built for modern AI agencies.",
      },
      {
        q: "Is this exclusively for GoHighLevel agencies?",
        a: "No. While we have native GHL webhooks built-in, AnasFlow tracks OpenAI, Anthropic, n8n, Zapier, and more via API keys — regardless of your stack.",
      },
      {
        q: "Do my clients need to create an account?",
        a: "Not at all. You generate and send PDF ROI reports to clients. They can view white-labeled reports via secure links with zero login required.",
      },
      {
        q: "How long does setup take?",
        a: "Under 5 minutes. Paste your read-only API keys and we instantly sync historical and live cost data.",
      },
    ],
  },
  {
    category: "Billing & Plans",
    items: [
      {
        q: "Is there a free trial?",
        a: "Yes! Every plan comes with a 30-day free trial. No credit card required to start.",
      },
      {
        q: "Is there a commitment or contract?",
        a: "No. All plans are strictly month-to-month. You can cancel at any time from your dashboard settings.",
      },
      {
        q: "Can I upgrade or downgrade my plan?",
        a: "Yes. You can change your plan at any time. Upgrades take effect immediately and we prorate the cost. Downgrades apply at the next billing cycle.",
      },
      {
        q: "Do you offer refunds?",
        a: "We offer a full refund within 7 days of any charge if you're not satisfied. Beyond that, we process refunds case-by-case.",
      },
    ],
  },
  {
    category: "Technical",
    items: [
      {
        q: "Which platforms does AnasFlow support?",
        a: "Currently: OpenAI, Anthropic (Claude), n8n, Zapier, GoHighLevel, and Make (Integromat). We add new integrations regularly.",
      },
      {
        q: "Is my API key data secure?",
        a: "Yes. We only require read-only API keys and store them using AES-256 encryption. We never execute API calls that modify your data.",
      },
      {
        q: "Can I export my data?",
        a: "Absolutely. You can export all your tracked usage data as CSV or generate PDF reports for any date range at any time.",
      },
      {
        q: "Do you offer an API or webhooks?",
        a: "Yes. Agency and Pro plans include access to our REST API and configurable outbound webhooks for custom integrations and notifications.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({
    "0-0": true,
  });

  const toggle = (key: string) =>
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="min-h-screen bg-black selection:bg-[#00E5C0]/30 selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-16 bg-black text-center px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00E5C0]/8 blur-[130px] pointer-events-none rounded-full" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="text-zinc-400 font-bold tracking-widest uppercase text-xs">
              FAQ
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-5">
            Frequently Asked
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5C0] to-teal-300">
              Questions.
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-xl mx-auto">
            Everything you need to know about AnasFlow. Can't find your answer?{" "}
            <a
              href="mailto:hello@anasflow.io"
              className="text-[#00E5C0] hover:underline"
            >
              Contact us.
            </a>
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          {faqCategories.map((cat, catIdx) => (
            <div key={catIdx}>
              <h2 className="text-lg font-bold text-zinc-400 uppercase tracking-widest mb-5 border-b border-white/5 pb-3">
                {cat.category}
              </h2>
              <div className="space-y-3">
                {cat.items.map((f, i) => {
                  const key = `${catIdx}-${i}`;
                  const isOpen = !!openMap[key];
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4, ease }}
                      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-[#00E5C0]/25 shadow-[0_0_25px_rgba(0,229,192,0.05)]" : "border-white/5 hover:border-white/10"} bg-zinc-900`}
                    >
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between p-5 text-left"
                      >
                        <span className="font-semibold text-white text-sm pr-4">
                          {f.q}
                        </span>
                        <ChevronDown
                          className={`text-zinc-500 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#00E5C0]" : ""}`}
                          size={17}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease }}
                          >
                            <div className="px-5 pb-5 text-zinc-400 leading-relaxed border-t border-white/5 pt-4 text-sm">
                              {f.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#050505] border-t border-white/5 text-center px-6">
        <h2 className="text-4xl font-black text-white mb-4">
          Still have questions?
        </h2>
        <p className="text-zinc-500 mb-8">
          Our team is happy to help. Reach out anytime.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:hello@anasflow.io"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white font-semibold hover:bg-white/5 transition-all"
          >
            Email Support
          </a>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-zinc-100 hover:scale-105 transition-all duration-300"
          >
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
