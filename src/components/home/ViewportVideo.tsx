"use client";

import React, { useEffect, useRef, useState } from "react";

interface ViewportVideoProps {
  src: string;
  poster: string;
  priority?: boolean;
  className?: string;
  ariaLabel?: string;
}

/**
 * Viewport-aware video player that avoids preloading heavy offscreen MP4s.
 * Always enforces autoPlay, loop, muted, playsInline, and a valid poster image.
 */
export default function ViewportVideo({
  src,
  poster,
  priority = false,
  className = "w-full h-full object-cover",
  ariaLabel,
}: ViewportVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState<boolean>(priority);
  const [isVisible, setIsVisible] = useState<boolean>(priority);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        rootMargin: "260px 0px 260px 0px",
        threshold: 0.01,
      }
    );

    observer.observe(videoEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || !shouldLoad) return;

    if (isVisible) {
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Gracefully fall back to poster when browser power-saving blocks autoplay
        });
      }
    } else {
      videoEl.pause();
    }
  }, [isVisible, shouldLoad]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      poster={poster}
      preload={priority ? "metadata" : "none"}
      autoPlay
      loop
      muted
      playsInline
      aria-label={ariaLabel}
      className={className}
    />
  );
}
