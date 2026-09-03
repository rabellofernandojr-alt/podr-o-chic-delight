import { Instagram, MessageCircle, Facebook } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { FaixaToldo } from "@/components/common/SectionTitle";
import { siteConfig } from "@/data/siteConfig";
import { formatarHora } from "@/lib/format";

export function Footer() {
  return (
    <footer className="mt-16 bg-asfalto-2/60 lg:mt-28">
      <FaixaToldo />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:py-16">
        <div>
          <Logo tamanho="lg" />
          <p className="mt-4 max-w-xs text-sm text-fumaca">
            Nasceu na rua, cresceu na chapa. Lanche no Recreio até as{" "}
            {formatarHora(siteConfig.horarios[0]?.fecha ?? "02:00")}.
          </p>
        </div>

        <nav aria-label="Navegação do rodapé">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-mostarda">
            Navegue
          </h2>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {siteConfig.navegacao.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="foco-mostarda rounded-sm text-creme/85 transition-colors hover:text-mostarda"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-mostarda">
            Onde e quando
          </h2>
          <p className="text-sm text-fumaca">{siteConfig.endereco.resumo}</p>
          <p className="mt-1 text-sm text-fumaca">
            Todos os dias, {formatarHora(siteConfig.horarios[0]?.abre ?? "17:00")} às{" "}
            {formatarHora(siteConfig.horarios[0]?.fecha ?? "02:00")}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsapp.numeroInternacional}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="foco-mostarda grid size-11 place-items-center rounded-full border border-border text-mostarda transition-colors hover:border-mostarda"
            >
              <MessageCircle className="size-5" />
            </a>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="foco-mostarda grid size-11 place-items-center rounded-full border border-border text-mostarda transition-colors hover:border-mostarda"
            >
              <Instagram className="size-5" />
            </a>
            <a
              href={siteConfig.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="foco-mostarda grid size-11 place-items-center rounded-full border border-border text-mostarda transition-colors hover:border-mostarda"
            >
              <Facebook className="size-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6 text-center sm:px-6">
        <p className="text-xs text-fumaca">
          © 2026 {siteConfig.nome}. Todos os direitos reservados.
        </p>
        <p className="mt-1 text-[11px] text-fumaca/70">Imagens meramente ilustrativas.</p>
      </div>
    </footer>
  );
}
