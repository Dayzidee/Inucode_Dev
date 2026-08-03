"use client";

import { useRef } from "react";
import { Terminal, Video, MoreVertical, Zap, Send, Paperclip, Clock } from "lucide-react";
import { gsap, useGSAP } from "../../../lib/use-gsap";
import Image from "next/image";

export default function AdminPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".admin-header > *", { y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" })
      .from(".consultation-item", { x: -20, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }, "-=0.4")
      .from(".comm-terminal", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");
  }, { scope: container });

  return (
    <div ref={container} className="flex flex-col gap-8 h-full">
      {/* Hero / Header Section */}
      <section className="admin-header flex flex-col gap-1 shrink-0">
        <h1 className="text-6xl font-bold tracking-tightest leading-none text-white">CENTRAL OPS.</h1>
        <p className="text-neutral-500 font-medium uppercase tracking-superwide text-xs">Real-time Booking & Communications Interface</p>
      </section>

      {/* Content Grid */}
      <div className="grid grid-cols-12 gap-8 flex-1 min-h-0">
        {/* Section 1: Upcoming Consultations */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6 min-h-0">
          <div className="flex justify-between items-end shrink-0">
            <h2 className="text-2xl font-bold tracking-tight text-white">Upcoming Consultations</h2>
            <span className="text-neutral-600 font-medium text-xs uppercase tracking-widest pb-1">12 Active Sessions</span>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar" tabIndex={0}>
            {/* Table Header */}
            <div className="grid grid-cols-12 px-6 py-2 text-neutral-600 font-medium uppercase tracking-widest text-xs border-b border-white/5 shrink-0">
              <div className="col-span-5">Client Identity</div>
              <div className="col-span-3 text-center">Schedule</div>
              <div className="col-span-2 text-center">Service</div>
              <div className="col-span-2 text-right">Status</div>
            </div>

            {/* List Item 1 */}
            <button type="button" className="consultation-item group grid grid-cols-12 items-center px-6 py-5 bg-surface-lowest hover:bg-surface-low border border-white/5 rounded-lg transition-all duration-300 cursor-pointer w-full text-left">
              <div className="col-span-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-high flex items-center justify-center overflow-hidden border border-white/10">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl5KFuHRtNPKurvdN4_PnmcVoiYV6dGw-nY9rL09CHbDLvR0i8GNkwJi_TyqbXG6L2GBBeBZa2K_mMpTDUy4iSrQoClifsbgSsUUYDMs2fNkWV6LIgsEU3mpVoWFiicl4b71MiCmJr9XNR4rUdoRFHGEz7quT-vbYqJwANH3vceZ6riwuk9I7UfvEz2zSTAidBmLQLYaKv73U99TpPXri1un27xhutu_mDGLhuxyjWHfkUM0OLkKT1sKdWTJgcwKmCU6ZtiYdt2LN5" alt="Client" width={40} height={40} className="object-cover grayscale" />
                </div>
                <div>
                  <div className="text-white font-semibold">Elena Rostova</div>
                  <div className="text-neutral-500 text-xs">ID: CX-2901</div>
                </div>
              </div>
              <div className="col-span-3 text-center">
                <div className="text-neutral-300 text-sm">Oct 24, 2023</div>
                <div className="text-neutral-600 text-xs">14:00 GMT</div>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-xs text-neutral-400 px-2 py-1 bg-surface-high rounded font-medium">STRATEGY</span>
              </div>
              <div className="col-span-2 text-right">
                <div className="flex items-center justify-end gap-2 text-white font-medium text-xs tracking-widest">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  CONFIRMED
                </div>
              </div>
            </button>

            {/* List Item 2 (Active/Selected) */}
            <button type="button" className="consultation-item group grid grid-cols-12 items-center px-6 py-5 bg-surface-high border-r-2 border-white rounded-lg transition-all duration-300 cursor-pointer shadow-2xl w-full text-left">
              <div className="col-span-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-highest flex items-center justify-center overflow-hidden border border-white/10">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuA34NP7vAp9F2nf0y5f4pEHx6pPXHtRaS1gjddiYYZ01CvRYgjiRN_NZu6PUtEdI3w34wtj2NFDxBZIPT4lvvORz27SEhjv7-g1YG0JCLTNmhlD1oFW6g-956KtqHLQWlB_u3VLM8TIIzJVA04KSxeCbM3CQcbaCyy1oRh8fCnIve0Pi_nyEhSqbwXMft-PArFrlIQe05xvMynhxx17wI3myA_eIykKEPEJSdZqvbhtH1MAonp5GklX-pLsmcjR51C2pao_8Ag8zHM9" alt="Client" width={40} height={40} className="object-cover grayscale" />
                </div>
                <div>
                  <div className="text-white font-semibold">Marcus Thorne</div>
                  <div className="text-neutral-500 text-xs">ID: CX-3122</div>
                </div>
              </div>
              <div className="col-span-3 text-center">
                <div className="text-neutral-300 text-sm">Oct 24, 2023</div>
                <div className="text-neutral-600 text-xs">16:30 GMT</div>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-xs text-neutral-400 px-2 py-1 bg-surface-highest rounded font-medium">DESIGN</span>
              </div>
              <div className="col-span-2 text-right">
                <div className="flex items-center justify-end gap-2 text-neutral-400 font-medium text-xs tracking-widest">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full"></span>
                  PENDING
                </div>
              </div>
            </button>

            {/* List Item 3 */}
            <button type="button" className="consultation-item group grid grid-cols-12 items-center px-6 py-5 bg-surface-lowest hover:bg-surface-low border border-white/5 rounded-lg transition-all duration-300 cursor-pointer w-full text-left">
              <div className="col-span-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-high flex items-center justify-center overflow-hidden border border-white/10">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg6jEEQg5wAYvRsUFqozyh3qpXAVOuI1_G3qsfhYWi0m-VX2ODVqyg2J8nH5xDYez0_o4dw0GgPKa0gWUHf7e7U7_BGaG1qNFetfX_TkzQ7xiSH3BlfKLLMefEv1jZkl-Q97VLJGgpKwsYCZjuhGLDj9lgr2suRC6giGheZE8lrnmtSRTGy65XfWBajEH0XeMzXOxe5Dtn1QpXGZvPnmHc9D4oZKqrS_1nvndBtDN4iXvEj-6DxFDVL_eqCsjr7VEZRDFSwW3nvgZZ" alt="Client" width={40} height={40} className="object-cover grayscale" />
                </div>
                <div>
                  <div className="text-white font-semibold">Julian Vane</div>
                  <div className="text-neutral-500 text-xs">ID: CX-0912</div>
                </div>
              </div>
              <div className="col-span-3 text-center">
                <div className="text-neutral-300 text-sm">Oct 25, 2023</div>
                <div className="text-neutral-600 text-xs">09:00 GMT</div>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-xs text-neutral-400 px-2 py-1 bg-surface-high rounded font-medium">AUDIT</span>
              </div>
              <div className="col-span-2 text-right">
                <div className="flex items-center justify-end gap-2 text-accent-success font-medium text-xs tracking-widest">
                  <span className="w-1.5 h-1.5 bg-[#00FF94] rounded-full shadow-glow"></span>
                  CONFIRMED
                </div>
              </div>
            </button>

            {/* List Item 4 */}
            <button type="button" className="consultation-item group grid grid-cols-12 items-center px-6 py-5 bg-surface-lowest hover:bg-surface-low border border-white/5 rounded-lg transition-all duration-300 cursor-pointer w-full text-left">
              <div className="col-span-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-high flex items-center justify-center overflow-hidden border border-white/10">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-Y3_vh9EG9Vo33gt40FPT1_4sWwwmpZ_MRI0JFH1u_dmOz2kVFzRPlJhgP5AvhnEvGmjn8olvKse-cA6yayAB2fEdvL4HnoJuy6evd28obvRufJaZSp6ubhECvoj6L-lZ63OL2nUZRmGavMhBt8fSrNFWBNhtFYI6oCLhua6PnYntc_m3eRWPN638mfWOu87hEspJBFGH-DiirExVCaZiST6E3jVULJne-eSKw1Hhh1GNziPdFh8HgfMIBZohELyMU7ID3bwU9uwc" alt="Client" width={40} height={40} className="object-cover grayscale" />
                </div>
                <div>
                  <div className="text-white font-semibold">Sophia Chen</div>
                  <div className="text-neutral-500 text-xs">ID: CX-4481</div>
                </div>
              </div>
              <div className="col-span-3 text-center">
                <div className="text-neutral-300 text-sm">Oct 25, 2023</div>
                <div className="text-neutral-600 text-xs">11:30 GMT</div>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-xs text-neutral-400 px-2 py-1 bg-surface-high rounded font-medium">REVIEW</span>
              </div>
              <div className="col-span-2 text-right">
                <div className="flex items-center justify-end gap-2 text-neutral-600 font-medium text-xs tracking-widest">
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full"></span>
                  ON HOLD
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Section 2: Communication Terminal */}
        <div className="comm-terminal col-span-12 lg:col-span-5 flex flex-col bg-surface-low rounded-xl border border-white/5 overflow-hidden min-h-0">
          {/* Terminal Header */}
          <div className="px-6 py-4 bg-surface-high border-b border-white/5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#4D96FF]/20 flex items-center justify-center">
                <Terminal className="text-[#4D96FF]" size={18} />
              </div>
              <div>
                <div className="text-white text-sm font-bold">Comm Terminal <span className="text-neutral-500 font-normal ml-1">v2.4</span></div>
                <div className="text-neutral-400 text-xs font-medium tracking-widest flex items-center gap-1">
                  <span className="w-1 h-1 bg-white rounded-full animate-pulse"></span>
                  LIVE CONNECTION: Marcus Thorne
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button aria-label="Start Video Call" className="w-8 h-8 rounded border border-white/10 hover:bg-white/5 flex items-center justify-center text-neutral-400">
                <Video size={16} />
              </button>
              <button aria-label="More Options" className="w-8 h-8 rounded border border-white/10 hover:bg-white/5 flex items-center justify-center text-neutral-400">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar" tabIndex={0}>
            {/* Incoming */}
            <div className="flex gap-4 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-surface-highest overflow-hidden flex-shrink-0">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOFEYqvZDCPatQJ046bKqRvtmnX1EajXmpd19SlFzjDjKqWttzxMCprxbFUmMfPPIUgVEB6UU1BjWhzpXGEjLUkeujq2rM8ywcl2mRo6gWaMRGwN1xA6k2BNFBlWmt9zsP4FG8deifs7Fct-C-tv8jbIw3WZAAL6rJVjOmUWCoJmmKJwGXpTUoEPgytD5gFu0pfXehbcC4yfWpZYO766LiAv5ineZtEvaFdQJG5dMYOEqKUXoar5R9P6ANILs8yy2WkEHAigkKPWyS" alt="Marcus" width={32} height={32} className="grayscale object-cover" />
              </div>
              <div className="space-y-1">
                <div className="bg-surface-highest px-4 py-3 rounded-tr-xl rounded-br-xl rounded-bl-xl text-sm text-neutral-300 leading-relaxed">
                  Hello, I'm checking the status of my design consultation for tomorrow. I sent through some additional mood boards via the portal earlier.
                </div>
                <div className="text-xs text-neutral-600 font-medium px-1">10:42 AM</div>
              </div>
            </div>

            {/* Outgoing */}
            <div className="flex flex-row-reverse gap-4 max-w-[85%] ml-auto">
              <div className="w-8 h-8 rounded-full bg-[#d4d4d4] flex items-center justify-center flex-shrink-0">
                <Zap className="text-black" size={14} />
              </div>
              <div className="space-y-1 text-right">
                <div className="bg-white px-4 py-3 rounded-tl-xl rounded-bl-xl rounded-br-xl text-sm text-black leading-relaxed font-medium">
                  Confirmed. We've received the mood boards. Our lead architect is reviewing them now. We'll be ready for the 16:30 session.
                </div>
                <div className="text-xs text-neutral-600 font-medium px-1">11:15 AM</div>
              </div>
            </div>

            {/* Incoming */}
            <div className="flex gap-4 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-surface-highest overflow-hidden flex-shrink-0">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyzbZsw1oNiZ0lgXmnJfPy33qkUqlKqXa5XPwX5UWoT75TE2hA0hadcezSmEispg3ZLY35IAk2WotdWkf9kSNRrgac2eGRILlabk7fpozoJvKmjI1KnDO8TRQr6WIpqPbOhKHHkAzy4YbRQ-7j5Dn1I5Siutn4oI9lRGmXs1mSakPKkw-0NbS9RoR5Ulzs_jMQa2Mv7MvWWVfHvcslicm2AgG0xVQR2LZWFGF02OeA8f075AsrKtj4jqD-4oZ1eXrcNXPAIu1rVcLw" alt="Marcus" width={32} height={32} className="grayscale object-cover" />
              </div>
              <div className="space-y-1">
                <div className="bg-surface-highest px-4 py-3 rounded-tr-xl rounded-br-xl rounded-bl-xl text-sm text-neutral-300 leading-relaxed">
                  Perfect. Looking forward to it. Will there be a screen share available?
                </div>
                <div className="text-xs text-neutral-600 font-medium px-1">11:18 AM</div>
              </div>
            </div>
          </div>

          {/* Text Input Area */}
          <div className="p-6 bg-surface-lowest border-t border-white/5 shrink-0">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-white/5 rounded-xl blur opacity-30 group-focus-within:opacity-100 transition duration-500"></div>
              <div className="relative bg-surface-low rounded-xl p-2 flex items-end gap-2 border border-white/10">
                <textarea 
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white resize-none h-24 p-3 placeholder:text-neutral-600" 
                  placeholder="Write a response..."
                ></textarea>
                <div className="flex flex-col gap-2 pb-2 pr-2">
                  <button aria-label="Send Message" className="w-10 h-10 bg-gradient-to-br from-white to-neutral-300 rounded-lg flex items-center justify-center text-black shadow-lg hover:-translate-y-0.5 transition-transform duration-300">
                    <Send size={18} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[0.65rem] font-medium tracking-wide text-neutral-600">
              <div className="flex gap-4">
                <button className="flex items-center gap-1 hover:text-neutral-400 transition-colors">
                  <Paperclip size={14} />
                  ATTACHMENT
                </button>
                <button className="flex items-center gap-1 hover:text-neutral-400 transition-colors">
                  <Clock size={14} />
                  SCHEDULE REPLY
                </button>
              </div>
              <span>CTRL + ENTER TO SEND</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
