import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { promises as fs } from "fs";
import path from "path";

// 1. Definição da Interface do Vinil
export interface Vinyl {
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

// Base de dados padrão (usada como semente inicial)
const INITIAL_COLLECTION: Vinyl[] = [
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

// Caminho do arquivo JSON persistido localmente
const collectionFilePath = path.join(process.cwd(), "collection.json");

// Helpers para leitura e escrita no disco rígido
async function getCollection(): Promise<Vinyl[]> {
  try {
    const data = await fs.readFile(collectionFilePath, "utf-8");
    return JSON.parse(data) as Vinyl[];
  } catch (error) {
    return await initializeCollection();
  }
}

async function saveCollection(collection: Vinyl[]): Promise<void> {
  // Garante que o diretório pai existe
  await fs.mkdir(path.dirname(collectionFilePath), { recursive: true });
  await fs.writeFile(collectionFilePath, JSON.stringify(collection, null, 2), "utf-8");
}

async function initializeCollection(): Promise<Vinyl[]> {
  console.log("Inicializando e enriquecendo a base semente do acervo...");
  const enriched = await Promise.all(
    INITIAL_COLLECTION.map(async (vinyl) => {
      try {
        console.log(`Enriquecendo semente inicial: ${vinyl.album}`);
        const spotifyData = await getSpotifyAlbumData(vinyl.album, vinyl.artist);
        const wikiSummary = await getWikipediaSummary(vinyl.album, vinyl.artist);
        const story = await generateVinylStory(vinyl.album, vinyl.artist, wikiSummary);
        
        return {
          ...vinyl,
          cover_image_url: spotifyData?.cover_image_url || vinyl.cover_image_url,
          spotify_id: spotifyData?.spotify_id || vinyl.spotify_id,
          year: spotifyData?.year || vinyl.year,
          story: story || vinyl.story,
        };
      } catch (err) {
        console.error(`Erro ao enriquecer semente ${vinyl.album}:`, err);
        return vinyl;
      }
    })
  );
  await saveCollection(enriched);
  return enriched;
}

// 2. Autenticação na API do Spotify
async function getSpotifyAccessToken(): Promise<string> {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error("Credenciais do Spotify (SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET) não configuradas no arquivo .env.local.");
    }

    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ERRO DETALHADO DO SPOTIFY AUTH (${response.status}):`, errorText);
      throw new Error(`Erro de autenticação no Spotify: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error: any) {
    console.error("ERRO CRÍTICO NA OBTENÇÃO DE TOKEN DO SPOTIFY:", error.message);
    throw error;
  }
}

// 3. Busca de Metadados do Álbum no Spotify
async function getSpotifyAlbumData(albumName: string, artistName: string) {
  try {
    const token = await getSpotifyAccessToken();
    const query = `album:${albumName} artist:${artistName}`;
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=1`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ERRO DETALHADO DO SPOTIFY SEARCH (${response.status}):`, errorText);
      return null;
    }

    const data = await response.json();
    const albumItem = data.albums?.items?.[0];

    if (!albumItem) {
      console.warn(`Nenhum álbum encontrado no Spotify para a query: ${query}`);
      return null;
    }

    const cover_image_url = albumItem.images?.[0]?.url || "";
    const spotify_id = albumItem.id || "";
    const year = albumItem.release_date ? parseInt(albumItem.release_date.substring(0, 4), 10) : undefined;

    return {
      cover_image_url,
      spotify_id,
      year,
    };
  } catch (err: any) {
    console.error("ERRO CRÍTICO NA BUSCA DO SPOTIFY:", err.message);
    return null;
  }
}

// 4. Busca do resumo na Wikipedia
async function getWikipediaSummary(album: string, artist: string): Promise<string> {
  try {
    const searchQuery = `${album} ${artist} album`;
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchQuery)}&format=json&origin=*`;
    const searchRes = await fetch(searchUrl);
    if (!searchRes.ok) return "";
    const searchData = await searchRes.json();
    const pageTitle = searchData.query?.search?.[0]?.title;
    if (!pageTitle) return "";

    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`;
    const summaryRes = await fetch(summaryUrl);
    if (!summaryRes.ok) return "";
    const summaryData = await summaryRes.json();
    return summaryData.extract || "";
  } catch (err) {
    console.error("Erro ao obter resumo da Wikipedia:", err);
    return "";
  }
}

// 5. Geração de história fascinante com o Gemini 2.5 Flash
async function generateVinylStory(album: string, artist: string, wikiSummary: string): Promise<string> {
  try {
    if (!wikiSummary) {
      return `O clássico álbum "${album}" do artista ${artist} é um item indispensável para qualquer amante de música, trazendo uma experiência sonora marcante que merece ser apreciada em vinil.`;
    }
    const prompt = `Gere uma história curta, fascinante e instigante com feeling de colecionador de vinil experiente para o disco "${album}" de "${artist}".

Use este resumo histórico de contexto:
"${wikiSummary}"

Diretrizes estritas de escrita:
1. LIMITE RIGOROSO: A história deve ter no máximo 3 ou 4 frases curtas (entre 50 e 70 palavras no total). Não gere parágrafos longos ou densos de texto.
2. TOM E ESTILO: Tom de sommelier de vinil experiente e apaixonado. Foco no valor histórico do artefato físico e na sonoridade/urgência da obra.
3. EXEMPLO ESPERADO (Siga exatamente este estilo e tamanho):
"Ponto zero da música pop mundial. Lançado em março de 1963, cada sulco deste vinil carrega a urgência de quatro jovens de Liverpool prestes a redefinir a cultura global. A produção de George Martin capturou a energia crua e quase ao vivo do grupo. Para um colecionador, ter este selo Parlophone na prateleira é guardar um pedaço tangível da história."

Importante: Retorne apenas o texto da história condensada direta, sem títulos, sem formatação markdown complexa ou tags.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7
      }
    });
    return response.text?.trim() || "";
  } catch (err) {
    console.error("Erro ao gerar história:", err);
    return `O clássico álbum "${album}" do artista ${artist} é uma peça preciosa do acervo.`;
  }
}

// 6. Minificação do Payload para a IA (Token Saving)
function compressCollection(collection: Vinyl[]): string {
  // Formato: ID|Artista|Álbum|Vibes|História
  return collection
    .map((vinyl) => `${vinyl.id}|${vinyl.artist}|${vinyl.album}|${vinyl.vibes.join(",")}|${vinyl.story || ""}`)
    .join("\n");
}

// 7. Inicialização do Cliente Gemini
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

export async function POST(req: NextRequest) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: "A chave GEMINI_API_KEY não está configurada no ambiente." },
        { status: 500 }
      );
    }

    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "O parâmetro 'message' é obrigatório e deve ser uma string." },
        { status: 400 }
      );
    }

    // Lê acervo dinâmico persistido
    const collection = await getCollection();
    const compressedCollection = compressCollection(collection);

    const userPrompt = `Acervo comprimido atual (ID|Artista|Álbum|Vibes):
${compressedCollection}

Mensagem do usuário:
"${message}"`;

    const systemInstruction = `Você é o Viny, um sommelier de vinil inteligente, lúdico e apaixonado.
Instruções:
- Se o usuário pedir para adicionar, cadastrar, salvar ou registrar um novo disco/álbum que NÃO está na lista atual, retorne obrigatoriamente a action "ADD_ALBUM" preenchendo as propriedades "album" e "artist" correspondentes.
- Se o usuário pedir uma recomendação ou estiver conversando, use apenas o acervo fornecido no formato ID|Artista|Álbum|Vibes como conhecimento de base (background). Retorne a action "RECOMMEND" e coloque o vinylId sugerido correspondente.
- Você NUNCA deve apenas copiar e colar a string 'story' na conversa.
- Quando o usuário perguntar sobre um disco, use seu conhecimento amplo sobre música para trazer fatos de bastidores, recomendar faixas específicas, falar sobre a prensagem ou conectar com a vibe atual do usuário. Seja conversacional, dinâmico, breve (máximo 2 a 3 frases) e caloroso. Adapte suas respostas ao contexto do chat.
- Se o usuário perguntar se possui ou se já tem um disco que NÃO está no acervo fornecido, responda de forma direta e super curta: "Você não tem esse disco. Está liberado para comprar!" e defina vinylId e action como null.
- Retorne obrigatoriamente um objeto JSON com o formato:
{
  "recommendation": "sua resposta personalizada e dinâmica aqui",
  "vinylId": "o ID correspondente ou null",
  "action": "ADD_ALBUM | RECOMMEND | NONE",
  "album": "Nome do álbum para adicionar ou null",
  "artist": "Nome do artista para adicionar ou null"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.4,
      },
    });

    const responseText = response.text;

    if (!responseText) {
      throw new Error("Resposta vazia retornada pelo modelo Gemini.");
    }

    const aiResponse = JSON.parse(responseText.trim()) as {
      recommendation: string;
      vinylId: string | null;
      action: "ADD_ALBUM" | "RECOMMEND" | "NONE";
      album: string | null;
      artist: string | null;
    };

    // Fluxo 1: Adicionar Álbum ao Acervo
    if (aiResponse.action === "ADD_ALBUM" && aiResponse.album && aiResponse.artist) {
      const albumName = aiResponse.album;
      const artistName = aiResponse.artist;

      console.log("Adicionando novo álbum solicitado pelo chat:", albumName);
      console.log("Puxando capa do Spotify para o álbum:", albumName);

      // Busca dados no Spotify
      const spotifyData = await getSpotifyAlbumData(albumName, artistName);

      if (!spotifyData) {
        return NextResponse.json({
          recommendation: `Desculpe, tentei buscar o álbum "${albumName}" de "${artistName}" no Spotify para adicioná-lo, mas não consegui localizar os metadados. Tem certeza de que o nome está correto?`,
          vinyl: null
        });
      }

      // Busca resumo da Wikipedia para contexto histórico
      console.log("Buscando resumo na Wikipedia para:", albumName);
      const wikiSummary = await getWikipediaSummary(albumName, artistName);

      // Gera história imersiva com Gemini
      console.log("Gerando história com feeling de colecionador para:", albumName);
      const story = await generateVinylStory(albumName, artistName, wikiSummary);

      // Cria o novo vinil persistido
      const newVinyl: Vinyl = {
        id: (collection.length + 1).toString(),
        artist: artistName,
        album: albumName,
        year: spotifyData.year || 2026,
        vibes: ["descoberta", "novo"],
        cover_image_url: spotifyData.cover_image_url || "https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?w=400&q=80",
        storage_location: `Prateleira ${Math.floor(collection.length / 2) + 1}, Nicho B`,
        spotify_id: spotifyData.spotify_id,
        story: story,
      };

      // Adiciona ao acervo e salva no disco
      collection.push(newVinyl);
      await saveCollection(collection);

      return NextResponse.json({
        recommendation: `Pode deixar! Já busquei a capa oficial no Spotify e coloquei o "${newVinyl.album}" na sua prateleira. Olha ele ali!`,
        vinyl: newVinyl
      });
    }

    // Fluxo 2: Recomendação Padrão do Acervo (Enriquecimento Tardio)
    let matchedVinyl: Partial<Vinyl> | null = null;
    if (aiResponse.vinylId) {
      const fullVinyl = collection.find((v) => v.id === aiResponse.vinylId);
      if (fullVinyl) {
        matchedVinyl = {
          id: fullVinyl.id,
          artist: fullVinyl.artist,
          album: fullVinyl.album,
          vibes: fullVinyl.vibes,
          storage_location: fullVinyl.storage_location,
          barcode: fullVinyl.barcode,
          cover_image_url: fullVinyl.cover_image_url,
          spotify_id: fullVinyl.spotify_id,
          year: fullVinyl.year,
          story: fullVinyl.story,
        };

        const spotifyData = await getSpotifyAlbumData(fullVinyl.album, fullVinyl.artist);
        if (spotifyData) {
          matchedVinyl.cover_image_url = spotifyData.cover_image_url || matchedVinyl.cover_image_url;
          matchedVinyl.spotify_id = spotifyData.spotify_id || matchedVinyl.spotify_id;
          if (spotifyData.year) {
            matchedVinyl.year = spotifyData.year;
          }
        }
      }
    }

    return NextResponse.json({
      recommendation: aiResponse.recommendation,
      vinyl: matchedVinyl,
    });
  } catch (error: any) {
    console.error("Erro na API vinyl-chat:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor.", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const collection = await getCollection();
    return NextResponse.json(collection);
  } catch (error: any) {
    console.error("Erro ao carregar acervo inicial:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
