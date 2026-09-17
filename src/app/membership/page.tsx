// src/app/membership/page.tsx

"use client";

import type { ComponentType } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  FileCheck2,
  Fingerprint,
  Info,
  Layers3,
  Orbit,
  ShieldCheck,
  Sparkles,
  UserPlus,
} from "lucide-react";

import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { Button } from "@/components/ui/Button";

// export const metadata = { title: "Membership" };

const ease = [0.16, 1, 0.3, 1] as const;

const sections = [
  {
    title: "Membership overview",
    note: "Official membership information will be published here once confirmed.",
    Icon: UserPlus,
    code: "01",
  },
  {
    title: "Eligibility",
    note: "Official eligibility requirements will be published here once confirmed.",
    Icon: ShieldCheck,
    code: "02",
  },
  {
    title: "Registration process",
    note: "Official registration process will be published here once confirmed.",
    Icon: FileCheck2,
    code: "03",
  },
  {
    title: "Membership fee",
    note: "No fee has been verified for publication. This section will only show a figure once confirmed.",
    Icon: Info,
    code: "04",
  },
];

function FloatingOrb({
  className = "",
  size = 150,
  delay = 0,
}: {
  className?: string;
  size?: number;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border border-mint-bright/20 bg-mint-bright/[0.045] ${className}`}
      style={{
        width: size,
        height: size,
        boxShadow: "0 0 90px rgba(82,183,136,0.10)",
      }}
      animate={
        reduceMotion
          ? undefined
          : {
              x: [0, 10, 0],
              y: [0, -18, 0],
              rotate: [0, 8, 0],
            }
      }
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function FloatingParticle({
  className = "",
  delay = 0,
  size = 4,
}: {
  className?: string;
  delay?: number;
  size?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full bg-mint-bright/55 ${className}`}
      style={{
        width: size,
        height: size,
        boxShadow: "0 0 18px rgba(82,183,136,0.35)",
      }}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -22, 0],
              opacity: [0.15, 0.85, 0.15],
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

function BackgroundGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.38]"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(45,106,79,0.055) 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            rgba(45,106,79,0.055) 1px,
            transparent 1px
          )
        `,
        backgroundSize: "46px 46px",
        maskImage:
          "linear-gradient(to bottom, black 0%, black 62%, transparent 100%)",
      }}
    />
  );
}

function CornerBrackets() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <span className="absolute left-0 top-0 h-10 w-10 border-l border-t border-mint-bright/30" />
      <span className="absolute right-0 top-0 h-10 w-10 border-r border-t border-mint-bright/30" />
      <span className="absolute bottom-0 left-0 h-10 w-10 border-b border-l border-mint-bright/30" />
      <span className="absolute bottom-0 right-0 h-10 w-10 border-b border-r border-mint-bright/30" />
    </div>
  );
}

function OrbitDecoration() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-35px] top-16 hidden h-44 w-44 rounded-full border border-mint-bright/15 sm:block"
      animate={
        reduceMotion
          ? undefined
          : {
              rotate: 360,
            }
      }
      transition={{
        duration: 24,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-mint-bright shadow-[0_0_15px_rgba(82,183,136,0.65)]" />

      <div className="absolute inset-7 rounded-full border border-mint-soft/15" />
      <div className="absolute inset-14 rounded-full border border-mint-bright/10" />

      <motion.span
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-warm/75"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.5, 1],
                opacity: [0.35, 1, 0.35],
              }
        }
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

function SignalLine() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative mt-7 h-px w-full overflow-hidden bg-mint-soft/10"
    >
      <motion.span
        className="absolute left-0 top-0 h-px w-24 bg-mint-bright/70"
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["-120px", "100vw"],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

function MembershipCard({
  title,
  note,
  Icon,
  code,
  index,
}: {
  title: string;
  note: string;
  Icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  code: string;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 20,
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
      viewport={{
        once: true,
        amount: 0.16,
      }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -5,
            }
      }
      className="group relative overflow-hidden rounded-[1.5rem] border border-paper-line bg-paper-raised/80 p-5 shadow-[0_16px_45px_rgba(27,67,50,0.055)] backdrop-blur transition-colors duration-300 hover:border-mint-bright/25 hover:bg-paper-raised sm:p-6"
    >
      <div className="absolute right-[-28px] top-[-28px] h-24 w-24 rounded-full border border-mint-bright/10 opacity-0 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100" />

      <div className="absolute bottom-0 left-0 h-px w-0 bg-mint-bright/60 transition-all duration-500 group-hover:w-full" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <motion.div
            whileHover={
              reduceMotion
                ? undefined
                : {
                    rotate: 4,
                    scale: 1.06,
                  }
            }
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-mint-bright/15 bg-mint-bright/[0.055] text-mint-soft"
          >
            <Icon size={20} strokeWidth={1.75} />
          </motion.div>

          <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-ink-soft/45">
            {code}
          </span>
        </div>

        <h3 className="mt-6 font-display text-xl leading-tight text-ink">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-ink-soft">
          {note}
        </p>

        <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-mint-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-mint-bright shadow-[0_0_10px_rgba(82,183,136,0.5)]" />
          Pending verification
        </div>
      </div>
    </motion.article>
  );
}

function VerificationPanel() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 18,
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
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        ease,
      }}
      className="relative overflow-hidden rounded-[1.75rem] border border-mint-bright/15 bg-mint-bright/[0.045] p-5 sm:p-6"
    >
      <FloatingParticle
        className="right-8 top-8"
        delay={0.4}
        size={4}
      />

      <FloatingParticle
        className="bottom-8 right-16"
        delay={1.5}
        size={3}
      />

      <div className="relative z-10">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-mint-bright/15 bg-paper/70 text-mint-soft">
            <Fingerprint size={18} />
          </span>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-mint-soft">
              Information standard
            </p>

            <h2 className="mt-1 font-display text-xl text-ink">
              Verified information only
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-ink-soft">
          This membership page deliberately avoids publishing an
          invented fee, eligibility rule, registration procedure, or
          other unverified requirement.
        </p>

        <div className="mt-5 flex items-center gap-2 rounded-xl border border-paper-line bg-paper/70 px-3.5 py-3">
          <CheckCircle2
            size={16}
            className="shrink-0 text-mint-soft"
          />

          <span className="text-xs font-medium text-ink">
            Official information will replace placeholders once
            confirmed.
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function MembershipPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative min-h-screen overflow-hidden bg-paper text-ink">
      <BackgroundGrid />

      {/* Ambient floating system */}
      <FloatingOrb
        className="left-[-90px] top-32"
        size={220}
        delay={0.4}
      />

      <FloatingOrb
        className="right-[-110px] top-[38%]"
        size={250}
        delay={1.4}
      />

      <FloatingOrb
        className="bottom-[-80px] left-[38%]"
        size={190}
        delay={2}
      />

      <FloatingParticle
        className="left-[8%] top-[20%]"
        delay={0.2}
        size={4}
      />

      <FloatingParticle
        className="right-[15%] top-[27%]"
        delay={1}
        size={5}
      />

      <FloatingParticle
        className="left-[18%] top-[65%]"
        delay={1.8}
        size={3}
      />

      <FloatingParticle
        className="right-[24%] top-[76%]"
        delay={2.5}
        size={4}
      />

      {/* Hero */}
      <Section
        border={false}
        className="relative z-10 pt-12 sm:pt-16 lg:pt-20"
      >
        <motion.div
          initial={
            reduceMotion
              ? false
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
          transition={{
            duration: 0.75,
            ease,
          }}
          className="relative overflow-hidden rounded-[2rem] border border-paper-line bg-paper-raised/75 p-6 shadow-[0_24px_80px_rgba(27,67,50,0.08)] backdrop-blur sm:p-8 lg:p-10"
        >
          <BackgroundGrid />
          <CornerBrackets />
          <OrbitDecoration />

          <FloatingOrb
            className="right-[-65px] top-[-55px]"
            size={190}
            delay={0.3}
          />

          <FloatingParticle
            className="right-[21%] top-[20%]"
            delay={0.8}
          />

          <div className="relative z-10 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <Eyebrow>Membership</Eyebrow>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-mint-bright/20 bg-mint-bright/[0.05] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-mint-soft">
                <UserPlus size={12} />
                Participation
              </span>
            </div>

            <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-ink sm:text-5xl lg:text-6xl">
              Joining the{" "}
              <span className="relative inline-block text-mint-soft">
                party
                <motion.span
                  initial={
                    reduceMotion
                      ? false
                      : {
                          scaleX: 0,
                        }
                  }
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scaleX: 1,
                        }
                  }
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                    ease,
                  }}
                  className="absolute -bottom-2 left-0 h-1 w-full origin-left rounded-full bg-mint-bright/70 shadow-[0_0_18px_rgba(82,183,136,0.28)]"
                />
              </span>
              .
            </h1>

            <p className="measure mt-7 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">
              This page only publishes verified official information.
              Nothing below is an invented fee, requirement, or
              process.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <VerificationBadge status="pending-verification" />

              <span className="inline-flex items-center gap-2 rounded-full border border-paper-line bg-paper/75 px-3.5 py-2 text-xs font-medium text-ink-soft shadow-sm">
                <ShieldCheck
                  size={14}
                  className="text-mint-soft"
                />
                Verification-first information
              </span>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Membership information */}
      <Section className="relative z-10">
        <div className="grid gap-7 lg:grid-cols-12 lg:gap-10">
          {/* Information cards */}
          <div className="lg:col-span-8">
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 18,
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
              viewport={{
                once: true,
                amount: 0.12,
              }}
              transition={{
                duration: 0.65,
                ease,
              }}
            >
              <div className="mb-6">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-mint-soft">
                  <Layers3 size={13} />
                  Membership information
                </p>

                <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
                  What is currently confirmed
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
                  The sections below remain intentionally transparent
                  while official information is awaiting confirmation.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {sections.map((section, index) => (
                  <MembershipCard
                    key={section.title}
                    {...section}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Verification rail */}
          <aside className="lg:col-span-4">
            <div className="space-y-6">
              <VerificationPanel />

              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 18,
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
                viewport={{
                  once: true,
                  amount: 0.18,
                }}
                transition={{
                  duration: 0.65,
                  delay: 0.1,
                  ease,
                }}
                className="relative overflow-hidden rounded-[1.75rem] border border-paper-line bg-paper-raised/75 p-5 shadow-[0_18px_55px_rgba(27,67,50,0.06)] sm:p-6"
              >
                <div className="absolute right-5 top-5 opacity-35">
                  <CircleHelp
                    size={28}
                    className="text-mint-soft"
                  />
                </div>

                <div className="relative">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-mint-soft">
                    Need clarification?
                  </p>

                  <h2 className="mt-2 max-w-xs font-display text-xl text-ink">
                    Ask about membership
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-ink-soft">
                    If you have a membership question that is not
                    answered here, send an inquiry through the contact
                    channel.
                  </p>

                  <div className="mt-5">
                    <Button
                      href="/contact"
                      variant="secondary"
                    >
                      Ask about membership
                      <ArrowUpRight size={15} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </aside>
        </div>

        <SignalLine />

        {/* Bottom information rail */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 14,
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
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.65,
            delay: 0.15,
            ease,
          }}
          className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-mint-bright/15 bg-mint-bright/[0.05] text-mint-soft">
              <Orbit size={15} />
            </span>

            <div>
              <p className="text-xs font-semibold text-ink">
                Membership information desk
              </p>

              <p className="mt-0.5 text-xs text-ink-soft">
                Official details will be published as they are
                verified.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-mint-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-mint-bright shadow-[0_0_12px_rgba(82,183,136,0.55)]" />
            Verification-first publishing
            <ChevronRight size={14} />
          </div>
        </motion.div>
      </Section>
    </main>
  );
}