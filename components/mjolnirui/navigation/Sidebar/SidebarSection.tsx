"use client";

import React, { useState, useEffect } from "react";
import { Heart, Github, Download, Crown } from "lucide-react"; // ← Crown added here!
import Sidebar from "./Sidebar";

declare global {
  interface Window {
    isSidebarCodeTab?: boolean;
  }
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarSection() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  useEffect(() => {
    window.isSidebarCodeTab = activeTab === "code";
    return () => { window.isSidebarCodeTab = false; };
  }, [activeTab]);

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gold tracking-tight">
              Sidebar
            </h1>
            <span className="bg-emerald-500/20 text-emerald-400 text-sm font-bold px-4 py-1.5 rounded-full border border-emerald-500/50">
              NEW
            </span>
            <span className="bg-purple-600/30 text-purple-400 text-sm font-bold px-4 py-1.5 rounded-full border border-purple-600/50 animate-pulse">
              PRO
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
              <div className="relative bg-black border border-gold/20 rounded-3xl overflow-hidden shadow-2xl h-96 md:h-[700px] flex">
                <Sidebar />
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-silver mb-6">Customize</h3>
              <div className="bg-black/30 border border-gold/10 rounded-2xl p-6 space-y-7">
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold via-yellow-500 to-orange-600 flex items-center justify-center shadow-2xl">
                    <Crown className="w-14 h-14 text-black" />
                  </div>
                  <h4 className="text-2xl font-bold text-gold mb-3">Mjolnir Pro Feature</h4>
                  <p className="text-gray-400 mb-6">
                    Full sidebar customization available only to Pro users.
                  </p>
                  <button className="w-full px-6 py-4 bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-orange-500 text-black font-bold rounded-xl transition shadow-xl text-lg">
                    Upgrade to Pro
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Table */}
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-silver mb-6">Features</h3>
            <div className="bg-black/40 border border-gold/20 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gold/10">
                  <tr>
                    <th className="text-left p-5 font-bold">Feature</th>
                    <th className="text-left p-5 font-bold">Status</th>
                    <th className="text-left p-5 font-bold">Availability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/10">
                  <tr>
                    <td className="p-5 text-gray-300">Pale Gold Hover States</td>
                    <td className="p-5 text-emerald-400 font-bold">Complete</td>
                    <td className="p-5 text-gray-400">Free + Pro</td>
                  </tr>
                  <tr>
                    <td className="p-5 text-gray-300">Smooth Collapse Animation</td>
                    <td className="p-5 text-emerald-400 font-bold">Complete</td>
                    <td className="p-5 text-gray-400">Free + Pro</td>
                  </tr>
                  <tr>
                    <td className="p-5 text-gray-300">God Tier Badge</td>
                    <td className="p-5 text-emerald-400 font-bold">Complete</td>
                    <td className="p-5 text-gray-400">Pro Only</td>
                  </tr>
                  <tr>
                    <td className="p-5 text-gray-300">Pro Upgrade CTA</td>
                    <td className="p-5 text-emerald-400 font-bold">Complete</td>
                    <td className="p-5 text-gray-400">Pro Only</td>
                  </tr>
                  <tr>
                    <td className="p-5 text-gray-300">Custom Font Weight</td>
                    <td className="p-5 text-emerald-400 font-bold">Complete</td>
                    <td className="p-5 text-gray-400">Free + Pro</td>
                  </tr>
                  <tr>
                    <td className="p-5 text-gray-300">2026 Component Release</td>
                    <td className="p-5 text-yellow-400 font-bold">Planned</td>
                    <td className="p-5 text-gray-400">Downloadable</td>
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
              npm install lucide-react
            </pre>
            <p className="text-gray-400 mt-4">
              Uses only Tailwind + Lucide icons. No external dependencies.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-silver mb-6">Usage</h3>
            <pre className="bg-black/60 border border-gold/20 rounded-2xl p-8 overflow-x-auto">
              <code className="text-orange font-mono text-sm">
{`import Sidebar from "@/components/mjolnirui/navigation/Sidebar"

<div className="flex h-screen">
  <Sidebar />
  <main className="flex-1">
    {/* Your content */}
  </main>
</div>`}
              </code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}