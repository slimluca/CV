import { JobMatcher } from "@/components/job-matcher";
import { ToolShell } from "@/components/tool-shell";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata("Confronta CV e annuncio di lavoro", "Confronta in modo deterministico parole chiave e competenze tra il CV e un annuncio.", "/strumenti/confronta-cv-annuncio");
export default function Page() { return <ToolShell eyebrow="Adatta" title="Confronta CV e annuncio" intro="Scopri quali parole importanti dell’annuncio sono già nel CV e quali competenze dovresti valutare, senza inventare esperienze."><JobMatcher /></ToolShell>; }
