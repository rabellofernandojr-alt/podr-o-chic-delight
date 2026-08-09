import { useEffect, useState } from "react";
import { Menu, ShoppingBag, Instagram, MapPin, MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/common/Logo";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { siteConfig } from "@/data/siteConfig";
import { useIsOpenNow } from "@/hooks/useIsOpenNow";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

const IDS = siteConfig.navegacao.map((n) => n.id);

function BadgeStatus() {
  const { aberto } = useIsOpenNow();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider",
        aberto ? "border-mostarda/40 text-mostarda" : "border-border text-fumaca",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-2 rounded-full",
          aberto ? "anim-pulso bg-mostarda" : "bg-fumaca",
        )}
      />
      {aberto ? "Aberto agora" : "Fechado"}
    </span>
  );
}

export function Header() {
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const ativo = useScrollSpy(IDS);
  const { itemCount, abrirCesta } = useCart();

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-asfalto/85 backdrop-blur-xl transition-all duration-300",
        rolou ? "h-14 lg:h-[68px]" : "h-16 lg:h-20",
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#top" className="foco-mostarda rounded-full" aria-label="Podrão Chic — início">
          <Logo tamanho={rolou ? "sm" : "md"} />
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {siteConfig.navegacao.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={ativo === item.id ? "true" : undefined}
                  className="foco-mostarda group relative rounded-sm py-2 text-sm font-semibold text-creme/85 transition-colors hover:text-creme"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-mostarda transition-all duration-300",
                      ativo === item.id ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <BadgeStatus />
          </div>

          <button
            type="button"
            onClick={abrirCesta}
            aria-label={`Abrir cesta com ${itemCount} ${itemCount === 1 ? "item" : "itens"}`}
            className="foco-mostarda relative grid size-11 place-items-center rounded-full border border-border text-creme transition-colors hover:border-mostarda/60 active:scale-[0.97]"
          >
            <ShoppingBag className="size-5" />
            <span
              aria-live="polite"
              className={cn(
                "absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-brasa px-1 text-[10px] font-bold text-creme",
                itemCount === 0 && "sr-only",
              )}
            >
              {itemCount}
            </span>
          </button>

          <WhatsAppButton className="hidden h-11 min-h-11 px-5 text-xs lg:inline-flex" label="Pedir agora" />

          <Sheet open={menuAberto} onOpenChange={setMenuAberto}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Abrir menu de navegação"
                className="foco-mostarda grid size-11 place-items-center rounded-full border border-border text-creme active:scale-[0.97] lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-full flex-col border-border bg-asfalto p-0 sm:max-w-sm"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-4">
                <SheetTitle asChild>
                  <span>
                    <Logo tamanho="md" />
                  </span>
                </SheetTitle>
              </div>
              <nav aria-label="Navegação mobile" className="flex-1 overflow-y-auto px-4 py-6">
                <ul className="space-y-2">
                  {siteConfig.navegacao.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={() => setMenuAberto(false)}
                        className="foco-mostarda block rounded-2xl px-2 py-2 font-display text-[28px] text-creme transition-colors hover:text-mostarda"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex items-center gap-3">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.numeroInternacional}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="foco-mostarda grid size-12 place-items-center rounded-full border border-border text-mostarda"
                  >
                    <MessageCircle className="size-5" />
                  </a>
                  <a
                    href={siteConfig.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="foco-mostarda grid size-12 place-items-center rounded-full border border-border text-mostarda"
                  >
                    <Instagram className="size-5" />
                  </a>
                  <a
                    href={siteConfig.endereco.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver no mapa"
                    className="foco-mostarda grid size-12 place-items-center rounded-full border border-border text-mostarda"
                  >
                    <MapPin className="size-5" />
                  </a>
                  <div className="ml-auto">
                    <BadgeStatus />
                  </div>
                </div>
              </nav>
              <div
                className="border-t border-border p-4"
                style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
              >
                <WhatsAppButton className="w-full" label="Pedir agora" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
