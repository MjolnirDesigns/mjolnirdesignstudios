// app/components/page.tsx
"use client";

import React, { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Footer from "@/components/Footer";
import { navItems } from "@/data";
import { ChevronDown, ChevronRight, Zap, Hammer, Shield, Sparkles } from "lucide-react";


// Animation Components
import AtmosphereSection from "@/components/mjolnirui/animations/atmosphere/AtmosphereSection";
import AuraWavesSection from "@/components/mjolnirui/animations/aurora/AuraWavesSection";
import BlackHoleSection from "@/components/mjolnirui/animations/black-hole/BlackHoleSection";
import GlobeSection from "@/components/mjolnirui/animations/globe/GlobeSection";
import HyperspeedSection from "@/components/mjolnirui/animations/hyperspeed/HyperspeedSection";
import LaserFlowSection from "@/components/mjolnirui/animations/laser-flow/LaserFlowSection";
import LightningSection from "@/components/mjolnirui/animations/lightning/LightningSection";
import MatrixRainSection from "@/components/mjolnirui/animations/matrix-rain/MatrixRainSection";
import SwirlingGasSection from "@/components/mjolnirui/animations/swirling-gas/SwirlingGasSection";


// Background Components
import AtomicSection from "@/components/mjolnirui/backgrounds/atomic/AtomicSection";
import BiFrostSection from "@/components/mjolnirui/backgrounds/bifrost/BiFrostSection";
import ColorHaloSection from "@/components/mjolnirui/backgrounds/color-halo/ColorHaloSection";
import DarkVeilSection from "@/components/mjolnirui/backgrounds/dark-veil/DarkVeilSection";
import GravityLensSection from "@/components/mjolnirui/backgrounds/gravity-lens/GravityLensSection";
import LiquidEtherSection from "@/components/mjolnirui/backgrounds/liquid-ether/LiquidEtherSection";
import LiquidRibbonsSection from "@/components/mjolnirui/backgrounds/liquid-ribbons/LiquidRibbonsSection"
import NeuralNetSection from "@/components/mjolnirui/backgrounds/neural/NeuralNetSection";
import PrismSection from "@/components/mjolnirui/backgrounds/prism/PrismSection";
import SilkyLinesSection from "@/components/mjolnirui/backgrounds/silky-lines/SilkyLinesSection";
import SmokeSection from "@/components/mjolnirui/backgrounds/smoke/SmokeSection";
import StarsBackgroundSection from "@/components/mjolnirui/backgrounds/stars/StarsBackgroundSection";
import VortexSection from "@/components/mjolnirui/backgrounds/vortex/VortexSection";


// Navigation Components
// import FloatingNavSection from "@/components/mjolnirui/navigation/floating-nav/FloatingNavSection";
import CardNavSection from "@/components/mjolnirui/navigation/Card-Nav/CardNavSection";
import SidebarSection from "@/components/mjolnirui/navigation/Sidebar/SidebarSection";






// Placeholder Component
function ComingSoon({ name }: { name: string }) {
  return (
    <div className="py-32 text-center">
      <h2 className="text-6xl font-bold text-gold mb-6">{name}</h2>
      <p className="text-2xl text-gray-400">Forged in heart of a dying star... Coming soon.</p>
    </div>
  );
}

// GET STARTED: Real Sections
function IntroductionSection() {
  return (
    <div className="max-w-5xl mx-auto py-16 space-y-20">
      {/* Hero */}
      <div className="text-center">
        <h1 className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent leading-tight">
          MjolnirUI
        </h1>
        <p className="text-3xl md:text-4xl text-gray-300 mt-6 font-light">Wield the Power of Mjolnir!</p>
        <p className="text-xl md:text-2xl text-gray-500 mt-6 max-w-4xl mx-auto leading-relaxed">
          A premium collection of React + Tailwind components. 
          Built for swift implementation and powerful UI/UX design worthy of Asgard.
        </p>
      </div>

      <div className="text-center py-12">
        <p className="text-2xl text-gold font-medium italic">
          “Mjolnir.. A Tool to Build!”
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-10">
        {[
          { icon: Zap, title: "Lightning Fast", desc: "Zero runtime. Pure React & Tailwind. Legendary design and performance." },
          { icon: Hammer, title: "Hand-Forged", desc: "Every animation is crafted with Asgardian precision, forged for maximum impact." },
          { icon: Shield, title: "Battle-Tested", desc: "Used by Midgard's elite deverlopers, and Asgard's digital warriors." },
        ].map((item) => (
          <div key={item.title} className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gold/20 to-yellow-600/20 rounded-3xl flex items-center justify-center border border-gold/30">
              <item.icon className="w-12 h-12 text-gold" />
            </div>
            <h3 className="text-2xl font-bold text-gold mb-3">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Philosophy */}
      <div className="bg-black/40 border border-gold/20 rounded-3xl p-12 mt-20">
        <h2 className="text-4xl font-bold text-gold mb-8 text-center">MjolnirUI - A Tool to Build!</h2>
        <p className="text-xl text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
          Like <span className="text-gold">shadcn/ui</span> and <span className="text-gold">Magic UI</span>, and <span className="text-gold">React Bits</span> MjolnirUI is not installed from npm.
          MjolnirUI an open collection of premium animated UI components. Modify, extend, destroy, rebuild — this is your tool to forge your own powerful UI/UX and animated web project.
        </p>
      </div>

      {/* What's Included */}
      <div className="mt-20">
        <h2 className="text-4xl font-bold text-gold text-center mb-12">What’s Included</h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {[
            { title: "Animations", desc: "Globe, Lightning, Matrix Rain, Aurora, HyperSpeed" },
            { title: "Backgrounds", desc: "Liquid Ether, Prism Veil, Dark Veil, Silk Lines" },
            { title: "Text Effects", desc: "HyperText, TextReveal, LetterGlitch, TextMorph" },
            { title: "Components", desc: "Buttons, Cards, Avatars, Pricing, Loaders" },
            { title: "Navigation", desc: "FloatingNav, StickyNav, CardNav, Sidebars" },
            { title: "Bento Grids", desc: "BentoBox, BentoGrid, BentoTrio, BentoOcto" },
          ].map((item) => (
            <div key={item.title} className="bg-white/5 border border-gold/10 rounded-2xl p-8 hover:bg-white/10 transition">
              <h3 className="text-2xl font-bold text-gold mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why MjolnirUI */}
      <div className="mt-24 bg-gradient-to-b from-transparent via-gold/5 to-transparent py-20 rounded-3xl">
        <h2 className="text-5xl font-bold text-gold text-center mb-16">Why MjolnirUI?</h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {[
            "Open source & copy-first — own your code",
            "Animation-first, powered by Framer Motion + Three.js",
            "Performance & accessibility by default",
            "Style-agnostic — fits any design system",
            "Complementary to shadcn/ui, Magic UI, Aceternity",
            "Built for warriors — not tourists",
          ].map((point, i) => (
            <div key={i} className="flex items-start gap-4">
              <Sparkles className="w-8 h-8 text-gold mt-1 flex-shrink-0" />
              <p className="text-xl text-gray-300">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InstallationSection() { return <ComingSoon name="Installation" />; }
function MissionSection() { return <ComingSoon name="Mission" />; }
function RoadmapSection() { return <ComingSoon name="Roadmap" />; }
function VisionSection() { return <ComingSoon name="Vision" />; }

// Placeholder Sections (for future components)
function TemplateSection({ name }: { name: string }) { return <ComingSoon name={name} />; }
function AnimationSection({ name }: { name: string }) { return <ComingSoon name={name} />; }
function TextSection({ name }: { name: string }) { return <ComingSoon name={name} />; }
function ComponentSection({ name }: { name: string }) { return <ComingSoon name={name} />; }
function ButtonsSection() { return <ComingSoon name="Buttons" />; }
function CardsSection() { return <ComingSoon name="Cards" />; }
function FormsSection() { return <ComingSoon name="Forms" />; }
function NavSection({ name }: { name: string }) { return <ComingSoon name={name} />; }
function BentoSection({ name }: { name: string }) { return <ComingSoon name={name} />; }
function ScrollSection({ name }: { name: string }) { return <ComingSoon name={name} />; }
function EffectSection({ name }: { name: string }) { return <ComingSoon name={name} />; }
function WidgetSection({ name }: { name: string }) { return <ComingSoon name={name} />; }
function AvatarSection() { return <ComingSoon name="Avatars" />; }


// cn utility
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// FULL CATEGORY STRUCTURE — PRESERVED & ORGANIZED
type SubItem = {
  id: string;
  name: string;
  content: React.ReactNode;
  new?: boolean;
};

type Category = {
  category: string;
  openByDefault?: boolean;
  subItems: SubItem[];
};

const categories: Category[] = [
  {
    category: "Get Started",
    openByDefault: true,
    subItems: [
      { id: "introduction", name: "Introduction", content: <IntroductionSection /> },
      { id: "installation", name: "Installation", content: <InstallationSection /> },
      { id: "mission", name: "Mission", content: <MissionSection /> },
      { id: "roadmap", name: "Roadmap", content: <RoadmapSection /> },
      { id: "vision", name: "Vision", content: <VisionSection /> },
    ],
  },
  {
    category: "Templates",
    subItems: [
      { id: "hero-template", name: "Hero Landing", content: <TemplateSection name="Hero Landing" /> },
      { id: "pricing-template", name: "Pricing Page", content: <TemplateSection name="Pricing Page" /> },
    ],
  },
  {
    category: "Animations",
    subItems: [
      { id: "atmosphere", name: "Atmosphere", new: true, content: <AtmosphereSection /> },
      { id: "aurora", name: "Aura Waves", new: true, content: <AuraWavesSection /> },
      { id: "black-hole", name: "Black Hole", new: true, content: <BlackHoleSection /> },
      { id: "globe", name: "Globe", new: true, content: <GlobeSection /> },
      { id: "hyper-speed", name: "HyperSpeed", new: true, content: <HyperspeedSection /> },
      { id: "laser-flow", name: "Laser Flow", new: true, content: <LaserFlowSection /> },
      { id: "letter-glitch", name: "Letter Glitch", new: true, content: <AnimationSection name="Letter Glitch" /> },
      { id: "lightning", name: "Lightning", new: true, content: <LightningSection /> },
      { id: "light-rays", name: "Light Rays", new: true, content: <AnimationSection name="Light Rays" /> },
      { id: "masonry", name: "Masonry", new: true, content: <AnimationSection name="Masonry" /> },
      { id: "matrix-rain", name: "Matrix Rain", new: true, content: <MatrixRainSection /> },
      { id: "roadmap", name: "RoadMap", new: true, content: <AnimationSection name="RoadMap" /> },
      { id: "swirling-gas", name: "Swirling Gas", new: true, content: <SwirlingGasSection /> },
      { id: "world-map", name: "WorldMap", new: true, content: <AnimationSection name="WorldMap" /> },
    ],
  },
  {
    category: "Backgrounds",
    subItems: [
      { id: "atomic", name: "Atomic", new: true, content: <AtomicSection /> },
      { id: "bifrost", name: "BiFrost", new: true, content: <BiFrostSection /> },
      { id: "color-halo", name: "Color Halo", new: true, content: <ColorHaloSection /> },
      { id: "dark-veil", name: "Dark Veil", new: true, content: <DarkVeilSection /> },
      { id: "gravity-lens", name: "Gravity Lens", new: true, content: <GravityLensSection /> },
      { id: "liquid-ether", name: "Liquid Ether", new: true, content: <LiquidEtherSection /> },
      { id: "liquid-ribbons", name: "Liquid Ribbons", new: true, content: <LiquidRibbonsSection /> },
      { id: "neural-net", name: "Neural Net", new: true, content: <NeuralNetSection /> },
      { id: "prism", name: "Prism", new: true, content: <PrismSection /> },
      { id: "silk-lines", name: "Silky Lines", new: true, content: <SilkyLinesSection /> },
      { id: "smoke", name: "Smoke", new: true, content: <SmokeSection /> },
      { id: 'stars-background', name: 'Stars', new: true, content: <StarsBackgroundSection /> },
      { id: 'swirling-gas', name: 'Swirling Gas', new: true, content: <SwirlingGasSection /> },
      { id: 'vortex', name: 'Vortex', new: true, content: <VortexSection /> },
    ],
  },
  // ... ALL OTHER CATEGORIES 100% PRESERVED BELOW ...
  {
    category: "Text Effects",
    subItems: [
      { id: "hyper-text", name: "HyperText", content: <TextSection name="HyperText" /> },
      { id: "number-ticket", name: "NumberTicket", content: <TextSection name="NumberTicket" /> },
      { id: "text-animation", name: "TextAnimation", content: <TextSection name="TextAnimation" /> },
      { id: "text-gradient", name: "TextGradient", content: <TextSection name="TextGradient" /> },
      { id: "text-morph", name: "TextMorph", content: <TextSection name="TextMorph" /> },
      { id: "text-reveal", name: "TextReveal", content: <TextSection name="TextReveal" /> },
      { id: "text-rotate", name: "TextRotate", content: <TextSection name="TextRotate" /> },
      { id: "text-type", name: "TextType", content: <TextSection name="TextType" /> },
      { id: "text-wave", name: "TextWave", content: <TextSection name="TextWave" /> },
    ],
  },
  {
    category: "Components",
    subItems: [
      { id: "avatars", name: "Avatars", content: <AvatarSection /> },
      { id: "badges", name: "Badges", content: <ComponentSection name="Badges" /> },
      { id: "buttons", name: "Buttons", content: <ButtonsSection /> },
      { id: "cards", name: "Cards", content: <CardsSection /> },
      { id: "carousel", name: "Carousel", content: <ComponentSection name="Carousel" /> },
      { id: "forms", name: "Forms", content: <FormsSection /> },
      { id: "loaders", name: "Loaders", content: <ComponentSection name="Loaders" /> },
      { id: "marquee", name: "Marquee", content: <ComponentSection name="Marquee" /> },
      { id: "pricing-cards", name: "Pricing Cards", content: <ComponentSection name="Pricing Cards" /> },
      { id: "socials", name: "Socials", content: <ComponentSection name="Socials" /> },
      { id: "stat-box", name: "StatBox", content: <ComponentSection name="StatBox" /> },
    ],
  },
  {
    category: "Navigation",
    subItems: [
      { id: "card-nav", name: "CardNav", new: true, content: <CardNavSection /> },
      { id: "floating-doc", name: "Floating Doc", content: <NavSection name="Floating Doc" /> },
      { id: "floating-nav", name: "FloatingNav", content: <NavSection name="FloatingNav" /> },
      { id: "navbars", name: "Navbars", content: <NavSection name="Navbars" /> },
      { id: "sidebar", name: "Sidebar", new: true, content: <SidebarSection /> },
      { id: "sticky-nav", name: "StickyNav", content: <NavSection name="StickyNav" /> },
      { id: "thumb-nav-test", name: "ThumbNav Test", content: <NavSection name="ThumbNav Test" /> },
    ],
  },
  {
    category: "Bento Grids",
    subItems: [
      { id: "bento-box", name: "BentoBox", content: <BentoSection name="BentoBox" /> },
      { id: "bento-grid", name: "BentoGrid", content: <BentoSection name="BentoGrid" /> },
      { id: "bento-octo", name: "BentoOcto", content: <BentoSection name="BentoOcto" /> },
      { id: "bento-trio", name: "BentoTrio", content: <BentoSection name="BentoTrio" /> },
    ],
  },
  {
    category: "Scroll Triggers",
    subItems: [
      { id: "parallax-hero", name: "Parallax Hero", content: <ScrollSection name="Parallax Hero" /> },
    ],
  },
  {
    category: "Special Effects",
    subItems: [
      { id: "glass-morph", name: "Glass Morph", content: <EffectSection name="Glass Morph" /> },
      { id: "particle-blends", name: "Particle Blends", new: true, content: <EffectSection name="Particle Blends" /> },
    ],
  },
  {
    category: "Widgets",
    subItems: [
      { id: "battery", name: "Battery", content: <WidgetSection name="Battery" /> },
      { id: "clock", name: "Clock", content: <WidgetSection name="Clock" /> },
      { id: "expenses-block", name: "Expenses Block", content: <WidgetSection name="Expenses Block" /> },
      { id: "ticker", name: "Ticker", content: <WidgetSection name="Ticker" /> },
      { id: "score-board", name: "ScoreBoard", content: <WidgetSection name="ScoreBoard" /> },
      { id: "weather", name: "Weather", content: <WidgetSection name="Weather" /> },
    ],
  },
];

export default function ComponentsPage() {
  const [activeCategory, setActiveCategory] = useState("Get Started");
  const [activeSubItem, setActiveSubItem] = useState("introduction");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => new Set(["Get Started"]));

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  const currentContent =
    categories
      .find((cat) => cat.category === activeCategory)
      ?.subItems.find((sub) => sub.id === activeSubItem)?.content ?? <IntroductionSection />;

  return (
    <div className="min-h-screen flex flex-col bg-shadow text-silver-100 overflow-hidden">
      <FloatingNav navItems={navItems} />
      <Navbar />

      <main className="flex-1 flex w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row min-h-screen w-full">
          {/* SIDEBAR — FULLY PRESERVED */}
          <aside className="lg:w-80 xl:w-96 mb-8 lg:mb-0 sticky top-0 h-screen overflow-y-auto px-6 lg:px-0">
            <div className="py-8">
              <h2 className="text-4xl font-bold text-gold mb-10">MjolnirUI Forge</h2>

              <ul className="space-y-4">
                {categories.map((cat) => (
                  <li key={cat.category}>
                    <button
                      onClick={() => toggleCategory(cat.category)}
                      className="flex items-center justify-between w-full py-4 px-4 rounded-lg hover:bg-white/5 transition font-bold text-xl"
                    >
                      <span className={activeCategory === cat.category ? "text-gold" : "text-gray-300"}>
                        {cat.category}
                      </span>
                      {expandedCategories.has(cat.category) ? (
                        <ChevronDown className="h-5 w-5 text-gold" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                    </button>

                    {expandedCategories.has(cat.category) && (
                      <ul className="mt-2 space-y-1 border-l-2 border-gold/30 ml-6 pl-6">
                        {cat.subItems.map((sub) => (
                          <li key={sub.id}>
                            <button
                              onClick={() => {
                                setActiveCategory(cat.category);
                                setActiveSubItem(sub.id);
                              }}
                              className={cn(
                                "flex items-center justify-between w-full py-3 px-4 rounded-lg text-left text-sm transition",
                                activeSubItem === sub.id
                                  ? "bg-gold/10 text-gold font-medium"
                                  : "text-gray-400 hover:text-gold hover:bg-white/5"
                              )}
                            >
                              <span>{sub.name}</span>
                              {sub.new && (
                                <span className="ml-4 bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/50">
                                  NEW
                                </span>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-12 pt-8 border-t border-gold/20">
                <a
                  href="/pricing"
                  className="block w-full bg-gradient-to-r from-gold to-yellow-500 text-black font-bold py-4 px-6 rounded-xl text-center hover:from-yellow-500 hover:to-gold transition text-lg shadow-lg"
                >
                  MjolnirUI Pro
                </a>
                <p className="text-xs text-gray-400 mt-3 text-center">Unlock 100+ components</p>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className="flex-1 overflow-y-auto w-full pl-6 lg:pl-12 pr-6 lg:pr-12">
            <div className="w-full min-h-screen py-12">
              {currentContent}
            </div>
          </div>
        </div>
      </main>

      <Footer className="mt-auto" />
    </div>
  );
}