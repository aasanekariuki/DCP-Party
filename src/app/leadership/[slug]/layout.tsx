import type { Metadata } from "next";
import type { ReactNode } from "react";

import {
  getLeadershipProfileBySlug,
  leadershipProfiles,
} from "@/data/leadership";

export function generateStaticParams() {
  return leadershipProfiles.map((profile) => ({
    slug: profile.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = getLeadershipProfileBySlug(slug);

  return {
    title: profile ? profile.name : "Leadership profile",
    description: profile
      ? `${profile.name} — ${profile.role}. Leadership profile for Democracy for the Citizens Party.`
      : "Leadership profile",
  };
}

export default function LeadershipProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
