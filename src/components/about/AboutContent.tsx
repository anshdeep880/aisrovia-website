"use client";

import React, { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { Target, Palette, Cog, Sparkles } from "lucide-react";
import { 
  SiFlutter, 
  SiReact, 
  SiNextdotjs, 
  SiPython, 
  SiFlask, 
  SiMysql, 
  SiFirebase, 
  SiSupabase,
  SiPostgresql,
  SiFigma,
  SiVercel,
  SiTailwindcss,
  SiFramer,
  SiDocker
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const CORE_VALUES = [
  {
    num: "01",
    title: "Precision Engineering",
    description:
      "We design and build clean, scalable database architectures and write production-grade code that performs reliably under load. No short cuts, no technical debt.",
    icon: Target,
    accentColor: "#00aaff",
    gradient: "from-[#0f2440] to-[#0a1628]",
    borderColor: "border-t-[#00aaff]",
  },
  {
    num: "02",
    title: "Aesthetic Intent",
    description:
      "We believe that powerful backend logic deserves a premium interface. We combine motion, color theory, and responsive layouts to wow users at first interaction.",
    icon: Palette,
    accentColor: "#00e5ff",
    gradient: "from-[#122a4a] to-[#0a1628]",
    borderColor: "border-t-[#00e5ff]",
  },
  {
    num: "03",
    title: "Operational Focus",
    description:
      "We don't build generic solutions. We partner closely with businesses to understand their operational bottlenecks, translating complex workflows into simple tools.",
    icon: Cog,
    accentColor: "#3b82f6",
    gradient: "from-[#153054] to-[#0a1628]",
    borderColor: "border-t-[#3b82f6]",
  },
];

const CORE_STACK = [
  { name: "Flutter", icon: SiFlutter },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Python", icon: SiPython },
  { name: "Flask", icon: SiFlask },
  { name: "Java", icon: FaJava },
  { name: "MySQL", icon: SiMysql },
  { name: "Firebase", icon: SiFirebase },
  { name: "Supabase", icon: SiSupabase },
  { name: "AI integrations", icon: Sparkles },
];

const CREATORS = [
  {
    initial: "A",
    name: "Anshdeep Singh Randev",
    role: "Founder & Lead Software Engineer",
    bio: "Ex-System Architect with over a decade of experience building custom enterprise ERPs, cross-platform mobile apps, and real-time backend integrations.",
    tech: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Flutter", icon: SiFlutter },
      { name: "Python", icon: SiPython },
      { name: "Flask", icon: SiFlask },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Firebase", icon: SiFirebase },
    ],
    theme: "dark",
  },
  {
    initial: "C",
    name: "Collaborative Network",
    role: "Specialist Partners",
    bio: "We partner with elite, hand-picked UI/UX designers, copywriters, and infrastructure engineers depending on the project scale to deliver state-of-the-art results.",
    tech: [
      { name: "Figma", icon: SiFigma },
      { name: "Vercel", icon: SiVercel },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "Framer Motion", icon: SiFramer },
      { name: "Docker", icon: SiDocker },
    ],
    theme: "light",
  },
];

// Motion Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  },
};

export default function AboutContent() {
  const creatorsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        document.body.classList.toggle("is-light-section", entry.isIntersecting);
      },
      {
        rootMargin: "-80px 0px -80px 0px",
        threshold: 0.1,
      }
    );

    if (creatorsRef.current) {
      observer.observe(creatorsRef.current);
    }

    return () => {
      observer.disconnect();
      document.body.classList.remove("is-light-section");
    };
  }, []);

  return (
    <div className="about-content w-full font-manrope relative overflow-hidden">
      
      {/* SECTION 1: BIOGRAPHY (Deep Navy Background with Radial Glow) */}
      <section className="relative bg-[#0a1628] text-[#edeae4] py-24 md:py-36 overflow-hidden">
        {/* Subtle Accent-Blue Radial Glow Behind Headline */}
        <div 
          aria-hidden="true"
          className="absolute top-12 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-[#00aaff]/10 blur-[130px] rounded-full pointer-events-none" 
        />
        
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start"
          >
            {/* Left Header Column */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <motion.span 
                variants={itemFadeUpVariants} 
                className="font-dm-mono text-xs uppercase tracking-[0.2em] text-[#00aaff] font-bold"
              >
                Our Biography
              </motion.span>
              <motion.h2 
                variants={itemFadeUpVariants} 
                className="font-syne text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-[#edeae4]"
              >
                Useful software,<br />
                <span className="text-white/90">thoughtfully forged.</span>
              </motion.h2>
            </div>

            {/* Right Content Column */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-base sm:text-lg text-[#edeae4]/75 leading-relaxed font-light">
              <motion.p variants={itemFadeUpVariants} className="text-[#edeae4]/90 font-normal">
                I’m Anshdeep Singh Randev, founder and lead developer at AiSROvia. I partner with ambitious businesses to turn complex operations into focused, dependable digital products.
              </motion.p>
              <motion.p variants={itemFadeUpVariants}>
                At AiSROvia, we approach product development with an engineering-first mindset. Every layout, transition, and database query is shaped with strict attention to performance, maintainability, and interface responsiveness. Whether it's a high-throughput enterprise ERP or a tactile mobile application, we design systems that grow alongside your user base.
              </motion.p>

              {/* Core Stack Pills */}
              <motion.div variants={itemFadeUpVariants} className="mt-6 pt-6 border-t border-white/10">
                <p className="font-dm-mono text-xs uppercase tracking-widest text-[#edeae4]/50 mb-4 font-medium">
                  Core Technical Stack
                </p>
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2.5"
                >
                  {CORE_STACK.map((tech) => (
                    <motion.div
                      variants={itemFadeUpVariants}
                      key={tech.name}
                      className="group flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full font-dm-mono text-xs text-[#edeae4]/85 cursor-default transition-all duration-300 hover:-translate-y-1 hover:bg-[#00aaff] hover:border-[#00aaff] hover:text-[#0a1628] hover:shadow-[0_8px_20px_rgba(0,170,255,0.3)]"
                    >
                      <tech.icon className="w-3.5 h-3.5 text-[#00aaff] group-hover:text-[#0a1628] transition-colors duration-300" />
                      <span className="font-semibold">{tech.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Transitional Blend from Deep Navy to Bone */}
        <div 
          aria-hidden="true" 
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#edeae4] pointer-events-none" 
        />
      </section>


      {/* SECTION 2: THE CREATORS (Bone #edeae4 Contrast Break Background) */}
      <section ref={creatorsRef} className="relative bg-[#edeae4] text-[#0a1628] py-24 md:py-36">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-14"
          >
            {/* Section Header */}
            <div className="flex flex-col gap-3">
              <motion.span 
                variants={itemFadeUpVariants} 
                className="font-dm-mono text-xs uppercase tracking-[0.2em] text-[#0a1628]/60 font-bold"
              >
                The Creators
              </motion.span>
              <motion.h2 
                variants={itemFadeUpVariants} 
                className="font-syne text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0a1628]"
              >
                Behind the code
              </motion.h2>
            </div>

            {/* Asymmetric Cards Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Creator Card 1 (Anshdeep - Visual Priority / 7 columns) */}
              <motion.div
                variants={itemFadeUpVariants}
                className="lg:col-span-7 bg-[#0a1628] text-[#edeae4] p-8 sm:p-10 md:p-12 rounded-3xl shadow-[0_25px_60px_rgba(10,22,40,0.18)] border border-[#0a1628]/10 flex flex-col justify-between gap-8 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500"
              >
                {/* Decorative Watermark Initial */}
                <span className="font-syne font-black text-9xl text-white/[0.04] absolute -right-3 -bottom-6 select-none pointer-events-none group-hover:scale-110 group-hover:text-[#00aaff]/10 transition-all duration-500">
                  {CREATORS[0].initial}
                </span>

                <div className="flex flex-col gap-4 relative z-10">
                  <div>
                    <h3 className="font-syne text-3xl sm:text-4xl font-extrabold text-[#edeae4] tracking-tight">
                      {CREATORS[0].name}
                    </h3>
                    <p className="font-dm-mono text-xs text-[#00aaff] tracking-wider uppercase font-semibold mt-2">
                      {CREATORS[0].role}
                    </p>
                  </div>
                  <p className="text-[#edeae4]/75 leading-relaxed font-light text-base sm:text-lg mt-2">
                    {CREATORS[0].bio}
                  </p>
                </div>

                <div className="flex flex-col gap-3 relative z-10 pt-4 border-t border-white/10">
                  <span className="font-dm-mono text-[11px] uppercase tracking-widest text-[#edeae4]/50 font-medium">
                    Technical Expertise
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {CREATORS[0].tech.map((t) => (
                      <span
                        key={t.name}
                        className="flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/10 rounded-full font-dm-mono text-xs text-[#edeae4] font-medium transition-all duration-300 hover:bg-[#00aaff] hover:text-[#0a1628] hover:border-[#00aaff]"
                      >
                        <t.icon className="w-3.5 h-3.5 text-[#00aaff] group-hover:text-[#0a1628]" />
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Creator Card 2 (Collaborative Network / 5 columns) */}
              <motion.div
                variants={itemFadeUpVariants}
                className="lg:col-span-5 bg-white text-[#0a1628] p-8 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(10,22,40,0.07)] border border-[#0a1628]/10 flex flex-col justify-between gap-8 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500"
              >
                {/* Decorative Watermark Initial */}
                <span className="font-syne font-black text-9xl text-[#0a1628]/[0.04] absolute -right-3 -bottom-6 select-none pointer-events-none group-hover:scale-110 group-hover:text-[#0a1628]/10 transition-all duration-500">
                  {CREATORS[1].initial}
                </span>

                <div className="flex flex-col gap-4 relative z-10">
                  <div>
                    <h3 className="font-syne text-2xl sm:text-3xl font-extrabold text-[#0a1628] tracking-tight">
                      {CREATORS[1].name}
                    </h3>
                    <p className="font-dm-mono text-xs text-[#0a1628]/60 tracking-wider uppercase font-semibold mt-2">
                      {CREATORS[1].role}
                    </p>
                  </div>
                  <p className="text-[#0a1628]/70 leading-relaxed font-light text-base">
                    {CREATORS[1].bio}
                  </p>
                </div>

                <div className="flex flex-col gap-3 relative z-10 pt-4 border-t border-[#0a1628]/10">
                  <span className="font-dm-mono text-[11px] uppercase tracking-widest text-[#0a1628]/45 font-medium">
                    Specialist Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {CREATORS[1].tech.map((t) => (
                      <span
                        key={t.name}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0a1628]/5 border border-[#0a1628]/10 rounded-full font-dm-mono text-xs text-[#0a1628] font-medium transition-all duration-300 hover:bg-[#0a1628] hover:text-white"
                      >
                        <t.icon className="w-3.5 h-3.5 text-[#0a1628]/70" />
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Transitional Blend from Bone back to Deep Navy */}
        <div 
          aria-hidden="true" 
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#0a1628] pointer-events-none" 
        />
      </section>


      {/* SECTION 3: OUR PRINCIPLES (Distinct Navy Gradients & Elevated Accent Badges) */}
      <section className="relative bg-[#0a1628] text-[#edeae4] py-24 md:py-36">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-14"
          >
            {/* Section Header */}
            <div className="flex flex-col gap-3">
              <motion.span 
                variants={itemFadeUpVariants} 
                className="font-dm-mono text-xs uppercase tracking-[0.2em] text-[#00aaff] font-bold"
              >
                Our Principles
              </motion.span>
              <motion.h2 
                variants={itemFadeUpVariants} 
                className="font-syne text-4xl sm:text-5xl font-extrabold tracking-tight text-[#edeae4]"
              >
                Values that guide our work
              </motion.h2>
            </div>

            {/* Principles 3-Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {CORE_VALUES.map((val) => (
                <motion.div
                  key={val.num}
                  variants={itemFadeUpVariants}
                  className={`p-8 sm:p-10 rounded-3xl bg-gradient-to-b ${val.gradient} ${val.borderColor} border-t-4 border-x border-b border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.3)] flex flex-col justify-between gap-8 relative overflow-hidden group hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,170,255,0.15)] transition-all duration-500`}
                >
                  {/* Big Accent Numbered Index Watermark */}
                  <span className="font-syne font-black text-7xl text-[#00aaff]/15 absolute right-6 top-6 select-none pointer-events-none group-hover:text-[#00aaff]/30 group-hover:scale-105 transition-all duration-300">
                    {val.num}
                  </span>

                  <div className="flex flex-col gap-6 relative z-10">
                    {/* Filled Circle Icon Badge */}
                    <div 
                      className="w-13 h-13 rounded-full bg-[#00aaff] text-[#0a1628] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(0,170,255,0.5)] transition-all duration-300"
                    >
                      <val.icon className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    <h3 className="font-syne text-2xl font-bold text-[#edeae4] tracking-tight">
                      {val.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#edeae4]/70 leading-relaxed font-light">
                      {val.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-dm-mono text-[#edeae4]/40">
                    <span>PRINCIPLE</span>
                    <span className="text-[#00aaff] font-bold">{val.num} / 03</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}

