import type { Metadata } from "next";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PolicyExplorer } from "@/components/policies/PolicyExplorer";
import { getPolicies, policyCategories } from "@/data/policies";

export const metadata: Metadata = { title: "Policies" };

export default async function PoliciesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const policies = getPolicies();
  const matchedCategory = policyCategories.find(
    (c) => c.toLowerCase().replace(/\s+/g, "-") === category
  );

  return (
    <>
      <Section border={false} className="pt-14">
        <Eyebrow>Policy explorer</Eyebrow>
        <h1 className="font-display text-4xl sm:text-5xl mt-4 max-w-3xl leading-tight">
          Priorities by topic.
        </h1>
        <p className="measure text-ink-soft mt-6">
          Every entry below is a topic placeholder pending an approved
          policy document. None of this represents a confirmed party
          position.
        </p>
      </Section>
      <Section>
        <PolicyExplorer
          policies={policies}
          categories={policyCategories}
          initialCategory={matchedCategory}
        />
      </Section>
    </>
  );
}
