"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Twitter,
  Linkedin,
  Github,
  Terminal,
  ShieldCheck,
  Activity,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 relative overflow-hidden">
      {/* Background Accent Architecture */}
      <div className="absolute bottom-0 left-0 w-[800px] h-[400px] bg-[#00E5C0]/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />

      {/* Main Footer Layout */}
      <div className="max-w-screen-2xl mx-auto px-8 py-20 relative z-10 flex flex-col md:flex-row items-start justify-between gap-16 text-left">
        {/* Brand Core Column */}
        <div className="space-y-8 max-w-sm">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 group-hover:border-[#00E5C0]/40">
              <Image
                src="/logo.png"
                alt="AnasFlow"
                fill
                className="object-contain p-2"
              />
            </div>
            <span className="text-2xl font-black text-white uppercase tracking-tighter">
              AnasFlow<span className="text-[#00E5C0]">.</span>
            </span>
          </Link>
          <p className="text-zinc-600 text-lg font-medium italic leading-relaxed">
            Aggressive AI scale requires surgical cost intelligence. Establish
            total dominance over your neural footprint.
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: Twitter, href: "#", label: "Twitter" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Github, href: "#", label: "GitHub" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-12 h-12 rounded-xl border border-white/5 bg-zinc-950/40 flex items-center justify-center text-zinc-700 hover:text-white hover:border-white/20 transition-all duration-700 shadow-inner group/social"
              >
                <Icon className="w-5 h-5 transition-transform group-hover/social:scale-125 group-hover/social:rotate-12" />
              </a>
            ))}
          </div>
        </div>

        {/* Unified Site Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 md:gap-24">
          <div className="space-y-8">
            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.5em]">
              Network Hub
            </h4>
            <nav className="flex flex-col gap-5">
              {[
                { label: "Features", href: "/#features" },
                { label: "Pricing", href: "/#pricing" },
                { label: "Intelligence", href: "/#intel" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-sm font-black text-zinc-600 hover:text-[#00E5C0] transition-colors duration-500 uppercase tracking-widest leading-none"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-8">
            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.5em]">
              Neural Center
            </h4>
            <nav className="flex flex-col gap-5">
              {[
                { label: "Documentation", href: "#" },
                { label: "Help Center", href: "/help" },
                { label: "Diagnostic Docs", href: "#" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-sm font-black text-zinc-600 hover:text-white transition-colors duration-500 uppercase tracking-widest leading-none"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-8">
            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.5em]">
              Protocol
            </h4>
            <nav className="flex flex-col gap-5">
              {[
                { label: "Privacy Core", href: "/privacy" },
                { label: "Terms of Intel", href: "#" },
                { label: "Security Trace", href: "#" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-sm font-black text-zinc-600 hover:text-white transition-colors duration-500 uppercase tracking-widest leading-none"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Tactical Bottom Integrity Bar */}
      <div className="max-w-screen-2xl mx-auto px-8 pb-12 relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-12" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-left">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-white/5 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-zinc-800" />
            </div>
            <p className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.4em]">
              © 2026 AnasFlow Protocol. All rights established.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-2 h-2 rounded-full bg-[#00E5C0] shadow-[0_0_10px_#00E5C0] animate-pulse" />
              <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] group-hover:text-white transition-colors">
                Neural Clusters Operational
              </span>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
              <ShieldCheck className="w-4 h-4 text-zinc-800 group-hover:text-[#00E5C0] transition-colors" />
              <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] group-hover:text-white transition-colors">
                Encrypted (AES-256)
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
