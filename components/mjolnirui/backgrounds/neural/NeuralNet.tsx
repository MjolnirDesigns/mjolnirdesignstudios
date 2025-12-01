"use client";

import React, { useEffect, useRef } from "react";
import { Renderer, Camera, Transform, Program, Mesh, Plane } from "ogl";

interface NeuralNetProps {
  hue?: number;
  saturation?: number;
  chroma?: number;
  className?: string;
}

export function NeuralNet({
  hue = 200,
  saturation = 0.8,
  chroma = 0.6,
  className,
}: NeuralNetProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const animationRef = useRef<number>(0);

  const pointer = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });
  const scrollY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new Renderer({
      canvas,
      width: canvas.clientWidth,
      height: canvas.clientHeight,
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
    });
    rendererRef.current = renderer;
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl);
    const scene = new Transform();

    const geometry = new Plane(gl, { width: 2, height: 2 });

    const vertex = `
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
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_ratio;
      uniform vec2 u_pointer_position;
      uniform float u_scroll_progress;
      uniform float u_hue;
      uniform float u_saturation;
      uniform float u_chroma;

      vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
      }

      float neuro_shape(vec2 uv, float t, float p) {
        vec2 sine_acc = vec2(0.);
        vec2 res = vec2(0.);
        float scale = 8.0;
        for (int j = 0; j < 15; j++) {
          uv = rotate(uv, 1.0);
          sine_acc = rotate(sine_acc, 1.0);
          vec2 layer = uv * scale + float(j) + sine_acc - t;
          sine_acc += sin(layer) + 2.4 * p;
          res += (0.5 + 0.5 * cos(layer)) / scale;
          scale *= 1.2;
        }
        return res.x + res.y;
      }

      vec3 hsl2rgb(vec3 c) {
        vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
        return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
      }

      void main() {
        vec2 uv = 0.5 * vUv;
        uv.x *= u_ratio;

        vec2 pointer = vUv - u_pointer_position;
        pointer.x *= u_ratio;
        float p = clamp(length(pointer), 0.0, 1.0);
        p = 0.5 * pow(1.0 - p, 2.0);

        float t = 0.001 * u_time;
        float noise = neuro_shape(uv, t, p);
        noise = 1.2 * pow(noise, 3.0);
        noise += pow(noise, 10.0);
        noise = max(0.0, noise - 0.5);
        noise *= (1.0 - length(vUv - 0.5));

        float normalizedHue = u_hue / 360.0;
        vec3 hsl = vec3(
          normalizedHue + 0.1 * sin(3.0 * u_scroll_progress + 1.5),
          u_saturation,
          u_chroma * 0.5 + 0.2 * sin(2.0 * u_scroll_progress)
        );

        vec3 color = hsl2rgb(hsl);
        color *= noise;

        gl_FragColor = vec4(color, noise);
      }
    `;

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        u_time: { value: 0 },
        u_ratio: { value: canvas.clientWidth / canvas.clientHeight },
        u_pointer_position: { value: [0.5, 0.5] },
        u_scroll_progress: { value: 0 },
        u_hue: { value: hue },
        u_saturation: { value: saturation },
        u_chroma: { value: chroma },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);
    meshRef.current = mesh;

    const handleMouseMove = (e: MouseEvent) => {
      pointer.current.tx = e.clientX / window.innerWidth;
      pointer.current.ty = 1 - e.clientY / window.innerHeight;
    };

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    const animate = () => {
      // Smooth pointer
      pointer.current.x += (pointer.current.tx - pointer.current.x) * 0.2;
      pointer.current.y += (pointer.current.ty - pointer.current.y) * 0.2;

      if (mesh.program.uniforms.u_time) {
        mesh.program.uniforms.u_time.value = performance.now();
      }
      if (mesh.program.uniforms.u_pointer_position) {
        mesh.program.uniforms.u_pointer_position.value = [pointer.current.x, pointer.current.y];
      }
      if (mesh.program.uniforms.u_scroll_progress) {
        mesh.program.uniforms.u_scroll_progress.value = scrollY.current / (window.innerHeight * 2);
      }

      renderer.render({ scene, camera });
      animationRef.current = requestAnimationFrame(animate);
    };

    const resize = () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      if (mesh.program.uniforms.u_ratio) {
        mesh.program.uniforms.u_ratio.value = canvas.clientWidth / canvas.clientHeight;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resize);
    };
  }, [hue, saturation, chroma]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none opacity-95 ${className || ""}`}
    />
  );
}