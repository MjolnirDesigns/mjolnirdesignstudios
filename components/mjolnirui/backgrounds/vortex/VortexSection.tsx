"use client";

import React, { useState, useEffect } from "react";
import { Heart, Github } from "lucide-react";
import { Vortex } from "./Vortex";

declare global {
  interface Window {
    isVortexCodeTab?: boolean;
  }
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function VortexSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const [particleCount, setParticleCount] = useState(1000);
  const [baseHue, setBaseHue] = useState(240);
  const [swirlSpeed, setSwirlSpeed] = useState(0.8);
  const [vortexStrength, setVortexStrength] = useState(0.0006);
  const [particleSpeed, setParticleSpeed] = useState(0.3);
  const [glowIntensity, setGlowIntensity] = useState(1.5);

  useEffect(() => {
    window.isVortexCodeTab = activeTab === "code";
    return () => { window.isVortexCodeTab = false; };
  }, [activeTab]);

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <h1 className="text-5xl md:text-6xl font-bold text-gold tracking-tight">Vortex</h1>
            <span className="bg-emerald-500/20 text-emerald-400 text-sm font-bold px-4 py-1.5 rounded-full border border-emerald-500/50">NEW</span>
          </div>
          <div className="flex gap-4">
            <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition"><Heart className="h-6 w-6" /></button>
            <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition"><Github className="h-6 w-6" /></button>
          </div>
        </div>

        <div className="flex gap-8 mb-4 border-b border-gold/20">
          {(["preview", "code"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={cn("pb-4 px-2 capitalize text-xl font-medium transition relative", activeTab === tab ? "text-gold" : "text-gray-400 hover:text-gold")}>
              {tab === "preview" ? "Preview" : "Code"}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold rounded-full" />}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "preview" ? (
        <>
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            {/* PREVIEW — SINGLE BORDER ONLY */}
            <div className="lg:col-span-8">
              <h3 className="text-2xl font-bold text-silver mb-6">Preview</h3>
              <div className="relative bg-black border border-gold/20 rounded-3xl overflow-hidden shadow-2xl h-96 md:h-[520px]">
                <Vortex
                  particleCount={particleCount}
                  baseHue={baseHue}
                  rangeY={120}
                  baseSpeed={0.0}
                  rangeSpeed={1.5}
                  baseRadius={1}
                  rangeRadius={2.5}
                  backgroundColor="black"
                />
              </div>
            </div>

            {/* CUSTOMIZE PANEL */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7">
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Particles: {particleCount}</label>
                  <input
                    type="range"
                    min="300"
                    max="2000"
                    value={particleCount}
                    onChange={(e) => setParticleCount(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Particles"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Hue: {baseHue}°</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={baseHue}
                    onChange={(e) => setBaseHue(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Base Hue"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Swirl Speed: {swirlSpeed.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0.1"
                    max="2"
                    step="0.1"
                    value={swirlSpeed}
                    onChange={(e) => setSwirlSpeed(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Swirl Speed"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Vortex Pull: {(vortexStrength * 10000).toFixed(2)}</label>
                  <input
                    type="range"
                    min="0"
                    max="0.0012"
                    step="0.0001"
                    value={vortexStrength}
                    onChange={(e) => setVortexStrength(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Vortex Pull"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Particle Speed: {particleSpeed.toFixed(2)}</label>
                  <input type="range" min="0.1" max="1" step="0.05" value={particleSpeed} onChange={(e) => setParticleSpeed(+e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent" title="Particle Speed" />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Glow: {glowIntensity.toFixed(1)}</label>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={glowIntensity}
                    onChange={(e) => setGlowIntensity(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Glow Intensity"
                  />
                </div>
                <div className="pt-6 border-t border-gold/20">
                  <button onClick={() => {
                    setParticleCount(1000); setBaseHue(240); setSwirlSpeed(0.8);
                    setVortexStrength(0.0006); setParticleSpeed(0.3); setGlowIntensity(1.5);
                  }} className="w-full px-6 py-4 bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-black font-bold rounded-xl transition shadow-xl text-lg">
                    Reset to Divine
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PROPS TABLE */}
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Props</h3>
            <div className="bg-black/40 border border-gold/20 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gold/10">
                  <tr><th className="text-left p-5 font-bold">Property</th><th className="text-left p-5 font-bold">Type</th><th className="text-left p-5 font-bold">Default</th><th className="text-left p-5 font-bold">Description</th></tr>
                </thead>
                <tbody className="divide-y divide-gold/10">
                  <tr>
                    <td className="p-5 font-mono text-gold">particleCount</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">700</td>
                    <td className="p-5 text-gray-300">Number of particles</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">rangeY</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">100</td>
                    <td className="p-5 text-gray-300">Vertical spawn range</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">baseHue</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">220</td>
                    <td className="p-5 text-gray-300">Base color hue</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">baseSpeed</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.0</td>
                    <td className="p-5 text-gray-300">Base movement speed</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">rangeSpeed</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.5</td>
                    <td className="p-5 text-gray-300">Speed variation</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">baseRadius</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1</td>
                    <td className="p-5 text-gray-300">Base particle size</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">rangeRadius</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">2</td>
                    <td className="p-5 text-gray-300">Size variation</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">backgroundColor</td>
                    <td className="p-5 text-gray-300">string</td>
                    <td className="p-5 font-mono text-gray-400">#000000</td>
                    <td className="p-5 text-gray-300">Canvas background</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Install</h3>
            <pre className="bg-black/60 border border-gold/20 rounded-2xl p-8 text-orange text-lg font-mono">
              npm install simplex-noise
            </pre>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Usage</h3>
            <pre className="bg-black/60 border border-gold/20 rounded-2xl p-8 overflow-x-auto">
              <code className="text-orange font-mono text-sm">
{`import { Vortex } from "@/components/mjolnirui/backgrounds/vortex"

<div className="relative w-full h-screen">
  <Vortex particleCount={900} baseHue={270}>
    <h1 className="text-7xl font-bold text-white">VORTEX</h1>
  </Vortex>
</div>`}
              </code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}