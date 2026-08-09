import { useState } from "react";
import { Beef, CupSoda, IceCream2, Sandwich, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/data/menu";

type Tipo = Category | "burger" | "dog" | "acai" | "porcao";

const ICONES: Record<string, typeof Beef> = {
  podroes: Sandwich,
  hamburgueres: Beef,
  burger: Beef,
  "cachorro-quente": Sandwich,
  dog: Sandwich,
  porcoes: Utensils,
  porcao: Utensils,
  acai: IceCream2,
  bebidas: CupSoda,
  sobremesas: IceCream2,
};

interface FoodImageProps {
  src?: string | undefined;
  alt: string;
  tipo?: Tipo;
  className?: string;
  imgClassName?: string;
  prioridade?: boolean;
}

/**
 * Imagem de produto com placeholder gerado em CSS/SVG.
 * Sem `src` (ou em caso de erro) exibe gradiente quente + ícone + "Foto em breve".
 */
export function FoodImage({
  src,
  alt,
  tipo = "podroes",
  className,
  imgClassName,
  prioridade = false,
}: FoodImageProps) {
  const [erro, setErro] = useState(false);
  const [carregada, setCarregada] = useState(false);
  const Icone = ICONES[tipo] ?? Sandwich;
  const usarPlaceholder = !src || erro;

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-asfalto-2",
        className,
      )}
    >
      {usarPlaceholder ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(255,192,31,0.22),rgba(229,52,42,0.12)_45%,transparent_80%)]"
        >
          <Icone className="size-8 text-mostarda/70" strokeWidth={1.5} />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-fumaca">
            Foto em breve
          </span>
        </div>
      ) : (
        <>
          {!carregada && (
            <div
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden bg-muted"
            >
              <div className="anim-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-creme/10 to-transparent" />
            </div>
          )}
          <img
            src={src}
            alt={alt}
            width={800}
            height={600}
            loading={prioridade ? "eager" : "lazy"}
            decoding="async"
            {...(prioridade ? { fetchPriority: "high" as const } : {})}
            onError={() => setErro(true)}
            onLoad={() => setCarregada(true)}
            className={cn(
              "size-full object-cover saturate-125 transition-transform duration-300",
              imgClassName,
            )}
          />
        </>
      )}
      {/* vinheta */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_50%,transparent_55%,rgba(18,17,16,0.55)_100%)]"
      />
    </div>
  );
}
