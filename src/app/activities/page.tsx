import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = { title: "Activities" };

const areas = [
  { title: "Community engagement", description: "Local, ground-level activity.", href: "/activities/community" },
  { title: "Public engagement", description: "Town halls and open forums.", href: "/activities/public-engagement" },
  { title: "Policy forums", description: "Structured policy discussions.", href: "/activities/policy-forums" },
  { title: "Youth", description: "Youth league activity and programs.", href: "/activities/youth" },
  { title: "Counties", description: "County-level organizing.", href: "/activities/counties" },
];

export default function ActivitiesPage() {
  return (
    <>
      <Section border={false} className="pt-14">
        <Eyebrow>Activities</Eyebrow>
        <h1 className="font-display text-4xl sm:text-5xl mt-4 max-w-3xl leading-tight">
          Where the party is active.
        </h1>
        <p className="measure text-ink-soft mt-6">
          A breakdown of public-facing activity by area. Each area is a
          placeholder pending verified content.
        </p>
      </Section>
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border rule">
          {areas.map((a) => (
            <Link key={a.href} href={a.href} className="group bg-paper hover:bg-paper-raised p-7 flex flex-col gap-3">
              <h3 className="font-display text-xl">{a.title}</h3>
              <p className="text-sm text-ink-soft flex-1">{a.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium group-hover:text-accent">
                Explore <ArrowUpRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
