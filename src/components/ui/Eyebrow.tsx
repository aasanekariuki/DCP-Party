export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-sm text-ink-faint font-medium">
      <span aria-hidden className="h-[6px] w-[6px] rounded-full bg-warm" />
      {children}
    </span>
  );
}
