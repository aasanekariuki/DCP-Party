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
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { Button } from "@/components/ui/Button";
import { getNewsArticles } from "@/data/news";
import {
  ArrowUpRight,
  Calendar,
  Globe2,
  Newspaper,
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
  variant?: "jungle" | "mint" | "soft";
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  const gradients = {
    jungle:
      "bg-[radial-gradient(circle,rgba(27,67,50,0.18)_0%,rgba(45,106,79,0.07)_48%,transparent_72%)]",
    mint:
      "bg-[radial-gradient(circle,rgba(82,183,136,0.16)_0%,rgba(45,106,79,0.05)_48%,transparent_72%)]",
    soft:
      "bg-[radial-gradient(circle,rgba(82,183,136,0.09)_0%,rgba(244,241,234,0.02)_48%,transparent_72%)]",
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
              x: [0, 10, -5, 0],
              y: [0, -16, 8, 0],
              scale: [1, 1.08, 0.96, 1],
              opacity: [0.35, 0.58, 0.42, 0.35],
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
}: {
  delay?: number;
  duration?: number;
  className?: string;
  size?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full bg-[var(--color-mint-bright,#52B788)]/45 shadow-[0_0_16px_rgba(82,183,136,0.28)] ${size} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              x: [0, 8, -4, 0],
              y: [0, -18, 6, 0],
              opacity: [0.15, 0.8, 0.3, 0.15],
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
  delay = 0,
  size = 18,
}: {
  className?: string;
  delay?: number;
  size?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rotate-45 border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-paper,#FAF9F6)]/20 backdrop-blur-sm ${className}`}
      style={{ width: size, height: size }}
      animate={
        reduceMotion
          ? undefined
          : {
              rotate: [45, 135, 45],
              y: [0, -10, 0],
              opacity: [0.35, 0.8, 0.35],
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

function OrbitSystem() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[4%] top-[10%] hidden h-40 w-40 opacity-70 lg:block"
    >
      <motion.div
        className="absolute inset-0 rounded-full border border-[var(--color-mint-bright,#52B788)]/15"
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
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }
        }
      />

      <motion.div
        className="absolute inset-5 rounded-full border border-dashed border-[var(--color-savanna-deep,#1B4332)]/15"
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
                duration: 28,
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

      <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper,#FAF9F6)]/70 shadow-lg backdrop-blur-md">
        <Globe2 className="h-4 w-4 text-[var(--color-mint-soft,#2D6A4F)]" />
      </div>
    </div>
  );
}

function CornerBrackets() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-[var(--color-mint-bright,#52B788)]/25 transition-all duration-500 group-hover:h-7 group-hover:w-7 group-hover:border-[var(--color-mint-bright,#52B788)]/65"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-[var(--color-mint-bright,#52B788)]/25 transition-all duration-500 group-hover:h-7 group-hover:w-7 group-hover:border-[var(--color-mint-bright,#52B788)]/65"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-[var(--color-mint-bright,#52B788)]/25 transition-all duration-500 group-hover:h-7 group-hover:w-7 group-hover:border-[var(--color-mint-bright,#52B788)]/65"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-[var(--color-mint-bright,#52B788)]/25 transition-all duration-500 group-hover:h-7 group-hover:w-7 group-hover:border-[var(--color-mint-bright,#52B788)]/65"
      />
    </>
  );
}

function SignalRail() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="absolute bottom-8 left-5 top-8 hidden w-px bg-gradient-to-b from-transparent via-[var(--color-mint-bright,#52B788)]/25 to-transparent sm:block"
    >
      <motion.span
        className="absolute left-1/2 top-0 h-10 w-0.5 -translate-x-1/2 bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_12px_rgba(82,183,136,0.55)]"
        animate={
          reduceMotion
            ? undefined
            : {
                y: ["0%", "420%"],
                opacity: [0, 1, 0],
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
    </div>
  );
}

export function LatestNews() {
  const reduceMotion = useReducedMotion();
  const articles = getNewsArticles();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useSpring(
    useTransform(scrollYProgress, [0, 1], [-35, 35]),
    {
      stiffness: 70,
      damping: 20,
      mass: 0.8,
    },
  );

  const backgroundScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.05, 1.1, 1.05],
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 28,
      scale: 0.985,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease,
      },
    },
  };

  return (
    <div ref={sectionRef}>
      <Section
        decorated
        animateEntry={false}
        border={false}
        className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      >
      {/* Soft photographic atmosphere */}
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
          className="absolute -inset-10 bg-cover bg-center opacity-[0.055] mix-blend-multiply"
          style={{
            backgroundImage:
              "url('https://peopledaily.digital/wp-content/uploads/2025/06/Screenshot-2025-06-07-063753-768x528.png')",
          }}
        />
        <div className="absolute inset-0 bg-[var(--color-paper,#FAF9F6)]/80" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(27,67,50,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(27,67,50,0.035)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_80%,transparent)]" />
      </motion.div>

      {/* Ambient green atmosphere */}
      <FloatingOrb
        size={330}
        variant="jungle"
        className="-left-28 -top-24"
      />
      <FloatingOrb
        size={280}
        variant="mint"
        delay={1.4}
        className="-right-24 top-1/4"
      />
      <FloatingOrb
        size={300}
        variant="soft"
        delay={0.8}
        className="bottom-[-130px] left-1/3"
      />

      {/* Floating particles */}
      <FloatingParticle
        className="left-[7%] top-[25%]"
        delay={0.2}
        duration={5.5}
        size="h-2.5 w-2.5"
      />
      <FloatingParticle
        className="left-[34%] top-[12%]"
        delay={1.2}
        duration={7}
        size="h-1.5 w-1.5"
      />
      <FloatingParticle
        className="right-[11%] top-[20%]"
        delay={0.9}
        duration={6.5}
        size="h-2 w-2"
      />
      <FloatingParticle
        className="right-[25%] bottom-[18%]"
        delay={1.8}
        duration={5.8}
        size="h-1.5 w-1.5"
      />
      <FloatingParticle
        className="left-[48%] bottom-[8%]"
        delay={0.5}
        duration={6.2}
        size="h-2 w-2"
      />

      <FloatingDiamond
        className="left-[15%] top-[15%]"
        delay={0.4}
        size={14}
      />
      <FloatingDiamond
        className="right-[17%] top-[42%]"
        delay={1.3}
        size={12}
      />
      <FloatingDiamond
        className="bottom-[12%] left-[18%]"
        delay={2}
        size={16}
      />

      <OrbitSystem />

      {/* Header */}
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease }}
        className="relative z-10 mb-9 flex flex-col gap-6 sm:mb-11 md:flex-row md:items-end md:justify-between"
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5">
            <Eyebrow>News</Eyebrow>

            <motion.span
              aria-hidden="true"
              className="h-px w-8 origin-left bg-[var(--color-mint-bright,#52B788)]/45"
              initial={reduceMotion ? undefined : { scaleX: 0 }}
              whileInView={reduceMotion ? undefined : { scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            />

            <Sparkles className="h-3.5 w-3.5 text-[var(--color-mint-bright,#52B788)]" />
          </div>

          <div className="relative mt-3 inline-block">
            <span
              aria-hidden="true"
              className="absolute -inset-x-3 bottom-1 h-3 rounded-full bg-[var(--color-mint-bright,#52B788)]/10 blur-md"
            />

            <h2 className="relative font-display text-3xl font-bold tracking-tight text-[var(--color-savanna-deep,#1B4332)] sm:text-4xl lg:text-5xl">
              Latest{" "}
              <span className="bg-gradient-to-r from-[var(--color-savanna-deep,#1B4332)] via-[var(--color-mint-soft,#2D6A4F)] to-[var(--color-mint-bright,#52B788)] bg-clip-text text-transparent">
                reporting.
              </span>
            </h2>
          </div>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--color-ink-soft,#64748B)] sm:text-base sm:leading-7">
            Official party statements, press releases, policy updates, and
            civic coverage.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper,#FAF9F6)]/65 px-3 py-1.5 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-mint-bright,#52B788)]/45" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-mint-bright,#52B788)]" />
            </span>

            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-mint-soft,#2D6A4F)]">
              Civic information stream
            </span>
          </div>
        </div>

        <motion.div
          whileHover={reduceMotion ? undefined : { y: -2, scale: 1.015 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.25, ease }}
          className="shrink-0"
        >
          <Button
            href="/news"
            variant="secondary"
            className="group inline-flex items-center gap-2 rounded-xl px-4 py-2.5 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <span>All news</span>
            <Newspaper className="h-4 w-4 text-[var(--color-mint-soft,#2D6A4F)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />
          </Button>
        </motion.div>
      </motion.div>

      {/* News grid */}
      <motion.div
        variants={reduceMotion ? undefined : containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-70px" }}
        className="relative z-10 grid gap-5 sm:gap-6 md:grid-cols-3"
      >
        {articles.map((article, index) => (
          <motion.div
            key={article.id || article.slug}
            variants={reduceMotion ? undefined : cardVariants}
            className="h-full"
          >
            <Link
              href={`/news/${article.slug}`}
              className="group relative flex h-full min-h-[330px] flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper-raised,#F4F1EA)]/75 p-5 shadow-sm backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[var(--color-mint-bright,#52B788)]/55 hover:bg-[var(--color-paper,#FAF9F6)] hover:shadow-xl sm:p-6"
            >
              <CornerBrackets />
              <SignalRail />

              {/* Card atmospheric glow */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[var(--color-mint-bright,#52B788)]/8 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-[var(--color-mint-bright,#52B788)]/15"
              />

              {/* Animated scan beam */}
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-mint-bright,#52B788)]/60 to-transparent opacity-0 group-hover:opacity-100"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, 330, 0],
                      }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 4.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              />

              {/* Card index / signal */}
              <div className="relative z-10 mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper,#FAF9F6)]/70 font-mono text-[10px] font-bold text-[var(--color-mint-soft,#2D6A4F)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="h-px w-7 bg-[var(--color-mint-bright,#52B788)]/25 transition-all duration-500 group-hover:w-12 group-hover:bg-[var(--color-mint-bright,#52B788)]/55" />
                </div>

                <motion.div
                  aria-hidden="true"
                  className="h-7 w-7 rounded-full border border-[var(--color-mint-bright,#52B788)]/15"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          rotate: [0, 90, 180, 270, 360],
                        }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          duration: 18,
                          repeat: Infinity,
                          ease: "linear",
                        }
                  }
                />
              </div>

              <div className="relative z-10">
                {/* Meta */}
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5">
                  <span className="inline-flex items-center rounded-md border border-[var(--color-mint-bright,#52B788)]/15 bg-[var(--color-savanna-deep,#1B4332)]/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-mint-soft,#2D6A4F)]">
                    {article.category}
                  </span>

                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--color-ink-soft,#64748B)]">
                    <Calendar className="h-3.5 w-3.5 text-[var(--color-mint-soft,#2D6A4F)]" />
                    <span>
                      {new Date(article.publishedAt).toLocaleDateString(
                        "en-KE",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-[var(--color-ink,#1A1A1A)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-savanna-deep,#1B4332)] sm:text-[1.35rem]">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-[var(--color-ink-soft,#64748B)] sm:text-sm sm:leading-6">
                  {article.excerpt}
                </p>

                {/* Decorative editorial rule */}
                <div className="mt-5 flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[var(--color-mint-bright,#52B788)]" />
                  <span className="h-px flex-1 bg-[var(--color-mint-bright,#52B788)]/10 transition-colors duration-300 group-hover:bg-[var(--color-mint-bright,#52B788)]/25" />
                  <span className="h-1 w-1 rounded-full border border-[var(--color-mint-bright,#52B788)]/35" />
                </div>
              </div>

              {/* Footer */}
              <div className="relative z-10 mt-6 flex items-center justify-between border-t border-[var(--color-mint-bright,#52B788)]/12 pt-4">
                <VerificationBadge status={article.verificationStatus} />

                <motion.div
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-paper,#FAF9F6)]/60 text-[var(--color-mint-soft,#2D6A4F)] transition-all duration-300 group-hover:border-[var(--color-mint-bright,#52B788)] group-hover:bg-[var(--color-mint-bright,#52B788)] group-hover:text-[var(--color-savanna-deep,#1B4332)]"
                  whileHover={reduceMotion ? undefined : { rotate: 8, scale: 1.08 }}
                >
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.div>
              </div>

              {/* Bottom active beam */}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[var(--color-savanna-deep,#1B4332)] via-[var(--color-mint-soft,#2D6A4F)] to-[var(--color-mint-bright,#52B788)] transition-all duration-500 group-hover:w-full"
              />

              {/* Corner glow */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[-50px] right-[-50px] h-28 w-28 rounded-full bg-[var(--color-mint-bright,#52B788)]/8 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom editorial signal */}
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease }}
        className="relative z-10 mt-8 flex items-center justify-center sm:mt-10"
      >
        <div className="flex items-center gap-3 rounded-full border border-[var(--color-mint-bright,#52B788)]/15 bg-[var(--color-paper,#FAF9F6)]/55 px-4 py-2 shadow-sm backdrop-blur-md">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-soft,#64748B)]">
            Public record
          </span>

          <span className="h-1 w-1 rounded-full bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_8px_rgba(82,183,136,0.45)]" />

          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--color-mint-soft,#2D6A4F)]">
            DCP
          </span>
        </div>
      </motion.div>
      </Section>
    </div>
  );
}