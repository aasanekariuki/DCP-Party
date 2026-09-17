"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  FileText,
  History,
  Info,
  Landmark,
  Mail,
  MessageCircle,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FORM_PROTOTYPE_NOTICE } from "@/lib/constants";

const pathways = [
  {
    label: "Learn more",
    explanation:
      "Start with an overview of the party's identity, history, and leadership.",
    icon: BookOpen,
    code: "01",
    next: [
      { label: "About", href: "/about" },
      { label: "History", href: "/history" },
    ],
  },
  {
    label: "Explore policies",
    explanation:
      "Browse published positions organized by topic.",
    icon: Landmark,
    code: "02",
    next: [{ label: "Policy explorer", href: "/policies" }],
  },
  {
    label: "Attend an event",
    explanation:
      "See upcoming public gatherings and forums.",
    icon: CalendarDays,
    code: "03",
    next: [{ label: "Events", href: "/events" }],
  },
  {
    label: "Submit feedback",
    explanation:
      "Ask a question or share a suggestion through the demo feedback form.",
    icon: MessageCircle,
    code: "04",
    next: [{ label: "Citizen feedback", href: "/citizen-feedback" }],
  },
  {
    label: "Learn about membership",
    explanation:
      "Read the verified membership process, once published.",
    icon: Users,
    code: "05",
    next: [{ label: "Membership", href: "/membership" }],
  },
  {
    label: "Contact the organization",
    explanation:
      "Reach the right department for your inquiry.",
    icon: Mail,
    code: "06",
    next: [{ label: "Contact", href: "/contact" }],
  },
  {
    label: "Share a public question",
    explanation:
      "Use the feedback form to ask a question publicly relevant to others.",
    icon: MessageCircle,
    code: "07",
    next: [{ label: "Citizen feedback", href: "/citizen-feedback" }],
  },
  {
    label: "Access official documents",
    explanation:
      "Open the constitution, notices, and policy documents.",
    icon: FileText,
    code: "08",
    next: [{ label: "Documents", href: "/documents" }],
  },
];

export function GetInvolvedChooser() {
  const [active, setActive] = useState<number | null>(null);

  const activePathway =
    active !== null ? pathways[active] : null;

  return (
    <>
      <style jsx>{`
        @keyframes chooserFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }

          50% {
            transform: translate3d(0, -10px, 0) rotate(3deg);
          }
        }

        @keyframes chooserFloatReverse {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }

          50% {
            transform: translate3d(7px, 8px, 0) rotate(-4deg);
          }
        }

        @keyframes chooserPulse {
          0%,
          100% {
            opacity: 0.25;
            transform: scale(0.95);
          }

          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        @keyframes chooserSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes chooserReveal {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chooser-float {
          animation: chooserFloat 6s ease-in-out infinite;
        }

        .chooser-float-reverse {
          animation: chooserFloatReverse 7s ease-in-out infinite;
        }

        .chooser-pulse {
          animation: chooserPulse 4s ease-in-out infinite;
        }

        .chooser-spin {
          animation: chooserSpin 22s linear infinite;
        }

        .chooser-reveal {
          animation: chooserReveal 0.35s ease-out both;
        }

        .chooser-grid {
          background-image:
            linear-gradient(
              to right,
              rgba(82, 183, 136, 0.07) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(82, 183, 136, 0.07) 1px,
              transparent 1px
            );
          background-size: 30px 30px;
        }

        .chooser-card {
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease,
            background-color 0.25s ease;
        }

        .chooser-card:hover {
          transform: translateY(-3px);
          border-color: rgba(82, 183, 136, 0.48);
          box-shadow:
            0 16px 40px rgba(27, 67, 50, 0.08),
            0 0 0 1px rgba(82, 183, 136, 0.05);
        }

        .chooser-card-active {
          border-color: rgba(82, 183, 136, 0.62) !important;
          background: var(--color-ink);
          box-shadow:
            0 18px 42px rgba(27, 67, 50, 0.13),
            0 0 30px rgba(82, 183, 136, 0.08);
          transform: translateY(-2px);
        }

        .chooser-card-active:hover {
          transform: translateY(-4px);
        }

        .chooser-action {
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }

        .chooser-action:hover {
          transform: translateY(-2px);
          border-color: rgba(82, 183, 136, 0.52);
          box-shadow: 0 12px 32px rgba(27, 67, 50, 0.08);
        }

        @media (prefers-reduced-motion: reduce) {
          .chooser-float,
          .chooser-float-reverse,
          .chooser-pulse,
          .chooser-spin,
          .chooser-reveal {
            animation: none !important;
          }

          .chooser-card,
          .chooser-action {
            transition: none !important;
          }

          .chooser-card:hover,
          .chooser-card-active,
          .chooser-card-active:hover,
          .chooser-action:hover {
            transform: none;
          }
        }
      `}</style>

      <div className="relative">
        {/* Decorative atmosphere */}
        <div className="pointer-events-none absolute -inset-5 -z-10 overflow-hidden">
          <div className="chooser-grid absolute inset-0 rounded-[8px] opacity-60" />

          <div className="chooser-pulse absolute -left-10 top-10 h-32 w-32 rounded-full bg-[rgba(82,183,136,.08)] blur-2xl" />

          <div className="chooser-pulse absolute -right-12 bottom-10 h-40 w-40 rounded-full bg-[rgba(45,106,79,.07)] blur-3xl" />

          <div className="chooser-float absolute left-[8%] top-5 hidden h-8 w-8 rotate-45 border border-[rgba(82,183,136,.25)] bg-[rgba(82,183,136,.04)] lg:block" />

          <div className="chooser-float-reverse absolute right-[9%] top-14 hidden h-5 w-5 rounded-full border border-[rgba(82,183,136,.32)] lg:block" />

          <div className="chooser-spin absolute right-[4%] bottom-10 hidden h-28 w-28 rounded-full border border-dashed border-[rgba(45,106,79,.16)] lg:block" />

          <div className="chooser-float absolute bottom-5 left-[16%] hidden h-2 w-2 rounded-full bg-mint-bright shadow-[0_0_14px_rgba(82,183,136,.5)] sm:block" />

          <div className="chooser-float-reverse absolute right-[25%] top-2 hidden h-1.5 w-1.5 rounded-full bg-mint-soft sm:block" />
        </div>

        {/* Header / status strip */}
        <div className="mb-6 flex flex-col gap-4 rounded-[5px] border rule bg-paper-raised p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(82,183,136,.28)] bg-paper">
              <Network
                aria-hidden="true"
                className="h-5 w-5 text-mint-soft"
                strokeWidth={1.6}
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-ink">
                Your engagement pathway
              </p>
              <p className="mt-1 text-xs leading-5 text-ink-soft">
                Select an option below to reveal the relevant next steps.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full border rule bg-paper px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-ink-soft sm:self-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-mint-bright shadow-[0_0_10px_rgba(82,183,136,.6)]" />
            Explore options
          </div>
        </div>

        {/* Pathway grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pathways.map((pathway, index) => {
            const Icon = pathway.icon;
            const isActive = active === index;

            return (
              <button
                key={pathway.label}
                type="button"
                onClick={() =>
                  setActive(isActive ? null : index)
                }
                aria-pressed={isActive}
                className={`chooser-card group relative min-h-[152px] overflow-hidden rounded-[5px] border p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-mint-bright/60 ${
                  isActive
                    ? "chooser-card-active border-ink text-white"
                    : "rule bg-paper-raised text-ink"
                }`}
              >
                {/* Card decoration */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-7 -top-7 h-20 w-20 rounded-full border ${
                    isActive
                      ? "border-[rgba(82,183,136,.24)]"
                      : "border-[rgba(82,183,136,.12)]"
                  }`}
                />

                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute bottom-5 right-5 h-1.5 w-1.5 rounded-full ${
                    isActive
                      ? "bg-mint-bright shadow-[0_0_12px_rgba(82,183,136,.65)]"
                      : "bg-mint-bright/50"
                  }`}
                />

                <span className="relative flex items-start justify-between gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                      isActive
                        ? "border-[rgba(82,183,136,.35)] bg-[rgba(82,183,136,.08)]"
                        : "border-[rgba(82,183,136,.22)] bg-paper"
                    }`}
                  >
                    <Icon
                      aria-hidden="true"
                      className={`h-[18px] w-[18px] ${
                        isActive
                          ? "text-mint-bright"
                          : "text-mint-soft"
                      }`}
                      strokeWidth={1.7}
                    />
                  </span>

                  <span
                    className={`font-mono text-[10px] tracking-[0.16em] ${
                      isActive
                        ? "text-paper/55"
                        : "text-ink-faint"
                    }`}
                  >
                    {pathway.code}
                  </span>
                </span>

                <span
                  className={`relative mt-6 block text-sm font-semibold leading-5 ${
                    isActive ? "text-white" : "text-ink"
                  }`}
                >
                  {pathway.label}
                </span>

                <span
                  className={`mt-2 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] ${
                    isActive
                      ? "text-mint-bright"
                      : "text-ink-faint"
                  }`}
                >
                  {isActive ? "Selected" : "Explore"}
                  <ArrowUpRight
                    aria-hidden="true"
                    className={`h-3 w-3 transition-transform duration-300 ${
                      isActive
                        ? "translate-x-0.5 -translate-y-0.5"
                        : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    }`}
                  />
                </span>
              </button>
            );
          })}
        </div>

        {/* Active pathway */}
        {activePathway ? (
          <div
            key={active}
            className="chooser-reveal relative mt-6 overflow-hidden rounded-[6px] border border-[rgba(82,183,136,.34)] bg-paper-raised shadow-[0_18px_50px_rgba(27,67,50,.07)]"
            aria-live="polite"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-mint-bright" />

            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-1/3 -translate-y-1/3 rounded-full bg-[rgba(82,183,136,.08)] blur-2xl" />

            <div className="relative grid gap-7 p-6 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:p-8">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border rule bg-paper px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-ink-soft">
                    <CheckCircle2
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-mint-soft"
                    />
                    Pathway selected
                  </span>

                  <span className="font-mono text-[10px] tracking-[0.16em] text-ink-faint">
                    {activePathway.code}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl leading-tight sm:text-3xl">
                  {activePathway.label}
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-soft sm:text-[15px]">
                  {activePathway.explanation}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(82,183,136,.18)] bg-paper px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                    <Sparkles
                      aria-hidden="true"
                      className="h-3 w-3 text-mint-soft"
                    />
                    Next steps
                  </span>

                  {activePathway.next.map((next) => (
                    <span
                      key={next.href}
                      className="rounded-full border rule px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-ink-faint"
                    >
                      {next.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                {activePathway.next.map((next) => (
                  <Button
                    key={next.href}
                    href={next.href}
                    variant="secondary"
                    className="justify-between gap-5 sm:min-w-[170px]"
                  >
                    <span>{next.label}</span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t rule bg-paper/50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div className="flex items-start gap-2">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-mint-soft"
                  strokeWidth={1.6}
                />
                <p className="text-xs leading-5 text-ink-faint">
                  {FORM_PROTOTYPE_NOTICE}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActive(null)}
                className="text-left text-xs font-medium text-mint-soft underline underline-offset-4 transition-opacity hover:opacity-70 sm:text-right"
              >
                Clear selection
              </button>
            </div>
          </div>
        ) : (
          /* Empty state */
          <div className="relative mt-6 overflow-hidden rounded-[6px] border rule bg-paper-raised p-6 sm:p-8">
            <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 sm:block">
              <div className="chooser-pulse h-20 w-20 rounded-full border border-[rgba(82,183,136,.16)]" />
            </div>

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex max-w-2xl items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(82,183,136,.22)] bg-paper">
                  <Info
                    aria-hidden="true"
                    className="h-5 w-5 text-mint-soft"
                    strokeWidth={1.6}
                  />
                </div>

                <div>
                  <p className="font-medium text-ink">
                    Choose a pathway to continue.
                  </p>

                  <p className="mt-1 text-sm leading-6 text-ink-soft">
                    Or head straight to{" "}
                    <Link
                      href="/documents"
                      className="font-medium text-mint-soft underline decoration-[rgba(82,183,136,.45)] underline-offset-4 transition-opacity hover:opacity-70"
                    >
                      public documents
                    </Link>{" "}
                    if that is what you are looking for.
                  </p>
                </div>
              </div>

              <Link
                href="/documents"
                className="chooser-action inline-flex shrink-0 items-center justify-center gap-2 rounded-[4px] border rule bg-paper px-4 py-3 text-sm font-medium text-ink"
              >
                <FileText
                  aria-hidden="true"
                  className="h-4 w-4 text-mint-soft"
                />
                Browse documents
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}