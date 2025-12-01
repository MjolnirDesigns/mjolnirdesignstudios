"use client";

import React, { useState, useEffect } from "react";
import { Heart, Github, Download } from "lucide-react";
import Atmosphere from "./Atmosphere";

declare global {
  interface Window {
    isAtmosphereCodeTab?: boolean;
  }
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AtmosphereSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const [color, setColor] = useState("#f59e0b"); // Warm gold/amber
  const [density, setDensity] = useState(1600);
  const [speed, setSpeed] = useState(1.0);
  const [size, setSize] = useState(1.8);
  const [opacity, setOpacity] = useState(0.95);
  const [opacitySpeed, setOpacitySpeed] = useState(2.0);

  useEffect(() => {
    window.isAtmosphereCodeTab = activeTab === "code";
    return () => { window.isAtmosphereCodeTab = false; };
  }, [activeTab]);

  const resetToDefault = () => {
    setColor("#f97316");
    setDensity(1600);
    setSpeed(1.0);
    setSize(1.8);
    setOpacity(0.9);
    setOpacitySpeed(2.0);
  };

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gold tracking-tight">
              Atmosphere
            </h1>
            <span className="bg-emerald-500/20 text-emerald-400 text-sm font-bold px-4 py-1.5 rounded-full border border-emerald-500/50">
              NEW
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
            {/* Preview — FINAL: LUNAR UI 1:1 + Warm Gold + Perfect Layers */}
            <div className="lg:col-span-8">
              <h3 className="text-2xl font-bold text-silver mb-6">Preview</h3>
              <div className="relative bg-black border border-gold/20 rounded-3xl overflow-hidden shadow-2xl h-96 md:h-[520px]">

                {/* EXACT LUNAR UI PLANET SILHOUETTE — BLACK, WIDE, CLEAN */}
                <div className="relative -mt-32 h-96 w-full overflow-hidden">
                  <div 
                    className="absolute inset-x-0 bottom-0 w-full h-full"
                    style={{
                      background: "radial-gradient(circle at 50% 100%, transparent 48%, black 52%)",
                    }}
                  />
                  <div 
                    className="absolute -left-1/2 bottom-0 w-[200%] h-[160%] bg-black rounded-t-full border-t-8 border-t-[#7876c566]"
                    style={{
                      borderTopLeftRadius: "100%",
                      borderTopRightRadius: "100%",
                    }}
                  />
                </div>

                {/* LAYER 3: Gold shimmer (background warmth) */}
                <Atmosphere
                  color="#fbbf24"
                  density={800}
                  size={2.0}
                  speed={0.8}
                  opacity={0.5}
                  opacitySpeed={3}
                  className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_90%)]"
                />

                {/* LAYER 2: Main warm gold glow */}
                <Atmosphere
                  color={color}
                  density={density}
                  size={size}
                  speed={speed}
                  opacity={opacity}
                  opacitySpeed={opacitySpeed}
                  className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
                />

                {/* LAYER 1: INTENSE white rim glow — sharp, luminous */}
                <Atmosphere
                  color="#ffffff"
                  density={1400}
                  size={1.1}
                  speed={0.3}
                  opacity={0.95}
                  opacitySpeed={1.6}
                  className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white_0%,transparent_55%)]"
                />

              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7">
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Glow Color</label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-14 rounded cursor-pointer border-2 border-gold/30"
                    title="Glow Color"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Density: {density}</label>
                  <input
                    type="range"
                    min="400"
                    max="3000"
                    step="100"
                    value={density}
                    onChange={(e) => setDensity(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Density"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Particle Size: {size.toFixed(2)}</label>
                  <input type="range" min="0.5" max="3" step="0.1" value={size} onChange={(e) => setSize(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Particle Size" />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Speed: {speed.toFixed(2)}</label>
                  <input type="range" min="0.3" max="3" step="0.1" value={speed} onChange={(e) => setSpeed(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Speed" />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Opacity: {opacity.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0.3"
                    max="1"
                    step="0.05"
                    value={opacity}
                    onChange={(e) => setOpacity(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Opacity"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Pulse Speed: {opacitySpeed.toFixed(1)}</label>
                  <input
                    type="range"
                    min="0.5"
                    max="8"
                    step="0.5"
                    value={opacitySpeed}
                    onChange={(e) => setOpacitySpeed(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Pulse Speed"
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
                    <th className="text-left p-5 font-bold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/10">
                  <tr>
                    <td className="p-5 font-mono text-gold">color</td>
                    <td className="p-5 text-gray-300">string</td>
                    <td className="p-5 font-mono text-gray-400">#f97316</td>
                    <td className="p-5 text-gray-300">Main glow color</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">density</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1600</td>
                    <td className="p-5 text-gray-300">Particle density</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">speed</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-300">Movement speed</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">size</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.8</td>
                    <td className="p-5 text-gray-300">Max particle size</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">opacity</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.9</td>
                    <td className="p-5 text-gray-300">Max opacity</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">opacitySpeed</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">2.0</td>
                    <td className="p-5 text-gray-300">Pulse speed</td>
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
              npm install @tsparticles/react @tsparticles/slim
            </pre>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Usage</h3>
            <pre className="bg-black/60 border border-gold/20 rounded-2xl p-8 overflow-x-auto">
              <code className="text-orange font-mono text-sm">
{`<div className="relative h-screen bg-black overflow-hidden">
  <div className="relative -mt-32 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-[#7876c566] after:bg-zinc-900">
    <Atmosphere color="#f97316" density={1600} />
  </div>
</div>`}
              </code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}