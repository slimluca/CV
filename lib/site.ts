import type { Metadata } from "next";

export const siteUrl = "https://creailcv.it";
export const siteName = "creailcv.it";

export function pageMetadata(
  title: string,
  description: string,
  path = "",
): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "it_IT",
      type: "website",
    },
  };
}

export const routes = [
  "",
  "crea-cv",
  "cv-ats",
  "strumenti",
  "strumenti/controllo-cv-ats",
  "strumenti/confronta-cv-annuncio",
  "strumenti/generatore-lettera-presentazione",
  "strumenti/email-candidatura",
  "strumenti/checklist-cv",
  "strumenti/quiz-modello-cv",
  "strumenti/generatore-profilo-cv",
  "strumenti/competenze-cv",
  "strumenti/parole-chiave-cv",
  "modelli-curriculum-vitae",
  "curriculum-vitae-gratis",
  "curriculum-vitae-online",
  "curriculum-vitae-europeo",
  "cv-senza-esperienza",
  "cv-studente",
  "cv-commessa",
  "cv-cameriere",
  "cv-operaio",
  "cv-magazziniere",
  "lettera-di-presentazione",
  "cv-barista",
  "cv-cassiere",
  "cv-receptionist",
  "cv-segretaria",
  "cv-infermiere",
  "cv-oss",
  "cv-badante",
  "cv-autista",
  "cv-contabile",
  "cv-sviluppatore",
  "cv-neolaureato",
  "cv-stage",
  "cv-candidatura-spontanea",
  "cv-cambio-lavoro",
  "email-candidatura",
  "chi-siamo",
  "privacy",
  "termini",
  "contatti",
];
