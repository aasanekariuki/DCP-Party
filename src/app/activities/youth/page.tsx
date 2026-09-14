import type { Metadata } from "next";
import { ActivityAreaPage } from "@/components/content/ActivityAreaPage";
export const metadata: Metadata = { title: "Youth" };
export default function Page() {
  return (
    <ActivityAreaPage
      eyebrow="Activities"
      title="Youth."
      description="Placeholder overview of youth league programs and activity. Replace with a sourced, approved account before publication."
    />
  );
}
