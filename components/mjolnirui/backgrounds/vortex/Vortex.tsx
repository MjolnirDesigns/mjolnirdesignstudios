"use client";

import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

interface VortexProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
}

const TAU = 2 * Math.PI;
const BASE_TTL = 50;
const RANGE_TTL = 150;
const PARTICLE_PROP_COUNT = 9;
const RANGE_HUE = 100;
const NOISE_STEPS = 3;
const X_OFF = 0.00125;
const Y_OFF = 0.00125;
const Z_OFF = 0.0005;

export function Vortex({
  children,
  className = "",
  containerClassName = "",
  particleCount = 700,
  rangeY = 100,
  baseHue = 220,
  baseSpeed = 0.0,
  rangeSpeed = 1.5,
  baseRadius = 1,
  rangeRadius = 2,
  backgroundColor = "black",
}: VortexProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const particleProps = useRef<Float32Array | null>(null);
  const tick = useRef(0);
  const noise3D = useRef(createNoise3D());
  const center = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      center.current = {
        x: rect.width / 2,
        y: rect.height / 2,
      };

      const length = particleCount * PARTICLE_PROP_COUNT;
      particleProps.current = new Float32Array(length);

      for (let i = 0; i < length; i += PARTICLE_PROP_COUNT) {
        initParticle(i);
      }
    };

    const rand = (n: number) => n * Math.random();
    const randRange = (n: number) => n - rand(2 * n);
    const fadeInOut = (t: number, m: number) => {
      const hm = 0.5 * m;
      return Math.abs(((t + hm) % m) - hm) / hm;
    };
    const lerp = (n1: number, n2: number, speed: number) => (1 - speed) * n1 + speed * n2;

    const initParticle = (i: number) => {
      const props = particleProps.current!;
      const canvas = canvasRef.current!;

      const x = rand(canvas.width);
      const y = center.current.y + randRange(rangeY);
      const vx = 0;
      const vy = 0;
      const life = 0;
      const ttl = BASE_TTL + rand(RANGE_TTL);
      const speed = baseSpeed + rand(rangeSpeed);
      const radius = baseRadius + rand(rangeRadius);
      const hue = baseHue + rand(RANGE_HUE);

      props.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
    };

    const drawParticle = (i: number) => {
      const props = particleProps.current!;
      const ctx = ctxRef.current!;
      const canvas = canvasRef.current!;

      const x = props[i];
      const y = props[i + 1];
      const vx = props[i + 2];
      const vy = props[i + 3];
      const life = props[i + 4];
      const ttl = props[i + 5];
      const speed = props[i + 6];
      const radius = props[i + 7];
      const hue = props[i + 8];

      const n = noise3D.current(x * X_OFF, y * Y_OFF, tick.current * Z_OFF) * NOISE_STEPS * TAU;
      const nextVx = lerp(vx, Math.cos(n), 0.5);
      const nextVy = lerp(vy, Math.sin(n), 0.5);
      const nextX = x + nextVx * speed;
      const nextY = y + nextVy * speed;

      ctx.save();
      ctx.lineCap = "round";
      ctx.lineWidth = radius;
      ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nextX, nextY);
      ctx.stroke();
      ctx.restore();

      props[i] = nextX;
      props[i + 1] = nextY;
      props[i + 2] = nextVx;
      props[i + 3] = nextVy;
      props[i + 4] = life + 1;

      if (
        nextX < 0 ||
        nextX > canvas.width ||
        nextY < 0 ||
        nextY > canvas.height ||
        life > ttl
      ) {
        initParticle(i);
      }
    };

    const animate = () => {
      const ctx = ctxRef.current!;
      const canvas = canvasRef.current!;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particleProps.current!.length; i += PARTICLE_PROP_COUNT) {
        drawParticle(i);
      }

      // Glow passes
      ctx.save();
      ctx.filter = "blur(8px) brightness(200%)";
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(canvas, 0, 0);
      ctx.restore();

      ctx.save();
      ctx.filter = "blur(4px) brightness(200%)";
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(canvas, 0, 0);
      ctx.restore();

      tick.current++;
      requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [
    particleCount,
    rangeY,
    baseHue,
    baseSpeed,
    rangeSpeed,
    baseRadius,
    rangeRadius,
    backgroundColor,
  ]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${containerClassName}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ backgroundColor }}
      />
      {children && (
        <div className={`relative z-10 flex flex-col items-center justify-center h-full px-8 ${className}`}>
          {children}
        </div>
      )}
    </div>
  );
}