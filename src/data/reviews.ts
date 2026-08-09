// PLACEHOLDERS: os depoimentos abaixo NÃO são reais.
// SUBSTITUIR pelos textos reais das avaliações do iFood/Google antes de publicar.
// Cada objeto está marcado com isPlaceholder: true.
// Regra: nunca exibir avaliação negativa nem nota do Google.

export interface Review {
  id: string;
  autor: string;
  texto: string;
  /** true = texto genérico de exemplo, precisa ser substituído */
  isPlaceholder: boolean;
}

export const reviews: Review[] = [
  {
    id: "rv-1",
    autor: "Cliente do iFood",
    texto: "Comida boa e bem servida. Chegou quentinha.",
    isPlaceholder: true,
  },
  {
    id: "rv-2",
    autor: "Cliente do iFood",
    texto: "O açaí é cremoso de verdade. Vale o preço.",
    isPlaceholder: true,
  },
  {
    id: "rv-3",
    autor: "Cliente do iFood",
    texto: "Cachorro-quente caprichado e atendimento rápido.",
    isPlaceholder: true,
  },
];
