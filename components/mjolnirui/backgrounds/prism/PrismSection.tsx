"use client";

// Extend Window type for isPrismCodeTab
declare global {
  interface Window {
    isPrismCodeTab?: boolean;
  }
}

import React, { useState, useEffect } from "react";
import { Heart, Github } from "lucide-react";
import Prism from "./Prism";

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PrismSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  // Optimized for beauty — NO GRAIN, PURE CRYSTAL
  const [animationType, setAnimationType] = useState<"rotate" | "hover" | "3drotate">("rotate");
  const [glow, setGlow] = useState(1.8);
  const [bloom, setBloom] = useState(0.7);
  const [noise, setNoise] = useState(0.1);           // ← Was 0.5 → GRAINY! Now 0.1 = CLEAN
  const [scale, setScale] = useState(2.5);           // ← Slightly larger = sharper
  const [hueShift, setHueShift] = useState(0);
  const [timeScale, setTimeScale] = useState(0.5);
  const [hoverStrength, setHoverStrength] = useState(2.2);
  const [inertia, setInertia] = useState(0.08);

  useEffect(() => {
    window.isPrismCodeTab = activeTab === "code";
    return () => { window.isPrismCodeTab = false; };
  }, [activeTab]);

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <h1 className="text-5xl md:text-6xl font-bold text-gold tracking-tight">Prism</h1>
            <span className="bg-emerald-500/20 text-emerald-400 text-sm font-bold px-4 py-1.5 rounded-full border border-emerald-500/50">
              NEW
            </span>
          </div>
          <div className="flex gap-4">
            <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition">
              <Heart className="h-6 w-6" />
            </button>
            <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition">
              <Github className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mb-4 border-b border-gold/20">
          {(["preview", "code"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-4 px-2 capitalize text-xl font-medium transition relative",
                activeTab === tab ? "text-gold" : "text-gray-400 hover:text-gold"
              )}
            >
              {tab === "preview" ? "Preview" : "Code"}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "preview" ? (
        <>
          {/* Preview + Controls */}
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            {/* Preview — EXACT SAME SIZE AS ALL OTHERS */}
            <div className="lg:col-span-8">
              <h3 className="text-2xl font-bold text-silver mb-6">Preview</h3>
              <div className="relative bg-black border border-gold/20 rounded-3xl overflow-hidden shadow-2xl 
                h-96 
                md:h-[520px] 
                lg:h-[520px] 
                xl:h-[520px]">
                <Prism
                  animationType={animationType}
                  glow={glow}
                  bloom={bloom}
                  noise={noise}
                  scale={scale}
                  hueShift={hueShift}
                  timeScale={timeScale}
                  hoverStrength={hoverStrength}
                  inertia={inertia}
                  transparent={true}
                />
              </div>
            </div>

            {/* Customization Panel */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7 max-h-screen overflow-y-auto">
                {/* Animation Type */}
                <div>
                  <label htmlFor="animationTypeSelect" className="text-gray-300 font-medium block mb-3">Animation</label>
                  <select
                    id="animationTypeSelect"
                    value={animationType}
                    onChange={(e) => setAnimationType(e.target.value as "rotate" | "hover" | "3drotate")}
                    className="w-full px-4 py-3 bg-black/50 border border-gold/20 rounded-xl text-white"
                  >
                    <option value="rotate">Rotate (Wobble)</option>
                    <option value="hover">Hover Tilt</option>
                    <option value="3drotate">3D Rotate</option>
                  </select>
                </div>

                {/* Glow */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Glow: {glow.toFixed(1)}</label>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    step="0.1"
                    value={glow}
                    onChange={(e) => setGlow(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Glow"
                    placeholder="Glow"
                  />
                </div>

                {/* Bloom */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Bloom: {bloom.toFixed(1)}</label>
                  <input id="bloom"
                    type="range"
                    min="0"
                    max="3"
                    step="0.1"
                    value={bloom}
                    onChange={(e) => setBloom(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Bloom"
                    placeholder="Bloom"
                  />
                </div>

                {/* Noise (Grain) */}
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
                    placeholder="Noise"
                  />
                </div>

                {/* Scale */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Scale: {scale.toFixed(1)}</label>
                  <input
                    type="range"
                    min="2"
                    max="6"
                    step="0.1"
                    value={scale}
                    onChange={(e) => setScale(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Scale"
                    placeholder="Scale"
                  />
                </div>

                {/* Hue Shift */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Hue Shift: {hueShift}°</label>
                  <input
                    id="hue"
                    type="range"
                    min="-180"
                    max="180"
                    value={hueShift}
                    onChange={(e) => setHueShift(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Hue Shift"
                    placeholder="Hue Shift"
                  />
                </div>

                {/* Time Scale */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Speed: {timeScale.toFixed(2)}</label>
                  <input
                    id="timescale"
                    type="range"
                    min="0"
                    max="2"
                    step="0.05"
                    value={timeScale}
                    onChange={(e) => setTimeScale(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Time Scale"
                    placeholder="Time Scale"
                  />
                </div>

                {/* Hover Strength */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Hover Sensitivity: {hoverStrength.toFixed(1)}</label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={hoverStrength}
                    onChange={(e) => setHoverStrength(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Hover Sensitivity"
                    placeholder="Hover Sensitivity"
                  />
                </div>

                {/* Inertia */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Inertia: {(inertia * 100).toFixed(0)}%</label>
                  <input
                    id="inertia"
                    type="range"
                    min="0.01"
                    max="0.3"
                    step="0.01"
                    value={inertia}
                    onChange={(e) => setInertia(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Inertia"
                    placeholder="Inertia"
                  />
                </div>

                {/* Reset */}
                <div className="pt-6 border-t border-gold/20">
                  <button
                    onClick={() => {
                      setAnimationType("rotate");
                      setGlow(1.8);
                      setBloom(1.4);
                      setNoise(0.1);
                      setScale(4.2);
                      setHueShift(0);
                      setTimeScale(0.5);
                      setHoverStrength(2.2);
                      setInertia(0.08);
                    }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-black font-bold rounded-xl transition shadow-xl text-lg"
                  >
                    Reset to Default
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FULL 15-ROW PROPS TABLE */}
          <div>
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
                    <td className="p-5 font-mono text-gold">height</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">3.5</td>
                    <td className="p-5 text-gray-300">Apex height of the prism (world units).</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">baseWidth</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">5.5</td>
                    <td className="p-5 text-gray-300">Total base width across X/Z (world units).</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">animationType</td>
                    <td className="p-5 text-gray-300">&quot;rotate&quot; | &quot;hover&quot; | &quot;3drotate&quot;</td>
                    <td className="p-5 font-mono text-gray-400">&quot;rotate&quot;</td>
                    <td className="p-5 text-gray-300">Animation mode: shader wobble, pointer hover tilt, or full 3D rotation.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">glow</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1</td>
                    <td className="p-5 text-gray-300">Glow/bleed intensity multiplier.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">offset</td>
                    <td className="p-5 text-gray-300">object</td>
                    <td className="p-5 font-mono text-gray-400">{`{ x: 0, y: 0 }`}</td>
                    <td className="p-5 text-gray-300">Pixel offset within the canvas.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">noise</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.5</td>
                    <td className="p-5 text-gray-300">Film-grain noise amount (0 = clean).</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">transparent</td>
                    <td className="p-5 text-gray-300">boolean</td>
                    <td className="p-5 font-mono text-gray-400">true</td>
                    <td className="p-5 text-gray-300">Transparent background canvas.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">scale</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">3.6</td>
                    <td className="p-5 text-gray-300">Overall screen-space scale.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">hueShift</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0</td>
                    <td className="p-5 text-gray-300">Hue rotation in degrees.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">colorFrequency</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1</td>
                    <td className="p-5 text-gray-300">Frequency of internal color bands.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">hoverStrength</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">2</td>
                    <td className="p-5 text-gray-300">Sensitivity of hover tilt.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">inertia</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.05</td>
                    <td className="p-5 text-gray-300">Easing factor for hover movement.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">bloom</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1</td>
                    <td className="p-5 text-gray-300">Extra bloom layer on top of glow.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">suspendWhenOffscreen</td>
                    <td className="p-5 text-gray-300">boolean</td>
                    <td className="p-5 font-mono text-gray-400">false</td>
                    <td className="p-5 text-gray-300">Pause rendering when not visible.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">timeScale</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.5</td>
                    <td className="p-5 text-gray-300">Global animation speed multiplier.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        // Code tab
        <div className="space-y-16">
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
{`import { Prism } from "@/components/mjolnirui/backgrounds/prism"

<div className="relative w-full h-screen">
  <Prism 
    animationType="hover"
    glow={2.2}
    bloom={1.6}
    noise={0.05}
    scale={4.5}
    hueShift={30}
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