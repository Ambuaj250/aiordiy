import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden glow">
            <Image
              src="/logo-icon.png"
              alt="aiordiy"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="text-xl font-bold tracking-tight group-hover:text-cyan-400 transition-colors">
            aiordiy
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-6">
          <Link 
            href="#projects" 
            className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block"
          >
            Projects
          </Link>
          <a 
            href="https://x.com/aiordiy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Follow</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
