"use client";

import React, { useState, useEffect } from "react";
import { SectionWrapper } from "./ui/SectionWrapper";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { validateLead } from "@/lib/validation";
import { Check, AlertCircle, Sparkles, Building2, User, Mail, Users, MessageSquare } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  speed: number;
}

export const LeadForm: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "1-50",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shakeFields, setShakeFields] = useState<Record<string, boolean>>({});

  // Real-time live validations (Debounced/Throttled via simple state tracks)
  useEffect(() => {
    const fieldsToValidate: Record<string, string> = {};
    Object.keys(formData).forEach((k) => {
      if (touched[k]) {
        fieldsToValidate[k] = (formData as any)[k];
      }
    });

    if (Object.keys(fieldsToValidate).length > 0) {
      const { errors: valErrors } = validateLead({ ...formData });
      const filteredErrors: Record<string, string> = {};
      Object.keys(touched).forEach((key) => {
        if (valErrors[key]) {
          filteredErrors[key] = valErrors[key];
        }
      });
      setErrors(filteredErrors);
    }
  }, [formData, touched]);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate 14 custom pastel particles for success check burst (SaaS accents)
  const triggerConfettiBurst = () => {
    if (prefersReducedMotion) return;

    const colors = ["#EC4899", "#8B5CF6", "#F5C244", "#3B82F6"];
    const newParticles: Particle[] = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: 0,
      y: 0,
      color: colors[i % colors.length],
      angle: Math.random() * 360,
      speed: 2 + Math.random() * 4,
    }));

    setParticles(newParticles);

    // Clean up particles
    setTimeout(() => setParticles([]), 1600);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Perform check
    const { isValid, errors: valErrors } = validateLead(formData);

    if (!isValid) {
      setErrors(valErrors);
      setStatus("idle");

      // Trigger shakes on validation errors
      const newShakes: Record<string, boolean> = {};
      Object.keys(valErrors).forEach((key) => {
        newShakes[key] = true;
      });
      setShakeFields(newShakes);

      // Stop shake animation after keyframe loop finishes
      setTimeout(() => setShakeFields({}), 450);
      return;
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus("success");
        triggerConfettiBurst();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      teamSize: "1-50",
      message: "",
    });
    setErrors({});
    setTouched({});
    setStatus("idle");
    setParticles([]);
  };

  return (
    <SectionWrapper id="contact" className="relative pb-24 overflow-hidden bg-bg-base">
      
      {/* Background visual detail */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[380px] h-[380px] rounded-full bg-accent-pink/5 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-dark border border-text-dark/15 px-3 py-1 rounded-full bg-white shadow-sm">
            Get in touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-dark mt-4 mb-4">
            Accelerate Your Team's Growth
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-body">
            Let us design a tailored upskilling program. Submit the diagnostic form below to get a dedicated coordinator check-in.
          </p>
        </div>

        {/* Lead Capture Card */}
        <Card className="max-w-xl mx-auto border border-border-neutral p-8 sm:p-10 shadow-editorial relative bg-white">
          <AnimatePresence mode="wait">
            
            {/* SUCCESS STATE */}
            {status === "success" ? (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="text-center py-12 flex flex-col items-center justify-center relative"
              >
                {/* Confetti Particles Burst */}
                {particles.map((p) => {
                  const rad = (p.angle * Math.PI) / 180;
                  const targetX = Math.cos(rad) * p.speed * 45;
                  const targetY = Math.sin(rad) * p.speed * 45;

                  return (
                    <motion.div
                      key={p.id}
                      className="absolute w-2 h-2 rounded-full pointer-events-none"
                      style={{ backgroundColor: p.color, left: "50%", top: "40%" }}
                      animate={{
                        x: [0, targetX],
                        y: [0, targetY],
                        opacity: [1, 0.8, 0],
                        scale: [1, 1.2, 0.4],
                      }}
                      transition={{ duration: 1.4, ease: "easeOut" }}
                    />
                  );
                })}

                {/* Animated checkmark */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-accent-blue/10 border border-accent-blue flex items-center justify-center text-accent-blue shadow-sm">
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-7 h-7"
                    >
                      <motion.path
                        d="M20 6 9 17l-5-5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.55, ease: "easeInOut", delay: 0.2 }}
                      />
                    </motion.svg>
                  </div>
                </div>

                <h3 className="text-2xl font-heading font-bold text-text-dark mb-3">Submission Received!</h3>
                <p className="text-sm text-text-secondary leading-relaxed font-body max-w-sm mb-8">
                  Thank you! An Accredian enterprise learning advisor will review your team size details and reach out within 24 business hours.
                </p>

                <Button variant="secondary" onClick={resetForm} className="px-8 shadow-sm">
                  Submit another inquiry
                </Button>
              </motion.div>
            ) : (
              
              /* ACTIVE FORM INPUTS */
              <motion.form
                key="active-form"
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
              >
                {/* Input 1: Name */}
                <div className={cn("relative z-0 w-full group", shakeFields.name && "animate-shake")}>
                  <div className="flex items-center absolute bottom-3.5 left-0 text-text-secondary">
                    <User className="w-4.5 h-4.5 mr-2.5 text-text-dark" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("name")}
                    placeholder=" "
                    className={cn(
                      "block py-3 px-0 pl-7 w-full text-sm text-text-dark bg-transparent border-0 border-b border-border-neutral appearance-none focus:outline-none focus:ring-0 focus:border-text-dark transition-colors duration-300 font-body",
                      errors.name ? "border-accent-pink/70" : touched.name ? "border-accent-blue/70" : "border-border-neutral"
                    )}
                  />
                  <label
                    htmlFor="name"
                    className="absolute text-xs sm:text-sm text-text-secondary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] pl-7 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 peer-placeholder-shown:top-3 peer-focus:scale-75 peer-focus:-translate-y-6 font-semibold"
                  >
                    Your Name
                  </label>
                  
                  {/* Validation Icon Overlay */}
                  <div className="absolute right-0 bottom-3.5 flex items-center">
                    {touched.name && !errors.name && <Check className="w-4 h-4 text-accent-blue" />}
                    {touched.name && errors.name && (
                      <span title={errors.name}>
                        <AlertCircle className="w-4 h-4 text-accent-pink" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Input 2: Work Email */}
                <div className={cn("relative z-0 w-full group", shakeFields.email && "animate-shake")}>
                  <div className="flex items-center absolute bottom-3.5 left-0 text-text-secondary">
                    <Mail className="w-4.5 h-4.5 mr-2.5 text-text-dark" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    placeholder=" "
                    className={cn(
                      "block py-3 px-0 pl-7 w-full text-sm text-text-dark bg-transparent border-0 border-b border-border-neutral appearance-none focus:outline-none focus:ring-0 focus:border-text-dark transition-colors duration-300 font-body",
                      errors.email ? "border-accent-pink/70" : touched.email ? "border-accent-blue/70" : "border-border-neutral"
                    )}
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-xs sm:text-sm text-text-secondary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] pl-7 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 peer-placeholder-shown:top-3 peer-focus:scale-75 peer-focus:-translate-y-6 font-semibold"
                  >
                    Work Email Address
                  </label>
                  <div className="absolute right-0 bottom-3.5 flex items-center">
                    {touched.email && !errors.email && <Check className="w-4 h-4 text-accent-blue" />}
                    {touched.email && errors.email && (
                      <span title={errors.email}>
                        <AlertCircle className="w-4 h-4 text-accent-pink" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Input 3: Company */}
                <div className={cn("relative z-0 w-full group", shakeFields.company && "animate-shake")}>
                  <div className="flex items-center absolute bottom-3.5 left-0 text-text-secondary">
                    <Building2 className="w-4.5 h-4.5 mr-2.5 text-text-dark" />
                  </div>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    onBlur={() => handleBlur("company")}
                    placeholder=" "
                    className={cn(
                      "block py-3 px-0 pl-7 w-full text-sm text-text-dark bg-transparent border-0 border-b border-border-neutral appearance-none focus:outline-none focus:ring-0 focus:border-text-dark transition-colors duration-300 font-body",
                      errors.company ? "border-accent-pink/70" : touched.company ? "border-accent-blue/70" : "border-border-neutral"
                    )}
                  />
                  <label
                    htmlFor="company"
                    className="absolute text-xs sm:text-sm text-text-secondary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] pl-7 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 peer-placeholder-shown:top-3 peer-focus:scale-75 peer-focus:-translate-y-6 font-semibold"
                  >
                    Company Name
                  </label>
                  <div className="absolute right-0 bottom-3.5 flex items-center">
                    {touched.company && !errors.company && <Check className="w-4 h-4 text-accent-blue" />}
                    {touched.company && errors.company && (
                      <span title={errors.company}>
                        <AlertCircle className="w-4 h-4 text-accent-pink" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Input 4: Team Size Select */}
                <div className="relative z-0 w-full group">
                  <div className="flex items-center absolute bottom-3.5 left-0 text-text-secondary">
                    <Users className="w-4.5 h-4.5 mr-2.5 text-text-dark" />
                  </div>
                  <select
                    name="teamSize"
                    id="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    className="block py-3 px-0 pl-7 w-full text-sm text-text-dark bg-transparent border-0 border-b border-border-neutral appearance-none focus:outline-none focus:ring-0 focus:border-text-dark transition-colors duration-300 font-body focus:bg-white"
                  >
                    <option value="1-50" className="text-text-dark bg-white">1 - 50 employees</option>
                    <option value="51-200" className="text-text-dark bg-white">51 - 200 employees</option>
                    <option value="201-1000" className="text-text-dark bg-white">201 - 1,000 employees</option>
                    <option value="1000+" className="text-text-dark bg-white">1,000+ employees</option>
                  </select>
                  <label
                    htmlFor="teamSize"
                    className="absolute text-xs text-text-secondary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] pl-7 font-semibold"
                  >
                    Estimated Team Size
                  </label>
                </div>

                {/* Input 5: Message */}
                <div className="relative z-0 w-full group">
                  <div className="flex items-start absolute top-3.5 left-0 text-text-secondary">
                    <MessageSquare className="w-4.5 h-4.5 mr-2.5 text-text-dark mt-0.5" />
                  </div>
                  <textarea
                    name="message"
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder=" "
                    className="block py-3 px-0 pl-7 w-full text-sm text-text-dark bg-transparent border-0 border-b border-border-neutral appearance-none focus:outline-none focus:ring-0 focus:border-text-dark transition-colors duration-300 font-body"
                  />
                  <label
                    htmlFor="message"
                    className="absolute text-xs sm:text-sm text-text-secondary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] pl-7 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 peer-placeholder-shown:top-3 peer-focus:scale-75 peer-focus:-translate-y-6 font-semibold"
                  >
                    Details (optional upskilling goals)
                  </label>
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full flex items-center justify-center shadow-sm font-bold cursor-pointer"
                  >
                    {status === "submitting" ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending Request...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Request Program Audit <Sparkles className="w-4.5 h-4.5 ml-2 text-accent-yellow animate-pulse" />
                      </span>
                    )}
                  </Button>
                </div>

                {/* Form status error notice */}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 bg-accent-pink/15 text-text-dark border border-accent-pink/30 rounded-2xl flex items-center space-x-2 text-xs font-semibold"
                  >
                    <AlertCircle className="w-4 h-4 mr-1 text-accent-pink flex-shrink-0" />
                    <span>Submission error. Please verify your internet connection and try again.</span>
                  </motion.div>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </Card>

      </div>
    </SectionWrapper>
  );
};
