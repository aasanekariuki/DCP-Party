import type { Policy } from "@/lib/types";

// DEMO CONTENT — REPLACE WITH APPROVED POLICY TEXT
// Summaries below describe general topic areas only. None of this
// represents an actual confirmed DCP policy position.
export const policies: Policy[] = [
  {
    id: "economy",
    title: "Economy",
    slug: "economy",
    category: "Economy",
    summary:
      "Building a resilient and inclusive economy that empowers every individual and drives sustainable growth through innovation and responsible stewardship.",
    body:
      "This is a placeholder record for the Economy policy area. Replace with an approved policy document describing the party's actual, sourced position on economic matters.",
    keyPoints: ["Draft placeholder — not an official position"],
    verificationStatus: "placeholder",
  },
  {
    id: "Infrastructure",
    title: "Infrastructure",
    slug: "Infrastructure",
    category: "Infrastructure",
    summary:
      "Roads, housing and utilities that connect Kenya.",
    body:
      "This is a placeholder record for the Infrastructure policy area. Replace with an approved policy document describing the party's actual, sourced position on infrastructure matters.",
    keyPoints: ["Draft placeholder — not an official position"],
    verificationStatus: "placeholder",
  },
  {
    id: "Employment",
    title: "Employment",
    slug: "Employment",
    category: "Employment",
    summary:
      "Jobs, entrepreneurship and industrial growth.",
    body:
      "This is a placeholder record for the Employment policy area. Replace with an approved policy document describing the party's actual, sourced position on employment matters.",
    keyPoints: ["Draft placeholder — not an official position"],
    verificationStatus: "placeholder",
  },
  {
    id: "education",
    title: "Education",
    slug: "education",
    category: "Education",
    summary:
      "Quality, affordable learning from ECDE to tertiary.",
    body:
      "This is a placeholder record for the Education policy area. Replace with an approved policy document describing the party's actual, sourced position on education matters.",
    verificationStatus: "placeholder",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    slug: "healthcare",
    category: "Healthcare",
    summary:
      "Accessible, dignified care in every county.",
    body:
      "This is a placeholder record for the Healthcare policy area. Replace with an approved policy document.",
    verificationStatus: "placeholder",
  },
  {
    id: "National Unity",
    title: "National Unity",
    slug: "National Unity",
    category: "National Unity",
    summary:
      "Bridging communities and generations across Kenya.",
    body:
      "This is a placeholder record for the National Unity policy area. Replace with an approved policy document.",
    verificationStatus: "placeholder",
  },
  {
    id: "agriculture",
    title: "Agriculture",
    slug: "agriculture",
    category: "Agriculture",
    summary:
      "Food security and prosperity for our farmers.",
    body:
      "This is a placeholder record for the Agriculture policy area. Replace with an approved policy document.",
    verificationStatus: "placeholder",
  },
  {
    id: "governance",
    title: "Governance",
    slug: "governance",
    category: "Governance",
    summary:
      "Transparent, accountable public institutions.",
    body:
      "This is a placeholder record for the Governance policy area. Replace with an approved policy document.",
    verificationStatus: "placeholder",
  },
  {
    id: "Inclusion",
    title: "Inclusion",
    slug: "Inclusion",
    category: "Inclusion",
    summary:
      "Ensuring all citizens have equal access to opportunities and resources.",
    body:
      "This is a placeholder record for the Inclusion policy area. Replace with an approved policy document.",
    verificationStatus: "placeholder",
  },
  {
    id: "devolution",
    title: "Devolution",
    slug: "devolution",
    category: "Devolution",
    summary:
      "Strong counties, empowered local leadership.",
    body:
      "This is a placeholder record for the Devolution policy area. Replace with an approved policy document.",
    verificationStatus: "placeholder",
  },
  {
    id: "Technology",
    title: "Technology",
    slug: "Technology",
    category: "Technology",
    summary:
      "Innovation and a digital economy for all.",
    body:
      "This is a placeholder record for the Technology policy area. Replace with an approved policy document.",
    verificationStatus: "placeholder",
  },
  {
    id: "Housing",
    title: "Housing",
    slug: "Housing",
    category: "Housing",
    summary:
      "Affordable, safe and secure housing for all.",
    body:
      "This is a placeholder record for the Housing policy area. Replace with an approved policy document.",
    verificationStatus: "placeholder",
  },
];

export function getPolicies() {
  return policies;
}

export function getPolicyBySlug(slug: string) {
  return policies.find((p) => p.slug === slug);
}

export const policyCategories = Array.from(new Set(policies.map((p) => p.category)));
