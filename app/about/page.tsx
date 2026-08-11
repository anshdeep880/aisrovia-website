import React from "react";
import SiteHeader from "@/src/components/SiteHeader";
import AboutHeroScrub from "@/src/components/about/AboutHeroScrub";
import AboutContent from "@/src/components/about/AboutContent";
import SiteFooter from "@/src/components/SiteFooter";

export const metadata = {
  title: "About — AiSROvia Team",
  description: "Learn more about Anshdeep Singh Randev, founder and lead developer at AiSROvia, and our core values of precision software engineering.",
};

export default function AboutPage() {
  return (
    <div className="about-page min-h-screen bg-[#0a1628] text-[#edeae4] flex flex-col font-manrope overflow-y-visible">
      {/* 1. Header (Navbar) - shared component */}
      <SiteHeader />

      {/* 2. Main Page Content */}
      <main className="flex-grow w-full flex flex-col overflow-y-visible">
        {/* Scroll-scrub Canvas / Video Hero Section */}
        <AboutHeroScrub />

        {/* Biography, Values, and Team Grid Content */}
        <AboutContent />
      </main>

      {/* 3. Footer - shared component */}
      <SiteFooter />
    </div>
  );
}
