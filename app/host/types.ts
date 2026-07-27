// Mirrors the fields accepted by POST /api/host-applications on the backend
// (src/hostApplications/validate.js ALLOWED_FIELDS). Deliberately does not
// include `destination` — the backend defaults an omitted destination to
// the single supported pilot destination (Cefalù). `privacyPolicyVersion`
// is likewise omitted so the backend's own current version always wins.
export const PROPERTY_TYPE_VALUES = [
  "b&b",
  "casa_vacanze",
  "villa",
  "hotel",
  "apartment",
  "other",
] as const;

export type PropertyType = (typeof PROPERTY_TYPE_VALUES)[number];

export type StructureMode = "single" | "multiple";

export interface SmartFillDetails {
  description?: string;
  photosLink?: string;
  bedrooms?: number;
  bathrooms?: number;
  beds?: number;
  maxGuests?: number;
  wifi?: boolean;
  parking?: boolean;
  pool?: boolean;
  kitchen?: boolean;
  airConditioning?: boolean;
  outdoorArea?: boolean;
  houseRules?: string;
  checkIn?: string;
  checkOut?: string;
}

export interface HostApplicationPayload {
  contactName: string;
  email: string;
  phone: string;
  hostCompanyName?: string; // Property name
  propertyAddress?: string;
  propertyTypes: PropertyType[]; // single-element array — backend expects an array
  otherPropertyType?: string;
  propertyCount?: number;
  preferredLanguage: "it";
  interestedInSmartFill: boolean; // "Enable SmartFill" — reuses the existing field
  smartFillDetails?: SmartFillDetails;
  consentToContact: boolean;
  privacyAcknowledged: boolean;
  // Honeypot — must stay empty. A real applicant never sees or fills this.
  website: string;
}

export interface SmartFillDetailsFormState {
  description: string;
  photosLink: string;
  bedrooms: string;
  bathrooms: string;
  beds: string;
  maxGuests: string;
  wifi: boolean;
  parking: boolean;
  pool: boolean;
  kitchen: boolean;
  airConditioning: boolean;
  outdoorArea: boolean;
  houseRules: string;
  checkIn: string;
  checkOut: string;
}

export const EMPTY_SMARTFILL_DETAILS: SmartFillDetailsFormState = {
  description: "",
  photosLink: "",
  bedrooms: "",
  bathrooms: "",
  beds: "",
  maxGuests: "",
  wifi: false,
  parking: false,
  pool: false,
  kitchen: false,
  airConditioning: false,
  outdoorArea: false,
  houseRules: "",
  checkIn: "",
  checkOut: "",
};

export interface HostApplicationFormState {
  contactName: string;
  email: string;
  phone: string;
  propertyName: string;
  propertyType: PropertyType | null;
  otherPropertyType: string;
  propertyAddress: string;
  structureMode: StructureMode;
  propertyCount: string;
  smartFillEnabled: boolean;
  smartFill: SmartFillDetailsFormState;
  consentToContact: boolean;
  privacyAcknowledged: boolean;
  website: string;
}

export const EMPTY_FORM_STATE: HostApplicationFormState = {
  contactName: "",
  email: "",
  phone: "",
  propertyName: "",
  propertyType: null,
  otherPropertyType: "",
  propertyAddress: "",
  structureMode: "single",
  propertyCount: "",
  smartFillEnabled: false,
  smartFill: EMPTY_SMARTFILL_DETAILS,
  consentToContact: false,
  privacyAcknowledged: false,
  website: "",
};

export interface HostApplicationApiResponse {
  ok: boolean;
  applicationId: string | null;
  status?: string;
  message?: string;
  errors?: string[];
}
