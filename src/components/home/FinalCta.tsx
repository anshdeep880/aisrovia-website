"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import BorderBeam from "@/src/components/home/ui/BorderBeam";
import { CONTACT_PATH, WHATSAPP_URL } from "@/src/data/home.data";

export default function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative w-full bg-[#0a1628] text-[#edeae4] pt-16 pb-36 md:pt-24 md:pb-40 overflow-x-clip"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[#00aaff]/25 bg-[#0c1b31]/90 px-6 py-16 sm:px-14 sm:py-22 text-center shadow-[0_28px_90px_rgba(0,170,255,0.14)]"
        >
          {/* Animated Conic BorderBeam */}
          <BorderBeam durationSeconds={9} borderWidth={1.5} />

          {/* Radial Cyan Mesh Glow Behind Headline */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-[340px] w-[620px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,170,255,0.24)_0%,rgba(0,170,255,0.06)_45%,transparent_75%)] blur-2xl"
          />

          {/* Subtle Grid Texture Inside Card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(237, 234, 228, 0.06) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(237, 234, 228, 0.06) 1px, transparent 1px)
              `,
              backgroundSize: "44px 44px",
              maskImage:
                "radial-gradient(ellipse 75% 65% at 50% 35%, #000 20%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 75% 65% at 50% 35%, #000 20%, transparent 80%)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-2xl flex flex-col items-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00aaff]/30 bg-[#00aaff]/10 px-3.5 py-1 font-dm-mono text-[10px] uppercase tracking-[0.18em] text-[#00aaff]">
              <Sparkles className="h-3 w-3" />
              <span>START YOUR ARCHITECTURE</span>
            </span>

            <h2
              id="final-cta-heading"
              className="!m-0 mt-5 font-syne text-3xl sm:text-4xl lg:text-[2.85rem] font-bold !leading-[1.08] !tracking-[-0.03em] text-[#edeae4] text-balance"
            >
              Still running operations on spreadsheets or manual registers?
            </h2>

            <p className="mt-4 max-w-xl font-manrope text-base sm:text-lg leading-relaxed text-[#a6b0c0]">
              Share your workflow. We&apos;ll architect a custom system built
              specifically for your business.
            </p>

            {/* Dual High-Intent Conversion Buttons */}
            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full sm:w-auto">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0a1628" }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#00aaff] hover:bg-[#19b3ff] px-8 py-4 font-manrope text-sm sm:text-[15px] font-bold !text-[#0a1628] shadow-[0_12px_34px_rgba(0,170,255,0.34)] hover:shadow-[0_14px_44px_rgba(0,170,255,0.48)] transition-all duration-200 active:scale-[0.98]"
              >
                <span>WhatsApp Us Directly</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <Link
                href={CONTACT_PATH}
                style={{ color: "#edeae4" }}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#edeae4]/25 bg-white/[0.05] hover:bg-white/[0.1] hover:border-[#00aaff]/45 backdrop-blur-md px-8 py-4 font-manrope text-sm sm:text-[15px] font-semibold !text-[#edeae4] transition-all duration-200 active:scale-[0.98]"
              >
                <span>Send Project Inquiry</span>
                <ArrowRight className="h-4 w-4 text-[#00aaff] transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <p className="mt-8 font-dm-mono text-[11px] sm:text-xs tracking-[0.06em] text-[#a6b0c0]">
              Or ask our AI Assistant below anything about our work.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
