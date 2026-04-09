"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Activity,
  Zap,
  Play,
  CheckCircle2,
  ChevronDown,
  BarChart3,
  Target,
  Link as LinkIcon,
  DollarSign,
  PieChart,
  Server,
  Fingerprint,
  Sparkles,
  Layers,
  Menu,
  X,
  TrendingUp,
} from "lucide-react";

const ease = [0.23, 1, 0.32, 1] as const;

// --- Smooth Counter Component ---
const CountUp = ({ to, className }: { to: number; className?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = to / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [to]);
  return <span className={className}>{count.toLocaleString()}</span>;
};

export default CountUp;
