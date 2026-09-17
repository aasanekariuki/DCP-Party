"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useRef } from "react";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PolicyExplorer } from "@/components/policies/PolicyExplorer";
import { getPolicies, policyCategories } from "@/data/policies";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  FileText,
  Fingerprint,
  Globe2,
  Layers3,
  Lock,
  Network,
  Radar,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function FloatingOrb({
  className = "",
  size = 300,
  duration = 12,
}: {
  className?: string;
  size?: number;
  duration?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full bg-[radial-gradient(circle,rgba(82,183,136,0.16)_0%,rgba(45,106,79,0.07)_45%,transparent_74%)] blur-3xl ${className}`}
      style={{ width: size, height: size }}
      animate={
        reduceMotion
          ? undefined
          : {
              x: [0, 18, -10, 0],
              y: [0, -20, 12, 0],
              scale: [1, 1.08, 0.96, 1],
              opacity: [0.28, 0.52, 0.3, 0.28],
            }
      }
      transition={{
        duration,
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
  shape?: "circle" | "diamond" | "ring" | "square";
}) {
  const reduceMotion = useReducedMotion();

  const shapes = {
    circle:
      "rounded-full bg-mint-bright/65 shadow-[0_0_14px_rgba(82,183,136,0.48)]",
    diamond:
      "rotate-45 rounded-[2px] border border-mint-bright/45 bg-mint-bright/10",
    ring:
      "rounded-full border border-mint-bright/45 bg-transparent shadow-[0_0_12px_rgba(82,183,136,0.22)]",
    square:
      "rounded-[3px] border border-mint-soft/35 bg-mint-bright/10",
  };

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute block ${shapes[shape]} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -24, 0],
              x: [0, 9, 0],
              opacity: [0.12, 0.7, 0.12],
              scale: [0.82, 1.15, 0.82],
              rotate:
                shape === "diamond" || shape === "square"
                  ? [45, 225, 45]
                  : undefined,
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

function BackgroundGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.045]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(82,183,136,0.42) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(82,183,136,0.42) 1px, transparent 1px)
        `,
        backgroundSize: "42px 42px",
        maskImage:
          "radial-gradient(circle at 50% 18%, black 12%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(circle at 50% 18%, black 12%, transparent 78%)",
      }}
    />
  );
}

function CornerBrackets() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l border-t border-mint-bright/40 transition-all duration-500 group-hover:h-7 group-hover:w-7 group-hover:border-mint-bright/80"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-5 w-5 border-r border-t border-mint-bright/40 transition-all duration-500 group-hover:h-7 group-hover:w-7 group-hover:border-mint-bright/80"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b border-l border-mint-bright/40 transition-all duration-500 group-hover:h-7 group-hover:w-7 group-hover:border-mint-bright/80"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b border-r border-mint-bright/40 transition-all duration-500 group-hover:h-7 group-hover:w-7 group-hover:border-mint-bright/80"
      />
    </>
  );
}

function SignalLine() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative h-px w-full overflow-hidden bg-mint-bright/15"
    >
      <motion.span
        className="absolute left-0 top-0 h-px w-28 bg-gradient-to-r from-transparent via-mint-bright to-transparent shadow-[0_0_12px_rgba(82,183,136,0.7)]"
        animate={reduceMotion ? undefined : { x: ["-120%", "900%"] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

function FloatingDataCard({
  icon: Icon,
  title,
  sub,
  className = "",
  delay = 0,
}: {
  icon: typeof Activity;
  title: string;
  sub: string;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, delay, ease }}
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.015 }}
      className={`pointer-events-none hidden items-center gap-3 rounded-2xl border border-mint-bright/20 bg-paper-raised/90 px-3.5 py-3 shadow-[0_14px_35px_rgba(27,67,50,0.1)] backdrop-blur-xl lg:flex ${className}`}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-mint-bright/20 bg-mint-bright/10">
        <Icon className="h-3.5 w-3.5 text-mint-soft" />
      </div>

      <div className="min-w-0">
        <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-ink">
          {title}
        </p>
        <p className="mt-0.5 font-mono text-[9px] text-ink-soft">{sub}</p>
      </div>
    </motion.div>
  );
}

function PolicyRadar() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative hidden h-40 w-40 shrink-0 xl:block"
    >
      <motion.div
        className="absolute inset-0 rounded-full border border-mint-bright/15"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute inset-4 rounded-full border border-dashed border-mint-bright/20"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute inset-8 rounded-full border border-mint-bright/20 bg-mint-bright/5 shadow-[0_0_40px_rgba(82,183,136,0.08)] backdrop-blur-sm" />

      <motion.div
        className="absolute left-1/2 top-1/2 h-px w-[72%] origin-left bg-gradient-to-r from-mint-bright/60 to-transparent"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <Target className="h-7 w-7 text-mint-bright/45" />
      </div>

      <motion.span
        className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-mint-bright shadow-[0_0_16px_rgba(82,183,136,0.85)]"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.4, 1],
                opacity: [0.55, 1, 0.55],
              }
        }
        transition={{ duration: 2, repeat: Infinity }}
      />

      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-mint-bright/20 bg-paper-raised/90 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-ink-soft backdrop-blur-md">
        policy signal
      </span>
    </div>
  );
}

function RegistryMetric({
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
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-mint-bright/15 bg-paper/80 p-4 shadow-[0_8px_28px_rgba(27,67,50,0.04)] backdrop-blur-sm"
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-mint-bright/5 blur-2xl" />

      <div className="relative flex items-center justify-between gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-mint-bright/20 bg-mint-bright/10">
          <Icon className="h-4 w-4 text-mint-soft" />
        </div>

        <span className="text-right font-mono text-[9px] uppercase tracking-[0.13em] text-ink-soft">
          {label}
        </span>
      </div>

      <p className="relative mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
        {value}
      </p>
    </motion.div>
  );
}

function TopicButton({
  category,
  active,
  onClick,
}: {
  category: string;
  active: boolean;
  onClick: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      aria-pressed={active}
      className={[
        "group/category inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.11em] transition-all duration-300",
        active
          ? "border-mint-bright/45 bg-mint-bright/15 text-mint-soft shadow-[0_0_20px_rgba(82,183,136,0.12)]"
          : "border-mint-bright/10 bg-paper/65 text-ink-soft hover:border-mint-bright/30 hover:bg-mint-bright/5 hover:text-ink",
      ].join(" ")}
    >
      <span
        className={[
          "h-1.5 w-1.5 rounded-full transition-all",
          active
            ? "bg-mint-bright shadow-[0_0_10px_rgba(82,183,136,0.75)]"
            : "bg-mint-bright/45 group-hover/category:bg-mint-bright",
        ].join(" ")}
      />

      {category}

      <ArrowRight
        className={[
          "h-3 w-3 transition-all",
          active
            ? "translate-x-0 text-mint-bright"
            : "-translate-x-1 opacity-0 group-hover/category:translate-x-0 group-hover/category:opacity-100",
        ].join(" ")}
      />
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function PoliciesPage() {
  const policies = getPolicies();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const categoryFromUrl = searchParams.get("category");

  const matchedCategory = useMemo(() => {
    if (!categoryFromUrl) return undefined;

    return policyCategories.find(
      (category) => slugify(category) === categoryFromUrl
    );
  }, [categoryFromUrl]);

  const publishedCount = policies.filter((policy) => {
    const record = policy as unknown as Record<string, unknown>;
    const status =
      typeof record.status === "string"
        ? record.status.toLowerCase()
        : "";

    return (
      status === "published" ||
      status === "active" ||
      status === "public"
    );
  }).length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["0%", "12%"]
  );

  function navigateToCategory(category: string) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("category", slugify(category));

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  function clearCategory() {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("category");

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-paper text-ink"
    >
      <BackgroundGrid />

      <motion.div
        aria-hidden="true"
        style={{ y: backgroundY }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <FloatingOrb
          size={460}
          duration={15}
          className="-left-52 -top-24"
        />
        <FloatingOrb
          size={380}
          duration={12}
          className="-right-44 top-[26%]"
        />
        <FloatingOrb
          size={330}
          duration={14}
          className="bottom-[12%] left-[18%]"
        />
        <FloatingOrb
          size={260}
          duration={10}
          className="right-[18%] top-[62%]"
        />
      </motion.div>

      <FloatingParticle
        className="left-[4%] top-28 h-3 w-3"
        delay={0.2}
        duration={6}
        shape="diamond"
      />

      <FloatingParticle
        className="right-[7%] top-24 h-4 w-4"
        delay={0.8}
        duration={7}
        shape="ring"
      />

      <FloatingParticle
        className="left-[10%] top-[43%] h-4 w-4"
        delay={1.1}
        duration={8}
        shape="square"
      />

      <FloatingParticle
        className="right-[5%] top-[58%] h-2.5 w-2.5"
        delay={0.4}
        duration={5.5}
        shape="circle"
      />

      <FloatingParticle
        className="right-[15%] bottom-[18%] h-3 w-3"
        delay={1.7}
        duration={7}
        shape="diamond"
      />

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                               */}
      {/* ------------------------------------------------------------------ */}

      <Section
        border={false}
        className="relative z-10 pt-7 pb-5 sm:pt-10 sm:pb-7 lg:pt-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease }}
          className="group relative overflow-hidden rounded-[30px] border border-mint-bright/20 bg-paper-raised/80 shadow-[0_22px_60px_rgba(27,67,50,0.07)] backdrop-blur-xl"
        >
          <CornerBrackets />

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-mint-bright/60 to-transparent"
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [0.2, 0.75, 0.2],
                  }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <FloatingDataCard
            icon={Activity}
            title="Registry sync"
            sub="Operational"
            className="absolute right-40 top-8"
            delay={0.35}
          />

          <FloatingDataCard
            icon={Lock}
            title="Verification"
            sub="Protected record"
            className="absolute bottom-9 right-10"
            delay={0.55}
          />

          <FloatingDataCard
            icon={Network}
            title="Topic graph"
            sub={`${policyCategories.length} nodes indexed`}
            className="absolute bottom-9 left-10"
            delay={0.7}
          />

          <div className="relative p-5 sm:p-7 lg:p-9 xl:p-10">
            <div className="flex items-start justify-between gap-8">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Eyebrow>Policy explorer</Eyebrow>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-mint-bright/30 bg-mint-bright/10 px-3 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-mint-soft">
                    <Sparkles className="h-3 w-3 text-mint-bright" />
                    Public topic index
                  </span>

                  {matchedCategory && (
                    <button
                      type="button"
                      onClick={clearCategory}
                      className="group/category inline-flex items-center gap-1.5 rounded-full border border-mint-bright/20 bg-paper px-3 py-1 font-mono text-[9px] uppercase tracking-[0.13em] text-ink-soft transition-all duration-300 hover:border-mint-bright/40 hover:text-ink"
                    >
                      <Target className="h-3 w-3 text-mint-bright" />
                      {matchedCategory}
                      <span className="ml-0.5 text-mint-bright/60">
                        ×
                      </span>
                    </button>
                  )}
                </div>

                <div className="mt-6 max-w-4xl">
                  <motion.h1
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.75,
                      delay: 0.08,
                      ease,
                    }}
                    className="font-display text-4xl font-semibold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-[4.25rem]"
                  >
                    Priorities{" "}
                    <span className="relative inline-block text-mint-soft [text-shadow:0_0_26px_rgba(82,183,136,0.2)]">
                      by topic.
                      <motion.span
                        aria-hidden="true"
                        className="absolute -bottom-2 left-0 h-[2px] rounded-full bg-mint-bright/75 shadow-[0_0_12px_rgba(82,183,136,0.45)]"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: 0.9,
                          delay: 0.48,
                          ease,
                        }}
                      />
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.65,
                      delay: 0.2,
                      ease,
                    }}
                    className="measure mt-5 max-w-2xl text-base leading-7 text-ink-soft sm:text-[17px]"
                  >
                    Explore the policy record by topic, inspect available
                    entries, and move directly into the relevant policy
                    material.
                  </motion.p>
                </div>

                <div className="mt-7">
                  <div className="mb-2.5 flex items-center gap-2">
                    <Compass className="h-3.5 w-3.5 text-mint-bright" />

                    <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-ink-soft">
                      Browse topics
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {policyCategories.map((category) => (
                      <TopicButton
                        key={category}
                        category={category}
                        active={
                          matchedCategory?.toLowerCase() ===
                          category.toLowerCase()
                        }
                        onClick={() => navigateToCategory(category)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <PolicyRadar />
            </div>

            <div className="mt-8 grid gap-3 border-t border-mint-bright/15 pt-5 sm:grid-cols-3">
              <RegistryMetric
                icon={FileText}
                label="Total entries"
                value={String(policies.length)}
                delay={0.32}
              />

              <RegistryMetric
                icon={Layers3}
                label="Topic categories"
                value={String(policyCategories.length)}
                delay={0.4}
              />

              <RegistryMetric
                icon={ShieldCheck}
                label="Published / active"
                value={
                  publishedCount > 0
                    ? String(publishedCount)
                    : "Registry"
                }
                delay={0.48}
              />
            </div>
          </div>
        </motion.div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* EXPLORER                                                           */}
      {/* ------------------------------------------------------------------ */}

      <Section
        border={false}
        className="relative z-10 pt-2 pb-8 sm:pt-4 sm:pb-12 lg:pb-14"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.12,
            ease,
          }}
        >
          <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-medium uppercase tracking-[0.19em] text-mint-soft">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute h-2 w-2 animate-ping rounded-full bg-mint-bright/30" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-mint-bright shadow-[0_0_10px_rgba(82,183,136,0.55)]" />
                </span>

                Public policy registry
              </div>

              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Explore the{" "}
                <span className="text-mint-soft [text-shadow:0_0_18px_rgba(82,183,136,0.12)]">
                  policy record
                </span>
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
                Browse the available policy entries by topic and open the
                relevant records through the explorer.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-xl border border-mint-bright/15 bg-paper-raised/70 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft backdrop-blur-sm">
              <Globe2 className="h-3.5 w-3.5 text-mint-bright" />
              Interactive index
              <ArrowUpRight className="h-3.5 w-3.5 text-mint-bright" />
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-[28px] border border-mint-bright/15 bg-paper-raised/55 p-2.5 shadow-[0_20px_55px_rgba(27,67,50,0.045)] backdrop-blur-xl sm:p-4 lg:p-5">
            <CornerBrackets />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-mint-bright/30 to-transparent"
            />

            <PolicyExplorer
              policies={policies}
              categories={policyCategories}
              initialCategory={matchedCategory}
            />
          </div>
        </motion.div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* ACTIVE ROUTE                                                       */}
      {/* ------------------------------------------------------------------ */}

      {matchedCategory && (
        <Section
          border={false}
          className="relative z-10 pt-0 pb-7 sm:pb-9"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="group relative overflow-hidden rounded-2xl border border-mint-bright/15 bg-paper-raised/55 p-4 backdrop-blur-xl sm:px-5 sm:py-4"
          >
            <CornerBrackets />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-mint-bright/20 bg-mint-bright/10">
                  <Compass className="h-4 w-4 text-mint-soft" />
                </div>

                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-mint-soft">
                    Active topic route
                  </p>

                  <p className="mt-0.5 text-sm font-medium text-ink">
                    {matchedCategory}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={clearCategory}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-mint-bright/20 bg-paper px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft transition-all duration-300 hover:border-mint-bright/40 hover:bg-mint-bright/5 hover:text-ink"
              >
                <ArrowLeft className="h-3.5 w-3.5 text-mint-bright" />
                View all topics
              </button>
            </div>
          </motion.div>
        </Section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* STATUS                                                              */}
      {/* ------------------------------------------------------------------ */}

      <Section
        border={false}
        className="relative z-10 pt-1 pb-12 sm:pb-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="group relative overflow-hidden rounded-[24px] border border-mint-bright/15 bg-paper-raised/60 px-5 py-5 shadow-[0_14px_40px_rgba(27,67,50,0.035)] backdrop-blur-xl sm:px-7 sm:py-6"
        >
          <CornerBrackets />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3.5">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-mint-bright/20 bg-mint-bright/10">
                <Fingerprint className="h-4 w-4 text-mint-soft" />

                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl border border-mint-bright/20"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.12, 1],
                          opacity: [0.3, 0, 0.3],
                        }
                  }
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                  }}
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.17em] text-mint-soft">
                    Registry integrity
                  </p>

                  <span className="inline-flex items-center gap-1 rounded-full border border-mint-bright/15 bg-mint-bright/5 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-ink-soft">
                    <CheckCircle2 className="h-2.5 w-2.5 text-mint-bright" />
                    Verified interface
                  </span>
                </div>

                <p className="mt-1.5 max-w-2xl text-sm leading-6 text-ink-soft">
                  Policy entries are presented according to the information
                  and publication status available in the policy registry.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-mint-bright/15 bg-paper/70 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.13em] text-ink-soft">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute h-2 w-2 animate-ping rounded-full bg-mint-bright/25" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-mint-bright shadow-[0_0_10px_rgba(82,183,136,0.55)]" />
                </span>
                Live registry
              </div>

              <ArrowUpRight className="h-4 w-4 text-mint-bright" />
            </div>
          </div>

          <div className="relative mt-5">
            <SignalLine />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-ink-soft">
              <ScanLine className="h-3.5 w-3.5 text-mint-bright/70" />
              Topic graph synchronised
            </div>

            <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-ink-soft">
              <Radar className="h-3.5 w-3.5 text-mint-bright/70" />
              {policies.length} records indexed
            </div>

            <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-ink-soft">
              <Globe2 className="h-3.5 w-3.5 text-mint-bright/70" />
              {policyCategories.length} topic nodes
            </div>
          </div>
        </motion.div>
      </Section>
    </main>
  );
}