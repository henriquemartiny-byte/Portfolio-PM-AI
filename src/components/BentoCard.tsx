"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function BentoCard({ children, className = "", delay = 0 }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Configuração de mola para suavizar a luz de destaque seguindo o cursor
  const springConfig = { damping: 30, stiffness: 200, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Cria o gradiente radial que segue as coordenadas do mouse de forma suave
  const gradientBg = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(350px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.03) 50%, transparent 100%)`
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 1, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={`group relative overflow-hidden rounded-2xl glass-card glow-border glass-card-hover flex flex-col justify-between ${className}`}
    >
      {/* Efeito de iluminação que segue o mouse */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
        style={{ background: gradientBg }}
      />
      
      {/* Elemento de brilho constante sutil no fundo */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/10 pointer-events-none" />

      {/* Conteúdo interno */}
      <div className="relative z-10 w-full h-full p-6 md:p-8 flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}
