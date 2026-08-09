import { abrirWhatsApp, montarMensagemPedido, type DadosPedido } from "./whatsapp";

/**
 * Abstração de envio de pedido.
 *
 * Hoje o pedido é apenas montado como texto e aberto no WhatsApp.
 * Para trocar por um sistema real de pedidos (API própria, iFood, PDV etc.):
 *   1. crie uma nova classe implementando `OrderService`;
 *   2. faça `enviar()` chamar a API real e retornar o resultado;
 *   3. troque a instância exportada em `orderService` abaixo.
 * Nenhum componente precisa ser alterado.
 */
export interface OrderService {
  enviar(pedido: DadosPedido): Promise<{ ok: boolean; mensagem: string }>;
}

export class WhatsAppOrderService implements OrderService {
  async enviar(pedido: DadosPedido) {
    const mensagem = montarMensagemPedido(pedido);
    const ok = abrirWhatsApp(mensagem);
    return { ok, mensagem };
  }
}

export const orderService: OrderService = new WhatsAppOrderService();
