// src/app/feedback/page.tsx

import type { Metadata } from "next";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CitizenFeedbackForm } from "@/components/forms/CitizenFeedbackForm";

export const metadata: Metadata = {
  title: "Citizen Feedback",
};

const feedbackTypes = [
  {
    number: "01",
    title: "Policy question",
    description: "Ask for clarification about a policy or published position.",
  },
  {
    number: "02",
    title: "Suggestion",
    description: "Share an idea, observation, or constructive suggestion.",
  },
  {
    number: "03",
    title: "General inquiry",
    description: "Send a question that does not fit another category.",
  },
  {
    number: "04",
    title: "Accessibility feedback",
    description: "Tell us about an accessibility issue with this website.",
  },
];

export default function CitizenFeedbackPage() {
  return (
    <main className="relative overflow-hidden">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-ink) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-ink) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        <div className="absolute -right-24 top-24 h-48 w-48 rounded-full border border-mint-soft/10 bg-mint-bright/5" />
        <div className="absolute -left-20 top-[48%] h-36 w-36 rounded-full border border-mint-soft/10 bg-mint-bright/5" />
        <div className="absolute right-[15%] top-[70%] h-20 w-20 rounded-full border border-mint-soft/10" />

        <span className="absolute left-[12%] top-[18%] h-1.5 w-1.5 rounded-full bg-mint-bright/60" />
        <span className="absolute left-[26%] top-[35%] h-1 w-1 rounded-full bg-mint-bright/50" />
        <span className="absolute right-[22%] top-[26%] h-1.5 w-1.5 rounded-full bg-mint-bright/50" />
        <span className="absolute right-[10%] top-[55%] h-1 w-1 rounded-full bg-mint-bright/60" />
      </div>

      {/* HERO */}
      <Section border={false} className="relative pt-14 sm:pt-18 lg:pt-22">
        <div className="relative overflow-hidden rounded-2xl border rule bg-paper-raised/60 px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          {/* Corner details */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-4 sm:inset-6"
          >
            <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-mint-soft/20" />
            <span className="absolute right-0 top-0 h-8 w-8 border-r border-t border-mint-soft/20" />
            <span className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-mint-soft/20" />
            <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-mint-soft/20" />
          </div>

          {/* Floating orbit */}
          <div
            aria-hidden="true"
            className="absolute right-10 top-10 hidden h-32 w-32 rounded-full border border-mint-soft/15 lg:block"
          >
            <div className="absolute inset-5 rounded-full border border-mint-soft/10" />
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint-bright" />
            <span className="absolute bottom-5 right-0 h-1.5 w-1.5 rounded-full bg-warm" />
          </div>

          <div className="relative z-10 max-w-4xl">
            <Eyebrow>Citizen feedback</Eyebrow>

            <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Ask a question or{" "}
              <span className="relative inline-block text-mint-soft">
                share a suggestion.
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full bg-mint-bright/70"
                />
              </span>
            </h1>

            <p className="measure mt-6 max-w-2xl text-base leading-8 text-ink-soft sm:text-lg">
              Use this form for policy questions, general inquiries,
              suggestions, or accessibility feedback about the site itself.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-mint-soft/20 bg-mint-bright/10 px-3.5 py-2 text-xs font-medium text-mint-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-mint-bright" />
                Your voice matters
              </div>

              <div className="inline-flex items-center gap-2 text-xs text-ink-faint">
                <span className="h-1.5 w-1.5 rounded-full bg-warm" />
                Citizen communication channel
              </div>
            </div>
          </div>

          <div className="absolute bottom-7 right-8 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-mint-bright" />
            Citizen interface
          </div>
        </div>
      </Section>

      {/* FEEDBACK TYPES */}
      <Section className="relative">
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-mint-bright" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                Feedback routes
              </span>
            </div>

            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              What would you like to tell us?
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-ink-soft">
            Choose the area that best describes your message, then use the
            feedback form below.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {feedbackTypes.map((item) => (
            <div
              key={item.number}
              className="group relative overflow-hidden rounded-xl border rule bg-paper-raised/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-mint-soft/30 sm:p-6"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint-bright/60 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div
                aria-hidden="true"
                className="absolute -right-8 -top-8 h-24 w-24 rounded-full border border-mint-soft/10 bg-mint-bright/5 transition-transform duration-500 group-hover:scale-125"
              />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-mint-soft/20 bg-mint-bright/10 text-mint-soft">
                    <span className="text-sm font-semibold">↗</span>
                  </div>

                  <span className="font-mono text-[10px] tracking-[0.2em] text-ink-faint">
                    {item.number}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-lg leading-tight text-ink">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FORM — SAME PAGE */}
      <Section border={false} className="relative pb-16 sm:pb-24">
        <div className="relative overflow-hidden rounded-2xl border rule bg-paper-raised/60">
          {/* Top signal */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint-bright/70 to-transparent"
          />

          <div className="grid lg:grid-cols-[0.34fr_0.66fr]">
            {/* FORM INFORMATION */}
            <aside className="relative overflow-hidden border-b rule p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-mint-soft/10"
              />

              <div
                aria-hidden="true"
                className="absolute bottom-8 right-8 h-20 w-20 rounded-full border border-mint-soft/10"
              />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-mint-soft/20 bg-mint-bright/10 text-mint-soft">
                  <span className="text-xl">✦</span>
                </div>

                <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  Open channel
                </p>

                <h2 className="mt-3 font-display text-2xl leading-tight text-ink sm:text-3xl">
                  Open the conversation.
                </h2>

                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Tell us what you think, what you need clarified, or where
                  the website could work better for you.
                </p>

                <div className="mt-8 space-y-5">
                  <div className="flex gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint-bright/10 text-xs text-mint-soft">
                      01
                    </span>

                    <div>
                      <p className="text-sm font-medium text-ink">
                        Be specific
                      </p>
                      <p className="mt-1 text-xs leading-5 text-ink-soft">
                        Include enough detail to make your message clear.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint-bright/10 text-xs text-mint-soft">
                      02
                    </span>

                    <div>
                      <p className="text-sm font-medium text-ink">
                        Add useful context
                      </p>
                      <p className="mt-1 text-xs leading-5 text-ink-soft">
                        Explain the issue, question, or suggestion where
                        helpful.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint-bright/10 text-xs text-mint-soft">
                      03
                    </span>

                    <div>
                      <p className="text-sm font-medium text-ink">
                        Send your feedback
                      </p>
                      <p className="mt-1 text-xs leading-5 text-ink-soft">
                        Complete the form to submit your message.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-9 border-t rule pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                    Citizen / Feedback / Channel
                  </p>
                </div>
              </div>
            </aside>

            {/* ACTUAL EXISTING FORM */}
            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="mb-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                  Feedback form
                </p>

                <h2 className="mt-2 font-display text-xl text-ink sm:text-2xl">
                  Send your message
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-ink-soft">
                  Choose the relevant information and provide your feedback
                  using the form.
                </p>
              </div>

              {/* The existing functional form remains here */}
              <CitizenFeedbackForm />
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t rule pt-5 text-[11px] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-mint-bright" />
            <span className="font-mono uppercase tracking-[0.18em]">
              Citizen feedback channel
            </span>
          </div>

          <span className="font-mono uppercase tracking-[0.14em]">
            Public interface
          </span>
        </div>
      </Section>
    </main>
  );
}

