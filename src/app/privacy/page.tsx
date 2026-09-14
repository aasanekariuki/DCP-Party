import type { Metadata } from "next";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FORM_PROTOTYPE_NOTICE } from "@/lib/constants";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <Section border={false} className="pt-14">
      <Eyebrow>Privacy</Eyebrow>
      <h1 className="font-display text-4xl sm:text-5xl mt-4 max-w-3xl leading-tight">Privacy notice.</h1>
      <div className="measure text-ink-soft mt-6 flex flex-col gap-4">
        <p>{FORM_PROTOTYPE_NOTICE}</p>
        <p>
          This prototype does not use analytics or third-party trackers
          beyond what the hosting platform provides by default. Forms on
          this site (contact, citizen feedback) do not transmit their
          contents anywhere in this version.
        </p>
        <p>
          A production deployment would replace this notice with an
          approved privacy policy describing what data is collected, how
          long it is retained, and how people can request its deletion.
        </p>
      </div>
    </Section>
  );
}
