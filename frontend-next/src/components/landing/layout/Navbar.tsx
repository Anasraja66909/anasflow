"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Terminal, ShieldCheck, Zap, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const dark = stored !== "light";
    setIsDark(dark);
    document.documentElement.classList.toggle("light-mode", !dark);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
    document.documentElement.classList.toggle("light-mode", !newDark);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Features", href: "/#features" },
    { name: "Intel", href: "/#intel" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Help", href: "/help" },
  ];

  return (
    <nav
      className={`fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        scrolled
          ? "w-[95%] max-w-5xl bg-zinc-950/40 backdrop-blur-[60px] border border-white/5 py-3 rounded-[2.5rem] px-4 md:px-8 shadow-[0_50px_100px_rgba(0,0,0,0.6)]"
          : "w-[98%] max-w-7xl bg-transparent py-4 md:py-6 px-3 md:px-4 border-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Brand Architecture */}
        <Link href="/" className="flex items-center gap-4 group">
          <div
            className={`relative transition-all duration-1000 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden group-hover:rotate-12 group-hover:scale-110 ${scrolled ? "w-10 h-10" : "w-12 h-12"}`}
          >
            <Image
              src="/logo.png"
              alt="AnasFlow"
              fill
              className="object-contain p-2"
              priority
            />
          </div>
          <div className="flex flex-col items-start text-left">
            <span
              className={`font-black uppercase tracking-tighter text-white transition-all duration-1000 ${scrolled ? "text-xl" : "text-2xl"}`}
            >
              AnasFlow<span className="text-[#00E5C0]">.</span>
            </span>
            {!scrolled && (
              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.5em] mt-[-2px]">
                Neural Command
              </span>
            )}
          </div>
        </Link>

        {/* Global Navigation Nodes */}
        <div
          className={`hidden md:flex items-center gap-10 ${scrolled ? "opacity-100" : "bg-zinc-950/40 backdrop-blur-3xl border border-white/5 px-10 py-3 rounded-full shadow-2xl"}`}
        >
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] hover:text-white transition-colors duration-500"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Access Protocol Nodes */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-500"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-zinc-400 hover:text-yellow-400 transition-colors" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700 hover:text-indigo-500 transition-colors" />
            )}
          </button>
          <Link
            href="/login"
            className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 hover:text-white transition-colors duration-500"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className={`px-10 rounded-full bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#00E5C0] hover:shadow-[0_0_30px_rgba(0,229,192,0.4)] transition-all duration-700 active:scale-95 flex items-center gap-3 ${scrolled ? "py-4" : "py-5"}`}
          >
            <Zap className="w-4 h-4" />
            Sign Up
          </Link>
        </div>

        {/* Mobile Terminal Toggle */}
        <button
          className="md:hidden text-white w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute top-full left-0 right-0 mt-6 bg-zinc-950/60 backdrop-blur-[80px] border border-white/5 rounded-[3rem] p-10 flex flex-col gap-8 shadow-[0_80px_150px_rgba(0,0,0,0.8)] md:hidden text-left"
          >
            <div className="flex flex-col gap-6">
              {links.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-5 text-xl font-black text-white p-6 rounded-[2rem] bg-white/5 hover:bg-[#00E5C0]/10 transition-colors uppercase tracking-widest border border-white/5"
                >
                  <Terminal className="w-5 h-5 text-zinc-700" />
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="h-px bg-white/5" />

            <div className="flex flex-col gap-5">
              <Link
                href="/login"
                className="w-full py-8 rounded-[2.5rem] bg-zinc-950 border border-white/5 text-white text-center font-black text-[11px] uppercase tracking-[0.4em] hover:bg-white/5 transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="w-full py-8 rounded-[2.5rem] bg-white text-black text-center font-black text-[11px] uppercase tracking-[0.4em] hover:bg-[#00E5C0] transition-all shadow-3xl"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
