"use client";

import React from "react";
import Navbar from "@/components/landing/layout/Navbar";
import Footer from "@/components/landing/layout/Footer";
import HelpCenterContent from "@/components/help/HelpCenterContent";

export default function PublicHelpPage() {
  return (
    <div className="min-h-screen bg-black selection:bg-[#00E5C0]/30 selection:text-white">
      <Navbar />

      {/* Spacer for Fixed Navbar if needed, but Hero usually handles it. 
          The HelpCenterContent has its own padding/max-w. */}
      <div className="pt-32 pb-20">
        <HelpCenterContent />
      </div>

      <Footer />
    </div>
  );
}
