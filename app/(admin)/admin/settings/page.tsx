"use client";

import { useRef } from "react";
import { User, Bell, Shield, Key, Globe, Database, Save } from "lucide-react";
import { gsap, useGSAP } from "../../../../lib/use-gsap";
import Image from "next/image";

export default function SettingsPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".admin-header > *", { y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" })
      .from(".settings-nav > *", { x: -20, opacity: 0, stagger: 0.05, duration: 0.6, ease: "power2.out" }, "-=0.6")
      .from(".settings-content > *", { y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }, "-=0.4");
  }, { scope: container });

  return (
    <div ref={container} className="flex flex-col gap-8 h-full">
      {/* Header */}
      <section className="admin-header flex flex-col gap-1 shrink-0">
        <h1 className="text-6xl font-bold tracking-tightest leading-none text-white">SETTINGS</h1>
        <p className="text-neutral-500 font-medium uppercase tracking-superwide text-xs">System Configuration & Preferences</p>
      </section>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-12 gap-8 min-h-0">
        {/* Navigation Sidebar */}
        <div className="settings-nav col-span-12 md:col-span-3 flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-3 bg-surface-high text-white rounded-lg font-medium text-sm border-l-2 border-white transition-colors">
            <User size={18} />
            Profile Settings
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:bg-surface-low hover:text-white rounded-lg font-medium text-sm transition-colors">
            <Bell size={18} />
            Notifications
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:bg-surface-low hover:text-white rounded-lg font-medium text-sm transition-colors">
            <Shield size={18} />
            Security
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:bg-surface-low hover:text-white rounded-lg font-medium text-sm transition-colors">
            <Key size={18} />
            API Keys
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:bg-surface-low hover:text-white rounded-lg font-medium text-sm transition-colors">
            <Globe size={18} />
            Localization
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:bg-surface-low hover:text-white rounded-lg font-medium text-sm transition-colors">
            <Database size={18} />
            Data Management
          </button>
        </div>

        {/* Settings Content Area */}
        <div className="settings-content col-span-12 md:col-span-9 bg-surface-low rounded-xl border border-white/5 p-8 overflow-y-auto custom-scrollbar" tabIndex={0}>
          <div className="max-w-2xl space-y-10">
            {/* Section: Profile */}
            <section>
              <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Profile Information</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-surface-highest overflow-hidden border-2 border-white/10">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdcBsAJPqK6QfZYfE4xJKtLsuVm2Z4RtNcKKmxG4Z9KieFpUNuojw6vBiISG7-pXDEzLq9qsLA487sVD1VNnGTyoK7HMRr8ylBjx1maiNBvILyBSOfXxHR52JE_wyNumqI4K2E8HvucHY6NNJvb6PQdeZlvxH0C7PwOtj1DjNGzPNEtRCpFBwNoIGQ97TR-m3Dw5RNOMeVye7lTRg_DuXtL9X7V94WXbI0Q-Y_Y-r9GoHehGagj3QSeLejf1PY9xVX4Cl17kYVDNd4" alt="Admin" width={96} height={96} className="object-cover grayscale brightness-125" />
                </div>
                <div className="space-y-2">
                  <button className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded hover:bg-neutral-200 transition-colors">Change Avatar</button>
                  <button className="px-4 py-2 text-neutral-400 text-xs font-bold uppercase tracking-widest rounded hover:text-white transition-colors">Remove</button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">First Name</label>
                    <input type="text" defaultValue="Terminal" className="w-full bg-surface-lowest border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-white transition-shadow" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Last Name</label>
                    <input type="text" defaultValue="Admin" className="w-full bg-surface-lowest border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-white transition-shadow" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Email Address</label>
                  <input type="email" defaultValue="admin@kotadev.com" className="w-full bg-surface-lowest border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-white transition-shadow" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Bio</label>
                  <textarea rows={4} defaultValue="System administrator and lead strategist for Kota Dev." className="w-full bg-surface-lowest border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-white transition-shadow resize-none custom-scrollbar"></textarea>
                </div>
              </div>
            </section>

            <hr className="border-white/5" />

            {/* Section: Preferences */}
            <section>
              <h2 className="text-xl font-bold text-white mb-6 tracking-tight">System Preferences</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-surface-high rounded-lg border border-white/5">
                  <div>
                    <div className="text-white font-medium mb-1">Dark Mode</div>
                    <div className="text-neutral-500 text-xs">Force dark mode across all admin interfaces.</div>
                  </div>
                  <div className="w-12 h-6 bg-[#00FF94] rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-lowest rounded-lg border border-white/5">
                  <div>
                    <div className="text-white font-medium mb-1">Compact View</div>
                    <div className="text-neutral-500 text-xs">Reduce padding in tables and lists for higher data density.</div>
                  </div>
                  <div className="w-12 h-6 bg-surface-highest rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-neutral-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Save Button */}
            <div className="pt-6 flex justify-end">
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-sm uppercase tracking-widest rounded-lg hover:scale-105 transition-transform">
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
