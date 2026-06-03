"use client";

import { useState, useEffect } from "react";

interface Vinyl {
  id: string;
  artist: string;
  album: string;
  year: number;
  vibes: string[];
  cover_image_url: string;
  storage_location: string;
  barcode?: string;
  spotify_id?: string;
  story?: string;
}

interface Message {
  sender: "user" | "bot";
  text: string;
  recommendedVinyl?: Vinyl | null;
}

const VINYL_COLLECTION: Vinyl[] = [
  {
    id: "1",
    artist: "The Beatles",
    album: "Abbey Road",
    year: 1969,
    vibes: ["clássico", "fim de tarde", "sofisticado", "foco"],
    cover_image_url: "https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?w=400&q=80",
    storage_location: "Prateleira 1, Nicho A",
    barcode: "0094638246824",
    spotify_id: "0ETFjACViydcrglRP47H66",
    story: "Lançado em 1969, Abbey Road é o último álbum gravado pelos Beatles, marcado pela icônica foto da travessia de pedestres. É uma jornada musical brilhante que culmina em um medley inesquecível do lado B.",
  },
  {
    id: "2",
    artist: "Michael Jackson",
    album: "Thriller",
    year: 1982,
    vibes: ["festa", "dançante", "energia alta", "groove"],
    cover_image_url: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&q=80",
    storage_location: "Prateleira 1, Nicho B",
    barcode: "07464381121",
    spotify_id: "2tP1CrudevQ3X1y0UgkqAL",
    story: "O álbum mais vendido de todos os tempos de Michael Jackson, de 1982, redefiniu a música pop com hits massivos como Billie Jean e Beat It, unindo rock, pop e R&B com maestria.",
  },
  {
    id: "3",
    artist: "The Beatles",
    album: "Please Please Me",
    year: 1963,
    vibes: ["animado", "vintage", "manhã", "cru"],
    cover_image_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80",
    storage_location: "Prateleira 1, Nicho A",
    barcode: "0094638241522",
    spotify_id: "3K227ndZsVSS077u8XG9y8",
    story: "Gravado em apenas um dia em 1963, o disco de estreia dos Beatles captura toda a energia juvenil e crua dos shows do Cavern Club, dando início à Beatlemania.",
  },
  {
    id: "4",
    artist: "Gilberto Gil",
    album: "Realce",
    year: 1979,
    vibes: ["solar", "verão", "brasilidades", "cozinhar"],
    cover_image_url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&q=80",
    storage_location: "Prateleira 2, Nicho A",
    barcode: "7891430005423",
    spotify_id: "6r01Y6XgS6lZ34rVlyvPeb",
    story: "De 1979, Gilberto Gil mistura ritmos brasileiros com o groove da disco music de forma solar e com a cara do verão carioca, trazendo clássicos como Toda Menina Baiana.",
  },
];

// Mascote do Viny em SVG
function VinyMascot() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      {/* Corpo principal (toca-discos) creme retrô */}
      <rect x="3" y="7" width="30" height="24" rx="5" fill="#FAF5FF" stroke="#1E1B4B" strokeWidth="2"/>
      <rect x="5" y="9" width="26" height="20" rx="3" fill="#F5E6D3" />
      {/* Prato do disco (turntable) azul brilhante */}
      <circle cx="15" cy="19" r="8" fill="#06B6D4"/>
      <circle cx="15" cy="19" r="6" fill="#0891B2"/>
      <circle cx="15" cy="19" r="2" fill="#F5E6D3"/>
      {/* Olhos fofos */}
      <circle cx="12" cy="14" r="1.5" fill="#1E1B4B"/>
      <circle cx="18" cy="14" r="1.5" fill="#1E1B4B"/>
      {/* Sorriso simpático */}
      <path d="M14 16C14 16.8 14.5 17.2 15 17.2C15.5 17.2 16 16.8 16 16" stroke="#1E1B4B" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Agulha / Braço toca-discos */}
      <rect x="25" y="11" width="2" height="11" rx="1" transform="rotate(30 25 11)" fill="#64748B" stroke="#1E1B4B" strokeWidth="1"/>
      <circle cx="24" cy="12" r="1.5" fill="#F59E0B"/>
    </svg>
  );
}

function VinylCard({ vinyl, isHighlighted }: { vinyl: Vinyl; isHighlighted: boolean }) {
  const [imgError, setImgError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={`flex flex-col gap-3 p-4 rounded-xl border transition-all duration-350 ease-in-out overflow-visible bg-zinc-900/50 backdrop-blur-md shadow-sm hover:shadow-md hover:bg-zinc-800/40 cursor-pointer ${
        isHighlighted
          ? "border-amber-500/80 bg-amber-950/20 scale-[1.02] shadow-lg shadow-amber-500/5"
          : "border-zinc-800/60"
      } ${isExpanded ? 'max-h-[1000px] pb-6' : 'max-h-[380px]'}`}
    >
      {/* Capa + Vinil Deslizante */}
      <div className="relative w-full aspect-square flex items-center overflow-visible flex-shrink-0">
        {/* Disco de vinil preto (Bolachão) */}
        <div className="absolute top-[12.5%] right-0 w-[75%] h-[75%] bg-neutral-950 rounded-full border-4 border-neutral-900 flex items-center justify-center translate-x-6 shadow-md z-0 transition-transform duration-300">
          <div className="w-[30%] h-[30%] rounded-full bg-zinc-800 border border-neutral-700 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-950"></div>
          </div>
        </div>

        {/* Capa ou Card Retrô Estilizado se houver erro */}
        {imgError || !vinyl.cover_image_url ? (
          <div className="relative w-[75%] h-[75%] border-2 border-zinc-700 shadow-lg z-10 bg-gradient-to-br from-zinc-800 to-zinc-700 p-3 flex flex-col justify-between items-center text-center rounded-md">
            <span className="font-sans font-bold text-xs text-zinc-100 uppercase tracking-wider line-clamp-3 my-auto">
              {vinyl.album}
            </span>
            <span className="text-[9px] text-zinc-400 uppercase tracking-widest block border-t border-zinc-600 w-full pt-1">
              {vinyl.artist}
            </span>
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={vinyl.cover_image_url}
            alt={vinyl.album}
            onError={() => setImgError(true)}
            className="relative w-[75%] h-[75%] object-cover border-2 border-zinc-700 shadow-lg z-10 bg-zinc-800 rounded-md"
          />
        )}
      </div>

      {/* Textos Informativos */}
      <div className="flex flex-col justify-start mt-1 w-full">
        <h3 className="font-bold text-sm leading-tight text-zinc-100 truncate" title={vinyl.album}>
          {vinyl.album}
        </h3>
        <p className="text-xs text-zinc-400 truncate mt-0.5">{vinyl.artist}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {vinyl.vibes.map((vibe) => (
            <span
              key={vibe}
              className="text-[9px] px-1.5 py-0.5 border border-zinc-800 rounded bg-zinc-950/60 text-zinc-300"
            >
              {vibe}
            </span>
          ))}
        </div>

        {/* Encarte Expansível da História */}
        {isExpanded && (
          <div className="mt-4 border-t border-zinc-800/60 pt-4 text-zinc-300 text-sm leading-relaxed antialiased animate-fadeIn">
            {vinyl.story || "História não encontrada."}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [vinyls, setVinyls] = useState<Vinyl[]>(VINYL_COLLECTION);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Olá! Sou o Viny, seu sommelier de vinil. Diga-me qual é a vibe ou o que está fazendo, e eu recomendo o disco perfeito do seu acervo!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    const loadCollection = async () => {
      try {
        const res = await fetch("/api/vinyl-chat");
        if (res.ok) {
          const text = await res.text();
          console.log("CONTEÚDO BRUTO RECEBIDO DO BACKEND:", text);
          if (!text) throw new Error("Resposta do backend veio completamente vazia.");
          const data = JSON.parse(text);
          const sortedData = data.sort((a: any, b: any) => a.artist.localeCompare(b.artist));
          setVinyls(sortedData);
        }
      } catch (error) {
        console.error("Erro ao carregar acervo do Spotify:", error);
      }
    };
    loadCollection();
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/vinyl-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Erro na comunicação com a API.");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.recommendation,
          recommendedVinyl: data.vinyl || null,
        },
      ]);

      if (data.vinyl?.id) {
        setHighlightedId(data.vinyl.id);
        setVinyls((prev) => {
          const exists = prev.some((v) => v.id === data.vinyl.id);
          if (!exists) {
            const nextList = [...prev, data.vinyl];
            return nextList.sort((a, b) => a.artist.localeCompare(b.artist));
          }
          return prev;
        });
      } else {
        setHighlightedId(null);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Desculpe, tive um problema para processar o seu pedido. Tente novamente.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative grid grid-cols-1 lg:grid-cols-12 h-screen p-6 gap-6 bg-slate-950 text-zinc-100 font-sans overflow-hidden">
      {/* Auroras fluidas de fundo */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/25 blur-[120px] rounded-full z-0 pointer-events-none"></div>
      <div className="absolute top-[10%] right-[-5%] w-[600px] h-[650px] bg-cyan-500/20 blur-[100px] rounded-full z-0 pointer-events-none"></div>

      {/* Painel Esquerdo: Meu Acervo (Mais largo: lg:col-span-8, Glassmorphism) */}
      <section className="relative z-10 lg:col-span-8 flex flex-col border border-zinc-800/50 p-6 bg-zinc-900/30 backdrop-blur-xl rounded-2xl overflow-hidden">
        <h1 className="text-2xl font-sans font-semibold tracking-tight mb-4 border-b border-zinc-800/60 pb-3 text-zinc-100">
          Meu Acervo
        </h1>
        <div className="overflow-y-auto max-h-[82vh] overflow-x-hidden pr-4 pb-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-2">
          {vinyls.map((vinyl) => (
            <VinylCard
              key={vinyl.id}
              vinyl={vinyl}
              isHighlighted={highlightedId === vinyl.id}
            />
          ))}
        </div>
      </section>

      {/* Painel Direito: Chat (Glassmorphism) */}
      <section className="relative z-10 lg:col-span-4 flex flex-col border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-xl rounded-2xl overflow-hidden">
        {/* Topo do Chat com o Mascote Viny */}
        <div className="flex items-center gap-3 p-4 border-b border-zinc-800/50 bg-zinc-900/50">
          <VinyMascot />
          <div className="flex flex-col">
            <span className="font-bold text-base text-zinc-100">Viny</span>
            <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">Vinyl AI Sommelier</span>
          </div>
        </div>

        {/* Histórico de Mensagens */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col max-w-[85%] ${
                msg.sender === "user" ? "self-end items-end" : "self-start items-start"
              }`}
            >
              <div
                className={`p-3 border rounded-xl text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-cyan-950/40 text-cyan-100 border-cyan-500/30"
                    : "bg-zinc-950/40 border-zinc-850/60 text-zinc-300"
                }`}
              >
                {msg.text}
              </div>

              {/* Se houver vinil recomendado na mensagem */}
              {msg.recommendedVinyl && (
                <div className="mt-2 p-3 border border-dashed border-amber-500/30 bg-amber-500/5 rounded-xl max-w-full text-xs flex gap-3">
                  <div className="w-12 h-12 flex-shrink-0 bg-zinc-800 border border-zinc-700 flex items-center justify-center font-sans text-[8px] font-semibold text-center p-0.5 rounded text-zinc-300">
                    {msg.recommendedVinyl.album.substring(0, 15)}
                  </div>
                  <div>
                    <p className="font-bold text-amber-400">✨ Recomendado: {msg.recommendedVinyl.album}</p>
                    <p className="text-zinc-400">{msg.recommendedVinyl.artist}</p>
                    <p className="mt-1 font-mono text-[10px] text-cyan-400">
                      📍 Local: {msg.recommendedVinyl.storage_location}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="self-start text-xs italic text-cyan-400/80 animate-pulse font-mono">
              Viny está pensando no disco perfeito...
            </div>
          )}
        </div>

        {/* Formulário de Input */}
        <form onSubmit={sendMessage} className="p-4 border-t border-zinc-800/50 bg-zinc-900/50 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Qual a vibe de hoje?"
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-zinc-950/60 border border-zinc-800 text-zinc-100 rounded-xl focus:border-cyan-500/50 outline-none text-sm placeholder-zinc-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2 bg-amber-500 text-black font-bold rounded-xl transition-all hover:bg-amber-400 active:translate-y-[1px] disabled:opacity-50 text-xs uppercase tracking-wider shadow-lg shadow-amber-500/10"
          >
            Enviar
          </button>
        </form>
      </section>
    </main>
  );
}
