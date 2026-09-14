"use client";

import Link from "next/link";
import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  Fingerprint,
  Users,
  ScrollText,
  History,
  Activity,
  FileArchive,
  ArrowUpRight,
  Compass,
  Sparkles,
  Network,
  ShieldCheck,
} from "lucide-react";

const pathways = [
  {
    title: "Our Identity",
    description: "Values, principles, and overall party structure.",
    href: "/about",
    Icon: Fingerprint,
    glowColor: "from-emerald-500/10 via-teal-500/5 to-transparent",
    number: "01",
  },
  {
    title: "Our Leadership",
    description: "The people steering the vision of our organization.",
    href: "/leadership",
    Icon: Users,
    glowColor: "from-blue-500/10 via-emerald-500/5 to-transparent",
    number: "02",
  },
  {
    title: "Our Policies",
    description: "Published positions, governance, and reform topics.",
    href: "/policies",
    Icon: ScrollText,
    glowColor: "from-amber-500/10 via-emerald-500/5 to-transparent",
    number: "03",
  },
  {
    title: "Our History",
    description: "Key milestones in how the movement developed over time.",
    href: "/history",
    Icon: History,
    glowColor: "from-indigo-500/10 via-emerald-500/5 to-transparent",
    number: "04",
  },
  {
    title: "Our Activities",
    description: "Public engagement, civic programs, and live events.",
    href: "/activities",
    Icon: Activity,
    glowColor: "from-rose-500/10 via-emerald-500/5 to-transparent",
    number: "05",
  },
  {
    title: "Public Documents",
    description: "Constitution, manifestos, and official public records.",
    href: "/documents",
    Icon: FileArchive,
    glowColor: "from-cyan-500/10 via-emerald-500/5 to-transparent",
    number: "06",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

function FloatingOrb({
  className = "",
  size = 220,
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
      className={`pointer-events-none absolute rounded-full bg-[radial-gradient(circle,rgba(82,183,136,0.18)_0%,rgba(45,106,79,0.08)_40%,transparent_70%)] blur-2xl ${className}`}
      style={{ width: size, height: size }}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: [1, 1.12, 1],
              opacity: [0.35, 0.65, 0.35],
              x: [0, 10, 0],
              y: [0, -10, 0],
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
              y: [0, -16, 0],
              x: [0, 6, 0],
              opacity: [0.25, 0.75, 0.25],
              scale: [0.8, 1.2, 0.8],
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

function OrbitRing({
  className = "",
  duration = 28,
}: {
  className?: string;
  duration?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border border-[var(--color-mint-bright,#52B788)]/15 ${className}`}
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
              duration,
              repeat: Infinity,
              ease: "linear",
            }
      }
    >
      <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[var(--color-mint-bright,#52B788)]/70 shadow-[0_0_12px_rgba(82,183,136,0.4)]" />
    </motion.div>
  );
}

export function ExplorePartySection() {
  const reduceMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.03, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease,
      },
    },
  };

  return (
    <Section
      decorated
      className="relative overflow-hidden border-t border-[var(--color-paper-line,#E5E7EB)] py-16 sm:py-20 lg:py-24"
    >
      <div ref={containerRef} className="absolute inset-0 pointer-events-none" />

      {/* Soft Ambient Radial Background Gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(82,183,136,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(45,106,79,0.08),transparent_50%)]" />

        <FloatingOrb size={300} className="-left-20 -top-10" />
        <FloatingOrb size={260} className="-right-16 bottom-10" delay={1.5} />

        <FloatingParticle className="left-[8%] top-[22%] h-2.5 w-2.5" delay={0.2} duration={5} />
        <FloatingParticle className="left-[18%] bottom-[25%] h-2 w-2" delay={1} duration={6.5} />
        <FloatingParticle className="right-[12%] top-[28%] h-2.5 w-2.5" delay={0.8} duration={7} />
        <FloatingParticle className="right-[8%] bottom-[22%] h-2 w-2" delay={1.7} duration={5.5} />

        <OrbitRing className="-right-20 -top-20 h-64 w-64" duration={40} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
          className="relative max-w-3xl"
        >
          <div className="mb-3 flex items-center gap-3">
            <Eyebrow>Explore</Eyebrow>
            <span aria-hidden="true" className="h-px w-10 bg-[var(--color-mint-bright,#52B788)]/30" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-soft,#64748B)]">
              DCP / 06
            </span>
          </div>

          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-[var(--color-ink,#1A1A1A)] sm:text-4xl lg:text-5xl">
            Six ways into{" "}
            <span className="relative inline-block text-[var(--color-mint-soft,#2D6A4F)]">
              the organization.
              <motion.span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-0.5 w-full bg-[var(--color-mint-bright,#52B788)]/40"
                initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                whileInView={reduceMotion ? undefined : { scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6, ease }}
              />
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-ink-soft,#64748B)] sm:text-base">
            Explore the people, principles, policies, history, activities, and public records that shape the DCP civic story.
          </p>
        </motion.div>

        {/* Layout Grid */}
        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* Visual Showcase Panel */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-[var(--color-paper-line,#E5E7EB)] bg-gradient-to-br from-green/90 via-[var(--color-paper,#FAF9F6)] to-[var(--color-paper-raised,#F4F1EA)] p-6 shadow-sm backdrop-blur-md sm:min-h-[360px] sm:p-8"
          >
            {/* Background Image Layer with Parallax */}
            <motion.div
              style={reduceMotion ? undefined : { y: imageY, scale: imageScale }}
              className="absolute inset-0 z-0 pointer-events-none"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-[0.12] mix-blend-multiply"
                style={{
                  backgroundImage:
                    "url('https://krayon.co.ke/wp-content/uploads/2026/09/Custom-DCP-Political-Campaign-T-Shirts-in-Nairobi-Kenya-Krayon-254-182-198-665-scaled.webp')",
                }}
              />
            </motion.div>

            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[var(--color-paper,#FAF9F6)] via-transparent to-transparent opacity-90" />

            {/* Panel Top Content */}
            <div className="relative z-10 flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--color-paper-line,#E5E7EB)] bg-green/90 text-[var(--color-mint-soft,#2D6A4F)] shadow-xs">
                <Compass size={22} strokeWidth={1.8} />
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-mint-bright,#52B788)]/20 bg-green/60 text-[var(--color-mint-soft,#2D6A4F)] backdrop-blur-xs">
                <Network size={18} strokeWidth={1.6} />
              </div>
            </div>

            {/* Panel Bottom Content */}
            <div className="relative z-10 mt-12">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_8px_rgba(82,183,136,0.6)]" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-soft,#64748B)]">
                  Civic Map
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold tracking-tight text-[var(--color-ink,#1A1A1A)] sm:text-3xl">
                Understand the movement from every angle.
              </h3>

              <div className="mt-5 flex items-center gap-3">
                <div className="h-px w-8 bg-[var(--color-mint-bright,#52B788)]/60" />
                <span className="text-xs font-semibold text-[var(--color-mint-soft,#2D6A4F)]">
                  Skiza mwananchi
                </span>
              </div>
            </div>
          </motion.div>

          {/* Cards Pathway System */}
          <motion.div
            variants={reduceMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {pathways.map(({ title, description, href, Icon, glowColor, number }) => (
              <motion.div key={title} variants={reduceMotion ? undefined : cardVariants}>
                <Link
                  href={href}
                  className="group relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-paper-line,#E5E7EB)] bg-green/80 p-6 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-mint-bright,#52B788)]/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-mint-bright,#52B788)]"
                >
                  {/* Subtle Gradient Glow on Hover */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${glowColor} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />

                  {/* Header Row */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-paper-line,#E5E7EB)] bg-[var(--color-paper,#FAF9F6)] text-[var(--color-mint-soft,#2D6A4F)] shadow-2xs transition-colors duration-300 group-hover:border-transparent group-hover:bg-[var(--color-savanna-deep,#1B4332)] group-hover:text-green">
                      <Icon size={20} strokeWidth={1.8} />
                    </div>

                    <span className="font-mono text-[10px] font-bold tracking-widest text-[var(--color-ink-soft,#64748B)]/50 group-hover:text-[var(--color-mint-soft,#2D6A4F)] transition-colors duration-300">
                      {number}
                    </span>
                  </div>

                  {/* Content Body */}
                  <div className="relative z-10 mt-6">
                    <h3 className="font-display text-lg font-bold tracking-tight text-[var(--color-ink,#1A1A1A)] transition-colors duration-200 group-hover:text-[var(--color-mint-soft,#2D6A4F)] sm:text-xl">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-ink-soft,#64748B)] sm:text-sm">
                      {description}
                    </p>
                  </div>

                  {/* Footer Action Row */}
                  <div className="relative z-10 mt-6 flex items-center justify-between border-t border-[var(--color-paper-line,#E5E7EB)]/60 pt-3.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-soft,#64748B)] transition-colors duration-200 group-hover:text-[var(--color-mint-soft,#2D6A4F)]">
                      Explore
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="text-[var(--color-ink-soft,#64748B)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-mint-soft,#2D6A4F)]"
                    />
                  </div>

                  {/* Bottom Highlight Accent */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-mint-bright,#52B788)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer Info Strip */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mt-8 flex flex-col gap-4 rounded-2xl border border-[var(--color-paper-line,#E5E7EB)] bg-green/60 p-4 backdrop-blur-xs sm:flex-row sm:items-center sm:justify-between sm:p-5"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--color-paper-line,#E5E7EB)] bg-[var(--color-paper,#FAF9F6)] text-[var(--color-mint-soft,#2D6A4F)]">
              <ShieldCheck size={18} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--color-ink,#1A1A1A)]">
                Open Civic Archive
              </p>
              <p className="text-xs text-[var(--color-ink-soft,#64748B)]">
                Transparent records and public documentation available for all citizens.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Sparkles size={14} className="text-[var(--color-mint-bright,#52B788)]" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink-soft,#64748B)]">
              Citizen · Party · Public
            </span>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}