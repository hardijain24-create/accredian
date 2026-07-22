"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, Compass, Shield, User, MessageSquare, Laptop, Terminal, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Navigation Items
  const items: CommandItem[] = [
    {
      id: "hero",
      title: "Jump to Home Section",
      subtitle: "Overview of workforce upskilling platforms",
      icon: Laptop,
      action: () => scrollToSection("hero"),
    },
    {
      id: "features",
      title: "Jump to Programs & Features",
      subtitle: "Certifications, adaptive learning, and feature cards",
      icon: Compass,
      action: () => scrollToSection("features"),
    },
    {
      id: "why-us",
      title: "Jump to Why Us",
      subtitle: "Academic partnerships, statistics, and success rates",
      icon: Shield,
      action: () => scrollToSection("why-us"),
    },
    {
      id: "process",
      title: "Jump to How It Works",
      subtitle: "A detailed timeline stepper showing our method",
      icon: Terminal,
      action: () => scrollToSection("process"),
    },
    {
      id: "testimonials",
      title: "Jump to Testimonials",
      subtitle: "Read feedback from our Fortune-500 enterprise clients",
      icon: User,
      action: () => scrollToSection("testimonials"),
    },
    {
      id: "contact",
      title: "Jump to Contact / Inquire Now",
      subtitle: "Fill out the enterprise upskilling lead form",
      icon: MessageSquare,
      action: () => scrollToSection("contact"),
    },
    {
      id: "admin",
      title: "Go to Admin Dashboard",
      subtitle: "View incoming lead submissions and conversion statistics",
      icon: Settings,
      action: () => {
        setIsOpen(false);
        router.push("/admin");
      },
    },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offset,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.key === "k") && (e.metaKey || e.ctrlKey)) {
        if (e.key === "k") {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Autofocus input
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  // Filtered items
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  // Keyboard navigation within list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[activeIdx]) {
        filteredItems[activeIdx].action();
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="hidden sm:inline-flex items-center space-x-2 border border-border-neutral text-text-secondary hover:text-text-dark hover:border-text-dark/45 hover:bg-bg-base/40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-text-dark/20 focus-visible:ring-offset-2 px-3.5 py-1.5 rounded-full text-xs font-semibold select-none cursor-pointer"
        title="Open search menu"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Quick Navigation</span>
        <kbd className="bg-bg-base border border-border-neutral px-1.5 py-0.5 rounded text-[10px] font-sans font-bold text-text-secondary">
          ⌘K
        </kbd>
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              {/* Backdrop Blur Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-text-dark/15 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <div className="flex min-h-screen items-start justify-center p-4 pt-[12vh]">
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-full max-w-lg overflow-hidden rounded-3xl border border-border-neutral bg-white shadow-editorial relative z-10 flex flex-col justify-start"
                >
                  {/* Search Input Box */}
                  <div className="flex items-center space-x-3.5 border-b border-border-neutral px-4 py-3.5 bg-bg-base/30">
                    <Search className="w-5 h-5 text-text-secondary" />
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search sections or shortcuts..."
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setActiveIdx(0);
                      }}
                      onKeyDown={handleKeyDown}
                      className="w-full bg-transparent border-none text-sm text-text-dark placeholder-text-secondary focus:outline-none focus:ring-0"
                    />
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-[10px] uppercase font-bold text-text-secondary border border-border-neutral px-1.5 py-0.5 rounded bg-bg-base hover:text-text-dark"
                    >
                      Esc
                    </button>
                  </div>

                  {/* Items List */}
                  <div className="max-h-[300px] overflow-y-auto p-2 space-y-1 bg-white">
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item, idx) => {
                        const Icon = item.icon;
                        const isActive = activeIdx === idx;

                        return (
                          <button
                            key={item.id}
                            onClick={item.action}
                            onMouseEnter={() => setActiveIdx(idx)}
                            className={cn(
                              "w-full flex items-center space-x-3.5 px-3 py-2.5 rounded-xl text-left transition-colors select-none focus:outline-none",
                              isActive ? "bg-bg-base" : "bg-transparent"
                            )}
                          >
                            <div className={cn(
                              "p-2 rounded-lg transition-colors",
                              isActive ? "bg-text-dark text-white shadow-sm" : "bg-bg-base text-text-secondary"
                            )}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className={cn("text-xs sm:text-sm font-semibold", isActive ? "text-text-dark font-bold" : "text-text-dark")}>
                                {item.title}
                              </p>
                              <p className="text-[10px] text-text-secondary mt-0.5 max-w-[340px] truncate">
                                {item.subtitle}
                              </p>
                            </div>
                          </button>
                        );
                      })
                    ) : (
                      <div className="py-8 text-center text-xs text-text-secondary">
                        No shortcuts found for "{search}"
                      </div>
                    )}
                  </div>

                  {/* Bottom guide footer */}
                  <div className="border-t border-border-neutral px-4 py-2 flex justify-between items-center text-[10px] text-text-secondary font-medium bg-bg-base/30">
                    <div className="flex space-x-3">
                      <span>↑↓ to select</span>
                      <span>↵ to navigate</span>
                    </div>
                    <span>⌘K to toggle</span>
                  </div>

                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
