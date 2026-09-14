import type { Metadata } from "next";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CitizenFeedbackForm } from "@/components/forms/CitizenFeedbackForm";

export const metadata: Metadata = { title: "Citizen Feedback" };

export default function CitizenFeedbackPage() {
  return (
    <>
      <Section border={false} className="pt-14">
        <Eyebrow>Citizen feedback</Eyebrow>
        <h1 className="font-display text-4xl sm:text-5xl mt-4 max-w-3xl leading-tight">
          Ask a question or share a suggestion.
        </h1>
        <p className="measure text-ink-soft mt-6">
          Use this form for policy questions, general inquiries, suggestions,
          or accessibility feedback about the site itself.
        </p>
      </Section>
      <Section>
        <CitizenFeedbackForm />
      </Section>
    </>
  );
}
