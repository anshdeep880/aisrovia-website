import React from "react";
import { projects } from "@/src/data/projects";
import WorkGrid from "@/src/components/work/WorkGrid";
import SiteHeader from "@/src/components/SiteHeader";
import SiteFooter from "@/src/components/SiteFooter";

// Country mapping table based on clients to dynamically compute count
const clientCountries: Record<string, string> = {
  "ColdPress Ltd": "United Kingdom",
  "Ratna & Co": "India",
  "DelishFoods": "India",
  "Vardhaman Retail": "India",
  "Dhanarogya Health": "India",
  "Ratnayantra": "India",
  "AssetFlow Group": "United States",
  "Bistro Corp": "United States",
  "InfoAIForge": "India",
  "LogiForce Logistics": "United Kingdom",
  "FoodTruck Assoc.": "United States",
  "TeleShop Solutions": "Singapore",
  "Vibrant Tech": "Singapore",
  "SecureStaff": "India",
  "NestCare Inc": "Canada",
  "StudioStyle": "Italy",
  "Sentinel Estates": "United Arab Emirates",
  "Shivora": "India",
  "Kavita Towers": "India",
  "Kavita Tower": "India",
  "Spunky Spuds": "Australia",
  "Patel Saree 2": "India",
  "Magic Enterprises": "India",
  "Rainbow Coating": "India",
  "InfoAIForge Product": "India",
  "Prime Nest Care": "India",
  "RatnaYantra": "India",
};

export const metadata = {
  title: "Work — InfoAIForge Portfolio",
  description: "A showcase of engineered digital systems, custom enterprise ERPs, and performance-focused mobile apps.",
};

export default function WorkPage() {
  const projectCount = projects.length;
  
  // Calculate unique clients
  const uniqueClients = new Set(projects.map((p) => p.client));
  const clientCount = uniqueClients.size;

  // Calculate unique countries
  const uniqueCountries = new Set(
    projects.map((p) => clientCountries[p.client] || "India")
  );
  const countryCount = uniqueCountries.size;

  return (
    <div className="work-page-theme min-h-screen w-full bg-[#edeae4] text-[#0a1628] flex flex-col font-manrope">
      
      {/* 1. Header (Navbar) - shared component with mobile hamburger menu */}
      <SiteHeader />

      {/* Nav Link Buffer / Spacing */}
      <div className="h-28 sm:h-32 w-full shrink-0" />

      {/* 2. Main Page Content Container */}
      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-12 lg:px-16 xl:px-20 pb-32 w-full flex flex-col gap-16 md:gap-24">
        {/* Header Section */}
        <header className="flex flex-col gap-4 max-w-4xl text-left pt-8 md:pt-12">
          <span className="font-dm-mono text-xs uppercase tracking-widest text-brand-accent select-none font-semibold">
            Selected work
          </span>
          <h1 className="font-syne text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0a1628] leading-[1.1]">
            {projectCount} projects. {clientCount} clients. {countryCount} countries.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#0a1628]/80 font-manrope max-w-2xl leading-relaxed">
            A curated index of software platforms, digital ecosystems, and mobile products engineered with strict attention to performance and interface design.
          </p>
        </header>

        {/* Portfolio Work Grid */}
        <WorkGrid projects={projects} />
      </main>

      {/* 3. Footer - Reused shared component */}
      <SiteFooter />

    </div>
  );
}
