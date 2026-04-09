"use client";

import React from "react";
import { motion } from "framer-motion";

interface GradientTextProps {
  text: string;
  from?: string;
  to?: string;
  className?: string;
  animate?: boolean;
}

export const GradientText = ({
  text,
  from = "#3b82f6",
  to = "#8b5cf6",
  className = "",
  animate = true,
}: GradientTextProps) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(135deg, ${from}, ${to})`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <motion.span
      style={gradientStyle}
      className={className}
      animate={
        animate
          ? {
              backgroundImage: [
                `linear-gradient(135deg, ${from}, ${to})`,
                `linear-gradient(225deg, ${from}, ${to})`,
                `linear-gradient(135deg, ${from}, ${to})`,
              ],
            }
          : undefined
      }
      transition={animate ? { duration: 4, repeat: Infinity } : undefined}
    >
      {text}
    </motion.span>
  );
};
