"use client";
import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User } from 'lucide-react';

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactElement;
  }[];
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSwipeTimeRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() || 0;
    const direction = current - previous;

    if (current < 10) { // Near the top
      if (!visible) setVisible(true); // Ensure visible at top initially
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setVisible(false);
      }, 3000);
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (direction > 0) {
        setVisible(false); // Scrolling down
      } else {
        setVisible(true); // Scrolling up
      }
    }
  });

  // Handle interaction to cancel hide timer
  const handleInteraction = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setVisible(true);
  };

  // Detect double swipe up to hide nav
  React.useEffect(() => {
    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY; // Positive for swipe up
      const duration = Date.now() - touchStartTime;

      if (duration < 300 && deltaY > 50) { // Detected swipe up
        const now = Date.now();
        if (now - lastSwipeTimeRef.current < 500) {
          setVisible(false); // Double swipe up: hide nav
          if (timerRef.current) clearTimeout(timerRef.current);
        }
        lastSwipeTimeRef.current = now;
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex fixed top-4 inset-x-4 border dark:border-white/[0.2] rounded-lg bg-shadow z-[5000] px-6 py-5 items-center justify-between",
          className,
          "lg:hidden" // Hide on large screens (lg breakpoint and up)
        )}
        onTouchStart={handleInteraction}
      >
        {/* Left: Avatar Icon */}
        <Link 
          href="/account" 
          className="border relative border-neutral-200 dark:border-white/[0.2] rounded-full p-1 text-neutral-50 hover:text-gold"
        >
          <User size={24} />
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
        </Link>

        {/* Center: Logo */}
        <Link href="/" className="hover:shadow-[0_0_10px_rgba(0,191,255,0.6)] transition-shadow duration-300">
          <Image 
            src="/logos/mjolnir_logo_transparent.png" // Update this path as needed when uploading to Hostinger (e.g., to your public assets folder)
            alt="Mjolnir Logo" 
            width={180} 
            height={36} 
            className="object-contain"
          />
        </Link>

        {/* Right: Login and Menu */}
        <div className="flex items-center space-x-3">
          <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-3 py-1 rounded-full">
            <span>Login</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-neutral-50 hover:text-gold focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-shadow p-4 rounded-b-lg border dark:border-white/[0.2] flex flex-col space-y-2">
            {navItems.map((navItem: { name: string; link: string; icon?: React.ReactElement }, idx: number) => (
              <Link
                key={`link=${idx}`}
                href={navItem.link}
                className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-gold text-sm font-medium transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                {navItem.icon && <span className="mr-1">{navItem.icon}</span>}
                <span>{navItem.name}</span>
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};