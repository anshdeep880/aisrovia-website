"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import BrowserFrame from "@/src/components/work/BrowserFrame";
import PhoneFrame from "@/src/components/work/PhoneFrame";

interface ServicePinnedSectionProps {
  id: string;
  serviceName: string;
  description: string;
  bullets: string[];
  techTags: string[];
  visualSrc: string;
  index: number;
}

export default function ServicePinnedSection({
  id,
  serviceName,
  description,
  bullets,
  techTags,
  visualSrc,
  index,
}: ServicePinnedSectionProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const trigger = triggerRef.current;
      const pin = pinRef.current;
      const image = imageRef.current;
      const bg = bgRef.current;

      if (!trigger || !pin || !image || !bg) return;

      // Pin timeline
      gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: "bottom bottom",
          pin: pin,
          pinSpacing: true,
          scrub: true,
        },
      });

      const isEven = index % 2 === 0;
      const targetBg = isEven ? "#edeae4" : "#0a1628";
      const targetText = isEven ? "#0a1628" : "#edeae4";

      // Background color smooth scrub transition
      gsap.to(bg, {
        backgroundColor: targetBg,
        color: targetText,
        scrollTrigger: {
          trigger: trigger,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

      // Clip-path reveal wipe animation
      gsap.fromTo(
        image,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: trigger,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [index]);

  const isEven = index % 2 === 0;
  const isMobileFrame = id === "web-mobile-apps";

  return (
    <div
      ref={triggerRef}
      className="relative w-full h-[150vh] sm:h-[180vh]"
      id={id}
    >
      {/* Pinned content wrapper */}
      <div
        ref={pinRef}
        className="w-full h-screen flex items-center overflow-hidden"
      >
        {/* Background wrapper that transitions color */}
        <div
          ref={bgRef}
          className={`w-full h-full flex items-center transition-colors duration-500 ${
            isEven
              ? "bg-[#0a1628] text-[#edeae4]"
              : "bg-[#edeae4] text-[#0a1628]"
          }`}
        >
          <div className="max-w-6xl w-full mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side: content */}
            <div className="flex flex-col gap-6 text-left select-none">
              <span className="text-xs sm:text-sm font-dm-mono uppercase tracking-[0.2em] opacity-60">
                0{index + 1} / SERVICE
              </span>
              <h2 className="font-syne text-4xl sm:text-5xl font-bold tracking-tight">
                {serviceName}
              </h2>
              <p className="font-manrope text-sm sm:text-base opacity-90 leading-relaxed max-w-lg">
                {description}
              </p>
              <ul className="flex flex-col gap-3 font-manrope text-xs sm:text-sm">
                {bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#00aaff] mt-1 shrink-0">✦</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                {techTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-md text-[10px] font-dm-mono uppercase tracking-wider border border-current/15 bg-current/5 text-current"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side: visual reveal area */}
            <div className="relative flex justify-center items-center w-full">
              <div
                ref={imageRef}
                className="w-full relative overflow-hidden"
                style={{ clipPath: "inset(100% 0% 0% 0%)" }}
              >
                {isMobileFrame ? (
                  <div className="w-[55%] max-w-[200px] mx-auto shadow-2xl rounded-[36px]">
                    <PhoneFrame>
                      <div className="absolute inset-0">
                        <Image
                          src={visualSrc}
                          alt={serviceName}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    </PhoneFrame>
                  </div>
                ) : (
                  <div className="w-full shadow-2xl rounded-lg">
                    <BrowserFrame>
                      <div className="relative w-full h-full overflow-hidden aspect-[16/9]">
                        <Image
                          src={visualSrc}
                          alt={serviceName}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    </BrowserFrame>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
