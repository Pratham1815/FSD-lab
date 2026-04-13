"use client";

import React, { useEffect, useRef } from "react";

interface LossChartProps {
  data: number[];
  currentLoss: number;
}

export function LossChart({ data, currentLoss }: LossChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const W = parent.clientWidth;
    const H = 100;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, W, H);
    const mn = 0, mx = 0.55;
    const xStep = W / Math.max(data.length - 1, 1);

    ctx.strokeStyle = "#1D9E75";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = i * xStep;
      const y = H - ((v - mn) / (mx - mn)) * H * 0.85 - 4;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.globalAlpha = 0.15;
    ctx.fillStyle = "#1D9E75";
    ctx.lineTo((data.length - 1) * xStep, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.fillStyle = "#9FE1CB";
    ctx.font = "11px sans-serif";
    ctx.fillText(`Loss: ${currentLoss.toFixed(4)}`, 4, 14);
  }, [data, currentLoss]);

  return (
    <div className="w-full" style={{ height: 100 }}>
      <canvas ref={canvasRef} className="w-full" style={{ height: 100 }} />
    </div>
  );
}
