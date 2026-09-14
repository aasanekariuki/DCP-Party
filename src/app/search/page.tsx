import type { Metadata } from "next";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SearchResults } from "@/components/content/SearchResults";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <Section border={false} className="pt-14">
      <Eyebrow>Search</Eyebrow>
      <h1 className="font-display text-4xl sm:text-5xl mt-4 mb-10 max-w-3xl leading-tight">
        Find anything on the site.
      </h1>
      <SearchResults />
    </Section>
  );
}
