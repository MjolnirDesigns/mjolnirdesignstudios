"use client";

import { useEffect, useId, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

type AtmosphereProps = {
  className?: string;
  color?: string;
  density?: number;
  speed?: number;
  size?: number;
  opacity?: number;
  opacitySpeed?: number;
};

export default function Atmosphere({
  className,
  color = "#f59e0b",
  density = 1600,
  speed = 1.0,
  size = 1.8,
  opacity = 0.95,
  opacitySpeed = 2.0,
}: AtmosphereProps) {
  const [isReady, setIsReady] = useState(false);
  const id = useId();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setIsReady(true));
  }, []);

  const options = {
    background: { color: { value: "transparent" } },
    fullScreen: { enable: false },
    fpsLimit: 120,
    particles: {
      color: { value: color },
      move: {
        enable: true,
        direction: "none" as const,
        random: true,
        straight: false,
        speed: { min: 0.1, max: speed },
      },
      number: { value: density },
      opacity: {
        value: { min: 0.1, max: opacity },
        animation: { enable: true, speed: opacitySpeed, sync: false, min: 0.05 },
      },
      size: { value: { min: 0.4, max: size } },
      shape: { type: "circle" },
      links: { enable: false },
    },
    detectRetina: true,
  };

  if (!isReady) return <div className={className} />;

  return (
    <Particles
      id={id}
      options={options}
      className={`absolute inset-0 ${className || ""}`}
    />
  );
}