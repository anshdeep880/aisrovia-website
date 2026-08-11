"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import BrowserFrame from "@/src/components/work/BrowserFrame";
import PhoneFrame from "@/src/components/work/PhoneFrame";
import { projects } from "@/src/data/projects";

export default function MobileShopERPCaseStudy() {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.7) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Recommendations: Exclude mobile-shop-erp and select 2 key projects
  const recommendedProjects = projects
    .filter((p) => p.id !== "mobile-shop-erp")
    .slice(0, 2);

  const cardGradients: Record<string, string> = {
    "the-juicist": "from-[#1565c0] to-[#0d4fa0]",
    "jwellery-management": "from-[#5c4033] to-[#8b5a2b]",
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f7fb] text-[#0a1628] flex flex-col font-manrope selection:bg-brand-accent selection:text-white">
      
      {/* CHAPTER 01 — HERO (Blue Gradient Bg) */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen pt-8 pb-20 md:pb-32 px-6 md:px-12 lg:px-16 xl:px-20 flex flex-col justify-between bg-[radial-gradient(circle_at_center,_#1565c0_0%,_#0a4d8f_60%,_#052c58_100%)] text-white overflow-hidden"
      >
        {/* Top Navigation */}
        <div className="w-full flex justify-between items-center mb-12 sm:mb-20">
          <Link
            href="/work"
            className="group flex items-center gap-2 text-xs font-dm-mono uppercase tracking-widest text-white/80 hover:text-white transition-colors"
          >
            <span className="inline-block transform group-hover:-translate-x-1 transition-transform">
              ←
            </span>{" "}
            All Work
          </Link>
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 md:gap-14 flex-grow justify-center">
          <div className="flex flex-col gap-4 max-w-4xl text-left">
            <span className="font-dm-mono text-xs uppercase tracking-widest text-white/60 select-none">
              MAHADEV MOBILES · 2025 · ERP, DESKTOP, ANDROID
            </span>
            <h1 className="font-syne text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              Mobile Shop ERP System
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/85 font-manrope max-w-3xl leading-relaxed mt-2">
              A fast, complete retail ERP for billing, inventory, returns, and staff operations at a mobile retail store.
            </p>
          </div>

          {/* Hero Video Phone Mockup */}
          <div className="max-w-[360px] sm:max-w-[420px] mx-auto w-full shadow-[0_30px_80px_rgba(0,0,0,0.4)] rounded-[40px] overflow-hidden">
            <PhoneFrame>
              <div className="absolute inset-0 bg-slate-950">
                <video
                  src="/assets/Projects Images/Mobile Shop ERP/video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  controls={false}
                  className="w-full h-full object-fill pointer-events-none"
                />
              </div>
            </PhoneFrame>
          </div>
        </div>
      </section>

      {/* CHAPTER 02 — THE STORY */}
      <section className="w-full py-20 md:py-32 px-6 md:px-12 lg:px-16 xl:px-20 bg-[#f4f7fb] border-b border-[#0a1628]/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          {/* Chapter Label */}
          <div className="flex flex-col gap-1">
            <span className="font-dm-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#0a1628]/50">
              Chapter 02
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl font-bold tracking-tight text-[#0a1628]">
              The Story
            </h2>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left Column: Story Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-[#0a1628]/90 text-base sm:text-lg leading-relaxed font-manrope">
              <p>
                Retail billing has to be fast or the counter backs up. I built a desktop and Android ERP where every sale automatically deducts stock, generates a shareable bill, and rolls straight into profit and expense reports — no separate stock reconciliation step.
              </p>
              <p>
                By replacing legacy checkouts with integrated SMS APIs and IMEI serial code trackers, Mahadev Mobiles optimized their checkout pipeline. Counter registers push transactions automatically to regional clouds, keeping stock details clean and synced.
              </p>
            </div>

            {/* Right Column: Meta Info */}
            <div className="lg:col-span-5 flex flex-col gap-8 bg-white border border-[#0a1628]/5 p-8 sm:p-10 rounded-3xl shadow-sm">
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 font-manrope text-sm text-[#0a1628]">
                <div className="flex flex-col gap-1.5">
                  <span className="font-dm-mono text-[10px] uppercase tracking-wider text-[#0a1628]/50">
                    Role
                  </span>
                  <span className="font-semibold text-xs sm:text-sm">
                    Full-Stack Developer
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="font-dm-mono text-[10px] uppercase tracking-wider text-[#0a1628]/50">
                    Client
                  </span>
                  <span className="font-semibold text-xs sm:text-sm">
                    Mahadev Mobiles, India
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 col-span-2">
                  <span className="font-dm-mono text-[10px] uppercase tracking-wider text-[#0a1628]/50">
                    Scope
                  </span>
                  <span className="font-semibold text-xs sm:text-sm">
                    Desktop App · Android App · Billing · Inventory
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="font-dm-mono text-[10px] uppercase tracking-wider text-[#0a1628]/50">
                    Year
                  </span>
                  <span className="font-semibold text-xs sm:text-sm">2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-[#0a1628]/10 mt-6">
            <div className="flex flex-col gap-2 p-8 bg-white border border-[#0a1628]/5 rounded-3xl shadow-sm text-center hover:border-brand-accent/25 hover:shadow-md transition-all duration-300">
              <span className="font-syne text-4xl lg:text-5xl font-extrabold text-brand-accent">
                2
              </span>
              <span className="font-dm-mono text-xs uppercase tracking-wider text-[#0a1628]/60 mt-1">
                Connected Applications
              </span>
            </div>
            <div className="flex flex-col gap-2 p-8 bg-white border border-[#0a1628]/5 rounded-3xl shadow-sm text-center hover:border-brand-accent/25 hover:shadow-md transition-all duration-300">
              <span className="font-syne text-4xl lg:text-5xl font-extrabold text-brand-accent">
                Auto
              </span>
              <span className="font-dm-mono text-xs uppercase tracking-wider text-[#0a1628]/60 mt-1">
                Bill Sharing via SMS
              </span>
            </div>
            <div className="flex flex-col gap-2 p-8 bg-white border border-[#0a1628]/5 rounded-3xl shadow-sm text-center hover:border-brand-accent/25 hover:shadow-md transition-all duration-300">
              <span className="font-syne text-4xl lg:text-5xl font-extrabold text-brand-accent">
                Live
              </span>
              <span className="font-dm-mono text-xs uppercase tracking-wider text-[#0a1628]/60 mt-1">
                Stock Deduction sync
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 03 — WHO'S USING IT */}
      <section className="w-full py-20 md:py-32 px-6 md:px-12 lg:px-16 xl:px-20 bg-[#f4f7fb] border-b border-[#0a1628]/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-2 max-w-3xl">
            <span className="font-dm-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#0a1628]/50">
              Chapter 03
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl font-bold tracking-tight text-[#0a1628] leading-tight">
              Bridging billing queues, store owners, and inventory rooms.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Counter Staff */}
            <div className="flex flex-col justify-between bg-white border border-slate-100 hover:border-brand-accent/20 p-8 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/5 flex items-center justify-center text-brand-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-syne text-lg font-bold text-[#0a1628]">
                    Counter Staff
                  </h3>
                  <span className="font-dm-mono text-[9px] uppercase tracking-widest text-[#0a1628]/40">
                    Billing Register
                  </span>
                </div>
                <p className="text-sm text-[#0a1628]/75 leading-relaxed font-manrope">
                  Calculates checkout tickets, processes mobile returns, and triggers automatic digital receipts for clients.
                </p>
              </div>
              <div className="mt-8 p-4 rounded-2xl bg-[#fff5f5] border border-red-100 flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-dm-mono text-[9px] font-bold text-red-600 uppercase tracking-widest">
                    THE PAIN
                  </span>
                </div>
                <p className="text-xs text-red-900/90 leading-normal font-medium">
                  Slow manual checkouts and receipt printing bottlenecks during high-traffic sales windows.
                </p>
              </div>
            </div>

            {/* Card 2: Store Owner */}
            <div className="flex flex-col justify-between bg-white border border-slate-100 hover:border-brand-accent/20 p-8 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/5 flex items-center justify-center text-brand-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-syne text-lg font-bold text-[#0a1628]">
                    Store Owner
                  </h3>
                  <span className="font-dm-mono text-[9px] uppercase tracking-widest text-[#0a1628]/40">
                    Operations Analytics
                  </span>
                </div>
                <p className="text-sm text-[#0a1628]/75 leading-relaxed font-manrope">
                  Tracks net margins, monitors overhead business expenses, and views dynamic sales reports.
                </p>
              </div>
              <div className="mt-8 p-4 rounded-2xl bg-[#fff5f5] border border-red-100 flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-dm-mono text-[9px] font-bold text-red-600 uppercase tracking-widest">
                    THE PAIN
                  </span>
                </div>
                <p className="text-xs text-red-900/90 leading-normal font-medium">
                  No visibility into daily profits vs. operating costs without reviewing manual ledger logs.
                </p>
              </div>
            </div>

            {/* Card 3: Inventory Manager */}
            <div className="flex flex-col justify-between bg-white border border-slate-100 hover:border-brand-accent/20 p-8 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/5 flex items-center justify-center text-brand-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-syne text-lg font-bold text-[#0a1628]">
                    Inventory Manager
                  </h3>
                  <span className="font-dm-mono text-[9px] uppercase tracking-widest text-[#0a1628]/40">
                    Stockroom Tracking
                  </span>
                </div>
                <p className="text-sm text-[#0a1628]/75 leading-relaxed font-manrope">
                  Audits incoming hardware supplies, tracks stock levels, and records manufacturer purchase logs.
                </p>
              </div>
              <div className="mt-8 p-4 rounded-2xl bg-[#fff5f5] border border-red-100 flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-dm-mono text-[9px] font-bold text-red-600 uppercase tracking-widest">
                    THE PAIN
                  </span>
                </div>
                <p className="text-xs text-red-900/90 leading-normal font-medium">
                  Stock audits drifting constantly from the actual physical shelf assets.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CHAPTER 04 — HOW IT WAS BUILT */}
      <section className="w-full py-20 md:py-32 px-6 md:px-12 lg:px-16 xl:px-20 bg-[#f4f7fb] border-b border-[#0a1628]/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-1">
            <span className="font-dm-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#0a1628]/50">
              Chapter 04
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl font-bold tracking-tight text-[#0a1628]">
              How It Was Built
            </h2>
          </div>

          <div className="max-w-3xl text-[#0a1628]/95 text-base sm:text-lg leading-relaxed font-manrope border-l-4 border-brand-accent pl-6 py-2">
            <h3 className="font-syne text-xl font-bold mb-2">Technical Approach</h3>
            <p>
              The application leverages high-performance caching for instant barcode responses on desktop terminals. Background workers route invoicing data to inventory queues and SMS delivery channels asynchronously, enabling rapid transactions under heavy client loads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            
            {/* Feature 1 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Fast Invoicing & Printing
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                Touch-first checkouts, integrated barcode scanning, and instant thermal printing setups.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Sales & Item Returns
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                Streamlined exchanges, credit note deductions, and automated returns management.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Auto Bill Sharing
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                Automated API routing to share digital invoices via SMS or WhatsApp right at transaction checkout.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Inventory & IMEI Deduction
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                IMEI-specific serial ledger mapping that decrements active stocks automatically on checkouts.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Expense Management
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                Clean ledger categories to track store operating costs, utility bills, and minor cash payouts.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Reports & Profit Analytics
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                Automated margin summaries detailing top-selling mobile brands and net revenue indicators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 05 — THE CHALLENGE */}
      <section className="w-full py-20 md:py-32 px-6 md:px-12 lg:px-16 xl:px-20 bg-[#f4f7fb] border-b border-[#0a1628]/5">
        <div className="max-w-3xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-1 text-center">
            <span className="font-dm-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#0a1628]/50">
              Chapter 05
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl font-bold tracking-tight text-[#0a1628]">
              The Challenge
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-[#0a1628]/95 text-base sm:text-lg leading-relaxed font-manrope">
            <p className="font-semibold text-lg sm:text-xl text-center text-[#0a1628]">
              "Keeping billing speed high while stocks deduct and profit reports update in real-time was the core hurdle."
            </p>
            <p>
              During peak store hours, locking the database to deduct specific IMEI serial codes and recalculate cumulative sales reports would cause significant lag on checkout terminals.
            </p>
            <p>
              To solve this, I designed a queued inventory ledger. The billing counters execute local transactions instantly using local database state, while ledger operations, SMS receipts, and financial updates are dispatched to background queue workers to run in parallel.
            </p>
          </div>
        </div>
      </section>

      {/* CHAPTER 06 — IMPACT / CLOSE */}
      <section className="w-full py-24 md:py-36 px-6 md:px-12 lg:px-16 xl:px-20 bg-[#f4f7fb] text-center border-b border-[#0a1628]/5">
        <div className="max-w-4xl mx-auto flex flex-col gap-14 sm:gap-20">
          <div className="flex flex-col gap-2">
            <span className="font-dm-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#0a1628]/50">
              Chapter 06
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl font-bold tracking-tight text-[#0a1628]">
              The Results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-3 p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.05)]">
              <span className="font-manrope text-5xl sm:text-6xl font-extrabold tracking-tight text-[#0a1628]">
                500+
              </span>
              <span className="font-dm-mono text-[10px] uppercase tracking-wider text-[#0a1628]/50 mt-1 max-w-[200px] leading-relaxed">
                Bills generated daily
              </span>
            </div>

            <div className="flex flex-col items-center gap-3 p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.05)]">
              <span className="font-manrope text-5xl sm:text-6xl font-extrabold tracking-tight text-[#0a1628]">
                65%
              </span>
              <span className="font-dm-mono text-[10px] uppercase tracking-wider text-[#0a1628]/50 mt-1 max-w-[200px] leading-relaxed">
                Reduction in billing checkout time
              </span>
            </div>

            <div className="flex flex-col items-center gap-3 p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.05)]">
              <span className="font-manrope text-5xl sm:text-6xl font-extrabold tracking-tight text-[#0a1628]">
                100%
              </span>
              <span className="font-dm-mono text-[10px] uppercase tracking-wider text-[#0a1628]/50 mt-1 max-w-[200px] leading-relaxed">
                Real-time stock sync accuracy
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-8 items-center mt-6">
            <p className="text-[#0a1628]/80 text-base sm:text-lg max-w-2xl leading-relaxed">
              Mahadev Mobiles optimized their checkout registers completely, ensuring billing queues move rapidly while stock books balance in real time.
            </p>
          </div>
        </div>
      </section>

      {/* EXPLORE MORE WORK SECTION */}
      <section className="w-full py-20 md:py-32 px-6 md:px-12 lg:px-16 xl:px-20 bg-[#f4f7fb]">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex justify-between items-end border-b border-[#0a1628]/10 pb-6">
            <div className="flex flex-col gap-1">
              <span className="font-dm-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#0a1628]/50">
                Explore More Work
              </span>
              <h2 className="font-syne text-2xl sm:text-3xl font-bold tracking-tight text-[#0a1628]">
                Other Digital Ecosystems
              </h2>
            </div>
            <Link
              href="/work"
              className="font-dm-mono text-xs uppercase tracking-widest text-[#0a1628] hover:text-[#00aaff] transition-colors pb-1 border-b border-transparent hover:border-[#00aaff]"
            >
              View All Work →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {recommendedProjects.map((project) => {
              const bgGradient =
                cardGradients[project.id] || "from-[#1e293b] to-[#475569]";
              return (
                <Link
                  key={project.id}
                  href={project.href || `/work/${project.id}`}
                  className="group block w-full text-left"
                >
                  <div className="flex flex-col gap-5 w-full">
                    <div
                      className={`
                        rounded-3xl
                        px-6 py-10 sm:py-16
                        bg-gradient-to-br ${bgGradient}
                        border border-white/10
                        flex items-center justify-center
                        shadow-[0_15px_35px_-15px_rgba(10,22,40,0.15)]
                        group-hover:shadow-[0_25px_50px_-15px_rgba(10,22,40,0.25)]
                        group-hover:-translate-y-1
                        transition-all duration-300
                      `}
                    >
                      <div className="w-[85%] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                        <BrowserFrame>
                          <div className="relative w-full aspect-[16/9] bg-slate-900">
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
                              <img
                                src={project.image}
                                alt={project.name}
                                className="w-full h-full object-fill pointer-events-none"
                              />
                            )}
                          </div>
                        </BrowserFrame>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 px-1">
                      <div className="flex justify-between items-center text-[10px] font-dm-mono uppercase tracking-wider text-[#0a1628]/50 select-none">
                        <span>
                          {project.client} <span className="mx-1 opacity-40">·</span> {project.category}
                        </span>
                        <span>{project.year}</span>
                      </div>
                      <h3 className="text-xl font-syne font-bold text-[#0a1628] group-hover:text-brand-accent transition-colors duration-300 flex items-center gap-1.5">
                        {project.name}
                        <span className="text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                          ↗
                        </span>
                      </h3>
                      <p className="text-sm text-[#0a1628]/70 font-manrope leading-relaxed">
                        {project.headline || project.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* STICKY BOTTOM BREADCRUMB BAR */}
      <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
        <div
          className={`pointer-events-auto px-4 py-2.5 rounded-full flex items-center gap-2.5 font-dm-mono text-xs shadow-md transition-all duration-300 border backdrop-blur-md ${
            isHeroInView
              ? "bg-white/10 text-white border-white/20"
              : "bg-white/80 text-[#0a1628] border-[#0a1628]/10"
          }`}
        >
          <Link
            href="/work"
            className="hover:underline transition-all flex items-center gap-1 font-semibold"
          >
            ← All Work
          </Link>
          <span className="opacity-40">|</span>
          <span className="opacity-70">Mahadev Mobiles</span>
          <span className="opacity-30">/</span>
          <span className="opacity-55 font-medium">Mobile Shop ERP System</span>
        </div>
      </div>

      {/* SCROLL-UP CIRCULAR BUTTON */}
      <AnimatePresence>
        {showScrollUp && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#0a1628] hover:bg-[#00aaff] text-white flex items-center justify-center shadow-lg transition-colors border border-white/10"
            aria-label="Scroll to top"
          >
            <svg
              className="w-4 h-4 fill-none stroke-current stroke-2"
              viewBox="0 0 24 24"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
