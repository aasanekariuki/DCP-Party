"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FORM_PROTOTYPE_NOTICE } from "@/lib/constants";

const pathways = [
  {
    label: "Learn more",
    explanation: "Start with an overview of the party's identity, history, and leadership.",
    next: [{ label: "About", href: "/about" }, { label: "History", href: "/history" }],
  },
  {
    label: "Explore policies",
    explanation: "Browse published positions organized by topic.",
    next: [{ label: "Policy explorer", href: "/policies" }],
  },
  {
    label: "Attend an event",
    explanation: "See upcoming public gatherings and forums.",
    next: [{ label: "Events", href: "/events" }],
  },
  {
    label: "Submit feedback",
    explanation: "Ask a question or share a suggestion through the demo feedback form.",
    next: [{ label: "Citizen feedback", href: "/citizen-feedback" }],
  },
  {
    label: "Learn about membership",
    explanation: "Read the verified membership process, once published.",
    next: [{ label: "Membership", href: "/membership" }],
  },
  {
    label: "Contact the organization",
    explanation: "Reach the right department for your inquiry.",
    next: [{ label: "Contact", href: "/contact" }],
  },
  {
    label: "Share a public question",
    explanation: "Use the feedback form to ask a question publicly relevant to others.",
    next: [{ label: "Citizen feedback", href: "/citizen-feedback" }],
  },
  {
    label: "Access official documents",
    explanation: "Open the constitution, notices, and policy documents.",
    next: [{ label: "Documents", href: "/documents" }],
  },
];

export function GetInvolvedChooser() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {pathways.map((p, i) => (
          <button
            key={p.label}
            onClick={() => setActive(active === i ? null : i)}
            aria-pressed={active === i}
            className={`text-left px-4 py-3 rounded-[3px] border rule text-sm font-medium transition-colors ${
              active === i ? "bg-ink text-white border-ink" : "hover:bg-stone/60"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      {active !== null && (
        <div className="border rule rounded-[4px] p-7 bg-paper-raised max-w-xl">
          <p className="text-ink-soft">{pathways[active].explanation}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {pathways[active].next.map((n) => (
              <Button key={n.href} href={n.href} variant="secondary">
                {n.label}
              </Button>
            ))}
          </div>
          <p className="mt-5 text-xs text-ink-faint">{FORM_PROTOTYPE_NOTICE}</p>
        </div>
      )}
      {active === null && (
        <p className="text-ink-faint text-sm">
          Choose a pathway above, or head straight to{" "}
          <Link href="/documents" className="underline">
            public documents
          </Link>
          .
        </p>
      )}
    </div>
  );
}
