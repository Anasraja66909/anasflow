"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  Layers,
  BarChart2,
  FileText,
  Users,
  AlertCircle,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Plus,
  Bot,
  LogOut,
  User,
  CreditCard,
  HelpCircle,
  Sparkles,
  Menu,
  X,
  Terminal,
  Sun,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { ClientProvider, useClient } from "@/contexts/ClientContext";
import NotificationDropdown from "@/components/dashboard/notifications/NotificationDropdown";

const navItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Connect Platforms", url: "/dashboard/platforms", icon: Layers },
  { title: "AI Automation Doctor", url: "/dashboard/ai-doctor", icon: Bot },
  {
    title: "Analytics & Optimization",
    url: "/dashboard/analytics",
    icon: BarChart2,
  },
  { title: "Reports", url: "/dashboard/reports", icon: FileText },
  { title: "Clients", url: "/dashboard/clients", icon: Users },
  { title: "Alerts", url: "/dashboard/alerts", icon: AlertCircle },
  { title: "Billing", url: "/dashboard/billing", icon: CreditCard },
  { title: "Branding", url: "/dashboard/settings/white-label", icon: Sparkles },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Help Center", url: "/dashboard/help", icon: HelpCircle },
];

function ClientSwitcher() {
  const { clients, activeClientId, setActiveClientId } = useClient();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeClient = Array.isArray(clients)
    ? clients.find((c) => c.id === activeClientId)
    : null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-white/10 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
      >
        <Users className="w-4 h-4 text-[#00E5C0]" />
        <span className="truncate max-w-[120px] text-white">
          {activeClient ? activeClient.name : "All Clients"}
        </span>
        <ChevronDown
          className={`w-3 h-3 transition-transform ${open ? "rotate-180 text-white" : "text-zinc-500"}`}
        />
      </button>
      {open && (
        <div className="absolute top-full mt-2 w-56 bg-zinc-950 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 left-0">
          <div className="px-3 py-2 border-b border-white/5 bg-zinc-900/50">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Select Client
            </span>
          </div>
          <div className="max-h-64 overflow-y-auto overflow-x-hidden">
            <button
              onClick={() => {
                setActiveClientId(null);
                setOpen(false);
              }}
              className={`w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors ${!activeClientId ? "text-[#00E5C0] bg-[#00E5C0]/5" : "text-zinc-300"}`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${!activeClientId ? "bg-[#00E5C0]" : "bg-zinc-700"}`}
              ></div>
              Global Workspace
            </button>
            {clients.map((client) => (
              <button
                key={client.id}
                onClick={() => {
                  setActiveClientId(client.id);
                  setOpen(false);
                }}
                className={`w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors truncate ${activeClientId === client.id ? "text-[#00E5C0] bg-[#00E5C0]/5" : "text-zinc-300"}`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeClientId === client.id ? "bg-[#00E5C0]" : "bg-zinc-700"}`}
                ></div>
                <span className="truncate">{client.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const isDarkMode = theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-lg text-slate-600 dark:text-zinc-400 hover:text-[#00E5C0] transition-all group"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform group-hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform group-hover:-rotate-12" />
      )}
    </button>
  );
}

function TopNav({ onMenuClick }: { onMenuClick: () => void }) {
  const { user } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="h-16 border-b border-white/5 bg-white/80 dark:bg-zinc-950/90 backdrop-blur-xl fixed top-0 w-full z-40 flex items-center justify-between px-4 md:px-6 text-slate-900 dark:text-white shadow-sm">
      {/* Left: Brand & Hamburger */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-zinc-900 rounded-lg transition-colors border border-white/5 mr-1"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
        <Link href="/" className="flex items-center gap-2 md:gap-3 shrink-0">
          <div className="relative w-7 h-7 md:w-8 md:h-8 shrink-0">
            <Image
              src="/logo.png"
              alt="AnasFlow Logo"
              fill
              className="object-contain drop-shadow-[0_0_8px_rgba(0,229,192,0.4)]"
              priority
            />
          </div>
          <span className="font-bold tracking-tight text-lg md:text-xl text-white">
            AnasFlow
          </span>
        </Link>
      </div>

      {/* Center: Search (Hidden on smaller mobile) */}
      <div className="flex-1 hidden md:flex justify-center px-6">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 transition-colors group-focus-within:text-white" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/10 rounded-lg py-1.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#00E5C0] focus:ring-1 focus:ring-[#00E5C0]/50 transition-all duration-300 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0 justify-end">
        <div className="hidden md:flex items-center gap-4">
          <ClientSwitcher />
          <div className="px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">
            Pro Plan
          </div>
        </div>

        <ThemeToggle />
        <NotificationDropdown />

        <div className="h-6 w-[1px] bg-white/10 hidden sm:block"></div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 md:gap-3 hover:bg-zinc-900 p-1 md:p-1.5 md:pr-2 rounded-lg transition-all group"
          >
            <Avatar className="w-7 h-7 md:w-8 md:h-8 border border-white/10 bg-black">
              <AvatarFallback className="text-xs bg-black text-white font-medium">
                {user?.full_name
                  ? user.full_name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)
                  : "AF"}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:block text-sm font-medium text-white whitespace-nowrap truncate max-w-[140px]">
              {user?.full_name || "Account"}
            </span>
            <ChevronDown
              className={
                "w-3 h-3 hidden sm:block transition-transform duration-200 " +
                (dropdownOpen ? "rotate-180 text-white" : "text-zinc-500")
              }
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-zinc-950 border border-white/10 rounded-xl shadow-2xl shadow-black/60 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-white/5 bg-zinc-900/50">
                <p className="text-sm font-bold text-white truncate">
                  {user?.full_name || "AnasFlow User"}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5 truncate">
                  {user?.email || ""}
                </p>
              </div>
              <div className="py-1">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <User className="w-4 h-4 text-zinc-500" />
                  My Profile
                </Link>
                <div className="md:hidden">
                  <Link
                    href="/dashboard/billing"
                    onClick={() => setDropdownOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <CreditCard className="w-4 h-4 text-zinc-500" />
                    Billing
                  </Link>
                </div>
              </div>
              <div className="border-t border-white/5 py-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  const linkClass = (url: string) => {
    const isActive =
      url === "/dashboard"
        ? pathname === "/dashboard"
        : pathname.startsWith(url);
    const base =
      "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-700 group relative overflow-hidden ";
    return (
      base +
      (isActive
        ? "bg-white/[0.05] text-[#00E5C0] font-black shadow-inner border border-[#00E5C0]/20 backdrop-blur-md"
        : "hover:bg-white/[0.02] hover:text-white border border-transparent hover:border-white/10")
    );
  };

  const iconClass = (url: string) => {
    const isActive =
      url === "/dashboard"
        ? pathname === "/dashboard"
        : pathname.startsWith(url);
    return (
      "w-5 h-5 transition-all duration-700 " +
      (isActive
        ? "text-[#00E5C0] group-hover:scale-110 drop-shadow-[0_0_12px_rgba(0,229,192,0.6)]"
        : "text-zinc-600 group-hover:text-zinc-300")
    );
  };

  const spanClass = (url: string) => {
    const isActive =
      url === "/dashboard"
        ? pathname === "/dashboard"
        : pathname.startsWith(url);
    return (
      "text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-500 " +
      (isActive ? "text-[#00E5C0]" : "text-zinc-400 group-hover:text-white")
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-gradient-to-b dark:from-[hsl(224,48%,6%)] dark:to-[hsl(224,44%,5%)] pt-10 text-slate-600 dark:text-zinc-400 overflow-hidden" style={{boxShadow: 'inset -1px 0 0 rgba(0,0,0,0.05)'}}>
      <div className="flex-1 px-4 space-y-2 overflow-y-auto sidebar-scroll pb-10">
        <div className="px-5 mb-8 flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700">
            Main Menu
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 hover:bg-white/5 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-zinc-600" />
            </button>
          )}
        </div>
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            onClick={onClose}
            className={linkClass(item.url)}
          >
            <div className="relative">
              <item.icon className={iconClass(item.url)} />
              {item.url === "/dashboard/alerts" && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
              )}
            </div>
            <span className={spanClass(item.url)}>{item.title}</span>
          </Link>
        ))}
      </div>

      <div className="p-6 border-t border-white/[0.06] pb-10 bg-[hsl(224,40%,5%)]/60 backdrop-blur-md">
        <Link
          href="/dashboard/platforms"
          onClick={onClose}
          className="w-full relative group/btn overflow-hidden bg-slate-900 dark:bg-white text-white dark:text-black py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-700 flex items-center justify-center gap-3 hover:bg-[#00E5C0] dark:hover:bg-[#00E5C0] hover:shadow-[0_0_30px_rgba(0,229,192,0.4)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
          <Plus className="w-4 h-4 transition-transform group-hover/btn:rotate-90 group-hover/btn:scale-125" />
          Connect Platform
        </Link>
      </div>
    </div>
  );
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ClientProvider>
      <div className="min-h-screen w-full text-slate-900 dark:text-white font-sans selection:bg-[#00E5C0]/20 selection:text-white overflow-x-hidden">
        <TopNav onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Desktop Sidebar */}
        <div className="hidden lg:flex w-[280px] fixed top-16 bottom-0 left-0 z-30 border-r border-white/5">
          <SidebarContent />
        </div>

        {/* Mobile Sidebar (Drawer) */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
              />
              {/* Drawer */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 bottom-0 left-0 w-[300px] z-[70] lg:hidden shadow-2xl"
              >
                <SidebarContent onClose={() => setIsSidebarOpen(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <main className="lg:ml-[280px] pt-16 min-h-screen relative">
          {/* Ambient glow layers - Subtle Indigo in Lite Mode */}
          <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-indigo-500/[0.04] dark:bg-indigo-600/[0.06] blur-[120px] rounded-full pointer-events-none" />
          <div className="fixed bottom-0 left-[280px] w-[500px] h-[500px] bg-[#00E5C0]/[0.03] dark:bg-[#00E5C0]/[0.04] blur-[120px] rounded-full pointer-events-none" />

          <div className="p-4 md:p-8 pb-32 max-w-[1500px] mx-auto relative z-10 w-full">
            {children}
          </div>
        </main>
      </div>
    </ClientProvider>
  );
};

export default DashboardLayout;
