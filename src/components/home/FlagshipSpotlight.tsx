"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BellRing,
  ClipboardList,
  Maximize2,
  ShieldCheck,
  X,
} from "lucide-react";
import BrowserFrame from "@/src/components/work/BrowserFrame";
import PhoneFrame from "@/src/components/work/PhoneFrame";
import ViewportVideo from "@/src/components/home/ViewportVideo";
import { useLightHeaderSection } from "@/src/hooks/useLightHeaderSection";
import {
  HERO_MEDIA,
  OutcomeItem,
  VEHICLE_TRACKING_CASE_STUDY_PATH,
  VEHICLE_TRACKING_OUTCOMES,
  VEHICLE_TRACKING_SCREENS,
  VEHICLE_TRACKING_STACK,
} from "@/src/data/home.data";

function OutcomeIcon({ name }: { name: OutcomeItem["iconName"] }) {
  if (name === "shield") {
    return <ShieldCheck className="h-4 w-4 text-[#0077b6]" />;
  }
  if (name === "bell") {
    return <BellRing className="h-4 w-4 text-[#0077b6]" />;
  }
  return <ClipboardList className="h-4 w-4 text-[#0077b6]" />;
}

export default function FlagshipSpotlight() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useLightHeaderSection(sectionRef);

  const [activeTabId, setActiveTabId] = useState<string>(
    VEHICLE_TRACKING_SCREENS[0].id
  );
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const activeScreen =
    VEHICLE_TRACKING_SCREENS.find((item) => item.id === activeTabId) ??
    VEHICLE_TRACKING_SCREENS[0];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="flagship-spotlight-heading"
      className="is-light-section relative w-full bg-[#edeae4] text-[#0a1628] py-28 md:py-36 overflow-x-clip"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2.5">
            <span className="h-px w-7 bg-[#0077b6]" />
            <span className="font-dm-mono text-[11px] sm:text-xs font-medium uppercase tracking-[0.18em] text-[#0077b6]">
              FLAGSHIP SYSTEM · REAL-TIME SECURITY &amp; MONITORING
            </span>
          </div>

          <h2
            id="flagship-spotlight-heading"
            className="!m-0 mt-4 font-syne text-3xl sm:text-4xl lg:text-[2.95rem] font-bold !leading-[1.08] !tracking-[-0.03em] text-[#0a1628]"
          >
            Smart Society Vehicle Tracking &amp; Automated Parking Enforcement.
          </h2>

          <p className="mt-4 max-w-2xl font-manrope text-base sm:text-lg leading-relaxed text-[#0a1628]/[0.72]">
            Replaces manual paper gate registers with a connected Guard Mobile
            App and Web Monitoring Console—delivering instant resident pass
            verification and unauthorized vehicle alerts in seconds.
          </p>
        </motion.div>

        {/* 2-Column Editorial Architecture Layout */}
        <div className="mt-14 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-start">
          {/* Left Column (7 cols): Unified Dark Console + Sliding Segmented Tab Dock */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl bg-[#0a1628] p-4 sm:p-6 shadow-[0_28px_70px_rgba(10,22,40,0.18)] ring-1 ring-[#0a1628]/10">
              {/* Top Console Telemetry Bar */}
              <div className="mb-4 flex items-center justify-between gap-2 px-1">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00aaff] shadow-[0_0_8px_#00aaff]" />
                  <span className="font-dm-mono text-[10px] uppercase tracking-[0.16em] text-[#edeae4]/90">
                    Web Console + Guard App
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  aria-label={`Zoom ${activeScreen.fullTitle} mobile screen`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-3 py-1 font-dm-mono text-[10px] uppercase tracking-[0.12em] text-[#00aaff] transition-colors cursor-pointer"
                >
                  <Maximize2 className="h-3 w-3" />
                  <span>Inspect Screen</span>
                </button>
              </div>

              {/* Dual-Device Stage */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                {/* Browser Walkthrough Video */}
                <div className="sm:col-span-8">
                  <div className="overflow-hidden rounded-2xl ring-1 ring-white/10 bg-[#07101f]">
                    <BrowserFrame>
                      <ViewportVideo
                        src={HERO_MEDIA.video}
                        poster={HERO_MEDIA.poster}
                        ariaLabel="Smart Society Vehicle Tracking system demo"
                        className="h-full w-full object-cover"
                      />
                    </BrowserFrame>
                  </div>
                </div>

                {/* Synced Phone Frame Preview */}
                <div className="sm:col-span-4 flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    aria-label={`Inspect ${activeScreen.fullTitle} mobile screen`}
                    className="group relative w-[160px] sm:w-full max-w-[182px] cursor-pointer focus:outline-none"
                  >
                    <div className="transition-transform duration-300 group-hover:-translate-y-1">
                      <PhoneFrame>
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={activeScreen.id}
                            src={activeScreen.image}
                            alt={`Society Vehicle Tracking — ${activeScreen.fullTitle}`}
                            initial={{ opacity: 0.3, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0.3 }}
                            transition={{ duration: 0.22 }}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </AnimatePresence>
                      </PhoneFrame>
                    </div>
                  </button>
                </div>
              </div>

              {/* Active Screen Caption */}
              <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
                <p className="font-manrope text-xs sm:text-[13px] text-[#a6b0c0]">
                  <strong className="text-[#edeae4] font-semibold">
                    {activeScreen.fullTitle}:
                  </strong>{" "}
                  {activeScreen.caption}
                </p>
              </div>

              {/* Unified Dark Glass Segmented Tab Dock with Sliding Pill (Zero Truncation) */}
              <div
                role="tablist"
                aria-label="Vehicle Tracking Mobile App Screens"
                className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5"
              >
                {VEHICLE_TRACKING_SCREENS.map((tab) => {
                  const isSelected = tab.id === activeScreen.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveTabId(tab.id)}
                      className="relative flex items-center justify-center rounded-xl py-2.5 px-2 font-dm-mono text-[11px] uppercase tracking-[0.08em] transition-colors cursor-pointer select-none focus:outline-none"
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="activeScreenTab"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                          }}
                          className="absolute inset-0 rounded-xl bg-[#00aaff] shadow-[0_4px_18px_rgba(0,170,255,0.35)]"
                        />
                      )}
                      <span
                        className={`relative z-10 font-medium whitespace-nowrap ${
                          isSelected
                            ? "text-[#0a1628] font-bold"
                            : "text-[#edeae4]/75 hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column (5 cols): Editorial Architectural Spec Sheet directly on #edeae4 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="flex items-center justify-between pb-4">
              <span className="font-dm-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a1628]/60">
                OPERATIONAL ARCHITECTURE
              </span>
              <span className="font-dm-mono text-[11px] uppercase tracking-[0.14em] text-[#0077b6]">
                03 CORE MODULES
              </span>
            </div>

            {/* Crisp Hairline Spec Rows */}
            <div className="divide-y divide-[#0a1628]/15 border-y border-[#0a1628]/15">
              {VEHICLE_TRACKING_OUTCOMES.map((outcome) => (
                <div
                  key={outcome.id}
                  className="py-6 flex items-start gap-4 group"
                >
                  <span className="mt-0.5 font-dm-mono text-xs font-medium tracking-[0.14em] text-[#0077b6] tabular-nums shrink-0">
                    {outcome.index}
                  </span>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-syne text-lg sm:text-xl font-bold tracking-tight text-[#0a1628]">
                        {outcome.title}
                      </h3>
                      <OutcomeIcon name={outcome.iconName} />
                    </div>
                    <p className="mt-1.5 font-manrope text-sm sm:text-[15px] leading-relaxed text-[#0a1628]/[0.72]">
                      {outcome.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Production Tech Stack Row */}
            <div className="mt-7">
              <span className="block font-dm-mono text-[10px] uppercase tracking-[0.18em] text-[#0a1628]/55 mb-3">
                PRODUCTION STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {VEHICLE_TRACKING_STACK.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[#0a1628]/18 bg-transparent px-3.5 py-1.5 font-dm-mono text-[11px] font-medium text-[#0a1628]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Editorial Action Row */}
            <div className="mt-9">
              <Link
                href={VEHICLE_TRACKING_CASE_STUDY_PATH}
                style={{ color: "#edeae4" }}
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-[#0a1628] hover:bg-[#122644] px-8 py-4 font-manrope text-sm sm:text-[15px] font-bold !text-[#edeae4] shadow-[0_12px_30px_rgba(10,22,40,0.18)] transition-all duration-200 active:scale-[0.98]"
              >
                <span>View Case Study</span>
                <ArrowRight className="h-4 w-4 text-[#00aaff] transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal for Full-Resolution Mobile Screen Inspection */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0a1628]/90 backdrop-blur-md p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeScreen.fullTitle} preview`}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-md flex-col items-center rounded-3xl border border-white/15 bg-[#0e2038] p-5 text-[#edeae4] shadow-2xl"
            >
              <div className="mb-3 flex w-full items-center justify-between">
                <div>
                  <span className="font-dm-mono text-[10px] uppercase tracking-[0.16em] text-[#00aaff]">
                    Mobile App Screen
                  </span>
                  <h4 className="font-syne text-lg font-bold text-[#edeae4]">
                    {activeScreen.fullTitle}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  aria-label="Close preview"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 hover:bg-white/20 text-[#edeae4] cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[70vh] overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={activeScreen.image}
                  alt={activeScreen.fullTitle}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <p className="mt-3 text-center font-manrope text-xs text-[#a6b0c0]">
                {activeScreen.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
