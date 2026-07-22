"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Features } from "@/components/Features";
import { WhyUs } from "@/components/WhyUs";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Testimonials } from "@/components/Testimonials";
import { LeadForm } from "@/components/LeadForm";
import { RoiCalculator } from "@/components/RoiCalculator";
import { Chatbot } from "@/components/Chatbot";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setLoading(false);
      return;
    }

    // Progress bar loader loop
    const duration = 1000; // 1 second
    const stepTime = 16;
    const steps = duration / stepTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const currentProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(Math.floor(currentProgress));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => setLoading(false), 150);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-base"
          >
            <div className="flex flex-col items-center space-y-6">
              {/* Spinning logo mark */}
              <div className="p-3.5 rounded-2xl bg-text-dark/5 text-text-dark border border-border-neutral animate-spin-logo">
                <GraduationCap className="h-10 w-10" />
              </div>

              {/* Progress loading bar */}
              <div className="w-48 space-y-2">
                <div className="h-1 w-full bg-border-neutral rounded-full overflow-hidden">
                  <div
                    className="h-full bg-text-dark transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-text-secondary">
                  <span>loading</span>
                  <span>{progress}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="flex-1 flex flex-col"
          >
            <Header />
            <main className="flex-1">
              <Hero />
              <TrustBar />
              <Features />
              <WhyUs />
              <ProcessSteps />
              <Testimonials />
              <RoiCalculator />
              <LeadForm />
            </main>
            <Chatbot />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
