"use client";

import Link from "next/link";
import { useState } from "react";

const checks = ["Contatti corretti", "Profilo professionale chiaro", "Esperienze in ordine cronologico inverso", "Competenze pertinenti", "Lingue indicate chiaramente", "Privacy inserita", "File PDF con nome professionale", "CV adattato all’annuncio", "Lunghezza controllata", "Errori di battitura controllati"];

export function Checklist() {
  const [done, setDone] = useState<string[]>([]); const progress = Math.round(done.length / checks.length * 100);
  return <div className="card mx-auto max-w-3xl p-5 sm:p-8"><div className="flex items-end justify-between"><div><p className="eyebrow">Progresso</p><h2 className="mt-2 text-3xl font-black">{progress}% completato</h2></div><span className="text-sm font-bold text-[#65736f]">{done.length}/{checks.length}</span></div><div className="mt-5 h-3 overflow-hidden rounded-full bg-[#e5ebe6]"><div className="h-full rounded-full bg-[#176b4d] transition-all" style={{ width: `${progress}%` }} /></div><div className="mt-7 grid gap-3">{checks.map((item) => <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${done.includes(item) ? "border-[#9bc4aa] bg-[#eff7f1]" : "border-[#dfe5df] bg-white"}`} key={item}><input className="mt-1 size-4 accent-[#176b4d]" type="checkbox" checked={done.includes(item)} onChange={() => setDone(done.includes(item) ? done.filter((x) => x !== item) : [...done, item])} /><span className="font-bold">{item}</span></label>)}</div>{progress === 100 && <p className="mt-6 rounded-xl bg-[#176b4d] p-4 text-sm font-bold text-white">Controllo completato. Fai un’ultima lettura del PDF come se fossi il destinatario.</p>}</div>;
}

const questions = [
  { text: "Qual è il tuo livello di esperienza?", key: "level", answers: [["Sto cercando il primo lavoro", "first"], ["Ho già esperienze pertinenti", "pro"], ["Ho un percorso lungo e formale", "classic"]] },
  { text: "In quale contesto ti candidi?", key: "context", answers: [["Azienda con candidatura online", "ats"], ["Settore creativo o comunicazione", "creative"], ["Ente o contesto tradizionale", "classic"]] },
  { text: "Cosa vuoi privilegiare?", key: "priority", answers: [["Massima semplicità", "ats"], ["Equilibrio tra stile e chiarezza", "modern"], ["Un tocco personale", "creative"]] },
];

export function TemplateQuiz() {
  const [answers, setAnswers] = useState<Record<string,string>>({}); const complete = Object.keys(answers).length === questions.length;
  const values = Object.values(answers); const result = values.includes("first") ? "CV per primo lavoro" : values.filter((x) => x === "classic").length >= 2 ? "CV classico" : values.filter((x) => x === "creative").length >= 2 ? "CV creativo pulito" : values.includes("ats") ? "CV ATS semplice" : "CV moderno professionale";
  const why: Record<string,string> = { "CV per primo lavoro": "Dà più spazio a formazione, progetti e competenze trasferibili.", "CV classico": "Mantiene una struttura sobria, familiare e adatta a percorsi consolidati.", "CV creativo pulito": "Aggiunge personalità visiva conservando una gerarchia chiara.", "CV ATS semplice": "Privilegia una colonna e titoli standard per le candidature online.", "CV moderno professionale": "Bilancia leggibilità, personalità e una presentazione contemporanea." };
  return <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]"><div className="card grid gap-5 p-5 sm:p-7">{questions.map((q, index) => <fieldset key={q.key}><legend className="font-bold"><span className="mr-2 text-[#176b4d]">{index + 1}.</span>{q.text}</legend><div className="mt-3 grid gap-2 sm:grid-cols-3">{q.answers.map(([label,value]) => <button onClick={() => setAnswers({ ...answers, [q.key]: value })} className={`rounded-xl border p-3 text-left text-sm font-bold transition ${answers[q.key] === value ? "border-[#176b4d] bg-[#e8f1ec] text-[#0d4f38]" : "border-[#dfe5df] bg-white hover:border-[#9db9a6]"}`} key={value}>{label}</button>)}</div></fieldset>)}</div><div className="card p-6">{complete ? <><p className="eyebrow">Modello consigliato</p><h2 className="title-md mt-4">{result}</h2><p className="mt-4 leading-7 text-[#5e6c69]">{why[result]}</p><p className="mt-4 text-sm leading-6 text-[#5e6c69]">Il risultato è un orientamento: contenuti e requisiti dell’annuncio restano la priorità.</p><Link className="btn btn-primary mt-7" href="/crea-cv">Crea il CV <span>→</span></Link></> : <div className="grid min-h-72 place-items-center text-center text-[#65736f]">Rispondi alle tre domande per vedere il modello consigliato.</div>}</div></div>;
}
