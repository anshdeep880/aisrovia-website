"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the device has a fine pointer (mouse) and prefers no reduced motion
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || reducedMotion) return;

    document.body.classList.add("has-custom-cursor");

    let targetX = 0;
    let targetY = 0;
    let ringX = 0;
    let ringY = 0;
    let animationFrameId: number;

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
    };

    const drawCursor = () => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(drawCursor);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    animationFrameId = requestAnimationFrame(drawCursor);

    // Magnetic effect for links and magnetic elements
    // Note: React might re-render, so a mutation observer or delegating events is better,
    // but replicating the exact app.js behavior for existing elements here:
    const handleMagneticMove = (event: Event) => {
      const e = event as PointerEvent;
      const element = e.currentTarget as HTMLElement;
      const box = element.getBoundingClientRect();
      element.style.setProperty("--magnetic-x", `${(e.clientX - box.left - box.width / 2) * 0.12}px`);
      element.style.setProperty("--magnetic-y", `${(e.clientY - box.top - box.height / 2) * 0.12}px`);
    };

    const handleMagneticLeave = (event: Event) => {
      const element = event.currentTarget as HTMLElement;
      element.style.setProperty("--magnetic-x", "0px");
      element.style.setProperty("--magnetic-y", "0px");
    };

    const addMagneticEvents = () => {
      document.querySelectorAll(".magnetic, .site-header nav a").forEach((element) => {
        // Avoid adding multiple listeners
        if (!element.hasAttribute('data-magnetic-bound')) {
          element.setAttribute('data-magnetic-bound', 'true');
          element.addEventListener("pointermove", handleMagneticMove);
          element.addEventListener("pointerleave", handleMagneticLeave);
        }
      });
    };

    // Run once after a short delay to let elements render
    const timeoutId = setTimeout(addMagneticEvents, 500);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
      
      document.querySelectorAll("[data-magnetic-bound]").forEach((element) => {
        element.removeEventListener("pointermove", handleMagneticMove);
        element.removeEventListener("pointerleave", handleMagneticLeave);
        element.removeAttribute('data-magnetic-bound');
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor custom-cursor--dot" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor custom-cursor--ring" aria-hidden="true" />
    </>
  );
}
