/** Formatação de valores — sempre pt-BR / BRL. */
const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatarPreco(valor: number): string {
  return brl.format(valor);
}

export function formatarHora(hora: string): string {
  return hora.replace(":", "h").replace("h00", "h");
}
