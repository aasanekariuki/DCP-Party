import type { NewsArticle } from "@/lib/types";

// DEMO CONTENT — REPLACE WITH APPROVED ARTICLE
export const newsArticles: NewsArticle[] = [
  {
    id: "news-1",
    title: "DCP launches nationwide listening tour",
    slug: "placeholder-article-one",
    excerpt:
      "Placeholder excerpt. Replace with a real, sourced article before publication.",
    body: "",
    category: "Organizational notice",
    publishedAt: "2026-07-18",
    verificationStatus: "placeholder",
  },
  {
    id: "news-2",
    title: "Statement on public participation in national budgeting",
    slug: "placeholder-article-two",
    excerpt:
      "Placeholder excerpt. Replace with a real, sourced article before publication.",
    body: "Placeholder body copy. Replace with a real, sourced article before publication.",
    category: "Policy",
    publishedAt: "2026-07-10",
    verificationStatus: "placeholder",
  },
  {
    id: "news-3",
    title: "County coordinators sworn in across 15 counties",
    slug: "placeholder-article-three",
    excerpt:
      "Placeholder excerpt. Replace with a real, sourced article before publication.",
    body: "Placeholder body copy. Replace with a real, sourced article before publication.",
    category: "Activities",
    publishedAt: "2026-06-30",
    verificationStatus: "placeholder",
  },
];

export function getNewsArticles() {
  return newsArticles;
}

export function getNewsArticleBySlug(slug: string) {
  return newsArticles.find((a) => a.slug === slug);
}
