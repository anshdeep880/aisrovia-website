"use client";

import React from "react";
import { projects } from "@/src/data/projects";
import WebProjectCard from "@/src/components/work/WebProjectCard";
import MobileProjectCard from "@/src/components/work/MobileProjectCard";

interface ProofStripProps {
  relatedService: string;
  isDarkBg: boolean;
}

export default function ProofStrip({ relatedService, isDarkBg }: ProofStripProps) {
  // Filter projects matching this service
  const filtered = projects.filter((p) => p.relatedService === relatedService).slice(0, 3);

  if (filtered.length === 0) return null;

  return (
    <section 
      className={`w-full py-16 sm:py-24 transition-colors duration-500 ${
        isDarkBg ? "bg-[#0a1628] text-[#edeae4]" : "bg-[#edeae4] text-[#0a1628]"
      }`}
    >
      <div className="max-w-6xl w-full mx-auto px-6 sm:px-12 flex flex-col gap-12">
        <div className="flex flex-col gap-2 text-left">
          <span className="font-dm-mono text-xs uppercase tracking-widest text-[#00aaff]">
            Case Studies
          </span>
          <h3 className="font-syne text-2xl sm:text-3xl font-bold tracking-tight">
            Proof of Work
          </h3>
        </div>

        {/* Dynamic container to override text colors if dark background */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start ${
            isDarkBg 
              ? "[&_h3]:!text-[#edeae4] [&_p]:!text-[#edeae4]/80 [&_span]:!text-[#edeae4]/60 [&_div]:!text-[#edeae4]/60 [&_.rounded-full]:!text-[#0a1628] [&_.rounded-full_span]:!text-[#0a1628]" 
              : ""
          }`}
        >
          {filtered.map((project) => {
            if (project.variant === "web") {
              return (
                <div key={project.id} className="w-full">
                  <WebProjectCard project={project} />
                </div>
              );
            } else {
              return (
                <div key={project.id} className="w-full">
                  <MobileProjectCard project={project} />
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}
