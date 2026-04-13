"use client";

import React from "react";

interface RobotSVGProps {
  jointL: number;
  jointR: number;
  visionConf: number;
}

export function RobotSVG({ jointL, jointR, visionConf }: RobotSVGProps) {
  return (
    <div className="relative flex items-center justify-center h-64">
      <svg viewBox="0 0 180 240" className="w-44 h-56" xmlns="http://www.w3.org/2000/svg">
        {/* Head */}
        <rect x="55" y="10" width="70" height="60" rx="12" fill="#1D9E75" fillOpacity="0.15" stroke="#1D9E75" strokeWidth="1.5"/>
        <circle cx="75" cy="35" r="8" fill="#1D9E75"/>
        <circle cx="105" cy="35" r="8" fill="#1D9E75"/>
        <circle cx="90" cy="55" r="4" fill="#9FE1CB"/>
        {/* Body */}
        <rect x="40" y="80" width="100" height="80" rx="10" fill="none" stroke="#1D9E75" strokeWidth="1.5"/>
        <rect x="50" y="90" width="80" height="60" rx="6" fill="#E1F5EE" fillOpacity="0.1"/>
        <rect x="60" y="100" width="60" height="6" rx="2" fill="#9FE1CB" fillOpacity="0.7"/>
        <rect x="60" y="114" width="40" height="6" rx="2" fill="#9FE1CB" fillOpacity="0.7"/>
        <rect x="60" y="128" width="50" height="6" rx="2" fill="#9FE1CB" fillOpacity="0.7"/>
        {/* Arms */}
        <rect x="20" y="82" width="18" height="55" rx="6" fill="none" stroke="#1D9E75" strokeWidth="1.5"/>
        <rect x="142" y="82" width="18" height="55" rx="6" fill="none" stroke="#1D9E75" strokeWidth="1.5"/>
        {/* Legs */}
        <rect x="60" y="168" width="25" height="55" rx="6" fill="none" stroke="#1D9E75" strokeWidth="1.5"/>
        <rect x="95" y="168" width="25" height="55" rx="6" fill="none" stroke="#1D9E75" strokeWidth="1.5"/>
        {/* Connectors */}
        <line x1="90" y1="70" x2="90" y2="80" stroke="#1D9E75" strokeWidth="2"/>
        <line x1="40" y1="109" x2="28" y2="109" stroke="#1D9E75" strokeWidth="2"/>
        <line x1="140" y1="109" x2="152" y2="109" stroke="#1D9E75" strokeWidth="2"/>
        <line x1="72" y1="160" x2="72" y2="168" stroke="#1D9E75" strokeWidth="2"/>
        <line x1="107" y1="160" x2="107" y2="168" stroke="#1D9E75" strokeWidth="2"/>
      </svg>

      <div className="absolute top-2 right-2 flex flex-col gap-1 text-right">
        <span className="text-xs text-gray-500">Joint angles</span>
        <span className="text-sm font-medium text-white">L: {jointL}° | R: {jointR}°</span>
        <span className="text-xs text-gray-500 mt-1">Vision confidence</span>
        <span className="text-sm font-medium text-teal-400">{visionConf.toFixed(1)}%</span>
      </div>
    </div>
  );
}
