import Link from "next/link";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { ArrowLeft } from "lucide-react";

export function ActivityAreaPage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Section border={false} className="pt-14">
      <Link href="/activities" className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink mb-8">
        <ArrowLeft size={15} /> Back to activities
      </Link>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="font-display text-4xl sm:text-5xl mt-4 max-w-3xl leading-tight">{title}</h1>
      <p className="measure text-ink-soft mt-6">{description}</p>
      <div className="mt-4"><VerificationBadge status="placeholder" /></div>
    </Section>
  );
}
