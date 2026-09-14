import type { Metadata } from "next";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StatementsExplorer } from "@/components/content/StatementsExplorer";
import { getStatements } from "@/data/statements";

export const metadata: Metadata = { title: "Official Statements" };

export default function StatementsPage() {
  const statements = getStatements();
  const categories = Array.from(new Set(statements.map((s) => s.topic)));

  return (
    <>
      <Section border={false} className="pt-14">
        <Eyebrow>Official statements</Eyebrow>
        <h1 className="font-display text-4xl sm:text-5xl mt-4 max-w-3xl leading-tight">
          Formal positions and notices.
        </h1>
        <p className="measure text-ink-soft mt-6">
          Statements are catalogued here as they are published and verified.
          Placeholder entries are clearly marked and do not represent real
          statements.
        </p>
      </Section>
      <Section>
        <StatementsExplorer statements={statements} categories={categories} />
      </Section>
    </>
  );
}
