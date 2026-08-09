import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { MenuItem } from "@/data/menu";

export interface CartItem {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  observacao?: string;
  image?: string;
  categoria: MenuItem["categoria"];
}

type CartAction =
  | { type: "add"; item: MenuItem }
  | { type: "remove"; id: string }
  | { type: "increment"; id: string }
  | { type: "decrement"; id: string }
  | { type: "observacao"; id: string; texto: string }
  | { type: "clear" };

function reducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "add": {
      const existe = state.find((i) => i.id === action.item.id);
      if (existe) {
        return state.map((i) =>
          i.id === action.item.id ? { ...i, quantidade: i.quantidade + 1 } : i,
        );
      }
      return [
        ...state,
        {
          id: action.item.id,
          nome: action.item.nome,
          preco: action.item.preco,
          quantidade: 1,
          image: action.item.image,
          categoria: action.item.categoria,
        },
      ];
    }
    case "remove":
      return state.filter((i) => i.id !== action.id);
    case "increment":
      return state.map((i) => (i.id === action.id ? { ...i, quantidade: i.quantidade + 1 } : i));
    case "decrement":
      return state.flatMap((i) => {
        if (i.id !== action.id) return [i];
        return i.quantidade <= 1 ? [] : [{ ...i, quantidade: i.quantidade - 1 }];
      });
    case "observacao":
      return state.map((i) => (i.id === action.id ? { ...i, observacao: action.texto } : i));
    case "clear":
      return [];
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  incrementQty: (id: string) => void;
  decrementQty: (id: string) => void;
  setObservacao: (id: string, texto: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  cestaAberta: boolean;
  abrirCesta: () => void;
  fecharCesta: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/** Estado do carrinho vive apenas em memória durante a sessão (sem localStorage). */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, [] as CartItem[]);
  const [cestaAberta, setCestaAberta] = useState(false);

  const addItem = useCallback((item: MenuItem) => dispatch({ type: "add", item }), []);
  const removeItem = useCallback((id: string) => dispatch({ type: "remove", id }), []);
  const incrementQty = useCallback((id: string) => dispatch({ type: "increment", id }), []);
  const decrementQty = useCallback((id: string) => dispatch({ type: "decrement", id }), []);
  const setObservacao = useCallback(
    (id: string, texto: string) => dispatch({ type: "observacao", id, texto }),
    [],
  );
  const clearCart = useCallback(() => dispatch({ type: "clear" }), []);

  const value = useMemo<CartContextValue>(() => {
    const total = items.reduce((soma, i) => soma + i.preco * i.quantidade, 0);
    const itemCount = items.reduce((soma, i) => soma + i.quantidade, 0);
    return {
      items,
      addItem,
      removeItem,
      incrementQty,
      decrementQty,
      setObservacao,
      clearCart,
      total,
      itemCount,
      cestaAberta,
      abrirCesta: () => setCestaAberta(true),
      fecharCesta: () => setCestaAberta(false),
    };
  }, [
    items,
    addItem,
    removeItem,
    incrementQty,
    decrementQty,
    setObservacao,
    clearCart,
    cestaAberta,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return ctx;
}
