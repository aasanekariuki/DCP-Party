"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { PROTOTYPE_NOTICE } from "@/lib/constants";

const ease = [0.16, 1, 0.3, 1] as const;

function FloatingObject({
  children,
  className = "",
  delay = 0,
  duration = 6,
  y = 10,
  rotate = 4,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  rotate?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -y, 0],
              rotate: [0, rotate, 0],
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
    >
      {children}
    </motion.div>
  );
}

function FloatingOrb({
  className = "",
  delay = 0,
  duration = 5,
  accent = "mint",
}: {
  className?: string;
  delay?: number;
  duration?: number;
  accent?: "mint" | "amber";
}) {
  const reduceMotion = useReducedMotion();
  const accentClass =
    accent === "amber"
      ? "bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.5)]"
      : "bg-[var(--color-mint-bright,##1b4332)] shadow-[0_0_18px_rgba(82,183,136,0.5)]";

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute block h-2 w-2 rounded-full ${accentClass} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -12, 0],
              x: [0, 5, 0],
              opacity: [0.35, 0.9, 0.35],
              scale: [0.8, 1.15, 0.8],
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

function OrbitalRing({
  size = 280,
  duration = 18,
  reverse = false,
  className = "",
}: {
  size?: number;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border border-[var(--color-paper-line,#1b4332)]/80 ${className}`}
      style={{
        width: size,
        height: size,
      }}
      animate={
        reduceMotion
          ? undefined
          : {
              rotate: reverse ? -360 : 360,
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
      <span
        className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-mint-bright,##1b4332)] shadow-[0_0_16px_rgba(82,183,136,0.55)]"
      />
    </motion.div>
  );
}

function DecorativeGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.32]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(43,58,85,0.055) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(43,58,85,0.055) 1px, transparent 1px)
        `,
        backgroundSize: "42px 42px",
        maskImage:
          "linear-gradient(to bottom, black, rgba(0,0,0,0.65) 45%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black, rgba(0,0,0,0.65) 45%, transparent 100%)",
      }}
    />
  );
}

function CornerGeometry() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
    >
      <span className="absolute right-4 top-4 h-5 w-5 border-r border-t border-[var(--color-mint-bright,##1b4332)]/30" />
      <span className="absolute bottom-4 left-4 h-5 w-5 border-b border-l border-[##1b4332/25" />
    </div>
  );
}

export function EditorialHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  const floatY1 = useTransform(smoothProgress, [0, 1], [0, -55]);
  const floatY2 = useTransform(smoothProgress, [0, 1], [0, 38]);
  const floatY3 = useTransform(smoothProgress, [0, 1], [0, -28]);
  const visualY = useTransform(smoothProgress, [0, 1], [0, -28]);
  const visualScale = useTransform(smoothProgress, [0, 1], [1, 0.94]);
  const backgroundY = useTransform(smoothProgress, [0, 1], [0, 90]);
  const backgroundScale = useTransform(smoothProgress, [0, 1], [1, 1.08]);
  const rotateSvg = useTransform(smoothProgress, [0, 1], [0, 42]);

  return (
    <section
      ref={containerRef}
      className="relative isolate overflow-hidden border-b border-[var(--color-paper-line,#1b4332)] bg-gradient-to-b from-[var(--color-paper,#FAF9F6)] via-[var(--color-paper-raised,#F4F1EA)] to-[var(--color-paper,#FAF9F6)]"
    >
      {/* Fading editorial background image */}
      <motion.div
  aria-hidden="true"
  style={{
    y: backgroundY,
    scale: backgroundScale,
  }}
  initial={{ opacity: 0, scale: 1.04 }}
  animate={{ opacity: 0.85, scale: 1 }}
  transition={{ duration: 1.6, delay: 0.15, ease }}
  className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[42rem] overflow-hidden"
>
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
    style={{
      backgroundImage:
        "url('https://peopledaily.digital/wp-content/uploads/2025/06/Screenshot-2025-06-07-063753-768x528.png')",
    }}
  />

        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-paper,#FAF9F6)]/10 via-[var(--color-paper,#FAF9F6)]/70 to-[var(--color-paper,#FAF9F6)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-paper,#FAF9F6)] via-transparent to-[var(--color-paper,#FAF9F6)]" />
      </motion.div>

      {/* Ambient depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-10rem] -z-10 h-[34rem] w-[58rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_top,rgba(82,183,136,0.16),transparent_68%)] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12rem] top-[18rem] -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(169,99,31,0.10),transparent_68%)] blur-3xl"
      />

      <DecorativeGrid />

//       {/* =========================================================
//           FLOATING AMBIENT OBJECTS
//       ========================================================== */}

//       <motion.div
        aria-hidden="true"
        style={{ y: floatY1 }}
        className="pointer-events-none absolute left-[3%] top-24 -z-10 hidden lg:block"
      >
        <FloatingObject duration={7} rotate={3}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-[var(--color-mint-bright,##1b4332)]/10 blur-xl" />

            <div className="relative flex items-center gap-2.5 rounded-2xl border border-[var(--color-mint-bright,##1b4332)]/30 bg-green/75 px-4 py-2.5 text-xs font-semibold tracking-wide text-[var(--color-ink,#1A1A1A)] shadow-[0_14px_40px_rgba(43,58,85,0.09)] backdrop-blur-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-mint-bright,##1b4332)] opacity-50" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-[var(--color-mint-bright,##1b4332)]" />
              </span>
              Civic Transparency
            </div>
          </div>
        </FloatingObject>
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ y: floatY2 }}
        className="pointer-events-none absolute bottom-28 right-[4%] -z-10 hidden xl:block"
      >
        <FloatingObject duration={8} delay={0.5} rotate={-3}>
          <div className="relative flex items-center gap-2.5 rounded-2xl border border-[##1b4332]/25 bg-green/75 px-4 py-2.5 text-xs font-semibold tracking-wide text-[var(--color-ink,#1A1A1A)] shadow-[0_14px_40px_rgba(43,58,85,0.09)] backdrop-blur-lg">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[##1b4332] opacity-50" />
              <span className="relative h-2 w-2 rounded-full bg-[##1b4332]" />
            </span>
            47 County Chapters
          </div>
        </FloatingObject>
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ y: floatY3 }}
        className="pointer-events-none absolute left-[8%] top-[45%] -z-10 hidden lg:block"
      >
        <FloatingObject duration={9} delay={0.8} rotate={-8}>
          <div className="relative h-16 w-16 rotate-45 rounded-xl border border-[var(--color-mint-bright,##1b4332)]/25 bg-[var(--color-mint-bright,##1b4332)]/8 shadow-[0_0_30px_rgba(82,183,136,0.1)] backdrop-blur-sm">
            <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-mint-bright,##1b4332)]" />
          </div>
        </FloatingObject>
      </motion.div>

      <FloatingOrb className="left-[17%] top-[22%]" delay={0.3} />
      <FloatingOrb
        className="left-[6%] top-[68%]"
        delay={1.4}
        duration={6.5}
      />
      <FloatingOrb
        className="right-[15%] top-[25%]"
        delay={0.8}
        duration={7}
        accent="amber"
      />
      <FloatingOrb
        className="right-[8%] top-[58%]"
        delay={2}
        duration={5.5}
      />

      <PageContainer className="relative pt-14 pb-12 sm:pt-18 sm:pb-16 lg:pt-22 lg:pb-20">
        <div className="grid items-center gap-10 md:grid-cols-12 lg:gap-14">
          {/* =====================================================
              LEFT — TYPOGRAPHY
          ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="relative z-20 flex flex-col items-start md:col-span-7 lg:col-span-8"
          >
            {/* Party badge */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-mint-bright,##1b4332)]/35 bg-green/70 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[var(--color-mint-soft,#2D6A4F)] shadow-sm backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-mint-bright,##1b4332)] opacity-40" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-[var(--color-mint-bright,##1b4332)]" />
              </span>

              Democracy for the Citizens Party
            </motion.div>

            {/* Editorial eyebrow */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--color-ink-soft,#64748B)]"
            >
              <span className="h-px w-8 bg-[var(--color-mint-bright,##1b4332)]" />
              Civic Intelligence Platform
            </motion.div>

            {/* =================================================
                MAIN TITLE — GREEN WORD EMPHASIS
            ================================================== */}
            <h1 className="max-w-4xl font-display text-3xl font-bold leading-[1.035] tracking-tight text-[var(--color-ink,#1A1A1A)] sm:text-5xl lg:text-[4.25rem]">
              A civic platform for exploring{" "}
              <span className="relative inline">
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.3, ease }}
                  className="relative inline-block bg-gradient-to-r from-[var(--color-mint-soft,#2D6A4F)] via-[var(--color-mint-bright,##1b4332)] to-[var(--color-mint-soft,#2D6A4F)] bg-clip-text text-transparent"
                >
                  DCP&apos;s identity,
                  <motion.span
                    aria-hidden="true"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.7, ease }}
                    className="absolute -bottom-1 left-0 h-1 origin-left w-full rounded-full bg-[var(--color-mint-bright,##1b4332)]/45 shadow-[0_0_14px_rgba(82,183,136,0.35)]"
                  />
                </motion.span>
              </span>{" "}
              <span className="relative inline">
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.42, ease }}
                  className="inline-block bg-gradient-to-r from-[var(--color-mint-bright,##1b4332)] via-[var(--color-mint-soft,#2D6A4F)] to-[var(--color-mint-bright,##1b4332)] bg-clip-text text-transparent"
                >
                  leadership,
                </motion.span>
              </span>{" "}
              <span className="relative inline">
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.54, ease }}
                  className="inline-block bg-gradient-to-r from-[var(--color-mint-soft,#2D6A4F)] via-[var(--color-mint-bright,##1b4332)] to-[var(--color-mint-soft,#2D6A4F)] bg-clip-text text-transparent"
                >
                  and public priorities.
                </motion.span>
              </span>
            </h1>

            {/* Glowing title underline */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 0.75, ease }}
              className="mt-5 flex origin-left items-center gap-2"
            >
              <span className="h-1 w-16 rounded-full bg-[var(--color-mint-bright,##1b4332)] shadow-[0_0_16px_rgba(82,183,136,0.4)]" />
              <span className="h-1 w-7 rounded-full bg-[var(--color-mint-soft,#2D6A4F)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,##1b4332)] shadow-[0_0_12px_rgba(82,183,136,0.4)]" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.62, ease }}
              className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-ink-soft,#4A5568)] sm:text-lg sm:leading-8"
            >
              Explore the party&apos;s history, its leadership, the policy
              areas it publishes on, and the ways citizens, journalists, and
              members can engage, all in one structured, sourced place.
            </motion.p>

            {/* CTA cluster */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -3, scale: 1.025 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                <Link
                  href="/policies"
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl border border-[var(--color-mint-bright,##1b4332)]/40 bg-[var(--color-savanna-deep,##1b4332)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,67,50,0.18)] transition-all duration-300 hover:bg-[var(--color-mint-soft,#2D6A4F)] hover:shadow-[0_12px_30px_rgba(45,106,79,0.28)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-full" />
                  <span className="relative">Explore Our Priorities</span>
                  <svg
                    className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>

              <motion.div
                whileHover={reduceMotion ? undefined : { y: -3, scale: 1.025 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                <Link
                  href="/get-involved"
                  className="group inline-flex items-center gap-2 rounded-xl border border-[var(--color-paper-line,#CBD5E1)] bg-white/75 px-6 py-3.5 text-sm font-semibold text-[var(--color-ink,#1A1A1A)] shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[var(--color-mint-bright,##1b4332)]/50 hover:bg-white hover:shadow-md"
                >
                  Get Involved
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,##1b4332)] opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </motion.div>
            </motion.div>

            {/* =================================================
//                 SKIZA MWANANCHI — VISIBLE FEATURE PILL
//             ================================================== */}

           <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.88, ease }}
              className="relative mt-7 overflow-hidden rounded-2xl border border-[var(--color-mint-bright,##1b4332)]/25 bg-green/70 px-4 py-3 shadow-[0_12px_35px_rgba(43,58,85,0.08)] backdrop-blur-md sm:px-5"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-[var(--color-mint-bright,##1b4332)] shadow-[0_0_16px_rgba(82,183,136,0.5)]" />

              <div className="relative flex items-center gap-3 pl-2">
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--color-mint-bright,##1b4332)]/25 bg-[var(--color-mint-bright,##1b4332)]/10">
                  <motion.span
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scale: [1, 1.15, 1],
                            opacity: [0.65, 1, 0.65],
                          }
                    }
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-2.5 w-2.5 rounded-full bg-[var(--color-mint-bright,##1b4332)] shadow-[0_0_12px_rgba(82,183,136,0.6)]"
                  />
                </div>

                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-ink-soft,#64748B)]">
                    Citizen voice
                  </div>

                  <div className="mt-0.5 font-display text-base font-bold tracking-tight text-[var(--color-ink,#1A1A1A)] sm:text-lg">
                    Skiza mwananchi.
                  </div>
                </div>

                <div className="ml-auto hidden items-center gap-1 sm:flex">
                  <span className="h-1 w-5 rounded-full bg-[var(--color-mint-bright,##1b4332)]/50" />
                  <span className="h-1 w-2 rounded-full bg-[var(--color-mint-bright,##1b4332)]/50" />
                </div>
              </div>
            </motion.div>

            {/* Signal rail */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease }}
              className="mt-9 flex max-w-2xl flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--color-paper-line,#1b4332)] pt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-ink-soft,#64748B)]"
            >
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,##1b4332)]" />
                Identity
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,##1b4332)]" />
                Leadership
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,##1b4332)]" />
                Priorities
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,##1b4332)]" />
                Participation
              </span>
            </motion.div>
          </motion.div>

          {/* Visual system */}
          <motion.div
            style={{
              y: visualY,
              scale: visualScale,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="relative flex min-h-[360px] items-center justify-center md:col-span-5 lg:col-span-4"
          >
            {/* Visual ambient glow */}
            <div className="absolute h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(169,99,31,0.12)_0%,transparent_68%)] blur-3xl" />

            {/* Rotating orbital architecture */}
            <OrbitalRing
              size={290}
              duration={24}
              className="opacity-50"
            />
            <OrbitalRing
              size={220}
              duration={18}
              reverse
              className="rotate-12 border-[var(--color-mint-bright,##1b4332)]/20 opacity-60"
            />

            {/* Geometric floating object */}
            <FloatingObject
              duration={6}
              y={12}
              rotate={6}
              className="right-[8%] top-[12%]"
            >
              <div className="relative h-12 w-12 rotate-12 rounded-xl border border-[var(--color-mint-bright,##1b4332)]/30 bg-white/65 shadow-lg backdrop-blur-md">
                <div className="absolute inset-2 rounded-lg border border-[var(--color-mint-bright,##1b4332)]/25" />
                <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-mint-bright,##1b4332)] shadow-[0_0_12px_rgba(82,183,136,0.5)]" />
              </div>
            </FloatingObject>

            <FloatingObject
              duration={7.5}
              delay={0.7}
              y={10}
              rotate={-5}
              className="bottom-[12%] left-[8%]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-mint-bright,##1b4332)]/25 bg-white/70 shadow-lg backdrop-blur-md">
                <span className="h-4 w-4 rounded-full border border-[var(--color-mint-bright,##1b4332)]/50" />
              </div>
            </FloatingObject>

            {/* Network visualization */}
            <motion.div
              style={{ rotate: rotateSvg }}
              className="relative z-10 w-full max-w-[300px] sm:max-w-[330px]"
            >
              <div className="absolute inset-[12%] rounded-full bg-[var(--color-mint-bright,##1b4332)]/5 blur-2xl" />

              <svg
                viewBox="0 0 320 320"
                className="relative h-auto w-full drop-shadow-[0_18px_35px_rgba(43,58,85,0.10)]"
                role="img"
                aria-label="Abstract geometric network representing civic participation"
              >
                <circle
                  cx="160"
                  cy="160"
                  r="128"
                  fill="none"
                  stroke="#C7BFA8"
                  strokeWidth="0.8"
                  strokeDasharray="2 8"
                  opacity="0.65"
                />

                <circle
                  cx="160"
                  cy="160"
                  r="118"
                  fill="none"
                  stroke="#C7BFA8"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />

                <circle
                  cx="160"
                  cy="160"
                  r="82"
                  fill="none"
                  stroke="#C7BFA8"
                  strokeWidth="1"
                  opacity="0.8"
                />

                <motion.circle
                  cx="160"
                  cy="160"
                  r="30"
                  fill="#A9631F"
                  opacity="0.08"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.25, 1],
                          opacity: [0.08, 0.18, 0.08],
                        }
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <line
                  x1="160"
                  y1="160"
                  x2="278"
                  y2="160"
                  stroke="#2B3A55"
                  strokeWidth="1.2"
                  opacity="0.4"
                />
                <line
                  x1="160"
                  y1="160"
                  x2="160"
                  y2="42"
                  stroke="#2B3A55"
                  strokeWidth="1.2"
                  opacity="0.4"
                />
                <line
                  x1="160"
                  y1="160"
                  x2="242"
                  y2="242"
                  stroke="#2B3A55"
                  strokeWidth="1.2"
                  opacity="0.4"
                />
                <line
                  x1="160"
                  y1="160"
                  x2="78"
                  y2="78"
                  stroke="#2B3A55"
                  strokeWidth="1.2"
                  opacity="0.3"
                />
                <line
                  x1="160"
                  y1="160"
                  x2="76"
                  y2="160"
                  stroke="#2B3A55"
                  strokeWidth="1"
                  opacity="0.25"
                />
                <line
                  x1="160"
                  y1="160"
                  x2="242"
                  y2="78"
                  stroke="#2B3A55"
                  strokeWidth="1"
                  opacity="0.25"
                />

                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
                  const rad = (deg * Math.PI) / 180;
                  const x = 160 + 118 * Math.cos(rad);
                  const y = 160 + 118 * Math.sin(rad);
                  const isMajor = deg % 90 === 0;

                  return (
                    <g key={deg}>
                      <motion.circle
                        cx={x}
                        cy={y}
                        r={isMajor ? 7 : 4}
                        fill={isMajor ? "#2B3A55" : "##1b4332"}
                        animate={
                          reduceMotion
                            ? undefined
                            : {
                                r: isMajor ? [7, 8.5, 7] : [4, 5.5, 4],
                                opacity: isMajor
                                  ? [0.75, 1, 0.75]
                                  : [0.6, 1, 0.6],
                              }
                        }
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                      />

                      {isMajor && (
                        <circle
                          cx={x}
                          cy={y}
                          r="12"
                          fill="none"
                          stroke="#2B3A55"
                          strokeWidth="0.8"
                          opacity="0.3"
                        />
                      )}
                    </g>
                  );
                })}

                {/* Inner rotating compass */}
                <motion.g
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          rotate: 360,
                        }
                  }
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ transformOrigin: "160px 160px" }}
                >
                  <path
                    d="M160 126 L166 154 L194 160 L166 166 L160 194 L154 166 L126 160 L154 154 Z"
                    fill="none"
                    stroke="#A9631F"
                    strokeWidth="1"
                    opacity="0.55"
                  />
                </motion.g>

                <circle cx="160" cy="160" r="14" fill="#A9631F" />
                <motion.circle
                  cx="160"
                  cy="160"
                  r="5"
                  fill="#FFFFFF"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: [0.65, 1, 0.65],
                          scale: [0.9, 1.12, 0.9],
                        }
                  }
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </svg>
            </motion.div>

            {/* Floating labels around visual */}
            <FloatingObject
              duration={6.5}
              delay={1}
              y={8}
              rotate={-2}
              className="left-[2%] top-[18%]"
            >
              <div className="rounded-xl border border-[var(--color-paper-line,#1b4332)] bg-green/65 px-3 py-2 shadow-md backdrop-blur-md">
                <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--color-ink-soft,#64748B)]">
                  People
                </div>
                <div className="mt-0.5 text-xs font-semibold text-[var(--color-ink,#1A1A1A)]">
                  Participation
                </div>
              </div>
            </FloatingObject>

            <FloatingObject
              duration={7}
              delay={0.4}
              y={9}
              rotate={2}
              className="bottom-[18%] right-[0%]"
            >
              <div className="rounded-xl border border-[var(--color-paper-line,#1b4332)] bg-green/65 px-3 py-2 shadow-md backdrop-blur-md">
                <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--color-ink-soft,#64748B)]">
                  Focus
                </div>
                <div className="mt-0.5 text-xs font-semibold text-[var(--color-ink,#1A1A1A)]">
                  Public Priorities
                </div>
              </div>
            </FloatingObject>
          </motion.div>
        </div>

        {/* Bottom information rail */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease }}
          className="mt-12 grid gap-4 border-t border-[var(--color-paper-line,#1b4332)] pt-5 sm:grid-cols-[1fr_auto]"
        >
          <p className="max-w-3xl text-xs leading-6 text-[var(--color-ink-soft,#64748B)]">
            {PROTOTYPE_NOTICE}
          </p>

          <div className="hidden items-center gap-2 self-start sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,##1b4332)]" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-ink-soft,#64748B)]">
              Structured civic reference
            </span>
          </div>
        </motion.div>

        {/* Decorative lower horizon */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease }}
          className="mt-7 flex items-center gap-3"
        >
          <span className="h-px flex-1 bg-[var(--color-paper-line,#1b4332)]" />
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[##1b4332" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,##1b4332)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[##1b4332" />
          </span>
          <span className="h-px flex-1 bg-[var(--color-paper-line,#1b4332)]" />
        </motion.div>
      </PageContainer>
    </section>
  );
}







































































































// "use client";

// import React, { useRef } from "react";
// import Link from "next/link";
// import {
//   motion,
//   useReducedMotion,
//   useScroll,
//   useSpring,
//   useTransform,
// } from "framer-motion";
// import { PageContainer } from "@/components/layout/PageContainer";
// import { PROTOTYPE_NOTICE } from "@/lib/constants";

// const ease = [0.16, 1, 0.3, 1] as const;

// function FloatingObject({
//   children,
//   className = "",
//   delay = 0,
//   duration = 6,
//   y = 10,
//   rotate = 4,
// }: {
//   children: React.ReactNode;
//   className?: string;
//   delay?: number;
//   duration?: number;
//   y?: number;
//   rotate?: number;
// }) {
//   const reduceMotion = useReducedMotion();

//   return (
//     <motion.div
//       aria-hidden="true"
//       className={`pointer-events-none absolute ${className}`}
//       animate={
//         reduceMotion
//           ? undefined
//           : {
//               y: [0, -y, 0],
//               rotate: [0, rotate, 0],
//             }
//       }
//       transition={
//         reduceMotion
//           ? undefined
//           : {
//               duration,
//               delay,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }
//       }
//     >
//       {children}
//     </motion.div>
//   );
// }

// function FloatingOrb({
//   className = "",
//   delay = 0,
//   duration = 5,
//   accent = "mint",
// }: {
//   className?: string;
//   delay?: number;
//   duration?: number;
//   accent?: "mint" | "amber";
// }) {
//   const reduceMotion = useReducedMotion();

//   const dot =
//     accent === "amber"
//       ? "bg-[##1b4332 shadow-[0_0_18px_rgba(169,99,31,0.5)]"
//       : "bg-[var(--color-mint-bright,##1b4332)] shadow-[0_0_18px_rgba(82,183,136,0.5)]";

//   return (
//     <motion.span
//       aria-hidden="true"
//       className={`pointer-events-none absolute block h-2 w-2 rounded-full ${dot} ${className}`}
//       animate={
//         reduceMotion
//           ? undefined
//           : {
//               y: [0, -12, 0],
//               x: [0, 5, 0],
//               opacity: [0.35, 0.9, 0.35],
//               scale: [0.8, 1.15, 0.8],
//             }
//       }
//       transition={
//         reduceMotion
//           ? undefined
//           : {
//               duration,
//               delay,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }
//       }
//     />
//   );
// }

// function OrbitalRing({
//   size = 280,
//   duration = 18,
//   reverse = false,
//   className = "",
// }: {
//   size?: number;
//   duration?: number;
//   reverse?: boolean;
//   className?: string;
// }) {
//   const reduceMotion = useReducedMotion();

//   return (
//     <motion.div
//       aria-hidden="true"
//       className={`pointer-events-none absolute rounded-full border border-[var(--color-paper-line,#1b4332)]/80 ${className}`}
//       style={{
//         width: size,
//         height: size,
//       }}
//       animate={
//         reduceMotion
//           ? undefined
//           : {
//               rotate: reverse ? -360 : 360,
//             }
//       }
//       transition={
//         reduceMotion
//           ? undefined
//           : {
//               duration,
//               repeat: Infinity,
//               ease: "linear",
//             }
//       }
//     >
//       <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-mint-bright,##1b4332)] shadow-[0_0_16px_rgba(82,183,136,0.55)]" />
//     </motion.div>
//   );
// }

// function DecorativeGrid() {
//   return (
//     <div
//       aria-hidden="true"
//       className="pointer-events-none absolute inset-0 opacity-[0.32]"
//       style={{
//         backgroundImage: `
//           linear-gradient(to right, rgba(43,58,85,0.055) 1px, transparent 1px),
//           linear-gradient(to bottom, rgba(43,58,85,0.055) 1px, transparent 1px)
//         `,
//         backgroundSize: "42px 42px",
//         maskImage:
//           "linear-gradient(to bottom, black, rgba(0,0,0,0.65) 45%, transparent 100%)",
//         WebkitMaskImage:
//           "linear-gradient(to bottom, black, rgba(0,0,0,0.65) 45%, transparent 100%)",
//       }}
//     />
//   );
// }

// function CornerGeometry() {
//   return (
//     <div
//       aria-hidden="true"
//       className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
//     >
//       <span className="absolute right-4 top-4 h-5 w-5 border-r border-t border-[var(--color-mint-bright,##1b4332)]/30" />
//       <span className="absolute bottom-4 left-4 h-5 w-5 border-b border-l border-[##1b4332/25" />
//     </div>
//   );
// }

// export function EditorialHero() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const reduceMotion = useReducedMotion();

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 20,
//     restDelta: 0.001,
//   });

//   const floatY1 = useTransform(smoothProgress, [0, 1], [0, -55]);
//   const floatY2 = useTransform(smoothProgress, [0, 1], [0, 38]);
//   const floatY3 = useTransform(smoothProgress, [0, 1], [0, -28]);
//   const visualY = useTransform(smoothProgress, [0, 1], [0, -30]);
//   const visualScale = useTransform(smoothProgress, [0, 1], [1, 0.95]);
//   const backgroundY = useTransform(smoothProgress, [0, 1], [0, 80]);
//   const backgroundScale = useTransform(smoothProgress, [0, 1], [1, 1.08]);
//   const rotateSvg = useTransform(smoothProgress, [0, 1], [0, 35]);

//   return (
//     <section
//       ref={containerRef}
//       className="relative isolate overflow-hidden border-b border-[var(--color-paper-line,#1b4332)] bg-gradient-to-b from-[var(--color-paper,#FAF9F6)] via-[var(--color-paper-raised,#F4F1EA)] to-[var(--color-paper,#FAF9F6)]"
//     >
//       {/* =========================================================
//           BACKGROUND IMAGE — stronger visibility, still softened
//       ========================================================== */}
//       <motion.div
//         aria-hidden="true"
//         style={{
//           y: backgroundY,
//           scale: backgroundScale,
//         }}
//         initial={{ opacity: 0, scale: 1.06 }}
//         animate={{ opacity: 0.3, scale: 1 }}
//         transition={{ duration: 1.8, delay: 0.1, ease }}
//         className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[46rem] overflow-hidden"
//       >
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage:
//               "url('https://peopledaily.digital/wp-content/uploads/2025/06/Screenshot-2025-06-07-063753-768x528.png')",
//           }}
//         />

//         {/* Keeps the image visible while protecting the typography */}
//         <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-paper,#FAF9F6)] via-[var(--color-paper,#FAF9F6)]/30 to-transparent" />

//         <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-paper,#FAF9F6)]/10 via-transparent to-[var(--color-paper,#FAF9F6)]" />

//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,transparent_0%,transparent_35%,rgba(250,249,246,0.55)_78%)]" />
//       </motion.div>

//       {/* Background image glow */}
//       <motion.div
//         aria-hidden="true"
//         animate={
//           reduceMotion
//             ? undefined
//             : {
//                 opacity: [0.22, 0.38, 0.22],
//                 scale: [1, 1.04, 1],
//               }
//         }
//         transition={
//           reduceMotion
//             ? undefined
//             : {
//                 duration: 8,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }
//         }
//         className="pointer-events-none absolute right-[5%] top-[7rem] -z-10 h-[28rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(82,183,136,0.13),transparent_68%)] blur-3xl"
//       />

//       {/* Ambient depth */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute left-1/2 top-[-12rem] -z-10 h-[35rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_top,rgba(82,183,136,0.16),transparent_68%)] blur-3xl"
//       />

//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute right-[-14rem] top-[18rem] -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(169,99,31,0.11),transparent_68%)] blur-3xl"
//       />

//       <DecorativeGrid />

//       {/* =========================================================
//           FLOATING AMBIENT OBJECTS
//       ========================================================== */}

//       <motion.div
//         aria-hidden="true"
//         style={{ y: floatY1 }}
//         className="pointer-events-none absolute left-[3%] top-24 -z-10 hidden lg:block"
//       >
//         <FloatingObject duration={7} rotate={3}>
//           <div className="relative">
//             <div className="absolute -inset-4 rounded-2xl bg-[var(--color-mint-bright,##1b4332)]/10 blur-xl" />

//             <div className="relative flex items-center gap-2.5 rounded-2xl border border-[var(--color-mint-bright,##1b4332)]/30 bg-white/75 px-4 py-2.5 text-xs font-semibold tracking-wide text-[var(--color-ink,#1A1A1A)] shadow-[0_14px_40px_rgba(43,58,85,0.09)] backdrop-blur-lg">
//               <span className="relative flex h-2.5 w-2.5">
//                 <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-mint-bright,##1b4332)] opacity-50" />
//                 <span className="relative h-2.5 w-2.5 rounded-full bg-[var(--color-mint-bright,##1b4332)]" />
//               </span>
//               Civic Transparency
//             </div>
//           </div>
//         </FloatingObject>
//       </motion.div>

//       <motion.div
//         aria-hidden="true"
//         style={{ y: floatY2 }}
//         className="pointer-events-none absolute bottom-28 right-[4%] -z-10 hidden xl:block"
//       >
//         <FloatingObject duration={8} delay={0.5} rotate={-3}>
//           <div className="relative flex items-center gap-2.5 rounded-2xl border border-[##1b4332/25 bg-white/75 px-4 py-2.5 text-xs font-semibold tracking-wide text-[var(--color-ink,#1A1A1A)] shadow-[0_14px_40px_rgba(43,58,85,0.09)] backdrop-blur-lg">
//             <span className="relative flex h-2 w-2">
//               <span className="absolute inset-0 animate-ping rounded-full bg-[##1b4332 opacity-50" />
//               <span className="relative h-2 w-2 rounded-full bg-[##1b4332" />
//             </span>
//             47 County Chapters
//           </div>
//         </FloatingObject>
//       </motion.div>

//       <motion.div
//         aria-hidden="true"
//         style={{ y: floatY3 }}
//         className="pointer-events-none absolute left-[8%] top-[45%] -z-10 hidden lg:block"
//       >
//         <FloatingObject duration={9} delay={0.8} rotate={-8}>
//           <div className="relative h-16 w-16 rotate-45 rounded-xl border border-[var(--color-mint-bright,##1b4332)]/25 bg-[var(--color-mint-bright,##1b4332)]/8 shadow-[0_0_30px_rgba(82,183,136,0.1)] backdrop-blur-sm">
//             <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-mint-bright,##1b4332)]" />
//           </div>
//         </FloatingObject>
//       </motion.div>

//       <FloatingOrb className="left-[17%] top-[22%]" delay={0.3} />
//       <FloatingOrb
//         className="left-[6%] top-[68%]"
//         delay={1.4}
//         duration={6.5}
//       />
//       <FloatingOrb
//         className="right-[15%] top-[25%]"
//         delay={0.8}
//         duration={7}
//         accent="amber"
//       />
//       <FloatingOrb
//         className="right-[8%] top-[58%]"
//         delay={2}
//         duration={5.5}
//       />

//       <PageContainer className="relative pt-14 pb-12 sm:pt-18 sm:pb-16 lg:pt-22 lg:pb-20">
//         <div className="grid items-center gap-10 md:grid-cols-12 lg:gap-14">
//           {/* =====================================================
//               LEFT — TYPOGRAPHY
//           ====================================================== */}
//           <motion.div
//             initial={{ opacity: 0, y: 28 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease }}
//             className="relative z-20 flex flex-col items-start md:col-span-7 lg:col-span-8"
//           >
//             {/* Party badge */}
//             <motion.div
//               initial={{ opacity: 0, x: -18 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.65, delay: 0.08, ease }}
//               className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-mint-bright,##1b4332)]/35 bg-white/70 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[var(--color-mint-soft,#2D6A4F)] shadow-sm backdrop-blur-md"
//             >
//               <span className="relative flex h-2.5 w-2.5">
//                 <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-mint-bright,##1b4332)] opacity-40" />
//                 <span className="relative h-2.5 w-2.5 rounded-full bg-[var(--color-mint-bright,##1b4332)]" />
//               </span>

//               Democracy for the Citizens Party
//             </motion.div>

//             {/* Editorial eyebrow */}
//             <motion.div
//               initial={{ opacity: 0, width: 0 }}
//               animate={{ opacity: 1, width: "auto" }}
//               transition={{ duration: 0.8, delay: 0.15, ease }}
//               className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--color-ink-soft,#64748B)]"
//             >
//               <span className="h-px w-8 bg-[var(--color-mint-bright,##1b4332)]" />
//               Civic Intelligence Platform
//             </motion.div>

//             {/* =================================================
//                 MAIN TITLE — GREEN WORD EMPHASIS
//             ================================================== */}
//             <h1 className="max-w-4xl font-display text-3xl font-bold leading-[1.035] tracking-tight text-[var(--color-ink,#1A1A1A)] sm:text-5xl lg:text-[4.25rem]">
//               A civic platform for exploring{" "}
//               <span className="relative inline">
//                 <motion.span
//                   initial={{ opacity: 0, y: 12 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.65, delay: 0.3, ease }}
//                   className="relative inline-block bg-gradient-to-r from-[var(--color-mint-soft,#2D6A4F)] via-[var(--color-mint-bright,##1b4332)] to-[var(--color-mint-soft,#2D6A4F)] bg-clip-text text-transparent"
//                 >
//                   DCP&apos;s identity,
//                   <motion.span
//                     aria-hidden="true"
//                     initial={{ scaleX: 0, opacity: 0 }}
//                     animate={{ scaleX: 1, opacity: 1 }}
//                     transition={{ duration: 0.9, delay: 0.7, ease }}
//                     className="absolute -bottom-1 left-0 h-1 origin-left w-full rounded-full bg-[var(--color-mint-bright,##1b4332)]/45 shadow-[0_0_14px_rgba(82,183,136,0.35)]"
//                   />
//                 </motion.span>
//               </span>{" "}
//               <span className="relative inline">
//                 <motion.span
//                   initial={{ opacity: 0, y: 12 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.65, delay: 0.42, ease }}
//                   className="inline-block bg-gradient-to-r from-[var(--color-mint-bright,##1b4332)] via-[var(--color-mint-soft,#2D6A4F)] to-[var(--color-mint-bright,##1b4332)] bg-clip-text text-transparent"
//                 >
//                   leadership,
//                 </motion.span>
//               </span>{" "}
//               <span className="relative inline">
//                 <motion.span
//                   initial={{ opacity: 0, y: 12 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.65, delay: 0.54, ease }}
//                   className="inline-block bg-gradient-to-r from-[var(--color-mint-soft,#2D6A4F)] via-[var(--color-mint-bright,##1b4332)] to-[var(--color-mint-soft,#2D6A4F)] bg-clip-text text-transparent"
//                 >
//                   and public priorities.
//                 </motion.span>
//               </span>
//             </h1>

//             {/* Glowing title underline */}
//             <motion.div
//               initial={{ opacity: 0, scaleX: 0 }}
//               animate={{ opacity: 1, scaleX: 1 }}
//               transition={{ duration: 1, delay: 0.75, ease }}
//               className="mt-5 flex origin-left items-center gap-2"
//             >
//               <span className="h-1 w-16 rounded-full bg-[var(--color-mint-bright,##1b4332)] shadow-[0_0_16px_rgba(82,183,136,0.4)]" />
//               <span className="h-1 w-7 rounded-full bg-[var(--color-mint-soft,#2D6A4F)]" />
//               <span className="h-1.5 w-1.5 rounded-full bg-[##1b4332 shadow-[0_0_12px_rgba(169,99,31,0.4)]" />
//             </motion.div>

//             <motion.p
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.65, delay: 0.62, ease }}
//               className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-ink-soft,#4A5568)] sm:text-lg sm:leading-8"
//             >
//               Explore the party&apos;s history, its leadership, the policy
//               areas it publishes on, and the ways citizens, journalists, and
//               members can engage — all in one structured, sourced place.
//             </motion.p>

//             {/* =================================================
//                 CTA BUTTONS
//             ================================================== */}
//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.72, ease }}
//               className="mt-8 flex flex-wrap items-center gap-3.5"
//             >
//               <motion.div
//                 whileHover={reduceMotion ? undefined : { y: -3, scale: 1.025 }}
//                 whileTap={reduceMotion ? undefined : { scale: 0.98 }}
//               >
//                 <Link
//                   href="/policies"
//                   className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl border border-[var(--color-mint-bright,##1b4332)]/40 bg-[var(--color-savanna-deep,##1b4332)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,67,50,0.18)] transition-all duration-300 hover:bg-[var(--color-mint-soft,#2D6A4F)] hover:shadow-[0_12px_30px_rgba(45,106,79,0.28)]"
//                 >
//                   <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-full" />

//                   <span className="relative">
//                     Explore Our Priorities
//                   </span>

//                   <svg
//                     className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     aria-hidden="true"
//                   >
//                     <path d="M5 12h14" />
//                     <path d="m12 5 7 7-7 7" />
//                   </svg>
//                 </Link>
//               </motion.div>

//               <motion.div
//                 whileHover={reduceMotion ? undefined : { y: -3, scale: 1.025 }}
//                 whileTap={reduceMotion ? undefined : { scale: 0.98 }}
//               >
//                 <Link
//                   href="/get-involved"
//                   className="group inline-flex items-center gap-2 rounded-xl border border-[var(--color-paper-line,#CBD5E1)] bg-white/80 px-6 py-3.5 text-sm font-semibold text-[var(--color-ink,#1A1A1A)] shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[var(--color-mint-bright,##1b4332)]/50 hover:bg-white hover:shadow-md"
//                 >
//                   Get Involved
//                   <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,##1b4332)] opacity-0 transition-opacity group-hover:opacity-100" />
//                 </Link>
//               </motion.div>
//             </motion.div>

//             {/* =================================================
//                 SKIZA MWANANCHI — VISIBLE FEATURE PILL
//             ================================================== */}
//             <motion.div
//               initial={{ opacity: 0, y: 16, scale: 0.96 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ duration: 0.75, delay: 0.88, ease }}
//               className="relative mt-7 overflow-hidden rounded-2xl border border-[var(--color-mint-bright,##1b4332)]/25 bg-white/70 px-4 py-3 shadow-[0_12px_35px_rgba(43,58,85,0.08)] backdrop-blur-md sm:px-5"
//             >
//               <div className="absolute inset-y-0 left-0 w-1 bg-[var(--color-mint-bright,##1b4332)] shadow-[0_0_16px_rgba(82,183,136,0.5)]" />

//               <div className="relative flex items-center gap-3 pl-2">
//                 <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--color-mint-bright,##1b4332)]/25 bg-[var(--color-mint-bright,##1b4332)]/10">
//                   <motion.span
//                     animate={
//                       reduceMotion
//                         ? undefined
//                         : {
//                             scale: [1, 1.15, 1],
//                             opacity: [0.65, 1, 0.65],
//                           }
//                     }
//                     transition={{
//                       duration: 2.5,
//                       repeat: Infinity,
//                       ease: "easeInOut",
//                     }}
//                     className="h-2.5 w-2.5 rounded-full bg-[var(--color-mint-bright,##1b4332)] shadow-[0_0_12px_rgba(82,183,136,0.6)]"
//                   />
//                 </div>

//                 <div>
//                   <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-ink-soft,#64748B)]">
//                     Citizen voice
//                   </div>

//                   <div className="mt-0.5 font-display text-base font-bold tracking-tight text-[var(--color-ink,#1A1A1A)] sm:text-lg">
//                     Skiza mwananchi.
//                   </div>
//                 </div>

//                 <div className="ml-auto hidden items-center gap-1 sm:flex">
//                   <span className="h-1 w-5 rounded-full bg-[var(--color-mint-bright,##1b4332)]/50" />
//                   <span className="h-1 w-2 rounded-full bg-[##1b4332/50" />
//                 </div>
//               </div>
//             </motion.div>

//             {/* Signal rail */}
//             <motion.div
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.95, ease }}
//               className="mt-8 flex max-w-2xl flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--color-paper-line,#1b4332)] pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-soft,#64748B)]"
//             >
//               <span className="flex items-center gap-2">
//                 <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,##1b4332)]" />
//                 Identity
//               </span>

//               <span className="flex items-center gap-2">
//                 <span className="h-1.5 w-1.5 rounded-full bg-[##1b4332" />
//                 Leadership
//               </span>

//               <span className="flex items-center gap-2">
//                 <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,##1b4332)]" />
//                 Priorities
//               </span>

//               <span className="flex items-center gap-2">
//                 <span className="h-1.5 w-1.5 rounded-full bg-[##1b4332" />
//                 Participation
//               </span>
//             </motion.div>
//           </motion.div>

//           {/* =====================================================
//               RIGHT — IMAGE + CIVIC NETWORK
//           ====================================================== */}
//           <motion.div
//             style={{
//               y: visualY,
//               scale: visualScale,
//             }}
//             initial={{ opacity: 0, x: 30, scale: 0.92 }}
//             animate={{ opacity: 1, x: 0, scale: 1 }}
//             transition={{ duration: 1, delay: 0.25, ease }}
//             className="relative z-10 flex min-h-[390px] items-center justify-center md:col-span-5 lg:col-span-4"
//           >
//             {/* Image card behind visualization */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
//               animate={{ opacity: 1, scale: 1, rotate: -2 }}
//               transition={{ duration: 1.1, delay: 0.45, ease }}
//               className="absolute right-[-4%] top-[7%] h-[245px] w-[205px] overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 shadow-[0_25px_65px_rgba(43,58,85,0.16)] backdrop-blur-sm sm:right-[2%] sm:h-[275px] sm:w-[225px]"
//             >
//               <div
//                 className="absolute inset-0 bg-cover bg-center"
//                 style={{
//                   backgroundImage:
//                     "url('https://peopledaily.digital/wp-content/uploads/2025/06/Screenshot-2025-06-07-063753-768x528.png')",
//                 }}
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-savanna-deep,##1b4332)]/60 via-transparent to-white/5" />

//               <div className="absolute inset-x-0 bottom-0 p-4">
//                 <div className="mb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white/75">
//                   Civic conversation
//                 </div>
//                 <div className="font-display text-lg font-bold text-white">
//                   Skiza mwananchi.
//                 </div>
//               </div>

//               <motion.div
//                 animate={
//                   reduceMotion
//                     ? undefined
//                     : {
//                         y: ["0%", "100%", "0%"],
//                       }
//                 }
//                 transition={
//                   reduceMotion
//                     ? undefined
//                     : {
//                         duration: 5,
//                         repeat: Infinity,
//                         ease: "easeInOut",
//                       }
//                 }
//                 className="absolute left-0 right-0 top-0 h-px bg-[var(--color-mint-bright,##1b4332)] shadow-[0_0_12px_rgba(82,183,136,0.65)]"
//               />
//             </motion.div>

//             {/* Main visual glow */}
//             <div className="absolute h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(169,99,31,0.13)_0%,transparent_68%)] blur-3xl" />

//             {/* Orbital architecture */}
//             <OrbitalRing
//               size={310}
//               duration={25}
//               className="opacity-55"
//             />

//             <OrbitalRing
//               size={245}
//               duration={18}
//               reverse
//               className="border-[var(--color-mint-bright,##1b4332)]/25 opacity-65"
//             />

//             {/* Floating top object */}
//             <FloatingObject
//               duration={6}
//               y={12}
//               rotate={6}
//               className="right-[3%] top-[3%]"
//             >
//               <div className="relative h-12 w-12 rotate-12 rounded-xl border border-[var(--color-mint-bright,##1b4332)]/30 bg-white/80 shadow-lg backdrop-blur-md">
//                 <div className="absolute inset-2 rounded-lg border border-[var(--color-mint-bright,##1b4332)]/25" />
//                 <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-mint-bright,##1b4332)] shadow-[0_0_12px_rgba(82,183,136,0.5)]" />
//               </div>
//             </FloatingObject>

//             {/* Floating amber object */}
//             <FloatingObject
//               duration={7.5}
//               delay={0.7}
//               y={10}
//               rotate={-5}
//               className="bottom-[8%] left-[2%]"
//             >
//               <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[##1b4332/25 bg-white/80 shadow-lg backdrop-blur-md">
//                 <span className="h-4 w-4 rounded-full border border-[##1b4332/60" />
//               </div>
//             </FloatingObject>

//             {/* Main SVG */}
//             <motion.div
//               style={{ rotate: rotateSvg }}
//               className="relative z-20 mt-7 w-full max-w-[300px] sm:max-w-[325px]"
//             >
//               <div className="absolute inset-[10%] rounded-full bg-[var(--color-mint-bright,##1b4332)]/8 blur-2xl" />

//               <svg
//                 viewBox="0 0 320 320"
//                 className="relative h-auto w-full drop-shadow-[0_22px_45px_rgba(43,58,85,0.16)]"
//                 role="img"
//                 aria-label="Abstract geometric network representing civic participation"
//               >
//                 <circle
//                   cx="160"
//                   cy="160"
//                   r="134"
//                   fill="none"
//                   stroke="#C7BFA8"
//                   strokeWidth="0.8"
//                   strokeDasharray="2 9"
//                   opacity="0.65"
//                 />

//                 <circle
//                   cx="160"
//                   cy="160"
//                   r="118"
//                   fill="none"
//                   stroke="#C7BFA8"
//                   strokeWidth="1.2"
//                   strokeDasharray="4 4"
//                 />

//                 <circle
//                   cx="160"
//                   cy="160"
//                   r="82"
//                   fill="none"
//                   stroke="#C7BFA8"
//                   strokeWidth="1"
//                   opacity="0.85"
//                 />

//                 {/* Network lines */}
//                 <line
//                   x1="160"
//                   y1="160"
//                   x2="278"
//                   y2="160"
//                   stroke="#2B3A55"
//                   strokeWidth="1.2"
//                   opacity="0.42"
//                 />

//                 <line
//                   x1="160"
//                   y1="160"
//                   x2="160"
//                   y2="42"
//                   stroke="#2B3A55"
//                   strokeWidth="1.2"
//                   opacity="0.42"
//                 />

//                 <line
//                   x1="160"
//                   y1="160"
//                   x2="242"
//                   y2="242"
//                   stroke="#2B3A55"
//                   strokeWidth="1.2"
//                   opacity="0.42"
//                 />

//                 <line
//                   x1="160"
//                   y1="160"
//                   x2="78"
//                   y2="78"
//                   stroke="#2B3A55"
//                   strokeWidth="1.2"
//                   opacity="0.32"
//                 />

//                 <line
//                   x1="160"
//                   y1="160"
//                   x2="76"
//                   y2="160"
//                   stroke="#2B3A55"
//                   strokeWidth="1"
//                   opacity="0.27"
//                 />

//                 <line
//                   x1="160"
//                   y1="160"
//                   x2="242"
//                   y2="78"
//                   stroke="#2B3A55"
//                   strokeWidth="1"
//                   opacity="0.27"
//                 />

//                 {/* Animated network nodes */}
//                 {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
//                   const rad = (deg * Math.PI) / 180;
//                   const x = 160 + 118 * Math.cos(rad);
//                   const y = 160 + 118 * Math.sin(rad);
//                   const isMajor = deg % 90 === 0;

//                   return (
//                     <g key={deg}>
//                       <motion.circle
//                         cx={x}
//                         cy={y}
//                         r={isMajor ? 7 : 4}
//                         fill={isMajor ? "#2B3A55" : "##1b4332"}
//                         animate={
//                           reduceMotion
//                             ? undefined
//                             : {
//                                 r: isMajor ? [7, 8.5, 7] : [4, 5.5, 4],
//                                 opacity: isMajor
//                                   ? [0.72, 1, 0.72]
//                                   : [0.55, 1, 0.55],
//                               }
//                         }
//                         transition={{
//                           duration: 3,
//                           repeat: Infinity,
//                           delay: i * 0.2,
//                           ease: "easeInOut",
//                         }}
//                       />

//                       {isMajor && (
//                         <circle
//                           cx={x}
//                           cy={y}
//                           r="12"
//                           fill="none"
//                           stroke="#2B3A55"
//                           strokeWidth="0.8"
//                           opacity="0.3"
//                         />
//                       )}
//                     </g>
//                   );
//                 })}

//                 {/* Central aura */}
//                 <motion.circle
//                   cx="160"
//                   cy="160"
//                   r="32"
//                   fill="#A9631F"
//                   opacity="0.08"
//                   animate={
//                     reduceMotion
//                       ? undefined
//                       : {
//                           scale: [1, 1.28, 1],
//                           opacity: [0.08, 0.2, 0.08],
//                         }
//                   }
//                   transition={{
//                     duration: 4,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                 />

//                 {/* Rotating civic compass */}
//                 <motion.g
//                   animate={
//                     reduceMotion
//                       ? undefined
//                       : {
//                           rotate: 360,
//                         }
//                   }
//                   transition={{
//                     duration: 14,
//                     repeat: Infinity,
//                     ease: "linear",
//                   }}
//                   style={{ transformOrigin: "160px 160px" }}
//                 >
//                   <path
//                     d="M160 126 L166 154 L194 160 L166 166 L160 194 L154 166 L126 160 L154 154 Z"
//                     fill="none"
//                     stroke="#A9631F"
//                     strokeWidth="1"
//                     opacity="0.55"
//                   />

//                   <circle
//                     cx="160"
//                     cy="160"
//                     r="45"
//                     fill="none"
//                     stroke="#A9631F"
//                     strokeWidth="0.7"
//                     strokeDasharray="3 7"
//                     opacity="0.3"
//                   />
//                 </motion.g>

//                 {/* Central hub */}
//                 <circle cx="160" cy="160" r="16" fill="#A9631F" />

//                 <motion.circle
//                   cx="160"
//                   cy="160"
//                   r="6"
//                   fill="#FFFFFF"
//                   animate={
//                     reduceMotion
//                       ? undefined
//                       : {
//                           opacity: [0.6, 1, 0.6],
//                           scale: [0.85, 1.15, 0.85],
//                         }
//                   }
//                   transition={{
//                     duration: 2.5,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                 />
//               </svg>
//             </motion.div>

//             {/* Floating text cards */}
//             <FloatingObject
//               duration={6.5}
//               delay={1}
//               y={8}
//               rotate={-2}
//               className="left-[-2%] top-[15%]"
//             >
//               <div className="rounded-xl border border-[var(--color-paper-line,#1b4332)] bg-white/80 px-3.5 py-2.5 shadow-lg backdrop-blur-md">
//                 <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--color-ink-soft,#64748B)]">
//                   People
//                 </div>
//                 <div className="mt-0.5 text-xs font-semibold text-[var(--color-ink,#1A1A1A)]">
//                   Participation
//                 </div>
//               </div>
//             </FloatingObject>

//             <FloatingObject
//               duration={7}
//               delay={0.4}
//               y={9}
//               rotate={2}
//               className="bottom-[15%] right-[-3%]"
//             >
//               <div className="rounded-xl border border-[var(--color-paper-line,#1b4332)] bg-white/80 px-3.5 py-2.5 shadow-lg backdrop-blur-md">
//                 <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--color-ink-soft,#64748B)]">
//                   Focus
//                 </div>
//                 <div className="mt-0.5 text-xs font-semibold text-[var(--color-ink,#1A1A1A)]">
//                   Public Priorities
//                 </div>
//               </div>
//             </FloatingObject>

//             {/* Skiza badge near image */}
//             <motion.div
//               initial={{ opacity: 0, y: 12, scale: 0.94 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ duration: 0.7, delay: 1, ease }}
//               className="absolute bottom-[2%] left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full border border-[var(--color-mint-bright,##1b4332)]/35 bg-white/90 px-4 py-2 shadow-[0_12px_30px_rgba(43,58,85,0.13)] backdrop-blur-lg"
//             >
//               <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-ink,#1A1A1A)]">
//                 <span className="h-2 w-2 rounded-full bg-[var(--color-mint-bright,##1b4332)] shadow-[0_0_12px_rgba(82,183,136,0.55)]" />
//                 Skiza mwananchi
//               </span>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* =====================================================
//             BOTTOM INFORMATION RAIL
//         ====================================================== */}
//         <motion.div
//           initial={{ opacity: 0, y: 18 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 1.05, ease }}
//           className="mt-11 grid gap-4 border-t border-[var(--color-paper-line,#1b4332)] pt-5 sm:grid-cols-[1fr_auto] sm:items-center"
//         >
//           <p className="max-w-3xl text-xs leading-6 text-[var(--color-ink-soft,#64748B)]">
//             {PROTOTYPE_NOTICE}
//           </p>

//           <div className="hidden items-center gap-2 sm:flex">
//             <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,##1b4332)] shadow-[0_0_8px_rgba(82,183,136,0.4)]" />

//             <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-ink-soft,#64748B)]">
//               Structured civic reference
//             </span>
//           </div>
//         </motion.div>

//         {/* Bottom horizon */}
//         <motion.div
//           initial={{ opacity: 0, scaleX: 0 }}
//           animate={{ opacity: 1, scaleX: 1 }}
//           transition={{ duration: 1, delay: 1.15, ease }}
//           className="mt-7 flex origin-center items-center gap-3"
//         >
//           <span className="h-px flex-1 bg-[var(--color-paper-line,#1b4332)]" />

//           <span className="flex items-center gap-2">
//             <motion.span
//               animate={
//                 reduceMotion
//                   ? undefined
//                   : {
//                       scale: [1, 1.4, 1],
//                       opacity: [0.5, 1, 0.5],
//                     }
//               }
//               transition={{
//                 duration: 2.2,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="h-1.5 w-1.5 rounded-full bg-[##1b4332"
//             />

//             <motion.span
//               animate={
//                 reduceMotion
//                   ? undefined
//                   : {
//                       scale: [1, 1.4, 1],
//                       opacity: [0.5, 1, 0.5],
//                     }
//               }
//               transition={{
//                 duration: 2.2,
//                 delay: 0.35,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,##1b4332)]"
//             />

//             <motion.span
//               animate={
//                 reduceMotion
//                   ? undefined
//                   : {
//                       scale: [1, 1.4, 1],
//                       opacity: [0.5, 1, 0.5],
//                     }
//               }
//               transition={{
//                 duration: 2.2,
//                 delay: 0.7,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="h-1.5 w-1.5 rounded-full bg-[##1b4332"
//             />
//           </span>

//           <span className="h-px flex-1 bg-[var(--color-paper-line,#1b4332)]" />
//         </motion.div>
//       </PageContainer>
//     </section>
//   );
// }