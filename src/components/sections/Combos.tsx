import { Check } from "lucide-react";
import { combos } from "@/data/combos";
import { SectionTitle } from "@/components/common/SectionTitle";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { formatarPreco } from "@/lib/format";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export function Combos() {
  const reduzido = useReducedMotion();

  return (
    <section
      id="combos"
      aria-labelledby="combos-titulo"
      className="abaixo-da-dobra textura-grao scroll-mt-24 bg-[linear-gradient(160deg,rgba(229,52,42,0.22),rgba(18,17,16,1)_55%)] py-16 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          kicker="Combos e promoções"
          id="combos-titulo"
          titulo="Combo que resolve a fome e o bolso."
          descricao="Menos conta, mais comida. Simples assim."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {combos.map((combo) => {
            const economia = combo.precoAntigo - combo.preco;
            return (
              <article
                key={combo.id}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-3xl border border-border bg-asfalto-2/90 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-mostarda/50 hover:shadow-quente",
                  combo.destaque && "lg:col-span-2",
                )}
              >
                {combo.validade && (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-brasa px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-creme">
                    Só hoje
                  </span>
                )}
                <h3 className="font-display text-3xl text-creme">{combo.nome}</h3>
                <p className="mt-2 text-sm text-fumaca">{combo.descricao}</p>

                <ul className="mt-4 space-y-2 text-sm text-creme/90">
                  {combo.itens.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-mostarda" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-end gap-3">
                  <span className="text-sm text-fumaca line-through">
                    {formatarPreco(combo.precoAntigo)}
                  </span>
                  <span className="font-display text-4xl text-mostarda">
                    {formatarPreco(combo.preco)}
                  </span>
                </div>

                <div className="mt-6">
                  <WhatsAppButton label="Pedir combo" className="w-full sm:w-auto" />
                </div>

                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute right-4 top-4 grid size-20 place-items-center rounded-full border border-dourado/60 text-center text-[9px] font-bold uppercase leading-tight tracking-wider text-dourado",
                    !reduzido && "anim-girar",
                  )}
                >
                  Economize
                  <br />
                  {formatarPreco(economia)}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
