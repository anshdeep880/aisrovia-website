"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Layers, Radio } from "lucide-react";
import BrowserFrame from "@/src/components/work/BrowserFrame";
import PhoneFrame from "@/src/components/work/PhoneFrame";
import ViewportVideo from "@/src/components/home/ViewportVideo";
import BorderBeam from "@/src/components/home/ui/BorderBeam";
import {
  CONTACT_PATH,
  HERO_MEDIA,
  HERO_TRUST_METRICS,
  WHATSAPP_URL,
  WORK_PATH,
} from "@/src/data/home.data";

export default function HeroSection() {
  return (
    <section
      aria-label="AiSROvia Custom Software Engineering"
      className="relative w-full bg-[#0a1628] text-[#edeae4] pt-[120px] pb-24 md:pt-[136px] md:pb-32 overflow-x-clip"
    >
      {/* Architectural 1px Hairline Grid + Dot Matrix Masked cleanly at edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.32]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(237, 234, 228, 0.055) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(237, 234, 228, 0.055) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 85% 75% at 55% 38%, #000 25%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 75% at 55% 38%, #000 25%, transparent 80%)",
        }}
      />

      {/* Top-Right Cyan Ambient Spotlight + Left Counter-Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-[-6%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(0,170,255,0.20)_0%,rgba(0,170,255,0.05)_45%,transparent_72%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-[-12%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,170,255,0.09)_0%,transparent_70%)] blur-2xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
          {/* Left Column (7 cols): High-Clarity Copy + 3-Action Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#00aaff]/25 bg-[#00aaff]/[0.07] px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00aaff] shadow-[0_0_8px_#00aaff]" />
              <span className="font-dm-mono text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-[#00aaff]">
                CUSTOM ERPS · AI SYSTEMS · MOBILE &amp; WEB APPS
              </span>
            </div>

            <h1 className="!m-0 mt-6 font-syne text-[2.35rem] sm:text-5xl lg:text-[3.6rem] xl:text-[4rem] font-bold !leading-[1.04] !tracking-[-0.035em] text-[#edeae4]">
              We build custom software that runs your business on{" "}
              <span className="bg-gradient-to-r from-[#edeae4] via-[#bae6fd] to-[#00aaff] bg-clip-text text-transparent">
                autopilot.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl font-manrope text-base sm:text-lg leading-[1.68] text-[#a6b0c0]">
              From real-time society vehicle tracking and retail ERPs to
              autonomous AI agents—engineered in-house for businesses across
              Australia &amp; India.
            </p>

            {/* 3-Action Conversion & Discovery Hierarchy */}
            <div className="mt-9 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              {/* 1. Primary Solid Cyan Pill */}
              <Link
                href={CONTACT_PATH}
                style={{ color: "#0a1628" }}
                className="group inline-flex flex-1 sm:flex-initial items-center justify-center gap-2.5 rounded-full bg-[#00aaff] hover:bg-[#1ab4ff] px-7 py-3.5 font-manrope text-sm sm:text-[15px] font-bold !text-[#0a1628] shadow-[0_10px_32px_rgba(0,170,255,0.32)] hover:shadow-[0_14px_40px_rgba(0,170,255,0.48)] transition-all duration-200 active:scale-[0.98]"
              >
                <span>Start a Project</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              {/* 2. Secondary Frosted Glass Pill */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#edeae4" }}
                className="group inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-full border border-[#edeae4]/20 bg-white/[0.05] hover:bg-white/[0.1] hover:border-[#00aaff]/45 backdrop-blur-md px-6 py-3.5 font-manrope text-sm sm:text-[15px] font-semibold !text-[#edeae4] transition-all duration-200 active:scale-[0.98]"
              >
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="h-4 w-4 text-[#00aaff] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* 3. Crisp Ghost Navigation Pill -> /work */}
              <Link
                href={WORK_PATH}
                style={{ color: "#edeae4" }}
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#edeae4]/14 hover:border-[#00aaff]/40 bg-transparent hover:bg-[#00aaff]/[0.07] px-5 py-3.5 font-dm-mono text-xs uppercase tracking-[0.14em] !text-[#edeae4]/90 hover:!text-white transition-all duration-200"
              >
                <Layers className="h-3.5 w-3.5 text-[#00aaff]" />
                <span>View All Projects</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#00aaff] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column (5 cols): BorderBeam Live Showcase + Offset Floating Mobile Card */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative w-full"
          >
            <div className="relative mx-auto w-full max-w-[560px] pb-12 sm:pb-14 sm:pr-4">
              {/* Top Live Telemetry Pill */}
              <div className="mb-3.5 flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#00aaff]/30 bg-[#0d1f38]/90 px-3.5 py-1.5 backdrop-blur-md shadow-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00aaff] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00aaff]" />
                  </span>
                  <Radio className="h-3.5 w-3.5 text-[#00aaff]" />
                  <span className="font-dm-mono text-[10px] uppercase tracking-[0.14em] text-[#edeae4]">
                    Live System · Real-Time Alerts
                  </span>
                </div>

                <span className="hidden sm:inline-block font-dm-mono text-[10px] uppercase tracking-[0.14em] text-[#a6b0c0]">
                  FCM + Web Console
                </span>
              </div>

              {/* Browser Frame Chassis with BorderBeam + Cyan Ambient Drop-Shadow */}
              <div className="relative rounded-2xl p-2 bg-gradient-to-b from-[#162d4f]/90 to-[#0a1628]/95 border border-white/10 shadow-[0_28px_80px_-12px_rgba(0,170,255,0.24),0_24px_60px_rgba(0,0,0,0.65)]">
                <BorderBeam durationSeconds={8} borderWidth={1.5} />
                <div className="relative z-10 overflow-hidden rounded-xl">
                  <BrowserFrame>
                    <ViewportVideo
                      src={HERO_MEDIA.video}
                      poster={HERO_MEDIA.poster}
                      priority
                      ariaLabel="Society Vehicle Tracking live console preview"
                      className="h-full w-full object-cover"
                    />
                  </BrowserFrame>
                </div>
              </div>

              {/* Floating Mobile Mockup cleanly framing bottom-right corner */}
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="absolute bottom-0 right-1 sm:right-0 z-30 w-[108px] sm:w-[132px] drop-shadow-[0_24px_40px_rgba(0,0,0,0.8)]"
              >
                <div className="rounded-[28px] p-[3px] bg-gradient-to-b from-[#00aaff]/60 via-white/20 to-[#0a1628] shadow-[0_0_25px_rgba(0,170,255,0.2)]">
                  <div className="rounded-[25px] bg-[#0a1628] overflow-hidden">
                    <PhoneFrame>
                      <img
                        src={HERO_MEDIA.mobileAlertImage}
                        alt="Vehicle Tracking mobile violation alert screen"
                        loading="eager"
                        className="h-full w-full object-cover"
                      />
                    </PhoneFrame>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Architectural Trust Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-20 pt-8 border-t border-[#edeae4]/12 grid grid-cols-2 lg:grid-cols-4 gap-y-8 sm:divide-x sm:divide-[#edeae4]/10"
        >
          {HERO_TRUST_METRICS.map((metric, idx) => (
            <div
              key={metric.label}
              className={`flex flex-col gap-1.5 ${
                idx > 0 ? "sm:pl-8" : ""
              } ${idx % 2 === 1 ? "pl-4 sm:pl-8 border-l border-[#edeae4]/10 sm:border-l-0" : ""}`}
            >
              <span className="font-syne text-2xl sm:text-[1.75rem] font-bold tracking-tight tabular-nums text-[#edeae4]">
                {metric.value}
              </span>
              <span className="font-dm-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#a6b0c0]">
                {metric.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
