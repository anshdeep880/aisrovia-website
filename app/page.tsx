import type { Metadata } from "next";
import SiteHeader from "@/src/components/SiteHeader";
import SiteFooter from "@/src/components/SiteFooter";
import HeroSection from "@/src/components/home/HeroSection";
import FlagshipSpotlight from "@/src/components/home/FlagshipSpotlight";
import CuratedWorkBento from "@/src/components/home/CuratedWorkBento";
import ServicesOverview from "@/src/components/home/ServicesOverview";
import ProcessSection from "@/src/components/home/ProcessSection";
import FinalCta from "@/src/components/home/FinalCta";

export const metadata: Metadata = {
  title: "AiSROvia — Custom ERPs, AI Systems & Mobile Apps | Perth & India",
  description:
    "We engineer custom ERPs, society vehicle tracking platforms, mobile POS apps, and autonomous AI agents that run your business operations on autopilot.",
};

export default function HomePage() {
  return (
    <div className="home-page min-h-screen w-full bg-[#0a1628] text-[#edeae4] flex flex-col font-manrope overflow-x-clip">
      <SiteHeader />

      <main className="flex-grow w-full flex flex-col">
        <HeroSection />
        <FlagshipSpotlight />
        <CuratedWorkBento />
        <ServicesOverview />
        <ProcessSection />
        <FinalCta />
      </main>

      <SiteFooter />
    </div>
  );
}
