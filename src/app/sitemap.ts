import type { MetadataRoute } from "next";

const routes = [
  "",
  "about",
  "history",
  "leadership",
  "policies",
  "news",
  "statements",
  "events",
  "documents",
  "media",
  "get-involved",
  "membership",
  "citizen-feedback",
  "contact",
  "transparency",
  "search",
  "activities",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com";
  return routes.map((route) => ({
    url: `${base}/${route}`,
    lastModified: new Date(),
  }));
}
