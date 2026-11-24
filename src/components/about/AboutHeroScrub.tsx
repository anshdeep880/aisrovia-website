"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import manifest from "@/src/data/frames-manifest.json";

// Re-implement the DPR-aware drawCover canvas utility
function drawCover(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  if (!image) return;
  const context = canvas.getContext("2d");
  if (!context) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const targetWidth = Math.round(width * dpr);
  const targetHeight = Math.round(height * dpr);

  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth;
    canvas.height = targetHeight;
  }

  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  context.clearRect(0, 0, width, height);
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  context.drawImage(
    image,
    (width - drawWidth) / 2,
    (height - drawHeight) / 2,
    drawWidth,
    drawHeight
  );
}

const PEOPLE = [
  { name: "Anshdeep Singh Randev", role: "Founder, AiSrovia" },
  { name: "Shahu Jagtap", role: "Mentor" },
  { name: "Kamlesh Shewale", role: "Lead Developer" },
  { name: "Shehnaz Rangrez", role: "UI/UX Designer" },
];

export default function AboutHeroScrub() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRefs = useRef<Array<HTMLDivElement | null>>([]);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const statsCtaRef = useRef<HTMLDivElement>(null);
  const mobileTitleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const updateOverlays = useCallback((warpedProgress: number) => {
    const totalFrames = 240; // Approx frames, just need > 0 check conceptually
    const progressPerSegment = warpedProgress * 6; // 6 segments

    for (let i = 0; i < 4; i++) {
      const el = nameRefs.current[i];
      if (el) {
        const center = i + 1.5;
        const dist = Math.abs(progressPerSegment - center);
        const opacity = Math.max(0, 1 - dist * 2.5);
        el.style.opacity = String(opacity);
        el.style.visibility = opacity > 0.01 ? "visible" : "hidden";
      }
    }

    const staticOpacity = Math.max(0, 1 - progressPerSegment);
    if (eyebrowRef.current) {
      eyebrowRef.current.style.opacity = String(staticOpacity);
      eyebrowRef.current.style.visibility = staticOpacity > 0.01 ? "visible" : "hidden";
    }
    if (descriptionRef.current) {
      descriptionRef.current.style.opacity = String(staticOpacity);
      descriptionRef.current.style.visibility = staticOpacity > 0.01 ? "visible" : "hidden";
    }
    if (statsCtaRef.current) {
      statsCtaRef.current.style.opacity = String(staticOpacity);
      statsCtaRef.current.style.visibility = staticOpacity > 0.01 ? "visible" : "hidden";
    }
    if (mobileTitleRef.current) {
      mobileTitleRef.current.style.opacity = String(staticOpacity);
      mobileTitleRef.current.style.visibility = staticOpacity > 0.01 ? "visible" : "hidden";
    }
  }, []);

  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle frame preloading on desktop
  useEffect(() => {
    if (!isMounted) return;

    const skipCanvas = false;
    setIsMobile(skipCanvas);

    if (skipCanvas) {
      setLoading(false);
      return;
    }

    let active = true;
    const sources = manifest.team || [];
    const total = sources.length;
    let complete = 0;

    if (total === 0) {
      setLoading(false);
      return;
    }

    const loadImage = (source: string): Promise<HTMLImageElement | null> => {
      return new Promise((resolve) => {
        const image = new window.Image();
        image.decoding = "async";
        image.onload = () => resolve(image);
        image.onerror = () => resolve(null);
        image.src = `/${source}`;
      });
    };

    const preload = async () => {
      const promises = sources.map(async (src) => {
        const img = await loadImage(src);
        if (img && active) {
          complete += 1;
          setProgress((complete / total) * 100);
        }
        return img;
      });

      const resolved = await Promise.all(promises);
      const validImages = resolved.filter((img): img is HTMLImageElement => img !== null);

      if (active) {
        setLoadedImages(validImages);
        setLoading(false);
      }
    };

    preload();

    return () => {
      active = false;
    };
  }, [isMounted]);

  // Set up scroll-scrub loop and Lenis synchronization
  useEffect(() => {
    if (loading || loadedImages.length === 0) return;

    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    if (!scene || !canvas) return;

    const state = { target: 0, current: 0, drawn: -1, running: false };

    const getProgress = () => {
      const bounds = scene.getBoundingClientRect();
      const scrollRange = scene.offsetHeight - window.innerHeight;
      return Math.max(0, Math.min(1, -bounds.top / Math.max(scrollRange, 1)));
    };

    const paint = () => {
      // Replicate the exact lerp factor of 0.13 used on the homepage
      state.current += (state.target - state.current) * 0.13;
      if (Math.abs(state.target - state.current) < 0.002) {
        state.current = state.target;
      }

      // Warp the progress to create dynamic pauses/holds on each person's face (6 segments = 12 PI frequency)
      const warpedProgress = Math.max(0, Math.min(1, state.current + 0.014 * Math.sin(12 * Math.PI * state.current)));

      // Math.round logic to map progress to frame index
      const index = Math.round(warpedProgress * (loadedImages.length - 1));
      if (index !== state.drawn && loadedImages[index]) {
        drawCover(canvas, loadedImages[index]);
        state.drawn = index;
      }

      // Direct DOM manipulation of name overlays based on segment progress
      const totalFrames = loadedImages.length;
      if (totalFrames > 0) {
        updateOverlays(warpedProgress);
      }

      if (state.current !== state.target) {
        requestAnimationFrame(paint);
      } else {
        state.running = false;
      }
    };

    const update = () => {
      state.target = getProgress();
      if (!state.running) {
        state.running = true;
        requestAnimationFrame(paint);
      }
    };

    const resize = () => {
      state.drawn = -1;
      // Warp the progress for resize (6 segments = 12 PI frequency)
      const warpedProgress = Math.max(0, Math.min(1, state.current + 0.014 * Math.sin(12 * Math.PI * state.current)));

      const index = Math.round(warpedProgress * (loadedImages.length - 1));
      if (loadedImages[index]) {
        drawCover(canvas, loadedImages[index]);
      }

      const totalFrames = loadedImages.length;
      if (totalFrames > 0) {
        updateOverlays(warpedProgress);
      }
    };

    // Draw initial frame
    drawCover(canvas, loadedImages[0]);

    // Check window.lenis first (requirement: reuse existing Lenis instance)
    let lenis = (window as any).lenis;
    if (!lenis && typeof Lenis !== "undefined") {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
      } as any);
      (window as any).lenis = lenis;

      // Start RAF loop for global Lenis
      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    if (lenis) {
      lenis.on("scroll", update);
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", resize, { passive: true });

    // Initial update to match scroll position
    update();

    return () => {
      if (lenis) {
        lenis.off("scroll", update);
      }
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", resize);
    };
  }, [loading, loadedImages, updateOverlays]);

  // Sync overlays for mobile video autoplay
  useEffect(() => {
    if (!isMobile) return;
    let active = true;
    const sync = () => {
      if (!active) return;
      if (videoRef.current && videoRef.current.duration) {
        const rawProgress = videoRef.current.currentTime / videoRef.current.duration;
        const warpedProgress = Math.max(0, Math.min(1, rawProgress + 0.014 * Math.sin(12 * Math.PI * rawProgress)));
        updateOverlays(warpedProgress);
      }
      requestAnimationFrame(sync);
    };
    requestAnimationFrame(sync);
    return () => {
      active = false;
    };
  }, [isMobile, updateOverlays]);


  return (
    <>
      {/* Loading state rendering */}
      {loading && !isMobile && (
        <div className="loader">
          <div className="loader__inner">
            <p className="eyebrow">ASR — LOADING SEQUENCE</p>
            <div className="loader__track">
              <span style={{ width: `${progress}%` }}></span>
            </div>
            <p className="loader__count">
              {String(Math.round(progress)).padStart(3, "0")}%
            </p>
          </div>
        </div>
      )}

      {/* Frame-scrub scene container */}
      <section ref={sceneRef} className="scrub-scene w-full relative" style={!isMobile ? { height: "750vh" } : undefined}>
        <div className="sticky-stage">
          {/* Canvas for desktop scroll-scrub */}
          {/* Canvas for desktop scroll-scrub */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full object-cover ${isMobile ? 'hidden' : 'block'}`}
            aria-hidden="true"
          />

          {/* Native video fallback for mobile */}
          {isMobile && (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover block"
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              poster="/assets/frames/team/frame_0001.jpg"
              aria-hidden="true"
            >
              <source src="/assets/videos/team.mp4" type="video/mp4" />
            </video>
          )}

          {/* Overlay shades matching home page styling */}
          <div className="scene-shade absolute inset-0 bg-gradient-to-r from-[#030913]/65 via-[#030913]/25 to-[#030913]/35 z-1 pointer-events-none" />
          <div className="scene-shade absolute inset-0 bg-gradient-to-t from-[#030913]/90 via-[#030913]/20 to-transparent z-1 pointer-events-none" />

          {/* Text Content Overlay */}
          <div className="absolute z-[2] flex flex-col justify-end bottom-12 md:bottom-28 left-6 right-6 md:left-16 lg:left-24 max-w-3xl text-left select-none pointer-events-none">

            {/* DYNAMIC TITLE */}
            <div className="relative h-[120px] sm:h-[160px] md:h-[200px] lg:h-[240px] w-full">
              {/* MOBILE STATIC TITLE */}
              <h1
                ref={mobileTitleRef}
                className="absolute bottom-0 md:hidden font-syne text-4xl sm:text-5xl font-bold tracking-tight text-[#edeae4] leading-[1.05] transition-opacity duration-75"
              >
                Engineering <br className="hidden sm:inline" /> with intention.
              </h1>

              {PEOPLE.map((person, i) => (
                <div
                  key={person.name}
                  ref={(el) => {
                    nameRefs.current[i] = el;
                  }}
                  className="absolute inset-0 flex flex-col justify-end transition-opacity duration-75"
                  style={{
                    opacity: 0,
                    visibility: "hidden",
                  }}
                >
                  <h1 className="font-syne text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#edeae4] leading-[1.05]">
                    {person.name.split(" ").map((word, wIdx, arr) => (
                      <React.Fragment key={wIdx}>
                        {word}
                        {wIdx < arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </h1>
                  <p className="text-base font-dm-mono text-[#00aaff] tracking-wider uppercase mt-2">
                    {person.role}
                  </p>
                </div>
              ))}
            </div>

            <p
              ref={eyebrowRef}
              className="font-dm-mono text-xs uppercase tracking-widest text-[#00aaff] select-none font-semibold transition-opacity duration-75 mt-6 md:mt-8"
            >
              About Us — AiSROvia
            </p>

            <p
              ref={descriptionRef}
              className="text-base sm:text-lg md:text-xl text-[#edeae4]/80 font-manrope max-w-xl leading-relaxed mt-3 transition-opacity duration-75"
            >
              We partner with ambitious companies to build high-performance digital products, operational systems, and interfaces that feel alive.
            </p>

            <div
              ref={statsCtaRef}
              className="transition-opacity duration-75 flex flex-col items-start"
            >
              {/* Stats Row */}
              <div className="flex flex-row flex-wrap gap-x-6 md:gap-x-8 gap-y-4 mt-6 md:mt-10 pointer-events-none">
                <div className="flex flex-col">
                  <span className="font-syne text-3xl sm:text-4xl font-bold text-[#edeae4]">2+</span>
                  <span className="font-dm-mono text-[10px] tracking-widest uppercase text-[#00aaff] mt-1 font-semibold">
                    Years of Experience
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-syne text-3xl sm:text-4xl font-bold text-[#edeae4]">14+</span>
                  <span className="font-dm-mono text-[10px] tracking-widest uppercase text-[#00aaff] mt-1 font-semibold">
                    Clients Served
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-syne text-3xl sm:text-4xl font-bold text-[#edeae4]">19+</span>
                  <span className="font-dm-mono text-[10px] tracking-widest uppercase text-[#00aaff] mt-1 font-semibold">
                    Projects Delivered
                  </span>
                </div>
              </div>

              {/* Scroll CTA - Desktop Only */}
              <motion.div
                className="hidden md:flex items-center gap-2 mt-8 md:mt-10 text-[#edeae4]/60 font-dm-mono text-[11px] uppercase tracking-widest pointer-events-none"
                animate={{
                  y: [0, 6, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span>Scroll to meet the team</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#00aaff]"
                >
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile fallback: static list of team members directly below the video section */}
      {isMobile && (
        <div className="w-full bg-[#0a1628] border-t border-white/5 py-12 px-6 sm:px-12 md:px-16 lg:px-24">
          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            <p className="font-dm-mono text-xs uppercase tracking-widest text-[#00aaff] font-semibold">
              Our Core Team
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {PEOPLE.map((person) => (
                <div key={person.name} className="flex flex-col gap-1 border-l-2 border-[#00aaff]/20 pl-4 py-1">
                  <h3 className="font-syne text-lg font-bold text-[#edeae4]">{person.name}</h3>
                  <p className="font-dm-mono text-xs text-[#00aaff]/80 uppercase">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
