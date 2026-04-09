"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

export const RippleButton = ({
  children,
  onClick,
  className = "",
  variant = "primary",
}: RippleButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<
    Array<{ id: string; x: number; y: number }>
  >([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const id = `${Date.now()}-${Math.random()}`;
    setRipples([...ripples, { id, x, y }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    onClick?.();
  };

  const baseClasses =
    "relative overflow-hidden px-6 py-3 font-semibold rounded-lg transition-colors";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white rounded-full"
          initial={{
            x: ripple.x,
            y: ripple.y,
            scale: 0.95,
            opacity: 0,
          }}
          animate={{
            scale: 4,
            opacity: [0, 0.4, 0],
          }}
          transition={{ duration: 0.3 }}
          style={{
            pointerEvents: "none",
            width: 10,
            height: 10,
            marginLeft: -5,
            marginTop: -5,
          }}
        />
      ))}
      {children}
    </motion.button>
  );
};
