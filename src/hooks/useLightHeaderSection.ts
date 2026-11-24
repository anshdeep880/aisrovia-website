"use client";

import { useEffect, RefObject } from "react";

const registeredLightSections = new Set<HTMLElement>();
let rafId: number | null = null;

function evaluateHeaderTheme() {
  rafId = null;
  if (typeof document === "undefined") return;

  // Fixed navbar sits roughly between y=0 and y=86px; sample at y=48px
  const headerProbeY = 48;
  let isOverLightSection = false;

  for (const section of registeredLightSections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= headerProbeY && rect.bottom >= headerProbeY) {
      isOverLightSection = true;
      break;
    }
  }

  document.body.classList.toggle("is-light-section", isOverLightSection);
}

function scheduleEvaluation() {
  if (rafId !== null || typeof window === "undefined") return;
  rafId = window.requestAnimationFrame(evaluateHeaderTheme);
}

/**
 * Coordinates multiple `.is-light-section` blocks on the same page
 * so `body.is-light-section` adapts the fixed SiteHeader cleanly without conflicts.
 */
export function useLightHeaderSection(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const wasEmpty = registeredLightSections.size === 0;
    registeredLightSections.add(element);

    if (wasEmpty) {
      window.addEventListener("scroll", scheduleEvaluation, { passive: true });
      window.addEventListener("resize", scheduleEvaluation, { passive: true });
    }

    evaluateHeaderTheme();

    return () => {
      registeredLightSections.delete(element);

      if (registeredLightSections.size === 0) {
        window.removeEventListener("scroll", scheduleEvaluation);
        window.removeEventListener("resize", scheduleEvaluation);
        if (rafId !== null) {
          window.cancelAnimationFrame(rafId);
          rafId = null;
        }
        document.body.classList.remove("is-light-section");
      } else {
        evaluateHeaderTheme();
      }
    };
  }, [ref]);
}
