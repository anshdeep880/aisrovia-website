"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPaperPlane, FaEnvelope, FaCheck, FaArrowRight, FaLinkedinIn } from "react-icons/fa6";

const PROJECT_TYPES = [
  "Web Application Development",
  "AI Integration & Automation",
  "Mobile App Development",
  "Enterprise ERP & Systems",
  "UI/UX Design & Product Strategy",
  "Other Inquiry",
];

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.projectType) {
      newErrors.projectType = "Please select a subject / project category";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please describe your project or inquiry";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Please provide at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Format message for WhatsApp
    const formattedMessage = `Hello AiSRovia team! 👋\n\n*Name:* ${formData.name.trim()}\n*Email:* ${formData.email.trim()}\n*Project Type:* ${formData.projectType}\n\n*Message:*\n${formData.message.trim()}`;

    const encodedMessage = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/917248960113?text=${encodedMessage}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      window.open(whatsappUrl, "_blank");

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 4000);
    }, 600);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="w-full bg-[#0a1628] text-[#edeae4] pt-28 pb-20 sm:pt-36 sm:pb-28 px-4 sm:px-6 md:px-12 lg:px-20 min-h-screen relative overflow-hidden">
      {/* Subtle background ambient mesh glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#00aaff]/15 via-[#00aaff]/5 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#00aaff]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* 1. HERO BANNER SECTION (TEXT-LED) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 sm:mb-24"
        >
          {/* GET IN TOUCH PILL */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#00aaff]/10 border border-[#00aaff]/30 text-[#00aaff] font-dm-mono text-xs uppercase tracking-widest mb-6 font-semibold shadow-[0_0_15px_rgba(0,170,255,0.2)] backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00aaff] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00aaff]" />
            </span>
            GET IN TOUCH
          </div>

          {/* HEADLINE */}
          <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#edeae4] leading-[1.08] max-w-4xl">
            Let's build something <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#edeae4] via-[#00aaff] to-[#00aaff] drop-shadow-[0_0_25px_rgba(0,170,255,0.45)]">
              worth shipping.
            </span>
          </h1>

          {/* SUBTEXT */}
          <p className="font-manrope text-base sm:text-xl text-[#edeae4]/75 max-w-2xl mt-6 leading-relaxed">
            Have a project in mind, an architectural challenge, or just want to explore working together? Reach out directly — we respond within 24 hours.
          </p>
        </motion.div>

        {/* 2. RESTRUCTURED TWO-COLUMN SPLIT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: INFORMATION & CONTACT GRID (6 COLS) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-6 space-y-10"
          >
            <div>
              <span className="font-dm-mono text-xs uppercase tracking-widest text-[#00aaff] font-bold block mb-3">
                / GET IN TOUCH /
              </span>
              <h2 className="font-syne text-3xl sm:text-5xl font-bold text-[#edeae4] tracking-tight leading-[1.12]">
                We are always ready to help you and answer your questions
              </h2>
              <p className="font-manrope text-base text-[#edeae4]/75 mt-5 leading-relaxed max-w-lg">
                Have questions about our engineering architecture, timelines, or custom AI capabilities? We're here to help guide your project from vision to production.
              </p>
            </div>

            {/* TWO-COLUMN DETAIL GRID (MATCHING REFERENCE STRUCTURE) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 pt-4 border-t border-[#edeae4]/15">
              {/* Call Center / Phone */}
              <div>
                <span className="font-dm-mono text-[11px] uppercase tracking-widest text-[#edeae4]/50 font-bold block mb-2">
                  Call Center
                </span>
                <a
                  href="https://wa.me/917248960113"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-manrope text-base font-bold text-[#edeae4] hover:text-[#00aaff] transition-colors block"
                >
                  +91 72489 60113
                </a>
              </div>

              {/* Our Location */}
              <div>
                <span className="font-dm-mono text-[11px] uppercase tracking-widest text-[#edeae4]/50 font-bold block mb-2">
                  Our Location
                </span>
                <p className="font-manrope text-base font-bold text-[#edeae4]">
                  Perth, Australia & Global Hubs
                </p>
              </div>

              {/* Email */}
              <div>
                <span className="font-dm-mono text-[11px] uppercase tracking-widest text-[#edeae4]/50 font-bold block mb-2">
                  Email
                </span>
                <a
                  href="mailto:contact@aisrovia.com"
                  className="font-manrope text-base font-bold text-[#edeae4] hover:text-[#00aaff] transition-colors block"
                >
                  contact@aisrovia.com
                </a>
              </div>

              {/* Social Network */}
              <div>
                <span className="font-dm-mono text-[11px] uppercase tracking-widest text-[#edeae4]/50 font-bold block mb-2">
                  Social Network
                </span>
                <div className="flex items-center gap-3 mt-2 text-[#edeae4]">
                  <a
                    href="https://wa.me/917248960113"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="w-8 h-8 rounded-full bg-[#edeae4]/10 hover:bg-[#00aaff] hover:text-[#0a1628] flex items-center justify-center transition-colors text-sm"
                  >
                    <FaWhatsapp />
                  </a>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-8 h-8 rounded-full bg-[#edeae4]/10 hover:bg-[#00aaff] hover:text-[#0a1628] flex items-center justify-center transition-colors text-sm"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a
                    href="mailto:contact@aisrovia.com"
                    aria-label="Email"
                    className="w-8 h-8 rounded-full bg-[#edeae4]/10 hover:bg-[#00aaff] hover:text-[#0a1628] flex items-center justify-center transition-colors text-sm"
                  >
                    <FaEnvelope />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: LIGHT BONE-TINTED FORM CARD (6 COLS) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 bg-[#edeae4] text-[#0a1628] rounded-3xl p-8 sm:p-12 shadow-2xl relative"
          >
            <div className="mb-8">
              <h3 className="font-syne text-2xl sm:text-3xl font-extrabold text-[#0a1628]">
                Get in Touch
              </h3>
              <p className="font-manrope text-sm text-[#0a1628]/70 mt-2 leading-relaxed">
                Define your goals and identify areas where AI and custom software can add value to your business.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Full Name */}
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className={`w-full bg-transparent border-b ${
                    errors.name ? "border-red-500" : "border-[#0a1628]/25 focus:border-[#00aaff]"
                  } py-3.5 px-0 text-[#0a1628] placeholder-[#0a1628]/45 font-manrope text-sm transition-colors focus:outline-none`}
                />
                {errors.name && (
                  <p className="font-manrope text-xs text-red-600 mt-1 font-medium">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`w-full bg-transparent border-b ${
                    errors.email ? "border-red-500" : "border-[#0a1628]/25 focus:border-[#00aaff]"
                  } py-3.5 px-0 text-[#0a1628] placeholder-[#0a1628]/45 font-manrope text-sm transition-colors focus:outline-none`}
                />
                {errors.email && (
                  <p className="font-manrope text-xs text-red-600 mt-1 font-medium">{errors.email}</p>
                )}
              </div>

              {/* Subject / Project Type */}
              <div>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b ${
                    errors.projectType ? "border-red-500" : "border-[#0a1628]/25 focus:border-[#00aaff]"
                  } py-3.5 px-0 text-[#0a1628] font-manrope text-sm transition-colors focus:outline-none cursor-pointer`}
                >
                  <option value="" disabled className="text-[#0a1628]/50">Subject / Project Category...</option>
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type} className="bg-[#edeae4] text-[#0a1628]">
                      {type}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <p className="font-manrope text-xs text-red-600 mt-1 font-medium">{errors.projectType}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  className={`w-full bg-transparent border-b ${
                    errors.message ? "border-red-500" : "border-[#0a1628]/25 focus:border-[#00aaff]"
                  } py-3.5 px-0 text-[#0a1628] placeholder-[#0a1628]/45 font-manrope text-sm transition-colors focus:outline-none resize-none`}
                />
                {errors.message && (
                  <p className="font-manrope text-xs text-red-600 mt-1 font-medium">{errors.message}</p>
                )}
              </div>

              {/* Submit Pill Button (Dark Pill matching reference style) */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0a1628] hover:bg-[#00aaff] text-[#edeae4] hover:text-[#0a1628] font-dm-mono text-xs uppercase tracking-wider font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-md inline-flex items-center gap-3 cursor-pointer disabled:opacity-70 group"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Opening WhatsApp...
                    </>
                  ) : submitSuccess ? (
                    <>
                      <FaCheck />
                      Opening WhatsApp...
                    </>
                  ) : (
                    <>
                      <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
                      <span>Send a message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* 3. FULL-WIDTH STANDALONE CLOSING CTA BAND (STANDALONE WHATSAPP CARD) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 sm:mt-24"
        >
          <a
            href="https://wa.me/917248960113"
            target="_blank"
            rel="noopener noreferrer"
            className="block group bg-gradient-to-br from-[#0e2440]/90 via-[#0d1e36]/80 to-[#0a1628]/95 backdrop-blur-xl border border-[#00aaff]/40 hover:border-[#00aaff] rounded-3xl p-8 sm:p-12 transition-all duration-300 shadow-[0_20px_50px_rgba(0,170,255,0.12)] hover:shadow-[0_20px_60px_rgba(0,170,255,0.28)] transform hover:-translate-y-1 relative overflow-hidden cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              <FaWhatsapp className="text-9xl text-[#00aaff]" />
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-[#00aaff]/15 border border-[#00aaff]/40 flex items-center justify-center text-3xl text-[#00aaff] relative group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,170,255,0.25)] flex-shrink-0">
                  <div className="absolute inset-0 rounded-2xl border border-[#00aaff]/60 animate-ping opacity-30 pointer-events-none" />
                  <FaWhatsapp className="animate-pulse" />
                </div>
                <div>
                  <span className="font-dm-mono text-[11px] uppercase tracking-widest text-[#00aaff] font-bold">
                    DIRECT INSTANT CHANNEL
                  </span>
                  <h3 className="font-syne text-2xl sm:text-3xl font-extrabold text-[#edeae4] group-hover:text-[#00aaff] transition-colors mt-1">
                    Chat with us directly on WhatsApp
                  </h3>
                  <p className="font-manrope text-sm text-[#edeae4]/75 mt-1 max-w-xl">
                    Prefer instant messaging over forms? Message our lead engineering team directly for rapid project discussions and technical consultations.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-[#edeae4]/15 w-full md:w-auto justify-between md:justify-end">
                <div className="flex flex-col">
                  <span className="font-dm-mono text-[10px] uppercase tracking-widest text-[#edeae4]/60 font-semibold">
                    DIRECT NUMBER
                  </span>
                  <span className="font-dm-mono text-xl sm:text-2xl font-bold text-[#00aaff] tracking-wider mt-0.5 drop-shadow-[0_0_12px_rgba(0,170,255,0.4)]">
                    +91 72489 60113
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#00aaff]/15 border border-[#00aaff]/40 group-hover:bg-[#00aaff] group-hover:text-[#0a1628] text-[#00aaff] flex items-center justify-center transition-all shadow-[0_0_15px_rgba(0,170,255,0.2)] flex-shrink-0">
                  <FaArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
