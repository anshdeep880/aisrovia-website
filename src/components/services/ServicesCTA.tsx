"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ServicesCTA() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#0a1628] text-[#edeae4] overflow-hidden flex flex-col justify-center items-center text-center px-6 sm:px-12 select-none">
      {/* Background radial accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,170,255,0.06),rgba(0,0,0,0))]" />

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center gap-6 sm:gap-8">
        {/* Eyebrow */}
        <span className="text-xs sm:text-sm font-dm-mono uppercase tracking-[0.25em] text-[#00aaff]">
          [ START A PROJECT ]
        </span>

        {/* Headline */}
        <h2 className="font-syne text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl leading-[1.1]">
          Ready to build your next system?
        </h2>

        {/* Description */}
        <p className="max-w-lg text-sm sm:text-base text-[#edeae4]/75 font-manrope leading-relaxed">
          Let’s discuss your operational bottlenecks and custom-engineer high-performance digital infrastructure.
        </p>

        {/* Action Button */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 sm:mt-8"
        >
          <Link
            href="/#contact"
            className="inline-flex px-8 py-4 rounded-full bg-[#edeae4] font-dm-mono text-xs sm:text-sm uppercase tracking-widest font-semibold hover:bg-white transition-colors duration-300 shadow-xl"
            style={{ color: "#0a1628" }}
          >
            Start a project <span className="ml-1" style={{ color: "#00aaff" }}>↗</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
