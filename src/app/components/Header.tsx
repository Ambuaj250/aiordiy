"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  const nav = (
    <>
      <Link href="/guides" className="label block px-2 py-3 hover:text-[color:var(--shop-accent)] transition-colors" onClick={() => setOpen(false)}>
        Guides
      </Link>
      <Link href="/projects" className="label block px-2 py-3 hover:text-[color:var(--shop-accent)] transition-colors" onClick={() => setOpen(false)}>
        Projects
      </Link>
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16 bg-[color:var(--shop-bg)] border-b-2 border-[color:var(--shop-ink)]">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="font-plex font-semibold text-lg tracking-tight group-hover:opacity-70 transition-opacity">
            ai<span style={{ color: "var(--shop-accent)" }}>or</span>diy
          </span>
          <span className="label hidden sm:inline opacity-50">est. 2026</span>
        </Link>

        {/* desktop */}
        <nav className="hidden sm:flex items-center gap-5">
          {nav}
          <a
            href="https://x.com/aiordiy"
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex items-center gap-2 px-4 py-2 bg-[color:var(--shop-ink)] text-[color:var(--shop-bg)] hover:bg-[color:var(--shop-accent)] transition-colors"
          >
            Follow
          </a>
        </nav>

        {/* mobile toggle */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden label inline-flex items-center gap-2 px-4 py-2 bg-[color:var(--shop-ink)] text-[color:var(--shop-bg)]"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* mobile sheet */}
      {open && (
        <nav className="sm:hidden bg-[color:var(--shop-bg)] border-b-2 border-[color:var(--shop-ink)] px-4 pb-4 flex flex-col">
          {nav}
          <a
            href="https://x.com/aiordiy"
            target="_blank"
            rel="noopener noreferrer"
            className="label block px-2 py-3 hover:text-[color:var(--shop-accent)] transition-colors"
            onClick={() => setOpen(false)}
          >
            Follow on X ↗
          </a>
        </nav>
      )}
    </header>
  );
}
