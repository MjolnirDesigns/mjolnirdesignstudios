"use client";

import React, { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Transform } from "ogl";

const vertex = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const blackhole = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uSpeed;
  uniform float uIntensity;
  uniform float uDistortion;
  uniform float uGlow;
  uniform float uFrequency;

  vec4 permute_3d(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt3d(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

  float simplexNoise3d(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

      i = mod(i, 289.0);
      vec4 p = permute_3d(permute_3d(permute_3d(i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      float n_ = 1.0/7.0;
      vec3 ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      vec4 norm = taylorInvSqrt3d(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  float fbm3d(vec3 x, int it) {
      float v = 0.0;
      float a = 0.5;
      vec3 shift = vec3(100);
      for (int i = 0; i < 32; ++i) {
          if(i < it) {
              v += a * simplexNoise3d(x);
              x = x * 2.0 + shift;
              a *= 0.5;
          }
      }
      return v;
  }

  vec3 rotateZ(vec3 v, float angle) {
      float c = cos(angle);
      float s = sin(angle);
      return vec3(v.x * c - v.y * s, v.x * s + v.y * c, v.z);
  }

  float facture(vec3 v) {
      vec3 n = normalize(v);
      return max(max(n.x, n.y), n.z);
  }

  vec3 emission(vec3 color, float strength) {
      return color * strength;
  }

  void main() {
      vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / uResolution.y;

      vec3 color = vec3(uv.xy, 0.0);
      color.z += 0.5;
      color = normalize(color);
      color -= 0.2 * vec3(0.0, 0.0, uTime * uSpeed);

      float angle = -log2(length(uv));
      color = rotateZ(color, angle);

      float frequency = uFrequency;
      float distortion = 0.01 * uDistortion;
      color.x = fbm3d(color * frequency + 0.0, 5) + distortion;
      color.y = fbm3d(color * frequency + 1.0, 5) + distortion;
      color.z = fbm3d(color * frequency + 2.0, 5) + distortion;

      vec3 noiseColor = color;
      noiseColor *= 2.0 * uIntensity;
      noiseColor -= 0.1;
      noiseColor *= 0.188 * uGlow;
      noiseColor += vec3(uv.xy, 0.0);

      float noiseColorLength = length(noiseColor);
      noiseColorLength = 0.770 - noiseColorLength;
      noiseColorLength *= 4.2 * uGlow;
      noiseColorLength = pow(noiseColorLength, 1.0);

      vec3 emissionColor = emission(vec3(0.961, 0.592, 0.078), noiseColorLength * 0.4);

      float fac = length(uv) - facture(color + 0.32);
      fac += 0.1;
      fac *= 3.0 * uIntensity;

      color = mix(emissionColor, vec3(fac), fac + 1.2);

      gl_FragColor = vec4(color, 1.0);
  }
`;

interface BlackHoleProps {
  className?: string;
  speed?: number;
  intensity?: number;
  distortion?: number;
  glow?: number;
  frequency?: number;
}

export default function BlackHole({
  className,
  speed = 1.0,
  intensity = 1.0,
  distortion = 1.0,
  glow = 1.0,
  frequency = 1.4,
}: BlackHoleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment: blackhole,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [container.offsetWidth, container.offsetHeight] },
        uSpeed: { value: speed },
        uIntensity: { value: intensity },
        uDistortion: { value: distortion },
        uGlow: { value: glow },
        uFrequency: { value: frequency },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    const scene = new Transform();
    scene.addChild(mesh);

    container.appendChild(gl.canvas);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";

    const handleResize = () => {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      program.uniforms.uResolution.value = [container.offsetWidth, container.offsetHeight];
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    let frame = 0;
    const animate = (t: number) => {
      frame = requestAnimationFrame(animate);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene });
    };
    requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      if (gl.canvas.parentNode) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [speed, intensity, distortion, glow, frequency]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className || ""}`}
      style={{ background: "black" }}
    />
  );
}