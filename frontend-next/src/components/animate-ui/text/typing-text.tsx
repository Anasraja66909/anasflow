"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export const TypingText = ({
  text,
  speed = 50,
  delay = 0,
  className = "",
}: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        setIndex(index + 1);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [index, text, speed]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className={className}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1 inline-block w-1 h-7 bg-current"
      />
    </motion.span>
  );
};
