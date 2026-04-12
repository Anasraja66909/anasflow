"use client";

import React from "react";
import Navbar from "@/components/landing/layout/Navbar";
import Footer from "@/components/landing/layout/Footer";
import Testimonials from "@/components/landing/testimonials/Testimonials";
import { motion } from "framer-motion";
import { Star, ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-black selection:bg-[#00E5C0]/30 selection:text-white">
      <Navbar />

      {/* Hero Section for Testimonials */}
      <section className="pt-32 md:pt-48 pb-16 bg-black relative overflow-hidden text-center px-6">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8"
          >
            <MessageSquare className="w-3 h-3 text-[#00E5C0]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Customer Success Stories
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-white leading-none uppercase tracking-tighter mb-8"
          >
            Don't Just Take <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-700">
              Our Word For It.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed italic"
          >
            See how real AI agencies are using AnasFlow to slash their costs 
            and prove massive value to their clients every single month.
          </motion.p>
        </div>
      </section>

      <Testimonials />

      {/* Video Testimonials / Case Study Placeholder Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "38% Cost Reduction Case Study",
              result: "Ahmed R. saved $2,400 in the first month using our smart optimization tips.",
              color: "from-[#00E5C0] to-teal-900"
            },
            {
              title: "Retention Magic Case Study",
              result: "Sarah Khan boosted client retention by 40% using our white-labeled profit reports.",
              color: "from-indigo-500 to-blue-900"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-zinc-950/40 border border-white/5 rounded-[3rem] p-10 relative overflow-hidden group hover:border-white/20 transition-all duration-700"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity`} />
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">{item.title}</h3>
              <p className="text-zinc-500 text-lg font-medium italic mb-8">{item.result}</p>
              <Link href="/help" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00E5C0] hover:gap-4 transition-all">
                Read Full Story <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#050505] border-t border-white/5 text-center px-6">
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">
          Join 200+ Agencies.
        </h2>
        <Link
          href="/register"
          className="px-12 py-6 bg-white text-black font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-[#00E5C0] transition-all shadow-3xl inline-flex items-center gap-6"
        >
          Get Started Now <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </div>
  );
}
