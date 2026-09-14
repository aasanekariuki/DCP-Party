import type { VerificationStatus } from "@/lib/types";
import { CheckCircle2, Clock, FileQuestion } from "lucide-react";

const config: Record<
  VerificationStatus,
  { label: string; bg: string; fg: string; Icon: typeof CheckCircle2 }
> = {
  verified: {
    label: "Verified",
    bg: "bg-[var(--color-success-soft)]",
    fg: "text-[var(--color-success)]",
    Icon: CheckCircle2,
  },
  "pending-verification": {
    label: "Awaiting verification",
    bg: "bg-[var(--color-warning-soft)]",
    fg: "text-[var(--color-warning)]",
    Icon: Clock,
  },
  placeholder: {
    label: "Placeholder content",
    bg: "bg-[var(--color-stone)]",
    fg: "text-ink-soft",
    Icon: FileQuestion,
  },
};

export function VerificationBadge({ status }: { status: VerificationStatus }) {
  const { label, bg, fg, Icon } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[3px] px-2 py-1 text-xs font-medium ${bg} ${fg}`}
    >
      <Icon size={13} strokeWidth={2} aria-hidden />
      {label}
    </span>
  );
}
