// src/app/get-involved/page.tsx

import type { Metadata } from "next";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GetInvolvedChooser } from "@/components/forms/GetInvolvedChooser";
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  HandHeart,
  MessageCircle,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Get Involved",
};

const pathways = [
  {
    number: "01",
    label: "Participate",
    description:
      "Explore ways to engage with the party and its public activities.",
    icon: Users,
  },
  {
    number: "02",
    label: "Contribute",
    description:
      "Share your time, ideas, skills, or feedback through the available pathways.",
    icon: HandHeart,
  },
  {
    number: "03",
    label: "Stay informed",
    description:
      "Follow published information and stay connected with future opportunities.",
    icon: MessageCircle,
  },
];

const principles = [
  "Choose the level of engagement that suits you.",
  "Explore information before making a commitment.",
  "Use the available pathways to ask questions or share feedback.",
];

export default function GetInvolvedPage() {
  return (
    <>
      <style>{`
        @keyframes giFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(0, -14px, 0) rotate(3deg);
          }
        }

        @keyframes giFloatReverse {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(0, 12px, 0) rotate(-4deg);
          }
        }

        @keyframes giPulse {
          0%, 100% {
            opacity: .35;
            transform: scale(.96);
          }
          50% {
            opacity: .75;
            transform: scale(1.04);
          }
        }

        @keyframes giSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes giDrift {
          0% {
            transform: translateX(-8px);
          }
          50% {
            transform: translateX(8px);
          }
          100% {
            transform: translateX(-8px);
          }
        }

        @keyframes giRise {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gi-float {
          animation: giFloat 6s ease-in-out infinite;
          will-change: transform;
        }

        .gi-float-reverse {
          animation: giFloatReverse 7s ease-in-out infinite;
          will-change: transform;
        }

        .gi-pulse {
          animation: giPulse 4s ease-in-out infinite;
        }

        .gi-spin {
          animation: giSpin 22s linear infinite;
        }

        .gi-drift {
          animation: giDrift 5s ease-in-out infinite;
        }

        .gi-rise {
          animation: giRise .7s ease-out both;
        }

        .gi-delay-1 {
          animation-delay: .08s;
        }

        .gi-delay-2 {
          animation-delay: .16s;
        }

        .gi-delay-3 {
          animation-delay: .24s;
        }

        .gi-grid {
          background-image:
            linear-gradient(
              to right,
              rgba(82,183,136,.075) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(82,183,136,.075) 1px,
              transparent 1px
            );
          background-size: 34px 34px;
        }

        .gi-glow {
          text-shadow:
            0 0 18px rgba(82,183,136,.22),
            0 0 36px rgba(45,106,79,.12);
        }

        .gi-card {
          transition:
            transform .3s ease,
            border-color .3s ease,
            box-shadow .3s ease,
            background-color .3s ease;
        }

        .gi-card:hover {
          transform: translateY(-5px);
          border-color: rgba(82,183,136,.55);
          box-shadow:
            0 18px 50px rgba(27,67,50,.09),
            0 0 0 1px rgba(82,183,136,.08);
        }

        .gi-action {
          transition:
            transform .25s ease,
            border-color .25s ease,
            box-shadow .25s ease,
            background-color .25s ease;
        }

        .gi-action:hover {
          transform: translateY(-2px);
          border-color: rgba(82,183,136,.55);
          box-shadow: 0 14px 35px rgba(27,67,50,.08);
        }

        @media (prefers-reduced-motion: reduce) {
          .gi-float,
          .gi-float-reverse,
          .gi-pulse,
          .gi-spin,
          .gi-drift,
          .gi-rise {
            animation: none !important;
          }

          .gi-card,
          .gi-action {
            transition: none !important;
          }

          .gi-card:hover,
          .gi-action:hover {
            transform: none;
          }
        }
      `}</style>

      <Section border={false} className="pt-10 sm:pt-14 lg:pt-16">
        <div className="relative overflow-hidden rounded-[6px] border rule bg-paper-raised">
          {/* Background atmosphere */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="gi-grid absolute inset-0 opacity-70" />

            <div className="gi-pulse absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[rgba(82,183,136,.10)] blur-3xl" />

            <div className="gi-float absolute right-[12%] top-14 hidden h-20 w-20 rounded-full border border-[rgba(82,183,136,.28)] bg-[rgba(82,183,136,.05)] sm:block" />

            <div className="gi-float-reverse absolute bottom-10 left-[7%] hidden h-12 w-12 rotate-45 border border-[rgba(45,106,79,.22)] bg-[rgba(45,106,79,.04)] lg:block" />

            <div className="gi-spin absolute right-[4%] top-1/2 hidden h-32 w-32 rounded-full border border-dashed border-[rgba(82,183,136,.20)] lg:block" />

            <div className="absolute right-8 top-8 h-2 w-2 rounded-full bg-mint-bright shadow-[0_0_18px_rgba(82,183,136,.55)]" />
            <div className="gi-drift absolute right-20 top-24 h-1.5 w-1.5 rounded-full bg-mint-soft" />
            <div className="gi-drift absolute bottom-16 right-[18%] h-2 w-2 rounded-full bg-mint-bright" />
          </div>

          {/* Corner brackets */}
          <div className="pointer-events-none absolute left-5 top-5 h-8 w-8 border-l border-t border-mint-bright/40" />
          <div className="pointer-events-none absolute right-5 top-5 h-8 w-8 border-r border-t border-mint-bright/40" />
          <div className="pointer-events-none absolute bottom-5 left-5 h-8 w-8 border-b border-l border-mint-bright/30" />
          <div className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 border-b border-r border-mint-bright/30" />

          <div className="relative z-10 grid gap-10 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14 lg:px-14 lg:py-16">
            <div className="max-w-3xl">
              <div className="gi-rise">
                <Eyebrow>Get involved</Eyebrow>
              </div>

              <h1 className="gi-rise gi-delay-1 mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
                How would you like to{" "}
                <span className="gi-glow text-mint-soft">engage?</span>
              </h1>

              <p className="gi-rise gi-delay-2 measure mt-6 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
                Not everyone visiting this site wants to join the party.
                Choose the pathway that matches{" "}
                <strong className="font-semibold text-ink">
                  what you&apos;re here for.
                </strong>
              </p>

              <div className="gi-rise gi-delay-3 mt-8 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-ink-soft">
                <span className="inline-flex items-center gap-2 rounded-full border rule bg-paper px-3 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint-bright shadow-[0_0_10px_rgba(82,183,136,.65)]" />
                  Choose your pathway
                </span>

                <span className="hidden h-px w-10 bg-[rgba(82,183,136,.35)] sm:block" />

                <span>Explore • Participate • Connect</span>
              </div>
            </div>

            <div className="relative hidden min-h-[220px] items-center justify-center lg:flex">
              <div className="gi-pulse absolute h-44 w-44 rounded-full border border-[rgba(82,183,136,.16)]" />

              <div className="gi-spin absolute h-52 w-52 rounded-full border border-dashed border-[rgba(45,106,79,.18)]" />

              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[rgba(82,183,136,.32)] bg-paper shadow-[0_18px_50px_rgba(27,67,50,.08)]">
                <Users
                  aria-hidden="true"
                  className="h-10 w-10 text-mint-soft"
                  strokeWidth={1.4}
                />

                <span className="absolute -right-2 top-2 h-3 w-3 rounded-full border-2 border-paper bg-mint-bright" />
                <span className="absolute -bottom-1 left-6 h-2 w-2 rounded-full bg-mint-soft" />
              </div>

              <div className="absolute left-5 top-10 h-3 w-3 rounded-full bg-mint-bright/70" />
              <div className="absolute bottom-8 right-6 h-2 w-2 rounded-full bg-mint-soft/70" />
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-4 sm:pt-6">
        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Engagement pathways</Eyebrow>
            <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">
              Find the{" "}
              <span className="text-mint-soft gi-glow">right level</span> of
              participation.
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-mint-bright" />
            <span>Explore your options</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {pathways.map((pathway, index) => {
            const Icon = pathway.icon;

            return (
              <div
                key={pathway.number}
                className={`gi-card gi-rise gi-delay-${index + 1} group relative overflow-hidden rounded-[6px] border rule bg-paper-raised p-6 sm:p-7`}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full border border-[rgba(82,183,136,.13)]" />
                <div className="pointer-events-none absolute bottom-5 right-6 h-1.5 w-1.5 rounded-full bg-mint-bright/60" />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(82,183,136,.28)] bg-paper">
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 text-mint-soft"
                      strokeWidth={1.7}
                    />
                  </div>

                  <span className="font-mono text-xs tracking-[0.16em] text-ink-soft">
                    {pathway.number}
                  </span>
                </div>

                <h3 className="relative mt-7 font-display text-xl">
                  {pathway.label}
                </h3>

                <p className="relative mt-3 text-sm leading-6 text-ink-soft">
                  {pathway.description}
                </p>

                <div className="mt-6 h-px w-full bg-[rgba(82,183,136,.16)]" />

                <div className="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-mint-soft">
                  <span>Explore pathway</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section className="pt-4 sm:pt-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,.85fr)] lg:gap-8">
          <div className="relative overflow-hidden rounded-[6px] border rule bg-paper-raised p-6 sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 translate-x-1/3 -translate-y-1/3 rounded-full bg-[rgba(82,183,136,.08)] blur-2xl" />

            <div className="relative">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <Eyebrow>A simple approach</Eyebrow>
                  <h2 className="mt-3 font-display text-2xl sm:text-3xl">
                    Engage at your{" "}
                    <span className="text-mint-soft gi-glow">own pace.</span>
                  </h2>
                </div>

                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border rule bg-paper sm:flex">
                  <ArrowDown
                    aria-hidden="true"
                    className="h-5 w-5 text-mint-soft"
                  />
                </div>
              </div>

              <div className="mt-7 space-y-4">
                {principles.map((principle, index) => (
                  <div
                    key={principle}
                    className="flex gap-4 rounded-[4px] border border-[rgba(82,183,136,.12)] bg-paper/60 p-4"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[rgba(82,183,136,.25)]">
                      <CheckCircle2
                        aria-hidden="true"
                        className="h-4 w-4 text-mint-soft"
                        strokeWidth={1.7}
                      />
                    </div>

                    <div>
                      <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                        0{index + 1}
                      </span>
                      <p className="text-sm leading-6 text-ink">
                        {principle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[6px] border border-[rgba(45,106,79,.25)] bg-savanna-deep p-6 text-paper sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full border border-[rgba(82,183,136,.18)]" />
            <div className="pointer-events-none absolute bottom-8 left-8 h-2 w-2 rounded-full bg-mint-bright shadow-[0_0_16px_rgba(82,183,136,.45)]" />

            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-mint-bright shadow-[0_0_14px_rgba(82,183,136,.7)]" />
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-paper/70">
                  Start here
                </span>
              </div>

              <h2 className="mt-5 font-display text-2xl leading-tight sm:text-3xl">
                Explore the available{" "}
                <span className="text-mint-bright gi-glow">
                  ways to engage.
                </span>
              </h2>

              <p className="mt-4 text-sm leading-6 text-paper/75">
                Use the engagement chooser below to select the pathway that
                best matches what you want to do.
              </p>

              <div className="mt-7 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.12em] text-paper/65">
                <span className="rounded-full border border-paper/15 px-3 py-2">
                  Flexible
                </span>
                <span className="rounded-full border border-paper/15 px-3 py-2">
                  Citizen-focused
                </span>
                <span className="rounded-full border border-paper/15 px-3 py-2">
                  Explore first
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pb-14 pt-4 sm:pb-20 sm:pt-6">
        <div className="relative overflow-hidden rounded-[6px] border rule bg-paper-raised">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-mint-bright/60" />

          <div className="relative px-6 py-8 sm:px-8 sm:py-10">
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Eyebrow>Engagement chooser</Eyebrow>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl">
                  Choose what you&apos;d like to do.
                </h2>
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full border rule bg-paper px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-mint-bright" />
                Select a pathway
              </span>
            </div>

            <div className="gi-action rounded-[5px]">
              <GetInvolvedChooser />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

