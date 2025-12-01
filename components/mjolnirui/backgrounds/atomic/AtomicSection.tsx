"use client";

import React, { useState, useEffect } from "react";
import { Heart, Github, Download } from "lucide-react";
import Atomic from "./Atomic";

declare global {
  interface Window {
    isAtomicCodeTab?: boolean;
  }
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AtomicSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  // Full control state
  const [coreIntensity, setCoreIntensity] = useState(1.0);
  const [coreSpeed, setCoreSpeed] = useState(1.0);
  const [corePulse, setCorePulse] = useState(1.0);
  const [shellIntensity, setShellIntensity] = useState(1.0);
  const [shellSpeed, setShellSpeed] = useState(1.0);
  const [tendrilCount, setTendrilCount] = useState(12);
  const [tendrilIntensity, setTendrilIntensity] = useState(1.0);
  const [particleCount, setParticleCount] = useState(80);
  const [particleSpeed, setParticleSpeed] = useState(1.0);
  const [mistDensity, setMistDensity] = useState(0.3);
  const [breathing, setBreathing] = useState(1.0);
  const [warp, setWarp] = useState(1.0);

  const [coreColor1, setCoreColor1] = useState("#ffffff");
  const [coreColor2, setCoreColor2] = useState("#ff8c00");
  const [shellColor1, setShellColor1] = useState("#8b00ff");
  const [shellColor2, setShellColor2] = useState("#00d0ff");

  useEffect(() => {
    window.isAtomicCodeTab = activeTab === "code";
    return () => { window.isAtomicCodeTab = false; };
  }, [activeTab]);

  const resetToDefault = () => {
    setCoreIntensity(1.0); setCoreSpeed(1.0); setCorePulse(1.0);
    setShellIntensity(1.0); setShellSpeed(1.0);
    setTendrilCount(12); setTendrilIntensity(1.0);
    setParticleCount(80); setParticleSpeed(1.0);
    setMistDensity(0.3); setBreathing(1.0); setWarp(1.0);
    setCoreColor1("#ffffff"); setCoreColor2("#ff8c00");
    setShellColor1("#8b00ff"); setShellColor2("#00d0ff");
  };

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gold tracking-tight">
              Atomic
            </h1>
            <span className="bg-violet-600/30 text-purple-400 text-sm font-bold px-4 py-1.5 rounded-full border border-violet-600/50 animate-pulse">
              COMING SOON
            </span>
          
          </div>
        </div>

        {/* Tabs + Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-gold/20 pb-6">
          <div className="flex gap-8 overflow-x-auto scrollbar-hide">
            {(["preview", "code"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-4 px-4 capitalize text-lg font-medium transition relative whitespace-nowrap",
                  activeTab === tab
                    ? "text-gold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gold after:rounded-full"
                    : "text-gray-400 hover:text-gold"
                )}
              >
                {tab === "preview" ? "Preview" : "Code"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button aria-label="Like" className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition backdrop-blur-sm border border-white/10">
              <Heart className="h-6 w-6" />
            </button>
            <button aria-label="GitHub" className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition backdrop-blur-sm border border-white/10">
              <Github className="h-6 w-6" />
            </button>
            <button aria-label="Download" className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition backdrop-blur-sm border border-white/10">
              <Download className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {activeTab === "preview" ? (
        <>
          <div className="grid lg:grid-cols-12 gap-10 mb-16 max-w-7xl mx-auto px-6">
            {/* Preview */}
            <div className="lg:col-span-8">
              <h3 className="text-2xl font-bold text-silver mb-6">Preview</h3>
              <div className="relative bg-black border border-gold/20 rounded-3xl overflow-hidden shadow-2xl h-96 md:h-[700px]">
                <Atomic
                  coreIntensity={coreIntensity}
                  coreSpeed={coreSpeed}
                  corePulse={corePulse}
                  shellIntensity={shellIntensity}
                  shellSpeed={shellSpeed}
                  tendrilCount={tendrilCount}
                  tendrilIntensity={tendrilIntensity}
                  particleCount={particleCount}
                  particleSpeed={particleSpeed}
                  mistDensity={mistDensity}
                  breathing={breathing}
                  warp={warp}
                  coreColor1={coreColor1}
                  coreColor2={coreColor2}
                  shellColor1={shellColor1}
                  shellColor2={shellColor2}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7">

                {/* Core Colors */}
                <div>
                  <label className="text-gray-300 font-medium block mb-3">Core Colors</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="color" value={coreColor1} onChange={(e) => setCoreColor1(e.target.value)} className="w-full h-14 rounded cursor-pointer border-2 border-gold/30" title="Core Color 1" />
                    <input type="color" value={coreColor2} onChange={(e) => setCoreColor2(e.target.value)} className="w-full h-14 rounded cursor-pointer border-2 border-gold/30" title="Core Color 2" />
                  </div>
                </div>

                {/* Shell Colors */}
                <div>
                  <label className="text-gray-300 font-medium block mb-3">Shell Colors</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="color" value={shellColor1} onChange={(e) => setShellColor1(e.target.value)} className="w-full h-14 rounded cursor-pointer border-2 border-gold/30" title="Shell Color 1" />
                    <input type="color" value={shellColor2} onChange={(e) => setShellColor2(e.target.value)} className="w-full h-14 rounded cursor-pointer border-2 border-gold/30" title="Shell Color 2" />
                  </div>
                </div>

                {/* Core Controls */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Core Intensity: {coreIntensity.toFixed(2)}</label>
                  <input type="range" min="0" max="3" step="0.1" value={coreIntensity} onChange={(e) => setCoreIntensity(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Core Intensity" />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Core Speed: {coreSpeed.toFixed(2)}</label>
                  <input type="range" min="0" max="3" step="0.1" value={coreSpeed} onChange={(e) => setCoreSpeed(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Core Speed" />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Core Pulse: {corePulse.toFixed(2)}</label>
                  <input type="range" min="0" max="3" step="0.1" value={corePulse} onChange={(e) => setCorePulse(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Core Pulse" />
                </div>

                {/* Shell Controls */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Shell Intensity: {shellIntensity.toFixed(2)}</label>
                  <input type="range" min="0" max="3" step="0.1" value={shellIntensity} onChange={(e) => setShellIntensity(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Shell Intensity" />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Shell Speed: {shellSpeed.toFixed(2)}</label>
                  <input type="range" min="0" max="3" step="0.1" value={shellSpeed} onChange={(e) => setShellSpeed(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Shell Speed" />
                </div>

                {/* Tendrils */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Tendril Count: {tendrilCount}</label>
                  <input type="range" min="4" max="20" step="1" value={tendrilCount} onChange={(e) => setTendrilCount(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Tendril Count" />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Tendril Intensity: {tendrilIntensity.toFixed(2)}</label>
                  <input type="range" min="0" max="3" step="0.1" value={tendrilIntensity} onChange={(e) => setTendrilIntensity(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Tendril Intensity" />
                </div>

                {/* Particles */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Particle Count: {particleCount}</label>
                  <input type="range" min="20" max="150" step="10" value={particleCount} onChange={(e) => setParticleCount(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Particle Count" />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Particle Speed: {particleSpeed.toFixed(2)}</label>
                  <input type="range" min="0" max="3" step="0.1" value={particleSpeed} onChange={(e) => setParticleSpeed(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Particle Speed" />
                </div>

                {/* Global */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Mist Density: {mistDensity.toFixed(2)}</label>
                  <input type="range" min="0" max="1" step="0.05" value={mistDensity} onChange={(e) => setMistDensity(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Mist Density" />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Breathing: {breathing.toFixed(2)}</label>
                  <input type="range" min="0" max="2" step="0.1" value={breathing} onChange={(e) => setBreathing(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Breathing" />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Warp: {warp.toFixed(2)}</label>
                  <input type="range" min="0" max="3" step="0.1" value={warp} onChange={(e) => setWarp(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Warp" />
                </div>

                {/* Reset */}
                <div className="pt-6 border-t border-gold/20">
                  <button
                    onClick={resetToDefault}
                    className="w-full px-6 py-4 bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-black font-bold rounded-xl transition shadow-xl text-lg"
                  >
                    Reset to Default
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Props Table */}
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-silver mb-6">Props</h3>
            <div className="bg-black/40 border border-gold/20 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gold/10">
                  <tr>
                    <th className="text-left p-5 font-bold">Property</th>
                    <th className="text-left p-5 font-bold">Type</th>
                    <th className="text-left p-5 font-bold">Default</th>
                    <th className="text-left p-5 font-bold">Range</th>
                    <th className="text-left p-5 font-bold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/10">
                  <tr>
                    <td className="p-5 font-mono text-gold">coreIntensity</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0–3</td>
                    <td className="p-5 text-gray-300">Brightness of the nuclear core</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">coreSpeed</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0–3</td><td className="p-5 text-gray-300">Animation speed of core turbulence</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">corePulse</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0–3</td>
                    <td className="p-5 text-gray-300">Pulsing intensity of core</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">shellIntensity</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0–3</td><td className="p-5 text-gray-300">Brightness of outer shell</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">shellSpeed</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0–3</td>
                    <td className="p-5 text-gray-300">Rotation speed of energy shell</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">tendrilCount</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">12</td>
                    <td className="p-5 text-gray-400">4–20</td>
                    <td className="p-5 text-gray-300">Number of plasma tendrils</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">tendrilIntensity</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0–3</td>
                    <td className="p-5 text-gray-300">Brightness of tendrils</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">particleCount</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">80</td>
                    <td className="p-5 text-gray-400">20–150</td>
                    <td className="p-5 text-gray-300">Number of orbital particles</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">particleSpeed</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0–3</td>
                    <td className="p-5 text-gray-300">Speed of particle orbits</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">mistDensity</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.3</td>
                    <td className="p-5 text-gray-400">0–1</td>
                    <td className="p-5 text-gray-300">Background nebula mist</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">breathing</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0–2</td>
                    <td className="p-5 text-gray-300">Pulsing scale effect</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">warp</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0–3</td>
                    <td className="p-5 text-gray-300">Space distortion</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">coreColor1/2</td>
                    <td className="p-5 text-gray-300">string</td>
                    <td className="p-5 font-mono text-gray-400">#ffffff / #ff8c00</td>
                    <td className="p-5 text-gray-400">hex</td>
                    <td className="p-5 text-gray-300">Core gradient colors</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">shellColor1/2</td>
                    <td className="p-5 text-gray-300">string</td>
                    <td className="p-5 font-mono text-gray-400">#8b00ff / #00d0ff</td>
                    <td className="p-5 text-gray-400">hex</td>
                    <td className="p-5 text-gray-300">Shell gradient colors</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Install</h3>
            <pre className="bg-black/60 border border-gold/20 rounded-2xl p-8 text-orange text-lg font-mono">
              npm install ogl
            </pre>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Usage</h3>
            <pre className="bg-black/60 border border-gold/20 rounded-2xl p-8 overflow-x-auto">
              <code className="text-orange font-mono text-sm">
{`import Atomic from "@/components/mjolnirui/backgrounds/Atomic"

<div className="relative w-full h-screen bg-black">
  <Atomic coreIntensity={1.2} shellIntensity={1.5} />
</div>`}
              </code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}
