"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Policy } from "@/lib/types";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { EmptyState } from "@/components/ui/EmptyState";

export function PolicyExplorer({
  policies,
  categories,
  initialCategory,
}: {
  policies: Policy[];
  categories: string[];
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(initialCategory ?? null);

  const filtered = useMemo(() => {
    return policies.filter((p) => {
      const matchesQuery =
        query.trim() === "" || p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.summary.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [policies, query, category]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <label className="relative flex-1 max-w-sm">
          <span className="sr-only">Search policies</span>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search policy topics"
            className="w-full pl-9 pr-3 py-2.5 border rule rounded-[3px] bg-paper-raised text-sm"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory(null)}
            className={`px-3 py-1.5 text-sm rounded-[3px] border rule ${!category ? "bg-ink text-white border-ink" : "hover:bg-stone/60"}`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 text-sm rounded-[3px] border rule ${category === c ? "bg-ink text-white border-ink" : "hover:bg-stone/60"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No policies match your search" description="Try a different keyword or category." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((policy) => (
            <Link
              key={policy.id}
              href={`/policies/${policy.slug}`}
              className="border rule rounded-[4px] p-6 flex flex-col gap-3 hover:border-ink transition-colors bg-paper-raised"
            >
              <span className="text-xs font-medium text-warm">{policy.category}</span>
              <h3 className="font-display text-xl">{policy.title}</h3>
              <p className="text-sm text-ink-soft flex-1">{policy.summary}</p>
              <VerificationBadge status={policy.verificationStatus} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
