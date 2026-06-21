"use client";

import Link from "next/link";
import { useState } from "react";
import { templates, type CvTemplateId } from "@/data/content";

const checks = [
  "Contatti corretti",
  "Profilo professionale chiaro",
  "Esperienze in ordine cronologico inverso",
  "Competenze pertinenti",
  "Lingue indicate chiaramente",
  "Privacy inserita",
  "File PDF con nome professionale",
  "CV adattato all’annuncio",
  "Lunghezza controllata",
  "Errori di battitura controllati",
];

export function Checklist() {
  const [done, setDone] = useState<string[]>([]);
  const progress = Math.round((done.length / checks.length) * 100);
  return (
    <div className="card mx-auto max-w-3xl p-5 sm:p-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="eyebrow">Progresso</p>
          <h2 className="mt-2 text-3xl font-black">{progress}% completato</h2>
        </div>
        <span className="text-sm font-bold text-[#65736f]">
          {done.length}/{checks.length}
        </span>
      </div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#e5ebe6]">
        <div
          className="h-full rounded-full bg-[#176b4d] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-7 grid gap-3">
        {checks.map((item) => (
          <label
            className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${done.includes(item) ? "border-[#9bc4aa] bg-[#eff7f1]" : "border-[#dfe5df] bg-white"}`}
            key={item}
          >
            <input
              className="mt-1 size-4 accent-[#176b4d]"
              type="checkbox"
              checked={done.includes(item)}
              onChange={() =>
                setDone(
                  done.includes(item)
                    ? done.filter((x) => x !== item)
                    : [...done, item],
                )
              }
            />
            <span className="font-bold">{item}</span>
          </label>
        ))}
      </div>
      {progress === 100 && (
        <p className="mt-6 rounded-xl bg-[#176b4d] p-4 text-sm font-bold text-white">
          Controllo completato. Fai un’ultima lettura del PDF come se fossi il
          destinatario.
        </p>
      )}
    </div>
  );
}

const questions = [
  {
    text: "Quale situazione descrive meglio il tuo profilo?",
    key: "profile",
    answers: [
      ["Studente o primo lavoro", "primo-lavoro"],
      ["Manager o profilo senior", "executive-premium"],
      ["Ruolo tecnico, IT o logistica", "tecnico-ordinato"],
      ["Retail, hospitality o front office", "retail-hospitality"],
      ["Sanità, assistenza o cura", "sanitario-pulito"],
      ["Creativo, marketing o digital", "portfolio-leggero"],
      ["Voglio un CV breve e diretto", "compatto-una-pagina"],
      ["Profilo professionale trasversale", "moderno"],
    ],
  },
  {
    text: "In quale contesto ti candidi?",
    key: "context",
    answers: [
      ["Azienda con candidatura online", "ats"],
      ["Candidatura diretta o networking", "moderno"],
      ["Ente o contesto tradizionale", "classico"],
      ["Contesto che valorizza personalità", "creativo"],
    ],
  },
  {
    text: "Cosa vuoi privilegiare?",
    key: "priority",
    answers: [
      ["Massima semplicità", "ats"],
      ["Equilibrio tra stile e chiarezza", "moderno"],
      ["Un tocco personale", "creativo"],
    ],
  },
];

export function TemplateQuiz() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const complete = Object.keys(answers).length === questions.length;
  const profile = answers.profile as CvTemplateId | undefined;
  const resultId: CvTemplateId =
    profile && profile !== "moderno"
      ? profile
      : ((answers.context || answers.priority || "moderno") as CvTemplateId);
  const result = templates.find((item) => item.id === resultId)!;
  const why: Record<CvTemplateId, string> = {
    "primo-lavoro":
      "Dà più spazio a formazione, progetti e competenze trasferibili.",
    classico:
      "Mantiene una struttura sobria, familiare e adatta a percorsi consolidati.",
    creativo: "Aggiunge personalità visiva conservando una gerarchia chiara.",
    ats: "Privilegia una colonna e titoli standard per le candidature online.",
    moderno:
      "Bilancia leggibilità, personalità e una presentazione contemporanea.",
    "compatto-una-pagina":
      "Riduce gli spazi e mantiene il percorso concentrato in una presentazione diretta.",
    "executive-premium":
      "Dà gerarchia a responsabilità, impatto e autorevolezza di un profilo senior.",
    "tecnico-ordinato":
      "Separa con chiarezza strumenti, competenze e contenuti tecnici.",
    "retail-hospitality":
      "Valorizza servizio al cliente, lingue, disponibilità e concretezza operativa.",
    "sanitario-pulito":
      "Mette in evidenza qualifiche, contesti assistenziali e disponibilità con uno stile calmo.",
    "portfolio-leggero":
      "Dà più evidenza a portfolio e presenza digitale mantenendo il CV leggibile.",
  };
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
      <div className="card grid gap-5 p-5 sm:p-7">
        {questions.map((q, index) => (
          <fieldset key={q.key}>
            <legend className="font-bold">
              <span className="mr-2 text-[#176b4d]">{index + 1}.</span>
              {q.text}
            </legend>
            <div
              className={`mt-3 grid gap-2 ${q.answers.length > 4 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}
            >
              {q.answers.map(([label, value]) => (
                <button
                  onClick={() => setAnswers({ ...answers, [q.key]: value })}
                  className={`rounded-xl border p-3 text-left text-sm font-bold transition ${answers[q.key] === value ? "border-[#176b4d] bg-[#e8f1ec] text-[#0d4f38]" : "border-[#dfe5df] bg-white hover:border-[#9db9a6]"}`}
                  key={value}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="card p-6">
        {complete ? (
          <>
            <p className="eyebrow">Modello consigliato</p>
            <h2 className="title-md mt-4">{result.name}</h2>
            <p className="mt-4 leading-7 text-[#5e6c69]">{why[resultId]}</p>
            <p className="mt-4 text-sm leading-6 text-[#5e6c69]">
              Il risultato è un orientamento: contenuti e requisiti
              dell’annuncio restano la priorità.
            </p>
            <Link
              className="btn btn-primary mt-7"
              href={`/crea-cv?template=${resultId}`}
            >
              Crea il CV <span>→</span>
            </Link>
          </>
        ) : (
          <div className="grid min-h-72 place-items-center text-center text-[#65736f]">
            Rispondi alle tre domande per vedere il modello consigliato.
          </div>
        )}
      </div>
    </div>
  );
}
