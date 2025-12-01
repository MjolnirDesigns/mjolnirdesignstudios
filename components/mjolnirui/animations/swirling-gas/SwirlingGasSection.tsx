// components/mjolnirui/backgrounds/shaders/SwirlingGasSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Heart, Github, Download } from "lucide-react";
import SwirlingGas from "./SwirlingGas";

declare global {
  interface Window {
    isSwirlingGasCodeTab?: boolean;
  }
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SwirlingGasSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const [speed, setSpeed] = useState(1.0);
  const [hue, setHue] = useState(200);
  const [intensity, setIntensity] = useState(1.0);
  const [saturation, setSaturation] = useState(1.0);
  const [brightness, setBrightness] = useState(1.0);

  useEffect(() => {
    window.isSwirlingGasCodeTab = activeTab === "code";
    return () => { window.isSwirlingGasCodeTab = false; };
  }, [activeTab]);

  const resetToDefault = () => {
    setSpeed(1.0);
    setHue(200);
    setIntensity(1.0);
    setSaturation(1.0);
    setBrightness(1.0);
  };

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gold tracking-tight">
              Swirling Gas
            </h1>
            <span className="bg-purple-600/30 text-purple-400 text-sm font-bold px-4 py-1.5 rounded-full border border-purple-600/50 animate-pulse">
              COSMIC
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
                <SwirlingGas
                  speed={speed}
                  hue={hue}
                  intensity={intensity}
                  saturation={saturation}
                  brightness={brightness}
                />
              </div>
            </div>

            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7">
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Speed: {speed.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.05"
                    value={speed}
                    onChange={e => setSpeed(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust speed"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Hue</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={hue}
                    onChange={e => setHue(+e.target.value)}
                    className="w142-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust hue"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Intensity: {intensity.toFixed(2)}

                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.05"
                    value={intensity}
                    onChange={e => setIntensity(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust intensity"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Saturation: {saturation.toFixed(2)}

                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.05"
                    value={saturation}
                    onChange={e => setSaturation(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust saturation"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Brightness: {brightness.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.05"
                    value={brightness}
                    onChange={e => setBrightness(+e.target.value)}
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
              npm install ogl
            </pre>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Usage</h3>
            <pre className="bg-black/60 border border-gold/20 rounded-2xl p-8 overflow-x-auto">
              <code className="text-orange font-mono text-sm">
{`import SwirlingGas from "@/components/mjolnirui/backgrounds/shaders/SwirlingGas"

<div className="relative w-full h-screen bg-black">
  <SwirlingGas speed={1.5} hue={240} intensity={1.8} />
</div>`}
              </code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}