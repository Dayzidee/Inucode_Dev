import Link from "next/link";
import { CONTACT_INFO } from "../../lib/data/contact";

export function GlobalFooter() {
  return (
    <footer className="w-full py-12 sm:py-20 px-4 sm:px-6 md:px-12 bg-surface border-t border-white/10 overflow-x-hidden">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 max-w-7xl mx-auto">
        
        {/* Brand Info */}
        <div className="col-span-2 md:col-span-1">
          <span className="text-white font-black text-xl sm:text-2xl tracking-tighter">KOTA DEV</span>
          <p className="mt-3 text-xs text-[#a3a3a3] tracking-widest uppercase leading-relaxed">
            A digital atelier focusing on industrial-grade web architecture and editorial excellence.
          </p>
        </div>
        
        {/* Network Social Links */}
        <div className="flex flex-col gap-3">
          <span className="text-white text-xs tracking-superwide font-bold uppercase mb-1">Network</span>
          {CONTACT_INFO.socials.map((social, i) => (
            <a 
              key={i} 
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a3a3a3] hover:text-white text-xs tracking-widest uppercase transition-colors"
            >
              {social.label}
            </a>
          ))}
          {CONTACT_INFO.whatsapp.map((wa, i) => (
            <a 
              key={`wa-${i}`}
              href={wa.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a3a3a3] hover:text-white text-xs tracking-widest uppercase transition-colors"
            >
              {wa.label}
            </a>
          ))}
        </div>
        
        {/* Active Application Navigation Links */}
        <div className="flex flex-col gap-3">
          <span className="text-white text-xs tracking-superwide font-bold uppercase mb-1">Navigation</span>
          {[
            { label: "Studio", href: "/studio" },
            { label: "About", href: "/about" },
            { label: "Journal", href: "/journal" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="text-[#a3a3a3] hover:text-white text-xs tracking-widest uppercase transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        {/* Copyright */}
        <div className="col-span-2 md:col-span-1 flex flex-col justify-end items-start md:items-end">
          <p className="text-[#a3a3a3] text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} KOTA DEV. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
