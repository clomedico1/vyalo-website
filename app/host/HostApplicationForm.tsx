"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { apiUrl } from "../../lib/api";
import { HOST_COPY, PROPERTY_TYPE_OPTIONS } from "./copy";
import {
  EMPTY_FORM_STATE,
  type HostApplicationApiResponse,
  type HostApplicationFormState,
  type HostApplicationPayload,
  type PropertyType,
} from "./types";
import {
  hasErrors,
  validateStep1,
  validateStep2,
  validateStep3,
  validateStep4,
  type FieldErrors,
} from "./validation";

const TOTAL_STEPS = HOST_COPY.steps.length;

const STEP_VALIDATORS = [validateStep1, validateStep2, validateStep3, validateStep4];

// Maps a validation error key to the id of the element that should receive
// focus when that error is the first one on the step. "propertyTypes" has
// no single input — it focuses the (programmatically-focusable) group
// container instead.
const FIELD_FOCUS_TARGET: Record<string, string> = {
  contactName: "contactName",
  email: "email",
  phone: "phone",
  propertyTypes: "propertyTypesGroup",
  otherPropertyType: "otherPropertyType",
  propertyCount: "propertyCount",
  consentToContact: "consentToContact",
  privacyAcknowledged: "privacyAcknowledged",
};

function buildPayload(state: HostApplicationFormState): HostApplicationPayload {
  return {
    contactName: state.contactName.trim(),
    hostCompanyName: state.hostCompanyName.trim() || undefined,
    email: state.email.trim(),
    phone: state.phone.trim(),
    preferredLanguage: "it",
    propertyTypes: state.propertyTypes,
    otherPropertyType: state.propertyTypes.includes("other")
      ? state.otherPropertyType.trim()
      : undefined,
    propertyCount: state.propertyCount.trim() ? Number(state.propertyCount) : undefined,
    currentGuestSupportModel: state.currentGuestSupportModel.trim() || undefined,
    interestedInGuestSupport: state.interestedInGuestSupport,
    interestedInQrPlaques: state.interestedInQrPlaques,
    interestedInSmartFill: state.interestedInSmartFill,
    consentToContact: state.consentToContact,
    privacyAcknowledged: state.privacyAcknowledged,
    website: state.website,
  };
}

function focusFirstError(errors: FieldErrors) {
  const firstKey = Object.keys(errors)[0];
  if (!firstKey) return;
  const targetId = FIELD_FOCUS_TARGET[firstKey];
  if (!targetId) return;
  document.getElementById(targetId)?.focus();
}

function ProgressIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8">
      <p className="mb-3 text-[13px] font-semibold text-[#5f6876]">
        {HOST_COPY.progress.stepLabel(currentStep + 1, TOTAL_STEPS)} —{" "}
        {HOST_COPY.steps[currentStep].label}
      </p>
      <div className="flex gap-2">
        {HOST_COPY.steps.map((step, index) => (
          <span
            key={step.key}
            aria-hidden="true"
            className={[
              "h-1.5 flex-1 rounded-full transition-colors duration-300",
              index <= currentStep ? "bg-[#34A853]" : "bg-[#e5e3dc]",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-[13px] font-medium text-[#b3261e]">
      {message}
    </p>
  );
}

const inputClass =
  "w-full rounded-xl border border-[#e5e3dc] bg-white px-4 py-3 text-[15px] text-[#111111] outline-none transition-colors focus:border-[#34A853] focus:ring-2 focus:ring-[#34A853]/20";
const labelClass = "mb-1.5 block text-[14px] font-semibold text-[#111111]";
const focusRingClass =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34A853]";
const checkboxCardClass =
  "flex cursor-pointer items-start gap-3 rounded-xl border border-[#e5e3dc] bg-white px-4 py-3.5 text-[14px] text-[#111111] transition-colors hover:border-[#34A853]/40";
const checkboxInputClass = `mt-0.5 h-4 w-4 shrink-0 accent-[#34A853] ${focusRingClass}`;

export default function HostApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formState, setFormState] = useState<HostApplicationFormState>(EMPTY_FORM_STATE);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const isSubmittingRef = useRef(false);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  // Move focus to the new step's heading whenever the step changes, so
  // keyboard and screen-reader users land on the new content instead of a
  // now-relocated button. Skipped on first mount so initial page load
  // doesn't unexpectedly steal focus from the browser chrome.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    stepHeadingRef.current?.focus();
  }, [currentStep]);

  useEffect(() => {
    if (status === "success") {
      successHeadingRef.current?.focus();
    }
  }, [status]);

  function update<K extends keyof HostApplicationFormState>(
    key: K,
    value: HostApplicationFormState[K]
  ) {
    setFormState((prev) => ({ ...prev, [key]: value }));
  }

  function togglePropertyType(value: PropertyType) {
    setFormState((prev) => {
      const isSelected = prev.propertyTypes.includes(value);
      if (isSelected) {
        return { ...prev, propertyTypes: prev.propertyTypes.filter((v) => v !== value) };
      }
      if (prev.propertyTypes.length >= 3) return prev;
      return { ...prev, propertyTypes: [...prev.propertyTypes, value] };
    });
  }

  function goNext() {
    const validator = STEP_VALIDATORS[currentStep];
    const stepErrors = validator(formState);
    setErrors(stepErrors);
    if (hasErrors(stepErrors)) {
      focusFirstError(stepErrors);
      return;
    }
    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }

  function goBack() {
    setErrors({});
    setCurrentStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    if (isSubmittingRef.current) return;

    const stepErrors = validateStep4(formState);
    setErrors(stepErrors);
    if (hasErrors(stepErrors)) {
      focusFirstError(stepErrors);
      return;
    }

    isSubmittingRef.current = true;
    setStatus("submitting");

    try {
      const response = await fetch(apiUrl("/api/host-applications"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(formState)),
      });

      if (!response.ok) {
        // Developer-facing diagnostic only — never shown to the applicant,
        // never includes the request body or any secret.
        console.error("Host application submission failed with status", response.status);
        setStatus("error");
        isSubmittingRef.current = false;
        return;
      }

      const data: HostApplicationApiResponse = await response.json();
      setApplicationId(data.applicationId ?? null);
      setStatus("success");
    } catch (err) {
      // Covers network failures and a missing NEXT_PUBLIC_API_BASE_URL
      // (apiUrl() throws in that case). The applicant only ever sees the
      // generic Italian failure copy below — no env var name, no stack.
      console.error("Host application submission error:", err);
      setStatus("error");
      isSubmittingRef.current = false;
    }
  }

  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    if (currentStep < TOTAL_STEPS - 1) {
      goNext();
    } else {
      handleSubmit();
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-[#e5e3dc] bg-white p-8 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-12"
      >
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#edf7f0] text-[26px] text-[#34A853]">
          ✓
        </span>
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="text-[24px] font-semibold text-[#111111] outline-none"
        >
          {HOST_COPY.success.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-[15px] leading-[1.7] text-[#5f6876]">
          {HOST_COPY.success.body}
        </p>
        {applicationId && (
          <p className="mt-5 text-[13px] font-medium text-[#5f6876]">
            {HOST_COPY.success.reference(applicationId)}
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onFormSubmit}
      className="rounded-3xl border border-[#e5e3dc] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-10"
    >
      <ProgressIndicator currentStep={currentStep} />

      {status === "error" && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-[#b3261e]/20 bg-[#fdf1f0] px-4 py-3 text-[14px] text-[#b3261e]"
        >
          <p className="font-semibold">{HOST_COPY.failure.title}</p>
          <p className="mt-1">{HOST_COPY.failure.body}</p>
        </div>
      )}

      {currentStep === 0 && (
        <div role="group" aria-labelledby="step-heading">
          <h2
            id="step-heading"
            ref={stepHeadingRef}
            tabIndex={-1}
            className="text-[20px] font-semibold text-[#111111] outline-none"
          >
            {HOST_COPY.step1.title}
          </h2>
          <p className="mt-1.5 text-[14px] text-[#5f6876]">{HOST_COPY.step1.intro}</p>

          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="contactName" className={labelClass}>
                {HOST_COPY.step1.contactName.label}
              </label>
              <input
                id="contactName"
                type="text"
                autoComplete="name"
                maxLength={200}
                className={`${inputClass} ${focusRingClass}`}
                placeholder={HOST_COPY.step1.contactName.placeholder}
                value={formState.contactName}
                onChange={(e) => update("contactName", e.target.value)}
                aria-invalid={errors.contactName ? "true" : undefined}
                aria-describedby={errors.contactName ? "contactName-error" : undefined}
              />
              <FieldError id="contactName-error" message={errors.contactName} />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                {HOST_COPY.step1.email.label}
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                maxLength={320}
                className={`${inputClass} ${focusRingClass}`}
                placeholder={HOST_COPY.step1.email.placeholder}
                value={formState.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={errors.email ? "true" : undefined}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              <FieldError id="email-error" message={errors.email} />
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                {HOST_COPY.step1.phone.label}
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                maxLength={40}
                className={`${inputClass} ${focusRingClass}`}
                placeholder={HOST_COPY.step1.phone.placeholder}
                value={formState.phone}
                onChange={(e) => update("phone", e.target.value)}
                aria-invalid={errors.phone ? "true" : undefined}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              <FieldError id="phone-error" message={errors.phone} />
            </div>

            <div>
              <label htmlFor="hostCompanyName" className={labelClass}>
                {HOST_COPY.step1.hostCompanyName.label}
              </label>
              <input
                id="hostCompanyName"
                type="text"
                maxLength={200}
                className={`${inputClass} ${focusRingClass}`}
                placeholder={HOST_COPY.step1.hostCompanyName.placeholder}
                value={formState.hostCompanyName}
                onChange={(e) => update("hostCompanyName", e.target.value)}
              />
            </div>

            {/* Honeypot — visually hidden and out of tab order. A real
                applicant never sees or interacts with this field. */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: 1,
                height: 1,
                overflow: "hidden",
              }}
            >
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formState.website}
                onChange={(e) => update("website", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <div role="group" aria-labelledby="step-heading">
          <h2
            id="step-heading"
            ref={stepHeadingRef}
            tabIndex={-1}
            className="text-[20px] font-semibold text-[#111111] outline-none"
          >
            {HOST_COPY.step2.title}
          </h2>
          <p className="mt-1.5 text-[14px] text-[#5f6876]">{HOST_COPY.step2.intro}</p>
          <p className="mt-1 text-[13px] text-[#5f6876]">{HOST_COPY.step2.destinationNote}</p>

          <div className="mt-6 space-y-5">
            <fieldset
              id="propertyTypesGroup"
              tabIndex={-1}
              className="m-0 border-0 p-0 outline-none"
              aria-describedby={errors.propertyTypes ? "propertyTypes-error" : undefined}
            >
              <legend className={labelClass}>{HOST_COPY.step2.propertyTypes.legend}</legend>
              <p className="mb-3 text-[13px] text-[#5f6876]">{HOST_COPY.step2.propertyTypes.helper}</p>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {PROPERTY_TYPE_OPTIONS.map((option) => {
                  const isSelected = formState.propertyTypes.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => togglePropertyType(option.value)}
                      aria-pressed={isSelected}
                      className={[
                        "rounded-xl border px-4 py-3 text-left text-[14px] font-medium transition-all duration-200",
                        focusRingClass,
                        isSelected
                          ? "border-[#34A853] bg-[#edf7f0] text-[#0b3d24]"
                          : "border-[#e5e3dc] bg-white text-[#5f6876] hover:border-[#34A853]/40",
                      ].join(" ")}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
              <FieldError id="propertyTypes-error" message={errors.propertyTypes} />
            </fieldset>

            {formState.propertyTypes.includes("other") && (
              <div>
                <label htmlFor="otherPropertyType" className={labelClass}>
                  {HOST_COPY.step2.otherPropertyType.label}
                </label>
                <input
                  id="otherPropertyType"
                  type="text"
                  maxLength={100}
                  className={`${inputClass} ${focusRingClass}`}
                  placeholder={HOST_COPY.step2.otherPropertyType.placeholder}
                  value={formState.otherPropertyType}
                  onChange={(e) => update("otherPropertyType", e.target.value)}
                  aria-invalid={errors.otherPropertyType ? "true" : undefined}
                  aria-describedby={errors.otherPropertyType ? "otherPropertyType-error" : undefined}
                />
                <FieldError id="otherPropertyType-error" message={errors.otherPropertyType} />
              </div>
            )}

            <div>
              <label htmlFor="propertyCount" className={labelClass}>
                {HOST_COPY.step2.propertyCount.label}
              </label>
              <input
                id="propertyCount"
                type="number"
                min={1}
                max={500}
                className={`${inputClass} ${focusRingClass}`}
                placeholder={HOST_COPY.step2.propertyCount.placeholder}
                value={formState.propertyCount}
                onChange={(e) => update("propertyCount", e.target.value)}
                aria-invalid={errors.propertyCount ? "true" : undefined}
                aria-describedby={errors.propertyCount ? "propertyCount-error" : undefined}
              />
              <FieldError id="propertyCount-error" message={errors.propertyCount} />
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div role="group" aria-labelledby="step-heading">
          <h2
            id="step-heading"
            ref={stepHeadingRef}
            tabIndex={-1}
            className="text-[20px] font-semibold text-[#111111] outline-none"
          >
            {HOST_COPY.step3.title}
          </h2>
          <p className="mt-1.5 text-[14px] text-[#5f6876]">{HOST_COPY.step3.intro}</p>

          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="currentGuestSupportModel" className={labelClass}>
                {HOST_COPY.step3.currentGuestSupportModel.label}
              </label>
              <textarea
                id="currentGuestSupportModel"
                rows={3}
                maxLength={500}
                className={`${inputClass} ${focusRingClass}`}
                placeholder={HOST_COPY.step3.currentGuestSupportModel.placeholder}
                value={formState.currentGuestSupportModel}
                onChange={(e) => update("currentGuestSupportModel", e.target.value)}
              />
            </div>

            <fieldset className="m-0 space-y-3 border-0 p-0">
              <legend className={labelClass}>{HOST_COPY.step3.interestsLegend}</legend>
              {(
                [
                  ["interestedInGuestSupport", HOST_COPY.step3.interestedInGuestSupport],
                  ["interestedInQrPlaques", HOST_COPY.step3.interestedInQrPlaques],
                  ["interestedInSmartFill", HOST_COPY.step3.interestedInSmartFill],
                ] as const
              ).map(([key, label]) => (
                <label key={key} htmlFor={key} className={checkboxCardClass}>
                  <input
                    id={key}
                    type="checkbox"
                    className={checkboxInputClass}
                    checked={formState[key]}
                    onChange={(e) => update(key, e.target.checked)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </fieldset>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div role="group" aria-labelledby="step-heading">
          <h2
            id="step-heading"
            ref={stepHeadingRef}
            tabIndex={-1}
            className="text-[20px] font-semibold text-[#111111] outline-none"
          >
            {HOST_COPY.step4.title}
          </h2>
          <p className="mt-1.5 text-[14px] text-[#5f6876]">{HOST_COPY.step4.intro}</p>

          <fieldset className="m-0 mt-6 space-y-3 border-0 p-0">
            <legend className="sr-only">{HOST_COPY.step4.consentLegend}</legend>

            <label htmlFor="consentToContact" className={checkboxCardClass}>
              <input
                id="consentToContact"
                type="checkbox"
                className={checkboxInputClass}
                checked={formState.consentToContact}
                onChange={(e) => update("consentToContact", e.target.checked)}
                aria-invalid={errors.consentToContact ? "true" : undefined}
                aria-describedby={errors.consentToContact ? "consentToContact-error" : undefined}
              />
              <span>{HOST_COPY.step4.consentToContact}</span>
            </label>
            <FieldError id="consentToContact-error" message={errors.consentToContact} />

            <label htmlFor="privacyAcknowledged" className={checkboxCardClass}>
              <input
                id="privacyAcknowledged"
                type="checkbox"
                className={checkboxInputClass}
                checked={formState.privacyAcknowledged}
                onChange={(e) => update("privacyAcknowledged", e.target.checked)}
                aria-invalid={errors.privacyAcknowledged ? "true" : undefined}
                aria-describedby={errors.privacyAcknowledged ? "privacyAcknowledged-error" : undefined}
              />
              <span>{HOST_COPY.step4.privacyAcknowledged}</span>
            </label>
            <FieldError id="privacyAcknowledged-error" message={errors.privacyAcknowledged} />
          </fieldset>

          <p className="pt-4 text-[13px] leading-[1.6] text-[#5f6876]">
            {HOST_COPY.step4.reviewNote}
          </p>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-[#e5e3dc] pt-6">
        {currentStep > 0 ? (
          <button
            type="button"
            onClick={goBack}
            disabled={status === "submitting"}
            className={`rounded-full px-5 py-3 text-[14px] font-semibold text-[#5f6876] transition-colors hover:text-[#111111] disabled:opacity-50 ${focusRingClass}`}
          >
            {HOST_COPY.nav.back}
          </button>
        ) : (
          <span />
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className={`rounded-full bg-[#34A853] px-7 py-3 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(52,168,83,0.2)] transition-all duration-200 hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60 ${focusRingClass}`}
        >
          {currentStep < TOTAL_STEPS - 1
            ? HOST_COPY.nav.next
            : status === "submitting"
              ? HOST_COPY.nav.submitting
              : HOST_COPY.nav.submit}
        </button>
      </div>
    </form>
  );
}
