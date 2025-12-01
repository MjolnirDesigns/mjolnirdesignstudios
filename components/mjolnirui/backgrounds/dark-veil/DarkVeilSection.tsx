"use client";

import React, { useState, useEffect } from "react";
import { Heart, Github, Download } from "lucide-react";
import DarkVeil from "./DarkVeil";

declare global {
  interface Window {
    isDarkVeilCodeTab?: boolean;
  }
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DarkVeilSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const [hueShift, setHueShift] = useState(180);
  const [noiseIntensity, setNoiseIntensity] = useState(0.08);
  const [scanlineIntensity, setScanlineIntensity] = useState(0.15);
  const [speed, setSpeed] = useState(0.5);
  const [scanlineFrequency, setScanlineFrequency] = useState(2.5);
  const [warpAmount, setWarpAmount] = useState(1.2);

  useEffect(() => {
    window.isDarkVeilCodeTab = activeTab === "code";
    return () => { window.isDarkVeilCodeTab = false; };
  }, [activeTab]);

  const resetToDefault = () => {
    setHueShift(180);
    setNoiseIntensity(0.08);
    setScanlineIntensity(0.15);
    setSpeed(0.5);
    setScanlineFrequency(2.5);
    setWarpAmount(1.2);
  };

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gold tracking-tight">
              Dark Veil
            </h1>
            <span className="bg-emerald-500/20 text-emerald-400 text-sm font-bold px-4 py-1.5 rounded-full border border-emerald-500/50">
              NEW
            </span>
          </div>
        </div>

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
            <div className="lg:col-span-8">
              <h3 className="text-2xl font-bold text-silver mb-6">Preview</h3>
              <div className="relative bg-black border border-gold/20 rounded-3xl overflow-hidden shadow-2xl h-96 md:h-[520px]">
                <DarkVeil
                  hueShift={hueShift}
                  noiseIntensity={noiseIntensity}
                  scanlineIntensity={scanlineIntensity}
                  speed={speed}
                  scanlineFrequency={scanlineFrequency}
                  warpAmount={warpAmount}
                />
              </div>
            </div>

            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7">
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Hue Shift: {hueShift.toFixed(0)}°</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="1"
                    value={hueShift}
                    onChange={(e) => setHueShift(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Hue Shift"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Noise: {(noiseIntensity * 100).toFixed(0)}%</label>
                  <input
                    type="range"
                    min="0"
                    max="0.2"
                    step="0.01"
                    value={noiseIntensity}
                    onChange={(e) => setNoiseIntensity(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Noise Intensity"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Scanlines: {(scanlineIntensity * 100).toFixed(0)}%</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={scanlineIntensity}
                    onChange={(e) => setScanlineIntensity(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Scanline Intensity"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Speed: {speed.toFixed(2)}x</label>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Speed"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Scanline Freq: {scanlineFrequency.toFixed(1)}</label>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.1"
                    value={scanlineFrequency}
                    onChange={(e) => setScanlineFrequency(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Scanline Frequency"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Warp: {warpAmount.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={warpAmount}
                    onChange={(e) => setWarpAmount(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Warp Amount"
                  />
                </div>

                <div className="pt-6 border-t border-gold/20">
                  <button onClick={resetToDefault} className="w-full px-6 py-4 bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-black font-bold rounded-xl transition shadow-xl text-lg">
                    Reset to Default
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-silver mb-6">Props</h3>
            <div className="bg-black/40 border border-gold/20 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gold/10">
                  <tr>
                    <th className="text-left p-5 font-bold">Property</th>
                    <th className="text-left p-5 font-bold">Type</th>
                    <th className="text-left p-5 font-bold">Default</th>
                    <th className="text-left p-5 font-bold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/10">
                    <tr>
                        <td className="p-5 font-mono text-gold">hueShift</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">180</td>
                        <td className="p-5 text-gray-300">Hue rotation in degrees</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">noiseIntensity</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">0.08</td>
                        <td className="p-5 text-gray-300">Grain intensity</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">scanlineIntensity</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">0.15</td>
                        <td className="p-5 text-gray-300">Scanline visibility</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">speed</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">0.5</td>
                        <td className="p-5 text-gray-300">Animation speed</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">scanlineFrequency</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">2.5</td>
                        <td className="p-5 text-gray-300">Scanline spacing</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">warpAmount</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">1.2</td>
                        <td className="p-5 text-gray-300">Distortion strength</td>
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
{`import DarkVeil from "@/components/mjolnirui/backgrounds/DarkVeil"

<div className="relative w-full h-screen">
  <DarkVeil hueShift={180} noiseIntensity={0.08} />
</div>`}
              </code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}