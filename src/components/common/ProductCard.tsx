import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatarPreco } from "@/lib/format";
import { useCart } from "@/hooks/useCart";
import { FoodImage } from "./FoodImage";
import type { MenuItem } from "@/data/menu";

interface ProductCardProps {
  item: MenuItem;
  layout?: "vertical" | "horizontal";
  badge?: "MAIS PEDIDO" | "NOVO";
  className?: string;
}

export function ProductCard({
  item,
  layout = "vertical",
  badge,
  className,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [adicionado, setAdicionado] = useState(false);
  const indisponivel = !item.disponivel;

  const adicionar = () => {
    if (indisponivel) return;
    addItem(item);
    setAdicionado(true);
    toast.success("Adicionado ao pedido", { description: item.nome });
    window.setTimeout(() => setAdicionado(false), 800);
  };

  const botao = (
    <button
      type="button"
      onClick={adicionar}
      disabled={indisponivel}
      aria-disabled={indisponivel}
      aria-label={`Adicionar ${item.nome} ao pedido`}
      className={cn(
        "foco-mostarda grid size-11 shrink-0 place-items-center rounded-full bg-mostarda text-asfalto transition-transform duration-200",
        "hover:scale-[1.08] active:scale-[0.92]",
        indisponivel && "cursor-not-allowed bg-muted text-fumaca hover:scale-100",
      )}
    >
      {adicionado ? <Check className="size-5" /> : <Plus className="size-5" />}
    </button>
  );

  const precos = (
    <p className="font-display text-2xl text-mostarda">{formatarPreco(item.preco)}</p>
  );

  const tags = (
    <div className="flex flex-wrap gap-1.5">
      {indisponivel && (
        <span className="rounded-full bg-brasa/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-brasa">
          Esgotado
        </span>
      )}
      {item.tags?.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-fumaca"
        >
          {tag}
        </span>
      ))}
    </div>
  );

  if (layout === "horizontal") {
    return (
      <article
        className={cn(
          "group flex items-center gap-3 rounded-3xl border border-border bg-asfalto-2 p-3 transition-all duration-200",
          "hover:-translate-y-1 hover:border-mostarda/50 hover:shadow-quente",
          indisponivel && "opacity-50",
          className,
        )}
      >
        <FoodImage
          src={item.image}
          alt={item.nome}
          tipo={item.categoria}
          className="size-24 shrink-0 rounded-2xl"
          imgClassName="group-hover:scale-[1.04]"
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-creme">{item.nome}</h3>
          <p className="mt-0.5 line-clamp-2 text-sm text-fumaca">{item.descricao}</p>
          <div className="mt-2 flex items-center justify-between gap-3">
            {precos}
            {botao}
          </div>
          <div className="mt-2">{tags}</div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-3xl border border-border bg-asfalto-2 transition-all duration-200",
        "hover:-translate-y-1 hover:border-mostarda/50 hover:shadow-quente",
        indisponivel && "opacity-50",
        className,
      )}
    >
      <div className="relative">
        <FoodImage
          src={item.image}
          alt={item.nome}
          tipo={item.categoria}
          className="aspect-[4/3] w-full"
          imgClassName="group-hover:scale-[1.04]"
        />
        {badge && (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider",
              badge === "MAIS PEDIDO" ? "bg-brasa text-creme" : "bg-mostarda text-asfalto",
            )}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold leading-tight text-creme">{item.nome}</h3>
        <p className="line-clamp-1 text-sm text-fumaca">{item.descricao}</p>
        {tags}
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          {precos}
          {botao}
        </div>
      </div>
    </article>
  );
}
