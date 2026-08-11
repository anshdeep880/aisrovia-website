"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/src/data/projects";
import BrowserFrame from "./BrowserFrame";

interface WebProjectCardProps {
  project: Project;
}

export default function WebProjectCard({ project }: WebProjectCardProps) {
  const isClickable = !!project.href;

  const cardContent = (
    <motion.div
      initial="initial"
      whileHover={isClickable ? "hover" : undefined}
      className="flex flex-col gap-4 w-full text-left"
    >
      {/* Padded panel — browser mockup floats inside */}
      <div
        className="
          rounded-3xl
          px-4 sm:px-8
          py-16 sm:py-24
          bg-gradient-to-br from-[#1565c0] to-[#0d4fa0]
          border border-white/10
          flex items-center justify-center
        "
      >
        {/* Browser Chrome Mockup — shadow makes it read as floating */}
        <div className="w-full shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] rounded-lg">
          <BrowserFrame>
            <div className="relative w-full h-full overflow-hidden aspect-[16/9]">
              {/* Screenshot Image */}
              <motion.div
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 1.03 },
                }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                className="relative w-full h-full"
              >
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    controls={false}
                    className="w-full h-full object-fill pointer-events-none"
                  />
                ) : (
                  <Image
                    src={project.image}
                    alt={`${project.name} Screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-fill"
                  />
                )}
              </motion.div>

              {/* Hover Overlay */}
              {isClickable && (
                <motion.div
                  variants={{
                    initial: { opacity: 0 },
                    hover: { opacity: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center pointer-events-none"
                >
                  {/* Case Study Pill */}
                  <motion.div
                    variants={{
                      initial: { scale: 0.9, opacity: 0 },
                      hover: { scale: 1, opacity: 1 },
                    }}
                    transition={{ delay: 0.05, duration: 0.3, ease: "easeOut" }}
                    className="px-5 py-2.5 rounded-full bg-[#edeae4] text-[#0a1628] text-xs font-dm-mono uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
                  >
                    View case study <span>↗</span>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </BrowserFrame>
        </div>
      </div>

      {/* Meta Row */}
      <div className="flex justify-between items-center text-[11px] font-dm-mono uppercase tracking-wider text-[#0a1628]/60 mt-1 select-none">
        <span>
          {project.client} <span className="text-[#0a1628]/20 mx-1.5">·</span> {project.category}
        </span>
        <span>{project.year}</span>
      </div>

      {/* Title & Headline */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-xl sm:text-2xl font-syne font-bold text-[#0a1628] tracking-tight group-hover:text-brand-accent transition-colors duration-300">
          {project.name}
        </h3>
        <p className="text-sm text-[#0a1628]/85 font-manrope leading-relaxed">
          {project.headline}
        </p>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-[#0a1628]/70 font-manrope leading-relaxed">
        {project.description}
      </p>
    </motion.div>
  );

  if (isClickable) {
    return (
      <Link href={project.href || "#"} className="group block w-full">
        {cardContent}
      </Link>
    );
  }

  return <div className="block w-full">{cardContent}</div>;
}
