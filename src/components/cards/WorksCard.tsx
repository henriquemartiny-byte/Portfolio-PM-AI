"use client";

import React, { useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import BentoCard from "../BentoCard";
import CaseDetailsModal from "../CaseDetailsModal";

export default function WorksCard({ delay = 0 }: { delay?: number }) {
  const { works } = portfolioData;
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number | null>(null);

  return (
    <>
      <BentoCard className="col-span-12 min-h-[360px]" delay={delay}>
        <div className="flex flex-col h-full justify-between space-y-6">
          {/* Cabeçalho */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold tracking-wider text-neutral-400">
                TRABALHOS SELECIONADOS
              </span>
              <h2 className="text-2xl font-display font-bold text-neutral-100 tracking-tight">
                Cases & Trajetória
              </h2>
            </div>
            <button
              onClick={() => setSelectedCaseIndex(0)}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium hover:underline cursor-pointer flex items-center gap-1 transition-colors group"
            >
              <span>Ver todos os cases</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Grade de Cases de Trabalho */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
            {works.cases.map((w, index) => (
              <div
                key={w.title}
                onClick={() => setSelectedCaseIndex(index)}
                className="group/work relative rounded-xl border border-neutral-900 bg-neutral-950/40 p-5 md:p-6 flex flex-col justify-between overflow-hidden hover:border-neutral-800 transition-all cursor-pointer hover:-translate-y-0.5"
              >
                {/* Efeito de Gradiente de Fundo no Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${w.gradient} opacity-0 group-hover/work:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="space-y-4 relative z-10">
                  {/* Linha superior: Ano e Categoria */}
                  <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
                    <span>{w.category}</span>
                    <span className="font-mono bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800 text-neutral-400">
                      {w.year}
                    </span>
                  </div>

                  {/* Título e Descrição */}
                  <div className="space-y-2">
                    <h3 className="text-base md:text-lg font-bold text-neutral-100 group-hover/work:text-white transition-colors flex items-center gap-1">
                      {w.title}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/work:opacity-100 group-hover/work:translate-x-0.5 group-hover/work:-translate-y-0.5 transition-all text-indigo-400" />
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-normal">
                      {w.description}
                    </p>
                  </div>
                </div>

                {/* Tags de Tecnologia/Função */}
                <div className="flex flex-wrap gap-1.5 pt-6 relative z-10">
                  {w.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-900/80 text-neutral-400 border border-neutral-800/80 group-hover/work:border-neutral-700/80 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Rodapé informativo */}
          <div className="flex items-center justify-between border-t border-neutral-900/60 pt-3 text-[10px] text-neutral-500 font-mono">
            <span>Toque em qualquer case para abrir o deep dive completo</span>
            <span className="text-indigo-400/80 uppercase tracking-wider">
              4 Cases Documentados
            </span>
          </div>
        </div>
      </BentoCard>

      {/* Modal de Detalhes dos Cases */}
      <CaseDetailsModal
        isOpen={selectedCaseIndex !== null}
        selectedIndex={selectedCaseIndex ?? 0}
        onClose={() => setSelectedCaseIndex(null)}
        onSelectIndex={(idx) => setSelectedCaseIndex(idx)}
      />
    </>
  );
}
