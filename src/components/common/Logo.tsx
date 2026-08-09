import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

/** Logo em texto: "PODRÃO" (Anton) + "Chic" (Playfair itálico dourado). */
export function Logo({ className, tamanho = "md" }: { className?: string; tamanho?: "sm" | "md" | "lg" }) {
  const escala = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  }[tamanho];

  return (
    <span className={cn("flex items-center gap-2", className)}>
      <Flame className="size-6 shrink-0 text-mostarda" strokeWidth={2.2} aria-hidden="true" />
      <span className={cn("flex items-baseline gap-1 leading-none", escala)}>
        <span className="font-display text-creme">Podrão</span>
        <span className="font-chic text-dourado">Chic</span>
      </span>
    </span>
  );
}
