"use client";

import { useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock, ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "../../../lib/use-gsap";
import Image from "next/image";

export default function BookingPage() {
  const container = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(8);
  const [selectedTime, setSelectedTime] = useState<string | null>("01:00 PM");

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".booking-header > *", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      delay: 0.2
    })
    .from(".booking-panel", {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6");

    gsap.from(".media-card", {
      scrollTrigger: {
        trigger: ".media-grid",
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out"
    });

  }, { scope: container });

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const calendarDays = [
    { day: 29, currentMonth: false }, { day: 30, currentMonth: false },
    ...Array.from({ length: 26 }, (_, i) => ({ day: i + 1, currentMonth: true }))
  ];

  return (
    <main ref={container} className="pt-32 pb-24 px-6 md:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Booking Flow Header */}
      <header className="booking-header mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-label text-xs tracking-widest uppercase text-secondary mb-4 block">
              Consultation Engine v.1.0
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tightest text-white leading-none">
              RESERVE YOUR SPACE.
            </h1>
          </div>
          
          <div className="flex items-center gap-4 pb-2">
            <div className="flex flex-col items-end">
              <span className="font-label text-xs tracking-widest uppercase text-white">Progress</span>
              <span className="text-xs text-neutral-500">Step 01 / 03</span>
            </div>
            <div className="w-48 h-[2px] bg-surface-container-highest relative overflow-hidden">
              <div className="absolute inset-0 bg-primary w-1/3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Booking Interface: Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Calendar UI */}
        <div className="booking-panel lg:col-span-7">
          <section className="bg-surface-container-low p-8 lg:p-12 rounded-lg relative overflow-hidden group h-full">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Calendar size={120} />
            </div>
            
            <div className="flex justify-between items-center mb-12 relative z-10">
              <h2 className="font-headline text-2xl font-bold text-white tracking-tight">Select Date</h2>
              <div className="flex gap-4">
                <button aria-label="Previous Month" className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant hover:bg-white hover:text-on-primary transition-all duration-300">
                  <ChevronLeft size={16} />
                </button>
                <button aria-label="Next Month" className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant hover:bg-white hover:text-on-primary transition-all duration-300">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 relative z-10">
              {days.map(day => (
                <div key={day} className="text-center font-label text-xs text-neutral-500 py-4">
                  {day}
                </div>
              ))}
              
              {calendarDays.map((item, i) => (
                <button
                  key={i}
                  onClick={() => item.currentMonth && setSelectedDate(item.day)}
                  disabled={!item.currentMonth}
                  className={`aspect-square flex items-center justify-center text-sm transition-all duration-300 rounded-lg
                    ${!item.currentMonth ? 'text-neutral-700 cursor-not-allowed' : 
                      selectedDate === item.day 
                        ? 'bg-primary text-on-primary font-bold shadow-[0_10px_20px_rgba(255,255,255,0.1)]' 
                        : 'text-white hover:bg-surface-container-highest cursor-pointer'
                    }
                  `}
                >
                  {item.day.toString().padStart(2, '0')}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Time Selection */}
        <div className="booking-panel lg:col-span-5">
          <section className="flex flex-col h-full bg-surface-container-highest/30 backdrop-blur-md p-8 lg:p-12 rounded-lg border border-white/5">
            <h2 className="font-headline text-2xl font-bold text-white tracking-tight mb-8">Available Slots</h2>
            
            <div className="flex flex-col gap-3 flex-grow">
              {/* Morning */}
              <div className="mb-4">
                <span className="font-label text-[0.625rem] text-neutral-500 uppercase tracking-widest block mb-4">Morning Sessions</span>
                <div className="grid grid-cols-2 gap-3">
                  {["09:00 AM", "10:30 AM"].map(time => (
                    <button 
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-4 px-6 rounded-lg text-sm font-bold text-center transition-all duration-300
                        ${selectedTime === time 
                          ? 'bg-primary text-on-primary shadow-lg shadow-white/5' 
                          : 'bg-surface-container-low border border-outline-variant/30 text-white hover:bg-primary hover:text-on-primary'
                        }
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Afternoon */}
              <div className="mb-4">
                <span className="font-label text-[0.625rem] text-neutral-500 uppercase tracking-widest block mb-4">Afternoon Sessions</span>
                <div className="grid grid-cols-2 gap-3">
                  {["01:00 PM", "02:30 PM", "04:00 PM"].map(time => (
                    <button 
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-4 px-6 rounded-lg text-sm font-bold text-center transition-all duration-300
                        ${selectedTime === time 
                          ? 'bg-primary text-on-primary shadow-lg shadow-white/5' 
                          : 'bg-surface-container-low border border-outline-variant/30 text-white hover:bg-primary hover:text-on-primary'
                        }
                      `}
                    >
                      {time}
                    </button>
                  ))}
                  <button disabled className="py-4 px-6 rounded-lg bg-neutral-800 text-neutral-600 text-sm font-bold text-center cursor-not-allowed italic">
                    05:30 PM
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-8 border-t border-white/5">
              <div className="flex items-center gap-4 text-xs text-neutral-400">
                <Clock size={16} className="text-white" />
                <span>Duration: 90 Minutes Architectural Review</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Minimal Contact Form */}
      <div className="booking-panel mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-12">
          <section className="bg-surface-container-low p-8 lg:p-12 rounded-lg">
            <div className="max-w-4xl">
              <h2 className="font-headline text-2xl font-bold text-white tracking-tight mb-12">Project Metadata</h2>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10" onSubmit={(e) => e.preventDefault()}>
                <div className="group relative">
                  <label className="font-label text-xs text-neutral-500 uppercase tracking-widest absolute -top-6 left-0">Full Identity</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-outline-variant py-4 text-white placeholder:text-neutral-700 focus:outline-none focus:border-primary transition-colors text-lg font-bold tracking-tight" 
                    placeholder="ALEXANDER KINETIC" 
                  />
                </div>
                
                <div className="group relative">
                  <label className="font-label text-xs text-neutral-500 uppercase tracking-widest absolute -top-6 left-0">Transmission Channel</label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent border-b border-outline-variant py-4 text-white placeholder:text-neutral-700 focus:outline-none focus:border-primary transition-colors text-lg font-bold tracking-tight" 
                    placeholder="ARCHIVE@KINETIC.LAB" 
                  />
                </div>
                
                <div className="group relative md:col-span-2">
                  <label className="font-label text-xs text-neutral-500 uppercase tracking-widest absolute -top-6 left-0">Project Thesis</label>
                  <textarea 
                    className="w-full bg-transparent border-b border-outline-variant py-4 text-white placeholder:text-neutral-700 focus:outline-none focus:border-primary transition-colors text-lg font-bold tracking-tight resize-none" 
                    placeholder="DESCRIBE THE VISION AND ARCHITECTURAL REQUIREMENTS..." 
                    rows={1}
                  ></textarea>
                </div>
              </form>
              
              <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  <span className="text-xs text-neutral-400 uppercase tracking-widest">Ready for deployment</span>
                </div>
                
                <button className="group flex items-center gap-6 bg-primary text-on-primary px-10 py-6 rounded-lg font-bold tracking-tightest uppercase text-sm hover:scale-[1.02] transition-all duration-300 shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
                  Initialize Booking
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Featured Media / Aesthetic Break */}
      <section className="media-grid mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 h-[400px]">
        <div className="media-card relative overflow-hidden rounded-lg">
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8txnrIxM9Ine5ga0ZP7k7-Gwp1wl2FoGvgh9Vr2HoSZ9eYD69ypvU5p_vjCJ61svSEiX8wrfJV2Qfqh5X7gH0_qn-INEj5h-ieNpk8hNcoV3U7cZsUgV08wKH5brI80-yjYGsHCq39JndI6_CRliz1jLLSQU5ntrQgrLVfsXewwStyGfYQSp21Gxm7lXToRj8L1gVrHv0-NRTY5h1IQRvXjOjctqpIOqHRiW1o9pmJmJ2XIxIGi_ZuodYTMvTerxua6Yflm1nnnY7" 
            alt="The Studio" 
            fill
            className="object-cover grayscale hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
            <span className="font-label text-[0.625rem] text-white/60 tracking-superwide uppercase">The Studio</span>
            <h3 className="text-white font-bold text-xl">Physical Base.</h3>
          </div>
        </div>
        
        <div className="media-card relative overflow-hidden rounded-lg">
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaw3EhvKnl1dhTxm0JTub1kjsql4rlWjRqx2ubK7_vAEVgpLMpNAJW6GnE9JlJPnLhVkp1paOLyGrVyasBO3gokdtmqcd-kTdfFDaneHH3-AV668gfpwjcDBHaXxqwYABjwicc7mKC1_upbR9_RMXOeuoz8mLK3h8REQcbEkFqOn8DkWaK54RbHS1rDUBT5zJxZzju7J8twQ0A5HNwCY300gyQNQ7b1b9K1JixWYGn5tnjFxkz1Lk3yfxfx_Ciol7VSyjjEP451h3H" 
            alt="The Lab" 
            fill
            className="object-cover grayscale brightness-75 hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
            <span className="font-label text-[0.625rem] text-white/60 tracking-superwide uppercase">The Lab</span>
            <h3 className="text-white font-bold text-xl">Virtual Hub.</h3>
          </div>
        </div>
      </section>
    </main>
  );
}
