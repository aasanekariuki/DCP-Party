"use client";

import Link from "next/link";
import { useRef } from "react";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { Button } from "@/components/ui/Button";
import { getLeadershipProfiles } from "@/data/leadership";

import {
  UserCircle2,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Network,
  Fingerprint,
  ScanLine,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

function FloatingOrb({
  className = "",
  size = 240,
  variant = "jungle",
  delay = 0,
}: {
  className?: string;
  size?: number;
  variant?: "jungle" | "mint";
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  const gradients = {
    jungle:
      "bg-[radial-gradient(circle,rgba(27,67,50,0.18)_0%,rgba(45,106,79,0.06)_50%,transparent_72%)]",
    mint:
      "bg-[radial-gradient(circle,rgba(82,183,136,0.15)_0%,rgba(45,106,79,0.05)_50%,transparent_72%)]",
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
              scale: [1, 1.16, 1],
              opacity: [0.3, 0.65, 0.3],
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
  delay = 0,
  duration = 6,
  className = "",
}: {
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute block rounded-full bg-[var(--color-mint-bright,#52B788)]/40 blur-[1px] ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -17, 0],
              x: [0, 6, 0],
              opacity: [0.18, 0.75, 0.18],
              scale: [0.8, 1.25, 0.8],
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

function FloatingDiamond({
  className = "",
  size = 28,
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
      className={`pointer-events-none absolute rotate-45 rounded-md border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper,#FAF9F6)]/20 backdrop-blur-sm ${className}`}
      style={{ width: size, height: size }}
      animate={
        reduceMotion
          ? undefined
          : {
              rotate: [45, 135, 45],
              y: [0, -10, 0],
              opacity: [0.3, 0.75, 0.3],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 8,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    />
  );
}

function OrbitRing({
  className = "",
  duration = 30,
}: {
  className?: string;
  duration?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border border-[var(--color-mint-bright,#52B788)]/10 ${className}`}
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
      <span className="absolute -right-1.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[var(--color-mint-bright,#52B788)]/75 shadow-[0_0_18px_rgba(82,183,136,0.45)]" />
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

export function LeadershipPreview() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const profiles = getLeadershipProfiles().slice(0, 4);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 24,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease,
      },
    },
  };

  return (
    <Section
      decorated
      animateEntry={false}
      className="relative overflow-hidden"
    >
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      {/* Background image atmosphere */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease }}
      >
        <motion.div
          style={
            reduceMotion
              ? undefined
              : {
                  y: backgroundY,
                  scale: backgroundScale,
                }
          }
          className="absolute inset-[-6%]"
        >
          <div
  className="absolute inset-0 bg-cover bg-center opacity-20"
  style={{
    backgroundImage:
      "url('https://peopledaily.digital/wp-content/uploads/2025/06/Screenshot-2025-06-07-063753-768x528.png')",
  }}
/>
        </motion.div>

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-paper,#FAF9F6),transparent_22%,transparent_78%,var(--color-paper,#FAF9F6))]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(82,183,136,0.09),transparent_30%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_65%,rgba(27,67,50,0.06),transparent_28%)]" />
      </motion.div>

      {/* Fine civic grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-mint-soft,#2D6A4F) 1px, transparent 1px), linear-gradient(90deg, var(--color-mint-soft,#2D6A4F) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}
      />

      {/* Ambient floating objects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
        <FloatingOrb
          size={320}
          variant="jungle"
          className="-left-28 -top-24"
        />

        <FloatingOrb
          size={270}
          variant="mint"
          className="-right-24 top-[28%]"
          delay={1}
        />

        <FloatingOrb
          size={230}
          variant="jungle"
          className="left-[34%] -bottom-28"
          delay={2}
        />

        <FloatingParticle
          className="left-[6%] top-[24%] h-2.5 w-2.5"
          delay={0.2}
          duration={5.5}
        />

        <FloatingParticle
          className="left-[42%] top-[12%] h-2 w-2"
          delay={1.1}
          duration={6.8}
        />

        <FloatingParticle
          className="right-[12%] top-[20%] h-3 w-3"
          delay={0.6}
          duration={5.2}
        />

        <FloatingParticle
          className="right-[36%] bottom-[12%] h-2 w-2"
          delay={1.8}
          duration={7.2}
        />

        <FloatingDiamond
          className="left-[3%] top-[52%]"
          size={25}
          delay={0.4}
        />

        <FloatingDiamond
          className="right-[5%] top-[40%]"
          size={35}
          delay={1.3}
        />

        <FloatingDiamond
          className="right-[32%] bottom-[7%]"
          size={18}
          delay={2}
        />

        <OrbitRing
          className="-right-28 -top-24 h-80 w-80"
          duration={48}
        />

        <OrbitRing
          className="-right-2 top-[22%] h-52 w-52"
          duration={34}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.65, ease }}
          className="mb-9 flex flex-col gap-6 sm:mb-11 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5">
              <Eyebrow>Leadership</Eyebrow>

              <span
                aria-hidden="true"
                className="h-px w-9 bg-[var(--color-mint-bright,#52B788)]/40"
              />

              <Sparkles className="h-3.5 w-3.5 text-[var(--color-mint-bright,#52B788)]" />
            </div>

            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight text-[var(--color-savanna-deep,#1B4332)] sm:text-4xl lg:text-5xl">
              Who leads{" "}
              <span className="relative inline-block">
                the party.
                <motion.span
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 h-1 w-full origin-left rounded-full bg-[var(--color-mint-bright,#52B788)]/35"
                  initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                  whileInView={reduceMotion ? undefined : { scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                    ease,
                  }}
                />
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-ink-soft,#64748B)] sm:text-base">
              Dedicated representatives driving institutional reform, party
              integrity, and public accountability.
            </p>
          </div>

          <motion.div
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scale: 1.025,
                    y: -2,
                  }
            }
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
            className="shrink-0"
          >
            <Button
              href="/leadership"
              variant="secondary"
              className="group inline-flex items-center gap-2 rounded-xl shadow-2xs"
            >
              <span>Full directory</span>

              <ShieldCheck className="h-4 w-4 text-[var(--color-mint-soft,#2D6A4F)] transition-transform duration-300 group-hover:scale-110" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Leadership intelligence rail */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scaleX: 0.96 }}
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  scaleX: 1,
                }
          }
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="mb-6 flex items-center gap-4 rounded-xl border border-[var(--color-paper-line,#E5E7EB)] bg-[var(--color-paper-raised,#F4F1EA)]/55 px-4 py-3 backdrop-blur-sm sm:px-5"
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_12px_rgba(82,183,136,0.5)]" />

            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--color-ink-soft,#64748B)]/70">
              Leadership network
            </span>
          </div>

          <span className="h-px flex-1 bg-[var(--color-paper-line,#E5E7EB)]" />

          <div className="hidden items-center gap-2 sm:flex">
            <Network
              size={13}
              className="text-[var(--color-mint-soft,#2D6A4F)]"
            />

            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-ink-soft,#64748B)]/60">
              Public directory
            </span>
          </div>
        </motion.div>

        {/* Profiles */}
        <motion.div
          variants={reduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-70px" }}
          className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.id || profile.slug}
              variants={reduceMotion ? undefined : cardVariants}
              className="min-w-0"
            >
              <Link
                href={`/leadership/${profile.slug}`}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper-raised,#F4F1EA)]/65 p-4 shadow-2xs backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--color-mint-bright,#52B788)]/55 hover:bg-[var(--color-paper,#FAF9F6)] hover:shadow-xl sm:p-5"
              >
                <CornerBrackets />

                {/* Card glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(82,183,136,0.16),transparent_68%)] opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* Card grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-[0.035]"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--color-mint-soft,#2D6A4F) 1px, transparent 1px), linear-gradient(90deg, var(--color-mint-soft,#2D6A4F) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />

                <div className="relative z-10">
                  {/* Profile image / identity area */}
                  <div className="group/image relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-[var(--color-mint-bright,#52B788)]/15 bg-[var(--color-savanna-deep,#1B4332)]/10">
                    {/* Soft background image layer */}
                    <div
  aria-hidden="true"
  className="absolute inset-0 bg-cover bg-center opacity-[0.9] transition-all duration-700 group-hover:opacity-[1]"
  style={{
    backgroundImage:
      "url('https://dcphazina.com/icon0.svg?icon0.98f36649.svg')",
  }}
/>

                    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(244,241,234,0.7),rgba(27,67,50,0.16))]" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={
                          reduceMotion
                            ? undefined
                            : {
                                y: [0, -5, 0],
                                scale: [1, 1.04, 1],
                              }
                        }
                        transition={
                          reduceMotion
                            ? undefined
                            : {
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.4,
                              }
                        }
                        className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper,#FAF9F6)]/50 shadow-sm backdrop-blur-md"
                      >
                        <UserCircle2
                          className="h-14 w-14 text-[var(--color-mint-soft,#2D6A4F)]/65 transition-all duration-500 group-hover:scale-110 group-hover:text-[var(--color-mint-bright,#52B788)]"
                          strokeWidth={1.15}
                        />

                        <span className="absolute -right-1 top-1/2 h-2.5 w-2.5 rounded-full bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_14px_rgba(82,183,136,0.55)]" />
                      </motion.div>
                    </div>

                    {/* Image scan line */}
                    <motion.div
                      aria-hidden="true"
                      className="absolute left-0 right-0 h-px bg-[var(--color-mint-bright,#52B788)]/45 opacity-0 group-hover:opacity-100"
                      initial={{ top: "10%" }}
                      whileHover={{ top: "90%" }}
                      transition={{
                        duration: 1.1,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Image metadata */}
                    <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-savanna-deep,#1B4332)]/55 px-2.5 py-1.5 backdrop-blur-md">
                      <ScanLine
                        size={11}
                        className="text-[var(--color-mint-bright,#52B788)]"
                      />

                      <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/80">
                        Profile
                      </span>
                    </div>

                    {/* Arrow */}
                    <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-mint-bright,#52B788)]/30 bg-[var(--color-savanna-deep,#1B4332)]/65 text-[var(--color-mint-bright,#52B788)] opacity-80 backdrop-blur-md transition-all duration-300 group-hover:border-[var(--color-mint-bright,#52B788)] group-hover:bg-[var(--color-mint-bright,#52B788)] group-hover:text-[var(--color-savanna-deep,#1B4332)] group-hover:opacity-100">
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    {/* Bottom image line */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--color-savanna-deep,#1B4332)]/25 to-transparent opacity-70" />
                  </div>

                  {/* Details */}
                  <div className="mt-4 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-mint-soft,#2D6A4F)]">
                        0{index + 1} // Official
                      </span>

                      <Fingerprint
                        size={13}
                        className="text-[var(--color-mint-bright,#52B788)]/45 transition-colors duration-300 group-hover:text-[var(--color-mint-bright,#52B788)]"
                      />
                    </div>

                    <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-[var(--color-ink,#1A1A1A)] transition-colors duration-300 group-hover:text-[var(--color-savanna-deep,#1B4332)] sm:text-xl">
                      {profile.name}
                    </h3>

                    <p className="text-xs leading-relaxed text-[var(--color-ink-soft,#64748B)] sm:text-sm">
                      {profile.role}
                    </p>
                  </div>
                </div>

                {/* Status footer */}
                <div className="relative z-10 mt-5 flex items-center justify-between border-t border-[var(--color-mint-bright,#52B788)]/15 pt-3.5">
                  <VerificationBadge status={profile.verificationStatus} />

                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-[var(--color-ink-soft,#64748B)]/40 transition-colors duration-300 group-hover:text-[var(--color-mint-soft,#2D6A4F)]">
                    View
                  </span>
                </div>

                {/* Hover beam */}
                <motion.span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[var(--color-savanna-deep,#1B4332)] to-[var(--color-mint-bright,#52B788)]"
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.45, ease }}
                />

                {/* Floating corner node */}
                <motion.span
                  aria-hidden="true"
                  className="absolute bottom-5 right-5 h-2 w-2 rounded-full bg-[var(--color-mint-bright,#52B788)]/50 opacity-0 shadow-[0_0_14px_rgba(82,183,136,0.45)] transition-opacity duration-300 group-hover:opacity-100"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.5, 1],
                          opacity: [0.35, 0.9, 0.35],
                        }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          duration: 2.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom civic network rail */}
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
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--color-paper-line,#E5E7EB)] bg-[var(--color-paper-raised,#F4F1EA)]/55 px-4 py-4 backdrop-blur-sm sm:px-5"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper,#FAF9F6)] text-[var(--color-mint-soft,#2D6A4F)]">
              <Network size={16} strokeWidth={1.6} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,#52B788)]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink,#1A1A1A)]">
                  Public leadership network
                </span>
              </div>

              <p className="mt-0.5 text-[11px] text-[var(--color-ink-soft,#64748B)]">
                Explore verified profiles and organizational roles.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--color-ink-soft,#64748B)]/55 sm:inline">
              Skiza mwananchi
            </span>

            <span className="h-px w-8 bg-[var(--color-mint-bright,#52B788)]/35" />

            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--color-mint-soft,#2D6A4F)]">
              DCP / 04
            </span>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}