"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, LayoutDashboard, Settings, Mail, BookOpen, User } from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Messages", href: "/admin/messages", icon: Mail },
  { name: "Journal", href: "/admin/journal", icon: BookOpen },
  { name: "Profile", href: "/admin/about", icon: User },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-300 flex flex-col md:flex-row font-sans selection:bg-white selection:text-black">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-r border-white/5 bg-[#0a0a0a] flex flex-col justify-between shrink-0 h-auto md:h-screen sticky top-0">
        <div>
          <div className="p-8 border-b border-white/5">
            <Link href="/admin">
              <h1 className="text-xl font-bold tracking-tighter text-white">
                KOTA<br />STUDIO.
              </h1>
            </Link>
            <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-mono mt-2 block">Command Center</span>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-xs tracking-widest uppercase transition-colors rounded-sm ${
                    isActive 
                      ? "bg-white/10 text-white font-semibold" 
                      : "text-neutral-500 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs tracking-widest uppercase text-neutral-500 hover:text-red-400 hover:bg-red-950/30 transition-colors rounded-sm"
          >
            <LogOut size={16} strokeWidth={1.5} />
            Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        <div className="max-w-6xl mx-auto p-8 md:p-12 lg:p-16">
          {children}
        </div>
      </main>
      
    </div>
  );
}
