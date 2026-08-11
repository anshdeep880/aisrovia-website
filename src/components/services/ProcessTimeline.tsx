"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
  {
    num: "01",
    title: "Discovery",
    desc: "Aligning on project bounds, mapping user journeys, and outlining data structure constraints.",
  },
  {
    num: "02",
    title: "Design",
    desc: "Structuring clean, high-fidelity prototypes, wireframes, and design system tokens.",
  },
  {
    num: "03",
    title: "Build",
    desc: "Engineering premium, performant codebases with type safety and clean architecture.",
  },
  {
    num: "04",
    title: "Deploy",
    desc: "Provisioning secure cloud architecture with automated CI/CD and zero-downtime deployment.",
  },
  {
    num: "05",
    title: "Support",
    desc: "Continuous performance audits, scaling assistance, security updates, and active monitoring.",
  },
];

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const scrollRow = scrollRowRef.current;

      if (!container || !scrollRow) return;

      // Horizontally translate the timeline steps as the user scrolls vertically
      gsap.to(scrollRow, {
        x: () => -(scrollRow.scrollWidth - window.innerWidth + 120),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full py-24 sm:py-32 bg-[#edeae4] text-[#0a1628] overflow-hidden select-none"
    >
      <div className="max-w-6xl w-full mx-auto px-6 sm:px-12 flex flex-col gap-12 sm:gap-16">
        {/* Eyebrow and Title */}
        <div className="flex flex-col gap-2 text-left">
          <span className="font-dm-mono text-xs uppercase tracking-widest text-[#00aaff]">
            How We Work
          </span>
          <h2 className="font-syne text-3xl sm:text-5xl font-bold tracking-tight">
            Our Process
          </h2>
        </div>

        {/* Scroll Row */}
        <div className="relative w-full">
          <div 
            ref={scrollRowRef}
            className="flex gap-8 sm:gap-12 w-max pr-24"
          >
            {STEPS.map((step, idx) => (
              <div 
                key={step.num}
                className="w-[280px] sm:w-[340px] flex flex-col gap-4 border-l border-[#0a1628]/15 pl-6 sm:pl-8 py-4"
              >
                <span className="font-dm-mono text-xs text-[#00aaff] tracking-wider font-semibold">
                  STEP {step.num}
                </span>
                <h4 className="font-syne text-xl sm:text-2xl font-bold">
                  {step.title}
                </h4>
                <p className="font-manrope text-xs sm:text-sm text-[#0a1628]/80 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
