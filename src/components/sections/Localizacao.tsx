import { Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { SectionTitle } from "@/components/common/SectionTitle";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { formatarHora } from "@/lib/format";
import { useIsOpenNow } from "@/hooks/useIsOpenNow";
import { cn } from "@/lib/utils";

export function Localizacao() {
  const { aberto, mensagem, diaAtual } = useIsOpenNow();

  return (
    <section
      id="localizacao"
      aria-labelledby="localizacao-titulo"
      className="abaixo-da-dobra mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:py-28"
    >
      <SectionTitle
        kicker="Onde e quando"
        id="localizacao-titulo"
        titulo="Passa aqui ou chama no zap."
        descricao={siteConfig.endereco.resumo}
      />

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="overflow-hidden rounded-3xl border border-border bg-asfalto-2">
          <iframe
            title="Mapa da localização do Podrão Chic"
            src={siteConfig.endereco.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[320px] w-full border-0 lg:h-full lg:min-h-[420px]"
          />
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-border bg-asfalto-2 p-6">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider",
                aberto ? "bg-mostarda text-asfalto" : "bg-muted text-fumaca",
              )}
            >
              <span
                aria-hidden="true"
                className={cn("size-2 rounded-full", aberto ? "bg-asfalto" : "bg-fumaca")}
              />
              {aberto ? "Aberto agora" : "Fechado agora"}
            </span>
            <p className="mt-3 text-sm text-fumaca">{mensagem}</p>

            <h3 className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-mostarda">
              <Clock className="size-4" aria-hidden="true" />
              Horários
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {siteConfig.horarios.map((h) => (
                <li
                  key={h.dia}
                  className={cn(
                    "flex justify-between gap-4",
                    h.dia === diaAtual ? "font-semibold text-creme" : "text-fumaca",
                  )}
                >
                  <span>{h.label}</span>
                  <span>
                    {h.fechado
                      ? "Fechado"
                      : `${formatarHora(h.abre)} — ${formatarHora(h.fecha)}`}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-fumaca/70">
              Horários sujeitos a confirmação.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-asfalto-2 p-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-mostarda">Contato</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:+${siteConfig.whatsapp.numeroInternacional}`}
                  className="foco-mostarda flex items-center gap-3 text-creme transition-colors hover:text-mostarda"
                >
                  <Phone className="size-4 shrink-0 text-mostarda" aria-hidden="true" />
                  {siteConfig.whatsapp.numeroExibicao}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="foco-mostarda flex items-center gap-3 text-creme transition-colors hover:text-mostarda"
                >
                  <Instagram className="size-4 shrink-0 text-mostarda" aria-hidden="true" />
                  {siteConfig.instagram.usuario}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.endereco.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="foco-mostarda flex items-start gap-3 text-creme transition-colors hover:text-mostarda"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-mostarda" aria-hidden="true" />
                  Abrir no Google Maps
                </a>
              </li>
            </ul>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <WhatsAppButton label="Chamar no WhatsApp" className="w-full sm:w-auto" />
              <a
                href="#cardapio"
                className="foco-mostarda inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-creme/30 px-5 text-sm font-bold uppercase tracking-wide text-creme transition-colors hover:bg-creme/10 sm:w-auto"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Ver cardápio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
