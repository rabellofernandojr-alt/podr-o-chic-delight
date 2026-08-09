import { Quote, Star } from "lucide-react";
import { reviews } from "@/data/reviews";
import { siteConfig } from "@/data/siteConfig";
import { SectionTitle } from "@/components/common/SectionTitle";

export function Avaliacoes() {
  return (
    <section
      id="avaliacoes"
      aria-labelledby="avaliacoes-titulo"
      className="abaixo-da-dobra scroll-mt-24 border-y border-border bg-asfalto-2/60 py-16 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          kicker={`${siteConfig.avaliacao.nota} no ${siteConfig.avaliacao.fonte}`}
          id="avaliacoes-titulo"
          titulo="Quem come, volta."
          descricao={`Baseado em ${siteConfig.avaliacao.quantidade} avaliações de clientes.`}
        />

        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="relative flex flex-col rounded-3xl border border-border bg-asfalto p-6"
            >
              <Quote className="size-7 text-mostarda/50" aria-hidden="true" />
              <p className="mt-4 flex-1 text-base text-creme/90">“{review.texto}”</p>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm font-semibold text-creme">{review.autor}</span>
                <span className="flex gap-0.5" aria-label="5 de 5 estrelas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-mostarda text-mostarda" aria-hidden="true" />
                  ))}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-fumaca">
          Depoimentos ilustrativos — substituir pelos textos reais das avaliações.
        </p>
      </div>
    </section>
  );
}
