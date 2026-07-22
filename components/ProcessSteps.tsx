"use client";

import React, { useRef, useState } from "react";
import { SectionWrapper } from "./ui/SectionWrapper";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, Compass, Users, LineChart } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Discover Skill Gaps",
    short: "Competency diagnostic checks",
    description:
      "We begin by administering targeted diagnostic assessments to pinpoint exact engineering, leadership, or analytics deficiencies across your organization.",
    details: [
      "Custom diagnostic metrics",
      "Role-based skill mapping",
      "Strategic gap analysis checks",
    ],
  },
  {
    icon: Compass,
    title: "Co-design Curriculum",
    short: "Formulate custom pathways",
    description:
      "Our curriculum engineers collaborate with your technical leads to blend university modules, case studies, and engineering stacks into a customized curriculum.",
    details: [
      "Pathways tailored to tech stack",
      "Case studies matching pipeline goals",
      "Milestone-based project planning",
    ],
  },
  {
    icon: Users,
    title: "Onboard & Mentor",
    short: "Cohort launch & coaching",
    description:
      "Teams join the upskilling cohort together. We assign dedicated 1-on-1 industry mentors to guide students through live labs and weekly checks.",
    details: [
      "Guided onboarding & kickoff",
      "1-on-1 weekly mentor check-ins",
      "Peer-collaborative code reviews",
    ],
  },
  {
    icon: LineChart,
    title: "Track ROI",
    short: "Validate outcomes & impact",
    description:
      "Measure performance against baseline targets. Receive organization dashboards showing technical capabilities growth and project deployment metrics.",
    details: [
      "Real-time capability metrics",
      "Technical mastery certificates",
      "ROI report & coordinator summary",
    ],
  },
];

export const ProcessSteps: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Scroll tracking to fill horizontal stepper line on desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map progress to line scaleX
  const fillScale = useTransform(scrollYProgress, [0.2, 0.75], [0, 1]);

  return (
    <SectionWrapper id="process" className="bg-transparent relative py-20">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-dark border border-text-dark/15 px-3 py-1 rounded-full bg-white shadow-sm">
            Our Method
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-dark mt-4 mb-5">
            How We Partner With You
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-body">
            From initial capability diagnostic checks to tracking organizational ROI, we guide your teams at every stage.
          </p>
        </div>

        {/* Desktop Stepper Layout (Hidden on Mobile) */}
        <div className="hidden lg:block relative mb-16">
          {/* Connector Line (Background Track) */}
          <div className="absolute top-1/2 left-[12%] right-[12%] h-[3px] bg-border-neutral -translate-y-1/2 z-0" />

          {/* Connector Line (Animated Fill - Near Black) */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute top-1/2 left-[12%] right-[12%] h-[3px] bg-text-dark origin-left -translate-y-1/2 z-0"
              style={{ scaleX: fillScale }}
            />
          )}

          {/* Stepper Nodes */}
          <div className="relative z-10 flex justify-between items-center max-w-5xl mx-auto">
            {STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              const isSelected = activeStep === idx;
              const isPassed = activeStep > idx;

              return (
                <button
                  key={step.title}
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center group focus-visible:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-text-dark rounded-full p-2"
                >
                  {/* Circle Indicator (White surface styling) */}
                  <motion.div
                    className={cn(
                      "w-14 h-14 rounded-full border flex items-center justify-center transition-colors duration-300 relative bg-white shadow-sm",
                      isSelected
                        ? "border-text-dark bg-text-dark text-white shadow-editorial"
                        : isPassed
                        ? "border-text-dark text-text-dark"
                        : "border-border-neutral text-text-secondary group-hover:border-text-dark/55"
                    )}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  >
                    <StepIcon className="w-5 h-5" />

                    {/* Active Step Glow backdrop */}
                    {isSelected && !prefersReducedMotion && (
                      <motion.div
                        layoutId="active-step-glow"
                        className="absolute inset-0 rounded-full bg-text-dark/5 blur-md -z-10"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>

                  {/* Label */}
                  <div className="text-center mt-4">
                    <p className={cn(
                      "text-xs sm:text-sm font-semibold transition-colors duration-300",
                      isSelected ? "text-text-dark font-bold" : "text-text-dark"
                    )}>
                      {step.title}
                    </p>
                    <p className="text-[9px] text-text-secondary mt-0.5 tracking-wide max-w-[140px] leading-tight uppercase font-bold">
                      {step.short}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Active Card Detail Panel (Accordion Shared Transition) */}
        <div className="hidden lg:block max-w-4xl mx-auto bg-white border border-border-neutral p-8 rounded-3xl shadow-editorial relative overflow-hidden min-h-[220px]">
          <div className="absolute right-0 top-0 w-32 h-32 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-12 gap-8"
            >
              <div className="col-span-7 space-y-4">
                <span className="text-[10px] font-bold text-accent-pink uppercase tracking-widest">
                  Step 0{activeStep + 1} &mdash; Details
                </span>
                <h3 className="text-2xl font-heading font-bold text-text-dark">
                  {STEPS[activeStep].title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed font-body">
                  {STEPS[activeStep].description}
                </p>
              </div>

              <div className="col-span-5 bg-bg-base rounded-2xl p-5 border border-border-neutral flex flex-col justify-center">
                <p className="text-[9px] uppercase tracking-widest text-text-secondary font-bold mb-3">Key Milestones</p>
                <ul className="space-y-2.5 text-xs text-text-secondary font-body">
                  {STEPS[activeStep].details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-text-dark">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mr-2.5" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Accordion Stepper Layout (Hidden on Desktop) */}
        <div className="lg:hidden space-y-4">
          {STEPS.map((step, idx) => {
            const StepIcon = step.icon;
            const isOpen = activeStep === idx;

            return (
              <div
                key={step.title}
                className={cn(
                  "border rounded-2xl transition-colors duration-300 bg-white shadow-sm",
                  isOpen ? "border-text-dark" : "border-border-neutral"
                )}
              >
                <button
                  onClick={() => setActiveStep(idx)}
                  className="w-full flex items-center justify-between p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-dark rounded-2xl"
                >
                  <div className="flex items-center space-x-3 text-left">
                    <div className={cn(
                      "w-10 h-10 rounded-full border flex items-center justify-center transition-colors",
                      isOpen ? "border-text-dark bg-text-dark text-white" : "border-border-neutral text-text-secondary bg-bg-base"
                    )}>
                      <StepIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-text-dark">{step.title}</p>
                      <p className="text-[9px] text-text-secondary uppercase font-bold mt-0.5">{step.short}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-text-secondary">0{idx + 1}</span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={prefersReducedMotion ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={prefersReducedMotion ? { height: 0, opacity: 1 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-5 pt-1 border-t border-border-neutral space-y-4">
                        <p className="text-xs text-text-secondary leading-relaxed font-body mt-2">
                          {step.description}
                        </p>
                        <div className="p-3 bg-bg-base rounded-xl border border-border-neutral">
                          <p className="text-[9px] uppercase font-bold text-accent-pink tracking-wider mb-2">Key Outcomes</p>
                          <ul className="space-y-1.5 text-xs text-text-secondary font-body">
                            {step.details.map((detail, idx) => (
                              <li key={idx} className="flex items-center text-text-dark">
                                <span className="w-1 h-1 rounded-full bg-accent-blue mr-2" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </SectionWrapper>
  );
};
