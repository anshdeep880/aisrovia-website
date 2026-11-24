"use client";

import React from "react";

interface BorderBeamProps {
  durationSeconds?: number;
  borderWidth?: number;
  className?: string;
}

/**
 * Magic UI-inspired hardware-accelerated BorderBeam primitive.
 * Clips a rotating GPU conic-gradient strictly to the container's 1.5px border ring.
 */
export default function BorderBeam({
  durationSeconds = 7,
  borderWidth = 1.5,
  className = "",
}: BorderBeamProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden z-20 ${className}`}
      style={{
        padding: `${borderWidth}px`,
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes aisrovia-border-beam-spin {
              from { transform: translate(-50%, -50%) rotate(0deg); }
              to { transform: translate(-50%, -50%) rotate(360deg); }
            }
          `,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 aspect-square w-[220%] will-change-transform"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg 275deg, rgba(0, 170, 255, 0.2) 305deg, #00aaff 342deg, #bae6fd 355deg, transparent 360deg)",
          animation: `aisrovia-border-beam-spin ${durationSeconds}s linear infinite`,
        }}
      />
    </div>
  );
}
