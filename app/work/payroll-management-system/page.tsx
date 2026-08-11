"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import BrowserFrame from "@/src/components/work/BrowserFrame";
import { projects } from "@/src/data/projects";

export default function PayrollManagementSystemCaseStudy() {
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

  // Recommendations: Exclude payroll-management and select 2 key projects
  const recommendedProjects = projects
    .filter((p) => p.id !== "payroll-management")
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
              PADMAVATI PULPS & MOTORS · 2024 · HRMS, PAYROLL, MOBILE
            </span>
            <h1 className="font-syne text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              Enterprise Payroll Management System
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/85 font-manrope max-w-3xl leading-relaxed mt-2">
              A complete HRMS handling attendance, salary processing, loans, advances, and leave — with a self-service app for every employee.
            </p>
          </div>

          {/* Hero Video Browser Mockup */}
          <div className="w-full shadow-[0_30px_80px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
            <BrowserFrame>
              <div className="relative w-full aspect-[16/9] bg-slate-950">
                <video
                  src="/assets/Projects Images/Payroll Management/video.mp4"
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
                Payroll gets complicated fast once loans, advances, and interest calculations enter the picture. I built an admin portal that automates salary processing end-to-end — auto-deducting loan and advance installments — paired with a mobile app so employees never have to ask HR for a payslip or leave status.
              </p>
              <p>
                By digitizing attendance registers, biometric check-ins sync directly with payroll calculations. Installment deductions and leave requests route securely through dynamic supervisor approval logs, reducing back-and-forth administration.
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
                    Padmavati Pulps & Motors, India
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 col-span-2">
                  <span className="font-dm-mono text-[10px] uppercase tracking-wider text-[#0a1628]/50">
                    Scope
                  </span>
                  <span className="font-semibold text-xs sm:text-sm">
                    Admin Portal · Employee Mobile App · Payroll Automation
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="font-dm-mono text-[10px] uppercase tracking-wider text-[#0a1628]/50">
                    Year
                  </span>
                  <span className="font-semibold text-xs sm:text-sm">2024</span>
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
                Apps — Admin + Employee
              </span>
            </div>
            <div className="flex flex-col gap-2 p-8 bg-white border border-[#0a1628]/5 rounded-3xl shadow-sm text-center hover:border-brand-accent/25 hover:shadow-md transition-all duration-300">
              <span className="font-syne text-4xl lg:text-5xl font-extrabold text-brand-accent">
                Auto
              </span>
              <span className="font-dm-mono text-xs uppercase tracking-wider text-[#0a1628]/60 mt-1">
                Loan & Advance Deductions
              </span>
            </div>
            <div className="flex flex-col gap-2 p-8 bg-white border border-[#0a1628]/5 rounded-3xl shadow-sm text-center hover:border-brand-accent/25 hover:shadow-md transition-all duration-300">
              <span className="font-syne text-4xl lg:text-5xl font-extrabold text-brand-accent">
                Self
              </span>
              <span className="font-dm-mono text-xs uppercase tracking-wider text-[#0a1628]/60 mt-1">
                Service Portal & Leaves App
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
              A dual-platform aligning HR coordinators, employees, and management.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Card 1: HR/Admin */}
            <div className="flex flex-col justify-between bg-white border border-slate-100 hover:border-brand-accent/20 p-8 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/5 flex items-center justify-center text-brand-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-syne text-lg font-bold text-[#0a1628]">
                    HR & Admin
                  </h3>
                  <span className="font-dm-mono text-[9px] uppercase tracking-widest text-[#0a1628]/40">
                    HRMS Admin Portal
                  </span>
                </div>
                <p className="text-sm text-[#0a1628]/75 leading-relaxed font-manrope">
                  Approves leaves, manages biometric logins, updates salary schedules, and tracks loan repayment tables.
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
                  Manually tracking loan/advance balances against monthly employee salaries.
                </p>
              </div>
            </div>

            {/* Card 2: Employees */}
            <div className="flex flex-col justify-between bg-white border border-slate-100 hover:border-brand-accent/20 p-8 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/5 flex items-center justify-center text-brand-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-syne text-lg font-bold text-[#0a1628]">
                    Employees
                  </h3>
                  <span className="font-dm-mono text-[9px] uppercase tracking-widest text-[#0a1628]/40">
                    Mobile Self-Service
                  </span>
                </div>
                <p className="text-sm text-[#0a1628]/75 leading-relaxed font-manrope">
                  Submit shift leaves, view past payslip PDFs, record geo-tagged check-ins, and inspect remaining loan metrics.
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
                  No direct way to check leave statuses or download payslips without calling HR staff.
                </p>
              </div>
            </div>

            {/* Card 3: Management */}
            <div className="flex flex-col justify-between bg-white border border-slate-100 hover:border-brand-accent/20 p-8 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/5 flex items-center justify-center text-brand-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-syne text-lg font-bold text-[#0a1628]">
                    Management
                  </h3>
                  <span className="font-dm-mono text-[9px] uppercase tracking-widest text-[#0a1628]/40">
                    HRMS Analytics
                  </span>
                </div>
                <p className="text-sm text-[#0a1628]/75 leading-relaxed font-manrope">
                  Reviews cumulative employee payroll overhead costs, exports batch bank payments, and inspects advance liabilities.
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
                  No consolidated overview of total payroll costs including outstanding employee advances.
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
              The platform utilizes a secure calculation model to compute compound and simple interest installments dynamically. Real-time geofencing APIs align mobile check-in data with the payroll database sheets atomically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            
            {/* Feature 1 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Attendance & Geofencing
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                Aligns physical biometric logs and mobile GPS geofenced check-ins to compute shift metrics.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Payroll & Auto Deductions
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                Auto-processes base payroll, variable incentives, professional taxes, and loan installment deductions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Leave & Approvals Workflow
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                Automated leave request routing to supervisors with live updates of active team schedules.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Advance & Loan Control
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                Records simple or compound monthly interest, tracking outstanding liability registers per employee.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Excel Integrations
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                Batch imports monthly employee log spreadsheets and exports standardized bank transfer formats.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 bg-white border border-slate-100 hover:border-brand-accent/20 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(10,22,40,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 text-brand-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-syne text-base font-bold text-[#0a1628]">
                Mobile Self-Service
              </h4>
              <p className="text-sm text-[#0a1628]/70 leading-relaxed font-manrope">
                Empowers staff to request leaves, download monthly salary sheets, and track active loan balances.
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
              "Correctly calculating monthly vs. simple interest loans and auto-deducting them without breaking payroll totals was the core challenge."
            </p>
            <p>
              Because salary components dynamically fluctuate based on shift attendance, geo-tagged check-ins, and leave balances, manual installment tracking caused significant ledger issues.
            </p>
            <p>
              To solve this, I designed a transactional calculation pipeline. The ledger isolates loan mutations as separate database actions, executing salary ledger computations only after confirming all loan installment updates are mathematically balanced.
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
                300+
              </span>
              <span className="font-dm-mono text-[10px] uppercase tracking-wider text-[#0a1628]/50 mt-1 max-w-[200px] leading-relaxed">
                Employees managed
              </span>
            </div>

            <div className="flex flex-col items-center gap-3 p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.05)]">
              <span className="font-manrope text-5xl sm:text-6xl font-extrabold tracking-tight text-[#0a1628]">
                5+
              </span>
              <span className="font-dm-mono text-[10px] uppercase tracking-wider text-[#0a1628]/50 mt-1 max-w-[200px] leading-relaxed">
                Days saved per payroll cycle
              </span>
            </div>

            <div className="flex flex-col items-center gap-3 p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_10px_30px_-15px_rgba(10,22,40,0.05)]">
              <span className="font-manrope text-5xl sm:text-6xl font-extrabold tracking-tight text-[#0a1628]">
                100%
              </span>
              <span className="font-dm-mono text-[10px] uppercase tracking-wider text-[#0a1628]/50 mt-1 max-w-[200px] leading-relaxed">
                Accurate auto-deductions of loans
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-8 items-center mt-6">
            <p className="text-[#0a1628]/80 text-base sm:text-lg max-w-2xl leading-relaxed">
              Padmavati Pulps & Motors automated their workforce operations completely, ensuring employee details sync smoothly while payroll ledgers execute error-free.
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
          <span className="opacity-70">Padmavati Pulps & Motors</span>
          <span className="opacity-30">/</span>
          <span className="opacity-55 font-medium">Enterprise Payroll Management System</span>
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
