"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRight, Sparkles, Compass, CheckCircle2 } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const nodes = [
  {
    label: "Explore",
    meaning: "Browse the party's identity, history, and leadership.",
    why: "Understanding who an organization is comes before evaluating what it does.",
    href: "/about",
    linkLabel: "Start with About",
  },
  {
    label: "Understand",
    meaning: "Read published policy positions by topic.",
    why: "Policy detail is what makes a public position assessable rather than just rhetorical.",
    href: "/policies",
    linkLabel: "Browse policies",
  },
  {
    label: "Question",
    meaning: "Check official statements and public documents against what you read elsewhere.",
    why: "Sourced records let you verify claims instead of taking them on faith.",
    href: "/documents",
    linkLabel: "View documents",
  },
  {
    label: "Participate",
    meaning: "Attend events, submit feedback, or learn about membership.",
    why: "Civic platforms work best when the audience can act, not just read.",
    href: "/get-involved",
    linkLabel: "See how to get involved",
  },
  {
    label: "Stay informed",
    meaning: "Follow news and official statements as they're published.",
    why: "Ongoing attention matters more than a single visit.",
    href: "/news",
    linkLabel: "Read the latest",
  },
];

function FloatingOrb({
  className = "",
  size = 240,
  variant = "jungle",
}: {
  className?: string;
  size?: number;
  variant?: "jungle" | "mint" | "emerald";
}) {
  const reduceMotion = useReducedMotion();

  const gradients = {
    jungle: "bg-[radial-gradient(circle,rgba(27,67,50,0.18)_0%,rgba(45,106,79,0.06)_50%,transparent_72%)]",
    mint: "bg-[radial-gradient(circle,rgba(82,183,136,0.14)_0%,rgba(45,106,79,0.04)_50%,transparent_70%)]",
    emerald: "bg-[radial-gradient(circle,rgba(16,185,129,0.14)_0%,rgba(6,78,59,0.04)_55%,transparent_70%)]",
  };

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-2xl ${gradients[variant]} ${className}`}
      style={{ width: size, height: size }}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: [1, 1.15, 1],
              opacity: [0.35, 0.65, 0.35],
              y: [0, -12, 0],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    />
  );
}

function FloatingParticle({
  delay = 0,
  duration = 6,
  className = "",
  color = "mint",
}: {
  delay?: number;
  duration?: number;
  className?: string;
  color?: "mint" | "jungle" | "emerald";
}) {
  const reduceMotion = useReducedMotion();

  const colors = {
    mint: "bg-[var(--color-mint-bright,#52B788)]/40",
    jungle: "bg-[var(--color-savanna-deep,#1B4332)]/40",
    emerald: "bg-emerald-500/40",
  };

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute block rounded-full blur-[0.5px] ${colors[color]} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -15, 0],
              x: [0, 6, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [0.85, 1.15, 0.85],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    />
  );
}

function CornerBrackets() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-[var(--color-mint-bright,#52B788)]/25 transition-colors duration-300 group-hover:border-[var(--color-mint-bright,#52B788)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-[var(--color-mint-bright,#52B788)]/25 transition-colors duration-300 group-hover:border-[var(--color-mint-bright,#52B788)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[var(--color-mint-bright,#52B788)]/25 transition-colors duration-300 group-hover:border-[var(--color-mint-bright,#52B788)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-[var(--color-mint-bright,#52B788)]/25 transition-colors duration-300 group-hover:border-[var(--color-mint-bright,#52B788)]"
      />
    </>
  );
}

export function CivicEcosystem() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const node = nodes[active];

  return (
    <Section decorated animateEntry={false} className="relative">
      {/* Background ambient floating objects in Jungle & Mint Green */}
      <FloatingOrb size={320} variant="jungle" className="-left-20 -top-16" />
      <FloatingOrb size={260} variant="mint" className="-right-16 top-1/3" />
      <FloatingOrb size={280} variant="emerald" className="left-1/3 bottom-0" />

      {/* Floating particles */}
      <FloatingParticle color="jungle" className="left-[5%] top-[22%] h-2.5 w-2.5" delay={0.2} duration={5.5} />
      <FloatingParticle color="mint" className="right-[8%] top-[18%] h-2 w-2" delay={1.1} duration={6.5} />
      <FloatingParticle color="emerald" className="left-[45%] bottom-[12%] h-2.5 w-2.5" delay={0.7} duration={5} />

      {/* Header section */}
      <div className="relative z-10 mb-10 max-w-xl sm:mb-12">
        <div className="flex items-center gap-2.5">
          <Eyebrow>How to use this site</Eyebrow>
          <span aria-hidden="true" className="h-px w-8 bg-[var(--color-mint-bright,#52B788)]/40" />
          <Sparkles className="h-3.5 w-3.5 text-[var(--color-mint-bright,#52B788)]" />
        </div>

        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--color-savanna-deep,#1B4332)] sm:text-4xl lg:text-5xl">
          A path through the platform.
        </h2>
      </div>

      {/* Interactive Civic Ecosystem Layout */}
      <div className="relative z-10 grid gap-8 md:grid-cols-12 lg:gap-12">
        {/* Step Navigation Column */}
        <div className="md:col-span-5">
          <ol className="flex flex-col gap-2">
            {nodes.map((n, i) => {
              const isActive = active === i;
              return (
                <li key={n.label}>
                  <button
                    onClick={() => setActive(i)}
                    aria-current={isActive ? "step" : undefined}
                    className={`group relative flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-300 ${
                      isActive
                        ? "border-[var(--color-mint-bright,#52B788)]/60 bg-[var(--color-paper-raised,#F4F1EA)]/90 shadow-md backdrop-blur-md"
                        : "border-[var(--color-mint-bright,#52B788)]/15 bg-[var(--color-paper-raised,#F4F1EA)]/40 hover:border-[var(--color-mint-bright,#52B788)]/40 hover:bg-[var(--color-paper-raised,#F4F1EA)]/70"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold transition-all duration-300 ${
                        isActive
                          ? "bg-[var(--color-savanna-deep,#1B4332)] text-[var(--color-mint-bright,#52B788)] shadow-2xs"
                          : "border border-[var(--color-mint-bright,#52B788)]/30 bg-[var(--color-savanna-deep,#1B4332)]/10 text-[var(--color-mint-soft,#2D6A4F)] group-hover:border-[var(--color-mint-bright,#52B788)] group-hover:text-[var(--color-mint-bright,#52B788)]"
                      }`}
                    >
                      0{i + 1}
                    </span>

                    <span
                      className={`font-display text-lg font-bold transition-colors duration-200 ${
                        isActive
                          ? "text-[var(--color-savanna-deep,#1B4332)]"
                          : "text-[var(--color-ink,#1A1A1A)]/80 group-hover:text-[var(--color-savanna-deep,#1B4332)]"
                      }`}
                    >
                      {n.label}
                    </span>

                    {/* Active Step Indicator Accent */}
                    {isActive && (
                      <motion.div
                        layoutId="activeStepIndicator"
                        className="absolute right-4 h-2 w-2 rounded-full bg-[var(--color-mint-bright,#52B788)] shadow-2xs"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Dynamic Details Preview Card */}
        <div className="md:col-span-7">
          <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-paper-raised,#F4F1EA)]/80 p-8 shadow-xs backdrop-blur-md transition-all duration-300 hover:border-[var(--color-mint-bright,#52B788)]/50 sm:p-10">
            <CornerBrackets />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
                transition={{ duration: 0.35, ease }}
                className="flex h-full flex-col justify-between gap-8"
              >
                <div>
                  {/* Step Metadata & Icon */}
                  <div className="mb-6 flex items-center justify-between gap-4 border-b border-[var(--color-mint-bright,#52B788)]/15 pb-4">
                    <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-mint-soft,#2D6A4F)]">
                      <Compass className="h-4 w-4 text-[var(--color-mint-bright,#52B788)]" />
                      Step 0{active + 1} // {node.label}
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-md bg-[var(--color-savanna-deep,#1B4332)]/10 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--color-savanna-deep,#1B4332)]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[var(--color-mint-bright,#52B788)]" />
                      Verified Process
                    </span>
                  </div>

                  {/* Node Heading */}
                  <h3 className="font-display text-2xl font-bold leading-snug tracking-tight text-[var(--color-savanna-deep,#1B4332)] sm:text-3xl">
                    {node.meaning}
                  </h3>

                  {/* Node Description */}
                  <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft,#64748B)] sm:text-base">
                    {node.why}
                  </p>
                </div>

                {/* Call To Action Link */}
                <div className="pt-4">
                  <Link
                    href={node.href}
                    className="group/btn inline-flex items-center gap-2.5 rounded-xl border border-[var(--color-savanna-deep,#1B4332)] bg-[var(--color-savanna-deep,#1B4332)] px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-mint-bright,#52B788)] shadow-2xs transition-all duration-300 hover:bg-[var(--color-mint-bright,#52B788)] hover:text-[var(--color-savanna-deep,#1B4332)] hover:shadow-md"
                  >
                    <span>{node.linkLabel}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Active Hover Bottom Beam Accent */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-[var(--color-savanna-deep,#1B4332)] to-[var(--color-mint-bright,#52B788)]"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}