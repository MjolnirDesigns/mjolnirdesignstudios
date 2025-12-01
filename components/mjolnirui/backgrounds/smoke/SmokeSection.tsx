// components/mjolnirui/backgrounds/smoke/SmokeSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Heart, Github, Download } from "lucide-react";
import Smoke from "./Smoke";

declare global {
  interface Window {
    isSmokeCodeTab?: boolean;
  }
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SmokeSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const [color, setColor] = useState("#FFD700"); // GOLD
  const [scale, setScale] = useState(5.0);
  const [trailLength, setTrailLength] = useState(50);
  const [inertia, setInertia] = useState(0.5);
  const [grainIntensity, setGrainIntensity] = useState(0.05);
  const [bloomStrength, setBloomStrength] = useState(0.15);
  const [bloomRadius, setBloomRadius] = useState(1.0);
  const [bloomThreshold, setBloomThreshold] = useState(0.025);
  const [brightness, setBrightness] = useState(2.5);
  const [fadeDelayMs, setFadeDelayMs] = useState(1000);
  const [fadeDurationMs, setFadeDurationMs] = useState(1500);

  useEffect(() => {
    window.isSmokeCodeTab = activeTab === "code";
    return () => { window.isSmokeCodeTab = false; };
  }, [activeTab]);

  const resetToDefault = () => {
    setColor("#FFD700");
    setScale(5.0);
    setTrailLength(50);
    setInertia(0.5);
    setGrainIntensity(0.05);
    setBloomStrength(0.15);
    setBloomRadius(1.0);
    setBloomThreshold(0.025);
    setBrightness(2.5);
    setFadeDelayMs(1000);
    setFadeDurationMs(1500);
  };

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gold tracking-tight">
              Smoke
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
              <div className="relative bg-black border border-gold/20 rounded-3xl overflow-hidden shadow-2xl h-96 md:h-[700px]">
                <Smoke
                  //Visuals
                  color={color}
                  scale={scale}
                  brightness={brightness}
                  edgeIntensity={0}

                  //Trail and Motion
                  trailLength={trailLength}
                  inertia={inertia}

                  //Post-Processing
                  grainIntensity={grainIntensity}
                  bloomStrength={bloomStrength}
                  bloomRadius={bloomRadius}
                  bloomThreshold={bloomThreshold}
                  
                  //Fade-Out Behavior
                  fadeDelayMs={fadeDelayMs}
                  fadeDurationMs={fadeDurationMs}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <h2 className="text-9xl font-black text-gold/10 select-none tracking-tighter">SMOKE</h2>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7 max-h-[80vh] overflow-y-auto">
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Color</label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-16 rounded cursor-pointer border-2 border-gold/30"
                    title="Select smoke color"
                  />
                </div>

                {/* ADD SCALE SLIDER */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">
                    Scale: {scale.toFixed(1)}×
                  </label>
                  <input
                    id="scale"
                    type="range"
                    min="1"
                    max="10"
                    step="0.1"
                    value={scale}
                    onChange={(e) => setScale(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust scale"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Small Bloom</span>
                    <span className="text-gold font-bold">Full Bloom</span>
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Trail Length: {trailLength}</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={trailLength}
                    onChange={(e) => setTrailLength(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust trail length"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Inertia: {inertia.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0"
                    max="0.99"
                    step="0.01"
                    value={inertia}
                    onChange={(e) => setInertia(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust inertia"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Grain: {grainIntensity.toFixed(3)}</label>
                  <input
                    type="range"
                    min="0"
                    max="0.2"
                    step="0.005"
                    value={grainIntensity}
                    onChange={(e) => setGrainIntensity(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust grain intensity"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Bloom Strength: {bloomStrength.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0"
                    max="0.5"
                    step="0.01"
                    value={bloomStrength}
                    onChange={(e) => setBloomStrength(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust bloom strength"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Bloom Radius: {bloomRadius.toFixed(1)}</label>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={bloomRadius}
                    onChange={(e) => setBloomRadius(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust bloom radius"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Brightness: {brightness.toFixed(1)}</label>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.1"
                    value={brightness}
                    onChange={(e) => setBrightness(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust brightness"
                  />
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
        </>
      ) : (
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Install</h3>
            <pre className="bg-black/60 border border-gold/20 rounded-2xl p-8 text-orange text-lg font-mono">
              npm install three postprocessing
            </pre>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Usage</h3>
            <pre className="bg-black/60 border border-gold/20 rounded-2xl p-8 overflow-x-auto">
              <code className="text-orange font-mono text-sm">
{`import Smoke from "@/components/mjolnirui/backgrounds/smoke/Smoke"

<div className="relative h-screen bg-black">
  <Smoke color="#FFD700" brightness={2.5} />
</div>`}
              </code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}