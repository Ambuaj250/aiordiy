'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import type { Mesh } from 'three';

function Blob() {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.08;
    ref.current.rotation.y += delta * 0.12;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
      <Icosahedron ref={ref} args={[1.4, 6]}>
        <MeshDistortMaterial
          color="#a78bfa"
          emissive="#22d3ee"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.6}
          distort={0.45}
          speed={1.6}
        />
      </Icosahedron>
    </Float>
  );
}

export default function HeroCanvas() {
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reduced) return null;

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#f472b6" />
      <directionalLight position={[-4, -2, -3]} intensity={0.8} color="#22d3ee" />
      <Blob />
    </Canvas>
  );
}
