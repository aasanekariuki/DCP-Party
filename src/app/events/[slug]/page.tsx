import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/layout/PageContainer";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { Button } from "@/components/ui/Button";
import { getEventBySlug, events } from "@/data/events";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  return { title: event ? event.title : "Event" };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return (
    <Section border={false} className="pt-14">
      <Link href="/events" className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink mb-8">
        <ArrowLeft size={15} /> Back to events
      </Link>
      <div className="max-w-2xl">
        <span className="text-xs font-medium text-warm">{event.category}</span>
        <h1 className="font-display text-4xl mt-2">{event.title}</h1>
        <div className="mt-4"><VerificationBadge status={event.verificationStatus} /></div>
        <p className="measure text-ink-soft mt-6">{event.description}</p>
        <dl className="mt-6 flex flex-col gap-2 text-sm">
          <div className="flex gap-2"><dt className="text-ink-faint w-24">Date</dt><dd>{event.date}</dd></div>
          {event.location && <div className="flex gap-2"><dt className="text-ink-faint w-24">Location</dt><dd>{event.location}</dd></div>}
          <div className="flex gap-2"><dt className="text-ink-faint w-24">Status</dt><dd className="capitalize">{event.status}</dd></div>
        </dl>
        {event.registrationUrl && (
          <div className="mt-6">
            <Button href={event.registrationUrl}>Register</Button>
          </div>
        )}
      </div>
    </Section>
  );
}
