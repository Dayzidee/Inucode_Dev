"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { X, Zap, ArrowUpRight, MessageCircle } from "lucide-react";
import { gsap } from "../../lib/use-gsap";

type Message = {
  role: "user" | "assistant";
  content: string;
};

/** Lightweight markdown → HTML for AI responses (no external lib) */
function renderMarkdown(text: string): string {
  return text
    // Bold: **text** → <strong>text</strong>
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic: *text* → <em>text</em> (single asterisk only)
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
    // Bullet lists: lines starting with - or • → styled li
    .replace(
      /^[\-•] (.+)$/gm,
      '<span class="flex gap-2"><span class="text-neutral-500 flex-shrink-0 mt-0.5">–</span><span>$1</span></span>'
    )
    // Preserve newlines as <br />
    .replace(/\n/g, "<br />");
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce"
          style={{ animationDelay: `${i * 0.18}s`, animationDuration: "0.9s" }}
        />
      ))}
    </span>
  );
}

const SUGGESTED_PROMPTS = [
  "What can Kota Dev build for me?",
  "What's Dunsimi's tech stack?",
  "How do I hire you?",
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Awaiting input. Ask me about Dunsimi's projects, tech stack, services, or how to start a project together.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && chatRef.current) {
      gsap.fromTo(
        chatRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }
      );
      setTimeout(() => inputRef.current?.focus(), 500);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    setShowSuggestions(false);
    setInput("");
    const currentMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(currentMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: currentMessages }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      setIsLoading(false);

      let assistantResponse = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ") && !line.includes("[DONE]")) {
            try {
              const data = JSON.parse(line.slice(6));
              const text = data.choices?.[0]?.delta?.content || "";
              if (text) {
                assistantResponse += text;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: assistantResponse,
                  };
                  return updated;
                });
              }
            } catch {
              // ignore partial chunk parse errors
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Connection issue. Try again or reach out directly via the Contact page.",
        },
      ]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Ambient label */}
      <div className="fixed left-6 bottom-12 z-20 origin-left -rotate-90 pointer-events-none hidden md:block">
        <span className="text-xs font-black tracking-megawide text-neutral-800 uppercase">
          SYS_KOTADEV_ACTIVE_V2
        </span>
      </div>

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end pointer-events-none">
        {isOpen && (
          <div
            ref={chatRef}
            className="w-80 sm:w-[26rem] max-w-[calc(100vw-2rem)] bg-neutral-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[34rem] sm:h-[38rem] max-h-[calc(100vh-6rem)] mb-3 sm:mb-4 pointer-events-auto"
          >
            {/* Header */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-white/5 bg-white/[0.03] flex-shrink-0">
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isLoading ? "bg-amber-400" : "bg-emerald-400"
                  } animate-pulse`}
                />
                <div>
                  <h2 className="text-xs font-black tracking-superwide text-white uppercase leading-none">
                    KOTA DEV AI
                  </h2>
                  <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">
                    {isLoading ? "computing..." : "online"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-600 hover:text-white transition-colors p-1"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
              {messages.map((msg, index) =>
                msg.role === "assistant" ? (
                  <div key={index} className="flex flex-col items-start gap-1.5 max-w-[88%]">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Zap size={11} className="text-accent-info fill-accent-info" />
                      <span className="text-[10px] font-black tracking-widest text-neutral-500 uppercase">
                        Kota Dev Core
                      </span>
                    </div>
                    <div className="bg-neutral-900 border border-white/5 text-neutral-200 text-sm p-4 rounded-2xl rounded-tl-sm leading-relaxed">
                      {msg.content
                        ? <span dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                        : <TypingDots />}
                    </div>
                  </div>
                ) : (
                  <div key={index} className="flex flex-col items-end gap-1.5 max-w-[88%] ml-auto">
                    <span className="text-[10px] font-black tracking-widest text-neutral-500 uppercase mb-0.5">
                      You
                    </span>
                    <div className="bg-white text-black text-sm p-4 rounded-2xl rounded-tr-sm font-medium leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>
                )
              )}

              {/* Typing indicator while waiting for first chunk */}
              {isLoading && (
                <div className="flex flex-col items-start gap-1.5 max-w-[88%]">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Zap size={11} className="text-accent-info fill-accent-info" />
                    <span className="text-[10px] font-black tracking-widest text-neutral-500 uppercase">
                      Kota Dev Core
                    </span>
                  </div>
                  <div className="bg-neutral-900 border border-white/5 text-neutral-200 text-sm px-4 py-3 rounded-2xl rounded-tl-sm">
                    <TypingDots />
                  </div>
                </div>
              )}

              {/* Suggested prompts */}
              {showSuggestions && messages.length === 1 && (
                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
                    Try asking:
                  </span>
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-left text-xs text-neutral-400 hover:text-white border border-white/5 hover:border-white/20 px-4 py-2.5 rounded-xl transition-all duration-200 hover:bg-white/5"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-white/5 bg-white/[0.02] flex-shrink-0"
            >
              <div className="flex items-center gap-3 bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 focus-within:border-white/30 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-600 focus:outline-none disabled:opacity-40 min-w-0"
                  placeholder="Ask anything..."
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="text-neutral-500 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                  aria-label="Send message"
                >
                  <ArrowUpRight size={18} className="hover:-translate-y-0.5 hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
              <p className="text-[10px] text-neutral-700 font-mono uppercase tracking-widest text-center mt-2">
                Powered by Llama 3.1 • NVIDIA NIM
              </p>
            </form>
          </div>
        )}

        {/* Toggle button */}
        {!isOpen && (
          <div className="group relative pointer-events-auto">
            <button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 sm:w-16 sm:h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Open Kota Dev AI chat"
            >
              <MessageCircle className="text-black" size={24} />
            </button>
            <div className="absolute right-20 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none pr-4">
              <div className="bg-neutral-900 text-white text-xs font-bold uppercase tracking-superwide px-4 py-2 rounded-lg whitespace-nowrap shadow-xl border border-white/10 backdrop-blur-md">
                Ask Kota Dev AI
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
