import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-ink text-white border border-ink hover:bg-accent hover:border-accent",
  secondary:
    "bg-transparent text-ink border border-ink hover:bg-emerald-600 hover:border-emerald-600 hover:text-white active:bg-emerald-800 active:border-emerald-800",
  ghost:
    "bg-transparent text-ink border border-transparent hover:border-line",
};

const base =
  "inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[0.95rem] font-medium transition-colors duration-150 rounded-[3px] disabled:opacity-50 disabled:pointer-events-none";

export function Button({
  href,
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled,
  className = "",
}: ButtonProps) {
  const classes = `${base} ${variantClasses[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}