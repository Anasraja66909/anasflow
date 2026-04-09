"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ClientDetail() {
  const params = useParams();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <Link href="/dashboard/clients">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Client Overview</h1>
      </div>
      <div className="p-6 bg-card border rounded-xl shadow-card">
        <p className="text-muted-foreground mb-4">
          Client ID: <span className="font-mono text-xs">{params.id}</span>
        </p>
        <p>
          This view will show specific GoHighLevel, HubSpot, and ManyChat stats
          for this client.
        </p>
      </div>
    </motion.div>
  );
}
