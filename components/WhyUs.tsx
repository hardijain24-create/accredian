"use client";

import React, { useState, useEffect, useRef } from "react";
import { SectionWrapper } from "./ui/SectionWrapper";
import { motion, useInView, animate, useReducedMotion } from "framer-motion";
import { ShieldCheck, Laptop, Building2, UserCheck } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ value, suffix = "", duration = 1.4 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate(latest) {
        setCount(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [inView, value, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

export const WhyUs: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper id="why-us" className="bg-bg-base border-y border-border-neutral relative py-20">
      
      {/* Scoped Section Background Blur Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[40%] right-[10%] w-[420px] h-[420px] rounded-full bg-[#F9A8D4] blur-[110px] opacity-15" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-dark border border-text-dark/15 px-3 py-1 rounded-full bg-white shadow-sm">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-dark mt-4 mb-5">
            Empowering Teams with Strategic Upskilling
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-body">
            We bridge the gap between academic theory and practical corporate capabilities. Read our core differentiators below.
          </p>
        </div>

        {/* Row 1: Academic Partnerships */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="p-3 bg-accent-blue/10 text-accent-blue border border-accent-blue/15 rounded-2xl w-fit shadow-sm">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-text-dark">
              Elite Academic Collaborations
            </h3>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-body">
              Through strategic alignments with top-ranked universities and global business schools, we bring Ivy League-level curriculum modules straight to your workforce.
            </p>
            <ul className="space-y-3 font-body text-xs sm:text-sm text-text-secondary">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-pink mr-2.5" />
                University-approved learning pathways
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-pink mr-2.5" />
                Joint credentials issued directly by partner institutions
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-pink mr-2.5" />
                Access to alumni networks upon completion
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 flex justify-center"
          >
            {/* White card layout visual details */}
            <div className="relative w-full max-w-[450px] aspect-[4/3] bg-white border border-border-neutral rounded-3xl p-6 flex flex-col justify-between shadow-editorial overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-accent-blue/5 rounded-full blur-2xl" />
              <div className="flex items-start justify-between">
                <span className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Academic Network</span>
                <motion.span
                  animate={prefersReducedMotion ? {} : { opacity: [0.85, 1, 0.85], scale: [1, 1.03, 1] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="text-xs font-bold text-accent-purple border border-accent-purple/20 rounded-md px-1.5 py-0.5 bg-accent-purple/5"
                >
                  50+ Universities
                </motion.span>
              </div>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="p-4 bg-bg-base rounded-2xl border border-border-neutral">
                  <p className="text-[9px] uppercase tracking-wider text-text-secondary font-bold">Global Rank Avg</p>
                  <p className="text-lg font-bold text-text-dark mt-1">Top 100</p>
                </div>
                <div className="p-4 bg-bg-base rounded-2xl border border-border-neutral">
                  <p className="text-[9px] uppercase tracking-wider text-text-secondary font-bold">Credentials</p>
                  <p className="text-lg font-bold text-text-dark mt-1">Joint Certified</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Row 2: Mentors & completion rates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 lg:order-2 space-y-6"
          >
            <div className="p-3 bg-accent-purple/10 text-accent-purple border border-accent-purple/15 rounded-2xl w-fit shadow-sm">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-text-dark">
              Mentored by Field Leaders
            </h3>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-body">
              Courses are supplemented by 1-on-1 checks with practitioners currently driving product decisions inside top Fortune-500 operations.
            </p>
            <ul className="space-y-3 font-body text-xs sm:text-sm text-text-secondary">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-purple mr-2.5" />
                Industry mentorship with live weekly code-reviews
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-purple mr-2.5" />
                Personalized capability tracking dashboards
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-purple mr-2.5" />
                Real-world project designs solving core pipeline gaps
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 lg:order-1 flex justify-center"
          >
            <div className="w-full max-w-[450px] grid grid-cols-2 gap-4">
              {/* Stat Card 1 */}
              <div className="bg-white border border-border-neutral p-6 rounded-3xl flex flex-col justify-between aspect-square shadow-editorial hover:-translate-y-0.5 transition-all duration-300">
                <div className="p-2.5 bg-accent-purple/10 text-accent-purple rounded-xl w-fit shadow-sm">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-heading font-bold text-text-dark">
                    <AnimatedCounter value={500} suffix="+" />
                  </p>
                  <p className="text-[10px] sm:text-xs text-text-secondary mt-1.5 font-bold uppercase tracking-wider">Expert Mentors</p>
                </div>
              </div>

              {/* Stat Card 2 */}
              <div className="bg-white border border-border-neutral p-6 rounded-3xl flex flex-col justify-between aspect-square shadow-editorial hover:-translate-y-0.5 transition-all duration-300">
                <div className="p-2.5 bg-accent-blue/10 text-accent-blue rounded-xl w-fit shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-heading font-bold text-text-dark">
                    <AnimatedCounter value={94} suffix="%" />
                  </p>
                  <p className="text-[10px] sm:text-xs text-text-secondary mt-1.5 font-bold uppercase tracking-wider font-sans">Completion Rate</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </SectionWrapper>
  );
};
