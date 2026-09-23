"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Cpu,
  Layers,
  Award,
  Sparkles,
  Briefcase,
  CheckCircle2,
  BookOpen
} from "lucide-react";

export interface DetailedCase {
  title: string;
  category: string;
  year: string;
  headline: string;
  metrics: { label: string; value: string }[];
  context: string;
  challenge: string;
  solution: string;
  impact: string;
  tags: string[];
  gradient: string;
}

export const DETAILED_CASES: DetailedCase[] = [
  {
    title: "Merlin AI — Dell Technologies",
    category: "Enterprise AI & Global Operations",
    year: "2023 - 2024",
    headline: "Da Prova de Conceito à Plataforma Corporativa de Agentes Autônomos de Suporte em Escala Global",
    metrics: [
      { value: "10.000+", label: "Operadores Ativos Globais" },
      { value: "94%", label: "CSAT Sustentado" },
      { value: "40+", label: "Países com Suporte em Tempo Real" },
      { value: "Enterprise", label: "Arquitetura Human-in-the-Loop" }
    ],
    context:
      "A Dell Technologies precisava modernizar e escalar seu ecossistema de suporte e sustentação de infraestrutura corporativa crítica. O modelo tradicional de suporte enfrentava altos custos de escalabilidade linear e complexidade operacional na resolução de incidentes complexos em múltiplos fusos horários.",
    challenge:
      "Elevar modelos experimentais de LLM para um nível de confiabilidade corporativa (Enterprise-grade). Era imperativo evitar alucinações em diagnósticos técnicos, proteger dados confidenciais de clientes corporativos, garantir conformidade com políticas globais de governança e projetar uma interface que operadores técnicos seniores realmente confiassem e adotassem.",
    solution:
      "Liderança de produto e estratégia de UX na evolução do Merlin AI de PoC para plataforma oficial corporativa. Concepção de orquestração multi-agente cognitiva com supervisão humana ativa (human-in-the-loop); design de interfaces com streaming em tempo real, árvore de explicabilidade de raciocínio da IA (explainability) e caminhos de fallback imediatos para intervenção manual; esteiras de telemetria contínua com feedback dos operadores.",
    impact:
      "Adoção massiva por mais de 10.000 operadores em mais de 40 países, estabelecendo um novo padrão operacional com 94% de CSAT mantido continuamente, redução substancial do Mean Time to Resolution (MTTR) e maior segurança operacional na infraestrutura global.",
    tags: ["Enterprise AI", "Autonomous Agents", "Human-in-the-Loop", "Global Scale", "Explainability", "Dell Tech"],
    gradient: "from-blue-600/20 via-indigo-500/10 to-transparent"
  },
  {
    title: "Plataforma Teneo & MakerLoop — Dell Technologies",
    category: "Product Management & DesignOps",
    year: "2022 - 2025",
    headline: "Governança de Plataforma Crítica B2B Movimentando $1.8B em Receita e o Framework MakerLoop",
    metrics: [
      { value: "$1.8 Bilhão", label: "Receita Transacionada Anualmente" },
      { value: "Zero Downtime", label: "Picos de Black Friday & Quarter-End" },
      { value: "MakerLoop", label: "Framework Proprietário de DesignOps" },
      { value: "Enterprise B2B", label: "Engine Crítico de Precificação" }
    ],
    context:
      "A plataforma Teneo é o motor central de precificação, configuração de hardware e cotações B2B para a força de vendas e clientes corporativos da Dell em escala internacional. Trata-se de uma infraestrutura de receita direta onde cada segundo de instabilidade ou erro de cálculo tem impacto financeiro severo.",
    challenge:
      "Sustentar um sistema com regras de precificação hiper-complexas, centenas de dependências de microsserviços legados e demandas contínuas de evolução regulatória e fiscal, sem gerar nenhuma quebra de contrato ou interrupção de transações comerciais durante encerramentos fiscais.",
    solution:
      "Gestão contínua de ciclo de vida de produto, priorização orientada a risco e governança de releases de alta criticidade. Concepção e implantação do framework proprietário MakerLoop DesignOps, unificando designers e engenheiros de ponta a ponta através de prototipagem funcional paralela e specs determinísticas; observabilidade proativa e testes automatizados de regressão para fluxos de checkout e cálculo de margem.",
    impact:
      "Mais de $1.8 Bilhão de dólares transacionados por ano com segurança e estabilidade; histórico contínuo de Zero Downtime durante picos sazonais de alto volume; e redução de até 40% no atrito de handoff entre design e desenvolvimento front-end com o MakerLoop.",
    tags: ["$1.8B Transacted", "Zero Downtime", "MakerLoop DesignOps", "Enterprise B2B", "Pricing Engine", "Dell Tech"],
    gradient: "from-indigo-600/20 via-purple-500/10 to-transparent"
  },
  {
    title: "MBA Gestão Ágil: Ecologias Sociotécnicas — PUCRS",
    category: "Pós-Graduação & Monografia",
    year: "2025 - 2026",
    headline: "A Evolução do Modelo Spotify: Dos Squads Tradicionais às Plataformas Internas e Governança de IA",
    metrics: [
      { value: "Spotify Study", label: "Estudo Longitudinal da Cultura" },
      { value: "Backstage & DevEx", label: "Internal Developer Platforms" },
      { value: "Sociotécnico", label: "Framework de Gestão Contemporânea" },
      { value: "PUCRS", label: "MBA em Gestão Ágil de Projetos" }
    ],
    context:
      "O modelo de Squads, Tribes e Chapters popularizado pelo Spotify virou quase um dogma corporativo global na última década. No entanto, com a explosão da complexidade técnica de microsserviços, governança de nuvem e agentes autônomos, o modelo puro de autonomia descentralizada começou a apresentar sobrecarga cognitiva extrema nos desenvolvedores.",
    challenge:
      "Investigar empiricamente como o Spotify e outras big techs de hiper-escala transicionaram da autonomia fragmentada para a Engenharia de Plataforma (Platform Engineering), criando ecologias sociotécnicas que preservam velocidade sem gerar caos operacional ou silos de conhecimento.",
    solution:
      "Pesquisa documental e análise crítica da criação e adoção do Backstage (plataforma open-source criada pelo Spotify e doada à CNCF) como portal unificado de engenharia; modelagem do conceito de 'Ecologias Sociotécnicas' aplicadas à gestão ágil de produto: Developer Experience (DevEx), golden paths e redução de carga cognitiva; mapeamento da governança contemporânea necessária para orquestração de squads híbridos compostos por humanos e agentes de IA.",
    impact:
      "Produção de monografia acadêmico-prática estruturada que fornece um playbook moderno para Product Managers técnicos liderarem a transição de squads ágeis tradicionais para arquiteturas de plataforma escaláveis e governadas.",
    tags: ["Platform Engineering", "Backstage", "Sociotechnical Ecologies", "DevEx", "Spotify Study", "PUCRS"],
    gradient: "from-purple-600/20 via-pink-500/10 to-transparent"
  },
  {
    title: "Comunicação Digital & Pesquisa STS — Unisinos / Digilabour",
    category: "Bacharelado & Iniciação Científica",
    year: "2019 - 2023",
    headline: "Estudos de Plataformização, Ciência, Tecnologia & Sociedade (STS) e Design de Interação",
    metrics: [
      { value: "Dell DPDP", label: "Bolsista de P&D em Design (3 anos)" },
      { value: "Digilabour", label: "Pesquisador Afiliado (coord. Grohmann)" },
      { value: "Nota Máxima", label: "TCC Laureado com Distinção" },
      { value: "Prof. Fischer", label: "Orientação Acadêmica de Destaque" }
    ],
    context:
      "A explosão dos modelos de plataforma digital e a datificação da sociedade trouxeram desafios profundos sobre soberania digital, privacidade de dados, condições de trabalho algorítmico e a responsabilidade ética dos designers e gestores de tecnologia na construção de interfaces públicas e privadas.",
    challenge:
      "Articular o rigor teórico dos estudos de Ciência, Tecnologia e Sociedade (STS) e da plataformização com a prática aplicada de design de interação, acessibilidade e desenvolvimento de produtos de software corporativo.",
    solution:
      "Bolsista de Pesquisa e Desenvolvimento (P&D) no programa Dell DPDP (Design, Processos e Desenvolvimento de Produtos) na Unisinos, dedicando 3 anos à prototipagem, testes de usabilidade e acessibilidade digital para plataformas corporativas; pesquisador afiliado ao Digilabour (coordenação do Prof. Dr. Rafael Grohmann); TCC laureado com nota máxima sob orientação do Prof. Dr. Gustavo Fischer, investigando os impactos da mediação algorítmica e plataformas digitais em serviços essenciais.",
    impact:
      "Formação de uma base interdisciplinar sólida e crítica em STS. Essa perspectiva capacita Henrique a liderar produtos de IA e software não apenas sob a ótica de negócio e código, mas antecipando impactos sociotécnicos, viés algorítmico, explicabilidade e bem-estar humano.",
    tags: ["Digilabour", "Dell DPDP", "STS / Platform Studies", "Design de Interação", "Nota Máxima", "Ética em IA"],
    gradient: "from-emerald-600/20 via-teal-500/10 to-transparent"
  }
];

interface CaseDetailsModalProps {
  isOpen: boolean;
  selectedIndex: number;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export default function CaseDetailsModal({
  isOpen,
  selectedIndex,
  onClose,
  onSelectIndex
}: CaseDetailsModalProps) {
  const currentCase = DETAILED_CASES[selectedIndex] || DETAILED_CASES[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        onSelectIndex((selectedIndex - 1 + DETAILED_CASES.length) % DETAILED_CASES.length);
      }
      if (e.key === "ArrowRight") {
        onSelectIndex((selectedIndex + 1) % DETAILED_CASES.length);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, selectedIndex, onClose, onSelectIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-8">
          {/* Backdrop com blur escuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#09090b] border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
          >
            {/* CABEÇALHO DO MODAL */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800/80 bg-neutral-950/60 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Briefcase className="w-4 h-4" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-neutral-200 truncate">
                    Trajetória & Cases Detalhados
                  </h3>
                  <p className="text-[11px] text-neutral-500 font-mono">
                    Product Management • Enterprise AI • STS Research
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* SELETOR RÁPIDO ENTRE OS CASES (TABS) */}
            <div className="flex items-center gap-1.5 px-5 py-2.5 bg-neutral-950/40 border-b border-neutral-900 overflow-x-auto shrink-0">
              {DETAILED_CASES.map((c, i) => (
                <button
                  key={c.title}
                  onClick={() => onSelectIndex(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedIndex === i
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold"
                      : "bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-70">#{i + 1}</span>
                  <span>{c.title.split("—")[0].trim()}</span>
                </button>
              ))}
            </div>

            {/* ÁREA DE CONTEÚDO COM SCROLL SUAVE */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              
              {/* Título Principal do Case Ativo */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/20">
                    {currentCase.category}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                    {currentCase.year}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-neutral-100 tracking-tight">
                  {currentCase.title}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed">
                  {currentCase.headline}
                </p>
              </div>

              {/* GRID DE IMPACTO & MÉTRICAS PRINCIPAIS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {currentCase.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="bg-neutral-900/50 border border-neutral-800/80 rounded-xl p-3 flex flex-col justify-between"
                  >
                    <span className="text-base sm:text-lg font-bold font-mono text-indigo-400">
                      {m.value}
                    </span>
                    <span className="text-[11px] text-neutral-400 leading-snug mt-1">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* 4 SEÇÕES DO CASE (CONTEXTO, DESAFIO, SOLUÇÃO, IMPACTO) */}
              <div className="space-y-4">
                
                {/* 1. Contexto */}
                <div className="bg-neutral-900/30 border border-neutral-800/60 rounded-xl p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold font-mono text-neutral-300">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>01. Contexto & Cenário de Negócio</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {currentCase.context}
                  </p>
                </div>

                {/* 2. Desafio */}
                <div className="bg-neutral-900/30 border border-neutral-800/60 rounded-xl p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold font-mono text-rose-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>02. O Desafio Técnico & Operacional</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {currentCase.challenge}
                  </p>
                </div>

                {/* 3. Solução */}
                <div className="bg-neutral-900/30 border border-neutral-800/60 rounded-xl p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold font-mono text-blue-400">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>03. Liderança de Produto & Arquitetura</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {currentCase.solution}
                  </p>
                </div>

                {/* 4. Impacto */}
                <div className="bg-neutral-900/30 border border-neutral-800/60 rounded-xl p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold font-mono text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>04. Impacto & Resultados Mensuráveis</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {currentCase.impact}
                  </p>
                </div>

              </div>

              {/* TAGS DO CASE */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {currentCase.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-neutral-900 text-neutral-400 border border-neutral-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>

            {/* RODAPÉ DE NAVEGAÇÃO DO MODAL */}
            <div className="flex items-center justify-between px-5 py-3.5 border-t border-neutral-800/80 bg-neutral-950/60 shrink-0">
              <button
                onClick={() =>
                  onSelectIndex((selectedIndex - 1 + DETAILED_CASES.length) % DETAILED_CASES.length)
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-medium transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Anterior</span>
              </button>

              <span className="text-xs font-mono text-neutral-500">
                Case {selectedIndex + 1} de {DETAILED_CASES.length}
              </span>

              <button
                onClick={() =>
                  onSelectIndex((selectedIndex + 1) % DETAILED_CASES.length)
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-medium transition-colors cursor-pointer"
              >
                <span>Próximo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
