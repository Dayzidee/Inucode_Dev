"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "../../../lib/use-gsap";
import Link from "next/link";
import Image from "next/image";
import { JOURNAL_ENTRIES } from "../../../lib/data/journal";

export default function JournalIndex() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.reveal-text', {
      y: 60, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2
    });
    gsap.from('.journal-card', {
      y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.5
    });
  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-[#050505] text-[#f5f5f5] pt-28 sm:pt-32 px-4 sm:px-6 md:px-12 selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] bg-white opacity-[0.02] rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <main className="max-w-7xl mx-auto w-full z-10 relative">
        <div className="mb-6 overflow-hidden">
          <p className="reveal-text text-xs sm:text-sm font-mono text-[#888] uppercase tracking-widest">
            Thoughts &amp; Editorials
          </p>
        </div>

        <div className="space-y-1 sm:space-y-2 mb-12 sm:mb-20 md:mb-32">
          <div className="overflow-hidden">
            <h1 className="reveal-text text-5xl sm:text-7xl md:text-[7rem] lg:text-[9rem] font-bold tracking-tighter leading-none text-white">
              JOURNAL
            </h1>
          </div>
        </div>

        {/* Journal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-16 sm:mb-24 md:mb-32">
          {JOURNAL_ENTRIES.map((entry, i) => {
            const isExternal = entry.isExternal;
            const CardComponent = isExternal ? "a" : Link;
            const href = isExternal ? entry.externalLink : `/journal/${entry.slug}`;

            return (
              <CardComponent
                key={entry.id}
                href={href!}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : ""}
                className={`journal-card group flex flex-col gap-4 sm:gap-6 cursor-pointer ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <div className={`relative w-full rounded-lg overflow-hidden bg-[#111] ${i === 0 ? "aspect-video" : "aspect-[4/3] sm:aspect-[4/5]"}`}>
                  <Image
                    src={entry.coverImage}
                    alt={entry.title}
                    fill
                    className="object-cover object-top transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono text-[#888] uppercase tracking-widest">
                    <span>{entry.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[#444]" />
                    <span className={isExternal ? "text-white" : ""}>{entry.type}</span>
                    <span className="w-1 h-1 rounded-full bg-[#444]" />
                    <span>{entry.readTime}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white group-hover:text-neutral-300 transition-colors flex justify-between items-start gap-2">
                    <span>{entry.title}</span>
                    {isExternal && (
                      <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 flex-shrink-0" />
                    )}
                  </h3>
                  <p className="text-[#888] text-sm sm:text-base md:text-lg max-w-2xl">
                    {entry.description}
                  </p>
                </div>
              </CardComponent>
            );
          })}
        </div>
      </main>

      <footer className="pb-8 text-center sm:text-left max-w-7xl mx-auto px-4 sm:px-0">
        <p className="text-[#444] text-xs font-mono uppercase tracking-wider">
          Kota Dev © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
