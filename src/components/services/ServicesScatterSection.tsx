"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import thumbnailsData from "@/src/data/services-thumbnails.json";
import Lenis from "lenis";

// Define TypeScript type for the manifest item
interface ThumbnailItem {
  project: string;
  src: string;
  id: string;
}

// Cast JSON data to typed array
const thumbnails = thumbnailsData as ThumbnailItem[];

// Unpinned 8-Project Showcase Definitions (Sanitized — zero client names)
const SHOWCASE_PROJECTS = [
  {
    id: "the-juicist",
    title: "The Juicist",
    tag: "01 / BRAND & PLATFORM",
    description:
      "A complete multi-application ecosystem automating customer orders, production planning, warehouse operations, and deliveries — with full Shopify integration.",
    src: "/assets/Projects%20Images/The%20juicist/The%20juicist.png",
    link: "#",
  },
  {
    id: "jwellery-management",
    title: "Jewellery Shop ERP",
    tag: "02 / ENTERPRISE ERP",
    description:
      "Enterprise-grade ERP managing inventory, purchases, old gold exchange, girvi, live gold rate integration, and complete financial reporting.",
    src: "/assets/Projects%20Images/Jwellery%20Management%20/Jwellery%20Management%20.png",
    link: "#",
  },
  {
    id: "mobile-shop-erp",
    title: "Mobile Shop ERP",
    tag: "03 / RETAIL ERP",
    description:
      "Retail ERP for mobile stores — fast billing, auto bill sharing, inventory deduction, expense tracking, and sales analytics.",
    src: "/assets/Projects%20Images/Mobile%20Shop%20ERP/Mobile%20Shop%20ERP.png",
    link: "#",
  },
  {
    id: "emplopyee-tracking",
    title: "Live Employee Tracking",
    tag: "04 / GPS PLATFORM",
    description:
      "GPS-based employee tracking system — live location, route history, and activity monitoring in real time.",
    src: "/assets/Projects%20Images/Emplopyee%20Tracking/Emplopyee%20Tracking.png",
    link: "#",
  },
  {
    id: "food-ordering-management",
    title: "Food Ordering Management",
    tag: "05 / PLATFORM",
    description:
      "A complete business management platform for food and snacks manufacturing — connecting customers, admins, and delivery staff through dedicated apps for ordering, inventory, production, and real-time delivery tracking.",
    src: "/assets/Projects%20Images/Food%20Ordering%20Management/Food%20Ordering%20Management.png",
    link: "#",
  },
  {
    id: "task-management",
    title: "Enterprise Task Management",
    tag: "06 / PRODUCTIVITY",
    description:
      "Real-time workflow platform connecting customers, admins, and staff — live chat, file sharing, and task progress tracking.",
    src: "/assets/Projects%20Images/Task%20Management/Task%20Management.png",
    link: "#",
  },
  {
    id: "payroll-management",
    title: "Payroll Management System",
    tag: "07 / WORKFORCE",
    description:
      "End-to-end payroll and HRMS platform — biometric attendance, automated salary processing, employee loans and advances, leave management, and payout integration, with a self-service mobile app for employees.",
    src: "/assets/Projects%20Images/Payroll%20Management/Payroll%20Management.png",
    link: "#",
  },
  {
    id: "saloon-management",
    title: "Salon Management System",
    tag: "08 / SERVICE PLATFORM",
    description:
      "Appointment booking, billing, customer records, and staff management for salon businesses — ready-to-deploy solution.",
    src: "/assets/Projects%20Images/Saloon%20Management/Saloon%20Management.png",
    link: "#",
  },
];

// Deterministic seed-based pseudo-random number generator (LCG)
function createRandom(seed: number) {
  let current = seed;
  return function () {
    current = (current * 1664525 + 1013904223) % 4294967296;
    return current / 4294967296;
  };
}

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
  keyframesX: number[];
  keyframesY: number[];
  keyframesRotate: number[];
  keyframesScale: number[];
  duration: number;
  delay: number;
}

export default function ServicesScatterSection() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [convergingIndices, setConvergingIndices] = useState<Set<number>>(new Set());
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());

  // DOM Refs for GSAP animation
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const textFillIRef = useRef<SVGTextElement>(null);
  const textFillFRef = useRef<SVGTextElement>(null);
  const textOutlineIRef = useRef<SVGTextElement>(null);
  const textOutlineFRef = useRef<SVGTextElement>(null);

  // Showcase section wire, dot & scroll refs
  const [wirePaths, setWirePaths] = useState<string[]>([]);
  const [dotPositions, setDotPositions] = useState<Array<{ x: number; y: number }>>([]);
  const thresholdsRef = useRef<number[]>([]);

  const showcaseContainerRef = useRef<HTMLElement>(null);
  const continuousWireRefs = useRef<Array<SVGPathElement | null>>([]);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const blockRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const textRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dotRefs = useRef<Array<SVGCircleElement | null>>([]);

  // 1. Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate layout coordinates
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const W = dimensions.width;
    const H = dimensions.height;
    const cx = W / 2;
    const cy = H / 2;

    const visibleThumbnails = thumbnails;

    // Center rectangular safe-zone dimensions (fits logo + text layout)
    let w_safe = 540;
    let h_safe = 340;

    if (W < 640) {
      w_safe = 240;
      h_safe = 200;
    } else if (W < 1024) {
      w_safe = 380;
      h_safe = 260;
    } else if (W < 1400) {
      w_safe = 460;
      h_safe = 300;
    }

    const safeLeft = cx - w_safe / 2;
    const safeRight = cx + w_safe / 2;
    const safeTop = cy - h_safe / 2;
    const safeBottom = cy + h_safe / 2;

    const cardWidth = W < 640 ? 75 : W < 1024 ? 115 : W < 1400 ? 140 : 160;
    const cardHeight = cardWidth * (3 / 4);

    const padding = W < 640 ? 15 : 24;

    const calculatedPositions: Position[] = [];

    for (let index = 0; index < visibleThumbnails.length; index++) {
      const rand = createRandom(index * 307 + 97);

      let x = 0;
      let y = 0;
      let accepted = false;
      let attempts = 0;
      let margin = 35;

      // Iterative candidate generation with strict distance checks across full viewport
      while (!accepted && attempts < 800) {
        if (attempts > 300) margin = 25;
        if (attempts > 600) margin = 15;

        const candidateX = padding + rand() * (W - cardWidth - padding * 2);
        const candidateY = padding + rand() * (H - cardHeight - padding * 2);

        const cardLeft = candidateX;
        const cardRight = candidateX + cardWidth;
        const cardTop = candidateY;
        const cardBottom = candidateY + cardHeight;

        // Collision check with central text safe-zone
        const collidesWithSafeZone = (
          cardLeft < safeRight &&
          cardRight > safeLeft &&
          cardTop < safeBottom &&
          cardBottom > safeTop
        );

        if (collidesWithSafeZone) {
          attempts++;
          continue;
        }

        // Collision check with already placed cards
        let collidesWithPlaced = false;
        for (let j = 0; j < calculatedPositions.length; j++) {
          const placed = calculatedPositions[j];
          if (!placed) continue;

          const overlap = (
            candidateX - margin < placed.x + cardWidth &&
            candidateX + cardWidth + margin > placed.x &&
            candidateY - margin < placed.y + cardHeight &&
            candidateY + cardHeight + margin > placed.y
          );

          if (overlap) {
            collidesWithPlaced = true;
            break;
          }
        }

        if (!collidesWithPlaced) {
          x = candidateX;
          y = candidateY;
          accepted = true;
        }

        attempts++;
      }

      // Fallback ring placement if dense viewport
      if (!accepted) {
        const fallbackAngle = (index / visibleThumbnails.length) * Math.PI * 2 + (index % 2) * 0.2;
        const fallbackRadius = Math.max(w_safe, h_safe) / 2 + 70 + (index % 3) * 35;
        x = Math.max(padding, Math.min(W - cardWidth - padding, cx + Math.cos(fallbackAngle) * fallbackRadius - cardWidth / 2));
        y = Math.max(padding, Math.min(H - cardHeight - padding, cy + Math.sin(fallbackAngle) * fallbackRadius - cardHeight / 2));
      }

      // Dynamic floating path keyframes across the viewport
      const pathPointsCount = 6;
      const keyframesX: number[] = [0];
      const keyframesY: number[] = [0];

      const initialRotate = -8 + rand() * 16;
      const initialScale = 0.75 + rand() * 0.35;

      const keyframesRotate: number[] = [initialRotate];
      const keyframesScale: number[] = [initialScale];

      const driftExtentX = W < 640 ? 35 : 75;
      const driftExtentY = W < 640 ? 25 : 55;

      for (let p = 0; p < pathPointsCount; p++) {
        // Varying angle & radius for dynamic continuous movement
        const angle = (p / pathPointsCount) * Math.PI * 2 + (rand() - 0.5) * 1.2;
        const rX = (0.3 + rand() * 0.7) * driftExtentX;
        const rY = (0.3 + rand() * 0.7) * driftExtentY;

        let targetX = x + Math.cos(angle) * rX;
        let targetY = y + Math.sin(angle) * rY;

        targetX = Math.max(padding, Math.min(W - cardWidth - padding, targetX));
        targetY = Math.max(padding, Math.min(H - cardHeight - padding, targetY));

        keyframesX.push(targetX - x);
        keyframesY.push(targetY - y);
        keyframesRotate.push(-12 + rand() * 24);
        keyframesScale.push(0.7 + rand() * 0.4);
      }

      keyframesX.push(0);
      keyframesY.push(0);
      keyframesRotate.push(initialRotate);
      keyframesScale.push(initialScale);

      const duration = 14 + rand() * 18;
      const delay = rand() * -duration;

      calculatedPositions.push({
        x,
        y,
        width: cardWidth,
        height: cardHeight,
        keyframesX,
        keyframesY,
        keyframesRotate,
        keyframesScale,
        duration,
        delay,
      });
    }

    setPositions(calculatedPositions);
  }, [dimensions]);

  useEffect(() => {
    if (positions.length === 0) return;

    const imgs = document.querySelectorAll("img");
    const promises = Array.from(imgs).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener("load", resolve);
        img.addEventListener("error", resolve);
      });
    });

    Promise.all(promises).then(() => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });
  }, [positions]);

  useEffect(() => {
    if (positions.length === 0 || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const W = window.innerWidth;
    const H = window.innerHeight;
    const cx = W / 2;
    const cy = H / 2;

    let svgWidth = 320;
    if (W < 640) {
      svgWidth = 180;
    } else if (W < 768) {
      svgWidth = 240;
    }

    const x_I = cx - svgWidth * 0.125;
    const x_F = cx + svgWidth * 0.104;

    const visibleCount = thumbnails.length;

    const cardDistances = positions.map((pos, idx) => {
      const cardCx = pos.x + pos.width / 2;
      const cardCy = pos.y + pos.height / 2;
      const dx = cardCx - cx;
      const dy = cardCy - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      return { index: idx, dist };
    });

    cardDistances.sort((a, b) => a.dist - b.dist);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 0.3,
        start: "top top",
        end: "+=300%",
        onUpdate: (self) => {
          const progress = self.progress;
          const activeSet = new Set<number>();

          cardDistances.forEach((cd, k) => {
            const tStart = (k / visibleCount) * 0.35;
            if (progress > 0 && progress >= tStart) {
              activeSet.add(cd.index);
            }
          });

          setConvergingIndices((prev) => {
            if (prev.size === activeSet.size && [...activeSet].every((idx) => prev.has(idx))) {
              return prev;
            }
            return activeSet;
          });
        },
      },
    });

    cardDistances.forEach((cd, k) => {
      const pos = positions[cd.index];
      const cardEl = cardRefs.current[cd.index];
      if (!cardEl || !pos) return;

      const targetLetterX = k < 9 ? x_I : x_F;
      const targetY = cy - pos.height / 2;
      const targetX = targetLetterX - pos.width / 2;

      const dx = targetX - pos.x;
      const dy = targetY - pos.y;

      const tStart = (k / visibleCount) * 0.35;
      const tDuration = 0.15;

      tl.set(cardEl, { willChange: "transform, opacity" }, 0)
        .to(
          cardEl,
          {
            x: dx,
            y: dy,
            scale: 0,
            opacity: 0,
            force3D: true,
            duration: tDuration,
            ease: "none",
          },
          tStart
        )
        .set(cardEl, { willChange: "auto" }, tStart + tDuration);
    });

    tl.to(textFillIRef.current, { clipPath: "inset(75% 0% 0% 0%)", duration: 0.05, ease: "none" }, 0.15)
      .to(textFillIRef.current, { clipPath: "inset(50% 0% 0% 0%)", duration: 0.05, ease: "none" }, 0.20)
      .to(textFillIRef.current, { clipPath: "inset(25% 0% 0% 0%)", duration: 0.05, ease: "none" }, 0.25)
      .to(textFillIRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.05, ease: "none" }, 0.30);

    tl.to(textFillFRef.current, { clipPath: "inset(75% 0% 0% 0%)", duration: 0.03, ease: "none" }, 0.35)
      .to(textFillFRef.current, { clipPath: "inset(50% 0% 0% 0%)", duration: 0.03, ease: "none" }, 0.40)
      .to(textFillFRef.current, { clipPath: "inset(25% 0% 0% 0%)", duration: 0.03, ease: "none" }, 0.45)
      .to(textFillFRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.03, ease: "none" }, 0.47);

    tl.to(
      [textOutlineIRef.current, textOutlineFRef.current],
      {
        opacity: 0,
        duration: 0.1,
        ease: "none",
      },
      0.85
    );

    return () => {
      tl.kill();
    };
  }, [positions]);

  // Calculate 3-Strand Ultra-Smooth Serpentine Wire Paths starting directly under IF mark
  useEffect(() => {
    if (!showcaseContainerRef.current) return;

    const calculateWirePath = () => {
      const showcaseEl = showcaseContainerRef.current;
      if (!showcaseEl) return;

      const scRect = showcaseEl.getBoundingClientRect();
      const containerW = showcaseEl.offsetWidth || window.innerWidth;
      const containerH = showcaseEl.offsetHeight || window.innerHeight * 8;

      // 1. Waypoint P0: Start directly below "IF" text mark in Hero section (relative to showcase section)
      let ifX = containerW / 2;
      let ifY = -380; // fallback relative Y offset inside hero section

      const ifEl = textFillFRef.current || textOutlineFRef.current;
      if (ifEl && showcaseEl) {
        const ifRect = ifEl.getBoundingClientRect();
        ifX = ifRect.left - scRect.left + ifRect.width / 2;
        const relY = ifRect.bottom - scRect.top;
        if (relY < 0) {
          ifY = relY + 10; // 10px directly under IF text!
        }
      }

      const waypoints: Array<{ x: number; y: number }> = [];
      waypoints.push({ x: ifX, y: ifY });

      const thresholds: number[] = [];
      const dots: Array<{ x: number; y: number }> = [];

      SHOWCASE_PROJECTS.forEach((_, idx) => {
        const isOdd = idx % 2 === 0;
        const sectionEl = sectionRefs.current[idx];
        const blockEl = blockRefs.current[idx];
        const imageEl = imageRefs.current[idx];

        let ptX = isOdd ? containerW * 0.25 : containerW * 0.75;
        let ptY = ((idx + 0.5) / SHOWCASE_PROJECTS.length) * containerH;

        const targetEl = imageEl || blockEl;
        if (targetEl && showcaseEl) {
          const tgtRect = targetEl.getBoundingClientRect();
          ptY = tgtRect.top - scRect.top + tgtRect.height / 2;

          if (isOdd) {
            // Left Project: DOT is on the right edge of Project Image
            ptX = tgtRect.right - scRect.left;
          } else {
            // Right Project: DOT is on the left edge of Project Image
            ptX = tgtRect.left - scRect.left;
          }
        }

        waypoints.push({ x: ptX, y: ptY });
        dots.push({ x: ptX, y: ptY });
        thresholds.push(Math.max(0, Math.min(1, ptY / containerH)));
      });

      // Waypoint P_end: Bottom Center
      waypoints.push({ x: containerW / 2, y: containerH + 60 });

      setDotPositions(dots);
      thresholdsRef.current = thresholds;

      // Build 3 fanned-out smooth serpentine strand curves (-30px, 0px, +30px horizontal spread)
      const strand0 = buildSerpentineStrand(waypoints, -30);
      const strand1 = buildSerpentineStrand(waypoints, 0);
      const strand2 = buildSerpentineStrand(waypoints, 30);

      setWirePaths([strand0, strand1, strand2]);
    };

    calculateWirePath();

    // Recalculate on window resize and after images load
    window.addEventListener("resize", calculateWirePath);
    const timeoutId = setTimeout(calculateWirePath, 300);

    return () => {
      window.removeEventListener("resize", calculateWirePath);
      clearTimeout(timeoutId);
    };
  }, [dimensions]);

  // Helper to build 100% butter-smooth C1 continuous serpentine cubic bezier curve
  function buildSerpentineStrand(
    waypoints: Array<{ x: number; y: number }>,
    strandOffset: number
  ) {
    if (waypoints.length < 2) return "";

    const pts = waypoints.map((pt, i) => {
      const isEndpoint = i === 0 || i === waypoints.length - 1;
      return {
        x: pt.x + (isEndpoint ? 0 : strandOffset),
        y: pt.y,
      };
    });

    let d = `M ${pts[0].x},${pts[0].y}`;

    for (let i = 0; i < pts.length - 1; i++) {
      const pCurrent = pts[i];
      const pNext = pts[i + 1];

      const dx = pNext.x - pCurrent.x;
      const dy = pNext.y - pCurrent.y;

      const cp1X = pCurrent.x + dx * 0.2;
      const cp1Y = pCurrent.y + dy * 0.45;
      const cp2X = pNext.x - dx * 0.2;
      const cp2Y = pCurrent.y + dy * 0.55;

      d += ` C ${cp1X},${cp1Y} ${cp2X},${cp2Y} ${pNext.x},${pNext.y}`;
    }

    return d;
  }

  // Setup Unified Wire-Gated ScrollTrigger (Scrub 3 wires + dot illumination + card reveals)
  useEffect(() => {
    if (!showcaseContainerRef.current || wirePaths.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const showcaseEl = showcaseContainerRef.current;

    // Initialize active wire strokes for GSAP scrub
    continuousWireRefs.current.forEach((wireEl) => {
      if (wireEl) {
        const len = wireEl.getTotalLength();
        wireEl.style.strokeDasharray = `${len}`;
        wireEl.style.strokeDashoffset = `${len}`;
      }
    });

    const wireST = ScrollTrigger.create({
      trigger: showcaseEl,
      start: "top 75%",
      end: "bottom 90%",
      scrub: 0.3,
      onUpdate: (self) => {
        const progress = self.progress;

        // 1. Scrub 3 parallel glowing active wire strands
        continuousWireRefs.current.forEach((wireEl) => {
          if (!wireEl) return;
          const len = wireEl.getTotalLength();
          wireEl.style.strokeDashoffset = `${len * (1 - progress)}`;
        });

        // 2. Wire-gated project block & dot reveals (Dot illuminates -> Card appears)
        thresholdsRef.current.forEach((tK, k) => {
          const blockEl = blockRefs.current[k];
          const dotEl = dotRefs.current[k];

          if (progress >= tK - 0.03) {
            const localProgress = Math.min(1, (progress - (tK - 0.03)) / 0.05);
            if (blockEl) {
              gsap.set(blockEl, {
                opacity: localProgress,
                y: (1 - localProgress) * 35,
              });
            }
            if (dotEl) {
              gsap.set(dotEl, {
                opacity: localProgress,
                scale: 1 + (1 - localProgress) * 0.4,
              });
            }
          } else {
            if (blockEl) {
              gsap.set(blockEl, { opacity: 0, y: 35 });
            }
            if (dotEl) {
              gsap.set(dotEl, { opacity: 0, scale: 0 });
            }
          }
        });
      },
    });

    return () => {
      wireST.kill();
    };
  }, [wirePaths]);

  if (!isMounted) {
    return <div className="min-h-screen w-full bg-[#0a1628]" />;
  }

  const visibleThumbnails = thumbnails;

  return (
    <div className="w-full bg-[#0a1628] text-[#edeae4]">
      {/* 1. PINNED HERO SECTION (Phase 1 & Phase 2) */}
      <div
        ref={containerRef}
        data-services-pin-target="true"
        className="relative min-h-screen w-full bg-[#0a1628] overflow-hidden flex flex-col items-center justify-center select-none animate-fade-in z-20"
      >
        <header className="site-header" aria-label="Main navigation">
          <a className="brand" href="/" aria-label="Anshdeep Singh Randev home">
            <img className="brand-logo" src="/assets/Logo/Logo.png" alt="ASR" />
          </a>
          <nav>
            <a href="/services">Services</a>
            <a href="/#portfolioGallery">Work</a>
            <a href="/#about">About</a>
            <a href="/#contact">Contact</a>
          </nav>
        </header>

        {positions.length > 0 &&
          visibleThumbnails.map((item, index) => {
            const pos = positions[index];
            if (!pos || brokenImages.has(item.id)) return null;

            const isCurrentlyConverging = convergingIndices.has(index);

            return (
              <motion.div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="absolute overflow-hidden rounded-[12px] border border-[#edeae4]/8 shadow-[0_8px_24px_rgba(0,0,0,0.35)] bg-[#0a1628] group transition-shadow duration-300 hover:shadow-[#00aaff]/20 hover:border-[#edeae4]/20"
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  aspectRatio: "4/3",
                  width: `${pos.width}px`,
                  zIndex: 1,
                }}
                animate={
                  isCurrentlyConverging
                    ? {}
                    : {
                        x: pos.keyframesX,
                        y: pos.keyframesY,
                        rotate: pos.keyframesRotate,
                        scale: pos.keyframesScale,
                      }
                }
                whileHover={{
                  scale: 1.15,
                  zIndex: 50,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                transition={{
                  x: { duration: pos.duration, delay: pos.delay, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: pos.duration, delay: pos.delay, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: pos.duration, delay: pos.delay, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: pos.duration, delay: pos.delay, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <img
                  src={item.src}
                  alt={item.project}
                  className="w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={() => {
                    console.error(`Failed to load image: ${item.src}`);
                    setBrokenImages((prev) => {
                      const next = new Set(prev);
                      next.add(item.id);
                      return next;
                    });
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2.5 flex flex-col justify-end">
                  <span className="text-[10px] text-[#00aaff] font-mono tracking-widest uppercase mb-0.5">
                    Project
                  </span>
                  <span className="text-[11px] text-[#edeae4] font-semibold tracking-wider truncate">
                    {item.project}
                  </span>
                </div>
              </motion.div>
            );
          })}

        <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-xl pointer-events-none translate-y-20">
          <div className="mb-6 flex items-center justify-center">
            <svg viewBox="0 0 240 120" className="w-[180px] sm:w-[240px] md:w-[320px] h-auto">
              <g>
                <text
                  x="80"
                  y="90"
                  ref={textOutlineIRef}
                  fontFamily="var(--font-syne), Syne, sans-serif"
                  fontWeight="700"
                  fontSize="95"
                  fill="none"
                  stroke="#00aaff"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                  className="select-none uppercase"
                >
                  I
                </text>
                <text
                  x="80"
                  y="90"
                  ref={textFillIRef}
                  fontFamily="var(--font-syne), Syne, sans-serif"
                  fontWeight="700"
                  fontSize="95"
                  fill="#edeae4"
                  className="select-none uppercase"
                  style={{ clipPath: "inset(100% 0% 0% 0%)" }}
                >
                  I
                </text>
              </g>

              <g>
                <text
                  x="120"
                  y="90"
                  ref={textOutlineFRef}
                  fontFamily="var(--font-syne), Syne, sans-serif"
                  fontWeight="700"
                  fontSize="95"
                  fill="none"
                  stroke="#00aaff"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                  className="select-none uppercase"
                >
                  F
                </text>
                <text
                  x="120"
                  y="90"
                  ref={textFillFRef}
                  fontFamily="var(--font-syne), Syne, sans-serif"
                  fontWeight="700"
                  fontSize="95"
                  fill="#edeae4"
                  className="select-none uppercase"
                  style={{ clipPath: "inset(100% 0% 0% 0%)" }}
                >
                  F
                </text>
              </g>
            </svg>
          </div>

          <span className="text-xs md:text-sm font-mono text-[#00aaff] tracking-[0.25em] uppercase mb-3">
            Capabilities
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#edeae4] font-syne uppercase mb-4">
            Our work
          </h2>
          <p className="text-sm md:text-base text-[#edeae4]/60 font-manrope max-w-sm mt-0 leading-relaxed">
            Engineering high-fidelity intelligent products with clarity, speed, and intent.
          </p>
        </div>
      </div>

      {/* 2. UNPINNED SHOWCASE SECTION (Dual-Layer Wires + Stacked Alternating Projects) */}
      <section
        ref={showcaseContainerRef}
        className="relative w-full bg-[#0a1628] py-24 sm:py-32 px-6 overflow-hidden select-none z-20"
      >
        {/* Dual-Layer SVG: Subtle Permanent Base Wires + Active Glowing Cyan Wires */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
          {/* Layer A: Permanent Base Wires — ALWAYS 100% VISIBLE */}
          {wirePaths.map((d, wIdx) => (
            <path
              key={`base-wire-${wIdx}`}
              d={d}
              fill="none"
              stroke="rgba(237,234,228,0.22)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          ))}

          {/* Layer B: Active Glowing Cyan Scrubbed Wires */}
          {wirePaths.map((d, wIdx) => (
            <path
              key={`active-wire-${wIdx}`}
              ref={(el) => {
                continuousWireRefs.current[wIdx] = el;
              }}
              d={d}
              fill="none"
              stroke="#00aaff"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0 0 6px rgba(0, 170, 255, 0.8))",
              }}
            />
          ))}

          {/* Layer C: Glowing Cyan DOT Markers */}
          {dotPositions.map((dot, i) => (
            <circle
              key={`dot-${i}`}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              cx={dot.x}
              cy={dot.y}
              r="5"
              fill="#00aaff"
              style={{
                opacity: 0,
                transformOrigin: `${dot.x}px ${dot.y}px`,
                filter: "drop-shadow(0 0 8px #00aaff)",
              }}
            />
          ))}
        </svg>

        <div className="max-w-7xl mx-auto flex flex-col gap-24 sm:gap-36 lg:gap-44 relative z-20">
          {SHOWCASE_PROJECTS.map((project, index) => {
            const isOdd = index % 2 === 0;

            return (
              <div
                key={project.id}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className="min-h-[80vh] flex items-center justify-center py-8"
              >
                <div
                  ref={(el) => {
                    blockRefs.current[index] = el;
                  }}
                  className={`w-full max-w-[560px] lg:max-w-[54%] flex flex-col text-left opacity-0 ${
                    isOdd ? "mr-auto pl-4 sm:pl-8 lg:pl-16" : "ml-auto pr-4 sm:pr-8 lg:pr-16"
                  }`}
                >
                  {/* Image on top */}
                  <div
                    ref={(el) => {
                      imageRefs.current[index] = el;
                    }}
                    className="relative group overflow-hidden rounded-[14px] border border-[#edeae4]/12 shadow-[0_16px_40px_rgba(0,0,0,0.45)] bg-[#0a1628] w-full aspect-[16/10] mb-6 transition-all duration-500 hover:border-[#00aaff]/30 hover:shadow-[#00aaff]/15"
                  >
                    <img
                      src={project.src}
                      alt={project.title}
                      className="w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Text content stacked directly BELOW image */}
                  <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-mono text-[#00aaff] tracking-[0.2em] uppercase mb-2">
                      {project.tag}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-[#edeae4] font-syne tracking-tight mb-3 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-base md:text-lg text-[#edeae4]/70 font-manrope leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <div>
                      <a
                        href={project.link}
                        className="inline-flex items-center gap-2 text-xs md:text-sm font-mono text-[#edeae4] hover:text-[#00aaff] tracking-widest uppercase border-b border-[#edeae4]/30 hover:border-[#00aaff] pb-1 transition-all duration-300 group"
                      >
                        <span>EXPLORE PROJECT</span>
                        <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
