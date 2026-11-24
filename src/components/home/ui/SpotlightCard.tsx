"use client";

import React, { useRef } from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderGlowColor?: string;
}

/**
 * Aceternity-inspired Spotlight Card primitive.
 * Updates CSS variables (--mouse-x, --mouse-y) directly on the DOM node
 * for zero-rerender 120fps cursor tracking across both border and inner surface.
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(0, 170, 255, 0.16)",
  borderGlowColor = "rgba(0, 170, 255, 0.55)",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group/spotlight relative overflow-hidden ${className}`}
    >
      {/* Top specular hairline sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.06] to-transparent z-0"
      />

      {/* Radial surface spotlight following cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100 z-0"
        style={{
          background: `radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${spotlightColor}, transparent 65%)`,
        }}
      />

      {/* Masked 1px perimeter border spotlight following cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] p-px opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100 z-20"
        style={{
          background: `radial-gradient(340px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${borderGlowColor}, transparent 70%)`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
