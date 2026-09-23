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
  category?: string;
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
    title: "Senior Technical Product Manager & STS Researcher",
    location: "Porto Alegre, Brasil • Cidadão Italiano (UE)",
    bio: "Senior TPM na Dell Technologies e pesquisador em Ciência, Tecnologia e Sociedade (STS). Liderando produtos de IA corporativa, esteiras de Spec-Driven Development e pesquisa sociotécnica sobre plataformização do trabalho.",
    email: "henrique.martiny@gmail.com",
    avatarUrl: "/avatar.png",
    socials: {
      github: "https://github.com/henriquemartiny-byte",
      linkedin: "https://www.linkedin.com/in/henrique-martiny-121954191",
    },
  },

  // 2. Status Atual
  status: {
    label: "STATUS ATUAL",
    title: "Senior TPM — Agentic & Enterprise AI",
    description: "Orquestrando o squad com Devin e MCP via Spec-Driven Development na Dell Technologies e finalizando pesquisa em ecologias sociotécnicas.",
    isActive: true,
    tags: ["Spec-Driven", "Devin & MCP", "Enterprise AI", "STS Research"],
  },

  // 3. Filosofia de Produto ("How I Think")
  thinking: {
    title: "How I Think",
    subtitle: "Minha filosofia para gerenciar produtos complexos, IA e inovação.",
    frameworks: [
      {
        title: "Spec-Driven Development & Agentic Ops",
        shortDesc: "Acelerando ritos de engenharia de 6x a 30x com documentação viva e agentes.",
        detailedDesc: "Utilizo o Devin integrado via Model Context Protocol (MCP) ao Jira e Confluence com 13 skills especializadas. Em vez de documentação estática, aplico a abordagem Spec-Driven: contexto vivo e critérios técnicos rigorosos no Jira que aceleram o squad e alimentam agentes de engenharia sem ambiguidades.",
        iconName: "Sparkles",
      },
      {
        title: "Priorização Sociotécnica e Valor Real",
        shortDesc: "Ponderando latência, custo de modelos e impacto humano na ponta.",
        detailedDesc: "Priorizar produtos de IA exige ir além do RICE tradicional. Avalio a viabilidade de modelos computacionais equilibrando consumo de tokens, latência de inferência, custo de infraestrutura e o valor tangível entregue ao usuário, garantindo soluções robustas onde a IA realmente agrega valor.",
        iconName: "Compass",
      },
      {
        title: "Design Ops & Framework MakerLoop",
        shortDesc: "Eliminando o abismo entre design de alta fidelidade e código de produção.",
        detailedDesc: "Concebi o framework MakerLoop na Dell para integrar designers e engenheiros desde o discovery até o handoff. Protótipos funcionais iteram em paralelo com a arquitetura técnica, eliminando retrabalho e acelerando a entrega de front-end.",
        iconName: "RotateCcw",
      },
      {
        title: "UX e Confiabilidade em Sistemas Cognitivos",
        shortDesc: "Projetando interfaces transparentes para explicabilidade e mitigação de erros.",
        detailedDesc: "Sistemas inteligentes não podem ser caixas-pretas. Liderar a experiência do usuário em IA significa desenhar streaming em tempo real, explicabilidade das decisões automatizadas e fluxos elegantes de fallback e supervisão humana (human-in-the-loop).",
        iconName: "Cpu",
      },
    ],
  },

  // 4. Trabalhos & Cases (Matriz 2x2: 2 Enterprise + 2 Acadêmicos)
  works: {
    cases: [
      {
        title: "Merlin AI — Dell Technologies",
        category: "Enterprise AI & Global Operations",
        description: "Liderança de produto e UX na evolução do Merlin AI de PoC para plataforma corporativa de agentes autônomos de IA para suporte e infraestrutura. Adoção por 10.000+ operadores em 40+ países com 94% CSAT sustentado.",
        year: "2023 - 2024",
        tags: ["10k+ Users", "40+ Countries", "94% CSAT", "AI Product Lead", "Dell Tech"],
        gradient: "from-blue-600/20 via-indigo-500/10 to-transparent",
      },
      {
        title: "Plataforma Teneo & MakerLoop — Dell Technologies",
        category: "Product Management & DesignOps",
        description: "Sustentação e governança de plataforma crítica de precificação e cotação B2B movimentando $1.8 Bilhão em receita anual sem downtime. Criação do framework proprietário MakerLoop DesignOps.",
        year: "2022 - 2025",
        tags: ["$1.8B Transacted", "Zero Downtime", "MakerLoop", "Enterprise B2B"],
        gradient: "from-indigo-600/20 via-purple-500/10 to-transparent",
      },
      {
        title: "MBA Gestão Ágil: Ecologias Sociotécnicas — PUCRS",
        category: "Pós-Graduação & Monografia",
        description: "Pesquisa aplicada sobre a evolução sociotécnica do Spotify: da transição dos Squads tradicionais para plataformas internas de desenvolvedores (Backstage, DevEx) e governança ágil de IA autônoma.",
        year: "2025 - 2026",
        tags: ["Spotify Case Study", "Platform Engineering", "Sociotechnical Ecologies", "PUCRS"],
        gradient: "from-purple-600/20 via-pink-500/10 to-transparent",
      },
      {
        title: "Comunicação Digital & Pesquisa STS — Unisinos / Digilabour",
        category: "Bacharelado & Iniciação Científica",
        description: "Bolsista de P&D em Design no programa Dell DPDP e pesquisador afiliado ao Digilabour (coord. Rafael Grohmann). TCC laureado com distinção máxima sobre plataformização do serviço público sob orientação de Gustavo Fischer.",
        year: "2019 - 2023",
        tags: ["Digilabour", "Bolsa Dell DPDP", "STS / Platform Studies", "Nota Máxima"],
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
        title: "Vinyl AI Collection Hub",
        category: "Jamstack & Edge AI",
        description: "Arquitetura Jamstack híbrida com Spotify Web API e Gemini para catalogar e explorar acervos físicos de vinil. Recomendações contextuais de sommelier e contextualização cultural de cada prensagem com custo zero de infraestrutura.",
        codeSnippet: `// Integração do Sommelier com Spotify API e Google Gemini
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
        ],
      },
      {
        title: "Marvin: Agente de Organização Pessoal",
        category: "Autonomous Agent & Chief of Staff",
        description: "Agente autônomo local e Chief of Staff pessoal calibrado com a personalidade de Marvin, o Androide Paranoico (O Guia do Mochileiro das Galáxias, de Douglas Adams). Orquestra rotinas, conciliação financeira e esteiras de desenvolvimento através de pipelines determinísticos no sistema operacional, APIs do Google e engenharia de contexto rigorosa.",
        codeSnippet: `// Runtime do Agente Autônomo Marvin (OS + APIs + Contexto)
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
        ],
      },
      {
        title: "AI-Powered Vibe Coding Portfolio",
        category: "Agentic Engineering & CI/CD",
        description: "Arquitetura e deploy de um portfólio interativo utilizando agentes autônomos de IA (Antigravity). Foco em engenharia de prompt cirúrgica para otimização de tokens, componentização em Next.js e esteira automatizada de CI/CD via Vercel.",
        codeSnippet: `// Otimização de contexto para o agente de IA
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
        ],
      },
    ],
  },
};
