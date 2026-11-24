"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { useLightHeaderSection } from "@/src/hooks/useLightHeaderSection";
import { HOME_SERVICES } from "@/src/data/home.data";

export default function ServicesOverview() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useLightHeaderSection(sectionRef);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-overview-heading"
      className="is-light-section relative w-full bg-[#edeae4] text-[#0a1628] py-28 md:py-36 overflow-x-clip"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header with Full Top Clearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5">
              <span className="h-px w-7 bg-[#0077b6]" />
              <span className="font-dm-mono text-[11px] sm:text-xs font-medium uppercase tracking-[0.18em] text-[#0077b6]">
                WHAT WE ENGINEER
              </span>
            </div>
            <h2
              id="services-overview-heading"
              className="!m-0 mt-4 font-syne text-3xl sm:text-4xl lg:text-[2.95rem] font-bold !leading-[1.08] !tracking-[-0.03em] text-[#0a1628]"
            >
              End-to-end software tailored to your workflow.
            </h2>
          </div>

          <p className="font-dm-mono text-[11px] uppercase tracking-[0.15em] text-[#0a1628]/55">
            Hover or select a capability to inspect
          </p>
        </motion.div>

        {/* DESKTOP: Interactive Expanding Horizontal Accordion Gallery (lg+) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 hidden lg:flex h-[540px] w-full gap-4"
        >
          {HOME_SERVICES.map((service, index) => {
            const isExpanded = activeIndex === index;

            return (
              <div
                key={service.id}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIndex(index);
                  }
                }}
                className={`group relative h-full overflow-hidden rounded-3xl bg-[#0a1628] border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer focus:outline-none ${
                  isExpanded
                    ? "flex-[2.4] border-[#00aaff]/45 shadow-[0_28px_70px_rgba(10,22,40,0.24)]"
                    : "flex-[0.85] border-[#0a1628]/15 shadow-[0_16px_40px_rgba(10,22,40,0.10)] hover:border-[#0a1628]/35"
                }`}
              >
                {/* Full-Bleed Portrait Artwork */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1280px) 45vw, 560px"
                  className={`object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isExpanded
                      ? "scale-100 opacity-95 saturate-100"
                      : "scale-105 opacity-55 saturate-75 group-hover:opacity-70 group-hover:scale-100"
                  }`}
                />

                {/* Rich Multi-Stop Dark Navy Legibility Gradient */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isExpanded
                      ? "bg-gradient-to-t from-[#0a1628] via-[#0a1628]/72 to-[#0a1628]/20"
                      : "bg-gradient-to-t from-[#0a1628] via-[#0a1628]/65 to-[#0a1628]/35"
                  }`}
                />

                {/* Panel Content Container */}
                <div className="relative z-10 flex h-full w-full flex-col justify-between p-6 xl:p-8">
                  {/* Top Row: Index Badge + Expand Indicator */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-dm-mono text-xs font-bold transition-all duration-300 ${
                        isExpanded
                          ? "bg-[#00aaff] text-[#0a1628] shadow-[0_0_20px_rgba(0,170,255,0.45)]"
                          : "border border-white/20 bg-[#0a1628]/70 backdrop-blur-md text-[#edeae4]"
                      }`}
                    >
                      {service.number}
                    </span>

                    {isExpanded ? (
                      <span className="rounded-full border border-[#00aaff]/35 bg-[#0a1628]/70 backdrop-blur-md px-3.5 py-1 font-dm-mono text-[10px] uppercase tracking-[0.16em] text-[#00aaff]">
                        Core Capability
                      </span>
                    ) : (
                      <span
                        aria-hidden="true"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[#edeae4] transition-transform duration-300 group-hover:rotate-90 group-hover:border-[#00aaff]/50 group-hover:text-[#00aaff]"
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    )}
                  </div>

                  {/* Bottom Content: Expanded Full Details vs Collapsed Title */}
                  {isExpanded ? (
                    <div className="min-w-[320px] max-w-xl transition-opacity duration-300">
                      <h3 className="font-syne text-2xl xl:text-[2rem] font-bold leading-[1.12] tracking-tight text-[#edeae4]">
                        {service.title}
                      </h3>

                      <p className="mt-3 font-manrope text-sm xl:text-[15px] leading-relaxed text-[#edeae4]/82 line-clamp-2">
                        {service.description}
                      </p>

                      {/* 3 Frosted-Glass Tech Pills */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {service.techTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/20 bg-white/[0.10] backdrop-blur-md px-3.5 py-1.5 font-dm-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[#edeae4]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Bright Cyan Explore Service Link */}
                      <div className="mt-6 pt-4 border-t border-white/12">
                        <Link
                          href={service.href}
                          onClick={(e) => e.stopPropagation()}
                          style={{ color: "#00aaff" }}
                          className="group/link inline-flex items-center gap-2 font-manrope text-sm font-bold !text-[#00aaff] hover:!text-[#7dd3fc] transition-colors"
                        >
                          <span>Explore Service</span>
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="transition-opacity duration-300">
                      <h3 className="font-syne text-lg xl:text-xl font-bold leading-snug tracking-tight text-[#edeae4]/90 group-hover:text-white">
                        {service.title}
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* MOBILE & TABLET: Interactive Vertical Accordion Stack (< lg) */}
        <div className="mt-10 flex lg:hidden flex-col gap-3.5">
          {HOME_SERVICES.map((service, index) => {
            const isExpanded = activeIndex === index;

            return (
              <div
                key={service.id}
                onClick={() => setActiveIndex(index)}
                className={`relative overflow-hidden rounded-3xl bg-[#0a1628] border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer ${
                  isExpanded
                    ? "h-[410px] sm:h-[430px] border-[#00aaff]/45 shadow-[0_20px_50px_rgba(10,22,40,0.22)]"
                    : "h-[88px] border-[#0a1628]/15 shadow-sm"
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="100vw"
                  className={`object-cover transition-all duration-500 ${
                    isExpanded
                      ? "opacity-90 saturate-100 scale-100"
                      : "opacity-35 saturate-50 scale-105"
                  }`}
                />

                <div
                  aria-hidden="true"
                  className={`absolute inset-0 ${
                    isExpanded
                      ? "bg-gradient-to-t from-[#0a1628] via-[#0a1628]/78 to-[#0a1628]/30"
                      : "bg-[#0a1628]/75"
                  }`}
                />

                <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
                  {/* Header Row */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-dm-mono text-xs font-bold ${
                          isExpanded
                            ? "bg-[#00aaff] text-[#0a1628]"
                            : "border border-white/20 bg-white/10 text-[#edeae4]"
                        }`}
                      >
                        {service.number}
                      </span>

                      {!isExpanded && (
                        <h3 className="font-syne text-base sm:text-lg font-bold text-[#edeae4] truncate">
                          {service.title}
                        </h3>
                      )}
                    </div>

                    {!isExpanded ? (
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[#edeae4]">
                        <Plus className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="rounded-full border border-[#00aaff]/35 bg-[#0a1628]/75 px-3 py-1 font-dm-mono text-[10px] uppercase tracking-[0.14em] text-[#00aaff]">
                        Active
                      </span>
                    )}
                  </div>

                  {/* Expanded Body */}
                  {isExpanded && (
                    <div>
                      <h3 className="font-syne text-2xl font-bold leading-tight text-[#edeae4]">
                        {service.title}
                      </h3>
                      <p className="mt-2 font-manrope text-sm leading-relaxed text-[#edeae4]/82">
                        {service.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.techTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/20 bg-white/[0.12] backdrop-blur-md px-3 py-1 font-dm-mono text-[10px] uppercase tracking-[0.1em] text-[#edeae4]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-white/15">
                        <Link
                          href={service.href}
                          onClick={(e) => e.stopPropagation()}
                          style={{ color: "#00aaff" }}
                          className="inline-flex items-center gap-2 font-manrope text-sm font-bold !text-[#00aaff]"
                        >
                          <span>Explore Service</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
