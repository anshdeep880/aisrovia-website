"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/src/data/projects";
import MobileProjectCard from "./MobileProjectCard";

interface MobileCarouselProps {
  projects: Project[];
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function MobileCarousel({ projects }: MobileCarouselProps) {
  const [[index, direction], setIndex] = useState([0, 0]);

  useEffect(() => {
    setIndex([0, 0]);
  }, [projects.length]);

  if (projects.length === 0) return null;

  const project = projects[index];

  const paginate = (newDirection: number) => {
    setIndex(([prev]) => [
      (prev + newDirection + projects.length) % projects.length,
      newDirection,
    ]);
  };

  return (
    <div className="sm:hidden relative w-full flex flex-col items-center gap-6">
      {/* Sliding card */}
      <div className="relative w-full max-w-[300px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={project.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <MobileProjectCard project={project} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left / Right controls */}
      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label="Previous project"
          className="w-11 h-11 rounded-full border border-[#0a1628]/20 bg-white/70 text-[#0a1628] flex items-center justify-center shadow-sm hover:bg-[#0a1628] hover:text-white transition-colors duration-300 cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <span className="font-dm-mono text-xs uppercase tracking-wider text-[#0a1628]/60 select-none">
          {index + 1} / {projects.length}
        </span>

        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label="Next project"
          className="w-11 h-11 rounded-full border border-[#0a1628]/20 bg-white/70 text-[#0a1628] flex items-center justify-center shadow-sm hover:bg-[#0a1628] hover:text-white transition-colors duration-300 cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
