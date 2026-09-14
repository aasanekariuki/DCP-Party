"use client";

import { useState, type FormEvent } from "react";
import { FormField, TextInput, TextareaField, SelectField, CheckboxField } from "@/components/forms/FormField";
import { FormSuccessState, FormErrorState } from "@/components/forms/FormStates";
import { Button } from "@/components/ui/Button";
import { FORM_PROTOTYPE_NOTICE } from "@/lib/constants";

const topics = [
  "Policy question",
  "General inquiry",
  "Public suggestion",
  "Website feedback",
  "Event question",
  "Document request",
  "Accessibility feedback",
];

type Status = "idle" | "submitting" | "success" | "error";

// Future API integration point. Currently returns a controlled demo
// response — no data leaves the browser.
async function submitFeedbackForm(): Promise<{ ok: true }> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return { ok: true };
}

export function CitizenFeedbackForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const message = String(form.get("message") ?? "").trim();
    const nextErrors: Record<string, string> = {};
    if (!message) nextErrors.message = "Please enter a message before submitting.";
    if (!consent) nextErrors.consent = "Please confirm you understand this is a prototype.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      await submitFeedbackForm();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <FormSuccessState message="Your feedback was accepted by this prototype's demo flow. It was not actually transmitted or stored anywhere." />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-xl" noValidate>
      {status === "error" && (
        <FormErrorState message="Something went wrong with the demo submission. Please try again." />
      )}
      <FormField label="Name (optional)" htmlFor="name">
        <TextInput id="name" name="name" type="text" />
      </FormField>
      <FormField label="Email (optional)" htmlFor="email">
        <TextInput id="email" name="email" type="email" />
      </FormField>
      <FormField label="Topic" htmlFor="topic">
        <SelectField id="topic" name="topic" defaultValue={topics[0]}>
          {topics.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </SelectField>
      </FormField>
      <FormField label="Message" htmlFor="message" error={errors.message}>
        <TextareaField id="message" name="message" rows={5} required />
      </FormField>
      <CheckboxField
        id="consent"
        label={FORM_PROTOTYPE_NOTICE}
        checked={consent}
        onChange={(e) => setConsent(e.target.checked)}
      />
      {errors.consent && <p role="alert" className="text-xs text-[var(--color-danger)] -mt-3">{errors.consent}</p>}
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : "Submit feedback"}
      </Button>
    </form>
  );
}
