"use client";

import { useState } from "react";
import {
  downloadTextPdf,
  downloadTxt,
  safeDocumentFilename,
} from "@/lib/downloads";

async function copy(text: string, setCopied: (value: boolean) => void) {
  await navigator.clipboard.writeText(text);
  setCopied(true);
  window.setTimeout(() => setCopied(false), 1600);
}

export function LetterGenerator() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    level: "prime esperienze",
    motivation: "",
    tone: "moderno",
    type: "risposta ad annuncio",
  });
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const update = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
    setDone(false);
  };
  const opening =
    form.tone === "formale"
      ? "Gentile Responsabile della selezione,"
      : form.tone === "semplice"
        ? "Buongiorno,"
        : "Gentile team di selezione,";
  const introduction = form.name.trim()
    ? `mi chiamo ${form.name.trim()} e desidero proporre la mia candidatura`
    : "desidero proporre la mia candidatura";
  const target = form.role.trim()
    ? ` per il ruolo di ${form.role.trim()}`
    : " per una posizione coerente con il mio profilo";
  const company = form.company.trim() ? ` presso ${form.company.trim()}` : "";
  const closing = form.name.trim() ? `\n${form.name.trim()}` : "";
  const letter = `${opening}\n\n${introduction}${target}${company}. Si tratta di una ${form.type}, coerente con il percorso che sto costruendo.\n\nIl mio livello professionale è ${form.level}. ${form.motivation.trim() || "Mi interessa questa opportunità perché posso mettere a disposizione competenze pertinenti e continuare a crescere in un contesto coerente con i miei obiettivi."}\n\nNel curriculum allegato ho raccolto le esperienze e le competenze più rilevanti. Sarei lieto/a di approfondire in un colloquio come potrei contribuire al ruolo e conoscere meglio le vostre esigenze.\n\nGrazie per l’attenzione.\nCordiali saluti,${closing}`;
  const pdfName = safeDocumentFilename(
    "lettera-presentazione",
    form.name,
    form.role,
    "pdf",
  );
  const txtName = safeDocumentFilename(
    "lettera-presentazione",
    form.name,
    form.role,
    "txt",
  );

  return (
    <GeneratorLayout
      inputs={
        <>
          <Field
            label="Nome"
            value={form.name}
            onChange={(value) => update("name", value)}
          />
          <Field
            label="Ruolo"
            value={form.role}
            onChange={(value) => update("role", value)}
          />
          <Field
            label="Azienda"
            value={form.company}
            onChange={(value) => update("company", value)}
          />
          <Select
            label="Livello di esperienza"
            value={form.level}
            onChange={(value) => update("level", value)}
            options={["prime esperienze", "junior", "intermedio", "senior"]}
          />
          <Select
            label="Tono"
            value={form.tone}
            onChange={(value) => update("tone", value)}
            options={["formale", "moderno", "semplice"]}
          />
          <Select
            label="Tipo"
            value={form.type}
            onChange={(value) => update("type", value)}
            options={[
              "risposta ad annuncio",
              "candidatura spontanea",
              "stage",
              "primo lavoro",
              "cambio carriera",
            ]}
          />
          <label className="label sm:col-span-2">
            Motivazione
            <textarea
              className="input min-h-28"
              value={form.motivation}
              onChange={(event) => update("motivation", event.target.value)}
              placeholder="Perché ti interessa il ruolo? Quale contributo concreto puoi offrire?"
            />
          </label>
          <button
            className="btn btn-primary sm:col-span-2 sm:w-fit"
            onClick={() => setDone(true)}
          >
            Genera la lettera
          </button>
        </>
      }
      output={
        done ? (
          <>
            <pre
              data-testid="letter-output"
              className="whitespace-pre-wrap font-sans text-sm leading-7 text-[#354440]"
            >
              {letter}
            </pre>
            <div className="mt-6 flex flex-wrap gap-3 border-t border-[#e1e6e2] pt-5">
              <button
                className="btn btn-secondary"
                onClick={() => copy(letter, setCopied)}
              >
                {copied ? "Copiata" : "Copia la lettera"}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  downloadTextPdf(pdfName, "Lettera di presentazione", [
                    { content: letter },
                  ])
                }
              >
                Scarica PDF
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => downloadTxt(txtName, letter)}
              >
                Scarica TXT
              </button>
            </div>
            <p className="mt-4 text-xs leading-5 text-[#65736f]">
              Personalizza la bozza e verifica ogni informazione prima di
              inviarla.
            </p>
          </>
        ) : null
      }
    />
  );
}

export function EmailGenerator() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    type: "invio CV",
  });
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState("");
  const update = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
    setDone(false);
  };
  const identity = form.name.trim() ? ` - ${form.name.trim()}` : "";
  const role = form.role.trim() || "profilo professionale";
  const subjectMap: Record<string, string> = {
    "invio CV": `Candidatura ${role}${identity}`,
    "candidatura spontanea": `Candidatura spontanea area ${role}${identity}`,
    "follow up candidatura": `Riscontro candidatura ${role}${identity}`,
    "ringraziamento dopo colloquio": `Grazie per il colloquio - ${role}`,
  };
  const intros: Record<string, string> = {
    "invio CV": "desidero sottoporre la mia candidatura",
    "candidatura spontanea": "desidero proporre la mia candidatura spontanea",
    "follow up candidatura":
      "scrivo per chiedere cortesemente un aggiornamento sulla candidatura inviata",
    "ringraziamento dopo colloquio":
      "la ringrazio per il tempo dedicato durante il colloquio",
  };
  const target = form.role.trim()
    ? ` per il ruolo di ${form.role.trim()}`
    : " per una posizione coerente con il mio profilo";
  const company = form.company.trim() ? ` presso ${form.company.trim()}` : "";
  const closing = form.name.trim() ? `\n${form.name.trim()}` : "";
  const body = `Buongiorno,\n\n${intros[form.type]}${target}${company}. Il mio percorso e le mie competenze sono descritti nel CV allegato.\n\nResto a disposizione per un approfondimento e ringrazio per l’attenzione.\n\nCordiali saluti,${closing}`;
  const subject = subjectMap[form.type];
  const textDocument = `Oggetto: ${subject}\n\n${body}`;
  const txtName = safeDocumentFilename(
    "email-candidatura",
    form.name,
    form.role,
    "txt",
  );
  const pdfName = safeDocumentFilename(
    "email-candidatura",
    form.name,
    form.role,
    "pdf",
  );
  const doCopy = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    window.setTimeout(() => setCopied(""), 1600);
  };

  return (
    <GeneratorLayout
      inputs={
        <>
          <Field
            label="Nome"
            value={form.name}
            onChange={(value) => update("name", value)}
          />
          <Field
            label="Ruolo"
            value={form.role}
            onChange={(value) => update("role", value)}
          />
          <Field
            label="Azienda"
            value={form.company}
            onChange={(value) => update("company", value)}
          />
          <Select
            label="Tipo di email"
            value={form.type}
            onChange={(value) => update("type", value)}
            options={[
              "invio CV",
              "candidatura spontanea",
              "follow up candidatura",
              "ringraziamento dopo colloquio",
            ]}
          />
          <button
            className="btn btn-primary sm:col-span-2 sm:w-fit"
            onClick={() => setDone(true)}
          >
            Genera l’email
          </button>
        </>
      }
      output={
        done ? (
          <>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#65736f]">
                Oggetto
              </span>
              <p data-testid="email-subject" className="mt-2 font-bold">
                {subject}
              </p>
              <button
                className="btn btn-quiet mt-3 !min-h-10 !py-2 text-sm sm:w-fit"
                onClick={() => doCopy(subject, "subject")}
              >
                {copied === "subject" ? "Copiato" : "Copia oggetto"}
              </button>
            </div>
            <div className="mt-6 border-t border-[#e1e6e2] pt-6">
              <pre
                data-testid="email-body"
                className="whitespace-pre-wrap font-sans text-sm leading-7 text-[#354440]"
              >
                {body}
              </pre>
              <button
                className="btn btn-secondary mt-5"
                onClick={() => doCopy(body, "body")}
              >
                {copied === "body" ? "Copiata" : "Copia email"}
              </button>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 border-t border-[#e1e6e2] pt-5">
              <button
                className="btn btn-secondary"
                onClick={() => downloadTxt(txtName, textDocument)}
              >
                Scarica TXT
              </button>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  downloadTextPdf(pdfName, "Email di candidatura", [
                    { label: "Oggetto", content: subject },
                    { label: "Messaggio", content: body },
                  ])
                }
              >
                Scarica PDF
              </button>
            </div>
            <p className="mt-4 text-xs leading-5 text-[#65736f]">
              Controlla destinatario, oggetto, testo e allegati prima
              dell’invio.
            </p>
          </>
        ) : null
      }
    />
  );
}

function GeneratorLayout({
  inputs,
  output,
}: {
  inputs: React.ReactNode;
  output: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card grid content-start gap-4 p-5 sm:grid-cols-2 sm:p-7">
        {inputs}
      </div>
      <div className="card min-w-0 p-5 sm:p-7">
        {output ?? (
          <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-[#cad5cd] bg-[#f7f8f4] text-center text-[#65736f]">
            La bozza apparirà qui. Generala per attivare copia e download.
          </div>
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
