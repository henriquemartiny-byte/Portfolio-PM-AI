import React from "react";
import BentoGrid from "@/components/BentoGrid";
import { Sparkles, Cpu, Layers } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#030303]">
      {/* Luzes decorativas de fundo (Background Glowing Orbs) */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      
      {/* Grid de fundo sutil (Grid Pattern Overlay) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Header do Portfólio */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-display font-bold text-xs text-white shadow-md shadow-indigo-500/20">
            HM
          </div>
          <span className="font-display font-bold text-lg tracking-wider bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            HENRIQUE MARTINY
          </span>
        </div>

        {/* Status rápido ou Navegação Minimalista */}
        <nav className="hidden sm:flex items-center gap-6 text-sm text-neutral-400">
          <span className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" /> STACK: NEXT.JS + TAILWIND v4
          </span>
        </nav>
      </header>

      {/* Main Bento Grid Container */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex-1 flex flex-col justify-center">
        <div className="space-y-6">
          {/* Bento Grid */}
          <BentoGrid />
        </div>
      </main>

      {/* Rodapé da Página */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-950 text-xs text-neutral-500">
        <div>
          © {new Date().getFullYear()} Henrique Martiny. Todos os direitos reservados.
        </div>
        <div className="flex items-center gap-4 font-mono text-[10px]">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Sistemas operacionais
          </span>
          <span>•</span>
          <span>Desenvolvido com IA</span>
        </div>
      </footer>
    </div>
  );
}

