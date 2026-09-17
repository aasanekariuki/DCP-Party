"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Sparkles, Filter, ArrowUpRight, Calendar, Newspaper } from "lucide-react";
import type { NewsArticle } from "@/lib/types";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function NewsExplorer({
  articles,
  categories,
}: {
  articles: NewsArticle[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchesQuery =
        query.trim() === "" ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || a.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [articles, query, category]);

  return (
    <div className="relative w-full space-y-6">
      {/* Search Bar & Category Filter Controls Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Input Box */}
        <label className="group relative flex-1 max-w-md">
          <span className="sr-only">Search articles</span>
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mint-soft/60 transition-colors duration-200 group-focus-within:text-mint-bright"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news articles or topics..."
            className="w-full rounded-xl border border-mint-bright/20 bg-paper/90 pl-10 pr-12 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 shadow-xs backdrop-blur-xs outline-none transition-all duration-200 focus:border-mint-bright/50 focus:bg-paper focus:shadow-[0_0_16px_rgba(82,183,136,0.15)]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[11px] font-medium text-mint-soft hover:text-mint-bright transition-colors"
            >
              Clear
            </button>
          )}
        </label>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="mr-1 hidden items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-ink-soft sm:flex">
            <Filter className="h-3 w-3 text-mint-soft" /> Topic:
          </span>
          <button
            onClick={() => setCategory(null)}
            className={`relative rounded-lg border px-3 py-1.5 font-mono text-xs transition-all duration-200 whitespace-nowrap ${
              !category
                ? "border-mint-bright/40 bg-mint-bright/15 font-medium text-mint-soft shadow-[0_0_12px_rgba(82,183,136,0.12)]"
                : "border-mint-bright/15 bg-paper/60 text-ink-soft hover:border-mint-bright/30 hover:bg-paper hover:text-ink"
            }`}
          >
            All ({articles.length})
          </button>
          {categories.map((c) => {
            const count = articles.filter((a) => a.category === c).length;
            const isSelected = category === c;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`relative rounded-lg border px-3 py-1.5 font-mono text-xs transition-all duration-200 whitespace-nowrap ${
                  isSelected
                    ? "border-mint-bright/40 bg-mint-bright/15 font-medium text-mint-soft shadow-[0_0_12px_rgba(82,183,136,0.12)]"
                    : "border-mint-bright/15 bg-paper/60 text-ink-soft hover:border-mint-bright/30 hover:bg-paper hover:text-ink"
                }`}
              >
                {c} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid Display */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-mint-bright/15 bg-paper/60 py-12">
          <EmptyState
            title="No articles match your search"
            description="Try adjusting your keyword search or selected topic category."
          />
        </div>
      ) : (
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((article, idx) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.04, ease }}
              >
                <Link
                  href={`/news/${article.slug}`}
                  className="group relative flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-mint-bright/15 bg-paper/80 p-5 shadow-[0_4px_20px_rgba(27,67,50,0.03)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-mint-bright/40 hover:bg-paper-raised hover:shadow-[0_12px_32px_rgba(27,67,50,0.08)]"
                >
                  {/* Hover Background Radial Glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-mint-bright/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  {/* Hover Left Accent Stripe */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-transparent via-mint-bright/0 to-transparent transition-all duration-300 group-hover:via-mint-bright/60"
                  />

                  {/* Card Content Top Section */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-mint-bright/20 bg-mint-bright/10 px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-mint-soft">
                        <Sparkles className="h-2.5 w-2.5 text-mint-bright" />
                        {article.category}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-ink-soft/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-mint-bright" />
                    </div>

                    <h3 className="font-display text-lg font-semibold leading-snug text-ink group-hover:text-mint-soft transition-colors duration-200">
                      {article.title}
                    </h3>

                    <p className="mt-2.5 text-xs leading-relaxed text-ink-soft line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-5 flex items-center justify-between border-t border-mint-bright/10 pt-3">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-ink-soft">
                      <Calendar className="h-3.5 w-3.5 text-mint-soft" />
                      <span>
                        {new Date(article.publishedAt).toLocaleDateString("en-KE", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <VerificationBadge status={article.verificationStatus} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}