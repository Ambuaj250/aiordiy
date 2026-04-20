import { X, ArrowRight, Zap, Bot, Workflow, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative grid-pattern min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-white/70">AI Automation & Workflow Systems</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Building the future of
            <span className="gradient-text block">AI-powered automation</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10">
            I build AI agents, automation workflows, and systems that save hours. 
            Documenting the journey on X.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://x.com/aiordiy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors"
            >
              <X className="w-5 h-5" />
              Follow on X
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#projects" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-colors"
            >
              View Projects
            </a>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section id="projects" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What I Build</h2>
          <p className="text-white/50 text-center mb-16 max-w-xl mx-auto">
            Practical AI systems that solve real problems. Every project is documented with lessons learned.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] card-hover">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6">
                <Bot className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Agents</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Autonomous agents that handle research, content creation, and decision-making tasks end-to-end.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] card-hover">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-6">
                <Workflow className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Workflow Automation</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                n8n, Make.com, and custom pipelines that connect tools and eliminate repetitive work.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] card-hover">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Productivity Systems</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Personal operating systems that leverage AI for 10x output without burnout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Follow the build in public</h2>
          <p className="text-white/50 mb-8">
            I share everything — wins, failures, and lessons. Join 0 others learning to build with AI.
          </p>
            <a 
              href="https://x.com/aiordiy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors"
            >
              <X className="w-5 h-5" />
              @aiordiy on X
            </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">© 2025 aiordiy. Built with AI.</p>
          <div className="flex gap-6">
            <a href="https://x.com/aiordiy" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors">
              <X className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
