import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface CategoryChipProps {
  label: string;
  ativo?: boolean;
  quantidade?: number;
  Icone?: LucideIcon;
  onClick?: () => void;
}

export function CategoryChip({
  label,
  ativo = false,
  quantidade,
  Icone,
  onClick,
}: CategoryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={ativo ? "true" : undefined}
      className={cn(
        "foco-mostarda flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-[0.97]",
        ativo
          ? "border-mostarda bg-mostarda text-asfalto"
          : "border-border bg-asfalto-2 text-creme hover:border-mostarda/60",
      )}
    >
      {Icone && <Icone className="size-4" />}
      <span>{label}</span>
      {typeof quantidade === "number" && (
        <span className={cn("text-xs", ativo ? "text-asfalto/70" : "text-fumaca")}>
          {quantidade}
        </span>
      )}
    </button>
  );
}
