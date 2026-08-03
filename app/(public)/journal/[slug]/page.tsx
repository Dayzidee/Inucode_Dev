"use client";

import { useRef } from "react";
import { Share2, Globe, Bookmark, Quote, Grid, GitMerge, BookOpen, User, Shield, Gavel, Bot } from "lucide-react";
import { gsap, useGSAP } from "../../../../lib/use-gsap";
import Link from "next/link";
import Image from "next/image";

export default function JournalPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".journal-header > *", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      delay: 0.2
    })
    .from(".journal-hero-img", {
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    }, "-=0.8");

    gsap.from(".journal-content > *", {
      scrollTrigger: {
        trigger: ".journal-content",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out"
    });

    gsap.from(".bento-img", {
      scrollTrigger: {
        trigger: ".bento-grid",
        start: "top 80%",
      },
      scale: 0.9,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out"
    });

  }, { scope: container });

  return (
    <div ref={container} className="relative bg-background min-h-screen">
      {/* Main Content Shell */}
      <main className="pt-32 min-h-screen">
        <article className="max-w-7xl mx-auto px-8 md:px-20 lg:px-32">
          
          {/* Hero Header */}
          <header className="journal-header mb-24 lg:mb-40">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-['Inter'] font-bold uppercase tracking-superwide text-white/40">October 24, 2024</span>
                <div className="h-px w-12 bg-white/20"></div>
                <span className="text-xs font-['Inter'] font-bold uppercase tracking-superwide text-white/40">12 min Read</span>
              </div>
              <h1 className="text-6xl md:text-[5rem] font-bold leading-[0.9] tracking-tightest text-white mb-12">
                The Kinetic <br/>Asymmetry of <br/>Industrial Space.
              </h1>
              <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed max-w-2xl border-l-2 border-white/10 pl-8">
                Exploring how brutalist digital architecture and monochromatic focus redefine the high-end editorial experience.
              </p>
            </div>
          </header>

          {/* Hero Image */}
          <div className="journal-hero-img w-full h-[716px] rounded-lg overflow-hidden bg-surface-container-low mb-32 group relative">
            <Image 
              src="/images/portfolio/journal-hero.jpg"
              alt="Monolithic skyscraper architecture" 
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>

          {/* Content Grid with Floating Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 relative">
            
            {/* Share/Metadata Column */}
            <aside className="lg:col-span-1 hidden lg:block sticky top-32 h-fit">
              <div className="flex flex-col gap-8">
                <button aria-label="Share" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:bg-white hover:text-on-primary transition-all duration-300">
                  <Share2 size={20} />
                </button>
                <button aria-label="Translate" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-[#1DA1F2] hover:text-[#1DA1F2] transition-all duration-300">
                  <Globe size={20} />
                </button>
                <button aria-label="Bookmark" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-white/40 transition-all duration-300">
                  <Bookmark size={20} />
                </button>
              </div>
            </aside>

            {/* Body Content */}
            <div className="journal-content lg:col-span-8 lg:col-start-3 max-w-3xl">
              <div className="space-y-12">
                <p className="text-xl text-on-surface leading-[1.8] font-['Inter']">
                  Digital space is often treated as a container rather than a material. In "The Kinetic Gallery," we argue that the interface should be as tactile as brushed aluminum and as silent as a museum hall. By rejecting the "boxed-in" nature of traditional web design, we create a vacuum where your work—and the vibrant accents—become the sole focus of the user's attention.
                </p>
                
                <h2 className="text-3xl font-bold text-white tracking-tight mt-20 mb-8">The Philosophy of the Void</h2>
                
                <p className="text-lg text-neutral-400 leading-[1.8]">
                  Luxury is defined by what isn't there. Excess whitespace is not wasted space; it is a declaration of confidence. In our design system, we utilize intentional asymmetry to create visual tension that guides the eye naturally through the narrative.
                </p>
                
                <div className="bg-surface-container p-12 rounded-lg border-l-4 border-white my-16">
                  <Quote className="text-4xl mb-6 text-white" size={36} />
                  <blockquote className="text-2xl font-medium text-white italic leading-snug">
                    "The interface must disappear to let the intent breathe. We are building cathedrals of information, not just websites."
                  </blockquote>
                  <cite className="block mt-6 text-sm uppercase tracking-widest text-neutral-500">— Chief Curator, Kinetic</cite>
                </div>
                
                <p className="text-lg text-neutral-400 leading-[1.8]">
                  We rely on the interplay of light and texture rather than hue. Structural separation is achieved through tonal shifts—a <span className="text-white font-mono text-sm px-1 bg-white/5">surface-container-low</span> section against a <span className="text-white font-mono text-sm px-1 bg-white/5">surface</span> background—providing depth without the clutter of 1px dividers.
                </p>

                {/* Bento Grid Accent */}
                <div className="bento-grid grid grid-cols-2 gap-4 mt-20">
                  <div className="bento-img aspect-square rounded-lg overflow-hidden relative">
                    <Image 
                      src="/images/portfolio/journal-desk.jpg"
                      alt="Minimalist designer desk" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bento-img aspect-square rounded-lg overflow-hidden mt-12 relative">
                    <Image 
                      src="/images/portfolio/journal-shapes.jpg"
                      alt="Abstract geometric shapes" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white tracking-tight mt-20 mb-8">Dynamic Interaction</h2>
                <p className="text-lg text-neutral-400 leading-[1.8]">
                  Every movement in this system is engineered. We use <span className="text-white">cubic-bezier(0.16, 1, 0.3, 1)</span> for all transitions, creating a "snappy yet smooth" high-end feel that mimics the weighted action of luxury machinery.
                </p>
              </div>

              {/* Article Footer */}
              <footer className="mt-32 pt-12 border-t border-white/10 flex flex-wrap gap-8 items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image 
                      src="/images/portfolio/author-portrait.jpg"
                      alt="Author portrait" 
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-white font-bold">Marcus Thorne</div>
                    <div className="text-xs text-neutral-500 uppercase tracking-widest">Lead Strategist</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="px-4 py-2 bg-surface-container rounded-full text-xs uppercase font-bold tracking-widest text-neutral-400">Brutalism</span>
                  <span className="px-4 py-2 bg-surface-container rounded-full text-xs uppercase font-bold tracking-widest text-neutral-400">UX Design</span>
                </div>
              </footer>
            </div>
          </div>
        </article>

        {/* Newsletter */}
        <section className="mt-40 bg-surface-container-lowest py-32 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl md:text-6xl font-bold text-white mb-12 tracking-tighter">Stay Kinetic.</h3>
            <p className="text-neutral-500 mb-12 max-w-xl mx-auto">Join our monthly editorial on the intersection of industrial design and digital experiences.</p>
            <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                className="flex-grow bg-transparent border-0 border-b-2 border-white/20 focus:border-white focus:ring-0 text-white font-bold uppercase placeholder:text-neutral-700 tracking-widest transition-all px-0" 
                placeholder="YOUR@EMAIL.COM" 
              />
              <button className="bg-white text-on-primary font-black uppercase text-xs tracking-superwide px-12 py-4 hover:bg-neutral-300 transition-colors">
                Join
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
