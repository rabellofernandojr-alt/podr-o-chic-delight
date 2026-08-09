import { Flame, HandHeart, Timer } from "lucide-react";
import { SectionTitle } from "@/components/common/SectionTitle";
import { siteConfig } from "@/data/siteConfig";

const pilares = [
  {
    Icone: Flame,
    titulo: "Chapa quente, sempre",
    texto: "Nada de lanche parado. Sai na hora, do jeito que tem que ser.",
  },
  {
    Icone: HandHeart,
    titulo: "Recheio sem medo",
    texto: "Aqui a mão pesa. Cheddar, bacon e molho na medida do exagero.",
  },
  {
    Icone: Timer,
    titulo: "Madrugada resolvida",
    texto: "Abrimos até tarde para salvar a fome que chega fora de hora.",
  },
];

export function Sobre() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-titulo"
      className="abaixo-da-dobra mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:py-28"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionTitle
            kicker="Nossa história"
            id="sobre-titulo"
            titulo="Podrão de esquina com alma de bistrô."
            alinhamento="esquerda"
          />
          <div className="mt-6 space-y-4 text-base text-creme/85">
            <p>
              O {siteConfig.nome} nasceu na esquina, no vapor da chapa, com fila de gente
              faminta e conversa boa até a madrugada. A gente pegou aquele lanche
              descaradamente gostoso de trailer e resolveu tratá-lo com respeito de
              cozinha grande.
            </p>
            <p>
              Pão macio, carne prensada no ponto, molho da casa e ingrediente escolhido a
              dedo. Continua sendo podrão — só que com capricho. Chic, mas sem frescura.
            </p>
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-4">
            {[
              { valor: "+8", label: "anos na esquina" },
              { valor: siteConfig.avaliacao.nota, label: `nota ${siteConfig.avaliacao.fonte}` },
              { valor: "26", label: "itens no cardápio" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-asfalto-2 p-4">
                <dt className="font-display text-3xl text-mostarda">{stat.valor}</dt>
                <dd className="mt-1 text-[11px] uppercase tracking-wider text-fumaca">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="space-y-4">
          {pilares.map(({ Icone, titulo, texto }) => (
            <li
              key={titulo}
              className="flex gap-4 rounded-3xl border border-border bg-asfalto-2 p-6 transition-colors hover:border-mostarda/40"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mostarda/15 text-mostarda">
                <Icone className="size-6" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-2xl text-creme">{titulo}</h3>
                <p className="mt-1 text-sm text-fumaca">{texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
