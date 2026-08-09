// ATENÇÃO: nomes, descrições e preços abaixo são SUGESTÕES INICIAIS editáveis.
// Substitua pelos itens e valores reais do Podrão Chic antes de publicar.
//
// SUBSTITUIR pelas fotos reais do Podrão Chic. Enquanto isso, placeholders são exibidos.
// (deixe `image` vazio/ausente para exibir o placeholder gerado em CSS/SVG)

export type Category =
  | "podroes"
  | "cachorro-quente"
  | "hamburgueres"
  | "porcoes"
  | "acai"
  | "bebidas"
  | "sobremesas";

export interface MenuItem {
  id: string;
  nome: string;
  descricao: string;
  preco: number; // em reais, ex.: 24.9
  categoria: Category;
  image?: string; // vazio => placeholder
  destaque?: boolean;
  disponivel: boolean;
  tags?: string[]; // ex.: ['Serve 2', 'Picante']
}

export const categorias: { id: Category; label: string }[] = [
  { id: "podroes", label: "Podrões" },
  { id: "cachorro-quente", label: "Cachorro-quente" },
  { id: "hamburgueres", label: "Hambúrgueres" },
  { id: "porcoes", label: "Porções" },
  { id: "acai", label: "Açaí" },
  { id: "bebidas", label: "Bebidas" },
  { id: "sobremesas", label: "Sobremesas" },
];

export const menu: MenuItem[] = [
  // ---------- PODRÕES ----------
  {
    id: "pod-chic",
    nome: "Podrão Chic",
    descricao: "Burger, salsicha, bacon, cheddar, ovo, milho, batata palha e maionese da casa.",
    preco: 28.9,
    categoria: "podroes",
    destaque: true,
    disponivel: true,
    tags: ["Serve 2"],
  },
  {
    id: "pod-madrugada",
    nome: "Podrão da Madrugada",
    descricao: "Dois hambúrgueres, presunto, muçarela, ovo e o dobro de batata palha.",
    preco: 32.9,
    categoria: "podroes",
    destaque: true,
    disponivel: true,
    tags: ["Serve 2"],
  },
  {
    id: "pod-chapa",
    nome: "Podrão de Chapa",
    descricao: "Filé de frango na chapa, catupiry, alface, tomate e batata palha.",
    preco: 26.9,
    categoria: "podroes",
    disponivel: true,
  },
  {
    id: "pod-brasa",
    nome: "Podrão na Brasa",
    descricao: "Calabresa acebolada, cheddar, pimenta biquinho e maionese defumada.",
    preco: 27.9,
    categoria: "podroes",
    disponivel: true,
    tags: ["Picante"],
  },
  {
    id: "pod-verde",
    nome: "Podrão Verde",
    descricao: "Burger de grão-de-bico, queijo, salada, milho e maionese de ervas.",
    preco: 25.9,
    categoria: "podroes",
    disponivel: true,
    tags: ["Vegetariano"],
  },

  // ---------- CACHORRO-QUENTE ----------
  {
    id: "hd-simples",
    nome: "Cachorro-Quente Honesto",
    descricao: "Duas salsichas, molho da casa, milho, ervilha e batata palha.",
    preco: 16.9,
    categoria: "cachorro-quente",
    destaque: true,
    disponivel: true,
  },
  {
    id: "hd-cheddar",
    nome: "Dog Chic Cheddar",
    descricao: "Salsicha na chapa, cheddar cremoso, bacon crocante e cebola caramelizada.",
    preco: 21.9,
    categoria: "cachorro-quente",
    destaque: true,
    disponivel: true,
  },
  {
    id: "hd-tudo",
    nome: "Dog Completo do Recreio",
    descricao: "Duas salsichas, purê, queijo, presunto, ovo de quail e vinagrete.",
    preco: 24.9,
    categoria: "cachorro-quente",
    disponivel: true,
  },
  {
    id: "hd-picante",
    nome: "Dog Pimenta na Chapa",
    descricao: "Salsicha, geleia de pimenta, cream cheese e crispy de cebola.",
    preco: 22.9,
    categoria: "cachorro-quente",
    disponivel: true,
    tags: ["Picante"],
  },

  // ---------- HAMBÚRGUERES ----------
  {
    id: "bg-xsalada",
    nome: "X-Salada Honesto",
    descricao: "Burger 120g, queijo, alface, tomate e maionese da casa no pão brioche.",
    preco: 22.9,
    categoria: "hamburgueres",
    destaque: true,
    disponivel: true,
  },
  {
    id: "bg-xtudo",
    nome: "X-Tudo Sem Vergonha",
    descricao: "Dois burgers, bacon, ovo, presunto, queijo, salada e batata palha.",
    preco: 33.9,
    categoria: "hamburgueres",
    destaque: true,
    disponivel: true,
    tags: ["Serve 2"],
  },
  {
    id: "bg-cheddar",
    nome: "Cheddar Bacon Chic",
    descricao: "Burger 150g, cheddar duplo, bacon e cebola na chapa.",
    preco: 29.9,
    categoria: "hamburgueres",
    disponivel: true,
  },
  {
    id: "bg-frango",
    nome: "Crispy de Frango",
    descricao: "Frango empanado, muçarela, alface americana e molho especial.",
    preco: 26.9,
    categoria: "hamburgueres",
    disponivel: true,
  },
  {
    id: "bg-veg",
    nome: "Burger Vegetariano",
    descricao: "Disco de feijão preto e aveia, queijo, rúcula e tomate assado.",
    preco: 25.9,
    categoria: "hamburgueres",
    disponivel: false,
    tags: ["Vegetariano"],
  },

  // ---------- PORÇÕES ----------
  {
    id: "po-fritas-cheddar",
    nome: "Porção de Fritas com Cheddar",
    descricao: "Batata frita crocante com cheddar cremoso e bacon.",
    preco: 27.9,
    categoria: "porcoes",
    destaque: true,
    disponivel: true,
    tags: ["Serve 2"],
  },
  {
    id: "po-fritas",
    nome: "Fritas da Casa",
    descricao: "Batata rústica com sal grosso e alecrim.",
    preco: 19.9,
    categoria: "porcoes",
    disponivel: true,
  },
  {
    id: "po-calabresa",
    nome: "Calabresa Acebolada",
    descricao: "Calabresa fatiada na chapa com cebola e vinagrete.",
    preco: 29.9,
    categoria: "porcoes",
    disponivel: true,
    tags: ["Serve 2"],
  },
  {
    id: "po-frango",
    nome: "Frango a Passarinho",
    descricao: "Frango frito com alho crocante e limão.",
    preco: 32.9,
    categoria: "porcoes",
    disponivel: true,
    tags: ["Serve 2"],
  },

  // ---------- AÇAÍ ----------
  {
    id: "ac-300",
    nome: "Açaí 300ml",
    descricao: "Açaí cremoso batido na hora com dois acompanhamentos.",
    preco: 16.9,
    categoria: "acai",
    disponivel: true,
  },
  {
    id: "ac-500",
    nome: "Açaí 500ml",
    descricao: "Açaí cremoso com três acompanhamentos à sua escolha.",
    preco: 21.9,
    categoria: "acai",
    destaque: true,
    disponivel: true,
  },
  {
    id: "ac-700",
    nome: "Açaí 700ml",
    descricao: "Copo grande com quatro acompanhamentos. Dá pra dividir.",
    preco: 27.9,
    categoria: "acai",
    disponivel: true,
    tags: ["Serve 2"],
  },
  {
    id: "ac-montado",
    nome: "Açaí Montado Chic",
    descricao: "Camadas de açaí, granola, morango, leite ninho e nutella.",
    preco: 32.9,
    categoria: "acai",
    disponivel: true,
  },

  // ---------- BEBIDAS ----------
  {
    id: "be-refri-lata",
    nome: "Refrigerante Lata",
    descricao: "350ml. Consulte os sabores disponíveis.",
    preco: 6.5,
    categoria: "bebidas",
    disponivel: true,
  },
  {
    id: "be-refri-2l",
    nome: "Refrigerante 2 Litros",
    descricao: "Para dividir na mesa.",
    preco: 14.9,
    categoria: "bebidas",
    disponivel: true,
    tags: ["Serve 2"],
  },
  {
    id: "be-suco",
    nome: "Suco Natural 500ml",
    descricao: "Laranja, maracujá ou limão batidos na hora.",
    preco: 12.9,
    categoria: "bebidas",
    disponivel: true,
  },
  {
    id: "be-agua",
    nome: "Água Mineral 500ml",
    descricao: "Com ou sem gás.",
    preco: 4.5,
    categoria: "bebidas",
    disponivel: true,
  },

  // ---------- SOBREMESAS ----------
  {
    id: "so-brownie",
    nome: "Brownie na Chapa",
    descricao: "Brownie quente com sorvete de creme e calda de chocolate.",
    preco: 18.9,
    categoria: "sobremesas",
    disponivel: true,
  },
  {
    id: "so-banana",
    nome: "Banana Chic",
    descricao: "Banana na chapa com canela, doce de leite e paçoca.",
    preco: 15.9,
    categoria: "sobremesas",
    disponivel: true,
  },
];

/** Acompanhamentos de açaí — editável. */
export const acompanhamentosAcai = [
  "Granola",
  "Leite ninho",
  "Banana",
  "Morango",
  "Paçoca",
  "Leite condensado",
  "Nutella",
];

export const tamanhosAcaiIds = ["ac-300", "ac-500", "ac-700", "ac-montado"];
