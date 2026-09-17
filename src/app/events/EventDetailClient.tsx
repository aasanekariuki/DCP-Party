// src/components/events/EventDetailClient.tsx

"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Activity,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Layers3,
  MapPin,
  Network,
  Orbit,
  Radio,
  ScanLine,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/layout/PageContainer";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { Button } from "@/components/ui/Button";
import type { getEventBySlug } from "@/data/events";

type EventRecord = NonNullable<ReturnType<typeof getEventBySlug>>;

const ease = [0.16, 1, 0.3, 1] as const;

function FloatingOrb({
  className = "",
  size = 120,
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
      className={`pointer-events-none absolute rounded-full border border-mint-bright/20 bg-mint-bright/[0.045] blur-[1px] ${className}`}
      style={{
        width: size,
        height: size,
        boxShadow: "0 0 80px rgba(82,183,136,0.10)",
      }}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -18, 0],
              x: [0, 8, 0],
              rotate: [0, 8, 0],
            }
      }
      transition={{
        duration: 7,
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
  size = 5,
}: {
  className?: string;
  delay?: number;
  size?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full bg-mint-bright/50 ${className}`}
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
              opacity: [0.2, 0.85, 0.2],
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
      className="pointer-events-none absolute inset-0 opacity-[0.42]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(45,106,79,0.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(45,106,79,0.055) 1px, transparent 1px)
        `,
        backgroundSize: "46px 46px",
        maskImage:
          "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
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
      className="pointer-events-none absolute right-[-40px] top-20 hidden h-44 w-44 rounded-full border border-mint-bright/15 sm:block"
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

      <motion.span
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-warm/70"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
              }
        }
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute inset-7 rounded-full border border-mint-soft/15" />
      <div className="absolute inset-14 rounded-full border border-mint-bright/10" />
    </motion.div>
  );
}

function SignalLine() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative mt-8 h-px w-full overflow-hidden bg-mint-soft/10"
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

function StatusPill({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-mint-bright/20 bg-paper-raised/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-mint-soft shadow-sm backdrop-blur">
      <Icon size={13} strokeWidth={2} />
      {children}
    </span>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  accent = false,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ duration: 0.25, ease }}
      className="group flex items-start gap-3 rounded-2xl border border-paper-line/80 bg-paper/65 px-4 py-3.5 transition-colors duration-300 hover:border-mint-bright/25 hover:bg-paper-raised/80"
    >
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-mint-bright/15 bg-mint-bright/[0.06] text-mint-soft transition-transform duration-300 group-hover:scale-105">
        <Icon size={16} strokeWidth={1.8} />
      </span>

      <div className="min-w-0">
        <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft/70">
          {label}
        </dt>
        <dd
          className={`mt-1.5 break-words text-sm font-medium leading-6 ${
            accent ? "text-mint-soft" : "text-ink"
          }`}
        >
          {value}
        </dd>
      </div>
    </motion.div>
  );
}

function EventHero({
  event,
  reduceMotion,
}: {
  event: EventRecord;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease }}
      className="relative overflow-hidden rounded-[2rem] border border-paper-line bg-paper-raised/70 p-5 shadow-[0_24px_80px_rgba(27,67,50,0.08)] backdrop-blur sm:p-7 lg:p-9"
    >
      <BackgroundGrid />
      <CornerBrackets />

      <FloatingOrb
        className="right-[-55px] top-[-45px]"
        size={180}
        delay={0.2}
      />
      <FloatingOrb
        className="bottom-[-70px] left-[-70px]"
        size={150}
        delay={1.2}
      />

      <FloatingParticle className="right-[18%] top-[18%]" delay={0.2} />
      <FloatingParticle
        className="right-[8%] top-[42%]"
        delay={1.1}
        size={4}
      />
      <FloatingParticle
        className="left-[15%] bottom-[16%]"
        delay={1.8}
        size={4}
      />

      <OrbitDecoration />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill icon={Radio}>{event.status}</StatusPill>

          <span className="rounded-full border border-warm/20 bg-warm/[0.06] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-warm">
            {event.category}
          </span>
        </div>

        <div className="mt-7 max-w-4xl">
          <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-mint-soft">
            <Sparkles size={14} />
            Citizen event record
          </p>

          <h1 className="font-display text-4xl leading-[1.04] tracking-[-0.035em] text-ink sm:text-5xl lg:text-6xl">
            {event.title}
          </h1>

          <motion.div
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={reduceMotion ? undefined : { scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="mt-5 h-1 w-24 origin-left rounded-full bg-mint-bright/70 shadow-[0_0_18px_rgba(82,183,136,0.25)]"
          />

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <VerificationBadge status={event.verificationStatus} />

            {event.date && (
              <span className="inline-flex items-center gap-2 rounded-full border border-paper-line bg-paper/80 px-3 py-1.5 text-xs font-medium text-ink-soft">
                <CalendarDays size={14} />
                {event.date}
              </span>
            )}
          </div>

          <p className="measure mt-7 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">
            {event.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function EventInformation({
  event,
  reduceMotion,
}: {
  event: EventRecord;
  reduceMotion: boolean | null;
}) {
  const details = [
    {
      icon: CalendarDays,
      label: "Date",
      value: event.date,
      accent: true,
    },
    ...(event.location
      ? [
          {
            icon: MapPin,
            label: "Location",
            value: event.location,
            accent: false,
          },
        ]
      : []),
    {
      icon: Activity,
      label: "Status",
      value: event.status,
      accent: false,
    },
    {
      icon: CheckCircle2,
      label: "Verification",
      value: event.verificationStatus,
      accent: true,
    },
  ];

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.12, ease }}
      className="relative overflow-hidden rounded-[1.75rem] border border-paper-line bg-paper/85 p-5 shadow-[0_18px_55px_rgba(27,67,50,0.06)] sm:p-6"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-mint-soft">
            Event intelligence
          </p>
          <h2 className="mt-1.5 font-display text-xl text-ink">
            Event details
          </h2>
        </div>

        <div
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-mint-bright/15 bg-mint-bright/[0.06] text-mint-soft"
        >
          <Layers3 size={17} />
        </div>
      </div>

      <dl className="grid gap-3">
        {details.map((detail, index) => (
          <motion.div
            key={detail.label}
            initial={reduceMotion ? false : { opacity: 0, x: -10 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.18 + index * 0.07,
              ease,
            }}
          >
            <InfoRow
              icon={detail.icon}
              label={detail.label}
              value={detail.value}
              accent={detail.accent}
            />
          </motion.div>
        ))}
      </dl>
    </motion.div>
  );
}

function RegistrationPanel({
  event,
  reduceMotion,
}: {
  event: EventRecord;
  reduceMotion: boolean | null;
}) {
  if (!event.registrationUrl) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease }}
        className="relative overflow-hidden rounded-[1.75rem] border border-mint-bright/15 bg-mint-bright/[0.045] p-5 sm:p-6"
      >
        <div className="absolute right-[-30px] top-[-30px] h-24 w-24 rounded-full border border-mint-bright/15" />

        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-mint-bright/15 bg-paper/60 text-mint-soft">
              <Radio size={17} />
            </span>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-mint-soft">
                Participation
              </p>
              <h2 className="mt-1 font-display text-lg text-ink">
                Registration information
              </h2>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-ink-soft">
            Registration details for this event are not currently available.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease }}
      className="relative overflow-hidden rounded-[1.75rem] border border-mint-bright/20 bg-mint-bright/[0.055] p-5 shadow-[0_20px_60px_rgba(82,183,136,0.07)] sm:p-6"
    >
      <FloatingParticle className="right-8 top-8" delay={0.4} size={4} />
      <FloatingParticle className="bottom-8 right-16" delay={1.5} size={3} />

      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-mint-bright/20 bg-paper/65 text-mint-soft">
            <CalendarDays size={17} />
          </span>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-mint-soft">
              Open participation
            </p>
            <h2 className="mt-1 font-display text-lg text-ink">
              Join this event
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-ink-soft">
          Use the official registration channel below to participate.
        </p>

        <div className="mt-5">
          <Button href={event.registrationUrl}>
            Register
            <ArrowUpRight size={15} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventDetailClient({
  event,
}: {
  event: EventRecord;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative min-h-screen overflow-hidden bg-paper text-ink">
      <BackgroundGrid />

      <FloatingOrb
        className="left-[-90px] top-28"
        size={220}
        delay={0.4}
      />
      <FloatingOrb
        className="right-[-100px] top-[48%]"
        size={240}
        delay={1.6}
      />

      <FloatingParticle
        className="left-[8%] top-[24%]"
        delay={0.3}
        size={4}
      />
      <FloatingParticle
        className="right-[12%] top-[31%]"
        delay={1.2}
        size={5}
      />
      <FloatingParticle
        className="left-[18%] top-[72%]"
        delay={2}
        size={3}
      />
      <FloatingParticle
        className="right-[24%] top-[80%]"
        delay={2.8}
        size={4}
      />

      <Section border={false} className="relative z-10 pt-10 sm:pt-14 lg:pt-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -12 }}
          animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease }}
          className="mb-7"
        >
          <Link
            href="/events"
            className="group inline-flex items-center gap-2 rounded-full border border-paper-line bg-paper-raised/75 px-4 py-2 text-sm font-medium text-ink-soft shadow-sm backdrop-blur transition-all duration-300 hover:-translate-x-0.5 hover:border-mint-bright/30 hover:text-ink"
          >
            <ArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Back to events
          </Link>
        </motion.div>

        <EventHero event={event} reduceMotion={reduceMotion} />

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="relative overflow-hidden rounded-[1.75rem] border border-paper-line bg-paper/85 p-5 shadow-[0_18px_55px_rgba(27,67,50,0.05)] sm:p-7"
          >
            <div className="absolute right-6 top-6 opacity-40">
              <Network size={30} className="text-mint-soft" />
            </div>

            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-mint-bright/15 bg-mint-bright/[0.06] text-mint-soft">
                  <ScanLine size={17} />
                </span>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-mint-soft">
                    Public record
                  </p>
                  <h2 className="mt-1 font-display text-xl text-ink">
                    About this gathering
                  </h2>
                </div>
              </div>

              <p className="measure mt-6 text-[15px] leading-7 text-ink-soft sm:text-base sm:leading-8">
                {event.description}
              </p>

              <SignalLine />
            </div>
          </motion.div>

          <div className="space-y-6">
            <EventInformation
              event={event}
              reduceMotion={reduceMotion}
            />

            <RegistrationPanel
              event={event}
              reduceMotion={reduceMotion}
            />
          </div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35, ease }}
          className="mt-8 flex flex-col gap-4 border-t border-paper-line/80 py-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-mint-bright/15 bg-mint-bright/[0.05] text-mint-soft">
              <Orbit size={16} />
            </span>

            <div>
              <p className="text-xs font-semibold text-ink">
                Democracy in motion
              </p>
              <p className="mt-0.5 text-xs text-ink-soft">
                Citizen participation remains at the centre.
              </p>
            </div>
          </div>

          <Link
            href="/events"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-mint-soft transition-colors hover:text-ink"
          >
            Explore more events
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>
      </Section>
    </main>
  );
}