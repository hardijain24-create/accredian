"use client";

import React from "react";
import { GraduationCap } from "lucide-react";
import { Button } from "./ui/Button";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-border-neutral py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-border-neutral pb-12 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-accent-purple" />
              <span className="text-xl font-heading font-bold text-text-dark">accredian</span>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-body max-w-sm">
              We design university-partnered upskilling paths helping businesses close technical capability gaps at scale.
            </p>
          </div>

          {/* Quick Links Col */}
          <div className="lg:col-span-2 space-y-4 font-body">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-dark">Programs</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
              <li><a href="#features" className="hover:text-text-dark transition-colors">AI Engineering</a></li>
              <li><a href="#features" className="hover:text-text-dark transition-colors">Product Management</a></li>
              <li><a href="#features" className="hover:text-text-dark transition-colors">Data Science</a></li>
              <li><a href="#features" className="hover:text-text-dark transition-colors">Cloud native Systems</a></li>
            </ul>
          </div>

          {/* Company Col */}
          <div className="lg:col-span-2 space-y-4 font-body">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-dark">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
              <li><a href="#why-us" className="hover:text-text-dark transition-colors">Why Accredian</a></li>
              <li><a href="#process" className="hover:text-text-dark transition-colors">How it works</a></li>
              <li><a href="#testimonials" className="hover:text-text-dark transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-text-dark transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="lg:col-span-4 space-y-4 font-body">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-dark">L&D Briefing Newsletter</h4>
            <p className="text-xs text-text-secondary">
              Get monthly curriculum reports and tech capability diagnostic insights.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex space-x-2">
              <input
                type="email"
                placeholder="Work Email"
                className="w-full bg-bg-base text-xs sm:text-sm rounded-full border border-border-neutral px-4 py-2 text-text-dark placeholder-text-secondary focus:border-text-dark focus:outline-none focus:ring-0"
                aria-label="Newsletter email input"
              />
              <Button variant="primary" className="min-h-[38px] py-1.5 px-4 text-xs font-bold bg-text-dark text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs text-text-secondary font-body">
          <div className="flex flex-col sm:flex-row sm:space-x-4 items-center gap-2 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} Accredian Corp. All rights reserved.</span>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-text-dark">Terms & Privacy</a>
          </div>

          {/* AI Notice */}
          <div className="flex items-center space-x-1.5 bg-text-dark/5 border border-border-neutral text-text-dark px-3 py-1 rounded-full text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-pink animate-pulse" />
            <span>Built in pair-programming with AI</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
