// src/app/events/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

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

import * as motion from "framer-motion/m";

export const metadata: Metadata = {
  title: "Events",
};

const ease = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------- */
/* AMBIENT VISUAL SYSTEM                                                      */
/* -------------------------------------------------------------------------- */

function FloatingOrb({
  className = "",
  size = 220,
  variant = "mint",
}: {
  className?: string;
  size?: number;
  variant?: "mint" | "jungle";
}) {
  const gradients = {
    mint:
      "bg-[radial-gradient(circle,rgba(82,183,136,0.16)_0%,rgba(45,106,79,0.07)_44%,transparent_72%)]",
    jungle:
      "bg-[radial-gradient(circle,rgba(27,67,50,0.17)_0%,rgba(45,106,79,0.06)_46%,transparent_74%)]",
  };

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${gradients[variant]} ${className}`}
      style={{
        width: size,
        height: size,
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.62, 0.3],
        x: [0, 10, 0],
        y: [0, -12, 0],
      }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut",
      }}
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
  const shapeStyles = {
    circle:
      "rounded-full bg-mint-bright/50 shadow-[0_0_13px_rgba(82,183,136,0.45)]",
    diamond:
      "rotate-45 rounded-[2px] border border-mint-bright/40 bg-mint-bright/10",
    ring:
      "rounded-full border border-mint-bright/30 bg-transparent",
  };

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute block ${shapeStyles[shape]} ${className}`}
      animate={{
        y: [0, -16, 0],
        x: [0, 7, 0],
        opacity: [0.2, 0.75, 0.2],
        scale: [0.85, 1.12, 0.85],
        rotate:
          shape === "diamond" ? [45, 135, 45] : undefined,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
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
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border border-mint-bright/15 ${className}`}
      style={{
        width: size,
        height: size,
      }}
      animate={{
        rotate: 360,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-mint-bright shadow-[0_0_14px_rgba(82,183,136,0.7)]" />
      <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint-bright/70" />
    </motion.div>
  );
}

function BackgroundGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.16]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(82,183,136,0.12) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(82,183,136,0.12) 1px, transparent 1px)
        `,
        backgroundSize: "42px 42px",
      }}
    />
  );
}

function CornerBrackets() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l border-t border-mint-bright/40 transition-all duration-300 group-hover:h-7 group-hover:w-7 group-hover:border-mint-bright"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-5 w-5 border-r border-t border-mint-bright/40 transition-all duration-300 group-hover:h-7 group-hover:w-7 group-hover:border-mint-bright"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b border-l border-mint-bright/40 transition-all duration-300 group-hover:h-7 group-hover:w-7 group-hover:border-mint-bright"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b border-r border-mint-bright/40 transition-all duration-300 group-hover:h-7 group-hover:w-7 group-hover:border-mint-bright"
      />
    </>
  );
}

function SignalLine() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px lg:block"
    >
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-mint-bright/20 to-transparent"
        animate={{
          opacity: [0.2, 0.7, 0.2],
          scaleX: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO DATA METRIC                                                           */
/* -------------------------------------------------------------------------- */

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay,
        ease,
      }}
      whileHover={{
        y: -3,
        scale: 1.015,
      }}
      className="group relative overflow-hidden rounded-xl border rule bg-paper/70 px-4 py-3 backdrop-blur-md"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-mint-bright/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-mint-bright/20 bg-mint-bright/10 text-mint-bright">
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-ink-soft/75">
            {label}
          </p>

          <motion.p
            className="mt-0.5 font-display text-lg font-bold text-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: delay + 0.15,
              duration: 0.35,
            }}
          >
            {value}
          </motion.p>
        </div>

        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-mint-bright shadow-[0_0_9px_rgba(82,183,136,0.7)]" />
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION HEADER                                                             */
/* -------------------------------------------------------------------------- */

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        ease,
      }}
      className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.17em] text-mint-soft">
          <Icon className="h-3.5 w-3.5 text-mint-bright" />
          <span>{eyebrow}</span>
        </div>

        <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
      </div>

      <div className="inline-flex w-fit items-center gap-2 rounded-full border rule bg-paper-raised px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
        <span className="h-1.5 w-1.5 rounded-full bg-mint-bright shadow-[0_0_8px_rgba(82,183,136,0.7)]" />
        {count} {countLabel}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* EVENT CARD                                                                 */
/* -------------------------------------------------------------------------- */

function EventCard({
  event,
  index,
  archived = false,
}: {
  event: ReturnType<typeof getEvents>[number];
  index: number;
  archived?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-45px" }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.06, 0.3),
        ease,
      }}
      whileHover={{
        y: -5,
        transition: {
          duration: 0.25,
          ease,
        },
      }}
      className={`group relative flex min-h-[270px] flex-col justify-between overflow-hidden rounded-2xl border rule p-5 backdrop-blur-md transition-all duration-300 sm:p-6 ${
        archived
          ? "bg-paper-raised/40 opacity-[0.88] hover:border-mint-bright/50 hover:bg-paper hover:opacity-100"
          : "bg-paper-raised/70 shadow-[0_10px_30px_rgba(27,67,50,0.04)] hover:border-mint-bright hover:bg-paper hover:shadow-[0_18px_45px_rgba(27,67,50,0.08)]"
      }`}
    >
      <CornerBrackets />

      {/* Card scan texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(82,183,136,0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(82,183,136,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient card glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(82,183,136,0.13),transparent_70%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative z-[1]">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span
            className={`rounded-full border px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.13em] ${
              archived
                ? "rule bg-paper-raised text-ink-soft"
                : "border-mint-bright/25 bg-mint-bright/10 text-mint-bright"
            }`}
          >
            {event.category}
          </span>

          <VerificationBadge status={event.verificationStatus} />
        </div>

        <h3 className="pr-4 font-display text-xl font-bold leading-snug text-ink transition-colors duration-300 group-hover:text-mint-soft sm:text-[1.35rem]">
          {event.title}
        </h3>

        <motion.div
          aria-hidden="true"
          className="mt-3 h-px w-12 origin-left bg-gradient-to-r from-mint-bright to-transparent"
          initial={{ scaleX: 0.65, opacity: 0.45 }}
          whileInView={{ scaleX: 1, opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.15 + index * 0.04,
            ease,
          }}
        />
      </div>

      <div className="relative z-[1] mt-7 space-y-3 border-t rule pt-4 text-xs text-ink-soft">
        <div className="flex items-start gap-2.5">
          <CalendarDays
            size={14}
            className="mt-0.5 shrink-0 text-mint-bright"
          />

          <div className="min-w-0">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-soft/65">
              Date
            </p>
            <p className="mt-0.5 font-medium text-ink-soft">
              {event.date}
            </p>
          </div>
        </div>

        {event.location && (
          <div className="flex items-start gap-2.5">
            <MapPin
              size={14}
              className="mt-0.5 shrink-0 text-mint-bright"
            />

            <div className="min-w-0">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-soft/65">
                Location
              </p>
              <p className="mt-0.5 truncate font-medium text-ink-soft">
                {event.location}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-[1] mt-5 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-ink-soft/70">
          {archived ? (
            <>
              <Archive className="h-3.5 w-3.5 text-ink-faint" />
              Archived record
            </>
          ) : (
            <>
              <CalendarCheck2 className="h-3.5 w-3.5 text-mint-bright" />
              Confirmed event
            </>
          )}
        </span>

        <motion.span
          whileHover={{
            x: 3,
            y: -2,
          }}
          className="flex h-8 w-8 items-center justify-center rounded-lg border rule bg-paper/60 text-mint-bright transition-colors duration-300 group-hover:border-mint-bright/40 group-hover:bg-mint-bright/10"
        >
          <ArrowUpRight className="h-4 w-4" />
        </motion.span>
      </div>

      <Link
        href={`/events/${event.slug}`}
        aria-label={
          archived
            ? `View archived event details for ${event.title}`
            : `View event details for ${event.title}`
        }
        className="absolute inset-0 z-10 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-mint-bright focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      />
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/* EMPTY STATE                                                                */
/* -------------------------------------------------------------------------- */

function EventsEmptyState() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.985,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
        margin: "-40px",
      }}
      transition={{
        duration: 0.55,
        ease,
      }}
      className="group relative overflow-hidden rounded-2xl border rule bg-paper-raised/45 p-7 backdrop-blur-sm sm:p-9"
    >
      <CornerBrackets />

      <div className="absolute right-8 top-8 hidden h-20 w-20 rounded-full border border-mint-bright/10 sm:block">
        <motion.span
          className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint-bright"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-mint-bright/20 bg-mint-bright/10 text-mint-bright">
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

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function EventsPage() {
  const events = getEvents();

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
    <div className="relative min-h-screen overflow-hidden bg-paper">
      <BackgroundGrid />

      {/* Global ambient objects */}
      <FloatingOrb
        size={430}
        variant="jungle"
        className="-left-60 -top-36"
      />

      <FloatingOrb
        size={360}
        variant="mint"
        className="-right-48 top-[24%]"
      />

      <FloatingOrb
        size={300}
        variant="mint"
        className="left-[28%] bottom-[14%] opacity-60"
      />

      <FloatingOrb
        size={240}
        variant="jungle"
        className="-right-32 bottom-[-80px] opacity-50"
      />

      <OrbitDecoration
        size={340}
        duration={44}
        className="-right-44 -top-36"
      />

      <OrbitDecoration
        size={190}
        duration={27}
        className="-left-24 top-[34%]"
      />

      <OrbitDecoration
        size={130}
        duration={20}
        className="right-[18%] bottom-[10%] hidden sm:block"
      />

      <FloatingParticle
        className="left-[7%] top-[13%] h-2.5 w-2.5"
        delay={0.2}
        duration={5.5}
      />

      <FloatingParticle
        className="right-[11%] top-[17%] h-3.5 w-3.5"
        delay={0.8}
        duration={7.5}
        shape="diamond"
      />

      <FloatingParticle
        className="left-[18%] top-[48%] h-5 w-5"
        delay={1.4}
        duration={8}
        shape="ring"
      />

      <FloatingParticle
        className="right-[8%] bottom-[25%] h-2 w-2"
        delay={0.4}
        duration={5.8}
      />

      <FloatingParticle
        className="left-[42%] bottom-[12%] h-3 w-3"
        delay={1.7}
        duration={6.8}
        shape="diamond"
      />

      <SignalLine />

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                               */}
      {/* ------------------------------------------------------------------ */}

      <Section
        border={false}
        className="relative z-10 pb-9 pt-10 sm:pb-11 sm:pt-14 lg:pb-12 lg:pt-16"
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 22,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease,
          }}
          className="group relative overflow-hidden rounded-3xl border rule bg-paper-raised/65 p-6 shadow-[0_18px_55px_rgba(27,67,50,0.055)] backdrop-blur-md sm:p-8 lg:p-10"
        >
          <CornerBrackets />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(82,183,136,0.14) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(82,183,136,0.14) 1px, transparent 1px)
              `,
              backgroundSize: "36px 36px",
            }}
          />

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full border border-mint-bright/10"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 38,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint-bright shadow-[0_0_14px_rgba(82,183,136,0.7)]" />
          </motion.div>

          <div className="relative z-10 max-w-5xl">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow>Events</Eyebrow>

              <span
                aria-hidden="true"
                className="h-px w-7 bg-rule"
              />

              <span className="inline-flex items-center gap-1.5 rounded-full border border-mint-bright/30 bg-mint-bright/10 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.13em] text-mint-bright">
                <motion.span
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-1.5 w-1.5 rounded-full bg-mint-bright"
                />
                <Sparkles className="h-3 w-3" />
                Live Registry
              </span>
            </div>

            <div className="relative mt-5 max-w-4xl">
              <span
                aria-hidden="true"
                className="absolute -left-4 top-1/2 hidden h-16 w-0.5 -translate-y-1/2 bg-gradient-to-b from-transparent via-mint-bright to-transparent sm:block"
              />

              <h1 className="font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Public{" "}
                <span className="relative inline-block text-mint-soft">
                  gatherings
                  <motion.span
                    aria-hidden="true"
                    initial={{
                      scaleX: 0,
                    }}
                    animate={{
                      scaleX: 1,
                    }}
                    transition={{
                      delay: 0.5,
                      duration: 0.7,
                      ease,
                    }}
                    className="absolute -bottom-1 left-0 h-1 w-full origin-left bg-gradient-to-r from-mint-bright via-mint-soft to-transparent shadow-[0_0_14px_rgba(82,183,136,0.2)]"
                  />
                </span>{" "}
                and activities.
              </h1>

              <motion.div
                aria-hidden="true"
                initial={{
                  width: 0,
                  opacity: 0,
                }}
                animate={{
                  width: "8rem",
                  opacity: 1,
                }}
                transition={{
                  delay: 0.72,
                  duration: 0.7,
                  ease,
                }}
                className="mt-5 h-0.5 bg-gradient-to-r from-mint-bright via-mint-soft to-transparent"
              />
            </div>

            <p className="measure mt-6 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">
              Only confirmed, verified events are listed here. Explore
              upcoming public workshops, assemblies, and historic archives.
              <span className="font-semibold text-ink">
                {" "}
                Every record is presented as part of the public registry.
              </span>
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <RegistryMetric
                icon={Clock}
                label="Upcoming"
                value={upcoming.length}
                delay={0.15}
              />

              <RegistryMetric
                icon={Archive}
                label="Archived"
                value={past.length}
                delay={0.22}
              />

              <RegistryMetric
                icon={Layers3}
                label="Total registry"
                value={events.length}
                delay={0.29}
              />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t rule pt-5 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-ink-soft/75">
              <span className="inline-flex items-center gap-2">
                <Radio className="h-3.5 w-3.5 text-mint-bright" />
                Public registry
              </span>

              <span className="hidden h-3 w-px bg-rule sm:block" />

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-mint-bright" />
                Verification aware
              </span>

              <span className="hidden h-3 w-px bg-rule sm:block" />

              <span className="inline-flex items-center gap-2">
                <Network className="h-3.5 w-3.5 text-mint-bright" />
                Structured records
              </span>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* UPCOMING                                                           */}
      {/* ------------------------------------------------------------------ */}

      <Section
        className="relative z-10 pb-12 pt-6 sm:pb-16 sm:pt-8"
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
                key={event.id}
                event={event}
                index={index}
              />
            ))}
          </div>
        )}
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* PAST                                                                */}
      {/* ------------------------------------------------------------------ */}

      {past.length > 0 && (
        <Section
          className="relative z-10 border-t rule pb-14 pt-10 sm:pb-18 sm:pt-12"
        >
          <SectionHeader
            icon={History}
            eyebrow="Historical registry"
            title="Past Records"
            count={past.length}
            countLabel="Completed"
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                archived
              />
            ))}
          </div>
        </Section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* REGISTRY FOOTER SIGNAL                                             */}
      {/* ------------------------------------------------------------------ */}

      <Section
        border={false}
        className="relative z-10 overflow-hidden bg-paper-raised pb-12 pt-2 sm:pb-14"
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 14,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-40px",
          }}
          transition={{
            duration: 0.55,
            ease,
          }}
          className="group relative overflow-hidden rounded-2xl border rule bg-paper/75 p-5 shadow-[0_14px_40px_rgba(27,67,50,0.05)] backdrop-blur-md sm:p-6"
        >
          <CornerBrackets />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(82,183,136,0.12) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(82,183,136,0.12) 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px",
            }}
          />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.05,
              }}
              transition={{
                duration: 0.25,
                ease,
              }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-mint-bright/25 bg-mint-bright/10 text-mint-bright shadow-[0_0_24px_rgba(82,183,136,0.08)]"
            >
              <ScanLine className="h-5 w-5" />
            </motion.div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-display text-sm font-bold uppercase tracking-[0.1em] text-ink">
                  Event Registry
                </span>

                <span className="h-1 w-1 rounded-full bg-mint-bright shadow-[0_0_8px_rgba(82,183,136,0.7)]" />

                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-mint-soft">
                  Public source layer
                </span>
              </div>

              <p className="mt-2 max-w-3xl text-xs leading-6 text-ink-soft sm:text-sm sm:leading-7">
                Events are displayed according to their current registry
                status. Only information supplied through the event records
                is presented as confirmed.
              </p>
            </div>

            <div className="hidden shrink-0 items-center gap-2 rounded-lg border rule bg-paper-raised/70 px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-soft sm:flex">
              <Activity className="h-3.5 w-3.5 text-mint-bright" />
              Registry active
            </div>
          </div>

          <div className="relative mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t rule pt-4">
            <CalendarDays className="h-3.5 w-3.5 text-mint-bright" />

            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
              {events.length} total event records
            </span>

            <motion.span
              aria-hidden="true"
              className="hidden h-px w-20 bg-gradient-to-r from-mint-bright/40 to-transparent sm:ml-auto sm:block"
              animate={{
                opacity: [0.25, 0.8, 0.25],
                scaleX: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <Orbit className="h-4 w-4 text-mint-bright/45" />
          </div>
        </motion.div>
      </Section>
    </div>
  );
}