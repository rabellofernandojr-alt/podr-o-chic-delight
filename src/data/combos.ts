// ATENÇÃO: nomes, descrições e preços abaixo são SUGESTÕES INICIAIS editáveis.
// Substitua pelos itens e valores reais do Podrão Chic antes de publicar.

export interface Combo {
  id: string;
  nome: string;
  descricao: string;
  itens: string[];
  precoAntigo: number;
  preco: number;
  /** quando presente exibe a tag "Só hoje" */
  validade?: string;
  destaque?: boolean;
  image?: string;
}

export const combos: Combo[] = [
  {
    id: "cb-dupla",
    nome: "Combo Resolve a Fome",
    descricao: "Combo que resolve a fome e o bolso.",
    itens: [
      "1 Podrão Chic",
      "1 Porção de fritas com cheddar",
      "2 Refrigerantes lata",
    ],
    precoAntigo: 63.3,
    preco: 52.9,
    destaque: true,
    validade: "hoje",
  },
  {
    id: "cb-dog",
    nome: "Combo Dog Duplo",
    descricao: "Dois dogs e refri gelado para dividir.",
    itens: ["2 Dog Chic Cheddar", "1 Refrigerante 2 litros"],
    precoAntigo: 58.7,
    preco: 47.9,
  },
  {
    id: "cb-acai",
    nome: "Combo Açaí da Praia",
    descricao: "Açaí cremoso para dois, com acompanhamentos.",
    itens: ["2 Açaí 500ml", "Acompanhamentos livres"],
    precoAntigo: 43.8,
    preco: 36.9,
  },
  {
    id: "cb-madrugada",
    nome: "Combo Madrugada",
    descricao: "Para quem sai tarde e chega com fome.",
    itens: ["1 Podrão da Madrugada", "1 Fritas da casa", "1 Suco natural"],
    precoAntigo: 65.7,
    preco: 54.9,
  },
];
