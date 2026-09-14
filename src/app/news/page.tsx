import type { Metadata } from "next";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { NewsExplorer } from "@/components/content/NewsExplorer";
import { getNewsArticles } from "@/data/news";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  const articles = getNewsArticles();
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <>
      <Section border={false} className="pt-14">
        <Eyebrow>News</Eyebrow>
        <h1 className="font-display text-4xl sm:text-5xl mt-4 max-w-3xl leading-tight">
          Reporting on the party&rsquo;s activity.
        </h1>
        <p className="measure text-ink-soft mt-6">
          Articles below are demo content pending approved reporting. Each
          carries a verification status.
        </p>
      </Section>
      <Section>
        <NewsExplorer articles={articles} categories={categories} />
      </Section>
    </>
  );
}
