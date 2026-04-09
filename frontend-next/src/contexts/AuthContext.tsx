"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

interface User {
  id: string;
  email: string;
  full_name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    full_name: string,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Initialize from localStorage only on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
      setMounted(true);
    }
  }, []);

  const verifyToken = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const userData = await api.getMe();
      setUser(userData);
    } catch {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (mounted && token !== null) {
      verifyToken();
    } else if (mounted && !token) {
      setLoading(false);
    }
  }, [mounted, token, verifyToken]);

  const login = async (email: string, password: string) => {
    const res = await api.login({ email, password });
    if (typeof window !== "undefined") {
      localStorage.setItem("token", res.access_token);
    }
    setToken(res.access_token);
    setUser(res.user);
  };

  const loginWithGoogle = async (credential: string) => {
    const res = await api.loginWithGoogle(credential);
    if (typeof window !== "undefined") {
      localStorage.setItem("token", res.access_token);
    }
    setToken(res.access_token);
    setUser(res.user);
  };

  const register = async (
    email: string,
    password: string,
    full_name: string,
  ) => {
    const res = await api.register({ email, password, full_name });
    if (typeof window !== "undefined") {
      localStorage.setItem("token", res.access_token);
    }
    setToken(res.access_token);
    setUser(res.user);
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, loginWithGoogle, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
