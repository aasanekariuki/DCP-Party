"use client";

import type { PropsWithChildren } from "react";

import {
  FileText,
  Sparkles,
  ShieldCheck,
  FolderTree,
  ScanLine,
  Orbit,
  Layers3,
  Search,
  ArrowUpRight,
  Database,
  Activity,
  Command,
  LockKeyhole,
  FileCheck2,
  SlidersHorizontal,
} from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";

import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DocumentsExplorer } from "@/components/content/DocumentsExplorer";
import { getDocuments } from "@/data/documents";
import { PROTOTYPE_NOTICE } from "@/lib/constants";

const ease = [0.16, 1, 0.3, 1] as const;

function ProfileMotionWrapper({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease }}
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
  const reduceMotion = useReducedMotion();

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
      animate={
        reduceMotion
          ? undefined
          : {
              scale: [1, 1.12, 1],
              opacity: [0.35, 0.65, 0.35],
              x: [0, 14, 0],
              y: [0, -14, 0],
            }
      }
      transition={{
        duration: 11,
        repeat: Infinity,
        ease: "easeInOut",
      }}
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
  const reduceMotion = useReducedMotion();

  const shapeStyles = {
    circle:
      "rounded-full bg-mint-bright/55 shadow-[0_0_14px_rgba(82,183,136,0.45)]",
    diamond:
      "rotate-45 rounded-[2px] border border-mint-bright/45 bg-mint-bright/10",
    ring: "rounded-full border border-mint-bright/35 bg-transparent",
  };

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute block ${shapeStyles[shape]} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -18, 0],
              x: [0, 7, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.85, 1.15, 0.85],
              rotate: shape === "diamond" ? [45, 135, 45] : undefined,
            }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
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
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border border-mint-bright/15 ${className}`}
      style={{ width: size, height: size }}
      animate={reduceMotion ? undefined : { rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-mint-bright shadow-[0_0_14px_rgba(82,183,136,0.7)]" />
      <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint-bright/70" />
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
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px lg:block"
    >
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-mint-bright/20 to-transparent"
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.25, 0.7, 0.25],
                scaleX: [0.92, 1, 0.92],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

function DataNode({
  icon: Icon,
  label,
  value,
  delay = 0,
}: {
  icon: typeof FileText;
  label: string;
  value: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55, delay, ease }}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden rounded-xl border rule bg-paper-raised/70 px-4 py-3 backdrop-blur-md"
    >
      <div className="absolute inset-y-0 left-0 w-px bg-mint-bright/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-mint-bright/20 bg-mint-bright/10">
          <Icon className="h-4 w-4 text-mint-bright" />
        </div>

        <div className="min-w-0">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">
            {label}
          </p>
          <p className="mt-0.5 font-display text-sm font-bold text-ink">
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ExplorerStatus() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-xl border rule bg-paper-raised/60 px-4 py-3 backdrop-blur-md">
      <div className="absolute inset-0 opacity-[0.12]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(82,183,136,0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(82,183,136,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    scale: [1, 1.08, 1],
                    rotate: [0, 3, 0],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-mint-bright/20 bg-mint-bright/10"
          >
            <Database className="h-4 w-4 text-mint-bright" />
          </motion.div>

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink-soft">
              Archive interface
            </p>
            <p className="mt-0.5 text-xs font-semibold text-ink">
              Public records index
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.13em] text-ink-soft">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-mint-bright shadow-[0_0_9px_rgba(82,183,136,0.7)]"
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [0.35, 1, 0.35],
                    scale: [0.85, 1.15, 0.85],
                  }
            }
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          Live index
        </div>
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  const documents = getDocuments();
  const categories = Array.from(
    new Set(documents.map((document) => document.category)),
  );

  return (
    <>
      {/* =========================================================
          DOCUMENTS HERO
      ========================================================= */}

      <Section
        border={false}
        className="relative overflow-hidden bg-paper pb-14 pt-10 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16"
      >
        <BackgroundGrid />

        <FloatingOrb
          size={440}
          variant="jungle"
          className="-left-56 -top-44"
        />

        <FloatingOrb
          size={390}
          variant="mint"
          className="-right-48 top-8"
        />

        <FloatingOrb
          size={250}
          variant="mint"
          className="right-[22%] bottom-[-150px]"
        />

        <OrbitDecoration
          size={360}
          duration={46}
          className="-right-48 -top-44"
        />

        <OrbitDecoration
          size={210}
          duration={30}
          className="-left-28 bottom-[-70px]"
        />

        <FloatingParticle
          className="left-[7%] top-[21%] h-2.5 w-2.5"
          delay={0.2}
          duration={5.5}
        />

        <FloatingParticle
          className="right-[12%] top-[17%] h-3 w-3"
          delay={1}
          duration={7}
          shape="diamond"
        />

        <FloatingParticle
          className="right-[18%] bottom-[19%] h-5 w-5"
          delay={1.5}
          duration={8}
          shape="ring"
        />

        <FloatingParticle
          className="left-[28%] bottom-[13%] h-1.5 w-1.5"
          delay={2}
          duration={4.5}
        />

        <SignalLine />

        <ProfileMotionWrapper className="relative z-10">
          <div className="max-w-5xl">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow>Public documents</Eyebrow>

              <span
                aria-hidden="true"
                className="h-px w-8 bg-rule"
              />

              <motion.span
                whileHover={{ y: -2 }}
                className="inline-flex items-center gap-1.5 rounded-full border rule bg-paper-raised/75 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-soft shadow-[0_8px_22px_rgba(27,67,50,0.04)] backdrop-blur-md"
              >
                <FolderTree className="h-3 w-3 text-mint-bright" />
                <span>{documents.length} Records</span>
              </motion.span>
            </div>

            <div className="relative mt-6 max-w-4xl">
              <span
                aria-hidden="true"
                className="absolute -left-4 top-2 hidden h-20 w-0.5 bg-gradient-to-b from-transparent via-mint-bright to-transparent sm:block"
              />

              <div className="absolute -left-3 top-0 hidden h-2 w-2 rounded-full bg-mint-bright shadow-[0_0_16px_rgba(82,183,136,0.7)] sm:block" />

              <h1 className="font-display text-4xl font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                The searchable{" "}
                <span className="relative inline-block text-mint-soft">
                  <span className="relative z-10">document library.</span>
                  <motion.span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 right-0 h-2 bg-mint-bright/15 blur-[5px]"
                    animate={{ opacity: [0.35, 0.8, 0.35] }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </span>
              </h1>

              <motion.div
                aria-hidden="true"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "8rem", opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease }}
                className="mt-5 h-0.5 bg-gradient-to-r from-mint-bright via-mint-soft to-transparent shadow-[0_0_12px_rgba(82,183,136,0.2)]"
              />
            </div>

            <p className="measure mt-7 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">
              Constitution, notices, policy documents, and reports will be
              published here as they are confirmed.{" "}
              <span className="font-semibold text-ink">
                No fabricated documents are included in this prototype.
              </span>
            </p>

            <div className="mt-8 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
              <DataNode
                icon={FileCheck2}
                label="Library state"
                value="Verified source"
                delay={0}
              />

              <DataNode
                icon={Layers3}
                label="Collections"
                value={`${categories.length} Categories`}
                delay={0.06}
              />

              <DataNode
                icon={Activity}
                label="Archive mode"
                value="Public access"
                delay={0.12}
              />
            </div>
          </div>
        </ProfileMotionWrapper>

        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.65, duration: 0.8, ease }}
          className="pointer-events-none absolute bottom-7 right-[8%] hidden lg:block"
        >
          <div className="relative h-24 w-24">
            <div className="absolute inset-0 rounded-2xl border border-mint-bright/15 rotate-12" />
            <div className="absolute inset-2 rounded-xl border border-mint-bright/20 -rotate-6 bg-paper-raised/30 backdrop-blur-sm" />
            <div className="absolute inset-5 flex items-center justify-center rounded-lg border border-mint-bright/25 bg-mint-bright/10">
              <Search className="h-6 w-6 text-mint-bright" />
            </div>

            <motion.div
              className="absolute -right-2 top-1/2 h-2 w-2 rounded-full bg-mint-bright shadow-[0_0_12px_rgba(82,183,136,0.7)]"
              animate={{ y: [-9, 9, -9] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </Section>

      {/* =========================================================
          EXPLORER
      ========================================================= */}

      <Section className="relative overflow-hidden pb-14 pt-7 sm:pb-16 sm:pt-9">
        <FloatingOrb
          size={320}
          variant="mint"
          className="left-1/3 -top-28"
        />

        <FloatingOrb
          size={240}
          variant="jungle"
          className="-right-28 bottom-[-100px]"
        />

        <FloatingParticle
          className="left-[45%] top-[9%] h-2.5 w-2.5"
          delay={0.7}
          duration={5}
        />

        <FloatingParticle
          className="right-[8%] top-[32%] h-3 w-3"
          delay={1.1}
          duration={6}
          shape="diamond"
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <ExplorerStatus />

          <div className="mb-6 mt-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-soft">
                <Sparkles className="h-4 w-4 text-mint-bright" />
                <span>Interactive Explorer</span>
              </div>

              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Explore the public archive
              </h2>
            </div>

            <div className="hidden items-center gap-2 rounded-lg border rule bg-paper-raised/60 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft backdrop-blur-md sm:flex">
              <SlidersHorizontal className="h-3.5 w-3.5 text-mint-bright" />
              Search & filter enabled
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease }}
            className="relative z-10"
          >
            <div className="group relative">
              <div className="pointer-events-none absolute -inset-1 rounded-[1.15rem] bg-mint-bright/5 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <DocumentsExplorer
                  documents={documents}
                  categories={categories}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* =========================================================
          VERIFICATION NOTICE
      ========================================================= */}

      <Section
        border={false}
        className="relative overflow-hidden bg-paper-raised pb-14 pt-3 sm:pb-16"
      >
        <FloatingOrb
          size={330}
          variant="mint"
          className="-right-40 -top-36"
        />

        <FloatingOrb
          size={230}
          variant="jungle"
          className="-left-32 bottom-[-100px]"
        />

        <FloatingParticle
          className="left-[10%] top-[40%] h-2 w-2"
          delay={0.5}
          duration={5}
        />

        <FloatingParticle
          className="right-[18%] top-[25%] h-3 w-3"
          delay={1.2}
          duration={7}
          shape="diamond"
        />

        <FloatingParticle
          className="right-[7%] bottom-[22%] h-4 w-4"
          delay={1.8}
          duration={8}
          shape="ring"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease }}
          className="relative z-10"
        >
          <div className="group relative mx-auto max-w-6xl overflow-hidden rounded-2xl border rule bg-paper/80 p-5 shadow-[0_18px_48px_rgba(27,67,50,0.06)] backdrop-blur-md sm:p-6 lg:p-7">
            <CornerBrackets />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.14]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(82,183,136,0.12) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(82,183,136,0.12) 1px, transparent 1px)
                `,
                backgroundSize: "30px 30px",
              }}
            />

            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-mint-bright/50 via-mint-bright/10 to-transparent"
              animate={{ scaleX: [0.55, 1, 0.55], opacity: [0.35, 0.8, 0.35] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.05 }}
                transition={{ duration: 0.25, ease }}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-mint-bright/25 bg-mint-bright/10 text-mint-bright shadow-[0_0_24px_rgba(82,183,136,0.08)]"
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

              <div className="hidden shrink-0 items-center gap-2 rounded-lg border rule bg-paper-raised/70 px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-soft backdrop-blur-sm sm:flex">
                <LockKeyhole className="h-3.5 w-3.5 text-mint-bright" />
                Document Store
              </div>
            </div>

            <div className="relative mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t rule pt-4">
              <ScanLine className="h-3.5 w-3.5 shrink-0 text-mint-bright" />

              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft">
                All records verified against public archives
              </span>

              <motion.span
                aria-hidden="true"
                className="ml-auto hidden h-px w-20 bg-gradient-to-r from-mint-bright/40 to-transparent sm:block"
                animate={{ opacity: [0.25, 0.8, 0.25] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <Orbit className="h-4 w-4 text-mint-bright/45" />
            </div>
          </div>
        </motion.div>

        <div className="relative z-10 mx-auto mt-6 flex max-w-6xl items-center justify-center gap-3 font-mono text-[9px] uppercase tracking-[0.15em] text-ink-soft">
          <span className="h-px w-10 bg-rule" />
          <span className="flex items-center gap-2">
            <Command className="h-3 w-3 text-mint-bright" />
            Public knowledge layer
          </span>
          <span className="h-px w-10 bg-rule" />
        </div>
      </Section>
    </>
  );
}