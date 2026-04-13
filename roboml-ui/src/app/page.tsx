"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import { MetricCard } from "@/components/MetricCard";
import { SensorBar } from "@/components/SensorBar";
import { SystemLog, LogEntry } from "@/components/SystemLog";
import { RobotSVG } from "@/components/RobotSVG";
import { LossChart } from "@/components/LossChart";

const INITIAL_LOGS: LogEntry[] = [
  { time: "09:14:03", message: "[INFO] ResNet-50 loaded — CUDA device 0", type: "info" },
  { time: "09:14:07", message: "[OK] Sensor array initialized", type: "ok" },
  { time: "09:14:12", message: "[INFO] RL training started — epoch 1/100", type: "info" },
  { time: "09:14:58", message: "[WARN] Motor temp rising — monitor closely", type: "warn" },
  { time: "09:15:22", message: "[OK] Object detected: toolbox (97.4%)", type: "ok" },
];

const MODELS = [
  { name: "ResNet-50 Vision", meta: "Object detection · Active", acc: "94.2%", color: "#1D9E75" },
  { name: "LSTM Motion Planner", meta: "Trajectory prediction · Standby", acc: "89.7%", color: "#378ADD" },
  { name: "RL Policy Network", meta: "Reinforcement learning · Training", acc: "78.1%", color: "#7F77DD" },
];

const LOSS_HISTORY_INIT = [0.52, 0.44, 0.38, 0.31, 0.26, 0.21, 0.18, 0.15, 0.12, 0.10, 0.094, 0.090, 0.087];

function nowTime() { return new Date().toTimeString().slice(0, 8); }

export default function Dashboard() {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [epoch, setEpoch] = useState(47);
  const [loss, setLoss] = useState(0.087);
  const [lossHistory, setLossHistory] = useState(LOSS_HISTORY_INIT);
  const [accuracy, setAccuracy] = useState(94.2);
  const [activeModel, setActiveModel] = useState(0);

  const [prox, setProx] = useState(34);
  const [gyro, setGyro] = useState(12);
  const [motorLoad, setMotorLoad] = useState(55);
  const [temp, setTemp] = useState(42);
  const [jointL, setJointL] = useState(34);
  const [jointR, setJointR] = useState(67);
  const [visionConf, setVisionConf] = useState(97.4);

  const [lr, setLr] = useState(10);
  const [bs, setBs] = useState(32);
  const [dropout, setDropout] = useState(30);

  const [useSpline, setUseSpline] = useState(false);

  const addLog = useCallback((msg: string, type: LogEntry["type"] = "info") => {
    setLogs(prev => [...prev.slice(-30), { time: nowTime(), message: msg, type }]);
  }, []);

  // Live sensor updates
  useEffect(() => {
    const id = setInterval(() => {
      setProx(20 + Math.round(Math.random() * 60));
      setGyro(Math.round(Math.random() * 40));
      setMotorLoad(40 + Math.round(Math.random() * 30));
      setTemp(38 + Math.round(Math.random() * 10));
      setJointL(20 + Math.round(Math.random() * 80));
      setJointR(20 + Math.round(Math.random() * 80));
      setVisionConf(95 + Math.random() * 4);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  // Training simulation
  useEffect(() => {
    const id = setInterval(() => {
      setEpoch(prev => {
        if (prev >= 100) return prev;
        const next = prev + 1;
        const newLoss = Math.max(0.04, loss - Math.random() * 0.003);
        const newAcc = Math.min(99.9, accuracy + 0.05);
        setLoss(newLoss);
        setAccuracy(newAcc);
        setLossHistory(h => [...h.slice(-19), parseFloat(newLoss.toFixed(3))]);
        if (next % 5 === 0) {
          addLog(`[INFO] Epoch ${next} — loss: ${newLoss.toFixed(4)}, acc: ${newAcc.toFixed(2)}%`, "info");
        }
        return next;
      });
    }, 3000);
    return () => clearInterval(id);
  }, [loss, accuracy, addLog]);

  function handleCtrl(msg: string, type: LogEntry["type"] = "ok") {
    addLog(`[CMD] ${msg}`, type);
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-6 flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-teal-400 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2m0 5c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4M4 14h16v2H4v-2m2 4h12v2H6v-2z"/>
            </svg>
          </div>
          <div>
            <p className="font-medium text-base">RoboML Control Center</p>
            <p className="text-xs text-gray-500">Autonomous Systems · Real-time Inference</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="text-xs font-medium bg-teal-400/10 text-teal-400 border border-teal-400/20 px-3 py-1 rounded-full">● Robot Online</span>
          <span className="text-xs font-medium bg-amber-400/10 text-amber-400 border border-amber-400/20 px-3 py-1 rounded-full">
            {epoch >= 100 ? "✓ Training Complete" : "◑ Model Training"}
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard label="Model accuracy" value={`${accuracy.toFixed(1)}%`} delta="↑ converging" deltaType="up"/>
        <MetricCard label="Inference latency" value="12 ms" delta="↑ faster than baseline" deltaType="up"/>
        <MetricCard label="Training loss" value={loss.toFixed(3)} delta="↓ converging" deltaType="up"/>
        <MetricCard label="Epoch" value={`${epoch} / 100`} delta={`${epoch}% complete`} deltaType="up"/>
      </div>

      {/* Hero Spline Card */}
      <Card className="w-full h-[420px] bg-black/[0.96] relative overflow-hidden border-white/10">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#1D9E75"/>
        <div className="flex h-full">
          <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Interactive 3D Robot
            </h1>
            <p className="mt-4 text-neutral-400 max-w-sm text-sm leading-relaxed">
              An AI-powered robotic control system with real-time ML inference,
              live sensor telemetry, and autonomous motion planning.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setUseSpline(!useSpline)}
                className="text-sm px-4 py-2 rounded-lg border border-teal-500/40 text-teal-400 hover:bg-teal-400/10 transition-colors"
              >
                {useSpline ? "Show SVG Robot" : "Load 3D Scene"}
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            {useSpline ? (
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            ) : (
              <RobotSVG jointL={jointL} jointR={jointR} visionConf={visionConf}/>
            )}
          </div>
        </div>
      </Card>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Sensors */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Sensor readings</p>
            <div className="grid grid-cols-2 gap-4">
              <SensorBar label="Proximity (cm)" value={prox} max={100} displayValue={`${prox} cm`} color="bg-teal-400"/>
              <SensorBar label="Gyroscope (°/s)" value={gyro} max={40} displayValue={`${gyro} °/s`} color="bg-blue-400"/>
              <SensorBar label="Motor load (%)" value={motorLoad} max={100} displayValue={`${motorLoad}%`} color="bg-amber-400"/>
              <SensorBar label="Temperature (°C)" value={temp - 35} max={20} displayValue={`${temp} °C`} color="bg-red-400"/>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">System log</p>
            <SystemLog entries={logs}/>
          </div>

          {/* Confusion matrix */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Confusion matrix — vision model</p>
            <div className="flex gap-6 items-start">
              <div className="grid grid-cols-2 gap-1">
                {[
                  { v: 821, label: "True pos", bg: "bg-teal-400/20 text-teal-300" },
                  { v: 42,  label: "False neg", bg: "bg-red-400/20 text-red-300" },
                  { v: 19,  label: "False pos", bg: "bg-red-400/20 text-red-300" },
                  { v: 794, label: "True neg",  bg: "bg-teal-400/20 text-teal-300" },
                ].map((c, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className={`w-20 h-12 rounded-lg flex items-center justify-center text-lg font-medium ${c.bg}`}>{c.v}</div>
                    <span className="text-xs text-gray-500">{c.label}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-400 flex flex-col gap-2">
                <div>Precision: <span className="text-white font-medium">95.1%</span></div>
                <div>Recall: <span className="text-white font-medium">97.7%</span></div>
                <div>F1 score: <span className="text-white font-medium">96.4%</span></div>
                <div>Total samples: <span className="text-white font-medium">1,676</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-4">

          {/* ML Models */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">ML models</p>
            <div className="flex flex-col gap-2">
              {MODELS.map((m, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveModel(i); addLog(`[INFO] Switched to ${m.name}`, "info"); }}
                  className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                    activeModel === i
                      ? "border-teal-400/40 bg-teal-400/10"
                      : "border-white/10 hover:bg-white/5"
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: m.color }}/>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{m.name}</p>
                    <p className="text-xs text-gray-500">{m.meta}</p>
                  </div>
                  <span className="text-sm font-medium text-teal-400">{m.acc}</span>
                </button>
              ))}
            </div>

            {/* Training progress */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>RL Policy training</span>
                <span>Epoch {epoch}/100</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-teal-400 transition-all duration-500"
                  style={{ width: `${epoch}%` }}
                />
              </div>
              <div className="mt-3">
                <LossChart data={lossHistory} currentLoss={loss}/>
              </div>
            </div>
          </div>

          {/* Robot Controls */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Robot controls</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "↑ Fwd",    action: () => handleCtrl("Moving forward") },
                { label: "⊙ Cal",    action: () => handleCtrl("Calibrating sensors"), cls: "text-teal-400 border-teal-400/30" },
                { label: "↓ Back",   action: () => handleCtrl("Moving backward") },
                { label: "← Left",   action: () => handleCtrl("Turning left") },
                { label: "⬛ Stop",  action: () => handleCtrl("EMERGENCY STOP issued", "warn"), cls: "text-red-400 border-red-400/30" },
                { label: "→ Right",  action: () => handleCtrl("Turning right") },
                { label: "↗ Arm out",action: () => handleCtrl("Arm extended") },
                { label: "? IK",     action: () => handleCtrl("IK info requested", "info") },
                { label: "↙ Arm in", action: () => handleCtrl("Arm retracted") },
              ].map((b, i) => (
                <button
                  key={i}
                  onClick={b.action}
                  className={`py-2 text-xs font-medium rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 active:scale-95 transition-all ${b.cls ?? "text-white"}`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hyperparameters */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Hyperparameter tuning</p>
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Learning rate</span>
                  <span className="text-white font-medium">{(lr / 10000).toFixed(4)}</span>
                </div>
                <input type="range" min={1} max={100} value={lr} step={1}
                  onChange={e => setLr(Number(e.target.value))} className="w-full"/>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Batch size</span>
                  <span className="text-white font-medium">{bs}</span>
                </div>
                <input type="range" min={8} max={256} step={8} value={bs}
                  onChange={e => setBs(Number(e.target.value))} className="w-full"/>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Dropout rate</span>
                  <span className="text-white font-medium">{(dropout / 100).toFixed(2)}</span>
                </div>
                <input type="range" min={0} max={80} value={dropout} step={1}
                  onChange={e => setDropout(Number(e.target.value))} className="w-full"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
