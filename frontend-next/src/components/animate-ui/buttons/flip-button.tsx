"use client";

import React from "react";
import { motion } from "framer-motion";

interface FlipButtonProps {
  front: string;
  back: string;
  onClick?: () => void;
  className?: string;
}

export const FlipButton = ({
  front,
  back,
  onClick,
  className = "",
}: FlipButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`h-12 px-8 cursor-pointer bg-blue-600 text-white font-semibold rounded-lg ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {front}
    </motion.button>
  );
};
