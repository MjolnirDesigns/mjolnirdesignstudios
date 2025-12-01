"use client";

// Extend the Window interface to include isGlobeCodeTab
declare global {
  interface Window {
    isGlobeCodeTab?: boolean;
  }
}

import React, { useState, useEffect } from 'react';
import { Copy, Heart, Github } from 'lucide-react';
import { Globe } from './Globe';

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function GlobeSection() {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [globeColor, setGlobeColor] = useState('#1d072e');
  const [emissiveIntensity, setEmissiveIntensity] = useState(0.1);
  const [atmosphereColor, setAtmosphereColor] = useState('#ffffff');
  const [arcColor, setArcColor] = useState('#06b6d4');
  const [autoRotateSpeed, setAutoRotateSpeed] = useState(0.5);
  const [sourceTab, setSourceTab] = useState<'ts' | 'js'>('ts');
  const [installTab, setInstallTab] = useState<'npm' | 'pnpm' | 'yarn'>('npm');

  useEffect(() => {
    window.isGlobeCodeTab = activeTab === 'code';
    return () => { window.isGlobeCodeTab = false; };
  }, [activeTab]);

  const installCommands = {
    npm: 'npx mjolnirui@latest add globe',
    pnpm: 'pnpm dlx mjolnirui@latest add globe',
    yarn: 'yarn dlx mjolnirui@latest add globe',
  };

  const tsSource = `import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ThreeGlobe from "three-globe";
import { Scene, Color, Fog, AmbientLight, DirectionalLight, PointLight } from "three";

interface GlobeProps {
  globeColor?: string;
  emissiveIntensity?: number;
  atmosphereColor?: string;
  arcColor?: string;
  autoRotateSpeed?: number;
}

export function Globe({ 
  globeColor = "#1d072e",
  emissiveIntensity = 0.1,
  atmosphereColor = "#ffffff",
  arcColor = "#06b6d4",
  autoRotateSpeed = 0.5,
}: GlobeProps) {
  const globeRef = useRef<ThreeGlobe>(new ThreeGlobe());

  const sampleArcs = [
    { startLat: -19.9, startLng: -43.9, endLat: -22.9, endLng: -43.2, arcAlt: 0.3, color: arcColor },
    // ... more arcs
  ];

  useEffect(() => {
    if (!globeRef.current) return;

    const globe = globeRef.current
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
      .showAtmosphere(true)
      .atmosphereColor(atmosphereColor)
      .atmosphereAltitude(0.1)
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .hexPolygonColor(() => "rgba(255,255,255,0.7)")
      .globeMaterial({
        color: new Color(globeColor),
        emissive: new Color("#000000"),
        emissiveIntensity,
        shininess: 0.9,
      })
      .arcsData(sampleArcs)
      .arcColor("color")
      .arcDashLength(0.9)
      .arcDashGap(4)
      .arcDashAnimateTime(1000)
      .arcStroke(0.5)
      .pointsData(sampleArcs.flatMap((a) => [
        { lat: a.startLat, lng: a.startLng, size: 4 },
        { lat: a.endLat, lng: a.endLng, size: 4 },
      ]))
      .pointAltitude(0)
      .pointRadius(1.5);

    // ... rest of your code
  }, [globeColor, emissiveIntensity, atmosphereColor, arcColor]);

  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      <Canvas camera={{ fov: 50, near: 0.1, far: 1000, position: [0, 0, 300] }}>
        <ambientLight color="#ffffff" intensity={0.6} />
        <directionalLight position={[-400, 100, 400]} intensity={1} />
        <directionalLight position={[-200, 500, 200]} intensity={1} />
        <pointLight position={[-200, 500, 200]} intensity={0.8} />
        <ThreeGlobe ref={globeRef} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={autoRotateSpeed}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}`;

  return (
    <section className="w-full">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <h1 className="text-5xl md:text-6xl font-bold text-gold tracking-tight">Globe</h1>
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

        {/* Tabs — FIXED POSITION */}
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
        /* PREVIEW TAB — YOUR PERFECT LAYOUT */
        <>
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-8">
              <h3 className="text-2xl font-bold text-silver mb-6">Preview</h3>
              <div className="bg-black/40 border border-gold/20 rounded-3xl overflow-hidden shadow-2xl h-96 md:h-[520px] relative">
                <Globe
                  globeColor={globeColor}
                  emissiveIntensity={emissiveIntensity}
                  atmosphereColor={atmosphereColor}
                  arcColor={arcColor}
                  autoRotateSpeed={autoRotateSpeed}
                />
              </div>
            </div>

            {/* CUSTOMIZATION PANEL */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7">
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Globe Color</label>
                  <input
                    type="color"
                    value={globeColor}
                    onChange={(e) => setGlobeColor(e.target.value)}
                    className="w-full h-10 rounded cursor-pointer"
                    title="Globe Color"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Arc Color</label>
                  <input
                    type="color"
                    value={arcColor}
                    onChange={(e) => setArcColor(e.target.value)}
                    className="w-full h-10 rounded cursor-pointer"
                    title="Arc Color"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-medium block mb-2">Atmosphere Color</label>
                  <input
                    type="color"
                    value={atmosphereColor}
                    onChange={(e) => setAtmosphereColor(e.target.value)}
                    className="w-full h-10 rounded cursor-pointer"
                    title="Atmosphere Color"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-gray-300 font-medium">Emissive Intensity</label>
                    <span className="text-gold font-mono text-sm">{emissiveIntensity.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={emissiveIntensity}
                    onChange={(e) => setEmissiveIntensity(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Emissive Intensity"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-gray-300 font-medium">Rotation Speed</label>
                    <span className="text-gold font-mono text-sm">{autoRotateSpeed.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={autoRotateSpeed}
                    onChange={(e) => setAutoRotateSpeed(+e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                    title="Rotation Speed"
                  />
                </div>
                {/* Reset Button */}
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setGlobeColor('#1d072e');
                      setEmissiveIntensity(0.1);
                      setAtmosphereColor('#ffffff');
                      setArcColor('#06b6d4');
                      setAutoRotateSpeed(0.5);
                    }}
                    className="w-full px-6 py-3 bg-gold/20 hover:bg-gold/30 text-gold font-bold rounded-xl transition"
                  >
                    Reset to Default
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
                  <tr><td className="p-5 font-mono text-gold">globeColor</td><td className="p-5 text-gray-300">string</td><td className="p-5 font-mono text-gray-400">#1d072e</td><td className="p-5 text-gray-300">Base globe color</td></tr>
                  <tr><td className="p-5 font-mono text-gold">emissiveIntensity</td><td className="p-5 text-gray-300">number</td><td className="p-5 font-mono text-gray-400">0.1</td><td className="p-5 text-gray-300">Glow intensity (0-1)</td></tr>
                  <tr><td className="p-5 font-mono text-gold">atmosphereColor</td><td className="p-5 text-gray-300">string</td><td className="p-5 font-mono text-gray-400">#ffffff</td><td className="p-5 text-gray-300">Atmosphere glow color</td></tr>
                  <tr><td className="p-5 font-mono text-gold">arcColor</td><td className="p-5 text-gray-300">string</td><td className="p-5 font-mono text-gray-400">#06b6d4</td><td className="p-5 text-gray-300">Connection arc color</td></tr>
                  <tr><td className="p-5 font-mono text-gold">autoRotateSpeed</td><td className="p-5 text-gray-300">number</td><td className="p-5 font-mono text-gray-400">0.5</td><td className="p-5 text-gray-300">Rotation speed (0-2)</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
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
              <button className="ml-8 p-3 hover:bg-white/10 rounded-lg transition" title="Copy install command">
                <Copy className="h-5 w-5" />
              </button>
            </pre>
          </div>

          {/* Usage */}
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Usage</h3>
            <pre className="bg-black/60 border border-gold/20 rounded-2xl p-8 overflow-x-auto">
              <code className="text-orange font-mono text-sm leading-relaxed">
{`import { Globe } from "@/components/mjolnirui/animations/globe"

<div className="relative w-full h-96">
  <Globe 
    globeColor="#1d072e"
    emissiveIntensity={0.1}
    atmosphereColor="#ffffff"
    arcColor="#06b6d4"
    autoRotateSpeed={0.5}
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