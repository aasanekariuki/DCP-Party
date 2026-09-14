# DCP Kenya — Civic Platform Prototype

An **unofficial frontend prototype** for a Democracy for the Citizens Party
(DCP) website. It has not been confirmed as an official or authorized DCP
channel — see the notice in `src/lib/constants.ts` and in the site footer.

Every piece of content that could be mistaken for a real fact (names,
biographies, dates, policy positions, statements, statistics, contact
details) is a clearly labeled **placeholder** or **awaiting verification**
record. Nothing here should be treated as accurate until it is replaced
with sourced, approved copy.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion ·
Lucide React. No CMS, backend, or payment integration is wired up in this
phase — the data layer is structured so one can be added later without a
frontend rewrite (see "Connecting a real backend or CMS" below).

## Getting started

```bash
npm install
npm run dev       # start the dev server at http://localhost:3000
npm run build     # production build
npm run start     # serve the production build
npm run lint       # eslint
```

### A note on fonts

This build intentionally does **not** fetch fonts from Google Fonts at
build time, so it can build in fully offline / restricted-network
environments. The design tokens in `src/app/globals.css` fall back to
system serif/sans stacks that approximate the intended Fraunces (display)
/ Inter (body) pairing. To restore the actual webfonts in an environment
with internet access, reintroduce `next/font/google` in
`src/app/layout.tsx`:

```ts
import { Fraunces, Inter } from "next/font/google";
const fraunces = Fraunces({ variable: "--font-display", subsets: ["latin"] });
const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
// then add `${fraunces.variable} ${inter.variable}` to the <html> className
```

## Where content lives

All mock content is in `src/data/*.ts`, typed against `src/lib/types.ts`.
Every record carries a `verificationStatus`: `"verified"`,
`"pending-verification"`, or `"placeholder"`. The `VerificationBadge`
component renders this everywhere content appears.

| File | Powers |
|---|---|
| `src/data/policies.ts` | `/policies`, `/policies/[slug]`, homepage policy preview |
| `src/data/leadership.ts` | `/leadership`, `/leadership/[slug]`, homepage preview |
| `src/data/news.ts` | `/news`, `/news/[slug]`, homepage preview |
| `src/data/statements.ts` | `/statements`, `/statements/[slug]` |
| `src/data/events.ts` | `/events`, `/events/[slug]` (currently empty — renders the designed empty state) |
| `src/data/documents.ts` | `/documents`, homepage document preview |
| `src/data/media.ts` | `/media` (currently empty — no verified media on record) |
| `src/data/history.ts` | `/history` timeline |
| `src/data/navigation.ts` | header mega-menu and footer link groups |

### How to add a new policy

Add an object to the `policies` array in `src/data/policies.ts` matching
the `Policy` interface, with a unique `slug`. The `/policies` and
`/policies/[slug]` pages pick it up automatically — no route code needed.

### How to add a news article

Same pattern in `src/data/news.ts` — add to the `newsArticles` array with
a unique `slug`. Replace the `DEMO CONTENT` comment and placeholder text
with approved, sourced copy before publishing.

### How to add a leadership profile

Add to `leadershipProfiles` in `src/data/leadership.ts`. `category` drives
the filter chips on `/leadership`; keep the list of categories consistent
or add a new one — the filter UI reads `leadershipCategories`, which is
derived automatically from the data.

### How to add an event

Add to `events` in `src/data/events.ts`. Once the array is non-empty, the
`/events` and homepage "Upcoming activity" sections automatically switch
from their empty state to real cards, split into upcoming/past by
`status`.

### How to replace the logo

The temporary wordmark lives inline in `src/components/layout/SiteHeader.tsx`
and `SiteFooter.tsx` (a single `D` monogram in a dark square). Replace
both with an `<Image>` pointing at an approved logo asset placed under
`public/images/`. Do not assume any particular mark, color, or slogan is
official — see `src/lib/constants.ts` for the standing disclosure notice.

## Connecting a real backend or CMS

Every `src/data/*.ts` file exports plain accessor functions
(`getPolicies()`, `getPolicyBySlug()`, `getNewsArticles()`, etc.). Pages
call only these functions, never the arrays directly (aside from
`generateStaticParams`, which also goes through the same exports). To
swap in Postgres, Supabase, Firebase, a REST API, or a headless CMS:

1. Keep the exported function names and return shapes (the `interface`s
   in `src/lib/types.ts`) identical.
2. Replace each function body with a `fetch()`/query call, making the
   function `async` and awaiting it at each call site.
3. Nothing in the component layer needs to change, since components only
   ever receive already-resolved data as props.

Forms (`src/components/forms/*`) already isolate their "submit" logic
into single functions (`submitContactForm`, `submitFeedbackForm`) marked
as future API integration points — swap the demo `setTimeout` body for a
real request when a backend exists.

## What still needs verification before this could go live

- Every leadership name, role, and biography (`src/data/leadership.ts`)
- All historical milestones and dates (`src/data/history.ts`)
- All policy summaries and body text (`src/data/policies.ts`)
- All news articles and official statements
- All contact details (email, phone, office address) on `/contact`
- Membership eligibility, fee, and process on `/membership`
- The official logo, brand colors, and slogan (a placeholder palette and
  wordmark are used throughout — see `src/app/globals.css`)
- Any financial/accountability report referenced from `/transparency`

## Project structure

```
src/
├── app/            # routes (App Router)
├── components/
│   ├── layout/     # header, footer, mobile nav, page containers
│   ├── ui/         # Button, VerificationBadge, Eyebrow, EmptyState
│   ├── home/       # homepage sections
│   ├── leadership/ # leadership directory + card
│   ├── policies/   # policy explorer
│   ├── content/    # news/statements/documents explorers, search results
│   ├── timeline/   # history timeline
│   └── forms/      # contact, citizen feedback, get-involved chooser
├── data/           # mock content + accessor functions (see above)
└── lib/            # types, constants, search abstraction
```

## Accessibility

Skip-to-content link, semantic landmarks, full keyboard support in the
header dropdowns and mobile drawer (Escape to close, scroll lock, focus
moved into the panel on open), visible focus rings, labeled form fields
with inline error text, and `prefers-reduced-motion` handling in
`globals.css`. Run a fresh audit (axe, Lighthouse) before treating this
as accessibility-complete — this is a first pass, not a certification.
# DCP-Party
