import { useEffect, useState } from "react";
import { siteConfig, type HorarioDia } from "@/data/siteConfig";

function minutos(hhmm: string): number {
  const partes = hhmm.split(":").map(Number);
  return (partes[0] ?? 0) * 60 + (partes[1] ?? 0);
}

export function estaAberto(agora: Date, horarios: readonly HorarioDia[]): boolean {
  const minAgora = agora.getHours() * 60 + agora.getMinutes();
  const hoje = horarios.find((h) => h.dia === agora.getDay());
  const ontem = horarios.find((h) => h.dia === (agora.getDay() + 6) % 7);

  if (hoje && !hoje.fechado) {
    const abre = minutos(hoje.abre);
    const fecha = minutos(hoje.fecha);
    if (fecha > abre && minAgora >= abre && minAgora < fecha) return true;
    if (fecha <= abre && minAgora >= abre) return true; // vira o dia
  }
  if (ontem && !ontem.fechado) {
    const abre = minutos(ontem.abre);
    const fecha = minutos(ontem.fecha);
    if (fecha <= abre && minAgora < fecha) return true; // madrugada de ontem
  }
  return false;
}

/** Calcula se a loja está aberta agora, atualizando a cada minuto. */
export function useIsOpenNow() {
  const [aberto, setAberto] = useState(false);
  const [hoje, setHoje] = useState<number | null>(null);

  useEffect(() => {
    const atualizar = () => {
      const agora = new Date();
      setAberto(estaAberto(agora, siteConfig.horarios));
      setHoje(agora.getDay());
    };
    atualizar();
    const id = window.setInterval(atualizar, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return { aberto, diaAtual: hoje, fechaEm: siteConfig.horarios[0]?.fecha ?? "02:00" };
}
