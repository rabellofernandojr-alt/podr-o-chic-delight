/**
 * Configuração central do site — Podrão Chic.
 * TODO: confirmar horários reais (só temos confirmado "aberto até 02:00")
 * e inserir o endereço completo (rua/número) quando disponível.
 */

export interface HorarioDia {
  /** 0 = domingo ... 6 = sábado */
  dia: number;
  label: string;
  /** formato HH:MM (24h) */
  abre: string;
  /** formato HH:MM — pode passar da meia-noite (ex.: "02:00") */
  fecha: string;
  fechado?: boolean;
}

export const siteConfig = {
  nome: "Podrão Chic",
  slogan: "O podrão mais chic do Recreio.",
  frase: "Chapa quente, porção generosa e açaí cremoso. Até as 2h da manhã.",

  // Contato — EDITÁVEL
  whatsapp: {
    numeroInternacional: "5521966304028",
    numeroExibicao: "(21) 96630-4028",
  },
  instagram: {
    usuario: "@podraochic",
    url: "https://instagram.com/podraochic",
  },
  facebook: {
    nome: "Podrão Chic",
    url: "https://www.facebook.com/search/top?q=podr%C3%A3o%20chic",
  },

  // Endereço — NÃO inventar rua/número.
  // TODO: inserir logradouro, número e complemento reais aqui.
  endereco: {
    logradouro: "", // ex.: "Av. das Américas, 0000 — loja 00"
    bairro: "Recreio dos Bandeirantes",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    cep: "22790-701",
    pais: "BR",
    resumo: "Recreio dos Bandeirantes, Rio de Janeiro – RJ, CEP 22790-701",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Podr%C3%A3o+Chic+Recreio+dos+Bandeirantes+Rio+de+Janeiro",
    mapsEmbedUrl:
      "https://www.google.com/maps?q=Recreio+dos+Bandeirantes+Rio+de+Janeiro+22790-701&output=embed",
  },

  // Avaliação exibida (apenas iFood — nunca exibir nota do Google)
  avaliacao: {
    nota: "4,9",
    quantidade: 143,
    fonte: "iFood",
  },

  /** Horários — valores padrão EDITÁVEIS, precisam ser confirmados. */
  horarios: [
    { dia: 0, label: "Domingo", abre: "18:00", fecha: "02:00" },
    { dia: 1, label: "Segunda", abre: "18:00", fecha: "02:00" },
    { dia: 2, label: "Terça", abre: "18:00", fecha: "02:00" },
    { dia: 3, label: "Quarta", abre: "18:00", fecha: "02:00" },
    { dia: 4, label: "Quinta", abre: "18:00", fecha: "02:00" },
    { dia: 5, label: "Sexta", abre: "18:00", fecha: "02:00" },
    { dia: 6, label: "Sábado", abre: "18:00", fecha: "02:00" },
  ] as HorarioDia[],

  marquee: "NA CHAPA • ATÉ 2H • RECREIO • AÇAÍ CREMOSO •",

  navegacao: [
    { id: "destaques", label: "Destaques" },
    { id: "cardapio", label: "Cardápio" },
    { id: "combos", label: "Combos" },
    { id: "acai", label: "Açaí" },
    { id: "avaliacoes", label: "Avaliações" },
    { id: "localizacao", label: "Localização" },
  ],
} as const;
