import type { Metadata } from "next";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PROTOTYPE_NOTICE } from "@/lib/constants";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <Section border={false} className="pt-14">
      <Eyebrow>Terms</Eyebrow>
      <h1 className="font-display text-4xl sm:text-5xl mt-4 max-w-3xl leading-tight">Terms of use.</h1>
      <div className="measure text-ink-soft mt-6 flex flex-col gap-4">
        <p>{PROTOTYPE_NOTICE}</p>
        <p>
          Content marked as placeholder or pending verification should not
          be relied upon or redistributed as an official position of the
          party. Verified content is labeled accordingly throughout the
          site.
        </p>
        <p>
          A production deployment would replace this notice with approved
          terms of use covering acceptable use, intellectual property, and
          liability.
        </p>
      </div>
    </Section>
  );
}
