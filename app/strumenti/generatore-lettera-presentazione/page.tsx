import { LetterGenerator } from "@/components/generators";
import { ToolShell } from "@/components/tool-shell";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata("Generatore lettera di presentazione", "Crea una bozza italiana di lettera di presentazione da personalizzare per ruolo e azienda.", "/strumenti/generatore-lettera-presentazione");
export default function Page() { return <ToolShell eyebrow="Invia" title="Generatore lettera di presentazione" intro="Prepara una bozza completa in base a ruolo, azienda, esperienza, motivazione e tono."><LetterGenerator /></ToolShell>; }
