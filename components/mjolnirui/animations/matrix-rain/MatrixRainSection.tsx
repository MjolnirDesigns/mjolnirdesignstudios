// components/mjolnirui/animations/matrix-rain/MatrixRainSection.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Copy, Heart, Github } from 'lucide-react';
import { MatrixRain } from './MatrixRain';

declare global {
  interface Window {
    isMatrixRainCodeTab?: boolean;
  }
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

// Accurate RGB → HSL conversion
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// Accurate HSL → HEX
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) { r = c; g = x; b = 0; }
  else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
  else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
  else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
  else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
}

export default function MatrixRainSection() {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [hue, setHue] = useState(120);
  const [speed, setSpeed] = useState(1.0);
  const [specialWord, setSpecialWord] = useState('BITCOIN');
  const [wordChance, setWordChance] = useState(0.001);
  const [specialHue, setSpecialHue] = useState(39);
  const [specialSaturation, setSpecialSaturation] = useState(100);
  const [specialLightness, setSpecialLightness] = useState(65);
  const [installTab, setInstallTab] = useState<'npm' | 'pnpm' | 'yarn'>('npm');
  const [sourceTab, setSourceTab] = useState<'ts' | 'js'>('ts');

  useEffect(() => {
    window.isMatrixRainCodeTab = activeTab === 'code';
    return () => { window.isMatrixRainCodeTab = false; };
  }, [activeTab]);

  const installCommands = {
    npm: 'npx mjolnirui@latest add matrix-rain',
    pnpm: 'pnpm dlx mjolnirui@latest add matrix-rain',
    yarn: 'yarn dlx mjolnirui@latest add matrix-rain',
  };

  const tsSource = `/* Full source code from MatrixRain.tsx */`;

  return (
    <section className="w-full">
      {/* Header — EXACT SAME AS LIGHTNING & GLOBE */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <h1 className="text-5xl md:text-6xl font-bold text-gold tracking-tight">Matrix Rain</h1>
            <span className="bg-emerald-500/20 text-emerald-400 text-sm font-bold px-4 py-1.5 rounded-full border border-emerald-500/50">
              NEW
            </span>
          </div>
          <div className="flex gap-4">
            <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition" title="Like">
              <Heart className="h-6 w-6" />
            </button>
            <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition" title="View on GitHub"><Github className="h-6 w-6" /></button>
          </div>
        </div>

        {/* Tabs — IDENTICAL */}
        <div className="flex gap-8 mb-4 border-b border-gold/20">
          {(['preview', 'code'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-4 px-2 capitalize text-xl font-medium transition relative",
                activeTab === tab ? "text-gold" : "text-gray-400 hover:text-gold"
              )}
            >
              {tab === 'preview' ? 'Preview' : 'Code'}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold rounded-full" />}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'preview' ? (
        <>
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            {/* Preview — EXACT SAME SIZE AS LIGHTNING/GLOBE */}
            <div className="lg:col-span-8">
              <h3 className="text-2xl font-bold text-silver mb-6">Preview</h3>
              <div className="bg-black/40 border border-gold/20 rounded-3xl overflow-hidden shadow-2xl h-96 md:h-[520px] relative">
                <MatrixRain
                  specialWord={specialWord}
                  wordChance={wordChance}
                  specialHue={specialHue}
                  specialSaturation={specialSaturation}
                  specialLightness={specialLightness}
                />
              </div>
            </div>

            {/* CUSTOMIZATION PANEL — IDENTICAL TO LIGHTNING */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7">

                {/* Rain Hue */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-gray-300 font-medium">Rain Hue</label>
                    <span className="text-gold font-mono text-sm">{hue}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={hue}
                    onChange={(e) => setHue(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Rain Hue"
                    placeholder="Select rain hue"
                  />
                </div>

                {/* Speed */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-gray-300 font-medium">Speed</label>
                    <span className="text-gold font-mono text-sm">{speed}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.25"
                    value={speed}
                    onChange={(e) => setSpeed(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust rain speed"
                    placeholder="Select speed"
                  />
                </div>

                {/* Special Word */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Special Word</label>
                  <input
                    type="text"
                    value={specialWord}
                    onChange={(e) => setSpecialWord(e.target.value.toUpperCase())}
                    placeholder="e.g. MJOLNIR"
                    className="w-full px-4 py-2 bg-black/50 border border-gold/20 rounded-lg text-white focus:outline-none focus:border-gold uppercase tracking-wider font-mono"
                  />
                </div>

                {/* Special Word Color — NOW 100% ACCURATE */}
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Special Word Color</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={hslToHex(specialHue, specialSaturation, specialLightness)}
                      onChange={(e) => {
                        const hex = e.target.value;
                        const r = parseInt(hex.slice(1, 3), 16);
                        const g = parseInt(hex.slice(3, 5), 16);
                        const b = parseInt(hex.slice(5, 7), 16);
                        const { h, s, l } = rgbToHsl(r, g, b);
                        setSpecialHue(h);
                        setSpecialSaturation(s);
                        setSpecialLightness(l);
                      }}
                      className="w-20 h-20 rounded-xl cursor-pointer border-4 border-gold/40 shadow-lg hover:scale-105 transition"
                      title="Pick special word color"
                    />
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 w-4">H</span>
                        <span className="text-gold font-mono text-lg">{specialHue}°</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 w-4">S</span>
                        <span className="text-gold font-mono text-lg">{specialSaturation}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 w-4">L</span>
                        <span className="text-gold font-mono text-lg">{specialLightness}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Word Chance */}
                {/* Word Chance — 0.1% to 0.5% */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-gray-300 font-medium">Special Word Chance</label>
                    <span className="text-gold font-mono text-sm">{(wordChance * 1000).toFixed(1)}‰</span>
                  </div>
                  <input id="word-chance"
                    type="range"
                    min="0.001"
                    max="0.005"
                    step="0.0005"
                    value={wordChance}
                    onChange={(e) => setWordChance(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Adjust the chance of the special word appearing"
                    placeholder="Set special word chance"
                  />
                </div>

                {/* Reset */}
                <div className="pt-4 border-t border-gold/20">
                  <button
                    onClick={() => {
                      setHue(120);
                      setSpeed(1.0);
                      setSpecialWord("BITCOIN");
                      setSpecialHue(39);
                      setSpecialSaturation(100);
                      setSpecialLightness(65);
                      setWordChance(0.001); // Back to original
                    }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-black font-bold rounded-xl transition"
                  >
                    Reset to Default
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Props Table — IDENTICAL TO LIGHTNING */}
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
                  {[
                    { prop: 'hue', type: 'number', def: '120', desc: 'Base rain color hue (0–360)' },
                    { prop: 'speed', type: 'number', def: '1.0', desc: 'Rain fall speed multiplier' },
                    { prop: 'specialWord', type: 'string', def: '"BITCOIN"', desc: 'Word that appears in custom color' },
                    { prop: 'specialHue', type: 'number', def: '39', desc: 'Special word hue' },
                    { prop: 'specialSaturation', type: 'number', def: '100', desc: 'Special word saturation %' },
                    { prop: 'specialLightness', type: 'number', def: '65', desc: 'Special word lightness %' },
                    { prop: 'wordChance', type: 'number', def: '0.01', desc: 'Chance of special word appearing (0–5%)' },
                  ].map((row) => (
                    <tr key={row.prop} className="hover:bg-white/5 transition">
                      <td className="p-5 font-mono text-gold">{row.prop}</td>
                      <td className="p-5 text-gray-300">{row.type}</td>
                      <td className="p-5 font-mono text-gray-400">{row.def}</td>
                      <td className="p-5 text-gray-300">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* CODE TAB — FULL WIDTH */
        <div className="space-y-16">
          {/* Install */}
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Install</h3>
            <div className="flex gap-3 mb-6">
              {(['npm', 'pnpm', 'yarn'] as const).map((pkg) => (
                <button
                  key={pkg}
                  onClick={() => setInstallTab(pkg)}
                  className={cn(
                    "px-6 py-3 rounded-t-2xl text-sm font-medium transition",
                    installTab === pkg ? "bg-gold/20 text-gold border-t-2 border-x-2 border-gold/50" : "text-gray-400 hover:text-gold"
                  )}
                >
                  {pkg}
                </button>
              ))}
            </div>
            <pre className="bg-black/60 border border-gold/20 rounded-2xl p-8 text-orange text-lg font-mono flex justify-between items-center">
              {installCommands[installTab]}
              <button
                className="ml-8 p-3 hover:bg-white/10 rounded-lg transition"
                title="Copy install command"
                aria-label="Copy install command"
              >
                <Copy className="h-5 w-5" />
              </button>
            </pre>
          </div>

          {/* Usage */}
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Usage</h3>
            <pre className="bg-black/60 border border-gold/20 rounded-2xl p-8 overflow-x-auto">
              <code className="text-orange font-mono text-sm leading-relaxed">
{`import { MatrixRain } from "@/components/mjolnirui/animations/matrix-rain"

<div className="relative w-full h-screen">
  <MatrixRain
    hue={${hue}}
    speed={${speed}}
    specialWord="${specialWord}"
    specialHue={${specialHue}}
    specialSaturation={${specialSaturation}}
    specialLightness={${specialLightness}}
    wordChance={${wordChance}}
  />
</div>`}
              </code>
            </pre>
          </div>

          {/* Source Code */}
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Source Code</h3>
            <div className="flex gap-3 mb-6">
              {(['ts', 'js'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSourceTab(tab)}
                  className={cn(
                    "px-6 py-3 rounded-t-2xl text-sm font-medium transition",
                    sourceTab === tab ? "bg-gold/20 text-gold border-t-2 border-x-2 border-gold/50" : "text-gray-400 hover:text-gold"
                  )}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
            <pre className="bg-black/60 border border-gold/20 rounded-2xl p-8 overflow-x-auto text-xs">
              <code className="text-orange font-mono leading-tight">
                {sourceTab === 'ts' ? tsSource : '// JavaScript version coming soon'}
              </code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}