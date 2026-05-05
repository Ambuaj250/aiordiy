'use client';

import { motion } from 'framer-motion';
import { Bot, Workflow, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Tile = {
  title: string;
  body: string;
  icon: LucideIcon;
  accent: string;
  span: string;
};

const TILES: Tile[] = [
  {
    title: 'AI Agents',
    body: 'Autonomous agents that handle research, content creation, and decision-making tasks end-to-end.',
    icon: Bot,
    accent: '#22d3ee',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    title: 'Workflow Automation',
    body: 'n8n, Make.com, and custom pipelines that connect tools and eliminate repetitive work.',
    icon: Workflow,
    accent: '#a78bfa',
    span: 'md:col-span-1',
  },
  {
    title: 'Productivity Systems',
    body: 'Personal operating systems that leverage AI for 10x output without burnout.',
    icon: Zap,
    accent: '#f472b6',
    span: 'md:col-span-1',
  },
];

function Tile({ tile, index }: { tile: Tile; index: number }) {
  const Icon = tile.icon;
  const isFeature = index === 0;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      className={`bento-card p-8 ${tile.span} ${isFeature ? 'min-h-[20rem] flex flex-col justify-between' : ''}`}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 relative z-10"
        style={{
          background: `${tile.accent}1f`,
          boxShadow: `inset 0 0 24px ${tile.accent}22`,
        }}
      >
        <Icon className="w-6 h-6" style={{ color: tile.accent }} />
      </div>

      <div className="relative z-10">
        <h3
          className={`font-semibold mb-3 ${isFeature ? 'text-3xl md:text-4xl' : 'text-xl'}`}
        >
          {tile.title}
        </h3>
        <p
          className={`text-white/55 leading-relaxed ${isFeature ? 'text-base md:text-lg max-w-md' : 'text-sm'}`}
        >
          {tile.body}
        </p>
      </div>

      {isFeature && (
        <div
          aria-hidden
          className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-40 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${tile.accent}55, transparent 70%)` }}
        />
      )}
    </motion.div>
  );
}

export default function BentoGrid() {
  return (
    <div className="grid md:grid-cols-3 md:grid-rows-2 gap-5">
      {TILES.map((tile, i) => (
        <Tile key={tile.title} tile={tile} index={i} />
      ))}
    </div>
  );
}
