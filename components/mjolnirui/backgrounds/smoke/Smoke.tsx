// components/mjolnirui/backgrounds/smoke/Smoke.tsx
"use client";

import React, { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import './Smoke.css';

type SmokeProps = {
  className?: string;
  style?: React.CSSProperties;
  trailLength?: number;
  inertia?: number;
  grainIntensity?: number;
  bloomStrength?: number;
  bloomRadius?: number;
  bloomThreshold?: number;
  brightness?: number;
  color?: string;
  mixBlendMode?: React.CSSProperties["mixBlendMode"];
  edgeIntensity?: number;
  maxDevicePixelRatio?: number;
  targetPixels?: number;
  fadeDelayMs?: number;
  fadeDurationMs?: number;
  zIndex?: number;
  scale?: number; // ← NEW: Controls size
};

const Smoke: React.FC<SmokeProps> = ({
  className = "",
  style,
  trailLength = 50,
  inertia = 0.5,
  grainIntensity = 0.05,
  bloomStrength = 0.15,
  bloomRadius = 1.0,
  bloomThreshold = 0.025,
  brightness = 2.5,
  color = "#FFD700",
  mixBlendMode = "screen",
  edgeIntensity = 0,
  maxDevicePixelRatio = 0.5,
  targetPixels,
  fadeDelayMs,
  fadeDurationMs,
  zIndex = 10,
  scale = 3.0, // ← GOD MODE DEFAULT
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const bloomPassRef = useRef<UnrealBloomPass | null>(null);
  const filmPassRef = useRef<ShaderPass | null>(null);

  const trailBufRef = useRef<THREE.Vector2[]>([]);
  const headRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const currentMouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const velocityRef = useRef(new THREE.Vector2(0, 0));
  const fadeOpacityRef = useRef(1.0);
  const lastMoveTimeRef = useRef(performance.now());
  const pointerActiveRef = useRef(false);
  const runningRef = useRef(false);

  const isTouch = useMemo(() => typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), []);

  const pixelBudget = targetPixels ?? (isTouch ? 0.9e6 : 1.3e6);
  const fadeDelay = fadeDelayMs ?? (isTouch ? 500 : 1000);
  const fadeDuration = fadeDurationMs ?? (isTouch ? 1000 : 1500);
  const maxTrail = Math.max(10, Math.min(100, Math.floor(trailLength)));

  const baseVertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  // FIXED: Proper aspect ratio + scale control
  const fragmentShader = `
    #define MAX_TRAIL_LENGTH ${maxTrail}

    uniform float iTime;
    uniform vec3 iResolution;
    uniform vec2 iMouse;
    uniform vec2 iPrevMouse[MAX_TRAIL_LENGTH];
    uniform float iOpacity;
    uniform float iScale;
    uniform vec3 iBaseColor;
    uniform float iBrightness;
    uniform float iEdgeIntensity;
    varying vec2 vUv;

    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453123); }
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      f *= f * (3.0 - 2.0 * f);
      return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
                 mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
    }
    float fbm(vec2 p){
      float v = 0.0, a = 0.5;
      mat2 m = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      for(int i = 0; i < 5; i++){
        v += a * noise(p);
        p = m * p * 2.0;
        a *= 0.5;
      }
      return v;
    }

    vec4 blob(vec2 p, vec2 center, float intensity, float activity) {
      vec2 q = vec2(fbm(p * iScale + iTime * 0.1), fbm(p * iScale + vec2(5.2, 1.3) + iTime * 0.1));
      vec2 r = vec2(fbm(p * iScale + q * 1.5 + iTime * 0.15), fbm(p * iScale + q * 1.5 + vec2(8.3, 2.8) + iTime * 0.15));
      float smoke = fbm(p * iScale + r * 0.8);
      float radius = 0.5 + 0.3 * (1.0 / iScale);
      float dist = length(p - center);
      float distFactor = 1.0 - smoothstep(0.0, radius * activity, dist);
      float alpha = pow(smoke, 2.5) * distFactor;

      vec3 c1 = mix(iBaseColor, vec3(1.0), 0.2);
      vec3 c2 = mix(iBaseColor, vec3(1.0, 0.9, 0.6), 0.3);
      vec3 col = mix(c1, c2, sin(iTime * 0.5 + dist * 5.0) * 0.5 + 0.5);

      return vec4(col * alpha * intensity, alpha * intensity);
    }

    void main() {
      // CORRECT UV: centered, aspect-corrected
      vec2 uv = (gl_FragCoord.xy / iResolution.xy * 2.0 - 1.0);
      uv.x *= iResolution.x / iResolution.y;

      vec2 mouse = iMouse * 2.0 - 1.0;
      mouse.x *= iResolution.x / iResolution.y;

      vec3 colorAcc = vec3(0.0);
      float alphaAcc = 0.0;

      vec4 b = blob(uv, mouse, 1.0, iOpacity);
      colorAcc += b.rgb;
      alphaAcc += b.a;

      for (int i = 0; i < MAX_TRAIL_LENGTH; i++) {
        vec2 pm = iPrevMouse[i] * 2.0 - 1.0;
        pm.x *= iResolution.x / iResolution.y;
        float t = 1.0 - float(i) / float(MAX_TRAIL_LENGTH);
        t = pow(t, 2.0);
        if (t > 0.01) {
          vec4 bt = blob(uv, pm, t * 0.8, iOpacity);
          colorAcc += bt.rgb;
          alphaAcc += bt.a;
        }
      }

      colorAcc *= iBrightness;

      vec2 uv01 = gl_FragCoord.xy / iResolution.xy;
      float edgeDist = min(min(uv01.x, 1.0 - uv01.x), min(uv01.y, 1.0 - uv01.y));
      float edgeMask = mix(1.0 - iEdgeIntensity, 1.0, smoothstep(0.0, 0.3, edgeDist));

      float outAlpha = clamp(alphaAcc * iOpacity * edgeMask, 0.0, 1.0);
      gl_FragColor = vec4(colorAcc, outAlpha);
    }
  `;

  const FilmGrainShader = useMemo(() => ({
    uniforms: {
      tDiffuse: { value: null },
      iTime: { value: 0 },
      intensity: { value: grainIntensity },
    },
    vertexShader: `
      varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform float iTime;
      uniform float intensity;
      varying vec2 vUv;

      float hash(float n){ return fract(sin(n)*43758.5453); }

      void main(){
        vec4 color = texture2D(tDiffuse, vUv);
        float n = hash(vUv.x*1000.0 + vUv.y*2000.0 + iTime) * 2.0 - 1.0;
        color.rgb += n * intensity * 0.1;
        gl_FragColor = color;
      }
    `,
  }), [grainIntensity]);

  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({ antialias: !isTouch, alpha: true });
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    renderer.domElement.style.pointerEvents = "none";
    if (mixBlendMode) renderer.domElement.style.mixBlendMode = mixBlendMode;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geom = new THREE.PlaneGeometry(2, 2, 1, 1);

    trailBufRef.current = Array.from({ length: maxTrail }, () => new THREE.Vector2(0.5, 0.5));
    headRef.current = 0;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3(1, 1, 1) },
        iMouse: { value: new THREE.Vector2(0.5, 0.5) },
        iPrevMouse: { value: trailBufRef.current.map(v => v.clone()) },
        iOpacity: { value: 1.0 },
        iScale: { value: scale },
        iBaseColor: { value: new THREE.Color(color) },
        iBrightness: { value: brightness },
        iEdgeIntensity: { value: edgeIntensity },
      },
      vertexShader: baseVertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    materialRef.current = material;

    scene.add(new THREE.Mesh(geom, material));

    const composer = new EffectComposer(renderer);
    composerRef.current = composer;
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(1024, 1024),
      bloomStrength,
      bloomRadius,
      bloomThreshold
    );
    bloomPassRef.current = bloomPass;
    composer.addPass(bloomPass);

    const filmGrainMaterial = new THREE.ShaderMaterial(FilmGrainShader);
    const filmPass = new ShaderPass(filmGrainMaterial);
    filmPassRef.current = filmPass;
    composer.addPass(filmPass);

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, maxDevicePixelRatio);
      const scaleFactor = w * h * dpr * dpr > pixelBudget ? Math.sqrt(pixelBudget / (w * h * dpr * dpr)) : 1;
      const finalDpr = dpr * Math.max(0.5, Math.min(1, scaleFactor));

      renderer.setPixelRatio(finalDpr);
      renderer.setSize(w, h);
      composer.setSize(w, h);

      material.uniforms.iResolution.value.set(w * finalDpr, h * finalDpr, 1);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      if (!runningRef.current) return;
      rafRef.current = requestAnimationFrame(animate);

      const now = performance.now() / 1000;
      const mat = materialRef.current!;

      if (pointerActiveRef.current) {
        velocityRef.current.set(
          currentMouseRef.current.x - mat.uniforms.iMouse.value.x,
          currentMouseRef.current.y - mat.uniforms.iMouse.value.y
        );
        mat.uniforms.iMouse.value.copy(currentMouseRef.current);
        fadeOpacityRef.current = 1.0;
      } else {
        velocityRef.current.multiplyScalar(inertia);
        if (velocityRef.current.lengthSq() > 1e-6) {
          mat.uniforms.iMouse.value.add(velocityRef.current);
        }
        const dt = performance.now() - lastMoveTimeRef.current;
        if (dt > fadeDelay) {
          fadeOpacityRef.current = Math.max(0, 1 - (dt - fadeDelay) / fadeDuration);
        }
      }

      headRef.current = (headRef.current + 1) % maxTrail;
      trailBufRef.current[headRef.current].copy(mat.uniforms.iMouse.value);
      const arr = mat.uniforms.iPrevMouse.value as THREE.Vector2[];
      for (let i = 0; i < maxTrail; i++) {
        const idx = (headRef.current - i + maxTrail) % maxTrail;
        arr[i].copy(trailBufRef.current[idx]);
      }

      mat.uniforms.iOpacity.value = fadeOpacityRef.current;
      mat.uniforms.iTime.value = now;

      const filmMaterial = filmPassRef.current?.material as THREE.ShaderMaterial | undefined;
      if (filmMaterial?.uniforms?.iTime) {
        filmMaterial.uniforms.iTime.value = now;
      }

      composer.render();

      if (!pointerActiveRef.current && fadeOpacityRef.current <= 0.001) {
        runningRef.current = false;
        rafRef.current = null;
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      currentMouseRef.current.set(
        THREE.MathUtils.clamp((e.clientX - rect.left) / rect.width, 0, 1),
        THREE.MathUtils.clamp(1 - (e.clientY - rect.top) / rect.height, 0, 1)
      );
      pointerActiveRef.current = true;
      lastMoveTimeRef.current = performance.now();
      if (!runningRef.current) {
        runningRef.current = true;
        animate();
      }
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerenter", () => { pointerActiveRef.current = true; if (!runningRef.current) animate(); });
    host.addEventListener("pointerleave", () => { pointerActiveRef.current = false; lastMoveTimeRef.current = performance.now(); });

    return () => {
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      composer.dispose();
      renderer.dispose();
    };
  }, [
    trailLength, inertia, grainIntensity, bloomStrength, bloomRadius, bloomThreshold,
    brightness, color, mixBlendMode, edgeIntensity, maxDevicePixelRatio, pixelBudget, fadeDelay, fadeDuration, scale,
    FilmGrainShader, baseVertexShader, fragmentShader, isTouch, maxTrail
  ]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.iBaseColor.value.set(color);
      materialRef.current.uniforms.iScale.value = scale;
    }
  }, [color, scale]);

  useEffect(() => {
    if (materialRef.current) materialRef.current.uniforms.iBrightness.value = brightness;
  }, [brightness]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ mixBlendMode, zIndex, ...style }}
    />
  );
};

export default Smoke;