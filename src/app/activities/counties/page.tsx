import type { Metadata } from "next";
import { ActivityAreaPage } from "@/components/content/ActivityAreaPage";
export const metadata: Metadata = { title: "Counties" };
export default function Page() {
  return (
    <ActivityAreaPage
      eyebrow="Activities"
      title="County organizing."
      description="Placeholder overview of county-level organizing. Replace with a sourced, approved account before publication."
    />
  );
}
