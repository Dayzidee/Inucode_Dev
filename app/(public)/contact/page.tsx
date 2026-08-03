"use client";

import { Calendar, ArrowRight, Clock, Globe, ShieldCheck, Sparkles } from "lucide-react";
import { useContactModal } from "../../../lib/context/ContactModalContext";

export default function ContactPage() {
  const { openContactModal } = useContactModal();

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] flex flex-col justify-between pt-28 sm:pt-36 pb-16 px-4 sm:px-6 md:px-12 lg:px-16 selection:bg-white selection:text-black relative overflow-x-hidden">
      
      {/* Subtle background glow - clipped by overflow-x-hidden on parent */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <main className="max-w-7xl mx-auto w-full z-10 flex-1 flex flex-col justify-center my-auto py-8">
        
        {/* Category Tag */}
        <div className="mb-6">
          <p className="text-xs sm:text-sm font-mono text-neutral-400 uppercase tracking-[0.25em] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            INITIATE CONTACT / CONSULTATION ENGINE
          </p>
        </div>

        {/* Hero Headline */}
        <div className="space-y-1 mb-10 sm:mb-12">
          <h1 className="text-[2.8rem] sm:text-6xl md:text-8xl lg:text-[8.5rem] font-bold tracking-tighter leading-[0.9] text-white">
            LET&apos;S BUILD
          </h1>
          <h1 className="text-[2.8rem] sm:text-6xl md:text-8xl lg:text-[8.5rem] font-bold tracking-tighter leading-[0.9] text-neutral-500 italic">
            TOGETHER.
          </h1>
        </div>

        {/* Main Content & CTA Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center mb-10 sm:mb-16 p-6 sm:p-8 md:p-10 bg-[#0a0a0a] border border-white/10 rounded-2xl sm:rounded-3xl">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
              <Sparkles size={14} className="text-white" />
              <span>Direct Consultation Line</span>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
              Engineered for visionary founders and high-growth platforms. Whether you need AI agent architecture, bespoke financial logic, or ultra-fluid frontend execution—click below to open our direct contact options.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col items-stretch sm:items-end">
            <button 
              onClick={openContactModal}
              className="group w-full flex items-center justify-between gap-4 sm:gap-6 bg-white text-black hover:bg-neutral-200 px-5 sm:px-8 py-5 sm:py-6 rounded-2xl transition-all duration-300 shadow-2xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer min-h-[64px]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center">
                  <Calendar size={22} />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-600">Primary Channel</span>
                  <span className="text-lg font-bold tracking-tight uppercase text-black">Book a Session</span>
                </div>
              </div>
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform text-black" />
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#0d0d0d] border border-white/5 p-6 rounded-2xl flex items-center gap-4">
            <Clock className="text-neutral-400 flex-shrink-0" size={24} />
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500">Response Time</span>
              <span className="text-sm font-semibold text-white">Under 24 Hours</span>
            </div>
          </div>

          <div className="bg-[#0d0d0d] border border-white/5 p-6 rounded-2xl flex items-center gap-4">
            <Globe className="text-neutral-400 flex-shrink-0" size={24} />
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500">Location</span>
              <span className="text-sm font-semibold text-white">Lagos, NG / Worldwide Remote</span>
            </div>
          </div>

          <div className="bg-[#0d0d0d] border border-white/5 p-6 rounded-2xl flex items-center gap-4">
            <ShieldCheck className="text-neutral-400 flex-shrink-0" size={24} />
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500">Availability</span>
              <span className="text-sm font-semibold text-white">Accepting Q3/Q4 Contracts</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto w-full z-10 pt-8 border-t border-white/5 text-center sm:text-left">
        <p className="text-neutral-600 text-xs font-mono uppercase tracking-wider">
          Kota Dev © {new Date().getFullYear()} • Industrial Grade Consultation
        </p>
      </footer>
    </div>
  );
}
