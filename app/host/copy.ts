import type { PropertyType } from "./types";

// Host Application copy, centralized in one place so the page/form never
// hardcode strings inline. Launch language is Italian only — this is
// intentionally a single object, not a Record<Language, ...>. To localize
// later, add a sibling constant (e.g. HOST_COPY_EN) with the same shape and
// select between them the same way app/page.tsx already does for the rest
// of the site (a simple language switch, no i18n framework needed).
export const PROPERTY_TYPE_OPTIONS: { value: PropertyType; label: string }[] = [
  { value: "apartment", label: "Appartamento" },
  { value: "villa", label: "Villa" },
  { value: "b&b", label: "B&B" },
  { value: "boutique_hotel", label: "Boutique Hotel" },
  { value: "room", label: "Camera" },
  { value: "other", label: "Altro" },
];

export const HOST_COPY = {
  meta: {
    title: "Diventa un Host Verificato Vyalo",
    description:
      "Candidati per diventare un Host Verificato Vyalo a Cefalù. Ogni candidatura viene esaminata singolarmente dal nostro team.",
  },
  hero: {
    eyebrow: "Per host e strutture ricettive",
    title: "Diventa un Host Verificato Vyalo",
    intro:
      "Ogni soggiorno nasce dalla fiducia. Per questo scegliamo di collaborare con strutture che condividono il nostro modo di accogliere gli ospiti. Se per te contano la qualità, la cura dei dettagli e un'ospitalità autentica, ci farebbe piacere conoscere la tua struttura.",
    note:
      "Il nostro team esamina ogni candidatura singolarmente, con attenzione. Bastano pochi minuti per iniziare.",
  },
  backToVyalo: "Torna a Vyalo",
  progress: {
    stepLabel: (step: number, total: number) => `Passo ${step} di ${total}`,
  },
  steps: [
    { key: "applicant", label: "I tuoi dati" },
    { key: "accommodation", label: "La tua struttura" },
    { key: "operations", label: "La gestione degli ospiti" },
    { key: "consent", label: "Conferma" },
  ] as const,
  nav: {
    back: "Indietro",
    next: "Continua",
    submit: "Invia la candidatura",
    submitting: "Invio in corso…",
  },
  step1: {
    title: "I tuoi dati",
    intro: "Cominciamo con qualche informazione su di te.",
    contactName: { label: "Nome e cognome", placeholder: "Il tuo nome" },
    email: { label: "Email", placeholder: "nome@esempio.it" },
    phone: { label: "Telefono", placeholder: "+39 333 1234567" },
    hostCompanyName: {
      label: "Nome della struttura (facoltativo)",
      placeholder: "Es. Villa dei Limoni",
    },
  },
  step2: {
    title: "La tua struttura",
    intro: "Raccontaci che tipo di struttura gestisci.",
    destinationNote: "Al momento collaboriamo solo con strutture a Cefalù.",
    propertyTypes: {
      label: "Che tipo di struttura gestisci?",
      legend: "Tipo di struttura",
      helper: "Puoi selezionare fino a 3 opzioni.",
    },
    otherPropertyType: {
      label: "Specifica il tipo di struttura",
      placeholder: "Es. Agriturismo",
    },
    propertyCount: {
      label: "Quante strutture gestisci?",
      placeholder: "1",
    },
  },
  step3: {
    title: "La gestione degli ospiti",
    intro: "Raccontaci qualcosa in più su come vorresti supportare i tuoi ospiti.",
    currentGuestSupportModel: {
      label: "Come gestisci oggi le richieste dei tuoi ospiti? (facoltativo)",
      placeholder: "Es. rispondo personalmente, un collaboratore se ne occupa…",
    },
    interestsLegend: "Cosa ti interesserebbe di più",
    interestedInGuestSupport:
      "Vorrei che i miei ospiti ricevessero assistenza diretta durante il soggiorno.",
    interestedInQrPlaques:
      "Mi piacerebbe offrire ai miei ospiti un accesso rapido dedicato all'interno della struttura.",
    interestedInSmartFill:
      "Vorrei semplificare la raccolta delle informazioni sugli ospiti all'arrivo.",
  },
  step4: {
    title: "Conferma e invio",
    intro: "Ultimo passaggio prima di inviare la candidatura.",
    consentLegend: "Consenso",
    consentToContact: "Acconsento a essere ricontattato da Vyalo in merito a questa candidatura.",
    // Deliberately does not claim the applicant "read" a privacy policy —
    // no such page exists yet on the website. This records genuine consent
    // to the one thing that is actually true today: data is used to
    // evaluate and respond to the application. Must be revisited once a
    // real privacy-policy page exists (see Stage 3A report).
    privacyAcknowledged:
      "Acconsento all'utilizzo dei miei dati personali per valutare e rispondere a questa candidatura.",
    reviewNote:
      "Dopo l'invio, la tua candidatura sarà esaminata dal nostro team. Ti aggiorneremo appena la valutazione sarà completa.",
  },
  validation: {
    required: "Campo obbligatorio",
    email: "Inserisci un indirizzo email valido",
    phone: "Inserisci un numero di telefono valido",
    propertyTypesRequired: "Seleziona almeno un tipo di struttura",
    propertyTypesMax: "Puoi selezionare al massimo 3 opzioni",
    otherPropertyTypeRequired: "Specifica il tipo di struttura",
    propertyCountRange: "Inserisci un numero tra 1 e 500",
    consentRequired: "Devi accettare per continuare",
  },
  failure: {
    title: "Qualcosa è andato storto",
    body: "Non siamo riusciti a inviare la candidatura. Riprova tra qualche istante.",
    retry: "Riprova",
  },
  success: {
    title: "Candidatura ricevuta",
    body:
      "Grazie per aver condiviso la tua struttura con noi. Il nostro team la esaminerà personalmente e ti contatterà al termine della valutazione. L'invio della candidatura non garantisce l'ingresso nella rete degli Host Verificati Vyalo.",
    reference: (id: string) => `Riferimento candidatura: ${id}`,
  },
} as const;
