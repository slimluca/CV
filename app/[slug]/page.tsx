import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import {
  Breadcrumbs,
  Card,
  FAQ,
  JsonLd,
  PageCTA,
  SeoHero,
} from "@/components/ui";
import { basicPages, professionPages, templates } from "@/data/content";
import { pageMetadata, siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return [
    ...Object.keys(basicPages),
    ...Object.keys(professionPages),
    "modelli-curriculum-vitae",
    "contatti",
  ].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profession = professionPages[slug];
  const basic = basicPages[slug];
  if (profession)
    return pageMetadata(
      profession.title,
      `${profession.intro.slice(0, 145)}…`,
      `/${slug}`,
    );
  if (basic) return pageMetadata(basic.title, basic.description, `/${slug}`);
  if (slug === "modelli-curriculum-vitae")
    return pageMetadata(
      "Modelli curriculum vitae: scegli il formato",
      "Confronta cinque modelli CV puliti per ATS, primo lavoro, profili professionali e settori creativi.",
      `/${slug}`,
    );
  if (slug === "contatti")
    return pageMetadata(
      "Contatti",
      "Contatta creailcv.it tramite il tuo programma email.",
      `/${slug}`,
    );
  return {};
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (professionPages[slug]) return <ProfessionPage slug={slug} />;
  if (slug === "modelli-curriculum-vitae") return <TemplatesPage />;
  if (slug === "contatti") return <ContactPage />;
  const page = basicPages[slug];
  if (!page) notFound();
  const primaryHref = page.cta?.toLowerCase().includes("controlla")
    ? "/strumenti/controllo-cv-ats"
    : page.cta?.toLowerCase().includes("lettera")
      ? "/strumenti/generatore-lettera-presentazione"
      : page.cta?.toLowerCase().includes("email")
        ? "/strumenti/email-candidatura"
        : "/crea-cv";
  return (
    <>
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: page.title }]}
      />
      {page.faqs && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }}
        />
      )}
      <SeoHero
        eyebrow={page.eyebrow}
        title={page.title}
        intro={page.intro}
        primaryHref={primaryHref}
        primaryLabel={page.cta ?? "Crea il tuo CV gratis"}
      />
      <section className="container-site pb-16">
        <div className="prose-site grid gap-5 lg:grid-cols-2">
          {page.sections.map((section) => (
            <Card className="p-6 sm:p-8" key={section.title}>
              <h2 className="!mt-0">{section.title}</h2>
              <p className="mt-4">{section.body}</p>
            </Card>
          ))}
        </div>
      </section>
      {page.faqs && (
        <section className="container-site pb-16">
          <div className="grid gap-8 lg:grid-cols-[.6fr_1.4fr]">
            <h2 className="title-md">Domande frequenti</h2>
            <FAQ items={page.faqs} />
          </div>
        </section>
      )}
      <PageCTA href={primaryHref} label={page.cta ?? "Crea il tuo CV gratis"} />
    </>
  );
}

function ProfessionPage({ slug }: { slug: string }) {
  const page = professionPages[slug];
  const url = `${siteUrl}/${slug}`;
  return (
    <>
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: page.title }]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
            { "@type": "ListItem", position: 2, name: page.title, item: url },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <SeoHero
        eyebrow={`CV per ${page.role}`}
        title={page.title}
        intro={page.intro}
      />
      <section className="container-site grid gap-6 pb-16 lg:grid-cols-2">
        <Card className="p-6 sm:p-8">
          <p className="eyebrow">Esempio</p>
          <h2 className="title-md mt-3">Profilo professionale</h2>
          <blockquote className="mt-5 border-l-4 border-[#176b4d] pl-5 leading-7 text-[#4f605b]">
            {page.profile}
          </blockquote>
        </Card>
        <Card className="p-6 sm:p-8">
          <h2 className="title-md">Cosa mettere in evidenza</h2>
          <List items={page.highlights} />
        </Card>
        <Card className="p-6 sm:p-8">
          <h2 className="title-md">Competenze utili</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {page.skills.map((skill) => (
              <span
                className="rounded-lg bg-[#e8f1ec] px-3 py-2 text-sm font-bold text-[#176b4d]"
                key={skill}
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>
        <Card className="p-6 sm:p-8">
          <h2 className="title-md">Parole chiave ATS</h2>
          <p className="mt-4 text-sm leading-6 text-[#5e6c69]">
            Inseriscile solo quando descrivono attività o competenze reali.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {page.keywords.map((word) => (
              <span
                className="rounded-lg border border-[#d8dfda] px-3 py-2 text-sm font-bold"
                key={word}
              >
                {word}
              </span>
            ))}
          </div>
        </Card>
        <Card className="p-6 sm:p-8 lg:col-span-2">
          <h2 className="title-md">Errori da evitare</h2>
          <List items={page.mistakes} />
        </Card>
      </section>
      <section className="container-site grid gap-8 pb-16 lg:grid-cols-[.6fr_1.4fr]">
        <h2 className="title-md">Domande frequenti</h2>
        <FAQ items={page.faqs} />
      </section>
      <PageCTA
        title={`Crea il tuo CV da ${page.role.toLowerCase()}`}
        text="Parti dall’esempio, ma rendi ogni sezione fedele al tuo percorso e alla posizione che stai cercando."
      />
    </>
  );
}

function TemplatesPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Modelli curriculum vitae" },
        ]}
      />
      <SeoHero
        eyebrow="Modelli CV"
        title="Scegli una struttura che faccia leggere bene la tua esperienza."
        intro="Cinque direzioni per esigenze diverse. Il builder esporta un PDF essenziale, testuale e ordinato: una base professionale da adattare ai contenuti e al contesto della candidatura."
        primaryHref="/strumenti/quiz-modello-cv"
        primaryLabel="Fai il quiz del modello"
      />
      <section className="container-site grid gap-5 pb-20 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template, index) => (
          <Card className="overflow-hidden p-5" key={template.name}>
            <div
              className={`aspect-[4/3] rounded-2xl border p-6 ${index === 1 ? "bg-[#122b36]" : index === 4 ? "bg-[#efe5dc]" : "bg-[#fafaf7]"}`}
            >
              <div
                className={`h-3 w-2/5 rounded ${index === 1 ? "bg-white" : "bg-[#18323a]"}`}
              />
              <div
                className={`mt-5 h-2 rounded ${index === 1 ? "bg-white/20" : "bg-[#d6ddda]"}`}
              />
              <div
                className={`mt-2 h-2 w-4/5 rounded ${index === 1 ? "bg-white/20" : "bg-[#d6ddda]"}`}
              />
              <div
                className={`mt-7 h-2 w-1/4 rounded ${index === 1 ? "bg-[#8ed1ad]" : "bg-[#176b4d]"}`}
              />
            </div>
            <p className="eyebrow mt-5">{template.tone}</p>
            <h2 className="mt-2 text-xl font-black">{template.name}</h2>
            <p className="mt-3 text-sm leading-6 text-[#5e6c69]">
              {template.text}
            </p>
            <dl className="mt-4 grid gap-3 text-sm leading-6">
              <div>
                <dt className="font-black">Ideale per</dt>
                <dd className="text-[#5e6c69]">{template.bestFor}</dd>
              </div>
              <div>
                <dt className="font-black">Quando usarlo</dt>
                <dd className="text-[#5e6c69]">{template.when}</dd>
              </div>
              <div>
                <dt className="font-black">Compatibilità ATS</dt>
                <dd className="text-[#5e6c69]">{template.ats}</dd>
              </div>
            </dl>
            <Link
              className="btn btn-secondary mt-5 w-full"
              href={`/crea-cv?template=${template.id}`}
            >
              {template.cta} →
            </Link>
          </Card>
        ))}
      </section>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Contatti" }]}
      />
      <section className="container-site grid gap-10 py-14 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Contatti</p>
          <h1 className="title-lg mt-4">Parliamone con chiarezza.</h1>
          <p className="lead mt-5">
            Segnala un problema, una domanda sul servizio o un suggerimento. Il
            modulo usa il programma email del tuo dispositivo.
          </p>
          <p className="mt-6 text-sm leading-6 text-[#5e6c69]">
            Puoi anche scrivere direttamente a{" "}
            <a
              className="font-bold text-[#176b4d] underline"
              href="mailto:ciao@creailcv.it"
            >
              ciao@creailcv.it
            </a>
            . La consegna richiede che la casella sul dominio sia configurata e
            attiva.
          </p>
        </div>
        <ContactForm />
      </section>
    </>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#5e6c69]">
      {items.map((item) => (
        <li className="flex gap-3" key={item}>
          <span className="text-[#176b4d]">✓</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
