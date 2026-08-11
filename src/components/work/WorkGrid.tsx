"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/src/data/projects";
import WebProjectCard from "./WebProjectCard";
import MobileProjectCard from "./MobileProjectCard";
import MobileCarousel from "./MobileCarousel";

interface WorkGridProps {
  projects: Project[];
}

export default function WorkGrid({ projects }: WorkGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Works" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "erp", label: "ERP & Accounting" },
    { id: "food", label: "Food & Dining" },
    { id: "utility", label: "Real-time & GPS Utilities" },
  ];

  const matchFilter = (project: Project, filter: string) => {
    if (filter === "all") return true;
    if (filter === "mobile") return project.variant === "mobile";
    if (filter === "erp") {
      const text = (project.name + " " + project.category + " " + project.description).toLowerCase();
      return text.includes("erp") || text.includes("billing") || text.includes("accounting") || text.includes("payroll") || text.includes("biometric") || text.includes("stock");
    }
    if (filter === "food") {
      const text = (project.name + " " + project.category + " " + project.description).toLowerCase();
      return text.includes("food") || text.includes("restaurant") || text.includes("juicist") || text.includes("bistro") || text.includes("streetbites");
    }
    if (filter === "utility") {
      const text = (project.name + " " + project.category + " " + project.description + " " + (project.tags || []).join(" ")).toLowerCase();
      return text.includes("gps") || text.includes("realtime") || text.includes("real-time") || text.includes("workflow") || text.includes("security") || text.includes("attendance") || text.includes("tracking") || text.includes("task") || text.includes("rentmaster") || text.includes("maps");
    }
    return true;
  };

  const filteredProjects = projects.filter((p) => matchFilter(p, activeFilter));
  const webProjects = filteredProjects.filter((p) => p.variant === "web");
  const mobileProjects = filteredProjects.filter((p) => p.variant === "mobile");

  return (
    <div className="w-full flex flex-col gap-12 md:gap-16">
      
      {/* Premium Filter Pill Bar */}
      <div className="w-full flex justify-center pb-4 px-2 sm:px-0">
        <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 p-1.5 bg-white/40 border border-[#0a1628]/5 rounded-2xl sm:rounded-full shadow-sm backdrop-blur-md">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`relative px-4 py-2 rounded-full font-dm-mono text-[10px] sm:text-xs uppercase tracking-wider transition-colors duration-300 font-semibold select-none outline-none ${
                  isActive ? "text-white" : "text-[#0a1628]/60 hover:text-[#0a1628]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-[#0a1628] rounded-full z-0"
                  />
                )}
                <span className="relative z-10">{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full flex flex-col gap-20 md:gap-28 mt-4">
        <AnimatePresence mode="popLayout">
          {/* Web & Software Projects Section */}
          {webProjects.length > 0 && (
            <motion.section
              key="web-section"
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full flex flex-col gap-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 md:gap-y-24">
                {webProjects.map((project) => (
                  <motion.div key={project.id} layout>
                    <WebProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Mobile App Projects Section */}
          {mobileProjects.length > 0 && (
            <motion.section
              key="mobile-section"
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full pt-16 border-t border-[#0a1628]/10 flex flex-col gap-12"
            >
              <div className="flex flex-col gap-2">
                <span className="font-dm-mono text-xs uppercase tracking-widest text-brand-accent">
                  Mobile Apps
                </span>
                <h2 className="font-syne text-2xl sm:text-3xl font-bold tracking-tight text-[#0a1628]">
                  Handheld Solutions
                </h2>
              </div>

              <div className="hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-16">
                {mobileProjects.map((project) => (
                  <motion.div key={project.id} layout>
                    <MobileProjectCard project={project} />
                  </motion.div>
                ))}
              </div>

              <MobileCarousel projects={mobileProjects} />
            </motion.section>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full py-20 text-center text-[#0a1628]/50 font-dm-mono text-sm uppercase tracking-wider"
          >
            No projects matched this filter.
          </motion.div>
        )}
      </div>
    </div>
  );
}
