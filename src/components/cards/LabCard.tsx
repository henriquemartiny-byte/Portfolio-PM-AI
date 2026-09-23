import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Code2, 
  Terminal, 
  ChevronLeft, 
  ChevronRight, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight,
  Disc,
  Bot,
  Cpu,
  FileText,
  RefreshCw,
  GitBranch
} from 'lucide-react';
import BentoCard from '../BentoCard';

const VINYL_PREVIEWS = [
  {
    id: "1",
    artist: "The Beatles",
    album: "Abbey Road",
    year: 1969,
    cover: "https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25",
  },
  {
    id: "2",
    artist: "Michael Jackson",
    album: "Thriller",
    year: 1982,
    cover: "https://i.scdn.co/image/ab67616d0000b27332a7d87248d1b75463483df5",
  },
  {
    id: "3",
    artist: "Gilberto Gil",
    album: "Realce",
    year: 1979,
    cover: "https://i.scdn.co/image/ab67616d0000b2739f03ac150a11d3d0be4d1c5b",
  },
  {
    id: "4",
    artist: "The Beatles",
    album: "Please Please Me",
    year: 1963,
    cover: "https://i.scdn.co/image/ab67616d0000b273dbeec63ad914c973e75c24df",
  },
  {
    id: "5",
    artist: "The Beatles",
    album: "Yellow Submarine",
    year: 1999,
    cover: "https://i.scdn.co/image/ab67616d0000b273d807dd713cdfbeed142881e2",
  }
];

export default function LabCard({ delay = 0 }: { delay?: number }) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'console'>('preview');
  const [activeExpIndex, setActiveExpIndex] = useState(0);
  const [promptComplexity, setPromptComplexity] = useState<number>(40);
  const [isSimulating, setIsSimulating] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  // Acervo de experimentos do Lab: 1º Vinil, 2º Marvin, 3º Vibe Coding
  const experiments = [
    {
      title: "Vinyl AI Collection Hub",
      category: "Jamstack & Edge AI",
      description: "Arquitetura Jamstack híbrida com Spotify Web API e Gemini para catalogar e explorar acervos físicos de vinil. Recomendações contextuais de sommelier e contextualização cultural de cada prensagem com custo zero de infraestrutura.",
      slug: "catalogo-vinyl",
      code: `// Integração do Sommelier com Spotify API e Google Gemini
const getVinylDetails = async (album: string, artist: string) => {
  const meta = await spotify.searchAlbum(album, artist);
  const wiki = await wikipedia.getSummary(album, artist);
  const story = await gemini.generateStory(album, artist, wiki);
  return { ...meta, story };
};`,
      logs: [
        "Inicializando módulo de catalogação física...",
        "Autenticando na API do Spotify com client credentials...",
        "Conectando com o modelo Gemini 2.5 Flash via Edge Runtime...",
        "Indexando banco local via collection.json...",
        "Vinyl AI Sommelier pronto para receber interações."
      ]
    },
    {
      title: "Marvin: Agente de Organização Pessoal",
      category: "Autonomous Agent & Chief of Staff",
      description: "Agente autônomo local e Chief of Staff pessoal calibrado com a personalidade de Marvin, o Androide Paranoico (O Guia do Mochileiro das Galáxias, de Douglas Adams). Orquestra rotinas, conciliação financeira e esteiras de desenvolvimento através de pipelines determinísticos no sistema operacional, APIs do Google e engenharia de contexto rigorosa.",
      slug: "marvin-agent",
      code: `// Runtime do Agente Autônomo Marvin (OS + APIs + Contexto)
export async function runMarvinCycle(context: LocalWorkspace) {
  // 1. Context Engineering determinístico via Markdown canônico
  const backlog = await readCanonicalMarkdown('./00-Raiz/BACKLOG.md');
  
  // 2. Parser algorítmico de faturas financeiras
  const pdfStatements = await parseFinancialPDFs('./06-pessoal-patrimonio/Faturas/');
  const reconciled = reconcileTransactions(pdfStatements, backlog.budget);

  // 3. Sincronização bidirecional OAuth2 com Google Tasks API
  await googleTasks.syncPendingItems(backlog.tasks, { purgeCompleted: true });

  // 4. Automação Git CLI: commits semânticos e espelhamento em nuvem
  await git.commitAndPush('chore(sync): automated backlog & cloud mirror');
  return { status: 'Operação concluída com sucesso. Embora ninguém vá me agradecer.' };
}`,
      logs: [
        "Marvin OS inicializado. 'Cérebro do tamanho de um planeta e me colocam para ordenar tarefas...'",
        "Lendo contexto estruturado em 00-Raiz/BACKLOG.md (zero alucinações)...",
        "Executando pdf-parse em faturas de cartão de crédito e conciliando lançamentos...",
        "Autenticando via OAuth2 e sincronizando lista com Google Tasks API...",
        "Executando espelhamento determinístico com Google Drive...",
        "Executando git add e git commit semântico via shell CLI...",
        "Sprint sincronizada com sucesso. Suspiro existencial concluído."
      ]
    },
    {
      title: "AI-Powered Vibe Coding Portfolio",
      category: "Agentic Engineering & CI/CD",
      description: "Arquitetura e deploy de um portfólio interativo utilizando agentes autônomos de IA (Antigravity). Foco em engenharia de prompt cirúrgica para otimização de tokens, componentização em Next.js e esteira automatizada de CI/CD via Vercel.",
      slug: "vibe-coding",
      code: `// Otimização de contexto para o agente de IA
const deployToProduction = async (codebase: any) => {
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
    }
  ];

  const caseData = experiments[activeExpIndex];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setConsoleLogs([]);
    setActiveTab('console');
    
    caseData.logs.forEach((log, index) => {
      setTimeout(() => {
        setConsoleLogs(prev => [...prev, log]);
        if (index === caseData.logs.length - 1) setIsSimulating(false);
      }, (index + 1) * 600);
    });
  };

  // Cálculos dinâmicos do simulador de tokens
  const genericTokenCost = Math.round(promptComplexity * 12.5 * 4.2);
  const optimizedTokenCost = Math.round(promptComplexity * 12.5 * 1.1);
  const tokenSavings = genericTokenCost - optimizedTokenCost;

  return (
    <BentoCard className="col-span-12 md:col-span-7 min-h-[500px]" delay={delay}>
      <div className="flex flex-col h-full gap-5">
        
        {/* CABEÇALHO DO LAB COM NAVEGAÇÃO EM CARROSSEL */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4 w-full">
          <div className="min-w-0 flex-1">
            <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full inline-block">
              Lab de Ideias
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-100 mt-2 flex items-center gap-2 break-words">
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
              <span>{caseData.title}</span>
            </h2>
          </div>
          
          {/* Controles de navegação (Estilo Carrossel) */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto bg-neutral-900/40 p-1.5 rounded-xl border border-neutral-900">
            <button
              onClick={() => setActiveExpIndex(prev => Math.max(0, prev - 1))}
              className={`p-1.5 rounded-lg bg-neutral-950 transition-colors ${
                activeExpIndex === 0 ? 'text-neutral-700 cursor-not-allowed' : 'text-neutral-400 hover:text-indigo-400 cursor-pointer'
              }`}
              disabled={activeExpIndex === 0}
              aria-label="Experimento anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-neutral-400 font-mono px-1">
              {activeExpIndex + 1} / {experiments.length}
            </span>
            <button
              onClick={() => setActiveExpIndex(prev => Math.min(experiments.length - 1, prev + 1))}
              className={`p-1.5 rounded-lg bg-neutral-950 transition-colors ${
                activeExpIndex === experiments.length - 1 ? 'text-neutral-700 cursor-not-allowed' : 'text-neutral-400 hover:text-indigo-400 cursor-pointer'
              }`}
              disabled={activeExpIndex === experiments.length - 1}
              aria-label="Próximo experimento"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Descrição */}
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-4xl break-words">
          {caseData.description}
        </p>

        {/* ÁREA PRINCIPAL DO EXPERIMENTO */}
        <div className="bg-neutral-950/40 border border-neutral-900 rounded-2xl p-5 min-h-[260px] flex flex-col justify-between flex-1">
          <AnimatePresence mode="wait">
            
            {/* CASO 0: VINYL AI COLLECTION HUB (Sem abas, acervo visual com paleta azul do portfólio) */}
            {activeExpIndex === 0 && (
              <motion.div
                key="case-vinyl"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-col gap-4 w-full flex-1 justify-between"
              >
                {/* Faixa com as capas reais da coleção */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full">
                  {VINYL_PREVIEWS.map((vinyl) => (
                    <div
                      key={vinyl.id}
                      className="group relative bg-neutral-900/60 border border-neutral-800/70 hover:border-indigo-500/40 rounded-xl p-2.5 flex flex-col gap-2 transition-all hover:-translate-y-1 duration-300"
                    >
                      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-neutral-950 shadow-md">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={vinyl.cover}
                          alt={`${vinyl.album} - ${vinyl.artist}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1.5">
                          <span className="text-[10px] font-mono text-indigo-300 font-semibold">{vinyl.year}</span>
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-neutral-200 truncate group-hover:text-indigo-300 transition-colors">
                          {vinyl.album}
                        </p>
                        <p className="text-[10px] text-neutral-400 truncate">
                          {vinyl.artist}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Barra de Ação & CTA em Tom Azul/Índigo */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-3.5 mt-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-lg">
                      <Disc className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
                      5 Discos Físicos
                    </span>
                    <span className="text-xs font-mono text-neutral-400 bg-neutral-800/50 px-2.5 py-1 rounded-lg border border-neutral-800">
                      Spotify Web API
                    </span>
                    <span className="text-xs font-mono text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                      Gemini 2.5 Flash Sommelier
                    </span>
                  </div>

                  <Link
                    href="/lab/catalogo-vinyl"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 text-white font-semibold text-xs shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <span>Explorar Hub do Acervo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* CASO 1: MARVIN AGENTE DE ORGANIZAÇÃO PESSOAL (Sem abas, 4 cards técnicos + badge Douglas Adams) */}
            {activeExpIndex === 1 && (
              <motion.div
                key="case-marvin"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-col gap-4 w-full flex-1 justify-between"
              >
                {/* Badge Persona Douglas Adams */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-neutral-900/50 border border-neutral-800/80 rounded-xl px-3.5 py-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Bot className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="text-xs text-neutral-300 font-mono truncate">
                      &ldquo;Cérebro do tamanho de um planeta e me colocam para ordenar tarefas...&rdquo;
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 shrink-0 self-start sm:self-auto">
                    Douglas Adams • O Guia do Mochileiro
                  </span>
                </div>

                {/* Grid dos 4 Pilares Técnicos da Arquitetura */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-neutral-900/40 border border-neutral-800/60 rounded-xl p-3.5 flex flex-col gap-1.5 hover:border-indigo-500/40 transition-colors">
                    <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-semibold">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Context Engineering</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Ancoragem determinística em Markdown canônico (<span className="text-neutral-200 font-mono">BACKLOG.md</span>), eliminando alucinações sem overhead de vetores.
                    </p>
                  </div>

                  <div className="bg-neutral-900/40 border border-neutral-800/60 rounded-xl p-3.5 flex flex-col gap-1.5 hover:border-blue-500/40 transition-colors">
                    <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-semibold">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Parser Algorítmico (PDF)</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Extração atômica de faturas com <span className="text-neutral-200 font-mono">pdf-parse</span>, classificação de gastos e conciliação bancária sem digitação manual.
                    </p>
                  </div>

                  <div className="bg-neutral-900/40 border border-neutral-800/60 rounded-xl p-3.5 flex flex-col gap-1.5 hover:border-sky-500/40 transition-colors">
                    <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-semibold">
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>OAuth2 & Google APIs</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Sincronização bidirecional em tempo real com Google Tasks API e espelhamento determinístico no Google Drive.
                    </p>
                  </div>

                  <div className="bg-neutral-900/40 border border-neutral-800/60 rounded-xl p-3.5 flex flex-col gap-1.5 hover:border-violet-500/40 transition-colors">
                    <div className="flex items-center gap-2 text-violet-400 font-mono text-xs font-semibold">
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>Git CLI & Automação OS</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Agente conectado ao shell local: geração de commits semânticos, resolução de tarefas, lint e verificação de deploys.
                    </p>
                  </div>
                </div>

                {/* Rodapé técnico do Marvin */}
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 border-t border-neutral-900 pt-3">
                  <span>Runtime: Local OS + Shell CLI</span>
                  <span className="text-indigo-400/80">Operação Local First • 100% Determinística</span>
                </div>
              </motion.div>
            )}

            {/* CASO 2: VIBE CODING PORTFOLIO (Mantém as 3 abas e o simulador interativo) */}
            {activeExpIndex === 2 && (
              <motion.div
                key="case-vibe"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-col gap-4 w-full flex-1 justify-between"
              >
                {/* SELETOR DE ABAS (APENAS PARA O CASO 3) */}
                <div className="flex items-center gap-4 border-b border-neutral-900 w-full overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`flex items-center gap-2 text-sm font-medium pb-3 px-1 border-b-2 transition-colors cursor-pointer shrink-0 ${
                      activeTab === 'preview' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    <Sliders className="w-4 h-4" />
                    Preview Interativo
                  </button>
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`flex items-center gap-2 text-sm font-medium pb-3 px-1 border-b-2 transition-colors cursor-pointer shrink-0 ${
                      activeTab === 'code' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    <Code2 className="w-4 h-4" />
                    Código do Agente
                  </button>
                  <button
                    onClick={() => setActiveTab('console')}
                    className={`flex items-center gap-2 text-sm font-medium pb-3 px-1 border-b-2 transition-colors cursor-pointer shrink-0 ${
                      activeTab === 'console' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    <Terminal className="w-4 h-4" />
                    Console de Execução
                  </button>
                </div>

                {/* CONTEÚDO DAS ABAS DO CASO 3 */}
                <div className="flex-1 flex flex-col justify-center">
                  {activeTab === 'preview' && (
                    <div className="flex flex-col md:flex-row gap-6 w-full items-center md:items-stretch py-2">
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
                          className="w-full accent-indigo-500 bg-neutral-800 h-1.5 rounded-lg cursor-pointer"
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
                          <div className="flex items-center justify-between text-indigo-400 font-mono text-xs mt-0.5">
                            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {optimizedTokenCost.toLocaleString()} tokens</span>
                            <span className="text-[9px] font-semibold bg-indigo-500/10 text-indigo-400 px-1 py-0.2 rounded">73% Off</span>
                          </div>
                        </div>

                        <div className="pt-0.5">
                          <span className="text-[10px] font-mono text-indigo-400 uppercase block font-semibold">Créditos Salvos</span>
                          <span className="text-xl font-bold text-neutral-100 font-mono">
                            {tokenSavings.toLocaleString()} <span className="text-xs text-neutral-500 font-normal">tokens</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'code' && (
                    <div className="w-full font-mono text-xs md:text-sm text-indigo-300 leading-relaxed overflow-x-auto bg-black/20 p-4 rounded-xl border border-neutral-900/60 my-2">
                      <pre className="whitespace-pre">{caseData.code}</pre>
                    </div>
                  )}

                  {activeTab === 'console' && (
                    <div className="w-full font-mono text-xs text-neutral-300 flex flex-col gap-2 p-4 bg-black/30 rounded-xl border border-neutral-900/60 min-h-[140px] my-2">
                      {consoleLogs.length === 0 && (
                        <span className="text-neutral-600 italic">Console pronto. Toque em 'Executar Simulação de Log' para disparar o pipeline.</span>
                      )}
                      {consoleLogs.map((log, i) => (
                        <div key={i} className="flex items-start gap-2 text-neutral-400">
                          <span className="text-indigo-400 font-bold select-none">&gt;</span>
                          <span>{log}</span>
                        </div>
                      ))}
                      {isSimulating && (
                        <div className="w-1.5 h-3.5 bg-indigo-400 animate-pulse mt-0.5" />
                      )}
                    </div>
                  )}
                </div>

                {/* BOTÃO DE SIMULAÇÃO (APENAS NO CASO 3) */}
                <div className="flex items-center gap-3 border-t border-neutral-900/40 pt-4">
                  <button
                    onClick={handleRunSimulation}
                    disabled={isSimulating}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium text-xs transition-all cursor-pointer ${
                      isSimulating 
                        ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-md shadow-indigo-600/20'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    {isSimulating ? "Executando Pipeline..." : "Executar Simulação de Log"}
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </BentoCard>
  );
}
