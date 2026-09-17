import type { PublicDocument } from "@/lib/types";

export const documents: PublicDocument[] = [
  {
    id: "doc-1",
    title: "Party Constitution & Governance Framework",
    description: "Foundational rules, member rights, and administrative structure governing party leadership.",
    category: "Constitution",
    verificationStatus: "placeholder",
    slug: "party-constitution",
    date: "2026-08-14",
    publishedAt: "2026-08-14",
    downloadable: false,
  },
  {
    id: "doc-2",
    title: "Youth Policy & Economic Framework",
    description: "Official policy paper outlining job creation, agritech innovation, and micro-financing roadmaps.",
    category: "Policy documents",
    verificationStatus: "placeholder",
    slug: "youth-policy-framework",
    date: "2026-06-22",
    publishedAt: "2026-06-22",
    downloadable: false,
  },
  {
    id: "doc-3",
    title: "Public Integrity & Open Data Notice",
    description: "Operational standards for elected representatives and transparent financial reporting.",
    category: "Public notices",
    verificationStatus: "placeholder",
    slug: "integrity-open-data-notice",
    date: "2026-04-24",
    publishedAt: "2026-04-24",
    downloadable: false,
  },
];

export function getDocuments(): PublicDocument[] {
  return documents;
}

export function getDocumentBySlug(slug: string): PublicDocument | undefined {
  return documents.find((doc) => doc.slug === slug);
}