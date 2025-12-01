"use client";

// Extend the Window interface
declare global {
  interface Window {
    isNeuralCodeTab?: boolean;
  }
}

import React, { useState, useEffect } from "react";
import { Heart, Github } from "lucide-react";
import { NeuralNet } from "./NeuralNet";

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NeuralNetSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  // Correct props: hue, saturation, chroma (not intensity/speed)
  const [hue, setHue] = useState(200);
  const [saturation, setSaturation] = useState(0.8);
  const [chroma, setChroma] = useState(0.6);

  useEffect(() => {
    window.isNeuralCodeTab = activeTab === "code";
    return () => {
      window.isNeuralCodeTab = false;
    };
  }, [activeTab]);

  return (
    <section className="w-full">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <h1 className="text-5xl md:text-6xl font-bold text-gold tracking-tight">
              Neural Net
            </h1>
            <span className="bg-emerald-500/20 text-emerald-400 text-sm font-bold px-4 py-1.5 rounded-full border border-emerald-500/50">
              NEW
            </span>
          </div>
          <div className="flex gap-4">
            <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition" title="Like">
              <Heart className="h-6 w-6" />
            </button>
            <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition" title="View on GitHub">
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
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            {/* Preview */}
            <div className="lg:col-span-8">
              <h3 className="text-2xl font-bold text-silver mb-6">Preview</h3>
              <div className="relative bg-black border border-gold/20 rounded-3xl overflow-hidden shadow-2xl h-96 md:h-[520px]">
                <NeuralNet hue={hue} saturation={saturation} chroma={chroma} />
              </div>
            </div>

            {/* Customization Panel */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7">
                {/* Hue */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Hue</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={hue}
                    onChange={(e) => setHue(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Hue"
                  />
                  <span className="text-gold font-mono text-sm">{hue}°</span>
                </div>

                {/* Saturation */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Saturation</label>
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
                  <span className="text-gold font-mono text-sm">{(saturation * 100).toFixed(0)}%</span>
                </div>

                {/* Chroma (Glow Intensity) */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Chroma (Glow)</label>
                  <input id="range"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={chroma}
                    onChange={(e) => setChroma(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Chroma (Glow)"
                  />
                  <span className="text-gold font-mono text-sm">{(chroma * 100).toFixed(0)}%</span>
                </div>

                {/* Reset */}
                <div className="pt-6 border-t border-gold/20">
                  <button
                    onClick={() => {
                      setHue(200);
                      setSaturation(0.8);
                      setChroma(0.6);
                    }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-black font-bold rounded-xl transition shadow-xl text-lg"
                  >
                    Return to Default
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Props Table */}
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
                    <td className="p-5 font-mono text-gold">hue</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">200</td>
                    <td className="p-5 text-gray-300">Base color hue (0–360)</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">saturation</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.8</td>
                    <td className="p-5 text-gray-300">Color saturation (0–1)</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">chroma</td>
                    <td className="p-5 text-gray-300">number</td>
                    <td className="p-5 font-mono text-gray-400">0.6</td>
                    <td className="p-5 text-gray-300">Glow/lightness intensity (0–1)</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-mono text-gold">className</td>
                    <td className="p-5 text-gray-300">string</td>
                    <td className="p-5 font-mono text-gray-400">—</td>
                    <td className="p-5 text-gray-300">Additional Tailwind classes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* CODE TAB */
        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Install</h3>
            <pre className="bg-black/60 border border-gold/20 rounded-2xl p-8 text-orange text-lg font-mono">
              npx mjolnirui@latest add neuralnet
            </pre>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Usage</h3>
            <pre className="bg-black/60 border border-gold/20 rounded-2xl p-8 overflow-x-auto">
              <code className="text-orange font-mono text-sm">
{`import { NeuralNet } from "@/components/mjolnirui/backgrounds/neural"

<div className="relative w-full h-screen">
  <NeuralNet hue={240} saturation={0.7} chroma={0.8} />
</div>`}
              </code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}