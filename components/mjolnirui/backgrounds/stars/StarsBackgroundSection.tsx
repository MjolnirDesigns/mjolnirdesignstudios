"use client";

import React, { useState, useEffect } from "react";
import { Heart, Github, Download } from "lucide-react";
import { StarsBackground } from "./StarsBackground";

declare global {
  interface Window {
    isStarsCodeTab?: boolean;
  }
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function StarsBackgroundSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const [starColor, setStarColor] = useState("#e0e0ff");
  const [rareStarColor, setRareStarColor] = useState("#a78bfa");
  const [rareStarChance, setRareStarChance] = useState(0.003);
  const [starDensity, setStarDensity] = useState(800);
  const [twinkleSpeed, setTwinkleSpeed] = useState(1.0);

  useEffect(() => {
    window.isStarsCodeTab = activeTab === "code";
    return () => { window.isStarsCodeTab = false; };
  }, [activeTab]);

  const resetToDefault = () => {
    setStarColor("#e0e0ff");
    setRareStarColor("#a78bfa");
    setRareStarChance(0.003);
    setStarDensity(800);
    setTwinkleSpeed(1.0);
  };

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gold tracking-tight">
              Stars Background
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
                <StarsBackground
                  starColor={starColor}
                  rareStarColor={rareStarColor}
                  rareStarChance={rareStarChance}
                  starDensity={starDensity}
                  twinkleSpeed={twinkleSpeed}
                />
              </div>
            </div>

            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7">
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Base Star Color</label>
                  <input
                    type="color"
                    value={starColor}
                    onChange={(e) => setStarColor(e.target.value)}
                    className="w-full h-14 rounded cursor-pointer border-2 border-gold/30"
                    title="Select base star color"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Rare Star Color</label>
                  <input
                    type="color"
                    value={rareStarColor}
                    onChange={(e) => setRareStarColor(e.target.value)}
                    className="w-full h-14 rounded cursor-pointer border-2 border-gold/30"
                    title="Select rare star color"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Rare Star Chance: {(rareStarChance * 100).toFixed(2)}%</label>
                  <input
                    type="range"
                    min="0"
                    max="0.02"
                    step="0.001"
                    value={rareStarChance}
                    onChange={(e) => setRareStarChance(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust rare star chance"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Star Density: {starDensity}</label>
                  <input
                    type="range"
                    min="200"
                    max="2000"
                    step="100"
                    value={starDensity}
                    onChange={(e) => setStarDensity(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust star density"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Twinkle Speed: {twinkleSpeed.toFixed(1)}x</label>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={twinkleSpeed}
                    onChange={(e) => setTwinkleSpeed(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust twinkle speed"
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
                    <td className="p-5 font-mono text-gold">starColor</td>
                    <td className="p-5 text-gray-300">string</td>
                    <td className="p-5 font-mono text-gray-400">#e0e0ff</td>
                    <td className="p-5 text-gray-300">Color of regular stars</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">rareStarColor</td>
                    <td className="p-5 text-gray-300">string</td>
                    <td className="p-5 font-mono text-gray-400">#a78bfa</td>
                    <td className="p-5 text-gray-300">Color of rare stars</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">rareStarChance</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.003</td>
                    <td className="p-5 text-gray-300">Chance of rare colored star (0–2%)</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">starDensity</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">800</td>
                    <td className="p-5 text-gray-300">Number of stars</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">twinkleSpeed</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-300">Speed of twinkling</td>
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
              npx mjolnirui@latest add stars-background
            </pre>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Usage</h3>
            <pre className="bg-black/60 border border-gold/20 rounded-2xl p-8 overflow-x-auto">
              <code className="text-orange font-mono text-sm">
{`import { StarsBackground } from "@/components/mjolnirui/backgrounds/stars"

<div className="relative w-full h-screen">
  <StarsBackground rareStarColor="#a78bfa" />
</div>`}
              </code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}