import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="border border-dashed border-line rounded-[3px] px-8 py-14 text-center flex flex-col items-center gap-4">
      <p className="font-display text-xl">{title}</p>
      <p className="text-ink-soft measure mx-auto">{description}</p>
      {action}
    </div>
  );
}
