"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sun, Moon } from "lucide-react";

const links = [
  { name: "Features", href: "/#features" },
  { name: "Platforms", href: "/platforms" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "FAQ", href: "/faq" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Help", href: "/help" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const dark = stored === "dark"; // Default is LIGHT now
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.classList.toggle("light-mode", !dark);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newDark);
    document.documentElement.classList.toggle("light-mode", !newDark);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 overflow-x-hidden ${
          scrolled
            ? (isDark 
                ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl" 
                : "bg-white/90 backdrop-blur-xl border-b border-indigo-100/50 py-3 shadow-sm")
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 shrink-0 group">
            <div className={`relative w-8 h-8 md:w-9 md:h-9 border rounded-xl flex items-center justify-center overflow-hidden transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 ${
              isDark ? "bg-black border-white/10 group-hover:border-[#00E5C0]/50" : "bg-white border-indigo-100 group-hover:border-indigo-300"
            }`}>
              <Image src="/logo.png" alt="AnasFlow" fill className="object-contain p-1.5 md:p-2" priority />
            </div>
            <span className={`text-lg md:text-xl font-black uppercase tracking-tighter transition-colors duration-500 ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              Anas<span className="text-indigo-600">Flow</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                className={`text-[11px] font-black uppercase tracking-widest transition-colors duration-500 ${
                  isDark ? "text-zinc-600 hover:text-[#00E5C0]" : "text-slate-500 hover:text-indigo-600"
                }`}
              >
                {l.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all shadow-sm ${
                isDark 
                  ? "bg-black border-white/5 hover:border-[#00E5C0]/50" 
                  : "bg-indigo-50/50 border-indigo-100 hover:bg-indigo-100/80"
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-indigo-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-800" />
              )}
            </button>
            <Link
              href="/login"
              className={`text-[11px] font-black uppercase tracking-widest transition-colors px-4 py-2 ${
                isDark ? "text-zinc-600 hover:text-white" : "text-slate-600 hover:text-indigo-600"
              }`}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className={`text-[11px] font-black uppercase tracking-widest px-6 py-3 rounded-xl transition-all duration-300 ${
                isDark ? "bg-white text-black hover:bg-[#00E5C0]" : "bg-indigo-600 text-white hover:bg-slate-900 shadow-lg shadow-indigo-100"
              }`}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Right */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                isDark ? "bg-black border-white/5" : "bg-indigo-50/30 border-indigo-100/50"
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-indigo-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-800" />
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                isDark ? "bg-black border-white/5" : "bg-slate-100 border-slate-200"
              }`}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className={`w-4 h-4 ${isDark ? "text-white" : "text-slate-700"}`} />
              ) : (
                <Menu className={`w-4 h-4 ${isDark ? "text-white" : "text-slate-700"}`} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed top-0 left-0 right-0 bottom-0 z-[99] flex flex-col pt-24 px-8 overflow-y-auto transition-colors duration-500 ${
              isDark ? "bg-black/98 backdrop-blur-2xl" : "bg-white/97 backdrop-blur-xl"
            }`}
          >
            <div className="flex flex-col gap-2 mt-4">
              {links.map((l) => (
                <Link
                  key={l.name}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-2xl font-black py-6 border-b transition-colors uppercase tracking-tighter ${
                    isDark ? "text-white border-white/5 hover:text-[#00E5C0]" : "text-slate-900 border-slate-100 hover:text-indigo-600"
                  }`}
                >
                  {l.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-4 mt-8">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className={`w-full py-5 text-center text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl transition-all ${
                  isDark ? "bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white" : "bg-slate-100 border border-slate-200 text-slate-700 hover:bg-indigo-50"
                }`}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className={`w-full py-5 text-center text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl transition-all ${
                  isDark ? "bg-white text-black hover:bg-[#00E5C0]" : "bg-indigo-600 text-white hover:bg-slate-900 shadow-xl shadow-indigo-100"
                }`}
              >
                Get Started Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

export default Navbar;
