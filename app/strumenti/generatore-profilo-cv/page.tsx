import { ProfileGenerator } from "@/components/seo-tools";
import { ToolShell } from "@/components/tool-shell";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Generatore profilo CV gratuito",
  "Crea una bozza di profilo professionale per il CV in base a ruolo, settore, esperienza e tono.",
  "/strumenti/generatore-profilo-cv",
);

export default function Page() {
  return (
    <ToolShell
      eyebrow="Crea"
      title="Generatore profilo CV"
      intro="Ottieni una base breve e credibile, poi completala con specializzazione, strumenti e risultati che appartengono davvero al tuo percorso."
    >
      <ProfileGenerator />
    </ToolShell>
  );
}
