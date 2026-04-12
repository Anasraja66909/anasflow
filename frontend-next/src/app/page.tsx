"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/landing/layout/Navbar";
import Hero from "@/components/landing/hero/Hero";
import IntegrationMarquee from "@/components/landing/platforms/IntegrationMarquee";

// Lazy-load sections below the fold for instant initial render
const Problems = dynamic(
  () => import("@/components/landing/features/Problems"),
  { ssr: true },
);
const Solution = dynamic(
  () => import("@/components/landing/features/Solution"),
  { ssr: true },
);
const Features = dynamic(
  () => import("@/components/landing/features/Features"),
  { ssr: true },
);
const AIOptimizationHighlight = dynamic(
  () => import("@/components/landing/features/AIOptimizationHighlight"),
  { ssr: true },
);
const SupportedPlatforms = dynamic(
  () => import("@/components/landing/platforms/SupportedPlatforms"),
  { ssr: true },
);
const HowItWorks = dynamic(
  () => import("@/components/landing/how-it-works/HowItWorks"),
  { ssr: true },
);
const Pricing = dynamic(() => import("@/components/landing/pricing/Pricing"), {
  ssr: true,
});
const Testimonials = dynamic(
  () => import("@/components/landing/testimonials/Testimonials"),
  { ssr: true },
);
const FAQ = dynamic(() => import("@/components/landing/faq/FAQ"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/landing/layout/Footer"), {
  ssr: true,
});

export default function LandingPage() {
  return (
    <div
      className="min-h-screen selection:bg-indigo-200 selection:text-indigo-900"
      style={{
        background:
          "linear-gradient(160deg, #eef2ff 0%, #fafbff 35%, #f0fdf9 100%)",
      }}
    >
      {/* Synchronous High-Priority Elements */}
      <Navbar />
      <Hero />
      <IntegrationMarquee />

      {/* Lazy-Loaded High-Value Experience Sections */}
      <Problems />
      <Solution />
      <Features />
      <AIOptimizationHighlight />
      <SupportedPlatforms />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
