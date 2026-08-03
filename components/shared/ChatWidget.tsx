"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { X, Zap, ArrowUpRight, Paperclip, Mic, MessageCircle } from "lucide-react";
import { gsap } from "../../lib/use-gsap";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Awaiting input. I can assist with portfolio navigation, technical documentation, or project deep-dives. How shall we proceed?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && chatRef.current) {
      gsap.fromTo(chatRef.current, 
        { y: 50, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: userMessage }] })
      });

      if (!response.ok) throw new Error("Failed to fetch response");
      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;

      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      let assistantResponse = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        
        for (const line of lines) {
          if (line.startsWith("data: ") && line !== "data: [DONE]") {
            try {
              const data = JSON.parse(line.slice(6));
              const text = data.choices[0]?.delta?.content || "";
              assistantResponse += text;
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content = assistantResponse;
                return newMessages;
              });
            } catch (e) {
              // ignore parse errors for partial chunks
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "Communication failure. System offline." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed left-6 bottom-12 z-20 origin-left -rotate-90 pointer-events-none hidden md:block">
        <span className="text-xs font-black tracking-megawide text-neutral-800 uppercase">SYS_KOTADEV_ACTIVE_V2</span>
      </div>

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end pointer-events-none">
        
        {isOpen && (
          <div 
            ref={chatRef}
            className="w-80 sm:w-100 max-w-[calc(100vw-2rem)] bg-neutral-950/90 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[32rem] sm:h-[37.5rem] max-h-[calc(100vh-6rem)] mb-3 sm:mb-4 pointer-events-auto"
          >
            <div className="px-6 py-5 flex items-center justify-between border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isLoading ? "bg-accent-warning" : "bg-white"} animate-pulse`}></div>
                <div>
                  <h2 className="text-xs font-black tracking-superwide text-white uppercase leading-none">KOTA DEV AI</h2>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded-sm bg-primary/10 text-primary uppercase border border-primary/20">V.2.0 Kinetic</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-neutral-500 hover:text-white transition-colors duration-300">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-8 custom-scrollbar">
              {messages.map((msg, index) => (
                msg.role === "assistant" ? (
                  <div key={index} className="flex flex-col items-start gap-2 max-w-[85%]">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap size={14} className="text-accent-info fill-accent-info" />
                      <span className="text-xs font-black tracking-widest text-neutral-400 uppercase">Kota Dev Core</span>
                    </div>
                    <div className="bg-surface-container-highest text-on-surface text-sm p-4 rounded-lg rounded-tl-none leading-relaxed shadow-lg whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  <div key={index} className="flex flex-col items-end gap-2 max-w-[85%] ml-auto">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black tracking-widest text-neutral-400 uppercase">Visitor</span>
                    </div>
                    <div className="bg-secondary text-on-secondary text-sm p-4 rounded-lg rounded-tr-none font-medium leading-relaxed shadow-lg whitespace-pre-wrap text-black">
                      {msg.content}
                    </div>
                  </div>
                )
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-6 border-t border-white/5 bg-white/5">
              <div className="relative group">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-transparent border-b border-outline-variant py-3 pr-12 text-xs tracking-widest font-bold uppercase placeholder:text-neutral-600 focus:outline-none focus:border-white transition-all duration-500 disabled:opacity-50 text-white" 
                  placeholder="COMMAND KOTA DEV..." 
                />
                <button type="submit" disabled={isLoading} className="absolute right-0 bottom-3 text-neutral-500 hover:text-white transition-all duration-300 disabled:opacity-50">
                  <ArrowUpRight size={20} className="hover:-translate-y-0.5 hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex gap-4">
                  <button type="button" className="text-neutral-600 hover:text-accent-error transition-colors">
                    <Paperclip size={18} />
                  </button>
                  <button type="button" className="text-neutral-600 hover:text-accent-success transition-colors">
                    <Mic size={18} />
                  </button>
                </div>
                <span className="text-xs font-bold text-neutral-700 tracking-superwide uppercase">
                  {isLoading ? "Status: Computing" : "Status: Optimal"}
                </span>
              </div>
            </form>
          </div>
        )}

        {!isOpen && (
          <div className="group relative pointer-events-auto">
            <button 
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 sm:w-16 sm:h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="text-on-primary" size={24} />
            </button>
            <div className="absolute right-20 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none pr-4">
              <div className="bg-neutral-900 text-white text-xs font-bold uppercase tracking-superwide px-4 py-2 rounded-lg whitespace-nowrap shadow-xl border border-white/10 backdrop-blur-md">
                Initialize System
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
