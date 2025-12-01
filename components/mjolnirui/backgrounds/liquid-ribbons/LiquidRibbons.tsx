"use client";

import React, { useEffect, useRef } from "react";
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  PlaneGeometry,
  Mesh,
  ShaderMaterial,
  Vector3,
  Vector2,
  Clock,
  Color,
} from "three";

interface WavePosition {
  x: number;
  y: number;
  rotate: number;
}

interface LiquidRibbonsProps {
  linesGradient?: string[];
  enabledWaves?: Array<"top" | "middle" | "bottom">;
  lineCount?: number | number[];
  lineDistance?: number | number[];
  topWavePosition?: WavePosition;
  middleWavePosition?: WavePosition;
  bottomWavePosition?: WavePosition;
  animationSpeed?: number;
  interactive?: boolean;
  bendRadius?: number;
  bendStrength?: number;
  mouseDamping?: number;
  parallax?: boolean;
  parallaxStrength?: number;
  mixBlendMode?: React.CSSProperties["mixBlendMode"];
  className?: string;
}

const MAX_GRADIENT_STOPS = 8;

const vertexShader = `
  precision highp float;
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  
  uniform float iTime;
  uniform vec3 iResolution;
  uniform float animationSpeed;

  uniform bool enableTop;
  uniform bool enableMiddle;
  uniform bool enableBottom;

  uniform int topLineCount;
  uniform int middleLineCount;
  uniform int bottomLineCount;

  uniform float topLineDistance;
  uniform float middleLineDistance;
  uniform float bottomLineDistance;

  uniform vec3 topWavePosition;
  uniform vec3 middleWavePosition;
  uniform vec3 bottomWavePosition;

  uniform vec2 iMouse;
  uniform bool interactive;

  uniform float bendRadius;
  uniform float bendStrength;
  uniform float bendInfluence;

  uniform bool parallax;
  uniform float parallaxStrength;
  uniform vec2 parallaxOffset;
  uniform vec3 lineGradient[8];
  uniform int lineGradientCount;

  mat2 rotate(float r) {
    return mat2(cos(r), sin(r), -sin(r), cos(r));
  }

  vec3 getLineColor(float t) {
    if (lineGradientCount <= 0) return vec3(1.0, 0.4, 0.8);
    float clampedT = clamp(t, 0.0, 0.9999);
    float scaled = clampedT * float(lineGradientCount - 1);
    int idx = int(floor(scaled));
    float f = fract(scaled);
    int idx2 = min(idx + 1, lineGradientCount - 1);
    return mix(lineGradient[idx], lineGradient[idx2], f);
  }

  float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
    float time = iTime * animationSpeed;
    float x_movement = time * 0.1;
    float amp = sin(offset + time * 0.2) * 0.3;
    float y = sin(uv.x + offset + x_movement) * amp;
    
    if (shouldBend && interactive) {
      vec2 d = screenUv - mouseUv;
      float influence = exp(-dot(d, d) * bendRadius);
      float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
      y += bendOffset;
    }
    
    float m = uv.y - y;
    return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
  }

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    baseUv.y *= -1.0;
    
    if (parallax) baseUv += parallaxOffset;
    
    vec3 col = vec3(0.0);
    vec2 mouseUv = interactive ? (2.0 * iMouse - iResolution.xy) / iResolution.y : vec2(0.0);
    mouseUv.y *= -1.0;

    if (enableBottom) {
      for (int i = 0; i < bottomLineCount; ++i) {
        float fi = float(i);
        float t = fi / max(float(bottomLineCount - 1), 1.0);
        vec3 lineCol = getLineColor(t);
        float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
        vec2 ruv = baseUv * rotate(angle);
        col += lineCol * wave(
          ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
          1.5 + 0.2 * fi,
          baseUv,
          mouseUv,
          true
        ) * 0.2;
      }
    }
    if (enableMiddle) {
      for (int i = 0; i < middleLineCount; ++i) {
        float fi = float(i);
        float t = fi / max(float(middleLineCount - 1), 1.0);
        vec3 lineCol = getLineColor(t);
        float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
        vec2 ruv = baseUv * rotate(angle);
        col += lineCol * wave(
          ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
          2.0 + 0.15 * fi,
          baseUv,
          mouseUv,
          true
        );
      }
    }
    if (enableTop) {
      for (int i = 0; i < topLineCount; ++i) {
        float fi = float(i);
        float t = fi / max(float(topLineCount - 1), 1.0);
        vec3 lineCol = getLineColor(t);
        float angle = topWavePosition.z * log(length(baseUv) + 1.0);
        vec2 ruv = baseUv * rotate(angle);
        ruv.x *= -1.0;
        col += lineCol * wave(
          ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
          1.0 + 0.2 * fi,
          baseUv,
          mouseUv,
          true
        ) * 0.1;
      }
    }
    fragColor = vec4(col, 1.0);
  }

  void main() {
    vec4 color;
    mainImage(color, gl_FragCoord.xy);
    gl_FragColor = color;
  }
`;

export default function LiquidRibbons({
  linesGradient = ["#5227FF", "#FF9FFC", "#B19EEF"],
  enabledWaves = ["top", "middle", "bottom"],
  lineCount = [10, 15, 20],
  lineDistance = [8, 6, 4],
  topWavePosition = { x: 10, y: 0.5, rotate: -0.4 },
  middleWavePosition = { x: 5, y: 0, rotate: 0.2 },
  bottomWavePosition = { x: 2.0, y: -0.7, rotate: 0.4 },
  animationSpeed = 1,
  interactive = true,
  bendRadius = 5.0,
  bendStrength = -0.5,
  mouseDamping = 0.05,
  parallax = true,
  parallaxStrength = 0.2,
  mixBlendMode = "screen",
  className = "",
}: LiquidRibbonsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetMouse = useRef(new Vector2(-1000, -1000));
  const currentMouse = useRef(new Vector2(-1000, -1000));
  const targetInfluence = useRef(0);
  const currentInfluence = useRef(0);
  const targetParallax = useRef(new Vector2(0, 0));
  const currentParallax = useRef(new Vector2(0, 0));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 1;

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const getCount = (type: "top" | "middle" | "bottom") => {
      if (typeof lineCount === "number") return lineCount;
      const idx = enabledWaves.indexOf(type);
      return idx >= 0 ? lineCount[idx] ?? 10 : 0;
    };

    const getDistance = (type: "top" | "middle" | "bottom") => {
      if (typeof lineDistance === "number") return lineDistance * 0.01;
      const idx = enabledWaves.indexOf(type);
      return idx >= 0 ? (lineDistance[idx] ?? 5) * 0.01 : 0.01;
    };

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new Vector3() },
      animationSpeed: { value: animationSpeed },
      enableTop: { value: enabledWaves.includes("top") },
      enableMiddle: { value: enabledWaves.includes("middle") },
      enableBottom: { value: enabledWaves.includes("bottom") },
      topLineCount: { value: getCount("top") },
      middleLineCount: { value: getCount("middle") },
      bottomLineCount: { value: getCount("bottom") },
      topLineDistance: { value: getDistance("top") },
      middleLineDistance: { value: getDistance("middle") },
      bottomLineDistance: { value: getDistance("bottom") },
      topWavePosition: { value: new Vector3(topWavePosition.x, topWavePosition.y, topWavePosition.rotate) },
      middleWavePosition: { value: new Vector3(middleWavePosition.x, middleWavePosition.y, middleWavePosition.rotate) },
      bottomWavePosition: { value: new Vector3(bottomWavePosition.x, bottomWavePosition.y, bottomWavePosition.rotate) },
      iMouse: { value: new Vector2(-1000, -1000) },
      interactive: { value: interactive },
      bendRadius: { value: bendRadius },
      bendStrength: { value: bendStrength },
      bendInfluence: { value: 0 },
      parallax: { value: parallax },
      parallaxStrength: { value: parallaxStrength },
      parallaxOffset: { value: new Vector2(0, 0) },
      lineGradient: { value: Array.from({ length: MAX_GRADIENT_STOPS }, () => new Vector3(1, 1, 1)) },
      lineGradientCount: { value: 0 },
    };

    if (linesGradient?.length) {
      const stops = linesGradient.slice(0, MAX_GRADIENT_STOPS);
      uniforms.lineGradientCount.value = stops.length;
      stops.forEach((hex, i) => {
        const c = new Color(hex);
        uniforms.lineGradient.value[i].set(c.r, c.g, c.b);
      });
    }

    const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    const mesh = new Mesh(new PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const clock = new Clock();

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h, false);
      uniforms.iResolution.value.set(renderer.domElement.width, renderer.domElement.height, 1);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dpr = renderer.getPixelRatio();
      targetMouse.current.set(x * dpr, (rect.height - y) * dpr);
      targetInfluence.current = 1.0;

      if (parallax) {
        const offsetX = (x - rect.width / 2) / (rect.width / 2);
        const offsetY = -(y - rect.height / 2) / (rect.height / 2);
        targetParallax.current.set(offsetX * parallaxStrength, offsetY * parallaxStrength);
      }
    };

    const handleLeave = () => { targetInfluence.current = 0; };

    if (interactive) {
      renderer.domElement.addEventListener("pointermove", handleMove);
      renderer.domElement.addEventListener("pointerleave", handleLeave);
    }

    let raf = 0;
    const animate = () => {
      uniforms.iTime.value = clock.getElapsedTime();

      if (interactive) {
        currentMouse.current.lerp(targetMouse.current, mouseDamping);
        uniforms.iMouse.value.copy(currentMouse.current);
        currentInfluence.current += (targetInfluence.current - currentInfluence.current) * mouseDamping;
        uniforms.bendInfluence.value = currentInfluence.current;
      }

      if (parallax) {
        currentParallax.current.lerp(targetParallax.current, mouseDamping);
        uniforms.parallaxOffset.value.copy(currentParallax.current);
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (interactive) {
        renderer.domElement.removeEventListener("pointermove", handleMove);
        renderer.domElement.removeEventListener("pointerleave", handleLeave);
      }
      mesh.geometry.dispose();
      mesh.material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [
    linesGradient, enabledWaves, lineCount, lineDistance,
    topWavePosition, middleWavePosition, bottomWavePosition,
    animationSpeed, interactive, bendRadius, bendStrength,
    mouseDamping, parallax, parallaxStrength
  ]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{ mixBlendMode, touchAction: "none" }}
    />
  );
}