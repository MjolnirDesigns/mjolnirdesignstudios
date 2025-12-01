"use client";

import React, { useState, useEffect } from "react";
import { Heart, Github, Download } from "lucide-react";
import SilkyLines from "./SilkyLines";

declare global {
  interface Window {
    isSilkyLinesCodeTab?: boolean;
  }
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SilkyLinesSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const [color, setColor] = useState("#c084fc");     // Soft purple silk
  const [amplitude, setAmplitude] = useState(1.0);
  const [distance, setDistance] = useState(1.1);     // More spread
  const [speed, setSpeed] = useState(0.4);
  const [mouseInteraction, setMouseInteraction] = useState(true);

  useEffect(() => {
    window.isSilkyLinesCodeTab = activeTab === "code";
    return () => { window.isSilkyLinesCodeTab = false; };
  }, [activeTab]);

  const resetToDefault = () => {
    setColor("#a78bfa");
    setAmplitude(1.0);
    setDistance(0.8);
    setSpeed(0.5);
    setMouseInteraction(true);
  };

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gold tracking-tight">
              Silky Lines
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
                <SilkyLines
                  color={color}
                  amplitude={amplitude}
                  distance={distance}
                  speed={speed}
                  mouseInteraction={mouseInteraction}
                />
              </div>
            </div>

            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7">
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Line Color</label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-14 rounded cursor-pointer border-2 border-gold/30"
                    title="Select line color"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Amplitude: {amplitude.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={amplitude}
                    onChange={(e) => setAmplitude(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust amplitude"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Line Spacing: {distance.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={distance}
                    onChange={(e) => setDistance(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust line spacing"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Speed: {speed.toFixed(2)}x</label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust speed"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-gray-300 font-medium">Mouse Interaction</label>
                  <button
                    onClick={() => setMouseInteraction(!mouseInteraction)}
                    className={`w-14 h-8 rounded-full transition ${mouseInteraction ? "bg-gold" : "bg-gray-700"}`}
                  >
                    <div className={`w-6 h-6 bg-black rounded-full transition ${mouseInteraction ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
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
                        <td className="p-5 font-mono text-gold">color</td>
                        <td className="p-5 text-gray-300">string</td>
                        <td className="p-5 font-mono text-gray-400">#a78bfa</td>
                        <td className="p-5 text-gray-300">Line color</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">amplitude</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">1.0</td>
                        <td className="p-5 text-gray-300">Wave height</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">distance</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">0.8</td>
                        <td className="p-5 text-gray-300">Line spacing</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">speed</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">0.5</td>
                        <td className="p-5 text-gray-300">Animation speed</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">mouseInteraction</td>
                        <td className="p-5 text-gray-300">boolean</td>
                        <td className="p-5 font-mono text-gray-400">true</td>
                        <td className="p-5 text-gray-300">Mouse warp effect</td>
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
{`import SilkyLines from "@/components/mjolnirui/backgrounds/SilkyLines"

<div className="relative w-full h-screen">
  <SilkyLines color="#a78bfa" />
</div>`}
              </code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}