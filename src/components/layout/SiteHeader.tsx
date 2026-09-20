"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  ChevronDown,
  Sparkles,
  ArrowUpRight,
  CircleDot,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

import { primaryNav } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { PageContainer } from "@/components/layout/PageContainer";

const ease = [0.16, 1, 0.3, 1] as const;

function FloatingParticle({
  delay = 0,
  duration = 6,
  className = "",
  size = "small",
}: {
  delay?: number;
  duration?: number;
  className?: string;
  size?: "tiny" | "small" | "medium";
}) {
  const reduceMotion = useReducedMotion();

  const sizes = {
    tiny: "h-1 w-1",
    small: "h-1.5 w-1.5",
    medium: "h-2 w-2",
  };

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full bg-[#2D6A4F]/50 blur-[1px] ${sizes[size]} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -12, 0, 8, 0],
              x: [0, 5, -3, 4, 0],
              opacity: [0.15, 0.8, 0.35, 0.7, 0.15],
              scale: [0.7, 1.15, 0.8, 1, 0.7],
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

function FloatingOrb({
  className = "",
  size = 160,
  opacity = 0.55,
}: {
  className?: string;
  size?: number;
  opacity?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full bg-[radial-gradient(circle,rgba(27,67,50,0.18)_0%,rgba(27,67,50,0.06)_42%,transparent_72%)] blur-2xl ${className}`}
      style={{ width: size, height: size }}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: [1, 1.12, 1],
              opacity: [opacity * 0.6, opacity, opacity * 0.6],
              x: [0, 8, -5, 0],
              y: [0, -8, 4, 0],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    />
  );
}

function FloatingDiamond({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute h-2.5 w-2.5 rotate-45 border border-[#1B4332]/40 bg-[#1B4332]/10 ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -9, 0],
              rotate: [45, 90, 45],
              opacity: [0.25, 0.8, 0.25],
            }
      }
      transition={{
        duration: 5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function HeaderGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.32]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(27,67,50,0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(27,67,50,0.06) 1px, transparent 1px)
        `,
        backgroundSize: "42px 42px",
        maskImage:
          "linear-gradient(to bottom, black 0%, transparent 95%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, transparent 95%)",
      }}
    />
  );
}

function OrbitDecoration() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute right-[30%] top-1/2 hidden h-10 w-10 -translate-y-1/2 md:block"
      animate={
        reduceMotion
          ? undefined
          : {
              rotate: 360,
            }
      }
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <span className="absolute inset-1 rounded-full border border-[#1B4332]/20" />
      <span className="absolute inset-2.5 rounded-full border border-[#2D6A4F]/30" />
      <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#1B4332] shadow-[0_0_12px_rgba(27,67,50,0.55)]" />
    </motion.div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const smoothScroll = useSpring(scrollY, {
    stiffness: 100,
    damping: 24,
    mass: 0.35,
  });

  const backgroundY = useTransform(smoothScroll, [0, 300], [0, -12]);
  const glowY = useTransform(smoothScroll, [0, 300], [0, 18]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 18);
  });

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full"
      onMouseLeave={() => setOpenMenu(null)}
    >
      {/* =========================================================
          BACKDROP
      ========================================================== */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden border-b border-[var(--color-paper-line,#E5E7EB)] bg-[var(--color-paper,#FAF9F6)]/90 backdrop-blur-xl"
        animate={{
          boxShadow: scrolled
            ? "0 16px 42px -24px rgba(27,67,50,0.24)"
            : "0 0 0 0 rgba(26,26,26,0)",
        }}
        transition={{ duration: 0.3, ease }}
      >
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-x-0 -top-12 h-28 bg-[radial-gradient(ellipse_at_top,rgba(27,67,50,0.08),transparent_65%)]"
        />

        <motion.div
          style={{ y: glowY }}
          className="absolute -left-24 top-0 h-40 w-72 rounded-full bg-[radial-gradient(circle,rgba(27,67,50,0.1),transparent_70%)] blur-2xl"
        />

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#1B4332]/30 to-transparent" />

        <HeaderGrid />
      </motion.div>

      {/* =========================================================
          AMBIENT OBJECTS
      ========================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <FloatingOrb
          size={190}
          className="-left-20 -top-28"
          opacity={0.45}
        />

        <FloatingOrb
          size={145}
          className="right-[7%] -top-20"
          opacity={0.35}
        />

        <FloatingOrb
          size={110}
          className="left-[46%] -top-20 opacity-30"
          opacity={0.25}
        />

        <FloatingParticle
          className="left-[7%] top-1/2"
          delay={0.2}
          duration={5.2}
          size="medium"
        />

        <FloatingParticle
          className="left-[24%] top-[28%]"
          delay={1.1}
          duration={6.4}
        />

        <FloatingParticle
          className="left-[41%] top-[72%]"
          delay={0.8}
          duration={5.7}
          size="tiny"
        />

        <FloatingParticle
          className="right-[28%] top-[30%]"
          delay={1.7}
          duration={6.8}
        />

        <FloatingParticle
          className="right-[13%] top-[65%]"
          delay={0.4}
          duration={5.9}
          size="tiny"
        />

        <FloatingParticle
          className="right-[5%] top-[25%]"
          delay={2.1}
          duration={7}
          size="medium"
        />

        <FloatingDiamond
          className="left-[18%] top-5"
          delay={0.3}
        />

        <FloatingDiamond
          className="right-[38%] top-7"
          delay={1.2}
        />

        <OrbitDecoration />
      </div>

      {/* =========================================================
          MAIN HEADER CONTENT
      ========================================================== */}
      <PageContainer className="relative flex h-[76px] items-center justify-between gap-5 py-2.5 sm:h-20 sm:py-3">
        {/* =======================================================
            BRAND
        ======================================================== */}
        <Link
  href="/"
  aria-label="DCP Kenya home"
  className="group relative -ml-2 flex shrink-0 items-center gap-3.5 rounded-xl p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332] focus-visible:ring-offset-2"
>
  <motion.div
    whileHover={
      reduceMotion
        ? undefined
        : {
            y: -2,
            scale: 1.05,
            rotate: -2,
          }
    }
    whileTap={
      reduceMotion
        ? undefined
        : {
            scale: 0.96,
          }
    }
    transition={{
      type: "spring",
      stiffness: 420,
      damping: 25,
    }}
    className="relative"
  >
    {/* Ambient hover glow behind logo */}
    <div className="absolute -inset-2 rounded-full bg-[#1B4332]/25 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />

    {/* LARGER LOGO CONTAINER */}
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14">
      <img
        src="/images/dcp-logo.png"
        alt="DCP Kenya"
        className="relative z-10 h-full w-full object-contain filter drop-shadow-[0_4px_12px_rgba(27,67,50,0.25)] transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  </motion.div>

  {/* BRAND TEXT */}
  <div className="min-w-0">
    <motion.span className="block truncate font-display text-lg font-bold tracking-tight text-[var(--color-ink,#1A1A1A)] transition-colors duration-200 group-hover:text-[#1B4332] sm:text-xl">
      DCP Kenya
    </motion.span>

    <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-soft,#64748B)] sm:text-[11px]">
      Skiza Wakenya
    </span>
  </div>
</Link>

        {/* =======================================================
            DESKTOP NAVIGATION
        ======================================================== */}
        <nav
  className="hidden md:flex items-center gap-1 rounded-2xl border border-[var(--color-mint-bright,#52B788)]/15 bg-[var(--color-savanna-deep,#1B4332)]/95 p-1.5 shadow-[0_10px_30px_rgba(27,67,50,0.28)] backdrop-blur-xl"
  aria-label="Primary"
>
  {primaryNav.map((item) => {
    const hasChildren =
      Boolean(item.children && item.children.length > 0);

    const isOpen = openMenu === item.label;
    const active = isActive(item.href);

    return (
      <div
        key={item.label}
        className="relative"
        onMouseEnter={() => {
          if (hasChildren) {
            setOpenMenu(item.label);
          }
        }}
      >
        <Link
          href={item.href}
          aria-haspopup={hasChildren ? "menu" : undefined}
          aria-expanded={hasChildren ? isOpen : undefined}
          onFocus={() => {
            if (hasChildren) {
              setOpenMenu(item.label);
            }
          }}
          className={`group relative inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-[13px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-mint-bright,#52B788)] ${
            active || isOpen
              ? "bg-[var(--color-mint-soft,#2D6A4F)] text-white shadow-[0_5px_18px_rgba(45,106,79,0.25)]"
              : "text-white/75 hover:bg-[var(--color-mint-soft,#2D6A4F)]/55 hover:text-white"
          }`}
        >
          {/* subtle active glow */}
          {(active || isOpen) && (
            <motion.span
              layoutId="navGlow"
              className="absolute inset-0 -z-10 rounded-xl bg-[var(--color-mint-bright,#52B788)]/10 blur-md"
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30,
              }}
            />
          )}

          <span className="relative">
            {item.label}
          </span>

          {hasChildren && (
            <ChevronDown
              size={14}
              strokeWidth={2}
              className={`relative transition-all duration-200 ${
                isOpen
                  ? "rotate-180 text-[var(--color-mint-bright,#52B788)]"
                  : "text-white/45 group-hover:text-[var(--color-mint-bright,#52B788)]"
              }`}
            />
          )}

          {/* mint active rail */}
          {(active || isOpen) && (
            <motion.span
              layoutId="navActiveRail"
              className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_9px_rgba(82,183,136,0.65)]"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          )}
        </Link>

        {/* DROPDOWN */}
        <AnimatePresence>
          {hasChildren && isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.96,
                filter: "blur(5px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: 7,
                scale: 0.98,
                filter: "blur(4px)",
              }}
              transition={{
                duration: 0.22,
                ease,
              }}
              className="absolute left-1/2 top-full z-50 w-[350px] -translate-x-1/2 pt-3"
              onMouseEnter={() => setOpenMenu(item.label)}
            >
              {/* pointer */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-savanna-deep,#1B4332)]"
              />

              {/* dropdown panel */}
              <div className="relative overflow-hidden rounded-2xl border border-[var(--color-mint-bright,#52B788)]/20 bg-[var(--color-savanna-deep,#1B4332)] shadow-[0_24px_70px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
                {/* ambient glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(82,183,136,0.2),transparent_70%)] blur-2xl"
                />

                {/* grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.14]"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(82,183,136,0.14) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(82,183,136,0.14) 1px, transparent 1px)
                    `,
                    backgroundSize: "28px 28px",
                  }}
                />

                <div className="relative flex items-center justify-between border-b border-[var(--color-mint-bright,#52B788)]/15 px-4 py-3">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-mint-bright,#52B788)]">
                      Explore
                    </span>

                    <span className="mt-0.5 block text-[10px] text-white/45">
                      Navigate DCP Kenya
                    </span>
                  </div>

                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_12px_rgba(82,183,136,0.7)]" />
                </div>

                <ul className="relative flex flex-col gap-1.5 p-2.5">
                  {item.children?.map((child, idx) => {
                    const childActive = isActive(child.href);

                    return (
                      <motion.li
                        key={child.label}
                        initial={{
                          opacity: 0,
                          x: -8,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          duration: 0.25,
                          delay: idx * 0.035,
                          ease,
                        }}
                      >
                        <Link
                          href={child.href}
                          onClick={() => setOpenMenu(null)}
                          className={`group relative flex items-center gap-3 overflow-hidden rounded-xl border px-3.5 py-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-mint-bright,#52B788)] ${
                            childActive
                              ? "border-[var(--color-mint-bright,#52B788)]/25 bg-[var(--color-mint-bright,#52B788)]/10"
                              : "border-transparent hover:border-[var(--color-mint-bright,#52B788)]/15 hover:bg-[var(--color-mint-bright,#52B788)]/8"
                          }`}
                        >
                          {/* active rail */}
                          <span
                            className={`absolute bottom-2 left-0 top-2 w-0.5 rounded-full ${
                              childActive
                                ? "bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_10px_rgba(82,183,136,0.6)]"
                                : "bg-transparent group-hover:bg-[var(--color-mint-bright,#52B788)]/70"
                            }`}
                          />

                          {/* node */}
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                              childActive
                                ? "border-[var(--color-mint-bright,#52B788)]/30 bg-[var(--color-mint-bright,#52B788)]/10"
                                : "border-white/10 bg-white/[0.035] group-hover:border-[var(--color-mint-bright,#52B788)]/25 group-hover:bg-[var(--color-mint-bright,#52B788)]/10"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                childActive
                                  ? "bg-[var(--color-mint-bright,#52B788)] shadow-[0_0_10px_rgba(82,183,136,0.7)]"
                                  : "bg-white/30 group-hover:bg-[var(--color-mint-bright,#52B788)]"
                              }`}
                            />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span
                              className={`flex items-center justify-between gap-3 text-sm font-semibold ${
                                childActive
                                  ? "text-[var(--color-mint-bright,#52B788)]"
                                  : "text-white group-hover:text-[var(--color-mint-bright,#52B788)]"
                              }`}
                            >
                              <span>{child.label}</span>

                              <ArrowUpRight
                                size={14}
                                className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                              />
                            </span>

                            {child.description && (
                              <span className="mt-0.5 block line-clamp-1 text-xs leading-5 text-white/50 group-hover:text-white/65">
                                {child.description}
                              </span>
                            )}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* footer */}
                <div className="relative border-t border-[var(--color-mint-bright,#52B788)]/10 px-4 py-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/30">
                      DCP Kenya
                    </span>

                    <span className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--color-mint-bright,#52B788)]/65">
                      <span className="h-1 w-1 rounded-full bg-[var(--color-mint-bright,#52B788)]" />
                      Skiza mwananchi
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  })}
</nav>

        {/* =======================================================
            RIGHT ACTIONS
        ======================================================== */}
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <div className="hidden md:block">
            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -2,
                    }
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : {
                      scale: 0.97,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
            >
              <Button
                href="/get-involved"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[#1B4332] bg-[#1B4332] px-4.5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(27,67,50,0.25)] transition-all duration-300 hover:bg-[#2D6A4F] hover:border-[#2D6A4F] hover:shadow-[0_12px_28px_rgba(45,106,79,0.35)] active:bg-[#081C15]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <Sparkles className="relative h-4 w-4 text-emerald-300 transition-transform duration-300 group-hover:rotate-12" />

                <span className="relative text-white">Get Involved</span>

                <ArrowUpRight className="relative h-3.5 w-3.5 text-white/80 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </Button>
            </motion.div>
          </div>

          {/* Small desktop status object */}
          <motion.div
            aria-hidden="true"
            className="hidden h-9 items-center gap-1.5 rounded-xl border border-[#1B4332]/20 bg-white/55 px-2.5 backdrop-blur-sm lg:flex"
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -1,
                  }
            }
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[#1B4332] shadow-[0_0_8px_rgba(27,67,50,0.7)]"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: [0.4, 1, 0.4],
                      scale: [0.85, 1.15, 0.85],
                    }
              }
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#1B4332]">
              Civic
            </span>
          </motion.div>

          {/* Mobile navigation */}
          <motion.button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-[#1B4332]/30 bg-white/85 text-[#1B4332] shadow-sm backdrop-blur-md transition-all hover:border-[#1B4332] hover:bg-[#1B4332] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332]"
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen(true)}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -2,
                  }
            }
            whileTap={
              reduceMotion
                ? undefined
                : {
                    scale: 0.92,
                  }
            }
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(27,67,50,0.12),transparent_65%)]" />

            <Menu
              size={20}
              strokeWidth={2}
              className="relative transition-transform duration-200"
            />
          </motion.button>
        </div>
      </PageContainer>

      {/* =========================================================
          BOTTOM SIGNAL RAIL
      ========================================================== */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 hidden h-px overflow-hidden md:block"
      >
        <motion.div
          className="h-full w-24 bg-[#1B4332] shadow-[0_0_14px_rgba(27,67,50,0.6)]"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: ["-120px", "calc(100vw + 120px)"],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 4,
          }}
        />
      </motion.div>

      {/* =========================================================
          MOBILE NAVIGATION
      ========================================================== */}
      <MobileNavigation
        items={primaryNav}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}
