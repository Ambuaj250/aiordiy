'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/**
 * THE FORK — hero.
 * LAB (left, dark, acid) vs SHOP (right, paper, orange).
 * A draggable seam reveals either world. Keyboard + touch friendly.
 */
export default function ForkHero() {
  const [pos, setPos] = useState(50); // percent from left
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(88, Math.max(12, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    moved.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => setFromClientX(e.clientX);
    const up = () => setDragging(false);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [dragging, setFromClientX]);

  const nudge = (delta: number) => {
    moved.current = true;
    setPos((p) => Math.min(88, Math.max(12, p + delta)));
  };

  const labClip = { clipPath: `inset(0 ${100 - pos}% 0 0)` };
  const shopClip = { clipPath: `inset(0 0 0 ${pos}%)` };
  const seamLeft = `${pos}%`;

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden select-none"
      onPointerDown={onPointerDown}
    >
      {/* ── SHOP (base layer, right world) ── */}
      <div className="absolute inset-0 texture-noise" style={{ background: 'var(--shop-bg)' }} />
      <div className="absolute inset-0 texture-ruled opacity-60" />

      {/* SHOP content */}
      <div className="absolute inset-0 flex" style={shopClip}>
        <div className="flex-1" />
        <div className="w-1/2 h-full flex flex-col justify-center pl-[6vw] pr-[4vw] pt-[20vh]">
          <p className="label text-[color:var(--shop-accent)] mb-5">The DIY way</p>
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.04] font-semibold text-[color:var(--shop-ink)] mb-5">
            Learn the craft.
            <br />
            Own the result.
          </h2>
          <p className="text-[color:var(--shop-dim)] text-lg max-w-md leading-relaxed">
            Step-by-step worksheets, real materials, honest costs. The way
            your grandfather would insist on — written for your weekend.
          </p>
          <div className="mt-8">
            <Link href="/guides" className="btn btn-shop">
              Read the worksheets
            </Link>
          </div>
        </div>
      </div>

      {/* ── LAB (overlay layer, left world) ── */}
      <div className="absolute inset-0 texture-grid" style={{ background: 'var(--lab-bg)', ...labClip }}>
        {/* LAB content */}
        <div className="w-1/2 h-full flex flex-col justify-center pl-[4vw] pr-[6vw] pt-[20vh]">
          <p className="label text-[color:var(--lab-acid)] mb-5">The AI way</p>
          <h2
            className="text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.04] font-semibold text-[color:var(--lab-ink)] mb-5"
            style={{ fontFamily: 'var(--font-grotesk)' }}
          >
            Prompt it.
            <br />
            Be done by lunch.
          </h2>
          <p className="text-[color:var(--lab-dim)] text-lg max-w-md leading-relaxed">
            Exact prompts, exact tools, exact steps. Copy-paste your way
            through tasks that used to eat your weekends.
          </p>
          <div className="mt-8">
            <Link href="/guides" className="btn btn-lab">
              Run the specs
            </Link>
          </div>
        </div>
      </div>

      {/* Masthead plate — solid band crossing the seam, always readable */}
      <div className="absolute top-0 inset-x-0 flex justify-center pt-20 sm:pt-24 pointer-events-none z-30">
        <div className="text-center bg-[color:var(--shop-bg)] border-2 border-[color:var(--shop-ink)] px-8 sm:px-12 py-5 shadow-[6px_6px_0_rgba(29,26,21,0.9)]">
          <h1 className="text-[clamp(2.4rem,6.5vw,5.5rem)] leading-none font-bold tracking-tight text-[color:var(--shop-ink)]">
            AI<span className="font-display font-medium italic" style={{ color: 'var(--shop-accent)' }}> or </span>DIY
          </h1>
          <p className="label mt-3 text-[color:var(--shop-dim)]">
            Every task. Two ways. You pick.
          </p>
        </div>
      </div>

      {/* ── THE SEAM ── */}
      <div
        role="separator"
        aria-label="Drag to compare the AI way and the DIY way"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-4); }
          if (e.key === 'ArrowRight') { e.preventDefault(); nudge(4); }
        }}
        className="absolute top-0 bottom-0 z-20 w-12 -translate-x-1/2 cursor-ew-resize outline-none"
        style={{ left: seamLeft, touchAction: 'none' }}
      >
        {/* the visible line */}
        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] transition-colors"
          style={{ background: dragging ? 'var(--lab-acid)' : 'var(--shop-ink)' }}
        />
        {/* the handle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center border-2 transition-transform"
          style={{
            background: 'var(--shop-bg)',
            borderColor: dragging ? 'var(--lab-acid)' : 'var(--shop-ink)',
            transform: `translate(-50%,-50%) scale(${dragging ? 1.12 : 1})`,
            boxShadow: '4px 4px 0 rgba(0,0,0,0.25)',
          }}
        >
          <span className="font-plex text-lg font-bold text-[color:var(--shop-ink)] tracking-tighter">
            ⇄
          </span>
        </div>
      </div>

      {/* hint — fades once the user has dragged */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none transition-opacity duration-700"
        style={{ opacity: moved.current ? 0 : 1 }}
      >
        <p className="label text-[color:var(--shop-dim)]">← drag the seam →</p>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 right-8 z-10 pointer-events-none hidden md:block">
        <p className="label text-[color:var(--shop-dim)]">10 guides below</p>
      </div>
    </section>
  );
}
