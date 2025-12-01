// components/mjolnir/BiFrostSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Heart, Github, Download } from "lucide-react";
import BiFrost from "./BiFrost";

declare global {
  interface Window {
    isBiFrostCodeTab?: boolean;
  }
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function BiFrostSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  // Mjolnir-optimized defaults — ultra-premium look
  const [intensity, setIntensity] = useState(1.3);
  const [speed, setSpeed] = useState(1.0);
  const [mouseTilt, setMouseTilt] = useState(true);

  useEffect(() => {
    window.isBiFrostCodeTab = activeTab === "code";
    return () => { window.isBiFrostCodeTab = false; };
  }, [activeTab]);

  const resetToDefault = () => {
    setIntensity(1.3);
    setSpeed(1.0);
    setMouseTilt(true);
  };

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gold tracking-tight">
              BiFrost
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
                <BiFrost
                  intensity={intensity}
                  speed={speed}
                  mouseTilt={mouseTilt}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7">

                {/* Intensity */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">
                    Intensity: {intensity.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.05"
                    value={intensity}
                    onChange={(e) => setIntensity(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust intensity"
                    placeholder="Intensity"
                  />
                  <p className="text-xs text-gray-500 mt-1">Glow & color saturation</p>
                </div>

                {/* Speed */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">
                    Speed: {speed.toFixed(2)}×
                  </label>
                  <input
                    id="speed"
                    type="range"
                    min="0.3"
                    max="2.5"
                    step="0.05"
                    value={speed}
                    onChange={(e) => setSpeed(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust speed"
                    placeholder="Speed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Flow & wisp animation speed</p>
                </div>

                {/* Mouse Tilt */}
                <div className="flex items-center justify-between">
                  <label className="text-gray-300 font-medium">Mouse Tilt</label>
                  <button
                    onClick={() => setMouseTilt(!mouseTilt)}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition",
                      mouseTilt ? "bg-gold" : "bg-gray-700"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-black transition",
                        mouseTilt ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
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
                    <td className="p-5 font-mono text-gold">intensity</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.3</td>
                    <td className="p-5 text-gray-400">0.5 – 2.5</td>
                    <td className="p-5 text-gray-300">Overall glow, color power, and wisp strength</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">speed</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0.3 – 2.5</td>
                    <td className="p-5 text-gray-300">Animation speed of flow, wisps, and fog</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">mouseTilt</td>
                    <td className="p-5 text-gray-300">boolean</td>
                    <td className="p-5 font-mono text-gray-400">true</td>
                    <td className="p-5 text-gray-400">true / false</td>
                    <td className="p-5 text-gray-300">Enable volumetric fog tilt with mouse</td>
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
{`import BiFrost from "@/components/mjolnir/BiFrost"

<div className="relative w-full h-screen">
  <BiFrost intensity={1.4} speed={1.2} />
</div>`}
              </code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}