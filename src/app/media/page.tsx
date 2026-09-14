import type { Metadata } from "next";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { EmptyState } from "@/components/ui/EmptyState";
import { getMediaAssets } from "@/data/media";

export const metadata: Metadata = { title: "Media" };

export default function MediaPage() {
  const assets = getMediaAssets();

  return (
    <>
      <Section border={false} className="pt-14">
        <Eyebrow>Media</Eyebrow>
        <h1 className="font-display text-4xl sm:text-5xl mt-4 max-w-3xl leading-tight">
          Photos from public activities.
        </h1>
        <p className="measure text-ink-soft mt-6">
          This archive only displays media with a valid rights basis and
          verification status. Nothing is published here yet.
        </p>
      </Section>
      <Section>
        {assets.length === 0 ? (
          <EmptyState
            title="No verified media on record"
            description="Photographs will be added here once rights are confirmed and content is verified. Stock imagery is never substituted for real documentation."
          />
        ) : null}
      </Section>
    </>
  );
}
