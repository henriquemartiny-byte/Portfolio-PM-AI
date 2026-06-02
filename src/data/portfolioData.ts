export interface ProfileData {
  name: string;
  title: string;
  location: string;
  bio: string;
  email: string;
  avatarUrl?: string;
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
}

export interface StatusData {
  label: string;
  title: string;
  description: string;
  isActive: boolean;
  tags: string[];
}

export interface ThinkFramework {
  title: string;
  shortDesc: string;
  detailedDesc: string;
  iconName: string;
}

export interface ThinkingData {
  title: string;
  subtitle: string;
  frameworks: ThinkFramework[];
}

export interface WorkCase {
  title: string;
  category: string;
  description: string;
  year: string;
  tags: string[];
  gradient: string;
}

export interface WorksData {
  cases: WorkCase[];
}

export interface LabExperiment {
  title: string;
  description: string;
  codeSnippet: string;
  logs: string[];
}

export interface LabData {
  title: string;
  subtitle: string;
  experiments: LabExperiment[];
}

export interface PortfolioData {
  profile: ProfileData;
  status: StatusData;
  thinking: ThinkingData;
  works: WorksData;
  lab: LabData;
}

export const portfolioData: PortfolioData = {
  // 1. Perfil / Hero
  profile: {
    name: "Henrique Martiny",
    title: "AI Product Manager & Designer",
    location: "Porto Alegre, Brasil",
    bio: "Construindo uma nova geração de produtos digitais na intersecção entre Pessoas, Product Management, UX de alta fidelidade e Inteligência Artificial Gerativa.",
    email: "henrique.martiny@gmail.com",
    avatarUrl: "/avatar.png",
    socials: {
      github: "https://github.com/henriquemartiny",
      linkedin: "https://linkedin.com/in/henriquemartiny",
      twitter: "https://twitter.com/hmartiny",
    },
  },

  // 2. Status Atual
  status: {
    label: "STATUS ATUAL",
    title: "Liderando o Projeto Merlin AI",
    description: "Escalando produtos inteligentes de IA na Dell Technologies e desenvolvendo soluções de Tech Ambiental.",
    isActive: true,
    tags: ["Product Owner", "GenAI", "Agile", "UX Design"],
  },

  // 3. Playbook de Metodologias (How I Think)
  thinking: {
    title: "How I Think",
    subtitle: "Minha filosofia para gerenciar produtos complexos e inovação.",
    frameworks: [
      {
        title: "AI-Driven Product Discovery",
        shortDesc: "Reduzindo ciclos de validação de semanas para dias com IA.",
        detailedDesc: "Conecto engenharia de prompt avançada a frameworks tradicionais de discovery para sintetizar com velocidade pesquisas de mercado, dados quantitativos e feedbacks. O objetivo é acelerar o entendimento de personas e mapeamento de dores, ganhando eficiência sem perder a sensibilidade humana no processo.",
        iconName: "Sparkles",
      },
      {
        title: "Priorização de Valor Real",
        shortDesc: "Equilibrando o custo de implementação com o impacto de negócio.",
        detailedDesc: "Priorizar produtos de IA exige ir além do RICE tradicional. Adapto matrizes de esforço e impacto para a realidade dos modelos de linguagem, ponderando variáveis críticas: custo de computação e APIs, latência, taxa de acerto/confiabilidade do modelo e, fundamentalmente, o valor real entregue na ponta.",
        iconName: "Compass",
      },
      {
        title: "Design Ops & Cultura Ágil",
        shortDesc: "Conectando design e engenharia em sprints paralelas e sem atrito.",
        detailedDesc: "Acredito em times sinérgicos onde o protótipo de alta fidelidade funciona como a própria especificação viva do produto. Busco estabelecer fluxos de trabalho ágeis que permitem que designers e engenheiros construam juntos e iterem em paralelo, eliminando gargalos de comunicação e acelerando o desenvolvimento.",
        iconName: "RotateCcw",
      },
      {
        title: "UX como lente principal",
        shortDesc: "Projetando interfaces focadas em explicabilidade e confiança para sistemas cognitivos.",
        detailedDesc: "Interfaces inteligentes não podem ser caixas-pretas. Olhar o produto através da lente de UX significa desenhar interações que constroem confiança, projetando componentes visuais para processamentos em tempo real (streaming) e arquitetando fluxos preparados para mitigar e lidar de forma elegante com as imprevisibilidades e alucinações dos modelos.",
        iconName: "Cpu",
      },
    ],
  },

  // 4. Trabalhos e Cases Profissionais
  works: {
    cases: [
      {
        title: "Merlin AI — Dell Technologies",
        category: "Product Management & AI Strategy",
        description: "Liderança do produto Merlin AI como Senior Analyst Project Manager e Product Owner, definindo roadmap, refinando o backlog com metodologias ágeis e arquitetando soluções inteligentes baseadas em IA para escala corporativa.",
        year: "2025 - 2026",
        tags: ["Product Ownership", "Dell Tech", "Enterprise AI", "Scrum"],
        gradient: "from-blue-600/20 via-indigo-500/10 to-transparent",
      },
      {
        title: "MBA Gestão de Projetos e Metodologias Ágeis",
        category: "Especialização Acadêmica — PUCRS",
        description: "Aplicação prática de frameworks modernos de gestão, governança ágil, métricas de produto e liderança de times multifuncionais em cenários de alta incerteza tecnológica.",
        year: "2026",
        tags: ["Agile Methodologies", "PUCRS", "Product Metrics", "Leadership"],
        gradient: "from-purple-600/20 via-pink-500/10 to-transparent",
      },
      {
        title: "Comunicação Digital e Interfaces",
        category: "Bacharelado — Unisinos",
        description: "Fundamentação teórica e prática em design de interface, arquitetura de informação e comportamento do usuário em ecossistemas de mídia digital.",
        year: "2019 - 2023",
        tags: ["UX/UI Design", "Information Architecture", "Digital Strategy"],
        gradient: "from-emerald-600/20 via-teal-500/10 to-transparent",
      },
    ],
  },

  // 5. Laboratório / Experimentos
  lab: {
    title: "Lab de Ideias",
    subtitle: "Casos de uso de IA com a mão na massa.",
    experiments: [
      {
        title: "Re.Floresta",
        description: "Iniciativa de tecnologia ambiental voltada para o monitoramento inteligente de áreas florestais utilizando análise de dados e crédito de carbono.",
        codeSnippet: `const monitorForestArea = async (geoZone) => {
  const metrics = await aiAgent.analyzeSatelliteData(geoZone);
  if (metrics.canopyLoss > 0.05) {
    return triggerAlert('Alerta de desmatamento detectado.');
  }
  return generateCarbonCredits(metrics);
};`,
        logs: [
          "Iniciando módulo Re.Floresta...",
          "Carregando dados geoespaciais e de satélite...",
          "Agente de IA processando densidade de copa...",
          "Análise concluída: Área estável. Créditos de carbono calculados.",
        ],
      }
    ]
  }
};
