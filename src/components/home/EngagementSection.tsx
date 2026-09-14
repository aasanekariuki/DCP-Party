"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Sparkles, ArrowUpRight, Compass } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const pathways = [
  { title: "Explore policies", description: "See published positions by topic.", href: "/policies" },
  { title: "Read official information", description: "Statements and public notices.", href: "/statements" },
  { title: "Attend an event", description: "Public gatherings and forums.", href: "/events" },
  { title: "Submit feedback", description: "Ask a question or share a concern.", href: "/citizen-feedback" },
  { title: "Learn about membership", description: "Eligibility and process.", href: "/membership" },
  { title: "Contact the organization", description: "Reach the right department.", href: "/contact" },
];

function FloatingOrb({
  className = "",
  size = 240,
  variant = "jungle",
}: {
  className?: string;
  size?: number;
  variant?: "jungle" | "mint" | "emerald";
}) {
  const reduceMotion = useReducedMotion();

  const gradients = {
    jungle: "bg-[radial-gradient(circle,rgba(27,67,50,0.35)_0%,rgba(45,106,79,0.12)_50%,transparent_72%)]",
    mint: "bg-[radial-gradient(circle,rgba(82,183,136,0.25)_0%,rgba(45,106,79,0.08)_50%,transparent_70%)]",
    emerald: "bg-[radial-gradient(circle,rgba(16,185,129,0.25)_0%,rgba(6,78,59,0.08)_55%,transparent_70%)]",
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
              scale: [1, 1.15, 1],
              opacity: [0.45, 0.75, 0.45],
              y: [0, -12, 0],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 10,
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
  color = "mint",
}: {
  delay?: number;
  duration?: number;
  className?: string;
  color?: "mint" | "jungle" | "emerald";
}) {
  const reduceMotion = useReducedMotion();

  const colors = {
    mint: "bg-[var(--color-mint-bright,#52B788)]/50",
    jungle: "bg-[var(--color-savanna-deep,#1B4332)]/50",
    emerald: "bg-emerald-400/50",
  };

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute block rounded-full blur-[0.5px] ${colors[color]} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -15, 0],
              x: [0, 6, 0],
              opacity: [0.3, 0.8, 0.3],
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

function CornerBrackets() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-[var(--color-mint-bright,#52B788)]/30 transition-colors duration-300 group-hover:border-[var(--color-mint-bright,#52B788)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-[var(--color-mint-bright,#52B788)]/30 transition-colors duration-300 group-hover:border-[var(--color-mint-bright,#52B788)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[var(--color-mint-bright,#52B788)]/30 transition-colors duration-300 group-hover:border-[var(--color-mint-bright,#52B788)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-[var(--color-mint-bright,#52B788)]/30 transition-colors duration-300 group-hover:border-[var(--color-mint-bright,#52B788)]"
      />
    </>
  );
}

export function EngagementSection() {
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease },
    },
  };

  return (
    <Section border={false} className="relative overflow-hidden bg-[var(--color-ink,#0d1117)] text-paper">
      {/* Background ambient floating objects */}
      <FloatingOrb size={320} variant="jungle" className="-left-20 -top-16" />
      <FloatingOrb size={280} variant="mint" className="-right-16 top-1/3" />
      <FloatingOrb size={300} variant="emerald" className="left-1/3 bottom-0" />

      {/* Floating particles */}
      <FloatingParticle color="jungle" className="left-[5%] top-[22%] h-2.5 w-2.5" delay={0.2} duration={5.5} />
      <FloatingParticle color="mint" className="right-[8%] top-[18%] h-2 w-2" delay={1.1} duration={6.5} />
      <FloatingParticle color="emerald" className="left-[45%] bottom-[12%] h-2.5 w-2.5" delay={0.7} duration={5} />

      {/* Header section */}
      <div className="relative z-10 mb-10 max-w-xl sm:mb-12">
        <div className="flex items-center gap-2.5">
          <Eyebrow>
            <span className="text-[var(--color-mint-bright,#52B788)]">Wherever you&rsquo;re starting from</span>
          </Eyebrow>
          <span aria-hidden="true" className="h-px w-8 bg-[var(--color-mint-bright,#52B788)]/40" />
          <Sparkles className="h-3.5 w-3.5 text-[var(--color-mint-bright,#52B788)]" />
        </div>

        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Six ways to take this further.
        </h2>
      </div>

      {/* Pathways Grid */}
      <motion.div
        variants={reduceMotion ? undefined : containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative z-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {pathways.map((p, idx) => (
          <motion.div key={p.title} variants={reduceMotion ? undefined : cardVariants}>
            <Link
              href={p.href}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/25 bg-white/[0.04] p-6 shadow-2xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-mint-bright,#52B788)]/60 hover:bg-white/[0.08] hover:shadow-lg"
            >
              <CornerBrackets />

              <div>
                {/* Header Row inside card */}
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-mint-bright,#52B788)]/30 bg-[var(--color-savanna-deep,#1B4332)]/50 text-xs font-mono font-bold text-[var(--color-mint-bright,#52B788)]">
                    0{idx + 1}
                  </span>
                  <Compass className="h-4 w-4 text-[var(--color-mint-bright,#52B788)]/40 transition-colors duration-300 group-hover:text-[var(--color-mint-bright,#52B788)]" />
                </div>

                {/* Pathway Title */}
                <h3 className="font-display text-xl font-bold leading-snug text-white transition-colors duration-200 group-hover:text-[var(--color-mint-bright,#52B788)]">
                  {p.title}
                </h3>

                {/* Pathway Description */}
                <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                  {p.description}
                </p>
              </div>

              {/* Action Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="font-mono text-xs font-medium tracking-wide text-[var(--color-mint-bright,#52B788)]/80 transition-colors duration-300 group-hover:text-[var(--color-mint-bright,#52B788)]">
                  Get Started
                </span>

                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-mint-bright,#52B788)]/30 bg-[var(--color-savanna-deep,#1B4332)]/60 text-[var(--color-mint-bright,#52B788)] transition-colors duration-300 group-hover:border-[var(--color-mint-bright,#52B788)] group-hover:bg-[var(--color-mint-bright,#52B788)] group-hover:text-[var(--color-savanna-deep,#1B4332)]">
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Active Hover Bottom Beam Accent */}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[var(--color-savanna-deep,#1B4332)] to-[var(--color-mint-bright,#52B788)] transition-all duration-300 group-hover:w-full"
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}