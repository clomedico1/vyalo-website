import { HOST_COPY } from "./copy";
import type { HostApplicationFormState } from "./types";

// Mirrors backend validation (src/hostApplications/validate.js) for user
// experience only — the backend remains the source of truth and
// re-validates everything independently.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidPhone(value: string): boolean {
  const digitsOnly = value.replace(/[^\d]/g, "");
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}

export type FieldErrors = Partial<Record<string, string>>;

export function validateStep1(state: HostApplicationFormState): FieldErrors {
  const errors: FieldErrors = {};
  const v = HOST_COPY.validation;

  if (!state.contactName.trim()) errors.contactName = v.required;
  if (!state.email.trim()) errors.email = v.required;
  else if (!EMAIL_PATTERN.test(state.email.trim())) errors.email = v.email;
  if (!state.phone.trim()) errors.phone = v.required;
  else if (!isValidPhone(state.phone)) errors.phone = v.phone;

  return errors;
}

export function validateStep2(state: HostApplicationFormState): FieldErrors {
  const errors: FieldErrors = {};
  const v = HOST_COPY.validation;

  if (!state.propertyName.trim()) errors.propertyName = v.required;
  if (!state.propertyType) errors.propertyType = v.propertyTypeRequired;
  if (state.propertyType === "other" && !state.otherPropertyType.trim()) {
    errors.otherPropertyType = v.otherPropertyTypeRequired;
  }
  if (!state.propertyAddress.trim()) errors.propertyAddress = v.required;

  if (state.structureMode === "multiple") {
    const parsed = Number(state.propertyCount);
    if (!state.propertyCount.trim()) {
      errors.propertyCount = v.structureCountRequired;
    } else if (!Number.isInteger(parsed) || parsed < 2 || parsed > 500) {
      errors.propertyCount = v.structureCountRange;
    }
  }

  return errors;
}

export function validateStep3(state: HostApplicationFormState): FieldErrors {
  const errors: FieldErrors = {};
  const v = HOST_COPY.validation;

  if (!state.consentToContact) errors.consentToContact = v.consentRequired;
  if (!state.privacyAcknowledged) errors.privacyAcknowledged = v.consentRequired;

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
