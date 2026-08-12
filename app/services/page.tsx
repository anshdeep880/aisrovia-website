import React from "react";
import SiteHeader from "@/src/components/SiteHeader";
import ServicesHero from "@/src/components/services/ServicesHero";
import ServicePinnedSection from "@/src/components/services/ServicePinnedSection";
import ProofStrip from "@/src/components/services/ProofStrip";
import ProcessTimeline from "@/src/components/services/ProcessTimeline";
import TechMarquee from "@/src/components/services/TechMarquee";
import ServicesCTA from "@/src/components/services/ServicesCTA";
import SiteFooter from "@/src/components/SiteFooter";
import { services } from "@/src/data/services.data";

export const metadata = {
  title: "Services — InfoAIForge Capabilities",
  description: "Explore our capabilities in custom AI systems, Enterprise ERP, premium web and mobile apps, and business process automation.",
};

export default function ServicesPage() {
  return (
    <div className="services-page min-h-screen bg-[#0a1628] text-[#edeae4] flex flex-col font-manrope">
      {/* Shared SiteHeader component */}
      <SiteHeader />

      {/* Hero Section */}
      <ServicesHero />

      {/* Services Pinned Sections + matching ProofStrips */}
      {services.map((service, index) => {
        // Since the pinned section no longer transitions color, it remains its initial color.
        // Index even (0, 2) is Navy, so the ProofStrip below it should be Navy (isDarkBg: true).
        // Index odd (1, 3) is Bone, so the ProofStrip below it should be Bone (isDarkBg: false).
        const isDarkBgAtBottom = index % 2 === 0;

        return (
          <React.Fragment key={service.id}>
            <ServicePinnedSection
              id={service.id}
              serviceName={service.name}
              description={service.description}
              bullets={service.bullets}
              techTags={service.techTags}
              visualSrc={service.visualSrc}
              index={index}
            />
            <ProofStrip 
              relatedService={service.id} 
              isDarkBg={isDarkBgAtBottom}
            />
          </React.Fragment>
        );
      })}

      {/* Process Timeline */}
      <ProcessTimeline />

      {/* Tech Marquee */}
      <TechMarquee />

      {/* Services Call to Action */}
      <ServicesCTA />

      {/* Reused Footer component */}
      <SiteFooter />
    </div>
  );
}
