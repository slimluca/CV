const stopWords = new Set("anche avere come con dalla delle della dello degli che per tra una uno gli nel nella sono essere più non alla alle dei del sul sui sua suo questo questa lavoro ruolo esperienza azienda candidato candidata ricerca richiesta richieste".split(" "));

export function words(text: string) {
  const matches = text.toLocaleLowerCase("it").normalize("NFD").replace(/[\u0300-\u036f]/g, "").match(/[a-z][a-z0-9+#.-]{2,}/g) ?? [];
  return matches.map((word) => word.replace(/[.-]+$/g, "")).filter((word) => word.length >= 3);
}

export function extractKeywords(text: string, limit = 18) {
  const counts = new Map<string, number>();
  words(text).filter((word) => !stopWords.has(word)).forEach((word) => counts.set(word, (counts.get(word) ?? 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, limit).map(([word]) => word);
}

const sectionTests = [
  ["Profilo professionale", /profilo|obiettivo professionale|presentazione/i],
  ["Esperienze lavorative", /esperienz|lavor|occupazione/i],
  ["Istruzione e formazione", /istruzione|formazione|diploma|laurea/i],
  ["Competenze", /competenz|skill|capacità/i],
  ["Lingue", /lingu[ae]|inglese|francese|tedesco|spagnolo/i],
] as const;

export function analyzeCv(text: string) {
  const clean = text.trim();
  const wordCount = words(clean).length;
  const hasEmail = /[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(clean);
  const hasPhone = /(?:\+39\s?)?(?:\d[\s.-]?){9,10}/.test(clean);
  const sections = sectionTests.filter(([, regex]) => regex.test(clean)).map(([name]) => name);
  const missing = sectionTests.filter(([, regex]) => !regex.test(clean)).map(([name]) => name);
  const checks = [
    { ok: hasEmail && hasPhone, good: "Email e telefono sono riconoscibili", bad: "Aggiungi email e telefono in formato testuale" },
    { ok: /profilo|obiettivo professionale|presentazione/i.test(clean), good: "È presente un profilo professionale", bad: "Inserisci un breve profilo professionale" },
    { ok: /esperienz|istruzione|formazione/i.test(clean), good: "Esperienza o formazione sono riconoscibili", bad: "Rendi riconoscibili esperienza o formazione" },
    { ok: /competenz|skill|capacità/i.test(clean), good: "La sezione competenze è presente", bad: "Aggiungi una sezione Competenze" },
    { ok: sections.length >= 4, good: "I titoli di sezione sono abbastanza chiari", bad: "Usa titoli di sezione standard e facili da riconoscere" },
    { ok: /privacy|regolamento.*679|trattamento dei dati/i.test(clean), good: "È presente un riferimento privacy", bad: "Valuta l’inserimento dell’autorizzazione al trattamento dei dati" },
    { ok: wordCount >= 120, good: "Il CV contiene abbastanza informazioni per una prima valutazione", bad: "Il testo è molto breve: aggiungi dettagli concreti" },
    { ok: wordCount <= 950, good: "La lunghezza è gestibile", bad: "Il testo è molto lungo: riduci ripetizioni e contenuti meno pertinenti" },
  ];
  const score = clean ? Math.round(checks.filter((check) => check.ok).length / checks.length * 100) : 0;
  return { score, wordCount, missing, strengths: checks.filter((x) => x.ok).map((x) => x.good), issues: checks.filter((x) => !x.ok).map((x) => x.bad), keywords: extractKeywords(clean, 10) };
}

export function matchTexts(cv: string, advert: string) {
  const adKeywords = extractKeywords(advert, 24);
  const cvSet = new Set(words(cv));
  const found = adKeywords.filter((keyword) => cvSet.has(keyword));
  const missing = adKeywords.filter((keyword) => !cvSet.has(keyword));
  const score = adKeywords.length ? Math.round(found.length / adKeywords.length * 100) : 0;
  return { score, found, missing };
}
