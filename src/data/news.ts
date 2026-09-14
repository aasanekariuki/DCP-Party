import type { NewsArticle } from "@/lib/types";

// DEMO CONTENT — REPLACE WITH APPROVED ARTICLE
export const newsArticles: NewsArticle[] = [
  {
    id: "news-1",
    title: "Placeholder headline pending an approved article",
    slug: "placeholder-article-one",
    excerpt:
      "Placeholder excerpt. Replace with a real, sourced article before publication.",
    body: "Placeholder body copy. Replace with a real, sourced article before publication.",
    category: "Organizational notice",
    publishedAt: "2026-01-01",
    verificationStatus: "placeholder",
  },
  {
    id: "news-2",
    title: "Placeholder headline pending an approved article",
    slug: "placeholder-article-two",
    excerpt:
      "Placeholder excerpt. Replace with a real, sourced article before publication.",
    body: "Placeholder body copy. Replace with a real, sourced article before publication.",
    category: "Policy",
    publishedAt: "2026-01-01",
    verificationStatus: "placeholder",
  },
  {
    id: "news-3",
    title: "Placeholder headline pending an approved article",
    slug: "placeholder-article-three",
    excerpt:
      "Placeholder excerpt. Replace with a real, sourced article before publication.",
    body: "Placeholder body copy. Replace with a real, sourced article before publication.",
    category: "Activities",
    publishedAt: "2026-01-01",
    verificationStatus: "placeholder",
  },
];

export function getNewsArticles() {
  return newsArticles;
}

export function getNewsArticleBySlug(slug: string) {
  return newsArticles.find((a) => a.slug === slug);
}
