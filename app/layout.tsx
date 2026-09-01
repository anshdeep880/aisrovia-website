import type { Metadata } from "next";
import { Syne, Manrope, DM_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "ASR — AiSROvia Services",
  description: "Digital systems, shaped with intent. Our work at AiSROvia.",
};

import AIAssistantWidget from "@/src/components/AIAssistantWidget";
import CustomCursor from "@/src/components/CustomCursor";
import ScrollToTopButton from "@/src/components/ScrollToTopButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${manrope.variable} ${dmMono.variable} antialiased`}
    >
      <head>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className="is-loaded min-h-screen bg-[#0a1628] text-[#edeae4]">
        <CustomCursor />
        {children}
        <AIAssistantWidget />
        <ScrollToTopButton />
      </body>
    </html>
  );
}

