"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LeadershipDirectory } from "@/components/leadership/LeadershipDirectory";
import {
  getLeadershipProfiles,
  leadershipCategories,
} from "@/data/leadership";
import {
  Users,
  Sparkles,
  ShieldCheck,
  Network,
  ArrowUpRight,
  ScanLine,
  CircleDot,
  Layers3,
  Orbit,
  Fingerprint,
} from "lucide-react";
import { PROTOTYPE_NOTICE } from "@/lib/constants";

const ease = [0.16, 1, 0.3, 1] as const;

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
    jungle:
      "bg-[radial-gradient(circle,rgba(27,67,50,0.22)_0%,rgba(45,106,79,0.08)_48%,transparent_74%)]",
    mint:
      "bg-[radial-gradient(circle,rgba(82,183,136,0.18)_0%,rgba(45,106,79,0.06)_48%,transparent_72%)]",
    emerald:
      "bg-[radial-gradient(circle,rgba(16,185,129,0.12)_0%,rgba(6,78,59,0.05)_52%,transparent_74%)]",
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
              opacity: [0.3, 0.68, 0.3],
              x: [0, 14, 0],
              y: [0, -12, 0],
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
  color = "mint",
  shape = "circle",
}: {
  delay?: number;
  duration?: number;
  className?: string;
  color?: "mint" | "jungle" | "emerald";
  shape?: "circle" | "diamond" | "ring";
}) {
  const reduceMotion = useReducedMotion();

  const colors = {
    mint: "border-[var(--color-mint-bright,#52B788)] bg-[var(--color-mint-bright,#52B788)]/20 shadow-[0_0_16px_rgba(82,183,136,0.35)]",
    jungle:
      "border-[var(--color-savanna-deep,#1B4332)] bg-[var(--color-savanna-deep,#1B4332)]/20",
    emerald:
      "border-[var(--color-mint-soft,#2D6A4F)] bg-[var(--color-mint-soft,#2D6A4F)]/20 shadow-[0_0_14px_rgba(45,106,79,0.3)]",
  };

  const shapeClass = {
    circle: "rounded-full",
    diamond: "rotate-45 rounded-[2px]",
    ring: "rounded-full bg-transparent",
  };

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute block border ${colors[color]} ${shapeClass[shape]} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -16, 0],
              x: [0, 7, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.85, 1.15, 0.85],
              rotate:
                shape === "diamond" ? [45, 135, 45] : undefined,
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
      style={{ width: size, height: size }}
      animate={reduceMotion ? undefined : { rotate: 360 }}
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
        className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-[var(--color-mint-bright,#52B788)]/20 transition-all duration-300 group-hover:h-7 group-hover:w-7 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-[var(--color-mint-bright,#52B788)]/20 transition-all duration-300 group-hover:h-7 group-hover:w-7 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-[var(--color-mint-bright,#52B788)]/20 transition-all duration-300 group-hover:h-7 group-hover:w-7 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-[var(--color-mint-bright,#52B788)]/20 transition-all duration-300 group-hover:h-7 group-hover:w-7 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
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

function LeadershipSignal({
  number,
  label,
  icon: Icon,
}: {
  number: string;
  label: string;
  icon: typeof Users;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -4,
            }
      }
      className="group relative overflow-hidden rounded-xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper,#FAF9F6)]/70 p-4 backdrop-blur-md transition-all duration-300 hover:border-[var(--color-mint-bright,#52B788)]/50 hover:bg-[var(--color-paper,#FAF9F6)]"
    >
      <span
        aria-hidden="true"
        className="absolute right-0 top-0 h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(82,183,136,0.14),transparent_70%)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-savanna-deep,#1B4332)]/[0.06]">
          <Icon className="h-4 w-4 text-[var(--color-mint-soft,#2D6A4F)]" />
        </div>

        <div className="min-w-0">
          <p className="font-mono text-lg font-bold tracking-tight text-[var(--color-savanna-deep,#1B4332)]">
            {number}
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-soft,#64748B)]">
            {label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function LeadershipPage() {
  const reduceMotion = useReducedMotion();
  const profiles = getLeadershipProfiles();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease,
      },
    },
  };

  return (
    <main className="relative overflow-hidden bg-[var(--color-paper,#FAF9F6)]">
      {/* =========================================================
          HERO
      ========================================================= */}

      <Section
        border={false}
        animateEntry={false}
        className="relative overflow-hidden bg-[var(--color-paper,#FAF9F6)] py-14 sm:py-18 lg:py-20"
      >
        {/* Atmospheric background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(82,183,136,0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(82,183,136,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "46px 46px",
          }}
        />

        <FloatingOrb
          size={430}
          variant="mint"
          className="-left-40 -top-48"
        />

        <FloatingOrb
          size={360}
          variant="jungle"
          className="-right-36 bottom-[-150px]"
        />

        <OrbitDecoration
          size={330}
          duration={42}
          className="-right-40 -top-44"
        />

        <OrbitDecoration
          size={180}
          duration={28}
          className="-bottom-24 left-[-80px]"
        />

        <FloatingParticle
          color="mint"
          shape="circle"
          className="left-[7%] top-[25%] h-2.5 w-2.5"
          delay={0.2}
          duration={5.5}
        />

        <FloatingParticle
          color="jungle"
          shape="diamond"
          className="right-[13%] top-[22%] h-3.5 w-3.5"
          delay={0.8}
          duration={7}
        />

        <FloatingParticle
          color="mint"
          shape="ring"
          className="bottom-[22%] left-[18%] h-5 w-5"
          delay={1.4}
          duration={8}
        />

        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
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
            <SectionMarker label="Leadership" icon={Users} />

            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.04] tracking-tight text-[var(--color-savanna-deep,#1B4332)] sm:text-5xl lg:text-6xl">
              The people
              <span className="relative block text-[var(--color-mint-soft,#2D6A4F)]">
                leading the organization.
                <motion.span
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 h-0.5 w-28 origin-left bg-gradient-to-r from-[var(--color-mint-bright,#52B788)] to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: 0.75,
                    duration: 0.8,
                    ease,
                  }}
                />
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--color-ink-soft,#64748B)] sm:text-base sm:leading-8">
              Profiles below present the current organizational directory.
              They remain{" "}
              <strong className="font-semibold text-[var(--color-savanna-deep,#1B4332)]">
                structural placeholders
              </strong>{" "}
              until approved biographies and source material are verified.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-mint-bright,#52B788)]/[0.07] px-3 py-1.5 shadow-[0_0_22px_rgba(82,183,136,0.08)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-mint-bright,#52B788)]/40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-mint-bright,#52B788)]" />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-savanna-deep,#1B4332)]">
                  Directory active
                </span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-mint-bright,#52B788)]/15 bg-white/50 px-3 py-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--color-mint-soft,#2D6A4F)]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-soft,#64748B)]">
                  Verification pending
                </span>
              </div>
            </div>
          </motion.div>

          {/* Hero organizational visual */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.92,
                    y: 18,
                  }
            }
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }
            }
            transition={{
              duration: 0.9,
              delay: 0.12,
              ease,
            }}
            className="relative mx-auto w-full max-w-[340px]"
          >
            <div className="relative aspect-square">
              <div className="absolute inset-5 rounded-full border border-[var(--color-mint-bright,#52B788)]/15" />

              <motion.div
                aria-hidden="true"
                className="absolute inset-12 rounded-full border border-dashed border-[var(--color-mint-bright,#52B788)]/25"
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
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                      }
                }
              />

              <motion.div
                aria-hidden="true"
                className="absolute inset-[4.5rem] rounded-full border border-[var(--color-mint-soft,#2D6A4F)]/15"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        rotate: -360,
                      }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 38,
                        repeat: Infinity,
                        ease: "linear",
                      }
                }
              />

              <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] border border-[var(--color-mint-bright,#52B788)]/30 bg-[var(--color-mint-bright,#52B788)]/[0.07] shadow-[0_0_70px_rgba(82,183,136,0.13)] backdrop-blur-md">
                <div className="flex h-24 w-24 items-center justify-center rounded-[1.4rem] border border-[var(--color-mint-bright,#52B788)]/30 bg-[var(--color-savanna-deep,#1B4332)] shadow-[0_12px_35px_rgba(27,67,50,0.2)]">
                  <Network className="h-10 w-10 text-[var(--color-mint-bright,#52B788)]" />
                </div>
              </div>

              <motion.div
                className="absolute left-0 top-[20%] rounded-xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper,#FAF9F6)]/80 px-3 py-2 shadow-[0_12px_30px_rgba(27,67,50,0.06)] backdrop-blur-md"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -7, 0],
                      }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              >
                <span className="block text-[8px] font-semibold uppercase tracking-[0.15em] text-[var(--color-ink-soft,#64748B)]">
                  Structure
                </span>
                <span className="mt-1 block text-xs font-bold text-[var(--color-savanna-deep,#1B4332)]">
                  Connected
                </span>
              </motion.div>

              <motion.div
                className="absolute bottom-[18%] right-0 rounded-xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper,#FAF9F6)]/80 px-3 py-2 shadow-[0_12px_30px_rgba(27,67,50,0.06)] backdrop-blur-md"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, 8, 0],
                      }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              >
                <span className="block text-[8px] font-semibold uppercase tracking-[0.15em] text-[var(--color-ink-soft,#64748B)]">
                  Leadership
                </span>
                <span className="mt-1 block text-xs font-bold text-[var(--color-mint-soft,#2D6A4F)]">
                  People first
                </span>
              </motion.div>

              <FloatingParticle
                color="mint"
                shape="circle"
                className="right-[8%] top-[14%] h-2 w-2"
                delay={1}
              />

              <FloatingParticle
                color="jungle"
                shape="diamond"
                className="bottom-[11%] left-[10%] h-3 w-3"
                delay={1.8}
              />
            </div>
          </motion.div>
        </div>

        {/* Hero signal rail */}
        <div className="relative z-10 mt-10 grid gap-3 border-t border-[var(--color-mint-bright,#52B788)]/15 pt-5 sm:grid-cols-3">
          <LeadershipSignal
            number={String(profiles.length).padStart(2, "0")}
            label="Profiles listed"
            icon={Users}
          />

          <LeadershipSignal
            number={String(leadershipCategories.length).padStart(2, "0")}
            label="Leadership groups"
            icon={Layers3}
          />

          <LeadershipSignal
            number="01"
            label="Directory"
            icon={Fingerprint}
          />
        </div>
      </Section>

      {/* =========================================================
          DIRECTORY
      ========================================================= */}

      <Section
        border
        animateEntry={false}
        className="relative overflow-hidden bg-[var(--color-paper-raised,#F4F1EA)] py-14 sm:py-18 lg:py-20"
      >
        <FloatingOrb
          size={390}
          variant="mint"
          className="-right-44 -top-32"
        />

        <FloatingOrb
          size={300}
          variant="jungle"
          className="-left-40 bottom-[-120px]"
        />

        <OrbitDecoration
          size={240}
          duration={34}
          className="-right-28 bottom-10"
        />

        <FloatingParticle
          color="mint"
          shape="ring"
          className="left-[8%] top-[17%] h-6 w-6"
          delay={0.3}
          duration={8}
        />

        <FloatingParticle
          color="jungle"
          shape="diamond"
          className="right-[7%] top-[28%] h-3 w-3"
          delay={1.1}
          duration={6}
        />

        <div className="relative z-10">
          <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <SectionMarker label="Executive directory" icon={Sparkles} />

              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-[var(--color-savanna-deep,#1B4332)] sm:text-4xl lg:text-5xl">
                The leadership
                <span className="relative ml-2 text-[var(--color-mint-soft,#2D6A4F)]">
                  network.
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-[var(--color-mint-bright,#52B788)]/35" />
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-ink-soft,#64748B)] sm:text-base">
                Explore the organizational directory through the available
                leadership categories. Information remains clearly marked
                while source verification is pending.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper,#FAF9F6)]/70 px-3 py-2 backdrop-blur-md sm:self-auto">
              <CircleDot className="h-3.5 w-3.5 text-[var(--color-mint-bright,#52B788)]" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--color-ink-soft,#64748B)]">
                Live directory
              </span>
            </div>
          </div>

          <motion.div
            initial={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 22,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-60px",
            }}
            transition={{
              duration: 0.7,
              ease,
            }}
            className="relative"
          >
            {/* Directory frame */}
            <div className="group relative overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper,#FAF9F6)]/60 p-2 shadow-[0_18px_50px_rgba(27,67,50,0.06)] backdrop-blur-md sm:p-3">
              <CornerBrackets />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.22]"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(82,183,136,0.07) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(82,183,136,0.07) 1px, transparent 1px)
                  `,
                  backgroundSize: "34px 34px",
                }}
              />

              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--color-mint-bright,#52B788)]/[0.05] to-transparent" />

              <div className="relative z-10 rounded-xl border border-[var(--color-paper-line,#E5E7EB)]/70 bg-[var(--color-paper,#FAF9F6)]/75 p-3 sm:p-5">
                <LeadershipDirectory
                  profiles={profiles}
                  categories={leadershipCategories}
                />
              </div>
            </div>
          </motion.div>

          {/* Directory footer signal */}
          <motion.div
            variants={reduceMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-50px",
            }}
            className="mt-6 grid gap-3 sm:grid-cols-2"
          >
            <motion.div
              variants={reduceMotion ? undefined : itemVariants}
              className="group relative overflow-hidden rounded-xl border border-[var(--color-mint-bright,#52B788)]/15 bg-[var(--color-paper,#FAF9F6)]/55 p-4 backdrop-blur-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-savanna-deep,#1B4332)]/[0.06]">
                  <Network className="h-4 w-4 text-[var(--color-mint-soft,#2D6A4F)]" />
                </div>

                <div>
                  <p className="text-xs font-bold text-[var(--color-savanna-deep,#1B4332)]">
                    Organizational view
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[var(--color-ink-soft,#64748B)]">
                    Browse the available leadership structure without
                    sacrificing the distinction between verified and
                    placeholder information.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={reduceMotion ? undefined : itemVariants}
              className="group relative overflow-hidden rounded-xl border border-[var(--color-mint-bright,#52B788)]/15 bg-[var(--color-paper,#FAF9F6)]/55 p-4 backdrop-blur-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-mint-bright,#52B788)]/[0.08]">
                  <ShieldCheck className="h-4 w-4 text-[var(--color-mint-bright,#52B788)]" />
                </div>

                <div>
                  <p className="text-xs font-bold text-[var(--color-savanna-deep,#1B4332)]">
                    Verification-aware
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[var(--color-ink-soft,#64748B)]">
                    Profiles are presented with the directory's current
                    verification status rather than implying unsupported
                    biographical claims.
                  </p>
                </div>
              </div>
            </motion.div>
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
          size={330}
          variant="mint"
          className="-left-32 -top-36"
        />

        <FloatingOrb
          size={250}
          variant="jungle"
          className="-right-24 bottom-[-120px]"
        />

        <OrbitDecoration
          size={220}
          duration={36}
          className="-right-24 -top-28"
        />

        <FloatingParticle
          color="mint"
          shape="circle"
          className="right-[12%] top-[30%] h-2 w-2"
          delay={0.7}
          duration={5.5}
        />

        <FloatingParticle
          color="mint"
          shape="diamond"
          className="left-[15%] bottom-[18%] h-3 w-3"
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

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(82,183,136,0.35) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(82,183,136,0.35) 1px, transparent 1px)
                `,
                backgroundSize: "30px 30px",
              }}
            />

            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-[var(--color-mint-bright,#52B788)] to-transparent"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: ["-100%", "100%"],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
            />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-mint-bright,#52B788)]/10 shadow-[0_0_25px_rgba(82,183,136,0.08)]">
                <ShieldCheck className="h-5 w-5 text-[var(--color-mint-bright,#52B788)]" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-display text-sm font-bold uppercase tracking-[0.12em] text-white">
                    Verification notice
                  </span>

                  <span className="h-1 w-1 rounded-full bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_9px_rgba(82,183,136,0.8)]" />

                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--color-mint-bright,#52B788)]/70">
                    Source integrity layer
                  </span>
                </div>

                <p className="mt-2 max-w-4xl text-xs leading-6 text-white/60 sm:text-sm">
                  {PROTOTYPE_NOTICE}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/40">
                    <ScanLine className="h-3.5 w-3.5 text-[var(--color-mint-bright,#52B788)]/70" />
                    Verification aware
                  </span>

                  <span className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/40">
                    <CircleDot className="h-3.5 w-3.5 text-[var(--color-mint-bright,#52B788)]/70" />
                    Source pending
                  </span>
                </div>
              </div>

              <div className="hidden shrink-0 sm:block">
                <motion.div
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
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }
                  }
                >
                  <Orbit className="h-6 w-6 text-[var(--color-mint-bright,#52B788)]/35" />
                </motion.div>
              </div>
            </div>

            <div className="relative mt-5 flex items-center gap-3 border-t border-[var(--color-mint-bright,#52B788)]/10 pt-4">
              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-white/25">
                DCP Kenya
              </span>

              <span className="h-px flex-1 bg-gradient-to-r from-[var(--color-mint-bright,#52B788)]/20 to-transparent" />

              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-white/25">
                Leadership directory
              </span>

              <ArrowUpRight className="h-3.5 w-3.5 text-[var(--color-mint-bright,#52B788)]/35" />
            </div>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}