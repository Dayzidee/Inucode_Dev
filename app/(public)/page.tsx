"use client";

import { useRef } from "react";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { PROJECTS, CAPABILITIES } from "../../lib/data/portfolio";
import { ProjectCard } from "../../components/ui/ProjectCard";
import { BentoItem } from "../../components/ui/BentoItem";
import { AnimatedTerminal } from "../../components/ui/AnimatedTerminal";
import { useContactModal } from "../../lib/context/ContactModalContext";

export default function HomePage() {
  const container = useRef<HTMLDivElement>(null);
  const { openContactModal } = useContactModal();

  return (
    <main ref={container} className="bg-surface min-h-screen text-on-surface selection:bg-primary selection:text-on-primary overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] sm:min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-16 pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
        {/* Subtle ambient light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none hidden sm:block" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col">
          <span className="hero-subtitle text-[10px] md:text-xs uppercase tracking-[0.3em] text-secondary mb-6 font-medium">
            Full-Stack Engineer &amp; AI Researcher
          </span>
          <h1 className="hero-title text-[3.2rem] sm:text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.88] text-primary">
            KOTA<br />STUDIO.
          </h1>
          
          <div className="mt-10 md:mt-24 max-w-3xl flex flex-col md:flex-row gap-4 md:gap-12 md:items-center">
            <p className="hero-desc text-on-surface-variant font-light text-sm md:text-base tracking-wide leading-relaxed max-w-md">
              Engineering intelligent solutions with TypeScript, Python, and modern frameworks. Building scalable financial logic and AI-powered systems.
            </p>
            <div className="hero-desc h-[1px] flex-1 bg-gradient-to-r from-outline-variant to-transparent hidden md:block" />
            <span className="hero-desc text-secondary text-xs font-mono tracking-widest uppercase">
              NIG / {new Date().getFullYear()}
            </span>
          </div>
        </div>

        <div className="absolute bottom-8 left-4 right-4 md:left-16 md:right-16 flex justify-end items-end">
          <ArrowDown className="text-secondary animate-bounce" size={20} strokeWidth={1.5} />
        </div>
      </section>

      {/* Selected Works */}
      <section className="py-10 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16 relative z-10 border-t border-outline-variant">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-4 md:gap-8">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter text-primary leading-none">
              SELECTED<br />WORKS
            </h2>
            <p className="max-w-xs text-secondary text-xs leading-relaxed uppercase tracking-widest">
              Digital products engineered for aesthetic supremacy and performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {PROJECTS.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project}
                className={index === 0 ? "md:col-span-2" : ""}
                aspectRatio={index === 0 ? "aspect-video" : "aspect-[4/3]"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-10 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16 bg-surface-low">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-12 lg:gap-16 items-start mb-6 sm:mb-10 md:mb-16">
            <div className="flex-1 min-w-0">
              <span className="text-[10px] text-secondary tracking-[0.2em] uppercase font-medium mb-4 sm:mb-6 block">
                Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-primary leading-tight">
                INDUSTRIAL GRADE ENGINEERING MEETS EDITORIAL DESIGN.
              </h2>
            </div>
            <div className="w-full lg:w-[380px] flex-shrink-0">
              <AnimatedTerminal />
            </div>
          </div>

          {/* Capabilities Bento Grid */}
          <div className="bento-grid-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {CAPABILITIES.map((capability) => (
              <div key={capability.id} className="bento-card">
                <BentoItem capability={capability} />
              </div>
            ))}
          </div>

          <div className="bento-grid-2 mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bento-card bg-surface-mid border border-outline-variant p-6 sm:p-10 flex flex-col justify-between min-h-[240px]">
              <div>
                <h3 className="text-xl font-bold text-primary mb-4 tracking-tight">Technical Philosophy</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
                  Orchestrating intelligent systems using a modern, type-safe stack designed for scale and deep logic. From FinTech to EdTech to AI research.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {["TypeScript", "Python", "React / Next.js", "Node.js", "MongoDB", "PostgreSQL", "Docker"].map((t) => (
                  <span key={t} className="px-3 py-1.5 bg-surface-high border border-outline-variant text-[10px] text-primary uppercase tracking-widest">{t}</span>
                ))}
              </div>
            </div>

            <div 
              onClick={openContactModal}
              className="bg-primary text-on-primary flex flex-col justify-between p-6 sm:p-10 group cursor-pointer transition-opacity hover:opacity-90 min-h-[240px]"
            >
              <Sparkles size={40} strokeWidth={1} />
              <div className="mt-8 sm:mt-12">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-4 sm:mb-6">
                  START A<br />PROJECT
                </h3>
                <button 
                  onClick={openContactModal}
                  className="flex items-center gap-3 font-semibold uppercase tracking-widest text-[10px] group-hover:gap-5 transition-all cursor-pointer min-h-[44px]"
                >
                  Get in touch
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
