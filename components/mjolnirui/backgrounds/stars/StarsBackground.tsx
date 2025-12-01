"use client";

import React, { useEffect, useRef } from "react";

interface StarsBackgroundProps {
  starColor?: string;
  rareStarColor?: string;
  rareStarChance?: number;
  starDensity?: number;
  twinkleSpeed?: number;
  className?: string;
}

export function StarsBackground({
  starColor = "#ffffff",
  rareStarColor = "#a78bfa",
  rareStarChance = 0.003,
  starDensity = 800,
  twinkleSpeed = 1.0,
  className,
}: StarsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const stars: Array<{
      x: number;
      y: number;
      size: number;
      alpha: number;
      phase: number;
      isRare: boolean;
    }> = [];

    const initStars = () => {
      stars.length = 0;
      const area = canvas.width * canvas.height;
      const count = Math.floor((area / 100000) * starDensity);

      for (let i = 0; i < count; i++) {
        const isRare = Math.random() < rareStarChance;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: isRare ? 1.8 + Math.random() * 1.2 : 0.8 + Math.random() * 0.8,
          alpha: 0.3 + Math.random() * 0.7,
          phase: Math.random() * Math.PI * 2,
          isRare,
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001 * twinkleSpeed;

      stars.forEach((star) => {
        const twinkle = Math.sin(time * 2 + star.phase) * 0.3 + 0.7;
        const alpha = star.alpha * twinkle;
        const size = star.size * (star.isRare ? 1.3 : 1.0);

        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.isRare ? rareStarColor : starColor;

        // Core star
        ctx.fillRect(star.x - size / 2, star.y - size / 2, size, size);

        // Subtle glow for rare stars
        if (star.isRare && alpha > 0.6) {
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, size * 4);
          glow.addColorStop(0, rareStarColor + "40");
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.fillRect(star.x - size * 4, star.y - size * 4, size * 8, size * 8);
        }
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    initStars();
    draw();

    window.addEventListener("resize", () => {
      resize();
      initStars();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [starColor, rareStarColor, rareStarChance, starDensity, twinkleSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className || ""}`}
      style={{ background: "radial-gradient(ellipse at bottom, #1a0033 0%, #000000 100%)" }}
    />
  );
}