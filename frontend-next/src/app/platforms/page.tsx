"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PlatformsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/platforms");
  }, [router]);

  return null;
}
