import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Alex Sendra | AI Product Manager & Designer",
  description: "Portfólio interativo de Alex Sendra. Criando interfaces inteligentes, agentes autônomos e produtos de IA de ponta.",
  keywords: ["AI Product Manager", "AI Designer", "Interactive Portfolio", "UX Design", "Next.js", "Framer Motion"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${inter.variable} h-full antialiased font-sans bg-[#030303] text-[#f5f5f7]`}
    >
      <body className="min-h-full flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
      </body>
    </html>
  );
}

