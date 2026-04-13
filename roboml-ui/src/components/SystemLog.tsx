"use client";

import React, { useEffect, useRef } from "react";

export interface LogEntry {
  time: string;
  message: string;
  type: "info" | "ok" | "warn" | "err";
}

interface SystemLogProps {
  entries: LogEntry[];
}

const typeColors: Record<LogEntry["type"], string> = {
  info: "text-blue-400",
  ok:   "text-teal-400",
  warn: "text-amber-400",
  err:  "text-red-400",
};

export function SystemLog({ entries }: SystemLogProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [entries]);

  return (
    <div
      ref={ref}
      className="h-36 overflow-y-auto rounded-lg bg-black/40 border border-white/10 p-3 font-mono text-xs flex flex-col gap-1"
    >
      {entries.map((e, i) => (
        <div key={i} className="flex gap-3">
          <span className="text-gray-600 shrink-0">{e.time}</span>
          <span className={typeColors[e.type]}>{e.message}</span>
        </div>
      ))}
    </div>
  );
}
