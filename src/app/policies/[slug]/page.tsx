import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/layout/PageContainer";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { getPolicyBySlug, policies } from "@/data/policies";

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicyBySlug(slug);
  return { title: policy ? policy.title : "Policy" };
}

export default async function PolicyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = getPolicyBySlug(slug);
  if (!policy) notFound();

  return (
    <Section border={false} className="pt-14">
      <Link href="/policies" className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink mb-8">
        <ArrowLeft size={15} /> Back to policies
      </Link>
      <div className="max-w-2xl">
        <p className="text-sm text-warm font-medium">{policy.category}</p>
        <h1 className="font-display text-4xl mt-2">{policy.title}</h1>
        <div className="mt-4"><VerificationBadge status={policy.verificationStatus} /></div>
        <p className="measure text-ink-soft mt-6 text-lg">{policy.summary}</p>
        <p className="measure text-ink-soft mt-4">{policy.body}</p>
        {policy.keyPoints && policy.keyPoints.length > 0 && (
          <ul className="mt-6 flex flex-col gap-2">
            {policy.keyPoints.map((k) => (
              <li key={k} className="text-ink-soft pl-4 relative before:absolute before:left-0 before:content-['—'] before:text-ink-faint">
                {k}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
