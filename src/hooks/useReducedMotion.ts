import { useEffect, useState } from "react";

/** Respeita prefers-reduced-motion (SSR-safe). */
export function useReducedMotion(): boolean {
  const [reduzido, setReduzido] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduzido(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduzido(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduzido;
}
