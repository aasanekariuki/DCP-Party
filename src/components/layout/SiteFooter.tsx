"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { footerNav } from "@/data/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import {
  ArrowUpRight,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
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
      "bg-[radial-gradient(circle,rgba(82,183,136,0.14)_0%,rgba(45,106,79,0.04)_50%,transparent_70%)]",
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
              x: [0, 12, -7, 0],
              y: [0, -16, 8, 0],
              scale: [1, 1.1, 0.96, 1],
              opacity: [0.3, 0.6, 0.4, 0.3],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 11,
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
  size = "h-2 w-2",
  variant = "mint",
}: {
  delay?: number;
  duration?: number;
  className?: string;
  size?: string;
  variant?: "mint" | "jungle";
}) {
  const reduceMotion = useReducedMotion();

  const colors = {
    mint: "bg-[var(--color-mint-bright,#52B788)]",
    jungle: "bg-[var(--color-savanna-deep,#1B4332)]",
  };

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${colors[variant]} shadow-[0_0_14px_rgba(82,183,136,0.35)] ${size} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              x: [0, 8, -5, 0],
              y: [0, -17, 7, 0],
              opacity: [0.15, 0.8, 0.25, 0.15],
              scale: [0.75, 1.25, 0.9, 0.75],
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
  size = 16,
  delay = 0,
}: {
  className?: string;
  size?: number;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute rotate-45 border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-paper,#FAF9F6)]/25 backdrop-blur-sm ${className}`}
      style={{
        width: size,
        height: size,
      }}
      animate={
        reduceMotion
          ? undefined
          : {
              rotate: [45, 135, 45],
              y: [0, -10, 0],
              opacity: [0.25, 0.7, 0.25],
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

function OrbitDecoration() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[4%] top-8 hidden h-40 w-40 lg:block"
    >
      <motion.div
        className="absolute inset-0 rounded-full border border-[var(--color-mint-bright,#52B788)]/15"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 24,
                repeat: Infinity,
                ease: "linear",
              }
        }
      />

      <motion.div
        className="absolute inset-5 rounded-full border border-dashed border-[var(--color-savanna-deep,#1B4332)]/15"
        animate={reduceMotion ? undefined : { rotate: -360 }}
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

      <motion.span
        className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_18px_rgba(82,183,136,0.55)]"
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, 8, 0],
                scale: [1, 1.3, 1],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />

      <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper,#FAF9F6)]/75 shadow-md backdrop-blur-md">
        <ShieldCheck className="h-4 w-4 text-[var(--color-mint-soft,#2D6A4F)]" />
      </div>
    </div>
  );
}

function CornerBrackets() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l border-t border-[var(--color-mint-bright,#52B788)]/25 transition-all duration-500 group-hover:h-7 group-hover:w-7 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-5 w-5 border-r border-t border-[var(--color-mint-bright,#52B788)]/25 transition-all duration-500 group-hover:h-7 group-hover:w-7 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b border-l border-[var(--color-mint-bright,#52B788)]/25 transition-all duration-500 group-hover:h-7 group-hover:w-7 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b border-r border-[var(--color-mint-bright,#52B788)]/25 transition-all duration-500 group-hover:h-7 group-hover:w-7 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
    </>
  );
}

function AnimatedBeam() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-px overflow-hidden bg-[var(--color-mint-bright,#52B788)]/10"
    >
      <motion.span
        className="absolute left-0 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-[var(--color-mint-bright,#52B788)]/75 to-transparent"
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["-120%", "520%"],
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
      />
    </div>
  );
}

export function SiteFooter() {
  const reduceMotion = useReducedMotion();
  const footerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useSpring(
    useTransform(scrollYProgress, [0, 1], [-20, 20]),
    {
      stiffness: 70,
      damping: 20,
      mass: 0.8,
    },
  );

  const backgroundScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.03, 1.08, 1.03],
  );

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
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
    <footer
      ref={footerRef}
      className="relative mt-auto overflow-hidden border-t border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper-raised,#F4F1EA)]/95 backdrop-blur-md"
    >
      <AnimatedBeam />

      {/* Background image atmosphere */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={
          reduceMotion
            ? undefined
            : {
                y: backgroundY,
                scale: backgroundScale,
              }
        }
      >
        <div
          className="absolute -inset-10 bg-cover bg-center opacity-[0.035] mix-blend-multiply"
          style={{
            backgroundImage:
              "url('https://peopledaily.digital/wp-content/uploads/2025/06/Screenshot-2025-06-07-063753-768x528.png')",
          }}
        />

        <div className="absolute inset-0 bg-[var(--color-paper-raised,#F4F1EA)]/92" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(27,67,50,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(27,67,50,0.035)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]" />
      </motion.div>

      {/* Ambient atmosphere */}
      <FloatingOrb
        size={350}
        variant="jungle"
        className="-left-32 -top-28"
      />

      <FloatingOrb
        size={300}
        variant="mint"
        delay={1.2}
        className="-right-28 bottom-[-100px]"
      />

      <FloatingOrb
        size={230}
        variant="mint"
        delay={2}
        className="left-[40%] top-[-120px]"
      />

      {/* Floating particles */}
      <FloatingParticle
        variant="jungle"
        className="left-[7%] top-[24%]"
        delay={0.2}
        duration={5.5}
        size="h-2.5 w-2.5"
      />

      <FloatingParticle
        className="left-[28%] top-[17%]"
        delay={1.2}
        duration={6.7}
        size="h-1.5 w-1.5"
      />

      <FloatingParticle
        className="right-[13%] top-[30%]"
        delay={0.8}
        duration={6.2}
        size="h-2 w-2"
      />

      <FloatingParticle
        variant="jungle"
        className="right-[27%] bottom-[20%]"
        delay={1.7}
        duration={7}
        size="h-1.5 w-1.5"
      />

      <FloatingParticle
        className="left-[52%] bottom-[10%]"
        delay={0.5}
        duration={5.8}
        size="h-2 w-2"
      />

      <FloatingDiamond
        className="left-[15%] top-[11%]"
        delay={0.4}
        size={14}
      />

      <FloatingDiamond
        className="right-[19%] top-[53%]"
        delay={1.4}
        size={12}
      />

      <FloatingDiamond
        className="bottom-[13%] left-[43%]"
        delay={2}
        size={17}
      />

      <OrbitDecoration />

      <PageContainer className="relative z-10 py-12 sm:py-14 lg:py-16">
        <motion.div
          variants={reduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-60px",
          }}
          className="grid gap-9 sm:grid-cols-2 md:grid-cols-5 md:gap-8 lg:gap-10"
        >
          {/* Brand panel */}
          <motion.div
            variants={reduceMotion ? undefined : itemVariants}
            className="group relative md:col-span-2"
          >
            <div className="relative overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/15 bg-[var(--color-paper,#FAF9F6)]/50 p-5 shadow-sm backdrop-blur-md sm:p-6">
              <CornerBrackets />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-[var(--color-mint-bright,#52B788)]/8 blur-3xl transition-transform duration-700 group-hover:scale-150"
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 rounded-full bg-[var(--color-savanna-deep,#1B4332)]/5 blur-2xl"
              />

              {/* Brand */}
              <Link
                href="/"
                aria-label="DCP Kenya home"
                className="relative z-10 flex w-fit items-center gap-3"
              >
                <motion.div
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          scale: 1.06,
                          rotate: -4,
                        }
                  }
                  whileTap={
                    reduceMotion
                      ? undefined
                      : {
                          scale: 0.96,
                        }
                  }
                  transition={{
                    duration: 0.3,
                    ease,
                  }}
                  className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--color-mint-bright,#52B788)]/40 bg-[var(--color-savanna-deep,#1B4332)] font-display text-base font-bold text-white shadow-md"
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-[var(--color-mint-bright,#52B788)]/20 to-transparent" />
                  <span className="relative">D</span>
                </motion.div>

                <div className="flex flex-col">
                  <span className="font-display text-xl font-bold tracking-tight text-[var(--color-savanna-deep,#1B4332)] transition-colors duration-300 group-hover:text-[var(--color-mint-soft,#2D6A4F)]">
                    DCP Kenya
                  </span>

                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-mint-soft,#2D6A4F)]">
                    Civic Platform
                  </span>
                </div>
              </Link>

              {/* Description */}
              <p className="relative z-10 mt-5 max-w-sm text-sm leading-6 text-[var(--color-ink-soft,#64748B)]">
                A civic platform for exploring identity, leadership, public
                priorities, and information.
              </p>

              {/* Status chips */}
              <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper-raised,#F4F1EA)]/70 px-3 py-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-mint-bright,#52B788)]/40" />
                    <span className="relative h-2 w-2 rounded-full bg-[var(--color-mint-bright,#52B788)]" />
                  </span>

                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--color-mint-soft,#2D6A4F)]">
                    Public information
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-savanna-deep,#1B4332)]/10 bg-[var(--color-paper,#FAF9F6)]/50 px-3 py-1.5">
                  <Sparkles className="h-3 w-3 text-[var(--color-mint-bright,#52B788)]" />

                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--color-ink-soft,#64748B)]">
                    Skiza mwananchi
                  </span>
                </div>
              </div>

              {/* Explore link */}
              <div className="relative z-10 mt-5 flex items-center gap-3 border-t border-[var(--color-mint-bright,#52B788)]/10 pt-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-ink-soft,#64748B)]">
                  Explore
                </span>

                <span className="h-px w-7 bg-[var(--color-mint-bright,#52B788)]/25" />

                <Link
                  href="/about"
                  className="group/about inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-savanna-deep,#1B4332)]"
                >
                  About DCP
                  <ArrowUpRight className="h-3 w-3 text-[var(--color-mint-bright,#52B788)] transition-transform duration-300 group-hover/about:translate-x-0.5 group-hover/about:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Navigation columns */}
          {footerNav.map((group, groupIndex) => (
            <motion.div
              key={group.label}
              variants={reduceMotion ? undefined : itemVariants}
              className="flex min-w-0 flex-col"
            >
              <div className="mb-3 flex items-center gap-2 border-b border-[var(--color-mint-bright,#52B788)]/15 pb-2.5">
                <motion.span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_8px_rgba(82,183,136,0.45)]"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.35, 1],
                          opacity: [0.5, 1, 0.5],
                        }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          duration: 2.8,
                          delay: groupIndex * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                />

                <p className="font-display text-sm font-bold tracking-tight text-[var(--color-savanna-deep,#1B4332)]">
                  {group.label}
                </p>

                <Sparkles className="h-3 w-3 text-[var(--color-mint-bright,#52B788)]/55" />
              </div>

              <ul className="flex flex-col gap-2.5">
                {group.children?.map((child) => (
                  <li key={child.label}>
                    <Link
                      href={child.href}
                      className="group/link inline-flex w-fit items-center gap-1.5 text-xs font-medium text-[var(--color-ink-soft,#64748B)] transition-colors duration-200 hover:text-[var(--color-savanna-deep,#1B4332)]"
                    >
                      <span className="h-px w-0 bg-[var(--color-mint-bright,#52B788)] transition-all duration-300 group-hover/link:w-2" />

                      <span className="transition-transform duration-300 group-hover/link:translate-x-0.5">
                        {child.label}
                      </span>

                      <ArrowUpRight className="h-3 w-3 -translate-x-1 text-[var(--color-mint-bright,#52B788)] opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer information strip */}
        <motion.div
          initial={
            reduceMotion
              ? undefined
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
            duration: 0.55,
            delay: 0.15,
            ease,
          }}
          className="mt-9 overflow-hidden rounded-xl border border-[var(--color-mint-bright,#52B788)]/12 bg-[var(--color-paper,#FAF9F6)]/35 backdrop-blur-sm sm:mt-10"
        >
          <div className="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-mint-soft,#2D6A4F)]" />

              <p className="text-[11px] leading-5 text-[var(--color-ink-soft,#64748B)]">
                This platform is an independent civic information resource.
              </p>
            </div>

            <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-mint-soft,#2D6A4F)]">
              Transparency first
            </span>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                }
          }
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                }
          }
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="mt-8 border-t border-[var(--color-mint-bright,#52B788)]/15 pt-5 sm:mt-9"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Copyright */}
            <div className="flex items-center gap-2.5 font-mono text-[10px] text-[var(--color-ink-soft,#64748B)]">
              <motion.div
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        rotate: -8,
                        scale: 1.08,
                      }
                }
                transition={{
                  duration: 0.25,
                  ease,
                }}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[var(--color-mint-bright,#52B788)]/15 bg-[var(--color-paper,#FAF9F6)]/60"
              >
                <HeartHandshake className="h-3.5 w-3.5 text-[var(--color-mint-soft,#2D6A4F)]" />
              </motion.div>

              <p>
                &copy; {new Date().getFullYear()} DCP Kenya. Unofficial.
              </p>
            </div>

            {/* Legal links */}
            <nav
              aria-label="Legal navigation"
              className="flex flex-wrap items-center gap-x-5 gap-y-2.5 font-mono text-[10px] text-[var(--color-ink-soft,#64748B)]"
            >
              <Link
                href="/privacy"
                className="transition-colors duration-200 hover:text-[var(--color-savanna-deep,#1B4332)] hover:underline"
              >
                Privacy Policy
              </Link>

              <Link
                href="/accessibility"
                className="transition-colors duration-200 hover:text-[var(--color-savanna-deep,#1B4332)] hover:underline"
              >
                Accessibility
              </Link>

              <Link
                href="/terms"
                className="transition-colors duration-200 hover:text-[var(--color-savanna-deep,#1B4332)] hover:underline"
              >
                Terms of Service
              </Link>
            </nav>
          </div>

          {/* Final visual signature */}
          <div className="mt-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--color-mint-bright,#52B788)]/20 to-transparent" />

            <motion.div
              aria-hidden="true"
              className="flex items-center gap-1.5"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: [0.45, 1, 0.45],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            >
              <span className="h-1 w-1 rounded-full bg-[var(--color-mint-bright,#52B788)]" />
              <span className="h-1 w-5 rounded-full bg-[var(--color-mint-bright,#52B788)]/35" />
              <span className="h-1 w-1 rounded-full bg-[var(--color-savanna-deep,#1B4332)]/35" />
            </motion.div>

            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--color-mint-bright,#52B788)]/20 to-transparent" />
          </div>
        </motion.div>
      </PageContainer>
    </footer>
  );
}