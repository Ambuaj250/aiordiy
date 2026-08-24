import ForkHero from "./components/ForkHero";
import Ledger from "./components/Ledger";
import Manifesto from "./components/Manifesto";

export default function Home() {
  return (
    <main>
      <ForkHero />
      <Ledger />
      <Manifesto />
      <footer className="border-t-2 border-[color:var(--shop-ink)] bg-[color:var(--shop-bg)]">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="label opacity-60">
            © 2026 aiordiy — automate the boring, craft the rest
          </p>
          <div className="flex gap-6">
            <a
              href="https://x.com/aiordiy"
              target="_blank"
              rel="noopener noreferrer"
              className="label hover:text-[color:var(--shop-accent)] transition-colors"
            >
              @aiordiy on X
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
