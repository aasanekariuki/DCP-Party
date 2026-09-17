// src/app/transparency/page.tsx

"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  FileText,
  Landmark,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

const sections = [
  {
    title: "Official documents",
    href: "/documents",
    description: "Access documents that have been prepared and published.",
    icon: FileText,
    number: "01",
  },
  {
    title: "Published reports",
    href: "#reports",
    description: "Review the area reserved for verified reports.",
    icon: BarChart3,
    number: "02",
  },
  {
    title: "Public statements",
    href: "/statements",
    description: "Read published statements and official communications.",
    icon: MessageSquareText,
    number: "03",
  },
  {
    title: "Contact information",
    href: "/contact",
    description: "Use the contact channel for further information.",
    icon: Landmark,
    number: "04",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

function FloatingOrb({
  className = "",
  size = "md",
  delay = 0,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  const sizes = {
    sm: "h-16 w-16",
    md: "h-28 w-28",
    lg: "h-48 w-48",
  };

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border border-mint-soft/15 bg-mint-bright/5 ${sizes[size]} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              x: [0, 10, 0],
              y: [0, -15, 0],
              scale: [1, 1.05, 1],
            }
      }
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="absolute inset-3 rounded-full border border-mint-soft/10" />
    </motion.div>
  );
}

function FloatingParticle({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-mint-bright/60 ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -18, 0],
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.2, 0.8],
            }
      }
      transition={{
        duration: 4.5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function OrbitDecoration() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute right-10 top-10 hidden h-36 w-36 rounded-full border border-mint-soft/15 lg:block"
      animate={reduceMotion ? undefined : { rotate: 360 }}
      transition={{
        duration: 24,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div className="absolute inset-5 rounded-full border border-mint-soft/10" />

      <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint-bright" />

      <span className="absolute bottom-5 right-1 h-1.5 w-1.5 rounded-full bg-warm" />
    </motion.div>
  );
}

function BackgroundDecorations() {
  return (
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

      <div className="absolute left-1/2 top-0 h-px w-[78%] -translate-x-1/2 bg-gradient-to-r from-transparent via-mint-soft/20 to-transparent" />

      <FloatingOrb
        size="lg"
        className="-right-24 top-28"
        delay={0}
      />

      <FloatingOrb
        size="md"
        className="-left-16 top-[42%]"
        delay={1.2}
      />

      <FloatingOrb
        size="sm"
        className="right-[18%] top-[72%]"
        delay={0.7}
      />

      <FloatingParticle className="left-[10%] top-[17%]" delay={0.2} />
      <FloatingParticle className="left-[25%] top-[30%]" delay={1.1} />
      <FloatingParticle className="right-[28%] top-[24%]" delay={0.8} />
      <FloatingParticle className="right-[12%] top-[52%]" delay={1.8} />
      <FloatingParticle className="left-[18%] top-[76%]" delay={2.1} />
      <FloatingParticle className="right-[38%] top-[84%]" delay={1.3} />
    </div>
  );
}

function CornerBrackets() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-4 sm:inset-6"
    >
      <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-mint-soft/20" />
      <span className="absolute right-0 top-0 h-8 w-8 border-r border-t border-mint-soft/20" />
      <span className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-mint-soft/20" />
      <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-mint-soft/20" />
    </div>
  );
}

function TransparencyCard({
  item,
  index,
}: {
  item: (typeof sections)[number];
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const Icon = item.icon;

  return (
    <motion.div
      initial={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              y: 24,
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.65,
        delay: index * 0.07,
        ease,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -5,
            }
      }
      className="group h-full"
    >
      <Link
        href={item.href}
        className="relative block h-full overflow-hidden rounded-xl border rule bg-paper-raised/65 p-5 transition-colors duration-300 hover:border-mint-soft/30 sm:p-6"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint-bright/60 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div
          aria-hidden="true"
          className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-mint-soft/10 bg-mint-bright/5 transition-transform duration-500 group-hover:scale-125"
        />

        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-mint-soft/20 bg-mint-bright/10 text-mint-soft">
              <Icon size={19} strokeWidth={1.7} />
            </div>

            <span className="font-mono text-[10px] tracking-[0.2em] text-ink-faint">
              {item.number}
            </span>
          </div>

          <div className="mt-7 flex items-center justify-between gap-4">
            <h3 className="font-display text-lg leading-tight text-ink sm:text-xl">
              {item.title}
            </h3>

            <ArrowUpRight
              size={17}
              className="shrink-0 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mint-soft"
            />
          </div>

          <p className="mt-3 max-w-sm text-sm leading-6 text-ink-soft">
            {item.description}
          </p>

          <div className="mt-6 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-ink-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-mint-bright" />
            Open section
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function TransparencyPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative overflow-hidden">
      <BackgroundDecorations />

      {/* HERO */}
      <Section border={false} className="relative pt-14 sm:pt-18 lg:pt-22">
        <div className="relative overflow-hidden rounded-2xl border rule bg-paper-raised/60 px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <CornerBrackets />
          <OrbitDecoration />

          <div className="relative z-10 max-w-4xl">
            <motion.div
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 16,
                    }
              }
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              transition={{ duration: 0.65, ease }}
            >
              <Eyebrow>Transparency</Eyebrow>
            </motion.div>

            <motion.h1
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 22,
                    }
              }
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              transition={{ duration: 0.75, delay: 0.08, ease }}
              className="mt-5 max-w-4xl font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
            >
              Public information and{" "}
              <span className="relative inline-block text-mint-soft">
                accountability.
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full bg-mint-bright/70"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 18,
                    }
              }
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              transition={{ duration: 0.7, delay: 0.16, ease }}
              className="measure mt-6 max-w-2xl text-base leading-8 text-ink-soft sm:text-lg"
            >
              This page communicates openness without making unsupported
              claims. No financial figures are fabricated in this prototype.
            </motion.p>

            <motion.div
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 14,
                    }
              }
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              transition={{ duration: 0.6, delay: 0.24, ease }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-mint-soft/20 bg-mint-bright/10 px-3.5 py-2 text-xs font-medium text-mint-soft">
                <CheckCircle2 size={14} />
                Information-first approach
              </div>

              <div className="inline-flex items-center gap-2 text-xs text-ink-faint">
                <ShieldCheck size={14} className="text-mint-soft" />
                Verified information only
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-7 right-8 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-mint-bright" />
            Public information
          </div>
        </div>
      </Section>

      {/* NAVIGATION */}
      <Section className="relative">
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <Sparkles size={15} className="text-mint-soft" />

              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                Transparency index
              </span>
            </div>

            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Explore public information
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-ink-soft">
            Navigate directly to the area you want to review. Published
            information remains separated from material awaiting confirmation.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((item, index) => (
            <TransparencyCard
              key={item.title}
              item={item}
              index={index}
            />
          ))}
        </div>
      </Section>

      {/* REPORTS */}
      <Section border={false} className="relative pb-16 sm:pb-24">
        <div
          id="reports"
          className="scroll-mt-24"
        >
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <BarChart3 size={15} className="text-mint-soft" />

                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  Reports registry
                </span>
              </div>

              <h2 className="font-display text-2xl text-ink sm:text-3xl">
                Financial and accountability reports
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-warm/20 bg-warm/5 px-3 py-2 text-xs text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-warm" />
              Awaiting verified publication
            </div>
          </div>

          <motion.div
            initial={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 24,
                  }
            }
            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease }}
            className="relative overflow-hidden rounded-2xl border rule bg-paper-raised/60 p-6 sm:p-8 lg:p-10"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint-bright/60 to-transparent"
            />

            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-44 w-44 rounded-full border border-mint-soft/10"
            />

            <div
              aria-hidden="true"
              className="absolute bottom-8 right-10 h-16 w-16 rounded-full border border-mint-soft/10"
            />

            <div className="relative">
              <div className="mb-8 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-mint-soft/20 bg-mint-bright/10 text-mint-soft">
                  <FileCheck2 size={20} strokeWidth={1.7} />
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    Publication status
                  </p>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-ink-soft">
                    The reports area is prepared for approved financial and
                    accountability documents once they are confirmed for
                    release.
                  </p>
                </div>
              </div>

              <EmptyState
                title="No verified report has been published"
                description="This section is prepared for approved financial and accountability documents once they are confirmed for release."
              />

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/documents" variant="secondary">
                  <span className="inline-flex items-center gap-2">
                    Browse official documents
                    <ArrowUpRight size={15} />
                  </span>
                </Button>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  Ask for information
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t rule pt-5 text-[11px] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-mint-bright" />
            <span className="font-mono uppercase tracking-[0.18em]">
              Transparency registry
            </span>
          </div>

          <span className="font-mono uppercase tracking-[0.14em]">
            Public information interface
          </span>
        </div>
      </Section>
    </main>
  );
}

