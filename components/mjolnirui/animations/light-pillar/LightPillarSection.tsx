"use client";

import React, { useState, useEffect } from "react";
import { Heart, Github, Download } from "lucide-react";
import LightPillar from "./LightPillar";

declare global {
  interface Window {
    isLightPillarCodeTab?: boolean;
  }
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function LightPillarSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const [topColor, setTopColor] = useState("#A0F3B9");
  const [bottomColor, setBottomColor] = useState("#FFF79E");
  const [intensity, setIntensity] = useState(1.0);
  const [rotationSpeed, setRotationSpeed] = useState(0.3);
  const [interactive, setInteractive] = useState(false);
  const [glowAmount, setGlowAmount] = useState(0.005);
  const [pillarWidth, setPillarWidth] = useState(3.0);
  const [pillarHeight, setPillarHeight] = useState(0.4);
  const [noiseIntensity, setNoiseIntensity] = useState(0.5);
  const [pillarRotation, setPillarRotation] = useState(-17);

  useEffect(() => {
    window.isLightPillarCodeTab = activeTab === "code";
    return () => { window.isLightPillarCodeTab = false; };
  }, [activeTab]);

  const resetToDefault = () => {
    setTopColor("#5227FF");
    setBottomColor("#FF9FFC");
    setIntensity(1.0);
    setRotationSpeed(0.3);
    setInteractive(false);
    setGlowAmount(0.005);
    setPillarWidth(3.0);
    setPillarHeight(0.4);
    setNoiseIntensity(0.5);
    setPillarRotation(0);
  };

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gold tracking-tight">
              Light Pillar
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
              <div style={{ width: '100%', height: '100px', position: 'relative' }}></div>
                <LightPillar
                  topColor={topColor}
                  bottomColor={bottomColor}
                  intensity={intensity}
                  rotationSpeed={rotationSpeed}
                  interactive={interactive}
                  glowAmount={glowAmount}
                  pillarWidth={pillarWidth}
                  pillarHeight={pillarHeight}
                  noiseIntensity={noiseIntensity}
                  pillarRotation={pillarRotation}
                  mixBlendMode="screen"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7">
                <div>
                  <label className="text-gray-300 font-medium block mb-3">Top Color</label>
                  <input
                    type="color"
                    value={topColor}
                    onChange={(e) => setTopColor(e.target.value)}
                    className="w-full h-14 rounded cursor-pointer border-2 border-gold/30"
                    title="Select top color"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-3">Bottom Color</label>
                  <input
                    type="color"
                    value={bottomColor}
                    onChange={(e) => setBottomColor(e.target.value)}
                    className="w-full h-14 rounded cursor-pointer border-2 border-gold/30"
                    title="Select bottom color"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Intensity: {intensity.toFixed(2)}

                  </label>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.05"
                    value={intensity}
                    onChange={(e) => setIntensity(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Intensity"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Rotation Speed: {rotationSpeed.toFixed(2)}</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="2" 
                    step="0.05" 
                    value={rotationSpeed} 
                    onChange={(e) => setRotationSpeed(+e.target.value)} 
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" 
                    title="Rotation Speed" 
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Glow Amount: {glowAmount.toFixed(3)}</label>
                  <input 
                    type="range" 
                    min="0.001" 
                    max="0.02" 
                    step="0.001" 
                    value={glowAmount} 
                    onChange={(e) => setGlowAmount(+e.target.value)} 
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" 
                    title="Glow Amount" 
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Pillar Width: {pillarWidth.toFixed(1)}</label>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="6" 
                    step="0.1" 
                    value={pillarWidth} 
                    onChange={(e) => setPillarWidth(+e.target.value)} 
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" 
                    title="Pillar Width" 
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Pillar Height: {pillarHeight.toFixed(2)}</label>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="1" 
                    step="0.05" 
                    value={pillarHeight} 
                    onChange={(e) => setPillarHeight(+e.target.value)} 
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" 
                    title="Pillar Height" 
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Noise Intensity: {noiseIntensity.toFixed(2)}</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.05" 
                    value={noiseIntensity} 
                    onChange={(e) => setNoiseIntensity(+e.target.value)} 
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" 
                    title="Noise Intensity" 
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Pillar Rotation: {pillarRotation}°</label>
                  <input 
                    type="range" 
                    min="-180" 
                    max="180" 
                    step="1" 
                    value={pillarRotation} 
                    onChange={(e) => setPillarRotation(+e.target.value)} 
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" 
                    title="Pillar Rotation" 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-gray-300 font-medium">Interactive</label>
                  <button
                    onClick={() => setInteractive(!interactive)}
                    className={cn("relative w-14 h-8 rounded-full transition", interactive ? "bg-gold" : "bg-gray-700")}
                  >
                    <span className={cn("absolute top-1 w-6 h-6 bg-white rounded-full transition-transform", interactive ? "translate-x-6" : "translate-x-1")} />
                  </button>
                </div>

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
                    <td className="p-5 font-mono text-gold">topColor</td>
                    <td className="p-5 text-gray-300">string</td>
                    <td className="p-5 font-mono text-gray-400">#5227FF</td>
                    <td className="p-5 text-gray-400">—</td>
                    <td className="p-5 text-gray-300">Top gradient color</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">bottomColor</td>
                    <td className="p-5 text-gray-300">string</td>
                    <td className="p-5 font-mono text-gray-400">#FF9FFC</td>
                    <td className="p-5 text-gray-400">—</td>
                    <td className="p-5 text-gray-300">Bottom gradient color</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">intensity</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0 – 3</td>
                    <td className="p-5 text-gray-300">Overall brightness</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">rotationSpeed</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.3</td>
                    <td className="p-5 text-gray-400">0 – 2</td>
                    <td className="p-5 text-gray-300">Auto rotation speed</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">interactive</td>
                    <td className="p-5 text-gray-300">boolean</td>
                    <td className="p-5 font-mono text-gray-400">false</td>
                    <td className="p-5 text-gray-400">—</td>
                    <td className="p-5 text-gray-300">Mouse follows pillar</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">glowAmount</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.005</td>
                    <td className="p-5 text-gray-400">0.001 – 0.02</td>
                    <td className="p-5 text-gray-300">Glow spread & intensity</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">pillarWidth</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">3.0</td>
                    <td className="p-5 text-gray-400">0.5 – 6</td>
                    <td className="p-5 text-gray-300">Width of light beam</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">pillarHeight</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.4</td>
                    <td className="p-5 text-gray-400">0.1 – 1</td>
                    <td className="p-5 text-gray-300">Height distortion</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">noiseIntensity</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.5</td>
                    <td className="p-5 text-gray-400">0 – 1</td>
                    <td className="p-5 text-gray-300">Film grain effect</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">pillarRotation</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0</td>
                    <td className="p-5 text-gray-400">-180 – 180</td>
                    <td className="p-5 text-gray-300">Static rotation in degrees</td>
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
{`import LightPillar from "@/components/mjolnirui/animations/light-pillar/LightPillar"

<div className="relative w-full h-screen">
  <LightPillar 
    topColor="#5227FF"
    bottomColor="#FF9FFC"
    intensity={1.0}
    rotationSpeed={0.3}
    glowAmount={0.005}
    interactive={true}
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