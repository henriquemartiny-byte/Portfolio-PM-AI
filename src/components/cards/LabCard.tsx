import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Code2, Terminal, ChevronLeft, ChevronRight, Sliders, CheckCircle2, AlertTriangle } from 'lucide-react';
import BentoCard from '../BentoCard';

export default function LabCard({ delay = 0 }: { delay?: number }) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'console'>('preview');
  const [promptComplexity, setPromptComplexity] = useState<number>(40);
  const [isSimulating, setIsSimulating] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  // O seu portfólio como o case original e principal neste momento
  const caseData = {
    title: "AI-Powered Vibe Coding Portfolio",
    description: "Arquitetura e deploy de um portfólio interativo utilizando agentes autônomos de IA (Antigravity). Foco em engenharia de prompt cirúrgica para otimização de tokens, componentização em Next.js e esteira automatizada de CI/CD via Vercel.",
    code: `// Otimização de contexto para o agente de IA
const deployToProduction = async (codebase) => {
  const optimizedPrompt = promptBudget.minimizeTokens(codebase.thinking);
  const build = await antigravity.executeRefactor(optimizedPrompt);
  return vercel.triggerAutomatedDeploy(build);
};`,
    logs: [
      "Inicializando ambiente de Vibe Coding no Antigravity...",
      "Refatorando layout do HeroCard para estrutura horizontal adaptativa...",
      "Otimizando prompts de entrada para economia de tokens no plano Google AI Pro...",
      "Sincronizando repositório com o GitHub...",
      "Deploy concluído com sucesso na Vercel: https://portfolio-pm-ai.vercel.app/"
    ]
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setConsoleLogs([]);
    setActiveTab('console');
    
    caseData.logs.forEach((log, index) => {
      setTimeout(() => {
        setConsoleLogs(prev => [...prev, log]);
        if (index === caseData.logs.length - 1) setIsSimulating(false);
      }, (index + 1) * 700);
    });
  };

  // Cálculos dinâmicos do simulador de tokens
  const genericTokenCost = Math.round(promptComplexity * 12.5 * 4.2);
  const optimizedTokenCost = Math.round(promptComplexity * 12.5 * 1.1);
  const tokenSavings = genericTokenCost - optimizedTokenCost;

  return (
    // Aumentamos para md:col-span-7 para dar o espaço necessário que o layout pede
    <BentoCard className="col-span-12 md:col-span-7 min-h-[500px]" delay={delay}>
      <div className="flex flex-col h-full gap-5">
        
        {/* CABEÇALHO DO LAB COM NAVEGAÇÃO EM CARROSSEL */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4 w-full">
          <div className="min-w-0 flex-1">
            <span className="text-xs font-semibold text-emerald-500 tracking-wider uppercase bg-emerald-500/10 px-2.5 py-1 rounded-full inline-block">
              Lab de Ideias
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-100 mt-2 flex items-center gap-2 break-words">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{caseData.title}</span>
            </h2>
          </div>
          
          {/* Controles de navegação (Estilo Carrossel) */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto bg-neutral-900/40 p-1.5 rounded-xl border border-neutral-900">
            <button className="p-1.5 rounded-lg bg-neutral-950 text-neutral-700 cursor-not-allowed" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-neutral-500 font-mono px-1">1 / 1</span>
            <button className="p-1.5 rounded-lg bg-neutral-950 text-neutral-700 cursor-not-allowed" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Descrição */}
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-4xl break-words">
          {caseData.description}
        </p>

        {/* SELETOR DE ABAS */}
        <div className="flex items-center gap-4 border-b border-neutral-900 pb-px mt-2 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 text-sm font-medium pb-3 px-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'preview' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Preview Interativo
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 text-sm font-medium pb-3 px-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'code' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-zinc-500 hover:text-neutral-300'
            }`}
          >
            <Code2 className="w-4 h-4" />
            Código do Agente
          </button>
          <button
            onClick={() => setActiveTab('console')}
            className={`flex items-center gap-2 text-sm font-medium pb-3 px-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'console' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Terminal className="w-4 h-4" />
            Console de Execução
          </button>
        </div>

        {/* ÁREA DE CONTEÚDO DAS ABAS */}
        <div className="bg-neutral-950/40 border border-neutral-900 rounded-2xl p-5 min-h-[260px] flex flex-col justify-between flex-1">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: PREVIEW INTERATIVO */}
            {activeTab === 'preview' && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col md:flex-row gap-6 w-full items-center md:items-stretch"
              >
                <div className="flex-1 flex flex-col gap-3 justify-center w-full">
                  <div>
                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1">
                      Tamanho do Contexto do Repositório
                    </label>
                    <span className="text-sm font-medium text-neutral-200 font-mono">
                      {Math.round(promptComplexity * 4.2)} linhas de código analisadas
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="100"
                    value={promptComplexity}
                    onChange={(e) => setPromptComplexity(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-neutral-800 h-1.5 rounded-lg cursor-pointer"
                  />
                  <p className="text-xs text-neutral-500 italic">
                    Arraste o controle para simular o volume de dados lido pelo Antigravity e ver a economia de tokens na prática.
                  </p>
                </div>

                {/* Métricas do Simulador */}
                <div className="w-full md:w-80 bg-neutral-950 border border-neutral-900 rounded-xl p-4 flex flex-col gap-3 justify-center">
                  <div className="border-b border-neutral-900/60 pb-2">
                    <span className="text-[10px] font-mono text-neutral-500 block uppercase">Prompt sem Otimização</span>
                    <div className="flex items-center justify-between text-rose-400 font-mono text-xs mt-0.5">
                      <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {genericTokenCost.toLocaleString()} tokens</span>
                    </div>
                  </div>

                  <div className="border-b border-neutral-900/60 pb-2">
                    <span className="text-[10px] font-mono text-neutral-500 block uppercase">Prompt Cirúrgico (Vibe Coding)</span>
                    <div className="flex items-center justify-between text-emerald-400 font-mono text-xs mt-0.5">
                      <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {optimizedTokenCost.toLocaleString()} tokens</span>
                      <span className="text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 px-1 py-0.2 rounded">73% Off</span>
                    </div>
                  </div>

                  <div className="pt-0.5">
                    <span className="text-[10px] font-mono text-emerald-500 uppercase block font-semibold">Créditos Salvos</span>
                    <span className="text-xl font-bold text-neutral-100 font-mono">
                      {tokenSavings.toLocaleString()} <span className="text-xs text-neutral-500 font-normal">tokens</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: CÓDIGO DO AGENTE */}
            {activeTab === 'code' && (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full font-mono text-xs md:text-sm text-emerald-400/90 leading-relaxed overflow-x-auto bg-black/20 p-4 rounded-xl border border-neutral-900/60"
              >
                <pre className="whitespace-pre">{caseData.code}</pre>
              </motion.div>
            )}

            {/* TAB 3: CONSOLE DE EXECUÇÃO */}
            {activeTab === 'console' && (
              <motion.div
                key="console"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full font-mono text-xs text-neutral-300 flex flex-col gap-2 p-4 bg-black/30 rounded-xl border border-neutral-900/60 min-h-[140px]"
              >
                {consoleLogs.length === 0 && (
                  <span className="text-neutral-600 italic">Console pronto. Toque em 'Executar Simulação de Log' para disparar o pipeline.</span>
                )}
                {consoleLogs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2 text-neutral-400">
                    <span className="text-emerald-500 font-bold select-none">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
                {isSimulating && (
                  <div className="w-1.5 h-3.5 bg-emerald-400 animate-pulse mt-0.5" />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* BOTÃO DE SIMULAÇÃO */}
          <div className="flex items-center gap-3 mt-4 border-t border-neutral-900/40 pt-4">
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium text-xs transition-all cursor-pointer ${
                isSimulating 
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                  : 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold shadow-md shadow-emerald-500/5'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              {isSimulating ? "Executando Testes de Build..." : "Executar Simulação de Log"}
            </button>
          </div>
        </div>

      </div>
    </BentoCard>
  );
}
