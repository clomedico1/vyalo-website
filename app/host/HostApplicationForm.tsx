"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { apiUrl } from "../../lib/api";
import { HOST_COPY, PROPERTY_TYPE_OPTIONS, SMARTFILL_EXAMPLE_WEEK } from "./copy";
import {
  EMPTY_FORM_STATE,
  type HostApplicationApiResponse,
  type HostApplicationFormState,
  type HostApplicationPayload,
  type PropertyType,
  type SmartFillDetails,
} from "./types";
import {
  hasErrors,
  validateStep1,
  validateStep2,
  validateStep3,
  type FieldErrors,
} from "./validation";

const TOTAL_STEPS = HOST_COPY.steps.length;

const STEP_VALIDATORS = [validateStep1, validateStep2, validateStep3];

// Maps a validation error key to the id of the element that should receive
// focus when that error is the first one on the step.
const FIELD_FOCUS_TARGET: Record<string, string> = {
  contactName: "contactName",
  email: "email",
  phone: "phone",
  propertyName: "propertyName",
  propertyType: "propertyTypeGroup",
  otherPropertyType: "otherPropertyType",
  propertyAddress: "propertyAddress",
  propertyCount: "propertyCount",
  consentToContact: "consentToContact",
  privacyAcknowledged: "privacyAcknowledged",
};

function buildSmartFillDetails(state: HostApplicationFormState): SmartFillDetails | undefined {
  if (!state.smartFillEnabled) return undefined;
  const sf = state.smartFill;

  const toNumber = (value: string) => (value.trim() ? Number(value) : undefined);

  return {
    description: sf.description.trim() || undefined,
    photosLink: sf.photosLink.trim() || undefined,
    bedrooms: toNumber(sf.bedrooms),
    bathrooms: toNumber(sf.bathrooms),
    beds: toNumber(sf.beds),
    maxGuests: toNumber(sf.maxGuests),
    wifi: sf.wifi || undefined,
    parking: sf.parking || undefined,
    pool: sf.pool || undefined,
    kitchen: sf.kitchen || undefined,
    airConditioning: sf.airConditioning || undefined,
    outdoorArea: sf.outdoorArea || undefined,
    houseRules: sf.houseRules.trim() || undefined,
    checkIn: sf.checkIn.trim() || undefined,
    checkOut: sf.checkOut.trim() || undefined,
  };
}

function buildPayload(state: HostApplicationFormState): HostApplicationPayload {
  return {
    contactName: state.contactName.trim(),
    email: state.email.trim(),
    phone: state.phone.trim(),
    hostCompanyName: state.propertyName.trim() || undefined,
    propertyAddress: state.propertyAddress.trim() || undefined,
    propertyTypes: state.propertyType ? [state.propertyType] : [],
    otherPropertyType:
      state.propertyType === "other" ? state.otherPropertyType.trim() : undefined,
    propertyCount: state.structureMode === "multiple" ? Number(state.propertyCount) : 1,
    preferredLanguage: "it",
    interestedInSmartFill: state.smartFillEnabled,
    smartFillDetails: buildSmartFillDetails(state),
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

function SmartFillExampleCard() {
  return (
    <div className="rounded-2xl border border-[#e5e3dc] bg-[#f6f6f3] p-5">
      <p className="mb-3 text-[13px] font-semibold text-[#5f6876]">
        {HOST_COPY.step3.smartFill.exampleCaption}
      </p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {SMARTFILL_EXAMPLE_WEEK.map((d) => (
          <div
            key={d.day}
            className={[
              "rounded-lg px-1 py-3 text-center text-[12px] font-semibold",
              d.status === "empty"
                ? "bg-[#edf7f0] text-[#0b3d24] ring-2 ring-[#34A853]/50"
                : "bg-white text-[#5f6876] ring-1 ring-black/[0.06]",
            ].join(" ")}
          >
            <div>{d.day}</div>
            <div className="mt-1 text-[10px] font-normal">
              {d.status === "empty" ? "Libero" : "Prenotato"}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[13px] leading-[1.6] text-[#5f6876]">
        {HOST_COPY.step3.smartFill.exampleResult}
      </p>
    </div>
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
const radioCardClass = (isSelected: boolean) =>
  [
    "rounded-xl border px-4 py-3 text-left text-[14px] font-medium transition-all duration-200",
    focusRingClass,
    isSelected
      ? "border-[#34A853] bg-[#edf7f0] text-[#0b3d24]"
      : "border-[#e5e3dc] bg-white text-[#5f6876] hover:border-[#34A853]/40",
  ].join(" ");

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

  function updateSmartFill<K extends keyof HostApplicationFormState["smartFill"]>(
    key: K,
    value: HostApplicationFormState["smartFill"][K]
  ) {
    setFormState((prev) => ({ ...prev, smartFill: { ...prev.smartFill, [key]: value } }));
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

    const stepErrors = validateStep3(formState);
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
        console.error("Host onboarding submission failed with status", response.status);
        setStatus("error");
        isSubmittingRef.current = false;
        return;
      }

      const data: HostApplicationApiResponse = await response.json();
      setApplicationId(data.applicationId ?? null);
      setStatus("success");
    } catch (err) {
      console.error("Host onboarding submission error:", err);
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

            {/* Honeypot — visually hidden and out of tab order. */}
            <div
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
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

          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="propertyName" className={labelClass}>
                {HOST_COPY.step2.propertyName.label}
              </label>
              <input
                id="propertyName"
                type="text"
                maxLength={200}
                className={`${inputClass} ${focusRingClass}`}
                placeholder={HOST_COPY.step2.propertyName.placeholder}
                value={formState.propertyName}
                onChange={(e) => update("propertyName", e.target.value)}
                aria-invalid={errors.propertyName ? "true" : undefined}
                aria-describedby={errors.propertyName ? "propertyName-error" : undefined}
              />
              <FieldError id="propertyName-error" message={errors.propertyName} />
            </div>

            <fieldset
              id="propertyTypeGroup"
              tabIndex={-1}
              className="m-0 border-0 p-0 outline-none"
              aria-describedby={errors.propertyType ? "propertyType-error" : undefined}
            >
              <legend className={labelClass}>{HOST_COPY.step2.propertyType.legend}</legend>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {PROPERTY_TYPE_OPTIONS.map((option) => {
                  const isSelected = formState.propertyType === option.value;
                  return (
                    <label key={option.value} className={radioCardClass(isSelected)}>
                      <input
                        type="radio"
                        name="propertyType"
                        value={option.value}
                        checked={isSelected}
                        onChange={() => update("propertyType", option.value as PropertyType)}
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
              <FieldError id="propertyType-error" message={errors.propertyType} />
            </fieldset>

            {formState.propertyType === "other" && (
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
              <label htmlFor="propertyAddress" className={labelClass}>
                {HOST_COPY.step2.propertyAddress.label}
              </label>
              <input
                id="propertyAddress"
                type="text"
                maxLength={300}
                className={`${inputClass} ${focusRingClass}`}
                placeholder={HOST_COPY.step2.propertyAddress.placeholder}
                value={formState.propertyAddress}
                onChange={(e) => update("propertyAddress", e.target.value)}
                aria-invalid={errors.propertyAddress ? "true" : undefined}
                aria-describedby={errors.propertyAddress ? "propertyAddress-error" : undefined}
              />
              <FieldError id="propertyAddress-error" message={errors.propertyAddress} />
            </div>

            <fieldset className="m-0 border-0 p-0">
              <legend className={labelClass}>{HOST_COPY.step2.structure.legend}</legend>
              <div className="grid grid-cols-2 gap-2.5">
                <label className={radioCardClass(formState.structureMode === "single")}>
                  <input
                    type="radio"
                    name="structureMode"
                    className="sr-only"
                    checked={formState.structureMode === "single"}
                    onChange={() => update("structureMode", "single")}
                  />
                  {HOST_COPY.step2.structure.single}
                </label>
                <label className={radioCardClass(formState.structureMode === "multiple")}>
                  <input
                    type="radio"
                    name="structureMode"
                    className="sr-only"
                    checked={formState.structureMode === "multiple"}
                    onChange={() => update("structureMode", "multiple")}
                  />
                  {HOST_COPY.step2.structure.multiple}
                </label>
              </div>

              {formState.structureMode === "multiple" && (
                <div className="mt-4">
                  <label htmlFor="propertyCount" className={labelClass}>
                    {HOST_COPY.step2.structure.countLabel}
                  </label>
                  <input
                    id="propertyCount"
                    type="number"
                    min={2}
                    max={500}
                    className={`${inputClass} ${focusRingClass}`}
                    placeholder={HOST_COPY.step2.structure.countPlaceholder}
                    value={formState.propertyCount}
                    onChange={(e) => update("propertyCount", e.target.value)}
                    aria-invalid={errors.propertyCount ? "true" : undefined}
                    aria-describedby={errors.propertyCount ? "propertyCount-error" : undefined}
                  />
                  <FieldError id="propertyCount-error" message={errors.propertyCount} />
                  <p className="mt-1.5 text-[13px] text-[#5f6876]">{HOST_COPY.step2.structure.helper}</p>
                </div>
              )}
            </fieldset>
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

          <div className="mt-6 rounded-2xl border border-[#e5e3dc] p-5">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-[#34A853]">
              {HOST_COPY.step3.smartFill.eyebrow}
            </p>
            <h3 className="mt-1 text-[18px] font-semibold text-[#111111]">
              {HOST_COPY.step3.smartFill.title}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.7] text-[#5f6876]">
              {HOST_COPY.step3.smartFill.body}
            </p>

            <div className="mt-4">
              <SmartFillExampleCard />
            </div>

            <label
              htmlFor="smartFillEnabled"
              className={`${checkboxCardClass} mt-5 border-[#34A853]/30`}
            >
              <input
                id="smartFillEnabled"
                type="checkbox"
                className={checkboxInputClass}
                checked={formState.smartFillEnabled}
                onChange={(e) => update("smartFillEnabled", e.target.checked)}
              />
              <span className="font-semibold">{HOST_COPY.step3.smartFill.enableLabel}</span>
            </label>

            {formState.smartFillEnabled && (
              <div className="mt-6 space-y-5 border-t border-[#e5e3dc] pt-6">
                <p className="text-[13px] text-[#5f6876]">{HOST_COPY.step3.smartFill.expansionIntro}</p>

                <div>
                  <label htmlFor="sf-description" className={labelClass}>
                    {HOST_COPY.step3.fields.description.label}
                  </label>
                  <textarea
                    id="sf-description"
                    rows={3}
                    maxLength={2000}
                    className={`${inputClass} ${focusRingClass}`}
                    placeholder={HOST_COPY.step3.fields.description.placeholder}
                    value={formState.smartFill.description}
                    onChange={(e) => updateSmartFill("description", e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="sf-photosLink" className={labelClass}>
                    {HOST_COPY.step3.fields.photosLink.label}
                  </label>
                  <input
                    id="sf-photosLink"
                    type="text"
                    maxLength={500}
                    className={`${inputClass} ${focusRingClass}`}
                    placeholder={HOST_COPY.step3.fields.photosLink.placeholder}
                    value={formState.smartFill.photosLink}
                    onChange={(e) => updateSmartFill("photosLink", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {(
                    [
                      ["bedrooms", HOST_COPY.step3.fields.bedrooms],
                      ["bathrooms", HOST_COPY.step3.fields.bathrooms],
                      ["beds", HOST_COPY.step3.fields.beds],
                      ["maxGuests", HOST_COPY.step3.fields.maxGuests],
                    ] as const
                  ).map(([key, field]) => (
                    <div key={key}>
                      <label htmlFor={`sf-${key}`} className={labelClass}>
                        {field.label}
                      </label>
                      <input
                        id={`sf-${key}`}
                        type="number"
                        min={0}
                        max={100}
                        className={`${inputClass} ${focusRingClass}`}
                        placeholder={field.placeholder}
                        value={formState.smartFill[key]}
                        onChange={(e) => updateSmartFill(key, e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <fieldset className="m-0 border-0 p-0">
                  <legend className={labelClass}>{HOST_COPY.step3.fields.amenitiesLegend}</legend>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {(
                      [
                        ["wifi", HOST_COPY.step3.fields.wifi],
                        ["parking", HOST_COPY.step3.fields.parking],
                        ["pool", HOST_COPY.step3.fields.pool],
                        ["kitchen", HOST_COPY.step3.fields.kitchen],
                        ["airConditioning", HOST_COPY.step3.fields.airConditioning],
                        ["outdoorArea", HOST_COPY.step3.fields.outdoorArea],
                      ] as const
                    ).map(([key, label]) => (
                      <label key={key} className={checkboxCardClass}>
                        <input
                          type="checkbox"
                          className={checkboxInputClass}
                          checked={formState.smartFill[key]}
                          onChange={(e) => updateSmartFill(key, e.target.checked)}
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="sf-houseRules" className={labelClass}>
                    {HOST_COPY.step3.fields.houseRules.label}
                  </label>
                  <textarea
                    id="sf-houseRules"
                    rows={2}
                    maxLength={1000}
                    className={`${inputClass} ${focusRingClass}`}
                    placeholder={HOST_COPY.step3.fields.houseRules.placeholder}
                    value={formState.smartFill.houseRules}
                    onChange={(e) => updateSmartFill("houseRules", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="sf-checkIn" className={labelClass}>
                      {HOST_COPY.step3.fields.checkIn.label}
                    </label>
                    <input
                      id="sf-checkIn"
                      type="text"
                      maxLength={20}
                      className={`${inputClass} ${focusRingClass}`}
                      placeholder={HOST_COPY.step3.fields.checkIn.placeholder}
                      value={formState.smartFill.checkIn}
                      onChange={(e) => updateSmartFill("checkIn", e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="sf-checkOut" className={labelClass}>
                      {HOST_COPY.step3.fields.checkOut.label}
                    </label>
                    <input
                      id="sf-checkOut"
                      type="text"
                      maxLength={20}
                      className={`${inputClass} ${focusRingClass}`}
                      placeholder={HOST_COPY.step3.fields.checkOut.placeholder}
                      value={formState.smartFill.checkOut}
                      onChange={(e) => updateSmartFill("checkOut", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <fieldset className="m-0 mt-6 space-y-3 border-0 p-0">
            <legend className="sr-only">{HOST_COPY.step3.consentLegend}</legend>

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
              <span>{HOST_COPY.step3.consentToContact}</span>
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
              <span>{HOST_COPY.step3.privacyAcknowledged}</span>
            </label>
            <FieldError id="privacyAcknowledged-error" message={errors.privacyAcknowledged} />
          </fieldset>

          <p className="pt-4 text-[13px] leading-[1.6] text-[#5f6876]">{HOST_COPY.step3.reviewNote}</p>
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
