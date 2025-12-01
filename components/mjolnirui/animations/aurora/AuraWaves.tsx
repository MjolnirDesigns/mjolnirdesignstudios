"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";

const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m*m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  // Smooth color ramp
  vec3 c1 = uColorStops[0];
  vec3 c2 = uColorStops[1];
  vec3 c3 = uColorStops[2];
  vec3 color = mix(mix(c1, c2, smoothstep(0.0, 0.5, uv.x)), c3, smoothstep(0.5, 1.0, uv.x));

  // Double noise for organic flow
  float n1 = snoise(vec2(uv.x * 3.0 + uTime * 0.08, uTime * 0.15)) * 0.5 + 0.5;
  float n2 = snoise(vec2(uv.x * 2.0 - uTime * 0.05, uTime * 0.1)) * 0.3 + 0.7;
  float wave = (n1 + n2) * 0.5;

  float height = pow(wave, 2.5) * uAmplitude;
  float dist = uv.y - height + 0.35;

  float alpha = smoothstep(0.0 - uBlend, 0.0 + uBlend, dist);
  alpha *= smoothstep(1.0 + uBlend, 0.8, uv.y);

  vec3 finalColor = color * dist * 3.5;

  fragColor = vec4(finalColor, alpha);
}
`;

type AuroraProps = {
  className?: string;
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
};

export default function Aurora({
  className,
  colorStops = ["#ffb3d1", "#b3ffe6", "#4da6ff"],
  amplitude = 1.2,
  blend = 0.6,
  speed = 0.4,
}: AuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const geometry = new Triangle(gl);
    // Remove the 'uv' attribute if present
    delete (geometry as Triangle).attributes.uv;

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uBlend: { value: blend },
        uResolution: { value: [container.offsetWidth, container.offsetHeight] },
        uColorStops: {
          value: colorStops.map((hex) => {
            const c = new Color(hex);
            return [c.r, c.g, c.b]; // ← FIXED: no .toArray()
          }),
        },
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

    let frame = 0;
    const animate = (t: number) => {
      frame = requestAnimationFrame(animate);
      program.uniforms.uTime.value = t * 0.001 * speed;
      program.uniforms.uAmplitude.value = amplitude;
      program.uniforms.uBlend.value = blend;
      program.uniforms.uColorStops.value = colorStops.map((hex) => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });
      renderer.render({ scene: mesh });
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      if (gl.canvas.parentNode) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [colorStops, amplitude, blend, speed]);

  return <div ref={containerRef} className={`w-full h-full ${className || ""}`} />;
}