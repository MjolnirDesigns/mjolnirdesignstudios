"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import mjolnirLogo from "@/public/Logos/mjolnir_logo_transparent.png";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

const items: CardNavItem[] = [
  {
    label: "About",
    bgColor: "#1a1a1a",
    textColor: "#e5b143",
    links: [
      { label: "Studio", href: "/about/studio", ariaLabel: "About Studio" },
      { label: "Mission", href: "/about/mission", ariaLabel: "Our Mission" },
      { label: "Team", href: "/about/team", ariaLabel: "Meet the Team" },
    ],
  },
  {
    label: "Docs",
    bgColor: "#1f1f1f",
    textColor: "#ffd700",
    links: [
      { label: "Getting Started", href: "/docs/start", ariaLabel: "Getting Started" },
      { label: "Components", href: "/docs/components", ariaLabel: "Component Docs" },
      { label: "API Reference", href: "/docs/api", ariaLabel: "API Reference" },
    ],
  },
  {
    label: "Components",
    bgColor: "#242424",
    textColor: "#ffcc11",
    links: [
      { label: "Atomic Lab", href: "/components/atomic", ariaLabel: "Atomic Lab" },
      { label: "Sidebar", href: "/components/sidebar", ariaLabel: "Mjolnir Sidebar" },
      { label: "Card Nav", href: "/components/cardnav", ariaLabel: "Card Navigation" },
    ],
  },
  {
    label: "Pricing",
    bgColor: "#292929",
    textColor: "#ffaa00",
    links: [
      { label: "Pro Plan", href: "/pricing/pro", ariaLabel: "Pro Plan" },
      { label: "Enterprise", href: "/pricing/enterprise", ariaLabel: "Enterprise" },
      { label: "Compare Plans", href: "/pricing/compare", ariaLabel: "Compare Plans" },
    ],
  },
];

export default function CardNav() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const isAnimating = useRef(false);

  const closedHeight = 96;
  const getOpenHeight = React.useCallback(() => {
    const width = window.innerWidth;
    if (width <= 768) return 560;
    if (width <= 1024) return 440;
    if (width <= 1280) return 480;
    if (width <= 1536) return 500;
    return 540;
  }, []);

  const buildTimeline = React.useCallback(() => {
    if (tlRef.current) tlRef.current.kill();

    const navEl = navRef.current;
    if (!navEl) return;

    gsap.set(navEl, { height: closedHeight, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 120, opacity: 0 });

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => { isAnimating.current = false; },
      onReverseComplete: () => {
        isAnimating.current = false;
        gsap.set(navEl, { height: closedHeight });
      },
    });

    tl.to(navEl, {
      height: getOpenHeight(),
      duration: 0.7,
      ease: "power3.out",
    });

    tl.to(
      cardsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "-=0.5"
    );

    tlRef.current = tl;
  }, [closedHeight, getOpenHeight]);

  useLayoutEffect(() => {
    buildTimeline();

    const handleResize = () => {
      if (!navRef.current) return;
      const target = isOpen ? getOpenHeight() : closedHeight;
      gsap.set(navRef.current, { height: target });

      // Only rebuild if not animating
      if (!isAnimating.current) {
        buildTimeline();
        if (isOpen) tlRef.current?.progress(1, false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, buildTimeline, getOpenHeight]);

  const toggle = () => {
    if (isAnimating.current || !tlRef.current || !navRef.current) return;

    isAnimating.current = true;

    if (!isOpen) {
      setIsOpen(true);
      tlRef.current.play();
    } else {
      setIsOpen(false);
      tlRef.current.reverse();
    }
  };

  return (
    <div className="relative w-full px-4 mt-16">
      <div className="w-full max-w-full mx-auto xl:max-w-7xl">
        <nav
          ref={navRef}
          className="relative bg-gradient-to-br from-gray-950 via-black to-gray-900 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl"
          style={{ height: closedHeight }}
        >
          {/* Top Bar */}
          <div className="absolute inset-x-0 top-0 h-24 flex items-center justify-between px-8 lg:px-16 z-20">
            {/* Hamburger */}
            <button
              onClick={toggle}
              className="relative w-16 h-16 flex flex-col justify-center items-center gap-2 group"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <span className={`block w-10 h-0.5 bg-gold transition-all duration-300 ${isOpen ? "rotate-45 translate-y-3" : ""}`} />
              <span className={`block w-10 h-0.5 bg-gold transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block w-10 h-0.5 bg-gold transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-3" : ""}`} />
            </button>

            {/* Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image
                src={mjolnirLogo}
                alt="Mjolnir Design Studios"
                width={220}
                height={70}
                className="drop-shadow-2xl"
                priority
              />
            </div>

            {/* CTA */}
            <button className="px-10 py-4 bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-orange-500 text-black font-bold text-lg rounded-2xl shadow-2xl transition-all hover:scale-105 whitespace-nowrap">
              Get Started
            </button>
          </div>

          {/* Cards */}
          <div className="absolute inset-x-8 lg:inset-x-16 top-28 flex gap-6 lg:gap-10 pointer-events-none">
            {items.map((item, i) => (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="flex-1 min-w-0 bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-2xl p-10 lg:p-12 shadow-2xl pointer-events-auto"
                style={{ backgroundColor: item.bgColor }}
              >
                <h3 className="text-3xl lg:text-4xl font-bold mb-8 pb-5 border-b-2 border-gold/40" style={{ color: item.textColor }}>
                  {item.label}
                </h3>
                <div className="space-y-8 mt-10">
                  {item.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      aria-label={link.ariaLabel}
                      className="group flex items-center gap-5 text-gray-300 hover:text-gold transition-all duration-300 text-lg lg:text-xl"
                    >
                      <ArrowUpRight className="w-6 h-6 text-yellow-400 group-hover:text-gold group-hover:translate-x-2 group-hover:-translate-y-2 transition-all" />
                      <span className="font-medium whitespace-nowrap">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}