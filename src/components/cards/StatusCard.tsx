"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import BentoCard from "../BentoCard";

export default function StatusCard({ delay = 0 }: { delay?: number }) {
  const { status } = portfolioData;

  return (
    <BentoCard className="col-span-12 md:col-span-4 min-h-[336px]" delay={delay}>
      <div className="flex flex-col justify-between h-full space-y-6">
        {/* Cabeçalho do Card */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-neutral-400">
            {status.label}
          </span>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] md:text-xs font-medium text-emerald-400 uppercase tracking-widest">
              Ativo
            </span>
          </div>
        </div>

        {/* Informações Principais */}
        <div className="space-y-3 flex-1 flex flex-col justify-center">
          <h2 className="text-2xl font-display font-bold text-neutral-100 tracking-tight leading-snug">
            {status.title}
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            {status.description}
          </p>
        </div>

        {/* Rodapé: Tags/Tecnologias */}
        <div className="space-y-3 pt-4 border-t border-neutral-900/60">
          <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">
            Foco de Pesquisa
          </span>
          <div className="flex flex-wrap gap-2">
            {status.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs px-2.5 py-1 rounded bg-neutral-900 text-neutral-300 border border-neutral-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
