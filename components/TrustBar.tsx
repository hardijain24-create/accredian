"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const PARTNERS = [
  { name: "Global Finance Inst", category: "Finance", border: "hover:border-accent-purple/50" },
  { name: "Nexus Tech Corp", category: "Technology", border: "hover:border-accent-pink/50" },
  { name: "Veritas Health Group", category: "Healthcare", border: "hover:border-accent-blue/50" },
  { name: "Stellar Consulting", category: "Business", border: "hover:border-accent-yellow/50" },
  { name: "Apex Retailers LLC", category: "E-Commerce", border: "hover:border-accent-pink/50" },
  { name: "Zenith Automotive", category: "Logistics", border: "hover:border-accent-purple/50" },
];

export const TrustBar: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const duplicatedPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section className="bg-white border-y border-border-neutral py-10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-text-secondary">
          Trusted by Industry Leaders Worldwide
        </p>
      </div>

      <div className="relative w-full flex items-center overflow-hidden">
        {/* Soft edge masking gradients */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bg-base to-transparent z-10 hidden sm:block" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg-base to-transparent z-10 hidden sm:block" />

        {prefersReducedMotion ? (
          <div className="flex flex-wrap items-center justify-center gap-6 px-4">
            {PARTNERS.map((partner, idx) => (
              <div
                key={`${partner.name}-${idx}`}
                className="flex flex-col items-center justify-center bg-white border border-border-neutral px-5 py-2.5 rounded-xl min-w-[150px] shadow-sm"
              >
                <span className="text-sm font-semibold text-text-dark">{partner.name}</span>
                <span className="text-[9px] text-text-secondary uppercase tracking-widest font-bold mt-0.5">
                  {partner.category}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex gap-6 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
            style={{ width: "max-content" }}
            whileHover={{ animationPlayState: "paused" } as any}
          >
            {duplicatedPartners.map((partner, idx) => (
              <div
                key={`${partner.name}-${idx}`}
                className={`inline-flex flex-col justify-center bg-white border border-border-neutral ${partner.border} hover:shadow-editorial hover:bg-bg-base px-6 py-3.5 rounded-2xl min-w-[180px] shadow-sm select-none cursor-default transition-all duration-300 transform hover:-translate-y-0.5`}
              >
                <span className="text-sm sm:text-base font-semibold text-text-dark font-heading">
                  {partner.name}
                </span>
                <span className="text-[9px] text-text-secondary uppercase tracking-widest font-bold mt-1">
                  {partner.category}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
