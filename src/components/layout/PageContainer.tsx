"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface BaseLayoutProps {
  children: ReactNode;
  className?: string;
}

interface PageContainerProps extends BaseLayoutProps {
  /**
   * Optional maximum width restraint, defaulting to standard desktop container width
   */
  size?: "narrow" | "default" | "wide" | "full";
}

interface SectionProps extends BaseLayoutProps {
  /**
   * Shows standard top separator border
   */
  border?: boolean;
  /**
   * Adds animated background ambient elements & floating objects
   */
  decorated?: boolean;
  /**
   * Custom background variant styling
   */
  variant?: "default" | "paper" | "subtle" | "dark";
  /**
   * Custom container id for anchor navigation
   */
  id?: string;
  /**
   * Disables default entry animation on child wrapper if nested animations exist
   */
  animateEntry?: boolean;
}

const containerWidths = {
  narrow: "max-w-4xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-none",
};

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * FloatingParticle
 * Multi-shaped ambient micro-element (dots, soft diamonds, rings) with continuous floating animation.
 */
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
    circle: "rounded-full bg-[var(--color-mint-bright,#1b4332)]/30 blur-[0.5px]",
    diamond:
      "rotate-45 rounded-[2px] border border-[var(--color-mint-bright,#1b4332)]/30 bg-[var(--color-mint-bright,#1b4332)]/15",
    ring: "rounded-full border border-[var(--color-mint-bright,#1b4332)]/25 bg-transparent",
  };

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute block select-none ${shapeStyles[shape]} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -16, 0],
              x: [0, 8, 0],
              opacity: [0.25, 0.7, 0.25],
              scale: [0.85, 1.12, 0.85],
              rotate: shape === "diamond" ? [45, 135, 45] : undefined,
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

/**
 * FloatingOrb
 * Radiant radial background mesh glowing softly behind section content.
 */
function FloatingOrb({
  className = "",
  size = 280,
  color = "mint",
}: {
  className?: string;
  size?: number;
  color?: "mint" | "savanna" | "emerald";
}) {
  const reduceMotion = useReducedMotion();

  const gradients = {
    mint: "bg-[radial-gradient(circle,rgba(82,183,136,0.14)_0%,rgba(45,106,79,0.04)_50%,transparent_72%)]",
    savanna:
      "bg-[radial-gradient(circle,rgba(27,67,50,0.12)_0%,rgba(82,183,136,0.03)_55%,transparent_75%)]",
    emerald:
      "bg-[radial-gradient(circle,rgba(52,211,153,0.12)_0%,rgba(16,185,129,0.02)_60%,transparent_70%)]",
  };

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-2xl select-none ${gradients[color]} ${className}`}
      style={{ width: size, height: size }}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: [1, 1.15, 1],
              opacity: [0.35, 0.65, 0.35],
              x: [0, 10, 0],
              y: [0, -10, 0],
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

/**
 * OrbitRing
 * Revolving structural accent ring with a traveling orbital luminescent marker node.
 */
function OrbitRing({
  className = "",
  duration = 32,
  size = 240,
}: {
  className?: string;
  duration?: number;
  size?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border border-[var(--color-mint-bright,#1b4332)]/15 select-none ${className}`}
      style={{ width: size, height: size }}
      animate={reduceMotion ? undefined : { rotate: 360 }}
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
      <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[var(--color-mint-bright,#1b4332)]/80 shadow-[0_0_10px_rgba(82,183,136,0.5)]" />
    </motion.div>
  );
}

/**
 * AmbientGlowLine
 * Subtle glowing gradient beam across the top edge.
 */
function AmbientGlowLine() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-1/2 h-[1px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-mint-bright,#1b4332)]/30 to-transparent"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scaleX: 0 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease }}
    />
  );
}

/**
 * PageContainer
 * Standardized responsive page padding and structural alignment container.
 */
export function PageContainer({
  children,
  className = "",
  size = "default",
}: PageContainerProps) {
  return (
    <div
      className={`mx-auto w-full ${containerWidths[size]} px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Section
 * Highly styled modular section container featuring smooth spatial alignments, 
 * clean responsive vertical cadence, and ambient floating visual objects.
 */
export function Section({
  children,
  className = "",
  border = false,
  decorated = false,
  variant = "default",
  id,
  animateEntry = true,
}: SectionProps) {
  const reduceMotion = useReducedMotion();

  const variantStyles = {
    default: "bg-transparent text-[var(--color-ink,#1b4332)]",
    paper: "bg-[var(--color-paper,#FAF9F6)] text-[var(--color-ink,#1b4332)]",
    subtle:
      "bg-slate-50/70 dark:bg-slate-900/40 text-[var(--color-ink,#1b4332)] dark:text-slate-100",
    dark: "bg-[var(--color-ink,#1b4332)] text-slate-50 dark",
  };

  return (
    <section
      id={id}
      className={`relative overflow-hidden py-16 sm:py-20 lg:py-24 transition-colors duration-300 ${
        border
          ? "border-t border-[var(--color-paper-line,#E5E7EB)] dark:border-slate-800/80"
          : ""
      } ${variantStyles[variant]} ${className}`}
    >
      {/* Top subtle glow line accent on bordered sections */}
      {border && <AmbientGlowLine />}

      {/* Interactive & Ambient Decorator System */}
      {decorated && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden select-none"
        >
          {/* Glowing Radial Orbs */}
          <FloatingOrb size={320} color="mint" className="-left-20 -top-16" />
          <FloatingOrb size={280} color="savanna" className="-right-16 top-1/3" />
          <FloatingOrb size={360} color="mint" className="-bottom-28 left-1/4" />

          {/* Dynamic Floating Particles */}
          <FloatingParticle
            shape="circle"
            className="left-[6%] top-[18%] h-2.5 w-2.5"
            delay={0}
            duration={6}
          />
          <FloatingParticle
            shape="diamond"
            className="left-[90%] top-[14%] h-3.5 w-3.5"
            delay={1.1}
            duration={7.5}
          />
          <FloatingParticle
            shape="ring"
            className="left-[14%] bottom-[22%] h-4 w-4"
            delay={0.5}
            duration={6.5}
          />
          <FloatingParticle
            shape="circle"
            className="right-[10%] bottom-[18%] h-2 w-2"
            delay={1.8}
            duration={8}
          />
          <FloatingParticle
            shape="diamond"
            className="left-[48%] top-[8%] h-3 w-3"
            delay={2.2}
            duration={7}
          />

          {/* Revolving Orbital Structural Rings */}
          <OrbitRing
            size={280}
            className="-right-20 -top-20"
            duration={44}
          />
          <OrbitRing
            size={200}
            className="-left-16 bottom-8"
            duration={36}
          />
        </div>
      )}

      {/* Main Content Area */}
      <PageContainer className="relative z-10">
        {animateEntry ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
          >
            {children}
          </motion.div>
        ) : (
          children
        )}
      </PageContainer>
    </section>
  );
}