"use client";

import { useState, type FormEvent } from "react";
import { FormField, TextInput, TextareaField, SelectField } from "@/components/forms/FormField";
import { FormSuccessState, FormErrorState } from "@/components/forms/FormStates";
import { Button } from "@/components/ui/Button";
import { FORM_PROTOTYPE_NOTICE } from "@/lib/constants";

const inquiryTypes = [
  "General inquiries",
  "Public information requests",
  "Media inquiries",
  "Event inquiries",
  "Partnership inquiries",
  "Membership information",
  "Website feedback",
];

type Status = "idle" | "submitting" | "success" | "error";

// Future API integration point.
async function submitContactForm(): Promise<{ ok: true }> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return { ok: true };
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!email || !email.includes("@")) nextErrors.email = "Please enter a valid email address.";
    if (!message) nextErrors.message = "Please enter a message.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      await submitContactForm();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <FormSuccessState message="Your message was accepted by this prototype's demo flow. It was not actually transmitted or stored anywhere." />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-xl" noValidate>
      {status === "error" && (
        <FormErrorState message="Something went wrong with the demo submission. Please try again." />
      )}
      <FormField label="Inquiry type" htmlFor="inquiry-type">
        <SelectField id="inquiry-type" name="inquiryType" defaultValue={inquiryTypes[0]}>
          {inquiryTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </SelectField>
      </FormField>
      <FormField label="Name" htmlFor="name" error={errors.name}>
        <TextInput id="name" name="name" type="text" required />
      </FormField>
      <FormField label="Email" htmlFor="email" error={errors.email}>
        <TextInput id="email" name="email" type="email" required />
      </FormField>
      <FormField label="Message" htmlFor="message" error={errors.message}>
        <TextareaField id="message" name="message" rows={5} required />
      </FormField>
      <p className="text-xs text-ink-faint">{FORM_PROTOTYPE_NOTICE}</p>
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
