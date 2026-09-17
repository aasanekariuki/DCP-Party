"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";

import {
  FormField,
  TextInput,
  TextareaField,
  SelectField,
  CheckboxField,
} from "@/components/forms/FormField";
import {
  FormSuccessState,
  FormErrorState,
} from "@/components/forms/FormStates";
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
] as const;

type Status = "idle" | "submitting" | "success" | "error";

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  topic?: string;
  message?: string;
  consent?: string;
};

async function submitFeedbackForm(
  _data: Record<string, string>,
): Promise<{ ok: true }> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return { ok: true };
}

export function CitizenFeedbackForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [consent, setConsent] = useState(false);

  function validateForm(form: FormData): FormErrors {
    const nextErrors: FormErrors = {};

    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const topic = String(form.get("topic") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    if (!message) {
      nextErrors.message =
        "Please enter a message before submitting.";
    } else if (message.length < 10) {
      nextErrors.message =
        "Please provide a little more detail in your message.";
    }

    if (email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        nextErrors.email =
          "Please enter a valid email address or leave this field blank.";
      }
    }

    if (phone) {
      const phonePattern = /^[+0-9\s().-]{7,20}$/;

      if (!phonePattern.test(phone)) {
        nextErrors.phone =
          "Please enter a valid phone number or leave this field blank.";
      }
    }

    if (!topic) {
      nextErrors.topic = "Please select a topic.";
    }

    if (!consent) {
      nextErrors.consent =
        "Please confirm you understand this is a prototype.";
    }

    return nextErrors;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (status === "submitting") return;

    const form = new FormData(event.currentTarget);
    const nextErrors = validateForm(form);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    const data = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      topic: String(form.get("topic") ?? "").trim(),
      message: String(form.get("message") ?? "").trim(),
      consent: consent ? "true" : "false",
    };

    setStatus("submitting");

    try {
      const response = await submitFeedbackForm(data);

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function handleConsentChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const checked = event.target.checked;

    setConsent(checked);

    if (checked) {
      setErrors((current) => ({
        ...current,
        consent: undefined,
      }));
    }
  }

  if (status === "success") {
    return (
      <div className="max-w-2xl">
        <FormSuccessState message="Your feedback was accepted by this prototype's demo flow. It was not actually transmitted or stored anywhere." />

        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setConsent(false);
            setErrors({});
          }}
          className="mt-5 text-sm font-medium text-mint-soft underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl"
      noValidate
    >
      <p className="mb-7 max-w-xl text-sm leading-6 text-ink-soft">
        Fields marked optional can be left blank. Your message is
        the only required content for this feedback form.
      </p>

      <div className="space-y-6">
        {status === "error" && (
          <FormErrorState message="Something went wrong with the demo submission. Please review the form and try again." />
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Name (optional)"
            htmlFor="name"
          >
            <TextInput
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
            />
          </FormField>

          <FormField
            label="Email (optional)"
            htmlFor="email"
            error={errors.email}
          >
            <TextInput
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
            />
          </FormField>
        </div>

        {/* Phone number */}
        <FormField
          label="Phone number (optional)"
          htmlFor="phone"
          error={errors.phone}
        >
          <TextInput
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+254 700 000 000"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby="phone-help"
          />

          <p
            id="phone-help"
            className="mt-2 text-xs leading-5 text-ink-soft"
          >
            Include your country code if you would like to be
            contacted by phone.
          </p>
        </FormField>

        <FormField
          label="Topic"
          htmlFor="topic"
          error={errors.topic}
        >
          <SelectField
            id="topic"
            name="topic"
            defaultValue={topics[0]}
            aria-invalid={Boolean(errors.topic)}
          >
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </SelectField>
        </FormField>

        <FormField
          label="Message"
          htmlFor="message"
          error={errors.message}
        >
          <TextareaField
            id="message"
            name="message"
            rows={7}
            required
            minLength={10}
            placeholder="Write your question, suggestion, or feedback..."
            aria-invalid={Boolean(errors.message)}
          />
        </FormField>

        <div className="rounded-[4px] border rule bg-paper-raised p-4 sm:p-5">
          <CheckboxField
            id="consent"
            name="consent"
            label={FORM_PROTOTYPE_NOTICE}
            checked={consent}
            onChange={handleConsentChange}
          />

          {errors.consent && (
            <p
              role="alert"
              className="mt-3 text-xs leading-5 text-[var(--color-danger)]"
            >
              {errors.consent}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-xs leading-5 text-ink-soft">
            This is currently a browser-only prototype. No
            information is transmitted or stored.
          </p>

          <Button
            type="submit"
            disabled={status === "submitting"}
          >
            {status === "submitting"
              ? "Submitting…"
              : "Submit feedback"}
          </Button>
        </div>
      </div>
    </form>
  );
}