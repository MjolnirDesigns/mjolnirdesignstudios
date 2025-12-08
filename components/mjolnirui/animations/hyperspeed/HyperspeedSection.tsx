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

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function HyperspeedSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof hyperspeedPresets>("seven");

  useEffect(() => {
    window.isHyperspeedCodeTab = activeTab === "code";
    return () => { window.isHyperspeedCodeTab = false; };
  }, [activeTab]);

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gold tracking-tight">
              Hyperspeed
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
                <Hyperspeed preset={selectedPreset} />
              </div>
            </div>

            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Style Preset</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-4">
                {Object.keys(hyperspeedPresets).map((key) => {
                  const presetKey = key as keyof typeof hyperspeedPresets;
                  const isBifrost = presetKey === "seven";

                  return (
                    <button
                      key={presetKey}
                      onClick={() => setSelectedPreset(presetKey)}
                      className={`w-full text-left px-5 py-4 rounded-xl transition font-medium relative overflow-hidden group ${
                        selectedPreset === presetKey
                          ? isBifrost
                            ? "bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white shadow-2xl shadow-purple-600/60"
                            : "bg-gold text-black shadow-lg shadow-gold/50"
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
        </>
      ) : (
        <div className="max-w-7xl mx-auto px-6 space-y-16 py-12">
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Install</h3>
            <pre className="bg-black/60 border border-gold/20 rounded-2xl p-8 text-orange text-lg font-mono">
              npm install three postprocessing
            </pre>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Usage</h3>
            <pre className="bg-black/60 border border-gold/20 rounded-2xl p-8 overflow-x-auto">
              <code className="text-orange font-mono text-sm">
{`import Hyperspeed from "@/components/mjolnirui/animations/hyperspeed/Hyperspeed"

// Enter the Bifröst
<Hyperspeed preset="seven" />

// Classic tunnel
<Hyperspeed preset="one" />`}
              </code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}