'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import dynamic from 'next/dynamic';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => null,
});

const ROTATING_WORDS = ['agents', 'workflows', 'systems'] as const;

function MagneticButton({
  children,
  href,
  external = false,
  primary = false,
}: {
  children: React.ReactNode;
  href: string;
  external?: boolean;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * 0.25, y: y * 0.25 });
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  const baseClass = primary
    ? 'bg-white text-black hover:bg-white/90 glow-pink'
    : 'border border-white/15 text-white hover:bg-white/5 backdrop-blur-md';

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.4 }}
      className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-colors ${baseClass}`}
    >
      {children}
    </motion.a>
  );
}

function KineticWord() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2400);
    return () => clearInterval(id);
  }, [reduced]);

  const current = ROTATING_WORDS[index];

  return (
    <span className="inline-grid align-baseline overflow-hidden leading-[0.95]">
      <span className="sr-only">AI agents, workflows, and systems</span>
      <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
        workflows
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          aria-hidden
          key={current}
          initial={reduced ? false : { y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="col-start-1 row-start-1 gradient-text-animated whitespace-nowrap"
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative grid-pattern min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <HeroCanvas />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none" />
      <div className="noise" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass mb-8"
        >
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span className="text-sm text-white/75">AI Automation & Workflow Systems</span>
        </motion.div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[0.95] tracking-tight">
          <span className="block">Building</span>
          <span className="block">
            AI <KineticWord />
          </span>
          <span className="block text-white/45 text-2xl sm:text-3xl md:text-5xl font-medium tracking-normal mt-4">
            that save hours, not minutes.
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10"
        >
          I build AI agents, automation workflows, and systems that compound. Documenting the journey on X.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton href="https://x.com/aiordiy" external primary>
            <X className="w-5 h-5" />
            Follow on X
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
          <MagneticButton href="/projects">View Projects</MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
