import { getPolicies } from "@/data/policies";
import { getNewsArticles } from "@/data/news";
import { getStatements } from "@/data/statements";
import { getEvents } from "@/data/events";
import { getLeadershipProfiles } from "@/data/leadership";
import { getDocuments } from "@/data/documents";
import { historicalMilestones } from "@/data/history";

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
}

/**
 * A local, client-side search abstraction. Replace the body of this
 * function with a server-side search call (e.g. a hosted search index)
 * without changing the SearchResult shape consumers rely on.
 */
export function searchContent(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const p of getPolicies()) {
    if (p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q)) {
      results.push({ id: p.id, title: p.title, description: p.summary, href: `/policies/${p.slug}`, category: "Policy" });
    }
  }
  for (const a of getNewsArticles()) {
    if (a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)) {
      results.push({ id: a.id, title: a.title, description: a.excerpt, href: `/news/${a.slug}`, category: "News" });
    }
  }
  for (const s of getStatements()) {
    if (s.title.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q)) {
      results.push({ id: s.id, title: s.title, description: s.summary, href: `/statements/${s.slug}`, category: "Statement" });
    }
  }
  for (const e of getEvents()) {
    if (e.title.toLowerCase().includes(q)) {
      results.push({ id: e.id, title: e.title, description: e.description, href: `/events/${e.slug}`, category: "Event" });
    }
  }
  for (const l of getLeadershipProfiles()) {
    if (l.name.toLowerCase().includes(q) || l.role.toLowerCase().includes(q)) {
      results.push({ id: l.id, title: l.name, description: l.role, href: `/leadership/${l.slug}`, category: "Leadership" });
    }
  }
  for (const d of getDocuments()) {
    if (d.title.toLowerCase().includes(q)) {
      results.push({ id: d.id, title: d.title, description: d.description ?? "", href: `/documents`, category: "Document" });
    }
  }
  for (const h of historicalMilestones) {
    if (h.title.toLowerCase().includes(q) || h.description.toLowerCase().includes(q)) {
      results.push({ id: h.id, title: h.title, description: h.description, href: `/history`, category: "History" });
    }
  }

  return results;
}
