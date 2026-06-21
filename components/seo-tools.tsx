"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { extractKeywords } from "@/lib/analysis";

const roleSkills: Record<
  string,
  { technical: string[]; digital: string[]; keywords: string[] }
> = {
  barista: {
    technical: [
      "Preparazione caffetteria",
      "Servizio al banco",
      "HACCP",
      "Gestione cassa",
    ],
    digital: ["POS", "Gestionale ordini"],
    keywords: [
      "caffetteria",
      "servizio clienti",
      "apertura e chiusura",
      "scorte",
    ],
  },
  infermiere: {
    technical: [
      "Assistenza infermieristica",
      "Terapia prescritta",
      "Monitoraggio parametri",
      "Documentazione clinica",
    ],
    digital: ["Cartella clinica elettronica", "Suite Office"],
    keywords: [
      "assistenza",
      "triage",
      "protocolli",
      "équipe multidisciplinare",
    ],
  },
  oss: {
    technical: [
      "Igiene e cura della persona",
      "Mobilizzazione",
      "Supporto ai pasti",
      "Rilevazione parametri",
    ],
    digital: ["Cartella assistenziale", "Suite Office"],
    keywords: ["assistenza", "autonomia", "sicurezza", "équipe"],
  },
  contabile: {
    technical: [
      "Contabilità generale",
      "Prima nota",
      "Fatturazione",
      "Riconciliazioni bancarie",
    ],
    digital: ["Excel", "Software gestionale"],
    keywords: ["registrazioni contabili", "scadenze", "IVA", "bilancio"],
  },
  sviluppatore: {
    technical: [
      "Sviluppo software",
      "Testing",
      "Code review",
      "Controllo versione",
    ],
    digital: ["Git", "Database", "CI/CD"],
    keywords: ["sviluppo", "debugging", "API", "documentazione"],
  },
};

const transversal = [
  "Comunicazione",
  "Organizzazione",
  "Precisione",
  "Collaborazione",
  "Gestione delle priorità",
];

function roleKey(role: string) {
  const normalized = role.toLocaleLowerCase("it-IT");
  return Object.keys(roleSkills).find((key) => normalized.includes(key)) ?? "";
}

function copyText(text: string, done: (value: boolean) => void) {
  navigator.clipboard.writeText(text).then(() => {
    done(true);
    window.setTimeout(() => done(false), 1600);
  });
}

export function ProfileGenerator() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [sector, setSector] = useState("");
  const [level, setLevel] = useState("junior");
  const [tone, setTone] = useState("semplice");
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const output = useMemo(() => {
    const experience =
      level === "senza esperienza"
        ? "con una preparazione mirata e attività formative pertinenti"
        : level === "senior"
          ? "con esperienza consolidata nella gestione autonoma di attività e priorità"
          : level === "intermedio"
            ? "con esperienza operativa e crescente autonomia"
            : "con esperienza iniziale e solide basi operative";
    const ending =
      tone === "formale"
        ? "Attento alla qualità del lavoro, alla collaborazione e al rispetto delle procedure."
        : tone === "moderno"
          ? "Unisce autonomia, collaborazione e attenzione a risultati concreti."
          : "Lavora con precisione, responsabilità e attenzione ai risultati concreti.";
    return `${role.trim()} ${experience} nel settore ${sector.trim()}. ${ending}`;
  }, [level, role, sector, tone]);
  const valid = Boolean(role.trim() && sector.trim());
  return (
    <ToolGrid
      form={
        <>
          <Field label="Nome (facoltativo)" value={name} onChange={setName} />
          <Field
            label="Ruolo desiderato"
            value={role}
            onChange={(value) => {
              setRole(value);
              setDone(false);
            }}
          />
          <Field
            label="Settore"
            value={sector}
            onChange={(value) => {
              setSector(value);
              setDone(false);
            }}
          />
          <Select
            label="Esperienza"
            value={level}
            onChange={(value) => {
              setLevel(value);
              setDone(false);
            }}
            options={["senza esperienza", "junior", "intermedio", "senior"]}
          />
          <Select
            label="Tono"
            value={tone}
            onChange={(value) => {
              setTone(value);
              setDone(false);
            }}
            options={["semplice", "moderno", "formale"]}
          />
          <button
            className="btn btn-primary sm:col-span-2 sm:w-fit"
            disabled={!valid}
            onClick={() => setDone(true)}
          >
            Genera il profilo
          </button>
        </>
      }
      output={
        done ? (
          <>
            <h2 className="title-md">
              {name.trim() ? `Profilo per ${name.trim()}` : "Bozza del profilo"}
            </h2>
            <p
              className="mt-5 leading-7 text-[#354440]"
              data-testid="profile-output"
            >
              {output}
            </p>
            <button
              className="btn btn-secondary mt-6"
              onClick={() => copyText(output, setCopied)}
            >
              {copied ? "Copiato" : "Copia il profilo"}
            </button>
            <ToolLinks />
            <p className="mt-5 text-xs leading-5 text-[#65736f]">
              Personalizza la bozza con specializzazione, anni, strumenti e un
              contributo reale. Non inserire qualità che non puoi dimostrare.
            </p>
          </>
        ) : null
      }
    />
  );
}

export function SkillsGenerator() {
  const [role, setRole] = useState("");
  const [sector, setSector] = useState("");
  const [level, setLevel] = useState("junior");
  const [done, setDone] = useState(false);
  const selected = roleSkills[roleKey(role)] ?? {
    technical: [
      `Attività operative da ${role || "ruolo"}`,
      "Controllo qualità",
      "Gestione delle procedure",
      "Organizzazione del lavoro",
    ],
    digital: ["Suite Office", "Strumenti digitali di settore"],
    keywords: [role, sector, "procedure", "risultati"].filter(Boolean),
  };
  return (
    <ToolGrid
      form={
        <>
          <Field
            label="Ruolo desiderato"
            value={role}
            onChange={(value) => {
              setRole(value);
              setDone(false);
            }}
          />
          <Field
            label="Settore (facoltativo)"
            value={sector}
            onChange={(value) => {
              setSector(value);
              setDone(false);
            }}
          />
          <Select
            label="Esperienza"
            value={level}
            onChange={(value) => {
              setLevel(value);
              setDone(false);
            }}
            options={["senza esperienza", "junior", "intermedio", "senior"]}
          />
          <button
            className="btn btn-primary sm:col-span-2 sm:w-fit"
            disabled={!role.trim()}
            onClick={() => setDone(true)}
          >
            Trova le competenze
          </button>
        </>
      }
      output={
        done ? (
          <div data-testid="skills-output">
            <h2 className="title-md">Competenze da valutare</h2>
            <SkillGroup title="Tecniche" items={selected.technical} />
            <SkillGroup
              title="Trasversali"
              items={
                level === "senior"
                  ? [...transversal, "Coordinamento"]
                  : transversal
              }
            />
            <SkillGroup title="Digitali" items={selected.digital} />
            <SkillGroup
              title="Linguistiche"
              items={[
                "Lingue pertinenti al ruolo, indicando il livello reale (per esempio B2)",
              ]}
            />
            <SkillGroup
              title="Parole chiave collegate"
              items={selected.keywords}
            />
            <p className="mt-5 text-sm leading-6 text-[#5e6c69]">
              Nel CV, collega le competenze tecniche alle esperienze. Tieni le
              trasversali in una sezione breve e sostienile con esempi concreti.
            </p>
            <ToolLinks />
          </div>
        ) : null
      }
    />
  );
}

export function KeywordGenerator() {
  const [role, setRole] = useState("");
  const [advert, setAdvert] = useState("");
  const [cv, setCv] = useState("");
  const [done, setDone] = useState(false);
  const analysis = useMemo(() => {
    const base = roleSkills[roleKey(role)]?.keywords ?? [];
    const words = [
      ...new Set([...base, ...extractKeywords(advert).slice(0, 14)]),
    ].filter(Boolean);
    const cvLower = cv.toLocaleLowerCase("it-IT");
    return {
      words,
      found: words.filter((word) =>
        cvLower.includes(word.toLocaleLowerCase("it-IT")),
      ),
      missing: words.filter(
        (word) => !cvLower.includes(word.toLocaleLowerCase("it-IT")),
      ),
    };
  }, [advert, cv, role]);
  const valid = Boolean(role.trim() && advert.trim());
  return (
    <ToolGrid
      form={
        <>
          <Field
            label="Ruolo desiderato"
            value={role}
            onChange={(value) => {
              setRole(value);
              setDone(false);
            }}
          />
          <label className="label sm:col-span-2">
            Annuncio di lavoro
            <textarea
              className="input min-h-40"
              value={advert}
              onChange={(event) => {
                setAdvert(event.target.value);
                setDone(false);
              }}
              placeholder="Incolla un annuncio reale"
            />
          </label>
          <label className="label sm:col-span-2">
            Testo del CV (facoltativo)
            <textarea
              className="input min-h-32"
              value={cv}
              onChange={(event) => {
                setCv(event.target.value);
                setDone(false);
              }}
              placeholder="Incolla il CV per confrontarlo"
            />
          </label>
          <button
            className="btn btn-primary sm:col-span-2 sm:w-fit"
            disabled={!valid}
            onClick={() => setDone(true)}
          >
            Analizza le parole chiave
          </button>
        </>
      }
      output={
        done ? (
          <div data-testid="keywords-output">
            <h2 className="title-md">Parole rilevanti</h2>
            <SkillGroup
              title="Dall’annuncio e dal ruolo"
              items={analysis.words}
            />
            {cv.trim() && (
              <>
                <SkillGroup
                  title="Già presenti nel CV"
                  items={analysis.found}
                />
                <SkillGroup title="Da valutare" items={analysis.missing} />
              </>
            )}
            <div className="mt-6 rounded-2xl bg-[#f3f5f1] p-5 text-sm leading-6 text-[#5e6c69]">
              Inserisci una parola solo se descrive davvero la tua esperienza.
              Ripeterla senza contesto non migliora il CV e può renderlo
              artificiale.
            </div>
            <ToolLinks />
          </div>
        ) : null
      }
    />
  );
}

function ToolGrid({
  form,
  output,
}: {
  form: React.ReactNode;
  output: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
      <div className="card grid gap-5 p-5 sm:grid-cols-2 sm:p-7">{form}</div>
      <div className="card min-h-72 p-5 sm:p-7">
        {output ?? (
          <p className="grid min-h-56 place-items-center text-center text-sm text-[#65736f]">
            Il risultato apparirà qui.
          </p>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="label">
      {label}
      <input
        className="input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="label">
      {label}
      <select
        className="input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function SkillGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-6">
      <h3 className="font-black">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.length ? (
          items.map((item) => (
            <span
              className="rounded-lg border border-[#d8dfda] px-3 py-2 text-sm font-bold"
              key={item}
            >
              {item}
            </span>
          ))
        ) : (
          <span className="text-sm text-[#65736f]">
            Nessun termine rilevato.
          </span>
        )}
      </div>
    </section>
  );
}

function ToolLinks() {
  return (
    <div className="mt-6 flex flex-wrap gap-3 border-t border-[#e1e6e2] pt-5">
      <Link
        className="text-sm font-bold text-[#176b4d] underline"
        href="/crea-cv"
      >
        Apri il builder CV
      </Link>
      <Link
        className="text-sm font-bold text-[#176b4d] underline"
        href="/strumenti/controllo-cv-ats"
      >
        Controlla il CV
      </Link>
      <Link
        className="text-sm font-bold text-[#176b4d] underline"
        href="/strumenti/confronta-cv-annuncio"
      >
        Confronta con l’annuncio
      </Link>
      <Link
        className="text-sm font-bold text-[#176b4d] underline"
        href="/cv-senza-esperienza"
      >
        Guida senza esperienza
      </Link>
      <Link
        className="text-sm font-bold text-[#176b4d] underline"
        href="/cv-cambio-lavoro"
      >
        Guida cambio lavoro
      </Link>
    </div>
  );
}
