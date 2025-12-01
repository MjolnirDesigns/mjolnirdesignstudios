// components/mjolnirui/backgrounds/shaders/StarField.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { Renderer, Camera, Transform, Program, Mesh, Vec2, Geometry } from "ogl";

type StarFieldProps = {
  speed?: number;
  brightness?: number;
  saturation?: number;
  hue?: number;
  zoom?: number;
  iterations?: number;
  darkMatter?: number;
  className?: string;
  style?: React.CSSProperties;
};

const StarField: React.FC<StarFieldProps> = ({
  speed = 1.0,
  brightness = 1.5,
  saturation = 0.85,
  hue = 0,
  zoom = 0.8,
  iterations = 17,
  darkMatter = 0.3,
  className = "",
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const programRef = useRef<Program | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
    const gl = renderer.gl;
    containerRef.current.appendChild(gl.canvas);
    rendererRef.current = renderer;

    const camera = new Camera(gl);
    camera.position.z = 1;

    const scene = new Transform();

    const vertex = /* glsl */ `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragment = /* glsl */ `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec2 iMouse;
      uniform float speed;
      uniform float brightness;
      uniform float saturation;
      uniform float hue;
      uniform float zoom;
      uniform float darkMatter;
      uniform int iterations;

      #define volsteps 20
      #define stepsize 0.1
      #define tile 0.850
      #define formuparam 0.53

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = fragCoord/iResolution.xy - 0.5;
        uv.y *= iResolution.y/iResolution.x;
        vec3 dir = vec3(uv * zoom, 1.0);
        float time = iTime * 0.01 * speed + 0.25;

        float a1 = 0.5 + iMouse.x/iResolution.x*2.0;
        float a2 = 0.8 + iMouse.y/iResolution.y*2.0;
        mat2 rot1 = mat2(cos(a1), sin(a1), -sin(a1), cos(a1));
        mat2 rot2 = mat2(cos(a2), sin(a2), -sin(a2), cos(a2));
        dir.xz *= rot1;
        dir.xy *= rot2;
        vec3 from = vec3(1.0, 0.5, 0.5);
        from += vec3(time*2.0, time, -2.0);
        from.xz *= rot1;
        from.xy *= rot2;

        float s = 0.1, fade = 1.0;
        vec3 v = vec3(0.0);
        for (int r = 0; r < volsteps; r++) {
          vec3 p = from + s * dir * 0.5;
          p = abs(vec3(tile) - mod(p, vec3(tile*2.0)));
          float pa, a = pa = 0.0;
          for (int i = 0; i < iterations; i++) {
            p = abs(p)/dot(p,p) - formuparam;
            a += abs(length(p) - pa);
            pa = length(p);
          }
          float dm = max(0.0, darkMatter - a*a*0.001);
          a *= a*a;
          if (r > 6) fade *= 1.0 - dm;
          v += fade;
          v += vec3(s,s*s,s*s*s*s*s)*a*brightness*fade;
          fade *= 0.73;
          s += stepsize;
        }
        v = mix(vec3(length(v)), v, saturation);
        vec3 col = v * 0.01;
        col = hsv2(col + vec3(hue/360.0, 0.0, 0.0));
        fragColor = vec4(col, 1.0);
      }

      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const geometry = new Mesh(gl, {
      geometry: new Geometry(gl, {
        position: { size: 2, data: new Float32Array([
          -1, -1,
           1, -1,
          -1,  1,
           1,  1,
        ]) }
      }),
      program: new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new Vec2(gl.canvas.width, gl.canvas.height) },
          iMouse: { value: new Vec2() },
          speed: { value: speed },
          brightness: { value: brightness },
          saturation: { value: saturation },
          hue: { value: hue },
          zoom: { value: zoom },
          darkMatter: { value: darkMatter },
          iterations: { value: iterations },
        },
      }),
    });

    geometry.setParent(scene);

    const handleResize = () => {
      renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
      geometry.program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = gl.canvas.getBoundingClientRect();
      geometry.program.uniforms.iMouse.value.set(
        e.clientX - rect.left,
        gl.canvas.height - (e.clientY - rect.top)
      );
    };

    window.addEventListener("resize", handleResize);
    gl.canvas.addEventListener("mousemove", handleMouseMove);

    const start = performance.now();
    const animate = () => {
      const now = performance.now();
      geometry.program.uniforms.iTime.value = (now - start) * 0.001;
      renderer.render({ scene, camera });
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      gl.canvas.removeEventListener("mousemove", handleMouseMove);
      renderer.gl.canvas.remove();
    };
  }, []);

  useEffect(() => {
    if (programRef.current) {
      programRef.current.uniforms.speed.value = speed;
      programRef.current.uniforms.brightness.value = brightness;
      programRef.current.uniforms.saturation.value = saturation;
      programRef.current.uniforms.hue.value = hue;
      programRef.current.uniforms.zoom.value = zoom;
      programRef.current.uniforms.darkMatter.value = darkMatter;
      programRef.current.uniforms.iterations.value = iterations;
    }
  }, [speed, brightness, saturation, hue, zoom, iterations, darkMatter]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={style}
    />
  );
};

export default StarField;