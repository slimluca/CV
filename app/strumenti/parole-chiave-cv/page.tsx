import { KeywordGenerator } from "@/components/seo-tools";
import { ToolShell } from "@/components/tool-shell";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Parole chiave CV da un annuncio",
  "Analizza un annuncio, individua parole rilevanti e confrontale con il CV senza keyword stuffing.",
  "/strumenti/parole-chiave-cv",
);

export default function Page() {
  return (
    <ToolShell
      eyebrow="Adatta"
      title="Parole chiave per il CV"
      intro="Leggi il linguaggio dell’annuncio e verifica quali termini pertinenti compaiono già nel CV. La corrispondenza lessicale non misura la tua idoneità al ruolo."
    >
      <KeywordGenerator />
    </ToolShell>
  );
}
