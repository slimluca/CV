"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { templates, type CvTemplateId } from "@/data/content";
import {
  analyzeCv,
  calculateCvCompleteness,
  hasMeaningfulCvContent,
} from "@/lib/analysis";

type CvData = {
  name: string;
  surname: string;
  role: string;
  email: string;
  phone: string;
  city: string;
  linkedin: string;
  portfolio: string;
  profile: string;
  experiences: string[];
  education: string[];
  skills: string[];
  languages: string;
  certifications: string;
  courses: string;
  licence: string;
  availability: string;
  privacy: boolean;
};

const empty: CvData = {
  name: "",
  surname: "",
  role: "",
  email: "",
  phone: "",
  city: "",
  linkedin: "",
  portfolio: "",
  profile: "",
  experiences: [""],
  education: [""],
  skills: [""],
  languages: "",
  certifications: "",
  courses: "",
  licence: "",
  availability: "",
  privacy: false,
};

const templateGroups = [
  "Essenziali",
  "Professionali",
  "Settore",
  "Creativi",
] as const;

export function CvBuilder({
  initialTemplate,
}: {
  initialTemplate?: CvTemplateId;
}) {
  const [data, setData] = useState<CvData>(empty);
  const [template, setTemplate] = useState<CvTemplateId>(
    initialTemplate ?? "ats",
  );
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const value = localStorage.getItem("creailcv-data");
        if (value) {
          const stored = { ...empty, ...JSON.parse(value) } as CvData;
          if (!hasMeaningfulCvContent(stored)) stored.privacy = false;
          setData(stored);
        }
        const storedTemplate = localStorage.getItem(
          "creailcv-template",
        ) as CvTemplateId | null;
        if (
          !initialTemplate &&
          templates.some((item) => item.id === storedTemplate)
        )
          setTemplate(storedTemplate!);
      } catch {}
      setReady(true);
    });
  }, [initialTemplate]);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem("creailcv-data", JSON.stringify(data));
      queueMicrotask(() => setSaved(true));
    } catch {
      queueMicrotask(() => setSaved(false));
    }
    const timer = window.setTimeout(() => setSaved(false), 1800);
    return () => window.clearTimeout(timer);
  }, [data, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem("creailcv-template", template);
  }, [ready, template]);
  const completeness = calculateCvCompleteness(data);
  const hasContent = hasMeaningfulCvContent(data);
  const text = cvText(data);
  const ats = analyzeCv(text, { completeness });
  const set = <K extends keyof CvData>(key: K, value: CvData[K]) =>
    setData({ ...data, [key]: value });
  const updateList = (
    key: "experiences" | "education" | "skills",
    index: number,
    value: string,
  ) =>
    set(
      key,
      data[key].map((item, i) => (i === index ? value : item)),
    );
  const add = (key: "experiences" | "education" | "skills") =>
    set(key, [...data[key], ""]);
  const exportPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pdfThemes: Record<
      CvTemplateId,
      {
        accent: [number, number, number];
        font: "helvetica" | "times";
        header: [number, number, number] | null;
        educationFirst?: boolean;
        margin?: number;
        lineHeight?: number;
        sectionGap?: number;
        headerHeight?: number;
      }
    > = {
      ats: { accent: [34, 48, 45], font: "helvetica", header: null },
      moderno: { accent: [23, 107, 77], font: "helvetica", header: null },
      classico: { accent: [88, 70, 55], font: "times", header: null },
      "primo-lavoro": {
        accent: [48, 91, 132],
        font: "helvetica",
        header: null,
        educationFirst: true,
      },
      creativo: {
        accent: [181, 78, 59],
        font: "helvetica",
        header: [18, 43, 54],
      },
      "compatto-una-pagina": {
        accent: [45, 68, 62],
        font: "helvetica",
        header: null,
        margin: 14,
        lineHeight: 3.8,
        sectionGap: 3,
      },
      "executive-premium": {
        accent: [111, 86, 54],
        font: "times",
        header: [31, 40, 48],
        headerHeight: 44,
      },
      "tecnico-ordinato": {
        accent: [42, 79, 112],
        font: "helvetica",
        header: [30, 48, 64],
        headerHeight: 36,
        sectionGap: 5,
      },
      "retail-hospitality": {
        accent: [157, 88, 49],
        font: "helvetica",
        header: [250, 239, 226],
      },
      "sanitario-pulito": {
        accent: [31, 111, 105],
        font: "helvetica",
        header: [226, 242, 239],
      },
      "portfolio-leggero": {
        accent: [111, 62, 129],
        font: "helvetica",
        header: [48, 36, 62],
        headerHeight: 44,
      },
    };
    const theme = pdfThemes[template];
    const margin = theme.margin ?? 18;
    const contentWidth = 210 - margin * 2;
    const lineHeight = theme.lineHeight ?? 4.5;
    const sectionGap = theme.sectionGap ?? 6;
    const lightHeader = theme.header
      ? theme.header[0] + theme.header[1] + theme.header[2] > 520
      : false;
    const headerText: [number, number, number] = lightHeader
      ? [31, 48, 45]
      : [255, 255, 255];
    let y = 20;
    if (theme.header) {
      doc.setFillColor(...theme.header);
      doc.rect(0, 0, 210, theme.headerHeight ?? 39, "F");
      doc.setTextColor(...headerText);
    } else doc.setTextColor(21, 37, 36);
    doc.setFont(theme.font, "bold");
    doc.setFontSize(22);
    doc.text(
      [data.name, data.surname].filter(Boolean).join(" ") || "Curriculum vitae",
      margin,
      y,
    );
    y += 8;
    if (data.role) {
      doc.setTextColor(
        ...(theme.header
          ? lightHeader
            ? ([55, 75, 70] as [number, number, number])
            : ([220, 238, 226] as [number, number, number])
          : theme.accent),
      );
      doc.setFontSize(12);
      doc.text(data.role, margin, y);
      y += 8;
    }
    doc.setTextColor(
      ...(theme.header
        ? lightHeader
          ? ([70, 85, 80] as [number, number, number])
          : ([235, 240, 239] as [number, number, number])
        : ([70, 85, 80] as [number, number, number])),
    );
    doc.setFont(theme.font, "normal");
    doc.setFontSize(9);
    doc.text(
      [data.email, data.phone, data.city, data.linkedin, data.portfolio]
        .filter(Boolean)
        .join("  |  "),
      margin,
      y,
      { maxWidth: contentWidth },
    );
    y += 10;
    const addSection = (title: string, content: string) => {
      if (!content.trim()) return;
      const lines = doc.splitTextToSize(content, contentWidth);
      const requiredHeight = 10 + lines.length * lineHeight;
      if (y + requiredHeight > 278) {
        doc.addPage();
        y = 20;
      }
      doc.setTextColor(...theme.accent);
      doc.setFont(theme.font, "bold");
      doc.setFontSize(10);
      doc.text(title.toUpperCase(), margin, y);
      y += 6;
      doc.setTextColor(45, 58, 54);
      doc.setFont(theme.font, "normal");
      doc.setFontSize(9.5);
      doc.text(lines, margin, y);
      y += lines.length * lineHeight + sectionGap;
    };
    addSection("Profilo professionale", data.profile);
    const addExperience = () =>
      addSection(
        "Esperienze lavorative",
        data.experiences.filter(Boolean).join("\n\n"),
      );
    const addEducation = () =>
      addSection(
        "Istruzione e formazione",
        data.education.filter(Boolean).join("\n\n"),
      );
    if (theme.educationFirst) {
      addEducation();
      addExperience();
    } else {
      addExperience();
      addEducation();
    }
    addSection("Competenze", data.skills.filter(Boolean).join(" • "));
    addSection("Lingue", data.languages);
    addSection("Certificazioni", data.certifications);
    addSection("Corsi", data.courses);
    addSection("Patente", data.licence);
    addSection("Disponibilità", data.availability);
    if (data.privacy)
      addSection(
        "Privacy",
        "Autorizzo il trattamento dei dati personali contenuti nel presente curriculum ai sensi del Regolamento UE 2016/679.",
      );
    const filename =
      [data.name, data.surname, data.role]
        .filter(Boolean)
        .join("-")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/gi, "-")
        .replace(/^-|-$/g, "") || "curriculum-vitae";
    doc.save(`${filename}-${template}.pdf`);
  };
  return (
    <div>
      <section
        className="mb-5 rounded-2xl border border-[#dfe5df] bg-white p-4 sm:p-5"
        aria-labelledby="template-title"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Stile del CV</p>
            <h2 id="template-title" className="mt-2 text-xl font-black">
              Scegli il modello da usare
            </h2>
          </div>
          <p className="max-w-md text-xs leading-5 text-[#65736f]">
            Lo stile cambia anteprima e PDF, non il punteggio ATS: quello
            dipende solo dai contenuti.
          </p>
        </div>
        <div className="mt-5 grid gap-6">
          {templateGroups.map((group) => (
            <section key={group} aria-labelledby={`template-group-${group}`}>
              <h3
                id={`template-group-${group}`}
                className="text-xs font-black uppercase tracking-[.12em] text-[#52615d]"
              >
                {group}
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {templates
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <button
                      type="button"
                      data-template-option={item.id}
                      aria-pressed={template === item.id}
                      onClick={() => setTemplate(item.id)}
                      className={`min-h-48 rounded-xl border p-4 text-left transition ${template === item.id ? "border-[#176b4d] bg-[#e8f1ec] shadow-sm" : "border-[#dfe5df] hover:border-[#9db9a6]"}`}
                      key={item.id}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="text-base font-black">
                          {item.name}
                        </span>
                        <span className="rounded-full bg-white/80 px-2 py-1 text-[9px] font-black uppercase tracking-wide text-[#176b4d]">
                          {item.tone}
                        </span>
                      </span>
                      <span className="mt-3 block text-xs leading-5 text-[#5e6c69]">
                        <strong className="text-[#344640]">Ideale per:</strong>{" "}
                        {item.bestFor}
                      </span>
                      <span className="mt-2 block text-xs leading-5 text-[#5e6c69]">
                        {item.text}
                      </span>
                      <span className="mt-3 block text-[11px] font-bold leading-4 text-[#176b4d]">
                        {item.ats}
                      </span>
                      <span className="mt-2 block text-[10px] leading-4 text-[#65736f]">
                        Consigliato: {item.recommended}
                      </span>
                    </button>
                  ))}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-5 text-sm font-bold text-[#52615d]">
          Non sai quale scegliere?{" "}
          <Link
            className="text-[#176b4d] underline"
            href="/strumenti/quiz-modello-cv"
          >
            Usa il quiz modello CV
          </Link>
          .
        </p>
      </section>
      <div className="mb-5 rounded-2xl border border-[#dfe5df] bg-white p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <Metric
            label="Completezza del CV"
            value={completeness}
            detail="Misura quante informazioni essenziali hai compilato."
          />
          <Metric
            label="Controllo ATS"
            value={ats.score}
            detail="Valuta contenuti, struttura e leggibilità del testo."
          />
        </div>
        <div className="mt-4 flex flex-col gap-2 border-t border-[#e1e6e2] pt-4 text-xs leading-5 text-[#5e6c69] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>
              {hasContent
                ? completeness < 50
                  ? "Completa i dati essenziali per ottenere un controllo ATS più affidabile."
                  : "Il punteggio ATS aumenta solo con sezioni reali, complete e leggibili."
                : "Il tuo CV è ancora vuoto. Inizia dai dati essenziali per vedere avanzare completezza e controllo ATS."}
            </p>
            <p className="mt-1 font-bold text-[#52615d]">
              I punteggi si aggiornano solo in base alle informazioni reali
              inserite nel CV.
            </p>
          </div>
          <span
            aria-live="polite"
            className="shrink-0 font-bold text-[#176b4d]"
          >
            {saved ? "Salvato nel browser" : "Salvataggio automatico attivo"}
          </span>
        </div>
      </div>
      <div className="grid items-start gap-6 xl:grid-cols-[.95fr_1.05fr]">
        <div className="card p-4 sm:p-6">
          <Section title="Informazioni personali">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Nome"
                value={data.name}
                onChange={(x) => set("name", x)}
              />
              <Input
                label="Cognome"
                value={data.surname}
                onChange={(x) => set("surname", x)}
              />
              <Input
                label="Professione o ruolo desiderato"
                value={data.role}
                onChange={(x) => set("role", x)}
                wide
              />
              <Input
                label="Email"
                type="email"
                value={data.email}
                onChange={(x) => set("email", x)}
              />
              <Input
                label="Telefono"
                value={data.phone}
                onChange={(x) => set("phone", x)}
              />
              <Input
                label="Città"
                value={data.city}
                onChange={(x) => set("city", x)}
              />
              <Input
                label="LinkedIn"
                value={data.linkedin}
                onChange={(x) => set("linkedin", x)}
              />
              <Input
                label="Portfolio"
                value={data.portfolio}
                onChange={(x) => set("portfolio", x)}
              />
            </div>
          </Section>
          <Section title="Profilo professionale">
            <Text
              label="Riassumi esperienza, specializzazione e contributo"
              value={data.profile}
              onChange={(x) => set("profile", x)}
            />
          </Section>
          <ListSection
            title="Esperienze lavorative"
            items={data.experiences}
            placeholder="Ruolo · Azienda · Date\nDescrivi attività, responsabilità e risultati verificabili."
            onChange={(i, x) => updateList("experiences", i, x)}
            onAdd={() => add("experiences")}
            addLabel="Aggiungi esperienza"
          />
          <ListSection
            title="Istruzione"
            items={data.education}
            placeholder="Titolo · Istituto · Anno\nAggiungi dettagli pertinenti al ruolo."
            onChange={(i, x) => updateList("education", i, x)}
            onAdd={() => add("education")}
            addLabel="Aggiungi istruzione"
          />
          <ListSection
            title="Competenze"
            items={data.skills}
            placeholder="Esempio: Excel - tabelle pivot"
            onChange={(i, x) => updateList("skills", i, x)}
            onAdd={() => add("skills")}
            addLabel="Aggiungi competenza"
            compact
          />
          <Section title="Altre informazioni">
            <div className="grid gap-4 sm:grid-cols-2">
              <Text
                label="Lingue"
                value={data.languages}
                onChange={(x) => set("languages", x)}
                small
              />
              <Text
                label="Certificazioni"
                value={data.certifications}
                onChange={(x) => set("certifications", x)}
                small
              />
              <Text
                label="Corsi"
                value={data.courses}
                onChange={(x) => set("courses", x)}
                small
              />
              <Text
                label="Patente"
                value={data.licence}
                onChange={(x) => set("licence", x)}
                small
              />
              <Text
                label="Disponibilità"
                value={data.availability}
                onChange={(x) => set("availability", x)}
                small
              />
              <label className="flex items-start gap-3 rounded-xl border border-[#dfe5df] p-4 text-sm font-bold">
                <input
                  type="checkbox"
                  className="mt-1 accent-[#176b4d]"
                  checked={data.privacy}
                  onChange={(e) => set("privacy", e.target.checked)}
                />
                Autorizzazione al trattamento dei dati personali
              </label>
            </div>
          </Section>
        </div>
        <div className="xl:sticky xl:top-24">
          <CvPreview data={data} template={template} />
          <div className="no-print mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <button
              onClick={exportPdf}
              disabled={!hasContent}
              className="btn btn-primary col-span-2 sm:col-span-1"
            >
              Scarica PDF
            </button>
            <Link
              className="btn btn-secondary"
              href="/strumenti/controllo-cv-ats"
            >
              Controlla ATS
            </Link>
            <Link
              className="btn btn-secondary"
              href="/strumenti/generatore-lettera-presentazione"
            >
              Genera lettera
            </Link>
            <Link
              className="btn btn-secondary"
              href="/strumenti/email-candidatura"
            >
              Genera email
            </Link>
          </div>
          <p className="mt-3 text-xs leading-5 text-[#65736f]">
            Il PDF usa un formato essenziale e testuale. Controlla sempre il
            file scaricato prima di inviarlo.
          </p>
        </div>
      </div>
    </div>
  );
}

export function CvPreview({
  data,
  template,
}: {
  data: CvData;
  template: CvTemplateId;
}) {
  const themes: Record<
    CvTemplateId,
    {
      article: string;
      header: string;
      role: string;
      accent: string;
      tag: string;
      section: string;
      contact: string;
    }
  > = {
    ats: {
      article: "border border-[#d8ded9] font-sans",
      header: "border-b border-[#263531]",
      role: "text-[#263531]",
      accent: "text-[#263531]",
      tag: "bg-[#edf0ee]",
      section: "",
      contact: "text-[#5e6c69]",
    },
    moderno: {
      article: "border-t-8 border-[#176b4d] font-sans",
      header: "border-b-2 border-[#176b4d]",
      role: "text-[#176b4d]",
      accent: "text-[#176b4d]",
      tag: "bg-[#edf2ee]",
      section: "",
      contact: "text-[#5e6c69]",
    },
    classico: {
      article: "border border-[#b8ad9f] font-serif",
      header: "border-b border-[#7a6859] text-center",
      role: "text-[#6e5a49]",
      accent: "text-[#6e5a49]",
      tag: "bg-[#f2eee9]",
      section: "",
      contact: "text-[#5e6c69]",
    },
    "primo-lavoro": {
      article: "border-l-8 border-[#365f88] font-sans",
      header: "rounded-xl bg-[#edf3f8] p-5",
      role: "text-[#365f88]",
      accent: "text-[#365f88]",
      tag: "bg-[#e7eff6]",
      section: "",
      contact: "text-[#5e6c69]",
    },
    creativo: {
      article: "border border-[#d9dedb] font-sans",
      header: "rounded-xl bg-[#122b36] p-5 text-white",
      role: "text-[#9bd4b7]",
      accent: "text-[#b54e3b]",
      tag: "bg-[#f6e9e5]",
      section: "",
      contact: "text-[#d7e0df]",
    },
    "compatto-una-pagina": {
      article: "border-2 border-[#52645e] font-sans !min-h-[560px] !p-[4.5%]",
      header: "border-b-2 border-[#52645e] !pb-3",
      role: "text-[#35584d]",
      accent: "text-[#35584d]",
      tag: "bg-[#e9efec] !px-1.5 !py-0.5",
      section: "!mt-3",
      contact: "text-[#52615d]",
    },
    "executive-premium": {
      article:
        "border border-[#b9aa91] border-t-[10px] border-t-[#27343c] font-serif",
      header: "border-b-4 border-double border-[#a88b5d] py-2",
      role: "text-[#8a6d3f] uppercase tracking-[.12em]",
      accent: "text-[#7d6238]",
      tag: "border border-[#d8cbb7] bg-[#faf7f1]",
      section: "",
      contact: "text-[#59645f]",
    },
    "tecnico-ordinato": {
      article:
        "border border-[#9fb2c0] border-l-[12px] border-l-[#294f70] font-sans",
      header: "border-b-2 border-[#294f70] bg-[#edf3f7] p-4",
      role: "text-[#294f70]",
      accent: "text-[#294f70]",
      tag: "rounded-sm border border-[#c5d3dc] bg-[#edf3f7]",
      section: "border-l-2 border-[#d4e0e7] pl-3",
      contact: "text-[#536570]",
    },
    "retail-hospitality": {
      article:
        "border border-[#e0c5ad] border-t-[12px] border-t-[#b9683e] font-sans",
      header: "rounded-2xl bg-[#fff1e5] p-5",
      role: "text-[#a4512d]",
      accent: "text-[#a4512d]",
      tag: "rounded-full bg-[#f9e5d6]",
      section: "rounded-lg bg-[#fffaf6] px-3 py-2",
      contact: "text-[#685b52]",
    },
    "sanitario-pulito": {
      article: "border border-[#abd2cd] font-sans",
      header: "border-l-8 border-[#2d817a] bg-[#edf8f6] p-5",
      role: "text-[#24736d]",
      accent: "text-[#24736d]",
      tag: "border border-[#c7e2de] bg-[#edf8f6]",
      section: "border-b border-[#e0eeeb] pb-3",
      contact: "text-[#4f6763]",
    },
    "portfolio-leggero": {
      article:
        "border border-[#c9b5d2] border-t-[10px] border-t-[#684278] font-sans",
      header: "rounded-xl bg-[#34273d] p-5 text-white",
      role: "text-[#dec4e8]",
      accent: "text-[#74478a]",
      tag: "rounded-full bg-[#efe5f3] text-[#51315f]",
      section: "",
      contact: "text-[#e6dfe9]",
    },
  };
  const theme = themes[template];
  const education = (
    <PreviewSection
      title="Istruzione e formazione"
      items={data.education}
      empty="Il tuo percorso di studi apparirà qui."
      accent={theme.accent}
      tag={theme.tag}
      sectionClass={theme.section}
    />
  );
  const experience = (
    <PreviewSection
      title="Esperienze lavorative"
      items={data.experiences}
      empty="Le tue esperienze appariranno qui."
      accent={theme.accent}
      tag={theme.tag}
      sectionClass={theme.section}
    />
  );
  return (
    <article
      data-template={template}
      className={`mx-auto aspect-[210/297] min-h-[620px] w-full max-w-[720px] overflow-hidden bg-white p-[7%] shadow-[0_18px_60px_rgba(18,43,54,.12)] ${theme.article}`}
    >
      <header className={`pb-5 ${theme.header}`}>
        <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
          {data.name || "Nome"} {data.surname || "Cognome"}
        </h2>
        <p className={`mt-1 font-bold ${theme.role}`}>
          {data.role || "Ruolo professionale"}
        </p>
        <p
          className={`mt-3 break-words text-[10px] leading-5 ${theme.contact}`}
        >
          {[
            data.email || "email@esempio.it",
            data.phone || "+39 000 0000000",
            data.city || "Città",
            data.linkedin,
            data.portfolio,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </header>
      {template === "portfolio-leggero" && data.portfolio && (
        <p className="mt-4 rounded-lg border border-[#d7c5de] bg-[#f7f1f9] px-3 py-2 text-[10px] font-bold text-[#684278]">
          Portfolio · {data.portfolio}
        </p>
      )}
      {template === "sanitario-pulito" &&
        (data.certifications || data.availability) && (
          <div className="mt-4 grid gap-2 rounded-lg bg-[#edf8f6] p-3 text-[9px] leading-4 text-[#315e59] sm:grid-cols-2">
            {data.certifications && (
              <p>
                <strong>Qualifiche:</strong> {data.certifications}
              </p>
            )}
            {data.availability && (
              <p>
                <strong>Disponibilità:</strong> {data.availability}
              </p>
            )}
          </div>
        )}
      <PreviewSection
        title="Profilo professionale"
        content={
          data.profile ||
          "Aggiungi un profilo professionale breve e specifico per presentare esperienza, competenze e obiettivo."
        }
        accent={theme.accent}
        tag={theme.tag}
        sectionClass={theme.section}
      />
      {template === "primo-lavoro" ? (
        <>
          {education}
          {experience}
        </>
      ) : (
        <>
          {experience}
          {education}
        </>
      )}
      <PreviewSection
        title="Competenze"
        items={data.skills}
        inline
        empty="Aggiungi almeno cinque competenze pertinenti."
        accent={theme.accent}
        tag={theme.tag}
        sectionClass={theme.section}
      />
      {data.languages && (
        <PreviewSection
          title="Lingue"
          content={data.languages}
          accent={theme.accent}
          tag={theme.tag}
          sectionClass={theme.section}
        />
      )}
      {data.certifications && template !== "sanitario-pulito" && (
        <PreviewSection
          title="Certificazioni"
          content={data.certifications}
          accent={theme.accent}
          tag={theme.tag}
          sectionClass={theme.section}
        />
      )}
      {data.courses && (
        <PreviewSection
          title="Corsi"
          content={data.courses}
          accent={theme.accent}
          tag={theme.tag}
          sectionClass={theme.section}
        />
      )}
      {data.availability && template !== "sanitario-pulito" && (
        <PreviewSection
          title="Disponibilità"
          content={data.availability}
          accent={theme.accent}
          tag={theme.tag}
          sectionClass={theme.section}
        />
      )}
      {data.privacy && (
        <p className="mt-7 text-[8px] leading-4 text-[#71807a]">
          Autorizzo il trattamento dei dati personali contenuti nel presente
          curriculum ai sensi del Regolamento UE 2016/679.
        </p>
      )}
    </article>
  );
}

function cvText(d: CvData) {
  const section = (title: string, content: string) =>
    content.trim() ? `${title}\n${content.trim()}` : "";
  return [
    [d.name, d.surname, d.email, d.phone, d.city].filter(Boolean).join(" "),
    section("RUOLO DESIDERATO", d.role),
    section("PROFILO PROFESSIONALE", d.profile),
    section("ESPERIENZE LAVORATIVE", d.experiences.filter(Boolean).join("\n")),
    section("ISTRUZIONE E FORMAZIONE", d.education.filter(Boolean).join("\n")),
    section("COMPETENZE", d.skills.filter(Boolean).join(", ")),
    section("LINGUE", d.languages),
    d.privacy &&
    (d.profile || d.experiences.some(Boolean) || d.education.some(Boolean))
      ? "Autorizzo il trattamento dei dati personali ai sensi del Regolamento UE 2016/679"
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}
function Metric({
  label,
  value,
  detail,
}: {
  label: string;
  value: number;
  detail: string;
}) {
  return (
    <div className="rounded-xl bg-[#f3f6f2] p-4">
      <div className="flex items-end justify-between gap-4">
        <span className="text-xs font-bold text-[#52615d]">{label}</span>
        <p className="text-2xl font-black text-[#176b4d]">{value}%</p>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#dfe8e1]">
        <div
          className="h-full rounded-full bg-[#176b4d] transition-[width]"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="mt-2 text-[11px] leading-4 text-[#687570]">{detail}</p>
    </div>
  );
}
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-[#e1e6e2] py-6 first:pt-0 last:border-0">
      <h2 className="mb-4 text-lg font-black">{title}</h2>
      {children}
    </section>
  );
}
function Input({
  label,
  value,
  onChange,
  type = "text",
  wide = false,
}: {
  label: string;
  value: string;
  onChange: (x: string) => void;
  type?: string;
  wide?: boolean;
}) {
  return (
    <label className={`label ${wide ? "sm:col-span-2" : ""}`}>
      {label}
      <input
        type={type}
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
function Text({
  label,
  value,
  onChange,
  small = false,
}: {
  label: string;
  value: string;
  onChange: (x: string) => void;
  small?: boolean;
}) {
  return (
    <label className="label">
      {label}
      <textarea
        className={`input resize-y ${small ? "min-h-24" : "min-h-32"}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
function ListSection({
  title,
  items,
  placeholder,
  onChange,
  onAdd,
  addLabel,
  compact = false,
}: {
  title: string;
  items: string[];
  placeholder: string;
  onChange: (i: number, x: string) => void;
  onAdd: () => void;
  addLabel: string;
  compact?: boolean;
}) {
  return (
    <Section title={title}>
      <div className="grid gap-3">
        {items.map((item, i) => (
          <textarea
            aria-label={`${title} ${i + 1}`}
            key={i}
            className={`input resize-y ${compact ? "min-h-12" : "min-h-28"}`}
            placeholder={placeholder}
            value={item}
            onChange={(e) => onChange(i, e.target.value)}
          />
        ))}
      </div>
      <button
        className="btn btn-quiet mt-3 !min-h-10 !py-2 text-sm"
        onClick={onAdd}
      >
        + {addLabel}
      </button>
    </Section>
  );
}
function PreviewSection({
  title,
  content,
  items,
  inline = false,
  empty,
  accent = "text-[#176b4d]",
  tag = "bg-[#edf2ee]",
  sectionClass = "",
}: {
  title: string;
  content?: string;
  items?: string[];
  inline?: boolean;
  empty?: string;
  accent?: string;
  tag?: string;
  sectionClass?: string;
}) {
  const values = items?.filter(Boolean) ?? [];
  return (
    <section className={`mt-6 ${sectionClass}`}>
      <h3
        className={`text-[9px] font-black uppercase tracking-[.14em] ${accent}`}
      >
        {title}
      </h3>
      {content && (
        <p className="mt-2 whitespace-pre-line text-[10px] leading-[1.6] text-[#384844]">
          {content}
        </p>
      )}
      {items &&
        (values.length ? (
          <div
            className={
              inline ? "mt-2 flex flex-wrap gap-1.5" : "mt-2 grid gap-3"
            }
          >
            {values.map((item, i) =>
              inline ? (
                <span
                  className={`rounded px-2 py-1 text-[9px] font-bold ${tag}`}
                  key={i}
                >
                  {item}
                </span>
              ) : (
                <p
                  className="whitespace-pre-line text-[10px] leading-[1.55] text-[#384844]"
                  key={i}
                >
                  {item}
                </p>
              ),
            )}
          </div>
        ) : (
          <p className="mt-2 text-[10px] italic text-[#89938f]">{empty}</p>
        ))}
    </section>
  );
}
