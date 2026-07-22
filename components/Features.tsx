"use client";

import React from "react";
import { SectionWrapper } from "./ui/SectionWrapper";
import { Card } from "./ui/Card";
import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Award,
  Users,
  Compass,
  FileBadge,
  SlidersHorizontal,
} from "lucide-react";

const FEATURES_DATA = [
  {
    id: "feat-analytics",
    icon: BarChart3,
    title: "Live Analytics Dashboard",
    description:
      "Monitor workforce performance metrics in real time. Track skill gaps, program completion, and organizational capabilities instantly.",
    spanClass: "col-span-1 md:col-span-2 lg:col-span-2", // 2x1 bento card
    iconColor: "text-accent-blue",
    iconBg: "bg-accent-blue/10",
  },
  {
    id: "feat-mentor",
    icon: Compass,
    title: "Capstone Mentorship",
    description:
      "Learners pair with industry-veteran mentors. Guide real-world capstone challenges tailored to your local tech stack.",
    spanClass: "col-span-1", // 1x1 card
    iconColor: "text-accent-purple",
    iconBg: "bg-accent-purple/10",
  },
  {
    id: "feat-cohort",
    icon: Users,
    title: "Cohort-Based Learning",
    description:
      "Build cross-functional alignment. Collaborative group projects, peer discussions, and live check-ins foster engagement.",
    spanClass: "col-span-1", // 1x1 card
    iconColor: "text-accent-pink",
    iconBg: "bg-accent-pink/10",
  },
  {
    id: "feat-curriculum",
    icon: SlidersHorizontal,
    title: "Custom Curriculums",
    description:
      "We design learning pathways tailored to your technical stack and strategic product goals. Learn exactly what your roadmap requires.",
    spanClass: "col-span-1 md:col-span-2 lg:col-span-2", // 2x1 bento card
    iconColor: "text-accent-yellow",
    iconBg: "bg-accent-yellow/10",
  },
  {
    id: "feat-cert",
    icon: FileBadge,
    title: "Joint Certifications",
    description:
      "Provide globally recognized credentials issued in partnership with top academic institutions.",
    spanClass: "col-span-1", // 1x1 card
    iconColor: "text-accent-blue",
    iconBg: "bg-accent-blue/10",
  },
  {
    id: "feat-adaptive",
    icon: Award,
    title: "Adaptive Engine",
    description:
      "AI-driven skill profiling suggests custom learning speed, extra resources, and path corrections depending on each worker's profile.",
    spanClass: "col-span-1 md:col-span-2 lg:col-span-3", // Wide grid anchor
    iconColor: "text-accent-purple",
    iconBg: "bg-accent-purple/10",
  },
];

export const Features: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // Scroll reveal container variants (80ms stagger delay)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, rotateX: prefersReducedMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <SectionWrapper id="features" className="bg-transparent relative py-20 overflow-hidden">
      
      {/* Scoped Section Background Blur Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Blob behind section header */}
        <div className="absolute top-[5%] left-[30%] w-[380px] h-[380px] rounded-full bg-[#C4B5FD] blur-[110px] opacity-15" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-dark border border-text-dark/15 px-3 py-1 rounded-full bg-white shadow-sm">
            Our Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-dark mt-4 mb-4">
            Designed for Modern Enterprise Demands
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-body">
            Discover a comprehensive suite of learning structures co-designed with top institutions.
          </p>
        </div>

        {/* Bento Grid layout with Staggered Scroll-Reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: 1000 }}
        >
          {FEATURES_DATA.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.id}
                variants={cardVariants}
                className={feat.spanClass}
              >
                <Card className="h-full flex flex-col justify-between hover:border-text-dark/10">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-2.5 rounded-xl ${feat.iconBg} ${feat.iconColor} shadow-sm`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-heading font-bold text-text-dark mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed font-body">
                      {feat.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </SectionWrapper>
  );
};
