"use client";

import { useRef } from "react";
import { Terminal, Sparkles, LayoutGrid, Database, Cloud, Shield } from "lucide-react";
import { gsap, useGSAP } from "../../../lib/use-gsap";
import { MILESTONES, SERVICES } from "../../../lib/data/portfolio";
import { JourneyItem } from "../../../components/ui/JourneyItem";
import { ServiceItem } from "../../../components/ui/ServiceItem";
import Image from "next/image";

export default function AboutPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".about-hero-text > *", { y: 30, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out", delay: 0.2 })
      .from(".about-hero-img", { scale: 0.9, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=0.8");

    gsap.utils.toArray(".stack-item").forEach((item: any) => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: "top 90%", toggleActions: "play none none none" },
        y: 30, opacity: 0, duration: 0.8, ease: "power2.out"
      });
    });

    gsap.utils.toArray(".journey-item").forEach((item: any, i) => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: "top 90%", toggleActions: "play none none none" },
        x: i % 2 === 0 ? -30 : 30,
        opacity: 0, duration: 0.8, ease: "power3.out"
      });
    });

    gsap.utils.toArray(".service-item").forEach((item: any) => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: "top 90%", toggleActions: "play none none none" },
        y: 40, opacity: 0, duration: 0.8, ease: "power2.out"
      });
    });
  }, { scope: container });

  return (
    <div ref={container} className="relative bg-background min-h-screen overflow-x-hidden">
      <div className="pt-28 sm:pt-32">
        {/* Hero Section */}
        <section id="bio" className="min-h-screen px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center gap-8 md:gap-12 py-20 bg-surface">
          <div className="about-hero-text flex-1 space-y-6 md:space-y-8 w-full">
            <span className="font-label text-xs uppercase tracking-superwide text-secondary block">
              10x Full-Stack Engineer / AI Researcher
            </span>
            <h1 className="text-[2.8rem] sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tightest leading-[0.9] text-white">
              DUNSIMI<br /><span className="text-secondary opacity-50">SANNI.</span>
            </h1>
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-xl">
              Engineering intelligent solutions from Nigeria to the world. I bridge the gap between scalable backend architecture and AI-powered systems, specializing in TypeScript, Python, React, and LLM orchestration.
            </p>
            <div className="flex gap-4 items-center">
              <div className="h-[1px] w-12 bg-white" />
              <span className="text-sm font-bold uppercase tracking-widest text-white">Based in Nigeria</span>
            </div>
          </div>
          
          <div className="about-hero-img flex-1 w-full relative group max-w-md mx-auto md:max-w-none">
            <div className="aspect-[4/5] bg-surface-container-high overflow-hidden rounded-lg relative">
              <Image 
                src="/images/portfolio/hero-portrait.jpg" 
                alt="Portrait of Dunsimi Sanni" 
                fill
                className="object-cover grayscale brightness-90 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 py-6 px-8 sm:py-8 sm:px-10 bg-white text-black flex flex-col items-center justify-center min-w-[160px] sm:min-w-[200px] shadow-2xl z-20">
              <span className="text-3xl sm:text-4xl font-black">5+</span>
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-center mt-1">Projects Shipped</p>
            </div>
          </div>
        </section>

        {/* Tech Stack Bento Grid */}
        <section id="stack" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-surface-container-lowest">
          <div className="mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase text-white mb-4">THE ARSENAL</h2>
            <div className="w-20 h-1 bg-white" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[minmax(180px,auto)]">
            {/* Large Primary Card */}
            <div className="stack-item sm:col-span-2 sm:row-span-2 bg-surface-container-high p-8 sm:p-10 flex flex-col justify-start gap-6 sm:gap-8 group hover:bg-surface-container transition-colors duration-500">
              <Terminal className="text-accent-info transition-transform duration-500 group-hover:rotate-12" size={48} />
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase mb-2">Systems Architecture</h3>
                <p className="text-on-surface-variant text-sm max-w-sm">Building scalable, high-performance backends using Node.js, Express, and Python with PostgreSQL and MongoDB for complex data workflows.</p>
              </div>
            </div>
            
            {/* Accent Cards */}
            <div className="stack-item bg-surface-container-low p-6 flex flex-col items-center justify-center text-center group hover:bg-[#FF0080]/10 transition-colors duration-500 min-h-[160px]">
              <Sparkles className="text-[#FF0080] mb-4" size={40} />
              <h4 className="font-bold text-white uppercase text-xs tracking-widest">AI &amp; LLMs</h4>
            </div>
            
            <div className="stack-item bg-surface-container-low p-6 flex flex-col items-center justify-center text-center group hover:bg-[#00FF41]/10 transition-colors duration-500 min-h-[160px]">
              <LayoutGrid className="text-[#00FF41] mb-4" size={40} />
              <h4 className="font-bold text-white uppercase text-xs tracking-widest">React / Next.js</h4>
            </div>
            
            {/* Wide Tech Card */}
            <div className="stack-item sm:col-span-2 bg-surface-container-high p-6 sm:p-8 flex items-center gap-6 sm:gap-8 group min-h-[120px]">
              <Database className="text-[#7000FF] flex-shrink-0" size={48} />
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white uppercase">Data Engineering</h3>
                <p className="text-on-surface-variant text-sm">MongoDB, PostgreSQL, Supabase — complex schema design and optimized query execution for FinTech and EdTech platforms.</p>
              </div>
            </div>
            
            <div className="stack-item bg-surface-container-low p-6 flex flex-col justify-end group min-h-[140px]">
              <Cloud className="text-white mb-auto" size={28} />
              <h4 className="font-bold text-white uppercase text-xs tracking-widest mt-4">Docker / Linux</h4>
            </div>
            <div className="stack-item bg-surface-container-low p-6 flex flex-col justify-end group min-h-[140px]">
              <Shield className="text-white mb-auto" size={28} />
              <h4 className="font-bold text-white uppercase text-xs tracking-widest mt-4">Cyber Resilience</h4>
            </div>
          </div>
        </section>

        {/* Journey / Timeline */}
        <section id="journey" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-surface">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase text-white mb-12 md:mb-20 text-right">MILESTONES</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-outline-variant opacity-30 hidden md:block" />
            {MILESTONES.map((milestone, index) => (
              <JourneyItem key={milestone.id} milestone={milestone} isFirst={index === 0} />
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-surface-container-low">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
