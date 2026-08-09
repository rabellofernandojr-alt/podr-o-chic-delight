import { useEffect, useState } from "react";

/** Atrasa a atualização de um valor (usado na busca do cardápio). */
export function useDebounce<T>(valor: T, atraso = 200): T {
  const [debounced, setDebounced] = useState(valor);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(valor), atraso);
    return () => window.clearTimeout(id);
  }, [valor, atraso]);

  return debounced;
}
