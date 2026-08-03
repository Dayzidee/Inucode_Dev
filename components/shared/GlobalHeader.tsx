"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface GlobalHeaderProps {
  isAdmin?: boolean;
  onMenuClick?: () => void;
}

export function GlobalHeader({ isAdmin = false, onMenuClick }: GlobalHeaderProps) {
  const pathname = usePathname();

  const content = (
    <div className={`flex justify-between items-center px-4 sm:px-6 md:px-12 lg:px-16 py-6 w-full ${isAdmin ? 'max-w-[1440px]' : 'w-full'}`}>
      {/* Brand Logo */}
      <Link href="/" className="font-['Inter'] font-black tracking-tighter text-white text-xl uppercase group flex items-center gap-2">
        KOTA<span className="text-neutral-500 font-medium">STUDIO</span>
        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
      
      <div className="flex items-center gap-12">
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex gap-8">
          {["Studio", "About", "Journal", "Contact"].map((item) => {
            const path = `/${item.toLowerCase()}`;
            const isActive = pathname === path;
            
            return (
              <Link
                key={item}
                href={path}
                className={`font-['Inter'] font-semibold tracking-widest uppercase text-[10px] transition-all duration-300 relative group ${
                  isActive 
                    ? "text-white" 
                    : "text-neutral-500 hover:text-white"
                }`}
              >
                {item}
                <div className={`absolute -bottom-2 left-0 h-[1px] bg-white transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            );
          })}
        </nav>
        
        {/* Trailing Action */}
        <div className="flex items-center gap-6">
          <button 
            onClick={onMenuClick} 
            aria-label="Toggle Menu" 
            className="text-white hover:text-neutral-300 transition-colors md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );

  if (isAdmin) {
    return (
      <header className="fixed top-0 left-64 right-0 z-[100] bg-black/50 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        {content}
      </header>
    );
  }

  return (
    <nav className="fixed top-0 w-full z-[100] bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm transition-all duration-300 border-b border-white/5">
      {content}
    </nav>
  );
}
