import { useState } from "react";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/common/EmptyState";
import { FoodImage } from "@/components/common/FoodImage";
import { useCart } from "@/hooks/useCart";
import { formatarPreco } from "@/lib/format";
import { orderService } from "@/lib/orderService";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";

export function CartSheet() {
  const {
    items,
    itemCount,
    total,
    cestaAberta,
    fecharCesta,
    incrementQty,
    decrementQty,
    removeItem,
    setObservacao,
    clearCart,
  } = useCart();

  const [nome, setNome] = useState("");
  const [modalidade, setModalidade] = useState<"Retirada" | "Entrega">("Retirada");
  const [endereco, setEndereco] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [tocado, setTocado] = useState(false);

  const nomeInvalido = nome.trim().length < 2;
  const bloqueado = itemCount === 0 || nomeInvalido;

  const enviar = async () => {
    setTocado(true);
    if (bloqueado) return;
    setEnviando(true);
    const resultado = await orderService.enviar({
      nomeCliente: nome.trim(),
      modalidade,
      endereco,
      itens: items.map((i) => ({
        nome: i.nome,
        quantidade: i.quantidade,
        precoUnitario: i.preco,
        observacao: i.observacao,
      })),
      subtotal: total,
    });
    setEnviando(false);
    if (resultado.ok) {
      toast.success("Pedido enviado para o WhatsApp");
    } else {
      toast.error("Não conseguimos abrir o WhatsApp", {
        description: `Chame no ${siteConfig.whatsapp.numeroExibicao}`,
      });
    }
  };

  return (
    <Sheet open={cestaAberta} onOpenChange={(aberto) => !aberto && fecharCesta()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col border-border bg-asfalto p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border px-4 py-4 text-left">
          <SheetTitle className="font-display text-2xl text-creme">Seu pedido</SheetTitle>
          <SheetDescription className="text-sm text-fumaca">
            Confira os itens e envie pelo WhatsApp.
          </SheetDescription>
        </SheetHeader>

        {itemCount === 0 ? (
          <div className="flex flex-1 items-center px-4">
            <EmptyState
              variante="cesta"
              titulo="Cesta vazia"
              descricao="Escolha um podrão, um dog ou um açaí e volte aqui."
              acaoLabel="Ver cardápio"
              onAcao={() => {
                fecharCesta();
                document.getElementById("cardapio")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <ul className="space-y-4 px-4 py-4">
                {items.map((item) => (
                  <li key={item.id} className="rounded-3xl border border-border bg-asfalto-2 p-3">
                    <div className="flex gap-3">
                      <FoodImage
                        src={item.image}
                        alt={item.nome}
                        tipo={item.categoria}
                        className="size-16 shrink-0 rounded-2xl"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-creme">{item.nome}</p>
                        <p className="text-xs text-fumaca">
                          {formatarPreco(item.preco)} a unidade
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => decrementQty(item.id)}
                            aria-label={`Diminuir quantidade de ${item.nome}`}
                            className="foco-mostarda grid size-11 place-items-center rounded-full border border-border text-creme active:scale-[0.97]"
                          >
                            <Minus className="size-4" />
                          </button>
                          <span aria-live="polite" className="w-6 text-center text-sm font-bold text-creme">
                            {item.quantidade}
                          </span>
                          <button
                            type="button"
                            onClick={() => incrementQty(item.id)}
                            aria-label={`Aumentar quantidade de ${item.nome}`}
                            className="foco-mostarda grid size-11 place-items-center rounded-full border border-border text-creme active:scale-[0.97]"
                          >
                            <Plus className="size-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remover ${item.nome} do pedido`}
                            className="foco-mostarda ml-auto grid size-11 place-items-center rounded-full text-fumaca transition-colors hover:text-brasa active:scale-[0.97]"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <Input
                      value={item.observacao ?? ""}
                      onChange={(e) => setObservacao(item.id, e.target.value)}
                      placeholder="Observação: sem cebola, capricha no cheddar"
                      aria-label={`Observação para ${item.nome}`}
                      className="mt-3 h-11 rounded-full border-border bg-asfalto text-sm text-creme placeholder:text-fumaca/70"
                    />
                  </li>
                ))}
              </ul>
            </ScrollArea>

            <div className="space-y-3 border-t border-border px-4 py-4">
              <div>
                <label htmlFor="cliente-nome" className="text-xs font-semibold uppercase tracking-wider text-fumaca">
                  Seu nome
                </label>
                <Input
                  id="cliente-nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  onBlur={() => setTocado(true)}
                  aria-invalid={tocado && nomeInvalido}
                  placeholder="Como te chamamos?"
                  className="mt-1 h-11 rounded-full border-border bg-asfalto-2 text-creme"
                />
                {tocado && nomeInvalido && (
                  <p className="mt-1 text-xs text-brasa">Informe seu nome para enviar o pedido.</p>
                )}
              </div>

              <div>
                <label htmlFor="modalidade" className="text-xs font-semibold uppercase tracking-wider text-fumaca">
                  Modalidade
                </label>
                <select
                  id="modalidade"
                  value={modalidade}
                  onChange={(e) => setModalidade(e.target.value as "Retirada" | "Entrega")}
                  className="foco-mostarda mt-1 h-11 w-full rounded-full border border-border bg-asfalto-2 px-4 text-sm text-creme"
                >
                  <option value="Retirada">Retirada no local</option>
                  <option value="Entrega">Entrega</option>
                </select>
              </div>

              {modalidade === "Entrega" && (
                <div>
                  <label htmlFor="endereco" className="text-xs font-semibold uppercase tracking-wider text-fumaca">
                    Endereço de entrega
                  </label>
                  <Textarea
                    id="endereco"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    placeholder="Rua, número, complemento e ponto de referência"
                    className="mt-1 rounded-2xl border-border bg-asfalto-2 text-creme"
                  />
                </div>
              )}

              <Separator className="bg-border" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-fumaca">Subtotal</span>
                <span className="font-display text-2xl text-mostarda">{formatarPreco(total)}</span>
              </div>
              <p className="text-xs text-fumaca">
                Taxa de entrega e disponibilidade são confirmadas no WhatsApp.
              </p>

              <button
                type="button"
                onClick={enviar}
                disabled={bloqueado || enviando}
                aria-busy={enviando}
                className={cn(
                  "foco-mostarda flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-mostarda text-sm font-bold uppercase tracking-wide text-asfalto shadow-quente transition-transform active:scale-[0.97]",
                  (bloqueado || enviando) && "cursor-not-allowed bg-muted text-fumaca shadow-none",
                )}
              >
                {enviando && <Loader2 className="size-4 animate-spin" />}
                Enviar pedido no WhatsApp
              </button>
              <button
                type="button"
                onClick={clearCart}
                className="foco-mostarda w-full rounded-full py-2 text-xs font-semibold uppercase tracking-wider text-fumaca transition-colors hover:text-brasa"
              >
                Limpar cesta
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
