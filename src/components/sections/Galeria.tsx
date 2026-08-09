import { gallery } from "@/data/gallery";
import { FoodImage } from "@/components/common/FoodImage";
import { SectionTitle } from "@/components/common/SectionTitle";
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
          <figure
            key={item.id}
            className={cn(
              "group relative overflow-hidden rounded-3xl border border-border bg-asfalto-2",
              SPANS[i % SPANS.length],
            )}
          >
            <FoodImage
              src={item.image}
              alt={item.alt}
              tipo={item.tipo}
              className="size-full transition-transform duration-500 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-asfalto to-transparent p-3 text-xs font-medium text-creme opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {item.legenda}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-4 text-xs text-fumaca">Imagens ilustrativas.</p>
    </section>
  );
}
