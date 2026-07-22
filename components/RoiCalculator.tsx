"use client";

import React, { useState, useEffect } from "react";
import { Card } from "./ui/Card";
import { motion, useReducedMotion } from "framer-motion";
import { DollarSign, Clock, Award, SlidersHorizontal, Calculator } from "lucide-react";

const TRACKS = [
  { value: "ai", label: "AI Engineering & Copilots", hoursSaved: 160 },
  { value: "cloud", label: "Cloud-Native & Kubernetes", hoursSaved: 120 },
  { value: "product", label: "Product Management", hoursSaved: 80 },
];

export const RoiCalculator: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [engineers, setEngineers] = useState(50);
  const [rate, setRate] = useState(75);
  const [track, setTrack] = useState("ai");

  // Output states (animated values)
  const [hoursSaved, setHoursSaved] = useState(0);
  const [savings, setSavings] = useState(0);
  const [roiIndex, setRoiIndex] = useState(0);

  // Constants
  const upskillingCostPerDev = 1500;

  useEffect(() => {
    const activeTrack = TRACKS.find((t) => t.value === track) || TRACKS[0];
    const computedHours = engineers * activeTrack.hoursSaved;
    const computedSavings = computedHours * rate;
    const totalCost = engineers * upskillingCostPerDev;
    const computedRoi = totalCost > 0 ? Math.floor((computedSavings / totalCost) * 100) : 0;

    // Direct update for sliders (immediate feel)
    setHoursSaved(computedHours);
    setSavings(computedSavings);
    setRoiIndex(computedRoi);
  }, [engineers, rate, track]);

  // Radial progress circumference math
  const radius = 50;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // Cap visual stroke-dash offset calculations
  const strokeDashoffset = circumference - (Math.min(roiIndex, 500) / 500) * circumference;

  return (
    <div className="w-full max-w-4xl mx-auto mt-20" id="roi-calculator">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[10px] font-bold uppercase tracking-widest text-text-dark border border-text-dark/15 px-3 py-1 rounded-full bg-white shadow-sm inline-flex items-center">
          <Calculator className="w-3.5 h-3.5 mr-1.5 text-accent-purple" /> Interactive Analytics
        </span>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-dark mt-4 mb-4">
          Upskilling ROI Calculator
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-body">
          Select your training cohort size and track parameters to estimate organizational productivity gains and annual return index.
        </p>
      </div>

      <Card className="border border-border-neutral p-6 sm:p-10 shadow-editorial bg-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Sliders Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center space-x-3.5 border-b border-border-neutral pb-4 mb-6">
            <div className="p-2 bg-accent-purple/10 text-accent-purple rounded-xl shadow-sm">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-bold text-text-dark">Cohort Parameters</h3>
              <p className="text-xs text-text-secondary font-body mt-0.5">Adjust inputs to calculate projected metrics.</p>
            </div>
          </div>

          {/* Slider 1: Engineers */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <label htmlFor="engineers-range" className="text-text-dark">Developers to train</label>
              <span className="text-accent-purple font-bold bg-accent-purple/5 px-2.5 py-0.5 rounded-lg border border-accent-purple/20 font-mono">
                {engineers} Devs
              </span>
            </div>
            <input
              type="range"
              id="engineers-range"
              min="10"
              max="500"
              step="5"
              value={engineers}
              onChange={(e) => setEngineers(Number(e.target.value))}
              className="w-full h-2 bg-bg-base rounded-lg appearance-none cursor-pointer accent-text-dark border border-border-neutral"
            />
            <div className="flex justify-between text-[10px] text-text-secondary font-bold uppercase tracking-wider">
              <span>10 Devs</span>
              <span>500 Devs</span>
            </div>
          </div>

          {/* Slider 2: Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <label htmlFor="rate-range" className="text-text-dark">Avg Hourly Developer Rate</label>
              <span className="text-accent-pink font-bold bg-accent-pink/5 px-2.5 py-0.5 rounded-lg border border-accent-pink/20 font-mono">
                ${rate} / hr
              </span>
            </div>
            <input
              type="range"
              id="rate-range"
              min="30"
              max="150"
              step="5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-bg-base rounded-lg appearance-none cursor-pointer accent-text-dark border border-border-neutral"
            />
            <div className="flex justify-between text-[10px] text-text-secondary font-bold uppercase tracking-wider">
              <span>$30/hr</span>
              <span>$150/hr</span>
            </div>
          </div>

          {/* Selector 3: Technology Track */}
          <div className="space-y-2 pt-2">
            <label htmlFor="track-select" className="text-sm font-semibold text-text-dark">Focus Learning Pathway</label>
            <select
              id="track-select"
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              className="w-full bg-bg-base text-xs sm:text-sm rounded-xl border border-border-neutral px-4 py-3 text-text-dark focus:border-text-dark focus:outline-none focus:ring-0 font-body focus:bg-white"
            >
              {TRACKS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label} (&mdash; saves ~{t.hoursSaved} hrs/dev/yr)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Side: Visual ROI Outputs */}
        <div className="lg:col-span-5 bg-bg-base/75 rounded-3xl p-6 sm:p-8 border border-border-neutral flex flex-col items-center justify-between text-center relative overflow-hidden min-h-[380px] shadow-sm">
          {/* Decorative blur blob */}
          <div className="absolute right-0 top-0 w-24 h-24 bg-accent-purple/5 rounded-full blur-2xl pointer-events-none" />

          {/* Metric 1: Annual savings */}
          <div className="w-full space-y-1">
            <div className="p-2 bg-accent-blue/10 text-accent-blue rounded-full w-fit mx-auto mb-2.5">
              <DollarSign className="w-4.5 h-4.5" />
            </div>
            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Projected Annual Return</p>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text-dark font-mono">
              ${savings.toLocaleString()}
            </h2>
          </div>

          {/* Metric 2: Hours Saved */}
          <div className="w-full space-y-1 py-4 border-y border-border-neutral/60 my-4">
            <div className="p-2 bg-accent-pink/10 text-accent-pink rounded-full w-fit mx-auto mb-2.5">
              <Clock className="w-4.5 h-4.5" />
            </div>
            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Productive Hours Reclaimed</p>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-text-dark font-mono">
              {hoursSaved.toLocaleString()} hrs / yr
            </h3>
          </div>

          {/* Metric 3: Radial SVG ROI percentage */}
          <div className="flex flex-col items-center space-y-2">
            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Upskilling ROI Index</p>
            <div className="relative flex items-center justify-center">
              <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
                <circle
                  stroke="#E5E7EB"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <motion.circle
                  stroke="#14161A"
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={circumference + " " + circumference}
                  style={{ strokeDashoffset }}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute text-center flex flex-col justify-center">
                <span className="text-sm font-bold text-text-dark font-mono leading-none">{roiIndex}%</span>
                <span className="text-[8px] text-text-secondary font-bold uppercase mt-0.5">ROI</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
