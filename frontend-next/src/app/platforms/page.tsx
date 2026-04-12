"use client";

import React from "react";
import Navbar from "@/components/landing/layout/Navbar";
import Footer from "@/components/landing/layout/Footer";
import SupportedPlatforms from "@/components/landing/platforms/SupportedPlatforms";
import IntegrationMarquee from "@/components/landing/platforms/IntegrationMarquee";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function PlatformsPage() {
  return (
    <div className="min-h-screen bg-black selection:bg-[#00E5C0]/30 selection:text-white">
      <Navbar />

      {/* Hero Section for Platforms */}
      <section className="pt-32 md:pt-48 pb-16 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00E5C0]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8"
          >
            <Zap className="w-3 h-3 text-[#00E5C0]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Integrations & Tools
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-white leading-none uppercase tracking-tighter mb-8"
          >
            Connect Every <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5C0] to-indigo-400">
              AI Tool You Use.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed italic mb-12"
          >
            AnasFlow integrates directly with your existing stack. No complex 
            setup, no manual data entry. Just connect and start saving.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/register"
              className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-[#00E5C0] transition-all shadow-3xl flex items-center gap-4 mx-auto w-fit"
            >
              Start Connecting
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <IntegrationMarquee />
      <SupportedPlatforms />

      {/* CTA Section */}
      <section className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">
            Missing an integration?
          </h2>
          <p className="text-lg md:text-xl text-zinc-500 mb-12 font-medium italic">
            Working with a proprietary tool or custom API? Our team builds custom 
            nodes for Enterprise clients every single week.
          </p>
          <Link
            href="/help"
            className="inline-flex items-center gap-3 text-[#00E5C0] font-black uppercase tracking-widest hover:gap-6 transition-all"
          >
            Contact Integration Support <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
