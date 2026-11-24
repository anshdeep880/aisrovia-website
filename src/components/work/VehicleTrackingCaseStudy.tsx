"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BellRing,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CloudUpload,
  FileSearch,
  FlaskConical,
  Home,
  KeyRound,
  Maximize2,
  Monitor,
  RotateCcw,
  ShieldCheck,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import BrowserFrame from "@/src/components/work/BrowserFrame";
import PhoneFrame from "@/src/components/work/PhoneFrame";
import BorderBeam from "@/src/components/home/ui/BorderBeam";
import { projects } from "@/src/data/projects";
import {
  EngineeringModule,
  StakeholderCard,
  VT_ENGINEERING_MODULES,
  VT_MOBILE_SCREENS,
  VT_PIPELINE_NODES,
  VT_POSTER_SRC,
  VT_STAKEHOLDERS,
  VT_VIDEO_SRC,
} from "@/src/data/vehicle-tracking.data";

const ZOOM_STEPS = [1, 1.5, 2, 2.5] as const;

function StakeholderIcon({ type }: { type: StakeholderCard["icon"] }) {
  if (type === "guard") return <ShieldCheck className="h-6 w-6" />;
  if (type === "admin") return <Building2 className="h-6 w-6" />;
  return <Home className="h-6 w-6" />;
}

function ModuleIcon({ type }: { type: EngineeringModule["icon"] }) {
  switch (type) {
    case "console":
      return <Monitor className="h-5 w-5" />;
    case "alert":
      return <BellRing className="h-5 w-5" />;
    case "storage":
      return <CloudUpload className="h-5 w-5" />;
    case "pass":
      return <KeyRound className="h-5 w-5" />;
    case "logs":
      return <FileSearch className="h-5 w-5" />;
    case "test":
      return <FlaskConical className="h-5 w-5" />;
  }
}

export default function VehicleTrackingCaseStudy() {
  const [isHeroInView, setIsHeroInView] = useState(true);
  const heroRef = useRef<HTMLElement | null>(null);

  // Interactive Mobile App Tour + Zoom Lightbox State
  const [activeScreenIdx, setActiveScreenIdx] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const dragStartRef = useRef<{
    x: number;
    y: number;
    scrollLeft: number;
    scrollTop: number;
  } | null>(null);

  const activeScreen = VT_MOBILE_SCREENS[activeScreenIdx] ?? VT_MOBILE_SCREENS[0];

  // Track Chapter 01 Hero visibility to style bottom-left breadcrumb pill
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const resetViewportScroll = useCallback(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => {
      const next = ZOOM_STEPS.find((z) => z > prev);
      return next ?? prev;
    });
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => {
      const reversed = [...ZOOM_STEPS].reverse();
      const next = reversed.find((z) => z < prev);
      if (next === 1) resetViewportScroll();
      return next ?? prev;
    });
  }, [resetViewportScroll]);

  const handleResetZoom = useCallback(() => {
    setZoomLevel(1);
    resetViewportScroll();
  }, [resetViewportScroll]);

  const goToPrevScreen = useCallback(() => {
    setZoomLevel(1);
    resetViewportScroll();
    setActiveScreenIdx(
      (prev) => (prev - 1 + VT_MOBILE_SCREENS.length) % VT_MOBILE_SCREENS.length
    );
  }, [resetViewportScroll]);

  const goToNextScreen = useCallback(() => {
    setZoomLevel(1);
    resetViewportScroll();
    setActiveScreenIdx((prev) => (prev + 1) % VT_MOBILE_SCREENS.length);
  }, [resetViewportScroll]);

  const openLightboxAt = (index: number) => {
    setActiveScreenIdx(index);
    setZoomLevel(1);
    setLightboxOpen(true);
  };

  // Keyboard navigation & scroll lock when Lightbox is open
  useEffect(() => {
    if (!lightboxOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevScreen();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNextScreen();
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === "0") {
        e.preventDefault();
        handleResetZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    lightboxOpen,
    goToPrevScreen,
    goToNextScreen,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
  ]);

  // Mouse drag-to-pan support inside zoomed lightbox
  const handlePointerDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel <= 1 || !viewportRef.current) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: viewportRef.current.scrollLeft,
      scrollTop: viewportRef.current.scrollTop,
    };
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current || !viewportRef.current) return;
    e.preventDefault();
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    viewportRef.current.scrollLeft = dragStartRef.current.scrollLeft - dx;
    viewportRef.current.scrollTop = dragStartRef.current.scrollTop - dy;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  // Curated related ecosystems (exclude self)
  const recommendedProjects = projects
    .filter((p) => p.id !== "vehicle-tracking-system" && p.variant === "web")
    .slice(0, 2);

  const cardGradients: Record<string, string> = {
    "the-juicist": "from-[#1565c0] to-[#0d4fa0]",
    "jwellery-management": "from-[#5c4033] to-[#8b5a2b]",
    "security-management": "from-[#0f2942] to-[#1e4976]",
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f7fb] text-[#0a1628] flex flex-col font-manrope selection:bg-[#00aaff] selection:text-white overflow-x-clip">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes vt-pipeline-pulse {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(350%); }
            }
          `,
        }}
      />

      {/* =====================================================================
          CHAPTER 01 — HERO SHOWCASE (Deep Blue/Navy Gradient)
         ===================================================================== */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen pt-8 pb-20 md:pb-32 px-6 md:px-12 lg:px-16 xl:px-20 flex flex-col justify-between bg-[radial-gradient(circle_at_top,_#1565c0_0%,_#0a3d73_55%,_#06182c_100%)] text-white overflow-hidden"
      >
        {/* Subtle Architectural Grid Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 40%, #000 20%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 40%, #000 20%, transparent 80%)",
          }}
        />

        {/* Top Back Navigation */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex justify-between items-center mb-12 sm:mb-16">
          <Link
            href="/work"
            style={{ color: "#ffffff" }}
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] hover:bg-white/[0.14] backdrop-blur-md px-4 py-2 text-xs font-dm-mono uppercase tracking-widest !text-white transition-all"
          >
            <span className="inline-block transform group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            <span>ALL WORK</span>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#00aaff]/40 bg-[#0a1628]/50 backdrop-blur-md px-3.5 py-1.5 font-dm-mono text-[10px] uppercase tracking-[0.16em] text-[#7dd3fc]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00aaff] animate-pulse" />
            Dual-App Live Architecture
          </span>
        </div>

        {/* Hero Copy + Live Video Browser Showcase */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-10 md:gap-14 flex-grow justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 max-w-4xl text-left"
          >
            <span className="font-dm-mono text-xs uppercase tracking-[0.18em] text-[#7dd3fc] select-none">
              VEHICLE TRACKING SYSTEM · 2026 · WEB CONSOLE, MOBILE APP,
              REAL-TIME SECURITY
            </span>
            <h1 className="!m-0 font-syne text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold !tracking-[-0.03em] !leading-[1.05] text-white">
              Society Vehicle Tracking &amp; Smart Parking Enforcement
            </h1>
            <p className="text-base sm:text-xl md:text-[1.3rem] text-white/85 font-manrope max-w-3xl leading-relaxed mt-2">
              A connected dual-app security ecosystem uniting a Gate Mobile App
              and a TypeScript/React Web Monitoring Console to verify resident
              passes, capture unknown vehicle evidence, and trigger instant
              violation alerts.
            </p>
          </motion.div>

          {/* Centered BrowserFrame with BorderBeam */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full rounded-2xl p-2 bg-[#071426]/90 border border-white/15 shadow-[0_32px_90px_rgba(0,0,0,0.6)]"
          >
            <BorderBeam durationSeconds={9} borderWidth={1.5} />
            <div className="relative z-10 overflow-hidden rounded-xl">
              <BrowserFrame>
                <div className="relative w-full aspect-[16/9] bg-[#06101e]">
                  <video
                    src={VT_VIDEO_SRC}
                    poster={VT_POSTER_SRC}
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    controls={false}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
              </BrowserFrame>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          CHAPTER 02 — THE STORY & KEY NUMBERS
         ===================================================================== */}
      <section className="w-full py-20 md:py-32 px-6 md:px-12 lg:px-16 xl:px-20 bg-[#f4f7fb] border-b border-[#0a1628]/8">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-1.5">
            <span className="font-dm-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#0077b6]">
              Chapter 02
            </span>
            <h2 className="!m-0 font-syne text-3xl sm:text-4xl font-bold !tracking-[-0.03em] text-[#0a1628]">
              The Story
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-[#0a1628]/90 text-base sm:text-lg leading-relaxed font-manrope">
              <p>
                Residential societies and commercial complexes still rely on
                paper gate registers, faded windshield stickers, and manual
                guard calls to track hundreds of daily vehicles. Unauthorized
                vehicles slip in unnoticed, expired resident passes go
                unchecked, and when disputes occur, management has zero
                timestamped or visual proof.
              </p>
              <p>
                We engineered a unified real-time platform connecting two live
                surfaces—a fast Guard &amp; Operations Mobile App and a
                centralized Web Monitoring Console (
                <code className="rounded bg-[#0a1628]/[0.06] px-1.5 py-0.5 font-dm-mono text-[0.9em] text-[#0a1628]">
                  monitoring-web
                </code>
                )—backed by Firebase. Every vehicle entry is cross-checked
                instantly against live parking passes, automatically flagging{" "}
                <code className="rounded bg-red-500/10 px-1.5 py-0.5 font-dm-mono text-[0.88em] text-red-700">
                  NO_PASS
                </code>{" "}
                and{" "}
                <code className="rounded bg-amber-500/15 px-1.5 py-0.5 font-dm-mono text-[0.88em] text-amber-800">
                  PASS_EXPIRED
                </code>{" "}
                violations with cloud-stored photo evidence and real-time push
                alerts.
              </p>
            </div>

            {/* Right Elevated Metadata Card */}
            <div className="lg:col-span-5 bg-white border border-[#0a1628]/8 p-8 sm:p-10 rounded-3xl shadow-[0_16px_40px_-15px_rgba(10,22,40,0.06)]">
              <div className="divide-y divide-[#0a1628]/10 font-manrope text-sm text-[#0a1628]">
                <div className="pb-4 flex flex-col gap-1">
                  <span className="font-dm-mono text-[10px] uppercase tracking-[0.16em] text-[#0a1628]/45">
                    ROLE
                  </span>
                  <span className="font-semibold text-sm sm:text-[15px]">
                    Full-Stack Engineer &amp; Systems Architect
                  </span>
                </div>

                <div className="py-4 flex flex-col gap-1">
                  <span className="font-dm-mono text-[10px] uppercase tracking-[0.16em] text-[#0a1628]/45">
                    DEPLOYMENT
                  </span>
                  <span className="font-semibold text-sm sm:text-[15px]">
                    Residential Societies &amp; Gated Complexes
                  </span>
                </div>

                <div className="py-4 flex flex-col gap-1">
                  <span className="font-dm-mono text-[10px] uppercase tracking-[0.16em] text-[#0a1628]/45">
                    SCOPE
                  </span>
                  <span className="font-semibold text-sm sm:text-[15px]">
                    Web Monitoring Console · Mobile App · Cloud Alerts ·
                    Evidence Storage
                  </span>
                </div>

                <div className="pt-4 flex flex-col gap-1">
                  <span className="font-dm-mono text-[10px] uppercase tracking-[0.16em] text-[#0a1628]/45">
                    YEAR
                  </span>
                  <span className="font-semibold text-sm sm:text-[15px]">
                    2026
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Impact Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-10 border-t border-[#0a1628]/10">
            <div className="flex flex-col gap-2 p-8 bg-white border border-[#0a1628]/8 rounded-3xl shadow-sm text-center hover:border-[#00aaff]/35 hover:shadow-md transition-all duration-300">
              <span className="font-syne text-4xl lg:text-5xl font-extrabold text-[#00aaff]">
                2
              </span>
              <span className="font-dm-mono text-xs uppercase tracking-[0.14em] text-[#0a1628]/65 mt-1">
                CONNECTED LIVE APPS (WEB + MOBILE)
              </span>
            </div>

            <div className="flex flex-col gap-2 p-8 bg-white border border-[#0a1628]/8 rounded-3xl shadow-sm text-center hover:border-[#00aaff]/35 hover:shadow-md transition-all duration-300">
              <span className="font-syne text-4xl lg:text-5xl font-extrabold text-[#00aaff]">
                &lt; 2s
              </span>
              <span className="font-dm-mono text-xs uppercase tracking-[0.14em] text-[#0a1628]/65 mt-1">
                VIOLATION ALERT DELIVERY (FCM)
              </span>
            </div>

            <div className="flex flex-col gap-2 p-8 bg-white border border-[#0a1628]/8 rounded-3xl shadow-sm text-center hover:border-[#00aaff]/35 hover:shadow-md transition-all duration-300">
              <span className="font-syne text-4xl lg:text-5xl font-extrabold text-[#00aaff]">
                100%
              </span>
              <span className="font-dm-mono text-xs uppercase tracking-[0.14em] text-[#0a1628]/65 mt-1">
                DIGITAL, PHOTO-VERIFIED AUDIT TRAIL
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CHAPTER 03 — INTERACTIVE MOBILE APP TOUR + ZOOM LIGHTBOX
         ===================================================================== */}
      <section className="w-full py-20 md:py-32 px-6 md:px-12 lg:px-16 xl:px-20 bg-[#f4f7fb] border-b border-[#0a1628]/8">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-2 max-w-3xl">
            <span className="font-dm-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#0077b6]">
              Chapter 03
            </span>
            <h2 className="!m-0 font-syne text-3xl sm:text-4xl font-bold !tracking-[-0.03em] text-[#0a1628]">
              Inside the Companion Mobile App.
            </h2>
            <p className="mt-1 font-manrope text-base sm:text-lg text-[#0a1628]/72 leading-relaxed">
              Switch between live production screens below and click any screen
              to inspect it with interactive zoom controls.
            </p>
          </div>

          {/* Dark Navy Interactive Showcase Container */}
          <div className="relative overflow-hidden rounded-3xl bg-[#0a1628] text-[#edeae4] p-6 sm:p-8 md:p-12 shadow-[0_30px_80px_rgba(10,22,40,0.20)] border border-[#0a1628]">
            {/* Ambient Cyan Radial Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/4 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(0,170,255,0.18)_0%,transparent_70%)] blur-2xl"
            />

            {/* 2-Column Showcase Stage */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left (5 cols): High-Clarity Framed Phone Preview + Floating Zoom Button */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative group">
                  <button
                    type="button"
                    onClick={() => openLightboxAt(activeScreenIdx)}
                    aria-label={`Open ${activeScreen.title} in interactive zoom lightbox`}
                    className="relative block w-[220px] sm:w-[255px] cursor-zoom-in focus:outline-none transition-transform duration-300 group-hover:-translate-y-1"
                  >
                    <div className="rounded-[40px] p-1 bg-gradient-to-b from-[#00aaff]/45 via-white/15 to-white/5 shadow-[0_24px_60px_rgba(0,0,0,0.65)]">
                      <PhoneFrame>
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={activeScreen.id}
                            src={activeScreen.image}
                            alt={activeScreen.title}
                            initial={{ opacity: 0.25, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0.25 }}
                            transition={{ duration: 0.24 }}
                            className="h-full w-full object-cover"
                          />
                        </AnimatePresence>
                      </PhoneFrame>
                    </div>

                    {/* Floating Zoom / Inspect Affordance Pill */}
                    <span className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#00aaff]/50 bg-[#0a1628]/90 backdrop-blur-md px-4 py-2 font-dm-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#edeae4] shadow-[0_10px_25px_rgba(0,0,0,0.6)] group-hover:bg-[#00aaff] group-hover:text-[#0a1628] group-hover:font-bold transition-all duration-200">
                      <Maximize2 className="h-3 w-3" />
                      <span>Zoom / Inspect ⤢</span>
                    </span>
                  </button>
                </div>
              </div>

              {/* Right (7 cols): Animated Screen Details Panel */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScreen.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#00aaff]/35 bg-[#00aaff]/12 px-3.5 py-1 font-dm-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#00aaff]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00aaff]" />
                        {activeScreen.badge}
                      </span>

                      <span className="font-dm-mono text-xs text-[#a6b0c0] tabular-nums">
                        0{activeScreenIdx + 1} / 0{VT_MOBILE_SCREENS.length}
                      </span>
                    </div>

                    <h3 className="mt-5 font-syne text-2xl sm:text-3xl lg:text-[2.15rem] font-bold tracking-tight leading-[1.12] text-[#edeae4]">
                      {activeScreen.title}
                    </h3>

                    <p className="mt-3.5 font-manrope text-sm sm:text-base leading-relaxed text-[#a6b0c0] max-w-2xl">
                      {activeScreen.summary}
                    </p>

                    <ul className="mt-6 flex flex-col gap-3.5 border-t border-white/10 pt-6">
                      {activeScreen.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 font-manrope text-sm sm:text-[15px] text-[#edeae4]/90"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00aaff]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Secondary Action Bar */}
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => openLightboxAt(activeScreenIdx)}
                        className="inline-flex items-center gap-2 rounded-full bg-[#00aaff] hover:bg-[#1ab4ff] px-5 py-2.5 font-manrope text-xs sm:text-sm font-bold text-[#0a1628] shadow-[0_8px_24px_rgba(0,170,255,0.3)] transition-all cursor-pointer active:scale-[0.98]"
                      >
                        <ZoomIn className="h-4 w-4" />
                        <span>Inspect Full Resolution</span>
                      </button>

                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={goToPrevScreen}
                          aria-label="Previous mobile screen"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.12] text-[#edeae4] transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={goToNextScreen}
                          aria-label="Next mobile screen"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.12] text-[#edeae4] transition-colors cursor-pointer"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom 5-Screen Segmented Tab Switcher (Zero Truncation + layoutId Pill) */}
            <div
              role="tablist"
              aria-label="Companion Mobile App Screens"
              className="relative z-10 mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5"
            >
              {VT_MOBILE_SCREENS.map((screen, idx) => {
                const isSelected = idx === activeScreenIdx;
                return (
                  <button
                    key={screen.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveScreenIdx(idx)}
                    className="relative flex items-center justify-center gap-2 rounded-xl py-3 px-3 font-dm-mono text-[11px] uppercase tracking-[0.08em] transition-colors cursor-pointer select-none focus:outline-none"
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="vtCaseStudyActiveTab"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                        className="absolute inset-0 rounded-xl bg-[#00aaff] shadow-[0_4px_18px_rgba(0,170,255,0.35)]"
                      />
                    )}
                    <span
                      className={`relative z-10 whitespace-nowrap ${
                        isSelected
                          ? "text-[#0a1628] font-bold"
                          : "text-[#edeae4]/75 hover:text-white font-medium"
                      }`}
                    >
                      {screen.tabLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CHAPTER 04 — BUILT FOR EVERY STAKEHOLDER (Pain -> Fix Cards)
         ===================================================================== */}
      <section className="w-full py-20 md:py-32 px-6 md:px-12 lg:px-16 xl:px-20 bg-[#f4f7fb] border-b border-[#0a1628]/8">
        <div className="max-w-7xl mx-auto flex flex-col gap-14">
          <div className="flex flex-col gap-2 max-w-3xl">
            <span className="font-dm-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#0077b6]">
              Chapter 04
            </span>
            <h2 className="!m-0 font-syne text-3xl sm:text-4xl font-bold !tracking-[-0.03em] text-[#0a1628] leading-tight">
              Three stakeholders, one live source of truth.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {VT_STAKEHOLDERS.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between bg-white border border-[#0a1628]/8 hover:border-[#00aaff]/35 p-7 sm:p-8 rounded-3xl shadow-[0_12px_32px_-15px_rgba(10,22,40,0.06)] hover:shadow-[0_22px_45px_-15px_rgba(10,22,40,0.10)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#00aaff]/10 flex items-center justify-center text-[#0077b6]">
                    <StakeholderIcon type={item.icon} />
                  </div>

                  <div>
                    <h3 className="font-syne text-xl font-bold text-[#0a1628]">
                      {item.role}
                    </h3>
                    <span className="mt-0.5 inline-block font-dm-mono text-[10px] uppercase tracking-[0.16em] text-[#0077b6] font-medium">
                      {item.surfaceTag}
                    </span>
                  </div>

                  <p className="text-sm text-[#0a1628]/75 leading-relaxed font-manrope">
                    {item.summary}
                  </p>
                </div>

                {/* Upgraded Pain -> Fix Pair */}
                <div className="mt-7 flex flex-col gap-3">
                  {/* THE PAIN */}
                  <div className="p-4 rounded-2xl bg-[#fff5f5] border border-red-200/70 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span className="font-dm-mono text-[10px] font-bold text-red-700 uppercase tracking-[0.14em]">
                        THE PAIN
                      </span>
                    </div>
                    <p className="text-xs text-red-950/85 leading-relaxed font-medium">
                      {item.pain}
                    </p>
                  </div>

                  {/* THE FIX */}
                  <div className="p-4 rounded-2xl bg-[#ecfeff] border border-cyan-300/60 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0077b6] shrink-0" />
                      <span className="font-dm-mono text-[10px] font-bold text-[#0077b6] uppercase tracking-[0.14em]">
                        THE FIX
                      </span>
                    </div>
                    <p className="text-xs text-[#0a1628]/90 leading-relaxed font-semibold">
                      {item.fix}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          CHAPTER 05 — ARCHITECTURE & HOW IT WAS BUILT
         ===================================================================== */}
      <section className="w-full py-20 md:py-32 px-6 md:px-12 lg:px-16 xl:px-20 bg-[#f4f7fb] border-b border-[#0a1628]/8">
        <div className="max-w-7xl mx-auto flex flex-col gap-14">
          <div className="flex flex-col gap-1.5">
            <span className="font-dm-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#0077b6]">
              Chapter 05
            </span>
            <h2 className="!m-0 font-syne text-3xl sm:text-4xl font-bold !tracking-[-0.03em] text-[#0a1628]">
              How It Was Built
            </h2>
          </div>

          {/* Technical Approach Callout */}
          <div className="max-w-4xl rounded-r-2xl bg-white border border-[#0a1628]/8 border-l-4 border-l-[#00aaff] p-6 sm:p-8 shadow-sm">
            <h3 className="font-syne text-xl font-bold text-[#0a1628] mb-2.5">
              Technical Approach
            </h3>
            <p className="text-[#0a1628]/85 text-base sm:text-lg leading-relaxed font-manrope">
              Built with a TypeScript-first <strong>React + Vite</strong> Web
              Monitoring Console (
              <code className="rounded bg-[#0a1628]/[0.06] px-1.5 py-0.5 font-dm-mono text-[0.88em]">
                monitoring-web
              </code>
              ) tested with <strong>Vitest</strong>, paired with a
              cross-platform <strong>Mobile App</strong> and a serverless{" "}
              <strong>Firebase</strong> backend.{" "}
              <strong>Cloud Firestore</strong> powers real-time{" "}
              <code className="rounded bg-[#0a1628]/[0.06] px-1.5 py-0.5 font-dm-mono text-[0.88em]">
                parkingLogs
              </code>{" "}
              and{" "}
              <code className="rounded bg-[#0a1628]/[0.06] px-1.5 py-0.5 font-dm-mono text-[0.88em]">
                parkingPasses
              </code>{" "}
              streams, <strong>Firebase Storage</strong> securely persists
              unknown-vehicle evidence images, and{" "}
              <strong>Firebase Cloud Messaging (FCM)</strong> dispatches
              sub-second violation alerts.
            </p>
          </div>

          {/* Visual 4-Node Real-Time Event Pipeline Strip */}
          <div className="rounded-3xl bg-[#0a1628] text-[#edeae4] p-6 sm:p-8 md:p-10 shadow-[0_24px_60px_rgba(10,22,40,0.14)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
              <span className="font-dm-mono text-xs uppercase tracking-[0.18em] text-[#00aaff]">
                REAL-TIME EVENT PIPELINE
              </span>
              <span className="font-dm-mono text-[11px] uppercase tracking-[0.14em] text-[#a6b0c0]">
                GATE ENTRY → FIRESTORE → FCM DISPATCH
              </span>
            </div>

            {/* Animated Desktop Connector Rail */}
            <div
              aria-hidden="true"
              className="hidden lg:block relative mb-7 h-px w-full bg-white/15 overflow-hidden"
            >
              <div
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#00aaff] to-transparent will-change-transform"
                style={{
                  animation: "vt-pipeline-pulse 4s ease-in-out infinite",
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {VT_PIPELINE_NODES.map((node) => (
                <div
                  key={node.step}
                  className="relative rounded-2xl border border-white/12 bg-white/[0.04] p-5 flex flex-col gap-2.5"
                >
                  <div className="hidden lg:flex items-center justify-center absolute -top-[35px] left-6 h-3.5 w-3.5 rounded-full bg-[#0a1628] ring-1 ring-[#00aaff]/70">
                    <span className="h-2 w-2 rounded-full bg-[#00aaff] shadow-[0_0_10px_#00aaff]" />
                  </div>

                  <span className="font-dm-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#00aaff]">
                    {node.step} · STAGE
                  </span>
                  <h4 className="font-syne text-lg font-bold text-[#edeae4]">
                    {node.title}
                  </h4>
                  <p className="font-manrope text-xs sm:text-sm leading-relaxed text-[#a6b0c0]">
                    {node.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 6 Core Engineering Module Cards (3x2 Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {VT_ENGINEERING_MODULES.map((mod) => (
              <div
                key={mod.id}
                className="p-7 sm:p-8 bg-white border border-[#0a1628]/8 hover:border-[#00aaff]/35 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.09)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#00aaff]/10 text-[#0077b6] flex items-center justify-center">
                  <ModuleIcon type={mod.icon} />
                </div>
                <h4 className="font-syne text-lg font-bold text-[#0a1628]">
                  {mod.title}
                </h4>
                <p className="text-sm text-[#0a1628]/72 leading-relaxed font-manrope">
                  {mod.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          CHAPTER 06 — THE ENGINEERING CHALLENGE
         ===================================================================== */}
      <section className="w-full py-20 md:py-32 px-6 md:px-12 lg:px-16 xl:px-20 bg-[#f4f7fb] border-b border-[#0a1628]/8">
        <div className="max-w-3xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-1.5 text-center">
            <span className="font-dm-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#0077b6]">
              Chapter 06
            </span>
            <h2 className="!m-0 font-syne text-3xl sm:text-4xl font-bold !tracking-[-0.03em] text-[#0a1628]">
              The Challenge
            </h2>
          </div>

          <blockquote className="rounded-3xl bg-white border border-[#0a1628]/10 p-7 sm:p-9 text-center shadow-sm">
            <p className="font-syne text-lg sm:text-2xl font-bold leading-snug text-[#0a1628]">
              &ldquo;Guaranteeing real-time violation alerts and reliable
              evidence photo uploads at the gate—even under flaky mobile
              connections—was the core engineering challenge.&rdquo;
            </p>
          </blockquote>

          <div className="flex flex-col gap-6 text-[#0a1628]/88 text-base sm:text-lg leading-relaxed font-manrope">
            <p>
              Gate security environments suffer from inconsistent cellular
              signal and rapid back-to-back vehicle entries. If uploading an
              unknown vehicle&apos;s evidence image to Firebase Storage blocked
              or failed silently, either the guard&apos;s workflow stalled or
              admins received alerts without photographic proof.
            </p>
            <p>
              We solved this by decoupling visit logging from media persistence:
              Firestore records the entry and triggers real-time{" "}
              <code className="rounded bg-[#0a1628]/[0.06] px-1.5 py-0.5 font-dm-mono text-[0.88em]">
                NO_PASS
              </code>{" "}
              /{" "}
              <code className="rounded bg-[#0a1628]/[0.06] px-1.5 py-0.5 font-dm-mono text-[0.88em]">
                PASS_EXPIRED
              </code>{" "}
              alert states immediately, while the Storage upload pipeline
              handles asynchronous image uploads with deterministic path binding
              and retry-safe attachment to the live{" "}
              <code className="rounded bg-[#0a1628]/[0.06] px-1.5 py-0.5 font-dm-mono text-[0.88em]">
                parkingLogs
              </code>{" "}
              record.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CHAPTER 07 — THE RESULTS, RELATED WORK & NEXT ACTION
         ===================================================================== */}
      <section className="w-full pt-20 md:pt-32 pb-36 px-6 md:px-12 lg:px-16 xl:px-20 bg-[#f4f7fb]">
        <div className="max-w-7xl mx-auto flex flex-col gap-20">
          {/* Results Block */}
          <div className="max-w-5xl mx-auto w-full flex flex-col gap-12 text-center">
            <div className="flex flex-col gap-1.5">
              <span className="font-dm-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#0077b6]">
                Chapter 07
              </span>
              <h2 className="!m-0 font-syne text-3xl sm:text-4xl font-bold !tracking-[-0.03em] text-[#0a1628]">
                The Results
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="flex flex-col items-center justify-center gap-3 p-8 sm:p-10 bg-white border border-[#0a1628]/8 rounded-3xl shadow-[0_12px_32px_-15px_rgba(10,22,40,0.06)]">
                <span className="font-syne text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0a1628]">
                  Zero
                </span>
                <span className="font-dm-mono text-[11px] uppercase tracking-[0.14em] text-[#0a1628]/55 leading-relaxed">
                  MANUAL PAPER GATE REGISTERS
                </span>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 p-8 sm:p-10 bg-white border border-[#0a1628]/8 rounded-3xl shadow-[0_12px_32px_-15px_rgba(10,22,40,0.06)]">
                <span className="font-syne text-4xl sm:text-5xl font-extrabold tracking-tight text-[#00aaff]">
                  Real-Time
                </span>
                <span className="font-dm-mono text-[11px] uppercase tracking-[0.14em] text-[#0a1628]/55 leading-relaxed">
                  NO_PASS &amp; PASS_EXPIRED FCM ALERTS
                </span>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 p-8 sm:p-10 bg-white border border-[#0a1628]/8 rounded-3xl shadow-[0_12px_32px_-15px_rgba(10,22,40,0.06)]">
                <span className="font-syne text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0a1628]">
                  100%
                </span>
                <span className="font-dm-mono text-[11px] uppercase tracking-[0.14em] text-[#0a1628]/55 leading-relaxed">
                  PHOTO-VERIFIED VIOLATION AUDIT TRAIL
                </span>
              </div>
            </div>
          </div>

          {/* High-Intent Conversion Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-[#0a1628] text-[#edeae4] px-6 py-14 sm:px-12 sm:py-18 text-center shadow-[0_26px_70px_rgba(10,22,40,0.18)]">
            <BorderBeam durationSeconds={9} borderWidth={1.5} />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[300px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,170,255,0.22)_0%,transparent_70%)] blur-2xl"
            />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <span className="font-dm-mono text-[10px] uppercase tracking-[0.18em] text-[#00aaff]">
                CUSTOM SECURITY &amp; OPERATIONS SOFTWARE
              </span>
              <h3 className="mt-3 font-syne text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.12] text-[#edeae4]">
                Need a custom monitoring, tracking, or security platform for
                your operations?
              </h3>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full sm:w-auto">
                <Link
                  href="/contact"
                  style={{ color: "#0a1628" }}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#00aaff] hover:bg-[#19b3ff] px-8 py-4 font-manrope text-sm sm:text-[15px] font-bold !text-[#0a1628] shadow-[0_10px_30px_rgba(0,170,255,0.32)] transition-all active:scale-[0.98]"
                >
                  <span>Start a Similar Project</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/work"
                  style={{ color: "#edeae4" }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#edeae4]/25 bg-white/[0.05] hover:bg-white/[0.12] px-8 py-4 font-manrope text-sm sm:text-[15px] font-semibold !text-[#edeae4] transition-all"
                >
                  <span>Explore More Work</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Other Digital Ecosystems */}
          <div className="flex flex-col gap-10 pt-4">
            <div className="flex justify-between items-end border-b border-[#0a1628]/10 pb-5">
              <div className="flex flex-col gap-1">
                <span className="font-dm-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#0a1628]/50">
                  Explore More Work
                </span>
                <h3 className="font-syne text-2xl sm:text-3xl font-bold tracking-tight text-[#0a1628]">
                  Other Digital Ecosystems
                </h3>
              </div>
              <Link
                href="/work"
                className="font-dm-mono text-xs uppercase tracking-widest text-[#0a1628] hover:text-[#0077b6] transition-colors pb-1"
              >
                View All Work →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
              {recommendedProjects.map((project) => {
                const bgGradient =
                  cardGradients[project.id] || "from-[#1e293b] to-[#475569]";
                return (
                  <Link
                    key={project.id}
                    href={project.href || `/work/${project.id}`}
                    className="group block w-full text-left"
                  >
                    <div className="flex flex-col gap-5 w-full">
                      <div
                        className={`rounded-3xl px-6 py-10 sm:py-16 bg-gradient-to-br ${bgGradient} border border-white/10 flex items-center justify-center shadow-[0_15px_35px_-15px_rgba(10,22,40,0.15)] group-hover:shadow-[0_25px_50px_-15px_rgba(10,22,40,0.25)] group-hover:-translate-y-1 transition-all duration-300`}
                      >
                        <div className="w-[85%] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                          <BrowserFrame>
                            <div className="relative w-full aspect-[16/9] bg-slate-900">
                              {project.video ? (
                                <video
                                  src={project.video}
                                  poster={project.image}
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  disablePictureInPicture
                                  controls={false}
                                  className="w-full h-full object-fill pointer-events-none"
                                />
                              ) : (
                                <img
                                  src={project.image}
                                  alt={project.name}
                                  className="w-full h-full object-fill pointer-events-none"
                                />
                              )}
                            </div>
                          </BrowserFrame>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 px-1">
                        <div className="flex justify-between items-center text-[10px] font-dm-mono uppercase tracking-wider text-[#0a1628]/50 select-none">
                          <span>
                            {project.client}{" "}
                            <span className="mx-1 opacity-40">·</span>{" "}
                            {project.category}
                          </span>
                          <span>{project.year}</span>
                        </div>
                        <h4 className="text-xl font-syne font-bold text-[#0a1628] group-hover:text-[#0077b6] transition-colors duration-300 flex items-center gap-1.5">
                          {project.name}
                          <span className="text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                            ↗
                          </span>
                        </h4>
                        <p className="text-sm text-[#0a1628]/70 font-manrope leading-relaxed">
                          {project.headline || project.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FLOATING BOTTOM-LEFT BREADCRUMB PILL (Matches /work/the-juicist)
         ===================================================================== */}
      <div className="hidden md:block fixed bottom-6 left-6 z-50 pointer-events-none">
        <div
          className={`pointer-events-auto px-4 py-2.5 rounded-full flex items-center gap-2.5 font-dm-mono text-xs shadow-md transition-all duration-300 border backdrop-blur-md ${
            isHeroInView
              ? "bg-white/10 text-white border-white/20"
              : "bg-white/85 text-[#0a1628] border-[#0a1628]/10"
          }`}
        >
          <Link
            href="/work"
            className="hover:underline transition-all flex items-center gap-1 font-semibold"
          >
            ← All Work
          </Link>
          <span className="opacity-40">|</span>
          <span className="opacity-80 font-medium">
            Vehicle Tracking System
          </span>
        </div>
      </div>

      {/* =====================================================================
          FULL-SCREEN INTERACTIVE ZOOM LIGHTBOX MODAL
         ===================================================================== */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeScreen.title} zoom inspector`}
            className="fixed inset-0 z-[10000] flex flex-col bg-[#060f1d]/95 backdrop-blur-xl text-[#edeae4]"
          >
            {/* Top Control Toolbar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#0a1628]/90 px-4 sm:px-6 py-3.5 shrink-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="rounded-full border border-[#00aaff]/40 bg-[#00aaff]/15 px-2.5 py-0.5 font-dm-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#00aaff] shrink-0">
                  0{activeScreenIdx + 1} / 0{VT_MOBILE_SCREENS.length}
                </span>
                <h4 className="font-syne text-sm sm:text-base font-bold text-[#edeae4] truncate">
                  {activeScreen.title}
                </h4>
              </div>

              {/* Zoom Controls (+, -, Reset 100%, Close) */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  aria-label="Zoom out"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] hover:bg-white/[0.14] disabled:opacity-35 disabled:cursor-not-allowed text-[#edeae4] transition-colors cursor-pointer"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={handleResetZoom}
                  aria-label="Reset zoom to 100%"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] hover:bg-white/[0.14] px-3 h-9 font-dm-mono text-xs font-medium text-[#edeae4] tabular-nums transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3 text-[#00aaff]" />
                  <span>{Math.round(zoomLevel * 100)}%</span>
                </button>

                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 2.5}
                  aria-label="Zoom in"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] hover:bg-white/[0.14] disabled:opacity-35 disabled:cursor-not-allowed text-[#edeae4] transition-colors cursor-pointer"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>

                <div className="mx-1 h-5 w-px bg-white/15" />

                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  aria-label="Close zoom inspector"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 hover:bg-red-500/80 hover:border-red-400 text-white transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Center Pan / Scroll Inspection Stage + Prev/Next Arrows */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex-1 overflow-hidden flex items-center justify-center"
            >
              {/* Previous Screen Floating Button */}
              <button
                type="button"
                onClick={goToPrevScreen}
                aria-label="Previous screen"
                className="absolute left-3 sm:left-6 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#0a1628]/85 hover:bg-[#00aaff] text-white hover:text-[#0a1628] shadow-xl backdrop-blur-md transition-all cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Scrollable / Pannable Viewport */}
              <div
                ref={viewportRef}
                onMouseDown={handlePointerDown}
                onMouseMove={handlePointerMove}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                className={`h-full w-full overflow-auto p-6 sm:p-10 flex ${
                  zoomLevel > 1
                    ? isDragging
                      ? "cursor-grabbing items-start justify-center"
                      : "cursor-grab items-start justify-center"
                    : "items-center justify-center"
                }`}
              >
                <div
                  onClick={() => {
                    if (zoomLevel === 1) {
                      setZoomLevel(2);
                    }
                  }}
                  style={{
                    width: `${Math.round(320 * zoomLevel)}px`,
                    maxWidth: zoomLevel === 1 ? "82vw" : "none",
                  }}
                  className={`transition-[width] duration-200 ease-out select-none shrink-0 ${
                    zoomLevel === 1 ? "cursor-zoom-in" : ""
                  }`}
                >
                  <img
                    src={activeScreen.image}
                    alt={activeScreen.title}
                    draggable={false}
                    className="w-full h-auto rounded-2xl border border-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.85)]"
                  />
                </div>
              </div>

              {/* Next Screen Floating Button */}
              <button
                type="button"
                onClick={goToNextScreen}
                aria-label="Next screen"
                className="absolute right-3 sm:right-6 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#0a1628]/85 hover:bg-[#00aaff] text-white hover:text-[#0a1628] shadow-xl backdrop-blur-md transition-all cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Bottom Quick Screen Strip */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="border-t border-white/10 bg-[#0a1628]/90 px-4 py-3 flex items-center justify-center gap-2 overflow-x-auto shrink-0"
            >
              {VT_MOBILE_SCREENS.map((tab, idx) => {
                const active = idx === activeScreenIdx;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setZoomLevel(1);
                      resetViewportScroll();
                      setActiveScreenIdx(idx);
                    }}
                    className={`rounded-full px-3.5 py-1.5 font-dm-mono text-[10px] uppercase tracking-[0.12em] whitespace-nowrap transition-all cursor-pointer ${
                      active
                        ? "bg-[#00aaff] text-[#0a1628] font-bold"
                        : "border border-white/15 bg-white/[0.04] text-[#edeae4]/75 hover:text-white"
                    }`}
                  >
                    {tab.tabLabel}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
