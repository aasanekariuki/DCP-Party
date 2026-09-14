"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { searchContent } from "@/lib/search";
import { EmptyState } from "@/components/ui/EmptyState";

export function SearchResults() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchContent(query), [query]);

  return (
    <div>
      <label className="relative block max-w-xl mb-10">
        <span className="sr-only">Search the site</span>
        <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
        <input
          autoFocus
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search policies, news, leadership, documents…"
          className="w-full pl-11 pr-4 py-3.5 text-lg border rule rounded-[4px] bg-paper-raised"
        />
      </label>

      {query.trim() === "" ? (
        <p className="text-ink-faint">Start typing to search across the site.</p>
      ) : results.length === 0 ? (
        <EmptyState
          title="No results"
          description={`Nothing matched "${query}". Try a different keyword.`}
        />
      ) : (
        <ul className="flex flex-col">
          {results.map((r) => (
            <li key={`${r.category}-${r.id}`} className="border-b rule py-5">
              <Link href={r.href} className="group flex flex-col gap-1">
                <span className="text-xs font-medium text-warm">{r.category}</span>
                <span className="font-display text-xl group-hover:text-accent">{r.title}</span>
                <span className="text-sm text-ink-soft">{r.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
