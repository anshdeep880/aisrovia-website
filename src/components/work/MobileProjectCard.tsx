"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/src/data/projects";
import PhoneFrame from "./PhoneFrame";

interface MobileProjectCardProps {
  project: Project;
}

export default function MobileProjectCard({ project }: MobileProjectCardProps) {
  const isClickable = !!project.href;
  const tagsText = project.tags ? project.tags.join(" · ") : "";

  const cardContent = (
    <div className="flex flex-col items-center gap-5 w-full text-center group">
      {/* Phone Mockup Frame Container */}
      <motion.div
        variants={{
          initial: { y: 0 },
          hover: isClickable ? { y: -8 } : { y: 0 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-[80%] max-w-[280px] mx-auto"
      >
        <PhoneFrame>
          <div className="absolute inset-0">
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
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                className="object-fill"
              />
            )}
          </div>
        </PhoneFrame>
      </motion.div>

      {/* Info Block (Centered) */}
      <div className="flex flex-col items-center gap-1.5 px-2 mt-1">
        {/* Project Name */}
        <h3 className={`text-lg sm:text-xl font-syne font-semibold flex items-center justify-center gap-1 transition-colors duration-300 ${
          isClickable 
            ? "text-brand-accent group-hover:text-brand-accent/80" 
            : "text-[#0a1628]"
        }`}>
          {project.name}
          {isClickable && <span className="text-xs">↗</span>}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#0a1628]/80 font-manrope leading-relaxed max-w-[280px]">
          {project.description}
        </p>

        {/* Tags Metadata Row */}
        {tagsText && (
          <div className="text-[10px] font-dm-mono uppercase tracking-wider text-[#0a1628]/60 mt-1 select-none">
            {tagsText}
          </div>
        )}
      </div>
    </div>
  );

  if (isClickable) {
    return (
      <Link href={project.href || "#"} className="block w-full">
        <motion.div initial="initial" whileHover="hover" className="w-full">
          {cardContent}
        </motion.div>
      </Link>
    );
  }

  return <div className="block w-full">{cardContent}</div>;
}
