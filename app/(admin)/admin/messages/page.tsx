"use client";

import { useRef } from "react";
import { Search, Filter, MoreVertical, Paperclip, Send, Phone, Video, Info } from "lucide-react";
import { gsap, useGSAP } from "../../../../lib/use-gsap";
import Image from "next/image";

export default function MessagesPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".admin-header > *", { y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" })
      .from(".chat-list-item", { x: -20, opacity: 0, stagger: 0.05, duration: 0.6, ease: "power2.out" }, "-=0.6")
      .from(".chat-window", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");
  }, { scope: container });

  return (
    <div ref={container} className="flex flex-col gap-8 h-full">
      {/* Header */}
      <section className="admin-header flex flex-col gap-1 shrink-0">
        <h1 className="text-6xl font-bold tracking-tightest leading-none text-white">MESSAGES</h1>
        <p className="text-neutral-500 font-medium uppercase tracking-superwide text-xs">Client Communications Hub</p>
      </section>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        {/* Chat List */}
        <div className="col-span-4 bg-surface-low rounded-xl border border-white/5 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-white/5 shrink-0 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
              <input 
                type="text" 
                className="w-full bg-surface-lowest border border-white/10 focus:ring-1 focus:ring-white rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-neutral-600" 
                placeholder="Search messages..." 
              />
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-1.5 bg-surface-high text-white text-xs font-bold uppercase tracking-widest rounded">All</button>
              <button className="flex-1 py-1.5 text-neutral-500 hover:bg-surface-high hover:text-white text-xs font-bold uppercase tracking-widest rounded transition-colors">Unread</button>
              <button className="flex-1 py-1.5 text-neutral-500 hover:bg-surface-high hover:text-white text-xs font-bold uppercase tracking-widest rounded transition-colors">Archived</button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar" tabIndex={0}>
            {[
              { name: "Elena Rostova", preview: "I've attached the updated brand guidelines.", time: "10:42 AM", unread: 2, active: true },
              { name: "Marcus Thorne", preview: "Perfect. Looking forward to it.", time: "Yesterday", unread: 0, active: false },
              { name: "Julian Vane", preview: "Can we reschedule our meeting?", time: "Mon", unread: 0, active: false },
              { name: "Sophia Chen", preview: "Thanks for the detailed report.", time: "Oct 20", unread: 0, active: false },
              { name: "David Kim", preview: "Let me know when you have a moment.", time: "Oct 18", unread: 1, active: false },
              { name: "Sarah Jenkins", preview: "The new designs look great!", time: "Oct 15", unread: 0, active: false },
            ].map((chat, i) => (
              <button type="button" key={i} className={`chat-list-item p-4 border-b border-white/5 cursor-pointer transition-colors w-full text-left ${chat.active ? 'bg-surface-high border-l-2 border-l-white' : 'hover:bg-surface-high'}`}>
                <div className="flex justify-between items-start mb-1">
                  <div className="text-white font-medium text-sm">{chat.name}</div>
                  <div className="text-neutral-500 text-xs">{chat.time}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-neutral-400 text-xs truncate pr-4">{chat.preview}</div>
                  {chat.unread > 0 && (
                    <div className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold shrink-0">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="chat-window col-span-8 bg-surface-low rounded-xl border border-white/5 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center shrink-0 bg-surface-high">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-highest overflow-hidden">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl5KFuHRtNPKurvdN4_PnmcVoiYV6dGw-nY9rL09CHbDLvR0i8GNkwJi_TyqbXG6L2GBBeBZa2K_mMpTDUy4iSrQoClifsbgSsUUYDMs2fNkWV6LIgsEU3mpVoWFiicl4b71MiCmJr9XNR4rUdoRFHGEz7quT-vbYqJwANH3vceZ6riwuk9I7UfvEz2zSTAidBmLQLYaKv73U99TpPXri1un27xhutu_mDGLhuxyjWHfkUM0OLkKT1sKdWTJgcwKmCU6ZtiYdt2LN5" alt="Elena" width={40} height={40} className="object-cover grayscale" />
              </div>
              <div>
                <div className="text-white font-bold">Elena Rostova</div>
                <div className="text-accent-success text-xs font-medium tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#00FF94] rounded-full shadow-glow"></span>
                  ONLINE
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button aria-label="Call" className="w-8 h-8 rounded border border-white/10 hover:bg-white/5 flex items-center justify-center text-neutral-400 transition-colors"><Phone size={16} /></button>
              <button aria-label="Video Call" className="w-8 h-8 rounded border border-white/10 hover:bg-white/5 flex items-center justify-center text-neutral-400 transition-colors"><Video size={16} /></button>
              <button aria-label="Info" className="w-8 h-8 rounded border border-white/10 hover:bg-white/5 flex items-center justify-center text-neutral-400 transition-colors"><Info size={16} /></button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6" tabIndex={0}>
            <div className="text-center text-xs text-neutral-600 font-medium uppercase tracking-widest my-4">Today</div>
            
            {/* Incoming */}
            <div className="flex gap-4 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-surface-highest overflow-hidden shrink-0">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl5KFuHRtNPKurvdN4_PnmcVoiYV6dGw-nY9rL09CHbDLvR0i8GNkwJi_TyqbXG6L2GBBeBZa2K_mMpTDUy4iSrQoClifsbgSsUUYDMs2fNkWV6LIgsEU3mpVoWFiicl4b71MiCmJr9XNR4rUdoRFHGEz7quT-vbYqJwANH3vceZ6riwuk9I7UfvEz2zSTAidBmLQLYaKv73U99TpPXri1un27xhutu_mDGLhuxyjWHfkUM0OLkKT1sKdWTJgcwKmCU6ZtiYdt2LN5" alt="Elena" width={32} height={32} className="object-cover grayscale" />
              </div>
              <div className="space-y-1">
                <div className="bg-surface-high px-4 py-3 rounded-2xl rounded-tl-none text-sm text-neutral-200">
                  Hi there! I'm reviewing the latest strategy document.
                </div>
                <div className="text-xs text-neutral-600 font-medium px-1">10:30 AM</div>
              </div>
            </div>

            {/* Outgoing */}
            <div className="flex flex-row-reverse gap-4 max-w-[80%] ml-auto">
              <div className="space-y-1 text-right">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tr-none text-sm text-black font-medium">
                  Great. Let me know if you have any questions or need clarification on the brand positioning section.
                </div>
                <div className="text-xs text-neutral-600 font-medium px-1">10:35 AM</div>
              </div>
            </div>

            {/* Incoming */}
            <div className="flex gap-4 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-surface-highest overflow-hidden shrink-0">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl5KFuHRtNPKurvdN4_PnmcVoiYV6dGw-nY9rL09CHbDLvR0i8GNkwJi_TyqbXG6L2GBBeBZa2K_mMpTDUy4iSrQoClifsbgSsUUYDMs2fNkWV6LIgsEU3mpVoWFiicl4b71MiCmJr9XNR4rUdoRFHGEz7quT-vbYqJwANH3vceZ6riwuk9I7UfvEz2zSTAidBmLQLYaKv73U99TpPXri1un27xhutu_mDGLhuxyjWHfkUM0OLkKT1sKdWTJgcwKmCU6ZtiYdt2LN5" alt="Elena" width={32} height={32} className="object-cover grayscale" />
              </div>
              <div className="space-y-1">
                <div className="bg-surface-high px-4 py-3 rounded-2xl rounded-tl-none text-sm text-neutral-200">
                  Actually, yes. I've attached the updated brand guidelines. Can we make sure the new messaging aligns with this?
                </div>
                <div className="bg-surface-high p-3 rounded-xl mt-2 flex items-center gap-3 border border-white/5">
                  <div className="w-10 h-10 bg-surface-highest rounded flex items-center justify-center text-white">
                    <Paperclip size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">brand_guidelines_v2.pdf</div>
                    <div className="text-xs text-neutral-500">2.4 MB</div>
                  </div>
                </div>
                <div className="text-xs text-neutral-600 font-medium px-1">10:42 AM</div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-surface-lowest border-t border-white/5 shrink-0">
            <div className="flex items-end gap-2 bg-surface-low rounded-xl p-2 border border-white/10 focus-within:border-white/30 transition-colors">
              <button aria-label="Attach File" className="p-2 text-neutral-500 hover:text-white transition-colors">
                <Paperclip size={20} />
              </button>
              <textarea 
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white resize-none h-10 max-h-32 py-2.5 placeholder:text-neutral-600 custom-scrollbar" 
                placeholder="Type your message..."
                rows={1}
              ></textarea>
              <button aria-label="Send Message" className="p-2 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors">
                <Send size={18} className="ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
