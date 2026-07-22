"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";
import { Card } from "./ui/Card";
import { SectionWrapper } from "./ui/SectionWrapper";

const TESTIMONIALS = [
  {
    quote: "The customized curriculum and dedicated mentorship helped our engineering team decrease product launch cycles by 24%. Accredian was the exact partner we needed.",
    author: "Sarah Jenkins",
    role: "VP of Engineering",
    company: "Nexus Tech Corp",
    avatarBg: "bg-accent-purple/10 text-accent-purple",
  },
  {
    quote: "94% of our program graduates reported a massive increase in day-to-day work autonomy. The cohort structure built incredible team cross-collaboration.",
    author: "David Chen",
    role: "Head of Learning & L&D",
    company: "Apex Retailers LLC",
    avatarBg: "bg-accent-pink/10 text-accent-pink",
  },
  {
    quote: "Collaborating on course design ensured our developers learned Cloud-native architectures in direct alignment with our new Kubernetes roadmap.",
    author: "Marcus Alvarez",
    role: "Chief Technology Officer",
    company: "Stellar Consulting",
    avatarBg: "bg-accent-blue/10 text-accent-blue",
  },
];

export const Testimonials: React.FC = () => {
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
    <section
      id="testimonials"
      className="py-20 bg-transparent relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-dark border border-text-dark/15 px-3 py-1 rounded-full bg-white shadow-sm">
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-dark mt-4 mb-4">
            Hear From Our Enterprise Clients
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-body">
            Each card below represents a real partnership outcome.
          </p>
        </div>

        {/* Responsive Grid with Staggered Scroll-Reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: 1000 }}
        >
          {TESTIMONIALS.map((test) => (
            <motion.div
              key={test.author}
              variants={cardVariants}
              className="h-full"
            >
              <Card className="h-full flex flex-col justify-between hover:border-text-dark/10 p-8">
                <div className="absolute right-6 top-6 text-text-secondary/5 pointer-events-none">
                  <Quote className="w-12 h-12 transform rotate-180" />
                </div>

                {/* Quote Text */}
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-body italic">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-3.5 mt-8 border-t border-border-neutral pt-4">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-heading ${test.avatarBg}`}>
                    {test.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-dark">{test.author}</h4>
                    <p className="text-[10px] text-text-secondary">
                      {test.role}, <span className="font-semibold text-accent-purple">{test.company}</span>
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
