"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, Play, RotateCcw, Code2, Sparkles, TerminalSquare, AlertCircle } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import BentoCard from "../BentoCard";

interface LogMessage {
  time: string;
  type: "info" | "process" | "success" | "alert";
  text: string;
}

export default function LabCard({ delay = 0 }: { delay?: number }) {
  const { lab } = portfolioData;
  const activeExp = lab.experiments[0]; // Carrega o primeiro experimento (Re.Floresta)
  
  const [activeTab, setActiveTab] = useState<"code" | "console">("code");
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const logsContainerRef = useRef<HTMLDivElement>(null);

  // Carrega os logs iniciais em formato formatado
  useEffect(() => {
    const initialLogs: LogMessage[] = activeExp.logs.map((logStr, i) => {
      const isLast = i === activeExp.logs.length - 1;
      return {
        time: `14:24:${(10 + i * 5)}`,
        type: isLast ? "success" : "info",
        text: logStr
      };
    });
    setLogs(initialLogs);
  }, [activeExp.logs]);

  // Scroll automático do terminal
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveTab("console"); // Muda para a aba de console para ver a simulação rolar
    
    // Limpar logs e começar
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    setLogs([{ time: timeStr, type: "process", text: "Iniciando execução do agente AI..." }]);

    activeExp.logs.forEach((logText, index) => {
      setTimeout(() => {
        const stepTime = new Date().toTimeString().split(" ")[0];
        const isLast = index === activeExp.logs.length - 1;
        
        setLogs((prev) => [
          ...prev, 
          { 
            time: stepTime, 
            type: isLast ? "success" : "process", 
            text: logText 
          }
        ]);

        if (isLast) {
          setIsSimulating(false);
        }
      }, (index + 1) * 1000);
    });
  };

  const resetConsole = () => {
    const now = new Date().toTimeString().split(" ")[0];
    setLogs([
      { time: now, type: "info", text: "Console limpo. Pronto para execução." }
    ]);
  };

  return (
    <BentoCard className="col-span-12 md:col-span-6 min-h-[460px]" delay={delay}>
      <div className="flex flex-col h-full justify-between space-y-4">
        {/* Cabeçalho */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold tracking-wider text-neutral-400">
              {lab.title}
            </span>
            <h2 className="text-2xl font-display font-bold text-neutral-100 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              {activeExp.title}
            </h2>
            <p className="text-xs text-neutral-400 max-w-md">
              {activeExp.description}
            </p>
          </div>
          <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            Tech Ambiental
          </span>
        </div>

        {/* Tab Selector & Workspace */}
        <div className="flex-1 flex flex-col gap-3 min-h-[220px]">
          {/* Abas */}
          <div className="flex border-b border-neutral-900 text-xs">
            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-colors cursor-pointer ${
                activeTab === "code"
                  ? "border-emerald-500 text-emerald-400 bg-emerald-500/2"
                  : "border-transparent text-neutral-500 hover:text-neutral-300"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Código do Agente
            </button>
            <button
              onClick={() => setActiveTab("console")}
              className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-colors cursor-pointer ${
                activeTab === "console"
                  ? "border-emerald-500 text-emerald-400 bg-emerald-500/2"
                  : "border-transparent text-neutral-500 hover:text-neutral-300"
              }`}
            >
              <TerminalSquare className="w-3.5 h-3.5" />
              Console de Execução
            </button>
          </div>

          {/* Área de Visualização */}
          <div className="flex-1 flex flex-col rounded-xl bg-[#070708] border border-neutral-900 font-mono text-[11px] overflow-hidden">
            {activeTab === "code" ? (
              /* Aba: Visualizador de Código */
              <div className="p-4 overflow-y-auto max-h-[190px] text-neutral-300 leading-relaxed scrollbar-thin">
                <pre className="text-emerald-300/90 whitespace-pre">
                  {activeExp.codeSnippet}
                </pre>
              </div>
            ) : (
              /* Aba: Terminal de Execução */
              <div className="flex flex-col h-full flex-1">
                {/* Header do Terminal */}
                <div className="bg-[#0b0b0d] px-3.5 py-1.5 border-b border-neutral-900 flex items-center justify-between text-neutral-500 text-[10px]">
                  <span>agente-florestal@re.floresta.sys</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500/30 animate-pulse" />
                </div>
                
                {/* Logs */}
                <div 
                  ref={logsContainerRef}
                  className="flex-1 p-3.5 overflow-y-auto space-y-2 max-h-[150px] text-neutral-400"
                >
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-2 items-start leading-relaxed animate-fadeIn">
                      <span className="text-neutral-600 select-none">[{log.time}]</span>
                      <span className={`font-semibold ${
                        log.type === "success" ? "text-emerald-400" :
                        log.type === "process" ? "text-indigo-400" :
                        "text-neutral-500"
                      }`}>
                        {log.type === "success" ? "✓" : log.type === "process" ? "⚡" : "•"}
                      </span>
                      <span className={log.type === "success" ? "text-neutral-200 font-medium" : ""}>
                        {log.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rodapé: Controles do Agente */}
        <div className="flex gap-2 pt-3 border-t border-neutral-900/60">
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isSimulating
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-md shadow-emerald-600/10 hover:shadow-emerald-500/20"
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
            {isSimulating ? "Simulando Agente..." : "Executar Simulação"}
          </button>

          <button
            onClick={resetConsole}
            disabled={isSimulating}
            className="p-2.5 rounded-xl border border-neutral-900 hover:bg-neutral-950 text-neutral-400 hover:text-neutral-200 transition-all cursor-pointer"
            title="Limpar Console"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </BentoCard>
  );
}
