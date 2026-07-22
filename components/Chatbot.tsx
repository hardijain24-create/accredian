"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageSquare, X, Send, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

const FAQ_CHIPS = [
  { label: "What programs do you offer?", query: "programs" },
  { label: "Can we customize the curriculum?", query: "custom" },
  { label: "Tell me about cohort sizes.", query: "cohorts" },
  { label: "How does 1-on-1 mentoring work?", query: "mentoring" },
];

const BOT_ANSWERS: Record<string, string> = {
  programs: "We partner with global institutions to deliver cohort-based learning in Cloud-Native Engineering, Product Management, AI/ML Infrastructure, and Data Analytics. Check out the 'Programs' bento grid above to review features!",
  custom: "Yes, absolutely! Our educational engineers collaborate directly with your engineering and product heads to co-design curricula matching your technical stack (e.g. Node, Go, Rust, AWS) and corporate product roadmaps.",
  cohorts: "Cohorts average between 15 to 40 learners. This maintains an optimal balance for group capstones and peer interaction, while ensuring every learner receives dedicated 1-on-1 mentorship.",
  mentoring: "Every student is assigned a Fortune-500 industry practitioner as a mentor. Mentors hold weekly 1-on-1 meetings, review lab submissions, and guide students through company-tailored capstone challenges.",
  pricing: "Enterprise pricing is pilot-based, scaled to your cohort size and custom modules. Fill out our inquiry form or contact our L&D team directly via the 'Talk to Us' button to receive a detailed cost structure!",
  default: "I'm your L&D Assistant. Ask me about our custom programs, cohort size, mentorship loops, or pricing plans! You can also fill out the contact form below to get a detailed coordinator check-in.",
};

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "bot-welcome",
      sender: "bot",
      text: "Hello! I am your L&D Learning Assistant. How can I help you coordinate upskilling for your engineering or product teams today?",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [messages, isTyping, prefersReducedMotion]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate bot thinking delay
    setTimeout(() => {
      let matchedKey = "default";
      const normalized = textToSend.toLowerCase();

      if (normalized.includes("program") || normalized.includes("course") || normalized.includes("subject")) {
        matchedKey = "programs";
      } else if (normalized.includes("custom") || normalized.includes("design") || normalized.includes("tailor")) {
        matchedKey = "custom";
      } else if (normalized.includes("cohort") || normalized.includes("size") || normalized.includes("group")) {
        matchedKey = "cohorts";
      } else if (normalized.includes("mentor") || normalized.includes("teacher") || normalized.includes("guide")) {
        matchedKey = "mentoring";
      } else if (normalized.includes("price") || normalized.includes("cost") || normalized.includes("budget")) {
        matchedKey = "pricing";
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: BOT_ANSWERS[matchedKey],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 850);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="mb-4 w-[340px] sm:w-[380px] h-[500px] bg-white border border-border-neutral rounded-3xl shadow-editorial overflow-hidden flex flex-col justify-between"
          >
            {/* Chatbot Header */}
            <div className="bg-text-dark text-white px-4 py-4 flex items-center justify-between border-b border-border-neutral">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-lg bg-white/10 text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">Accredian L&D Assistant</h3>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                    <span className="text-[10px] text-white/70 font-medium">Powered by Gemini</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg-base">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm font-body shadow-sm leading-relaxed",
                    msg.sender === "user"
                      ? "bg-text-dark text-white ml-auto rounded-tr-none"
                      : "bg-white text-text-dark border border-border-neutral rounded-tl-none"
                  )}
                >
                  <p>{msg.text}</p>
                  <span className={cn(
                    "text-[9px] mt-1.5 block text-right font-medium",
                    msg.sender === "user" ? "text-white/70" : "text-text-secondary"
                  )}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="bg-white text-text-dark border border-border-neutral rounded-2xl rounded-tl-none p-3.5 max-w-[50px] shadow-sm flex items-center justify-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                  <span className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                  <span className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            {messages.length === 1 && (
              <div className="px-4 py-2 bg-white border-t border-border-neutral flex flex-wrap gap-2">
                {FAQ_CHIPS.map((chip) => (
                  <button
                    key={chip.query}
                    onClick={() => handleSend(chip.label)}
                    className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border border-border-neutral text-text-dark bg-bg-base hover:border-text-dark hover:bg-bg-base transition-colors cursor-pointer select-none"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="border-t border-border-neutral px-4 py-3 bg-white flex items-center space-x-2"
            >
              <input
                type="text"
                placeholder="Ask about upskilling, pricing..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-bg-base text-xs sm:text-sm rounded-xl border border-border-neutral px-3.5 py-2 text-text-dark placeholder-text-secondary focus:border-text-dark focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="bg-text-dark text-white p-2 rounded-xl hover:opacity-95 focus-visible:outline-none transition-colors disabled:opacity-50 flex items-center justify-center cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        className="w-14 h-14 bg-text-dark text-white rounded-full shadow-editorial flex items-center justify-center border border-border-neutral hover:shadow-editorial-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-dark transition-all cursor-pointer"
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        aria-label="Toggle chat widget"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
