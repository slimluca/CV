import { Checklist } from "@/components/checklist-quiz";
import { ToolShell } from "@/components/tool-shell";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata("Checklist CV prima dell’invio", "Completa dieci controlli essenziali su contenuti, formato, privacy e adattamento del CV.", "/strumenti/checklist-cv");
export default function Page() { return <ToolShell eyebrow="Controlla" title="Checklist finale del CV" intro="Spunta i controlli essenziali prima di allegare il PDF e inviare la candidatura."><Checklist /></ToolShell>; }
