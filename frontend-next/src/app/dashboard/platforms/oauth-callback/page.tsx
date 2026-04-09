"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function OAuthCallbackPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isSimulation = params.get("simulation") === "true";
    const platform = params.get("platform");
    const clientId = params.get("client_id");

    if (isSimulation && platform) {
      // Small delay to show the "Completing connection..." screen
      setTimeout(async () => {
        try {
          const token = localStorage.getItem("token");
          await fetch("http://localhost:8000/platforms/simulate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              platform_type: platform,
              client_id: clientId,
            }),
          });
          window.location.href = `/dashboard/connect?status=success&platform=${platform}&simulation=true`;
        } catch (err) {
          window.location.href = "/dashboard/connect?status=error";
        }
      }, 1500);
    } else {
      setTimeout(() => {
        window.location.href = "/dashboard/connect" + window.location.search;
      }, 1000);
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
        <p className="text-white/60">Completing connection...</p>
      </div>
    </div>
  );
}
