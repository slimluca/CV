import { AtsChecker } from "@/components/ats-checker";
import { ToolShell } from "@/components/tool-shell";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata("Controllo CV ATS gratuito", "Incolla il CV e controlla sezioni, contatti, lunghezza, parole ricorrenti e leggibilità ATS.", "/strumenti/controllo-cv-ats");
export default function Page() { return <ToolShell eyebrow="Controlla" title="Controllo CV ATS" intro="Analizza la struttura testuale del CV e individua correzioni pratiche prima della candidatura."><AtsChecker /></ToolShell>; }
