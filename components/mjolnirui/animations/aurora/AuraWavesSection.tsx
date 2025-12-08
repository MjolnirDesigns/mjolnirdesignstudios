"use client";

import React, { useState, useEffect } from "react";
import { Heart, Github, Download } from "lucide-react";
import Aurora from "./AuraWaves";

declare global {
  interface Window {
    isAuroraCodeTab?: boolean;
  }
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AuroraSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

    const [color1, setColor1] = useState("#ff9ec2"); // Soft pink
    const [color2, setColor2] = useState("#a8f0d0"); // Pale mint green
    const [color3, setColor3] = useState("#4fc3ff"); // Electric sky blue
    const [amplitude, setAmplitude] = useState(2.25);
    const [blend, setBlend] = useState(0.5);
    const [speed, setSpeed] = useState(0.5);

  useEffect(() => {
    window.isAuroraCodeTab = activeTab === "code";
    return () => { window.isAuroraCodeTab = false; };
  }, [activeTab]);

  const resetToDefault = () => {
    setColor1("#ff9ec2");
    setColor2("#a8f0d0");
    setColor3("#4fc3ff");
    setAmplitude(1.0);
    setBlend(0.5);
    setSpeed(0.5);
  };

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gold tracking-tight">
              Aurora
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
                {tab}
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
                <Aurora
                  colorStops={[color1, color2, color3]}
                  amplitude={amplitude}
                  blend={blend}
                  speed={speed}
                />
              </div>
            </div>

            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7">
                <div className="space-y-3">
                  <label className="text-gray-300 font-medium">Color Stops</label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { value: color1, set: setColor1, label: "Left" },
                      { value: color2, set: setColor2, label: "Middle" },
                      { value: color3, set: setColor3, label: "Right" },
                    ].map((c) => (
                      <input key={c.label} type="color" value={c.value} onChange={(e) => c.set(e.target.value)} className="w-full h-14 rounded cursor-pointer border-2 border-gold/30" title={`Select ${c.label} color`} />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Amplitude: {amplitude.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={amplitude}
                    onChange={(e) => setAmplitude(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust amplitude"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Blend: {blend.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={blend}
                    onChange={(e) => setBlend(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust blend"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium block mb-2">Speed: {speed.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.05"
                    value={speed}
                    onChange={(e) => setSpeed(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust speed"
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
                        <td className="p-5 font-mono text-gold">colorStops</td>
                        <td className="p-5 text-gray-300">[string, string, string]</td>
                        <td className="p-5 font-mono text-gray-400">[&quot;#3A29FF&quot;, &quot;#FF94B4&quot;, &quot;#FF3232&quot;]</td>
                        <td className="p-5 text-gray-300">Three colors for the aurora gradient</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">amplitude</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">1.0</td>
                        <td className="p-5 text-gray-300">Wave height intensity</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">blend</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">0.5</td>
                        <td className="p-5 text-gray-300">Smoothness of aurora edge</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-mono text-gold">speed</td>
                        <td className="p-5 text-gray-300">number</td>
                        <td className="p-5 font-mono text-gray-400">0.5</td>
                        <td className="p-5 text-gray-300">Animation speed</td>
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
{`import Aurora from "@/components/mjolnirui/backgrounds/Aurora"

<div className="relative h-screen bg-black">
  <Aurora 
    colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
    amplitude={1.2}
    speed={0.7}
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