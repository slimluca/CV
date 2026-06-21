const stopWords = new Set(
  "anche avere come con dalla delle della dello degli che per tra una uno gli nel nella sono essere più non alla alle dei del sul sui sua suo questo questa lavoro ruolo esperienza azienda candidato candidata ricerca richiesta richieste".split(
    " ",
  ),
);

export function words(text: string) {
  const matches =
    text
      .toLocaleLowerCase("it")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .match(/[a-z][a-z0-9+#.-]{2,}/g) ?? [];
  return matches
    .map((word) => word.replace(/[.-]+$/g, ""))
    .filter((word) => word.length >= 3);
}

export function extractKeywords(text: string, limit = 18) {
  const counts = new Map<string, number>();
  words(text)
    .filter((word) => !stopWords.has(word))
    .forEach((word) => counts.set(word, (counts.get(word) ?? 0) + 1));
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([word]) => word);
}

const sectionTests = [
  ["Profilo professionale", /profilo|obiettivo professionale|presentazione/i],
  [
    "Esperienze lavorative",
    /esperienze lavorative|esperienza professionale|occupazione/i,
  ],
  ["Istruzione e formazione", /istruzione|formazione|diploma|laurea/i],
  ["Competenze", /competenz|skill|capacità/i],
  ["Lingue", /lingu[ae]|inglese|francese|tedesco|spagnolo/i],
] as const;

type AnalysisContext = { completeness?: number };

export function analyzeCv(text: string, context: AnalysisContext = {}) {
  const clean = text.trim();
  const wordCount = words(clean).length;
  const hasEmail = /[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(clean);
  const hasPhone = /(?:\+39\s?)?(?:\d[\s.-]?){9,10}/.test(clean);
  const hasRole =
    /ruolo desiderato|obiettivo professionale|\b(?:addett[oa]|responsabile|specialista|manager|developer|impiegat[oa]|operai[oa]|camerier[ea]|magazzinier[ea])\b/i.test(
      clean,
    );
  const hasProfile =
    wordCount >= 12 &&
    /profilo|obiettivo professionale|presentazione/i.test(clean);
  const hasExperienceOrEducation =
    wordCount >= 15 &&
    /esperienze lavorative|esperienza professionale|istruzione|formazione|diploma|laurea/i.test(
      clean,
    );
  const hasSkills = wordCount >= 12 && /competenz|skill|capacità/i.test(clean);
  const hasPrivacy = /privacy|regolamento.*679|trattamento dei dati/i.test(
    clean,
  );
  const sections = sectionTests
    .filter(([, regex]) => regex.test(clean))
    .map(([name]) => name);
  const missing = sectionTests
    .filter(([, regex]) => !regex.test(clean))
    .map(([name]) => name);
  const hasStructure = wordCount >= 40 && sections.length >= 4;
  const hasReasonableLength = wordCount >= 60 && wordCount <= 950;
  const checks = [
    {
      ok: hasEmail,
      weight: 8,
      good: "L’email è riconoscibile",
      bad: "Aggiungi un indirizzo email in formato testuale",
    },
    {
      ok: hasPhone,
      weight: 7,
      good: "Il telefono è riconoscibile",
      bad: "Aggiungi un numero di telefono leggibile",
    },
    {
      ok: hasRole,
      weight: 10,
      good: "Il ruolo obiettivo è riconoscibile",
      bad: "Indica chiaramente il ruolo o l’obiettivo professionale",
    },
    {
      ok: hasProfile,
      weight: 15,
      good: "È presente un profilo professionale",
      bad: "Inserisci un breve profilo professionale",
    },
    {
      ok: hasExperienceOrEducation,
      weight: 15,
      good: "Esperienza o formazione sono riconoscibili",
      bad: "Rendi riconoscibili esperienza o formazione",
    },
    {
      ok: hasSkills,
      weight: 15,
      good: "La sezione competenze è presente",
      bad: "Aggiungi una sezione Competenze",
    },
    {
      ok: hasStructure,
      weight: 15,
      good: "I titoli di sezione sono abbastanza chiari",
      bad: "Usa titoli di sezione standard e facili da riconoscere",
    },
    {
      ok: hasPrivacy,
      weight: 5,
      good: "È presente un riferimento privacy",
      bad: "Valuta l’inserimento dell’autorizzazione al trattamento dei dati",
    },
    {
      ok: hasReasonableLength,
      weight: 10,
      good: "La lunghezza è gestibile",
      bad:
        wordCount > 950
          ? "Il testo è molto lungo: riduci ripetizioni e contenuti meno pertinenti"
          : "Il testo è ancora breve: aggiungi dettagli concreti",
    },
  ];
  const rawScore = clean
    ? checks.reduce((total, check) => total + (check.ok ? check.weight : 0), 0)
    : 0;
  const inferredCompleteness = Math.round(
    ([
      hasEmail,
      hasPhone,
      hasRole,
      hasProfile,
      hasExperienceOrEducation,
      hasSkills,
      hasStructure,
      hasPrivacy,
    ].filter(Boolean).length /
      8) *
      100,
  );
  const completeness = context.completeness ?? inferredCompleteness;
  const cap =
    completeness < 30
      ? 35
      : completeness < 50
        ? 55
        : completeness < 70
          ? 70
          : completeness < 85
            ? 85
            : 100;
  const score = Math.min(rawScore, cap);
  return {
    score,
    wordCount,
    missing,
    strengths: checks.filter((x) => x.ok).map((x) => x.good),
    issues: checks.filter((x) => !x.ok).map((x) => x.bad),
    keywords: extractKeywords(clean, 10),
  };
}

export function matchTexts(cv: string, advert: string) {
  const adKeywords = extractKeywords(advert, 24);
  const cvSet = new Set(words(cv));
  const found = adKeywords.filter((keyword) => cvSet.has(keyword));
  const missing = adKeywords.filter((keyword) => !cvSet.has(keyword));
  const score = adKeywords.length
    ? Math.round((found.length / adKeywords.length) * 100)
    : 0;
  return { score, found, missing };
}
