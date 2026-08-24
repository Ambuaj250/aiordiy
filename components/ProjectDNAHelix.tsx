'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Trail, Float, Sparkles, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// Project data type
interface Project {
  id: string;
  name: string;
  description: string;
  type: 'ai' | 'diy';
  tech: string[];
  stars: number;
  forks: number;
  color: string;
  liveUrl?: string;
  githubUrl?: string;
}

// Sample projects - replace with your actual projects
const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'AutoScraper',
    description: 'AI-powered web scraper that learns page structures',
    type: 'ai',
    tech: ['Python', 'LLM', 'Playwright'],
    stars: 127,
    forks: 23,
    color: '#00D4FF',
    liveUrl: 'https://autoscraper.ai',
    githubUrl: 'https://github.com/Ambuaj250/autoscraper'
  },
  {
    id: '2',
    name: 'SmartHome Hub',
    description: 'DIY home automation with local AI voice control',
    type: 'diy',
    tech: ['Raspberry Pi', 'Whisper', 'MQTT'],
    stars: 89,
    forks: 15,
    color: '#FF6B35',
    githubUrl: 'https://github.com/Ambuaj250/smarthome-hub'
  },
  {
    id: '3',
    name: 'CodeGen Assistant',
    description: 'Browser extension for AI code generation',
    type: 'ai',
    tech: ['TypeScript', 'Chrome API', 'Claude API'],
    stars: 234,
    forks: 45,
    color: '#00D4FF',
    liveUrl: 'https://codegen.aiordiy.com',
    githubUrl: 'https://github.com/Ambuaj250/codegen-assistant'
  },
  {
    id: '4',
    name: 'LED Matrix Display',
    description: 'Custom 64x64 LED matrix with real-time data viz',
    type: 'diy',
    tech: ['Arduino', 'C++', 'WebSocket'],
    stars: 67,
    forks: 12,
    color: '#FF6B35',
    githubUrl: 'https://github.com/Ambuaj250/led-matrix'
  },
  {
    id: '5',
    name: 'PromptEngine',
    description: 'Prompt optimization using genetic algorithms',
    type: 'ai',
    tech: ['Python', 'LangChain', 'Streamlit'],
    stars: 156,
    forks: 31,
    color: '#00D4FF',
    liveUrl: 'https://promptengine.aiordiy.com'
  },
  {
    id: '6',
    name: 'CNC Plotter',
    description: 'DIY CNC drawing machine from old DVD drives',
    type: 'diy',
    tech: ['Arduino', 'GRBL', 'Inkscape'],
    stars: 45,
    forks: 8,
    color: '#FF6B35'
  }
];

// DNA Strand Component
function DNAStrand({ 
  projects, 
  strandOffset, 
  isAI 
}: { 
  projects: Project[]; 
  strandOffset: number; 
  isAI: boolean;
}) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const projectCount = projects.length;
    const height = projectCount * 3;
    const turns = projectCount * 0.5;
    
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const angle = t * Math.PI * 2 * turns + strandOffset;
      const y = (t - 0.5) * height;
      const radius = 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, [projects.length, strandOffset]);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  
  return (
    <>
      <mesh>
        <tubeGeometry args={[curve, 100, 0.05, 8, false]} />
        <meshStandardMaterial 
          color={isAI ? '#00D4FF' : '#FF6B35'} 
          emissive={isAI ? '#00D4FF' : '#FF6B35'}
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* Connection rungs between strands */}
      {projects.map((project, idx) => {
        const t = (idx + 0.5) / projects.length;
        const angle = t * Math.PI * 2 * (projects.length * 0.5) + strandOffset;
        const y = (t - 0.5) * projects.length * 3;
        const x = Math.cos(angle) * 2;
        const z = Math.sin(angle) * 2;
        
        return (
          <ProjectNode 
            key={project.id}
            project={project}
            position={[x, y, z]}
            angle={angle}
            index={idx}
          />
        );
      })}
    </>
  );
}

// Individual Project Node
function ProjectNode({ 
  project, 
  position, 
  angle, 
  index 
}: { 
  project: Project; 
  position: [number, number, number];
  angle: number;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      
      // Pulse effect based on stars
      const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.1 * (project.stars / 100);
      meshRef.current.scale.setScalar(hovered ? 1.3 : pulseScale);
    }
  });

  const nodeColor = project.type === 'ai' ? '#00D4FF' : '#FF6B35';
  const nodeEmissive = project.type === 'ai' ? '#0088AA' : '#CC5522';

  return (
    <group position={position}>
      {/* Glow effect */}
      <pointLight 
        color={nodeColor} 
        intensity={hovered ? 3 : 1} 
        distance={5} 
        decay={2}
      />
      
      {/* Main node sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setSelected(!selected)}
      >
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color={nodeColor}
          emissive={nodeEmissive}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      
      {/* Orbiting particles */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {project.tech.map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / project.tech.length) * Math.PI * 2 + angle) * 0.8,
              Math.sin((i / project.tech.length) * Math.PI * 2) * 0.3,
              Math.sin((i / project.tech.length) * Math.PI * 2 + angle) * 0.8
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color={nodeColor} transparent opacity={0.6} />
          </mesh>
        ))}
      </Float>
      
      {/* HTML Label */}
      <Html
        position={[0, 0.8, 0]}
        center
        distanceFactor={8}
        style={{
          transition: 'all 0.3s ease',
          opacity: hovered || selected ? 1 : 0.3,
          transform: `scale(${hovered || selected ? 1.2 : 1})`,
          pointerEvents: 'none'
        }}
      >
        <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1 whitespace-nowrap">
          <span className="text-white text-xs font-bold">{project.name}</span>
          <span className="text-[10px] ml-2 text-gray-400">⭐ {project.stars}</span>
        </div>
      </Html>
      
      {/* Selection ring */}
      {selected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.6, 0.7, 64]} />
          <meshBasicMaterial color={nodeColor} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

// Camera controller with smooth movement
function CameraController() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(8, 0, 8);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime * 0.1;
    camera.position.x = Math.sin(time) * 8;
    camera.position.z = Math.cos(time) * 8;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

// Connection lines between strands (the "rungs" of DNA)
function DNALadders({ projects }: { projects: Project[] }) {
  const ladders = useMemo(() => {
    const items: { start: THREE.Vector3; end: THREE.Vector3; project: Project }[] = [];
    const projectCount = projects.length;
    const height = projectCount * 3;
    const turns = projectCount * 0.5;
    const offset = Math.PI; // 180 degrees offset for double helix
    
    projects.forEach((project, idx) => {
      const t = (idx + 0.5) / projectCount;
      const angle1 = t * Math.PI * 2 * turns;
      const angle2 = angle1 + offset;
      const y = (t - 0.5) * height;
      const radius = 2;
      
      items.push({
        start: new THREE.Vector3(Math.cos(angle1) * radius, y, Math.sin(angle1) * radius),
        end: new THREE.Vector3(Math.cos(angle2) * radius, y, Math.sin(angle2) * radius),
        project
      });
    });
    
    return items;
  }, [projects]);

  return (
    <>
      {ladders.map((ladder, idx) => (
        <mesh key={idx}>
          <cylinderGeometry 
            args={[0.02, 0.02, ladder.start.distanceTo(ladder.end), 8]} 
          />
          <meshStandardMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.3}
            emissive="#ffffff"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </>
  );
}

// Main 3D Scene
function Scene({ projects }: { projects: Project[] }) {
  return (
    <>
      <CameraController />
      <ambientLight intensity={0.2} />
      <Environment preset="city" />
      
      {/* AI Strand */}
      <DNAStrand 
        projects={projects.filter(p => p.type === 'ai')} 
        strandOffset={0} 
        isAI={true}
      />
      
      {/* DIY Strand */}
      <DNAStrand 
        projects={projects.filter(p => p.type === 'diy')} 
        strandOffset={Math.PI} 
        isAI={false}
      />
      
      {/* Connection rungs */}
      <DNALadders projects={projects} />
      
      {/* Ambient particles */}
      <Sparkles 
        count={100} 
        scale={20} 
        size={0.5} 
        speed={0.3}
        color="#ffffff"
      />
      
      {/* Ground reflection */}
      <ContactShadows 
        position={[0, -10, 0]} 
        opacity={0.3} 
        scale={20} 
        blur={2}
      />
    </>
  );
}

// Project Detail Panel
function ProjectDetail({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="fixed right-0 top-0 h-full w-96 bg-black/90 backdrop-blur-xl border-l border-white/10 p-6 z-50"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          ✕
        </button>
        
        <div className="mt-8">
          <div 
            className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center text-2xl"
            style={{ 
              background: `linear-gradient(135deg, ${project.color}40, ${project.color}20)`,
              border: `1px solid ${project.color}40`
            }}
          >
            {project.type === 'ai' ? '🤖' : '🔧'}
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">{project.name}</h2>
          <p className="text-gray-400 mb-4">{project.description}</p>
          
          <div className="flex gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{project.stars}</div>
              <div className="text-xs text-gray-500">Stars</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{project.forks}</div>
              <div className="text-xs text-gray-500">Forks</div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-white/60 mb-2 uppercase tracking-wider">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    background: `${project.color}20`,
                    color: project.color,
                    border: `1px solid ${project.color}30`
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 rounded-lg font-semibold text-center transition-all"
                style={{ 
                  background: project.color,
                  color: '#000'
                }}
              >
                🚀 Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 rounded-lg font-semibold text-center border border-white/20 text-white hover:bg-white/5 transition-all"
              >
                📂 View Source
              </a>
            )}
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-2 h-2 rounded-full" style={{ background: project.color }} />
              {project.type === 'ai' ? 'AI-Powered Project' : 'DIY Hardware Project'}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Legend Component
function Legend() {
  return (
    <div className="absolute bottom-8 left-8 flex gap-6 z-10">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#00D4FF] shadow-[0_0_10px_#00D4FF]" />
        <span className="text-white/80 text-sm font-medium">AI Projects</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#FF6B35] shadow-[0_0_10px_#FF6B35]" />
        <span className="text-white/80 text-sm font-medium">DIY Projects</span>
      </div>
    </div>
  );
}

// Instructions
function Instructions() {
  return (
    <div className="absolute top-8 left-8 text-white/40 text-xs z-10">
      <p>🖱️ Drag to rotate • 👆 Click nodes for details</p>
    </div>
  );
}

// Main Component
export default function ProjectDNAHelix() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
      
      {/* Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#FF6B35] bg-clip-text text-transparent">
          Project DNA
        </h1>
        <p className="text-white/50 mt-2 text-sm">The building blocks of AI + DIY</p>
      </div>
      
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [8, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene projects={PROJECTS} />
      </Canvas>
      
      {/* UI Overlays */}
      <Legend />
      <Instructions />
      
      {/* Stats overlay */}
      <div className="absolute top-8 right-8 text-right z-10">
        <div className="text-3xl font-bold text-white">{PROJECTS.length}</div>
        <div className="text-white/50 text-sm">Projects</div>
        <div className="text-2xl font-bold text-white mt-4">
          {PROJECTS.reduce((acc, p) => acc + p.stars, 0)}
        </div>
        <div className="text-white/50 text-sm">Total Stars</div>
      </div>
      
      {/* Project Detail Panel */}
      <ProjectDetail 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
      
      {/* Floating action button */}
      <div className="absolute bottom-8 right-8 z-10">
        <a 
          href="https://github.com/Ambuaj250"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-medium hover:bg-white/20 transition-all"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View All on GitHub
        </a>
      </div>
    </div>
  );
}
