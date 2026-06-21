import Link from "next/link";
import { Button, Card, FAQ, JsonLd, PageCTA } from "@/components/ui";
import { templates, tools } from "@/data/content";
import { pageMetadata, siteUrl } from "@/lib/site";

export const metadata = pageMetadata(
  "Crea CV online e controlla ATS",
  "Crea un CV italiano moderno, controlla la compatibilità ATS e prepara una candidatura più forte.",
  "/",
);

const faqs = [
  {
    question: "Posso creare il CV senza registrarmi?",
    answer:
      "Sì. In questa prima versione il builder funziona senza account e salva i dati localmente nel browser del dispositivo che stai usando.",
  },
  {
    question: "Il controllo ATS garantisce che il CV venga selezionato?",
    answer:
      "No. Verifica struttura, completezza e presenza di elementi utili, ma non può prevedere le decisioni di un recruiter o le regole di ogni software.",
  },
  {
    question: "Il PDF è davvero gratuito?",
    answer:
      "Sì. Puoi compilare il CV e scaricare una versione PDF pulita senza pagamento nella prima fase del servizio.",
  },
  {
    question: "I testi generati sono pronti da inviare?",
    answer:
      "Sono bozze da personalizzare. Controlla sempre tono, nomi, fatti e coerenza con la tua esperienza prima dell’invio.",
  },
];

function ProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[620px]">
      <div className="absolute -inset-3 -z-10 rounded-[32px] bg-[#dfece3]/65 blur-2xl" />
      <div className="overflow-hidden rounded-[26px] border border-[#cedbd2] bg-white shadow-[0_28px_80px_rgba(18,43,54,.16)]">
        <div className="flex items-center justify-between border-b border-[#e2e7e3] bg-[#f7f8f4] px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#176b4d]" />
            <span className="text-xs font-black">Area candidatura</span>
          </div>
          <span className="rounded-full bg-[#e4f0e8] px-3 py-1 text-[10px] font-black text-[#176b4d]">
            Esempio compilato
          </span>
        </div>
        <div className="grid gap-3 p-3 sm:grid-cols-[1.15fr_.85fr] sm:p-4">
          <div className="rounded-2xl border border-[#dce4de] bg-[#fbfcfa] p-3 sm:p-4">
            <div className="flex items-center justify-between gap-3 border-b border-[#dde5df] pb-3">
              <div>
                <p className="text-sm font-black">Laura Moretti</p>
                <p className="text-[10px] font-bold text-[#176b4d]">
                  Addetta vendite
                </p>
              </div>
              <span className="grid size-9 place-items-center rounded-full bg-[#e5efe8] text-[10px] font-black text-[#176b4d]">
                LM
              </span>
            </div>
            <PreviewBlock
              title="Profilo"
              lines={[
                "Assistenza al cliente e vendita",
                "Gestione cassa e riassortimento",
              ]}
            />
            <PreviewBlock
              title="Esperienza"
              lines={["Addetta vendite · Milano", "Retail e servizio clienti"]}
            />
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["Vendita", "Cassa", "Inglese"].map((item) => (
                <span
                  className="rounded-md bg-[#e9f0eb] px-2 py-1 text-[9px] font-bold"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid content-start gap-3">
            <div className="rounded-2xl border border-[#dce4de] p-4">
              <p className="text-[10px] font-black uppercase tracking-[.12em] text-[#65736f]">
                Builder CV
              </p>
              <p className="mt-1 text-sm font-black">Dati essenziali</p>
              <div className="mt-3 grid gap-2">
                {["Profilo professionale", "Esperienza", "Competenze"].map(
                  (item) => (
                    <div
                      className="flex items-center gap-2 text-[10px] font-bold text-[#52615d]"
                      key={item}
                    >
                      <span className="grid size-4 place-items-center rounded-full bg-[#176b4d] text-[8px] text-white">
                        ✓
                      </span>
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
            <StatusCard
              label="Controllo ATS"
              status="Struttura da verificare"
            />
            <StatusCard
              label="Match annuncio"
              status="Requisiti da confrontare"
            />
            <div className="rounded-2xl bg-[#122b36] p-4 text-white">
              <p className="text-[10px] font-black uppercase tracking-[.12em] text-[#8ed1ad]">
                Pacchetto candidatura
              </p>
              <p className="mt-2 text-sm font-black">CV, lettera ed email</p>
              <p className="mt-1 text-[10px] leading-4 text-[#cbd7d7]">
                Testi da personalizzare prima dell’invio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewBlock({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="mt-4">
      <p className="text-[9px] font-black uppercase tracking-[.14em] text-[#176b4d]">
        {title}
      </p>
      <div className="mt-2 grid gap-1.5">
        {lines.map((line) => (
          <p className="text-[10px] font-medium text-[#52615d]" key={line}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function StatusCard({ label, status }: { label: string; status: string }) {
  return (
    <div className="rounded-2xl border border-[#dce4de] bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-black">{label}</p>
        <span className="size-2 rounded-full bg-[#d79a3b]" />
      </div>
      <p className="mt-2 text-[10px] leading-4 text-[#65736f]">{status}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "creailcv.it",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: siteUrl,
          offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          description:
            "Builder CV e strumenti di supporto alla candidatura in italiano.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <section className="container-site grid items-center gap-12 py-12 sm:py-16 lg:min-h-[650px] lg:grid-cols-[.9fr_1.1fr] lg:py-14">
        <div>
          <p className="eyebrow">Crea · Controlla · Adatta · Invia</p>
          <h1 className="hero-title mt-5 max-w-[680px]">
            Crea un CV professionale in italiano, pronto per candidature e ATS
          </h1>
          <p className="lead mt-6 max-w-xl">
            Compila il tuo curriculum, controlla la compatibilità ATS, adattalo
            all’annuncio e genera lettera ed email di candidatura in pochi
            passaggi chiari.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/crea-cv">Crea il tuo CV gratis</Button>
            <Button href="/strumenti/controllo-cv-ats" variant="secondary">
              Controlla il CV per ATS
            </Button>
          </div>
          <div className="mt-7 grid gap-2 text-sm font-bold text-[#52615d] sm:grid-cols-2">
            <span>✓ Senza registrazione obbligatoria</span>
            <span>✓ Dati salvati nel tuo browser</span>
            <span>✓ PDF scaricabile</span>
            <span>✓ Suggerimenti pratici, non garanzie</span>
          </div>
        </div>
        <ProductPreview />
      </section>
      <section className="border-y border-[#dfe5df] bg-white">
        <div className="container-site grid grid-cols-2 divide-x divide-[#e2e6e3] py-5 text-center text-xs font-extrabold uppercase tracking-[.12em] text-[#65736f] md:grid-cols-4">
          <span>Crea</span>
          <span>Controlla</span>
          <span>Adatta</span>
          <span>Invia</span>
        </div>
      </section>
      <section className="section container-site">
        <div className="max-w-3xl">
          <p className="eyebrow">Un percorso completo</p>
          <h2 className="title-lg mt-4">
            Ogni fase della candidatura, senza rumore.
          </h2>
          <p className="lead mt-5">
            Non un insieme di pagine scollegate, ma un flusso pratico:
            costruisci una base solida, controllala, rendila pertinente e
            prepara l’invio.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {[
            [
              "Crea il tuo CV",
              "Organizza profilo, esperienze, formazione e competenze con un’anteprima che si aggiorna mentre scrivi.",
              "/crea-cv",
              "01",
            ],
            [
              "Controlla la compatibilità ATS",
              "Ricevi un riscontro deterministico su sezioni, contatti, lunghezza e leggibilità del testo.",
              "/strumenti/controllo-cv-ats",
              "02",
            ],
            [
              "Adatta il CV all’annuncio",
              "Confronta le parole importanti, riconosci ciò che manca e migliora solo ciò che corrisponde al tuo percorso.",
              "/strumenti/confronta-cv-annuncio",
              "03",
            ],
            [
              "Genera lettera ed email",
              "Parti da una bozza coerente con ruolo e contesto, poi personalizzala prima di inviare.",
              "/strumenti/generatore-lettera-presentazione",
              "04",
            ],
          ].map(([title, text, href, mark]) => (
            <Link
              href={href}
              key={title}
              className="card group p-7 transition hover:-translate-y-1 hover:border-[#acc8b6]"
            >
              <div className="flex items-start justify-between gap-6">
                <span className="grid size-11 place-items-center rounded-xl bg-[#e8f1ec] text-sm font-black text-[#176b4d]">
                  {mark}
                </span>
                <span className="text-xl text-[#176b4d] transition group-hover:translate-x-1">
                  →
                </span>
              </div>
              <h3 className="title-md mt-8">{title}</h3>
              <p className="mt-4 max-w-lg leading-7 text-[#5e6c69]">{text}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="section bg-[#122b36] text-white">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <p className="eyebrow !text-[#8ed1ad]">Strumenti gratuiti</p>
              <h2 className="title-lg mt-4 max-w-2xl">
                Più controllo, prima di premere invia.
              </h2>
            </div>
            <Button href="/strumenti" variant="quiet">
              Vedi tutti gli strumenti
            </Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.slice(1, 7).map((tool) => (
              <Link
                href={tool.href}
                key={tool.title}
                className="rounded-2xl border border-white/10 bg-white/[.06] p-5 transition hover:bg-white/[.1]"
              >
                <p className="text-xs font-black uppercase tracking-[.12em] text-[#8ed1ad]">
                  {tool.group}
                </p>
                <h3 className="mt-3 text-lg font-bold">{tool.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#c8d3d2]">
                  {tool.text}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {tools.slice(7).map((tool) => (
              <Link
                className="rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-[#dce7e4] hover:bg-white/[.08]"
                href={tool.href}
                key={tool.href}
              >
                {tool.title} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section container-site">
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="eyebrow">Modelli CV</p>
            <h2 className="title-lg mt-4">
              Il formato giusto serve i contenuti.
            </h2>
            <p className="lead mt-5">
              Scegli una struttura coerente con esperienza, settore e
              candidatura. Nessun effetto grafico dovrebbe ostacolare la
              lettura.
            </p>
            <Button
              href="/modelli-curriculum-vitae"
              variant="secondary"
              className="mt-7"
            >
              Confronta i modelli
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template, index) => (
              <Card className="p-5" key={template.name}>
                <div
                  className={`h-32 rounded-xl border border-[#dce3de] p-4 ${index === 1 ? "bg-[#122b36]" : "bg-white"}`}
                >
                  <div
                    className={`h-2 w-24 rounded ${index === 1 ? "bg-white" : "bg-[#1f373d]"}`}
                  />
                  <div
                    className={`mt-4 h-1.5 rounded ${index === 1 ? "bg-white/25" : "bg-[#d6ddda]"}`}
                  />
                  <div
                    className={`mt-2 h-1.5 w-4/5 rounded ${index === 1 ? "bg-white/25" : "bg-[#d6ddda]"}`}
                  />
                </div>
                <p className="mt-4 text-xs font-black uppercase tracking-[.1em] text-[#176b4d]">
                  {template.tone}
                </p>
                <h3 className="mt-2 font-bold">{template.name}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="section-sm border-y border-[#dfe5df] bg-white">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Per il tuo percorso</p>
              <h2 className="title-md mt-3">
                Guide concrete per ruolo e situazione
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#5e6c69]">
              Esempi e parole chiave sono un orientamento: usa solo competenze
              ed esperienze che possiedi realmente.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              ["CV senza esperienza", "/cv-senza-esperienza"],
              ["CV studente", "/cv-studente"],
              ["CV commessa", "/cv-commessa"],
              ["CV cameriere", "/cv-cameriere"],
              ["CV operaio", "/cv-operaio"],
              ["CV magazziniere", "/cv-magazziniere"],
              ["CV barista", "/cv-barista"],
              ["CV infermiere", "/cv-infermiere"],
              ["CV OSS", "/cv-oss"],
              ["CV neolaureato", "/cv-neolaureato"],
              ["CV per stage", "/cv-stage"],
              ["Cambio lavoro", "/cv-cambio-lavoro"],
            ].map(([label, href]) => (
              <Link
                className="rounded-xl border border-[#d8dfda] bg-[#f8f7f2] px-4 py-3 text-sm font-bold hover:border-[#176b4d] hover:text-[#176b4d]"
                href={href}
                key={href}
              >
                {label} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section container-site">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Fiducia e privacy</p>
            <h2 className="title-lg mt-4">I tuoi dati, sul tuo dispositivo.</h2>
            <p className="lead mt-5">
              In questa fase puoi creare senza registrazione. I dati del builder
              sono elaborati e salvati localmente nel browser, non in un
              archivio account.
            </p>
            <Link
              className="mt-6 inline-block font-bold text-[#176b4d] underline decoration-[#a9c9b5] underline-offset-4"
              href="/privacy"
            >
              Leggi l’informativa privacy
            </Link>
          </div>
          <Card className="grid gap-5 p-7">
            <div>
              <strong>Niente promesse nascoste</strong>
              <p className="mt-2 text-sm leading-6 text-[#5e6c69]">
                Il controllo ATS offre indicazioni, non garantisce colloqui o
                assunzioni.
              </p>
            </div>
            <div className="border-t border-[#e1e6e2] pt-5">
              <strong>Testi sotto il tuo controllo</strong>
              <p className="mt-2 text-sm leading-6 text-[#5e6c69]">
                Lettere ed email sono bozze: rileggile, verifica i fatti e
                rendile tue.
              </p>
            </div>
            <div className="border-t border-[#e1e6e2] pt-5">
              <strong>Accesso immediato</strong>
              <p className="mt-2 text-sm leading-6 text-[#5e6c69]">
                Il builder non richiede account nella prima versione.
              </p>
            </div>
          </Card>
        </div>
      </section>
      <section className="section-sm container-site">
        <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <p className="eyebrow">Domande frequenti</p>
            <h2 className="title-md mt-4">Prima di iniziare</h2>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>
      <PageCTA />
    </>
  );
}
