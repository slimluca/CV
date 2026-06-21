import { TemplateQuiz } from "@/components/checklist-quiz";
import { ToolShell } from "@/components/tool-shell";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Quiz: quale modello CV scegliere",
  "Rispondi a tre domande e trova una struttura CV coerente con esperienza, contesto e priorità.",
  "/strumenti/quiz-modello-cv",
);
export default function Page() {
  return (
    <ToolShell
      eyebrow="Crea"
      title="Quale modello CV fa per te?"
      intro="Un orientamento rapido tra undici strutture, senza pretendere che un solo formato sia giusto per tutti."
    >
      <TemplateQuiz />
    </ToolShell>
  );
}
