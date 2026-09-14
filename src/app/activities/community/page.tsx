import type { Metadata } from "next";
import { ActivityAreaPage } from "@/components/content/ActivityAreaPage";
export const metadata: Metadata = { title: "Community Engagement" };
export default function Page() {
  return (
    <ActivityAreaPage
      eyebrow="Activities"
      title="Community engagement."
      description="Placeholder overview of ground-level community activity. Replace with a sourced, approved account before publication."
    />
  );
}
