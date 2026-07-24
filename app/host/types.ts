// Mirrors the fields accepted by POST /api/host-applications on the backend
// (src/hostApplications/validate.js ALLOWED_FIELDS). Deliberately does not
// include `destination` — the backend defaults an omitted destination to
// the single supported pilot destination (Cefalù), so the frontend never
// needs to send or expose it. `privacyPolicyVersion` is likewise omitted so
// the backend's own current version is always the one recorded.
export const PROPERTY_TYPE_VALUES = [
  "apartment",
  "villa",
  "b&b",
  "boutique_hotel",
  "room",
  "other",
] as const;

export type PropertyType = (typeof PROPERTY_TYPE_VALUES)[number];

export interface HostApplicationPayload {
  contactName: string;
  hostCompanyName?: string;
  email: string;
  phone: string;
  preferredLanguage: "it";
  propertyTypes: PropertyType[];
  otherPropertyType?: string;
  propertyCount?: number;
  currentGuestSupportModel?: string;
  interestedInGuestSupport: boolean;
  interestedInQrPlaques: boolean;
  interestedInSmartFill: boolean;
  consentToContact: boolean;
  privacyAcknowledged: boolean;
  // Honeypot — must stay empty. A real applicant never sees or fills this.
  website: string;
}

export interface HostApplicationFormState {
  contactName: string;
  hostCompanyName: string;
  email: string;
  phone: string;
  propertyTypes: PropertyType[];
  otherPropertyType: string;
  propertyCount: string;
  currentGuestSupportModel: string;
  interestedInGuestSupport: boolean;
  interestedInQrPlaques: boolean;
  interestedInSmartFill: boolean;
  consentToContact: boolean;
  privacyAcknowledged: boolean;
  website: string;
}

export const EMPTY_FORM_STATE: HostApplicationFormState = {
  contactName: "",
  hostCompanyName: "",
  email: "",
  phone: "",
  propertyTypes: [],
  otherPropertyType: "",
  propertyCount: "",
  currentGuestSupportModel: "",
  interestedInGuestSupport: false,
  interestedInQrPlaques: false,
  interestedInSmartFill: false,
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
