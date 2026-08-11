"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="site-header" aria-label="Main navigation">
      <a className="brand" href="/" aria-label="Anshdeep Singh Randev home">
        <img className="brand-logo" src="/assets/Logo/Logo.png" alt="ASR" />
      </a>

      {/* Desktop nav */}
      <nav className="nav-desktop" aria-label="Desktop navigation">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={isActive ? "active" : ""}
              aria-current={isActive ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        className="md:hidden relative z-50 flex flex-col items-center justify-center gap-[5px] w-10 h-10 rounded-full border border-[#0a1628]/15 bg-white/70 backdrop-blur-md text-[#0a1628] cursor-pointer"
      >
        <span
          className={`block h-[2px] w-[18px] bg-current transition-transform duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
        />
        <span
          className={`block h-[2px] w-[18px] bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""
            }`}
        />
        <span
          className={`block h-[2px] w-[18px] bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
        />
      </button>

      </header>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden fixed top-[88px] left-4 right-4 z-[101] rounded-2xl bg-[#edeae4] border border-[#0a1628]/10 shadow-xl p-2 overflow-hidden"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3.5 rounded-xl font-dm-mono text-sm uppercase tracking-wider text-left transition-colors ${isActive
                      ? "bg-black/10 font-bold"
                      : "hover:bg-black/5"
                    }`}
                  style={{ color: '#0a1628' }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
