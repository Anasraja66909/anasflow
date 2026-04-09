"use client";

import React from "react";
import { motion } from "framer-motion";

interface ShineTextProps {
  text: string;
  className?: string;
}

export const ShineText = ({ text, className = "" }: ShineTextProps) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
        animate={{
          x: [-200, 200],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
      {text}
    </motion.div>
  );
};

// Morphing text effect
interface MorphingTextProps {
  texts: string[];
  className?: string;
  duration?: number;
}

export const MorphingText = ({
  texts,
  className = "",
  duration = 3,
}: MorphingTextProps) => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, duration * 1000);
    return () => clearInterval(interval);
  }, [texts.length, duration]);

  return (
    <motion.span
      key={index}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {texts[index]}
    </motion.span>
  );
};
