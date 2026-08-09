// SUBSTITUIR pelas fotos reais do Podrão Chic. Enquanto isso, placeholders são exibidos.
// Se `src` estiver vazio, o componente FoodImage renderiza um placeholder em CSS/SVG.

export interface GalleryItem {
  id: string;
  src?: string;
  alt: string;
  /** tipo do placeholder exibido quando não há foto */
  tipo: "burger" | "dog" | "acai" | "porcao";
  /** classes de altura/área no grid bento */
  area: string;
}

export const gallery: GalleryItem[] = [
  {
    id: "g1",
    alt: "Hambúrguer artesanal montado na chapa (imagem ilustrativa)",
    tipo: "burger",
    area: "sm:col-span-2 sm:row-span-2 h-64 sm:h-full",
  },
  {
    id: "g2",
    alt: "Cachorro-quente completo com batata palha (imagem ilustrativa)",
    tipo: "dog",
    area: "h-40 sm:h-48",
  },
  {
    id: "g3",
    alt: "Copo de açaí cremoso com granola e morango (imagem ilustrativa)",
    tipo: "acai",
    area: "h-40 sm:h-48",
  },
  {
    id: "g4",
    alt: "Porção de fritas com cheddar e bacon (imagem ilustrativa)",
    tipo: "porcao",
    area: "h-40 sm:h-56",
  },
  {
    id: "g5",
    alt: "Podrão gigante com todos os recheios (imagem ilustrativa)",
    tipo: "burger",
    area: "h-40 sm:h-56",
  },
  {
    id: "g6",
    alt: "Chapa quente com hambúrgueres e calabresa (imagem ilustrativa)",
    tipo: "porcao",
    area: "sm:col-span-2 h-40 sm:h-48",
  },
];
