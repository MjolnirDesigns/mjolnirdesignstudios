// components/mjolnirui/backgrounds/shaders/SwirlingGas.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { Renderer, Camera, Transform, Program, Mesh, Geometry, Vec2 } from "ogl";

type SwirlingGasProps = {
  speed?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  intensity?: number;
  className?: string;
  style?: React.CSSProperties;
};

const SwirlingGas: React.FC<SwirlingGasProps> = ({
  speed = 1.0,
  hue = 200,
  saturation = 1.0,
  brightness = 1.0,
  intensity = 1.0,
  className = "",
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const sceneRef = useRef<Transform | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
      antialias: true,
    });
    const gl = renderer.gl;
    containerRef.current.appendChild(gl.canvas);
    rendererRef.current = renderer;

    const camera = new Camera(gl);
    camera.position.z = 1;

    const scene = new Transform();
    sceneRef.current = scene;

    const geometry = new Geometry(gl, {
      position: {
        size: 2,
        data: new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      },
    });

    const program = new Program(gl, {
      vertex: /* glsl */ `
        attribute vec2 position;
        void main() {
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `,
      fragment: /* glsl */ `
        precision highp float;
        uniform float iTime;
        uniform vec2 iResolution;
        uniform float speed;
        uniform float hue;
        uniform float saturation;
        uniform float brightness;
        uniform float intensity;

        vec3 hsv2rgb(vec3 c) {
          vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
          vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
          return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }

        void mainImage(out vec4 O, vec2 I) {
          float i, z = fract(dot(I, sin(I))), d;
          for(O *= i; i++ < 100.0; 
              O += (sin(z + vec4(6,2,4,0)) + 1.5) / d * intensity)
          {
            vec3 p = z * normalize(vec3(I + I, 0) - iResolution.xyy);
            p.z += 6.0;
            for(d = 1.0; d < 9.0; d /= 0.8)
              p += cos(p.yzx * d - iTime * speed) / d;
            z += d = 0.002 + abs(length(p) - 0.5) / 40000.0;
          }
          // FIXED: Added missing closing parenthesis
          O = tanh(O / 7000.0);
          O.rgb = hsv2rgb(vec3(hue/360.0 + O.r*0.1, saturation, brightness));
        }

        void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
        }
      `,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec2() }, // ← FIXED: Vec2 instance
        speed: { value: speed },
        hue: { value: hue },
        saturation: { value: saturation },
        brightness: { value: brightness },
        intensity: { value: intensity },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);
    meshRef.current = mesh;

    const handleResize = () => {
      const width = containerRef.current!.clientWidth;
      const height = containerRef.current!.clientHeight;
      renderer.setSize(width, height);
      program.uniforms.iResolution.value.set(width * renderer.dpr, height * renderer.dpr);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const start = performance.now();
    const animate = () => {
      program.uniforms.iTime.value = (performance.now() - start) * 0.001;
      renderer.render({ scene, camera });
      frameIdRef.current = requestAnimationFrame(animate);
    };
    frameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener("resize", handleResize);
      if (gl.canvas.parentElement) gl.canvas.parentElement.removeChild(gl.canvas);
    };
  }, []);

  useEffect(() => {
    if (meshRef.current?.program) {
      const u = meshRef.current.program.uniforms;
      u.speed.value = speed;
      u.hue.value = hue;
      u.saturation.value = saturation;
      u.brightness.value = brightness;
      u.intensity.value = intensity;
    }
  }, [speed, hue, saturation, brightness, intensity]);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`} style={style} />
  );
};

export default SwirlingGas;