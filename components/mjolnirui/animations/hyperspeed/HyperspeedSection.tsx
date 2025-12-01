"use client";

import React, { useState, useEffect } from "react";
import { Heart, Github, Download } from "lucide-react";
import Hyperspeed, { hyperspeedPresets } from "./Hyperspeed";

declare global {
  interface Window {
    isHyperspeedCodeTab?: boolean;
  }
}

const presetNames = {
  one: "Classic Turbo",
  two: "Neon Drift",
  three: "Cyber Blade",
  four: "Wide Race",
  five: "Sunset Rush",
  six: "Abyss Runner",
  seven: "Bifröst Realm",
} satisfies Record<keyof typeof hyperspeedPresets, string>;

function HyperspeedSection() {
  // Add state for activeTab
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof hyperspeedPresets>("one");

  useEffect(() => {
    (window as Window & typeof globalThis).isHyperspeedCodeTab = activeTab === "code";
    return () => {
      delete (window as Window & typeof globalThis).isHyperspeedCodeTab;
    };
  }, [activeTab]);

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-cyan-400 tracking-tight">
              Hyperspeed
            </h1>
            <span className="bg-cyan-600/30 text-cyan-300 text-sm font-bold px-4 py-1.5 rounded-full border border-cyan-600/50 animate-pulse">
              PREMIUM
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-cyan-400/20 pb-6">
          <div className="flex gap-8 overflow-x-auto scrollbar-hide">
            {(["preview", "code"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-4 capitalize text-lg font-medium transition relative whitespace-nowrap ${
                  activeTab === tab
                    ? "text-cyan-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-cyan-400 after:rounded-full"
                    : "text-gray-500 hover:text-cyan-400"
                }`}
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
              <h3 className="text-2xl font-bold text-gray-200 mb-6">Preview</h3>
              <div className="relative bg-black border border-cyan-400/30 rounded-3xl overflow-hidden shadow-2xl h-96 md:h-[700px]">
                <Hyperspeed preset={selectedPreset} />
              </div>
            </div>

            {/* Controls — NOW FIXED: No duplicate keys */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-gray-200 mb-6">Style Preset</h3>
              <div className="bg-black/40 border border-cyan-400/20 rounded-2xl p-6 space-y-4">
                {Object.keys(hyperspeedPresets).map((key) => {
                  const presetKey = key as keyof typeof hyperspeedPresets;
                  const isBifrost = presetKey === "seven";

                  return (
                    <button
                      key={presetKey} // ← Unique key
                      onClick={() => setSelectedPreset(presetKey)}
                      className={`w-full text-left px-5 py-4 rounded-xl transition font-medium relative overflow-hidden group ${
                        selectedPreset === presetKey
                          ? isBifrost
                            ? "bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white shadow-2xl shadow-purple-600/60"
                            : "bg-cyan-600 text-white shadow-lg shadow-cyan-600/50"
                          : "bg-white/5 hover:bg-white/10 text-gray-300"
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        {isBifrost && <span className="text-2xl animate-pulse">Rainbow</span>}
                        {presetNames[presetKey]}
                      </span>
                      {isBifrost && selectedPreset === "seven" && (
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-cyan-500/30 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Usage */}
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-gray-200 mb-6">Usage</h3>
            <pre className="bg-black/60 border border-cyan-400/20 rounded-2xl p-8 overflow-x-auto text-cyan-300 font-mono text-sm">
{`import Hyperspeed from "@/components/mjolnirui/animations/hyperspeed/Hyperspeed"

// Enter the Bifröst
<Hyperspeed preset="seven" />

// Or go classic
<Hyperspeed preset="six" />`}
            </pre>
          </div>
        </>
      ) : (
        /* CODE TAB */
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-200 mb-6">Install Dependencies</h3>
            <pre className="bg-black/60 border border-cyan-400/20 rounded-2xl p-8 text-orange-400 text-lg font-mono">
              npm install three postprocessing
            </pre>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-200 mb-6">Usage</h3>
            <pre className="bg-black/60 border border-cyan-400/20 rounded-2xl p-8 overflow-x-auto">
              <code className="text-cyan-300 font-mono text-sm">
{`import Hyperspeed from "@/components/mjolnirui/animations/hyperspeed/Hyperspeed"

<div className="relative w-full h-screen">
  <Hyperspeed preset="seven" />
</div>`}
              </code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}

export default HyperspeedSection;