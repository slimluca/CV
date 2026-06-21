import type { CvTemplateId, FaqItem } from "@/data/content";

export type SeoProfession = {
  title: string;
  description: string;
  role: string;
  intro: string;
  expectations: string[];
  highlights: string[];
  profile: string;
  bullets: string[];
  skills: string[];
  keywords: string[];
  mistakes: string[];
  template: CvTemplateId;
  faqs: FaqItem[];
};

const profession = (data: SeoProfession) => data;
export const seoProfessionPages: Record<string, SeoProfession> = {
  "cv-barista": profession({
    title: "CV da barista: esempio, competenze e consigli",
    description:
      "Prepara un CV da barista concreto con profilo, competenze di banco e parole chiave pertinenti.",
    role: "Barista",
    intro:
      "Un CV da barista efficace fa capire subito quali servizi sai gestire, come lavori con il pubblico e quanto sei autonomo al banco. Specifica contesto, turni e strumenti senza gonfiare l’esperienza.",
    expectations: [
      "Rapidità e precisione nelle ore di punta",
      "Accoglienza e comunicazione con i clienti",
      "Igiene, ordine e gestione della postazione",
    ],
    highlights: [
      "Caffetteria, colazioni, aperitivi o servizio al tavolo",
      "Uso di macchina espresso, cassa e sistemi comanda",
      "Disponibilità a turni solo quando reale",
    ],
    profile:
      "Barista con esperienza nella caffetteria, preparazione colazioni e servizio al banco. Abituato a gestire cassa, riordino della postazione e relazione con il cliente nei momenti di maggiore affluenza.",
    bullets: [
      "Preparato caffetteria e bevande mantenendo ordine e continuità del servizio",
      "Gestito pagamenti, chiusura cassa e rifornimento del banco",
      "Collaborato con sala e cucina durante i turni intensi",
    ],
    skills: [
      "Caffetteria",
      "Servizio al banco",
      "Gestione cassa",
      "HACCP",
      "Mise en place",
      "Accoglienza clienti",
    ],
    keywords: [
      "macchina espresso",
      "caffetteria",
      "servizio banco",
      "HACCP",
      "turni",
      "cassa",
    ],
    mistakes: [
      "Elencare bevande senza descrivere il servizio",
      "Dichiarare autonomia completa se non acquisita",
      "Omettere formazione igienico-sanitaria pertinente",
    ],
    template: "ats",
    faqs: [
      {
        question: "Serve indicare il tipo di locale?",
        answer:
          "Sì: bar, hotel, pasticceria e locale serale richiedono ritmi e servizi diversi. Una riga di contesto rende l’esperienza più comprensibile.",
      },
      {
        question: "Come presentarsi senza esperienza?",
        answer:
          "Metti in evidenza corsi, lavori a contatto con il pubblico, disponibilità e capacità operative realmente dimostrabili.",
      },
    ],
  }),
  "cv-cassiere": profession({
    title: "CV da cassiere: profilo, competenze ed esempi",
    description:
      "Scrivi un CV da cassiere chiaro per supermercati e negozi, con attività verificabili e competenze utili.",
    role: "Cassiere",
    intro:
      "Nel CV da cassiere contano affidabilità, precisione e qualità del contatto con il cliente. Descrivi i sistemi usati, le responsabilità sulla cassa e le attività di supporto al punto vendita.",
    expectations: [
      "Correttezza nelle operazioni di pagamento",
      "Gestione calma di code, resi e richieste",
      "Rispetto delle procedure del punto vendita",
    ],
    highlights: [
      "POS, contanti, buoni e chiusura cassa",
      "Assistenza clienti e gestione resi",
      "Riassortimento o inventario se svolti",
    ],
    profile:
      "Cassiere con esperienza nella gestione di pagamenti, assistenza al cliente e procedure di apertura e chiusura cassa. Preciso nelle operazioni e disponibile a supportare riassortimento e ordine del punto vendita.",
    bullets: [
      "Gestito pagamenti con POS, contanti e buoni secondo le procedure interne",
      "Fornito assistenza su resi, promozioni e richieste dei clienti",
      "Supportato riassortimento e controllo dell’area casse",
    ],
    skills: [
      "Gestione cassa",
      "POS",
      "Assistenza clienti",
      "Resi",
      "Riassortimento",
      "Precisione operativa",
    ],
    keywords: [
      "apertura cassa",
      "chiusura cassa",
      "pagamenti",
      "GDO",
      "fidelizzazione",
      "inventario",
    ],
    mistakes: [
      "Scrivere solo “uso cassa”",
      "Inventare valori di incasso",
      "Trascurare il rapporto con il cliente",
    ],
    template: "ats",
    faqs: [
      {
        question: "Devo indicare gli importi gestiti?",
        answer:
          "Solo se il dato è verificabile e utile. Di solito procedure, strumenti e responsabilità spiegano meglio il livello di autonomia.",
      },
      {
        question: "Il lavoro stagionale è utile?",
        answer:
          "Sì, soprattutto se chiarisci volume del punto vendita, attività e competenze acquisite.",
      },
    ],
  }),
  "cv-receptionist": profession({
    title: "CV da receptionist: esempio e competenze",
    description:
      "Crea un CV da receptionist con lingue, accoglienza, prenotazioni e strumenti gestionali ben evidenziati.",
    role: "Receptionist",
    intro:
      "Un receptionist rappresenta il primo contatto con ospiti e clienti. Il CV deve unire capacità relazionali, organizzazione, lingue e padronanza degli strumenti usati davvero.",
    expectations: [
      "Accoglienza professionale e gestione delle priorità",
      "Comunicazione telefonica ed email accurata",
      "Uso ordinato di prenotazioni e documentazione",
    ],
    highlights: [
      "Settore: hotel, studio, azienda o struttura sanitaria",
      "Lingue con livello realistico",
      "PMS, centralino, agenda e fatturazione se pertinenti",
    ],
    profile:
      "Receptionist con esperienza nell’accoglienza, gestione prenotazioni e assistenza telefonica. Utilizzo di agenda digitale e strumenti gestionali, con buona conoscenza dell’inglese e attenzione alla riservatezza.",
    bullets: [
      "Gestito check-in, check-out e richieste degli ospiti",
      "Coordinato prenotazioni, email e comunicazioni con i reparti",
      "Aggiornato dati e documenti nel gestionale rispettando le procedure",
    ],
    skills: [
      "Accoglienza",
      "Prenotazioni",
      "Centralino",
      "Inglese",
      "PMS",
      "Gestione agenda",
    ],
    keywords: [
      "front office",
      "check-in",
      "check-out",
      "booking",
      "customer care",
      "privacy",
    ],
    mistakes: [
      "Definirsi bilingue senza livello adeguato",
      "Omettere il tipo di struttura",
      "Confondere cordialità con competenza organizzativa",
    ],
    template: "moderno",
    faqs: [
      {
        question: "Come indicare le lingue?",
        answer:
          "Usa livelli realistici e specifica se le hai impiegate con ospiti, al telefono o nella corrispondenza.",
      },
      {
        question: "La foto è necessaria?",
        answer:
          "No. Valuta il contesto, ma privilegia sempre esperienza, lingue e strumenti pertinenti.",
      },
    ],
  }),
  "cv-segretaria": profession({
    title: "CV da segretaria: esempio professionale",
    description:
      "Organizza un CV da segretaria con amministrazione, agenda, documenti e competenze digitali concrete.",
    role: "Segretaria",
    intro:
      "Il CV da segretaria deve mostrare ordine, riservatezza e capacità di far funzionare attività quotidiane diverse. Indica documenti, strumenti e interlocutori gestiti.",
    expectations: [
      "Organizzazione affidabile di agenda e scadenze",
      "Comunicazione scritta e telefonica corretta",
      "Riservatezza nella gestione dei dati",
    ],
    highlights: [
      "Tipologia di ufficio o studio",
      "Microsoft 365, gestionali e protocolli",
      "Fatture, prima nota o archivio solo se realmente gestiti",
    ],
    profile:
      "Segretaria con esperienza nella gestione di agenda, corrispondenza, documenti e contatti con clienti e fornitori. Buona padronanza di Microsoft 365 e attenzione a scadenze, precisione e riservatezza.",
    bullets: [
      "Organizzato appuntamenti, riunioni e scadenze condivise",
      "Gestito email, telefonate, archivio digitale e documentazione",
      "Supportato fatturazione e rapporti con fornitori secondo le procedure",
    ],
    skills: [
      "Gestione agenda",
      "Microsoft 365",
      "Archivio",
      "Corrispondenza",
      "Fatturazione base",
      "Centralino",
    ],
    keywords: [
      "segreteria",
      "back office",
      "protocollo",
      "prima nota",
      "gestione documentale",
      "fornitori",
    ],
    mistakes: [
      "Usare solo qualità personali",
      "Elencare software mai utilizzati",
      "Non distinguere attività amministrative e organizzative",
    ],
    template: "classico",
    faqs: [
      {
        question: "Segretaria e impiegata amministrativa sono la stessa cosa?",
        answer:
          "Non sempre. Usa il titolo più fedele alle mansioni e descrivi con precisione le attività amministrative svolte.",
      },
      {
        question: "Come valorizzare la riservatezza?",
        answer:
          "Collegala a dati, documenti o interlocutori gestiti, senza rivelare informazioni confidenziali.",
      },
    ],
  }),
  "cv-infermiere": profession({
    title: "CV da infermiere: competenze cliniche ed esempio",
    description:
      "Prepara un CV da infermiere con reparto, procedure, iscrizione e competenze cliniche presentate con chiarezza.",
    role: "Infermiere",
    intro:
      "Nel CV infermieristico servono precisione e contesto: reparto, tipologia di pazienti, procedure svolte e collaborazione multidisciplinare. Titoli e iscrizioni devono essere aggiornati e verificabili.",
    expectations: [
      "Assistenza sicura e conforme alle procedure",
      "Comunicazione con pazienti, familiari ed équipe",
      "Tracciabilità accurata della documentazione clinica",
    ],
    highlights: [
      "Laurea, iscrizione OPI e formazione ECM",
      "Reparti e contesti assistenziali",
      "Procedure praticate nel proprio ambito di competenza",
    ],
    profile:
      "Infermiere con esperienza nell’assistenza a pazienti adulti, monitoraggio dei parametri e gestione della terapia secondo prescrizione. Abituato a collaborare con équipe multidisciplinari e a curare documentazione e continuità assistenziale.",
    bullets: [
      "Pianificato e documentato interventi assistenziali in collaborazione con l’équipe",
      "Monitorato parametri e segnalato tempestivamente variazioni cliniche",
      "Educato pazienti e familiari alla gestione del percorso assistenziale",
    ],
    skills: [
      "Assistenza infermieristica",
      "Terapia",
      "Monitoraggio",
      "Cartella clinica",
      "Educazione sanitaria",
      "Lavoro d’équipe",
    ],
    keywords: [
      "OPI",
      "ECM",
      "triage",
      "continuità assistenziale",
      "risk management",
      "procedure cliniche",
    ],
    mistakes: [
      "Elencare procedure fuori competenza",
      "Omettere reparto e popolazione assistita",
      "Indicare iscrizioni non aggiornate",
    ],
    template: "classico",
    faqs: [
      {
        question: "Dove inserire l’iscrizione OPI?",
        answer:
          "Nella sezione titoli o abilitazioni, con provincia e numero solo se desideri renderlo disponibile nel CV.",
      },
      {
        question: "Come descrivere i tirocini?",
        answer:
          "Indica struttura, area, periodo e attività svolte sotto supervisione, distinguendoli chiaramente dal lavoro autonomo.",
      },
    ],
  }),
  "cv-oss": profession({
    title: "CV OSS: esempio, competenze e parole chiave",
    description:
      "Crea un CV da operatore socio sanitario con qualifica, assistenza di base e contesti di lavoro ben descritti.",
    role: "Operatore socio sanitario",
    intro:
      "Un CV OSS deve chiarire qualifica, contesto assistenziale e attività svolte nel rispetto del piano di lavoro. Concretezza e attenzione alla persona contano più delle formule generiche.",
    expectations: [
      "Assistenza di base rispettosa e sicura",
      "Osservazione e comunicazione con l’équipe",
      "Igiene, mobilizzazione e cura dell’ambiente",
    ],
    highlights: [
      "Qualifica OSS e formazione pertinente",
      "RSA, ospedale, domicilio o comunità",
      "Turni e disponibilità dichiarati correttamente",
    ],
    profile:
      "Operatore socio sanitario qualificato con esperienza nell’assistenza di base, igiene, mobilizzazione e supporto alle attività quotidiane. Attento alla dignità della persona e alla collaborazione con infermieri e familiari.",
    bullets: [
      "Supportato igiene, vestizione e mobilizzazione secondo il piano assistenziale",
      "Osservato e riferito cambiamenti rilevanti all’équipe",
      "Curato ordine, sanificazione e comfort dell’ambiente",
    ],
    skills: [
      "Assistenza di base",
      "Mobilizzazione",
      "Igiene",
      "Sanificazione",
      "Relazione d’aiuto",
      "Lavoro in équipe",
    ],
    keywords: [
      "OSS",
      "piano assistenziale",
      "RSA",
      "ADI",
      "non autosufficienza",
      "sicurezza",
    ],
    mistakes: [
      "Confondere mansioni OSS e infermieristiche",
      "Omettere la qualifica",
      "Usare frasi generiche senza contesto",
    ],
    template: "ats",
    faqs: [
      {
        question: "Posso inserire il tirocinio OSS?",
        answer:
          "Sì. Indica struttura, ore o periodo e attività svolte sotto supervisione.",
      },
      {
        question: "Come presentare l’assistenza domiciliare?",
        answer:
          "Descrivi bisogni assistenziali, attività e coordinamento con famiglia e servizi, rispettando la privacy.",
      },
    ],
  }),
  "cv-badante": profession({
    title: "CV da badante: esperienza e competenze",
    description:
      "Scrivi un CV da badante rispettoso e concreto, con assistenza quotidiana, disponibilità e referenze gestite correttamente.",
    role: "Assistente familiare",
    intro:
      "Il CV da badante deve costruire fiducia senza esporre dati sensibili delle persone assistite. Spiega autonomia, attività quotidiane, disponibilità e competenze linguistiche.",
    expectations: [
      "Affidabilità e rispetto della persona",
      "Supporto coerente con il livello di autonomia",
      "Comunicazione chiara con famiglia e servizi",
    ],
    highlights: [
      "Assistenza diurna, notturna o convivente",
      "Mobilità, pasti, igiene e accompagnamento",
      "Referenze solo con consenso",
    ],
    profile:
      "Assistente familiare con esperienza nel supporto quotidiano a persone anziane, preparazione pasti, accompagnamento e cura dell’ambiente domestico. Paziente, affidabile e attenta alle indicazioni della famiglia e dei professionisti sanitari.",
    bullets: [
      "Supportato attività quotidiane rispettando abitudini e autonomia della persona",
      "Preparato pasti e accompagnato a visite e commissioni",
      "Mantenuto comunicazione regolare con familiari e operatori",
    ],
    skills: [
      "Assistenza anziani",
      "Preparazione pasti",
      "Accompagnamento",
      "Cura casa",
      "Italiano",
      "Relazione familiare",
    ],
    keywords: [
      "assistente familiare",
      "convivenza",
      "autosufficienza",
      "igiene personale",
      "commissioni",
      "referenze",
    ],
    mistakes: [
      "Inserire diagnosi o nomi degli assistiti",
      "Dichiarare competenze sanitarie non possedute",
      "Lasciare ambigua la disponibilità",
    ],
    template: "ats",
    faqs: [
      {
        question: "Posso indicare le referenze?",
        answer:
          "Sì, ma condividi contatti solo con il consenso delle persone interessate; puoi scrivere “referenze disponibili su richiesta”.",
      },
      {
        question: "Come indicare la convivenza?",
        answer:
          "Specifica chiaramente disponibilità diurna, notturna o convivente e gli eventuali limiti reali.",
      },
    ],
  }),
  "cv-autista": profession({
    title: "CV da autista: patenti, esperienza e profilo",
    description:
      "Prepara un CV da autista con patenti, CQC, mezzi, tratte e sicurezza presentati correttamente.",
    role: "Autista",
    intro:
      "Nel CV da autista devono essere immediati patenti, abilitazioni, mezzi e tipo di servizio. Sicurezza, puntualità e documentazione vanno collegate ad attività concrete.",
    expectations: [
      "Guida sicura e rispetto delle normative",
      "Gestione puntuale di tratte e documenti",
      "Controlli ordinari del mezzo",
    ],
    highlights: [
      "Categorie di patente e CQC in corso di validità",
      "Mezzi e tratte realmente gestiti",
      "ADR, carta tachigrafica o carico se pertinenti",
    ],
    profile:
      "Autista con esperienza in consegne regionali, controllo documenti e verifica quotidiana del mezzo. Patente C e CQC merci, attenzione alla sicurezza, alle tempistiche e alla corretta gestione del carico.",
    bullets: [
      "Eseguito consegne pianificando tratte e rispettando finestre concordate",
      "Controllato documenti di trasporto e condizioni del mezzo",
      "Segnalato anomalie e collaborato con magazzino per carico e scarico",
    ],
    skills: [
      "Guida professionale",
      "CQC",
      "DDT",
      "Pianificazione tratte",
      "Controllo mezzo",
      "Carico e scarico",
    ],
    keywords: [
      "patente C",
      "CQC merci",
      "tachigrafo",
      "logistica",
      "consegne",
      "sicurezza stradale",
    ],
    mistakes: [
      "Non indicare validità delle abilitazioni",
      "Elencare mezzi mai guidati",
      "Omettere tipologia di tratte",
    ],
    template: "ats",
    faqs: [
      {
        question: "Dove inserire patente e CQC?",
        answer:
          "In una sezione visibile dedicata ad abilitazioni e certificazioni, indicando la validità solo se aggiornata.",
      },
      {
        question: "Gli incidenti vanno dichiarati nel CV?",
        answer:
          "Il CV deve concentrarsi su qualifiche ed esperienza. Rispondi con correttezza se informazioni specifiche vengono richieste nel processo.",
      },
    ],
  }),
  "cv-contabile": profession({
    title: "CV da contabile: profilo, software e competenze",
    description:
      "Organizza un CV da contabile con ciclo attivo e passivo, adempimenti e software indicati in modo preciso.",
    role: "Contabile",
    intro:
      "Il CV contabile deve distinguere chiaramente attività svolte, livello di autonomia e strumenti. Usa termini tecnici pertinenti senza trasformare l’elenco in una sequenza di sigle.",
    expectations: [
      "Precisione e rispetto delle scadenze",
      "Conoscenza dei flussi amministrativi",
      "Uso affidabile di gestionali e fogli di calcolo",
    ],
    highlights: [
      "Ciclo attivo, passivo, prima nota e riconciliazioni",
      "Software gestionali realmente utilizzati",
      "Adempimenti gestiti e livello di supervisione",
    ],
    profile:
      "Contabile con esperienza nella registrazione di fatture, prima nota, riconciliazioni bancarie e supporto alle chiusure periodiche. Utilizzo di Excel e gestionale amministrativo, con attenzione a scadenze e controllo documentale.",
    bullets: [
      "Registrato fatture attive e passive verificando dati e centri di costo",
      "Eseguito riconciliazioni bancarie e controllo scadenziari",
      "Preparato documentazione di supporto per chiusure e consulente fiscale",
    ],
    skills: [
      "Contabilità generale",
      "Prima nota",
      "Riconciliazioni",
      "Excel",
      "Fatturazione elettronica",
      "Gestionali ERP",
    ],
    keywords: [
      "ciclo attivo",
      "ciclo passivo",
      "IVA",
      "cespiti",
      "bilancio",
      "scadenziario",
    ],
    mistakes: [
      "Dichiarare autonomia sul bilancio senza averla",
      "Elencare solo software",
      "Non distinguere registrazione e controllo",
    ],
    template: "classico",
    faqs: [
      {
        question: "Come indicare il gestionale?",
        answer:
          "Nominalo e collega l’uso a operazioni concrete, indicando se hai lavorato in autonomia o con supervisione.",
      },
      {
        question: "Posso inserire dati economici?",
        answer:
          "Solo se non riservati e realmente utili; evita dati riconducibili a clienti o aziende.",
      },
    ],
  }),
  "cv-sviluppatore": profession({
    title: "CV da sviluppatore: stack, progetti ed esempio",
    description:
      "Crea un CV da sviluppatore con stack, progetti e risultati tecnici leggibili anche dai recruiter.",
    role: "Sviluppatore software",
    intro:
      "Un CV da sviluppatore deve permettere una lettura a due livelli: impatto e contesto per il recruiter, tecnologie e scelte per chi valuta il profilo tecnico. Progetti e repository devono essere pertinenti e accessibili.",
    expectations: [
      "Fondamentali tecnici coerenti con il ruolo",
      "Collaborazione, versionamento e qualità del codice",
      "Capacità di spiegare impatto e compromessi",
    ],
    highlights: [
      "Stack distinto per competenza reale",
      "Progetti con problema, contributo e risultato",
      "GitHub o portfolio curati e senza materiale riservato",
    ],
    profile:
      "Sviluppatore software con esperienza in applicazioni web TypeScript e API. Abituato a lavorare con Git, test automatici e revisioni del codice, traducendo requisiti di prodotto in soluzioni manutenibili.",
    bullets: [
      "Sviluppato funzionalità web in TypeScript collaborando con prodotto e design",
      "Aggiunto test e controlli automatici riducendo regressioni nel flusso di rilascio",
      "Ottimizzato componenti e query dopo misurazioni riproducibili",
    ],
    skills: ["TypeScript", "React", "Node.js", "Git", "Testing", "API REST"],
    keywords: [
      "frontend",
      "backend",
      "CI/CD",
      "code review",
      "database",
      "cloud",
    ],
    mistakes: [
      "Elencare ogni tecnologia incontrata",
      "Descrivere progetti senza contributo personale",
      "Usare percentuali non misurate",
    ],
    template: "moderno",
    faqs: [
      {
        question: "Quanti progetti inserire?",
        answer:
          "Pochi e pertinenti. Per ciascuno chiarisci problema, tuo contributo, tecnologie e risultato verificabile.",
      },
      {
        question: "Il CV deve essere molto tecnico?",
        answer:
          "Deve restare leggibile. Metti impatto e responsabilità prima dei dettagli, usando lo stack per supportare il racconto.",
      },
    ],
  }),
};

export type SituationPage = {
  title: string;
  description: string;
  intro: string;
  audience: string;
  structure: string[];
  limited: string;
  profile: string;
  skills: string[];
  mistakes: string[];
  template: CvTemplateId;
  secondaryHref: string;
  secondaryLabel: string;
  faqs: FaqItem[];
};
export const situationPages: Record<string, SituationPage> = {
  "cv-neolaureato": {
    title: "CV neolaureato: valorizza studi e primi risultati",
    description:
      "Crea un CV da neolaureato concreto per primo impiego, graduate program e stage.",
    intro:
      "Il passaggio dall’università al lavoro richiede selezione, non riempimento. Porta in primo piano progetti, tirocinio, strumenti e interessi coerenti con il ruolo.",
    audience:
      "Neolaureati con stage, progetti accademici o prime collaborazioni da tradurre in prove di competenza.",
    structure: [
      "Profilo mirato al ruolo",
      "Formazione con tesi o progetti pertinenti",
      "Stage e attività concrete",
      "Competenze tecniche, digitali e linguistiche",
    ],
    limited:
      "Descrivi progetto, metodo, strumenti e risultato. Un laboratorio ben spiegato è più utile di aggettivi come dinamico o motivato.",
    profile:
      "Neolaureato in Economia interessato all’analisi commerciale, con esperienza di tirocinio nella preparazione di report e buona padronanza di Excel. Cerca un ruolo junior in cui applicare metodo quantitativo e attenzione al dettaglio.",
    skills: [
      "Excel",
      "Analisi dati",
      "Presentazioni",
      "Inglese",
      "Lavoro per progetti",
    ],
    mistakes: [
      "Inserire tutti gli esami",
      "Nascondere il ruolo desiderato",
      "Gonfiare attività universitarie",
    ],
    template: "primo-lavoro",
    secondaryHref: "/strumenti/generatore-lettera-presentazione",
    secondaryLabel: "Prepara la lettera",
    faqs: [
      {
        question: "La tesi va inserita?",
        answer:
          "Sì, quando tema, metodo o strumenti sono pertinenti al ruolo; bastano titolo sintetico e contributo.",
      },
      {
        question: "Meglio una pagina?",
        answer:
          "Per molti neolaureati una pagina ben selezionata è sufficiente.",
      },
    ],
  },
  "cv-stage": {
    title: "CV per stage: struttura ed esempio pratico",
    description:
      "Prepara un CV per stage mettendo in evidenza formazione, disponibilità e competenze dimostrabili.",
    intro:
      "Per ottenere uno stage non serve fingere esperienza: serve rendere chiari interessi, percorso e capacità già esercitate.",
    audience:
      "Studenti e persone in riqualificazione che cercano un tirocinio curricolare o extracurricolare.",
    structure: [
      "Obiettivo e area dello stage",
      "Formazione e progetti",
      "Competenze rilevanti",
      "Lingue e disponibilità",
    ],
    limited:
      "Usa lavori occasionali, volontariato e progetti solo se spiegano responsabilità utili. Distingui sempre il contesto.",
    profile:
      "Studente di comunicazione interessato a uno stage in marketing digitale, con progetti universitari su contenuti e analisi dei risultati. Buona conoscenza di Canva, fogli di calcolo e inglese B2.",
    skills: ["Ricerca", "Canva", "Fogli di calcolo", "Scrittura", "Inglese"],
    mistakes: [
      "Inviare lo stesso obiettivo a ogni azienda",
      "Aggiungere competenze non provate",
      "Omettere disponibilità e durata",
    ],
    template: "primo-lavoro",
    secondaryHref: "/strumenti/email-candidatura",
    secondaryLabel: "Scrivi l’email",
    faqs: [
      {
        question: "Posso inserire progetti di gruppo?",
        answer:
          "Sì, specificando il tuo contributo, gli strumenti e il risultato.",
      },
      {
        question: "Va indicata la disponibilità?",
        answer:
          "Sì, soprattutto per data di inizio, durata e compatibilità con gli studi.",
      },
    ],
  },
  "cv-candidatura-spontanea": {
    title: "CV per candidatura spontanea: come renderlo mirato",
    description:
      "Adatta CV ed email per una candidatura spontanea credibile e specifica.",
    intro:
      "Una candidatura spontanea funziona meglio quando mostra perché stai contattando proprio quell’organizzazione e quale area puoi supportare.",
    audience:
      "Professionisti e candidati che contattano un’azienda senza rispondere a un annuncio specifico.",
    structure: [
      "Ruolo o area obiettivo",
      "Profilo collegato all’azienda",
      "Esperienze selezionate",
      "Competenze trasferibili",
    ],
    limited:
      "Se stai entrando in un settore, collega attività già svolte ai bisogni dell’area senza dichiarare esperienza che non possiedi.",
    profile:
      "Addetta vendite con esperienza nell’assistenza clienti e gestione operativa del punto vendita, interessata a opportunità nell’area customer care. Porta capacità di ascolto, gestione delle richieste e uso quotidiano di CRM e strumenti digitali.",
    skills: [
      "Customer care",
      "CRM",
      "Gestione richieste",
      "Comunicazione",
      "Organizzazione",
    ],
    mistakes: [
      "Non indicare l’area desiderata",
      "Usare un’email generica",
      "Parlare solo di ciò che cerchi",
    ],
    template: "moderno",
    secondaryHref: "/strumenti/email-candidatura",
    secondaryLabel: "Genera l’email spontanea",
    faqs: [
      {
        question: "Serve una lettera?",
        answer:
          "Può aiutare, ma spesso un’email breve e mirata con CV allegato è sufficiente.",
      },
      {
        question: "Come scegliere il destinatario?",
        answer:
          "Usa contatti pubblici appropriati e rispetta le indicazioni dell’azienda sulle candidature.",
      },
    ],
  },
  "cv-cambio-lavoro": {
    title: "CV per cambio lavoro o carriera",
    description:
      "Riorganizza il CV per un cambio lavoro evidenziando competenze trasferibili e motivazione concreta.",
    intro:
      "Cambiare ruolo richiede un CV che costruisca un ponte tra ciò che hai fatto e ciò che vuoi fare, senza cancellare il percorso né forzare equivalenze.",
    audience:
      "Persone che cambiano azienda, funzione o settore e devono riposizionare esperienze già solide.",
    structure: [
      "Titolo coerente con il ruolo obiettivo",
      "Profilo che spiega il collegamento",
      "Risultati trasferibili",
      "Formazione recente e competenze mirate",
    ],
    limited:
      "Riformula le esperienze dal punto di vista delle capacità trasferibili: clienti, processi, dati, coordinamento o strumenti.",
    profile:
      "Professionista retail con esperienza nella gestione clienti e nel coordinamento operativo, in transizione verso il customer success. Porta capacità di analisi delle esigenze, gestione delle criticità e collaborazione con team commerciali.",
    skills: [
      "Gestione clienti",
      "Problem solving",
      "CRM",
      "Coordinamento",
      "Analisi esigenze",
    ],
    mistakes: [
      "Nascondere completamente il settore precedente",
      "Usare un profilo vago",
      "Aggiungere corsi senza applicazioni pratiche",
    ],
    template: "moderno",
    secondaryHref: "/strumenti/generatore-lettera-presentazione",
    secondaryLabel: "Spiega il cambio nella lettera",
    faqs: [
      {
        question: "Devo spiegare il cambio nel CV?",
        answer:
          "Sì, brevemente nel profilo. La lettera può approfondire motivazione e collegamento.",
      },
      {
        question: "Quali esperienze eliminare?",
        answer:
          "Riduci quelle meno pertinenti, ma conserva continuità cronologica e risultati trasferibili.",
      },
    ],
  },
};
