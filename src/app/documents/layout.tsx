import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Documents",
  description:
    "Searchable document library. Constitution, notices, policy documents, and reports.",
};

export default function DocumentsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-paper text-ink">
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}