"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

const vertex = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor;
  uniform float uAmplitude;
  uniform float uDistance;
  uniform vec2 uMouse;
  uniform float uSpeed;

  #define PI 3.1415926538
  const int LINE_COUNT = 60;        // More lines
  const float LINE_WIDTH = 1.2;     // Ultra-thin
  const float LINE_BLUR = 3.0;      // Soft edges

  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), f.x),
               mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
  }

  float lineFn(vec2 uv, float index, vec2 mouse, float time) {
    float p = index / float(LINE_COUNT);
    float offset = (p - 0.5) * uDistance * 0.9;

    float mouseInfluence = length(uv - mouse) < 0.4 ? (1.0 - length(uv - mouse) / 0.4) : 0.0;

    float wave = sin(uv.x * 12.0 + time * uSpeed * 0.12 + p * 15.0) * 0.02;
    wave += noise(vec2(uv.x * 8.0 + time * uSpeed * 0.08, p * 30.0)) * 0.03;
    wave += mouseInfluence * uAmplitude * 0.25;

    float y = 0.5 + offset + wave * uAmplitude * 0.8;
    float dist = abs(uv.y - y);

    float width = LINE_WIDTH / uResolution.y * (1.0 - p * 0.7);
    float blur = LINE_BLUR / uResolution.y * (1.0 + mouseInfluence * 2.0);

    float alpha = smoothstep(width + blur, width - blur, dist);
    alpha *= (1.0 - p * 0.4); // Fade edges
    alpha *= 0.8 + mouseInfluence * 0.6; // Glow on hover

    return alpha;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec3 color = vec3(0.0);
    float alpha = 0.0;

    for (int i = 0; i < LINE_COUNT; i++) {
      float strength = lineFn(uv, float(i), uMouse, uTime);
      color += uColor * strength;
      alpha += strength;
    }

    gl_FragColor = vec4(color, alpha);
  }
`;

type SilkyLinesProps = {
  className?: string;
  color?: string;
  amplitude?: number;
  distance?: number;
  speed?: number;
  mouseInteraction?: boolean;
};

export default function SilkyLines({
  className,
  color = "#c084fc",           // Soft purple silk
  amplitude = 1.0,
  distance = 1.1,
  speed = 0.4,
  mouseInteraction = true,
}: SilkyLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true });
    const gl = renderer.gl;

    const geometry = new Triangle(gl);
    // Convert hex color to normalized RGB
    const hexToRgb = (hex: string) => {
      const match = hex.replace("#", "").match(/.{1,2}/g);
      if (!match || match.length < 3) return [1, 1, 1];
      return match.map((x) => parseInt(x, 16) / 255);
    };
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [container.offsetWidth, container.offsetHeight] },
        uColor: { value: new Float32Array(hexToRgb(color)) },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance },
        uSpeed: { value: speed },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(gl.canvas);

    const handleResize = () => {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      program.uniforms.uResolution.value = [container.offsetWidth, container.offsetHeight];
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    const handleMouse = (e: MouseEvent) => {
      if (!mouseInteraction) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };
    container.addEventListener("mousemove", handleMouse);

    let frame = 0;
    const animate = (t: number) => {
      frame = requestAnimationFrame(animate);
      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uMouse.value[0] = mouseRef.current.x;
      program.uniforms.uMouse.value[1] = mouseRef.current.y;
      renderer.render({ scene: mesh });
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouse);
      if (gl.canvas.parentNode) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [amplitude, distance, speed, mouseInteraction, color]);

  return <div ref={containerRef} className={`w-full h-full ${className || ""}`} />;
}