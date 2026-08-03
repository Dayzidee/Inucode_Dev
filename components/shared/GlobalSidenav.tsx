"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  Grid, BookOpen, User, Shield, Gavel,
  LayoutDashboard, Calendar, MessageSquare, Settings, 
  Plus, X, Mail
} from "lucide-react";

interface GlobalSidenavProps {
  variant: "public" | "admin";
  isOpen?: boolean;
  onClose?: () => void;
}

export function GlobalSidenav({ variant, isOpen = false, onClose }: GlobalSidenavProps) {
  const pathname = usePathname();

  if (variant === "admin") {
    const adminNavItems = [
      { path: "/admin", icon: Grid, label: "Gallery" },
      { path: "/admin/process", icon: LayoutDashboard, label: "Process" },
      { path: "/admin/journal", icon: BookOpen, label: "Journal" },
      { path: "/admin/about", icon: User, label: "About" },
      { path: "/admin/messages", icon: MessageSquare, label: "Chat" },
      { path: "/admin/settings", icon: Settings, label: "Settings" },
    ];

    return (
      <aside className="fixed left-0 top-0 h-full w-64 z-[90] bg-[#131313] border-r border-white/15 flex flex-col p-6">
        <div className="mb-12">
          <div className="text-lg font-bold text-white tracking-tighter uppercase mb-1">KOTA DEV</div>
          <div className="text-[0.6875rem] uppercase tracking-[0.15em] text-[#a3a3a3]">High-End Editorial</div>
        </div>
        
        <nav className="flex-1 space-y-2">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path}
                href={item.path} 
                className={`flex items-center gap-3 px-4 py-3 text-sm tracking-wide transition-colors duration-300 rounded-lg ${
                  isActive 
                    ? "text-white font-bold bg-neutral-800/50" 
                    : "text-[#a3a3a3] hover:text-white hover:bg-neutral-800"
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-auto pt-8">
          <button className="w-full py-3 bg-primary text-on-primary text-[0.6875rem] font-bold uppercase tracking-widest rounded-lg hover:opacity-90 transition-opacity">
            Start Project
          </button>
          <div className="mt-8 flex gap-4">
            <Link href="/privacy" className="text-[#a3a3a3] hover:text-white transition-colors" aria-label="Privacy">
              <Shield size={18} />
            </Link>
            <Link href="/terms" className="text-[#a3a3a3] hover:text-white transition-colors" aria-label="Terms of Service">
              <Gavel size={18} />
            </Link>
          </div>
        </div>
      </aside>
    );
  }

  // Public Nav: Acts as a mobile drawer that is hidden on desktop
  const publicNavLinks = [
    { href: "/studio", icon: Grid, label: "Studio" },
    { href: "/about", icon: User, label: "About" },
    { href: "/journal", icon: BookOpen, label: "Journal" },
    { href: "/contact", icon: Mail, label: "Contact" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`fixed left-0 top-0 h-full w-72 z-[100] bg-[#0a0a0a] border-r border-white/5 flex flex-col p-6 transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/5" aria-label="Close Menu">
            <X size={22} />
          </button>
        </div>
        
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center overflow-hidden">
              <Image 
                src="/images/portfolio/ai-avatar.jpg"
                alt="AI Portrait of creative director" 
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <div className="text-lg font-black text-white leading-tight uppercase tracking-tighter">KOTA DEV</div>
              <div className="text-[0.625rem] uppercase tracking-[0.2em] text-neutral-500 font-bold">High-End Editorial</div>
            </div>
          </div>
          
          <nav className="space-y-2">
            {publicNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center gap-4 px-4 py-4 rounded-lg text-xs font-semibold tracking-widest uppercase transition-colors min-h-[44px] ${
                    isActive 
                      ? "text-white bg-white/5" 
                      : "text-neutral-500 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <link.icon size={18} className={isActive ? "text-white" : "text-neutral-600"} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="mt-auto pt-8 border-t border-white/5">
          <Link href="/contact" onClick={onClose} className="flex justify-center items-center w-full bg-white text-black font-bold py-4 rounded-lg text-[0.625rem] uppercase tracking-widest mb-6 hover:bg-neutral-200 transition-colors min-h-[44px]">
            Start Project
          </Link>
          <div className="flex gap-4">
            <Link href="/privacy" onClick={onClose} className="text-neutral-600 hover:text-white transition-colors" aria-label="Privacy">
              <Shield size={18} />
            </Link>
            <Link href="/terms" onClick={onClose} className="text-neutral-600 hover:text-white transition-colors" aria-label="Terms of Service">
              <Gavel size={18} />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
