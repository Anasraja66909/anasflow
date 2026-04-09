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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { ClientProvider, useClient } from "@/contexts/ClientContext";
import NotificationDropdown from "@/components/dashboard/notifications/NotificationDropdown";

const navItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Connect Platforms", url: "/dashboard/connect", icon: Layers },
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

function TopNav() {
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
    <div className="h-16 border-b border-white/10 bg-black/80 backdrop-blur-md fixed top-0 w-full z-50 flex items-center justify-between px-6 text-white shadow-sm">
      {/* Left: Brand */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="relative w-8 h-8 shrink-0">
          <Image
            src="/logo.png"
            alt="AnasFlow Logo"
            fill
            className="object-contain drop-shadow-[0_0_8px_rgba(0,229,192,0.4)]"
            priority
          />
        </div>
        <span className="font-bold tracking-tight text-xl text-white">
          AnasFlow
        </span>
      </div>

      {/* Center: Search */}
      <div className="flex-1 flex justify-center px-6">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 transition-colors group-focus-within:text-white" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full bg-black hover:bg-zinc-900 border border-white/10 rounded-lg py-1.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#00E5C0] focus:ring-1 focus:ring-[#00E5C0]/50 transition-all duration-300 placeholder:text-zinc-600"
          />
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-4 shrink-0 justify-end">
        <div className="hidden md:flex items-center gap-4">
          <ClientSwitcher />

          <div className="px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">
            Pro Plan
          </div>
        </div>

        <NotificationDropdown />

        <Link
          href="/dashboard/help"
          className="text-zinc-400 hover:text-white p-1.5 rounded-md hover:bg-zinc-900 transition-colors"
          title="Help Center"
        >
          <HelpCircle className="w-5 h-5" />
        </Link>

        <div className="h-6 w-[1px] bg-white/10 hidden sm:block"></div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 hover:bg-zinc-900 p-1.5 pr-2 rounded-lg transition-all group"
          >
            <Avatar className="w-8 h-8 border border-white/10 bg-black">
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
              {user?.full_name || "My Account"}
            </span>
            <ChevronDown
              className={
                "w-4 h-4 hidden sm:block transition-transform duration-200 " +
                (dropdownOpen ? "rotate-180 text-white" : "text-zinc-500")
              }
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-zinc-950 border border-white/10 rounded-xl shadow-2xl shadow-black/60 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-white/5">
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
                <Link
                  href="/dashboard/billing"
                  onClick={() => setDropdownOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <CreditCard className="w-4 h-4 text-zinc-500" />
                  Billing &amp; Plan
                </Link>
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

function AppSidebar() {
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
    <div className="w-[280px] border-r border-white/5 bg-zinc-950/60 backdrop-blur-3xl fixed top-16 bottom-0 left-0 flex flex-col pt-10 hidden lg:flex text-zinc-400 z-40 overflow-hidden shadow-2xl">
      <div className="flex-1 px-4 space-y-2 overflow-y-auto sidebar-scroll pb-10">
        <div className="px-5 mb-8">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700">
            Navigation Matrix
          </span>
        </div>
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.url}
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

      <div className="p-6 border-t border-white/5 pb-10 bg-black/20 backdrop-blur-md">
        <Link
          href="/dashboard/connect"
          className="w-full relative group/btn overflow-hidden bg-white text-black py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-700 flex items-center justify-center gap-3 hover:bg-[#00E5C0] hover:shadow-[0_0_30px_rgba(0,229,192,0.4)]"
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
  return (
    <ClientProvider>
      <div className="min-h-screen w-full bg-black text-white font-sans selection:bg-[#00E5C0]/20 selection:text-white">
        <TopNav />
        <AppSidebar />
        <main className="lg:ml-[280px] pt-16 min-h-screen bg-black relative">
          {/* Subtle Global Background Glow */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#00E5C0]/[0.01] pointer-events-none blur-[140px] rounded-full" />

          <div className="p-4 md:p-8 pb-32 max-w-[1500px] mx-auto relative z-10">
            {children}
          </div>
        </main>
      </div>
    </ClientProvider>
  );
};

export default DashboardLayout;
