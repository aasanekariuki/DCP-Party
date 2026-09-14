import type { Metadata } from "next";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Membership" };

const sections = [
  { title: "Membership overview", note: "Official membership information will be published here once confirmed." },
  { title: "Eligibility", note: "Official eligibility requirements will be published here once confirmed." },
  { title: "Registration process", note: "Official registration process will be published here once confirmed." },
  { title: "Membership fee", note: "No fee has been verified for publication. This section will only show a figure once confirmed." },
];

export default function MembershipPage() {
  return (
    <>
      <Section border={false} className="pt-14">
        <Eyebrow>Membership</Eyebrow>
        <h1 className="font-display text-4xl sm:text-5xl mt-4 max-w-3xl leading-tight">
          Joining the party.
        </h1>
        <p className="measure text-ink-soft mt-6">
          This page only publishes verified official information. Nothing
          below is an invented fee, requirement, or process.
        </p>
        <div className="mt-4"><VerificationBadge status="pending-verification" /></div>
      </Section>
      <Section>
        <div className="grid sm:grid-cols-2 gap-6">
          {sections.map((s) => (
            <div key={s.title} className="border rule rounded-[4px] p-6">
              <h3 className="font-display text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-ink-soft">{s.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/contact" variant="secondary">Ask about membership</Button>
        </div>
      </Section>
    </>
  );
}
