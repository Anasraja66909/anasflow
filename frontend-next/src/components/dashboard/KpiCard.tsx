"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

interface KpiCardProps {
  title: string;
  value: string | number;
  subtext: {
    highlight?: string;
    normal: string;
  };
  icon: LucideIcon;
  subIcon?: LucideIcon;
  colorClass: {
    bg: string;
    icon: string;
  };
  highlightClass?: string;
  highlightText?: boolean;
  loading?: boolean;
}

export const KpiCard = ({
  title,
  value,
  subtext,
  icon: Icon,
  subIcon: SubIcon,
  colorClass,
  highlightClass,
  highlightText,
  loading,
}: KpiCardProps) => (
  <motion.div
    variants={itemVariants}
    className="relative group overflow-hidden bg-zinc-950/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 transition-all duration-700 hover:bg-zinc-900/60 hover:border-white/10 shadow-2xl hover:shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
  >
    {/* Dynamic Background Glow */}
    <div
      className={`absolute -top-24 -right-24 w-48 h-48 blur-[100px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-1000 ${colorClass.bg}`}
    />

    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className="space-y-1">
        <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] ml-0.5">
          {title}
        </h3>
        <div className="h-0.5 w-8 bg-zinc-800 group-hover:w-12 group-hover:bg-[#00E5C0] transition-all duration-500 rounded-full"></div>
      </div>
      <div
        className={`p-4 rounded-2xl border border-white/5 ${colorClass.bg} shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}
      >
        <Icon className={`w-5 h-5 ${colorClass.icon}`} />
      </div>
    </div>

    {loading ? (
      <div className="h-10 md:h-12 w-24 md:w-32 bg-slate-100 dark:bg-white/5 animate-pulse rounded-2xl mb-4"></div>
    ) : (
      <div className="relative mb-6 overflow-visible">
        <p
          className={`text-2xl sm:text-3xl lg:text-[2.1rem] font-extrabold tracking-tight relative z-10 transition-colors duration-500 whitespace-nowrap ${highlightText ? highlightClass : "text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-[#6366F1] group-hover:to-[#00E5C0] dark:group-hover:from-white dark:group-hover:to-zinc-500"}`}
        >
          {value}
        </p>
      </div>
    )}

    <div className="flex flex-wrap items-center gap-3 group/sub relative z-10">
      <div
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] ${highlightClass ? `${highlightClass} bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10` : "text-slate-500 dark:text-zinc-500 bg-slate-100 dark:bg-zinc-900/50"}`}
      >
        {SubIcon && <SubIcon className="w-3 h-3 animate-pulse" />}
        <span>{subtext.highlight || "verified"}</span>
      </div>
      <span className="text-[9px] text-slate-400 dark:text-zinc-600 font-black uppercase tracking-widest leading-tight flex-1 min-w-[100px]">
        {subtext.normal}
      </span>
    </div>
  </motion.div>
);
