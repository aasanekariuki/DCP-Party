export type VerificationStatus = "verified" | "pending-verification" | "placeholder";

export type PublicationStatus = "draft" | "published" | "archived";

export interface BaseContent {
  id: string;
  title: string;
  slug?: string;
  summary?: string;
  source?: string;
  createdAt?: string;
  updatedAt?: string;
  verificationStatus: VerificationStatus;
  publicationStatus: PublicationStatus;
}

export interface HistoricalMilestone {
  id: string;
  title: string;
  date?: string;
  description: string;
  image?: string;
  source?: string;
  verificationStatus: VerificationStatus;
}

export interface LeadershipProfile {
  id: string;
  name: string;
  slug: string;
  role: string;
  category?: string;
  biography: string;
  image?: string;
  responsibilities?: string[];
  source?: string;
  verificationStatus: VerificationStatus;
}

export interface Policy {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  body: string;
  keyPoints?: string[];
  documentUrl?: string;
  relatedNewsIds?: string[];
  source?: string;
  verificationStatus: VerificationStatus;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  publishedAt: string;
  author?: string;
  image?: string;
  source?: string;
  verificationStatus: VerificationStatus;
}

export interface StatementRecord {
  id: string;
  title: string;
  slug: string;
  date: string;
  topic: string;
  summary: string;
  documentUrl?: string;
  source?: string;
  verificationStatus: VerificationStatus;
}

export interface EventRecord {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  time?: string;
  endDate?: string;
  location?: string;
  county?: string;
  category: string;
  image?: string;
  registrationUrl?: string;
  accessType?: string;
  isUpcoming: boolean;
  source?: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  verificationStatus: VerificationStatus;
}

export interface PublicDocument {
  slug: string;
  url: string | undefined;
  downloadable: string | undefined;
  publishedAt: import("react").JSX.Element;
  id: string;
  title: string;
  description?: string;
  category: string;
  date?: string;
  fileUrl?: string;
  fileType?: string;
  source?: string;
  verificationStatus: VerificationStatus;
}

export interface MediaAsset {
  tags: string[];
  url: any;
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category: string;
  date?: string;
  location?: string;
  
  photographer?: string;
  rightsNotice?: string;
  verificationStatus: VerificationStatus;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}
