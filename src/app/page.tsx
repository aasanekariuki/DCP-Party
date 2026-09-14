import { EditorialHero } from "@/components/home/EditorialHero";
import { PartyIntroduction } from "@/components/home/PartyIntroduction";
import { ExplorePartySection } from "@/components/home/ExplorePartySection";
import { PolicyPreview } from "@/components/home/PolicyPreview";
import { LeadershipPreview } from "@/components/home/LeadershipPreview";
import { LatestNews } from "@/components/home/LatestNews";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { CivicEcosystem } from "@/components/home/CivicEcosystem";
import { DocumentPreview } from "@/components/home/DocumentPreview";
import { EngagementSection } from "@/components/home/EngagementSection";

export default function HomePage() {
  return (
    <>
      <EditorialHero />
      <PartyIntroduction />
      <ExplorePartySection />
      <PolicyPreview />
      <LeadershipPreview />
      <LatestNews />
      <UpcomingEvents />
      <CivicEcosystem />
      <DocumentPreview />
      <EngagementSection />
    </>
  );
}
