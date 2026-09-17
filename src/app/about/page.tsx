"use client";

import { useId, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { PROTOTYPE_NOTICE } from "@/lib/constants";
import {
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Compass,
  HelpCircle,
  Layers,
  ArrowUpRight,
  CircleDot,
  Network,
  ScanLine,
  Orbit,
  CalendarDays,
  FileCheck2,
  MapPin,
  Scale,
  Users,
  Landmark,
  Eye,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const values = [
  {
    title: "Vision",
    description:
      "A democratic and prosperous Kenya where citizens are respected, heard and meaningfully involved in shaping the nation's future.",
  },
  {
    title: "Mission",
    description:
      "To advance leadership that listens to citizens, includes diverse communities and empowers Kenyans to participate in national development.",
  },
  {
    title: "The Listening Ear",
    description:
      "Our symbol is a listening ear — a daily reminder that the DCP exists to hear Wakenya first and act second. Every policy we advance begins with listening.",
  },
];

const guidingPrinciples = [
  {
    title: "Integrity",
    description: "Ethical, transparent leadership at every level.",
    icon: ShieldCheck,
  },
  {
    title: "Justice",
    description: "Fair treatment and equal opportunity for every citizen.",
    icon: Scale,
  },
  {
    title: "Unity",
    description: "One Kenya — bridging communities, regions and generations.",
    icon: Users,
  },
  {
    title: "Accountability",
    description: "Answerable to the people we serve, always.",
    icon: Eye,
  },
  {
    title: "Citizen Participation",
    description: "Decisions shaped by the voices of Wakenya.",
    icon: Network,
  },
  {
    title: "Inclusive Development",
    description: "Progress that reaches every county and household.",
    icon: Landmark,
  },
];

const registrationDetails = [
  {
    label: "Registered",
    value: "February 3, 2025",
    icon: CalendarDays,
  },
  {
    label: "Certificate No.",
    value: "103",
    icon: FileCheck2,
  },
  {
    label: "Country",
    value: "Kenya",
    icon: MapPin,
  },
];

const structure = [
  {
    title: "Party Leader and Deputy Party Leader",
    description: "Placeholder description of national organs.",
  },
  {
    title: "National Chairperson and Secretary-General",
    description: "Placeholder description of county-level organization.",
  },
  {
    title: "National Executive Committee (NEC)",
    description: "Placeholder description of standing committees.",
  },
  {
    title: "National Governing Council (NGC)",
    description: "Placeholder description of how membership is organized.",
  },
];

const faqs = [
  {
    q: "What is DCP?",
    a: "Democracy for the Citizens Party (DCP) was officially registered in Kenya on February 3, 2025, under Certificate Number 103. We exist to give every Kenyan, regardless of county, community or background, a seat at the table of national decision-making.",
  },
  {
    q: "What are its stated values?",
    a: "Public leadership is guided by six core principles that establish a direct connection between citizens, national development, and governance: Integrity ensures ethical and transparent leadership at all levels, Justice guarantees fair treatment and equal opportunity for every citizen, Unity fosters a single Kenya by bridging diverse communities, regions, and generations, Accountability maintains that leaders remain answerable to the people they serve, Citizen Participation actively shapes decisions through the voices of Wakenya, and Inclusive Development drives progress that reaches every county and household.",
  },
  {
    q: "Where can official documents be found?",
    a: "Explore our public document library for complete transparency, access the official DCP Constitution, rules, and policy frameworks freely available to all citizens.",
  },
  {
    q: "How can someone contact the organization?",
    a: "Visit the Contact page to send a direct message, find office locations, or access official inquiry channels.",
  },
  {
    q: "How can someone learn about membership?",
    a: "Visit the Membership page to explore eligibility criteria, benefits, and the current verified step-by-step registration process.",
  },
  {
    q: "Where can official announcements be verified?",
    a: "Visit the Statements page to review catalogued official releases, media briefings, and verified public updates.",
  },
];

function FloatingOrb({
  className = "",
  size = 260,
  variant = "mint",
}: {
  className?: string;
  size?: number;
  variant?: "mint" | "jungle";
}) {
  const reduceMotion = useReducedMotion();

  const gradients = {
    mint:
      "bg-[radial-gradient(circle,rgba(82,183,136,0.18)_0%,rgba(45,106,79,0.07)_45%,transparent_72%)]",
    jungle:
      "bg-[radial-gradient(circle,rgba(27,67,50,0.28)_0%,rgba(45,106,79,0.09)_48%,transparent_74%)]",
  };

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${gradients[variant]} ${className}`}
      style={{ width: size, height: size }}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: [1, 1.14, 1],
              opacity: [0.35, 0.7, 0.35],
              x: [0, 14, 0],
              y: [0, -12, 0],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    />
  );
}

function FloatingParticle({
  delay = 0,
  duration = 7,
  className = "",
  shape = "circle",
}: {
  delay?: number;
  duration?: number;
  className?: string;
  shape?: "circle" | "diamond" | "ring";
}) {
  const reduceMotion = useReducedMotion();

  const shapeStyles = {
    circle:
      "rounded-full bg-[var(--color-mint-bright,#52B788)]/60 shadow-[0_0_12px_rgba(82,183,136,0.45)]",
    diamond:
      "rotate-45 rounded-[2px] border border-[var(--color-mint-bright,#52B788)]/45 bg-[var(--color-mint-bright,#52B788)]/10",
    ring:
      "rounded-full border border-[var(--color-mint-bright,#52B788)]/40 bg-transparent",
  };

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute block ${shapeStyles[shape]} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -18, 0],
              x: [0, 8, 0],
              opacity: [0.25, 0.85, 0.25],
              scale: [0.8, 1.15, 0.8],
              rotate:
                shape === "diamond" ? [45, 135, 45] : undefined,
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    />
  );
}

function OrbitDecoration({
  size = 260,
  className = "",
  duration = 28,
}: {
  size?: number;
  className?: string;
  duration?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border border-[var(--color-mint-bright,#52B788)]/15 ${className}`}
      style={{
        width: size,
        height: size,
      }}
      animate={
        reduceMotion
          ? undefined
          : {
              rotate: 360,
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration,
              repeat: Infinity,
              ease: "linear",
            }
      }
    >
      <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_14px_rgba(82,183,136,0.7)]" />
      <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-mint-bright,#52B788)]/70" />
    </motion.div>
  );
}

function CornerBrackets() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-[var(--color-mint-bright,#52B788)]/25 transition-all duration-300 group-hover:h-7 group-hover:w-7 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-[var(--color-mint-bright,#52B788)]/25 transition-all duration-300 group-hover:h-7 group-hover:w-7 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-[var(--color-mint-bright,#52B788)]/25 transition-all duration-300 group-hover:h-7 group-hover:w-7 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-[var(--color-mint-bright,#52B788)]/25 transition-all duration-300 group-hover:h-7 group-hover:w-7 group-hover:border-[var(--color-mint-bright,#52B788)]/70"
      />
    </>
  );
}

function SectionMarker({
  label,
  icon: Icon,
}: {
  label: string;
  icon: typeof Sparkles;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Eyebrow>{label}</Eyebrow>

      <motion.span
        aria-hidden="true"
        className="h-px w-8 origin-left bg-[var(--color-mint-bright,#52B788)]/45"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
      />

      <Icon className="h-3.5 w-3.5 text-[var(--color-mint-bright,#52B788)]" />
    </div>
  );
}

function AccordionItem({
  item,
  isOpen,
  onClick,
  index,
}: {
  item: {
    q: string;
    a: string;
  };
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const id = useId();

  return (
    <motion.div
      layout
      className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
        isOpen
          ? "border-[var(--color-mint-bright,#52B788)]/35 bg-[var(--color-savanna-deep,#1B4332)]/[0.06]"
          : "border-transparent hover:border-[var(--color-mint-bright,#52B788)]/20 hover:bg-[var(--color-savanna-deep,#1B4332)]/[0.035]"
      }`}
      whileHover={reduceMotion ? undefined : { x: 2 }}
    >
      <button
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
        className="relative flex w-full items-center gap-4 px-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-mint-bright,#52B788)] sm:px-5 sm:py-5"
      >
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border font-mono text-[10px] font-bold transition-all duration-300 ${
            isOpen
              ? "border-[var(--color-mint-bright,#52B788)]/40 bg-[var(--color-savanna-deep,#1B4332)] text-[var(--color-mint-bright,#52B788)]"
              : "border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-savanna-deep,#1B4332)]/5 text-[var(--color-mint-soft,#2D6A4F)]"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          className={`flex-1 font-display text-base font-bold leading-snug transition-colors duration-200 sm:text-lg ${
            isOpen
              ? "text-[var(--color-savanna-deep,#1B4332)]"
              : "text-[var(--color-ink,#1A1A1A)] group-hover:text-[var(--color-savanna-deep,#1B4332)]"
          }`}
        >
          {item.q}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease }}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
            isOpen
              ? "border-[var(--color-mint-bright,#52B788)]/40 bg-[var(--color-savanna-deep,#1B4332)] text-[var(--color-mint-bright,#52B788)]"
              : "border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-savanna-deep,#1B4332)]/5 text-[var(--color-mint-soft,#2D6A4F)]"
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>

        {isOpen && (
          <motion.span
            layoutId="faq-active-line"
            className="absolute bottom-0 left-5 right-5 h-0.5 rounded-full bg-gradient-to-r from-[var(--color-savanna-deep,#1B4332)] via-[var(--color-mint-bright,#52B788)] to-transparent"
          />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${id}`}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, height: 0 }
            }
            animate={{ opacity: 1, height: "auto" }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, height: 0 }
            }
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 pl-16 pr-5 sm:px-5 sm:pb-5 sm:pl-[4.5rem]">
              <p className="max-w-2xl text-sm leading-7 text-[var(--color-ink-soft,#64748B)] sm:text-[15px]">
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AboutPage() {
  const reduceMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease,
      },
    },
  };

  return (
    <main className="relative overflow-hidden bg-[var(--color-paper,#FAF9F6)]">
      {/* =========================================================
          HERO
      ========================================================= */}

      <Section
        border={false}
        animateEntry={false}
        className="relative overflow-hidden bg-[var(--color-savanna-deep,#1B4332)] py-16 text-white sm:py-20 lg:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(82,183,136,0.18) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(82,183,136,0.18) 1px, transparent 1px)
            `,
            backgroundSize: "42px 42px",
          }}
        />

        <FloatingOrb
          size={520}
          variant="mint"
          className="-left-48 -top-52"
        />

        <FloatingOrb
          size={420}
          variant="jungle"
          className="-bottom-48 right-[-120px]"
        />

        <OrbitDecoration
          size={340}
          duration={42}
          className="-right-36 -top-36"
        />

        <OrbitDecoration
          size={190}
          duration={30}
          className="-bottom-20 left-[-70px]"
        />

        <FloatingParticle
          shape="circle"
          className="left-[8%] top-[25%] h-2.5 w-2.5"
          delay={0.2}
          duration={5}
        />

        <FloatingParticle
          shape="diamond"
          className="right-[12%] top-[22%] h-3.5 w-3.5"
          delay={1}
          duration={7}
        />

        <FloatingParticle
          shape="ring"
          className="bottom-[22%] left-[17%] h-5 w-5"
          delay={1.5}
          duration={8}
        />

        <FloatingParticle
          shape="circle"
          className="bottom-[18%] right-[26%] h-1.5 w-1.5"
          delay={0.7}
          duration={5.5}
        />

        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 24,
                  }
            }
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            transition={{
              duration: 0.75,
              ease,
            }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2.5">
              <Eyebrow>About DCP Kenya</Eyebrow>

              <span className="h-px w-8 bg-[var(--color-mint-bright,#52B788)]/50" />

              <Sparkles className="h-3.5 w-3.5 text-[var(--color-mint-bright,#52B788)]" />
            </div>

            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-7xl">
              A political party,
              <span className="relative block text-[var(--color-mint-bright,#52B788)]">
                built to listen.

                <motion.span
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 h-px w-32 bg-gradient-to-r from-[var(--color-mint-bright,#52B788)] to-transparent"
                  initial={{ scaleX: 0, transformOrigin: "left" }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: 0.8,
                    duration: 0.7,
                    ease,
                  }}
                />
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              Democracy for the Citizens Party is a Kenyan political movement
              founded on the belief that governance must begin with the voice
              of the people.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {/* <VerificationBadge status="pending-verification" /> */}

              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-mint-bright,#52B788)]/20 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/65">
                <CircleDot className="h-3 w-3 text-[var(--color-mint-bright,#52B788)]" />
                ITS HERE! DCP Kenya officially registered under Certificate Number 103.
              </span>
            </div>
          </motion.div>

          {/* HERO VISUAL */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.9,
                    rotate: 3,
                  }
            }
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                  }
            }
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease,
            }}
            className="relative mx-auto hidden h-[300px] w-full max-w-[320px] lg:block"
          >
            <div className="absolute inset-8 rounded-full border border-[var(--color-mint-bright,#52B788)]/15" />

            <motion.div
              className="absolute inset-16 rounded-full border border-dashed border-[var(--color-mint-bright,#52B788)]/25"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute inset-24 rounded-full border border-[var(--color-mint-bright,#52B788)]/10"
              animate={reduceMotion ? undefined : { rotate: -360 }}
              transition={{
                duration: 38,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-mint-bright,#52B788)]/10 shadow-[0_0_60px_rgba(82,183,136,0.14)] backdrop-blur-md">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--color-mint-bright,#52B788)]/30 bg-[var(--color-savanna-deep,#1B4332)]">
                <Network className="h-8 w-8 text-[var(--color-mint-bright,#52B788)]" />
              </div>
            </div>

            <motion.div
              className="absolute left-0 top-12 rounded-xl border border-[var(--color-mint-bright,#52B788)]/20 bg-white/[0.05] px-3 py-2.5 backdrop-blur-md"
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="block text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Principle
              </span>

              <span className="mt-1 block text-xs font-bold text-[var(--color-mint-bright,#52B788)]">
                Listening
              </span>
            </motion.div>

            <motion.div
              className="absolute bottom-10 right-0 rounded-xl border border-[var(--color-mint-bright,#52B788)]/20 bg-white/[0.05] px-3 py-2.5 backdrop-blur-md"
              animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="block text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Direction
              </span>

              <span className="mt-1 block text-xs font-bold text-white">
                Citizen-led
              </span>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative z-10 mt-12 flex items-center gap-3 border-t border-[var(--color-mint-bright,#52B788)]/15 pt-5">
          <ScanLine className="h-4 w-4 shrink-0 text-[var(--color-mint-bright,#52B788)]" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
            DCP Kenya · About
          </span>

          <span className="h-px flex-1 bg-gradient-to-r from-[var(--color-mint-bright,#52B788)]/25 to-transparent" />
        </div>
      </Section>

      {/* =========================================================
          IDENTITY / VALUES
      ========================================================= */}

      <Section
        border
        animateEntry={false}
        className="relative bg-[var(--color-paper,#FAF9F6)] py-16 sm:py-20 lg:py-24"
      >
        <FloatingOrb
          size={340}
          variant="mint"
          className="-right-28 -top-24"
        />

        <FloatingParticle
          shape="diamond"
          className="left-[7%] top-[18%] h-3 w-3"
          delay={0.3}
        />

        <FloatingParticle
          shape="ring"
          className="right-[8%] bottom-[20%] h-5 w-5"
          delay={1.2}
        />

        <div className="relative z-10 mb-10 max-w-2xl sm:mb-12">
          <SectionMarker
            label="Identity and values"
            icon={Compass}
          />

          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-[var(--color-savanna-deep,#1B4332)] sm:text-4xl lg:text-5xl">
            Overview{" "}
            <span className="relative text-[var(--color-mint-soft,#2D6A4F)]">
              of the party.
              <span className="absolute -bottom-1 left-0 h-px w-full bg-[var(--color-mint-bright,#52B788)]/35" />
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-ink-soft,#64748B)] sm:text-base">
            Democracy for the Citizens Party (DCP) was officially registered
            in Kenya on February 3, 2025, under Certificate Number 103. We
            exist to give every Kenyan, regardless of county, community or
            background, a seat at the table of national decision-making.
          </p>
        </div>

        <motion.div
          variants={reduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-70px",
          }}
          className="relative z-10 grid gap-5 md:grid-cols-3"
        >
          {values.map((v, idx) => (
            <motion.div
              key={v.title}
              variants={reduceMotion ? undefined : cardVariants}
              className="h-full"
            >
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -6 }}
                transition={{ duration: 0.25, ease }}
                className="group relative flex h-full min-h-[270px] flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper-raised,#F4F1EA)]/80 p-6 shadow-[0_10px_30px_rgba(27,67,50,0.04)] backdrop-blur-md transition-all duration-300 hover:border-[var(--color-mint-bright,#52B788)]/55 hover:bg-[var(--color-paper,#FAF9F6)] hover:shadow-[0_20px_45px_rgba(27,67,50,0.09)] sm:p-7"
              >
                <CornerBrackets />

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(82,183,136,0.16),transparent_70%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-savanna-deep,#1B4332)]/8 font-mono text-xs font-bold text-[var(--color-mint-soft,#2D6A4F)]">
                      0{idx + 1}
                    </span>

                    <ArrowUpRight className="h-4 w-4 text-[var(--color-mint-soft,#2D6A4F)]/35 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-mint-bright,#52B788)]" />
                  </div>

                  <h3 className="mt-8 font-display text-xl font-bold leading-snug tracking-tight text-[var(--color-ink,#1A1A1A)] transition-colors duration-300 group-hover:text-[var(--color-savanna-deep,#1B4332)] sm:text-2xl">
                    {v.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[var(--color-ink-soft,#64748B)]">
                    {v.description}
                  </p>
                </div>

                <div className="relative mt-7 flex items-center justify-between border-t border-[var(--color-mint-bright,#52B788)]/15 pt-4">
                  <VerificationBadge status="placeholder" />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-soft,#64748B)]/50">
                    Pending
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[var(--color-savanna-deep,#1B4332)] via-[var(--color-mint-bright,#52B788)] to-transparent transition-all duration-500 group-hover:w-full"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* =========================================================
          GUIDING PRINCIPLES + REGISTRATION
      ========================================================= */}

      <Section
        border
        animateEntry={false}
        className="relative overflow-hidden bg-[var(--color-paper-raised,#F4F1EA)] py-16 sm:py-20 lg:py-24"
      >
        <FloatingOrb
          size={420}
          variant="jungle"
          className="-left-44 top-16"
        />

        <FloatingOrb
          size={280}
          variant="mint"
          className="-right-32 bottom-0"
        />

        <FloatingParticle
          shape="circle"
          className="right-[8%] top-[18%] h-2 w-2"
          delay={0.5}
          duration={6}
        />

        <FloatingParticle
          shape="diamond"
          className="left-[4%] bottom-[20%] h-3 w-3"
          delay={1.2}
          duration={7}
        />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:items-start lg:gap-14">
          {/* GUIDING PRINCIPLES */}

          <div>
            <div className="mb-8 max-w-2xl">
              <SectionMarker
                label="Guiding principles"
                icon={ShieldCheck}
              />

              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-[var(--color-savanna-deep,#1B4332)] sm:text-4xl lg:text-5xl">
                Principles that guide{" "}
                <span className="text-[var(--color-mint-soft,#2D6A4F)]">
                  public leadership.
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-ink-soft,#64748B)] sm:text-base">
                These principles provide a clear framework for how citizens,
                leadership and national development should connect.
              </p>
            </div>

            <motion.div
              variants={reduceMotion ? undefined : containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                margin: "-70px",
              }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {guidingPrinciples.map((principle, idx) => {
                const Icon = principle.icon;

                return (
                  <motion.div
                    key={principle.title}
                    variants={reduceMotion ? undefined : cardVariants}
                  >
                    <motion.div
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              y: -4,
                              scale: 1.01,
                            }
                      }
                      transition={{ duration: 0.25, ease }}
                      className="group relative h-full overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-paper,#FAF9F6)]/85 p-5 shadow-[0_10px_28px_rgba(27,67,50,0.05)] backdrop-blur-md transition-all duration-300 hover:border-[var(--color-mint-bright,#52B788)]/55 hover:shadow-[0_18px_38px_rgba(27,67,50,0.09)] sm:p-6"
                    >
                      <CornerBrackets />

                      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(82,183,136,0.13),transparent_70%)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                      <div className="relative flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-savanna-deep,#1B4332)]/7 text-[var(--color-mint-soft,#2D6A4F)] transition-all duration-300 group-hover:border-[var(--color-mint-bright,#52B788)]/50 group-hover:bg-[var(--color-savanna-deep,#1B4332)]/10 group-hover:text-[var(--color-mint-bright,#52B788)]">
                          <Icon className="h-4.5 w-4.5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--color-mint-soft,#2D6A4F)]">
                              0{idx + 1}
                            </span>

                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,#52B788)] opacity-60 shadow-[0_0_8px_rgba(82,183,136,0.6)]" />
                          </div>

                          <h3 className="mt-2 font-display text-lg font-bold leading-snug text-[var(--color-ink,#1A1A1A)] transition-colors duration-300 group-hover:text-[var(--color-savanna-deep,#1B4332)]">
                            {principle.title}
                          </h3>

                          <p className="mt-1.5 text-sm leading-6 text-[var(--color-ink-soft,#64748B)]">
                            {principle.description}
                          </p>
                        </div>
                      </div>

                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[var(--color-savanna-deep,#1B4332)] via-[var(--color-mint-bright,#52B788)] to-transparent transition-all duration-500 group-hover:w-full"
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* REGISTRATION DETAILS */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 25,
                  }
            }
            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    x: 0,
                  }
            }
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.7, ease }}
            className="lg:sticky lg:top-24"
          >
            <div className="group relative overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/30 bg-[var(--color-paper,#FAF9F6)] p-6 shadow-[0_18px_45px_rgba(27,67,50,0.07)] sm:p-7">
              <CornerBrackets />

              <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(82,183,136,0.18),transparent_70%)] blur-2xl" />

              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--color-mint-soft,#2D6A4F)]">
                      Official record
                    </span>

                    <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--color-savanna-deep,#1B4332)]">
                      Registration details
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-savanna-deep,#1B4332)]/7">
                    <FileCheck2 className="h-5 w-5 text-[var(--color-mint-bright,#52B788)]" />
                  </div>
                </div>

                <div className="my-6 h-px bg-[var(--color-mint-bright,#52B788)]/15" />

                <div className="space-y-3">
                  {registrationDetails.map((detail) => {
                    const Icon = detail.icon;

                    return (
                      <div
                        key={detail.label}
                        className="group/detail flex items-center gap-3 rounded-xl border border-transparent px-2 py-2 transition-colors duration-200 hover:border-[var(--color-mint-bright,#52B788)]/15 hover:bg-[var(--color-savanna-deep,#1B4332)]/[0.035]"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-savanna-deep,#1B4332)]/5">
                          <Icon className="h-4 w-4 text-[var(--color-mint-soft,#2D6A4F)] transition-colors group-hover/detail:text-[var(--color-mint-bright,#52B788)]" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-soft,#64748B)]/70">
                            {detail.label}
                          </p>

                          <p className="mt-0.5 text-sm font-bold text-[var(--color-ink,#1A1A1A)]">
                            {detail.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-center gap-2 rounded-xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-mint-bright,#52B788)]/[0.06] px-3 py-2.5">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--color-mint-bright,#52B788)]" />

                  <span className="text-[10px] font-semibold leading-5 text-[var(--color-mint-soft,#2D6A4F)]">
                    Registration information displayed for reference.
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* =========================================================
          ORGANIZATION STRUCTURE
      ========================================================= */}

      <Section
        border
        animateEntry={false}
        className="relative bg-[var(--color-paper,#FAF9F6)] py-16 sm:py-20 lg:py-24"
      >
        <FloatingOrb
          size={400}
          variant="jungle"
          className="-left-36 top-1/4"
        />

        <OrbitDecoration
          size={220}
          duration={35}
          className="-right-24 top-10"
        />

        <FloatingParticle
          shape="circle"
          className="right-[12%] bottom-[18%] h-2.5 w-2.5"
          delay={0.7}
          duration={5}
        />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-16">
          <div className="max-w-xl">
            <SectionMarker
              label="Organization"
              icon={Layers}
            />

            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-[var(--color-savanna-deep,#1B4332)] sm:text-4xl lg:text-5xl">
              How the party is{" "}
              <span className="text-[var(--color-mint-soft,#2D6A4F)]">
                structured.
              </span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-[var(--color-ink-soft,#64748B)] sm:text-base">
              The organizational hierarchy is presented as a clear,
              navigable system while approved structural information is still
              pending.
            </p>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper-raised,#F4F1EA)]/75 px-4 py-3.5 backdrop-blur-sm">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-mint-bright,#52B788)]" />

              <span className="text-xs font-medium leading-5 text-[var(--color-ink-soft,#64748B)]">
                Structure is displayed as a placeholder until source material
                is verified.
              </span>
            </div>
          </div>

          <motion.div
            variants={reduceMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-70px",
            }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {structure.map((s, idx) => (
              <motion.div
                key={s.title}
                variants={reduceMotion ? undefined : cardVariants}
              >
                <motion.div
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -4,
                          scale: 1.01,
                        }
                  }
                  transition={{ duration: 0.25, ease }}
                  className="group relative min-h-[190px] overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper-raised,#F4F1EA)]/75 p-5 shadow-[0_8px_24px_rgba(27,67,50,0.04)] backdrop-blur-md transition-all duration-300 hover:border-[var(--color-mint-bright,#52B788)]/50 hover:bg-[var(--color-paper,#FAF9F6)] hover:shadow-[0_18px_38px_rgba(27,67,50,0.08)] sm:p-6"
                >
                  <CornerBrackets />

                  <div className="relative flex items-center justify-between">
                    <span className="rounded-full border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-savanna-deep,#1B4332)]/5 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--color-mint-soft,#2D6A4F)]">
                      Tier 0{idx + 1}
                    </span>

                    <motion.div
                      whileHover={
                        reduceMotion ? undefined : { rotate: 90 }
                      }
                    >
                      <Network className="h-4 w-4 text-[var(--color-mint-bright,#52B788)]/50 transition-colors group-hover:text-[var(--color-mint-bright,#52B788)]" />
                    </motion.div>
                  </div>

                  <h3 className="relative mt-7 font-display text-lg font-bold leading-snug text-[var(--color-savanna-deep,#1B4332)] sm:text-xl">
                    {s.title}
                  </h3>

                  <p className="relative mt-2.5 text-sm leading-6 text-[var(--color-ink-soft,#64748B)]">
                    {s.description}
                  </p>

                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[var(--color-savanna-deep,#1B4332)] to-[var(--color-mint-bright,#52B788)] transition-all duration-500 group-hover:w-full"
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* =========================================================
          FAQ
      ========================================================= */}

      <Section
        border
        animateEntry={false}
        className="relative bg-[var(--color-paper-raised,#F4F1EA)] py-16 sm:py-20 lg:py-24"
      >
        <FloatingOrb
          size={360}
          variant="mint"
          className="-right-32 top-1/4"
        />

        <FloatingParticle
          shape="ring"
          className="left-[7%] top-[20%] h-5 w-5"
          delay={0.4}
        />

        <FloatingParticle
          shape="diamond"
          className="right-[10%] bottom-[18%] h-3 w-3"
          delay={1.5}
        />

        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-10 max-w-2xl sm:mb-12">
            <SectionMarker
              label="Frequently asked questions"
              icon={HelpCircle}
            />

            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-[var(--color-savanna-deep,#1B4332)] sm:text-4xl lg:text-5xl">
              Common questions,{" "}
              <span className="text-[var(--color-mint-soft,#2D6A4F)]">
                answered plainly.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-ink-soft,#64748B)] sm:text-base">
              Expand a question to reveal the currently available answer.
              Placeholder responses remain clearly identified.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-paper,#FAF9F6)]/80 p-2 shadow-[0_18px_50px_rgba(27,67,50,0.06)] backdrop-blur-md sm:p-3">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(82,183,136,0.18) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(82,183,136,0.18) 1px, transparent 1px)
                `,
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative flex flex-col gap-1">
              {faqs.map((f, idx) => (
                <AccordionItem
                  key={f.q}
                  item={f}
                  index={idx}
                  isOpen={openFaq === idx}
                  onClick={() =>
                    setOpenFaq(openFaq === idx ? null : idx)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* =========================================================
          PROTOTYPE NOTICE
      ========================================================= */}

      <Section
        border={false}
        animateEntry={false}
        className="relative bg-[var(--color-savanna-deep,#1B4332)] py-8 sm:py-10"
      >
        <FloatingOrb
          size={280}
          variant="mint"
          className="-left-20 -top-28"
        />

        <FloatingParticle
          shape="circle"
          className="right-[12%] top-[30%] h-2 w-2"
          delay={0.8}
        />

        <div className="relative z-10">
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 14,
                  }
            }
            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: true,
              margin: "-50px",
            }}
            transition={{
              duration: 0.55,
              ease,
            }}
            className="group relative overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-mint-bright,#52B788)]/[0.06] p-5 backdrop-blur-md sm:p-6"
          >
            <CornerBrackets />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-mint-bright,#52B788)]/10">
                <ShieldCheck className="h-5 w-5 text-[var(--color-mint-bright,#52B788)]" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-display text-sm font-bold uppercase tracking-[0.12em] text-white">
                    Notice
                  </span>

                  <span className="h-1 w-1 rounded-full bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_8px_rgba(82,183,136,0.7)]" />

                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--color-mint-bright,#52B788)]/70">
                    Verification layer
                  </span>
                </div>

                <p className="mt-2 max-w-4xl text-xs leading-6 text-white/60 sm:text-sm">
                  {PROTOTYPE_NOTICE}
                </p>
              </div>

              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        rotate: 360,
                      }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }
                }
                className="ml-auto hidden shrink-0 sm:block"
              >
                <Orbit className="h-5 w-5 text-[var(--color-mint-bright,#52B788)]/40" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}