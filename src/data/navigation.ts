import type { NavItem } from "@/lib/types";

export const primaryNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Overview", href: "/about", description: "Who DCP is and what it stands for" },
      { label: "History", href: "/history", description: "A timeline of the party's development" },
      { label: "Leadership", href: "/leadership", description: "The people leading the organization" },
      { label: "Documents", href: "/documents", description: "Constitution, notices, and public records" },
    ],
  },
  {
    label: "Policies",
    href: "/policies",
    children: [
      { label: "All priorities", href: "/policies", description: "Browse every policy category" },
      { label: "Economy", href: "/policies?category=economy" },
      { label: "Education", href: "/policies?category=education" },
      { label: "Healthcare", href: "/policies?category=healthcare" },
      { label: "Youth", href: "/policies?category=youth" },
      { label: "Governance", href: "/policies?category=governance" },
      { label: "Agriculture", href: "/policies?category=agriculture" },
      { label: "Devolution", href: "/policies?category=devolution" },
      { label: "Digital transformation", href: "/policies?category=digital-transformation" },
    ],
  },
  {
    label: "News & Activities",
    href: "/news",
    children: [
      { label: "News", href: "/news", description: "Reporting on party activity" },
      { label: "Official statements", href: "/statements", description: "Formal positions and notices" },
      { label: "Events", href: "/events", description: "Upcoming and past gatherings" },
      { label: "Media", href: "/media", description: "Photos from public activities" },
    ],
  },
  { label: "Get Involved", href: "/get-involved" },
];

export const footerNav: NavItem[] = [
  {
    label: "Organization",
    href: "/about",
    children: [
      { label: "About", href: "/about" },
      { label: "History", href: "/history" },
      { label: "Leadership", href: "/leadership" },
      { label: "Transparency", href: "/transparency" },
    ],
  },
  {
    label: "Explore",
    href: "/policies",
    children: [
      { label: "Policies", href: "/policies" },
      { label: "News", href: "/news" },
      { label: "Events", href: "/events" },
      { label: "Documents", href: "/documents" },
    ],
  },
  {
    label: "Participate",
    href: "/get-involved",
    children: [
      { label: "Get involved", href: "/get-involved" },
      { label: "Membership", href: "/membership" },
      { label: "Citizen feedback", href: "/citizen-feedback" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
