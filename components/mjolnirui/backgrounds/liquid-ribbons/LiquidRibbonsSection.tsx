"use client";

// Extend Window type to include isLiquidRibbonsCodeTab
declare global {
  interface Window {
    isLiquidRibbonsCodeTab?: boolean;
  }
}

import React, { useState, useEffect } from "react";
import { Heart, Github } from "lucide-react";
import LiquidRibbons from "./LiquidRibbons";

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function LiquidRibbonsSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  // Full control over every divine parameter
  const [linesGradient, setLinesGradient] = useState(["#5227FF", "#FF00CC", "#B19EEF", "#00FFFF"]);
  const [enabledWaves, setEnabledWaves] = useState<("top" | "middle" | "bottom")[]>(["top", "middle", "bottom"]);
  const [lineCount, setLineCount] = useState([12, 18, 24]);
  const [lineDistance, setLineDistance] = useState([8, 6, 4]);
  const [animationSpeed, setAnimationSpeed] = useState(1.0);
  const [interactive, setInteractive] = useState(true);
  const [bendRadius, setBendRadius] = useState(8.0);
  const [bendStrength, setBendStrength] = useState(-0.8);
  const [mouseDamping, setMouseDamping] = useState(0.06);
  const [parallax, setParallax] = useState(true);
  const [parallaxStrength, setParallaxStrength] = useState(0.2);

  useEffect(() => {
    window.isLiquidRibbonsCodeTab = activeTab === "code";
    return () => { window.isLiquidRibbonsCodeTab = false; };
  }, [activeTab]);

  const toggleWave = (wave: "top" | "middle" | "bottom") => {
    setEnabledWaves(prev => 
      prev.includes(wave) 
        ? prev.filter(w => w !== wave)
        : [...prev, wave]
    );
  };

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <h1 className="text-5xl md:text-6xl font-bold text-gold tracking-tight">Liquid Ribbons</h1>
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
          {/* Preview + Controls */}
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            {/* Preview */}
            <div className="lg:col-span-8">
              <h3 className="text-2xl font-bold text-silver mb-6">Preview</h3>
              <div className="relative bg-black border border-gold/20 rounded-3xl overflow-hidden shadow-2xl 
                h-96 
                md:h-[520px] 
                lg:h-[520px] 
                xl:h-[520px]">
                <LiquidRibbons
                  linesGradient={linesGradient}
                  enabledWaves={enabledWaves}
                  lineCount={lineCount}
                  lineDistance={lineDistance}
                  animationSpeed={animationSpeed}
                  interactive={interactive}
                  bendRadius={bendRadius}
                  bendStrength={bendStrength}
                  mouseDamping={mouseDamping}
                  parallax={parallax}
                  parallaxStrength={parallaxStrength}
                  mixBlendMode="screen"
                />
              </div>
            </div>

            {/* Customization Panel */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7 max-h-screen overflow-y-auto">
                {/* Gradient Colors */}
                <div>
                  <label className="text-gray-300 font-medium block mb-3">Ribbon Gradient (4 colors)</label>
                  <div className="grid grid-cols-2 gap-3">
                    {linesGradient.map((c, i) => (
                      <input
                        key={i}
                        type="color"
                        value={c}
                        title={`Ribbon Gradient Color ${i + 1}`}
                        onChange={(e) => {
                          const newGrad = [...linesGradient];
                          newGrad[i] = e.target.value;
                          setLinesGradient(newGrad);
                        }}
                        className="w-full h-14 rounded cursor-pointer border-2 border-gold/30"
                      />
                    ))}
                  </div>
                </div>

                {/* Wave Layers */}
                <div>
                  <label className="text-gray-300 font-medium block mb-3">Enabled Waves</label>
                  <div className="space-y-2">
                    {(["top", "middle", "bottom"] as const).map((wave) => (
                      <label key={wave} className="flex items-center justify-between cursor-pointer">
                        <span className="text-gray-300 capitalize">{wave} Wave</span>
                        <button
                          onClick={() => toggleWave(wave)}
                          className={`relative w-14 h-8 rounded-full transition ${enabledWaves.includes(wave) ? "bg-gold" : "bg-gray-700"}`}
                        >
                          <div className={`absolute top-1 left-1 w-6 h-6 bg-black rounded-full transition-transform ${enabledWaves.includes(wave) ? "translate-x-6" : ""}`} />
                        </button>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Line Count */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Line Count: {lineCount.join(" / ")}</label>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    value={Math.max(...lineCount)}
                    onChange={(e) => setLineCount([+e.target.value - 10, +e.target.value, +e.target.value + 10])}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Set the line count"
                    placeholder="Set the line count"
                  />
                </div>

                {/* Line Distance */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Line Distance: {lineDistance.join(" / ")}</label>
                  <input
                    id="linedistance"
                    type="range"
                    min="2"
                    max="20"
                    value={Math.max(...lineDistance)}
                    onChange={(e) => setLineDistance([+e.target.value - 2, +e.target.value, +e.target.value + 2])}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Set the line distance"
                    placeholder="Set the line distance"
                  />
                </div>

                {/* Animation Speed */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Speed: {animationSpeed.toFixed(1)}x</label>
                  <input
                    id="animationspeed"
                    type="range"
                    min="0"
                    max="3"
                    step="0.1"
                    value={animationSpeed}
                    onChange={(e) => setAnimationSpeed(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Set the animation speed"
                    placeholder="Set the animation speed"
                  />
                </div>

                {/* Bend Strength */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Bend Strength: {bendStrength.toFixed(2)}</label>
                  <input
                    id="bendstrength"
                    type="range"
                    min="-2"
                    max="2"
                    step="0.05"
                    value={bendStrength}
                    onChange={(e) => setBendStrength(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Set the bend strength"
                    placeholder="Set the bend strength"
                  />
                </div>

                {/* Bend Radius */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Bend Radius: {bendRadius.toFixed(1)}</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.5"
                    value={bendRadius}
                    onChange={(e) => setBendRadius(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Set the bend radius"
                    placeholder="Set the bend radius"
                  />
                </div>

                {/* Mouse Damping */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Smoothness: {(mouseDamping * 100).toFixed(0)}%</label>
                  <input
                    id="mousedamping"
                    type="range"
                    min="0.01"
                    max="0.2"
                    step="0.01"
                    value={mouseDamping}
                    onChange={(e) => setMouseDamping(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Set the mouse damping"
                    placeholder="Set the mouse damping"
                  />
                </div>

                {/* Parallax Strength */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Parallax Strength: {parallaxStrength.toFixed(2)}</label>
                  <input
                    id="parallaxstrength"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={parallaxStrength}
                    onChange={(e) => setParallaxStrength(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Set the parallax strength"
                    placeholder="Set the parallax strength"
                  />
                </div>

                {/* Parallax */}
                <div className="flex items-center justify-between">
                  <label className="text-gray-300 font-medium">Parallax Effect</label>
                  <button
                    onClick={() => setParallax(!parallax)}
                    className={`relative w-14 h-8 rounded-full transition ${parallax ? "bg-gold" : "bg-gray-700"}`}
                  >
                    <div className={`absolute top-1 left-1 w-6 h-6 bg-black rounded-full transition-transform ${parallax ? "translate-x-6" : ""}`} />
                  </button>
                </div>

                {/* Interactive */}

                {/* Reset */}
                <div className="pt-6 border-t border-gold/20">
                  <button
                    onClick={() => {
                      setLinesGradient(["#5227FF", "#FF00CC", "#B19EEF", "#00FFFF"]);
                      setEnabledWaves(["top", "middle", "bottom"]);
                      setLineCount([12, 18, 24]);
                      setAnimationSpeed(1.0);
                      setBendStrength(-0.8);
                      setBendRadius(8.0);
                      setMouseDamping(0.06);
                      setParallax(true);
                      setInteractive(true);
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
                        <td className="p-5 font-mono text-gold">linesGradient</td>
                        <td className="p-5 text-gray-300">string[]</td>
                        <td className="p-5 font-mono text-gray-400">undefined</td>
                        <td className="p-5 text-gray-300">Array of hex color strings for gradient coloring of lines (max 8 colors).</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">enabledWaves</td>
                        <td className="p-5 text-gray-300">Array&lt;&#39;top&#39;|&#39;middle&#39;|&#39;bottom&#39;&gt;</td>
                        <td className="p-5 font-mono text-gray-400">[&#39;top&#39;,&#39;middle&#39;,&#39;bottom&#39;]</td>
                        <td className="p-5 text-gray-300">Which wave layers to display.</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">lineCount</td>
                        <td className="p-5 text-gray-300">number | number[]</td>
                        <td className="p-5 font-mono text-gray-400">[6]</td>
                        <td className="p-5 text-gray-300">Number of lines per wave.</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">lineDistance</td>
                        <td className="p-5 text-gray-300">number | number[]</td>
                        <td className="p-5 font-mono text-gray-400">[5]</td>
                        <td className="p-5 text-gray-300">Spacing between lines.</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">topWavePosition</td>
                        <td className="p-5 text-gray-300">object</td>
                        <td className="p-5 font-mono text-gray-400">undefined</td>
                        <td className="p-5 text-gray-300">Position and rotation for top wave.</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">middleWavePosition</td>
                        <td className="p-5 text-gray-300">object</td>
                        <td className="p-5 font-mono text-gray-400">undefined</td>
                        <td className="p-5 text-gray-300">Position and rotation for middle wave.</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">bottomWavePosition</td>
                        <td className="p-5 text-gray-300">object</td>
                        <td className="p-5 font-mono text-gray-400">{`{ x: 2.0, y: -0.7, rotate: -1 }`}</td>
                        <td className="p-5 text-gray-300">Position and rotation for bottom wave.</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">animationSpeed</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">1</td>
                        <td className="p-5 text-gray-300">Speed multiplier for the wave animation.</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">interactive</td>
                        <td className="p-5 text-gray-300">boolean</td>
                        <td className="p-5 font-mono text-gray-400">true</td>
                        <td className="p-5 text-gray-300">Whether the lines react to mouse/pointer movement.</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">bendRadius</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">10.0</td>
                        <td className="p-5 text-gray-300">Radius of the area affected by mouse interaction.</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">bendStrength</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">-5.0</td>
                        <td className="p-5 text-gray-300">Intensity of the bend effect.</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">mouseDamping</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">0.05</td>
                        <td className="p-5 text-gray-300">Smoothing factor for mouse movement tracking.</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">parallax</td>
                        <td className="p-5 text-gray-300">boolean</td>
                        <td className="p-5 font-mono text-gray-400">true</td>
                        <td className="p-5 text-gray-300">Enable parallax effect with mouse movement.</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">parallaxStrength</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">0.2</td>
                        <td className="p-5 text-gray-300">Strength of the parallax effect.</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">mixBlendMode</td>
                        <td className="p-5 text-gray-300">string</td>
                        <td className="p-5 font-mono text-gray-400">&#39;screen&#39;</td><td className="p-5 text-gray-300">CSS mix-blend-mode applied to the canvas.</td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        // Code tab...
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
{`import { LiquidRibbons } from "@/components/mjolnirui/backgrounds/liquid-ribbons"

<div className="relative w-full h-screen">
  <LiquidRibbons 
    linesGradient={["#00ff88", "#ff00ff", "#0088ff"]}
    lineCount={[12, 18, 24]}
    bendStrength={-0.8}
    parallax={true}
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