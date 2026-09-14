"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { Button } from "@/components/ui/Button";
import { getDocuments } from "@/data/documents";
import { FileText, Sparkles, Download, Library, Calendar } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

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
    jungle: "bg-[radial-gradient(circle,rgba(27,67,50,0.18)_0%,rgba(45,106,79,0.06)_50%,transparent_72%)]",
    mint: "bg-[radial-gradient(circle,rgba(82,183,136,0.14)_0%,rgba(45,106,79,0.04)_50%,transparent_70%)]",
    emerald: "bg-[radial-gradient(circle,rgba(16,185,129,0.14)_0%,rgba(6,78,59,0.04)_55%,transparent_70%)]",
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
              opacity: [0.35, 0.65, 0.35],
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
    mint: "bg-[var(--color-mint-bright,#52B788)]/40",
    jungle: "bg-[var(--color-savanna-deep,#1B4332)]/40",
    emerald: "bg-emerald-500/40",
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
              opacity: [0.2, 0.7, 0.2],
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
        className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-[var(--color-mint-bright,#52B788)]/25 transition-colors duration-300 group-hover:border-[var(--color-mint-bright,#52B788)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-[var(--color-mint-bright,#52B788)]/25 transition-colors duration-300 group-hover:border-[var(--color-mint-bright,#52B788)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[var(--color-mint-bright,#52B788)]/25 transition-colors duration-300 group-hover:border-[var(--color-mint-bright,#52B788)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-[var(--color-mint-bright,#52B788)]/25 transition-colors duration-300 group-hover:border-[var(--color-mint-bright,#52B788)]"
      />
    </>
  );
}

export function DocumentPreview() {
  const reduceMotion = useReducedMotion();
  const docs = getDocuments();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
    <Section decorated animateEntry={false} className="relative">
      {/* Background ambient floating objects in Jungle & Mint Green */}
      <FloatingOrb size={300} variant="jungle" className="-left-20 -top-16" />
      <FloatingOrb size={260} variant="mint" className="-right-16 top-1/4" />
      <FloatingOrb size={280} variant="emerald" className="left-1/3 bottom-0" />

      {/* Floating particles */}
      <FloatingParticle color="jungle" className="left-[5%] top-[22%] h-2.5 w-2.5" delay={0.2} duration={5.5} />
      <FloatingParticle color="mint" className="right-[8%] top-[18%] h-2 w-2" delay={1.1} duration={6.5} />
      <FloatingParticle color="emerald" className="left-[45%] bottom-[12%] h-2.5 w-2.5" delay={0.7} duration={5} />

      {/* Header section */}
      <div className="relative z-10 mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-12">
        <div className="max-w-xl">
          <div className="flex items-center gap-2.5">
            <Eyebrow>Public record</Eyebrow>
            <span aria-hidden="true" className="h-px w-8 bg-[var(--color-mint-bright,#52B788)]/40" />
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-mint-bright,#52B788)]" />
          </div>

          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--color-savanna-deep,#1B4332)] sm:text-4xl lg:text-5xl">
            Documents and notices.
          </h2>

          <p className="mt-2 text-sm text-[var(--color-ink-soft,#64748B)] sm:text-base">
            Verified party constitutions, official filings, public manifestos, and legal statements.
          </p>
        </div>

        <motion.div
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          <Button href="/documents" variant="secondary" className="group inline-flex items-center gap-2 shadow-2xs">
            <span>Open the library</span>
            <Library className="h-4 w-4 text-[var(--color-mint-soft,#2D6A4F)] transition-transform duration-300 group-hover:scale-110" />
          </Button>
        </motion.div>
      </div>

      {/* Documents grid */}
      <motion.div
        variants={reduceMotion ? undefined : containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {docs.map((doc) => {
          const docHref = doc.fileUrl || doc.url || `/documents/${doc.slug || doc.id}`;
          const isDownload = Boolean(doc.fileUrl || doc.downloadable);

          return (
            <motion.div key={doc.id || doc.slug} variants={reduceMotion ? undefined : cardVariants}>
              <Link
                href={docHref}
                target={isDownload ? "_blank" : undefined}
                rel={isDownload ? "noopener noreferrer" : undefined}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper-raised,#F4F1EA)]/60 p-6 shadow-2xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-mint-bright,#52B788)]/60 hover:bg-[var(--color-paper,#FAF9F6)] hover:shadow-lg"
              >
                <CornerBrackets />

                <div>
                  {/* Top Header Row */}
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-mint-bright,#52B788)]/30 bg-[var(--color-savanna-deep,#1B4332)]/10 text-[var(--color-mint-soft,#2D6A4F)] transition-colors duration-300 group-hover:border-[var(--color-mint-bright,#52B788)] group-hover:bg-[var(--color-savanna-deep,#1B4332)] group-hover:text-[var(--color-mint-bright,#52B788)]">
                      <FileText className="h-5 w-5" strokeWidth={1.75} />
                    </div>

                    {doc.publishedAt && (
                      <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--color-ink-soft,#64748B)]">
                        <Calendar className="h-3.5 w-3.5 text-[var(--color-mint-soft,#2D6A4F)]" />
                        <span>
                          {new Date(doc.publishedAt).toLocaleDateString("en-KE", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-[var(--color-ink,#1A1A1A)] transition-colors duration-200 group-hover:text-[var(--color-savanna-deep,#1B4332)]">
                    {doc.title}
                  </h3>

                  {/* Description */}
                  {doc.description && (
                    <p className="mt-3 text-xs leading-relaxed text-[var(--color-ink-soft,#64748B)] line-clamp-3 sm:text-sm">
                      {doc.description}
                    </p>
                  )}
                </div>

                {/* Footer Status & Action Icon */}
                <div className="mt-6 flex items-center justify-between border-t border-[var(--color-mint-bright,#52B788)]/15 pt-4">
                  <VerificationBadge status={doc.verificationStatus} />

                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-mint-bright,#52B788)]/30 bg-[var(--color-savanna-deep,#1B4332)]/40 text-[var(--color-mint-bright,#52B788)] transition-colors duration-300 group-hover:border-[var(--color-mint-bright,#52B788)] group-hover:bg-[var(--color-mint-bright,#52B788)] group-hover:text-[var(--color-savanna-deep,#1B4332)]">
                    <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                  </div>
                </div>

                {/* Hover Active Beam */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[var(--color-savanna-deep,#1B4332)] to-[var(--color-mint-bright,#52B788)] transition-all duration-300 group-hover:w-full"
                />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}