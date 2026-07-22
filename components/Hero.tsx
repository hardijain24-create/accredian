"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "./ui/Button";
import { ArrowRight, Shield, TrendingUp, Users, ZoomIn } from "lucide-react";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll link logic for mockup interactive zoom/pan
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const mockupScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.08]);
  const mockupRotate = useTransform(scrollYProgress, [0, 0.8], [0, -1]);

  // Motion variants for staggered text entry
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  // Scroll to helper
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offset,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-40 lg:pt-48 pb-20 overflow-hidden bg-bg-base"
    >
      {/* Scroll Progress Bar at the top */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-text-dark z-50 origin-left" />

      {/* Scoped Background Blur Blobs (Hero only) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Blob 1: Pale Purple */}
        <div className="absolute top-[10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-[#C4B5FD] blur-[100px] opacity-25" />
        {/* Blob 2: Pink */}
        <div className="absolute top-[30%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#F9A8D4] blur-[100px] opacity-25" />
        {/* Blob 3: Blue */}
        <div className="absolute bottom-[5%] left-[25%] w-[420px] h-[420px] rounded-full bg-[#BFDBFE] blur-[100px] opacity-25" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Subtext, Buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textContainerVariants}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            <motion.div variants={textItemVariants} className="inline-flex items-center self-start mb-6">
              <motion.span
                animate={prefersReducedMotion ? {} : { opacity: [0.85, 1, 0.85], scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold text-text-dark border border-text-dark/15 uppercase tracking-widest bg-white shadow-sm"
              >
                <Shield className="w-3 h-3 mr-1.5 text-accent-purple" /> Enterprise upskilling
              </motion.span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={textItemVariants} className="mb-6">
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-heading font-bold text-text-dark leading-[1.1] tracking-tight">
                Upskill Your <br />
                <span className="text-accent-purple">Workforce</span> at Scale
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p
              variants={textItemVariants}
              className="text-lg sm:text-xl text-text-secondary max-w-xl mb-10 leading-relaxed font-body"
            >
              Partner with top global institutions to build future-ready teams. 
              Deliver custom learning pathways, live executive mentoring, and measurable business ROI.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={textItemVariants}
              className="flex flex-wrap gap-4 items-center"
            >
              <Button variant="primary" onClick={() => scrollTo("features")}>
                Explore Programs <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button variant="secondary" onClick={() => scrollTo("contact")}>
                Talk to Us
              </Button>
            </motion.div>

            {/* Sub Stats Row */}
            <motion.div
              variants={textItemVariants}
              className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-border-neutral max-w-lg"
            >
              <div>
                <p className="text-xl sm:text-2xl font-heading font-bold text-text-dark">50+</p>
                <p className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-widest font-bold">Partners</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-heading font-bold text-text-dark">15K+</p>
                <p className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-widest font-bold">Graduates</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-heading font-bold text-text-dark">94%</p>
                <p className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-widest font-bold">Success ROI</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Scroll-Zoom Mockup Card */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="lg:col-span-5 relative flex items-center justify-center min-h-[420px]"
          >
            {/* Background Grid Accent */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(20,22,26,0.06)_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-75 -z-10" />

            {/* Scroll-Linked Product Mockup Container */}
            <motion.div
              ref={mockupRef}
              style={{
                scale: prefersReducedMotion ? 1 : mockupScale,
                rotateZ: prefersReducedMotion ? 0 : mockupRotate,
              }}
              className="w-full max-w-[370px] bg-white border border-border-neutral rounded-3xl p-6 shadow-editorial relative group overflow-hidden"
            >
              {/* Centered Scroll indicator Visual Cue */}
              <div className="absolute inset-0 bg-text-dark/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-35 pointer-events-none">
                <div className="bg-text-dark text-white rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-md">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Scroll to Zoom</span>
                </div>
              </div>

              {/* Panel Top bar */}
              <div className="flex items-center justify-between border-b border-border-neutral pb-4 mb-4">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EC4899]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                </div>
                <span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">ENTERPRISE PANEL</span>
              </div>

              {/* Panel content mockups */}
              <div className="space-y-4">
                <div className="p-3.5 bg-bg-base rounded-2xl border border-border-neutral flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-accent-blue/10 text-accent-blue">
                      <Users className="w-4 h-4 text-accent-blue" />
                    </div>
                    <div>
                      <p className="text-[10px] text-text-secondary uppercase tracking-wider font-bold">Active Cohort</p>
                      <p className="text-xs sm:text-sm font-semibold text-text-dark">AI Engineering</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-accent-purple border border-accent-purple/20 rounded-md px-1.5 py-0.5 bg-accent-purple/5">+280 Users</span>
                </div>

                <div className="p-3.5 bg-bg-base rounded-2xl border border-border-neutral flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-accent-pink/10 text-accent-pink">
                      <TrendingUp className="w-4 h-4 text-accent-pink" />
                    </div>
                    <div>
                      <p className="text-[10px] text-text-secondary uppercase tracking-wider font-bold">UPSKILLING ROI</p>
                      <p className="text-xs sm:text-sm font-semibold text-text-dark">Speed-to-delivery</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-accent-pink border border-accent-pink/20 rounded-md px-1.5 py-0.5 bg-accent-pink/5">+32% Growth</span>
                </div>

                {/* Training progress indicator */}
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] text-text-secondary uppercase tracking-wider font-bold">Progress index</span>
                    <span className="text-xs font-semibold text-text-dark">82%</span>
                  </div>
                  <div className="h-2 w-full bg-bg-base rounded-full overflow-hidden border border-border-neutral">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "82%" }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
                      className="h-full bg-text-dark rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Overlapping Mockup Card 1 */}
            <motion.div
              className="absolute -top-6 right-2 bg-white rounded-2xl border border-border-neutral p-3.5 shadow-editorial z-20 flex items-center space-x-3"
            >
              <div className="p-1.5 rounded-full bg-accent-yellow/20">
                <Shield className="w-3.5 h-3.5 text-accent-yellow" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-text-secondary font-bold">SOC-2 SECURITY</p>
                <p className="text-xs font-bold text-text-dark">Certified</p>
              </div>
            </motion.div>

            {/* Overlapping Mockup Card 2 */}
            <motion.div
              className="absolute -bottom-4 left-2 bg-white rounded-2xl border border-border-neutral p-4 shadow-editorial z-20 flex items-center space-x-3.5"
            >
              <div className="p-2 rounded-xl bg-accent-blue/15 flex items-center justify-center">
                <ZoomIn className="w-3.5 h-3.5 text-accent-blue" />
              </div>
              <div>
                <p className="text-[9px] text-text-secondary uppercase tracking-wider font-bold">Live Labs</p>
                <p className="text-xs font-bold text-text-dark">Weekly Mentoring</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
