import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/layout/PageContainer";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { getNewsArticleBySlug, newsArticles } from "@/data/news";

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);
  return { title: article ? article.title : "Article" };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);
  if (!article) notFound();

  return (
    <Section border={false} className="pt-14">
      <Link href="/news" className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink mb-8">
        <ArrowLeft size={15} /> Back to news
      </Link>
      <div className="max-w-2xl">
        <div className="flex items-center justify-between text-xs text-ink-faint mb-3">
          <span>{article.category}</span>
          <span>
            {new Date(article.publishedAt).toLocaleDateString("en-KE", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </span>
        </div>
        <h1 className="font-display text-4xl leading-tight">{article.title}</h1>
        <div className="mt-4"><VerificationBadge status={article.verificationStatus} /></div>
        <p className="measure text-ink-soft mt-6 text-lg">{article.excerpt}</p>
        <p className="measure text-ink-soft mt-4">{article.body}</p>
      </div>
    </Section>
  );
}
