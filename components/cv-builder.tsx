"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { templates, type CvTemplateId } from "@/data/content";
import { analyzeCv } from "@/lib/analysis";

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
  privacy: true,
};

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
        if (value) setData({ ...empty, ...JSON.parse(value) });
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
  const required = [
    data.name,
    data.surname,
    data.role,
    data.email,
    data.phone,
    data.city,
    data.profile,
    data.experiences.some(Boolean),
    data.education.some(Boolean),
    data.skills.filter(Boolean).length >= 3,
    data.languages,
    data.privacy,
  ];
  const completeness = Math.round(
    (required.filter(Boolean).length / required.length) * 100,
  );
  const text = useMemo(() => cvText(data), [data]);
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
    };
    const theme = pdfThemes[template];
    const margin = 18;
    let y = 20;
    if (theme.header) {
      doc.setFillColor(...theme.header);
      doc.rect(0, 0, 210, 39, "F");
      doc.setTextColor(255, 255, 255);
    } else doc.setTextColor(21, 37, 36);
    doc.setFont(theme.font, "bold");
    doc.setFontSize(22);
    doc.text(`${data.name || "Nome"} ${data.surname || "Cognome"}`, margin, y);
    y += 8;
    doc.setTextColor(
      ...(theme.header
        ? ([220, 238, 226] as [number, number, number])
        : theme.accent),
    );
    doc.setFontSize(12);
    doc.text(data.role || "Ruolo professionale", margin, y);
    y += 8;
    doc.setTextColor(
      ...(theme.header
        ? ([235, 240, 239] as [number, number, number])
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
      { maxWidth: 174 },
    );
    y += 10;
    const addSection = (title: string, content: string) => {
      if (!content.trim()) return;
      const lines = doc.splitTextToSize(content, 174);
      const requiredHeight = 10 + lines.length * 4.5;
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
      y += lines.length * 4.5 + 6;
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
      `${data.name || "nome"}-${data.surname || "cognome"}-${data.role || "cv"}`
        .toLowerCase()
        .replace(/[^a-z0-9à-ù]+/gi, "-")
        .replace(/^-|-$/g, "");
    doc.save(
      `${filename}-${templates
        .find((item) => item.id === template)!
        .name.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")}.pdf`,
    );
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
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {templates.map((item) => (
            <button
              type="button"
              aria-pressed={template === item.id}
              onClick={() => setTemplate(item.id)}
              className={`min-h-32 rounded-xl border p-3 text-left transition ${template === item.id ? "border-[#176b4d] bg-[#e8f1ec] shadow-sm" : "border-[#dfe5df] hover:border-[#9db9a6]"}`}
              key={item.id}
            >
              <span className="text-sm font-black">{item.name}</span>
              <span className="mt-2 block text-[11px] leading-4 text-[#5e6c69]">
                {item.text}
              </span>
              <span className="mt-2 block text-[10px] font-bold text-[#176b4d]">
                {item.ats}
              </span>
            </button>
          ))}
        </div>
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
          <p>
            {completeness < 50
              ? "Completa i dati essenziali per ottenere un controllo ATS più affidabile."
              : "Il punteggio ATS aumenta solo con sezioni reali, complete e leggibili."}
          </p>
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
    }
  > = {
    ats: {
      article: "border border-[#d8ded9] font-sans",
      header: "border-b border-[#263531]",
      role: "text-[#263531]",
      accent: "text-[#263531]",
      tag: "bg-[#edf0ee]",
    },
    moderno: {
      article: "border-t-8 border-[#176b4d] font-sans",
      header: "border-b-2 border-[#176b4d]",
      role: "text-[#176b4d]",
      accent: "text-[#176b4d]",
      tag: "bg-[#edf2ee]",
    },
    classico: {
      article: "border border-[#b8ad9f] font-serif",
      header: "border-b border-[#7a6859] text-center",
      role: "text-[#6e5a49]",
      accent: "text-[#6e5a49]",
      tag: "bg-[#f2eee9]",
    },
    "primo-lavoro": {
      article: "border-l-8 border-[#365f88] font-sans",
      header: "rounded-xl bg-[#edf3f8] p-5",
      role: "text-[#365f88]",
      accent: "text-[#365f88]",
      tag: "bg-[#e7eff6]",
    },
    creativo: {
      article: "border border-[#d9dedb] font-sans",
      header: "rounded-xl bg-[#122b36] p-5 text-white",
      role: "text-[#9bd4b7]",
      accent: "text-[#b54e3b]",
      tag: "bg-[#f6e9e5]",
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
    />
  );
  const experience = (
    <PreviewSection
      title="Esperienze lavorative"
      items={data.experiences}
      empty="Le tue esperienze appariranno qui."
      accent={theme.accent}
      tag={theme.tag}
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
        <p className="mt-3 break-words text-[10px] leading-5 text-[#5e6c69]">
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
      <PreviewSection
        title="Profilo professionale"
        content={
          data.profile ||
          "Aggiungi un profilo professionale breve e specifico per presentare esperienza, competenze e obiettivo."
        }
        accent={theme.accent}
        tag={theme.tag}
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
      />
      {data.languages && (
        <PreviewSection
          title="Lingue"
          content={data.languages}
          accent={theme.accent}
          tag={theme.tag}
        />
      )}
      {data.certifications && (
        <PreviewSection
          title="Certificazioni"
          content={data.certifications}
          accent={theme.accent}
          tag={theme.tag}
        />
      )}
      {data.courses && (
        <PreviewSection
          title="Corsi"
          content={data.courses}
          accent={theme.accent}
          tag={theme.tag}
        />
      )}
      {data.availability && (
        <PreviewSection
          title="Disponibilità"
          content={data.availability}
          accent={theme.accent}
          tag={theme.tag}
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
}: {
  title: string;
  content?: string;
  items?: string[];
  inline?: boolean;
  empty?: string;
  accent?: string;
  tag?: string;
}) {
  const values = items?.filter(Boolean) ?? [];
  return (
    <section className="mt-6">
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
