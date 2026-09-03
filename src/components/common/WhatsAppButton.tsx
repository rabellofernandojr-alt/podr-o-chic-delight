import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { linkWhatsApp, mensagemRapida } from "@/lib/whatsapp";
import { toast } from "sonner";
import { siteConfig } from "@/data/siteConfig";

interface WhatsAppButtonProps {
  label?: string;
  contexto?: "geral" | "acai";
  className?: string;
  children?: React.ReactNode;
}

/** Link direto para o WhatsApp com mensagem pré-preenchida. */
export function WhatsAppButton({
  label = "Pedir agora",
  contexto = "geral",
  className,
  children,
}: WhatsAppButtonProps) {
  return (
    <a
      href={linkWhatsApp(mensagemRapida(contexto))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} pelo WhatsApp`}

      className={cn(
        "foco-mostarda inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-mostarda px-6 font-bold uppercase tracking-wide text-asfalto shadow-quente transition-transform duration-200 hover:scale-[1.02] active:scale-[0.97]",
        className,
      )}
    >
      <MessageCircle className="size-5" />
      {children ?? label}
    </a>
  );
}

/** Botão flutuante de WhatsApp (desktop). */
export function WhatsAppFab() {
  return (
    <a
      href={linkWhatsApp(mensagemRapida())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Pedir pelo WhatsApp ${siteConfig.whatsapp.numeroExibicao}`}
      onClick={() => toast.info("Abrindo o WhatsApp…", { description: siteConfig.whatsapp.numeroExibicao })}
      className="foco-mostarda fixed bottom-6 right-6 z-40 hidden size-14 place-items-center rounded-full bg-mostarda text-asfalto shadow-quente-lg transition-transform hover:scale-105 active:scale-95 lg:grid"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
