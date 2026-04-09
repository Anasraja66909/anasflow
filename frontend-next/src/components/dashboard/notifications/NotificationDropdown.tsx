"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CheckCircle2,
  Zap,
  AlertTriangle,
  Settings,
  Info,
  X,
  Clock,
  Layers,
  Users,
} from "lucide-react";
import Link from "next/link";

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "error" | "automation";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const formatRelativeTime = (iso?: string) => {
  if (!iso) return "Just now";
  const timestamp = new Date(iso).getTime();
  if (Number.isNaN(timestamp)) return "Just now";
  const diffMinutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60000));
  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
};

const mapAlertLevel = (level: string): Notification["type"] => {
  if (level === "critical") return "error";
  if (level === "warning") return "warning";
  if (level === "low") return "info";
  return "info";
};

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8000/alerts/system/", {
          headers: token ? { Authorization: "Bearer " + token } : {},
        });
        if (!response.ok) return;
        const data = await response.json();
        const normalized: Notification[] = (
          Array.isArray(data) ? data : []
        ).map((item: any) => ({
          id: String(item.id),
          type: mapAlertLevel(item.level),
          title: `${(item.level || "info").toUpperCase()} Alert`,
          message: item.message || "System notification",
          time: formatRelativeTime(item.created_at),
          read: false,
        }));
        setNotifications(normalized);
      } catch (error) {
        console.error("Failed to load notifications", error);
      }
    }

    loadNotifications();
    const interval = setInterval(loadNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircle2,
          color: "text-[#00E5C0]",
          bg: "bg-[#00E5C0]/10 border-[#00E5C0]/20",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          color: "text-orange-400",
          bg: "bg-orange-400/10 border-orange-400/20",
        };
      case "automation":
        return {
          icon: Zap,
          color: "text-indigo-400",
          bg: "bg-indigo-400/10 border-indigo-400/20",
        };
      default:
        return {
          icon: Info,
          color: "text-blue-400",
          bg: "bg-blue-400/10 border-blue-400/20",
        };
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-xl transition-all duration-300 ${isOpen ? "bg-white/10 text-white" : "text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5"}`}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-black animate-in fade-in zoom-in">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute right-0 top-full mt-4 w-96 bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-[100] backdrop-blur-2xl ring-1 ring-white/5"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-zinc-900/50">
              <div>
                <h3 className="text-sm font-black text-white tracking-tight uppercase">
                  Activity Hub
                </h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">
                  {unreadCount} Unread Alerts
                </p>
              </div>
              <button
                onClick={markAllRead}
                className="text-[10px] font-black text-indigo-400 hover:text-indigo-300 uppercase tracking-widest border border-indigo-500/20 bg-indigo-500/5 px-3 py-1.5 rounded-full transition-colors"
              >
                Mark All Read
              </button>
            </div>

            {/* List */}
            <div className="max-h-[400px] overflow-y-auto divide-y divide-white/5">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-4 transition-all hover:bg-white/[0.02] group relative ${n.read ? "opacity-60" : "opacity-100"}`}
                  >
                    {!n.read && (
                      <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#00E5C0] rounded-full"></div>
                    )}
                    <div className="flex gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110 ${getTypeStyles(n.type).bg} ${getTypeStyles(n.type).color}`}
                      >
                        {React.createElement(getTypeStyles(n.type).icon, {
                          className: "w-5 h-5",
                        })}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-sm font-bold text-white truncate">
                            {n.title}
                          </h4>
                          <span className="text-[10px] text-zinc-600 font-medium whitespace-nowrap pt-0.5">
                            {n.time}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                          {n.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-zinc-900/50 rounded-2xl flex items-center justify-center mx-auto border border-white/5 mb-4">
                    <CheckCircle2 className="w-8 h-8 text-zinc-700" />
                  </div>
                  <p className="text-zinc-500 text-sm font-bold tracking-tight">
                    System is all clear!
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/5 bg-zinc-900/10">
              <Link
                href="/dashboard/alerts"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 text-xs font-black text-white hover:text-[#00E5C0] transition-colors py-2"
              >
                View All Platform Incidents <Clock className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
