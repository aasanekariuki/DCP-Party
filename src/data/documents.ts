import type { PublicDocument } from "@/lib/types";

export const documents: PublicDocument[] = [
  {
    id: "doc-1",
    title: "Party constitution",
    description: "Official document pending publication.",
    category: "Constitution",
    verificationStatus: "placeholder",
    slug: "",
    url: undefined,
    downloadable: undefined,
    publishedAt: ""
  },
  {
    id: "doc-2",
    title: "Policy documents",
    description: "Official document pending publication.",
    category: "Policy documents",
    verificationStatus: "placeholder",
    slug: "",
    url: undefined,
    downloadable: undefined,
    publishedAt: ""
  },
  {
    id: "doc-3",
    title: "Public notices",
    description: "Official document pending publication.",
    category: "Public notices",
    verificationStatus: "placeholder",
    slug: "",
    url: undefined,
    downloadable: undefined,
    publishedAt: ""
  },
];

export function getDocuments() {
  return documents;
}
