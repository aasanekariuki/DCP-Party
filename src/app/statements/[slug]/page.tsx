import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Section } from "@/components/layout/PageContainer";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { getStatementBySlug, statements } from "@/data/statements";

export function generateStaticParams() {
  return statements.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const statement = getStatementBySlug(slug);
  return { title: statement ? statement.title : "Statement" };
}

export default async function StatementDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const statement = getStatementBySlug(slug);
  if (!statement) notFound();

  return (
    <Section border={false} className="pt-14">
      <Link href="/statements" className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink mb-8">
        <ArrowLeft size={15} /> Back to statements
      </Link>
      <div className="max-w-2xl">
        <div className="flex items-center justify-between text-xs text-ink-faint mb-3">
          <span>{statement.topic}</span>
          <span>{new Date(statement.date).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}</span>
        </div>
        <h1 className="font-display text-4xl leading-tight">{statement.title}</h1>
        <div className="mt-4"><VerificationBadge status={statement.verificationStatus} /></div>
        <p className="measure text-ink-soft mt-6 text-lg">{statement.summary}</p>
        {statement.documentUrl ? (
          <a href={statement.documentUrl} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
            <Download size={15} /> Download the document
          </a>
        ) : (
          <p className="mt-6 text-sm text-ink-faint">Official document pending publication.</p>
        )}
      </div>
    </Section>
  );
}
