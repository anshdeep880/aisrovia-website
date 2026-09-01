"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    // 1. If Lenis smooth scroll is attached to window (e.g. Services page)
    if (typeof window !== "undefined" && (window as any).lenis) {
      try {
        (window as any).lenis.scrollTo(0, { duration: 1.2 });
      } catch (e) {
        // Fallback if Lenis fails
      }
    }

    // 2. Standard native smooth scroll
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    // 3. Fallback for documentElement / body
    try {
      if (document.documentElement) {
        document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
      }
      if (document.body) {
        document.body.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (e) {
      // Ignore fallback errors
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          className="fixed bottom-[84px] right-4 sm:bottom-6 sm:right-6 z-[9990] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0a1628]/95 hover:bg-[#00aaff] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_35px_rgba(0,170,255,0.4)] backdrop-blur-md border border-white/20 transition-all duration-300 group cursor-pointer active:scale-95"
          aria-label="Scroll to top of page"
          title="Scroll to top"
        >
          <svg
            className="w-5 h-5 fill-none stroke-current stroke-[2.5] transform group-hover:-translate-y-0.5 transition-transform duration-200"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 15l-6-6-6 6" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
