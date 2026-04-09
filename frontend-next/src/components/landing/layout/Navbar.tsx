"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sun, Moon } from "lucide-react";

const links = [
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Help", href: "/help" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const dark = stored !== "light";
    setIsDark(dark);
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
    document.documentElement.classList.toggle("light-mode", !newDark);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
              <Image src="/logo.png" alt="AnasFlow" fill className="object-contain p-1.5" priority />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Anas<span className="text-[#00E5C0]">Flow</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                {l.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-zinc-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
            </button>
            <Link
              href="/login"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors px-4 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold bg-white text-black px-5 py-2.5 rounded-xl hover:bg-[#00E5C0] transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Right */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-zinc-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-white" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-[99] bg-black/95 backdrop-blur-xl flex flex-col pt-20 px-6">
          <div className="flex flex-col gap-2 mt-4">
            {links.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-semibold text-white py-4 border-b border-white/5 hover:text-[#00E5C0] transition-colors"
              >
                {l.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 mt-8">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="w-full py-4 text-center text-base font-semibold text-white bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="w-full py-4 text-center text-base font-semibold bg-white text-black rounded-2xl hover:bg-[#00E5C0] transition-all"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
