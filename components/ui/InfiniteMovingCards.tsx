"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative h-auto z-20 w-screen overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-16 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[350px] max-w-full h-[300px] relative rounded-2xl border border-b-0 flex-shrink-0 border-white/[0.1] p-4 md:p-8 md:w-[450px]"
            style={{
                background: 'rgb(22,22,22)',
                backgroundColor: 'linear-gradient(90deg, rgba(22,22,22,1) 0%, rgba(64,0,0,1) 70%, rgba(80,80,80,1) 100%)',
            }}
            key={idx}
          >
            <blockquote>
                <div
                    aria-hidden="true"
                    className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]">
                </div>
                <span className="relative z-20 text-lg md:text-lg leading-[1.6] text-white font-normal">
                    {item.quote}
                </span>
                <div className="relative z-20 mt-4 flex flex-row items-center">
                    <div className="flex flex-col gap-1">
                        <div className="me-3">
                            <img src="" alt="profile" />
                        </div>
                        <span className="flex flex-col gap-1">
                            <span className=" text-xl leading-[1.6] text-gold font-bold">
                                {item.name}
                            </span>
                            <span className=" text-md leading-[1.6] text-silver-100 font-normal">
                                {item.title}
                            </span>
                        </span>
                    </div>
                </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
