"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import BrowserFrame from "@/src/components/work/BrowserFrame";
import { projects } from "@/src/data/projects";

export default function TheJuicistCaseStudy() {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle scroll to top button
      if (window.scrollY > window.innerHeight * 0.7) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // IntersectionObserver to detect if Hero (Chapter 1) is in view for breadcrumb styling
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

  // Recommendations: Exclude the-juicist and select 2 key web projects
  const recommendedProjects = projects
    .filter((p) => p.id !== "the-juicist")
    .slice(0, 2);

  // Custom colors for recommendation cards to make them pop
  const cardGradients: Record<string, string> = {
    "jwellery-management": "from-[#5c4033] to-[#8b5a2b]", // warm copper/gold for ERP
    "bill-stock-management": "from-[#1e293b] to-[#475569]", // slate for SaaS utility
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
              THE JUICIST · 2025 · WEB, MOBILE, AUTOMATION
            </span>
            <h1 className="font-syne text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              The Juicist Complete Management Platform
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/85 font-manrope max-w-3xl leading-relaxed mt-2">
              A multi-application ecosystem automating orders, production, warehouse operations, and delivery for an Australian cold-pressed juice brand.
            </p>
          </div>

          {/* Hero Video Browser Mockup */}
          <div className="w-full shadow-[0_30px_80px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
            <BrowserFrame>
              <div className="relative w-full aspect-[16/9] bg-slate-950">
                <video
                  src="/assets/Projects Images/The juicist/video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  controls={false}
                  className="w-full h-full object-fill pointer-events-none"
                />
              </div>
            </BrowserFrame>
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
                Five separate operations — customer ordering, production planning, warehouse picking, delivery routing, and Shopify sync — ran on disconnected spreadsheets and manual handoffs. I designed and built one connected platform: a customer app, an admin dashboard, a warehouse portal, and a driver app, all reading from the same live inventory and order data.
              </p>
              <p>
                By replacing fragmented communication channels with a unified ledger system, we consolidated client communications and eliminated human error. Order status changes seamlessly trigger updates throughout the pipeline, enabling real-time operation at every scale.
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
                    Full-Stack Developer & Systems Architect
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="font-dm-mono text-[10px] uppercase tracking-wider text-[#0a1628]/50">
                    Client
                  </span>
                  <span className="font-semibold text-xs sm:text-sm">
                    The Juicist, Australia
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 col-span-2">
                  <span className="font-dm-mono text-[10px] uppercase tracking-wider text-[#0a1628]/50">
                    Scope
                  </span>
                  <span className="font-semibold text-xs sm:text-sm">
                    Mobile App · Web Dashboard · Warehouse Portal · Delivery App · Shopify Integration
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
                4
              </span>
              <span className="font-dm-mono text-xs uppercase tracking-wider text-[#0a1628]/60 mt-1">
                Connected Applications
              </span>
            </div>
            <div className="flex flex-col gap-2 p-8 bg-white border border-[#0a1628]/5 rounded-3xl shadow-sm text-center hover:border-brand-accent/25 hover:shadow-md transition-all duration-300">
              <span className="font-syne text-4xl lg:text-5xl font-extrabold text-brand-accent">
                10+
              </span>
              <span className="font-dm-mono text-xs uppercase tracking-wider text-[#0a1628]/60 mt-1">
                Core Modules
              </span>
            </div>
            <div className="flex flex-col gap-2 p-8 bg-white border border-[#0a1628]/5 rounded-3xl shadow-sm text-center hover:border-brand-accent/25 hover:shadow-md transition-all duration-300">
              <span className="font-syne text-4xl lg:text-5xl font-extrabold text-brand-accent">
                100%
              </span>
              <span className="font-dm-mono text-xs uppercase tracking-wider text-[#0a1628]/60 mt-1">
                Shopify Sync In Real Time
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 03 — WHO'S USING IT */}
      <section className="w-full py-20 md:py-32 px-6 md:px-12 lg:px-16 xl:px-20 bg-[#f4f7fb] border-b border-[#0a1628]/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          {/* Section Header */}
          <div className="flex flex-col gap-2 max-w-3xl">
            <span className="font-dm-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#0a1628]/50">
              Chapter 03
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl font-bold tracking-tight text-[#0a1628] leading-tight">
              Four applications, four different jobs, one shared source of truth.
            </h2>
          </div>

          {/* Grid Layout: 4 Refined Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Customers */}
            <div className="flex flex-col justify-between bg-white border border-slate-100 hover:border-brand-accent/20 p-8 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/5 flex items-center justify-center text-brand-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-syne text-lg font-bold text-[#0a1628]">
                    Customers
                  </h3>
                  <span className="font-dm-mono text-[9px] uppercase tracking-widest text-[#0a1628]/40">
                    Mobile App
                  </span>
                </div>
                <p className="text-sm text-[#0a1628]/75 leading-relaxed font-manrope">
                  Allows users to order juices, customize recipes, and manage subscription bundles easily on the go.
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
                  No visibility into delivery timing or recipe customization options.
                </p>
              </div>
            </div>

            {/* Card 2: Admin/Ops Team */}
            <div className="flex flex-col justify-between bg-white border border-slate-100 hover:border-brand-accent/20 p-8 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/5 flex items-center justify-center text-brand-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-syne text-lg font-bold text-[#0a1628]">
                    Admin & Ops Team
                  </h3>
                  <span className="font-dm-mono text-[9px] uppercase tracking-widest text-[#0a1628]/40">
                    Dashboard Panel
                  </span>
                </div>
                <p className="text-sm text-[#0a1628]/75 leading-relaxed font-manrope">
                  Consolidated control center to manage orders, customer accounts, custom combos, and view sales reports.
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
                  Manually cross-checking Shopify order lists against physical stocks.
                </p>
              </div>
            </div>

            {/* Card 3: Warehouse Staff */}
            <div className="flex flex-col justify-between bg-white border border-slate-100 hover:border-brand-accent/20 p-8 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/5 flex items-center justify-center text-brand-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-syne text-lg font-bold text-[#0a1628]">
                    Warehouse Staff
                  </h3>
                  <span className="font-dm-mono text-[9px] uppercase tracking-widest text-[#0a1628]/40">
                    Portal UI
                  </span>
                </div>
                <p className="text-sm text-[#0a1628]/75 leading-relaxed font-manrope">
                  Dedicated interface for managing recipe batching, production planning, and picking workflows.
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
                  Printing separate Excel sheets for every production run, causing mixups.
                </p>
              </div>
            </div>

            {/* Card 4: Delivery Drivers */}
            <div className="flex flex-col justify-between bg-white border border-slate-100 hover:border-brand-accent/20 p-8 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/5 flex items-center justify-center text-brand-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-syne text-lg font-bold text-[#0a1628]">
                    Delivery Drivers
                  </h3>
                  <span className="font-dm-mono text-[9px] uppercase tracking-widest text-[#0a1628]/40">
                    Driver App
                  </span>
                </div>
                <p className="text-sm text-[#0a1628]/75 leading-relaxed font-manrope">
                  Simplifies route assignment, customer address navigation, and real-time delivery status logging.
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
                  No live tracking; routing and dispatch happened over manual phone calls.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CHAPTER 04 — HOW IT WAS BUILT */}
      <section className="w-full py-20 md:py-32 px-6 md:px-12 lg:px-16 xl:px-20 bg-[#f4f7fb] border-b border-[#0a1628]/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          {/* Chapter Header */}
          <div className="flex flex-col gap-1">
            <span className="font-dm-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#0a1628]/50">
              Chapter 04
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl font-bold tracking-tight text-[#0a1628]">
              How It Was Built
            </h2>
          </div>

          {/* Technical Approach Paragraph */}
          <div className="max-w-3xl text-[#0a1628]/95 text-base sm:text-lg leading-relaxed font-manrope border-l-4 border-brand-accent pl-6 py-2">
            <h3 className="font-syne text-xl font-bold mb-2">Technical Approach</h3>
            <p>
              Built on a modern stack utilizing Next.js for high-speed portals, Node.js microservices for background jobs, and a centralized PostgreSQL ledger for atomic inventory synchronization. Shopify webhooks are processed asynchronously via a serverless queue system, ensuring real-time sync with zero concurrency conflicts.
            </p>
          </div>

          {/* Feature Grid Layout (3x3 grid) - High Quality SVG icons & refined design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            
            {/* Feature 1 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Customer Management
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                A single profile for billing records, subscription settings, custom recipe requests, and delivery schedules.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Shopify Integration
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                Real-time two-way synchronization of order placements, inventory updates, and bundle refunds using webhooks.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Inventory Management
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                Unified live ledger that tracks ingredients and bottled juices to prevent oversells across all frontends.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Recipe Management
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                Recipe configuration tool detailing specific ingredient weights to automatically calculate raw requirements.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Production Planning
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                Aggregates upcoming orders into single production runs, estimating ingredient usage prior to raw procurement.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Warehouse Operations
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                Automated checklist for pickers showing location codes, inventory levels, and batch stamps.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Delivery Management
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                Smart driver routing layout with location mapping, distance optimization, and status tracking.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Combo Product Control
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                Builds combos where stock deduction occurs dynamically at individual item levels upon customer checkout.
              </p>
            </div>

            {/* Feature 9 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Reports & Production Sheets
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                Generates printing-friendly PDF and Excel sheets specifying clean recipes and delivery routing reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 05 — THE CHALLENGE */}
      <section className="w-full py-20 md:py-32 px-6 md:px-12 lg:px-16 xl:px-20 bg-[#f4f7fb] border-b border-[#0a1628]/5">
        <div className="max-w-3xl mx-auto flex flex-col gap-10">
          {/* Chapter Header */}
          <div className="flex flex-col gap-1 text-center">
            <span className="font-dm-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#0a1628]/50">
              Chapter 05
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl font-bold tracking-tight text-[#0a1628]">
              The Challenge
            </h2>
          </div>

          {/* Narrative content block */}
          <div className="flex flex-col gap-6 text-[#0a1628]/95 text-base sm:text-lg leading-relaxed font-manrope">
            <p className="font-semibold text-lg sm:text-xl text-center text-[#0a1628]">
              "Keeping four applications and a live Shopify store in sync without conflicting stock counts was the core engineering problem."
            </p>
            <p>
              Because orders stream in dynamically from the public Shopify store, the warehouse picking sheets, driver routing tables, and ingredient lists could easily end up operating on outdated information. 
            </p>
            <p>
              To solve this, I designed a centralized inventory ledger system. Rather than having each app query database snapshots directly, every system writes transactional mutations atomically through a centralized service. This resolved concurrency issues entirely and guaranteed that pickers, customers, and admins are always aligned on exactly the same live figures.
            </p>
          </div>
        </div>
      </section>

      {/* CHAPTER 06 — IMPACT / CLOSE */}
      <section className="w-full py-24 md:py-36 px-6 md:px-12 lg:px-16 xl:px-20 bg-[#f4f7fb] text-center border-b border-[#0a1628]/5">
        <div className="max-w-4xl mx-auto flex flex-col gap-14 sm:gap-20">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <span className="font-dm-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#0a1628]/50">
              Chapter 06
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl font-bold tracking-tight text-[#0a1628]">
              The Results
            </h2>
          </div>

          {/* Large Metrics Display - Cleaned up formatting & fonts, modern layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-3 p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.05)]">
              <span className="font-manrope text-5xl sm:text-6xl font-extrabold tracking-tight text-[#0a1628]">
                90%
              </span>
              <span className="font-dm-mono text-[10px] uppercase tracking-wider text-[#0a1628]/50 mt-1 max-w-[200px] leading-relaxed">
                Reduction in manual paper printing
              </span>
            </div>

            <div className="flex flex-col items-center gap-3 p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.05)]">
              <span className="font-manrope text-5xl sm:text-6xl font-extrabold tracking-tight text-[#0a1628]">
                4+
              </span>
              <span className="font-dm-mono text-[10px] uppercase tracking-wider text-[#0a1628]/50 mt-1 max-w-[200px] leading-relaxed">
                Hours saved daily on production sheets
              </span>
            </div>

            <div className="flex flex-col items-center gap-3 p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.05)]">
              <span className="font-manrope text-5xl sm:text-6xl font-extrabold tracking-tight text-[#0a1628]">
                100%
              </span>
              <span className="font-dm-mono text-[10px] uppercase tracking-wider text-[#0a1628]/50 mt-1 max-w-[200px] leading-relaxed">
                Real-time stock deduction accuracy
              </span>
            </div>
          </div>

          {/* Close paragraph */}
          <div className="flex flex-col gap-8 items-center mt-6">
            <p className="text-[#0a1628]/80 text-base sm:text-lg max-w-2xl leading-relaxed">
              By replacing legacy paperwork processes with an elegant, responsive React and Node.js infrastructure, The Juicist transformed their daily logistics from a source of friction into an automated growth engine.
            </p>
          </div>
        </div>
      </section>

      {/* RECOMMENDED PRODUCTS / RELATED WORKS SECTION (Chapter 07 or Footer recommendations) */}
      <section className="w-full py-20 md:py-32 px-6 md:px-12 lg:px-16 xl:px-20 bg-[#f4f7fb]">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Section Header */}
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

          {/* Recommendation Grid (2 cards) */}
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
                    {/* Visual Panel Preview inside a browser frame wrapper with custom colors */}
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
                            {/* Autoplay small looping video preview or image */}
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

                    {/* Metadata & Description */}
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

      {/* STICKY BOTTOM BREADCRUMB BAR (Theme adapts via isHeroInView state) */}
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
          <span className="opacity-70">The Juicist</span>
          <span className="opacity-30">/</span>
          <span className="opacity-55 font-medium">Complete Management Platform</span>
        </div>
      </div>

      {/* SCROLL-UP CIRCULAR BUTTON (bottom right) */}
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
