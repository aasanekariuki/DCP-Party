"use client";

import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { NewsExplorer } from "@/components/content/NewsExplorer";
import { getNewsArticles } from "@/data/news";
import {
  Sparkles,
  Newspaper,
  ShieldCheck,
  Radio,
  Rss,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------- */
/* Dark Green Theme Grid & Visual Background Elements                         */
/* -------------------------------------------------------------------------- */

function BackgroundGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(82, 183, 136, 0.4) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(82, 183, 136, 0.4) 1px, transparent 1px)
        `,
        backgroundSize: "44px 44px",
        maskImage:
          "radial-gradient(circle at 50% 25%, black 30%, transparent 85%)",
      }}
    />
  );
}

function FloatingOrb({
  className = "",
  size = 280,
  duration = 9,
}: {
  className?: string;
  size?: number;
  duration?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl bg-[radial-gradient(circle,rgba(82,183,136,0.16)_0%,rgba(45,106,79,0.06)_48%,transparent_72%)] ${className}`}
      style={{ width: size, height: size }}
      animate={{
        scale: [1, 1.12, 1],
        opacity: [0.35, 0.65, 0.35],
        x: [0, 12, 0],
        y: [0, -14, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function FloatingParticle({
  className = "",
  delay = 0,
  duration = 6,
  shape = "circle",
}: {
  className?: string;
  delay?: number;
  duration?: number;
  shape?: "circle" | "diamond" | "ring" | "hex";
}) {
  const shapes = {
    circle:
      "rounded-full bg-mint-bright/60 shadow-[0_0_12px_rgba(82,183,136,0.45)]",
    diamond:
      "rotate-45 rounded-[2px] border border-mint-bright/40 bg-mint-bright/15 backdrop-blur-2xs",
    ring: "rounded-full border border-mint-bright/35 bg-transparent shadow-[0_0_8px_rgba(82,183,136,0.2)]",
    hex: "rounded-[3px] border border-mint-soft/30 bg-mint-bright/10 rotate-12",
  };

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute block ${shapes[shape]} ${className}`}
      animate={{
        y: [0, -20, 0],
        x: [0, 8, 0],
        opacity: [0.2, 0.8, 0.2],
        scale: [0.85, 1.15, 0.85],
        rotate:
          shape === "diamond" || shape === "hex" ? [12, 192, 12] : undefined,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function CornerBrackets() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-mint-bright/40 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:border-mint-bright"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-mint-bright/40 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:border-mint-bright"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-mint-bright/40 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:border-mint-bright"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-mint-bright/40 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:border-mint-bright"
      />
    </>
  );
}

function FloatingBadge({
  icon: Icon,
  title,
  subtitle,
  className = "",
  delay = 0,
}: {
  icon: typeof Radio;
  title: string;
  subtitle: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease }}
      className={`pointer-events-none hidden lg:flex items-center gap-3 rounded-xl border border-mint-bright/20 bg-paper-raised/90 px-3.5 py-2.5 shadow-[0_8px_24px_rgba(27,67,50,0.12)] backdrop-blur-md ${className}`}
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-mint-bright/20 bg-mint-bright/10 text-mint-soft">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="flex flex-col">
        <span className="font-mono text-[10px] font-medium tracking-wider uppercase text-ink">
          {title}
        </span>
        <span className="font-mono text-[9px] text-ink-soft">{subtitle}</span>
      </div>
    </motion.div>
  );
}

function SignalLine() {
  return (
    <div
      aria-hidden="true"
      className="relative h-px w-full overflow-hidden bg-mint-bright/15"
    >
      <motion.span
        className="absolute left-0 top-0 h-px w-32 bg-gradient-to-r from-transparent via-mint-bright to-transparent shadow-[0_0_12px_rgba(82,183,136,0.6)]"
        animate={{ x: ["-100%", "400%"] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main News Page Component                                                   */
/* -------------------------------------------------------------------------- */

export default function NewsPage() {
  const articles = getNewsArticles();
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen overflow-hidden bg-paper text-ink transition-colors duration-300"
    >
      <BackgroundGrid />

      {/* Floating Animated Ambient Background Orbs */}
      <motion.div style={{ y: backgroundY }} className="pointer-events-none absolute inset-0 z-0">
        <FloatingOrb size={420} duration={11} className="-left-36 -top-20" />
        <FloatingOrb size={340} duration={13} className="-right-28 top-[25%]" />
        <FloatingOrb size={290} duration={10} className="bottom-[10%] left-[25%]" />
      </motion.div>

      {/* Floating Geometric Particles */}
      <FloatingParticle className="left-[6%] top-20 h-2.5 w-2.5" delay={0.1} duration={6} shape="circle" />
      <FloatingParticle className="right-[10%] top-28 h-3.5 w-3.5" delay={0.8} duration={7.5} shape="diamond" />
      <FloatingParticle className="left-[12%] top-[48%] h-4.5 w-4.5" delay={1.4} duration={8} shape="ring" />
      <FloatingParticle className="right-[7%] bottom-[20%] h-3 w-3" delay={0.4} duration={5.8} shape="hex" />

      {/* Hero Banner Section */}
      <Section border={false} className="relative z-10 pt-8 pb-6 sm:pt-12 sm:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="group relative overflow-hidden rounded-[28px] border border-mint-bright/20 bg-paper-raised/80 p-6 shadow-[0_16px_45px_rgba(27,67,50,0.05)] backdrop-blur-md sm:p-8 lg:p-10"
        >
          <CornerBrackets />

          {/* Floating Widget Badges */}
          <FloatingBadge
            icon={Radio}
            title="Broadcast Channel"
            subtitle="Live Updates Active"
            className="absolute top-8 right-36"
            delay={0.3}
          />
          <FloatingBadge
            icon={Activity}
            title="Newsfeed Sync"
            subtitle="Verified Feeds"
            className="absolute bottom-20 right-10"
            delay={0.5}
          />

          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <Eyebrow>News</Eyebrow>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-mint-bright/30 bg-mint-bright/10 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-mint-soft shadow-[0_0_18px_rgba(82,183,136,0.08)]">
                  <Sparkles className="h-3 w-3 text-mint-bright" /> Live Feed
                </span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-mint-bright/20 bg-paper px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft shadow-2xs">
                <Newspaper className="h-3.5 w-3.5 text-mint-bright" />
                <span>{categories.length} Topics</span>
              </div>
            </div>

            <div className="mt-6 max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.08, ease }}
                className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl"
              >
                Reporting on the party&rsquo;s{" "}
                <span className="relative inline-block text-mint-soft [text-shadow:0_0_24px_rgba(82,183,136,0.16)]">
                  activity.
                  <motion.span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-0 h-px bg-mint-bright/70 shadow-[0_0_10px_rgba(82,183,136,0.35)]"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.45, ease }}
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease }}
                className="measure mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-[17px]"
              >
                Articles below are demo content pending approved reporting. Each carries a verification status.
              </motion.p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-mint-bright/15 pt-5 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-mint-soft" />
                  <span>Newsfeed Verification Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-mint-bright animate-pulse shadow-[0_0_10px_rgba(82,183,136,0.5)]" />
                  <span>Total Articles: {articles.length}</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-mint-soft">
                <Rss className="h-3.5 w-3.5" />
                <span>Realtime Dispatch</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Main Interactive News Explorer Container */}
      <Section border={false} className="relative z-10 pt-2 pb-12 sm:pt-4 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease }}
          className="relative overflow-hidden rounded-[26px] border border-mint-bright/15 bg-paper-raised/55 p-4 shadow-[0_16px_40px_rgba(27,67,50,0.035)] sm:p-6 lg:p-7"
        >
          <NewsExplorer articles={articles} categories={categories} />
        </motion.div>
      </Section>

      {/* Bottom Status Bar */}
      <Section border={false} className="relative z-10 pt-0 pb-12 sm:pb-16">
        <div className="relative overflow-hidden rounded-2xl border border-mint-bright/15 bg-paper-raised/55 px-5 py-4 sm:px-7">
          <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-mint-bright/20 bg-mint-bright/10 text-mint-soft">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">
                All press releases cross-referenced with public log
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-mint-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-mint-bright shadow-[0_0_8px_rgba(82,183,136,0.6)]" />
              Live News Feed
            </div>
          </div>
          <div className="relative mt-3">
            <SignalLine />
          </div>
        </div>
      </Section>
    </div>
  );
}