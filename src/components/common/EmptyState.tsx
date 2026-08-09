import { SearchX, ShoppingBag } from "lucide-react";

interface EmptyStateProps {
  titulo: string;
  descricao?: string;
  acaoLabel?: string;
  onAcao?: () => void;
  variante?: "busca" | "cesta";
}

export function EmptyState({
  titulo,
  descricao,
  acaoLabel,
  onAcao,
  variante = "busca",
}: EmptyStateProps) {
  const Icone = variante === "cesta" ? ShoppingBag : SearchX;
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-asfalto-2/60 px-6 py-12 text-center">
      <div
        aria-hidden="true"
        className="grid size-16 place-items-center rounded-full bg-[radial-gradient(circle,rgba(255,192,31,0.2),transparent_70%)]"
      >
        <Icone className="size-7 text-mostarda" strokeWidth={1.5} />
      </div>
      <p className="font-display text-2xl text-creme">{titulo}</p>
      {descricao && <p className="max-w-sm text-sm text-fumaca">{descricao}</p>}
      {acaoLabel && onAcao && (
        <button
          type="button"
          onClick={onAcao}
          className="foco-mostarda mt-2 min-h-11 rounded-full bg-mostarda px-5 text-sm font-bold uppercase tracking-wide text-asfalto transition-transform active:scale-[0.97]"
        >
          {acaoLabel}
        </button>
      )}
    </div>
  );
}
