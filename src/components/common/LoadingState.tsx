import { Skeleton } from "@/components/ui/skeleton";

export function LoadingState({ quantidade = 6 }: { quantidade?: number }) {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: quantidade }).map((_, i) => (
        <div
          key={`skeleton-${i}`}
          className="overflow-hidden rounded-3xl border border-border bg-asfalto-2"
        >
          <Skeleton className="aspect-[4/3] w-full rounded-none bg-muted" />
          <div className="space-y-3 p-4">
            <Skeleton className="h-5 w-2/3 bg-muted" />
            <Skeleton className="h-4 w-full bg-muted" />
            <Skeleton className="h-7 w-24 bg-muted" />
          </div>
        </div>
      ))}
      <span className="sr-only">Carregando o cardápio…</span>
    </div>
  );
}
