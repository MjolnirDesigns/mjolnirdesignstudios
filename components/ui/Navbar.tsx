"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious();

      if (typeof previous === "number") {
        const direction = current - previous;

        if (scrollYProgress.get() < 0.05) {
          setVisible(true);
        } else {
          if (direction < 0) {
            setVisible(true);
          } else {
            setVisible(false);
          }
        }
      }
    }
  });

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
          "hidden lg:flex fixed top-0 left-0 w-full z-[5000] px-6 py-4 bg-shadow border-b border-white/[0.2]",
          "lg:flex" // Show on large screens (lg breakpoint and up)
        )}
      >
        {/* Logo/Icon Avatar (Left) */}
        <div className="flex-shrink-0 flex items-center space-x-2">
          <Image
            src="/mjolnir-high-resolution-logo-transparent.png" // Updated to correct relative path
            alt="Mjolnir Logo"
            width={124}
            height={64}
            className="rounded-full"
          />
          {/* Optional Text Logo - Uncomment and adjust if needed */}
          {/* <span className="text-xl font-bold text-gold">Mjolnir Design</span> */}
        </div>

        {/* Navigation Links (Center) */}
        <div className="flex-1 flex justify-center items-center space-x-6">
          {["About", "Projects", "Testimonials", "Pricing", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-base text-neutral-600 dark:text-neutral-50 hover:text-gold hover:bg-gold/10 rounded-md px-2 py-1 transition duration-200"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA and Login/Logout Buttons (Right) */}
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg text-sm font-medium animate-shimmer hover:from-emerald-600 hover:to-teal-600 transition">
            Build Mightily!
          </button>
          <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
            <span>Login</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Navbar;