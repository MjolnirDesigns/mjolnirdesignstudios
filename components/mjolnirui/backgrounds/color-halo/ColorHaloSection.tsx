"use client";

import React, { useState, useEffect } from "react";
import { Heart, Github, Download } from "lucide-react";
import ColorHalo from "./ColorHalo";

declare global {
  interface Window {
    isColorHaloCodeTab?: boolean;
  }
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ColorHaloSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  // FINAL DEFAULTS — As specified by you
  const [colors, setColors] = useState(["#ff006e", "#ff8c00", "#ffd60a", "#4ade80"]); // Red → Orange → Yellow → Green
  const [rotation, setRotation] = useState(45);
  const [autoRotate, setAutoRotate] = useState(0);
  const [speed, setSpeed] = useState(0.2);
  const [scale, setScale] = useState(1.0);
  const [frequency, setFrequency] = useState(1.0);
  const [warpStrength, setWarpStrength] = useState(1.0);
  const [mouseInfluence, setMouseInfluence] = useState(1.0);
  const [parallax, setParallax] = useState(1.0);
  const [noise, setNoise] = useState(0.71); // Perfect grainy look

  useEffect(() => {
    window.isColorHaloCodeTab = activeTab === "code";
    return () => { window.isColorHaloCodeTab = false; };
  }, [activeTab]);

  const resetToDefault = () => {
    setColors(["#ff006e", "#ff8c00", "#ffd60a", "#4ade80"]);
    setRotation(45);
    setAutoRotate(0);
    setSpeed(0.2);
    setScale(1.0);
    setFrequency(1.0);
    setWarpStrength(1.0);
    setMouseInfluence(1.0);
    setParallax(1.0);
    setNoise(0.71);
  };

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gold tracking-tight">
              Color Halo
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
            {/* Preview */}
            <div className="lg:col-span-8">
              <h3 className="text-2xl font-bold text-silver mb-6">Preview</h3>
              <div className="relative bg-black border border-gold/20 rounded-3xl overflow-hidden shadow-2xl h-96 md:h-[520px]">
                <ColorHalo
                  colors={colors}
                  rotation={rotation}
                  autoRotate={autoRotate}
                  speed={speed}
                  scale={scale}
                  frequency={frequency}
                  warpStrength={warpStrength}
                  mouseInfluence={mouseInfluence}
                  parallax={parallax}
                  noise={noise}
                  transparent={true}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7">

                {/* Colors */}
                <div>
                  <label className="text-gray-300 font-medium block mb-3">Halo Colors</label>
                  <div className="grid grid-cols-2 gap-3">
                    {colors.map((c, i) => (
                      <input
                        key={i}
                        type="color"
                        value={c}
                        title={`Select color ${i + 1}`}
                        onChange={(e) => {
                          const newColors = [...colors];
                          newColors[i] = e.target.value;
                          setColors(newColors);
                        }}
                        className="w-full h-14 rounded cursor-pointer border-2 border-gold/30"
                      />
                    ))}
                  </div>
                </div>

                {/* Rotation */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Rotation: {rotation}°</label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    step="1"
                    value={rotation}
                    onChange={(e) => setRotation(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Rotation"
                  />
                </div>

                {/* Auto Rotate */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Auto Rotate: {autoRotate.toFixed(1)}°/s</label>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="0.1"
                    value={autoRotate}
                    onChange={(e) => setAutoRotate(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Auto Rotate"
                  />
                </div>

                {/* Speed */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Speed: {speed.toFixed(2)}</label>
                  <input type="range" min="0" max="1" step="0.01" value={speed} onChange={(e) => setSpeed(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Speed" />
                </div>

                {/* Scale */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Scale: {scale.toFixed(2)}</label>
                  <input type="range" min="0.2" max="5" step="0.05" value={scale} onChange={(e) => setScale(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Scale" />
                </div>

                {/* Frequency */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Frequency: {frequency.toFixed(2)}</label>
                  <input type="range" min="0" max="5" step="0.05" value={frequency} onChange={(e) => setFrequency(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Frequency" />
                </div>

                {/* Warp Strength */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Warp Strength: {warpStrength.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={warpStrength}
                    onChange={(e) => setWarpStrength(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Warp Strength"
                  />
                </div>

                {/* Mouse Influence */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Mouse Influence: {mouseInfluence.toFixed(2)}</label>
                  <input type="range" min="0" max="2" step="0.05" value={mouseInfluence} onChange={(e) => setMouseInfluence(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Mouse Influence" />
                </div>

                {/* Parallax */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Parallax: {parallax.toFixed(2)}</label>
                  <input type="range" min="0" max="2" step="0.05" value={parallax} onChange={(e) => setParallax(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Parallax" />
                </div>

                {/* Noise */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Noise: {(noise * 100).toFixed(0)}%</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={noise}
                    onChange={(e) => setNoise(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Noise"
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
                    <td className="p-5 font-mono text-gold">rotation</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">45</td>
                    <td className="p-5 text-gray-400">-180 to 180</td>
                    <td className="p-5 text-gray-300">Base rotation angle in degrees.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">autoRotate</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0</td>
                    <td className="p-5 text-gray-400">-5 to 5</td>
                    <td className="p-5 text-gray-300">Auto rotation speed in °/s.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">speed</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.2</td>
                    <td className="p-5 text-gray-400">0 to 1</td>
                    <td className="p-5 text-gray-300">Animation speed multiplier.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">scale</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0.2 to 5</td>
                    <td className="p-5 text-gray-300">Zoom level of the pattern.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">frequency</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0 to 5</td>
                    <td className="p-5 text-gray-300">Wave density.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">warpStrength</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0 to 1</td>
                    <td className="p-5 text-gray-300">Distortion intensity.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">mouseInfluence</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0 to 2</td>
                    <td className="p-5 text-gray-300">Mouse reactivity.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">parallax</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0 to 2</td>
                    <td className="p-5 text-gray-300">Mouse parallax depth.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">noise</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.71</td>
                    <td className="p-5 text-gray-400">0 to 1</td>
                    <td className="p-5 text-gray-300">Grain intensity (71% = perfect film look).</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">colors</td>
                    <td className="p-5 text-gray-300">string[]</td>
                    <td className="p-5 font-mono text-gray-400">Fire Palette</td>
                    <td className="p-5 text-gray-400">Up to 8</td>
                    <td className="p-5 text-gray-300">Color blend palette.</td>
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
              npm install three
            </pre>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Usage</h3>
            <pre className="bg-black/60 border border-gold/20 rounded-2xl p-8 overflow-x-auto">
              <code className="text-orange font-mono text-sm">
{`import ColorHalo from "@/components/mjolnirui/backgrounds/ColorHalo"

<div className="relative w-full h-screen">
  <ColorHalo 
    colors={["#ff006e", "#ff8c00", "#ffd60a", "#4ade80"]}
    noise={0.71}
  />
</div>`}
              </code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}