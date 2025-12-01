"use client";

import React, { useState, useEffect } from "react";
import { Heart, Github, Download } from "lucide-react";
import BlackHole from "./BlackHole";

declare global {
  interface Window {
    isBlackHoleCodeTab?: boolean;
  }
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function BlackHoleSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  // CUSTOMIZATION STATE
  const [speed, setSpeed] = useState(1.0);
  const [intensity, setIntensity] = useState(1.0);
  const [distortion, setDistortion] = useState(1.0);
  const [glow, setGlow] = useState(1.0);
  const [frequency, setFrequency] = useState(1.4);

  useEffect(() => {
    window.isBlackHoleCodeTab = activeTab === "code";
    return () => { window.isBlackHoleCodeTab = false; };
  }, [activeTab]);

  const resetToDefault = () => {
    setSpeed(1.0);
    setIntensity(1.0);
    setDistortion(1.0);
    setGlow(1.0);
    setFrequency(1.4);
  };

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gold tracking-tight">
              Black Hole
            </h1>
            <span className="bg-red-600/30 text-red-400 text-sm font-bold px-4 py-1.5 rounded-full border border-red-600/50 animate-pulse">
              ULTIMATE
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
                <BlackHole
                  speed={speed}
                  intensity={intensity}
                  distortion={distortion}
                  glow={glow}
                  frequency={frequency}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7">

                {/* Speed */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Speed: {speed.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.05"
                    value={speed}
                    onChange={(e) => setSpeed(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust speed"
                    placeholder="Speed"
                  />
                </div>

                {/* Intensity */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Intensity: {intensity.toFixed(2)}</label>
                  <input
                    id="intensity"
                    type="range"
                    min="0"
                    max="3"
                    step="0.05"
                    value={intensity}
                    onChange={(e) => setIntensity(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust intensity"
                    placeholder="Intensity"
                  />
                </div>

                {/* Distortion */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Distortion: {distortion.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.05"
                    value={distortion}
                    onChange={(e) => setDistortion(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust distortion"
                    placeholder="Distortion"
                  />
                </div>

                {/* Glow */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Glow: {glow.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.05"
                    value={glow}
                    onChange={(e) => setGlow(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust glow"
                    placeholder="Glow"
                  />
                </div>

                {/* Frequency */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Frequency: {frequency.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.05"
                    value={frequency}
                    onChange={(e) => setFrequency(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust frequency"
                    placeholder="Frequency"
                  />
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
                    <td className="p-5 font-mono text-gold">speed</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0–3</td>
                    <td className="p-5 text-gray-300">Animation speed multiplier</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">intensity</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0–3</td>
                    <td className="p-5 text-gray-300">Event horizon brightness</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">distortion</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0–2</td>
                    <td className="p-5 text-gray-300">Gravitational lensing strength</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">glow</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0–3</td>
                    <td className="p-5 text-gray-300">Accretion disk glow</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">frequency</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.4</td>
                    <td className="p-5 text-gray-400">0.5–3</td>
                    <td className="p-5 text-gray-300">Noise frequency</td>
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
{`import BlackHole from "@/components/mjolnirui/backgrounds/BlackHole"

<div className="relative w-full h-screen bg-black">
  <BlackHole speed={1.5} intensity={2.0} />
</div>`}
              </code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}