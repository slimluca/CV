import { EmailGenerator } from "@/components/generators";
import { ToolShell } from "@/components/tool-shell";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata("Generatore email di candidatura", "Genera oggetto e corpo per invio CV, candidatura spontanea, follow-up e ringraziamento.", "/strumenti/email-candidatura");
export default function Page() { return <ToolShell eyebrow="Invia" title="Email di candidatura" intro="Scrivi un’email concisa e professionale per accompagnare il CV o seguire una selezione."><EmailGenerator /></ToolShell>; }
