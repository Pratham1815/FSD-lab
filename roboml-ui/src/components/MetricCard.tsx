"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaType?: "up" | "down" | "neutral";
  className?: string;
}

export function MetricCard({ label, value, delta, deltaType = "neutral", className }: MetricCardProps) {
  const deltaColor =
    deltaType === "up"
      ? "text-teal-400"
      : deltaType === "down"
      ? "text-red-400"
      : "text-gray-400";

  return (
    <div
      className={cn(
        "rounded-lg bg-white/5 border border-white/10 p-4 flex flex-col gap-1",
        className
      )}
    >
      <span className="text-xs text-gray-400 uppercase tracking-wider">{label}</span>
      <span className="text-2xl font-medium text-white">{value}</span>
      {delta && (
        <span className={cn("text-xs font-medium", deltaColor)}>{delta}</span>
      )}
    </div>
  );
}
