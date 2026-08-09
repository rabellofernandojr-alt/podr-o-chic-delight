import { menu, acompanhamentosAcai, tamanhosAcaiIds } from "@/data/menu";
import { formatarPreco } from "@/lib/format";
import { linkWhatsApp, mensagemRapida } from "@/lib/whatsapp";
import { useCart } from "@/hooks/useCart";
import { MessageCircle, Plus } from "lucide-react";
import { toast } from "sonner";

const opcoes = tamanhosAcaiIds
  .map((id) => menu.find((item) => item.id === id))
  .filter((item): item is NonNullable<typeof item> => Boolean(item));

export function Acai() {
  const { addItem } = useCart();

  return (
    <section
      id="acai"
      aria-labelledby="acai-titulo"
      className="abaixo-da-dobra relative scroll-mt-24 bg-[linear-gradient(180deg,var(--color-acai)_0%,rgba(107,47,160,0.55)_45%,var(--color-asfalto)_100%)] pb-16 pt-20 lg:pb-28 lg:pt-28"
    >
      {/* Transição orgânica de "pingo" na borda superior */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute -top-px left-0 h-[70px] w-full text-asfalto"
      >
        <path
          fill="currentColor"
          d="M0,0 L1440,0 L1440,26 C1180,64 1040,10 880,34 C720,58 640,86 520,62 C400,38 280,4 140,26 C90,34 40,30 0,22 Z"
        />
      </svg>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-dourado">Açaí no Recreio</p>
        <h2 id="acai-titulo" className="mt-3 font-display text-4xl text-creme sm:text-5xl lg:text-6xl">
          Açaí de verdade. <span className="font-chic text-dourado">Cremoso</span>, gelado, sem enrolação.
        </h2>
        <p className="mt-4 max-w-xl text-base text-creme/85">
          Batido na hora, na medida que você quiser, com os acompanhamentos que importam.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {opcoes.map((item) => (
            <article
              key={item.id}
              className="flex flex-col rounded-3xl border border-creme/20 bg-asfalto/40 p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-dourado/60"
            >
              <h3 className="text-base font-semibold text-creme">{item.nome}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-creme/70">{item.descricao}</p>
              <p className="mt-3 font-display text-2xl text-mostarda">{formatarPreco(item.preco)}</p>
              <button
                type="button"
                onClick={() => {
                  addItem(item);
                  toast.success("Adicionado ao pedido", { description: item.nome });
                }}
                aria-label={`Adicionar ${item.nome} ao pedido`}
                className="foco-mostarda mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-creme/30 text-sm font-semibold text-creme transition-colors hover:bg-creme/10 active:scale-[0.97]"
              >
                <Plus className="size-4" />
                Adicionar
              </button>
            </article>
          ))}
        </div>

        <h3 className="mt-12 text-xs font-bold uppercase tracking-[0.2em] text-dourado">
          Acompanhamentos
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {acompanhamentosAcai.map((ac) => (
            <li
              key={ac}
              className="rounded-full border border-creme/25 bg-asfalto/30 px-4 py-2 text-sm text-creme"
            >
              {ac}
            </li>
          ))}
        </ul>

        <a
          href={linkWhatsApp(mensagemRapida("acai"))}
          target="_blank"
          rel="noopener noreferrer"
          className="foco-mostarda mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-creme px-6 font-bold uppercase tracking-wide text-asfalto transition-transform hover:scale-[1.02] active:scale-[0.97]"
        >
          <MessageCircle className="size-5" />
          Pedir açaí no WhatsApp
        </a>
        <p className="mt-6 text-xs text-creme/60">Imagens ilustrativas.</p>
      </div>
    </section>
  );
}
