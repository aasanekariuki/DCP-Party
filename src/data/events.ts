import type { EventRecord } from "@/lib/types";

// DEMO CONTENT — no verified events are on record in this prototype.
// Leave this list empty until confirmed events are supplied, so the
// events preview renders its designed empty state rather than
// fabricated activity.
export const events: EventRecord[] = [];

export function getEvents() {
  return events;
}

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}
