"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverScale?: number;
}

export const AnimatedCard = ({
  children,
  className = "",
  delay = 0,
  hoverScale = 1.05,
}: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: hoverScale }}
      transition={{ duration: 0.25, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      <Card className="h-full">{children}</Card>
    </motion.div>
  );
};

// Animated card with glow effect
export const GlowCard = ({
  children,
  className = "",
  delay = 0,
}: Omit<AnimatedCardProps, "hoverScale">) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-lg opacity-75 group-hover:opacity-100 transition-opacity -z-10 rounded-lg" />
      <Card className="h-full bg-gray-900 border-gray-800 relative">
        {children}
      </Card>
    </motion.div>
  );
};
