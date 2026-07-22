"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-bg-base text-text-dark font-body flex flex-col justify-center items-center px-4 relative overflow-hidden">
      
      {/* Background blobs for aesthetics (SaaS spec) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Blob 1: Pale Purple */}
        <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-[#C4B5FD] blur-[100px] opacity-20" />
        {/* Blob 2: Pink */}
        <div className="absolute bottom-[20%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-[#F9A8D4] blur-[110px] opacity-20" />
      </div>

      <div className="relative z-10 text-center max-w-md space-y-6">
        
        {/* Stylized Logo Icon */}
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-text-dark/5 text-text-dark border border-border-neutral w-fit shadow-editorial">
            <GraduationCap className="h-12 w-12" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl font-heading font-bold text-text-dark tracking-tight">404</h1>
        <h2 className="text-2xl font-heading font-bold text-text-dark">Upskilling Path Not Found</h2>
        
        {/* Description */}
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-body">
          Oops! It looks like you've wandered off the designated learning track. Let's get you back to the main console to upskill your teams.
        </p>

        {/* CTA */}
        <div className="pt-4">
          <Button
            variant="primary"
            onClick={() => router.push("/")}
            className="px-8 shadow-sm flex items-center justify-center mx-auto bg-text-dark text-white"
          >
            Back to Home Console <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
