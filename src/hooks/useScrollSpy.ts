import { useEffect, useState } from "react";

/** Observa seções e devolve o id da seção ativa. */
export function useScrollSpy(ids: readonly string[], offset = 120): string {
  const [ativo, setAtivo] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const onScroll = () => {
      let atual = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) atual = id;
      }
      setAtivo(atual);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);

  return ativo;
}
