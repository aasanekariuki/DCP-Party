import type { Metadata } from "next";
import { ActivityAreaPage } from "@/components/content/ActivityAreaPage";
export const metadata: Metadata = { title: "Public Engagement" };
export default function Page() {
  return (
    <ActivityAreaPage
      eyebrow="Activities"
      title="Public engagement."
      description="Placeholder overview of town halls and open public forums. Replace with a sourced, approved account before publication."
    />
  );
}
