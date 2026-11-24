"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ViewportVideo from "@/src/components/home/ViewportVideo";
import SpotlightCard from "@/src/components/home/ui/SpotlightCard";
import {
  DELIVERY_PROCESS_STEPS,
  GLOBE_VIDEO_POSTER,
} from "@/src/data/home.data";

export default function ProcessSection() {
  return (
    <section
      aria-labelledby="process-section-heading"
      className="relative w-full bg-[#0a1628] text-[#edeae4] py-28 md:py-36 overflow-hidden"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes aisrovia-rail-shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(350%); }
            }
          `,
        }}
      />

      {/* Atmospheric Lazy-Loaded Globe Video Backdrop (opacity-25 + Radial Edge Vignette) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <ViewportVideo
          src="/assets/videos/globe.mp4"
          poster={GLOBE_VIDEO_POSTER}
          className="h-full w-full object-cover opacity-25 mix-blend-screen scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0a1628]/45 to-[#0a1628]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_50%_50%,transparent_15%,#0a1628_90%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5">
              <span className="h-px w-7 bg-[#00aaff]" />
              <span className="font-dm-mono text-[11px] sm:text-xs font-medium uppercase tracking-[0.18em] text-[#00aaff]">
                OUR PROCESS
              </span>
            </div>
            <h2
              id="process-section-heading"
              className="!m-0 mt-4 font-syne text-3xl sm:text-4xl lg:text-[2.95rem] font-bold !leading-[1.08] !tracking-[-0.03em] text-[#edeae4]"
            >
              Engineered from Perth &amp; India. Built to scale anywhere.
            </h2>
          </div>

          <Link
            href="/about"
            style={{ color: "#edeae4" }}
            className="group inline-flex items-center gap-2.5 self-start md:self-auto rounded-full border border-[#edeae4]/20 bg-white/[0.04] hover:border-[#00aaff]/45 hover:bg-[#00aaff]/10 px-5 py-2.5 font-dm-mono text-xs uppercase tracking-[0.14em] !text-[#edeae4] transition-all duration-200"
          >
            <span>About AiSROvia &amp; Founder</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#00aaff] transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Connected Horizontal Architectural Stepper */}
        <div className="mt-16 relative">
          {/* Desktop Continuous Connecting Rail + Animated Cyan Shimmer Beam */}
          <div
            aria-hidden="true"
            className="hidden md:block relative mb-8 h-px w-full bg-[#edeae4]/15 overflow-hidden"
          >
            <div
              className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#00aaff] to-transparent will-change-transform"
              style={{
                animation: "aisrovia-rail-shimmer 4.5s ease-in-out infinite",
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DELIVERY_PROCESS_STEPS.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.58,
                  delay: idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex flex-col"
              >
                {/* Desktop Node Dot Anchored Directly onto the Top Rail */}
                <div
                  aria-hidden="true"
                  className="hidden md:flex items-center justify-center absolute -top-[38px] left-8 h-3.5 w-3.5 rounded-full bg-[#0a1628] ring-1 ring-[#00aaff]/60"
                >
                  <span className="h-2 w-2 rounded-full bg-[#00aaff] shadow-[0_0_12px_#00aaff]" />
                </div>

                <SpotlightCard className="h-full rounded-3xl border border-[#edeae4]/12 bg-[#0d1d36]/60 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                  <div className="relative flex h-full flex-col justify-between p-7 sm:p-8">
                    {/* Large Translucent Syne Step Watermark */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none select-none absolute top-4 right-6 font-syne text-6xl sm:text-7xl font-extrabold leading-none tracking-tighter text-white/[0.05]"
                    >
                      {item.step}
                    </span>

                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#00aaff]/30 bg-[#00aaff]/10 px-3 py-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00aaff]" />
                        <span className="font-dm-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#00aaff]">
                          PHASE {item.step}
                        </span>
                      </div>

                      <h3 className="mt-6 font-syne text-xl sm:text-2xl font-bold tracking-tight text-[#edeae4]">
                        {item.title}
                      </h3>

                      <p className="mt-3 font-manrope text-sm sm:text-[15px] leading-relaxed text-[#a6b0c0]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
