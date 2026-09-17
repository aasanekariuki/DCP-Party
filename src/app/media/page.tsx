"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { EmptyState } from "@/components/ui/EmptyState";
import { getMediaAssets } from "@/data/media";
import type { MediaAsset } from "@/lib/types";
import {
  ImageIcon,
  Sparkles,
  ScanLine,
  Filter,
  Maximize2,
  X,
  Tag,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  Images,
  Layers3,
  Orbit,
  Grid3X3,
  Search,
  ChevronRight,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

function FloatingOrb({
  className = "",
  size = 260,
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
      "bg-[radial-gradient(circle,rgba(27,67,50,0.18)_0%,rgba(45,106,79,0.06)_48%,transparent_72%)]",
    mint:
      "bg-[radial-gradient(circle,rgba(82,183,136,0.16)_0%,rgba(45,106,79,0.05)_48%,transparent_72%)]",
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
              scale: [1, 1.14, 1],
              opacity: [0.28, 0.58, 0.28],
              x: [0, 12, 0],
              y: [0, -14, 0],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 9,
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
              y: [0, -18, 0],
              x: [0, 6, 0],
              opacity: [0.18, 0.72, 0.18],
              scale: [0.75, 1.2, 0.75],
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
  size = 24,
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
              opacity: [0.2, 0.65, 0.2],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 7,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    />
  );
}

function FloatingRing({
  className = "",
  size = 90,
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
      className={`pointer-events-none absolute rounded-full border border-[var(--color-mint-bright,#52B788)]/15 ${className}`}
      style={{ width: size, height: size }}
      animate={
        reduceMotion
          ? undefined
          : {
              rotate: [0, 360],
              y: [0, -8, 0],
              opacity: [0.2, 0.5, 0.2],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 18,
              delay,
              repeat: Infinity,
              ease: "linear",
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
        className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-[var(--color-mint-bright,#52B788)]/25 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-[var(--color-mint-bright,#52B788)]/25 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[var(--color-mint-bright,#52B788)]/25 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-[var(--color-mint-bright,#52B788)]/25 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
    </>
  );
}

function BackgroundGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          "linear-gradient(var(--color-mint-soft,#2D6A4F) 1px, transparent 1px), linear-gradient(90deg, var(--color-mint-soft,#2D6A4F) 1px, transparent 1px)",
        backgroundSize: "46px 46px",
        maskImage:
          "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
      }}
    />
  );
}

function SignalLine() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative h-px w-full overflow-hidden bg-[var(--color-mint-bright,#52B788)]/10"
    >
      <motion.div
        className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-[var(--color-mint-bright,#52B788)]/70 to-transparent"
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
                duration: 3.8,
                repeat: Infinity,
                ease: "linear",
              }
        }
      />
    </div>
  );
}

function RegistryStat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Images;
  value: number | string;
  label: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper,#FAF9F6)] text-[var(--color-mint-soft,#2D6A4F)] shadow-sm">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <div className="font-display text-lg font-bold leading-none text-[var(--color-savanna-deep,#1B4332)]">
          {value}
        </div>
        <div className="mt-1 truncate text-[9px] font-mono uppercase tracking-[0.14em] text-[var(--color-ink-soft,#64748B)]">
          {label}
        </div>
      </div>
    </div>
  );
}

function MediaCard({
  asset,
  index,
  onOpen,
}: {
  asset: MediaAsset;
  index: number;
  onOpen: (asset: MediaAsset) => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 22,
              scale: 0.985,
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              scale: 1,
            }
      }
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.045, 0.22),
        ease,
      }}
      className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper-raised,#F4F1EA)]/70 p-3.5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-mint-bright,#52B788)]/50 hover:bg-[var(--color-paper,#FAF9F6)] hover:shadow-xl"
    >
      <CornerBrackets />

      <button
        type="button"
        onClick={() => onOpen(asset)}
        className="relative block w-full overflow-hidden rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-mint-bright,#52B788)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-paper,#FAF9F6)]"
        aria-label={`Open ${asset.title || "media record"}`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-savanna-deep,#1B4332)]/10">
          {asset.url ? (
            <Image
              src={asset.url}
              alt={asset.title || "Media asset"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-savanna-deep,#1B4332)]/5">
              <ImageIcon className="h-10 w-10 text-[var(--color-mint-soft,#2D6A4F)]/45" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-savanna-deep,#1B4332)]/45 via-transparent to-transparent opacity-80" />

          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-savanna-deep,#1B4332)]/80 px-2.5 py-1.5 text-[9px] font-mono uppercase tracking-[0.12em] text-white shadow-lg backdrop-blur-md">
            <ScanLine className="h-3 w-3 text-[var(--color-mint-bright,#52B788)]" />
            <span>Images</span>
          </div>

          <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-mint-bright,#52B788)]/30 bg-[var(--color-savanna-deep,#1B4332)]/75 text-[var(--color-mint-bright,#52B788)] backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--color-mint-bright,#52B788)] group-hover:text-[var(--color-savanna-deep,#1B4332)]">
            <Maximize2 className="h-3.5 w-3.5" />
          </span>
        </div>
      </button>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <button
          type="button"
          onClick={() => onOpen(asset)}
          className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-mint-bright,#52B788)]"
        >
          <h3 className="font-display text-[15px] font-bold leading-snug text-[var(--color-savanna-deep,#1B4332)] transition-all duration-200 group-hover:text-[var(--color-mint-soft,#2D6A4F)]">
            {asset.title || "Public Documentation"}
          </h3>
        </button>

        {asset.description && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-[1.65] text-[var(--color-ink-soft,#64748B)]">
            {asset.description}
          </p>
        )}

        <div className="mt-auto pt-4">
          <SignalLine />

          <div className="flex min-w-0 items-center justify-between gap-3 pt-3 text-[10px] text-[var(--color-ink-soft,#64748B)]">
            {asset.date ? (
              <div className="flex min-w-0 items-center gap-1.5 font-mono">
                <Calendar className="h-3 w-3 shrink-0 text-[var(--color-mint-soft,#2D6A4F)]" />
                <span className="truncate">{asset.date}</span>
              </div>
            ) : (
              <span className="text-[var(--color-ink-soft,#64748B)]/70">
                Media record
              </span>
            )}

            {asset.tags && asset.tags.length > 0 && (
              <div className="flex min-w-0 items-center gap-1.5 font-mono uppercase text-[var(--color-mint-soft,#2D6A4F)]">
                <Tag className="h-3 w-3 shrink-0" />
                <span className="truncate">
                  {asset.tags.slice(0, 2).join(" • ")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function MediaPage() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const assets: MediaAsset[] = getMediaAssets() || [];

  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [activeAsset, setActiveAsset] = useState<MediaAsset | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [25, -25]);

  const allTags = useMemo(
    () => [
      "all",
      ...Array.from(new Set(assets.flatMap((asset) => asset.tags || []))),
    ],
    [assets],
  );

  const filteredAssets = useMemo(
    () =>
      selectedTag === "all"
        ? assets
        : assets.filter((asset) =>
            (asset.tags as readonly string[] | undefined)?.includes(
              selectedTag,
            ),
          ),
    [assets, selectedTag],
  );

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = { all: assets.length };

    assets.forEach((asset) => {
      asset.tags?.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });

    return counts;
  }, [assets]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[var(--color-paper,#FAF9F6)]"
    >
      {/* Ambient background */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={reduceMotion ? undefined : { y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_10%,rgba(82,183,136,0.08),transparent_38%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_52%,rgba(27,67,50,0.055),transparent_34%)]" />
      </motion.div>

      <BackgroundGrid />

      {/* Floating visual system */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      >
        <FloatingOrb
          size={320}
          variant="jungle"
          className="-left-28 -top-24"
        />
        <FloatingOrb
          size={280}
          variant="mint"
          className="-right-24 top-[34%]"
          delay={1.2}
        />
        <FloatingOrb
          size={240}
          variant="jungle"
          className="left-[32%] top-[58%]"
          delay={2.4}
        />

        <FloatingParticle
          className="left-[8%] top-[19%] h-2.5 w-2.5"
          delay={0.3}
        />
        <FloatingParticle
          className="left-[22%] top-[42%] h-1.5 w-1.5"
          delay={1.1}
          duration={5}
        />
        <FloatingParticle
          className="right-[15%] top-[23%] h-2 w-2"
          delay={1.5}
        />
        <FloatingParticle
          className="right-[8%] top-[72%] h-1.5 w-1.5"
          delay={2}
          duration={7}
        />

        <FloatingDiamond
          className="left-[4%] top-[39%]"
          size={22}
          delay={0.6}
        />
        <FloatingDiamond
          className="right-[5%] top-[53%]"
          size={28}
          delay={1.8}
        />
        <FloatingDiamond
          className="left-[13%] top-[80%]"
          size={16}
          delay={2.3}
        />

        <FloatingRing
          className="right-[11%] top-[13%]"
          size={92}
          delay={0.4}
        />
        <FloatingRing
          className="left-[5%] top-[67%]"
          size={62}
          delay={1.7}
        />
      </div>

      {/* Header */}
      <Section border={false} className="relative z-10 pt-10 pb-7 sm:pt-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
          className="relative"
        >
          <div className="grid items-end gap-7 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <Eyebrow>Media Gallery</Eyebrow>

                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-[var(--color-mint-bright,#52B788)]/45"
                />

                <Sparkles className="h-3.5 w-3.5 text-[var(--color-mint-bright,#52B788)]" />
              </div>

              <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-[1.08] tracking-tight text-[var(--color-savanna-deep,#1B4332)] sm:text-4xl lg:text-[3.25rem]">
                Public{" "}
                <span className="relative inline-block text-[var(--color-mint-soft,#2D6A4F)]">
                  documentation
                  <motion.span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-0.5 rounded-full bg-[var(--color-mint-bright,#52B788)]"
                    initial={reduceMotion ? false : { width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.35, ease }}
                  />
                </span>{" "}
                & media archives.
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-ink-soft,#64748B)] sm:text-base">
                photographs and documentation from{" "}
                <span className="font-semibold text-[var(--color-savanna-deep,#1B4332)]">
                  summits, developer meetups, and community initiatives
                </span>
                .
              </p>
            </div>

            <motion.div
              initial={
                reduceMotion ? false : { opacity: 0, scale: 0.94, y: 8 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease }}
              className="hidden lg:block"
            >
              <div className="relative rounded-2xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper-raised,#F4F1EA)]/65 px-5 py-4 shadow-sm backdrop-blur-md">
                <CornerBrackets />

                <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.18em] text-[var(--color-mint-soft,#2D6A4F)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-mint-bright,#52B788)]/60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-mint-bright,#52B788)]" />
                  </span>
                  Archive status
                </div>

                <div className="mt-2 font-display text-xl font-bold text-[var(--color-savanna-deep,#1B4332)]">
                  Public record
                </div>
              </div>
            </motion.div>
          </div>

          {/* Registry strip */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease }}
            className="mt-7 overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper-raised,#F4F1EA)]/70 shadow-sm backdrop-blur-md"
          >
            <div className="grid gap-0 divide-y divide-[var(--color-mint-bright,#52B788)]/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="px-4 py-4 sm:px-5">
                <RegistryStat
                  icon={Images}
                  value={assets.length}
                  label="Media records"
                />
              </div>

              <div className="px-4 py-4 sm:px-5">
                <RegistryStat
                  icon={Layers3}
                  value={Math.max(allTags.length - 1, 0)}
                  label="Archive categories"
                />
              </div>

              <div className="px-4 py-4 sm:px-5">
                <RegistryStat
                  icon={CheckCircle2}
                  value={assets.length}
                  label="Verified records"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Filter rail */}
        {assets.length > 0 && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="mt-6"
          >
            <div className="flex flex-col gap-3 rounded-2xl border border-[var(--color-mint-bright,#52B788)]/15 bg-[var(--color-paper,#FAF9F6)]/70 p-3.5 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-savanna-deep,#1B4332)] text-white">
                  <Filter className="h-3.5 w-3.5" />
                </div>

                <div>
                  <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.14em] text-[var(--color-savanna-deep,#1B4332)]">
                    Browse archive
                  </div>
                  <div className="mt-0.5 text-[10px] text-[var(--color-ink-soft,#64748B)]">
                    Filter the public media record
                  </div>
                </div>
              </div>

              <div className="flex max-w-full gap-2 overflow-x-auto pb-0.5 sm:flex-wrap sm:justify-end">
                {allTags.map((tag) => {
                  const active = selectedTag === tag;

                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSelectedTag(tag)}
                      aria-pressed={active}
                      className={`shrink-0 rounded-lg border px-3 py-2 text-[10px] font-semibold capitalize transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-mint-bright,#52B788)] ${
                        active
                          ? "border-[var(--color-savanna-deep,#1B4332)] bg-[var(--color-savanna-deep,#1B4332)] text-white shadow-md"
                          : "border-[var(--color-mint-bright,#52B788)]/18 bg-[var(--color-paper-raised,#F4F1EA)] text-[var(--color-ink-soft,#64748B)] hover:-translate-y-0.5 hover:border-[var(--color-mint-bright,#52B788)]/45 hover:text-[var(--color-savanna-deep,#1B4332)]"
                      }`}
                    >
                      <span>{tag}</span>
                      <span
                        className={`ml-1.5 font-mono ${
                          active
                            ? "text-[var(--color-mint-bright,#52B788)]"
                            : "text-[var(--color-mint-soft,#2D6A4F)]"
                        }`}
                      >
                        {tagCounts[tag] || 0}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </Section>

      {/* Archive content */}
      <Section className="relative z-10 pt-1 pb-14 sm:pb-16">
        <AnimatePresence mode="wait" initial={false}>
          {filteredAssets.length === 0 ? (
            <motion.div
              key="empty"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 10,
                    }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
              className="group relative overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper-raised,#F4F1EA)]/70 p-7 shadow-sm backdrop-blur-md sm:p-10"
            >
              <CornerBrackets />

              <div className="mx-auto max-w-xl text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper,#FAF9F6)] text-[var(--color-mint-soft,#2D6A4F)] shadow-sm">
                  <Search className="h-6 w-6" />
                </div>

                <div className="mt-5">
                  <EmptyState
                    title="No media found"
                    description="There are no records matching the selected archive category."
                  />
                </div>

                {selectedTag !== "all" && (
                  <button
                    type="button"
                    onClick={() => setSelectedTag("all")}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-paper,#FAF9F6)] px-4 py-2.5 text-xs font-semibold text-[var(--color-savanna-deep,#1B4332)] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-mint-bright,#52B788)]/50 hover:shadow-md"
                  >
                    View all media
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={selectedTag}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredAssets.map((asset, index) => (
                <MediaCard
                  key={asset.id || `${asset.title}-${index}`}
                  asset={asset}
                  index={index}
                  onOpen={setActiveAsset}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compact archive footer */}
        {filteredAssets.length > 0 && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease }}
            className="mt-7"
          >
            <div className="relative overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/15 bg-[var(--color-paper-raised,#F4F1EA)]/55 px-4 py-3.5 backdrop-blur-sm sm:px-5">
              <CornerBrackets />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2.5">
                  <Grid3X3 className="h-4 w-4 text-[var(--color-mint-soft,#2D6A4F)]" />
                  <p className="text-xs text-[var(--color-ink-soft,#64748B)]">
                    Showing{" "}
                    <span className="font-semibold text-[var(--color-savanna-deep,#1B4332)]">
                      {filteredAssets.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-[var(--color-savanna-deep,#1B4332)]">
                      {assets.length}
                    </span>{" "}
                    public media records
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.14em] text-[var(--color-mint-soft,#2D6A4F)]">
                  <Orbit className="h-3.5 w-3.5" />
                  <span>Open public archive</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {activeAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveAsset(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-savanna-deep,#1B4332)]/85 p-3 backdrop-blur-md sm:p-5"
            role="dialog"
            aria-modal="true"
            aria-label="Media preview"
          >
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      scale: 0.94,
                      opacity: 0,
                      y: 12,
                    }
              }
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      scale: 0.96,
                      opacity: 0,
                      y: 8,
                    }
              }
              transition={{ duration: 0.4, ease }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-[92vh] w-full max-w-4xl overflow-auto rounded-2xl border border-[var(--color-mint-bright,#52B788)]/30 bg-[var(--color-paper,#FAF9F6)] p-3 shadow-2xl sm:p-5"
            >
              <CornerBrackets />

              <button
                type="button"
                onClick={() => setActiveAsset(null)}
                aria-label="Close media preview"
                className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-paper-raised,#F4F1EA)] text-[var(--color-savanna-deep,#1B4332)] shadow-md transition-all duration-200 hover:scale-105 hover:bg-[var(--color-mint-bright,#52B788)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-mint-bright,#52B788)]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-savanna-deep,#1B4332)]/10">
                {activeAsset.url ? (
                  <Image
                    src={activeAsset.url}
                    alt={activeAsset.title || "Media preview"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-[var(--color-mint-soft,#2D6A4F)]/55" />
                  </div>
                )}
              </div>

              <div className="mt-4 px-1 sm:mt-5 sm:px-2">
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.13em] text-[var(--color-mint-soft,#2D6A4F)]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--color-mint-bright,#52B788)]" />
                  <span>Verified media record</span>

                  {activeAsset.date && (
                    <>
                      <span className="text-[var(--color-mint-bright,#52B788)]/45">
                        •
                      </span>
                      <span>{activeAsset.date}</span>
                    </>
                  )}
                </div>

                <h2 className="mt-2 pr-10 font-display text-xl font-bold leading-tight text-[var(--color-savanna-deep,#1B4332)] sm:text-2xl">
                  {activeAsset.title || "Public Activity Record"}
                </h2>

                {activeAsset.description && (
                  <p className="mt-2.5 max-w-3xl text-sm leading-7 text-[var(--color-ink-soft,#64748B)]">
                    {activeAsset.description}
                  </p>
                )}

                {activeAsset.tags && activeAsset.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {activeAsset.tags.map((tag) => (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => {
                          setSelectedTag(tag);
                          setActiveAsset(null);
                        }}
                        className="rounded-lg border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper-raised,#F4F1EA)] px-2.5 py-1.5 text-[10px] font-mono capitalize text-[var(--color-mint-soft,#2D6A4F)] transition-colors hover:border-[var(--color-mint-bright,#52B788)]/45 hover:text-[var(--color-savanna-deep,#1B4332)]"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}