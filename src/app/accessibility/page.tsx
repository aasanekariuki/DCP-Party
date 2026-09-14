import type { Metadata } from "next";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Accessibility" };

const commitments = [
  "Semantic HTML and a logical heading hierarchy on every page",
  "Full keyboard navigation, including the mobile menu and dropdowns",
  "Visible focus states throughout",
  "Reduced-motion support for anyone with that system preference set",
  "Sufficient color contrast and no color-only meaning",
  "Descriptive alt text and accessible forms with clear error messages",
];

export default function AccessibilityPage() {
  return (
    <Section border={false} className="pt-14">
      <Eyebrow>Accessibility</Eyebrow>
      <h1 className="font-display text-4xl sm:text-5xl mt-4 max-w-3xl leading-tight">
        Our accessibility commitments.
      </h1>
      <ul className="measure mt-8 flex flex-col gap-3">
        {commitments.map((c) => (
          <li key={c} className="text-ink-soft pl-4 relative before:absolute before:left-0 before:content-['—'] before:text-ink-faint">
            {c}
          </li>
        ))}
      </ul>
      <p className="measure text-ink-soft mt-8">
        If you encounter an accessibility barrier anywhere on this
        prototype, please tell us through the citizen feedback form so it
        can be addressed.
      </p>
      <div className="mt-6">
        <Button href="/citizen-feedback" variant="secondary">Report an accessibility issue</Button>
      </div>
    </Section>
  );
}
