import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyOrderBar } from "@/components/layout/StickyOrderBar";
import { CartSheet } from "@/components/layout/CartSheet";
import { Hero, Marquee } from "@/components/sections/Hero";
import { Destaques } from "@/components/sections/Destaques";
import { Cardapio } from "@/components/sections/Cardapio";
import { Combos } from "@/components/sections/Combos";
import { Acai } from "@/components/sections/Acai";
import { Sobre } from "@/components/sections/Sobre";
import { Galeria } from "@/components/sections/Galeria";
import { Avaliacoes } from "@/components/sections/Avaliacoes";
import { Localizacao } from "@/components/sections/Localizacao";
import { WhatsAppFab } from "@/components/common/WhatsAppButton";
import { siteConfig } from "@/data/siteConfig";

const TITULO = "Podrão Chic — Lanches na chapa e açaí no Recreio";
const DESCRICAO =
  "Podrões, hambúrgueres, cachorro-quente, porções e açaí cremoso no Recreio dos Bandeirantes. Peça pelo WhatsApp — aberto até 2h.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: siteConfig.nome,
          servesCuisine: ["Hamburgueria", "Lanches", "Açaí"],
          priceRange: "R$",
          telephone: `+${siteConfig.whatsapp.numeroInternacional}`,
          address: {
            "@type": "PostalAddress",
            addressLocality: siteConfig.endereco.bairro,
            addressRegion: siteConfig.endereco.estado,
            postalCode: siteConfig.endereco.cep,
            addressCountry: siteConfig.endereco.pais,
          },
          openingHours: "Mo-Su 18:00-02:00",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: siteConfig.avaliacao.quantidade,
          },
          sameAs: [siteConfig.instagram.url, siteConfig.facebook.url],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-asfalto text-creme">
        <a
          href="#cardapio"
          className="foco-mostarda sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-mostarda focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-asfalto"
        >
          Pular para o cardápio
        </a>

        <Header />

        <main>
          <Hero />
          <Marquee />
          <Destaques />
          <Cardapio />
          <Combos />
          <Acai />
          <Sobre />
          <Galeria />
          <Avaliacoes />
          <Localizacao />
        </main>

        <Footer />
        <StickyOrderBar />
        <WhatsAppFab />
        <CartSheet />
      </div>
    </CartProvider>
  );
}
