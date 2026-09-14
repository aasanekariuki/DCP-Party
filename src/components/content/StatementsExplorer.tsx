"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { StatementRecord } from "@/lib/types";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { EmptyState } from "@/components/ui/EmptyState";

export function StatementsExplorer({ statements, categories }: { statements: StatementRecord[]; categories: string[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return statements.filter((s) => {
      const matchesQuery = query.trim() === "" || s.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || s.topic === category;
      return matchesQuery && matchesCategory;
    });
  }, [statements, query, category]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <label className="relative flex-1 max-w-sm">
          <span className="sr-only">Search statements</span>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search statements"
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
        <EmptyState title="No statements match your search" description="Try a different keyword or topic." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((statement) => (
            <Link key={statement.id} href={`/statements/${statement.slug}`} className="flex flex-col gap-3 border rule rounded-[4px] p-6 hover:border-ink transition-colors">
              <div className="flex items-center justify-between text-xs text-ink-faint">
                <span>{statement.topic}</span>
                <span>{new Date(statement.date).toLocaleDateString("en-KE", { year: "numeric", month: "short", day: "numeric" })}</span>
              </div>
              <h3 className="font-display text-xl">{statement.title}</h3>
              <p className="text-sm text-ink-soft flex-1">{statement.summary}</p>
              <VerificationBadge status={statement.verificationStatus} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
