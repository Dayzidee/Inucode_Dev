"use client";

import { useState, useEffect, MouseEvent } from "react";
import { X, Copy, Check, ArrowUpRight, Mail, MessageSquare, Share2, Sparkles } from "lucide-react";
import { CONTACT_INFO } from "../../lib/data/contact";
import { useContactModal } from "../../lib/context/ContactModalContext";

export function ContactModal() {
  const { isOpen, closeContactModal } = useContactModal();
  const [copied, setCopied] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = "auto";
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeContactModal();
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!isVisible && !isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col relative transition-all duration-300 ${
          isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
        }`}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase text-white">Direct Channel</h3>
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Kota Dev Contact Engine</p>
            </div>
          </div>
          <button 
            onClick={closeContactModal}
            aria-label="Close modal"
            className="text-neutral-400 hover:text-white transition-colors w-11 h-11 rounded-full hover:bg-white/10 cursor-pointer flex items-center justify-center flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
          
          {/* Email Section */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-2">
              <Mail size={12} /> Email Addresses
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CONTACT_INFO.emails.map((email, i) => (
                <button 
                  key={i}
                  onClick={() => handleCopy(email)}
                  className="group flex items-center justify-between bg-[#121212] hover:bg-white hover:text-black text-white px-4 py-3 rounded-xl transition-all duration-300 border border-white/5 hover:border-white text-left cursor-pointer min-h-[44px]"
                >
                  <span className="font-mono text-xs sm:text-sm truncate mr-2">{email}</span>
                  {copied === email ? (
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <Copy className="w-4 h-4 text-neutral-500 group-hover:text-black transition-colors flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* WhatsApp Section */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-2">
              <MessageSquare size={12} /> WhatsApp Direct Lines
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CONTACT_INFO.whatsapp.map((wa, i) => (
                <a 
                  key={i}
                  href={wa.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between bg-[#121212] hover:bg-[#25D366]/10 text-neutral-300 hover:text-[#25D366] px-4 py-3 rounded-xl transition-all duration-300 border border-white/5 hover:border-[#25D366]/30 cursor-pointer min-h-[44px]"
                >
                  <span className="font-mono text-xs sm:text-sm">{wa.label} ({wa.number})</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-[#25D366] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Socials Section */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-2">
              <Share2 size={12} /> Social Media
            </span>
            <div className="grid grid-cols-1 gap-3">
              {CONTACT_INFO.socials.map((social, i) => (
                <a 
                  key={i}
                  href={social.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between bg-[#121212] hover:bg-white/10 text-neutral-300 hover:text-white px-4 py-3 rounded-xl transition-all duration-300 border border-white/5 hover:border-white/20 cursor-pointer min-h-[44px]"
                >
                  <span className="font-mono text-xs sm:text-sm">{social.label} {social.handle}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-white/5 bg-white/[0.01] text-center flex-shrink-0">
          <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
            Click email to copy • Tap WhatsApp for instant chat
          </p>
        </div>
      </div>
    </div>
  );
}
