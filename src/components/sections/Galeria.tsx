import { useState, useEffect } from "react";
import { gallery, type GalleryItem } from "@/data/gallery";
import { FoodImage } from "@/components/common/FoodImage";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SPANS = [
  "col-span-2 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-2 row-span-2",
];

export function Galeria() {
  const [indiceAtivo, setIndiceAtivo] = useState<number | null>(null);

  const itemSelecionado: GalleryItem | null =
    indiceAtivo !== null ? gallery[indiceAtivo] ?? null : null;

  const anterior = () => {
    if (indiceAtivo === null) return;
    setIndiceAtivo((indiceAtivo - 1 + gallery.length) % gallery.length);
  };

  const proximo = () => {
    if (indiceAtivo === null) return;
    setIndiceAtivo((indiceAtivo + 1) % gallery.length);
  };

  useEffect(() => {
    if (indiceAtivo === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") proximo();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [indiceAtivo]);

  return (
    <section
      id="galeria"
      aria-labelledby="galeria-titulo"
      className="abaixo-da-dobra mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:py-28"
    >
      <SectionTitle
        kicker="Galeria"
        id="galeria-titulo"
        titulo="A chapa não mente."
        descricao="Um pouco do que acontece todo dia por aqui."
      />

      <div className="mt-8 grid auto-rows-[130px] grid-cols-4 gap-3 sm:auto-rows-[170px]">
        {gallery.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndiceAtivo(i)}
            aria-label={`Ver foto ampliada: ${item.alt}`}
            className={cn(
              "group relative block overflow-hidden rounded-3xl border border-border bg-asfalto-2 text-left focus:outline-none focus:ring-2 focus:ring-mostarda",
              SPANS[i % SPANS.length],
            )}
          >
            <FoodImage
              src={item.src}
              alt={item.alt}
              tipo={item.tipo}
              className="size-full transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-asfalto to-transparent p-3 text-xs font-medium text-creme opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {item.alt}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs text-fumaca">Imagens ilustrativas.</p>

      {/* Dialog para visualização ampliada */}
      <Dialog
        open={itemSelecionado !== null}
        onOpenChange={(aberto) => !aberto && setIndiceAtivo(null)}
      >
        <DialogContent className="max-w-2xl border-border bg-asfalto p-4 sm:p-6">
          <DialogTitle className="text-base font-semibold text-creme">
            {itemSelecionado?.alt}
          </DialogTitle>
          <div className="relative mt-3 flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-asfalto-2">
            {itemSelecionado && (
              <FoodImage
                src={itemSelecionado.src}
                alt={itemSelecionado.alt}
                tipo={itemSelecionado.tipo}
                className="size-full object-cover"
              />
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                anterior();
              }}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-asfalto/80 p-2 text-creme backdrop-blur-sm transition-colors hover:bg-mostarda hover:text-asfalto"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                proximo();
              }}
              aria-label="Próxima foto"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-asfalto/80 p-2 text-creme backdrop-blur-sm transition-colors hover:bg-mostarda hover:text-asfalto"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>
          <p className="mt-2 text-right text-xs text-fumaca">Imagem ilustrativa</p>
        </DialogContent>
      </Dialog>
    </section>
  );
}
