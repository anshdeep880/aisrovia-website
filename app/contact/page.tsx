import React from "react";
import SiteHeader from "@/src/components/SiteHeader";
import ContactContent from "@/src/components/contact/ContactContent";
import SiteFooter from "@/src/components/SiteFooter";

export const metadata = {
  title: "Contact Us — AiSROvia",
  description: "Get in touch with AiSROvia / InfoAiForge. Start a conversation directly on WhatsApp or submit a project inquiry.",
};

export default function ContactPage() {
  return (
    <div className="contact-page min-h-screen bg-[#0a1628] text-[#edeae4] flex flex-col font-manrope">
      {/* 1. Header Navigation */}
      <SiteHeader />

      {/* 2. Contact Content Component */}
      <main className="flex-grow w-full">
        <ContactContent />
      </main>

      {/* 3. Footer Navigation */}
      <SiteFooter />
    </div>
  );
}
