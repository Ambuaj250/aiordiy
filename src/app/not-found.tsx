import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-[color:var(--lab-bg)] min-h-screen texture-grid flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="stamp text-[color:var(--lab-acid)] text-sm mx-auto w-fit mb-10">
          Case Not Found
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-[color:var(--lab-ink)] mb-4 tracking-tight">
          404
        </h1>
        <p className="font-display text-xl text-[color:var(--lab-dim)] italic mb-2 font-display">
          This file isn&apos;t in the cabinet.
        </p>
        <p className="font-plex text-sm text-[color:var(--lab-dim)] mb-10">
          &gt; either it never existed, or the verdict went the other way._
        </p>
        <Link href="/guides" className="btn btn-lab">
          Back to the ledger
        </Link>
      </div>
    </main>
  );
}
