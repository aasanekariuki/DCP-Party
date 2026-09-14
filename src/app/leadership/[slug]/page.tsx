"use client";

import { use, type PropsWithChildren } from "react";

import { notFound } from "next/navigation";

import Link from "next/link";

import {
  ArrowLeft,
  ArrowUpRight,
  UserCircle2,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ScanLine,
  Network,
  Orbit,
  Fingerprint,
  Layers3,
} from "lucide-react";

import { motion } from "framer-motion";

import { Section } from "@/components/layout/PageContainer";

import { VerificationBadge } from "@/components/ui/VerificationBadge";

import {
  getLeadershipProfileBySlug,
} from "@/data/leadership";

import { PROTOTYPE_NOTICE } from "@/lib/constants";

const ease = [0.16, 1, 0.3, 1] as const;

function ProfileMotionWrapper({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
    >
      {children}
    </motion.div>
  );
}

function FloatingOrb({
  className = "",
  size = 260,
  variant = "mint",
}: {
  className?: string;
  size?: number;
  variant?: "mint" | "jungle";
}) {
  const gradients = {
    mint:
      "bg-[radial-gradient(circle,rgba(82,183,136,0.17)_0%,rgba(45,106,79,0.07)_45%,transparent_72%)]",
    jungle:
      "bg-[radial-gradient(circle,rgba(27,67,50,0.18)_0%,rgba(45,106,79,0.06)_48%,transparent_74%)]",
  };

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${gradients[variant]} ${className}`}
      style={{ width: size, height: size }}
      animate={{
        scale: [1, 1.12, 1],
        opacity: [0.35, 0.65, 0.35],
        x: [0, 14, 0],
        y: [0, -14, 0],
      }}
      transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
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
      "rounded-full bg-[var(--color-mint-bright,#52B788)]/55 shadow-[0_0_14px_rgba(82,183,136,0.45)]",
    diamond:
      "rotate-45 rounded-[2px] border border-[var(--color-mint-bright,#52B788)]/45 bg-[var(--color-mint-bright,#52B788)]/10",
    ring:
      "rounded-full border border-[var(--color-mint-bright,#52B788)]/35 bg-transparent",
  };

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute block ${shapeStyles[shape]} ${className}`}
      animate={{
        y: [0, -18, 0],
        x: [0, 7, 0],
        opacity: [0.2, 0.8, 0.2],
        scale: [0.85, 1.15, 0.85],
        rotate: shape === "diamond" ? [45, 135, 45] : undefined,
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
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
      className={`pointer-events-none absolute rounded-full border border-[var(--color-mint-bright,#52B788)]/15 ${className}`}
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
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

function BackgroundGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.18]"
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

function SignalLine() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-[var(--color-mint-bright,#52B788)]/20 to-transparent lg:block"
    />
  );
}

export default function LeadershipProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const profile = getLeadershipProfileBySlug(slug);

  if (!profile) {
    notFound();
  }

  return (
    <>
      {/* =========================================================
          PROFILE HERO
      ========================================================= */}

      <Section
        border={false}
        className="relative overflow-hidden bg-paper pt-10 pb-14 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20"
      >
        <BackgroundGrid />
        <FloatingOrb size={420} variant="jungle" className="-left-52 -top-40" />
        <FloatingOrb size={360} variant="mint" className="-right-44 top-16" />
        <OrbitDecoration size={330} duration={42} className="-right-44 -top-36" />
        <OrbitDecoration size={190} duration={28} className="-left-24 bottom-0" />
        <FloatingParticle className="left-[7%] top-[22%] h-2.5 w-2.5" delay={0.2} duration={5.5} />
        <FloatingParticle className="right-[12%] top-[18%] h-3 w-3" delay={1} duration={7} shape="diamond" />
        <FloatingParticle className="right-[18%] bottom-[20%] h-5 w-5" delay={1.5} duration={8} shape="ring" />
        <SignalLine />

        <div className="relative z-10">
          {/* Back navigation */}

          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-8 sm:mb-10"
          >
            <Link
              href="/leadership"
              className="group inline-flex items-center gap-2 rounded-xl border rule bg-paper-raised/70 px-4 py-2.5 font-mono text-xs font-semibold text-ink-soft shadow-2xs backdrop-blur-md transition-all duration-300 hover:border-mint-bright hover:bg-paper hover:text-ink hover:shadow-[0_8px_24px_rgba(27,67,50,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-bright"
            >
              <ArrowLeft
                size={14}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              <span>Back to leadership</span>
            </Link>
          </motion.div>

          <ProfileMotionWrapper className="relative grid items-start gap-7 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.28fr)] lg:gap-10 xl:gap-12">
            {/* =====================================================
                PORTRAIT / RECORD PANEL
            ===================================================== */}

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, ease }}
              className="group relative overflow-hidden rounded-3xl border rule bg-paper-raised/80 p-3.5 shadow-[0_18px_50px_rgba(27,67,50,0.06)] backdrop-blur-md sm:p-4"
            >
              <CornerBrackets />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(82,183,136,0.16),transparent_70%)] blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border rule bg-stone/30">
                {/* Decorative frame */}

                <div
                  aria-hidden="true"
                  className="absolute inset-3 rounded-xl border border-mint-bright/10"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-mint-bright/20 to-transparent"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-y-8 left-1/2 w-px bg-gradient-to-b from-transparent via-mint-bright/20 to-transparent"
                />

                {profile.image ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${profile.image}')` }}
                  />
                ) : (
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      scale: [1, 1.025, 1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] border border-mint-bright/20 bg-paper-raised/70 shadow-[0_0_55px_rgba(82,183,136,0.08)] backdrop-blur-md sm:h-32 sm:w-32"
                  >
                    <UserCircle2
                      size={76}
                      className="text-ink-faint transition-transform duration-500 group-hover:scale-105"
                      strokeWidth={1.15}
                    />
                  </motion.div>
                )}

                {/* Scanning accent */}

                <motion.div
                  aria-hidden="true"
                  className="absolute left-8 right-8 h-px bg-gradient-to-r from-transparent via-mint-bright/45 to-transparent"
                  animate={{ top: ["18%", "82%", "18%"], opacity: [0, 1, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl border rule bg-paper-raised/80 px-3 py-2.5 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint-bright shadow-[0_0_9px_rgba(82,183,136,0.75)]" />
                    <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                      Leadership record
                    </span>
                  </div>

                  <ScanLine className="h-3.5 w-3.5 text-mint-bright" />
                </div>
              </div>

              <div className="relative mt-4 flex items-center justify-between gap-3 px-1">
                <span className="flex min-w-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-mint-bright" />
                  <span className="truncate">Profile record</span>
                </span>

                <span className="rounded-full border rule bg-paper px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-ink-soft">
                  {profile.category}
                </span>
              </div>
            </motion.div>

            {/* =====================================================
                PROFILE INFORMATION
            ===================================================== */}

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease }}
              className="group relative overflow-hidden rounded-3xl border rule bg-paper-raised/65 p-6 shadow-[0_18px_50px_rgba(27,67,50,0.05)] backdrop-blur-md sm:p-8 lg:p-9"
            >
              <CornerBrackets />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(82,183,136,0.14),transparent_68%)] blur-3xl"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-px w-1/2 bg-gradient-to-r from-mint-bright/55 to-transparent"
              />

              <div className="relative">
                {/* Role + verification */}

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.45, ease }}
                  className="flex flex-wrap items-center gap-2.5"
                >
                  <span className="inline-flex items-center gap-2 rounded-lg border rule bg-paper px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-warm shadow-2xs">
                    <Layers3 className="h-3 w-3" />
                    {profile.role}
                  </span>

                  <VerificationBadge status={profile.verificationStatus} />
                </motion.div>

                {/* Name */}

                <div className="relative mt-5">
                  <span
                    aria-hidden="true"
                    className="absolute -left-3 top-1/2 hidden h-14 w-0.5 -translate-y-1/2 bg-gradient-to-b from-transparent via-mint-bright to-transparent sm:block"
                  />

                  <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                    {profile.name}
                  </h1>

                  <motion.div
                    aria-hidden="true"
                    initial={{ width: 0 }}
                    animate={{ width: "7rem" }}
                    transition={{ delay: 0.6, duration: 0.7, ease }}
                    className="mt-4 h-0.5 bg-gradient-to-r from-mint-bright via-mint-soft to-transparent"
                  />
                </div>

                {/* Biography */}

                <p className="measure mt-6 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">
                  {profile.biography}
                </p>

                {/* Record metadata */}

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border rule bg-paper/60 p-3.5 backdrop-blur-xs">
                    <div className="flex items-center gap-2">
                      <Fingerprint className="h-4 w-4 text-mint-bright" />
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ink-soft">
                        Record type
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-ink">
                      Leadership profile
                    </p>
                  </div>

                  <div className="rounded-xl border rule bg-paper/60 p-3.5 backdrop-blur-xs">
                    <div className="flex items-center gap-2">
                      <Network className="h-4 w-4 text-mint-bright" />
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ink-soft">
                        Organization
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-ink">
                      DCP Kenya
                    </p>
                  </div>
                </div>

                {/* Responsibilities */}

                {profile.responsibilities &&
                  profile.responsibilities.length > 0 && (
                    <div className="mt-8 border-t rule pt-7">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-mint-bright shadow-[0_0_9px_rgba(82,183,136,0.7)]" />

                            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-mint-soft">
                              Scope of work
                            </span>
                          </div>

                          <h2 className="mt-2 font-display text-xl font-bold text-ink sm:text-2xl">
                            Responsibilities
                          </h2>
                        </div>

                        <ArrowUpRight className="hidden h-5 w-5 text-ink-soft/30 sm:block" />
                      </div>

                      <ul className="mt-5 grid gap-2.5">
                        {profile.responsibilities.map((responsibility, index) => (
                          <motion.li
                            key={responsibility}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ duration: 0.45, delay: index * 0.05, ease }}
                            whileHover={{ x: 3 }}
                            className="group relative flex items-start gap-3 overflow-hidden rounded-xl border rule bg-paper/60 p-3.5 backdrop-blur-xs transition-all duration-300 hover:border-mint-bright hover:bg-paper hover:shadow-[0_10px_28px_rgba(27,67,50,0.06)]"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-mint-bright to-transparent transition-all duration-300 group-hover:w-full"
                            />

                            <CheckCircle2
                              size={17}
                              className="mt-0.5 shrink-0 text-ink-soft transition-all duration-300 group-hover:text-mint-bright group-hover:drop-shadow-[0_0_6px_rgba(82,183,136,0.45)]"
                            />

                            <span className="text-sm leading-6 text-ink-soft transition-colors duration-300 group-hover:text-ink">
                              {responsibility}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </motion.div>
          </ProfileMotionWrapper>

          {/* Bottom profile signal */}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5, ease }}
            className="relative z-10 mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t rule pt-5"
          >
            <ShieldCheck className="h-4 w-4 text-mint-bright" />

            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.17em] text-ink-soft">
              DCP Kenya · Leadership record
            </span>

            <span className="h-px min-w-8 flex-1 bg-gradient-to-r from-mint-bright/25 to-transparent" />

            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft/55">
              Source status monitored
            </span>
          </motion.div>
        </div>
      </Section>

      {/* =========================================================
          VERIFICATION NOTICE
      ========================================================= */}

      <Section
        border={false}
        className="relative overflow-hidden bg-paper-raised pt-2 pb-12 sm:pb-14"
      >
        <FloatingOrb size={300} variant="mint" className="-right-36 -top-32" />
        <FloatingParticle className="left-[10%] top-[40%] h-2 w-2" delay={0.5} duration={5} />
        <FloatingParticle className="right-[18%] top-[25%] h-3 w-3" delay={1.2} duration={7} shape="diamond" />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease }}
          className="relative z-10"
        >
          <div className="group relative overflow-hidden rounded-2xl border rule bg-paper/75 p-5 shadow-[0_14px_40px_rgba(27,67,50,0.05)] backdrop-blur-md sm:p-6">
            <CornerBrackets />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.16]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(82,183,136,0.12) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(82,183,136,0.12) 1px, transparent 1px)
                `,
                backgroundSize: "30px 30px",
              }}
            />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.05 }}
                transition={{ duration: 0.25, ease }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-mint-bright/25 bg-mint-bright/10 text-mint-bright shadow-[0_0_24px_rgba(82,183,136,0.08)]"
              >
                <ShieldCheck className="h-5 w-5" />
              </motion.div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-display text-sm font-bold uppercase tracking-[0.1em] text-ink">
                    Verification Notice
                  </span>

                  <span className="h-1 w-1 rounded-full bg-mint-bright shadow-[0_0_8px_rgba(82,183,136,0.7)]" />

                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-mint-soft">
                    Source layer
                  </span>
                </div>

                <p className="mt-2 max-w-4xl text-xs leading-6 text-ink-soft sm:text-sm">
                  {PROTOTYPE_NOTICE}
                </p>
              </div>

              <div className="hidden shrink-0 items-center gap-2 rounded-lg border rule bg-paper-raised/70 px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-soft sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-mint-bright shadow-[0_0_8px_rgba(82,183,136,0.7)]" />
                Review layer
              </div>
            </div>

            <div className="relative mt-5 flex items-center gap-3 border-t rule pt-4">
              <ScanLine className="h-3.5 w-3.5 text-mint-bright" />

              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft/65">
                Information should be treated according to its verification
                status
              </span>

              <motion.span
                aria-hidden="true"
                className="ml-auto hidden h-px w-20 bg-gradient-to-r from-mint-bright/40 to-transparent sm:block"
                animate={{ opacity: [0.25, 0.8, 0.25] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              <Orbit className="h-4 w-4 text-mint-bright/45" />
            </div>
          </div>
        </motion.div>
      </Section>
    </>
  );
}