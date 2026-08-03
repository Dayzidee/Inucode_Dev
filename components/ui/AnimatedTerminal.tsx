"use client";

import { useState, useEffect, useRef } from "react";

const TERMINAL_LINES = [
  { prefix: "~", cmd: "node --version", output: "v20.11.0" },
  { prefix: "~", cmd: "python3 --version", output: "Python 3.12.3" },
  { prefix: "~/kota-skillz", cmd: "wc -l **/*.py | tail -1", output: "4,218 total" },
  { prefix: "~/indigent-scholars", cmd: "npx next info", output: "Next.js 15.0 | TypeScript 5.4 | Supabase" },
  { prefix: "~/despendable", cmd: "npm test -- --coverage", output: "Tests: 47 passed | Coverage: 89.2%" },
  { prefix: "~", cmd: "docker ps --format '{{.Names}}'", output: "postgres_db  redis_cache  nginx_proxy" },
  { prefix: "~", cmd: "git log --oneline -1", output: "a3f9c2d refactor: migrate to edge runtime" },
];

export function AnimatedTerminal() {
  const [lines, setLines] = useState<{ text: string; type: "cmd" | "output" }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "output" | "pause">("typing");
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentLineIndex >= TERMINAL_LINES.length) {
      // Reset after all lines are done
      const timeout = setTimeout(() => {
        setLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
        setPhase("typing");
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const current = TERMINAL_LINES[currentLineIndex];

    if (phase === "typing") {
      if (currentCharIndex < current.cmd.length) {
        const timeout = setTimeout(() => {
          setCurrentCharIndex((prev) => prev + 1);
        }, 35 + Math.random() * 40);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, show full command line and move to output
        const timeout = setTimeout(() => {
          setLines((prev) => [
            ...prev,
            { text: `${current.prefix} $ ${current.cmd}`, type: "cmd" },
          ]);
          setPhase("output");
        }, 300);
        return () => clearTimeout(timeout);
      }
    }

    if (phase === "output") {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, { text: current.output, type: "output" }]);
        setPhase("pause");
      }, 200);
      return () => clearTimeout(timeout);
    }

    if (phase === "pause") {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
        setPhase("typing");
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, phase]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, currentCharIndex]);

  const currentCmd = currentLineIndex < TERMINAL_LINES.length
    ? TERMINAL_LINES[currentLineIndex]
    : null;

  return (
    <div className="w-full bg-[#0a0a0a] border border-white/[0.06] rounded-lg overflow-hidden font-mono text-[11px] leading-relaxed shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-neutral-600 text-[10px] tracking-wider uppercase">dunsimi@kota-dev</span>
      </div>

      {/* Terminal body */}
      <div ref={terminalRef} className="p-4 h-[140px] sm:h-[200px] overflow-y-auto custom-scrollbar space-y-1">
        {lines.map((line, i) => (
          <div key={i} className={line.type === "cmd" ? "text-neutral-400" : "text-emerald-400/80"}>
            {line.text}
          </div>
        ))}

        {/* Active typing line */}
        {phase === "typing" && currentCmd && (
          <div className="text-neutral-400">
            <span className="text-neutral-600">{currentCmd.prefix} $ </span>
            <span className="text-white">{currentCmd.cmd.slice(0, currentCharIndex)}</span>
            <span className="inline-block w-[7px] h-[14px] bg-white/80 ml-[1px] animate-pulse align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}
