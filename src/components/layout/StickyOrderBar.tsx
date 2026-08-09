import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatarPreco } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Barra de pedido persistente (mobile/tablet), aparece após o hero. */
export function StickyOrderBar() {
  const { itemCount, total, abrirCesta } = useCart();
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-asfalto/95 backdrop-blur-xl transition-transform duration-300 lg:hidden",
        visivel ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-fumaca">
            {itemCount > 0 ? `${itemCount} ${itemCount === 1 ? "item" : "itens"}` : "Seu pedido"}
          </p>
          <p className="font-display text-xl text-mostarda">
            {itemCount > 0 ? formatarPreco(total) : "Monte o seu"}
          </p>
        </div>
        <button
          type="button"
          onClick={abrirCesta}
          className="foco-mostarda inline-flex min-h-12 items-center gap-2 rounded-full bg-mostarda px-6 text-sm font-bold uppercase tracking-wide text-asfalto shadow-quente active:scale-[0.97]"
        >
          <ShoppingBag className="size-4" />
          Pedir agora
        </button>
      </div>
    </div>
  );
}
