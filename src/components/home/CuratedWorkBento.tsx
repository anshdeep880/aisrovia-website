"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BrowserFrame from "@/src/components/work/BrowserFrame";
import PhoneFrame from "@/src/components/work/PhoneFrame";
import ViewportVideo from "@/src/components/home/ViewportVideo";
import SpotlightCard from "@/src/components/home/ui/SpotlightCard";
import { CURATED_SYSTEMS, WORK_PATH } from "@/src/data/home.data";

export default function CuratedWorkBento() {
  return (
    <section
      aria-labelledby="curated-work-heading"
      className="relative w-full bg-[#0a1628] text-[#edeae4] py-28 md:py-36 overflow-x-clip"
    >
      {/* Subtle center ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(0,170,255,0.07)_0%,transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header with Generous Clearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5">
              <span className="h-px w-7 bg-[#00aaff]" />
              <span className="font-dm-mono text-[11px] sm:text-xs font-medium uppercase tracking-[0.18em] text-[#00aaff]">
                PROVEN WORK
              </span>
            </div>
            <h2
              id="curated-work-heading"
              className="!m-0 mt-4 font-syne text-3xl sm:text-4xl lg:text-[2.95rem] font-bold !leading-[1.08] !tracking-[-0.03em] text-[#edeae4]"
            >
              Built for real-world daily operations.
            </h2>
          </div>

          <Link
            href={WORK_PATH}
            style={{ color: "#edeae4" }}
            className="group inline-flex items-center gap-2.5 self-start md:self-auto rounded-full border border-[#edeae4]/20 bg-white/[0.04] hover:bg-[#00aaff] hover:border-[#00aaff] px-6 py-3 font-dm-mono text-xs uppercase tracking-[0.14em] !text-[#edeae4] hover:!text-[#0a1628] transition-all duration-200"
          >
            <span className="font-medium">Explore All Projects</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#00aaff] group-hover:text-[#0a1628] transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* True Asymmetric 7/5 + 5/7 Bento Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {CURATED_SYSTEMS.map((item, idx) => {
            const isWide = item.colSpan === "wide";
            const colClass = isWide ? "lg:col-span-7" : "lg:col-span-5";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: (idx % 2) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={colClass}
              >
                <SpotlightCard className="h-full rounded-3xl border border-[#edeae4]/12 bg-[#0d1c33]/85 shadow-[0_24px_60px_rgba(0,0,0,0.4)] transition-colors duration-300 hover:border-[#00aaff]/35">
                  <Link
                    href={item.href}
                    style={{ color: "#edeae4" }}
                    className="group flex h-full flex-col justify-between p-5 sm:p-7"
                  >
                    {/* Media Stage */}
                    <div className="relative w-full overflow-hidden rounded-2xl bg-[#071120] border border-white/[0.07] flex items-center justify-center">
                      {item.frameType === "browser" ? (
                        <div className="w-full p-2.5 sm:p-3.5 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                          <BrowserFrame>
                            <ViewportVideo
                              src={item.video}
                              poster={item.poster}
                              ariaLabel={`${item.title} live preview`}
                              className="h-full w-full object-cover"
                            />
                          </BrowserFrame>
                        </div>
                      ) : (
                        <div
                          className="relative w-full py-6 px-4 flex items-center justify-center"
                          style={{
                            backgroundImage: `
                              radial-gradient(circle at 50% 50%, rgba(0, 170, 255, 0.14), transparent 70%),
                              linear-gradient(to right, rgba(237, 234, 228, 0.04) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(237, 234, 228, 0.04) 1px, transparent 1px)
                            `,
                            backgroundSize: "100% 100%, 32px 32px, 32px 32px",
                          }}
                        >
                          <div className="w-[152px] sm:w-[168px] drop-shadow-[0_20px_36px_rgba(0,0,0,0.65)] transition-transform duration-500 ease-out group-hover:scale-[1.02] group-hover:-translate-y-1">
                            <PhoneFrame>
                              <ViewportVideo
                                src={item.video}
                                poster={item.poster}
                                ariaLabel={`${item.title} mobile app preview`}
                                className="h-full w-full object-cover"
                              />
                            </PhoneFrame>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer Copy + Interactive Sliding Arrow Pill */}
                    <div className="mt-6 flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center rounded-full border border-[#00aaff]/30 bg-[#00aaff]/10 px-3 py-1 font-dm-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#00aaff]">
                          {item.tag}
                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#edeae4]/15 bg-white/[0.04] px-3.5 py-1 font-dm-mono text-[10px] uppercase tracking-[0.12em] text-[#edeae4]/85 transition-all duration-300 group-hover:border-[#00aaff] group-hover:bg-[#00aaff] group-hover:text-[#0a1628] group-hover:font-bold">
                          <span>View Case Study</span>
                          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                      </div>

                      <h3 className="font-syne text-xl sm:text-2xl font-bold tracking-tight text-[#edeae4] group-hover:text-white transition-colors">
                        {item.title}
                      </h3>

                      <p className="font-manrope text-sm sm:text-[15px] leading-relaxed text-[#a6b0c0]">
                        {item.hook}
                      </p>
                    </div>
                  </Link>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
