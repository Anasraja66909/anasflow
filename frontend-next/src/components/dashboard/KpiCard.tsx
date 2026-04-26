"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
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
    className="bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-sm font-semibold text-slate-500 dark:text-zinc-400">
        {title}
      </h3>
      <div className={`p-2.5 rounded-xl ${colorClass.bg}`}>
        <Icon className={`w-4 h-4 ${colorClass.icon}`} />
      </div>
    </div>

    {loading ? (
      <div className="h-8 w-24 bg-slate-100 dark:bg-white/5 animate-pulse rounded-lg mb-2"></div>
    ) : (
      <p
        className={`text-2xl sm:text-3xl font-bold tracking-tight mb-2 ${
          highlightText ? highlightClass : "text-slate-900 dark:text-white"
        }`}
      >
        {value}
      </p>
    )}

    <div className="flex items-center gap-2 mt-auto pt-2">
      {subtext.highlight && (
        <span
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${
            highlightClass
              ? `${highlightClass} bg-slate-50 dark:bg-white/5`
              : "text-slate-600 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800"
          }`}
        >
          {SubIcon && <SubIcon className="w-3 h-3" />}
          {subtext.highlight}
        </span>
      )}
      <span className="text-xs text-slate-500 dark:text-zinc-500 font-medium whitespace-nowrap">
        {subtext.normal}
      </span>
    </div>
  </motion.div>
);
