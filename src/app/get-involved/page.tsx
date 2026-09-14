import type { Metadata } from "next";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GetInvolvedChooser } from "@/components/forms/GetInvolvedChooser";

export const metadata: Metadata = { title: "Get Involved" };

export default function GetInvolvedPage() {
  return (
    <>
      <Section border={false} className="pt-14">
        <Eyebrow>Get involved</Eyebrow>
        <h1 className="font-display text-4xl sm:text-5xl mt-4 max-w-3xl leading-tight">
          How would you like to engage?
        </h1>
        <p className="measure text-ink-soft mt-6">
          Not everyone visiting this site wants to join the party. Pick the
          pathway that matches what you&rsquo;re here for.
        </p>
      </Section>
      <Section>
        <GetInvolvedChooser />
      </Section>
    </>
  );
}
