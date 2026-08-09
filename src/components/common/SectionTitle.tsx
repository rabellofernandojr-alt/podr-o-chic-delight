import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  kicker?: string;
  titulo: ReactNode;
  descricao?: string;
  id?: string;
  className?: string;
  claro?: boolean;
}

export function SectionTitle({
  kicker,
  titulo,
  descricao,
  id,
  className,
  claro = false,
}: SectionTitleProps) {
  return (
    <header className={cn("max-w-2xl", className)}>
      {kicker && (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.22em]",
            claro ? "text-dourado" : "text-mostarda",
          )}
        >
          {kicker}
        </p>
      )}
      <h2
        id={id}
        className="font-display text-4xl text-creme sm:text-5xl lg:text-6xl"
      >
        {titulo}
      </h2>
      {descricao && (
        <p className="mt-4 text-base text-fumaca sm:text-lg">{descricao}</p>
      )}
    </header>
  );
}

/** Divisor de listras diagonais (toldo de barraca). */
export function FaixaToldo({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("faixa-toldo", className)} />;
}

/** Filete dourado dos blocos "chic". */
export function FileteDourado({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("filete-dourado", className)} />;
}
