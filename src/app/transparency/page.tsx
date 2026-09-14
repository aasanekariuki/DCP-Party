import type { Metadata } from "next";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Transparency" };

const sections = [
  { title: "Official documents", href: "/documents" },
  { title: "Published reports", href: "#reports" },
  { title: "Public statements", href: "/statements" },
  { title: "Contact information", href: "/contact" },
];

export default function TransparencyPage() {
  return (
    <>
      <Section border={false} className="pt-14">
        <Eyebrow>Transparency</Eyebrow>
        <h1 className="font-display text-4xl sm:text-5xl mt-4 max-w-3xl leading-tight">
          Public information and accountability.
        </h1>
        <p className="measure text-ink-soft mt-6">
          This page communicates openness without making unsupported claims.
          No financial figures are fabricated in this prototype.
        </p>
      </Section>
      <Section>
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {sections.map((s) => (
            <Button key={s.title} href={s.href} variant="secondary" className="justify-start">
              {s.title}
            </Button>
          ))}
        </div>
        <h2 id="reports" className="font-display text-2xl mb-6">Financial and accountability reports</h2>
        <EmptyState
          title="No verified report has been published"
          description="This section is prepared for approved financial and accountability documents once they are confirmed for release."
        />
      </Section>
    </>
  );
}
