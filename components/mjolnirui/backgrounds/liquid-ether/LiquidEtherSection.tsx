"use client";

// Fix the TypeScript error by properly extending Window
declare global {
  interface Window {
    isLiquidEtherCodeTab?: boolean;
  }
}

import React, { useState, useEffect } from "react";
import { Heart, Github } from "lucide-react";
import LiquidEther from "./LiquidEther";

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function LiquidEtherSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  // Key visual tuning controls
  const [colors, setColors] = useState(["#5227FF", "#FF9FFC", "#B19EEF"]);
  const [mouseForce, setMouseForce] = useState(35);
  const [resolution, setResolution] = useState(0.85);           // Crisp & fast
  const [iterationsPoisson, setIterationsPoisson] = useState(75); // Crystal clear flow
  const [iterationsViscous, setIterationsViscous] = useState(55); // Silky smooth
  const [autoDemo, setAutoDemo] = useState(true);

  // Now TypeScript is happy — we declared it above
  useEffect(() => {
    window.isLiquidEtherCodeTab = activeTab === "code";
    return () => {
      window.isLiquidEtherCodeTab = false;
    };
  }, [activeTab]);

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <h1 className="text-5xl md:text-6xl font-bold text-gold tracking-tight">
              Liquid Ether
            </h1>
            <span className="bg-emerald-500/20 text-emerald-400 text-sm font-bold px-4 py-1.5 rounded-full border border-emerald-500/50">
              NEW
            </span>
          </div>

          <div className="flex gap-4">
            <button
              aria-label="Like this component"
              className="group relative p-3 rounded-xl bg-white/5 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-gold/50"
            >
              <Heart className="h-6 w-6" />
              <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/90 text-xs text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
                Like
              </span>
              <span className="sr-only">Like this component</span>
            </button>

            <button
              aria-label="View source on GitHub"
              className="group relative p-3 rounded-xl bg-white/5 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-gold/50"
            >
              <Github className="h-6 w-6" />
              <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/90 text-xs text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
                GitHub
              </span>
              <span className="sr-only">View source on GitHub</span>
            </button>
          </div>
        </div>

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
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-8">
              <h3 className="text-2xl font-bold text-silver mb-6">Preview</h3>
              <div className="relative bg-black border border-gold/20 rounded-3xl overflow-hidden shadow-2xl h-96 md:h-[520px]">
                <LiquidEther
                  colors={colors}
                  mouseForce={mouseForce}
                  cursorSize={100}
                  isViscous={true}
                  viscous={30}
                  iterationsViscous={iterationsViscous}
                  iterationsPoisson={iterationsPoisson}
                  resolution={resolution}
                  isBounce={false}
                  autoDemo={true}
                  autoSpeed={0.5}
                  autoIntensity={2.2}
                  autoResumeDelay={3000}
                  autoRampDuration={0.6}
                  BFECC={true}
                  dt={0.016}
                />
              </div>
            </div>

            {/* Customization Panel */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7">
                {/* Colors */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Colors</label>
                  <div className="grid grid-cols-3 gap-3">
                    {colors.map((c, i) => (
                      <input
                        key={i}
                        type="color"
                        value={c}
                        title={`Color ${i + 1}`}
                        onChange={(e) => {
                          const newColors = [...colors];
                          newColors[i] = e.target.value;
                          setColors(newColors);
                        }}
                        className="w-full h-12 rounded cursor-pointer border-2 border-gold/30"
                      />
                    ))}
                  </div>
                </div>

                {/* Mouse Force */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">
                    Force: {mouseForce}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={mouseForce}
                    onChange={(e) => setMouseForce(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust mouse force"
                    placeholder="Adjust mouse force"
                  />
                </div>

                {/* Resolution */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">
                    Clarity: {(resolution * 100).toFixed(0)}%
                  </label>
                  <input
                    id="resolution"
                    type="range"
                    min="0.4"
                    max="1.0"
                    step="0.05"
                    value={resolution}
                    onChange={(e) => setResolution(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust clarity"
                    placeholder="Adjust clarity"
                  />
                </div>

                {/* Poisson (Pressure Clarity) */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">
                    Flow Sharpness: {iterationsPoisson}
                  </label>
                  <input
                    id="poisson"
                    type="range"
                    min="30"
                    max="100"
                    value={iterationsPoisson}
                    onChange={(e) => setIterationsPoisson(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust flow sharpness"
                    placeholder="Adjust flow sharpness"
                  />
                </div>

                {/* Viscous (Silkiness) */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">
                    Silkiness: {iterationsViscous}
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    value={iterationsViscous}
                    onChange={(e) => setIterationsViscous(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust silkiness"
                    placeholder="Adjust silkiness"
                  />
                </div>

                {/* Auto Demo Toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-gray-300 font-medium">Auto Demo</label>
                  <button
                    onClick={() => setAutoDemo(!autoDemo)}
                    className={`relative w-14 h-8 rounded-full transition ${autoDemo ? "bg-gold" : "bg-gray-700"}`}
                  >
                    <div className={`absolute top-1 left-1 w-6 h-6 bg-black rounded-full transition-transform ${autoDemo ? "translate-x-6" : ""}`} />
                  </button>
                </div>

                {/* Reset */}
                <div className="pt-6 border-t border-gold/20">
                  <button
                    onClick={() => {
                      setColors(["#5227FF", "#FF9FFC", "#B19EEF"]);
                      setMouseForce(35);
                      setResolution(0.85);
                      setIterationsPoisson(75);
                      setIterationsViscous(55);
                      setAutoDemo(true);
                    }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-black font-bold rounded-xl transition shadow-xl text-lg"
                  >
                    Reset to Default
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FULL 19-ROW PROPS TABLE */}
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
                    <td className="p-5 font-mono text-gold">colors</td>
                    <td className="p-5 text-gray-300">string[]</td>
                    <td className="p-5 font-mono text-gray-400">[&quot;#5227FF&quot;, &quot;#FF9FFC&quot;, &quot;#B19EEF&quot;]</td>
                    <td className="p-5 text-gray-300">Array of hex color stops used to build the velocity-to-color palette.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">mouseForce</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">20</td>
                    <td className="p-5 text-gray-300">Strength multiplier applied to mouse / touch movement when injecting velocity.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">cursorSize</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">100</td>
                    <td className="p-5 text-gray-300">Radius (in pixels at base resolution) of the force brush.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">resolution</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.5</td>
                    <td className="p-5 text-gray-300">Simulation texture scale relative to canvas size (lower = better performance, more blur).</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">dt</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.014</td>
                    <td className="p-5 text-gray-300">Fixed simulation timestep used inside the advection / diffusion passes.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">BFECC</td>
                    <td className="p-5 text-gray-300">boolean</td>
                    <td className="p-5 font-mono text-gray-400">true</td>
                    <td className="p-5 text-gray-300">Enable BFECC advection (error-compensated) for crisper flow; disable for slight performance gain.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">isViscous</td>
                    <td className="p-5 text-gray-300">boolean</td>
                    <td className="p-5 font-mono text-gray-400">false</td>
                    <td className="p-5 text-gray-300">Toggle iterative viscosity solve (smoother, thicker motion when enabled).</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">viscous</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">30</td>
                    <td className="p-5 text-gray-300">Viscosity coefficient used when isViscous is true.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">iterationsViscous</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">32</td>
                    <td className="p-5 text-gray-300">Number of Gauss-Seidel iterations for viscosity (higher = smoother, slower).</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">iterationsPoisson</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">32</td>
                    <td className="p-5 text-gray-300">Number of pressure Poisson iterations to enforce incompressibility.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">isBounce</td>
                    <td className="p-5 text-gray-300">boolean</td>
                    <td className="p-5 font-mono text-gray-400">false</td>
                    <td className="p-5 text-gray-300">If true, shows bounce boundaries (velocity clamped at edges).</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">autoDemo</td>
                    <td className="p-5 text-gray-300">boolean</td>
                    <td className="p-5 font-mono text-gray-400">true</td>
                    <td className="p-5 text-gray-300">Enable idle auto-driving of the pointer when no user interaction.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">autoSpeed</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.5</td>
                    <td className="p-5 text-gray-300">Speed (normalized units/sec) for auto pointer motion.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">autoIntensity</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">2.2</td>
                    <td className="p-5 text-gray-300">Multiplier applied to velocity delta while in auto mode.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">takeoverDuration</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.25</td>
                    <td className="p-5 text-gray-300">Seconds to interpolate from auto pointer to real cursor when user moves mouse.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">autoResumeDelay</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">1000</td>
                    <td className="p-5 text-gray-300">Milliseconds of inactivity before auto mode resumes.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">autoRampDuration</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.6</td>
                    <td className="p-5 text-gray-300">Seconds to ramp auto movement speed from 0 to full after activation.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">className</td>
                    <td className="p-5 text-gray-300">string</td>
                    <td className="p-5 font-mono text-gray-400">&#39;&#39;</td>
                    <td className="p-5 text-gray-300">Optional class for the root container.</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">style</td>
                    <td className="p-5 text-gray-300">React.CSSProperties</td>
                    <td className="p-5 font-mono text-gray-400">{}</td>
                    <td className="p-5 text-gray-300">Inline styles applied to the root container.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Code tab unchanged — keep your current one */
        <div className="space-y-16">
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
{`import { LiquidEther } from "@/components/mjolnirui/backgrounds/liquid-ether"

<div className="relative w-full h-screen">
  <LiquidEther 
    colors={["#00ff88", "#ff00ff", "#0088ff"]} 
    mouseForce={40}
    resolution={0.8}
    iterationsPoisson={75}
    iterationsViscous={55}
    autoDemo={true}
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