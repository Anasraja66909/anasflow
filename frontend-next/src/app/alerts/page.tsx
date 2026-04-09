"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AlertsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/optimizations");
  }, [router]);

  return null;
}
