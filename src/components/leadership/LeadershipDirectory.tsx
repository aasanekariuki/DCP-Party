"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, Sparkles, Filter, X } from "lucide-react";
import type { LeadershipProfile } from "@/lib/types";
import { LeadershipCard } from "@/components/leadership/LeadershipCard";
import { EmptyState } from "@/components/ui/EmptyState";

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
    mint: "bg-mint-bright/40",
    jungle: "bg-savanna-deep/40",
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
        className="pointer-events-none absolute left-0 top-0 h-3.5 w-3.5 border-l-2 border-t-2 border-rule transition-colors duration-300 group-hover:border-mint-bright"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-3.5 w-3.5 border-r-2 border-t-2 border-rule transition-colors duration-300 group-hover:border-mint-bright"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-3.5 w-3.5 border-b-2 border-l-2 border-rule transition-colors duration-300 group-hover:border-mint-bright"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-3.5 w-3.5 border-b-2 border-r-2 border-rule transition-colors duration-300 group-hover:border-mint-bright"
      />
    </>
  );
}

export function LeadershipDirectory({
  profiles,
  categories,
}: {
  profiles: LeadershipProfile[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    return profiles.filter((p) => {
      const matchesQuery =
        query.trim() === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.role.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [profiles, query, category]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.02,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.25 },
    },
  };

  return (
    <div className="relative overflow-hidden">
      {/* Ambient Floating Motion Objects */}
      <FloatingOrb size={320} variant="jungle" className="-left-20 -top-10" />
      <FloatingOrb size={280} variant="mint" className="-right-16 top-1/2" />
      <FloatingOrb size={260} variant="emerald" className="left-1/3 bottom-0" />

      <FloatingParticle color="jungle" className="left-[4%] top-[15%] h-2.5 w-2.5" delay={0.2} duration={5.5} />
      <FloatingParticle color="mint" className="right-[6%] top-[25%] h-2 w-2" delay={1.1} duration={6.5} />
      <FloatingParticle color="emerald" className="left-[50%] bottom-[10%] h-2.5 w-2.5" delay={0.7} duration={5} />

      {/* Control & Search Bar */}
      <div className="relative z-10 mb-8 rounded-2xl border rule bg-paper-raised p-5 shadow-2xs backdrop-blur-md sm:p-6">
        <CornerBrackets />
        
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Input */}
          <label className="group relative flex-1 max-w-md">
            <span className="sr-only">Search leadership</span>
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint transition-colors duration-200 group-focus-within:text-ink"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or role..."
              className="w-full rounded-xl border rule bg-paper py-2.5 pl-10 pr-9 text-sm text-ink shadow-2xs placeholder:text-ink-soft/70 transition-all duration-200 focus:border-ink focus:outline-hidden focus:ring-2 focus:ring-ink/10"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-ink-soft hover:text-ink"
              >
                <X size={14} />
              </button>
            )}
          </label>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="mr-1 flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">
              <Filter size={14} className="text-ink-soft" />
              <span>Filter:</span>
            </div>

            <button
              onClick={() => setCategory(null)}
              className={`relative rounded-lg border px-3.5 py-1.5 font-mono text-xs font-medium transition-all duration-200 ${
                !category
                  ? "border-ink bg-ink text-white shadow-2xs"
                  : "border-rule bg-paper text-ink-soft hover:bg-stone/60 hover:text-ink"
              }`}
            >
              All
            </button>

            {categories.map((c) => {
              const isActive = category === c;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`relative rounded-lg border px-3.5 py-1.5 font-mono text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "border-ink bg-ink text-white shadow-2xs"
                      : "border-rule bg-paper text-ink-soft hover:bg-stone/60 hover:text-ink"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="relative z-10 mb-6 flex items-center justify-between font-mono text-xs text-ink-soft">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-ink-soft" />
          <span>
            Showing <strong className="text-ink">{filtered.length}</strong> profile{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Directory Grid */}
      {filtered.length === 0 ? (
        <div className="relative z-10 rounded-2xl border rule bg-paper-raised/50 p-8 backdrop-blur-md">
          <EmptyState
            title="No leaders match your search"
            description="Try a different name, role, or category filter."
          />
        </div>
      ) : (
        <motion.div
          variants={reduceMotion ? undefined : containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout={!reduceMotion}
                variants={reduceMotion ? undefined : itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <LeadershipCard profile={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}