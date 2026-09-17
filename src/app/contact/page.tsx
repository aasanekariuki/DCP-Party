// src/app/contact/page.tsx

"use client";

import type { ComponentType } from "react";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  MessageSquare,
  Radio,
  ShieldCheck,
  Sparkles,
  Network,
  Orbit,
  ScanLine,
} from "lucide-react";

import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/forms/ContactForm";

const ease = [0.16, 1, 0.3, 1] as const;

const details = [
  {
    label: "Box",
    value: "P.O. Box 26237-00100, Nairobi, Kenya,",
    Icon: Mail,
    tag: "Digital correspondence",
  },
  {
    label: "Phone",
    value: "+254 700 000 000, info@dcp.or.ke, membership@dcp.or.ke, media@dcp.or.ke",
    Icon: Phone,
    tag: "Direct communication",
  },
  {
    label: "Office",
    value: "Musa Gitau Road, Muthangari Drive, Nairobi, Kenya",
    Icon: MapPin,
    tag: "Physical office",
  },
];

function FloatingOrb({
  className = "",
  size = 150,
  delay = 0,
}: {
  className?: string;
  size?: number;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border border-mint-bright/20 bg-mint-bright/[0.045] ${className}`}
      style={{
        width: size,
        height: size,
        boxShadow: "0 0 90px rgba(82,183,136,0.10)",
      }}
      animate={
        reduceMotion
          ? undefined
          : {
              x: [0, 10, 0],
              y: [0, -18, 0],
              rotate: [0, 8, 0],
            }
      }
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function FloatingParticle({
  className = "",
  delay = 0,
  size = 4,
}: {
  className?: string;
  delay?: number;
  size?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full bg-mint-bright/55 ${className}`}
      style={{
        width: size,
        height: size,
        boxShadow: "0 0 18px rgba(82,183,136,0.35)",
      }}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -22, 0],
              opacity: [0.15, 0.85, 0.15],
              scale: [0.8, 1.2, 0.8],
            }
      }
      transition={{
        duration: 4.5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function BackgroundGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.38]"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(45,106,79,0.055) 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            rgba(45,106,79,0.055) 1px,
            transparent 1px
          )
        `,
        backgroundSize: "46px 46px",
        maskImage:
          "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
      }}
    />
  );
}

function CornerBrackets() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <span className="absolute left-0 top-0 h-10 w-10 border-l border-t border-mint-bright/30" />
      <span className="absolute right-0 top-0 h-10 w-10 border-r border-t border-mint-bright/30" />
      <span className="absolute bottom-0 left-0 h-10 w-10 border-b border-l border-mint-bright/30" />
      <span className="absolute bottom-0 right-0 h-10 w-10 border-b border-r border-mint-bright/30" />
    </div>
  );
}

function OrbitDecoration() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-40px] top-14 hidden h-44 w-44 rounded-full border border-mint-bright/15 sm:block"
      animate={
        reduceMotion
          ? undefined
          : {
              rotate: 360,
            }
      }
      transition={{
        duration: 24,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-mint-bright shadow-[0_0_15px_rgba(82,183,136,0.65)]" />

      <div className="absolute inset-7 rounded-full border border-mint-soft/15" />
      <div className="absolute inset-14 rounded-full border border-mint-bright/10" />

      <motion.span
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-warm/75"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.5, 1],
                opacity: [0.35, 1, 0.35],
              }
        }
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

function SignalLine() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative mt-7 h-px w-full overflow-hidden bg-mint-soft/10"
    >
      <motion.span
        className="absolute left-0 top-0 h-px w-24 bg-mint-bright/70"
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["-120px", "100vw"],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

function ContactChannel({
  label,
  value,
  tag,
  Icon,
  index,
}: {
  label: string;
  value: string;
  tag: string;
  Icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x: -18,
            }
      }
      animate={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              x: 0,
            }
      }
      transition={{
        duration: 0.65,
        delay: 0.12 + index * 0.1,
        ease,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -3,
              x: 3,
            }
      }
      className="group relative overflow-hidden rounded-2xl border border-paper-line bg-paper/75 p-4 shadow-sm backdrop-blur transition-colors duration-300 hover:border-mint-bright/25 hover:bg-paper-raised"
    >
      <div className="absolute right-[-22px] top-[-22px] h-20 w-20 rounded-full border border-mint-bright/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex items-start gap-3.5">
        <motion.span
          whileHover={
            reduceMotion
              ? undefined
              : {
                  scale: 1.08,
                  rotate: 4,
                }
          }
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-mint-bright/15 bg-mint-bright/[0.06] text-mint-soft"
        >
          <Icon size={18} strokeWidth={1.8} />
        </motion.span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-ink">
              {label}
            </p>

            <span className="rounded-full border border-paper-line bg-paper-raised px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-ink-soft">
              {tag}
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-ink-soft">
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function RoutingCard() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.45,
        ease,
      }}
      className="relative overflow-hidden rounded-2xl border border-mint-bright/15 bg-mint-bright/[0.045] p-5"
    >
      <FloatingParticle
        className="right-7 top-7"
        delay={0.4}
        size={4}
      />

      <FloatingParticle
        className="bottom-7 right-16"
        delay={1.4}
        size={3}
      />

      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-mint-bright/15 bg-paper/70 text-mint-soft">
            <Network size={17} />
          </span>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-mint-soft">
              Contact routing
            </p>

            <h2 className="mt-1 font-display text-lg text-ink">
              Your inquiry matters
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-ink-soft">
          General inquiries, public information requests, media,
          events, partnerships, and membership questions can be
          submitted through the contact form.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {[
            "General inquiries",
            "Public information",
            "Media",
            "Events",
            "Partnerships",
            "Membership",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border border-paper-line bg-paper/75 px-2.5 py-1.5 text-[10px] font-semibold text-ink-soft"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function FormHeader() {
  return (
    <div className="mb-6 flex items-start justify-between gap-5">
      <div>
        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-mint-soft">
          <MessageSquare size={14} />
          Secure inquiry channel
        </p>

        <h2 className="mt-2 font-display text-2xl leading-tight text-ink sm:text-3xl">
          Send a message
        </h2>

        <p className="mt-2 max-w-xl text-sm leading-6 text-ink-soft">
          Share the details of your inquiry and use the form to route
          your message appropriately.
        </p>
      </div>

      <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-mint-bright/15 bg-mint-bright/[0.05] text-mint-soft sm:flex">
        <ScanLine size={18} />
      </div>
    </div>
  );
}

export default function ContactPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative min-h-screen overflow-hidden bg-paper text-ink">
      {/* Ambient visual system */}
      <BackgroundGrid />

      <FloatingOrb
        className="left-[-95px] top-32"
        size={220}
        delay={0.4}
      />

      <FloatingOrb
        className="right-[-100px] top-[42%]"
        size={250}
        delay={1.5}
      />

      <FloatingOrb
        className="bottom-[-90px] left-[38%]"
        size={180}
        delay={2.2}
      />

      <FloatingParticle
        className="left-[8%] top-[22%]"
        delay={0.3}
        size={4}
      />

      <FloatingParticle
        className="right-[14%] top-[26%]"
        delay={1}
        size={5}
      />

      <FloatingParticle
        className="left-[18%] top-[63%]"
        delay={1.8}
        size={3}
      />

      <FloatingParticle
        className="right-[24%] top-[74%]"
        delay={2.5}
        size={4}
      />

      {/* Hero */}
      <Section
        border={false}
        className="relative z-10 pt-12 sm:pt-16 lg:pt-20"
      >
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 18,
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
          className="relative overflow-hidden rounded-[2rem] border border-paper-line bg-paper-raised/75 p-6 shadow-[0_24px_80px_rgba(27,67,50,0.08)] backdrop-blur sm:p-8 lg:p-10"
        >
          <BackgroundGrid />
          <CornerBrackets />
          <OrbitDecoration />

          <FloatingOrb
            className="right-[-60px] top-[-60px]"
            size={190}
            delay={0.4}
          />

          <FloatingParticle
            className="right-[20%] top-[22%]"
            delay={0.8}
          />

          <div className="relative z-10 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <Eyebrow>Contact</Eyebrow>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-mint-bright/20 bg-mint-bright/[0.05] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-mint-soft">
                <Radio size={12} />
                Open channel
              </span>
            </div>

            <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-ink sm:text-5xl lg:text-6xl">
              Reach the{" "}
              <span className="relative inline-block text-mint-soft">
                right department
                <motion.span
                  initial={
                    reduceMotion
                      ? false
                      : {
                          scaleX: 0,
                        }
                  }
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scaleX: 1,
                        }
                  }
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                    ease,
                  }}
                  className="absolute -bottom-2 left-0 h-1 w-full origin-left rounded-full bg-mint-bright/70 shadow-[0_0_18px_rgba(82,183,136,0.28)]"
                />
              </span>
              .
            </h1>

            <p className="measure mt-7 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">
              General inquiries, public information requests, media,
              events, partnerships, and membership questions all route
              through this page.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-paper-line bg-paper/75 px-3.5 py-2 text-xs font-medium text-ink-soft shadow-sm">
                <CheckCircle2
                  size={14}
                  className="text-mint-soft"
                />
                Citizen-focused communication
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-paper-line bg-paper/75 px-3.5 py-2 text-xs font-medium text-ink-soft shadow-sm">
                <ShieldCheck
                  size={14}
                  className="text-mint-soft"
                />
                Clear inquiry routing
              </span>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Contact workspace */}
      <Section className="relative z-10">
        <div className="grid gap-7 lg:grid-cols-12 lg:gap-10">
          {/* Contact channels */}
          <div className="lg:col-span-4">
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 18,
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
                amount: 0.15,
              }}
              transition={{
                duration: 0.65,
                ease,
              }}
            >
              <div className="mb-5">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-mint-soft">
                  <Orbit size={13} />
                  Communication points
                </p>

                <h2 className="mt-2 font-display text-2xl text-ink">
                  Contact channels
                </h2>

                <p className="mt-2 text-sm leading-6 text-ink-soft">
                  Official contact details will be published here once
                  they have been verified.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {details.map((detail, index) => (
                  <ContactChannel
                    key={detail.label}
                    {...detail}
                    index={index}
                  />
                ))}
              </div>

              <RoutingCard />
            </motion.div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 lg:col-start-6">
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 22,
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
                amount: 0.12,
              }}
              transition={{
                duration: 0.75,
                delay: 0.08,
                ease,
              }}
              className="relative overflow-hidden rounded-[2rem] border border-paper-line bg-paper-raised/80 p-5 shadow-[0_24px_75px_rgba(27,67,50,0.08)] backdrop-blur sm:p-7 lg:p-8"
            >
              <CornerBrackets />

              <FloatingOrb
                className="right-[-65px] bottom-[-70px]"
                size={170}
                delay={1}
              />

              <FloatingParticle
                className="right-[14%] top-[12%]"
                delay={0.7}
                size={4}
              />

              <div className="relative z-10">
                <FormHeader />

                <div className="rounded-[1.5rem] border border-paper-line/80 bg-paper/60 p-4 sm:p-5">
                  <ContactForm />
                </div>

                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-mint-bright/10 bg-mint-bright/[0.035] px-4 py-3.5">
                  <ShieldCheck
                    size={17}
                    className="mt-0.5 shrink-0 text-mint-soft"
                  />

                  <p className="text-xs leading-5 text-ink-soft">
                    Please provide enough context for your inquiry to
                    be routed appropriately. Avoid including passwords,
                    payment details, or other sensitive credentials.
                  </p>
                </div>

                <SignalLine />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom status rail */}
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
            amount: 0.15,
          }}
          transition={{
            duration: 0.65,
            delay: 0.15,
            ease,
          }}
          className="mt-9 flex flex-col gap-4 border-t border-paper-line/80 py-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-mint-bright/15 bg-mint-bright/[0.05] text-mint-soft">
              <Sparkles size={15} />
            </span>

            <div>
              <p className="text-xs font-semibold text-ink">
                Citizen communication desk
              </p>

              <p className="mt-0.5 text-xs text-ink-soft">
                One channel for public questions, information, and
                participation.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-semibold text-mint-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-mint-bright shadow-[0_0_12px_rgba(82,183,136,0.55)]" />
            Contact channel active
            <ArrowUpRight size={14} />
          </div>
        </motion.div>
      </Section>
    </main>
  );
}

