"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Timeline } from "@/components/timeline/Timeline";
import { historicalMilestones } from "@/data/history";
import {
  Sparkles,
  Clock,
  History as HistoryIcon,
  ShieldCheck,
  ArrowDown,
  CircleDot,
  ScanLine,
  Orbit,
  Activity,
} from "lucide-react";
import { PROTOTYPE_NOTICE } from "@/lib/constants";

const ease = [0.16, 1, 0.3, 1] as const;

function FloatingOrb({
  className = "",
  size = 260,
  variant = "mint",
}: {
  className?: string;
  size?: number;
  variant?: "mint" | "jungle";
}) {
  const reduceMotion = useReducedMotion();

  const gradients = {
    mint: "bg-[radial-gradient(circle,rgba(82,183,136,0.18)_0%,rgba(45,106,79,0.07)_45%,transparent_72%)]",
    jungle:
      "bg-[radial-gradient(circle,rgba(27,67,50,0.24)_0%,rgba(45,106,79,0.08)_48%,transparent_74%)]",
  };

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${gradients[variant]} ${className}`}
      style={{ width: size, height: size }}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: [1, 1.12, 1],
              opacity: [0.3, 0.62, 0.3],
              x: [0, 12, 0],
              y: [0, -14, 0],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 11,
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
  shape = "circle",
}: {
  delay?: number;
  duration?: number;
  className?: string;
  shape?: "circle" | "diamond" | "ring";
}) {
  const reduceMotion = useReducedMotion();

  const shapeStyles = {
    circle:
      "rounded-full bg-[var(--color-mint-bright,#52B788)]/60 shadow-[0_0_14px_rgba(82,183,136,0.5)]",
    diamond:
      "rotate-45 rounded-[2px] border border-[var(--color-mint-bright,#52B788)]/45 bg-[var(--color-mint-bright,#52B788)]/10",
    ring: "rounded-full border border-[var(--color-mint-bright,#52B788)]/40 bg-transparent",
  };

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute block ${shapeStyles[shape]} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -18, 0],
              x: [0, 7, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.15, 0.8],
              rotate: shape === "diamond" ? [45, 135, 45] : undefined,
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

function OrbitDecoration({
  size = 260,
  className = "",
  duration = 30,
}: {
  size?: number;
  className?: string;
  duration?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border border-[var(--color-mint-bright,#52B788)]/15 ${className}`}
      style={{
        width: size,
        height: size,
      }}
      animate={
        reduceMotion
          ? undefined
          : {
              rotate: 360,
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration,
              repeat: Infinity,
              ease: "linear",
            }
      }
    >
      <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_14px_rgba(82,183,136,0.7)]" />
      <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-mint-bright,#52B788)]/70" />
    </motion.div>
  );
}

function CornerBrackets() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-[var(--color-mint-bright,#52B788)]/25 transition-all duration-300 group-hover:h-7 group-hover:w-7 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-[var(--color-mint-bright,#52B788)]/25 transition-all duration-300 group-hover:h-7 group-hover:w-7 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-[var(--color-mint-bright,#52B788)]/25 transition-all duration-300 group-hover:h-7 group-hover:w-7 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-[var(--color-mint-bright,#52B788)]/25 transition-all duration-300 group-hover:h-7 group-hover:w-7 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
    </>
  );
}

function SectionMarker({
  label,
  icon: Icon,
}: {
  label: string;
  icon: typeof Sparkles;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Eyebrow>{label}</Eyebrow>

      <motion.span
        aria-hidden="true"
        className="h-px w-8 origin-left bg-[var(--color-mint-bright,#52B788)]/45"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
      />

      <Icon className="h-3.5 w-3.5 text-[var(--color-mint-bright,#52B788)]" />
    </div>
  );
}

export default function HistoryPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative overflow-hidden bg-[var(--color-paper,#FAF9F6)]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <Section
        border={false}
        animateEntry={false}
        className="relative overflow-hidden bg-[var(--color-savanna-deep,#1B4332)] py-16 text-white sm:py-20 lg:py-24"
      >
        {/* Background grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(82,183,136,0.18) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(82,183,136,0.18) 1px, transparent 1px)
            `,
            backgroundSize: "42px 42px",
          }}
        />

        {/* Atmospheric light */}
        <FloatingOrb
          size={520}
          variant="mint"
          className="-left-48 -top-52"
        />

        <FloatingOrb
          size={420}
          variant="jungle"
          className="-bottom-52 -right-40"
        />

        {/* Decorative orbital systems */}
        <OrbitDecoration
          size={360}
          duration={44}
          className="-right-44 -top-40"
        />

        <OrbitDecoration
          size={190}
          duration={28}
          className="-bottom-24 -left-20"
        />

        {/* Floating objects */}
        <FloatingParticle
          shape="circle"
          className="left-[7%] top-[23%] h-2.5 w-2.5"
          delay={0.2}
          duration={5}
        />

        <FloatingParticle
          shape="diamond"
          className="right-[14%] top-[20%] h-3.5 w-3.5"
          delay={0.9}
          duration={7}
        />

        <FloatingParticle
          shape="ring"
          className="bottom-[22%] left-[18%] h-5 w-5"
          delay={1.4}
          duration={8}
        />

        <FloatingParticle
          shape="circle"
          className="bottom-[18%] right-[25%] h-1.5 w-1.5"
          delay={0.6}
          duration={5.5}
        />

        {/* Hero content */}
        <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 24,
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
            className="max-w-3xl"
          >
            <SectionMarker label="History" icon={Clock} />

            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-7xl">
              How the party has{" "}
              <span className="relative inline-block text-[var(--color-mint-bright,#52B788)]">
                developed.
                <motion.span
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 h-px w-28 origin-left bg-gradient-to-r from-[var(--color-mint-bright,#52B788)] to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: 0.7,
                    duration: 0.7,
                    ease,
                  }}
                />
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              A chronological record of the party&rsquo;s organizational
              development. Entries below are placeholders pending sourced,
              verified milestones.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-mint-bright,#52B788)]/[0.07] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-mint-bright,#52B788)] shadow-[0_0_24px_rgba(82,183,136,0.08)]">
                <CircleDot className="h-3 w-3" />
                Historical record
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/55 backdrop-blur-md">
                <ShieldCheck className="h-3 w-3 text-[var(--color-mint-bright,#52B788)]" />
                Verification pending
              </div>
            </div>
          </motion.div>

          {/* Hero timeline visual */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.88,
                    rotate: 4,
                  }
            }
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                  }
            }
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease,
            }}
            className="relative mx-auto hidden h-[320px] w-full max-w-[340px] lg:block"
          >
            {/* Outer rings */}
            <div className="absolute inset-4 rounded-full border border-[var(--color-mint-bright,#52B788)]/10" />

            <motion.div
              aria-hidden="true"
              className="absolute inset-10 rounded-full border border-dashed border-[var(--color-mint-bright,#52B788)]/25"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      rotate: 360,
                    }
              }
              transition={{
                duration: 32,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <div className="absolute inset-20 rounded-full border border-[var(--color-mint-bright,#52B788)]/10" />

            {/* Central timeline core */}
            <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-mint-bright,#52B788)]/10 shadow-[0_0_70px_rgba(82,183,136,0.14)] backdrop-blur-md">
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.06, 1],
                      }
                }
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--color-mint-bright,#52B788)]/30 bg-[var(--color-savanna-deep,#1B4332)]"
              >
                <HistoryIcon className="h-8 w-8 text-[var(--color-mint-bright,#52B788)]" />
              </motion.div>
            </div>

            {/* Floating year/status objects */}
            <motion.div
              className="absolute left-0 top-14 rounded-xl border border-[var(--color-mint-bright,#52B788)]/20 bg-white/[0.045] px-3.5 py-2.5 backdrop-blur-md"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, -8, 0],
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="block text-[9px] font-semibold uppercase tracking-[0.16em] text-white/35">
                Record
              </span>
              <span className="mt-1 block text-sm font-bold text-[var(--color-mint-bright,#52B788)]">
                Timeline
              </span>
            </motion.div>

            <motion.div
              className="absolute bottom-10 right-0 rounded-xl border border-[var(--color-mint-bright,#52B788)]/20 bg-white/[0.045] px-3.5 py-2.5 backdrop-blur-md"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, 8, 0],
                    }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="block text-[9px] font-semibold uppercase tracking-[0.16em] text-white/35">
                Status
              </span>
              <span className="mt-1 block text-sm font-bold text-white">
                Source pending
              </span>
            </motion.div>

            {/* Orbiting signal point */}
            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      rotate: 360,
                    }
              }
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_18px_rgba(82,183,136,0.8)]" />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom signal rail */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 10,
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
            delay: 0.7,
            duration: 0.6,
            ease,
          }}
          className="relative z-10 mt-12 flex items-center gap-3 border-t border-[var(--color-mint-bright,#52B788)]/15 pt-5"
        >
          <ScanLine className="h-4 w-4 shrink-0 text-[var(--color-mint-bright,#52B788)]" />

          <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
            DCP Kenya · Historical record
          </span>

          <span className="h-px flex-1 bg-gradient-to-r from-[var(--color-mint-bright,#52B788)]/25 to-transparent" />

          <ArrowDown className="hidden h-4 w-4 text-[var(--color-mint-bright,#52B788)]/55 sm:block" />
        </motion.div>
      </Section>

      {/* =========================================================
          TIMELINE
      ========================================================= */}
      <Section
        border
        animateEntry={false}
        className="relative overflow-hidden bg-[var(--color-paper,#FAF9F6)] py-16 sm:py-20 lg:py-24"
      >
        {/* Background atmosphere */}
        <FloatingOrb
          size={420}
          variant="mint"
          className="-right-44 -top-24"
        />

        <FloatingOrb
          size={300}
          variant="jungle"
          className="-left-36 bottom-1/4"
        />

        <FloatingParticle
          shape="diamond"
          className="left-[8%] top-[17%] h-3 w-3"
          delay={0.3}
          duration={7}
        />

        <FloatingParticle
          shape="ring"
          className="right-[8%] top-[30%] h-6 w-6"
          delay={1.1}
          duration={8}
        />

        <FloatingParticle
          shape="circle"
          className="right-[15%] bottom-[15%] h-2 w-2"
          delay={0.8}
          duration={5}
        />

        <OrbitDecoration
          size={250}
          duration={38}
          className="-right-32 bottom-10"
        />

        <div className="relative z-10">
          {/* Section heading */}
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
              margin: "-70px",
            }}
            transition={{
              duration: 0.6,
              ease,
            }}
            className="mb-10 max-w-2xl sm:mb-12"
          >
            <SectionMarker
              label="Chronological record"
              icon={HistoryIcon}
            />

            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-[var(--color-savanna-deep,#1B4332)] sm:text-4xl lg:text-5xl">
              The journey,{" "}
              <span className="relative text-[var(--color-mint-soft,#2D6A4F)]">
                year by year.
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full bg-[var(--color-mint-bright,#52B788)]/35"
                />
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-ink-soft,#64748B)] sm:text-base">
              Explore the recorded milestones below. The timeline remains
              interactive while each historical entry is reviewed against
              its source material.
            </p>
          </motion.div>

          {/* Timeline frame */}
          <motion.div
            initial={
              reduceMotion
                ? false
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
            viewport={{
              once: true,
              margin: "-50px",
            }}
            transition={{
              duration: 0.7,
              ease,
            }}
            className="group relative overflow-hidden rounded-3xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper-raised,#F4F1EA)]/70 p-4 shadow-[0_18px_55px_rgba(27,67,50,0.06)] backdrop-blur-md sm:p-6 lg:p-8"
          >
            <CornerBrackets />

            {/* Timeline grid texture */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(82,183,136,0.16) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(82,183,136,0.16) 1px, transparent 1px)
                `,
                backgroundSize: "36px 36px",
              }}
            />

            {/* Top scanner line */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-mint-bright,#52B788)]/70 to-transparent"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: ["-20%", "20%", "-20%"],
                      opacity: [0.2, 0.8, 0.2],
                    }
              }
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Timeline status header */}
            <div className="relative z-10 mb-7 flex flex-col gap-3 border-b border-[var(--color-mint-bright,#52B788)]/15 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-savanna-deep,#1B4332)]/8">
                  <Activity className="h-4 w-4 text-[var(--color-mint-bright,#52B788)]" />
                </div>

                <div>
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--color-mint-soft,#2D6A4F)]">
                    Historical data
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--color-ink-soft,#64748B)]">
                    Interactive milestone sequence
                  </p>
                </div>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-mint-bright,#52B788)]/[0.06] px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_9px_rgba(82,183,136,0.7)]" />
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--color-mint-soft,#2D6A4F)]">
                  Source review
                </span>
              </div>
            </div>

            {/* Actual existing timeline — functionality preserved */}
            <div className="relative z-10">
              <Timeline milestones={historicalMilestones} />
            </div>

            {/* Bottom glow */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[var(--color-mint-bright,#52B788)]/35 to-transparent"
            />
          </motion.div>
        </div>
      </Section>

      {/* =========================================================
          VERIFICATION NOTICE
      ========================================================= */}
      <Section
        border={false}
        animateEntry={false}
        className="relative overflow-hidden bg-[var(--color-savanna-deep,#1B4332)] py-8 sm:py-10"
      >
        <FloatingOrb
          size={320}
          variant="mint"
          className="-left-28 -top-36"
        />

        <FloatingOrb
          size={240}
          variant="jungle"
          className="-bottom-28 -right-24"
        />

        <FloatingParticle
          shape="circle"
          className="right-[12%] top-[30%] h-2 w-2"
          delay={0.8}
        />

        <FloatingParticle
          shape="diamond"
          className="left-[18%] bottom-[18%] h-2.5 w-2.5"
          delay={1.4}
          duration={7}
        />

        <div className="relative z-10">
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 16,
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
              margin: "-50px",
            }}
            transition={{
              duration: 0.6,
              ease,
            }}
            className="group relative overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-mint-bright,#52B788)]/[0.06] p-5 backdrop-blur-md sm:p-6"
          >
            <CornerBrackets />

            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(82,183,136,0.16),transparent_70%)] blur-2xl"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.18, 1],
                      opacity: [0.4, 0.8, 0.4],
                    }
              }
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
              <motion.div
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        rotate: 6,
                        scale: 1.04,
                      }
                }
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-mint-bright,#52B788)]/10 shadow-[0_0_25px_rgba(82,183,136,0.08)]"
              >
                <ShieldCheck className="h-5 w-5 text-[var(--color-mint-bright,#52B788)]" />
              </motion.div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-display text-sm font-bold uppercase tracking-[0.12em] text-white">
                    Verification notice
                  </span>

                  <span className="h-1 w-1 rounded-full bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_8px_rgba(82,183,136,0.7)]" />

                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--color-mint-bright,#52B788)]/70">
                    Historical source layer
                  </span>
                </div>

                <p className="mt-2 max-w-4xl text-xs leading-6 text-white/60 sm:text-sm">
                  {PROTOTYPE_NOTICE}
                </p>
              </div>

              <Orbit className="ml-auto hidden h-5 w-5 shrink-0 text-[var(--color-mint-bright,#52B788)]/40 sm:block" />
            </div>

            {/* Animated footer rail */}
            <div className="relative mt-5 h-px overflow-hidden bg-[var(--color-mint-bright,#52B788)]/10">
              <motion.span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-24 bg-gradient-to-r from-transparent via-[var(--color-mint-bright,#52B788)] to-transparent"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        x: ["-100%", "500%"],
                      }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}