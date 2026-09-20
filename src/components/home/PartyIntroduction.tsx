"use client";

import { useRef } from "react";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { Section } from "@/components/layout/PageContainer";

import { Eyebrow } from "@/components/ui/Eyebrow";

import { VerificationBadge } from "@/components/ui/VerificationBadge";

import { Button } from "@/components/ui/Button";

import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Fingerprint,
  Network,
  Quote,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

function FloatingOrb({
  className = "",
  size = 200,
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
      className={`pointer-events-none absolute rounded-full bg-[radial-gradient(circle,rgba(82,183,136,0.16)_0%,rgba(45,106,79,0.06)_40%,transparent_72%)] blur-2xl ${className}`}
      style={{ width: size, height: size }}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: [1, 1.18, 1],
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
      className={`pointer-events-none absolute block rounded-full bg-[var(--color-mint-bright,#1b4332)]/40 blur-[1px] ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -16, 0],
              x: [0, 6, 0],
              opacity: [0.2, 0.8, 0.2],
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
  delay = 0,
  size = 28,
}: {
  className?: string;
  delay?: number;
  size?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rotate-45 rounded-md border border-[var(--color-mint-bright,#1b4332)]/20 bg-[var(--color-paper,#FAF9F6)]/20 backdrop-blur-sm ${className}`}
      style={{ width: size, height: size }}
      animate={
        reduceMotion
          ? undefined
          : {
              rotate: [45, 135, 45],
              y: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3],
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
      className={`pointer-events-none absolute rounded-full border border-[var(--color-mint-bright,#1b4332)]/10 ${className}`}
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
      <span className="absolute -right-1.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[var(--color-mint-bright,#1b4332)]/70 shadow-[0_0_18px_rgba(82,183,136,0.4)]" />
    </motion.div>
  );
}

function CornerBrackets() {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-7 w-7 border-l border-t border-[var(--color-mint-bright,#1b4332)]/20"
      />
      <span
        aria-hidden="true"
        className="absolute right-0 top-0 h-7 w-7 border-r border-t border-[var(--color-mint-bright,#1b4332)]/20"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-7 w-7 border-b border-l border-[var(--color-mint-bright,#1b4332)]/20"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-7 w-7 border-b border-r border-[var(--color-mint-bright,#1b4332)]/20"
      />
    </>
  );
}

export function PartyIntroduction() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 22,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease,
      },
    },
  };

  return (
    <Section
      border={false}
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
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
                  y: imageY,
                  scale: imageScale,
                }
          }
          className="absolute inset-[-5%]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[0.055]"
            style={{
              backgroundImage:
                "url('https://peopledaily.digital/wp-content/uploads/2025/06/Screenshot-2025-06-07-063753-768x528.png')",
            }}
          />
        </motion.div>

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-paper,#FAF9F6),transparent_22%,transparent_78%,var(--color-paper,#FAF9F6))]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_40%,rgba(82,183,136,0.09),transparent_32%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_60%,rgba(45,106,79,0.06),transparent_28%)]" />
      </motion.div>

      {/* Fine background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-mint-soft,#2D6A4F) 1px, transparent 1px), linear-gradient(90deg, var(--color-mint-soft,#2D6A4F) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
        }}
      />

      {/* Ambient floating system */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
        <FloatingOrb size={300} className="-left-24 -top-20" />
        <FloatingOrb size={250} className="-right-20 bottom-0" delay={1.2} />

        <FloatingParticle
          className="left-[7%] top-[22%] h-2.5 w-2.5"
          delay={0.2}
          duration={5.5}
        />
        <FloatingParticle
          className="left-[38%] top-[12%] h-2 w-2"
          delay={1.1}
          duration={6.8}
        />
        <FloatingParticle
          className="right-[14%] top-[24%] h-3 w-3"
          delay={0.6}
          duration={5.2}
        />
        <FloatingParticle
          className="right-[28%] bottom-[18%] h-2 w-2"
          delay={1.8}
          duration={7.2}
        />

        <FloatingDiamond
          className="left-[4%] top-[48%]"
          delay={0.4}
          size={24}
        />

        <FloatingDiamond
          className="right-[6%] top-[18%]"
          delay={1.4}
          size={34}
        />

        <FloatingDiamond
          className="right-[38%] bottom-[10%]"
          delay={2}
          size={18}
        />

        <OrbitRing
          className="-right-28 top-1/2 h-80 w-80"
          duration={48}
        />

        <OrbitRing
          className="-right-8 top-1/2 h-56 w-56"
          duration={34}
        />

        <motion.div
          aria-hidden="true"
          className="absolute left-[48%] top-10 h-20 w-20 rounded-full border border-[var(--color-mint-bright,#1b4332)]/10"
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.08, 1],
                  rotate: 360,
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  scale: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotate: {
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }
          }
        />
      </div>

      <motion.div
        variants={reduceMotion ? undefined : containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 grid gap-10 md:grid-cols-12 md:items-center lg:gap-14"
      >
        {/* Left editorial column */}
        <motion.div
          variants={reduceMotion ? undefined : itemVariants}
          className="relative flex flex-col items-start md:col-span-5"
        >
          <div className="flex items-center gap-3">
            <Eyebrow>Who we are</Eyebrow>

            <span
              aria-hidden="true"
              className="h-px w-10 bg-[var(--color-mint-bright,#1b4332)]/35"
            />

            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : {
                      rotate: [0, 12, -12, 0],
                      scale: [1, 1.08, 1],
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
              <Sparkles className="h-4 w-4 text-[var(--color-mint-bright,#1b4332)]" />
            </motion.div>
          </div>

          <h2 className="mt-5 max-w-xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-[var(--color-ink,#1A1A1A)] sm:text-4xl lg:text-5xl">
            An organization built around{" "}
            <span className="relative inline-block text-[var(--color-savanna-deep,#1B4332)]">
              citizen participation
              <motion.span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-1 w-full origin-left rounded-full bg-[var(--color-mint-bright,#1b4332)]/40"
                initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                whileInView={reduceMotion ? undefined : { scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.3, ease }}
              />
            </span>
            .
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-7 text-[var(--color-ink-soft,#1b4332)] sm:text-base">
            A closer look at the ideas, people, structures, and public purpose
            behind the organization.
          </p>

          {/* Editorial metadata */}
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,#1b4332)] shadow-[0_0_12px_rgba(82,183,136,0.45)]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--color-ink-soft,#1b4332)]/70">
                Citizen first
              </span>
            </div>

            <span className="h-3 w-px bg-[var(--color-paper-line,#1b4332)]" />

            <div className="flex items-center gap-2">
              <Fingerprint
                size={13}
                className="text-[var(--color-mint-soft,#2D6A4F)]"
              />
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--color-ink-soft,#1b4332)]/70">
                Public identity
              </span>
            </div>
          </div>

          {/* Floating visual marker */}
          <motion.div
            aria-hidden="true"
            className="absolute -bottom-8 right-4 hidden h-14 w-14 rounded-full border border-[var(--color-mint-bright,#1b4332)]/15 bg-[var(--color-paper,#FAF9F6)]/50 backdrop-blur-md lg:block"
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -9, 0],
                    rotate: [0, 180, 360],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    y: {
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: 18,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }
            }
          >
            <div className="absolute inset-2 rounded-full border border-[var(--color-mint-bright,#1b4332)]/15" />
            <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-mint-bright,#1b4332)]" />
          </motion.div>
        </motion.div>

        {/* Right statement panel */}
        <motion.div
          variants={reduceMotion ? undefined : itemVariants}
          className="relative md:col-span-7"
        >
          <div className="relative overflow-hidden rounded-3xl border border-[var(--color-paper-line,#1b4332)] bg-[var(--color-paper,#FAF9F6)]/85 p-5 shadow-sm backdrop-blur-md transition-all duration-500 hover:border-[var(--color-mint-bright,#1b4332)]/35 hover:shadow-xl sm:p-7 lg:p-8">
            <CornerBrackets />

            {/* Card background image */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.25, ease }}
            >
              <div
  className="absolute inset-0 bg-cover bg-center opacity-30" // or opacity-40, opacity-50
  style={{
    backgroundImage:
      "url('/images/dcp-lead.jpeg')",
  }}
/>

              <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-paper,#FAF9F6)_5%,transparent_50%,var(--color-paper-raised,#F4F1EA)_100%)]" />
            </motion.div>

            {/* Card ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(82,183,136,0.16),transparent_68%)] blur-2xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-24 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(45,106,79,0.1),transparent_70%)] blur-2xl"
            />

            {/* Header */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-paper-line,#1b4332)]/80 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-paper-line,#1b4332)] bg-[var(--color-paper-raised,#F4F1EA)] text-[var(--color-mint-soft,#2D6A4F)]">
                  <ShieldCheck size={18} strokeWidth={1.7} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink,#1A1A1A)]">
                    Official Governance Statement
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,#1b4332)]" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-ink-soft,#1b4332)]/60">
                      Public reference
                    </span>
                  </div>
                </div>
              </div>

              <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--color-ink-soft,#1b4332)]/45">
                DCP / 01
              </span>
            </div>

            {/* Statement */}
            <div className="relative z-10 mt-6">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-mint-bright,#1b4332)]/15 bg-[var(--color-paper-raised,#F4F1EA)] text-[var(--color-mint-soft,#2D6A4F)]">
                <Quote size={15} />
              </div>

              <p className="max-w-prose text-base leading-7 text-[var(--color-ink-soft,#1b4332)] sm:text-[17px]">
                DCP is a citizen-centred political party committed to listening, justice, accountability, inclusion, unity and national progress. Our symbol, the listening ear, is our promise to every Kenyan: your voice will shape the future of this nation..
              </p>

              <p className="mt-4 max-w-prose text-sm leading-6 text-[var(--color-ink-soft,#1b4332)]/85 sm:text-base">
                Our symbol is a listening ear, a daily reminder that the DCP exists to hear Wakenya first and act second. Every policy we advance begins with listening.
              </p>
            </div>

            {/* Action bar */}
            <div className="relative z-10 mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-paper-line,#1b4332)]/80 pt-5">
              <VerificationBadge status="placeholder" />

              <motion.div
                whileHover={reduceMotion ? undefined : { x: 3 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              >
                <Button
                  href="/about"
                  variant="ghost"
                  className="group inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-[var(--color-savanna-deep,#1B4332)] transition-all duration-200 hover:bg-[var(--color-paper-raised,#F4F1EA)] hover:text-[var(--color-mint-soft,#2D6A4F)]"
                >
                  <span>Read the full story</span>

                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>

            {/* Bottom signal line */}
            <motion.div
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-0.5 bg-[var(--color-mint-bright,#1b4332)]"
              initial={{ width: "0%" }}
              whileInView={{ width: "42%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease }}
            />
          </div>

          {/* Floating side marker */}
          <motion.div
            aria-hidden="true"
            className="absolute -right-3 top-12 hidden h-16 w-16 rounded-2xl border border-[var(--color-mint-bright,#1b4332)]/15 bg-[var(--color-paper,#FAF9F6)]/60 shadow-sm backdrop-blur-md lg:flex lg:items-center lg:justify-center"
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -8, 0],
                    rotate: [0, 4, -4, 0],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          >
            <div className="h-8 w-8 rounded-lg border border-[var(--color-mint-bright,#1b4332)]/20 p-2">
              <div className="h-full w-full rounded-full border border-[var(--color-mint-soft,#2D6A4F)]/30" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Lower civic divider */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scaleX: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
        className="relative z-10 mx-auto mt-10 flex max-w-5xl items-center gap-4 sm:mt-12"
      >
        <span className="h-px flex-1 bg-[var(--color-paper-line,#1b4332)]" />

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,#1b4332)]" />
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--color-ink-soft,#1b4332)]/55">
            Skiza mwananchi
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,#1b4332)]/40" />
        </div>

        <span className="h-px flex-1 bg-[var(--color-paper-line,#1b4332)]" />
      </motion.div>
    </Section>
  );
}