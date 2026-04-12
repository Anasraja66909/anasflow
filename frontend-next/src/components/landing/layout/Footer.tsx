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
} from "lucide-react";

const Footer = () => {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      className={`border-t relative overflow-hidden transition-all duration-700 ${
        isDark ? "bg-black border-white/5" : "border-indigo-100/50"
      }`}
      style={!isDark ? { background: "linear-gradient(180deg, #f8faff 0%, #eef2ff 100%)" } : {}}
    >
      {/* Background Accents */}
      <div className={`absolute bottom-0 left-0 w-[800px] h-[400px] blur-[160px] rounded-full pointer-events-none transition-colors duration-1000 ${
        isDark ? "bg-indigo-500/5" : "bg-indigo-400/5"
      }`} />
      <div className={`absolute top-0 right-0 w-[600px] h-[300px] blur-[120px] rounded-full pointer-events-none transition-colors duration-1000 ${
        isDark ? "bg-[#00E5C0]/5" : "bg-[#00E5C0]/5"
      }`} />

      {/* Main Footer Layout */}
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-12 md:py-20 relative z-10 flex flex-col md:flex-row items-start justify-between gap-16 text-left">
        {/* Brand Column */}
        <div className="space-y-8 max-w-sm">
          <Link href="/" className="flex items-center gap-4 group">
            <div className={`relative w-10 h-10 border rounded-xl flex items-center justify-center overflow-hidden transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 ${
              isDark ? "bg-black border-white/10 group-hover:border-[#00E5C0]/50" : "bg-white border-indigo-100 group-hover:border-indigo-300"
            }`}>
              <Image src="/logo.png" alt="AnasFlow" fill className="object-contain p-2" />
            </div>
            <span className={`text-2xl font-black uppercase tracking-tighter transition-colors ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              AnasFlow<span className="text-indigo-600">.</span>
            </span>
          </Link>
          <p className={`text-lg font-medium italic leading-relaxed transition-colors ${
            isDark ? "text-zinc-600" : "text-slate-500"
          }`}>
            AI growth requires clear cost insights. Take total control over your business spending.
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
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-700 shadow-sm group/social ${
                  isDark 
                    ? "bg-black border-white/5 text-zinc-600 hover:text-[#00E5C0] hover:border-[#00E5C0]/50" 
                    : "bg-white border-indigo-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50"
                }`}
              >
                <Icon className="w-5 h-5 transition-transform group-hover/social:scale-125 group-hover/social:rotate-12" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 md:gap-24">
          <div className="space-y-8">
            <h4 className={`text-[11px] font-black uppercase tracking-[0.5em] transition-colors ${
              isDark ? "text-zinc-600" : "text-slate-900"
            }`}>
              Quick Links
            </h4>
            <nav className="flex flex-col gap-5">
              {[
                { label: "Features", href: "/#features" },
                { label: "Pricing", href: "/#pricing" },
                { label: "Insights", href: "/#intel" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className={`text-sm font-black transition-colors duration-500 uppercase tracking-widest leading-none ${
                    isDark ? "text-zinc-700 hover:text-[#00E5C0]" : "text-slate-500 hover:text-indigo-600"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-8">
            <h4 className={`text-[11px] font-black uppercase tracking-[0.5em] transition-colors ${
              isDark ? "text-zinc-600" : "text-slate-900"
            }`}>
              Support
            </h4>
            <nav className="flex flex-col gap-5">
              {[
                { label: "Documentation", href: "#" },
                { label: "Help Center", href: "/help" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className={`text-sm font-black transition-colors duration-500 uppercase tracking-widest leading-none ${
                    isDark ? "text-zinc-700 hover:text-[#00E5C0]" : "text-slate-500 hover:text-indigo-600"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-8">
            <h4 className={`text-[11px] font-black uppercase tracking-[0.5em] transition-colors ${
              isDark ? "text-zinc-600" : "text-slate-900"
            }`}>
              Company
            </h4>
            <nav className="flex flex-col gap-5">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "#" },
                { label: "Security", href: "#" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className={`text-sm font-black transition-colors duration-500 uppercase tracking-widest leading-none ${
                    isDark ? "text-zinc-700 hover:text-[#00E5C0]" : "text-slate-500 hover:text-indigo-600"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-screen-2xl mx-auto px-8 pb-12 relative z-10">
        <div className={`h-px mb-12 transition-all duration-700 ${
          isDark ? "bg-gradient-to-r from-transparent via-white/5 to-transparent" : "bg-gradient-to-r from-transparent via-indigo-200 to-transparent"
        }`} />
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${
              isDark ? "bg-black border-white/5" : "bg-indigo-50 border-indigo-100"
            }`}>
              <Terminal className={`w-4 h-4 ${isDark ? "text-zinc-600" : "text-indigo-400"}`} />
            </div>
            <p className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${
              isDark ? "text-zinc-800" : "text-slate-400"
            }`}>
              © 2026 AnasFlow. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
              <span className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${
                isDark ? "text-zinc-800 group-hover:text-emerald-500" : "text-slate-400 group-hover:text-indigo-600"
              }`}>
                All Systems Operational
              </span>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer">
              <ShieldCheck className={`w-4 h-4 transition-colors ${isDark ? "text-zinc-800 group-hover:text-indigo-500" : "text-slate-300 group-hover:text-indigo-500"}`} />
              <span className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${
                isDark ? "text-zinc-800 group-hover:text-indigo-600" : "text-slate-400 group-hover:text-indigo-600"
              }`}>
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
