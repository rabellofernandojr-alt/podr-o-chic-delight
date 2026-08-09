import { siteConfig } from "@/data/siteConfig";
import { formatarPreco } from "./format";

export interface ItemPedido {
  nome: string;
  quantidade: number;
  precoUnitario: number;
  observacao?: string;
}

export interface DadosPedido {
  nomeCliente: string;
  modalidade: "Retirada" | "Entrega";
  endereco?: string;
  itens: ItemPedido[];
  subtotal: number;
}

/** Monta a mensagem de pedido no formato padrão da marca. */
export function montarMensagemPedido(pedido: DadosPedido): string {
  const linhas: string[] = [];
  linhas.push("*NOVO PEDIDO — PODRÃO CHIC*");
  linhas.push(`Cliente: ${pedido.nomeCliente}`);
  linhas.push(`Modalidade: ${pedido.modalidade}`);
  if (pedido.modalidade === "Entrega") {
    linhas.push(`Endereço: ${pedido.endereco?.trim() || "a confirmar"}`);
  }
  linhas.push("");
  linhas.push("*Itens:*");
  for (const item of pedido.itens) {
    linhas.push(
      `${item.quantidade}x ${item.nome} — ${formatarPreco(item.precoUnitario * item.quantidade)}`,
    );
    if (item.observacao?.trim()) {
      linhas.push(`  obs: ${item.observacao.trim()}`);
    }
  }
  linhas.push("");
  linhas.push(`*Subtotal:* ${formatarPreco(pedido.subtotal)}`);
  linhas.push("Pedido feito pelo site.");
  return linhas.join("\n");
}

/** Gera o link wa.me com a mensagem codificada. */
export function linkWhatsApp(mensagem: string): string {
  return `https://wa.me/${siteConfig.whatsapp.numeroInternacional}?text=${encodeURIComponent(mensagem)}`;
}

/** Mensagem curta para CTAs diretos (hero, barra fixa, açaí). */
export function mensagemRapida(contexto?: string): string {
  if (contexto === "acai") {
    return "Olá! Quero pedir um açaí no Podrão Chic. Pode me passar os tamanhos e acompanhamentos?";
  }
  return "Olá! Vi o site do Podrão Chic e quero fazer um pedido.";
}

export function abrirWhatsApp(mensagem: string): boolean {
  try {
    const janela = window.open(linkWhatsApp(mensagem), "_blank", "noopener,noreferrer");
    return Boolean(janela);
  } catch {
    return false;
  }
}
