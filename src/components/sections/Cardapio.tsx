import { useMemo, useState } from "react";
import { Beef, CupSoda, IceCream2, Sandwich, Search, Utensils, Cookie } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { categorias, menu, type Category } from "@/data/menu";
import { CategoryChip } from "@/components/common/CategoryChip";
import { ProductCard } from "@/components/common/ProductCard";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionTitle, FaixaToldo } from "@/components/common/SectionTitle";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

const ICONES: Record<Category, LucideIcon> = {
  podroes: Sandwich,
  "cachorro-quente": Sandwich,
  hamburgueres: Beef,
  porcoes: Utensils,
  acai: IceCream2,
  bebidas: CupSoda,
  sobremesas: Cookie,
};

export function Cardapio() {
  const [busca, setBusca] = useState("");
  const [ativa, setAtiva] = useState<Category>("podroes");
  const buscaDebounced = useDebounce(busca, 200);

  const filtrados = useMemo(() => {
    const termo = buscaDebounced.trim().toLowerCase();
    if (!termo) return menu;
    return menu.filter(
      (item) =>
        item.nome.toLowerCase().includes(termo) ||
        item.descricao.toLowerCase().includes(termo),
    );
  }, [buscaDebounced]);

  const irPara = (id: Category) => {
    setAtiva(id);
    document.getElementById(`grupo-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="cardapio"
      aria-labelledby="cardapio-titulo"
      className="abaixo-da-dobra mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:py-28"
    >
      <SectionTitle
        kicker="Cardápio completo"
        id="cardapio-titulo"
        titulo="Tudo que sai da chapa"
        descricao="Escolha, toque no + e monte seu pedido. A gente confirma tudo no WhatsApp."
      />

      {/* Categorias */}
      <div className="sticky top-16 z-30 -mx-4 mt-8 bg-asfalto/90 px-4 py-3 backdrop-blur-md lg:top-20">
        <div className="scroll-x-snap gap-2">
          {categorias.map((cat) => (
            <CategoryChip
              key={cat.id}
              label={cat.label}
              Icone={ICONES[cat.id]}
              ativo={ativa === cat.id}
              quantidade={menu.filter((i) => i.categoria === cat.id).length}
              onClick={() => irPara(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Busca */}
      <div className="relative mt-6">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-fumaca"
        />
        <Input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar no cardápio…"
          aria-label="Buscar item no cardápio"
          className="h-12 rounded-full border-border bg-asfalto-2 pl-11 text-base text-creme placeholder:text-fumaca/70"
        />
      </div>

      {filtrados.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            titulo="Não achamos esse."
            descricao="Que tal um X-Tudo?"
            acaoLabel="Limpar busca"
            onAcao={() => setBusca("")}
          />
        </div>
      ) : (
        <div className="mt-10 space-y-14">
          {categorias.map((cat) => {
            const itens = filtrados.filter((i) => i.categoria === cat.id);
            if (itens.length === 0) return null;
            return (
              <div key={cat.id} id={`grupo-${cat.id}`} className="scroll-mt-40">
                <div className="mb-5">
                  <h3 className="font-display text-3xl text-creme sm:text-4xl">{cat.label}</h3>
                  <FaixaToldo className="mt-3 h-2.5 rounded-full opacity-70" />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {itens.map((item) => (
                    <ProductCard
                      key={item.id}
                      item={item}
                      layout="vertical"
                      className="hidden lg:flex"
                    />
                  ))}
                  {itens.map((item) => (
                    <ProductCard
                      key={`h-${item.id}`}
                      item={item}
                      layout="horizontal"
                      className="lg:hidden"
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <p className="mt-6 text-xs text-fumaca">Imagens ilustrativas.</p>
    </section>
  );
}
