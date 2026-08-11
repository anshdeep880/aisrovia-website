"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const PILLS = [
  "AI Chatbots",
  "ERP Systems",
  "Web & Mobile Apps",
  "Business Automation",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function ServicesHero() {
  const [activePillIndex, setActivePillIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActivePillIndex((prev) => (prev + 1) % PILLS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] sm:min-h-screen flex flex-col justify-center items-center bg-[#0a1628] text-[#edeae4] px-6 sm:px-12 py-24 select-none overflow-hidden">
      {/* Styles for drift and travel animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes drift {
          0%, 100% { transform: translate(-50%, -50%) translate(-20px, -20px) scale(1); }
          50% { transform: translate(-50%, -50%) translate(20px, 20px) scale(1.1); }
        }
        .mesh-bg {
          animation: drift 8s ease-in-out infinite;
        }
        @keyframes travel {
          0% { transform: translate(-50%, 0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(-50%, 34px); opacity: 0; }
        }
        .scroll-dot {
          animation: travel 2s ease-in-out infinite;
        }
      `}} />

      {/* Background ambient accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,170,255,0.08),rgba(255,255,255,0))]" />

      {/* Radial gradient mesh background layer */}
      <div className="absolute top-1/2 left-1/2 w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,170,255,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0 mesh-bg" />

      {/* Oversized ghost text behind headline */}
      <div 
        className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-syne font-bold text-[34vw] text-[#edeae4] opacity-[0.015] blur-[12px] leading-none select-none pointer-events-none z-0 tracking-tighter"
        style={{
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 95%)"
        }}
      >
        BUILD
      </div>

      <div className="relative z-10 max-w-5xl w-full text-center flex flex-col items-center gap-6 sm:gap-8">
        {/* Eyebrow Label with flanking thin horizontal lines */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-4 text-xs sm:text-sm font-dm-mono uppercase tracking-[0.25em] text-[#00aaff]"
        >
          <div className="w-10 h-[1px] bg-[#00aaff]/30" />
          <span>[ OUR CAPABILITIES ]</span>
          <div className="w-10 h-[1px] bg-[#00aaff]/30" />
        </motion.div>

        {/* Title */}
        <h1
          className="font-syne text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[1.05] text-[#edeae4] flex flex-wrap justify-center gap-x-4 sm:gap-x-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            What We
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="font-extrabold text-[#edeae4]"
          >
            Build
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-2xl text-base sm:text-lg text-[#edeae4]/75 font-manrope leading-relaxed mt-2"
        >
          We engineer robust digital infrastructure, bespoke enterprise suites, and 
          conversational AI interfaces tailored with execution rigor.
        </motion.p>

        {/* Tag Pills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-12 max-w-3xl"
        >
          {PILLS.map((pill, idx) => {
            const isActive = activePillIndex === idx;
            return (
              <motion.span
                key={pill}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-full border text-xs sm:text-sm font-dm-mono uppercase tracking-wider text-[#edeae4] bg-white/5 transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? "border-[#00aaff] shadow-[0_0_12px_rgba(0,170,255,0.25)]" 
                    : "border-white/10 hover:border-[#00aaff]"
                }`}
              >
                {pill}
              </motion.span>
            );
          })}
        </motion.div>
      </div>

      {/* Down arrow or indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] font-dm-mono tracking-widest text-[#edeae4]/40 uppercase">Scroll</span>
        <div className="relative w-[1px] h-10 bg-gradient-to-b from-[#edeae4]/40 to-transparent">
          <div className="absolute top-0 left-1/2 w-1.5 h-1.5 rounded-full bg-[#00aaff] scroll-dot" />
        </div>
      </motion.div>
    </section>
  );
}
