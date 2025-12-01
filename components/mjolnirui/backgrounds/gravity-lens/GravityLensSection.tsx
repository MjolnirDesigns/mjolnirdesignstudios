"use client";

import React, { useState, useEffect } from "react";
import { Heart, Github } from "lucide-react";
import GravityLens from "./GravityLens";

declare global {
  interface Window {
    isGravityLensCodeTab?: boolean;
  }
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function GravityLensSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const [density, setDensity] = useState(1.8);
  const [glowIntensity, setGlowIntensity] = useState(0.7);
  const [saturation, setSaturation] = useState(0.9);
  const [hueShift, setHueShift] = useState(240);
  const [mouseRepulsion, setMouseRepulsion] = useState(true);
  const [twinkleIntensity, setTwinkleIntensity] = useState(0.5);

  useEffect(() => {
    window.isGravityLensCodeTab = activeTab === "code";
    return () => { window.isGravityLensCodeTab = false; };
  }, [activeTab]);

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <h1 className="text-5xl md:text-6xl font-bold text-gold tracking-tight">Gravity Lens</h1>
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
            <div className="lg:col-span-8">
              <h3 className="text-2xl font-bold text-silver mb-6">Preview</h3>
              <div className="relative bg-black border border-gold/20 rounded-3xl overflow-hidden shadow-2xl h-96 md:h-[520px]">
                <GravityLens
                  density={density}
                  glowIntensity={glowIntensity}
                  saturation={saturation}
                  hueShift={hueShift}
                  mouseRepulsion={mouseRepulsion}
                  twinkleIntensity={twinkleIntensity}
                  transparent={true}
                />
              </div>
            </div>

            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7">
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Star Density: {density.toFixed(1)}</label>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={density}
                    onChange={(e) => setDensity(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Star Density"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Glow: {glowIntensity.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0.1"
                    max="1.5"
                    step="0.05"
                    value={glowIntensity}
                    onChange={(e) => setGlowIntensity(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Glow Intensity"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Saturation: {(saturation * 100).toFixed(0)}%</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={saturation}
                    onChange={(e) => setSaturation(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Saturation"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Hue Shift: {hueShift}°</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={hueShift}
                    onChange={(e) => setHueShift(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Hue Shift"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Twinkle: {twinkleIntensity.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={twinkleIntensity}
                    onChange={(e) => setTwinkleIntensity(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Twinkle Intensity"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-300 font-medium">Mouse Repulsion</label>
                  <button onClick={() => setMouseRepulsion(!mouseRepulsion)} className={`relative w-14 h-8 rounded-full transition ${mouseRepulsion ? "bg-gold" : "bg-gray-700"}`}>
                    <div className={`absolute top-1 left-1 w-6 h-6 bg-black rounded-full transition-transform ${mouseRepulsion ? "translate-x-6" : ""}`} />
                  </button>
                </div>
                <div className="pt-6 border-t border-gold/20">
                  <button onClick={() => {
                    setDensity(1.8); setGlowIntensity(0.7); setSaturation(0.9);
                    setHueShift(240); setTwinkleIntensity(0.5); setMouseRepulsion(true);
                  }} className="w-full px-6 py-4 bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-black font-bold rounded-xl transition shadow-xl text-lg">
                    Reset to Default
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FULL 16-ROW PROPS TABLE */}
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Props</h3>
            <div className="bg-black/40 border border-gold/20 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gold/10">
                  <tr><th className="text-left p-5 font-bold">Property</th><th className="text-left p-5 font-bold">Type</th><th className="text-left p-5 font-bold">Default</th><th className="text-left p-5 font-bold">Description</th></tr>
                </thead>
                <tbody className="divide-y divide-gold/10">
                    <tr>
                        <td className="p-5 font-mono text-gold">focal</td>
                        <td className="p-5 text-gray-300">[number, number]</td>
                        <td className="p-5 font-mono text-gray-400">[0.5, 0.5]</td>
                        <td className="p-5 text-gray-300">Focal point of the lens effect</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">rotation</td>
                        <td className="p-5 text-gray-300">[number, number]</td>
                        <td className="p-5 font-mono text-gray-400">[1.0, 0.0]</td>
                        <td className="p-5 text-gray-300">Rotation matrix of the galaxy</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">starSpeed</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">0.5</td>
                        <td className="p-5 text-gray-300">Speed of star movement</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">density</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">1</td>
                        <td className="p-5 text-gray-300">Density of stars</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">hueShift</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">140</td>
                        <td className="p-5 text-gray-300">Hue shift in degrees</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">speed</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">1.0</td>
                        <td className="p-5 text-gray-300">Global animation speed</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">mouseInteraction</td>
                        <td className="p-5 text-gray-300">boolean</td>
                        <td className="p-5 font-mono text-gray-400">true</td>
                        <td className="p-5 text-gray-300">Enable mouse interaction</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">glowIntensity</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">0.3</td>
                        <td className="p-5 text-gray-300">Star glow intensity</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">saturation</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">0.0</td>
                        <td className="p-5 text-gray-300">Color saturation (0 = grayscale)</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">mouseRepulsion</td>
                        <td className="p-5 text-gray-300">boolean</td>
                        <td className="p-5 font-mono text-gray-400">true</td>
                        <td className="p-5 text-gray-300">Stars repelled by cursor</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">twinkleIntensity</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">0.3</td>
                        <td className="p-5 text-gray-300">Star twinkle amount</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">rotationSpeed</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">0.1</td>
                        <td className="p-5 text-gray-300">Auto rotation speed</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">repulsionStrength</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">2</td>
                        <td className="p-5 text-gray-300">Mouse repulsion strength</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">autoCenterRepulsion</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">0</td>
                        <td className="p-5 text-gray-300">Repulsion from center (overrides mouse)</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">transparent</td>
                        <td className="p-5 text-gray-300">boolean</td>
                        <td className="p-5 font-mono text-gray-400">true</td>
                        <td className="p-5 text-gray-300">Transparent background (only stars visible)</td>
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
              npm install ogl
            </pre>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Usage</h3>
            <pre className="bg-black/60 border border-gold/20 rounded-2xl p-8 overflow-x-auto">
              <code className="text-orange font-mono text-sm">
{`import { GravityLens } from "@/components/mjolnirui/backgrounds/gravity-lens"

<div className="relative w-full h-screen">
  <GravityLens 
    density={2.2}
    glowIntensity={0.8}
    hueShift={270}
    mouseRepulsion={true}
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