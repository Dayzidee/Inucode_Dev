"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  ArrowUpRight, ExternalLink, Code, 
  BarChart3, Users, ShieldCheck, Zap, 
  Layers, Database, Globe, Terminal 
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const CASE_STUDIES = [
  {
    id: "kota-skillz",
    number: "01",
    title: "KOTA SKILLZ",
    subtitle: "The Standard Library for AI-Assisted Development",
    problem: "Modern AI coding agents lack architectural discipline. They generate code that works but doesn't scale — ignoring OWASP security standards, database design principles, and the deep patterns documented in engineering bibles like DDIA.",
    solution: "Built an open-source standard library of 88+ architectural patterns synthesized from Designing Data-Intensive Applications, OWASP ASVS, Refactoring UI, and production-grade engineering wisdom. Agents that use kota-skillz produce code that is secure, scalable, and maintainable by default.",
    outcome: "88+ patterns catalogued. Used as the core skill library in Kota Agent and integrated into Antigravity AI workflows.",
    stack: ["Python", "YAML", "Markdown", "AI Agents"],
    image: "https://opengraph.githubassets.com/1/Dayzidee/kota-skillz",
    github: "https://github.com/Dayzidee/kota-skillz",
    color: "#3776AB",
    icon: Terminal,
  },
  {
    id: "indigent-scholars",
    number: "02",
    title: "INDIGENT SCHOLARS",
    subtitle: "Philanthropic EdTech Connecting Scholars with Sponsors",
    problem: "Nigerian students in financial need have no reliable, transparent platform to connect with sponsors globally. Existing solutions are opaque, lack verification workflows, and provide poor donor confidence.",
    solution: "Designed and built a full-stack platform with role-based dashboards (Student, Sponsor, Admin), real-time verification workflows, and a premium 'Scholarly Architect' design system. End-to-end from application submission to sponsor matching to fund disbursement.",
    outcome: "Production-deployed on Vercel. Features Three.js interactive elements, Supabase realtime subscriptions, and a multi-tenant authorization model.",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Three.js", "Supabase"],
    image: "https://opengraph.githubassets.com/1/Dayzidee/Indigent-Scholars",
    github: "https://github.com/Dayzidee/Indigent-Scholars",
    live: "https://indigent-scholars.vercel.app",
    color: "#38BDF8",
    icon: Users,
  },
  {
    id: "despendable",
    number: "03",
    title: "DESPENDABLE",
    subtitle: "Real-Time Personal Finance Tracking",
    problem: "Generic finance apps are bloated and don't focus on the specific spending patterns of individuals who need tight liquidity awareness. Most tools focus on budgeting, not on real-time behavioral understanding.",
    solution: "Built a lean FinTech application with real-time data visualization of spending habits, high-performance state management, and intelligent categorization. Clean UX that surfaces the signal without the noise.",
    outcome: "Deployed on Vercel. Handles real-time transaction streams with optimized Express middleware and responsive Tailwind-driven UI.",
    stack: ["TypeScript", "Express", "Tailwind CSS", "Chart.js"],
    image: "https://opengraph.githubassets.com/1/Dayzidee/DEspendable",
    github: "https://github.com/Dayzidee/DEspendable",
    live: "https://despendable.vercel.app",
    color: "#10B981",
    icon: BarChart3,
  },
  {
    id: "styledbyotis",
    number: "04",
    title: "STYLED BY OTIS",
    subtitle: "High-Conversion E-Commerce Storefront",
    problem: "Small fashion brands need production-ready storefronts that feel premium but don't require enterprise budgets. Off-the-shelf templates sacrifice conversion-critical UX patterns.",
    solution: "Designed a conversion-optimized e-commerce platform with seamless UX/UI, robust inventory filtering, and a responsive product gallery. Built with a mobile-first philosophy and optimized image loading.",
    outcome: "Production storefront with integrated cart flow, dynamic filtering, and MongoDB-backed inventory management.",
    stack: ["React", "JavaScript", "MongoDB", "Tailwind CSS"],
    image: "https://opengraph.githubassets.com/1/Dayzidee/styledbyotis",
    github: "https://github.com/Dayzidee/styledbyotis",
    color: "#F472B6",
    icon: Globe,
  },
  {
    id: "velo-trade",
    number: "05",
    title: "VELO TRADE",
    subtitle: "Web-Based Trading Application",
    problem: "Retail traders need fast, lightweight web interfaces for market analysis without the overhead of heavy desktop platforms. Latency in data rendering directly impacts trading decisions.",
    solution: "Built a web-based trading application optimized for speed, real-time market data processing, and clean chart rendering. Designed for sub-second UI updates on live market feeds.",
    outcome: "Low-latency TypeScript architecture with real-time WebSocket data streams and interactive chart components.",
    stack: ["TypeScript", "Next.js", "WebSockets", "TradingView"],
    image: "https://opengraph.githubassets.com/1/Dayzidee/Velo-Trade",
    github: "https://github.com/Dayzidee/Velo-Trade",
    color: "#8B5CF6",
    icon: Zap,
  },
  {
    id: "kota-agent",
    number: "06",
    title: "KOTA AGENT",
    subtitle: "Autonomous AI Agent Framework",
    problem: "Existing AI agents operate in isolation without structured reasoning. They lack the architectural patterns needed to produce production-grade code consistently.",
    solution: "Built an autonomous agent framework that integrates kota-skillz as its knowledge backbone. The agent reasons through architectural decisions using synthesized engineering patterns before generating code.",
    outcome: "Python-based agent with multi-step reasoning, code generation, and automatic pattern matching from the kota-skillz library.",
    stack: ["Python", "LLM APIs", "kota-skillz", "CLI"],
    image: "https://opengraph.githubassets.com/1/Dayzidee/kota-agent",
    github: "https://github.com/Dayzidee/kota-agent",
    color: "#F59E0B",
    icon: Layers,
  },
];

export default function StudioPage() {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from('.studio-hero > *', {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
    })
    .from('.studio-stat', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.6');

    gsap.utils.toArray<HTMLElement>('.case-study').forEach((study) => {
      gsap.from(study, {
        scrollTrigger: {
          trigger: study,
          start: 'top bottom-=80',
          toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    });
  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-[#333] selection:text-white overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="accent-line absolute top-0 left-6 right-6 md:left-12 md:right-12 h-[1px] bg-gradient-to-r from-transparent via-[#333] to-transparent" />
        
        <div className="studio-hero max-w-5xl">
          <p className="text-sm font-mono text-[#888] tracking-widest uppercase mb-6 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#888]" />
            Case Studies
          </p>
          <h1 className="text-[2.2rem] sm:text-5xl md:text-7xl font-light tracking-tight leading-[1.1] mb-6 sm:mb-8 text-white">
            Building systems <br className="hidden md:block" />
            <span className="text-[#666]">that solve real problems.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#888] max-w-3xl font-light leading-relaxed mb-10 sm:mb-16">
            Each project here started with a specific gap — in tooling, in access, in speed. 
            These are deep-dives into the problem, the architecture, and the outcome.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 pt-6 sm:pt-8 border-t border-[#1a1a1a]">
            <div className="studio-stat">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">6</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#666] font-medium">Shipped Projects</div>
            </div>
            <div className="studio-stat">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">88+</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#666] font-medium">Architecture Patterns</div>
            </div>
            <div className="studio-stat">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">5</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#666] font-medium">Tech Domains</div>
            </div>
            <div className="studio-stat">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">3</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#666] font-medium">Live Deployments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto pb-16 sm:pb-32">
        <div className="space-y-0">
          {CASE_STUDIES.map((study, index) => {
            const IconComponent = study.icon;
            const isEven = index % 2 === 0;

            return (
              <article 
                key={study.id} 
                className="case-study border-t border-[#1a1a1a] py-10 sm:py-16 md:py-28"
              >
                {/* Number + Title Header */}
                <div className="flex items-start gap-4 sm:gap-6 mb-8 sm:mb-12">
                  <span className="text-4xl sm:text-6xl md:text-8xl font-black text-[#111] leading-none select-none">
                    {study.number}
                  </span>
                  <div className="pt-2 md:pt-4">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-none mb-2 sm:mb-3">
                      {study.title}
                    </h2>
                    <p className="text-sm text-[#888] tracking-wide">{study.subtitle}</p>
                  </div>
                </div>

                {/* Content Grid */}
                <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-16`}>
                  
                  {/* Image Side */}
                  <div className="w-full md:w-1/2">
                    <div className="aspect-video sm:aspect-[16/10] bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg overflow-hidden relative group">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Floating icon */}
                      <div 
                        className="absolute top-4 left-4 w-10 h-10 rounded-lg flex items-center justify-center backdrop-blur-md"
                        style={{ backgroundColor: `${study.color}20`, border: `1px solid ${study.color}30` }}
                      >
                        <IconComponent size={18} style={{ color: study.color }} />
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 mt-6">
                      <a 
                        href={study.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#111] border border-[#222] hover:border-[#444] text-white text-[10px] uppercase tracking-widest font-bold transition-all duration-300 rounded-md"
                      >
                        <Code size={14} />
                        Source
                      </a>
                      {study.live && (
                        <a 
                          href={study.live} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-[10px] uppercase tracking-widest font-bold hover:bg-neutral-200 transition-all duration-300 rounded-md"
                        >
                          <ExternalLink size={14} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Text Side */}
                  <div className="w-full md:w-1/2 space-y-8">
                    <div>
                      <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#555] font-bold mb-3">The Problem</h3>
                      <p className="text-[#999] text-sm leading-relaxed">{study.problem}</p>
                    </div>
                    <div>
                      <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#555] font-bold mb-3">The Solution</h3>
                      <p className="text-[#bbb] text-sm leading-relaxed">{study.solution}</p>
                    </div>
                    <div>
                      <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#555] font-bold mb-3">The Outcome</h3>
                      <p className="text-[#999] text-sm leading-relaxed">{study.outcome}</p>
                    </div>

                    {/* Tech stack pills */}
                    <div className="pt-4 border-t border-[#1a1a1a]">
                      <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#555] font-bold mb-4">Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {study.stack.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-semibold rounded-md border"
                            style={{ 
                              color: study.color, 
                              borderColor: `${study.color}30`,
                              backgroundColor: `${study.color}08`
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[#1a1a1a] py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2 sm:mb-3">
              Got a problem worth solving?
            </h2>
            <p className="text-[#888] text-sm">
              I build systems that work. Let&apos;s talk about yours.
            </p>
          </div>
          <Link 
            href="/contact"
            className="flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-[10px] uppercase tracking-widest hover:bg-neutral-200 transition-all duration-300 rounded-md group"
          >
            Start a Conversation
            <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
