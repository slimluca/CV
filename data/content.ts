export type FaqItem = { question: string; answer: string };
export type CvTemplateId =
  | "ats"
  | "moderno"
  | "classico"
  | "primo-lavoro"
  | "creativo";

export const tools = [
  {
    group: "Crea",
    title: "Builder CV",
    href: "/crea-cv",
    text: "Compila le sezioni essenziali e guarda il CV aggiornarsi mentre scrivi.",
    mark: "01",
  },
  {
    group: "Controlla",
    title: "Controllo CV ATS",
    href: "/strumenti/controllo-cv-ats",
    text: "Individua sezioni mancanti, problemi di leggibilità e margini di miglioramento.",
    mark: "02",
  },
  {
    group: "Adatta",
    title: "Confronta CV e annuncio",
    href: "/strumenti/confronta-cv-annuncio",
    text: "Confronta parole chiave e competenze senza inventare esperienze.",
    mark: "03",
  },
  {
    group: "Invia",
    title: "Lettera di presentazione",
    href: "/strumenti/generatore-lettera-presentazione",
    text: "Prepara una prima bozza italiana da rivedere e personalizzare.",
    mark: "04",
  },
  {
    group: "Invia",
    title: "Email di candidatura",
    href: "/strumenti/email-candidatura",
    text: "Genera oggetto e testo per candidatura, follow-up o ringraziamento.",
    mark: "05",
  },
  {
    group: "Controlla",
    title: "Checklist CV",
    href: "/strumenti/checklist-cv",
    text: "Completa un ultimo controllo pratico prima dell’invio.",
    mark: "06",
  },
  {
    group: "Crea",
    title: "Quiz modello CV",
    href: "/strumenti/quiz-modello-cv",
    text: "Trova il formato più adatto al tuo profilo e al settore.",
    mark: "07",
  },
  {
    group: "Crea",
    title: "Generatore profilo CV",
    href: "/strumenti/generatore-profilo-cv",
    text: "Crea una bozza breve da personalizzare con esperienza e contributi reali.",
    mark: "08",
  },
  {
    group: "Crea",
    title: "Competenze per il CV",
    href: "/strumenti/competenze-cv",
    text: "Trova competenze tecniche, trasversali e digitali coerenti con il ruolo.",
    mark: "09",
  },
  {
    group: "Adatta",
    title: "Parole chiave CV",
    href: "/strumenti/parole-chiave-cv",
    text: "Analizza il lessico di un annuncio e confrontalo con il curriculum.",
    mark: "10",
  },
];

export const templates = [
  {
    id: "ats" as const,
    name: "ATS semplice",
    tone: "Essenziale",
    text: "Una colonna, gerarchia nitida e sezioni facili da interpretare.",
    bestFor: "Candidature online, portali e aziende strutturate",
    when: "Quando leggibilità e ordine sono la priorità.",
    ats: "Molto adatto agli ATS, senza garanzie di selezione.",
    cta: "Usa ATS semplice",
  },
  {
    id: "moderno" as const,
    name: "Moderno professionale",
    tone: "Equilibrato",
    text: "Aspetto contemporaneo con contenuti centrali e accenti misurati.",
    bestFor: "Profili junior, intermedi e specialistici",
    when: "Per candidature aziendali che richiedono cura e sobrietà.",
    ats: "Struttura lineare e testo facilmente leggibile.",
    cta: "Usa Moderno professionale",
  },
  {
    id: "classico" as const,
    name: "Classico elegante",
    tone: "Sobrio",
    text: "Struttura tradizionale adatta a contesti formali e profili esperti.",
    bestFor: "Profili senior, amministrazione e contesti formali",
    when: "Quando è utile una presentazione tradizionale e autorevole.",
    ats: "Buona leggibilità con sezioni standard.",
    cta: "Usa Classico elegante",
  },
  {
    id: "primo-lavoro" as const,
    name: "Primo lavoro",
    tone: "Focalizzato",
    text: "Mette in primo piano formazione, progetti e competenze trasferibili.",
    bestFor: "Studenti, neodiplomati e prime esperienze",
    when: "Quando formazione e competenze contano più dello storico lavorativo.",
    ats: "Sezioni semplici e riconoscibili per i sistemi ATS.",
    cta: "Usa Primo lavoro",
  },
  {
    id: "creativo" as const,
    name: "Creativo pulito",
    tone: "Distintivo",
    text: "Più personalità visiva senza sacrificare ordine e leggibilità.",
    bestFor: "Comunicazione, design, retail e ruoli creativi",
    when: "Quando la presentazione visiva è pertinente al ruolo.",
    ats: "Pulito e testuale; per portali rigidi preferisci ATS semplice.",
    cta: "Usa Creativo pulito",
  },
];

export const professionPages: Record<
  string,
  {
    title: string;
    role: string;
    intro: string;
    profile: string;
    skills: string[];
    keywords: string[];
    highlights: string[];
    mistakes: string[];
    faqs: FaqItem[];
  }
> = {
  "cv-commessa": {
    title: "CV da commessa: esempio, competenze e consigli",
    role: "Addetta alle vendite",
    intro:
      "Un buon CV da commessa rende subito visibili relazione con il cliente, conoscenza del prodotto e concretezza operativa. Non serve riempirlo di formule generiche: contano attività, responsabilità e risultati spiegati con chiarezza.",
    profile:
      "Addetta alle vendite con esperienza nell’assistenza al cliente, gestione cassa e riassortimento. Abituata a lavorare per obiettivi, curare l’esposizione e collaborare con il team nei momenti di maggiore affluenza.",
    skills: [
      "Assistenza al cliente",
      "Gestione cassa e POS",
      "Riassortimento",
      "Visual merchandising",
      "Gestione resi",
      "Lavoro per obiettivi",
    ],
    keywords: [
      "vendita assistita",
      "fidelizzazione",
      "inventario",
      "KPI",
      "apertura e chiusura cassa",
    ],
    highlights: [
      "Tipologia di negozio e clientela",
      "Responsabilità su cassa, resi e magazzino",
      "Obiettivi commerciali o risultati misurabili",
      "Disponibilità a turni e festivi, se pertinente",
    ],
    mistakes: [
      "Scrivere soltanto “vendita” senza descrivere le attività",
      "Elencare qualità personali senza esempi",
      "Dimenticare disponibilità e conoscenze linguistiche utili",
    ],
    faqs: [
      {
        question: "Come descrivere l’esperienza in negozio?",
        answer:
          "Indica reparto o settore, attività svolte, strumenti usati e una responsabilità concreta. Se disponi di dati affidabili, aggiungi risultati commerciali reali.",
      },
      {
        question: "Cosa scrivere senza esperienza?",
        answer:
          "Valorizza contatto con il pubblico, volontariato, progetti scolastici, lingue e disponibilità, senza presentare come lavoro ciò che non lo era.",
      },
    ],
  },
  "cv-cameriere": {
    title: "CV da cameriere: esempio pratico e competenze",
    role: "Cameriere",
    intro:
      "Il CV da cameriere deve comunicare ritmo, precisione e qualità del servizio. Specifica il tipo di locale, il numero indicativo di coperti gestiti solo se verificabile e le attività che padroneggi davvero.",
    profile:
      "Cameriere con esperienza nel servizio al tavolo, presa comande e coordinamento con cucina e bar. Attento all’accoglienza, alle esigenze degli ospiti e alla gestione ordinata del servizio nei turni intensi.",
    skills: [
      "Servizio al tavolo",
      "Presa comande",
      "Mise en place",
      "Gestione pagamenti",
      "HACCP",
      "Coordinamento sala-cucina",
    ],
    keywords: [
      "accoglienza clienti",
      "servizio di sala",
      "comande",
      "allergeni",
      "turni",
    ],
    highlights: [
      "Tipologia e livello del locale",
      "Servizi gestiti: colazione, pranzo, cena o eventi",
      "Sistemi di comanda e cassa conosciuti",
      "Lingue usate con la clientela",
    ],
    mistakes: [
      "Usare descrizioni identiche per ogni locale",
      "Omettere la formazione su igiene e sicurezza",
      "Dichiarare lingue a un livello non realistico",
    ],
    faqs: [
      {
        question: "Quanto deve essere lungo il CV?",
        answer:
          "Per molti profili una pagina ben organizzata è sufficiente; due pagine possono avere senso con esperienze numerose e pertinenti.",
      },
      {
        question: "Inserire la foto è obbligatorio?",
        answer:
          "No. Valuta il contesto e privilegia sempre contenuti chiari, professionali e pertinenti al ruolo.",
      },
    ],
  },
  "cv-operaio": {
    title: "CV da operaio: competenze, profilo ed esempio",
    role: "Operaio di produzione",
    intro:
      "Per un ruolo operativo il CV deve far emergere lavorazioni conosciute, macchinari utilizzati, attenzione alla sicurezza e affidabilità sui turni. Le informazioni tecniche concrete valgono più degli aggettivi.",
    profile:
      "Operaio di produzione con esperienza su linee semiautomatiche, controllo qualità visivo e confezionamento. Attento alle procedure di sicurezza, all’ordine della postazione e al rispetto dei tempi di lavorazione.",
    skills: [
      "Conduzione linea",
      "Controllo qualità",
      "Confezionamento",
      "Lettura schede di lavorazione",
      "Sicurezza sul lavoro",
      "Manutenzione ordinaria",
    ],
    keywords: [
      "produzione",
      "linea",
      "DPI",
      "qualità",
      "turni",
      "procedure operative",
    ],
    highlights: [
      "Settore produttivo e lavorazioni",
      "Macchinari e strumenti realmente utilizzati",
      "Certificazioni e corsi sicurezza",
      "Patenti o abilitazioni pertinenti",
    ],
    mistakes: [
      "Non distinguere le diverse mansioni",
      "Omettere corsi e abilitazioni",
      "Inserire competenze tecniche mai praticate",
    ],
    faqs: [
      {
        question: "Come indicare i macchinari?",
        answer:
          "Usa il nome corretto della macchina o della linea e chiarisci il livello di autonomia, evitando sigle che il recruiter potrebbe non riconoscere.",
      },
      {
        question: "La patente va inserita?",
        answer:
          "Sì, quando è richiesta nell’annuncio o utile per raggiungere la sede e svolgere le mansioni.",
      },
    ],
  },
  "cv-magazziniere": {
    title: "CV da magazziniere: esempio e parole chiave",
    role: "Magazziniere",
    intro:
      "Un CV da magazziniere efficace mostra padronanza dei flussi, precisione documentale e attenzione alla sicurezza. Collega sempre strumenti e abilitazioni alle attività che hai svolto.",
    profile:
      "Magazziniere con esperienza in ricevimento merci, picking, preparazione ordini e inventario. Utilizzo di lettori barcode e gestionali di magazzino, con attenzione a tracciabilità e procedure di sicurezza.",
    skills: [
      "Picking e packing",
      "Ricevimento merci",
      "Inventario",
      "Lettore barcode",
      "Gestionale WMS",
      "Movimentazione merci",
    ],
    keywords: ["logistica", "DDT", "picking", "spedizioni", "muletto", "WMS"],
    highlights: [
      "Fasi del flusso logistico gestite",
      "Strumenti digitali e gestionali",
      "Patentino del muletto con validità corretta",
      "Volumi o accuratezza solo se documentabili",
    ],
    mistakes: [
      "Scrivere “uso muletto” senza indicare l’abilitazione",
      "Trascurare la parte documentale",
      "Confondere disponibilità con competenze",
    ],
    faqs: [
      {
        question: "Il patentino del muletto dove va inserito?",
        answer:
          "Puoi indicarlo nelle certificazioni e richiamarlo nelle competenze, specificando che è in corso di validità solo se lo è davvero.",
      },
      {
        question: "Come valorizzare il lavoro stagionale?",
        answer:
          "Descrivi attività e responsabilità come per ogni altra esperienza; la durata breve non riduce il valore delle competenze acquisite.",
      },
    ],
  },
};

export const basicPages: Record<
  string,
  {
    title: string;
    description: string;
    eyebrow: string;
    intro: string;
    sections: { title: string; body: string }[];
    cta?: string;
    faqs?: FaqItem[];
  }
> = {
  "cv-ats": {
    title: "CV ATS: rendi il curriculum più leggibile",
    description:
      "Capisci come funzionano i controlli ATS e verifica struttura, sezioni e completezza del tuo CV.",
    eyebrow: "Controlla",
    intro:
      "I software ATS aiutano le aziende a organizzare le candidature. Un CV chiaro, testuale e ben strutturato è più semplice da elaborare, ma nessun formato può garantire il superamento di una selezione.",
    sections: [
      {
        title: "Cosa controllare davvero",
        body: "Usa titoli di sezione riconoscibili, contatti leggibili, date coerenti e parole pertinenti all’esperienza reale. Evita elementi grafici che rendono ambiguo l’ordine di lettura.",
      },
      {
        title: "Parole chiave senza forzature",
        body: "Riprendi il linguaggio dell’annuncio quando descrive competenze che possiedi davvero. Copiare intere frasi o aggiungere parole invisibili non migliora la qualità della candidatura.",
      },
    ],
    cta: "Controlla il tuo CV",
    faqs: [
      {
        question: "Un ATS scarta automaticamente tutti i CV grafici?",
        answer:
          "Non necessariamente. I sistemi e le configurazioni variano; una struttura semplice riduce però il rischio che informazioni importanti vengano interpretate male.",
      },
      {
        question: "Il punteggio garantisce un colloquio?",
        answer:
          "No. È un’indicazione tecnica e di completezza, non una previsione della decisione di un recruiter.",
      },
    ],
  },
  "curriculum-vitae-gratis": {
    title: "Crea un curriculum vitae gratis, senza registrazione",
    description:
      "Compila un CV ordinato nel browser e scaricalo in PDF senza creare un account.",
    eyebrow: "Crea",
    intro:
      "Puoi iniziare dal builder, compilare le sezioni e conservare i dati localmente sul dispositivo. Nessun paywall nascosto in questa prima versione: il PDF essenziale è disponibile gratuitamente.",
    sections: [
      {
        title: "Cosa include",
        body: "Profilo, esperienze, istruzione, competenze, lingue e sezioni aggiuntive. Il punteggio di completezza ti aiuta a notare ciò che potresti aver dimenticato.",
      },
      {
        title: "I dati restano nel browser",
        body: "Il builder salva le informazioni in localStorage sul dispositivo in uso. Non serve creare un account; su un dispositivo condiviso è prudente cancellare i dati al termine.",
      },
    ],
    cta: "Crea il CV gratis",
  },
  "curriculum-vitae-online": {
    title: "Curriculum vitae online: crea, modifica e scarica",
    description:
      "Prepara online un CV italiano chiaro, con anteprima live e controllo di completezza.",
    eyebrow: "Crea",
    intro:
      "Lavorare online sul CV rende più semplice correggere i contenuti e verificare subito la gerarchia delle informazioni. Qui la compilazione avviene nel browser e l’anteprima si aggiorna in tempo reale.",
    sections: [
      {
        title: "Parti dai contenuti",
        body: "Prima di scegliere lo stile, definisci ruolo obiettivo, profilo e risultati delle esperienze. Un layout ordinato non può compensare contenuti vaghi.",
      },
      {
        title: "Mantieni una versione principale",
        body: "Conserva un CV completo e adattane una copia per ogni candidatura, dando priorità alle esperienze e competenze pertinenti.",
      },
    ],
    cta: "Apri il builder",
  },
  "curriculum-vitae-europeo": {
    title: "Curriculum europeo o CV moderno? Una scelta ragionata",
    description:
      "Confronta Europass e un CV moderno ATS-friendly senza giudizi assoluti.",
    eyebrow: "Scegli il formato",
    intro:
      "Europass è un formato riconoscibile e può essere utile quando è richiesto, nelle candidature europee o quando serve una struttura standard. In altri contesti, un CV moderno e più sintetico può mettere meglio a fuoco il ruolo desiderato.",
    sections: [
      {
        title: "Quando Europass è utile",
        body: "Può essere adatto per bandi, mobilità europea, enti pubblici o richieste esplicite. Offre campi uniformi e facilita la raccolta completa delle informazioni.",
      },
      {
        title: "Quando valutare un formato più snello",
        body: "Per candidature aziendali mirate, una o due pagine con gerarchia semplice possono aiutare a dare priorità ai contenuti più pertinenti. La scelta dipende sempre dal contesto.",
      },
    ],
    cta: "Crea un CV moderno",
    faqs: [
      {
        question: "Europass è sempre obbligatorio?",
        answer:
          "No. È obbligatorio solo quando la procedura o il datore di lavoro lo richiedono espressamente.",
      },
      {
        question: "Un CV moderno è automaticamente migliore?",
        answer:
          "No. È efficace quando contenuti, struttura e formato sono coerenti con il ruolo e la modalità di candidatura.",
      },
    ],
  },
  "cv-senza-esperienza": {
    title: "CV senza esperienza: cosa scrivere davvero",
    description:
      "Costruisci un CV credibile valorizzando formazione, progetti e competenze trasferibili.",
    eyebrow: "Primo passo",
    intro:
      "Non avere esperienze formali non significa non avere contenuti. Formazione, progetti, volontariato, attività personali e competenze possono mostrare motivazione e capacità, purché siano descritti in modo concreto.",
    sections: [
      {
        title: "Sposta il peso sulle prove",
        body: "Descrivi un progetto, un compito svolto, gli strumenti usati e ciò che hai imparato. Evita frasi come “grande leadership” senza un contesto che le sostenga.",
      },
      {
        title: "Scrivi un obiettivo specifico",
        body: "Indica il ruolo o l’area verso cui ti stai orientando e collega due o tre competenze reali a quel percorso.",
      },
    ],
    cta: "Crea il tuo primo CV",
    faqs: [
      {
        question: "Posso inserire lavori occasionali?",
        answer:
          "Sì, se li descrivi correttamente e metti in evidenza attività pertinenti, senza trasformarli in esperienze diverse da ciò che sono state.",
      },
      {
        question: "Meglio una pagina o due?",
        answer:
          "Senza molta esperienza, una pagina chiara è generalmente sufficiente. Non aggiungere testo solo per riempire spazio.",
      },
    ],
  },
  "cv-studente": {
    title: "CV studente: formazione, progetti e prime esperienze",
    description:
      "Prepara un CV da studente chiaro per stage, tirocinio, lavoro part-time o primo impiego.",
    eyebrow: "Per studenti",
    intro:
      "Un CV da studente può essere essenziale e convincente. Metti in evidenza percorso di studi, progetti pertinenti, lingue, strumenti digitali ed eventuali attività che dimostrano responsabilità.",
    sections: [
      {
        title: "Adatta l’ordine delle sezioni",
        body: "Se la formazione è il punto più forte, posizionala prima delle esperienze. Aggiungi esami, laboratori o progetti soltanto quando sono utili alla candidatura.",
      },
      {
        title: "Rendi verificabili le competenze",
        body: "Collega ogni competenza a un corso, progetto o attività. “Excel: tabelle pivot usate per analizzare…” è più utile di “ottimo Excel”.",
      },
    ],
    cta: "Crea il CV da studente",
  },
  "lettera-di-presentazione": {
    title: "Lettera di presentazione: crea una bozza mirata",
    description:
      "Prepara una lettera italiana coerente con ruolo, azienda e motivazione.",
    eyebrow: "Invia",
    intro:
      "Una buona lettera non ripete il CV. Collega il tuo percorso alle esigenze del ruolo, spiega perché stai scrivendo e chiude con un invito professionale al confronto.",
    sections: [
      {
        title: "Personalizza prima di inviare",
        body: "La bozza generata è un punto di partenza. Verifica nomi, riferimenti, tono e soprattutto che ogni affermazione corrisponda alla tua esperienza.",
      },
      {
        title: "Mantieni il testo leggibile",
        body: "Tre o quattro paragrafi brevi sono spesso più efficaci di una pagina densa. Elimina formule vuote e concentrati su contributo e motivazione.",
      },
    ],
    cta: "Genera la lettera",
  },
  "email-candidatura": {
    title: "Email di candidatura: oggetto e testo pronti da adattare",
    description:
      "Scrivi un’email concisa per invio CV, candidatura spontanea o follow-up.",
    eyebrow: "Invia",
    intro:
      "L’email accompagna il CV: deve chiarire subito il motivo del contatto, il ruolo e gli allegati. Un testo breve e preciso aiuta chi riceve a orientarsi.",
    sections: [
      {
        title: "Oggetto riconoscibile",
        body: "Inserisci ruolo, nome e riferimento dell’annuncio quando disponibile. Evita oggetti generici come “CV” o “Candidatura”.",
      },
      {
        title: "Un invito semplice",
        body: "Chiudi dichiarando la disponibilità a un colloquio e indicando i recapiti già presenti nella firma. Controlla sempre gli allegati prima dell’invio.",
      },
    ],
    cta: "Genera l’email",
  },
  "chi-siamo": {
    title: "Un modo più consapevole di preparare il CV",
    description: "Scopri principi, limiti e approccio di creailcv.it.",
    eyebrow: "Chi siamo",
    intro:
      "creailcv.it nasce per riunire in un solo spazio gli strumenti essenziali della candidatura: creazione, controllo, adattamento e invio. Il progetto privilegia indicazioni chiare e risultati verificabili, senza promesse di colloquio.",
    sections: [
      {
        title: "Trasparenza prima delle promesse",
        body: "Un punteggio ATS non conosce le decisioni del recruiter. Una bozza automatica non conosce tutta la tua storia. Per questo spieghiamo cosa fanno gli strumenti e dove serve il giudizio umano.",
      },
      {
        title: "Privacy pratica",
        body: "Nella prima fase il builder funziona senza registrazione e conserva i dati localmente nel browser. Eventuali funzioni account future richiederanno informative e scelte esplicite.",
      },
    ],
  },
  privacy: {
    title: "Informativa privacy",
    description:
      "Come vengono gestiti i dati nella prima versione di creailcv.it.",
    eyebrow: "Trasparenza",
    intro:
      "Ultimo aggiornamento: 20 giugno 2026. Questa informativa descrive la prima versione del servizio, che non prevede account né un archivio server dei CV.",
    sections: [
      {
        title: "Dati inseriti negli strumenti",
        body: "Il builder e gli strumenti elaborano i contenuti nel browser. Il salvataggio del builder usa localStorage sul dispositivo. Non inserire dati di terzi non necessari e cancella i dati se utilizzi un computer condiviso.",
      },
      {
        title: "Contatti",
        body: "Il modulo contatti apre il programma email dell’utente tramite un collegamento mailto. Il messaggio viene quindi gestito dal provider email scelto dall’utente e ricevuto all’indirizzo indicato.",
      },
      {
        title: "Dati tecnici e servizi futuri",
        body: "Questa versione non dichiara sistemi di profilazione o account. Prima di introdurre analytics, cookie non tecnici o servizi backend, l’informativa dovrà essere aggiornata con basi giuridiche, fornitori e tempi di conservazione.",
      },
      {
        title: "Diritti e richieste",
        body: "Per domande sul trattamento o per esercitare i diritti previsti dalla normativa applicabile, puoi scrivere a privacy@creailcv.it. L’effettiva gestione del messaggio dipende dall’attivazione della casella sul dominio.",
      },
    ],
  },
  termini: {
    title: "Termini di utilizzo",
    description: "Condizioni semplici e trasparenti per usare creailcv.it.",
    eyebrow: "Condizioni",
    intro:
      "Ultimo aggiornamento: 20 giugno 2026. Gli strumenti forniscono supporto editoriale e controlli deterministici; non offrono consulenza legale o professionale e non garantiscono esiti di selezione.",
    sections: [
      {
        title: "Responsabilità dell’utente",
        body: "Rivedi contenuti, dati personali, date e affermazioni prima di scaricare o inviare un documento. Sei responsabile della correttezza e liceità dei materiali inseriti.",
      },
      {
        title: "Disponibilità del servizio",
        body: "Il servizio può evolvere o essere temporaneamente interrotto per manutenzione. Le funzionalità gratuite dichiarate nella prima fase non implicano che ogni funzione futura sarà gratuita.",
      },
      {
        title: "Uso corretto",
        body: "Non utilizzare il sito per produrre contenuti ingannevoli, illeciti o lesivi di terzi. Marchi e contenuti del servizio restano dei rispettivi titolari.",
      },
    ],
  },
};
