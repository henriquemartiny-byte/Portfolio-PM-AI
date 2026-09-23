"use client";

import React, { useState } from "react";
import { MapPin, Mail, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import BentoCard from "../BentoCard";

export default function ProfileCard({ delay = 0 }: { delay?: number }) {
  const { profile } = portfolioData;
  const [imgError, setImgError] = useState(false);

  return (
    <BentoCard className="col-span-12 lg:col-span-8 min-h-[336px]" delay={delay}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center h-full w-full">
        
        {/* Coluna 1 (Esquerda): Imagem do perfil vertical de destaque */}
        <div className="col-span-12 md:col-span-4 flex justify-center md:justify-start items-center">
          <div className="relative w-48 h-72 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-md shadow-black/40 transition-all duration-300 hover:scale-[1.02] hover:border-indigo-500/30">
            {!imgError ? (
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="w-full h-full object-cover animate-fadeIn"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-display font-bold text-3xl text-white">
                HM
              </div>
            )}
          </div>
        </div>

        {/* Coluna 2 (Direita): Informações profissionais e de contato */}
        <div className="col-span-12 md:col-span-8 flex flex-col justify-between h-full min-h-[288px] space-y-4 md:space-y-0">
          <div className="space-y-3.5">
            {/* Tag de Especialidade */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Senior TPM • AI Product Lead • STS Researcher</span>
            </div>

            {/* Nome e Título */}
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
                {profile.name}
              </h1>
              <p className="text-sm md:text-base font-semibold text-neutral-300 tracking-tight">
                {profile.title}
              </p>
            </div>

            {/* Bio */}
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed max-w-xl font-normal">
              {profile.bio}
            </p>
          </div>

          {/* Rodapé do Card: Localização, Email e Redes */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-neutral-900/60 text-xs text-neutral-400 mt-auto">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              <span>{profile.location}</span>
            </div>
            
            <a 
              href={`mailto:${profile.email}`} 
              className="flex items-center gap-1.5 hover:text-white transition-colors group/mail"
            >
              <Mail className="w-3.5 h-3.5 text-indigo-400 group-hover/mail:scale-110 transition-transform" />
              <span>{profile.email}</span>
            </a>

            <div className="flex items-center gap-4 ml-auto text-neutral-400">
              <a 
                href={profile.socials.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
              <a 
                href={profile.socials.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
