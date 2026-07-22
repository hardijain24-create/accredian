"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  showSheen?: "hover" | "idle" | "none";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, showSheen = "hover", ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

    const handleRippleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Execute original onClick if present
      if (props.onClick) {
        props.onClick(e);
      }

      if (prefersReducedMotion) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();

      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 480);
    };

    const baseClass =
      "relative overflow-hidden inline-flex items-center justify-center font-semibold rounded-full select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-dark focus-visible:ring-offset-2 transition-all duration-300 min-h-[44px] px-6 py-2.5 text-sm md:text-base";

    const variantClasses = {
      primary: "bg-text-dark text-white border border-transparent",
      secondary:
        "border border-text-secondary/35 bg-white/60 text-text-dark hover:bg-bg-base",
    };

    return (
      <div className="relative inline-block group">
        {/* Cloned Specular Reflection Sibling (Dynamic background/colors, flipped vertically) */}
        {!prefersReducedMotion && (
          <div
            className={cn(
              baseClass,
              variantClasses[variant],
              "absolute left-0 right-0 top-[105%] pointer-events-none select-none filter blur-[0.5px] scale-y-[-1] origin-top border-none shadow-none opacity-20"
            )}
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 60%)",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 60%)"
            }}
          >
            <span className="relative z-10 flex items-center justify-center">{children}</span>
          </div>
        )}

        {/* The Action Button (Clips glows and ripples inside) */}
        <motion.button
          ref={ref}
          {...(props as any)}
          onClick={handleRippleClick}
          className={cn(
            baseClass,
            variantClasses[variant],
            showSheen === "hover" && "animate-sheen-hover",
            showSheen === "idle" && "animate-sheen-idle",
            className
          )}
          whileHover={prefersReducedMotion ? {} : {
            scale: 1.04,
            y: -2,
            boxShadow: "0 10px 25px -5px rgba(20, 22, 26, 0.15), 0 8px 16px -4px rgba(20, 22, 26, 0.08)"
          }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.98, y: 0 }}
        >
          <span className="relative z-10 flex items-center justify-center">{children}</span>

          {/* Interactive Click Ripple */}
          <AnimatePresence>
            {ripples.map((ripple) => (
              <motion.span
                key={ripple.id}
                initial={{ scale: 0, opacity: 0.45 }}
                animate={{ scale: 7, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute rounded-full bg-white/30 pointer-events-none w-10 h-10 -ml-5 -mt-5"
                style={{ left: ripple.x, top: ripple.y }}
              />
            ))}
          </AnimatePresence>
        </motion.button>
      </div>
    );
  }
);

Button.displayName = "Button";
