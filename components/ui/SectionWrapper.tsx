"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  id?: string;
  delay?: number;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  className,
  delay = 0,
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();

  const animationProps = prefersReducedMotion
    ? {
        initial: { opacity: 1 },
      }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: {
          duration: 0.5,
          delay,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // easeOutExpo
        },
      };

  return (
    <motion.section
      id={id}
      className={cn("relative py-16 md:py-24 overflow-hidden", className)}
      {...animationProps}
      {...(props as any)}
    >
      {children}
    </motion.section>
  );
};
