"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, RotateCcw, Cpu, Sparkles, ChevronDown } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import BentoCard from "../BentoCard";

// Mapeamento local de ícones para evitar imports dinâmicos complexos
const iconMap: Record<string, React.ComponentType<any>> = {
  Compass: Compass,
  RotateCcw: RotateCcw,
  Cpu: Cpu,
  Sparkles: Sparkles,
};

export default function ThinkingCard({ delay = 0 }: { delay?: number }) {
  const { thinking } = portfolioData;
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <BentoCard className="col-span-12 md:col-span-5 min-h-[460px]" delay={delay}>
      <div className="flex flex-col h-full justify-between space-y-4">
        {/* Cabeçalho */}
        <div className="space-y-1">
          <span className="text-xs font-semibold tracking-wider text-neutral-400">
            COMO EU PENSO
          </span>
          <h2 className="text-2xl font-display font-bold text-neutral-100 tracking-tight">
            {thinking.title}
          </h2>
          <p className="text-xs text-neutral-400">
            {thinking.subtitle}
          </p>
        </div>

        {/* Lista de Metodologias Interativas (Acordeão) */}
        <div className="flex-1 flex flex-col justify-center space-y-2.5 my-3">
          {thinking.frameworks.map((fw, index) => {
            const Icon = iconMap[fw.iconName] || Compass;
            const isOpen = activeIndex === index;

            return (
              <div
                key={fw.title}
                className={`rounded-xl border transition-colors cursor-pointer p-3.5 ${
                  isOpen
                    ? "bg-indigo-500/5 border-indigo-500/20"
                    : "bg-neutral-950/20 border-neutral-900/40 hover:bg-neutral-900/30 hover:border-neutral-800"
                }`}
                onClick={() => setActiveIndex(isOpen ? null : index)}
              >
                {/* Cabeçalho do Item */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${
                      isOpen ? "bg-indigo-500/10 text-indigo-300" : "bg-neutral-900 text-neutral-400"
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-sm font-semibold tracking-tight transition-colors ${
                      isOpen ? "text-indigo-200" : "text-neutral-200"
                    }`}>
                      {fw.title}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-neutral-500"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Conteúdo Expansível com Framer Motion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 10 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-1.5 pl-9 text-xs">
                        <p className="font-semibold text-indigo-300">
                          {fw.shortDesc}
                        </p>
                        <p className="text-neutral-400 leading-relaxed font-normal">
                          {fw.detailedDesc}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Rodapé informativo */}
        <div className="text-[10px] text-neutral-500 text-center tracking-wider uppercase border-t border-neutral-900/60 pt-3">
          Toque em um princípio para expandir detalhes
        </div>
      </div>
    </BentoCard>
  );
}
