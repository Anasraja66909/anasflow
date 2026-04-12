"use client";

import { useState, useEffect } from "react";
import { INITIAL_DATA, INITIAL_KPIS } from "@/constants/dashboard";

export function useDashboardData(activeClientId: string | null) {
  const [data, setData] = useState<any>(null);
  const [kpis, setKpis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, [activeClientId]);

  async function fetchAllData() {
    setLoading(true);
    // Check demo mode
    const isDemoMode = typeof window !== "undefined" && localStorage.getItem("demo_mode") === "true";
    if (isDemoMode) {
      setData(INITIAL_DATA);
      setKpis(INITIAL_KPIS);
      setLoading(false);
      return;
    }
    await Promise.all([fetchDashboardData(), fetchKpis()]);
    setLoading(false);
  }

  async function fetchKpis() {
    try {
      const storedToken = localStorage.getItem("token");
      const res = await fetch(
        (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") + "/api/v1/dashboard/kpis",
        { headers: storedToken ? { Authorization: "Bearer " + storedToken } : {} }
      );
      if (res.ok) {
        const result = await res.json();
        setKpis(result);
      } else {
        setKpis(INITIAL_KPIS);
      }
    } catch (e) {
      setKpis(INITIAL_KPIS);
    }
  }

  async function fetchDashboardData() {
    try {
      const storedToken = localStorage.getItem("token");
      let url = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") + "/api/v1/dashboard/summary";
      if (activeClientId) url += `?client_id=${activeClientId}`;
      const res = await fetch(url, {
        headers: storedToken ? { Authorization: "Bearer " + storedToken } : {},
      });
      if (res.ok) {
        const result = await res.json();
        setData(result);
      } else {
        setData(INITIAL_DATA);
      }
    } catch (e) {
      setData(INITIAL_DATA);
    }
  }

  return { data, kpis, loading, refresh: fetchAllData };
}
