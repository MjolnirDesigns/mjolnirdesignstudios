"use client";
/* webhint-disable no-inline-styles */ // Suppress Webhint rule for inline styles
import React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useRef, useEffect, useState } from "react"; // Added useEffect, useState
import { cn } from "@/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) {
  const [isMounted, setIsMounted] = useState(false); // Add mount check

  useEffect(() => {
    setIsMounted(true); // Set mounted on client
  }, []);

  if (!isMounted) return null; // Defer rendering until mounted

  return (
    <Component
      className={cn(
        "relative text-xl p-[2.5px] overflow-hidden md:col-span-2 md-row-span-1",
        containerClassName
      )}
      style={{ borderRadius: borderRadius }} // Line 43: Covered by file-level Webhint suppression
      {...otherProps}
    >
      <div
        className="absolute inset-0 rounded-[1.75rem] moving-border-top"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }} // Line 57-ish: Kept inline style
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--emerald-500)_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: unknown;
}) => {
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue<number>(0);
  const [isMounted, setIsMounted] = useState(false); // Add mount check

  useEffect(() => {
    setIsMounted(true); // Set mounted on client
  }, []);

  useAnimationFrame((time) => {
    if (!isMounted || !pathRef.current) return; // Defer animation until mounted
    const length = pathRef.current.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => (isMounted && pathRef.current ? pathRef.current.getPointAtLength(val).x : 0) // Default to 0 pre-mount
  );
  const y = useTransform(
    progress,
    (val) => (isMounted && pathRef.current ? pathRef.current.getPointAtLength(val).y : 0) // Default to 0 pre-mount
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  if (!isMounted) return null; // Defer rendering until mounted

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};