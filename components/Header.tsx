"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "./ui/Button";
import { CommandPalette } from "./CommandPalette";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Programs", href: "#features" },
  { label: "Why Us", href: "#why-us" },
  { label: "How It Works", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const prefersReducedMotion = useReducedMotion();

  // Scroll detection for navbar shadow/border shifts
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for tracking active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sectionIds = ["hero", "features", "why-us", "process", "testimonials", "contact"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="fixed top-0 left-0 right-0 z-45 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 pointer-events-none"
      >
        <div className="relative w-full">
          {/* Ambient Breathing Glow (Desktop only, respects prefers-reduced-motion) */}
          {!prefersReducedMotion && (
            <motion.div
              animate={{ opacity: [0.35, 0.55, 0.35] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 to-accent-pink/20 blur-xl rounded-full -z-10"
            />
          )}

          <div className={cn(
            "w-full rounded-full border border-white/20 bg-white/65 backdrop-blur-xl px-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_8px_32px_0_rgba(20,22,26,0.04)]",
            scrolled ? "py-2 bg-white/75 backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_12px_40px_0_rgba(20,22,26,0.08)] border-white/30" : "py-3.5"
          )}>
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div variants={itemVariants} className="flex items-center space-x-2">
                <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="flex items-center space-x-2 group">
                  <motion.div
                    className="p-1.5 rounded-xl bg-text-dark/5 text-text-dark"
                    whileHover={prefersReducedMotion ? {} : { rotate: 360 }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  >
                    <GraduationCap className="h-5 w-5" />
                  </motion.div>
                  <span className="text-md sm:text-lg font-heading font-bold text-text-dark tracking-tight">
                    accredian
                  </span>
                </a>
              </motion.div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <motion.div key={item.label} variants={itemVariants} className="relative">
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={cn(
                          "relative text-xs font-semibold uppercase tracking-wider transition-colors duration-300 py-1.5 block",
                          "after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-text-dark after:transition-all after:duration-300 hover:after:w-full hover:after:left-0",
                          isActive ? "text-text-dark after:w-full after:left-0 font-bold" : "text-text-secondary hover:text-text-dark"
                        )}
                      >
                        {item.label}
                      </a>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Desktop CTA & Controls */}
              <motion.div variants={itemVariants} className="hidden lg:flex items-center space-x-3 xl:space-x-6">
                <CommandPalette />
                <Button
                  variant="primary"
                  onClick={(e: any) => {
                    const el = document.getElementById("contact");
                    if (el) {
                      const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
                      window.scrollTo({ top: offset, behavior: prefersReducedMotion ? "auto" : "smooth" });
                    }
                  }}
                  className="min-h-[38px] px-5 py-1.5 text-xs font-bold"
                >
                  Talk to Us
                </Button>
              </motion.div>

              {/* Mobile Hamburger toggle */}
              <div className="flex lg:hidden items-center">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="inline-flex items-center justify-center p-2 rounded-lg text-text-secondary hover:text-text-dark hover:bg-text-dark/5 transition-colors focus-visible:outline-none"
                  aria-label="Open main menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-text-dark/20 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="absolute top-0 right-0 bottom-0 w-4/5 max-w-sm bg-bg-base shadow-lg p-6 flex flex-col justify-between border-l border-border-neutral"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5 text-text-dark" />
                    <span className="font-heading font-bold text-lg text-text-dark">
                      accredian
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-text-secondary hover:text-text-dark hover:bg-text-dark/5 focus-visible:outline-none"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="flex flex-col space-y-4">
                  {NAV_ITEMS.map((item, idx) => {
                    const isActive = activeSection === item.href.replace("#", "");
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: prefersReducedMotion ? 0 : 0.05 + idx * 0.04,
                          duration: 0.25,
                        }}
                      >
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className={cn(
                            "text-sm font-semibold uppercase tracking-wider block py-2 border-b border-border-neutral/40",
                            isActive ? "text-text-dark font-bold" : "text-text-secondary"
                          )}
                        >
                          {item.label}
                        </a>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-4">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const el = document.getElementById("contact");
                    if (el) {
                      const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
                      window.scrollTo({ top: offset, behavior: prefersReducedMotion ? "auto" : "smooth" });
                    }
                  }}
                >
                  Talk to Us
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
