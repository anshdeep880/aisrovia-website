"use client";

import React from "react";

const TOOLS = [
  "Next.js",
  "GSAP",
  "OpenAI",
  "Node.js",
  "PostgreSQL",
  "TypeScript",
  "Tailwind CSS",
  "Flutter",
  "React Native",
  "Stripe",
  "Prisma",
  "Redis",
  "Framer Motion",
  "Docker",
  "AWS",
];

// Duplicate items to ensure seamless infinite looping transition
const DUP_TOOLS = [...TOOLS, ...TOOLS, ...TOOLS];

export default function TechMarquee() {
  return (
    <section className="w-full py-8 sm:py-10 bg-[#0a1628] border-y border-white/5 overflow-hidden select-none flex items-center">
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee-infinite {
          display: flex;
          width: max-content;
          animation: marquee-scroll 45s linear infinite;
        }
      `}</style>
      <div className="animate-marquee-infinite gap-16 sm:gap-24 flex items-center">
        {DUP_TOOLS.map((tool, idx) => (
          <span 
            key={idx}
            className="font-dm-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-[#edeae4]/25 font-medium whitespace-nowrap"
          >
            {tool}
          </span>
        ))}
      </div>
    </section>
  );
}
