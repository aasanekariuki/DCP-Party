"use client";

import { Section } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section border={false} className="pt-24 pb-24 text-center">
      <p className="text-sm text-[var(--color-danger)] font-medium">Something went wrong</p>
      <h1 className="font-display text-4xl mt-4">This page hit an error.</h1>
      <p className="measure mx-auto text-ink-soft mt-5">
        {error.message || "An unexpected error occurred while loading this page."}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button onClick={reset}>Try again</Button>
        <Button href="/" variant="secondary">Return home</Button>
      </div>
    </Section>
  );
}
