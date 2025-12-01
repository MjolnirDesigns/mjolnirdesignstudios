// components/mjolnirui/backgrounds/atomic/Atomic.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Geometry, Transform } from "ogl";

const vertex = `
  precision highp float;
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;

  uniform float uCoreIntensity;
  uniform float uCoreSpeed;
  uniform float uCorePulse;
  uniform float uShellIntensity;
  uniform float uShellSpeed;
  uniform float uTendrilCount;
  uniform float uTendrilIntensity;
  uniform float uParticleCount;
  uniform float uParticleSpeed;
  uniform float uMistDensity;
  uniform float uBreathing;
  uniform float uWarp;
  uniform vec3 uCoreColor1;
  uniform vec3 uCoreColor2;
  uniform vec3 uShellColor1;
  uniform vec3 uShellColor2;

  #define PI 3.14159265359
  #define TAU 6.28318530718

  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), f.x),
               mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float a = 0.5, f = 4.0, n = 0.0;
    for(int i = 0; i < 5; i++) { n += a * noise(p * f); a *= 0.5; f *= 2.0; }
    return n;
  }

  vec3 nuclearCore(vec2 uv, float t) {
    float d = length(uv);
    float pulse = sin(t * uCoreSpeed * 10.0 + d * 20.0) * 0.5 + 0.5;
    float turb = fbm(uv * 15.0 + t * uCoreSpeed * 3.0 + pulse * 6.0);
    float core = smoothstep(0.28, 0.0, d) * turb * pulse * uCoreIntensity;

    vec3 col = mix(uCoreColor1, uCoreColor2, smoothstep(0.0, 0.28, d));
    return col * core * 8.0 + col * pulse * uCorePulse;
  }

  vec3 plasmaTendrils(vec2 uv, float t) {
    vec3 col = vec3(0.0);
    float count = uTendrilCount;
    for(int i = 0; i < 16; i++) {
      if (float(i) >= count) break;
      float fi = float(i) / count;
      float a = fi * TAU + t * 0.9;
      vec2 dir = vec2(cos(a), sin(a));
      vec2 p = uv - dir * 0.12;
      float n = fbm(p * 10.0 + t * 0.7);
      float d = length(p);
      float tendril = smoothstep(0.35, 0.1, d) * n * (1.0 - fi * 0.5);
      vec3 hue = mix(vec3(1.0, 0.7, 0.3), vec3(0.6, 0.3, 1.0), fi);
      col += hue * tendril * uTendrilIntensity;
    }
    return col;
  }

  vec3 energyShell(vec2 uv, float t) {
    float d = length(uv);
    float a = atan(uv.y, uv.x);
    float spiral = sin(a * 14.0 - t * uShellSpeed * 5.0 + d * 18.0) * 0.5 + 0.5;
    float shell = (smoothstep(0.38, 0.36, d) - smoothstep(0.50, 0.52, d));
    shell *= spiral;

    vec3 col = mix(uShellColor1, uShellColor2, sin(a * 4.0 + t) * 0.5 + 0.5);
    return col * shell * uShellIntensity * 4.0;
  }

  vec3 orbitalParticles(vec2 uv, float t) {
    vec3 col = vec3(0.0);
    float count = uParticleCount;
    for(int i = 0; i < 100; i++) {
      if (float(i) >= count) break;
      float fi = float(i) / count;
      float a = fi * TAU + t * uParticleSpeed;
      float r = 0.32 + sin(fi * 12.0 + t) * 0.18;
      vec2 pos = vec2(cos(a), sin(a)) * r;
      float d = length(uv - pos);
      float p = smoothstep(0.03, 0.008, d) * (0.6 + sin(t * 12.0 + fi * 25.0) * 0.4);
      vec3 hue = mix(vec3(0.8, 0.4, 1.0), vec3(0.3, 0.7, 1.0), fi);
      col += hue * p * 2.5;
    }
    return col;
  }

  vec3 nebulaMist(vec2 uv, float t) {
    vec2 p = uv * 5.0 + vec2(t * 0.04, t * 0.02);
    float n = fbm(p) + fbm(p * 2.0 + t * 0.1) * 0.5 + fbm(p * 4.0 + t * 0.2) * 0.25;
    float mist = pow(n, 3.0) * uMistDensity;
    return mix(vec3(0.1, 0.0, 0.3), vec3(0.2, 0.1, 0.6), n) * mist;
  }

  void main() {
    vec2 uv = vUv - 0.5;
    uv /= vec2(uResolution.y / uResolution.x, 1.0);
    uv *= 1.0 + sin(uTime * 0.4) * uBreathing * 0.1;

    float t = uTime * 0.9;
    vec3 color = vec3(0.0);

    color += nebulaMist(uv, t);
    color += orbitalParticles(uv, t);
    color += plasmaTendrils(uv, t);
    color += energyShell(uv, t);
    color += nuclearCore(uv, t);

    gl_FragColor = vec4(color, 1.0);
  }
`;

interface AtomicProps {
  className?: string;
  coreIntensity?: number;
  coreSpeed?: number;
  corePulse?: number;
  shellIntensity?: number;
  shellSpeed?: number;
  tendrilCount?: number;
  tendrilIntensity?: number;
  particleCount?: number;
  particleSpeed?: number;
  mistDensity?: number;
  breathing?: number;
  warp?: number;
  coreColor1?: string;
  coreColor2?: string;
  shellColor1?: string;
  shellColor2?: string;
}

export default function Atomic({
  className,
  coreIntensity = 1.0,
  coreSpeed = 1.0,
  corePulse = 1.0,
  shellIntensity = 1.0,
  shellSpeed = 1.0,
  tendrilCount = 12,
  tendrilIntensity = 1.0,
  particleCount = 80,
  particleSpeed = 1.0,
  mistDensity = 0.3,
  breathing = 1.0,
  warp = 1.0,
  coreColor1 = "#ffffff",
  coreColor2 = "#ff8c00",
  shellColor1 = "#8b00ff",
  shellColor2 = "#00d0ff",
}: AtomicProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glContext = useRef<{
    renderer: Renderer;
    program: Program;
    mesh: Mesh;
    scene: Transform;
    gl: WebGLRenderingContext | WebGL2RenderingContext;
  } | null>(null);
  const frameId = useRef<number>(0);

  const hexToRgb = (hex: string): [number, number, number] => {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.slice(0, 2) || "ff", 16) / 255;
    const g = parseInt(clean.slice(2, 4) || "ff", 16) / 255;
    const b = parseInt(clean.slice(4, 6) || "ff", 16) / 255;
    return [r, g, b];
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (glContext.current) return; // already initialized

    const renderer = new Renderer({ alpha: true, antialias: true });
    const gl = renderer.gl;

    // Two triangles (6 vertices) forming a full-screen quad (triangle list)
    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,

        -1,  1,
         1, -1,
         1,  1
      ])},
      uv: { size: 2, data: new Float32Array([
        0, 0,
        1, 0,
        0, 1,

        0, 1,
        1, 0,
        1, 1
      ])}
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        // we'll set uResolution to drawing buffer size after sizing the canvas
        uResolution: { value: [1, 1] },
        uCoreIntensity: { value: coreIntensity },
        uCoreSpeed: { value: coreSpeed },
        uCorePulse: { value: corePulse },
        uShellIntensity: { value: shellIntensity },
        uShellSpeed: { value: shellSpeed },
        uTendrilCount: { value: Math.max(4, tendrilCount) },
        uTendrilIntensity: { value: tendrilIntensity },
        uParticleCount: { value: Math.max(20, particleCount) },
        uParticleSpeed: { value: particleSpeed },
        uMistDensity: { value: mistDensity },
        uBreathing: { value: breathing },
        uWarp: { value: warp },
        uCoreColor1: { value: hexToRgb(coreColor1) },
        uCoreColor2: { value: hexToRgb(coreColor2) },
        uShellColor1: { value: hexToRgb(shellColor1) },
        uShellColor2: { value: hexToRgb(shellColor2) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    const scene = new Transform();
    scene.addChild(mesh);

    glContext.current = { renderer, program, mesh, scene, gl };

    container.appendChild(gl.canvas);
    if (gl.canvas instanceof HTMLCanvasElement) {
      Object.assign(gl.canvas.style, {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      });
    }

    // Resize handler uses device pixel ratio drawing buffer
    const handleResize = () => {
      if (!glContext.current) return;
      const { renderer, gl } = glContext.current;
      const width = Math.max(1, container.offsetWidth || 300);
      const height = Math.max(1, container.offsetHeight || 150);
      const dpr = Math.min(2, window.devicePixelRatio || 1);

      // set CSS size (ensures layout)
      if (gl.canvas instanceof HTMLCanvasElement) {
        gl.canvas.style.width = width + "px";
        gl.canvas.style.height = height + "px";
      }

      // set drawing buffer in device pixels
      const drawingWidth = Math.max(1, Math.floor(width * dpr));
      const drawingHeight = Math.max(1, Math.floor(height * dpr));
      gl.canvas.width = drawingWidth;
      gl.canvas.height = drawingHeight;

      // viewport must match drawing buffer
      gl.viewport(0, 0, drawingWidth, drawingHeight);

      // Inform ogl renderer (best-effort; some versions prefer CSS pixels, some device pixels)
      try {
      if (typeof (renderer as Renderer).setSize === "function") {
        (renderer as Renderer).setSize(drawingWidth, drawingHeight);
      }
      } catch {}

      // Pass drawing buffer (device pixel) resolution into shader
      if (glContext.current?.program?.uniforms?.uResolution) {
        glContext.current.program.uniforms.uResolution.value = [drawingWidth, drawingHeight];
      }
    };

    // init size and listen for resizes
    handleResize();
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = (time: number) => {
      const ctx = glContext.current;
      if (!ctx) return;
      frameId.current = requestAnimationFrame(animate);

      // time in seconds
      if (ctx.program.uniforms.uTime) {
        ctx.program.uniforms.uTime.value = time * 0.001;
      }

      try {
        ctx.renderer.render({ scene: ctx.scene });
      } catch (err) {
        // log, but don't crash
        // eslint-disable-next-line no-console
        console.error("ogl render error:", err);
      }
    };

    frameId.current = requestAnimationFrame(animate);

    // cleanup
    return () => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
      window.removeEventListener("resize", handleResize);
      try { if (gl && gl.canvas && gl.canvas.parentNode) container.removeChild(gl.canvas); } catch {}
      try {
        const ext = (gl as WebGLRenderingContext | WebGL2RenderingContext).getExtension && (gl as WebGLRenderingContext | WebGL2RenderingContext).getExtension("WEBGL_lose_context");
        if (ext && typeof ext.loseContext === "function") ext.loseContext();
      } catch {}
      glContext.current = null;
    };
  }, []); // init once

  // Live uniform updates
  useEffect(() => {
    const ctx = glContext.current;
    if (!ctx) return;
    const p = ctx.program.uniforms as {
      uCoreIntensity: { value: number };
      uCoreSpeed: { value: number };
      uCorePulse: { value: number };
      uShellIntensity: { value: number };
      uShellSpeed: { value: number };
      uTendrilCount: { value: number };
      uTendrilIntensity: { value: number };
      uParticleCount: { value: number };
      uParticleSpeed: { value: number };
      uMistDensity: { value: number };
      uBreathing: { value: number };
      uWarp: { value: number };
      uCoreColor1: { value: [number, number, number] };
      uCoreColor2: { value: [number, number, number] };
      uShellColor1: { value: [number, number, number] };
      uShellColor2: { value: [number, number, number] };
    };
    if (!p) return;

    p.uCoreIntensity.value = coreIntensity;
    p.uCoreSpeed.value = coreSpeed;
    p.uCorePulse.value = corePulse;
    p.uShellIntensity.value = shellIntensity;
    p.uShellSpeed.value = shellSpeed;
    p.uTendrilCount.value = Math.max(4, tendrilCount);
    p.uTendrilIntensity.value = tendrilIntensity;
    p.uParticleCount.value = Math.max(20, particleCount);
    p.uParticleSpeed.value = particleSpeed;
    p.uMistDensity.value = mistDensity;
    p.uBreathing.value = breathing;
    p.uWarp.value = warp;
    p.uCoreColor1.value = hexToRgb(coreColor1);
    p.uCoreColor2.value = hexToRgb(coreColor2);
    p.uShellColor1.value = hexToRgb(shellColor1);
    p.uShellColor2.value = hexToRgb(shellColor2);
  }, [
    coreIntensity, coreSpeed, corePulse,
    shellIntensity, shellSpeed,
    tendrilCount, tendrilIntensity,
    particleCount, particleSpeed,
    mistDensity, breathing, warp,
    coreColor1, coreColor2, shellColor1, shellColor2
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className || ""}`}
      style={{ background: "black" }}
    />
  );
}
