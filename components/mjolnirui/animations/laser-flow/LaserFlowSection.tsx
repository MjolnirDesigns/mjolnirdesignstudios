// components/mjolnirui/backgrounds/laserflow/LaserFlowSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Heart, Github, Download } from "lucide-react";
import { LaserFlow } from "./LaserFlow"

declare global {
  interface Window {
    isLaserFlowCodeTab?: boolean;
  }
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function LaserFlowSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  // Default values — green beam as requested
  const [color, setColor] = useState("#6BFA1E"); // 107, 250, 30
  const [scale, setScale] = useState(4);
  const [horizontalBeamOffset, setHorizontalBeamOffset] = useState(0.5);
  const [verticalBeamOffset, setVerticalBeamOffset] = useState(0.5);
  const [horizontalSizing, setHorizontalSizing] = useState(3.8);
  const [verticalSizing, setVerticalSizing] = useState(3);
  const [wispDensity, setWispDensity] = useState(1.0);
  const [wispSpeed, setWispSpeed] = useState(15.0);
  const [wispIntensity, setWispIntensity] = useState(5.0);
  const [flowSpeed, setFlowSpeed] = useState(0.35);
  const [flowStrength, setFlowStrength] = useState(0.25);
  const [fogIntensity, setFogIntensity] = useState(0.45);
  const [fogScale, setFogScale] = useState(0.3);
  const [fogFallSpeed, setFogFallSpeed] = useState(0.6);
  const [decay, setDecay] = useState(1.1);
  const [falloffStart, setFalloffStart] = useState(1.2);

  useEffect(() => {
    window.isLaserFlowCodeTab = activeTab === "code";
    return () => { window.isLaserFlowCodeTab = false; };
  }, [activeTab]);

  const resetToDefault = () => {
  setColor("#00ff88");
  setScale(4.0);
  setHorizontalBeamOffset(0.5);     // ← CENTER
  setVerticalBeamOffset(0.5);       // ← CENTER
  setHorizontalSizing(1.75);
  setVerticalSizing(4.5);
  setWispDensity(4.5);
  setWispSpeed(30);
  setWispIntensity(15);
  setFlowSpeed(1.25);
  setFlowStrength(0.5);
  setFogIntensity(0.5);
  setFogScale(0.2);
  setFogFallSpeed(1.85);
  setDecay(0.6);
  setFalloffStart(2.75);
};

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gold tracking-tight">
              Laser Flow
            </h1>
            <span className="bg-green-600/30 text-green-400 text-sm font-bold px-4 py-1.5 rounded-full border border-green-600/50 animate-pulse">
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
                {tab}
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
                <LaserFlow
                  color={color}
                  scale={scale}
                  horizontalBeamOffset={horizontalBeamOffset}
                  verticalBeamOffset={verticalBeamOffset}
                  horizontalSizing={horizontalSizing}
                  verticalSizing={verticalSizing}
                  wispDensity={wispDensity}
                  wispSpeed={wispSpeed}
                  wispIntensity={wispIntensity}
                  flowSpeed={flowSpeed}
                  flowStrength={flowStrength}
                  fogIntensity={fogIntensity}
                  fogScale={fogScale}
                  fogFallSpeed={fogFallSpeed}
                  decay={decay}
                  falloffStart={falloffStart}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-6 max-h-[80vh] overflow-y-auto">

                {/* Color */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Beam Color</label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-16 rounded cursor-pointer border-2 border-gold/30"
                    title="Select beam color"
                  />
                </div>

                {/* Scale — NOW A BEAUTIFUL AND FUNCTIONAL */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">
                    Beam Scale: {scale.toFixed(1)}×
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="0.1"
                    value={scale}
                    onChange={(e) => setScale(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="How massive the laser beam is (1 = normal, 8 = GOD MODE)"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Small</span>
                    <span className="text-gold font-bold">EPIC</span>
                  </div>
                </div>

                {/* Beam Position */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-300 font-medium block mb-2">H-Offset: {horizontalBeamOffset.toFixed(2)}</label>
                    <input
                      type="range"
                      min="-0.5"
                      max="0.5"
                      step="0.01"
                      value={horizontalBeamOffset}
                      onChange={(e) => setHorizontalBeamOffset(+e.target.value)}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                      title="Adjust horizontal beam offset"
                    />
                  </div>

                  {/* Vertical Offset */}
                  <div>
                    <label className="text-gray-300 font-medium block mb-2">V-Offset: {verticalBeamOffset.toFixed(2)}</label>
                    <input
                      type="range"
                      min="-0.5"
                      max="0.5"
                      step="0.01"
                      value={verticalBeamOffset}
                      onChange={(e) => setVerticalBeamOffset(+e.target.value)}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                      title="Adjust vertical beam offset"
                    />
                  </div>
                </div>

                {/* Sizing */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-300 font-medium block mb-2">H-Size: {horizontalSizing.toFixed(2)}</label>
                    <input
                      type="range"
                      min="0.1"
                      max="2"
                      step="0.05"
                      value={horizontalSizing}
                      onChange={(e) => setHorizontalSizing(+e.target.value)}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                      title="Adjust horizontal sizing"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 font-medium block mb-2">V-Size: {verticalSizing.toFixed(2)}</label>
                    <input
                      type="range"
                      min="0.5"
                      max="5"
                      step="0.1"
                      value={verticalSizing}
                      onChange={(e) => setVerticalSizing(+e.target.value)}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                      title="Adjust vertical sizing"
                    />
                  </div>
                </div>

                {/* Wisps */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Wisp Density: {wispDensity.toFixed(1)}</label>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.1"
                    value={wispDensity}
                    onChange={(e) => setWispDensity(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust wisp density"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Wisp Speed: {wispSpeed.toFixed(1)}</label>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="1"
                    value={wispSpeed}
                    onChange={(e) => setWispSpeed(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust wisp speed"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Wisp Intensity: {wispIntensity.toFixed(1)}</label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.5"
                    value={wispIntensity}
                    onChange={(e) => setWispIntensity(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust wisp intensity"
                  />
                </div>

                {/* Flow */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Flow Speed: {flowSpeed.toFixed(2)}</label>
                  <input type="range" min="0" max="1" step="0.05" value={flowSpeed} onChange={(e) => setFlowSpeed(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Adjust flow speed" />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Flow Strength: {flowStrength.toFixed(2)}</label>
                  <input type="range" min="0" max="1" step="0.05" value={flowStrength} onChange={(e) => setFlowStrength(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Adjust flow strength" />
                </div>

                {/* Fog */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Fog Intensity: {fogIntensity.toFixed(2)}</label>
                  <input type="range" min="0" max="1.5" step="0.05" value={fogIntensity} onChange={(e) => setFogIntensity(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Adjust fog intensity" />
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
                    <td className="p-5 font-mono text-gold">color</td>
                    <td className="p-5 text-gray-300">string</td>
                    <td className="p-5 font-mono text-gray-400">#6BFA1E</td>
                    <td className="p-5 text-gray-400">any hex</td>
                    <td className="p-5 text-gray-300">Beam color</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">horizontalBeamOffset</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.1</td>
                    <td className="p-5 text-gray-400">-0.5 – 0.5</td>
                    <td className="p-5 text-gray-300">Horizontal position</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">verticalBeamOffset</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.0</td>
                    <td className="p-5 text-gray-400">-0.5 – 0.5</td>
                    <td className="p-5 text-gray-300">Vertical position</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">horizontalSizing</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.5</td>
                    <td className="p-5 text-gray-400">0.1 – 2.0</td>
                    <td className="p-5 text-gray-300">Beam width</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">verticalSizing</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">2.0</td>
                    <td className="p-5 text-gray-400">0 – 5.0</td>
                    <td className="p-5 text-gray-300">Beam height</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">wispDensity</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0 – 5</td>
                    <td className="p-5 text-gray-300">Micro-streak density</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">wispSpeed</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">15</td>
                    <td className="p-5 text-gray-400">0 – 50</td>
                    <td className="p-5 text-gray-300">Wisp motion speed</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">wispIntensity</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">5</td>
                    <td className="p-5 text-gray-400">0 – 20</td>
                    <td className="p-5 text-gray-300">Wisp brightness</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">flowSpeed</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.05</td>
                    <td className="p-5 text-gray-400">0 – 5</td>
                    <td className="p-5 text-gray-300">Flow modulation speed</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">flowStrength</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.1</td>
                    <td className="p-5 text-gray-400">0 – 1</td>
                    <td className="p-5 text-gray-300">Flow intensity</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">fogIntensity</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.1</td>
                    <td className="p-5 text-gray-400">0 – 1.5</td>
                    <td className="p-5 text-gray-300">Volumetric fog power</td>
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
{`import LaserFlow from "@/components/mjolnirui/backgrounds/laserflow/LaserFlow"

<div className="relative h-screen bg-black">
  <LaserFlow color="#6BFA1E" />
</div>`}
              </code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}