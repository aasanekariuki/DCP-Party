// src/app/events/page.tsx

"use client";

import type { Metadata } from "next";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { getEvents } from "@/data/events";
import {
  CalendarDays,
  MapPin,
  ArrowUpRight,
  Sparkles,
  Clock,
  History,
  Radio,
  Activity,
  Layers3,
  CheckCircle2,
  Archive,
  ScanLine,
  Orbit,
  Network,
  CalendarCheck2,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

type EventRecord = ReturnType<typeof getEvents>[number];

function FloatingOrb({
  className = "",
  size = 280,
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
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle, rgba(82,183,136,0.16) 0%, rgba(45,106,79,0.06) 48%, transparent 72%)",
      }}
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
              duration: 10,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    />
  );
}

function FloatingParticle({
  className = "",
  delay = 0,
  duration = 6,
  shape = "circle",
}: {
  className?: string;
  delay?: number;
  duration?: number;
  shape?: "circle" | "diamond" | "ring";
}) {
  const reduceMotion = useReducedMotion();

  const shapeClass =
    shape === "circle"
      ? "rounded-full bg-[var(--color-mint-bright,#52B788)]/55"
      : shape === "diamond"
        ? "rotate-45 rounded-[3px] border border-[var(--color-mint-bright,#52B788)]/35 bg-[var(--color-mint-bright,#52B788)]/10"
        : "rounded-full border border-[var(--color-mint-bright,#52B788)]/30";

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute block ${shapeClass} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -18, 0],
              x: [0, 7, 0],
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

function BackgroundGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(82,183,136,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(82,183,136,0.45) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage:
          "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
      }}
    />
  );
}

function CornerBrackets() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-[var(--color-mint-bright,#52B788)]/30 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-[var(--color-mint-bright,#52B788)]/30 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[var(--color-mint-bright,#52B788)]/30 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-[var(--color-mint-bright,#52B788)]/30 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
    </>
  );
}

function SignalLine() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative h-px w-full overflow-hidden bg-[var(--color-mint-bright,#52B788)]/12"
    >
      <motion.span
        className="absolute left-0 top-0 h-px w-28 bg-gradient-to-r from-transparent via-[var(--color-mint-bright,#52B788)] to-transparent"
        animate={reduceMotion ? undefined : { x: ["-120%", "500%"] }}
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
    </div>
  );
}

function RegistryMetric({
  icon: Icon,
  label,
  value,
  delay,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: number;
  delay: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 12,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.55,
        delay,
        ease,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -3,
              scale: 1.015,
            }
      }
      className="group relative overflow-hidden rounded-xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper-raised,#F4F1EA)]/85 px-4 py-3.5 backdrop-blur-md transition-colors duration-300 hover:border-[var(--color-mint-bright,#52B788)]/45"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-mint-bright,#52B788)]/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-mint-bright,#52B788)]/10 text-[var(--color-mint-soft,#2D6A4F)]">
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--color-ink-soft,#64748B)]">
            {label}
          </p>

          <p className="mt-0.5 font-display text-xl font-bold text-[var(--color-ink,#1A1A1A)]">
            {value}
          </p>
        </div>

        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_9px_rgba(82,183,136,0.7)]" />
      </div>
    </motion.div>
  );
}

function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  count,
  countLabel,
}: {
  icon: typeof Clock;
  eyebrow: string;
  title: string;
  count: number;
  countLabel: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
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
        margin: "-40px",
      }}
      transition={{
        duration: 0.6,
        ease,
      }}
      className="mb-6 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.17em] text-[var(--color-mint-soft,#2D6A4F)]">
          <Icon className="h-3.5 w-3.5 text-[var(--color-mint-bright,#52B788)]" />
          <span>{eyebrow}</span>
        </div>

        <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--color-ink,#1A1A1A)] sm:text-3xl">
          {title}
        </h2>
      </div>

      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper-raised,#F4F1EA)] px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-soft,#64748B)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_8px_rgba(82,183,136,0.7)]" />
        {count} {countLabel}
      </div>
    </motion.div>
  );
}

function EventCard({
  event,
  index,
  archived = false,
}: {
  event: EventRecord;
  index: number;
  archived?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  const href = event.slug
    ? `/events/${event.slug}`
    : event.id
      ? `/events/${event.id}`
      : "/events";

  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 22,
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
        amount: 0.08,
      }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.055, 0.25),
        ease,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -5,
            }
      }
      className={`group relative flex min-h-[265px] flex-col overflow-hidden rounded-2xl border p-5 backdrop-blur-md transition-all duration-300 sm:p-6 ${
        archived
          ? "border-[var(--color-mint-bright,#52B788)]/15 bg-[var(--color-paper-raised,#F4F1EA)]/55 hover:border-[var(--color-mint-bright,#52B788)]/40 hover:bg-[var(--color-paper-raised,#F4F1EA)]/85"
          : "border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper-raised,#F4F1EA)]/80 shadow-[0_12px_35px_rgba(27,67,50,0.045)] hover:border-[var(--color-mint-bright,#52B788)]/55 hover:bg-[var(--color-paper-raised,#F4F1EA)] hover:shadow-[0_20px_45px_rgba(27,67,50,0.08)]"
      }`}
    >
      <CornerBrackets />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(82,183,136,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(82,183,136,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(82,183,136,0.13), transparent 70%)",
        }}
      />

      <div className="relative z-[1] flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span
            className={`rounded-full border px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.13em] ${
              archived
                ? "border-[var(--color-mint-bright,#52B788)]/15 bg-[var(--color-paper-raised,#F4F1EA)] text-[var(--color-ink-soft,#64748B)]"
                : "border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-mint-bright,#52B788)]/10 text-[var(--color-mint-soft,#2D6A4F)]"
            }`}
          >
            {event.category || "Public event"}
          </span>

          <VerificationBadge status={event.verificationStatus} />
        </div>

        <h3 className="mt-4 pr-4 font-display text-xl font-bold leading-snug text-[var(--color-ink,#1A1A1A)] transition-colors duration-300 group-hover:text-[var(--color-mint-soft,#2D6A4F)] sm:text-[1.35rem]">
          {event.title}
        </h3>

        <div
          aria-hidden="true"
          className="mt-3 h-px w-12 bg-gradient-to-r from-[var(--color-mint-bright,#52B788)] to-transparent transition-all duration-300 group-hover:w-20"
        />

        <div className="mt-auto space-y-3 border-t border-[var(--color-mint-bright,#52B788)]/15 pt-4 text-xs text-[var(--color-ink-soft,#64748B)]">
          <div className="flex items-start gap-2.5">
            <CalendarDays
              size={14}
              className="mt-0.5 shrink-0 text-[var(--color-mint-soft,#2D6A4F)]"
            />

            <div className="min-w-0">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-soft,#64748B)]">
                Date
              </p>

              <p className="mt-0.5 font-medium text-[var(--color-ink,#1A1A1A)]">
                {event.date}
              </p>
            </div>
          </div>

          {event.location && (
            <div className="flex items-start gap-2.5">
              <MapPin
                size={14}
                className="mt-0.5 shrink-0 text-[var(--color-mint-soft,#2D6A4F)]"
              />

              <div className="min-w-0">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-soft,#64748B)]">
                  Location
                </p>

                <p className="mt-0.5 truncate font-medium text-[var(--color-ink,#1A1A1A)]">
                  {event.location}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-[var(--color-ink-soft,#64748B)]">
            {archived ? (
              <>
                <Archive className="h-3.5 w-3.5 opacity-60" />
                Archived record
              </>
            ) : (
              <>
                <CalendarCheck2 className="h-3.5 w-3.5 text-[var(--color-mint-soft,#2D6A4F)]" />
                Confirmed event
              </>
            )}
          </span>

          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper,#FAF9F6)]/70 text-[var(--color-mint-soft,#2D6A4F)] transition-all duration-300 group-hover:border-[var(--color-mint-bright,#52B788)]/50 group-hover:bg-[var(--color-mint-bright,#52B788)]/10 group-hover:text-[var(--color-mint-bright,#52B788)]">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      <Link
        href={href}
        aria-label={
          archived
            ? `View archived event details for ${event.title}`
            : `View event details for ${event.title}`
        }
        className="absolute inset-0 z-10 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-mint-bright,#52B788)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-paper,#FAF9F6)]"
      />
    </motion.article>
  );
}

function EventsEmptyState() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              scale: 0.985,
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              scale: 1,
            }
      }
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.55,
        ease,
      }}
      className="group relative overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper-raised,#F4F1EA)]/60 p-7 backdrop-blur-md sm:p-9"
    >
      <CornerBrackets />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-8 top-8 hidden h-20 w-20 rounded-full border border-[var(--color-mint-bright,#52B788)]/10 sm:block"
      >
        <motion.span
          className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-mint-bright,#52B788)]"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
        />
      </div>

      <div className="relative z-10">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-mint-bright,#52B788)]/10 text-[var(--color-mint-soft,#2D6A4F)]">
          <CalendarDays className="h-5 w-5" />
        </div>

        <EmptyState
          title="No verified upcoming events"
          description="Confirmed public events will appear here once announced and officially verified."
          action={
            <Button href="/get-involved" variant="ghost">
              Get involved another way
            </Button>
          }
        />
      </div>
    </motion.div>
  );
}

export default function EventsPage() {
  const reduceMotion = useReducedMotion();

  const events = useMemoSafeEvents();

  const upcoming = events.filter(
    (event) =>
      event.status === "upcoming" ||
      event.status === "ongoing",
  );

  const past = events.filter(
    (event) =>
      event.status === "completed" ||
      event.status === "cancelled",
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-paper,#FAF9F6)] text-[var(--color-ink,#1A1A1A)]">
      <BackgroundGrid />

      {/* Ambient objects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <FloatingOrb
          size={430}
          delay={0}
          className="-left-64 -top-40"
        />

        <FloatingOrb
          size={340}
          delay={1.5}
          className="-right-48 top-[25%]"
        />

        <FloatingOrb
          size={280}
          delay={2.5}
          className="left-[25%] bottom-[10%]"
        />

        <OrbitDecoration
          size={330}
          duration={42}
          className="-right-40 -top-32"
        />

        <OrbitDecoration
          size={190}
          duration={28}
          className="-left-24 top-[40%]"
        />

        <FloatingParticle
          className="left-[7%] top-[15%] h-2.5 w-2.5"
          delay={0.2}
          shape="circle"
        />

        <FloatingParticle
          className="right-[12%] top-[18%] h-3.5 w-3.5"
          delay={0.8}
          duration={7}
          shape="diamond"
        />

        <FloatingParticle
          className="left-[18%] top-[53%] h-5 w-5"
          delay={1.4}
          duration={8}
          shape="ring"
        />

        <FloatingParticle
          className="right-[8%] bottom-[24%] h-2.5 w-2.5"
          delay={0.4}
          duration={5.5}
          shape="circle"
        />
      </div>

      {/* HERO */}
      <Section
        border={false}
        className="relative z-10 pb-8 pt-9 sm:pb-10 sm:pt-12 lg:pb-11 lg:pt-14"
      >
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease,
          }}
          className="group relative overflow-hidden rounded-3xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper-raised,#F4F1EA)]/82 p-6 shadow-[0_18px_55px_rgba(27,67,50,0.055)] backdrop-blur-md sm:p-8 lg:p-9"
        >
          <CornerBrackets />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(82,183,136,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(82,183,136,0.4) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow>Events</Eyebrow>

              <span
                aria-hidden="true"
                className="h-px w-8 bg-[var(--color-mint-bright,#52B788)]/25"
              />

              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-mint-bright,#52B788)]/10 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.13em] text-[var(--color-mint-soft,#2D6A4F)]">
                <motion.span
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 1, 0.5],
                        }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          duration: 2.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                  className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,#52B788)]"
                />
                <Sparkles className="h-3 w-3 text-[var(--color-mint-bright,#52B788)]" />
                Live Registry
              </span>
            </div>

            <div className="relative mt-5 max-w-4xl">
              <span
                aria-hidden="true"
                className="absolute -left-4 top-1/2 hidden h-16 w-0.5 -translate-y-1/2 bg-gradient-to-b from-transparent via-[var(--color-mint-bright,#52B788)] to-transparent sm:block"
              />

              <h1 className="font-display text-4xl font-bold leading-[1.06] tracking-tight text-[var(--color-ink,#1A1A1A)] sm:text-5xl lg:text-6xl">
                Public{" "}
                <span className="relative inline-block text-[var(--color-mint-soft,#2D6A4F)] [text-shadow:0_0_24px_rgba(82,183,136,0.16)]">
                  gatherings
                  <motion.span
                    aria-hidden="true"
                    initial={
                      reduceMotion
                        ? false
                        : {
                            scaleX: 0,
                          }
                    }
                    animate={{ scaleX: 1 }}
                    transition={{
                      delay: 0.45,
                      duration: 0.7,
                      ease,
                    }}
                    className="absolute -bottom-1 left-0 h-1 w-full origin-left bg-gradient-to-r from-[var(--color-mint-bright,#52B788)] via-[var(--color-mint-soft,#2D6A4F)] to-transparent"
                  />
                </span>{" "}
                and activities.
              </h1>

              <motion.div
                aria-hidden="true"
                initial={
                  reduceMotion
                    ? false
                    : {
                        width: 0,
                        opacity: 0,
                      }
                }
                animate={{
                  width: "8rem",
                  opacity: 1,
                }}
                transition={{
                  delay: 0.65,
                  duration: 0.7,
                  ease,
                }}
                className="mt-5 h-0.5 bg-gradient-to-r from-[var(--color-mint-bright,#52B788)] via-[var(--color-mint-soft,#2D6A4F)] to-transparent"
              />
            </div>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--color-ink-soft,#64748B)] sm:text-base sm:leading-8">
              Explore{" "}
              <span className="font-semibold text-[var(--color-ink,#1A1A1A)]">
                confirmed public workshops, assemblies, and activities
              </span>{" "}
              recorded in the event registry. Each entry is presented
              according to the information contained in its event record.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <RegistryMetric
                icon={Clock}
                label="Upcoming"
                value={upcoming.length}
                delay={0.12}
              />

              <RegistryMetric
                icon={Archive}
                label="Archived"
                value={past.length}
                delay={0.19}
              />

              <RegistryMetric
                icon={Layers3}
                label="Total registry"
                value={events.length}
                delay={0.26}
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[var(--color-mint-bright,#52B788)]/15 pt-4 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--color-ink-soft,#64748B)]">
              <span className="inline-flex items-center gap-2">
                <Radio className="h-3.5 w-3.5 text-[var(--color-mint-soft,#2D6A4F)]" />
                Public registry
              </span>

              <span className="hidden h-3 w-px bg-[var(--color-mint-bright,#52B788)]/20 sm:block" />

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[var(--color-mint-soft,#2D6A4F)]" />
                Verification aware
              </span>

              <span className="hidden h-3 w-px bg-[var(--color-mint-bright,#52B788)]/20 sm:block" />

              <span className="inline-flex items-center gap-2">
                <Network className="h-3.5 w-3.5 text-[var(--color-mint-soft,#2D6A4F)]" />
                Structured records
              </span>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* UPCOMING */}
      <Section
        border={false}
        className="relative z-10 pb-11 pt-4 sm:pb-14 sm:pt-6"
      >
        <SectionHeader
          icon={Clock}
          eyebrow="Current registry"
          title="Upcoming & Active"
          count={upcoming.length}
          countLabel="Events"
        />

        {upcoming.length === 0 ? (
          <EventsEmptyState />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event, index) => (
              <EventCard
                key={event.id ?? `${event.title}-${index}`}
                event={event}
                index={index}
              />
            ))}
          </div>
        )}
      </Section>

      {/* PAST */}
      {past.length > 0 && (
        <Section
          border={false}
          className="relative z-10 border-t border-[var(--color-mint-bright,#52B788)]/15 pb-12 pt-9 sm:pb-14 sm:pt-11"
        >
          <SectionHeader
            icon={History}
            eyebrow="Historical registry"
            title="Past Records"
            count={past.length}
            countLabel="Records"
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((event, index) => (
              <EventCard
                key={event.id ?? `${event.title}-${index}`}
                event={event}
                index={index}
                archived
              />
            ))}
          </div>
        </Section>
      )}

      {/* REGISTRY FOOTER */}
      <Section
        border={false}
        className="relative z-10 pb-10 pt-2 sm:pb-12"
      >
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 12,
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
            duration: 0.55,
            ease,
          }}
          className="group relative overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper-raised,#F4F1EA)]/75 p-5 shadow-[0_14px_40px_rgba(27,67,50,0.05)] backdrop-blur-md sm:p-6"
        >
          <CornerBrackets />

          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      rotate: 8,
                      scale: 1.05,
                    }
              }
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-mint-bright,#52B788)]/10 text-[var(--color-mint-soft,#2D6A4F)]"
            >
              <ScanLine className="h-5 w-5" />
            </motion.div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-display text-sm font-bold uppercase tracking-[0.1em] text-[var(--color-ink,#1A1A1A)]">
                  Event Registry
                </span>

                <span className="h-1 w-1 rounded-full bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_8px_rgba(82,183,136,0.7)]" />

                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--color-mint-soft,#2D6A4F)]">
                  Public source layer
                </span>
              </div>

              <p className="mt-2 max-w-3xl text-xs leading-6 text-[var(--color-ink-soft,#64748B)] sm:text-sm sm:leading-7">
                Events are displayed according to their current registry
                status. Information shown here is drawn from the available
                event records.
              </p>
            </div>

            <div className="hidden shrink-0 items-center gap-2 rounded-lg border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper,#FAF9F6)]/70 px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-soft,#64748B)] sm:flex">
              <Activity className="h-3.5 w-3.5 text-[var(--color-mint-soft,#2D6A4F)]" />
              Registry active
            </div>
          </div>

          <div className="relative mt-5 border-t border-[var(--color-mint-bright,#52B788)]/15 pt-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <CalendarDays className="h-3.5 w-3.5 text-[var(--color-mint-soft,#2D6A4F)]" />

              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--color-ink-soft,#64748B)]">
                {events.length} total event records
              </span>

              <Orbit className="ml-auto h-4 w-4 text-[var(--color-mint-soft,#2D6A4F)]/45" />
            </div>

            <div className="mt-4">
              <SignalLine />
            </div>
          </div>
        </motion.div>
      </Section>
    </main>
  );
}

/*
 * Keeps the page resilient if the data helper ever returns null/undefined.
 * This also avoids executing data access during render in a way that can
 * produce an empty page when the helper has no records.
 */
function useMemoSafeEvents(): EventRecord[] {
  try {
    const result = getEvents();

    return Array.isArray(result) ? result : [];
  } catch {
    return [];
  }
}