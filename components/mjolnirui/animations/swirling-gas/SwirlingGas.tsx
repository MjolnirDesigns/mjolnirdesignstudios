"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

type SwirlingGasProps = {
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
  intensity?: number;
};

export default function SwirlingGas({
  className,
  style,
  speed = 1.0,
  intensity = 1.2,
}: SwirlingGasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!containerRef.current || mounted.current) return;
    mounted.current = true;

    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3() },
      u_speed: { value: speed },
      u_intensity: { value: intensity },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec3 iResolution;
        uniform float u_speed;
        uniform float u_intensity;

        void mainImage(out vec4 O, vec2 I) {
          float i, z = fract(dot(I,sin(I))), d;
          for(O *= i; i++<1e2; O+=(sin(z+vec4(6,2,4,0))+1.5)/d * u_intensity) {
            vec3 p = z * normalize(vec3(I+I,0) - iResolution.xyy);
            p.z += 6.;
            for(d=1.; d<9.; d/=.8)
              p += cos(p.yzx*d-iTime * u_speed)/d;
            z += d = .002+abs(length(p)-.5)/4e1;
          }
          O = tanh(O/7e3);
        }

        varying vec2 vUv;
        void main() {
          mainImage(gl_FragColor, vUv * iResolution.xy);
        }
      `,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.iResolution.value.set(width, height, 1);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const startTime = performance.now();

    const animate = () => {
      if (!mounted.current) return;
      frameRef.current = requestAnimationFrame(animate);

      const elapsed = (performance.now() - startTime) / 1000;
      uniforms.iTime.value = elapsed;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mounted.current = false;
      window.removeEventListener("resize", handleResize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current = null;
      }
    };
  }, []); // ← Only once

  // Update speed/intensity without breaking
  useEffect(() => {
    // Find the material from the mesh in the scene
    const renderer = rendererRef.current;
    if (renderer && renderer.domElement && mounted.current) {
      // Find the mesh and update its material uniforms
      const container = containerRef.current;
      if (container) {
        // Find the mesh in the scene
        const scene = (renderer as THREE.WebGLRenderer & { scene?: THREE.Scene }).scene;
        const sceneMeshes: THREE.Object3D[] = scene?.children || [];
        const mesh = sceneMeshes.find((obj: THREE.Object3D) => {
          // @ts-expect-error: material may exist on Mesh
          return obj.material && obj.material.uniforms;
        }) as THREE.Mesh | undefined;
        const mat = mesh?.material as THREE.ShaderMaterial | undefined;
        if (mat?.uniforms) {
          mat.uniforms.u_speed.value = speed;
          mat.uniforms.u_intensity.value = intensity;
        }
      }
    }
  }, [speed, intensity]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full ${className || ""}`}
      style={{ background: "black", ...style }}
    />
  );
}