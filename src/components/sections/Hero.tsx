import { ArrowDown, Star, Clock, Bike } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { formatarHora } from "@/lib/format";

export function Hero() {
  const reduzido = useReducedMotion();

  return (
    <section
      id="top"
      aria-labelledby="hero-titulo"
      className="textura-grao relative flex min-h-[92svh] items-end overflow-hidden pt-16 lg:pt-20"
    >
      {/* Fundo: placeholder de foto grande (SUBSTITUIR pela foto real do lanche) */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(255,192,31,0.28),rgba(229,52,42,0.16)_38%,transparent_72%)] bg-asfalto",
          !reduzido && "anim-zoom-chapa",
        )}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-asfalto via-asfalto/70 to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-24 sm:px-6 lg:pb-20">
        <p
          className="anim-revelar text-[11px] font-bold uppercase tracking-[0.28em] text-mostarda"
          style={{ animationDelay: "0ms" }}
        >
          Recreio dos Bandeirantes · Rio de Janeiro
        </p>

        <h1
          id="hero-titulo"
          className="anim-revelar mt-4 font-display text-creme"
          style={{
            animationDelay: "60ms",
            fontSize: "clamp(2.75rem, 12vw, 7.5rem)",
          }}
        >
          O podrão mais <span className="font-chic text-dourado">Chic</span> do Recreio.
        </h1>

        <p
          className="anim-revelar mt-5 max-w-xl text-base text-creme/85 sm:text-lg"
          style={{ animationDelay: "120ms" }}
        >
          {siteConfig.frase}
        </p>

        <div
          className="anim-revelar mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: "180ms" }}
        >
          <WhatsAppButton label="Pedir no WhatsApp" className="w-full sm:w-auto" />
          <a
            href="#cardapio"
            className="foco-mostarda inline-flex min-h-12 w-full items-center justify-center rounded-full border border-creme/40 px-6 font-bold uppercase tracking-wide text-creme transition-colors hover:border-creme hover:bg-creme/10 active:scale-[0.97] sm:w-auto"
          >
            Ver cardápio
          </a>
        </div>

        <ul
          className="anim-revelar mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-creme/80"
          style={{ animationDelay: "240ms" }}
        >
          <li className="flex items-center gap-2">
            <Star className="size-4 text-mostarda" aria-hidden="true" />
            {siteConfig.avaliacao.nota} no {siteConfig.avaliacao.fonte} (
            {siteConfig.avaliacao.quantidade} avaliações)
          </li>
          <li className="flex items-center gap-2">
            <Clock className="size-4 text-mostarda" aria-hidden="true" />
            Aberto até {formatarHora(siteConfig.horarios[0]?.fecha ?? "02:00")}
          </li>
          <li className="flex items-center gap-2">
            <Bike className="size-4 text-mostarda" aria-hidden="true" />
            Entrega no Recreio
          </li>
        </ul>

        <div
          aria-hidden="true"
          className="mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-fumaca"
        >
          <ArrowDown className="size-4" />
          Role para ver o cardápio
        </div>
      </div>
    </section>
  );
}

/** Marquee decorativo entre seções. */
export function Marquee() {
  const reduzido = useReducedMotion();
  const texto = `${siteConfig.marquee} `.repeat(6);

  return (
    <div
      aria-hidden="true"
      className="group overflow-hidden border-y border-border bg-asfalto-2/70 py-3"
    >
      <div
        className={cn(
          "flex w-max gap-6 whitespace-nowrap font-display text-xl text-mostarda/80 sm:text-2xl",
          !reduzido && "anim-marquee group-hover:[animation-play-state:paused]",
        )}
      >
        <span>{texto}</span>
        <span>{texto}</span>
      </div>
    </div>
  );
}
