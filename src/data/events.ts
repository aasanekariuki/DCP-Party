import type { EventRecord } from "@/lib/types";

export const events: EventRecord[] = [
  // --- Past / Completed Events ---
  {
    id: "evt-01",
    slug: "nairobi-membership-drive-aug-2026",
    title: "Nairobi Membership Drive",
    date: "2026-08-02",
    time: "09:00 AM - 04:00 PM",
    location: "KICC, Nairobi",
    county: "Nairobi County",
    accessType: "Open to public",
    description: "A DCP-organized listening event bringing citizens and leaders together for open dialogue.",
    isUpcoming: false,
    category: "",
    status: "upcoming",
    verificationStatus: "verified"
  },
  {
    id: "evt-02",
    slug: "youth-policy-forum-aug-2026",
    title: "Youth Policy Forum",
    date: "2026-08-15",
    time: "10:00 AM - 03:00 PM",
    location: "Moi University, Uasin Gishu",
    county: "Uasin Gishu County",
    accessType: "Open to public",
    description: "A DCP-organized listening event bringing citizens and leaders together for open dialogue.",
    isUpcoming: false,
    category: "",
    status: "upcoming",
    verificationStatus: "verified"
  },
  {
    id: "evt-03",
    slug: "coastal-region-town-hall-aug-2026",
    title: "Coastal Region Town Hall",
    date: "2026-08-24",
    time: "02:00 PM - 06:00 PM",
    location: "Mombasa Cultural Centre",
    county: "Mombasa County",
    accessType: "Open to public",
    description: "A DCP-organized listening event bringing citizens and leaders together for open dialogue.",
    isUpcoming: false,
    category: "",
    status: "upcoming",
    verificationStatus: "verified"
  },
  {
    id: "evt-04",
    slug: "nakuru-economic-roundtable-sep-2026",
    title: "Rift Valley Economic & Agritech Roundtable",
    date: "2026-09-08",
    time: "09:30 AM - 02:00 PM",
    location: "Nakuru Athletics Club Grounds",
    county: "Nakuru County",
    accessType: "Open to public",
    description: "Consultative dialogue with agricultural cooperatives, local traders, and tech founders on rural economic development.",
    isUpcoming: false,
    category: "",
    status: "upcoming",
    verificationStatus: "verified"
  },

  // --- Upcoming Events ---
  {
    id: "evt-05",
    slug: "university-freshers-night-sep-2026",
    title: "University of Nairobi Freshers' Night",
    date: "2026-09-25",
    time: "06:00 PM - 11:00 PM",
    location: "Main Campus Grounds, Nairobi",
    county: "Nairobi County",
    accessType: "Students & Invited Guests",
    description: "An engagement session welcoming campus leaders and freshers for interactive governance discussions and networking.",
    isUpcoming: true,
    category: "",
    status: "upcoming",
    verificationStatus: "verified"
  },
  {
    id: "evt-06",
    slug: "mount-kenya-civic-forum-oct-2026",
    title: "Mount Kenya Civic Leadership Summit",
    date: "2026-10-12",
    time: "09:30 AM - 03:30 PM",
    location: "Nyeri Cultural Hall",
    county: "Nyeri County",
    accessType: "Open to public",
    description: "A regional dialogue focusing on economic empowerment, agricultural policy frameworks, and grassroots representation.",
    isUpcoming: true,
    category: "",
    status: "upcoming",
    verificationStatus: "verified"
  },
  {
    id: "evt-07",
    slug: "western-kenya-grassroots-rally-oct-2026",
    title: "Western Kenya Grassroots Town Hall",
    date: "2026-10-28",
    time: "10:00 AM - 04:00 PM",
    location: "Muliro Gardens, Kakamega",
    county: "Kakamega County",
    accessType: "Open to public",
    description: "Public forum on municipal service delivery, local governance transparency, and youth empowerment strategies.",
    isUpcoming: true,
    category: "",
    status: "upcoming",
    verificationStatus: "verified"
  },
  {
    id: "evt-08",
    slug: "kisumu-digital-governance-symposium-nov-2026",
    title: "Lake Basin Digital Governance Symposium",
    date: "2026-11-14",
    time: "08:30 AM - 03:00 PM",
    location: "Tom Mboya Labour College, Kisumu",
    county: "Kisumu County",
    accessType: "Open to public",
    description: "Exploring public open data tools, civic technology, and grassroots accountability frameworks.",
    isUpcoming: true,
    category: "",
    status: "upcoming",
    verificationStatus: "verified"
  },
  {
    id: "evt-09",
    slug: "national-delegates-conference-dec-2026",
    title: "Annual National Delegates Assembly",
    date: "2026-12-05",
    time: "08:00 AM - 05:00 PM",
    location: "Kasarani Indoor Arena, Nairobi",
    county: "Nairobi County",
    accessType: "Delegates & Registered Members",
    description: "National convention to review party integrity standards, elect committee leads, and unveil policy roadmaps.",
    isUpcoming: true,
    category: "",
    status: "upcoming",
    verificationStatus: "verified"
  },
];

export function getEvents(): EventRecord[] {
  return events;
}

export function getUpcomingEvents(): EventRecord[] {
  return events.filter((e) => e.isUpcoming);
}

export function getEventBySlug(slug: string): EventRecord | undefined {
  return events.find((e) => e.slug === slug);
}