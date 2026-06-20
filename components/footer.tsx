import Link from "next/link";

const groups = [
  { title: "Prodotto", links: [["Crea CV", "/crea-cv"], ["Controllo ATS", "/strumenti/controllo-cv-ats"], ["Modelli CV", "/modelli-curriculum-vitae"], ["Strumenti", "/strumenti"]] },
  { title: "Risorse", links: [["CV senza esperienza", "/cv-senza-esperienza"], ["CV studente", "/cv-studente"], ["CV commessa", "/cv-commessa"], ["CV magazziniere", "/cv-magazziniere"]] },
  { title: "Informazioni", links: [["Chi siamo", "/chi-siamo"], ["Privacy", "/privacy"], ["Termini", "/termini"], ["Contatti", "/contatti"]] },
];

export function Footer() {
  return <footer className="mt-auto border-t border-[#dfe5df] bg-[#f0f1eb]"><div className="container-site grid gap-10 py-14 md:grid-cols-[1.3fr_2fr]"><div><Link href="/" className="text-xl font-black">creailcv.it</Link><p className="mt-4 max-w-sm text-sm leading-6 text-[#5e6c69]">Strumenti italiani per creare, controllare, adattare e inviare una candidatura più curata. Senza promesse facili.</p></div><div className="grid grid-cols-2 gap-8 sm:grid-cols-3">{groups.map((group) => <div key={group.title}><h2 className="text-sm font-black">{group.title}</h2><ul className="mt-4 grid gap-3 text-sm text-[#5e6c69]">{group.links.map(([label, href]) => <li key={href}><Link className="hover:text-[#176b4d]" href={href}>{label}</Link></li>)}</ul></div>)}</div></div><div className="border-t border-[#d8ded8]"><div className="container-site flex flex-col gap-2 py-5 text-xs text-[#697671] sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} creailcv.it</span><span>Il punteggio ATS è orientativo, non una garanzia di selezione.</span></div></div></footer>;
}
