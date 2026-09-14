"use client";

import { useMemo, useState } from "react";
import {
  Search,
  FileText,
  Download,
  X,
  Sparkles,
  Filter,
  CheckCircle2,
  ScanLine,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { PublicDocument } from "@/lib/types";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { EmptyState } from "@/components/ui/EmptyState";

const ease = [0.16, 1, 0.3, 1] as const;

function FloatingOrb({
  className = "",
  size = 200,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl bg-[radial-gradient(circle,rgba(82,183,136,0.14)_0%,rgba(45,106,79,0.05)_45%,transparent_72%)] ${className}`}
      style={{ width: size, height: size }}
      animate={{
        scale: [1, 1.12, 1],
        opacity: [0.3, 0.6, 0.3],
        x: [0, 10, 0],
        y: [0, -10, 0],
      }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function FloatingParticle({
  className = "",
  delay = 0,
  duration = 5,
  shape = "circle",
}: {
  className?: string;
  delay?: number;
  duration?: number;
  shape?: "circle" | "diamond" | "ring";
}) {
  const shapeStyles = {
    circle:
      "rounded-full bg-mint-bright/50 shadow-[0_0_12px_rgba(82,183,136,0.4)]",
    diamond:
      "rotate-45 rounded-[2px] border border-mint-bright/40 bg-mint-bright/10",
    ring: "rounded-full border border-mint-bright/30 bg-transparent",
  };

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute block ${shapeStyles[shape]} ${className}`}
      animate={{
        y: [0, -14, 0],
        x: [0, 6, 0],
        opacity: [0.2, 0.75, 0.2],
        scale: [0.85, 1.15, 0.85],
        rotate: shape === "diamond" ? [45, 135, 45] : undefined,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function CornerBrackets() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-mint-bright/40 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:border-mint-bright"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-mint-bright/40 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:border-mint-bright"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-mint-bright/40 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:border-mint-bright"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-mint-bright/40 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:border-mint-bright"
      />
    </>
  );
}

export function DocumentsExplorer({
  documents,
  categories,
}: {
  documents: PublicDocument[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return documents.filter((d) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === "" ||
        d.title.toLowerCase().includes(q) ||
        (d.description && d.description.toLowerCase().includes(q));
      const matchesCategory = !category || d.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [documents, query, category]);

  const activeFiltersCount = (query.trim() !== "" ? 1 : 0) + (category ? 1 : 0);

  const handleClearFilters = () => {
    setQuery("");
    setCategory(null);
  };

  return (
    <div className="relative">
      {/* Background Floating Objects */}
      <FloatingOrb size={280} className="-right-24 -top-20" />
      <FloatingOrb size={220} className="-left-20 top-1/2" />
      <FloatingParticle
        className="left-[5%] top-4 h-2 w-2"
        delay={0.2}
        duration={5.5}
      />
      <FloatingParticle
        className="right-[10%] top-12 h-3 w-3"
        delay={1.1}
        duration={7}
        shape="diamond"
      />

      {/* Control Bar: Search & Category Filter */}
      <div className="relative z-10 mb-8 rounded-2xl border rule bg-paper-raised/80 p-4 shadow-[0_12px_32px_rgba(27,67,50,0.04)] backdrop-blur-md sm:p-5">
        <CornerBrackets />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <label className="relative block">
              <span className="sr-only">Search documents</span>
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft transition-colors duration-200"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documents by title or keyword..."
                className="w-full rounded-xl border rule bg-paper pl-10 pr-9 py-2.5 font-sans text-sm text-ink placeholder:text-ink-faint shadow-2xs transition-all duration-300 hover:border-mint-bright/60 focus:border-mint-bright focus:outline-none focus:ring-2 focus:ring-mint-bright/20"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-ink-soft hover:bg-stone/60 hover:text-ink"
                  aria-label="Clear query search"
                >
                  <X size={14} />
                </button>
              )}
            </label>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 hidden items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-soft xl:flex">
              <Filter className="h-3 w-3 text-mint-bright" />
              Category:
            </span>

            <button
              onClick={() => setCategory(null)}
              className={`relative rounded-xl border px-3.5 py-1.5 font-mono text-xs font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-bright ${
                !category
                  ? "border-mint-bright bg-ink text-white shadow-xs"
                  : "border-rule bg-paper text-ink-soft hover:border-mint-bright/40 hover:bg-paper-raised hover:text-ink"
              }`}
            >
              {!category && (
                <motion.span
                  layoutId="activeCategoryBadge"
                  className="absolute inset-0 rounded-xl bg-ink"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                All
                <span
                  className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${
                    !category ? "bg-white/20 text-white" : "bg-stone/60 text-ink-soft"
                  }`}
                >
                  {documents.length}
                </span>
              </span>
            </button>

            {categories.map((c) => {
              const isSelected = category === c;
              const count = documents.filter((d) => d.category === c).length;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`relative rounded-xl border px-3.5 py-1.5 font-mono text-xs font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-bright ${
                    isSelected
                      ? "border-mint-bright bg-ink text-white shadow-xs"
                      : "border-rule bg-paper text-ink-soft hover:border-mint-bright/40 hover:bg-paper-raised hover:text-ink"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="activeCategoryBadge"
                      className="absolute inset-0 rounded-xl bg-ink"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {c}
                    <span
                      className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-stone/60 text-ink-soft"
                      }`}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Bar Meta */}
        <div className="mt-3 flex items-center justify-between border-t rule pt-3 font-mono text-[10px] uppercase tracking-wider text-ink-soft">
          <div className="flex items-center gap-2">
            <ScanLine className="h-3 w-3 text-mint-bright" />
            <span>
              Showing {filtered.length} of {documents.length} records
            </span>
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1 text-mint-bright transition-colors hover:text-ink hover:underline"
            >
              <X className="h-3 w-3" />
              Reset filters ({activeFiltersCount})
            </button>
          )}
        </div>
      </div>

      {/* Grid Results Container */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease }}
          className="relative rounded-2xl border rule bg-paper-raised/60 p-8 text-center backdrop-blur-md"
        >
          <EmptyState
            title="No documents match your filter"
            description="Try expanding your search parameters or select 'All' categories."
          />
          <button
            onClick={handleClearFilters}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border rule bg-paper px-4 py-2 font-mono text-xs font-semibold text-ink shadow-2xs transition-all hover:border-mint-bright"
          >
            Clear all active filters
          </button>
        </motion.div>
      ) : (
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((doc, idx) => (
              <motion.div
                key={doc.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: idx * 0.04, ease }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border rule bg-paper-raised/70 p-5 shadow-[0_10px_28px_rgba(27,67,50,0.04)] backdrop-blur-md transition-all duration-300 hover:border-mint-bright hover:bg-paper hover:shadow-[0_16px_40px_rgba(27,67,50,0.08)]"
              >
                <CornerBrackets />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(82,183,136,0.15),transparent_70%)] blur-xl transition-opacity duration-300 group-hover:opacity-100 opacity-50"
                />

                <div className="relative">
                  {/* Top Metadata & Icon */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-mint-bright/25 bg-mint-bright/10 text-mint-bright shadow-2xs transition-transform duration-300 group-hover:scale-105">
                      <FileText size={20} strokeWidth={1.75} />
                    </div>

                    <span className="rounded-full border rule bg-paper px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-ink-soft">
                      {doc.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-4 font-display text-lg font-bold leading-snug text-ink transition-colors duration-200 group-hover:text-mint-bright">
                    {doc.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-ink-soft line-clamp-3">
                    {doc.description || "No public summary provided for this record."}
                  </p>
                </div>

                {/* Footer Link & Verification */}
                <div className="relative mt-6 border-t rule pt-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <VerificationBadge status={doc.verificationStatus} />

                    {doc.fileUrl ? (
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-mint-bright/30 bg-mint-bright/10 px-3 py-1.5 font-mono text-xs font-semibold text-mint-bright shadow-2xs transition-all duration-300 hover:border-mint-bright hover:bg-mint-bright hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-bright"
                      >
                        <span>Open</span>
                        <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-md border rule bg-stone/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                        <ShieldAlert className="h-3 w-3" />
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}