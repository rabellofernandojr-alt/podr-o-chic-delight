import { menu } from "@/data/menu";
import { ProductCard } from "@/components/common/ProductCard";
import { SectionTitle } from "@/components/common/SectionTitle";

const destaques = menu.filter((item) => item.destaque).slice(0, 6);
const NOVOS = new Set(["hd-cheddar", "po-fritas-cheddar"]);

export function Destaques() {
  return (
    <section
      id="destaques"
      aria-labelledby="destaques-titulo"
      className="abaixo-da-dobra mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:py-28"
    >
      <SectionTitle
        kicker="Os mais pedidos"
        id="destaques-titulo"
        titulo="Vai de olhos fechados"
        descricao="O que sai sem parar da chapa — e nunca decepciona."
      />

      <div className="scroll-x-snap mt-8 -mx-4 gap-4 px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 xl:grid-cols-3">
        {destaques.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            badge={NOVOS.has(item.id) ? "NOVO" : "MAIS PEDIDO"}
            className="w-[268px] shrink-0 lg:w-auto"
          />
        ))}
      </div>
      <p className="mt-4 text-xs text-fumaca">Imagens ilustrativas.</p>
    </section>
  );
}
