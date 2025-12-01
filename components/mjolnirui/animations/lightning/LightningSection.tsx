"use client";

import React, { useState, useEffect } from 'react';
import { Copy, Heart, Github } from 'lucide-react';
import Lightning from './Lightning';

declare global {
  interface Window {
    isLightningCodeTab?: boolean;
  }
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function LightningSection() {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [hue, setHue] = useState(220);
  const [xOffset, setXOffset] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [intensity, setIntensity] = useState(1);
  const [size, setSize] = useState(1);
  const [sourceTab, setSourceTab] = useState<'ts' | 'js'>('ts');
  const [installTab, setInstallTab] = useState<'npm' | 'pnpm' | 'yarn'>('npm');

  // Clean global flag
  useEffect(() => {
    window.isLightningCodeTab = activeTab === 'code';
    return () => { window.isLightningCodeTab = false; };
  }, [activeTab]);

  const installCommands = {
    npm: 'npx mjolnirui@latest add lightning',
    pnpm: 'pnpm dlx mjolnirui@latest add lightning',
    yarn: 'yarn dlx mjolnirui@latest add lightning',
  };

  const tsSource = `import React, { useRef, useEffect } from 'react';
import './Lightning.css';

interface LightningProps {
  hue?: number;
  xOffset?: number;
  speed?: number;
  intensity?: number;
  size?: number;
}

const Lightning: React.FC<LightningProps> = ({ 
  hue = 230, 
  xOffset = 0, 
  speed = 1, 
  intensity = 1, 
  size = 1 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // ... [your full WebGL shader code] ...

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [hue, xOffset, speed, intensity, size]);

  return <canvas ref={canvasRef} className="lightning-container" />;
};

export default Lightning;`;

  return (
    <section className="w-full">
      {/* Header — ALWAYS SAME WIDTH */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <h1 className="text-5xl md:text-6xl font-bold text-gold tracking-tight">Lightning</h1>
            <span className="bg-emerald-500/20 text-emerald-400 text-sm font-bold px-4 py-1.5 rounded-full border border-emerald-500/50">
              NEW
            </span>
          </div>
          <div className="flex gap-4">
            <button
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition"
              title="Like"
              aria-label="Like"
            >
              <Heart className="h-6 w-6" />
            </button>
            <button
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition"
              title="View on GitHub"
              aria-label="View on GitHub"
            >
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
                <Lightning hue={hue} xOffset={xOffset} speed={speed} intensity={intensity} size={size} />
              </div>
            </div>

            {/* CUSTOMIZATION PANEL */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7">
                {[
                  { label: 'Hue', value: hue, set: setHue, min: 0, max: 360 },
                  { label: 'X Offset', value: xOffset, set: setXOffset, min: -100, max: 100 },
                  { label: 'Speed', value: speed, set: setSpeed, min: 0.1, max: 3, step: 0.1 },
                  { label: 'Intensity', value: intensity, set: setIntensity, min: 0.5, max: 2, step: 0.1 },
                  { label: 'Size', value: size, set: setSize, min: 0.5, max: 2, step: 0.1 },
                ].map(({ label, value, set, min, max, step = 1 }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-2">
                      <label className="text-gray-300 font-medium">{label}</label>
                      <span className="text-gold font-mono text-sm">{value.toFixed(step < 1 ? 1 : 0)}</span>
                    </div>
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={step}
                      value={value}
                      onChange={(e) => set(+e.target.value)}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                      title={label}
                    />
                  </div>
                ))}
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
                  {[
                    { prop: 'hue', type: 'number', def: '220', desc: 'Lightning color hue (0–360)' },
                    { prop: 'xOffset', type: 'number', def: '0', desc: 'Horizontal bolt offset' },
                    { prop: 'speed', type: 'number', def: '1', desc: 'Animation speed multiplier' },
                    { prop: 'intensity', type: 'number', def: '1', desc: 'Glow & brightness strength' },
                    { prop: 'size', type: 'number', def: '1', desc: 'Overall bolt scale' },
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
{`import Lightning from "@/components/mjolnirui/lightning"

<div className="relative w-full h-screen">
  <Lightning hue={${hue}} xOffset={${xOffset}} speed={${speed}} intensity={${intensity}} size={${size}} />
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