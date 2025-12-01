"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ThreeGlobe from "three-globe";
import { Color, MeshPhongMaterial } from "three";
import countries from "@/data/globe.json";

interface GlobeProps {
  globeColor?: string;
  emissiveIntensity?: number;
  atmosphereColor?: string;
  arcColor?: string;
  autoRotateSpeed?: number;
  height?: number;
  width?: number | string;
}

export function Globe({
  globeColor = "#1d072e",
  emissiveIntensity = 0.1,
  atmosphereColor = "#ffffff",
  arcColor = "#06b6d4",
  autoRotateSpeed = 0.5,
  height = 520,
  width = "100%",
}: GlobeProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const [globeReady, setGlobeReady] = useState(false);

  // Generate a large pool of potential arcs
  const arcPool = React.useMemo(() => {
    const colors = [arcColor, "#3b82f6", "#8b5cf6", "#22d3ee"];
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      startLat: (Math.random() - 0.5) * 160,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 160,
      endLng: (Math.random() - 0.5) * 360,
      arcAlt: Math.random() * 0.4 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [arcColor]);

  // Active arcs (start empty)
  const [activeArcs, setActiveArcs] = useState<typeof arcPool>([]);

  // Trigger new arcs over time
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveArcs(prev => {
        if (prev.length >= 12) {
          // Replace oldest with new one
          const shuffled = [...prev.slice(1), arcPool[Math.floor(Math.random() * arcPool.length)]];
          return shuffled;
        }
        // Add new arc
        const newArc = arcPool[Math.floor(Math.random() * arcPool.length)];
        return [...prev.filter(a => a.id !== newArc.id), newArc].slice(0, 12);
      });
    }, 3000); // New arc every 3 seconds

    return () => clearInterval(interval);
  }, [arcPool]);

  // Ring pulse
  useEffect(() => {
    const interval = setInterval(() => {
      if (!globeRef.current) return;
      const points = activeArcs.flatMap(a => [
        { lat: a.startLat, lng: a.startLng },
        { lat: a.endLat, lng: a.endLng },
      ]);
      const unique = points.filter((v, i, a) =>
        a.findIndex(p => Math.abs(p.lat - v.lat) < 2 && Math.abs(p.lng - v.lng) < 2) === i
      );
      globeRef.current.ringsData(unique.slice(0, 8));
    }, 2500);

    return () => clearInterval(interval);
  }, [activeArcs]);

  useEffect(() => {
    const globe = new ThreeGlobe()
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .showAtmosphere(true)
      .atmosphereColor(atmosphereColor)
      .atmosphereAltitude(0.15)
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .hexPolygonColor(() => "rgba(255,255,255,0.7)")
      .arcsData(activeArcs)
      .arcColor("color")
      .arcDashLength(0.9)
      .arcDashGap(4)
      .arcDashAnimateTime(2000)
      .arcStroke(0.5)
      .pointsData(activeArcs.flatMap(a => [
        { lat: a.startLat, lng: a.startLng, size: 4 },
        { lat: a.endLat, lng: a.endLng, size: 4 },
      ]))
      .pointAltitude(0)
      .pointRadius(2)
      .ringsData([])
      .ringColor(() => (t: number) => `rgba(100, 200, 255, ${1 - t})`)
      .ringMaxRadius(5)
      .ringPropagationSpeed(3)
      .ringRepeatPeriod(700);

    const material = globe.globeMaterial() as MeshPhongMaterial;
    material.color = new Color(globeColor);
    material.emissive = new Color("#000000");
    material.emissiveIntensity = emissiveIntensity;
    material.shininess = 0.9;

    globeRef.current = globe;
    setGlobeReady(true);
  }, [globeColor, emissiveIntensity, atmosphereColor, activeArcs]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black" style={{ width, height }}>
      <Canvas camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 300] }}>
        <color attach="background" args={["#000814"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[-400, 100, 400]} intensity={1} />
        <directionalLight position={[-200, 500, 200]} intensity={1} />
        <pointLight position={[-200, 500, 200]} intensity={0.8} />

        {globeReady && globeRef.current && <primitive object={globeRef.current} />}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={autoRotateSpeed}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}