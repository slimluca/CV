import { SkillsGenerator } from "@/components/seo-tools";
import { ToolShell } from "@/components/tool-shell";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Competenze CV per ruolo",
  "Trova competenze tecniche, trasversali e digitali da valutare per il tuo ruolo e livello di esperienza.",
  "/strumenti/competenze-cv",
);

export default function Page() {
  return (
    <ToolShell
      eyebrow="Crea"
      title="Competenze per il CV"
      intro="Parti dal ruolo per costruire una lista ragionata. Inserisci nel curriculum solo le competenze che possiedi e puoi collegare a esempi reali."
    >
      <SkillsGenerator />
    </ToolShell>
  );
}
