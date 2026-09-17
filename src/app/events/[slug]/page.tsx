// src/app/events/[slug]/page.tsx
//
// URL examples:
// /events/community-dialogue
// /events/national-civic-forum
// /events/whatever-the-event-slug-is
//
// This file handles routing, metadata, static generation and 404s.
// The visual page is rendered by EventDetailClient.

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getEventBySlug, events } from "@/data/events";
import EventDetailClient from "@/app/events/EventDetailClient";

export function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event",
    };
  }

  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return <EventDetailClient event={event} />;
}