"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();

    const baseCardClass = cn(
      "bg-white border border-border-neutral rounded-3xl p-6 relative overflow-hidden shadow-editorial transition-all duration-300 card-sheen",
      className
    );

    const motionProps = prefersReducedMotion
      ? {}
      : {
          whileHover: {
            y: -4,
            boxShadow: "0 16px 36px -4px rgba(20, 22, 26, 0.08), 0 4px 12px -2px rgba(20, 22, 26, 0.04)",
            borderColor: "rgba(20, 22, 26, 0.08)",
          },
        };

    return (
      <motion.div
        ref={ref}
        className={baseCardClass}
        {...motionProps}
        {...(props as any)}
      >
        {/* Inner Card Content */}
        <div className="relative z-10 h-full w-full">{children}</div>
      </motion.div>
    );
  }
);

Card.displayName = "Card";
