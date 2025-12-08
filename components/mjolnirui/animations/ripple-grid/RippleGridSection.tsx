"use client";

import React, { useState, useEffect } from "react";
import { Heart, Github, Download } from "lucide-react";
import RippleGrid from "./RippleGrid";

declare global {
  interface Window {
    isRippleGridCodeTab?: boolean;
  }
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function RippleGridSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const [enableRainbow, setEnableRainbow] = useState(false);
  const [gridColor, setGridColor] = useState("#00ffff");
  const [rippleIntensity, setRippleIntensity] = useState(0.05);
  const [gridSize, setGridSize] = useState(10.0);
  const [gridThickness, setGridThickness] = useState(15.0);
  const [fadeDistance, setFadeDistance] = useState(1.5);
  const [vignetteStrength, setVignetteStrength] = useState(2.0);
  const [glowIntensity, setGlowIntensity] = useState(0.1);
  const [opacity, setOpacity] = useState(1.0);
  const [gridRotation, setGridRotation] = useState(0);
  const [mouseInteraction, setMouseInteraction] = useState(true);
  const [mouseInteractionRadius, setMouseInteractionRadius] = useState(0.8);

  useEffect(() => {
    window.isRippleGridCodeTab = activeTab === "code";
    return () => { window.isRippleGridCodeTab = false; };
  }, [activeTab]);

  const resetToDefault = () => {
    setEnableRainbow(false);
    setGridColor("#00ffff");
    setRippleIntensity(0.05);
    setGridSize(10.0);
    setGridThickness(15.0);
    setFadeDistance(1.5);
    setVignetteStrength(2.0);
    setGlowIntensity(0.1);
    setOpacity(1.0);
    setGridRotation(0);
    setMouseInteraction(true);
    setMouseInteractionRadius(0.8);
  };

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gold tracking-tight">
              Ripple Grid
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
                <div className="absolute inset-0 w-full h-full">
                  <RippleGrid
                    enableRainbow={enableRainbow}
                    gridColor={gridColor}
                    rippleIntensity={rippleIntensity}
                    gridSize={gridSize}
                    gridThickness={gridThickness}
                    fadeDistance={fadeDistance}
                    vignetteStrength={vignetteStrength}
                    glowIntensity={glowIntensity}
                    opacity={opacity}
                    gridRotation={gridRotation}
                    mouseInteraction={mouseInteraction}
                    mouseInteractionRadius={mouseInteractionRadius}
                  />
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7">

                {/* Grid Color */}
                {!enableRainbow && (
                  <div>
                    <label className="text-gray-300 font-medium block mb-3">Grid Color</label>
                    <input
                      type="color"
                      value={gridColor}
                      onChange={(e) => setGridColor(e.target.value)}
                      className="w-full h-14 rounded cursor-pointer border-2 border-gold/30"
                      title="Grid Color"
                    />
                  </div>
                )}

                {/* Ripple Intensity */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">
                    Ripple Intensity: {rippleIntensity.toFixed(3)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="0.2"
                    step="0.001"
                    value={rippleIntensity}
                    onChange={(e) => setRippleIntensity(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Ripple Intensity"
                  />
                </div>

                {/* Grid Size */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">
                    Grid Size: {gridSize.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="30"
                    step="0.5"
                    value={gridSize}
                    onChange={(e) => setGridSize(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Grid Size"
                  />
                </div>

                {/* Grid Thickness */}
                <div>
                  <label htmlFor="grid-thickness" className="text-gray-300 font-medium block mb-2">
                    Grid Thickness: {gridThickness.toFixed(0)}
                  </label>
                  <input
                    id="grid-thickness"
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={gridThickness}
                    onChange={(e) => setGridThickness(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Grid Thickness"
                  />
                </div>

                {/* Fade Distance */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">
                    Fade Distance: {fadeDistance.toFixed(1)}
                  </label>
                  <input
                    id="fade-distance"
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.1"
                    value={fadeDistance}
                    onChange={(e) => setFadeDistance(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Fade Distance"
                  />
                </div>

                {/* Vignette Strength */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">
                    Vignette Strength: {vignetteStrength.toFixed(1)}
                  </label>
                  <input
                    id="vignette-strength"
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={vignetteStrength}
                    onChange={(e) => setVignetteStrength(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Vignette Strength"
                  />
                </div>

                {/* Glow Intensity */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">
                    Glow Intensity: {glowIntensity.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={glowIntensity}
                    onChange={(e) => setGlowIntensity(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Glow Intensity"
                  />
                </div>

                {/* Opacity */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">
                    Opacity: {opacity.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={opacity}
                    onChange={(e) => setOpacity(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Opacity"
                  />
                </div>

                {/* Grid Rotation */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">
                    Grid Rotation: {gridRotation}°
                  </label>
                  <input
                    id="grid-rotation"
                    type="range"
                    min="-180"
                    max="180"
                    step="1"
                    value={gridRotation}
                    onChange={(e) => setGridRotation(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Grid Rotation"
                  />
                </div>

                {/* Mouse Radius */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">
                    Mouse Radius: {mouseInteractionRadius.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.05"
                    value={mouseInteractionRadius}
                    onChange={(e) => setMouseInteractionRadius(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Mouse Interaction Radius"
                  />
                </div>

                {/* MOVED: Enable Rainbow — now near the bottom */}
                <div className="flex items-center justify-between">
                  <label className="text-gray-300 font-medium">Enable Rainbow</label>
                  <button
                    onClick={() => setEnableRainbow(!enableRainbow)}
                    className={cn(
                      "relative w-14 h-8 rounded-full transition",
                      enableRainbow ? "bg-gold" : "bg-gray-700"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300",
                        enableRainbow ? "translate-x-6" : "translate-x-0"
                      )}
                    />
                  </button>
                </div>

                {/* Mouse Interaction */}
                <div className="flex items-center justify-between">
                  <label className="text-gray-300 font-medium">Mouse Interaction</label>
                  <button
                    onClick={() => setMouseInteraction(!mouseInteraction)}
                    className={cn(
                      "relative w-14 h-8 rounded-full transition",
                      mouseInteraction ? "bg-gold" : "bg-gray-700"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300",
                        mouseInteraction ? "translate-x-6" : "translate-x-0"
                      )}
                    />
                  </button>
                </div>

                {/* Reset Button */}
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
                    <td className="p-5 font-mono text-gold">enableRainbow</td>
                    <td className="p-5 text-gray-300">boolean</td>
                    <td className="p-5 font-mono text-gray-400">false</td>
                    <td className="p-5 text-gray-400">—</td>
                    <td className="p-5 text-gray-300">Enables rainbow color cycling animation for the grid.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">gridColor</td>
                    <td className="p-5 text-gray-300">string</td>
                    <td className="p-5 font-mono text-gray-400">#00ffff</td>
                    <td className="p-5 text-gray-400">—</td>
                    <td className="p-5 text-gray-300">Color of the grid when rainbow mode is disabled.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">rippleIntensity</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.05</td>
                    <td className="p-5 text-gray-400">0 – 0.2</td>
                    <td className="p-5 text-gray-300">Controls the intensity of the ripple effect from the center.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">gridSize</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">10.0</td>
                    <td className="p-5 text-gray-400">2 – 30</td>
                    <td className="p-5 text-gray-300">Controls the density/size of the grid pattern.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">gridThickness</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">15.0</td>
                    <td className="p-5 text-gray-400">1 – 50</td>
                    <td className="p-5 text-gray-300">Controls the thickness of the grid lines.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">fadeDistance</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.5</td>
                    <td className="p-5 text-gray-400">0.5 – 5</td>
                    <td className="p-5 text-gray-300">Controls how far the fade effect extends from the center.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">vignetteStrength</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">2.0</td>
                    <td className="p-5 text-gray-400">0 – 10</td>
                    <td className="p-5 text-gray-300">Controls the intensity of the vignette effect.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">glowIntensity</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.1</td>
                    <td className="p-5 text-gray-400">0 – 1</td>
                    <td className="p-5 text-gray-300">Adds a glow effect to the grid lines.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">opacity</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1.0</td>
                    <td className="p-5 text-gray-400">0 – 1</td>
                    <td className="p-5 text-gray-300">Overall opacity of the entire effect.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">gridRotation</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0</td>
                    <td className="p-5 text-gray-400">-180 – 180</td>
                    <td className="p-5 text-gray-300">Rotate the entire grid pattern by degrees.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">mouseInteraction</td>
                    <td className="p-5 text-gray-300">boolean</td>
                    <td className="p-5 font-mono text-gray-400">true</td>
                    <td className="p-5 text-gray-400">—</td>
                    <td className="p-5 text-gray-300">Enable mouse/touch interaction to create ripples.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">mouseInteractionRadius</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.8</td>
                    <td className="p-5 text-gray-400">0.1 – 3</td>
                    <td className="p-5 text-gray-300">Controls the radius of the mouse interaction effect.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-7xl mx-auto px-6 space-y-16 py-12">
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
{`import RippleGrid from "@/components/mjolnirui/backgrounds/RippleGrid"

<div className="relative w-full h-screen overflow-hidden">
  <RippleGrid
    enableRainbow={false}
    gridColor="#00ffff"
    rippleIntensity={0.05}
    gridSize={10}
    gridThickness={15}
    mouseInteraction={true}
    opacity={0.8}
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