import type { PropertyType } from "./types";

// Host Onboarding copy (Phase 2 redesign), centralized in one place so the
// page/form never hardcode strings inline. Launch language is Italian
// only — this is intentionally a single object, not a Record<Language, ...>.
// To localize later, add a sibling constant with the same shape and select
// between them the same way app/page.tsx already does for the rest of the
// site (a simple language switch, no i18n framework needed).

// Single source of truth for the SmartFill price — never hardcode this
// number anywhere else in the app.
export const SMARTFILL_PRICE_EUR = 19.99;
export const SMARTFILL_PRICE_LABEL = `€${SMARTFILL_PRICE_EUR.toFixed(2).replace(".", ",")}/mese`;

export const PROPERTY_TYPE_OPTIONS: { value: PropertyType; label: string }[] = [
  { value: "b&b", label: "B&B" },
  { value: "casa_vacanze", label: "Casa Vacanze" },
  { value: "villa", label: "Villa" },
  { value: "hotel", label: "Hotel" },
  { value: "apartment", label: "Appartamento" },
  { value: "other", label: "Altro" },
];

// The illustrative week used in the SmartFill explanation card.
export const SMARTFILL_EXAMPLE_WEEK: { day: string; status: "booked" | "empty" }[] = [
  { day: "Lun", status: "booked" },
  { day: "Mar", status: "booked" },
  { day: "Mer", status: "empty" },
  { day: "Gio", status: "empty" },
  { day: "Ven", status: "booked" },
  { day: "Sab", status: "booked" },
];

export const HOST_COPY = {
  meta: {
    title: "Attiva la tua struttura su Vyalo",
    description:
      "Attiva la tua struttura su Vyalo in pochi minuti: il concierge digitale che i tuoi ospiti usano prima e durante il soggiorno a Cefalù.",
  },
  backToVyalo: "Torna a Vyalo",
  hero: {
    eyebrow: "Per host e strutture ricettive",
    title: "Attiva la tua struttura su Vyalo",
    intro:
      "Ogni soggiorno nasce dalla fiducia. Per questo lavoriamo con strutture che condividono il nostro modo di accogliere gli ospiti: qualità, attenzione ai dettagli e un'ospitalità autentica.",
    note: "Bastano pochi minuti per attivarla. Il nostro team verifica ogni richiesta con attenzione.",
  },
  intro: {
    whatIsVyalo: {
      eyebrow: "Cos'è Vyalo",
      title: "Il concierge digitale che accompagna i tuoi ospiti",
      body:
        "Vyalo è il concierge digitale che i tuoi ospiti usano prima e durante il soggiorno. Basta inquadrare il QR code dedicato alla struttura: senza scaricare nessuna app, i tuoi ospiti trovano subito ristoranti, esperienze, trasporti, consigli locali, informazioni pratiche e di emergenza — tutto ciò che serve durante il soggiorno.",
    },
    whyActivate: {
      eyebrow: "Perché attivare la tua struttura",
      title: "Un servizio in più per i tuoi ospiti, senza sforzo per te",
      items: [
        "Attivi il QR code dedicato ai tuoi ospiti",
        "Migliori l'esperienza che offri durante il soggiorno",
        "Dai accesso a servizi locali utili e verificati",
        "Hai accesso ai prossimi servizi Vyalo, appena disponibili",
      ],
    },
    whatsNext: {
      eyebrow: "Cosa succede dopo",
      title: "Un percorso semplice, dall'attivazione ai QR code",
      steps: [
        "Completi l'attivazione",
        "Il team Vyalo verifica le informazioni",
        "La tua struttura viene attivata",
        "Prepariamo i tuoi QR code",
        "I tuoi ospiti possono iniziare a usare Vyalo",
      ],
    },
  },
  progress: {
    stepLabel: (step: number, total: number) => `Passo ${step} di ${total}`,
  },
  steps: [
    { key: "host", label: "I tuoi dati" },
    { key: "property", label: "La tua struttura" },
    { key: "smartfill", label: "SmartFill e conferma" },
  ] as const,
  nav: {
    back: "Indietro",
    next: "Continua",
    submit: "Attiva la mia struttura",
    submitting: "Attivazione in corso…",
  },
  step1: {
    title: "I tuoi dati",
    intro: "Cominciamo con qualche informazione su di te.",
    contactName: { label: "Nome e cognome", placeholder: "Il tuo nome" },
    email: { label: "Email", placeholder: "nome@esempio.it" },
    phone: { label: "Cellulare", placeholder: "+39 333 1234567" },
  },
  step2: {
    title: "La tua struttura",
    intro: "Raccontaci qualcosa sulla struttura da attivare.",
    propertyName: { label: "Nome della struttura", placeholder: "Es. Villa dei Limoni" },
    propertyType: {
      legend: "Tipo di struttura",
    },
    otherPropertyType: {
      label: "Specifica il tipo di struttura",
      placeholder: "Es. Agriturismo",
    },
    propertyAddress: {
      label: "Indirizzo della struttura",
      placeholder: "Via, numero civico, Cefalù",
    },
    structure: {
      legend: "Quante strutture desideri attivare su Vyalo?",
      single: "Una sola struttura",
      multiple: "Più strutture",
      countLabel: "Quante strutture in totale?",
      countPlaceholder: "2",
      helper:
        "Ci serve per preparare l'architettura dei QR code più adatta al numero di strutture.",
    },
  },
  step3: {
    title: "SmartFill e conferma",
    intro: "Ultimo passaggio: un'opzione facoltativa, poi l'invio.",
    smartFill: {
      eyebrow: "Facoltativo",
      title: "SmartFill Cefalù Stays",
      body:
        "Capita che tra una prenotazione e l'altra restino notti libere. SmartFill aiuta a riempire questi vuoti, proponendo la tua struttura agli ospiti che stanno già cercando una sistemazione a Cefalù.",
      exampleCaption: "Un esempio pratico:",
      exampleResult:
        "Con SmartFill, Vyalo può promuovere mercoledì e giovedì agli ospiti già in cerca di una sistemazione a Cefalù.",
      priceLabel: SMARTFILL_PRICE_LABEL,
      enableLabel: `Attiva SmartFill Cefalù Stays (${SMARTFILL_PRICE_LABEL})`,
      expansionIntro:
        "Per creare la pagina pubblica della tua struttura ci servono alcuni dettagli in più.",
    },
    fields: {
      description: {
        label: "Descrizione della struttura",
        placeholder: "Racconta la tua struttura in poche righe…",
      },
      photosLink: {
        label: "Link alle foto (Google Drive, sito web, ecc.)",
        placeholder: "https://…",
      },
      bedrooms: { label: "Camere da letto", placeholder: "2" },
      bathrooms: { label: "Bagni", placeholder: "1" },
      beds: { label: "Letti", placeholder: "3" },
      maxGuests: { label: "Ospiti massimi", placeholder: "4" },
      amenitiesLegend: "Servizi disponibili",
      wifi: "Wi-Fi",
      parking: "Parcheggio",
      pool: "Piscina",
      kitchen: "Cucina",
      airConditioning: "Aria condizionata",
      outdoorArea: "Spazi esterni",
      houseRules: {
        label: "Regole della casa (facoltativo)",
        placeholder: "Es. non si accettano animali, niente feste…",
      },
      checkIn: { label: "Orario check-in", placeholder: "15:00" },
      checkOut: { label: "Orario check-out", placeholder: "10:00" },
    },
    consentLegend: "Consenso",
    consentToContact: "Acconsento a essere ricontattato da Vyalo per l'attivazione della mia struttura.",
    privacyAcknowledged:
      "Acconsento all'utilizzo dei miei dati personali per valutare e attivare la mia struttura.",
    reviewNote:
      "Il nostro team verifica ogni richiesta prima dell'attivazione. Ti aggiorneremo appena la tua struttura sarà pronta.",
  },
  validation: {
    required: "Campo obbligatorio",
    email: "Inserisci un indirizzo email valido",
    phone: "Inserisci un numero di telefono valido",
    propertyTypeRequired: "Seleziona il tipo di struttura",
    otherPropertyTypeRequired: "Specifica il tipo di struttura",
    structureCountRequired: "Indica quante strutture desideri attivare",
    structureCountRange: "Inserisci un numero valido (almeno 2)",
    consentRequired: "Devi accettare per continuare",
  },
  failure: {
    title: "Qualcosa è andato storto",
    body: "Non siamo riusciti a completare l'attivazione. Riprova tra qualche istante.",
  },
  success: {
    title: "Attivazione avviata",
    body:
      "Grazie per aver condiviso la tua struttura con noi. Il nostro team la esaminerà a breve: appena tutto sarà pronto, attiveremo la struttura e ti invieremo i QR code per i tuoi ospiti.",
    reference: (id: string) => `Codice della tua richiesta: ${id}`,
  },
} as const;
