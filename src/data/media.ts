import type { MediaAsset } from "@/lib/types";

// DEMO CONTENT — no verified media assets are on record. Left empty so
// the media page shows its designed empty state rather than stock imagery
// presented as real documentation of party activity.
export const mediaAssets: MediaAsset[] = [];

export function getMediaAssets() {
  return mediaAssets;
}
