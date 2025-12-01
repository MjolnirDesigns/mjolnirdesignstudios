// components/mjolnirui/backgrounds/shaders/StarFieldSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import StarField from "./StarField";

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function StarFieldSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [speed, setSpeed] = useState(1.0);
  const [brightness, setBrightness] = useState(1.5);
  const [hue, setHue] = useState(210);
  const [zoom, setZoom] = useState(0.8);
  const [darkMatter, setDarkMatter] = useState(0.3);

  useEffect(() => {
    document.title = activeTab === "code" ? "StarField — Code" : "StarField — MjolnirUI";
  }, [activeTab]);

  return (
    <section className="w-full min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              StarField
            </h1>
            <span className="bg-cyan-500/20 text-cyan-400 text-sm font-bold px-4 py-2 rounded-full border border-cyan-500/50">
              LEGENDARY
            </span>
          </div>
        </div>

        <div className="flex gap-8 border-b border-cyan-500/30 pb-6 mb-12">
          {(["preview", "code"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-4 px-6 text-xl font-medium transition",
                activeTab === tab
                  ? "text-cyan-400 border-b-4 border-cyan-400"
                  : "text-gray-500 hover:text-cyan-300"
              )}
            >
              {tab === "preview" ? "Preview" : "Code"}
            </button>
          ))}
        </div>

        {activeTab === "preview" ? (
          <>
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8">
                <div className="relative bg-black/90 rounded-3xl overflow-hidden shadow-2xl h-96 md:h-[700px] border border-cyan-500/30">
                  <StarField
                    speed={speed}
                    brightness={brightness}
                    hue={hue}
                    zoom={zoom}
                    darkMatter={darkMatter}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h2 className="text-9xl font-black text-cyan-500/10 select-none">Star Field</h2>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4">
                <h3 className="text-3xl font-bold text-cyan-400 mb-8">Controls</h3>
                <div className="space-y-6 bg-black/50 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/20">
                  <div>
                    <label className="block mb-2 text-cyan-300">Speed: {speed.toFixed(1)}×</label>
                    <input
                      type="range"
                      min="0"
                      max="3"
                      step="0.1"
                      value={speed}
                      onChange={e => setSpeed(+e.target.value)}
                      className="w-full"
                      title="Speed"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-cyan-300">Brightness</label>
                    <input
                      type="range"
                      min="0.1"
                      max="4"
                      step="0.1"
                      value={brightness}
                      onChange={e => setBrightness(+e.target.value)}
                      className="w-full"
                      title="Brightness"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-cyan-300">Hue Shift</label>
                    <input type="range" min="0" max="360" value={hue} onChange={e => setHue(+e.target.value)} className="w-full" title="Hue Shift" />
                  </div>
                  <div>
                    <label className="block mb-2 text-cyan-300">Zoom</label>
                    <input type="range" min="0.1" max="2" step="0.05" value={zoom} onChange={e => setZoom(+e.target.value)} className="w-full" title="Zoom" />
                  </div>
                  <div>
                    <label className="block mb-2 text-cyan-300">Dark Matter</label>
                    <input type="range" min="0" max="1" step="0.05" value={darkMatter} onChange={e => setDarkMatter(+e.target.value)} className="w-full" title="Dark Matter" />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-cyan-300 font-mono text-lg">
            <pre className="bg-black/60 p-8 rounded-2xl border border-cyan-500/30 overflow-x-auto">
              <code>{`// Star Nest by Pablo Román Andrioli — MIT License`}</code>
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}