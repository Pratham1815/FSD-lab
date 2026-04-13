"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SensorBarProps {
  label: string;
  value: number;
  max: number;
  displayValue: string;
  color?: string;
  className?: string;
}

export function SensorBar({
  label,
  value,
  max,
  displayValue,
  color = "bg-teal-400",
  className,
}: SensorBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-xs text-gray-400">{label}</span>
      <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700", color)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-medium text-white">{displayValue}</span>
    </div>
  );
}
