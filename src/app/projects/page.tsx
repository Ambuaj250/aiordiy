'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Project data
interface Project {
  id: string;
  name: string;
  description: string;
  type: 'ai' | 'diy';
  tech: string[];
  stars: number;
  forks: number;
  color: string;
  icon: string;
  liveUrl?: string;
  githubUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'aiordiy',
    description: 'Personal brand website with Project DNA Helix showcase',
    type: 'ai',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    stars: 0,
    forks: 0,
    color: '#00D4FF',
    icon: '🧬',
    liveUrl: 'https://aiordiy.com',
    githubUrl: 'https://github.com/Ambuaj250/aiordiy'
  },
  {
    id: '2',
    name: 'X-Analytics Agent',
    description: 'AI-powered analytics dashboard for X/Twitter accounts with engagement insights',
    type: 'ai',
    tech: ['Python', 'FastAPI', 'Streamlit', 'SQLite'],
    stars: 0,
    forks: 0,
    color: '#00D4FF',
    icon: '📊',
    githubUrl: 'https://github.com/Ambuaj250/x-analytics-agent'
  },
  {
    id: '3',
    name: 'LocalDoc AI',
    description: 'Self-hosted document intelligence - chat with your PDFs using local AI',
    type: 'ai',
    tech: ['Python', 'ChromaDB', 'Ollama', 'FastAPI'],
    stars: 0,
    forks: 0,
    color: '#00D4FF',
    icon: '📄',
    githubUrl: 'https://github.com/Ambuaj250/localdoc-ai'
  },
  {
    id: '4',
    name: 'BuildInPublic Dashboard',
    description: 'Track your build journey with automated GitHub/X metrics and milestones',
    type: 'ai',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase'],
    stars: 0,
    forks: 0,
    color: '#00D4FF',
    icon: '🚀',
    githubUrl: 'https://github.com/Ambuaj250/buildinpublic-dashboard'
  }
];

// DNA Helix Math
interface HelixPoint {
  x: number;
  y: number;
  z: number;
  project: Project;
  strand: 'ai' | 'diy';
}

function generateHelixPoints(): HelixPoint[] {
  const points: HelixPoint[] = [];
  const projectCount = PROJECTS.length;
  const height = 600;
  const radius = 150;
  const turns = 2;
  
  PROJECTS.forEach((project, idx) => {
    const t = idx / (projectCount - 1);
    const angle = t * Math.PI * 2 * turns;
    const y = (t - 0.5) * height;
    
    // AI strand (left)
    points.push({
      x: Math.cos(angle) * radius - 200,
      y,
      z: Math.sin(angle) * radius,
      project,
      strand: 'ai'
    });
    
    // DIY strand (right) - offset by PI
    points.push({
      x: Math.cos(angle + Math.PI) * radius + 200,
      y,
      z: Math.sin(angle + Math.PI) * radius,
      project,
      strand: 'diy'
    });
  });
  
  return points;
}

// Project Card Component
function ProjectCard({ 
  project, 
  position, 
  isSelected, 
  onClick 
}: { 
  project: Project; 
  position: { x: number; y: number }; 
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ 
        left: position.x, 
        top: position.y,
        transform: 'translate(-50%, -50%)'
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div 
        className={`
          relative w-24 h-24 rounded-2xl flex items-center justify-center text-3xl
          transition-all duration-300
          ${isSelected ? 'ring-4 ring-white/50' : ''}
        `}
        style={{
          background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)`,
          border: `2px solid ${project.color}`,
          boxShadow: `0 0 30px ${project.color}40, inset 0 0 20px ${project.color}20`
        }}
      >
        {project.icon}
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-2xl animate-pulse"
          style={{
            background: `radial-gradient(circle, ${project.color}20 0%, transparent 70%)`,
          }}
        />
      </div>
      
      {/* Label */}
      <motion.div 
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-white text-xs font-bold bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
          {project.name}
        </span>
      </motion.div>
    </motion.div>
  );
}

// Connection lines between strands
function ConnectionLines({ scrollY }: { scrollY: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    
    const projectCount = PROJECTS.length;
    const height = 500;
    const radius = 120;
    const turns = 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    
    // Draw connection lines (DNA rungs)
    for (let i = 0; i < projectCount; i++) {
      const t = i / (projectCount - 1);
      const angle = t * Math.PI * 2 * turns + scrollY * 0.002;
      const y = centerY + (t - 0.5) * height;
      
      const x1 = centerX + Math.cos(angle) * radius - 180;
      const x2 = centerX + Math.cos(angle + Math.PI) * radius + 180;
      
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.stroke();
    }
    
    return () => window.removeEventListener('resize', resize);
  }, [scrollY]);
  
  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

// Project Detail Modal
function ProjectDetail({ 
  project, 
  onClose 
}: { 
  project: Project | null; 
  onClose: () => void;
}) {
  if (!project) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900/90 border border-white/10 rounded-3xl p-8 max-w-lg w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-6">
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
              style={{ 
                background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)`,
                border: `2px solid ${project.color}`
              }}
            >
              {project.icon}
            </div>
            <button 
              onClick={onClose}
              className="text-white/50 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2">{project.name}</h2>
          <p className="text-gray-400 mb-6">{project.description}</p>
          
          <div className="flex gap-6 mb-6">
            <div>
              <div className="text-2xl font-bold text-yellow-400">{project.stars}</div>
              <div className="text-sm text-gray-500">Stars</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{project.forks}</div>
              <div className="text-sm text-gray-500">Forks</div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    background: `${project.color}20`,
                    color: project.color,
                    border: `1px solid ${project.color}40`
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3">
            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-center transition-all"
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
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-center border border-white/20 text-white hover:bg-white/5 transition-all"
              >
                📂 View Source
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Main Component
export default function ProjectDNAHelix() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const helixPoints = generateHelixPoints();
  
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black" />
      
      {/* Grid pattern */}
      <div 
        className="fixed inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Header */}
      <header className="relative z-10 pt-20 pb-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          <span className="bg-gradient-to-r from-[#00D4FF] to-[#FF6B35] bg-clip-text text-transparent">
            Project DNA
          </span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-white/50"
        >
          The building blocks of AI + DIY
        </motion.p>
      </header>
      
      {/* DNA Helix Container */}
      <div 
        ref={containerRef}
        className="relative z-10 min-h-[800px] flex items-center justify-center"
      >
        <ConnectionLines scrollY={scrollY} />
        
        {/* Legend */}
        <div className="absolute top-8 left-8 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ background: '#00D4FF', boxShadow: '0 0 10px #00D4FF' }}
            />
            <span className="text-white/80 font-medium">AI Projects</span>
          </div>
          <div className="flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ background: '#FF6B35', boxShadow: '0 0 10px #FF6B35' }}
            />
            <span className="text-white/80 font-medium">DIY Projects</span>
          </div>
        </div>
        
        {/* Stats */}
        <div className="absolute top-8 right-8 text-right">
          <div className="text-4xl font-bold">{PROJECTS.length}</div>
          <div className="text-white/50">Projects</div>
          <div className="text-3xl font-bold mt-4">
            {PROJECTS.reduce((acc, p) => acc + p.stars, 0)}
          </div>
          <div className="text-white/50">Total Stars</div>
        </div>
        
        {/* Helix Visualization */}
        <div className="relative w-full max-w-4xl h-[700px]">
          {helixPoints.map((point, idx) => (
            <ProjectCard
              key={`${point.project.id}-${point.strand}`}
              project={point.project}
              position={{ 
                x: point.x + 400, // Center offset
                y: point.y + 350  // Center offset
              }}
              isSelected={selectedProject?.id === point.project.id}
              onClick={() => setSelectedProject(point.project)}
            />
          ))}
          
          {/* Central strand lines (visual only) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <defs>
              <linearGradient id="aiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="diyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#FF6B35" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            
            {/* AI Strand */}
            <path
              d={`M 200 50 Q 150 200 200 350 Q 250 500 200 650`}
              fill="none"
              stroke="url(#aiGradient)"
              strokeWidth="3"
            />
            
            {/* DIY Strand */}
            <path
              d={`M 600 50 Q 650 200 600 350 Q 550 500 600 650`}
              fill="none"
              stroke="url(#diyGradient)"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="relative z-10 text-center pb-20 text-white/30 text-sm">
        <p>Click on any project to explore</p>
      </div>
      
      {/* GitHub Link */}
      <div className="relative z-10 flex justify-center pb-20">
        <a 
          href="https://github.com/Ambuaj250"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-medium hover:bg-white/10 transition-all"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View All on GitHub
        </a>
      </div>
      
      {/* Modal */}
      {selectedProject && (
        <ProjectDetail 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}
