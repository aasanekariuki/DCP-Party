import type { StatementRecord } from "@/lib/types";

// DEMO CONTENT — no verified statements are on record in this prototype.
export const statements: StatementRecord[] = [
  {
    id: "stmt-1",
    title: "Placeholder organizational notice",
    slug: "placeholder-organizational-notice",
    date: "2026-01-01",
    topic: "Organizational notice",
    summary: "Placeholder summary. Replace with an approved, sourced statement before publication.",
    verificationStatus: "placeholder",
  },
  {
    id: "stmt-2",
    title: "Placeholder policy statement",
    slug: "placeholder-policy-statement",
    date: "2026-01-01",
    topic: "Policy statement",
    summary: "Placeholder summary. Replace with an approved, sourced statement before publication.",
    verificationStatus: "placeholder",
  },
];

export function getStatements() {
  return statements;
}

export function getStatementBySlug(slug: string) {
  return statements.find((s) => s.slug === slug);
}
