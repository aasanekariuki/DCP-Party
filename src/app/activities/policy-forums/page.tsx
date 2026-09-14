import type { Metadata } from "next";
import { ActivityAreaPage } from "@/components/content/ActivityAreaPage";
export const metadata: Metadata = { title: "Policy Forums" };
export default function Page() {
  return (
    <ActivityAreaPage
      eyebrow="Activities"
      title="Policy forums."
      description="Placeholder overview of structured policy discussion events. Replace with a sourced, approved account before publication."
    />
  );
}
