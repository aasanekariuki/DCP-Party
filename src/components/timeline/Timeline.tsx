import type { HistoricalMilestone } from "@/lib/types";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { EmptyState } from "@/components/ui/EmptyState";

export function Timeline({ milestones }: { milestones: HistoricalMilestone[] }) {
  if (milestones.length === 0) {
    return (
      <EmptyState
        title="No historical record is published yet"
        description="Verified milestones will appear here once sourced content is approved."
      />
    );
  }

  return (
    <ol className="flex flex-col">
      {milestones.map((m, i) => (
        <li key={m.id} className="flex gap-6 sm:gap-10 border-t rule py-8 first:border-t-0">
          <div className="w-20 shrink-0 sm:w-28">
            <span className="font-display text-lg text-ink-faint">
              {m.date ?? `Entry ${i + 1}`}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-display text-xl mb-2">{m.title}</h3>
            <p className="text-ink-soft measure">{m.description}</p>
            <div className="mt-3 flex items-center gap-3">
              <VerificationBadge status={m.verificationStatus} />
              {m.source && <span className="text-xs text-ink-faint">{m.source}</span>}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
