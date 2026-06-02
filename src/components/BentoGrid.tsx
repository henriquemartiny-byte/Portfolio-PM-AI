"use client";

import React from "react";
import ProfileCard from "./cards/ProfileCard";
import StatusCard from "./cards/StatusCard";
import ThinkingCard from "./cards/ThinkingCard";
import LabCard from "./cards/LabCard";
import WorksCard from "./cards/WorksCard";

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-5 w-full">
      {/* Linha 1: Hero de Perfil (8 cols) + Status Atual (4 cols) */}
      <ProfileCard delay={0.1} />
      <StatusCard delay={0.2} />

      {/* Linha 2: Como eu Penso (6 cols) + Lab de Ideias (6 cols) */}
      <ThinkingCard delay={0.3} />
      <LabCard delay={0.4} />

      {/* Linha 3: Trabalhos / Cases Selecionados (12 cols) */}
      <WorksCard delay={0.5} />
    </div>
  );
}
